import { toast } from "react-toastify";
import { TradesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get("/trades", { params });

    const searchValues = {
      search: params.search ?? "",
      tradeSide: params.tradeSide ?? "all",
      positionSide: params.positionSide ?? "all",
      tradeStatus: params.tradeStatus ?? "all",
      sort: params.sort ?? "newest",
      page: params.page ?? "1",
    };

    return { data, searchValues };
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Something went wrong. Try again.",
    );
    return {
      data: {
        trades: [],
        totalTrades: 0,
        numPages: 0,
        currentPage: 1,
      },
      searchValues: {
        search: "",
        tradeSide: "all",
        positionSide: "all",
        tradeStatus: "all",
        sort: "newest",
        page: "1",
      },
    };
  }
};

const AllTradesContext = createContext();

const AllTrades = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllTradesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <TradesContainer />
    </AllTradesContext.Provider>
  );
};

export const useAllTradesContext = () => {
  return useContext(AllTradesContext);
};

export default AllTrades;
