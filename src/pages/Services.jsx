import SEO from "../components/SEO";

export default function Services() {
  const pageTitle = "Services - Laganda Sports Management";
  const pageDesc =
    "End-to-end athlete management: event placement, sponsorships, media, medical support, travel logistics, and brand building.";

  function withBase(path) {
    const base = (import.meta?.env?.BASE_URL || "/").replace(/\/$/, "/");
    return `${base}${String(path).replace(/^\//, "")}`;
  }

  return (
    <main className="services-page">
      {/* Hero header with head image */}
      <section className="services-hero">
        <div
          className="services-hero-bg"
          style={{
            backgroundImage: `url(${withBase('/athletes/girish-sangammanavar-head.jpg')})`,
          }}
        >
          <div className="services-hero-overlay">
            <div className="container">
              <h1>Services</h1>
              <p className="services-hero-sub">Elite, personal, and global. We manage the details so athletes can focus on performance.</p>
              <div className="section-actions">
                <a className="button button--primary" href="/contact">Talk to us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords="athlete services, sports management services, sponsorships, media, logistics, brand building"
        image="/logo/android-chrome-512x512.png"
        url="https://lagandasportsmanagement.com/services"
      />

      <section className="services">
        <div className="container">
          {/* Removed duplicate header (title, subtitle, CTA) per request */}

          <div className="services-grid">
            <article className="service-card">
              <h2>Match-making & Event Placement</h2>
              <p>
                Strategic competition planning and meet placement with world-class organizers to
                maximize performance opportunities and exposure.
              </p>
            </article>

            <article className="service-card">
              <h2>Personal Sponsorships</h2>
              <p>
                Sponsorship strategy, brand alignment, negotiation, and contract management with
                leading global partners.
              </p>
            </article>

            <article className="service-card">
              <h2>Media & Communications</h2>
              <p>
                Media coordination, interview scheduling, content guidance, and press support for an
                authentic public presence.
              </p>
            </article>

            <article className="service-card">
              <h2>Medical & Performance Support</h2>
              <p>
                Access to trusted medical experts, performance specialists, and rehabilitation
                resources tailored to each athlete.
              </p>
            </article>

            <article className="service-card">
              <h2>Travel & Logistics</h2>
              <p>
                Efficient travel planning and on-the-road coordination for global competition
                schedules.
              </p>
            </article>

            <article className="service-card">
              <h2>Personal Brand Building</h2>
              <p>
                Long-term brand development, digital presence, and partnership activations to grow
                athlete market value.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
