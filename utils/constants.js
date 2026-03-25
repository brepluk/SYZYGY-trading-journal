export const ASSET_TYPE = {
  OPTION: "OPTION",
  // STOCK: "STOCK",
  // FOREX: "FOREX",
  // FUTURES: "FUTURES",
  // CRYPTO: "CRYPTO",
  // INDEX: "INDEX",
};

export const TRADE_SIDE = {
  BUY: "BUY",
  SELL: "SELL",
};

export const POSITION_SIDE = {
  CALL: "CALL",
  PUT: "PUT",
};

export const POSITION_SIDE_FORM_OPTIONS = [
  { value: POSITION_SIDE.CALL, label: "Call" },
  { value: POSITION_SIDE.PUT, label: "Put" },
];

export const TRADE_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

export const TRADE_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  BEST_PNL: "best-pnl",
  WORST_PNL: "worst-pnl",
  TICKER_AZ: "a-z",
  TICKER_ZA: "z-a",
};

export const TRADE_SIDE_FILTER_OPTIONS = [
  { value: "all", label: "All buy/sell" },
  { value: TRADE_SIDE.BUY, label: "Buy" },
  { value: TRADE_SIDE.SELL, label: "Sell" },
];

export const POSITION_SIDE_FILTER_OPTIONS = [
  { value: "all", label: "All positions" },
  { value: POSITION_SIDE.CALL, label: "Call" },
  { value: POSITION_SIDE.PUT, label: "Put" },
];

export const TRADE_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: TRADE_STATUS.OPEN, label: "Open" },
  { value: TRADE_STATUS.CLOSED, label: "Closed" },
];

export const TRADE_SORT_FILTER_OPTIONS = [
  { value: TRADE_SORT_BY.NEWEST_FIRST, label: "Newest first" },
  { value: TRADE_SORT_BY.OLDEST_FIRST, label: "Oldest first" },
  { value: TRADE_SORT_BY.BEST_PNL, label: "Best P&L" },
  { value: TRADE_SORT_BY.WORST_PNL, label: "Worst P&L" },
  { value: TRADE_SORT_BY.TICKER_AZ, label: "Ticker A–Z" },
  { value: TRADE_SORT_BY.TICKER_ZA, label: "Ticker Z–A" },
];
