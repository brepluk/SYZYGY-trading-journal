import { useLocation, Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import Wrapper from "../wrappers/Navbar";

const SECTION_LABELS = {
  "/dashboard": "Dashboard",
  "/dashboard/add-trade": "Add Trade",
  "/dashboard/all-trades": "All Trades",
  "/dashboard/stats": "Stats",
  "/dashboard/profile": "Profile",
};

const DATE_FILTERS = [
  "Today",
  "This week",
  "This month",
  "Last month",
  "This quarter",
  "YTD",
  "All time",
];

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const sectionLabel =
    SECTION_LABELS[pathname] ||
    pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "Dashboard";

  return (
    <Wrapper>
      <h1 className="navbar-title">{sectionLabel}</h1>
      <div className="navbar-filters">
        <span className="navbar-filter-label">Date range</span>
        <select className="navbar-filter-select" defaultValue={DATE_FILTERS[0]}>
          {DATE_FILTERS.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="navbar-profile">
        <Link
          to="/dashboard/profile"
          className="navbar-avatar"
          aria-label="Open profile and settings"
        >
          <HiOutlineUserCircle size={24} />
        </Link>
      </div>
    </Wrapper>
  );
};

export default Navbar;
