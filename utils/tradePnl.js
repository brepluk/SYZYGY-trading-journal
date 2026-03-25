import {
  ASSET_TYPE,
  TRADE_SIDE,
  TRADE_STATUS,
} from "./constants.js";

/** US equity options: dollar P&amp;L uses ×100 per contract on premium. */
export function pnlNotionalMultiplier(assetType) {
  return assetType === ASSET_TYPE.OPTION ? 100 : 1;
}

/** Long vs short P&amp;L slope: use opening-side direction (BUY=long, SELL=short). */
function useShortPnlFormula(side) {
  return side === TRADE_SIDE.SELL;
}

/**
 * Realized P&amp;L from scale-out exits (same formula All Trades + calendar use).
 * Long: sum((exit − entry) × qty) × mult − fees. Short: sum((entry − exit) × qty) × mult − fees.
 */
export function computeRealizedPnlFromExitLegs({
  side,
  entryPrice,
  fees = 0,
  assetType,
  exitLegs,
}) {
  if (entryPrice == null || !Number.isFinite(Number(entryPrice))) {
    return { pnl: null, pnlPercent: null };
  }
  if (!Array.isArray(exitLegs) || exitLegs.length === 0) {
    return { pnl: null, pnlPercent: null };
  }

  const mult = pnlNotionalMultiplier(assetType ?? ASSET_TYPE.STOCK);
  const entry = Number(entryPrice);
  const shortFormula = useShortPnlFormula(side);
  let gross = 0;
  let totalQty = 0;

  for (const leg of exitLegs) {
    const q = Number(leg.quantity);
    const px = Number(leg.price);
    if (!Number.isFinite(q) || q <= 0 || !Number.isFinite(px)) continue;
    totalQty += q;
    if (shortFormula) {
      gross += (entry - px) * q * mult;
    } else {
      gross += (px - entry) * q * mult;
    }
  }

  if (totalQty === 0) {
    return { pnl: null, pnlPercent: null };
  }

  const feeNum = Number(fees) || 0;
  const pnl = gross - feeNum;
  const costBasis = entry * totalQty * mult;
  const pnlPercent = costBasis !== 0 ? (pnl / costBasis) * 100 : null;

  return { pnl, pnlPercent };
}

/**
 * Uses exit legs when present; otherwise one closed exit from `exitPrice` + `quantity`/`contracts`.
 */
export function computeRealizedPnlFromTradeSnapshot(trade) {
  const legs = trade.exitLegs;
  if (Array.isArray(legs) && legs.length > 0) {
    return computeRealizedPnlFromExitLegs({
      side: trade.side,
      entryPrice: trade.entryPrice,
      fees: trade.fees ?? 0,
      assetType: trade.assetType,
      exitLegs: legs,
    });
  }

  if (
    trade.status === TRADE_STATUS.CLOSED &&
    trade.exitPrice != null &&
    trade.entryPrice != null
  ) {
    const qty = trade.quantity ?? trade.contracts;
    if (qty == null || !Number.isFinite(Number(qty)) || Number(qty) <= 0) {
      return { pnl: null, pnlPercent: null };
    }
    return computeRealizedPnlFromExitLegs({
      side: trade.side,
      entryPrice: trade.entryPrice,
      fees: trade.fees ?? 0,
      assetType: trade.assetType,
      exitLegs: [{ quantity: Number(qty), price: Number(trade.exitPrice) }],
    });
  }

  return { pnl: null, pnlPercent: null };
}

/** For analytics: prefer computed realized P&amp;L; else stored `pnl`; else 0. */
export function resolvedRealizedPnl(trade) {
  const { pnl: computed } = computeRealizedPnlFromTradeSnapshot(trade);
  if (computed != null && Number.isFinite(computed)) return computed;
  if (
    trade.pnl != null &&
    trade.pnl !== undefined &&
    Number.isFinite(Number(trade.pnl))
  ) {
    return Number(trade.pnl);
  }
  return 0;
}
