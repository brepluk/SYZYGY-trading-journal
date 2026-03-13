import { useLocation, Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import Wrapper from "../wrappers/Navbar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { SECTION_LABELS, DATE_FILTERS } from "../utils/links";
import LogoutContainer from "./LogoutContainer";

const Navbar = () => {
  const { user } = useDashboardContext();
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
        </div>

        <h4 className="nav-title">{sectionLabel}</h4>

        <div className="nav-right">
          <div className="date-filter">
            <select
              className="date-filter-select"
              defaultValue={DATE_FILTERS[0]}
            >
              {DATE_FILTERS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
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
