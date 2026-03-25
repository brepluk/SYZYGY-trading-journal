const pad2 = (n) => String(n).padStart(2, "0");

// For <input type="datetime-local" step={1} />, browsers expect:
// YYYY-MM-DDTHH:mm:ss (local time, no timezone suffix).
export const toDateTimeLocalValue = (value) => {
  if (value === undefined || value === null || value === "") return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const min = pad2(d.getMinutes());
  const sec = pad2(d.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}`;
};

// For <input type="date" />, browsers expect: YYYY-MM-DD (local time).
/** "3m ago" style — pass a Date, ISO string, or unix seconds (Finnhub uses seconds). */
export const formatRelativeTime = (value) => {
  if (value === undefined || value === null || value === "") return "";
  let ms;
  if (typeof value === "number") {
    ms = value < 1e12 ? value * 1000 : value;
  } else {
    const d = value instanceof Date ? value : new Date(value);
    ms = d.getTime();
  }
  if (Number.isNaN(ms)) return "";
  const sec = Math.round((Date.now() - ms) / 1000);
  if (sec < 10) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const toDateInputValue = (value) => {
  if (value === undefined || value === null || value === "") return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
};
