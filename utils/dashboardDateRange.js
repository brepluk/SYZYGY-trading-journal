import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import quarterOfYear from "dayjs/plugin/quarterOfYear.js";

dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);

/** Query param `range` values for `GET /trades/dashboard-stats`. */
export const DASHBOARD_RANGE_KEYS = [
  "today",
  "this_week",
  "this_month",
  "last_30_days",
  "last_month",
  "this_quarter",
  "ytd",
  "all_time",
];

/**
 * Express may set `req.query.range` to a string[] when `range=` appears more than once.
 * @param {string | string[] | undefined | null} raw
 * @returns {string | undefined}
 */
function normalizeDashboardRangeKey(raw) {
  if (raw == null) return undefined;
  const s = Array.isArray(raw)
    ? raw.find((x) => typeof x === "string" && x.trim() !== "")
    : raw;
  if (typeof s !== "string") return undefined;
  const t = s.trim();
  return t === "" ? undefined : t;
}

/**
 * Resolves [start, end] for closed-trade stats (exitDate inclusive).
 * `all_time` uses no upper bound so future exit dates still count (matches calendar / list).
 * @param {string | string[] | undefined | null} rangeKey
 * @param {Date} [now]
 * @returns {{ key: string, startDate: Date | null, endDate: Date | null }}
 */
export function resolveDashboardRange(rangeKey, now = new Date()) {
  const normalized = normalizeDashboardRangeKey(rangeKey);
  const key =
    normalized && DASHBOARD_RANGE_KEYS.includes(normalized)
      ? normalized
      : "this_month";
  const d = dayjs(now);

  let start;
  let end = d.endOf("day");

  switch (key) {
    case "today":
      start = d.startOf("day");
      break;
    case "this_week":
      start = d.startOf("isoWeek");
      end = d.endOf("isoWeek");
      break;
    case "this_month":
      start = d.startOf("month");
      end = d.endOf("month");
      break;
    case "last_30_days":
      start = d.subtract(29, "day").startOf("day");
      break;
    case "last_month":
      start = d.subtract(1, "month").startOf("month");
      end = d.subtract(1, "month").endOf("month");
      break;
    case "this_quarter":
      start = d.startOf("quarter");
      end = d.endOf("quarter");
      break;
    case "ytd":
      start = d.startOf("year");
      break;
    case "all_time":
      start = null;
      end = null;
      break;
    default:
      start = d.startOf("month");
      end = d.endOf("month");
  }

  return {
    key,
    startDate: start ? start.toDate() : null,
    endDate: end ? end.toDate() : null,
  };
}

/**
 * Calendar month bounds (local) for `GET /trades/dashboard-calendar`.
 * @param {number} year
 * @param {number} month 1–12
 */
export function resolveCalendarMonth(year, month) {
  const start = dayjs()
    .year(year)
    .month(month - 1)
    .startOf("month");
  const end = start.endOf("month");
  return {
    year: start.year(),
    month: start.month() + 1,
    startDate: start.startOf("day").toDate(),
    endDate: end.endOf("day").toDate(),
  };
}
