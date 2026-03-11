import styled from "styled-components";

const Wrapper = styled.header`
  background: var(--astra-surface);
  border-bottom: 1px solid var(--astra-border);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 10;

  .navbar-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--astra-text);
    letter-spacing: var(--letter-spacing);
    margin: 0;
    flex-shrink: 0;
  }

  .navbar-filters {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1;
    min-width: 0;
  }

  .navbar-filter-label {
    font-size: 0.8rem;
    color: var(--astra-muted);
  }

  .navbar-filter-select {
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--astra-border);
    background: var(--astra-card);
    color: var(--astra-text);
    font-size: 0.85rem;
    min-width: 170px;
    cursor: pointer;
  }

  .navbar-filter-select:focus {
    outline: none;
    border-color: var(--astra-accent);
  }

  .navbar-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .navbar-avatar {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--astra-muted);
  }
`;

export default Wrapper;
