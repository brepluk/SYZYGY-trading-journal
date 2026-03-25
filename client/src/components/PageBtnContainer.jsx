import PaginationBar from "./PaginationBar";
import { useAllTradesContext } from "../pages/AllTrades";

const PageBtnContainer = () => {
  const { data } = useAllTradesContext();
  return (
    <PaginationBar
      numPages={data?.numPages}
      currentPage={data?.currentPage}
    />
  );
};

export default PageBtnContainer;
