import { useParams, Link } from "react-router-dom";

const athletes = [
  { name: "Armand “Mondo” Duplantis", discipline: "Pole vault", country: "SE" },
  { name: "Sarah Sjöström", discipline: "SWIMMING", country: "SE" },
  {
    name: "Jakob Ingebrigtsen",
    discipline: "1500m / 3000m / 5000m",
    country: "NO",
  },
  { name: "Sandra Elkasević", discipline: "Discus throw", country: "HR" },
  { name: "Ivana Španović", discipline: "Long jump", country: "RS" },
  { name: "Mutaz Barshim", discipline: "High jump", country: "QA" },
  { name: "Nicola Olyslagers", discipline: "High jump", country: "AU" },
  { name: "Rhasidat Adeleke", discipline: "200m/400m", country: "IE" },
  {
    name: "Andreas Almgren",
    discipline: "1500m/ 5000m/ 10000m",
    country: "SE",
  },
  { name: "Andreas Kramer", discipline: "800m", country: "SE" },
  { name: "Khaddi Sagnia", discipline: "Long Jump", country: "SE" },
  { name: "Thobias Montler", discipline: "Long jump", country: "SE" },
  {
    name: "Karoline Bjerkeli Grøvdal",
    discipline: "1500m / 5000m / 10000m",
    country: "NO",
  },
  { name: "Vanessa Kamga", discipline: "Discus throw", country: "SE" },
  { name: "Abderrahman Samba", discipline: "400mH", country: "QA" },
  { name: "Filip Ingebrigtsen", discipline: "1500m / 5000m", country: "NO" },
  { name: "Erik Erlandsson", discipline: "100m / 200m", country: "SE" },
  { name: "Engla Nilsson", discipline: "High Jump", country: "SE" },
  { name: "Thea Löfman", discipline: "Hammer Throw", country: "SE" },
  { name: "Thomas Röhler", discipline: "Javelin throw", country: "DE" },
  { name: "Moa Granat", discipline: "400mH", country: "SE" },
  { name: "Melwin Lycke Holm", discipline: "High Jump", country: "SE" },
  {
    name: "William Trulsson",
    discipline: "100m / 200m / 400m",
    country: "SE",
  },
  {
    name: "Henrik Ingebrigtsen",
    discipline: "1500m / 5000m / 10000m",
    country: "NO",
  },
  { name: "Vidar Johansson", discipline: "3000mSC", country: "SE" },
  { name: "Henrik Larsson", discipline: "100 m / 200m", country: "SE" },
  { name: "Carl Bengtström", discipline: "400mH", country: "SE" },
  { name: "Kim Amb", discipline: "Javelin throw", country: "SE" },
  {
    name: "Maja Åskag",
    discipline: "Long jump / Triple jump",
    country: "SE",
  },
  { name: "Julia Henriksson", discipline: "100m / 200m", country: "SE" },
  { name: "Hedda Hynne", discipline: "800m", country: "NO" },
  { name: "Tilde Johansson", discipline: "Long jump", country: "SE" },
  { name: "Wictor Petersson", discipline: "Shot put", country: "SE" },
];

function toSlug(name) {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/“|”|"/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function codeToFlagEmoji(code) {
  const base = 127397;
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(base + c.charCodeAt(0)))
    .join("");
}

const athleteExtra = {
  "sarah-sjostrom": {
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/sarahsjostrom/",
        icon: "instagram",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/sarahsjostroms",
        icon: "facebook",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/sarahsjo",
        icon: "twitter",
      },
      {
        label: "Snapchat",
        href: "https://www.snapchat.com/add/ssarh",
        icon: "snapchat",
      },
    ],
    leftMeta: [
      { label: "Date of birth", value: "17th Aug 1993" },
      { label: "Nationality", value: "Sweden" },
      { label: "Coach", value: "" },
    ],
    achievements: [
      {
        title: "World Record holder",
        details: "Long course 50m free, 100m free, 50m fly and 100m fly.",
      },
      { title: "Olympic Games", details: "3 Gold, 2 Silver, 1 Bronze" },
      { title: "World Championships", details: "20 Gold, 12 Silver, 4 Bronze" },
      {
        title: "European Championships",
        details: "29 Gold, 19 Silver, 6 Bronze",
      },
    ],
  },
  "armand-mondo-duplantis": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
      { label: "Snapchat", href: "#", icon: "snapchat" },
      { label: "Tiktok", href: "#", icon: "instagram" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "10th Nov 1999" },
      { label: "Nationality", value: "Sweden" },
      { label: "Coach", value: "Helena Duplantis & Greg Duplantis" },
    ],
    achievements: [
      { title: "PB", details: "6.28 (WORLD RECORD)" },
      { title: "Olympic Games", details: "2024 – 1\n2021 – 1" },
      { title: "World Championships", details: "2023 – 1\n2022 – 1\n2019 – 2" },
      {
        title: "European Championships",
        details: "2024 – 1\n2022 – 1\n2018 – 1",
      },
      {
        title: "World Indoor Championships",
        details: "2025 – 1\n2024 – 1\n2022 – 1",
      },
      { title: "European Indoor Championships", details: "2021 – 1" },
      {
        title: "Diamond Leauge Final Winner",
        details: "4x (2021, 2022, 2023, 2024)",
      },
    ],
  },
  "jakob-ingebrigtsen": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "19th Sep 2000" },
      { label: "Nationality", value: "Norway" },
      { label: "Coach", value: "Henrik Ingebrigtsen" },
    ],
    achievements: [
      { title: "PB", details: "3:26.73 (NR) / 7:17:55 (WR) / 12:48.45 (NR)" },
      {
        title: "Olympic Games",
        details: "2024 – 1 (5000m) / 4 (1500)\n2021 – 1 (1500m)",
      },
      {
        title: "World Championships",
        details: "2023 – 1 (5000m) / 2 (1500m)\n2022 – 1 (5000m) / 2 (1500m)",
      },
      {
        title: "European Championships",
        details:
          "2024 – 1 (1500m) / 1 (5000m)\n2022 – 1 (1500m) / 1 (5000m)\n2018 – 1 (1500m) / 1 (5000m)",
      },
      {
        title: "World Indoor Championships",
        details: "2025 – 1 (1500m) / 1 (3000m)\n2022 – 2 (1500m)",
      },
      {
        title: "European Indoor Championships",
        details:
          "2025 – 1 (1500m) / 1 (3000m)\n2023 – 1/1\n2021 – 1/1\n2019 – 2/1",
      },
      {
        title: "Diamond Leauge Final Winner",
        details: "4x (2022, 2023 – Mile & 3000m, 2024)",
      },
    ],
  },
  "sandra-elkasevic": {
    leftMeta: [
      { label: "Date of birth", value: "21st Jun 1990" },
      { label: "Nationality", value: "Croatia" },
      { label: "Coach", value: "Edis Elkasevic" },
    ],
    achievements: [
      { title: "PB", details: "71.41" },
      {
        title: "Olympic Games",
        details: "2024 – 3\n2020 – 4\n2016 – 1\n2012 – 1",
      },
      {
        title: "World Championships",
        details: "2023 – 5\n2022 – 2\n2019 – 3\n2017 – 1\n2015 – 2\n2013 – 1",
      },
      {
        title: "European Championships",
        details:
          "2024 – 1\n2022 – 1\n2018 – 1\n2016 – 1\n2014 – 1\n2012 – 1\n2010 – 1",
      },
      {
        title: "Diamond Leauge Winner",
        details: "7x (2017, 2016, 2015, 2014, 2013, 2012, 2010)",
      },
    ],
  },
  "ivana-spanovic": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "10th May 1990" },
      { label: "Nationality", value: "Serbia" },
      { label: "Coach", value: "Goran Obradovic" },
    ],
    achievements: [
      { title: "PB", details: "7.14 /i7.24" },
      { title: "Olympic Games", details: "2016 – 3" },
      { title: "World Championships", details: "2023 – 1\n2015 – 3\n2013 – 3" },
      {
        title: "European Championships",
        details: "2022 – 1\n2016 – 1\n2014 – 2",
      },
      {
        title: "World Indoor Championships",
        details: "2022 – 1\n2018 – 1\n2016 – 2\n2014 – 3",
      },
      {
        title: "European Indoor Championships",
        details: "2023 – 3\n2019 – 1\n2017 – 1\n2015 – 1",
      },
      {
        title: "Diamond Leauge Final Winner",
        details: "6x (2023, 2022, 2021, 2017, 2015, 2014)",
      },
    ],
  },
  "mutaz-barshim": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "24th Jun 1991" },
      { label: "Nationality", value: "Qatar" },
      { label: "Coach", value: "" },
    ],
    achievements: [
      { title: "PB", details: "2.43" },
      { title: "Olympic Games", details: "2020 – 1\n2016 – 2\n2012 – 2" },
      {
        title: "World Championships",
        details: "2023 – 3\n2022 – 1\n2019 – 1\n2017 – 1\n2015 – 4\n2013 – 2",
      },
      {
        title: "Diamond Leauge Final Winner",
        details: "3x (2017, 2015, 2014)",
      },
    ],
  },
  "nicola-olyslagers": {
    socials: [{ label: "Instagram", href: "#", icon: "instagram" }],
    leftMeta: [
      { label: "Date of birth", value: "28th Dec 1996" },
      { label: "Nationality", value: "Australia" },
      { label: "Coach", value: "Matthew Horsnell" },
    ],
    achievements: [
      { title: "PB", details: "2.03 (NR)" },
      { title: "Olympic Games", details: "2024 – 2\n2020 – 2" },
      { title: "World Championships", details: "2023 – 3\n2022 – 5" },
      { title: "World Indoor Championships", details: "2025 – 1\n2024 – 1" },
    ],
  },
  "rhasidat-adeleke": {
    leftMeta: [
      { label: "Date of birth", value: "29 August 2002" },
      { label: "Nationality", value: "Irland" },
      { label: "Coach", value: "Edrick Floreal" },
    ],
    achievements: [
      { title: "PB", details: "49.20" },
      { title: "Olympic Games", details: "2024 – 4" },
      { title: "World Championships", details: "2023 – 4" },
      { title: "European Championships", details: "2024 – 2" },
      {
        title: "European U20 Championships",
        details: "2021 – 1 (100m & 200m)",
      },
      { title: "European U18 Championships", details: "2018 – 1 (100m)" },
    ],
  },
  "andreas-almgren": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "12th Jun 1995" },
      { label: "Nationality", value: "Sweden" },
      { label: "Coach", value: "Urban Aruhn" },
    ],
    achievements: [
      {
        title: "PB",
        details: "3:32 / 12:44.27 (European Record) / 26:52.87 (NR)",
      },
      { title: "Half Marathon", details: "59:23 (NR)" },
      { title: "European Championships", details: "2024 – 4\n2022 – 4" },
    ],
  },
  // Placeholders for remaining athletes
  "andreas-kramer": { socials: [], leftMeta: [], achievements: [] },
  "khaddi-sagnia": { socials: [], leftMeta: [], achievements: [] },
  "thobias-montler": { socials: [], leftMeta: [], achievements: [] },
  "karoline-bjerkeli-grovdal": { socials: [], leftMeta: [], achievements: [] },
  "vanessa-kamga": { socials: [], leftMeta: [], achievements: [] },
  "abderrahman-samba": { socials: [], leftMeta: [], achievements: [] },
  "filip-ingebrigtsen": { socials: [], leftMeta: [], achievements: [] },
  "erik-erlandsson": { socials: [], leftMeta: [], achievements: [] },
  "engla-nilsson": { socials: [], leftMeta: [], achievements: [] },
  "thea-lofman": { socials: [], leftMeta: [], achievements: [] },
  "thomas-rohler": { socials: [], leftMeta: [], achievements: [] },
  "moa-granat": { socials: [], leftMeta: [], achievements: [] },
  "melwin-lycke-holm": { socials: [], leftMeta: [], achievements: [] },
  "william-trulsson": { socials: [], leftMeta: [], achievements: [] },
  "henrik-ingebrigtsen": {
    socials: [
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    leftMeta: [
      { label: "Date of birth", value: "24th Feb 1991" },
      { label: "Nationality", value: "Norway" },
      { label: "Coach", value: "" },
    ],
    achievements: [
      { title: "PB", details: "" },
      { title: "Olympic Games", details: "" },
      { title: "World Championships", details: "" },
      { title: "European Championships", details: "" },
      { title: "European Indoor Championships", details: "" },
      { title: "Diamond Leauge Final Winner", details: "" },
    ],
  },
  "vidar-johansson": {
    socials: [],
    leftMeta: [
      { label: "Date of birth", value: "" },
      { label: "Nationality", value: "Sweden" },
      { label: "Coach", value: "" },
    ],
    achievements: [
      { title: "PB", details: "" },
      { title: "Olympic Games", details: "" },
      { title: "World Championships", details: "" },
      { title: "European Championships", details: "" },
    ],
  },
  "henrik-larsson": { socials: [], leftMeta: [], achievements: [] },
  "carl-bengtstrom": { socials: [], leftMeta: [], achievements: [] },
  "kim-amb": { socials: [], leftMeta: [], achievements: [] },
  "maja-askag": { socials: [], leftMeta: [], achievements: [] },
  "julia-henriksson": { socials: [], leftMeta: [], achievements: [] },
  "hedda-hynne": { socials: [], leftMeta: [], achievements: [] },
  "tilde-johansson": { socials: [], leftMeta: [], achievements: [] },
  "wictor-petersson": { socials: [], leftMeta: [], achievements: [] },
};

function SocialIcon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
  };
  if (name === "instagram")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    );
  if (name === "facebook")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12H16l-.4 3h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    );
  if (name === "twitter")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M22 5.9c-.7.3-1.5.6-2.2.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.9-2.6 1.1a3.7 3.7 0 0 0-6.4 2.5c0 .3 0 .6.1 .8A10.5 10.5 0 0 1 3.1 5.2a3.7 3.7 0 0 0 1.1 5 3.6 3.6 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3 3.6-.3.1-.7.1-1 .1-.3 0-.5 0-.8-.1.5 1.5 1.9 2.6 3.5 2.6A7.4 7.4 0 0 1 2 19.3 10.5 10.5 0 0 0 7.7 21c6.8 0 10.6-5.7 10.6-10.7v-.5c.7-.5 1.4-1.2 1.9-2z" />
      </svg>
    );
  if (name === "snapchat")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 2c3 0 5 2.2 5 5.2 0 1.2-.3 2.1-.3 2.1s1.3 2 3 2.7c.5.2.8.5.8.9 0 .6-.7 1-1.5 1.2-.7.2-1.4.4-1.4.8s.8.7 1.3.9c.5.2.9.4.9.9 0 .6-.8.9-1.6 1-1 .2-2 .3-2.3.6-.6.5-1.8 1.7-3.9 1.7s-3.3-1.2-3.9-1.7c-.3-.3-1.3-.4-2.3-.6-.8-.1-1.6-.4-1.6-1 0-.5.4-.7.9-.9.5-.2 1.3-.5 1.3-.9s-.7-.6-1.4-.8C4.7 14 4 13.6 4 13c0-.4.3-.7.8-.9 1.7-.7 3-2.7 3-2.7S7.5 8.4 7.5 7.2C7.5 4.2 9.6 2 12 2z" />
      </svg>
    );
  return null;
}

export default function AthleteDetail() {
  const { slug } = useParams();
  const athlete = athletes.find((a) => toSlug(a.name) === slug);

  if (!athlete) {
    return (
      <main className="athletes-page">
        <section className="athletes">
          <div className="container">
            <p>Not found.</p>
            <p>
              <Link to="/athletes" className="button">
                Back to Athletes
              </Link>
            </p>
          </div>
        </section>
      </main>
    );
  }

  const imgSrc = `/athletes/${slug}.jpg`;
  const extras = athleteExtra[slug];
  const flag = codeToFlagEmoji(athlete.country);

  return (
    <main className="athletes-page">
      <section className="athlete-detail">
        <div className="container">
          <p>
            <Link to="/athletes" className="button">
              ← Back to Athletes
            </Link>
          </p>

          <div className="athlete-detail-card">
            <div className="athlete-detail-left">
              <div className="athlete-detail-media">
                <img
                  src={imgSrc}
                  alt={athlete.name}
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0.5;
                  }}
                />
              </div>
              {extras && (
                <>
                  <div className="athlete-socials under-media">
                    {extras.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${athlete.name} on ${s.label}`}
                      >
                        <span className="social-icon" aria-hidden="true">
                          <SocialIcon name={s.icon} />
                        </span>
                        <span className="social-text">{s.label}</span>
                      </a>
                    ))}
                  </div>
                  <ul className="athlete-meta-list under-media">
                    {extras.leftMeta
                      .filter(
                        (m) =>
                          m.value &&
                          String(m.value).trim() !== "" &&
                          m.value !== "—"
                      )
                      .map((m) => (
                        <li key={m.label}>
                          <strong>{m.label}:</strong> {m.value}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
            <div className="athlete-detail-info">
              <div className="athlete-detail-head">
                <div className="athlete-flag" aria-hidden="true">
                  {flag}
                </div>
                <h1>{athlete.name}</h1>
                <p className="athlete-discipline">{athlete.discipline}</p>
              </div>

              {extras && (
                <>
                  <div className="athlete-achievements">
                    {extras.achievements.map((a) => {
                      const lines = String(a.details)
                        .split("\n")
                        .map((l) => l.trim())
                        .filter((l) => l.length > 0);
                      if (lines.length === 0) return null;
                      return (
                        <div key={a.title} className="achievement">
                          <h3>{a.title}</h3>
                          {lines.map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
