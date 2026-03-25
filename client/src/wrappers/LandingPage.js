import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--background-color);

  .nav {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    border-bottom: 1px solid var(--border-color);
  }

  @media (max-width: 640px) {
    .nav {
      flex-direction: column;
      align-items: stretch;
      padding: 1rem 1rem;
      gap: 0.875rem;
    }
    .nav-actions {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.35rem;
    }
    .nav-link,
    .nav-link-primary {
      text-align: center;
      justify-content: center;
      display: inline-flex;
      align-items: center;
    }
    .nav-link-label--long {
      display: none;
    }
    .nav-link-label--short {
      display: inline;
    }
  }

  @media (min-width: 641px) {
    .nav-link-label--short {
      display: none;
    }
    .nav-link-label--long {
      display: inline;
    }
  }

  .logo.logo-wordmark,
  .logo-wordmark {
    display: inline-flex;
    align-items: center;
    color: var(--logo-color);
    text-decoration: none;
    font-size: 1.125rem;
    &:hover {
      color: var(--accent-color);
    }
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .nav-link {
    color: var(--text-secondary-color);
    text-decoration: none;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    transition:
      color var(--transition),
      border-color var(--transition),
      background var(--transition);
    &:hover {
      color: var(--text-color);
      border-color: var(--accent-color);
      background: var(--background-secondary-color);
    }
  }
  .nav-link-demo {
    color: var(--text-color);
    border-color: color-mix(in srgb, var(--accent-color) 45%, var(--border-color));
    background: color-mix(
      in srgb,
      var(--accent-color) 12%,
      var(--background-secondary-color)
    );
    font-weight: 500;
    &:hover {
      border-color: var(--accent-color);
      background: color-mix(
        in srgb,
        var(--accent-color) 20%,
        var(--background-secondary-color)
      );
    }
  }
  .nav-link-primary {
    color: var(--btn-color);
    background: var(--btn-bg);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid var(--btn-bg);
    border-radius: var(--border-radius-lg);
    transition:
      color var(--transition),
      background var(--transition),
      border-color var(--transition);
    &:hover {
      color: var(--btn-color);
      background: var(--accent-color);
      border-color: var(--accent-color);
    }
  }

  @media (max-width: 640px) {
    .nav-link,
    .nav-link-primary {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.35rem 0.35rem;
      min-height: 2rem;
      line-height: 1.15;
    }
  }

  .section {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }
  .about-section {
    padding-top: 4rem;
    text-align: center;
  }
  .about-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    color: var(--text-color);
    margin-bottom: 0.85rem;
    line-height: 1.1;
  }
  .about-byline {
    font-size: clamp(0.78rem, 1.6vw, 0.92rem);
    font-weight: 500;
    letter-spacing: 0.14em;
    color: var(--text-secondary-color);
  }
  .about-byline-link {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid
      color-mix(in srgb, var(--text-secondary-color) 35%, transparent);
    transition:
      color var(--transition),
      border-color var(--transition);
  }
  .about-byline-link:hover {
    color: var(--accent-color);
    border-bottom-color: color-mix(
      in srgb,
      var(--accent-color) 50%,
      transparent
    );
  }
  .about-title .wordmark-syzygy--hero {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--text-color);
  }
  .about-title .wordmark-syzygy--hero .syzygy-y {
    animation-name: syzygy-y-pulse-hero;
  }
  @keyframes syzygy-y-pulse-hero {
    0%,
    100% {
      opacity: 1;
      text-shadow:
        0 0 10px color-mix(in srgb, var(--text-color) 45%, transparent),
        0 0 24px color-mix(in srgb, var(--accent-color) 35%, transparent);
    }
    50% {
      opacity: 0.9;
      text-shadow:
        0 0 18px color-mix(in srgb, var(--text-color) 65%, transparent),
        0 0 36px color-mix(in srgb, var(--accent-color) 45%, transparent);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .about-title .wordmark-syzygy--hero .syzygy-y {
      animation: none;
      text-shadow: none;
    }
  }
  .about-pronounce {
    color: var(--text-secondary-color);
    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
    line-height: 1.55;
    max-width: 580px;
    margin: 0 auto 1.75rem;
  }
  .about-phonetic {
    font-weight: 600;
    font-style: normal;
    letter-spacing: 0.04em;
    color: var(--accent-color);
  }
  .about-emdash {
    opacity: 0.9;
  }
  .about-celestial-tag {
    font-style: italic;
    font-weight: 500;
    color: var(--text-secondary-color);
  }
  .about-lede {
    color: var(--text-color);
    font-size: clamp(1rem, 2.2vw, 1.15rem);
    line-height: 1.55;
    font-weight: 500;
    max-width: 560px;
    margin: 0 auto 1.75rem;
  }
  .about-body {
    color: var(--accent-color);
    font-size: 1.05rem;
    line-height: 1.8;
    max-width: 640px;
    margin: 0 auto;
  }
  .about-body-emphasis {
    font-style: italic;
    font-weight: 600;
    color: var(--text-color);
  }
  .about-body-strong {
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--text-color);
  }

  .tools-title {
    color: var(--text-color);
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
  }
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
    margin-bottom: 3rem;
  }
  .tool-card {
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    transition:
      border-color var(--transition),
      box-shadow var(--transition);
    &:hover {
      border-color: var(--accent-color);
      box-shadow: var(--shadow-3);
    }
  }
  .tool-icon {
    display: block;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    opacity: 0.9;
  }
  .tool-name {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }
  .tool-desc {
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    line-height: 1.5;
  }

  .dashboard-section {
    padding-top: 1rem;
    padding-bottom: 4rem;
  }
  .dashboard-title {
    color: var(--text-color);
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .dashboard-frame {
    position: relative;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0 0;
  }
  .carousel-track {
    position: relative;
    width: 100%;
    min-height: min(70vh, 600px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel-slide {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.98);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
    pointer-events: none;
  }
  .carousel-slide.active {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }
  .carousel-image {
    max-width: 100%;
    max-height: min(68vh, 580px);
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center top;
    display: block;
  }
  .carousel-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0;
    background: var(--text-secondary-color);
    opacity: 0.5;
    transition:
      opacity var(--transition),
      background var(--transition),
      transform var(--transition);
  }
  .carousel-dot:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  .carousel-dot.active {
    background: var(--text-color);
    opacity: 1;
  }
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--background-secondary-color);
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition:
      color var(--transition),
      border-color var(--transition),
      background var(--transition);
    z-index: 2;
    &:hover {
      border-color: var(--accent-color);
      background: var(--border-color);
      color: var(--text-color);
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  .carousel-arrow-prev {
    left: 0.75rem;
  }
  .carousel-arrow-next {
    right: 0.75rem;
  }

  @media (max-width: 640px) {
    .logo.logo-wordmark,
    .logo-wordmark {
      font-size: 1rem;
      gap: 0.28rem;
    }
    .logo-wordmark .logo-wordmark-icon {
      font-size: 1.05rem;
    }
    .section {
      padding: 2.25rem 1.25rem;
    }
    .about-section {
      padding-top: 2.5rem;
    }
    .about-title .wordmark-syzygy--hero {
      font-size: clamp(1.5rem, 7vw, 1.85rem);
    }
    .about-byline {
      font-size: 0.72rem;
    }
    .about-pronounce {
      font-size: clamp(0.82rem, 3.2vw, 0.92rem);
      margin-bottom: 1.35rem;
    }
    .about-lede {
      font-size: clamp(0.88rem, 3.5vw, 0.98rem);
      margin-bottom: 1.35rem;
    }
    .about-body {
      font-size: 0.9375rem;
      line-height: 1.65;
    }
    .tools-title,
    .dashboard-title {
      font-size: clamp(1.2rem, 4.5vw, 1.45rem);
      margin-bottom: 1.5rem;
    }
    .tool-name {
      font-size: 1rem;
    }
    .tool-desc {
      font-size: 0.8125rem;
    }
  }
`;

export default Wrapper;
