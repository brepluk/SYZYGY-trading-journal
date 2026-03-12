import { useLocation, Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import Wrapper from "../wrappers/Navbar";
import { useDashboardContext } from "../pages/DashboardLayout";

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
  "This quarter",
  "YTD",
  "All time",
];

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  const location = useLocation();
  const pathname = location.pathname;
  const sectionLabel =
    SECTION_LABELS[pathname] ||
    pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "Dashboard";

  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-left">
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FaAlignLeft />
          </button>
          <h4 className="logo-text">{sectionLabel}</h4>
        </div>

        <div className="date-filter">
          <span className="date-filter-label"></span>
          <select className="date-filter-select" defaultValue={DATE_FILTERS[0]}>
            {DATE_FILTERS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="btn-container">
          <Link
            to="/dashboard/profile"
            className="profile-link"
            aria-label="Open profile and settings"
          >
            <HiOutlineUserCircle size={24} />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
