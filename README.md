NAVBAR

// import { useLocation, Link } from "react-router-dom";
// import { HiOutlineUserCircle } from "react-icons/hi";
// import Wrapper from "../wrappers/Navbar";

// const SECTION_LABELS = {
// "/dashboard": "Dashboard",
// "/dashboard/add-trade": "Add Trade",
// "/dashboard/all-trades": "All Trades",
// "/dashboard/stats": "Stats",
// "/dashboard/profile": "Profile",
// };

// const DATE_FILTERS = [
// "Today",
// "This week",
// "This month",
// "Last month",
// "This quarter",
// "YTD",
// "All time",
// ];

// const Navbar = () => {
// const location = useLocation();
// const pathname = location.pathname;
// const sectionLabel =
// SECTION_LABELS[pathname] ||
// pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
// "Dashboard";

// return (
// <Wrapper>
// <h1 className="navbar-title">{sectionLabel}</h1>
// <div className="navbar-filters">
// <span className="navbar-filter-label">Date range</span>
// <select className="navbar-filter-select" defaultValue={DATE_FILTERS[0]}>
// {DATE_FILTERS.map((label) => (
// <option key={label} value={label}>
// {label}
// </option>
// ))}
// </select>
// </div>
// <div className="navbar-profile">
// <Link
// to="/dashboard/profile"
// className="navbar-avatar"
// aria-label="Open profile and settings"
// >
// <HiOutlineUserCircle size={24} />
// </Link>
// </div>
// </Wrapper>
// );
// };

// export default Navbar;

SMALL SIDE BAR

// import styled from "styled-components";

// const Wrapper = styled.aside`
// display: none;

// @media (min-width: 992px) {
// display: block;
// background: var(--astra-surface);
// border-right: 1px solid var(--astra-border);
// min-height: 100vh;
// position: sticky;
// top: 0;
// }

// .sidebar-inner {
// padding: 1rem 0.5rem;
// display: flex;
// flex-direction: column;
// align-items: center;
// height: 100%;
// }

// .sidebar-logo {
// margin-bottom: 1.5rem;
// }

// .sidebar-logo a {
// color: var(--astra-text);
// }

// .sidebar-logo svg {
// height: 1.75rem;
// width: auto;
// }

// .sidebar-nav {
// display: flex;
// flex-direction: column;
// gap: 0.25rem;
// flex: 1;
// width: 100%;
// align-items: center;
// }

// .sidebar-link {
// display: flex;
// align-items: center;
// justify-content: center;
// width: 2.75rem;
// height: 2.75rem;
// border-radius: var(--border-radius-lg);
// color: var(--astra-muted);
// text-decoration: none;
// transition: color 0.15s ease, background 0.15s ease;
// }

// .sidebar-link:hover {
// color: var(--astra-text);
// background: var(--astra-card);
// }

// .sidebar-link.active {
// color: var(--astra-text);
// background: var(--astra-card);
// }

// .sidebar-expand {
// width: 100%;
// border: none;
// background: transparent;
// cursor: pointer;
// margin-top: auto;
// padding-top: 1rem;
// border-top: 1px solid var(--astra-border);
// display: flex;
// align-items: center;
// justify-content: center;
// border-radius: var(--border-radius-lg);
// color: var(--astra-muted);
// transition: color 0.15s ease, background 0.15s ease;
// }

// .sidebar-expand:hover {
// color: var(--astra-text);
// background: var(--astra-card);
// }
// `;

// export default Wrapper;
