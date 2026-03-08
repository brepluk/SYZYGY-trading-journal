import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--background-color);
  color: var(--error-404-neon-green);
  font-family: "Courier New", Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;

  /* CRT scanline overlay */
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
          rgba(18, 16, 16, 0) 50%,
          rgba(0, 0, 0, 0.1) 50%
        ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.03),
        rgba(0, 255, 0, 0.01),
        rgba(0, 0, 255, 0.03)
      );
    z-index: 20;
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  max-width: 800px;
  width: 100%;
`;

export const HeroGraphics = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

/* Single "4" candlestick (red) */
export const DigitFour = styled.div`
  position: relative;
  width: 6rem;
  height: 12rem;
  filter: drop-shadow(0 0 8px rgba(239, 28, 36, 0.6));
  animation: error404-flicker 3s ease-in-out infinite alternate;
  &:last-of-type {
    animation-delay: 0.5s;
  }
  @media (min-width: 768px) {
    width: 8rem;
    height: 16rem;
  }
`;

export const FourBarTop = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  height: 4px;
  background: var(--error-404-neon-red);
`;

export const FourBarLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 50%;
  background: var(--error-404-neon-red);
`;

export const FourBarRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--error-404-neon-red);
`;

export const FourCandle = styled.div`
  position: absolute;
  right: -1rem;
  top: 60%;
  width: 2rem;
  height: 2rem;
  background: var(--error-404-neon-red);
`;

/* "0" candlestick (green) */
export const DigitZero = styled.div`
  position: relative;
  width: 6rem;
  height: 12rem;
  filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.6));
  @media (min-width: 768px) {
    width: 8rem;
    height: 16rem;
  }
`;

export const ZeroBorder = styled.div`
  position: absolute;
  inset: 0;
  border: 4px solid var(--error-404-neon-green);
`;

export const ZeroDotTop = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  background: var(--error-404-neon-green);
`;

export const ZeroDotBottom = styled.div`
  position: absolute;
  bottom: -0.5rem;
  left: -0.5rem;
  width: 2rem;
  height: 2rem;
  background: var(--error-404-neon-green);
`;

export const Title = styled.h1`
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  padding: 0 1rem;
`;

export const BackHomeLink = styled(Link)`
  display: inline-block;
  position: relative;
  padding: 1rem 2rem;
  font-weight: 700;
  border: 2px solid var(--error-404-neon-green);
  color: var(--error-404-neon-green);
  background: transparent;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: var(--error-404-neon-green);
    color: var(--background-color);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
  /* Pixel corners */
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--error-404-neon-green);
  }
  &::before {
    top: -2px;
    left: -2px;
  }
  &::after {
    bottom: -2px;
    right: -2px;
  }
`;

export const ChartBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8rem;
  opacity: 0.3;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
`;

export const ScrollingChart = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  animation: error404-chart-move 20s linear infinite;
  align-items: flex-end;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  path {
    fill: none;
    stroke: var(--error-404-chart);
    stroke-width: 2;
  }
`;

export default Wrapper;
