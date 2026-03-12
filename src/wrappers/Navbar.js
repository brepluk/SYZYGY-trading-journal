import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--astra-surface);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .toggle-btn {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    color: var(--astra-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: color var(--transition);
  }
  .toggle-btn:hover {
    color: var(--astra-accent);
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--astra-text);
    letter-spacing: var(--letter-spacing);
    margin: 0;
    text-transform: capitalize;
  }

  .date-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .date-filter-label {
    font-size: 0.85rem;
    color: var(--astra-muted);
  }

  .date-filter-select {
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--astra-border);
    background: var(--astra-card);
    color: var(--astra-text);
    font-size: 0.9rem;
    min-width: 140px;
    cursor: pointer;
  }

  .date-filter-select:focus {
    outline: none;
    border-color: var(--astra-accent);
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .profile-link {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--astra-muted);
    text-decoration: none;
    transition: border-color var(--transition), color var(--transition);
  }
  .profile-link:hover {
    border-color: var(--astra-accent);
    color: var(--astra-accent);
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    z-index: 10;

    .nav-center {
      width: 90%;
    }
  }
`;

export default Wrapper;
