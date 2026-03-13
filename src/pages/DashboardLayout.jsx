import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../wrappers/DashboardLayout";
import { Navbar, BigSidebar, SmallSidebar, Starfield } from "../components";
import { checkDefaultTheme } from "../App";

const DARK_THEME_KEY = "darkTheme";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = { name: "Foosh" };

  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const setDarkTheme = (value) => {
    setIsDarkTheme(value);
    document.body.classList.toggle("dark-theme", value);
    localStorage.setItem(DARK_THEME_KEY, value);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setDarkTheme(newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        setDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <Starfield count={70} />
        <main className="dashboard">
          <div className="dashboard-sidebars">
            <SmallSidebar className="small-sidebar" />
            <BigSidebar className="big-sidebar" />
          </div>
          <div className="dashboard-main">
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
