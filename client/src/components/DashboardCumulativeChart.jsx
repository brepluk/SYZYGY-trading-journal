import dayjs from "dayjs";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { formatMoney, formatMoneyCompact } from "../utils/formatMoney";

const fullCurrencyAxis = (v) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

const tickDate = (v) => {
  if (!v) return "";
  return dayjs(v).format("MM/DD/YY");
};

/** Insert points at y=0 when cumulative P&L crosses between positive and negative. */
function withZeroCrossings(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];
  const out = [];
  for (let i = 0; i < rows.length; i++) {
    out.push(rows[i]);
    if (i >= rows.length - 1) break;
    const cur = rows[i];
    const next = rows[i + 1];
    const a = Number(cur.cumulativeNetPnl);
    const b = Number(next.cumulativeNetPnl);
    if (Number.isNaN(a) || Number.isNaN(b)) continue;
    if (a === b) continue;
    if (!((a > 0 && b < 0) || (a < 0 && b > 0))) continue;
    const t = a / (a - b);
    if (t <= 0 || t >= 1) continue;
    const ts1 = new Date(cur.date).getTime();
    const ts2 = new Date(next.date).getTime();
    if (Number.isNaN(ts1) || Number.isNaN(ts2)) continue;
    const crossTs = ts1 + t * (ts2 - ts1);
    out.push({
      ...cur,
      date: new Date(crossTs).toISOString(),
      cumulativeNetPnl: 0,
      dailyNetPnl: 0,
      trades: 0,
      _pnlCrossing: true,
    });
  }
  return out;
}

function buildChartData(dailySeries) {
  return withZeroCrossings(Array.isArray(dailySeries) ? dailySeries : []).map(
    (row) => {
      const cum = Number(row.cumulativeNetPnl);
      const c = Number.isNaN(cum) ? 0 : cum;
      return {
        ...row,
        pnlAboveZero: Math.max(0, c),
        pnlBelowZero: Math.min(0, c),
      };
    },
  );
}

const tooltipBox = {
  background: "var(--card-background)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--border-radius)",
  padding: "0.5rem 0.65rem",
  fontSize: "0.8rem",
  color: "var(--text-color)",
  boxShadow: "var(--shadow-2)",
};

const CustomTooltip = ({ active, payload, compactMoney }) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const fmt = compactMoney ? formatMoneyCompact : formatMoney;
  return (
    <div style={tooltipBox}>
      <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
        {tickDate(row.date)}
      </div>
      <div>Day: {fmt(row.dailyNetPnl)}</div>
      <div>Cumulative: {fmt(row.cumulativeNetPnl)}</div>
      <div
        style={{
          marginTop: "0.25rem",
          color: "var(--text-secondary-color)",
          fontSize: "0.75rem",
        }}
      >
        {row.trades} trade{row.trades === 1 ? "" : "s"}
      </div>
    </div>
  );
};

const DashboardCumulativeChart = ({ dailySeries }) => {
  const data = buildChartData(dailySeries);

  const yAxisTick = (v) => {
    if (Math.abs(v) >= 1000) return formatMoneyCompact(v);
    return fullCurrencyAxis(v);
  };

  return (
    <div className="dashboard-chart-inner">
      <h3 className="dashboard-chart-title">Daily net cumulative P&amp;L</h3>
      {data.length === 0 ? (
        <p className="dashboard-chart-empty">No data for this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="dashboardPnlFillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--dashboard-profit, var(--profit-color, #2db86f))"
                  stopOpacity={0.42}
                />
                <stop
                  offset="100%"
                  stopColor="var(--dashboard-profit, var(--profit-color, #2db86f))"
                  stopOpacity={0.04}
                />
              </linearGradient>
              <linearGradient id="dashboardPnlFillLoss" x1="0" y1="1" x2="0" y2="0">
                <stop
                  offset="0%"
                  stopColor="var(--dashboard-loss, #e45656)"
                  stopOpacity={0.42}
                />
                <stop
                  offset="100%"
                  stopColor="var(--dashboard-loss, #e45656)"
                  stopOpacity={0.04}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              opacity={0.45}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={tickDate}
              stroke="var(--text-secondary-color)"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickFormatter={yAxisTick}
              stroke="var(--text-secondary-color)"
              tick={{ fontSize: 11 }}
              width={56}
            />
            <Tooltip
              content={<CustomTooltip compactMoney={false} />}
            />
            <Area
              type="linear"
              dataKey="pnlAboveZero"
              baseLine={0}
              stroke="none"
              fill="url(#dashboardPnlFillProfit)"
              isAnimationActive={false}
            />
            <Area
              type="linear"
              dataKey="pnlBelowZero"
              baseLine={0}
              stroke="none"
              fill="url(#dashboardPnlFillLoss)"
              isAnimationActive={false}
            />
            <ReferenceLine
              y={0}
              stroke="var(--dashboard-chart-zero-line)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <Line
              type="linear"
              dataKey="cumulativeNetPnl"
              stroke="var(--dashboard-chart-line, #4f46e5)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardCumulativeChart;
