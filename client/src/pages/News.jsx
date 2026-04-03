import { useEffect } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../wrappers/News";
import PaginationBar from "../components/PaginationBar";
import customFetch from "../utils/customFetch";
import { formatRelativeTime } from "../utils/dateUtils";

const REFRESH_MS = 60_000;

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    params.limit = "6";
    const { data } = await customFetch.get("/news/feed", { params });
    return { data };
  } catch (error) {
    toast.error(
      error?.response?.data?.message ??
        error?.message ??
        "Could not load news.",
    );
    return {
      data: {
        articles: [],
        totalArticles: 0,
        numPages: 1,
        currentPage: 1,
        trumpTape: [],
        trumpTapeFallback: false,
        mock: true,
      },
    };
  }
};

const News = () => {
  const { data } = useLoaderData();
  const revalidator = useRevalidator();

  useEffect(() => {
    const id = setInterval(() => {
      revalidator.revalidate();
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, [revalidator]);

  const articles = data?.articles ?? [];
  const trumpTape = data?.trumpTape ?? [];
  const isDemo = data?.mock === true;
  const updatedAt = data?.updatedAt ? new Date(data.updatedAt) : null;
  const totalArticles = data?.totalArticles ?? articles.length;
  const numPages = data?.numPages ?? 1;
  const currentPage = data?.currentPage ?? 1;

  return (
    <Wrapper>
      <header className="news-header">
        <h1>Market Pulse</h1>

        <div className="news-meta">
          {isDemo ? (
            <span className="pill pill--demo">Demo</span>
          ) : (
            <span className="pill pill--live">
              <span className="pulse-dot" aria-hidden />
              Live
            </span>
          )}
          {updatedAt && (
            <span>
              Updated {formatRelativeTime(updatedAt)} · every{" "}
              {REFRESH_MS / 1000}s
            </span>
          )}
        </div>
        {isDemo && data?.message && (
          <p className="news-sub" style={{ marginTop: "0.75rem" }}>
            {data.message}
          </p>
        )}
      </header>

      <div className="news-grid">
        <div className="news-list">
          {articles.length > 0 && (
            <p className="news-list-count" aria-live="polite">
              {totalArticles} article{totalArticles !== 1 ? "s" : ""}
              {numPages > 1 ? ` · page ${currentPage} of ${numPages}` : ""}
            </p>
          )}
          {articles.length === 0 ? (
            <p className="loading">Nothing to show.</p>
          ) : (
            articles.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
              >
                <div className="news-card__top">
                  <span className="news-card__time">
                    {formatRelativeTime((a.datetime || 0) * 1000)}
                  </span>
                </div>
                <div className="news-card__title">{a.headline}</div>
                {a.summary && <p className="news-card__summary">{a.summary}</p>}
                <div className="news-card__src">{a.source}</div>
              </a>
            ))
          )}
          {numPages > 1 && (
            <div className="news-pagination">
              <PaginationBar numPages={numPages} currentPage={currentPage} />
            </div>
          )}
        </div>

        <aside className="tape-panel" aria-labelledby="tape-title">
          <h2 className="tape-panel__title" id="tape-title">
            🍊 Orange Alert: The Trump Tape
          </h2>

          {trumpTape.length === 0 ? (
            <p className="empty-tape">Nothing in the feed yet.</p>
          ) : (
            trumpTape.map((a) => (
              <div key={a.id} className="tape-item">
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.headline}
                </a>
                <div className="tape-item__meta">
                  {a.source} · {formatRelativeTime((a.datetime || 0) * 1000)}
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
