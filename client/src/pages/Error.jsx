import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../wrappers/ErrorPage";

const chartPath =
  "M0,80 L50,20 L100,50 L150,10 L200,90 L250,40 L300,70 L350,10 L400,60 L450,30 L500,80 L550,20 L600,50 L650,10 L700,90 L750,40 L800,70 L850,10 L900,60 L950,30 L1000,80";

const Error = () => {
  const error = useRouteError();

  if (error?.status === 404) {
    return (
      <Wrapper>
        <div className="chart-background">
          <div className="scrolling-chart">
            <svg className="chart-svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={chartPath} />
            </svg>
            <svg className="chart-svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={chartPath} />
            </svg>
          </div>
        </div>

        <div className="content">
          <div className="hero-graphics" data-purpose="hero-graphics">
            <div className="digit-four">
              <div className="four-bar-top" />
              <div className="four-bar-left" />
              <div className="four-bar-right" />
              <div className="four-candle" />
            </div>
            <div className="digit-zero">
              <div className="zero-border" />
              <div className="zero-dot-top" />
              <div className="zero-dot-bottom" />
            </div>
            <div className="digit-four">
              <div className="four-bar-top" />
              <div className="four-bar-left" />
              <div className="four-bar-right" />
              <div className="four-candle" />
            </div>
          </div>

          <h1 className="title">Lost In The Market ?</h1>

          <Link to="/dashboard" className="back-home-link" data-purpose="back-to-dashboard-btn">
            BACK HOME
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="content">
        <h1 className="title">Something went wrong...</h1>
        <Link to="/" className="back-home-link">
          BACK HOME
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
