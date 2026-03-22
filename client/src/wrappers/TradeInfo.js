import styled from "styled-components";

/**
 * TradeInfo badge surface — used by TradeInfo.jsx for side & status chips.
 */
const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 1;

  .trade-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    border: 1px solid transparent;
  }

  .trade-badge__arrow {
    font-size: 0.75em;
    line-height: 1;
  }

  /* Side: CALL / PUT */
  .trade-badge--call {
    color: #4ade80;
    background: color-mix(in srgb, #4ade80 14%, transparent);
    border-color: color-mix(in srgb, #4ade80 45%, transparent);
  }

  .trade-badge--put {
    color: #f87171;
    background: color-mix(in srgb, #f87171 14%, transparent);
    border-color: color-mix(in srgb, #f87171 45%, transparent);
  }

  .trade-badge--buy,
  .trade-badge--sell {
    color: var(--text-secondary-color);
    background: var(--background-secondary-color);
    border-color: var(--border-color);
  }

  /* Status: OPEN / CLOSED — neutral, no accent fills */
  .trade-badge--open,
  .trade-badge--closed {
    color: var(--text-secondary-color);
    background: transparent;
    border-color: transparent;
    font-weight: 500;
  }
`;

export default Wrapper;
