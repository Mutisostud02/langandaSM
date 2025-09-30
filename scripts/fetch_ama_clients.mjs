import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Node 18+ has global fetch

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const ATHLETES_DIR = path.join(PUBLIC_DIR, 'athletes');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'athletes.json');
const DATA_PUBLIC_FILE = path.join(PUBLIC_DIR, 'athletes.json');

function toSlug(name) {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[“”"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function extFromUrl(url) {
  const m = url.split('?')[0].match(/\.(jpg|jpeg|png|webp)$/i);
  return m ? m[0].toLowerCase() : '.jpg';
}

function parsePlayers(html) {
  // Split by player blocks
  const blocks = html.split('<div class="player">').slice(1);
  const players = [];
  for (const block of blocks) {
    // Image src inside player__img
    const imgMatch = block.match(/<div class=\"player__img\">[\s\S]*?<img[^>]*?src=\"([^\"]+)\"/i);
    // Name inside player__content__title
    const nameMatch = block.match(/player__content__title\">([^<]+)</i);
    if (!nameMatch || !imgMatch) continue;
    const name = nameMatch[1].trim();
    const imageUrl = imgMatch[1];

    // Optional team
    let team = undefined;
    const teamMatch = block.match(/<div class=\"player__content__team\">[\s\S]*?<span>([^<]+)<\/span>/i);
    if (teamMatch) team = teamMatch[1].trim();

    players.push({ name, imageUrl, team });
  }
  return players;
}

async function download(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(destPath, buffer);
}

async function main() {
  console.log('Fetching clients page (sv) via WP REST API...');
  const api = 'https://amasportsagency.com/wp-json/wp/v2/pages?slug=klienter&per_page=1';
  const res = await fetch(api);
  if (!res.ok) throw new Error(`Failed to fetch API: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error('No page data returned');
  const html = data[0]?.content?.rendered || '';
  if (!html) throw new Error('No rendered HTML found');

  console.log('Parsing players...');
  const players = parsePlayers(html);
  console.log(`Found ${players.length} players.`);
  if (players.length === 0) {
    console.warn('No players found. Exiting.');
    return;
  }

  await ensureDir(ATHLETES_DIR);
  await ensureDir(DATA_DIR);

  const out = [];
  for (const p of players) {
    const slug = toSlug(p.name);
    const ext = extFromUrl(p.imageUrl);
    const filename = `${slug}${ext}`;
    const dest = path.join(ATHLETES_DIR, filename);

    // Prefer largest image if srcset provides it (simple heuristic)
    let imageUrl = p.imageUrl;
    const srcsetMatch = p.imageUrl.match(/srcset=\"([^\"]+)\"/);
    // Note: p.imageUrl is just the src; the srcset is not captured by regex above.
    // As a fallback, try to upgrade to the non-sized original by removing -600x600 like patterns.
    imageUrl = imageUrl.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');

    try {
      console.log(`Downloading ${p.name} -> ${imageUrl}`);
      await download(imageUrl, dest);
    } catch (e) {
      console.warn(`Primary download failed, trying original src: ${p.imageUrl}`);
      try {
        await download(p.imageUrl, dest);
      } catch (e2) {
        console.error(`Failed to download for ${p.name}:`, e2.message);
        continue;
      }
    }

    out.push({
      name: p.name,
      team: p.team || null,
      image: `/athletes/${filename}`,
    });
  }

  // Write JSON sorted by name
  out.sort((a, b) => a.name.localeCompare(b.name));
  const json = JSON.stringify(out, null, 2);
  await fs.promises.writeFile(DATA_FILE, json);
  // Also write to public for runtime fetching
  await fs.promises.writeFile(DATA_PUBLIC_FILE, json);
  console.log(`Wrote ${out.length} entries to ${path.relative(ROOT, DATA_FILE)} and ${path.relative(ROOT, DATA_PUBLIC_FILE)}`);
  console.log(`Images saved to ${path.relative(ROOT, ATHLETES_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
