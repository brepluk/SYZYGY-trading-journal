import Trade from "./Trade";
import Wrapper from "../wrappers/TradesContainer";
import { useAllTradesContext } from "../pages/AllTrades";

const TradesContainer = () => {
  const { data } = useAllTradesContext();
  const trades = Array.isArray(data) ? data : [];
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
      <div className="trades-table">
        <div className="trades-header trades-grid">
          <span>Symbol</span>
          <span>Side</span>
          <span>Entry</span>
          <span>Exit</span>
          <span>Contracts</span>
          <span>Date</span>
          <span>Net P&amp;L</span>
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
    </Wrapper>
  );
};
export default TradesContainer;
