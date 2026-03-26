import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import { loader as dashboardPageLoader } from "./pages/Dashboard";
import { editTradeNavHandle, tradeNotesNavHandle } from "./utils/navTitles";

export const checkDefaultTheme = () => {
  const stored = localStorage.getItem("darkTheme");
  const isDarkTheme = stored === null ? true : stored === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

checkDefaultTheme();

import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Error from "./pages/Error";
import LandingPage from "./pages/LandingPage";
import Stats from "./pages/Stats";
import Dashboard from "./pages/Dashboard";
import AddTrade from "./pages/AddTrade";
import AllTrades from "./pages/AllTrades";
import Profile from "./pages/Profile";
import EditTrade from "./pages/EditTrade";
import Notes from "./pages/Notes";
import News from "./pages/News";
import Starfield from "./components/Starfield";
import ErrorElement from "./components/ErrorElement";

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
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLayoutLoader(queryClient),
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardPageLoader(queryClient),
          },
          {
            path: "add-trade",
            element: <AddTrade />,
            action: addTradeAction(queryClient),
          },
          {
            path: "all-trades",
            element: <AllTrades />,
            loader: allTradesLoader(queryClient),
          },
          {
            path: "edit-trade/:id",
            element: <EditTrade />,
            loader: editTradeLoader(queryClient),
            action: editTradeAction(queryClient),
            handle: editTradeNavHandle,
          },
          {
            path: "delete-trade/:id",
            action: deleteTradeAction(queryClient),
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
            action: profileAction(queryClient),
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
  return (
    <QueryClientProvider client={queryClient}>
      <Starfield count={70} />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
