import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function withBase(path) {
    const base = (import.meta?.env?.BASE_URL || "/").replace(/\/$/, "/");
    return `${base}${String(path).replace(/^\//, "")}`;
  }


  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(withBase(`/athletes.json`), { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
        const json = await res.json();
        if (isMounted) setAthletes(Array.isArray(json) ? json : []);
      } catch (e) {
        if (isMounted) setError(e.message || "Failed to load athletes");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  function toSlug(name) {
    return name
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/“|”|"/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const fallbackImg =
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop";

  const filtered = useMemo(() => {
    const block = new Set([
      "adam-carlen",
      "alva-selerud",
      "wilma-leidhammar",
      "tove-almqvist",
    ]);
    // Preserve original order from JSON (no alphabetical sort) so entries can be interleaved.
    return [...athletes].filter((a) => !block.has(toSlug(a.name)));
  }, [athletes]);

  return (
    <main className="athletes-page">
      <section className="athletes">
        <div className="container">
          <h1 className="page-title">Athletes</h1>

          {/* Toolbar removed per request (no letter filter) */}

          {loading && <p>Loading athletes...</p>}
          {error && !loading && (
            <p className="error" role="alert">{error}</p>
          )}

          <div className="athletes-grid athletes-grid--cards">
            {filtered.map((a) => {
              const slug = toSlug(a.name);
              const raw = a.image || `/athletes/${slug}.jpg`;
              const src = withBase(raw);
              return (
                <Link
                  key={a.name}
                  to={`/athletes/${slug}`}
                  className="athlete-card athlete-card--grid"
                >
                  <div className="athlete-photo">
                    <img
                      src={src}
                      alt={a.name}
                      loading="lazy"
                      onLoad={(e) => {
                        e.currentTarget.classList.add("loaded");
                      }}
                      onError={(e) => {
                        if (e.currentTarget.src !== fallbackImg) e.currentTarget.src = fallbackImg;
                      }}
                      className={`athlete-img ${slug === "april-laugh" ? "athlete-img--april-laugh" : ""}`}
                    />
                  </div>
                  <div className="athlete-meta">
                    <h2>{a.name}</h2>
                    {a.team && <p className="athlete-team">{a.team}</p>}
                    {Array.isArray(a.achievements) && a.achievements.length > 0 && (
                      <div className="athlete-achievements-card">
                        {a.achievements.slice(0, 3).map((ach) => (
                          <div key={ach.title} className="achievement-line">
                            <strong>{ach.title}:</strong> <span>{ach.details}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
            {!loading && !error && filtered.length === 0 && (
              <p className="muted">No athletes match your filters.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


