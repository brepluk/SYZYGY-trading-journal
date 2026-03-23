/**
 * Market news feed (Finnhub) + a filtered "Trump Tape" strip for macro/politics headlines.
 *
 * Why a backend route?
 * - Keeps FINNHUB_API_KEY off the browser (keys in frontend = anyone can steal them).
 * - One place to merge categories, dedupe, and filter.
 */

const FINNHUB_NEWS = "https://finnhub.io/api/v1/news";

/** Categories we merge for a stock-heavy but mixed feed */
const CATEGORIES = ["general", "forex", "crypto"];

/**
 * Headlines that mention Trump / his admin / tariff drama — lighthearted sidebar filter.
 * (Not perfect; it's keyword-based, same as most free news APIs.)
 */
const TRUMP_TAPE_REGEX =
  /\b(trump|tariffs?|white\s+house|oval\s+office|mar-?a-?lago|maga|donald\s+j\.?\s*trump)\b/i;

const MOCK_FEED = {
  mock: true,
  message:
    "Demo headlines — add FINNHUB_API_KEY to your server .env for live market news.",
  updatedAt: new Date().toISOString(),
  market: [
    {
      id: "mock-m1",
      headline: "Stocks drift as traders weigh earnings and rates outlook",
      source: "Demo",
      url: "https://finnhub.io/register",
      datetime: Math.floor(Date.now() / 1000) - 120,
      category: "general",
      summary: "Indices move sideways ahead of key data.",
    },
    {
      id: "mock-m2",
      headline: "Dollar firms after Fed speakers hint at patience on cuts",
      source: "Demo",
      url: "https://finnhub.io/register",
      datetime: Math.floor(Date.now() / 1000) - 360,
      category: "forex",
      summary: "FX markets react to commentary from officials.",
    },
  ],
  trumpTape: [
    {
      id: "mock-t1",
      headline:
        "Tariff headlines keep volatility elevated — desks watch policy wires",
      source: "Demo",
      url: "https://finnhub.io/register",
      datetime: Math.floor(Date.now() / 1000) - 60,
      category: "general",
      summary: "This is sample copy for The Trump Tape sidebar.",
    },
  ],
};

function normalizeArticle(raw, category) {
  return {
    id: raw.id ?? raw.url,
    headline: raw.headline ?? "",
    summary: raw.summary ?? "",
    source: raw.source ?? "News",
    url: raw.url ?? "#",
    datetime: raw.datetime,
    category: raw.category ?? category,
    image: raw.image,
  };
}

function isTrumpTapeStory(article) {
  const blob = `${article.headline} ${article.summary}`;
  return TRUMP_TAPE_REGEX.test(blob);
}

/** Dedupe by Finnhub id, else by URL */
function dedupeArticles(list) {
  const seen = new Map();
  for (const item of list) {
    const key = item.id != null ? `id:${item.id}` : `url:${item.url}`;
    if (!seen.has(key)) seen.set(key, item);
  }
  return [...seen.values()];
}

function sortByTimeDesc(a, b) {
  return (b.datetime ?? 0) - (a.datetime ?? 0);
}

export const getNewsFeed = async (req, res) => {
  const token = process.env.FINNHUB_API_KEY;

  if (!token) {
    return res.status(200).json(MOCK_FEED);
  }

  try {
    const urls = CATEGORIES.map(
      (cat) =>
        `${FINNHUB_NEWS}?category=${encodeURIComponent(cat)}&token=${encodeURIComponent(token)}`
    );

    const responses = await Promise.all(
      urls.map((u, i) =>
        fetch(u, { headers: { Accept: "application/json" } }).then((r) => {
          if (!r.ok) {
            throw new Error(`Finnhub ${CATEGORIES[i]}: ${r.status}`);
          }
          return r.json();
        })
      )
    );

    const merged = [];
    responses.forEach((arr, i) => {
      const cat = CATEGORIES[i];
      if (!Array.isArray(arr)) return;
      for (const raw of arr) {
        merged.push(normalizeArticle(raw, cat));
      }
    });

    const market = dedupeArticles(merged).sort(sortByTimeDesc).slice(0, 40);

    const trumpTape = market
      .filter(isTrumpTapeStory)
      .slice(0, 12);

    return res.status(200).json({
      mock: false,
      updatedAt: new Date().toISOString(),
      market,
      trumpTape,
    });
  } catch (err) {
    console.error("getNewsFeed:", err.message);
    return res.status(200).json({
      ...MOCK_FEED,
      mock: true,
      message: `Live news failed (${err.message}). Showing demo feed.`,
      updatedAt: new Date().toISOString(),
    });
  }
};
