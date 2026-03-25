import styled from "styled-components";

const Wrapper = styled.nav`
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  border-bottom: 1px solid var(--border-color);

  .nav-center {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    width: 90vw;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .nav-title {
    justify-self: center;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    margin: 0;
    text-transform: capitalize;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-self: end;
  }

  @media (max-width: 768px) {
    .nav-center {
      gap: 0.35rem;
      grid-template-columns: auto 1fr;
    }

    .nav-title {
      display: none;
    }

    .nav-right {
      grid-column: 2;
    }

    .date-filter-select {
      min-width: 0;
      width: 5.5rem;
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
    }

    .profile-link span.profile-name {
      display: none;
    }

    .toggle-btn {
      font-size: 1.45rem;
    }

    .profile-link svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  .toggle-btn {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: color var(--transition);
  }

  .toggle-btn:hover {
    color: var(--accent-color);
  }

  .date-filter {
    display: flex;
    align-items: center;
  }

  .date-filter-select {
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--card-background);
    color: var(--text-color);
    font-size: 0.9rem;
    min-width: 140px;
    cursor: pointer;
  }

  .date-filter-select:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  .profile-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    color: var(--text-secondary-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition:
      border-color var(--transition),
      color var(--transition),
      background var(--transition);
  }

  .profile-link:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  @media (min-width: 992px) {
    .nav-center {
      width: 90%;
    }
  }
`;

export default Wrapper;
