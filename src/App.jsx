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

function App() {
  const [athletesHome, setAthletesHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(`/athletes.json`, { cache: "no-store" });
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
  return (
    <>
      <PerformanceMonitor />
      <header className="site-header">
        <div className="container header-inner">
          <Link className="logo" to="/">
            <img
              src="/logo/android-chrome-192x192.png"
              alt="Laganda Sports Management Logo"
              className="logo-img"
              loading="lazy"
              width="40"
              height="40"
            />
            <span className="logo-text">Laganda Sports Management</span>
          </Link>
          <input
            id="nav-toggle"
            type="checkbox"
            className="nav-toggle"
            aria-label="Toggle navigation"
          />
          <nav className="main-nav" aria-label="Primary">
            <ul>
              <li>
                <Link to="/">Start</Link>
              </li>
              <li>
                <Link to="/athletes">Athletes</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <label className="hamburger" htmlFor="nav-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section id="start" className="hero">
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
                      {(athletesHome.slice(0, 4).length
                        ? athletesHome.slice(0, 4)
                        : []).map((a) => {
                        const slug = toSlug(a.name);
                        return (
                          <SwiperSlide key={a.name}>
                            <article
                              className="hero-slide hero-bg"
                              style={{
                                backgroundImage: `url(${a.image || fallbackImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div className="hero-overlay">
                                <h2>{a.name}</h2>
                                {a.team && <p>{a.team}</p>}
                              </div>
                            </article>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </section>

              <section id="athletes" className="athletes">
                <div className="container">
                  <div className="athletes-grid">
                    {loading && <p>Loading athletes...</p>}
                    {error && !loading && (
                      <p className="error" role="alert">{error}</p>
                    )}
                    {athletesHome.slice(0, 4).map((a) => {
                      const slug = toSlug(a.name);
                      const src = a.image || fallbackImg;
                      return (
                        <Link key={a.name} to={`/athletes/${slug}`} className="athlete-card--row">
                          <div className="athlete-media">
                            <img
                              src={src}
                              alt={a.name}
                              onError={(e) => {
                                e.currentTarget.src = fallbackImg;
                              }}
                            />
                          </div>
                          <div className="athlete-info">
                            <h2>{a.name}</h2>
                            {a.team && (
                              <p className="athlete-discipline">{a.team}</p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="actions">
                    <Link className="button" to="/athletes">
                      ALL ATHLETES
                    </Link>
                  </div>
                </div>
              </section>

              <section id="contact" className="contact">
                <div className="container">
                  <h2>Contact</h2>
                  <div className="contact-grid">
                    <div>
                      <h3>Laganda Sports Management</h3>
                    </div>
                  </div>
                </div>
              </section>

              <section className="image-cards">
                <div className="container">
                  <div className="cards-grid">
                    <div className="director-card">
                      <div className="director-media">
                        <img
                          src="/jwdirector.jpg"
                          alt="Laganda Sports Management Director"
                        />
                      </div>
                      <div className="card-content">
                        <h3>Robert Hafredal</h3>
                        <p>Chief Executive Officer</p>
                        <p>
                          <a href="tel:+46402086122">Tel : - +46 40 208 61 22</a>
                        </p>
                        <p>
                          <a href="mailto:info@lagandasportsmanagement.com">
                            info@lagandasportsmanagement.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="arena-card">
                      <img src="/arena.jpg" alt="JW Sport Arena" />
                      <div className="card-content">
                        <h3>JW Sport Arena</h3>
                        <p>State-of-the-art training facility</p>
                        <p>Professional equipment and coaching</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          }
        />
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/athletes/:slug" element={<AthleteDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-address">
            <p>Laganda Sports Management</p>
            <p>Eric Perssons väg 5, 217 62 Malmö, Sweden</p>
            <p>Tel : - +46 40 208 61 22</p>
            <p>CEO - Robert Hafredal</p>
            <p>info@lagandasportsmanagement.com</p>
          </div>
          <p className="footer-copy">© Copyright 2023. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
