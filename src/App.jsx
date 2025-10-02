import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Athletes from "./pages/Athletes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AthleteDetail from "./pages/AthleteDetail";
import PerformanceMonitor from "./components/PerformanceMonitor";
import Services from "./pages/Services";

function App() {
  const [athletesHome, setAthletesHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function withBase(path) {
    const base = (import.meta?.env?.BASE_URL || "/").replace(/\/$/, "/");
    return `${base}${String(path || "").replace(/^\//, "")}`;
  }

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(withBase(`/athletes.json`), { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
        const json = await res.json();
        if (isMounted) setAthletesHome(Array.isArray(json) ? json : []);
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

  // Helper: close mobile nav and scroll to top when a nav item is selected
  function closeMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked) navToggle.checked = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Use head images for the home slider
  const headSlides = [
    "/athletes/claudio-schwarz-head.jpg",
    "/athletes/girish-sangammanavar-head.jpg",
    "/athletes/tsimur-asayonak-head.jpg",
  ];
  return (
    <>
      <PerformanceMonitor />
      <header className="site-header">
        <div className="container header-inner">
          <Link className="logo" to="/">
            <img
              src="/logo/android-chrome-512x512.png"
              alt="Laganda Sports Management Logo"
              className="logo-img"
              loading="lazy"
              width="56"
              height="56"
            />
            <span className="logo-text">Laganda Sports Management</span>
          </Link>
          <div className="nav-wrapper">
            <input
              id="nav-toggle"
              type="checkbox"
              className="nav-toggle"
              aria-label="Toggle navigation"
            />
            <label className="hamburger" htmlFor="nav-toggle" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <nav className="main-nav" aria-label="Primary">
              <ul>
                <li>
                  <Link to="/" onClick={closeMobileNav}>Home</Link>
                </li>
                <li>
                  <Link to="/services" onClick={closeMobileNav}>Services</Link>
                </li>
                <li>
                  <Link to="/about" onClick={closeMobileNav}>About us</Link>
                </li>
                <li>
                  <Link to="/athletes" onClick={closeMobileNav}>Athletes</Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeMobileNav}>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              {/* Intro hero header */}
              <section id="home-hero" className="home-hero">
                <div className="container">
                  <h1>Laganda Sports Management</h1>
                  <p className="hero-lead">
                    We represent world-class athletes with personal, end-to-end management —
                    from competition planning and brand partnerships to media and logistics.
                  </p>
                  <div className="actions" style={{ marginTop: '10px' }}>
                    <Link className="button button--primary" to="/about">About Us</Link>
                  </div>
                </div>
              </section>

              {/* Key stats / values strip */}
              <section className="home-stats">
                <div className="container">
                  <div className="home-stats-grid">
                    <div className="stat-card">
                      <div className="stat-value">2004</div>
                      <div className="stat-label">Founded</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">Global</div>
                      <div className="stat-label">Competition Network</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">Elite</div>
                      <div className="stat-label">Olympic & World Medalists</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">Malmö</div>
                      <div className="stat-label">Sweden HQ</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Athlete slider */}
              <section id="start" className="hero home-slider">
                <div className="container">
                  <h1 className="visually-hidden">Laganda Sports Management</h1>
                  <div className="hero-carousel">
                    <Swiper
                      modules={[Autoplay, Navigation, Pagination]}
                      spaceBetween={0}
                      slidesPerView={1}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      loop={true}
                    >
                      {(headSlides.length ? headSlides : [fallbackImg]).map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <article
                            className="hero-slide hero-bg"
                            style={{
                              backgroundImage: `url(${img || fallbackImg})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center 15%",
                            }}
                          >
                            <div className="hero-overlay">
                              <h2>{["Elite Sports Management", "Global Network", "Personal Representation", "Long-term Partnerships"][idx % 4]}</h2>
                              <p>Dedicated to elevating performance on and off the field.</p>
                            </div>
                          </article>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </section>

              {/* Athletes CTA without flanking images */}
              <section className="home-athletes-cta">
                <div className="container">
                  <div className="home-cta-row">
                    <h2>Athletes</h2>
                    <p className="section-subtitle">Meet the athletes we proudly represent.</p>
                    <div className="actions">
                      <Link className="button button--primary" to="/athletes">View Athletes</Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Compact Services strip */}
              <section className="home-services">
                <div className="container">
                  <div className="home-services-grid">
                    <article className="home-service">
                      <h3>Event Placement</h3>
                      <p>Strategic meet selection and scheduling to maximize performance and exposure.</p>
                    </article>
                    <article className="home-service">
                      <h3>Sponsorships</h3>
                      <p>Brand alignment, negotiations, and long-term partnerships with leading companies.</p>
                    </article>
                    <article className="home-service">
                      <h3>Media & Support</h3>
                      <p>Media coordination, medical/performance resources, and global travel logistics.</p>
                    </article>
                  </div>
                  <div className="actions">
                    <Link className="button button--primary" to="/services">Explore Services</Link>
                  </div>
                </div>
              </section>

              {/* Contact and image cards section removed per request */}
            </main>
          }
        />
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/athletes/:slug" element={<AthleteDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-col footer-company">
              <p className="footer-title">Laganda Sports Management</p>
              <address>
                Eric Perssons väg 5<br />
                217 62 Malmö, Sweden
              </address>
            </div>

            {/* spacer to keep 3-column grid and push contact to right */}
            <div className="footer-col" aria-hidden="true"></div>

            <div className="footer-col footer-contact">
              <p className="footer-title">Contact</p>
              <p>Tel: <a href="tel:+46402086122">+46 40 208 61 22</a></p>
              <p>Email: <a href="mailto:info@lagandasportsmanagement.com">info@lagandasportsmanagement.com</a></p>
            </div>
          </div>
          <p className="footer-copy">© Copyright 2015. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
