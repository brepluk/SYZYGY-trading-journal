import styled from "styled-components";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "5rem";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
  }
  .dashboard-sidebars {
    position: relative;
  }
  .dashboard-sidebars .small-sidebar,
  .dashboard-sidebars .big-sidebar {
    position: absolute;
    inset: 0;
  }
  .dashboard-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .dashboard-page {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 2rem;
  }
  .small-sidebar {
    display: ${(p) => (p.$showSidebar ? "none" : "block")};
  }
  .big-sidebar {
    display: ${(p) => (p.$showSidebar ? "block" : "none")};
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: ${(p) =>
        p.$showSidebar ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED} 1fr;
      transition: grid-template-columns 0.2s ease;
    }
  }
`;
export default Wrapper;
