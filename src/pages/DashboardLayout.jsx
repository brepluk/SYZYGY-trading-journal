import { useState } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../wrappers/DashboardLayout";
import { Navbar, BigSidebar, SmallSidebar, Starfield } from "../components";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = {name: 'Foosh'}


  return (
    <Wrapper $sidebarCollapsed={sidebarCollapsed}>
      <Starfield count={80} />
      <main className="dashboard">
        {sidebarCollapsed ? (
          <SmallSidebar onExpand={() => setSidebarCollapsed(false)} />
        ) : (
          <BigSidebar onCollapse={() => setSidebarCollapsed(true)} />
        )}
        <div className="dashboard-main">
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default DashboardLayout;
