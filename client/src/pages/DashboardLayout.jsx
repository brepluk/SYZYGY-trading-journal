import { useState, createContext, useContext } from "react";
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../wrappers/DashboardLayout";
import { Navbar, BigSidebar, SmallSidebar, Starfield } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DARK_THEME_KEY = "darkTheme";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

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
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logged out successfully");
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
