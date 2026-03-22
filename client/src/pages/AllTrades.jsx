import { toast } from "react-toastify";
import { TradesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/trades");
    // API returns { trades: [...] } — normalize to an array for context
    const trades = Array.isArray(data?.trades) ? data.trades : [];
    return { data: trades };
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Something went wrong. Try again.",
    );
    return { data: [] };
  }
};

const AllTradesContext = createContext();
const AllTrades = () => {
  const { data } = useLoaderData();

  return (
    <AllTradesContext.Provider value={{ data }}>
      <SearchContainer />
      <TradesContainer />
    </AllTradesContext.Provider>
  );
};

export const useAllTradesContext = () => {
  return useContext(AllTradesContext);
};

export default AllTrades;
