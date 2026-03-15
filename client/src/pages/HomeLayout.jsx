import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PageFallback = () => (
  <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    Loading…
  </div>
);

const HomeLayout = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  );
};
export default HomeLayout;
