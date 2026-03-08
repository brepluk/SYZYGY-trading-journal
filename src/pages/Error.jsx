import { useRouteError } from "react-router-dom";
import Wrapper, {
  Content,
  HeroGraphics,
  DigitFour,
  FourBarTop,
  FourBarLeft,
  FourBarRight,
  FourCandle,
  DigitZero,
  ZeroBorder,
  ZeroDotTop,
  ZeroDotBottom,
  Title,
  BackHomeLink,
  ChartBackground,
  ScrollingChart,
  ChartSvg,
} from "../wrappers/ErrorPage";

const chartPath =
  "M0,80 L50,20 L100,50 L150,10 L200,90 L250,40 L300,70 L350,10 L400,60 L450,30 L500,80 L550,20 L600,50 L650,10 L700,90 L750,40 L800,70 L850,10 L900,60 L950,30 L1000,80";

const Error = () => {
  const error = useRouteError();

  if (error?.status === 404) {
    return (
      <Wrapper>
        <ChartBackground>
          <ScrollingChart>
            <ChartSvg viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={chartPath} />
            </ChartSvg>
            <ChartSvg viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d={chartPath} />
            </ChartSvg>
          </ScrollingChart>
        </ChartBackground>

        <Content>
          <HeroGraphics data-purpose="hero-graphics">
            <DigitFour>
              <FourBarTop />
              <FourBarLeft />
              <FourBarRight />
              <FourCandle />
            </DigitFour>
            <DigitZero>
              <ZeroBorder />
              <ZeroDotTop />
              <ZeroDotBottom />
            </DigitZero>
            <DigitFour>
              <FourBarTop />
              <FourBarLeft />
              <FourBarRight />
              <FourCandle />
            </DigitFour>
          </HeroGraphics>

          <Title>Lost In The Market ?</Title>

          <BackHomeLink to="/dashboard" data-purpose="back-to-dashboard-btn">
            BACK HOME
          </BackHomeLink>
        </Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Content>
        <Title>Something went wrong...</Title>
        <BackHomeLink to="/">BACK HOME</BackHomeLink>
      </Content>
    </Wrapper>
  );
};

export default Error;
