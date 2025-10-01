export default function About() {
  function withBase(path) {
    const base = (import.meta?.env?.BASE_URL || "/").replace(/\/$/, "/");
    return `${base}${String(path).replace(/^\//, "")}`;
  }

  return (
    <main className="about-page">
      <section className="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-text">
              <h1>About Us – Laganda Sports Management</h1>
              <p>
                We’re a full-service sports agency based in Malmö, Sweden. Our team supports athletes at every stage — from first contracts to world championships — with smart strategy, reliable execution, and a long-term plan for life on and off the field.
              </p>

              <div className="about-highlights">
                <h2>Why athletes choose Laganda</h2>
                <ul className="about-checklist">
                  <li><strong>End-to-end representation:</strong> Contracts, scheduling, media, logistics — handled.</li>
                  <li><strong>Brand & partnerships:</strong> Sponsorship strategy, negotiations, and long-term deals.</li>
                  <li><strong>Performance ecosystem:</strong> Access to trusted performance, medical, and travel support.</li>
                  <li><strong>Personalized roadmaps:</strong> Tailored career plans for every season and milestone.</li>
                </ul>
              </div>

              {/* Fill vacated space with an image */}
              <img
                src={withBase('/athletes/aboutushead.jpg')}
                alt="Laganda team and athletes"
                loading="lazy"
                className="about-media-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />

              <div className="actions about-actions" style={{ marginTop: '16px' }}>
                <a className="button button--primary" href="/contact">Start a conversation</a>
                <a className="button button--outline" href="/athletes">View athletes</a>
              </div>
            </div>
            <div className="about-media">
              <img
                src={withBase('/athletes/tsimur-asayonak-head.jpg')}
                alt="Athlete head visual"
                loading="lazy"
                className="about-media-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              {/* Moved content under right-side image */}
              <div className="about-below">
                <h2 style={{ marginTop: '14px' }}>What we do</h2>
                <ul className="about-list">
                  <li>Competition planning and event placement across top global meets</li>
                  <li>Brand building, social media positioning, and press coordination</li>
                  <li>Commercial partnerships and endorsement strategy</li>
                  <li>Long-term career planning with clear, measurable goals</li>
                </ul>

                <h2 style={{ marginTop: '14px' }}>How we work</h2>
                <ol className="about-steps">
                  <li><strong>Listen:</strong> Understand your goals, schedule, and support needs.</li>
                  <li><strong>Plan:</strong> Build a season roadmap with competitions and media moments.</li>
                  <li><strong>Execute:</strong> Handle logistics, negotiations, and day-to-day coordination.</li>
                  <li><strong>Grow:</strong> Review results, adapt, and scale opportunities each season.</li>
                </ol>

                <p style={{ marginTop: '10px' }}>
                  At Laganda, team spirit — <em>"laganda"</em> — is more than a name. It’s how we work: collaborative, transparent, and focused on quality in every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
