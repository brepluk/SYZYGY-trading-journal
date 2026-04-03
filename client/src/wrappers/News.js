import styled from "styled-components";

const Wrapper = styled.section`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem 2rem;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  padding-bottom: max(2rem, env(safe-area-inset-bottom, 0px));

  .news-header {
    margin-bottom: 1.5rem;
  }

  .news-header h1 {
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 600;
    letter-spacing: var(--letter-spacing);
    margin-bottom: 0.35rem;
  }

  .news-sub {
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    max-width: 42rem;
    line-height: 1.5;
  }

  .news-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1rem;
    margin-top: 1rem;
    font-size: var(--extra-small-text);
    color: var(--text-secondary-color);
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-weight: 500;
    font-size: 0.75rem;
    border: 1px solid var(--border-color);
    background: var(--background-secondary-color);
  }

  .pill--live {
    border-color: var(--primary-400);
    color: var(--primary-700);
    background: var(--primary-50);
    body.dark-theme & {
      color: #b8ecf0;
      background: rgba(44, 177, 188, 0.1);
      border-color: rgba(44, 177, 188, 0.28);
    }
  }

  .pill--demo {
    border-color: var(--grey-400);
    color: var(--grey-700);
  }

  .pulse-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--primary-500);
    animation: news-pulse 1.4s ease-in-out infinite;
  }

  @keyframes news-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.85);
    }
  }

  .news-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 992px) {
    .news-grid {
      grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);
      align-items: start;
    }
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .news-list-count {
    font-size: var(--small-text);
    font-weight: 600;
    color: var(--text-secondary-color);
    margin: 0 0 0.25rem;
    letter-spacing: 0.02em;
  }

  .news-pagination {
    margin-top: 0.35rem;
  }

  .news-card {
    display: block;
    padding: 1rem 1.1rem;
    border-radius: var(--border-radius-lg);
    background: var(--card-background);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-1);
    text-decoration: none;
    color: inherit;
    transition:
      transform var(--transition),
      box-shadow var(--transition);
  }

  @media (hover: hover) and (pointer: fine) {
    .news-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3);
    }
  }

  .news-card__top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }

  .news-card__time {
    font-size: var(--extra-small-text);
    color: var(--text-secondary-color);
    white-space: nowrap;
  }

  .news-card__title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    margin-bottom: 0.35rem;
  }

  .news-card__summary {
    font-size: var(--small-text);
    color: var(--text-secondary-color);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .news-card__src {
    margin-top: 0.65rem;
    font-size: var(--extra-small-text);
    color: var(--text-secondary-color);
  }

  .tape-panel {
    position: sticky;
    top: calc(var(--nav-height) + 0.75rem);
    z-index: 2;
    padding: 1rem 1.1rem 1.15rem;
    border-radius: var(--border-radius-lg);
    background: linear-gradient(
      145deg,
      rgba(255, 140, 66, 0.12),
      rgba(255, 255, 255, 0.04)
    );
    border: 1px solid rgba(255, 140, 66, 0.35);
    box-shadow: var(--shadow-2);
    body.dark-theme & {
      background: linear-gradient(
        145deg,
        rgba(255, 140, 66, 0.12),
        rgba(15, 23, 42, 0.6)
      );
      border-color: rgba(255, 140, 66, 0.26);
    }
  }

  .tape-panel__title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .tape-panel__subtitle {
    font-size: var(--extra-small-text);
    color: var(--text-secondary-color);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .tape-item {
    padding: 0.65rem 0;
    border-top: 1px dashed var(--border-color);
  }

  .tape-item:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  .tape-item a {
    color: var(--text-color);
    text-decoration: none;
    font-size: var(--small-text);
    font-weight: 500;
    line-height: 1.35;
  }

  .tape-item a:hover {
    color: var(--primary-600);
    text-decoration: underline;
    body.dark-theme & {
      color: #93c5fd;
    }
  }

  .tape-item__meta {
    margin-top: 0.35rem;
    font-size: var(--extra-small-text);
    color: var(--text-secondary-color);
  }

  .empty-tape {
    font-size: var(--small-text);
    color: var(--text-secondary-color);
    font-style: italic;
  }

  .loading,
  .error-box {
    padding: 2rem;
    text-align: center;
    color: var(--text-secondary-color);
  }

  .error-box {
    color: var(--red-dark);
    background: var(--red-light);
    border-radius: var(--border-radius-lg);
    body.dark-theme & {
      color: #fecaca;
      background: rgba(127, 29, 29, 0.35);
    }
  }

  @media (max-width: 768px) {
    padding: 0 0.75rem 1.5rem;
    padding-left: max(0.75rem, env(safe-area-inset-left, 0px));
    padding-right: max(0.75rem, env(safe-area-inset-right, 0px));

    .news-header {
      margin-bottom: 1rem;
    }

    .news-header h1 {
      font-size: 1.25rem;
    }

    .news-sub {
      font-size: 0.8125rem;
    }

    .news-meta {
      margin-top: 0.75rem;
      gap: 0.4rem;
    }

    .news-grid {
      gap: 1.25rem;
    }

    .news-list {
      order: 1;
    }

    .news-card {
      padding: 0.85rem 1rem;
    }

    .news-card__time {
      white-space: normal;
      text-align: right;
      max-width: 100%;
    }

    .news-card__title {
      font-size: 0.9rem;
    }

    .tape-panel {
      order: -1;
      position: static;
      top: auto;
      z-index: auto;
      margin-top: 0;
      margin-bottom: 0;
    }

    .tape-panel__title {
      font-size: 0.95rem;
    }
  }
`;

export default Wrapper;
