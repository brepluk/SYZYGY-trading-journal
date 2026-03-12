import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../wrappers/DashboardLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../components";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = { name: "Foosh" };

  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
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
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
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
