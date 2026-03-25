const trimThousandsDecimals = (k) => {
  let s = k.toFixed(2);
  s = s.replace(/\.?0+$/, "");
  return s;
};

export const formatMoney = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(n));
};

/** For narrow screens: |n| ≥ 1000 → $1.2k style; otherwise full currency. */
export const formatMoneyCompact = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  const num = Number(n);
  const abs = Math.abs(num);
  if (abs < 1000) return formatMoney(num);
  const ks = trimThousandsDecimals(abs / 1000);
  return num < 0 ? `-$${ks}k` : `$${ks}k`;
};

/** Signed currency: +$123 / −$45 */
export const formatSignedMoney = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) {
    return "—";
  }
  const num = Number(n);
  const abs = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(num));
  return `${num >= 0 ? "+" : "-"}${abs}`;
};

/** Signed compact: +$1.2k when |n| ≥ 1000 (for mobile). */
export const formatSignedMoneyCompact = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) {
    return "—";
  }
  const num = Number(n);
  const abs = Math.abs(num);
  if (abs < 1000) return formatSignedMoney(num);
  const ks = trimThousandsDecimals(abs / 1000);
  return `${num >= 0 ? "+" : "-"}$${ks}k`;
};

export const formatPercent = (n, digits = 1) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  return `${Number(n).toFixed(digits)}%`;
};

/** Signed percent for ROI: +12.3% / −4.5% */
export const formatSignedPercent = (n, digits = 1) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) {
    return "—";
  }
  const num = Number(n);
  const abs = Math.abs(num).toFixed(digits);
  return `${num >= 0 ? "+" : "-"}${abs}%`;
};
