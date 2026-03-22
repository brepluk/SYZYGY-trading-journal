import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 0 1rem;

  .form-page {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .form-card {
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.5rem 1.75rem 1.75rem;
    box-shadow: var(--shadow-2);
    transition: border-color var(--transition);
  }

  .form-page-title {
    color: var(--text-color);
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    font-weight: 600;
    margin: 0 0 1.25rem;
    letter-spacing: var(--letter-spacing);
  }

  .form-label {
    color: var(--text-secondary-color);
  }

  .form-input,
  .form-select {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .form-btn {
    margin-top: 0.25rem;
  }

  /* Same breakpoint pattern as DashboardLayout.js + BigSidebar.js */
  @media (min-width: 992px) {
    max-width: 100%;

    .form-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;
      column-gap: 1rem;
    }

    .form-page-title,
    .form-btn {
      grid-column: 1 / -1;
    }

    /* Wrap a field when it should stay full width on large screens */
    .form-field-full {
      grid-column: 1 / -1;
    }
  }
`;

export default Wrapper;
