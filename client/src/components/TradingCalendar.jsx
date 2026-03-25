import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  shiftCalendarMonth,
  buildCalendarGrid,
} from "../utils/dashboardDateRange";
import { formatSignedMoney, formatSignedMoneyCompact } from "../utils/formatMoney";
import { useMediaQuery } from "../hooks/useMediaQuery";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TradingCalendar = () => {
  const narrowScreen = useMediaQuery("(max-width: 768px)");
  const now = dayjs();
  const [view, setView] = useState({
    year: now.year(),
    month: now.month() + 1,
  });
  const [loading, setLoading] = useState(true);
  const [dayMap, setDayMap] = useState(() => new Map());

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await customFetch.get("/trades/dashboard-calendar", {
          params: { year: view.year, month: view.month },
        });
        const map = new Map(
          (data?.days ?? []).map((d) => [d.date, { netPnl: d.netPnl, trades: d.trades }]),
        );
        if (!cancelled) {
          setDayMap(map);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message ?? "Could not load calendar.",
          );
          setDayMap(new Map());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [view.year, view.month]);

  const goPrev = () =>
    setView((v) => shiftCalendarMonth(v.year, v.month, -1));
  const goNext = () =>
    setView((v) => shiftCalendarMonth(v.year, v.month, 1));
  const goThisMonth = () => {
    const d = dayjs();
    setView({ year: d.year(), month: d.month() + 1 });
  };

  const grid = buildCalendarGrid(view.year, view.month);
  const title = dayjs(`${view.year}-${String(view.month).padStart(2, "0")}-01`).format(
    "MMMM YYYY",
  );

  return (
    <div className="trading-calendar">
      <div className="trading-calendar-header">
        <h3 className="trading-calendar-title">Trading calendar</h3>
        <div className="trading-calendar-nav">
          <button
            type="button"
            className="trading-calendar-btn"
            onClick={goPrev}
            aria-label="Previous month"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
          <span className="trading-calendar-month">{title}</span>
          <button
            type="button"
            className="trading-calendar-btn"
            onClick={goNext}
            aria-label="Next month"
          >
            <HiOutlineChevronRight size={20} />
          </button>
          <button
            type="button"
            className="trading-calendar-today"
            onClick={goThisMonth}
          >
            This month
          </button>
        </div>
      </div>

      {loading ? (
        <p className="trading-calendar-loading">Loading…</p>
      ) : (
        <>
          <div className="trading-calendar-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="trading-calendar-weekday">
                {w}
              </span>
            ))}
          </div>
          <div className="trading-calendar-grid">
            {grid.map((cell, idx) => {
              if (cell === null) {
                return (
                  <div
                    key={`pad-${idx}`}
                    className="trading-calendar-cell trading-calendar-cell--pad"
                  />
                );
              }
              const dateKey = `${view.year}-${String(view.month).padStart(2, "0")}-${String(cell).padStart(2, "0")}`;
              const info = dayMap.get(dateKey);
              const hasTrades = info && info.trades > 0;
              const tone =
                hasTrades && info.netPnl > 0
                  ? "profit"
                  : hasTrades && info.netPnl < 0
                    ? "loss"
                    : "neutral";

              return (
                <div
                  key={dateKey}
                  className={`trading-calendar-cell trading-calendar-cell--day trading-calendar-cell--${tone}`}
                >
                  <span className="trading-calendar-day-num">{cell}</span>
                  {hasTrades ? (
                    <>
                      <span className="trading-calendar-pnl">
                        {narrowScreen
                          ? formatSignedMoneyCompact(info.netPnl)
                          : formatSignedMoney(info.netPnl)}
                      </span>
                      <span className="trading-calendar-count">
                        {info.trades} trade{info.trades === 1 ? "" : "s"}
                      </span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TradingCalendar;
