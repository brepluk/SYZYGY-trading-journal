import dayjs from "dayjs";
import { FaPen, FaRegStickyNote, FaRegTrashAlt } from "react-icons/fa";
import TradeInfo from "./TradeInfo";
import Wrapper from "../wrappers/Trade";
import { Link, Form } from "react-router-dom";
import { formatSignedPercent } from "../utils/formatMoney";

const money = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(n));
};

const signedPnl = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) {
    return { text: "—", tone: "neutral" };
  }
  const num = Number(n);
  const abs = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(num));
  const text = `${num >= 0 ? "+" : "-"}${abs}`;
  const tone = num > 0 ? "profit" : num < 0 ? "loss" : "neutral";
  return { text, tone };
};

const signedRoiPercent = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) {
    return { text: "—", tone: "neutral" };
  }
  const num = Number(n);
  const text = formatSignedPercent(num);
  const tone = num > 0 ? "profit" : num < 0 ? "loss" : "neutral";
  return { text, tone };
};

const Trade = ({
  ticker,
  id,
  side,
  positionSide,
  status,
  entryDate,
  exitPrice,
  entryPrice,
  contracts,
  pnl,
  pnlPercent,
  quantity,
  exitLegs,
}) => {
  const dateStr = entryDate ? dayjs(entryDate).format("MM/DD/YYYY") : "—";
  const { text: pnlText, tone: pnlTone } = signedPnl(pnl);
  const { text: roiText, tone: roiTone } = signedRoiPercent(pnlPercent);
  const qtyDisplay =
    contracts != null
      ? contracts
      : quantity != null && !Number.isNaN(Number(quantity))
        ? quantity
        : "—";

  const latestExitPrice =
    Array.isArray(exitLegs) && exitLegs.length > 0
      ? exitLegs[exitLegs.length - 1]?.price
      : exitPrice;
  const exitDisplay = String(status ?? "").toUpperCase() === "OPEN" ? "—" : money(latestExitPrice);
  const exitsLabel =
    Array.isArray(exitLegs) && exitLegs.length > 0 ? ` (${exitLegs.length})` : "";

  return (
    <Wrapper className="trade-row trades-grid">
      <div className="trade-cell trade-cell--symbol">
        <span className="trade-cell__label">Symbol</span>
        <span className="trade-cell__value">{ticker ?? "—"}</span>
      </div>
      <div className="trade-cell trade-cell--execution">
        <span className="trade-cell__label">Buy / Sell</span>
        <span className="trade-cell__value">
          <TradeInfo variant="side" value={side} />
        </span>
      </div>
      <div className="trade-cell trade-cell--position">
        <span className="trade-cell__label">Call / Put</span>
        <span className="trade-cell__value">
          <TradeInfo variant="positionSide" value={positionSide} />
        </span>
      </div>
      <div className="trade-cell trade-cell--entry">
        <span className="trade-cell__label">Entry</span>
        <span className="trade-cell__value">{money(entryPrice)}</span>
      </div>
      <div className="trade-cell trade-cell--exit">
        <span className="trade-cell__label">Exit{exitsLabel}</span>
        <span className="trade-cell__value">{exitDisplay}</span>
      </div>
      <div className="trade-cell trade-cell--qty">
        <span className="trade-cell__label">Contracts</span>
        <span className="trade-cell__value">{qtyDisplay}</span>
      </div>
      <div className="trade-cell trade-cell--date">
        <span className="trade-cell__label">Date</span>
        <span className="trade-cell__value trade-cell--muted">{dateStr}</span>
      </div>
      <div
        className={`trade-cell trade-cell--pnl trade-pnl trade-pnl--${pnlTone}`}
      >
        <span className="trade-cell__label">Net P&amp;L</span>
        <span className="trade-cell__value">{pnlText}</span>
      </div>
      <div
        className={`trade-cell trade-cell--roi trade-pnl trade-pnl--${roiTone}`}
      >
        <span className="trade-cell__label">ROI %</span>
        <span className="trade-cell__value">{roiText}</span>
      </div>
      <div className="trade-cell trade-cell--status">
        <span className="trade-cell__label">Status</span>
        <span className="trade-cell__value">
          <TradeInfo variant="status" value={status} />
        </span>
      </div>
      <div className="trade-cell trade-cell--notes">
        <span className="trade-cell__label">Notes</span>
        <span className="trade-cell__value">
          <Link
            to={`../trade/${id}/notes`}
            className="trade-icon-btn"
            aria-label="Open trade notes"
            title="Journal notes"
          >
            <FaRegStickyNote size={17} />
          </Link>
        </span>
      </div>
      <div className="trade-cell trade-actions">
        <Link
          to={`../edit-trade/${id}`}
          className="trade-icon-btn"
          aria-label="Edit trade"
        >
          <FaPen size={16} />
        </Link>
        <Form method="post" action={`../delete-trade/${id}`}>
          <button
            type="submit"
            className="trade-icon-btn trade-icon-btn--danger"
            aria-label="Delete trade"
          >
            <FaRegTrashAlt size={17} />
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Trade;
