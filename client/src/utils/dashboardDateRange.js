import dayjs from "dayjs";

/** Default when `?range=` is missing on Dashboard. */
export const DEFAULT_DATE_RANGE_KEY = "this_month";

/** Navbar / API: `range` query param value → label */
export const DATE_FILTER_OPTIONS = [
  { key: "today", label: "Today" },
  { key: "this_week", label: "This week" },
  { key: "this_month", label: "This month" },
  { key: "last_30_days", label: "Last 30 days" },
  { key: "last_month", label: "Last month" },
  { key: "this_quarter", label: "This quarter" },
  { key: "ytd", label: "YTD" },
  { key: "all_time", label: "All time" },
];

const VALID_KEYS = new Set(DATE_FILTER_OPTIONS.map((o) => o.key));

export function normalizeDateRangeKey(value) {
  if (value && VALID_KEYS.has(value)) return value;
  return DEFAULT_DATE_RANGE_KEY;
}

export function getDateFilterLabel(key) {
  return DATE_FILTER_OPTIONS.find((o) => o.key === key)?.label ?? key;
}

/** @param {number} year @param {number} month 1–12 @param {number} delta */
export function shiftCalendarMonth(year, month, delta) {
  const d = dayjs()
    .year(year)
    .month(month - 1)
    .add(delta, "month");
  return { year: d.year(), month: d.month() + 1 };
}

/** Monday-first week rows for a month (null = empty cell). */
export function buildCalendarGrid(year, month) {
  const first = dayjs()
    .year(year)
    .month(month - 1)
    .date(1);
  const daysInMonth = first.daysInMonth();
  /** Monday = 0 … Sunday = 6 */
  const mondayOffset = (first.day() + 6) % 7;
  const cells = [];
  for (let i = 0; i < mondayOffset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
