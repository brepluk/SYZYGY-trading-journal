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

  .exit-legs {
    grid-column: 1 / -1;
    border: 1px dashed var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.9rem;
    margin-bottom: 0.75rem;
    background: color-mix(in srgb, var(--background-color) 75%, transparent);
  }

  .exit-legs__header {
    margin: 0 0 0.6rem;
    color: var(--text-color);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .exit-leg-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
    gap: 0.6rem;
    margin-bottom: 0.6rem;
  }

  .exit-leg-remove-wrap {
    margin-bottom: 1rem;
  }

  .exit-leg-remove {
    width: 100%;
    height: 35px;
    padding: 0.375rem 0.75rem;
    min-width: 8.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: transparent;
    color: #f87171;
    cursor: pointer;
  }

  .exit-leg-add {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: transparent;
    color: var(--text-color);
    min-height: 2.2rem;
    padding: 0.2rem 0.7rem;
    cursor: pointer;
  }

  /* 992px — matches DashboardLayout and BigSidebar */
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

  @media (max-width: 768px) {
    .exit-leg-row {
      grid-template-columns: 1fr;
    }

    .exit-leg-remove {
      min-width: 0;
      width: 100%;
    }
  }
`;

export default Wrapper;
