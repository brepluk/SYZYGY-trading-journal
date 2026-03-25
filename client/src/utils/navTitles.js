import { toDateInputValue } from "./dateUtils";

const firstLetterUpper = (value) => {
  if (value == null) return "";
  const s = String(value).trim();
  return s ? s[0].toUpperCase() : "";
};

export const tradeNavLabel = (trade) => {
  if (!trade) return "";

  const ticker = trade.ticker ?? "";
  const strike = trade.strike ?? "";
  const positionSide = trade.positionSide ?? ""; // CALL/PUT

  const exp = toDateInputValue(trade.expiration);

  const cp = firstLetterUpper(positionSide);
  const strikeCp =
    strike !== "" && strike != null ? `${strike}${cp}` : cp ? cp : "";

  return [ticker, strikeCp, exp].filter(Boolean).join(" ");
};

export const editTradeNavHandle = {
  navTitle: (match) => {
    const trade = match?.data?.trade;
    const label = tradeNavLabel(trade);
    return label ? `Edit: ${label}` : "Edit Trade";
  },
};

export const tradeNotesNavHandle = {
  navTitle: (match) => {
    const trade = match?.data?.trade;
    const label = tradeNavLabel(trade);
    return label ? `Notes: ${label}` : "Notes";
  },
};
