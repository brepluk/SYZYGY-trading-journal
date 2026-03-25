import Wrapper from "../wrappers/TradeInfo";

const TradeInfo = ({ variant, value }) => {
  const raw = String(value ?? "").trim();
  const upper = raw.toUpperCase();

  if (variant === "side") {
    const key = upper.toLowerCase();
    return (
      <Wrapper>
        <span className={`trade-badge trade-badge--${key}`}>
          {upper || "—"}
        </span>
      </Wrapper>
    );
  }

  if (variant === "positionSide") {
    const key = upper.toLowerCase();
    if (!upper) {
      return (
        <Wrapper>
          <span className="trade-badge trade-badge--na">—</span>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <span className={`trade-badge trade-badge--${key}`}>{upper}</span>
      </Wrapper>
    );
  }

  if (variant === "status") {
    const key = upper.toLowerCase();
    return (
      <Wrapper>
        <span className={`trade-badge trade-badge--${key}`}>
          {upper || "—"}
        </span>
      </Wrapper>
    );
  }

  return null;
};

export default TradeInfo;
