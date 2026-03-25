import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-main {
    min-width: 0;
  }

  .dashboard-page {
    width: 90vw;
    max-width: 100%;
    min-width: 0;
    margin: 0 auto;
    padding: 2rem 0;
    box-sizing: border-box;
  }

  @media (max-width: 480px) {
    .dashboard-page {
      width: 100%;
      padding: 1rem 0.35rem 1.5rem;
    }
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

export default Wrapper;
