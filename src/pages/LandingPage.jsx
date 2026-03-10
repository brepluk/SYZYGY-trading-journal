import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClipboard, FiBarChart2, FiBook } from "react-icons/fi";
import Logo from "../components/Logo";
import Starfield from "../components/Starfield";
import Wrapper from "../wrappers/LandingPage";
import SS1 from "../assets/images/SS1.PNG";
import SS2 from "../assets/images/SS2.PNG";
import SS3 from "../assets/images/SS3.PNG";

const SCREENSHOTS = [
  { src: SS1, alt: "Astra — trade logging" },
  { src: SS2, alt: "Astra — analytics" },
  { src: SS3, alt: "Astra — journal" },
];
const AUTO_ADVANCE_MS = 4500;

const LandingPage = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % SCREENSHOTS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const goPrev = () =>
    setCarouselIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  const goNext = () => setCarouselIndex((i) => (i + 1) % SCREENSHOTS.length);

  const tools = [
    {
      Icon: FiClipboard,
      name: "Trade logging",
      desc: "Log entries, pairs, and outcomes in one place with tags and notes.",
    },
    {
      Icon: FiBarChart2,
      name: "Analytics & stats",
      desc: "Win rate, P&L curves, and performance breakdowns at a glance.",
    },
    {
      Icon: FiBook,
      name: "Journal & review",
      desc: "Reflect on trades and build a searchable journal over time.",
    },
  ];

  return (
    <Wrapper>
      <Starfield count={80} />
      <nav className="nav">
        <Logo className="logo" />
        <div className="nav-actions">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link nav-link-primary">
            Sign up
          </Link>
        </div>
      </nav>

      <section className="section about-section">
        <h1 className="about-title">Astra</h1>
        <p className="about-sub">
          by FXTech — Your trading journal, in one place
        </p>
        <p className="about-body">
          Track every trade, review your decisions, and sharpen your edge with
          clear analytics and a simple journal built for serious traders.
        </p>
      </section>

      <section className="section">
        <h2 className="tools-title">What's inside</h2>
        <div className="tools-grid">
          {tools.map((t) => {
            const Icon = t.Icon;
            return (
              <div key={t.name} className="tool-card">
                <span className="tool-icon">
                  <Icon />
                </span>
                <h3 className="tool-name">{t.name}</h3>
                <p className="tool-desc">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section dashboard-section">
        <h2 className="dashboard-title">The platform</h2>
        <div className="dashboard-frame">
          <div className="carousel-track">
            <button
              type="button"
              className="carousel-arrow carousel-arrow-prev"
              onClick={goPrev}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-next"
              onClick={goNext}
              aria-label="Next screenshot"
            >
              ›
            </button>
            {SCREENSHOTS.map((shot, i) => (
              <div
                key={i}
                className={`carousel-slide ${i === carouselIndex ? "active" : ""}`}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="carousel-image"
                  loading={i === carouselIndex ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className="carousel-nav">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === carouselIndex ? "active" : ""}`}
                onClick={() => setCarouselIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default LandingPage;
