import dayjs from "dayjs";
import { prisma } from "../prisma/client.js";
import { BadRequestError } from "../errors/customErrors.js";
import {
  resolveDashboardRange,
  resolveCalendarMonth,
} from "../utils/dashboardDateRange.js";
import { resolvedRealizedPnl } from "../utils/tradePnl.js";
import { TRADE_STATUS } from "../utils/constants.js";

const dayKeyFromDate = (d) => dayjs(d).format("YYYY-MM-DD");

export const buildDailySeries = (startDate, endDate, trades) => {
  const dailyNet = new Map();
  const dailyCount = new Map();
  for (const t of trades) {
    if (!t.exitDate) continue;
    const k = dayKeyFromDate(t.exitDate);
    const p = resolvedRealizedPnl(t);
    dailyNet.set(k, (dailyNet.get(k) ?? 0) + p);
    dailyCount.set(k, (dailyCount.get(k) ?? 0) + 1);
  }
  const days = [];
  let cur = dayjs(startDate).startOf("day");
  let last = dayjs(endDate).startOf("day");
  if (cur.isAfter(last)) {
    cur = last;
  }
  let cumulative = 0;
  while (cur.isBefore(last) || cur.isSame(last, "day")) {
    const key = cur.format("YYYY-MM-DD");
    const dailyNetPnl = dailyNet.get(key) ?? 0;
    const tradeCount = dailyCount.get(key) ?? 0;
    cumulative += dailyNetPnl;
    days.push({
      date: key,
      dailyNetPnl,
      cumulativeNetPnl: cumulative,
      trades: tradeCount,
    });
    cur = cur.add(1, "day");
  }
  return days;
};

export async function fetchDashboardStats(userId, rangeQuery) {
  const { key, startDate, endDate } = resolveDashboardRange(rangeQuery);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: TRADE_STATUS.CLOSED,
      exitDate: {
        not: null,
        ...(endDate ? { lte: endDate } : {}),
        ...(startDate ? { gte: startDate } : {}),
      },
    },
    include: {
      exitLegs: { orderBy: { exitDate: "asc" } },
    },
  });

  let netPnl = 0;
  for (const t of trades) {
    netPnl += resolvedRealizedPnl(t);
  }

  const totalClosedTrades = trades.length;
  let winningTrades = 0;
  for (const t of trades) {
    if (resolvedRealizedPnl(t) > 0) winningTrades += 1;
  }
  const tradeWinRate =
    totalClosedTrades > 0 ? (winningTrades / totalClosedTrades) * 100 : 0;

  const winPnls = trades
    .map((t) => resolvedRealizedPnl(t))
    .filter((p) => p > 0);
  const lossPnls = trades
    .map((t) => resolvedRealizedPnl(t))
    .filter((p) => p < 0);

  const avgWin =
    winPnls.length > 0
      ? winPnls.reduce((s, p) => s + p, 0) / winPnls.length
      : null;
  const avgLoss =
    lossPnls.length > 0
      ? lossPnls.reduce((s, p) => s + p, 0) / lossPnls.length
      : null;

  let seriesStart = startDate;
  if (!seriesStart) {
    if (trades.length > 0) {
      const earliest = trades.reduce(
        (min, t) => (t.exitDate < min ? t.exitDate : min),
        trades[0].exitDate,
      );
      seriesStart = dayjs(earliest).startOf("day").toDate();
    } else {
      seriesStart = dayjs().startOf("day").toDate();
    }
  }

  let seriesEnd = endDate;
  if (!seriesEnd) {
    if (trades.length > 0) {
      const latest = trades.reduce(
        (max, t) => (t.exitDate > max ? t.exitDate : max),
        trades[0].exitDate,
      );
      seriesEnd = dayjs(latest).endOf("day").toDate();
    } else {
      seriesEnd = dayjs().endOf("day").toDate();
    }
  }

  const dailySeries = buildDailySeries(seriesStart, seriesEnd, trades);

  return {
    summary: {
      netPnl,
      tradeWinRate,
      avgWin,
      avgLoss,
      winningTrades,
      losingTrades: lossPnls.length,
      totalClosedTrades,
    },
    dailySeries,
    range: {
      key,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    },
  };
}

export async function fetchDashboardCalendar(userId, yearRaw, monthRaw) {
  const year = Number.parseInt(String(yearRaw ?? ""), 10);
  const month = Number.parseInt(String(monthRaw ?? ""), 10);
  if (Number.isNaN(year) || year < 1970 || year > 2100) {
    throw new BadRequestError("Invalid year");
  }
  if (Number.isNaN(month) || month < 1 || month > 12) {
    throw new BadRequestError("Invalid month");
  }

  const {
    startDate,
    endDate,
    year: y,
    month: m,
  } = resolveCalendarMonth(year, month);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      entryDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      exitLegs: { orderBy: { exitDate: "asc" } },
    },
  });

  const dailyNet = new Map();
  const dailyCount = new Map();
  for (const t of trades) {
    const k = dayKeyFromDate(t.entryDate);
    const isClosed =
      String(t.status ?? "").toUpperCase() === TRADE_STATUS.CLOSED;
    const p = isClosed ? resolvedRealizedPnl(t) : 0;
    dailyNet.set(k, (dailyNet.get(k) ?? 0) + p);
    dailyCount.set(k, (dailyCount.get(k) ?? 0) + 1);
  }

  const days = [];
  let cur = dayjs(startDate).startOf("day");
  const last = dayjs(endDate).startOf("day");
  while (cur.isBefore(last) || cur.isSame(last, "day")) {
    const key = cur.format("YYYY-MM-DD");
    days.push({
      date: key,
      netPnl: dailyNet.get(key) ?? 0,
      trades: dailyCount.get(key) ?? 0,
    });
    cur = cur.add(1, "day");
  }

  return {
    month: {
      year: y,
      month: m,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
    days,
  };
}
