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
              <h1>Laganda Sports Management</h1>
              <h2>About us</h2>
              <p>
                Laganda Sports Management is a premium international management company
                based in Malmö, Sweden.
              </p>
              <p>
                The CEO, Robert Hafredal, together with the founding team has more than 10
                years experience in sports management.
              </p>
              <p>
                We specialize in individual athletes and have worked with numerous
                Olympic and World Champions thru out the years. Our service include
                match-making, personal sponsorships, media coordination, medical
                experts advice, travel coordination and personal brand building.
              </p>
            </div>
            <div className="about-media">
              <img
                src={withBase('/athletes/tsimur-asayonak-head.jpg')}
                alt="Athlete head visual"
                loading="lazy"
                className="about-media-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
