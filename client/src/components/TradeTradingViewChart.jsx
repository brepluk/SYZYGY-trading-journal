import { useEffect, useRef, useSyncExternalStore } from "react";

const TV_SCRIPT =
  "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

function subscribeTheme(onStoreChange) {
  const obs = new MutationObserver(onStoreChange);
  obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

function getDarkThemeSnapshot() {
  return document.body.classList.contains("dark-theme");
}

/**
 * Map journal trade → TradingView "EXCHANGE:SYMBOL". Defaults assume US listings;
 * users can change the symbol in the widget.
 */
function tradingViewSymbol(trade) {
  const t = (trade.ticker ?? "AAPL").trim().toUpperCase();
  if (!t) return "NASDAQ:AAPL";

  switch (trade.assetType) {
    case "FOREX":
      return `OANDA:${t.replace(/[^A-Z]/g, "")}`;
    case "CRYPTO":
      if (/USDT$|USD$/.test(t)) return `BINANCE:${t}`;
      return `BINANCE:${t}USDT`;
    case "INDEX":
      if (t === "SPX" || t === "SP500") return "SP:SPX";
      if (t === "VIX") return "CBOE:VIX";
      return `SP:${t}`;
    case "FUTURES":
      return `NASDAQ:${t}`;
    case "OPTION":
    case "STOCK":
    default:
      return `NASDAQ:${t}`;
  }
}

export default function TradeTradingViewChart({ trade }) {
  const containerRef = useRef(null);
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getDarkThemeSnapshot,
    getDarkThemeSnapshot,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const config = {
      autosize: true,
      width: "100%",
      symbol: tradingViewSymbol(trade),
      interval: "D",
      timezone: "exchange",
      theme: isDark ? "dark" : "light",
      style: "1",
      locale: "en",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: true,
      show_popup_button: true,
      support_host: "https://www.tradingview.com",
    };

    el.replaceChildren();
    const script = document.createElement("script");
    script.src = TV_SCRIPT;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    el.appendChild(script);

    return () => {
      el.replaceChildren();
    };
  }, [trade.id, trade.ticker, trade.assetType, isDark]);

  return <div className="trade-tv-chart" ref={containerRef} />;
}
