import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(`/athletes.json`, { cache: "no-store" });
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
    return [...athletes].sort((a, b) => a.name.localeCompare(b.name));
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
              const src = a.image || `/athletes/${slug}.jpg`;
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
                      onError={(e) => {
                        if (e.currentTarget.src !== fallbackImg) e.currentTarget.src = fallbackImg;
                      }}
                    />
                  </div>
                  <div className="athlete-meta">
                    <h2>{a.name}</h2>
                    {a.team && <p className="athlete-team">{a.team}</p>}
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

