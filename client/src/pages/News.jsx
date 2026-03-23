import { useCallback, useEffect, useState } from "react";
import Wrapper from "../wrappers/News";
import customFetch from "../utils/customFetch";
import { formatRelativeTime } from "../utils/dateUtils";

/**
 * Market Pulse — live-ish headlines + "The Trump Tape" sidebar
 * -----------------------------------------------------------
 * What this page does:
 * - Calls GET /api/v1/news/feed (your Express server), which talks to Finnhub using a secret key.
 * - Re-fetches on a timer so you get fresh headlines without manually refreshing the browser.
 *
 * Why not "every second"?
 * - News APIs rate-limit you; polling every ~45s is a sweet spot for free tiers.
 * - Headlines don't actually change every second; policy wires are fast, but not that fast.
 */
const REFRESH_MS = 45_000;

function categoryClass(cat) {
  if (cat === "forex") return "tag--forex";
  if (cat === "crypto") return "tag--crypto";
  return "tag--general";
}

const News = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /** Bump every 30s so "3m ago" updates without a full page reload */
  const [timeTick, setTimeTick] = useState(0);

  const loadFeed = useCallback(async () => {
    setError(null);
    try {
      const { data } = await customFetch.get("/news/feed");
      setFeed(data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Could not load news. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  useEffect(() => {
    const id = setInterval(() => loadFeed(), REFRESH_MS);
    return () => clearInterval(id);
  }, [loadFeed]);

  useEffect(() => {
    const id = setInterval(() => setTimeTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  if (loading && !feed) {
    return (
      <Wrapper>
        <div className="loading">Loading headlines…</div>
      </Wrapper>
    );
  }

  if (error && !feed) {
    return (
      <Wrapper>
        <div className="error-box">{error}</div>
      </Wrapper>
    );
  }

  const market = feed?.market ?? [];
  const trumpTape = feed?.trumpTape ?? [];
  const isMock = feed?.mock === true;
  const updatedAt = feed?.updatedAt ? new Date(feed.updatedAt) : null;
  // timeTick forces re-render for relative "last updated" text
  void timeTick;

  return (
    <Wrapper>
      <header className="news-header">
        <h1>Market Pulse</h1>
        {/* <p className="news-sub">
          Stock-heavy headlines with a splash of FX &amp; crypto — refreshed
          automatically so you can skim what&apos;s moving markets.
        </p> */}
        <div className="news-meta">
          {isMock ? (
            <span className="pill pill--demo">Demo data</span>
          ) : (
            <span className="pill pill--live">
              <span className="pulse-dot" aria-hidden />
              Live feed
            </span>
          )}
          {updatedAt && (
            <span>
              Last updated {formatRelativeTime(updatedAt)}
              {" · "}
              Refreshes every {REFRESH_MS / 1000}s
            </span>
          )}
        </div>
        {isMock && feed?.message && (
          <p className="news-sub" style={{ marginTop: "0.75rem" }}>
            <strong>Note:</strong> {feed.message}
          </p>
        )}
      </header>

      <div className="news-grid">
        <div className="news-list">
          {market.length === 0 ? (
            <p className="loading">No headlines right now.</p>
          ) : (
            market.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
              >
                <div className="news-card__top">
                  <span className={`tag ${categoryClass(article.category)}`}>
                    {article.category || "general"}
                  </span>
                  <span className="news-card__time">
                    {formatRelativeTime(article.datetime * 1000)}
                  </span>
                </div>
                <div className="news-card__title">{article.headline}</div>
                {article.summary && (
                  <p className="news-card__summary">{article.summary}</p>
                )}
                <div className="news-card__src">{article.source}</div>
              </a>
            ))
          )}
        </div>

        <aside className="tape-panel" aria-labelledby="trump-tape-title">
          <h2 className="tape-panel__title" id="trump-tape-title">
            🍊 Orange Alert: The Trump Tape
          </h2>
          <div className="tape-panel__subtitle"></div>
          {trumpTape.length === 0 ? (
            <p className="empty-tape">
              No matching headlines in this batch — markets are behaving (for
              now).
            </p>
          ) : (
            trumpTape.map((article) => (
              <div key={article.id} className="tape-item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.headline}
                </a>
                <div className="tape-item__meta">
                  {article.source} ·{" "}
                  {formatRelativeTime(article.datetime * 1000)}
                </div>
              </div>
            ))
          )}
        </aside>
      </div>
    </Wrapper>
  );
};

export default News;
