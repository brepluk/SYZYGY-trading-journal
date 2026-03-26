import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../wrappers/DashboardLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Loading } from "../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DARK_THEME_KEY = "darkTheme";

const DashboardContext = createContext();

const DashboardLayout = () => {
  useLoaderData();
  const queryClient = useQueryClient();
  const { data } = useQuery(userQuery);
  const { user } = data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [isAuthError, setIsAuthError] = useState(false);
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

  const logoutUser = useCallback(async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Logged out successfully");
  }, [navigate, queryClient]);

  useEffect(() => {
    const interceptor = customFetch.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const requestUrl = error?.config?.url ?? "";

        // Avoid a logout loop if the logout endpoint itself returns 401.
        if (status === 401 && !requestUrl.includes("/auth/logout")) {
          setIsAuthError(true);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      customFetch.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);

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
        <main className="dashboard">
          <div className="dashboard-sidebars">
            <SmallSidebar className="small-sidebar" />
            <BigSidebar className="big-sidebar" />
          </div>
          <div className="dashboard-main">
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
