import {
  HiOutlinePlusCircle,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { LuChartCandlestick } from "react-icons/lu";

const links = [
  {
    text: "Dashboard",
    path: ".",
    icon: <HiOutlineHome />,
  },
  {
    text: "Add Trade",
    path: "add-trade",
    icon: <HiOutlinePlusCircle />,
  },
  {
    text: "All Trades",
    path: "all-trades",
    icon: <LuChartCandlestick />,
  },
  {
    text: "Stats",
    path: "stats",
    icon: <HiOutlineChartBar />,
  },
];

export const SECTION_LABELS = {
  "/dashboard": "Dashboard",
  "/dashboard/add-trade": "Add Trade",
  "/dashboard/all-trades": "All Trades",
  "/dashboard/stats": "Stats",
  "/dashboard/profile": "Profile",
};

export const DATE_FILTERS = [
  "Today",
  "This week",
  "This month",
  "This quarter",
  "YTD",
  "All time",
];

export default links;
