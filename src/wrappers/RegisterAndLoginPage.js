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
    border-color: var(--astra-text);
    font-weight: 500;
    &:hover {
      color: var(--astra-text);
      background: var(--astra-white);
      border-color: var(--astra-white);
    }
  }
  .form-section {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 80px);
  }
  .form-card {
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    border-radius: 10px;
    padding: 2rem 2.5rem;
    width: 100%;
    max-width: var(--fixed-width, 420px);
    box-shadow: var(--shadow-astra, 0 20px 50px rgba(0, 0, 0, 0.4));
    transition: border-color var(--transition);
  }
  .form {
    margin: 0;
    max-width: none;
    width: 100%;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }
  .form h4 {
    color: var(--astra-text);
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    letter-spacing: var(--letter-spacing);
  }
  .form-label {
    color: var(--astra-muted);
  }
  .form-input,
  .form-textarea,
  .form-select {
    background: var(--astra-surface);
    border: 1px solid var(--astra-border);
    color: var(--astra-text);
  }
  .form-input::placeholder {
    color: var(--astra-muted);
  }
  .btn-block {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .member-text {
    text-align: center;
    color: var(--astra-muted);
    font-size: var(--small-text);
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  .member-link {
    color: var(--astra-accent);
    font-weight: 500;
    margin-left: 0.25rem;
    transition: color var(--transition);
    text-decoration: none;
    &:hover {
      color: var(--astra-white);
    }
  }
`;

export default Wrapper;
