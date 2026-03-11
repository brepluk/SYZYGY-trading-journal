import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;
    background: var(--astra-surface);
    border-right: 1px solid var(--astra-border);
    min-height: 100vh;
    position: sticky;
    top: 0;
  }

  .sidebar-inner {
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-logo {
    margin-bottom: 2rem;
    padding-left: 0.25rem;
  }

  .sidebar-logo a {
    color: var(--astra-text);
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.75rem;
    border-radius: var(--border-radius-lg);
    color: var(--astra-muted);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: var(--letter-spacing);
    text-decoration: none;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .sidebar-link:hover {
    color: var(--astra-text);
    background: var(--astra-card);
  }

  .sidebar-link.active {
    color: var(--astra-text);
    background: var(--astra-card);
  }

  .sidebar-collapse {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.65rem 0.75rem;
    margin-top: auto;
    border: none;
    border-top: 1px solid var(--astra-border);
    border-radius: var(--border-radius-lg);
    width: 100%;
    background: transparent;
    color: var(--astra-muted);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .sidebar-collapse:hover {
    color: var(--astra-text);
    background: var(--astra-card);
  }
`;

export default Wrapper;

