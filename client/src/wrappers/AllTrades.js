import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 1rem max(1.5rem, env(safe-area-inset-bottom, 0px));

  .search-form-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-2);
    padding: 1.25rem 1.35rem 1.35rem;
    margin-bottom: 1.25rem;
  }

  .search-form-title {
    color: var(--text-secondary-color);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .search-form-center {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 0.75rem 1rem;
    align-items: end;
  }

  .search-form-center .form-row {
    margin-bottom: 0;
  }

  .search-form-center .form-row--search {
    grid-column: 1 / -1;
  }

  @media (min-width: 48rem) {
    .search-form-center .form-row--search {
      grid-column: span 2;
    }
  }

  .search-form-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    grid-column: 1 / -1;
    margin-top: 0.25rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
  }

  .search-reset-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 35px;
    padding: 0 1rem;
    font-size: var(--small-text);
    font-weight: 500;
    color: var(--text-secondary-color);
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    text-decoration: none;
    transition:
      color var(--transition),
      border-color var(--transition),
      background var(--transition);
  }

  .search-reset-btn:hover {
    color: var(--text-color);
    border-color: var(--accent-color);
    background: color-mix(
      in srgb,
      var(--accent-color) 8%,
      var(--background-secondary-color)
    );
  }
`;

export default Wrapper;
