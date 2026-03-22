import Wrapper from "../wrappers/TradeInfo";

const ARROW = {
  CALL: "↑",
  PUT: "↓",
};

const TradeInfo = ({ variant, value }) => {
  const raw = String(value ?? "").trim();
  const upper = raw.toUpperCase();

  if (variant === "side") {
    const key = upper.toLowerCase();
    const arrow = ARROW[upper] ?? null;
    return (
      <Wrapper>
        <span className={`trade-badge trade-badge--${key}`}>
          {arrow ? (
            <span className="trade-badge__arrow" aria-hidden>
              {arrow}
            </span>
          ) : null}
          {upper || "—"}
        </span>
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
