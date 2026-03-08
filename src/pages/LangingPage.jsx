import { FiClipboard, FiBarChart2, FiBook } from "react-icons/fi";
import Starfield from "../components/Starfield";
import Wrapper, {
  Nav,
  Logo,
  NavActions,
  LoginLink,
  SignUpLink,
  AboutSection,
  AboutTitle,
  AboutSub,
  AboutBody,
  Section,
  ToolsTitle,
  ToolsGrid,
  ToolCard,
  ToolIcon,
  ToolName,
  ToolDesc,
  DashboardSection,
  DashboardTitle,
  DashboardFrame,
  DashboardImage,
} from "../wrappers/LandingPage";
import screenImg from "../assets/images/screen.png";

const LangingPage = () => {
  const tools = [
    {
      Icon: FiClipboard,
      name: "Trade logging",
      desc: "Log entries, pairs, and outcomes in one place with tags and notes.",
    },
    {
      Icon: FiBarChart2,
      name: "Analytics & stats",
      desc: "Win rate, P&L curves, and performance breakdowns at a glance.",
    },
    {
      Icon: FiBook,
      name: "Journal & review",
      desc: "Reflect on trades and build a searchable journal over time.",
    },
  ];

  return (
    <Wrapper>
      <Starfield count={80} />
      <Nav>
        <Logo to="/" />
        <NavActions>
          <LoginLink to="/login">Login</LoginLink>
          <SignUpLink to="/register">Sign up</SignUpLink>
        </NavActions>
      </Nav>

      <AboutSection>
        <AboutTitle>Astra</AboutTitle>
        <AboutSub>by FXTech — Your trading journal, in one place</AboutSub>
        <AboutBody>
          Track every trade, review your decisions, and sharpen your edge with
          clear analytics and a simple journal built for serious traders.
        </AboutBody>
      </AboutSection>

      <Section>
        <ToolsTitle>What's inside</ToolsTitle>
        <ToolsGrid>
          {tools.map((t) => {
            const Icon = t.Icon;
            return (
              <ToolCard key={t.name}>
                <ToolIcon>
                  <Icon />
                </ToolIcon>
                <ToolName>{t.name}</ToolName>
                <ToolDesc>{t.desc}</ToolDesc>
              </ToolCard>
            );
          })}
        </ToolsGrid>
      </Section>

      <DashboardSection>
        <DashboardTitle>The platform</DashboardTitle>
        <DashboardFrame>
          <DashboardImage src={screenImg} alt="Astra dashboard preview" />
        </DashboardFrame>
      </DashboardSection>
    </Wrapper>
  );
};

export default LangingPage;
