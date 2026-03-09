import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--astra-bg);

  .nav {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    border-bottom: 1px solid var(--astra-border);
  }
  .logo {
    display: flex;
    align-items: center;
    color: var(--astra-text);
    text-decoration: none;
    &:hover {
      color: var(--astra-white);
    }
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .nav-link {
    color: var(--astra-muted);
    text-decoration: none;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--astra-border);
    border-radius: var(--border-radius-lg);
    transition: color var(--transition), border-color var(--transition),
      background var(--transition);
    &:hover {
      color: var(--astra-text);
      border-color: var(--astra-muted);
      background: rgba(255, 255, 255, 0.03);
    }
  }
  .nav-link-primary {
    color: var(--astra-text-inverse);
    background: var(--astra-text);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid var(--astra-text);
    border-radius: var(--border-radius-lg);
    transition: color var(--transition), background var(--transition),
      border-color var(--transition);
    &:hover {
      color: var(--astra-text);
      background: var(--astra-white);
      border-color: var(--astra-white);
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
    color: var(--astra-text);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: var(--letter-spacing);
    margin-bottom: 1rem;
  }
  .about-sub {
    color: var(--astra-muted);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .about-body {
    color: var(--astra-accent);
    font-size: 1.05rem;
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto;
  }

  .tools-title {
    color: var(--astra-text);
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
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    border-radius: 10px;
    padding: 1.5rem;
    transition: border-color var(--transition), box-shadow var(--transition);
    &:hover {
      border-color: var(--astra-muted);
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
    color: var(--astra-text);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }
  .tool-desc {
    color: var(--astra-muted);
    font-size: var(--small-text);
    line-height: 1.5;
  }

  .dashboard-section {
    padding-top: 1rem;
    padding-bottom: 4rem;
  }
  .dashboard-title {
    color: var(--astra-text);
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
    transition: opacity 0.5s ease, transform 0.5s ease;
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
    background: var(--astra-muted);
    opacity: 0.5;
    transition: opacity var(--transition), background var(--transition),
      transform var(--transition);
  }
  .carousel-dot:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  .carousel-dot.active {
    background: var(--astra-text);
    opacity: 1;
  }
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--astra-border);
    background: var(--astra-surface);
    color: var(--astra-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: color var(--transition), border-color var(--transition),
      background var(--transition);
    z-index: 2;
    &:hover {
      border-color: var(--astra-muted);
      background: rgba(255, 255, 255, 0.06);
      color: var(--astra-white);
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
`;

export default Wrapper;
