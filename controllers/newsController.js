const FINNHUB_NEWS = "https://finnhub.io/api/v1/news";
const FINNHUB_COMPANY = "https://finnhub.io/api/v1/company-news";

const TRUMP_REGEX =
  /\b(trump|tariffs?|white\s+house|oval|mar-?a-?lago|maga)\b/i;

/** Megacap tech names for /company-news. Optional: NEWS_TECH_SYMBOLS=AAPL,MSFT,... */
const TECH_SYMBOLS = (
  process.env.NEWS_TECH_SYMBOLS || "AAPL,MSFT,NVDA,GOOGL,META,TSLA"
)
  .split(",")
  .map((s) => s.trim().toUpperCase())
  .filter(Boolean)
  .slice(0, 8);

const MAX_ARTICLES = 36;
const PER_SYMBOL_CAP = 6;

const DEMO_ARTICLES = [
  {
    id: "d1",
    headline: "Markets watch data and earnings heading into the week",
    summary: "Sample headline — hook up Finnhub to replace this.",
    source: "Demo",
    url: "https://finnhub.io",
    datetime: Math.floor(Date.now() / 1000) - 300,
    category: "general",
  },
  {
    id: "d-stock",
    headline: "Big tech flows stay in focus ahead of reports (demo)",
    summary: "Example of a stock-scoped card.",
    source: "Demo",
    url: "https://finnhub.io",
    datetime: Math.floor(Date.now() / 1000) - 180,
    category: "stocks",
    symbol: "NVDA",
  },
];

const DEMO_TRUMP_TAPE = [
  {
    id: "d2",
    headline: "Policy headlines still on traders’ radar (demo)",
    source: "Demo",
    url: "https://finnhub.io",
    datetime: Math.floor(Date.now() / 1000) - 120,
  },
];

function paginateList(items, page, limit) {
  const totalArticles = items.length;
  const numPages =
    totalArticles === 0 ? 1 : Math.max(1, Math.ceil(totalArticles / limit));
  const safePage = Math.min(Math.max(1, page), numPages);
  const skip = (safePage - 1) * limit;
  return {
    articles: items.slice(skip, skip + limit),
    totalArticles,
    numPages,
    currentPage: safePage,
  };
}

const demo = (page = 1, limit = 7) => ({
  mock: true,
  updatedAt: new Date().toISOString(),
  message: "Add FINNHUB_API_KEY to .env for live headlines.",
  trumpTapeFallback: false,
  trumpTape: DEMO_TRUMP_TAPE,
  ...paginateList(DEMO_ARTICLES, page, limit),
});

function mapGeneral(raw) {
  return {
    id: raw.id ?? raw.url,
    headline: raw.headline ?? "",
    summary: raw.summary ?? "",
    source: raw.source ?? "News",
    url: raw.url ?? "#",
    datetime: raw.datetime,
    category: (raw.category || "general").toLowerCase(),
  };
}

function mapStockRow(raw, symbol) {
  return {
    id: raw.id ?? raw.url,
    headline: raw.headline ?? "",
    summary: raw.summary ?? "",
    source: raw.source ?? "News",
    url: raw.url ?? "#",
    datetime: raw.datetime,
    category: "stocks",
    symbol,
  };
}

function dedupeKey(a) {
  return a.id != null ? `id:${a.id}` : `url:${a.url}`;
}

function lastThreeDaysUtc() {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 3);
  const ymd = (d) => d.toISOString().slice(0, 10);
  return { from: ymd(from), to: ymd(to) };
}

export async function getNewsFeed(req, res) {
  const page = Math.max(1, Number.parseInt(String(req.query.page), 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(String(req.query.limit), 10) || 6),
  );

  const token = process.env.FINNHUB_API_KEY;
  if (!token) {
    return res.json(demo(page, limit));
  }

  try {
    const all = [];

    const generalUrl = `${FINNHUB_NEWS}?category=general&token=${encodeURIComponent(token)}`;
    const gr = await fetch(generalUrl, {
      headers: { Accept: "application/json" },
    });
    if (!gr.ok) throw new Error(`Finnhub general ${gr.status}`);
    const gData = await gr.json();
    if (Array.isArray(gData)) {
      all.push(...gData.map(mapGeneral));
    }

    const { from, to } = lastThreeDaysUtc();

    await Promise.all(
      TECH_SYMBOLS.map(async (sym) => {
        try {
          const u = `${FINNHUB_COMPANY}?symbol=${encodeURIComponent(sym)}&from=${from}&to=${to}&token=${encodeURIComponent(token)}`;
          const r = await fetch(u, { headers: { Accept: "application/json" } });
          if (!r.ok) return;
          const rows = await r.json();
          if (!Array.isArray(rows)) return;
          const newest = [...rows]
            .sort((a, b) => (b.datetime || 0) - (a.datetime || 0))
            .slice(0, PER_SYMBOL_CAP);
          for (const raw of newest) {
            all.push(mapStockRow(raw, sym));
          }
        } catch (e) {
          console.warn("news company", sym, e.message);
        }
      }),
    );

    const sorted = all.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
    const seen = new Set();
    const articles = [];
    for (const a of sorted) {
      const k = dedupeKey(a);
      if (seen.has(k)) continue;
      seen.add(k);
      articles.push(a);
      if (articles.length >= MAX_ARTICLES) break;
    }

    const matches = articles
      .filter((a) => TRUMP_REGEX.test(`${a.headline} ${a.summary}`))
      .slice(0, 10);

    let trumpTape = matches;
    let trumpTapeFallback = false;
    if (trumpTape.length === 0 && articles.length > 0) {
      trumpTape = articles.slice(0, 8);
      trumpTapeFallback = true;
    }

    const paged = paginateList(articles, page, limit);

    return res.json({
      mock: false,
      updatedAt: new Date().toISOString(),
      trumpTape,
      trumpTapeFallback,
      ...paged,
    });
  } catch (err) {
    console.error("news:", err.message);
    return res.json({
      ...demo(page, limit),
      message: `Could not load live news (${err.message}).`,
    });
  }
}
