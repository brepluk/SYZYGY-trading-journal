import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoComponent from "../components/Logo";

/* ----- Wrapper (uses global Astra theme from css/theme.css) ----- */
const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--astra-bg);
`;

/* ----- Nav ----- */
const Nav = styled.nav`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid var(--astra-border);
`;
const Logo = styled(LogoComponent)`
  display: flex;
  align-items: center;
  color: var(--astra-text);
  text-decoration: none;
  &:hover {
    color: var(--astra-white);
  }
`;
const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const LoginLink = styled(Link)`
  color: var(--astra-muted);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--astra-border);
  border-radius: var(--border-radius-lg);
  transition: color var(--transition), border-color var(--transition), background var(--transition);
  &:hover {
    color: var(--astra-text);
    border-color: var(--astra-muted);
    background: rgba(255, 255, 255, 0.03);
  }
`;
const SignUpLink = styled(Link)`
  color: var(--astra-text-inverse);
  background: var(--astra-text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid var(--astra-text);
  border-radius: var(--border-radius-lg);
  transition: color var(--transition), background var(--transition), border-color var(--transition);
  &:hover {
    color: var(--astra-text);
    background: var(--astra-white);
    border-color: var(--astra-white);
  }
`;

/* ----- Sections ----- */
const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;
const AboutSection = styled(Section)`
  padding-top: 4rem;
  text-align: center;
`;
const AboutTitle = styled.h1`
  color: var(--astra-text);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: var(--letter-spacing);
  margin-bottom: 1rem;
`;
const AboutSub = styled.p`
  color: var(--astra-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;
const AboutBody = styled.p`
  color: var(--astra-accent);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
`;

/* ----- Tool widgets ----- */
const ToolsTitle = styled.h2`
  color: var(--astra-text);
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;
const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
`;
const ToolCard = styled.div`
  background: var(--astra-card);
  border: 1px solid var(--astra-border);
  border-radius: 10px;
  padding: 1.5rem;
  transition: border-color var(--transition), box-shadow var(--transition);
  &:hover {
    border-color: var(--astra-muted);
    box-shadow: var(--shadow-3);
  }
`;
const ToolIcon = styled.span`
  display: block;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  opacity: 0.9;
`;
const ToolName = styled.h3`
  color: var(--astra-text);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;
const ToolDesc = styled.p`
  color: var(--astra-muted);
  font-size: var(--small-text);
  line-height: 1.5;
`;

/* ----- Dashboard preview ----- */
const DashboardSection = styled(Section)`
  padding-top: 1rem;
  padding-bottom: 4rem;
`;
const DashboardTitle = styled.h2`
  color: var(--astra-text);
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;
const DashboardFrame = styled.div`
  background: var(--astra-surface);
  border: 1px solid var(--astra-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-astra);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashboardPlaceholder = styled.div`
  color: var(--astra-muted);
  font-size: 1rem;
  text-align: center;
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    -2deg,
    transparent,
    transparent 20px,
    rgba(255, 255, 255, 0.02) 20px,
    rgba(255, 255, 255, 0.02) 21px
  );
`;
const DashboardImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center top;
  display: block;
`;

export default Wrapper;
export {
  Nav,
  Logo,
  NavActions,
  LoginLink,
  SignUpLink,
  Section,
  AboutSection,
  AboutTitle,
  AboutSub,
  AboutBody,
  ToolsTitle,
  ToolsGrid,
  ToolCard,
  ToolIcon,
  ToolName,
  ToolDesc,
  DashboardSection,
  DashboardTitle,
  DashboardFrame,
  DashboardPlaceholder,
  DashboardImage,
};
