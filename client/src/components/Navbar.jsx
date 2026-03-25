import { useLocation, Link, useMatches, useSearchParams } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import Wrapper from "../wrappers/Navbar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { SECTION_LABELS } from "../utils/links";
import {
  DATE_FILTER_OPTIONS,
  normalizeDateRangeKey,
} from "../utils/dashboardDateRange";

const Navbar = () => {
  const { user } = useDashboardContext();
  const { toggleSidebar } = useDashboardContext();
  const location = useLocation();
  const matches = useMatches();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = location.pathname;
  const isDashboardHome = pathname === "/dashboard";
  const range = normalizeDateRangeKey(searchParams.get("range"));
  const lastMatchWithTitle = [...matches]
    .reverse()
    .find((m) => m?.handle?.navTitle != null);
  const matchTitle = lastMatchWithTitle?.handle?.navTitle;
  const navTitle =
    typeof matchTitle === "function"
      ? matchTitle(lastMatchWithTitle)
      : matchTitle;

  const sectionLabel =
    navTitle ||
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
        </div>

        <h4 className="nav-title">{sectionLabel}</h4>

        <div className="nav-right">
          {isDashboardHome ? (
            <div className="date-filter">
              <label htmlFor="dashboard-range" className="visually-hidden">
                Date range
              </label>
              <select
                id="dashboard-range"
                className="date-filter-select"
                value={range}
                onChange={(e) => {
                  const next = e.target.value;
                  setSearchParams((prev) => {
                    const p = new URLSearchParams(prev);
                    p.set("range", next);
                    return p;
                  });
                }}
              >
                {DATE_FILTER_OPTIONS.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <Link
            to="/dashboard/profile"
            className="profile-link"
            aria-label="Open profile and settings"
          >
            <HiOutlineUserCircle size={20} />
            {user?.name && <span className="profile-name">{user.name}</span>}
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
