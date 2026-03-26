import { TradesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allTradesQuery = (searchValues) => ({
  queryKey: [
    "trades",
    searchValues.search ?? "",
    searchValues.tradeSide ?? "all",
    searchValues.positionSide ?? "all",
    searchValues.tradeStatus ?? "all",
    searchValues.sort ?? "newest",
    searchValues.page ?? "1",
  ],
  queryFn: async () => {
    const { data } = await customFetch.get("/trades", { params: searchValues });
    return data;
  },
});

export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  const searchValues = {
    search: params.search ?? "",
    tradeSide: params.tradeSide ?? "all",
    positionSide: params.positionSide ?? "all",
    tradeStatus: params.tradeStatus ?? "all",
    sort: params.sort ?? "newest",
    page: params.page ?? "1",
  };

  await queryClient.ensureQueryData(allTradesQuery(searchValues));
  return { searchValues };
};

const AllTradesContext = createContext();

const AllTrades = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allTradesQuery(searchValues));

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
