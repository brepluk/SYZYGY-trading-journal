import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";

export const checkDefaultTheme = () => {
  const stored = localStorage.getItem("darkTheme");
  const isDarkTheme = stored === null ? true : stored === "true"; // default Astra
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();
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
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
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
            path: "stats",
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
