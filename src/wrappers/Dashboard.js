import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .dashboard-cards-row {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  .dashboard-card {
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    border-radius: var(--border-radius-lg);
    padding: 1.25rem;
    min-height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dashboard-card-label {
    font-size: 0.8rem;
    color: var(--astra-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .dashboard-card-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--astra-text);
  }

  .dashboard-chart-section,
  .dashboard-calendar-section {
    background: var(--astra-card);
    border: 1px solid var(--astra-border);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--astra-muted);
    font-size: 0.9rem;
  }

  .dashboard-chart-section {
    min-height: 280px;
  }

  .dashboard-calendar-section {
    min-height: 320px;
  }

  @media (min-width: 640px) {
    .dashboard-cards-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .dashboard-cards-row {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default Wrapper;

