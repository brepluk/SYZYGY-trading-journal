import styled from "styled-components";

const Wrapper = styled.main`
  /* P/L: vivid but not highlighter-neon */
  --dashboard-profit: #2db86f;
  --dashboard-loss: #e45656;
  --profit-color: var(--dashboard-profit);

  /* Cumulative P&L chart: one neutral stroke; fills carry profit/loss color */
  --dashboard-chart-line: #4f46e5;
  --dashboard-chart-zero-line: rgba(71, 85, 105, 0.85);

  body.dark-theme & {
    --dashboard-profit: #4fd48f;
    --dashboard-loss: #f08080;
    --dashboard-chart-line: #a5b4fc;
    --dashboard-chart-zero-line: rgba(148, 163, 184, 0.65);
  }

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .dashboard-cards-row {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  .dashboard-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 1.25rem;
    min-height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.15rem;
  }

  .dashboard-card-label {
    font-size: 0.8rem;
    color: var(--text-secondary-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .dashboard-card-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
  }

  .dashboard-card-value--profit {
    color: var(--dashboard-profit);
  }

  .dashboard-card-value--loss {
    color: var(--dashboard-loss);
  }

  .dashboard-card-value--neutral {
    color: var(--text-secondary-color);
  }

  .dashboard-card-sub {
    font-size: var(--small-text);
    color: var(--text-secondary-color);
  }

  .dashboard-chart-section {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 1.25rem 1rem;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

  .dashboard-chart-inner {
    width: 100%;
  }

  .dashboard-chart-title {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
    margin-bottom: 0.75rem;
  }

  .dashboard-chart-empty {
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    padding: 2rem 0;
    text-align: center;
  }

  .dashboard-calendar-section {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 1.25rem 1rem;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .trading-calendar {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .trading-calendar-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    margin-bottom: 1rem;
    min-width: 0;
  }

  .trading-calendar-title {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
  }

  /* Whole control cluster on the right; arrows + month stay compact */
  .trading-calendar-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    min-width: 0;
    margin-left: auto;
    width: auto;
    flex: 0 0 auto;
  }

  @media (min-width: 640px) {
    .trading-calendar-header {
      gap: 0.75rem;
    }
  }

  .trading-calendar-month {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    min-width: 0;
    text-align: center;
    flex: 0 0 auto;
    padding: 0 0.25rem;
  }

  .trading-calendar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    color: var(--text-color);
    cursor: pointer;
    transition:
      border-color var(--transition),
      color var(--transition);
  }

  .trading-calendar-btn:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .trading-calendar-today {
    margin-left: 0;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    background: transparent;
    color: var(--text-secondary-color);
    cursor: pointer;
    transition:
      border-color var(--transition),
      color var(--transition);
  }

  .trading-calendar-today:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .trading-calendar-loading {
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    text-align: center;
    padding: 2rem;
  }

  .trading-calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.25rem;
    margin-bottom: 0.35rem;
    min-width: 0;
  }

  .trading-calendar-weekday {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary-color);
    text-align: center;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trading-calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.35rem;
    min-width: 0;
  }

  .trading-calendar-cell {
    border-radius: var(--border-radius);
    min-height: 2.85rem;
    font-size: 0.62rem;
    min-width: 0;
  }

  .trading-calendar-cell--pad {
    background: transparent;
    border: none;
    min-height: 0;
  }

  .trading-calendar-cell--day {
    border: 1px solid var(--border-color);
    padding: 0.3rem 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
    background: color-mix(in srgb, var(--text-color) 3%, transparent);
    overflow: visible;
    width: 100%;
    box-sizing: border-box;
  }

  .trading-calendar-cell--neutral {
    color: var(--text-color);
  }

  .trading-calendar-cell--profit {
    background: color-mix(in srgb, var(--dashboard-profit) 15%, transparent);
    border-color: color-mix(in srgb, var(--dashboard-profit) 30%, var(--border-color));
  }

  .trading-calendar-cell--loss {
    background: color-mix(in srgb, var(--dashboard-loss) 15%, transparent);
    border-color: color-mix(in srgb, var(--dashboard-loss) 30%, var(--border-color));
  }

  .trading-calendar-day-num {
    font-weight: 600;
    font-size: 0.65rem;
    align-self: flex-end;
    color: var(--text-secondary-color);
    line-height: 1;
  }

  .trading-calendar-pnl {
    font-weight: 600;
    font-size: 0.6rem;
    line-height: 1.15;
    max-width: 100%;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .trading-calendar-cell--profit .trading-calendar-pnl {
    color: var(--dashboard-profit);
  }

  .trading-calendar-cell--loss .trading-calendar-pnl {
    color: var(--dashboard-loss);
  }

  .trading-calendar-count {
    font-size: 0.55rem;
    color: var(--text-secondary-color);
    max-width: 100%;
    line-height: 1.15;
    white-space: normal;
    overflow-wrap: break-word;
  }

  /* iPhone / narrow phones: tighter calendar so grid stays in viewport */
  @media (max-width: 480px) {
    .dashboard-calendar-section {
      padding: 0.65rem 0.45rem;
    }

    .trading-calendar-title {
      font-size: 0.65rem;
      letter-spacing: 0.05em;
    }

    .trading-calendar-header {
      margin-bottom: 0.65rem;
      gap: 0.5rem;
    }

    .trading-calendar-nav {
      gap: 0.25rem;
    }

    .trading-calendar-month {
      font-size: 0.78rem;
      min-width: 0;
      flex: 0 0 auto;
    }

    .trading-calendar-today {
      margin-left: 0;
      padding: 0.25rem 0.45rem;
      font-size: 0.65rem;
    }

    .trading-calendar-btn {
      padding: 0.15rem;
      flex-shrink: 0;
    }

    .trading-calendar-btn svg {
      width: 16px;
      height: 16px;
    }

    .trading-calendar-weekdays {
      gap: 0.12rem;
    }

    .trading-calendar-weekday {
      font-size: 0.52rem;
      letter-spacing: 0.02em;
    }

    .trading-calendar-grid {
      gap: 0.18rem;
    }

    .trading-calendar-cell {
      min-height: 2.35rem;
      font-size: 0.5rem;
    }

    .trading-calendar-cell--day {
      padding: 0.14rem 0.08rem;
      gap: 0.06rem;
    }

    .trading-calendar-day-num {
      font-size: 0.5rem;
    }

    .trading-calendar-pnl {
      font-size: 0.5rem;
      line-height: 1.12;
    }

    .trading-calendar-count {
      font-size: 0.45rem;
      line-height: 1.1;
    }
  }

  @media (min-width: 640px) {
    .dashboard-cards-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .trading-calendar-cell {
      min-height: 3.75rem;
    }

    .trading-calendar-pnl {
      font-size: 0.68rem;
    }

    .trading-calendar-count {
      font-size: 0.58rem;
    }

    .trading-calendar-day-num {
      font-size: 0.7rem;
    }
  }

  @media (min-width: 992px) {
    .dashboard-cards-row {
      grid-template-columns: repeat(4, 1fr);
    }

    .dashboard-calendar-section {
      min-height: 400px;
      padding: 1.5rem 1.25rem;
    }

    .trading-calendar-grid {
      gap: 0.45rem;
    }

    .trading-calendar-cell {
      min-height: 5.25rem;
    }

    .trading-calendar-cell--day {
      padding: 0.45rem 0.35rem;
      gap: 0.15rem;
    }

    .trading-calendar-day-num {
      font-size: 0.78rem;
    }

    .trading-calendar-pnl {
      font-size: 0.72rem;
    }

    .trading-calendar-count {
      font-size: 0.62rem;
    }
  }
`;

export default Wrapper;
