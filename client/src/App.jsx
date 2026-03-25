import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLayoutLoader } from "./pages/DashboardLayout";
import { action as addTradeAction } from "./pages/AddTrade";
import { loader as allTradesLoader } from "./pages/AllTrades";
import { loader as editTradeLoader } from "./pages/EditTrade";
import { action as editTradeAction } from "./pages/EditTrade";
import { loader as tradeNotesLoader } from "./pages/Notes";
import { action as tradeNotesAction } from "./pages/Notes";
import { action as deleteTradeAction } from "./pages/DeleteTrade";
import { action as profileAction } from "./pages/Profile";
import { loader as newsLoader } from "./pages/News";
import { editTradeNavHandle, tradeNotesNavHandle } from "./utils/navTitles";

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
import Dashboard, { loader as dashboardPageLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import LandingPage from "./pages/LandingPage";
import Stats from "./pages/Stats";
import AddTrade from "./pages/AddTrade";
import AllTrades from "./pages/AllTrades";
import Profile from "./pages/Profile";
import EditTrade from "./pages/EditTrade";
import Notes from "./pages/Notes";
import News from "./pages/News";

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
        loader: dashboardLayoutLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardPageLoader,
          },
          {
            path: "add-trade",
            element: <AddTrade />,
            action: addTradeAction,
          },
          {
            path: "all-trades",
            element: <AllTrades />,
            loader: allTradesLoader,
          },
          {
            path: "edit-trade/:id",
            element: <EditTrade />,
            loader: editTradeLoader,
            action: editTradeAction,
            handle: editTradeNavHandle,
          },
          {
            path: "delete-trade/:id",
            action: deleteTradeAction,
          },
          {
            path: "trade/:id/notes",
            element: <Notes />,
            loader: tradeNotesLoader,
            action: tradeNotesAction,
            handle: tradeNotesNavHandle,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },

          {
            path: "news",
            element: <News />,
            loader: newsLoader,
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
