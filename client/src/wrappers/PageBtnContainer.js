import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding: 0.75rem 0;

  .page-btn-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
  }

  .page-nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 36px;
    padding: 0 0.85rem;
    font-size: var(--small-text);
    font-weight: 500;
    color: var(--text-color);
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition:
      color var(--transition),
      border-color var(--transition),
      background var(--transition);
  }

  .page-nav-btn:hover:not(:disabled) {
    border-color: var(--accent-color);
    background: color-mix(
      in srgb,
      var(--accent-color) 10%,
      var(--background-secondary-color)
    );
  }

  .page-nav-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .page-nav-btn svg {
    flex-shrink: 0;
    opacity: 0.85;
  }

  .page-num-btn {
    min-width: 2.25rem;
    padding: 0 0.5rem;
    justify-content: center;
    font-variant-numeric: tabular-nums;
  }

  .page-num-btn.active {
    color: var(--btn-color);
    background: var(--btn-bg);
    border-color: var(--btn-bg);
  }

  .page-num-btn.active:hover {
    color: var(--btn-color);
    background: var(--accent-color);
    border-color: var(--accent-color);
  }
`;

export default Wrapper;
