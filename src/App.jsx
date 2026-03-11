import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useEffect, useMemo, useState } from "react";
import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import LandingPage from "./pages/LandingPage";
import Stats from "./pages/Stats";
import AddTrade from "./pages/AddTrade";
import AllTrades from "./pages/AllTrades";
import Profile from "./pages/Profile";

export const ThemeContext = createContext({
  mode: "system",
  theme: "dark",
  setMode: () => {},
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "add-trade",
            element: <AddTrade />,
          },
          {
            path: "all-trades",
            element: <AllTrades />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const getInitialMode = () => {
    if (typeof window === "undefined") return "system";
    const storedMode = window.localStorage.getItem("theme-mode");
    if (storedMode === "light" || storedMode === "dark" || storedMode === "system") {
      return storedMode;
    }
    const legacyTheme = window.localStorage.getItem("theme");
    if (legacyTheme === "light" || legacyTheme === "dark") return legacyTheme;
    return "system";
  };

  const [mode, setMode] = useState(getInitialMode);
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => {
      setSystemIsDark(event.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const theme = mode === "system" ? (systemIsDark ? "dark" : "light") : mode;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(theme === "light" ? "light-theme" : "dark-theme");
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      theme,
      setMode,
    }),
    [mode, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
