import Wrapper from "../wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className={`theme-option ${!isDarkTheme ? "active" : ""}`}
        onClick={() => isDarkTheme && toggleDarkTheme()}
      >
        <span className="radio" aria-hidden />
        Light
      </button>
      <button
        type="button"
        className={`theme-option ${isDarkTheme ? "active" : ""}`}
        onClick={() => !isDarkTheme && toggleDarkTheme()}
      >
        <span className="radio" aria-hidden />
        Dark
      </button>
    </Wrapper>
  );
};

export default ThemeToggle;
