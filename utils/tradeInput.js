/** Form bodies send strings; Prisma expects numbers. Empty optional fields → null. */
export const toFloat = (value) => Number.parseFloat(String(value));

export const toOptionalFloat = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const n = Number.parseFloat(String(value));
  return Number.isNaN(n) ? null : n;
};

export const toOptionalInt = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const n = Number.parseInt(String(value), 10);
  return Number.isNaN(n) ? null : n;
};

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.valueOf());

export const parseExitLegsFromBody = (body) => {
  if (!Object.prototype.hasOwnProperty.call(body, "exitLegs")) return undefined;
  const raw = body.exitLegs;
  if (raw === undefined || raw === null || raw === "") return [];

  let parsed;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];

  const legs = [];
  for (const leg of parsed) {
    const q = Number(leg?.quantity);
    const px = Number(leg?.price);
    const note = typeof leg?.note === "string" ? leg.note : undefined;

    if (!Number.isFinite(q) || q <= 0) continue;
    if (!Number.isFinite(px)) continue;

    let exitDate = leg?.exitDate ? new Date(leg.exitDate) : null;
    if (!isValidDate(exitDate)) {
      // If user entered qty/price but forgot date, still persist with "now"
      exitDate = new Date();
    }

    legs.push({
      quantity: q,
      price: px,
      exitDate,
      ...(note && note.trim() ? { note: note.trim() } : {}),
    });
  }

  legs.sort((a, b) => a.exitDate - b.exitDate);
  return legs;
};

export const lastExitDate = (legs) => {
  if (!Array.isArray(legs) || legs.length === 0) return null;
  return legs[legs.length - 1].exitDate ?? null;
};

// Browser form inputs arrive as strings; coerce only fields that exist on Trade.
export const normalizeTradeInput = (body) => {
  const out = {};

  const stringFields = [
    "ticker",
    "assetType",
    "side",
    "positionSide",
    "status",
    "thesis",
    "notes",
    "setupTag",
  ];
  for (const key of stringFields) {
    if (Object.prototype.hasOwnProperty.call(body, key)) out[key] = body[key];
  }

  if (Object.prototype.hasOwnProperty.call(body, "entryDate")) {
    const v = body.entryDate;
    if (v !== "" && v != null) out.entryDate = new Date(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "exitDate")) {
    const v = body.exitDate;
    out.exitDate = v === "" || v == null ? null : new Date(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "expiration")) {
    const v = body.expiration;
    out.expiration = v === "" || v == null ? null : new Date(v);
  }

  if (Object.prototype.hasOwnProperty.call(body, "entryPrice")) {
    const v = body.entryPrice;
    if (v !== "" && v != null) out.entryPrice = toFloat(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "exitPrice")) {
    out.exitPrice = toOptionalFloat(body.exitPrice);
  }
  if (Object.prototype.hasOwnProperty.call(body, "contracts")) {
    out.contracts = toOptionalInt(body.contracts);
  }
  if (Object.prototype.hasOwnProperty.call(body, "quantity")) {
    out.quantity = toOptionalFloat(body.quantity);
  }
  if (Object.prototype.hasOwnProperty.call(body, "strike")) {
    out.strike = toOptionalFloat(body.strike);
  }
  if (Object.prototype.hasOwnProperty.call(body, "fees")) {
    const v = body.fees;
    out.fees = v === undefined || v === "" || v == null ? 0 : toFloat(v);
  }
  if (Object.prototype.hasOwnProperty.call(body, "pnl")) {
    out.pnl = toOptionalFloat(body.pnl);
  }
  if (Object.prototype.hasOwnProperty.call(body, "pnlPercent")) {
    out.pnlPercent = toOptionalFloat(body.pnlPercent);
  }

  return out;
};
