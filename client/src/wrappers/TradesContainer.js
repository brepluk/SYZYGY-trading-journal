import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 1rem max(1.5rem, env(safe-area-inset-bottom, 0px));

  .trades-count {
    font-size: var(--small-text);
    font-weight: 600;
    color: var(--text-secondary-color);
    margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
  }

  .trades-table {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-2);
    overflow-x: auto;
  }

  .trades-grid {
    display: grid;
    grid-template-columns:
      minmax(5rem, 1.1fr)
      minmax(4.75rem, 1fr)
      minmax(5rem, 1fr)
      minmax(4.5rem, 1fr)
      minmax(4.5rem, 1fr)
      minmax(7.5rem, 1fr)
      minmax(8.75rem, 1.1fr)
      minmax(6.5rem, 1.15fr)
      minmax(5.5rem, 1fr)
      minmax(4.75rem, 0.9fr)
      minmax(3.5rem, 3.75rem)
      minmax(4.75rem, auto);
    gap: 0.65rem 1rem;
    align-items: center;
    padding: 0.65rem 1rem;
    /* Wide enough for 12 columns; horizontal scroll on smaller viewports */
    min-width: min(100%, 82rem);
  }

  .trades-header {
    border-bottom: 1px solid var(--border-color);
    background: color-mix(
      in srgb,
      var(--text-color) 4%,
      var(--card-background)
    );
  }

  .trades-header span {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
    white-space: nowrap;
  }

  .trades-header .trades-col-actions {
    text-align: right;
  }

  .trades {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 40rem) {
    padding-left: max(1rem, env(safe-area-inset-left, 0px));
    padding-right: max(1rem, env(safe-area-inset-right, 0px));

    .trades-table {
      overflow-x: visible;
      border: none;
      box-shadow: none;
      background: transparent;
    }

    .trades-header {
      display: none;
    }

    .trades {
      gap: 0.75rem;
    }

    .trades-table:has(.trades-empty) {
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      background: var(--background-secondary-color);
      box-shadow: var(--shadow-1);
    }
  }

  .trades-empty {
    margin: 0;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
  }
`;

export default Wrapper;
