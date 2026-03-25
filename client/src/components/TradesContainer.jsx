import Trade from "./Trade";
import Wrapper from "../wrappers/TradesContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useAllTradesContext } from "../pages/AllTrades";

const TradesContainer = () => {
  const { data } = useAllTradesContext();
  const trades = Array.isArray(data?.trades) ? data.trades : [];
  const totalTrades = data?.totalTrades ?? 0;
  const numPages = data?.numPages ?? 0;

  if (trades.length === 0) {
    return (
      <Wrapper>
        <div className="trades-table">
          <h2 className="trades-empty">No trades found</h2>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <p className="trades-count" aria-live="polite">
        {totalTrades} trade{totalTrades !== 1 ? "s" : ""} found
      </p>
      <div className="trades-table">
        <div className="trades-header trades-grid">
          <span>Symbol</span>
          <span>Buy / Sell</span>
          <span>Call / Put</span>
          <span>Entry</span>
          <span>Exit</span>
          <span>Contracts</span>
          <span>Date</span>
          <span>Net P&amp;L</span>
          <span>ROI %</span>
          <span>Status</span>
          <span>Notes</span>
          <span className="trades-col-actions" />
        </div>
        <div className="trades">
          {trades.map((trade) => {
            return <Trade key={trade.id} {...trade} />;
          })}
        </div>
      </div>
      {numPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TradesContainer;
