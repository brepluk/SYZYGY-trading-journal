import styled from "styled-components";

const Wrapper = styled.article`
  &.trade-row {
    display: grid;
    border-bottom: 1px solid var(--border-color);
    transition: background var(--transition);
  }

  &.trade-row:hover {
    background: color-mix(in srgb, var(--text-color) 4%, transparent);
  }

  .trade-cell__label {
    display: none;
  }

  .trade-cell__value {
    display: block;
    min-width: 0;
  }

  .trade-cell {
    min-width: 0;
    font-size: var(--small-text);
    color: var(--text-color);
  }

  .trade-cell--symbol .trade-cell__value {
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .trade-cell--muted,
  .trade-cell__value.trade-cell--muted {
    color: var(--text-secondary-color);
  }

  .trade-pnl .trade-cell__value {
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .trade-pnl--profit .trade-cell__value {
    color: #4ade80;
  }

  .trade-pnl--loss .trade-cell__value {
    color: #f87171;
  }

  .trade-pnl--neutral .trade-cell__value {
    color: var(--text-secondary-color);
  }

  .trade-actions {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
  }

  .trade-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 0;
    padding: 0.35rem;
    border: none;
    border-radius: var(--border-radius);
    background: transparent;
    color: var(--text-secondary-color);
    cursor: pointer;
    transition:
      color var(--transition),
      background var(--transition);
  }

  .trade-icon-btn:hover {
    color: var(--text-color);
    background: color-mix(in srgb, var(--text-color) 8%, transparent);
  }

  .trade-icon-btn--danger:hover {
    color: #f87171;
    background: color-mix(in srgb, #f87171 12%, transparent);
  }

  /* —— Phone / compact: card layout —— */
  @media (max-width: 40rem) {
    &.trade-row:hover {
      background: transparent;
    }

    &.trade-row.trades-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-areas:
        "sym st"
        "pnl roi"
        "exe pos"
        "ent ext"
        "qty dat"
        "nt act";
      row-gap: 0.55rem;
      column-gap: 0.85rem;
      align-items: start;
      padding: 0.9rem 1rem;
      margin: 0;
      min-width: 0;
      border-bottom: none;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      background: var(--background-secondary-color);
      box-shadow: var(--shadow-1);
    }

    .trade-cell__label {
      display: block;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-secondary-color);
      margin-bottom: 0.22rem;
    }

    .trade-cell--symbol .trade-cell__label {
      display: none;
    }

    .trade-cell--symbol {
      grid-area: sym;
      align-self: center;
      min-width: 0;
    }

    .trade-cell--symbol .trade-cell__value {
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      line-height: 1.2;
    }

    .trade-cell--pnl {
      grid-area: pnl;
      justify-self: stretch;
      width: 100%;
      min-width: 0;
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .trade-cell--roi {
      grid-area: roi;
      justify-self: stretch;
      width: 100%;
      min-width: 0;
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .trade-cell--pnl .trade-cell__value,
    .trade-cell--roi .trade-cell__value {
      font-size: 1.05rem;
      max-width: 100%;
    }

    .trade-cell--roi .trade-cell__value {
      text-align: right;
    }

    .trade-cell--notes {
      grid-area: nt;
      align-self: center;
    }

    .trade-cell--notes .trade-cell__label {
      display: none;
    }

    .trade-cell--notes .trade-cell__value {
      display: flex;
      align-items: center;
    }

    .trade-actions {
      grid-area: act;
      justify-self: end;
      gap: 0.25rem;
    }

    .trade-cell--execution {
      grid-area: exe;
    }

    .trade-cell--position {
      grid-area: pos;
      justify-self: end;
      text-align: right;
    }

    .trade-cell--status {
      grid-area: st;
      justify-self: end;
      align-self: center;
      text-align: right;
    }

    .trade-cell--entry {
      grid-area: ent;
    }

    .trade-cell--exit {
      grid-area: ext;
      justify-self: end;
      text-align: right;
    }

    .trade-cell--qty {
      grid-area: qty;
    }

    .trade-cell--date {
      grid-area: dat;
      justify-self: end;
      text-align: right;
    }

    .trade-cell--execution,
    .trade-cell--position,
    .trade-cell--status,
    .trade-cell--entry,
    .trade-cell--exit,
    .trade-cell--qty,
    .trade-cell--date {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .trade-cell--position,
    .trade-cell--exit,
    .trade-cell--date,
    .trade-cell--status {
      align-items: flex-end;
    }

    .trade-cell--status .trade-cell__value,
    .trade-cell--exit .trade-cell__value,
    .trade-cell--date .trade-cell__value {
      display: inline-flex;
      justify-content: flex-end;
    }

    .trade-icon-btn {
      min-width: 44px;
      min-height: 44px;
      padding: 0.5rem;
      border-radius: var(--border-radius-lg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.trade-row,
    .trade-icon-btn {
      transition: none;
    }
  }
`;

export default Wrapper;
