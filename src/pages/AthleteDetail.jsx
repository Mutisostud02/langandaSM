import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function toSlug(name) {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/“|”|"/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AthleteDetail() {
  const { slug } = useParams();
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

  const athlete = useMemo(
    () => {
      const blocked = new Set([
        "adam-carlen",
        "alva-selerud",
        "wilma-leidhammar",
        "tove-almqvist",
      ]);
      if (blocked.has(slug)) return undefined;
      return athletes.find((a) => toSlug(a.name) === slug);
    },
    [athletes, slug]
  );

  if (!loading && (!athlete || error)) {
    return (
      <main className="athletes-page">
        <section className="athletes">
          <div className="container">
            <p>{error ? error : "Athlete not found."}</p>
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

  if (loading || !athlete) {
    return (
      <main className="athletes-page">
        <section className="athletes">
          <div className="container">
            <p>Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  const imgSrc = withBase(athlete.image || `/athletes/${slug}.jpg`);

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
                  loading="lazy"
                  onLoad={(e) => {
                    e.currentTarget.classList.add("loaded");
                  }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0.5;
                  }}
                  className={`athlete-img ${toSlug(athlete.name) === 'april-laugh' ? 'athlete-img--april-laugh' : ''}`}
                />
              </div>
            </div>
            <div className="athlete-detail-info">
              <div className="athlete-detail-head">
                <h1>{athlete.name}</h1>
                {athlete.team && (
                  <p className="athlete-discipline">{athlete.team}</p>
                )}
              </div>

              {Array.isArray(athlete.achievements) && athlete.achievements.length > 0 && (
                <div className="athlete-achievements">
                  {athlete.achievements.map((a) => (
                    <div key={a.title} className="achievement">
                      <h3>{a.title}</h3>
                      <p>{a.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

