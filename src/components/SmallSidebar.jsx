import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import {
  HiOutlinePlusCircle,
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineChevronRight,
} from "react-icons/hi";
import Wrapper from "../wrappers/SmallSidebar";

const navItems = [
  { to: "/dashboard/add-trade", icon: HiOutlinePlusCircle, title: "Add Trade" },
  { to: "/dashboard", end: true, icon: HiOutlineViewGrid, title: "Dashboard" },
  { to: "/dashboard/all-trades", icon: HiOutlineClipboardList, title: "All Trades" },
  { to: "/dashboard/stats", icon: HiOutlineChartBar, title: "Stats" },
];

const SmallSidebar = ({ onExpand }) => {
  return (
    <Wrapper>
      <div className="sidebar-inner">
        <div className="sidebar-logo">
          <Logo to="/dashboard" />
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, title, end }) => (
            <NavLink
              key={to}
              to={to}
              end={!!end}
              title={title}
              aria-label={title}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <Icon size={22} />
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="sidebar-expand"
          onClick={onExpand}
          aria-label="Expand sidebar"
        >
          <HiOutlineChevronRight size={20} />
        </button>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
