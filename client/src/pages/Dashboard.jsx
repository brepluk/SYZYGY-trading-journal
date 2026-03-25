import { useEffect } from "react";
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../wrappers/Dashboard";
import TradingCalendar from "../components/TradingCalendar";
import DashboardCumulativeChart from "../components/DashboardCumulativeChart";
import customFetch from "../utils/customFetch";
import { normalizeDateRangeKey } from "../utils/dashboardDateRange";
import { formatMoney, formatPercent } from "../utils/formatMoney";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const range = normalizeDateRangeKey(url.searchParams.get("range"));
  try {
    const { data } = await customFetch.get("/trades/dashboard-stats", {
      params: { range },
    });
    return { stats: data, range };
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Could not load dashboard stats.",
    );
    return { stats: null, range, error: true };
  }
};

const toneClass = (n) => {
  if (n == null || Number.isNaN(Number(n))) return "neutral";
  if (n > 0) return "profit";
  if (n < 0) return "loss";
  return "neutral";
};

const Dashboard = () => {
  const { stats, range } = useLoaderData();
  const [searchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const urlRange = normalizeDateRangeKey(searchParams.get("range"));

  useEffect(() => {
    if (urlRange !== range) {
      revalidator.revalidate();
    }
  }, [urlRange, range, revalidator]);

  const summary = stats?.summary;
  const dailySeries = stats?.dailySeries;

  const netPnl = summary?.netPnl;
  const winRate = summary?.tradeWinRate;
  const avgWin = summary?.avgWin;
  const avgLoss = summary?.avgLoss;
  const totalClosed = summary?.totalClosedTrades ?? 0;

  return (
    <Wrapper>
      <div className="dashboard-cards-row">
        <div className="dashboard-card">
          <span className="dashboard-card-label">Net P&amp;L</span>
          <span
            className={`dashboard-card-value dashboard-card-value--${toneClass(netPnl)}`}
          >
            {formatMoney(netPnl)}
          </span>
          <span className="dashboard-card-sub">
            {totalClosed} closed trade{totalClosed === 1 ? "" : "s"}
          </span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Trade win %</span>
          <span className="dashboard-card-value dashboard-card-value--profit">
            {formatPercent(winRate)}
          </span>
          <span className="dashboard-card-sub">
            {summary?.winningTrades ?? 0}W / {summary?.losingTrades ?? 0}L
          </span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Avg win</span>
          <span className="dashboard-card-value dashboard-card-value--profit">
            {avgWin != null ? formatMoney(avgWin) : "—"}
          </span>
          <span className="dashboard-card-sub">Winning trades only</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Avg loss</span>
          <span className="dashboard-card-value dashboard-card-value--loss">
            {avgLoss != null ? formatMoney(avgLoss) : "—"}
          </span>
          <span className="dashboard-card-sub">Losing trades only</span>
        </div>
      </div>

      <section className="dashboard-chart-section">
        <DashboardCumulativeChart dailySeries={dailySeries} />
      </section>

      <section className="dashboard-calendar-section">
        <TradingCalendar />
      </section>
    </Wrapper>
  );
};

export default Dashboard;
