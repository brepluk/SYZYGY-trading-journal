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
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem;
    }
    .nav-link,
    .nav-link-primary {
      font-size: 0.8125rem;
      padding: 0.55rem 0.4rem;
      text-align: center;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      line-height: 1.2;
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
    transition: color var(--transition), border-color var(--transition),
      background var(--transition);
    &:hover {
      color: var(--text-color);
      border-color: var(--accent-color);
      background: var(--background-secondary-color);
    }
  }
  .nav-link-primary {
    color: var(--btn-color);
    background: var(--btn-bg);
    border-color: var(--btn-bg);
    font-weight: 500;
    &:hover {
      color: var(--btn-color);
      background: var(--accent-color);
      border-color: var(--accent-color);
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
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 2rem 2.5rem;
    width: 100%;
    max-width: var(--fixed-width, 420px);
    box-shadow: var(--shadow-2);
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
    color: var(--text-color);
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    letter-spacing: var(--letter-spacing);
  }
  .form-label {
    color: var(--text-secondary-color);
  }
  .form-input,
  .form-textarea,
  .form-select {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  .form-input::placeholder {
    color: var(--text-secondary-color);
  }
  .btn-block {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .btn-explore {
    margin-top: -0.25rem;
    color: var(--text-color);
    background: transparent;
    border: 1px solid var(--border-color);
  }
  .btn-explore:hover {
    color: var(--text-color);
    border-color: var(--accent-color);
    background: var(--background-color);
  }
  .member-text {
    text-align: center;
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  .member-link {
    color: var(--accent-color);
    font-weight: 500;
    margin-left: 0.25rem;
    transition: color var(--transition);
    text-decoration: none;
    &:hover {
      color: var(--text-color);
    }
  }
`;

export default Wrapper;
