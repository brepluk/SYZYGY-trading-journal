import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 0 max(1.5rem, env(safe-area-inset-bottom, 0px));

  .notes-back {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 1rem;
    font-size: var(--small-text);
    font-weight: 500;
    color: var(--text-secondary-color);
    text-decoration: none;
    transition: color var(--transition);
  }

  .notes-back:hover {
    color: var(--text-color);
  }

  .notes-card {
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem 1.5rem 1.75rem;
    box-shadow: var(--shadow-2);
  }

  .notes-title {
    color: var(--text-color);
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    font-weight: 600;
    margin: 0 0 0.35rem;
    letter-spacing: var(--letter-spacing);
  }

  .notes-meta {
    margin: 0 0 1.25rem;
    font-size: var(--small-text);
    color: var(--text-secondary-color);
  }

  .notes-chart-panel {
    margin-bottom: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    background: var(--background-color);
  }

  .notes-chart-ticker-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    padding: 0.65rem 1rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--background-secondary-color);
  }

  .notes-chart-ticker {
    font-size: clamp(1.125rem, 2.5vw, 1.35rem);
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--text-color);
    font-variant-numeric: tabular-nums;
  }

  .notes-chart-asset {
    font-size: var(--small-text);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
  }

  /* Host div for TradingView script + iframe — size this, not just the card */
  .trade-tv-chart {
    position: relative;
    width: 100%;
    height: min(720px, 72vh);
    min-height: 520px;
  }

  .trade-tv-chart .tradingview-widget-container {
    height: 100%;
    min-height: inherit;
  }

  .trade-tv-chart .tradingview-widget-container__widget {
    height: 100%;
  }

  .trade-tv-chart iframe {
    width: 100% !important;
    height: 100% !important;
    min-height: 520px;
  }

  .notes-field {
    margin-bottom: 1rem;
  }

  .notes-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: var(--small-text);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
  }

  .notes-textarea {
    min-height: min(28rem, 55vh);
    resize: vertical;
    line-height: 1.55;
    font-family: inherit;
  }

  /* Quill Snow – match app theme (uses global CSS variables) */
  .trade-notes-editor .ql-toolbar.ql-snow {
    border: 1px solid var(--border-color);
    border-bottom: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background: var(--background-color);
    font-family: inherit;
  }

  .trade-notes-editor .ql-container.ql-snow {
    border: 1px solid var(--border-color);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    background: var(--background-color);
    font-family: inherit;
    font-size: 0.9375rem;
  }

  .trade-notes-editor .ql-editor {
    min-height: min(22rem, 48vh);
    line-height: 1.55;
    color: var(--text-color);
  }

  .trade-notes-editor .ql-editor.ql-blank::before {
    color: var(--text-secondary-color);
    font-style: normal;
  }

  .trade-notes-editor .ql-snow .ql-stroke {
    stroke: var(--text-secondary-color);
  }

  .trade-notes-editor .ql-snow .ql-fill {
    fill: var(--text-secondary-color);
  }

  .trade-notes-editor .ql-snow .ql-picker-label {
    color: var(--text-color);
  }

  .trade-notes-editor .ql-snow .ql-picker-options {
    background: var(--card-background);
    border-color: var(--border-color);
  }

  .trade-notes-editor .ql-snow .ql-picker-item {
    color: var(--text-color);
  }

  .trade-notes-editor .ql-snow a.ql-active,
  .trade-notes-editor .ql-snow .ql-picker-label:hover,
  .trade-notes-editor .ql-snow .ql-picker-item:hover {
    color: var(--accent-color);
  }

  .notes-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  .notes-hint {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-secondary-color);
  }
`;

export default Wrapper;
