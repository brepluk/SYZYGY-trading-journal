import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import {
  HiOutlinePlusCircle,
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import Wrapper from "../wrappers/BigSidebar";

const navItems = [
  { to: "/dashboard/add-trade", label: "Add Trade", icon: HiOutlinePlusCircle },
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineViewGrid, end: true },
  { to: "/dashboard/all-trades", label: "All Trades", icon: HiOutlineClipboardList },
  { to: "/dashboard/stats", label: "Stats", icon: HiOutlineChartBar },
];

const BigSidebar = ({ onCollapse }) => {
  return (
    <Wrapper>
      <div className="sidebar-inner">
        <div className="sidebar-logo">
          <Logo to="/dashboard" />
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={!!end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="sidebar-collapse"
          onClick={onCollapse}
          aria-label="Collapse sidebar"
        >
          <HiOutlineChevronLeft size={20} />
          Collapse
        </button>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
