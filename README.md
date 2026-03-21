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

Here’s a practical workflow so schema, database, and Prisma Client stay aligned.
When you change schema.prisma
Create / update the database to match the schema
Local dev (you’re iterating):
npx prisma migrate dev --name describe_your_change
That will:
generate a new SQL migration under prisma/migrations/
apply it to your dev database
run prisma generate for you
If you only want to sync DB without a migration file (quick experiments, not for shared/production history):
npx prisma db push
Still run prisma generate afterward if migrate didn’t run.
Regenerate the client (if it didn’t run automatically)
npx prisma generate
Any time the schema changes, the generated @prisma/client must be rebuilt. migrate dev usually does this; if you only edited the file and didn’t migrate, run generate yourself.
Restart the Node server
The running process keeps the old client in memory until you restart (npm run dev again).
Other environments / teammates
They pull your git changes (including new migration folders).
They run: npx prisma migrate deploy (applies pending migrations).
CI/production: same — migrate deploy, not migrate dev.
Mental model
What you change What must update
schema.prisma SQL migrations (or db push in a pinch)
Database structure Applied migrations on that database
Prisma Client API (prisma.user…) prisma generate
Running app seeing new types/fields Restart server after generate
Quick checklist
After editing the schema:
npx prisma migrate dev --name <meaningful_name> (preferred in dev)
If you didn’t use migrate: npx prisma db push then npx prisma generate
Restart npm run dev
That’s the full loop so DB columns, migration history, and generated client all match your schema.
