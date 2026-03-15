import styled from "styled-components";

const Wrapper = styled.section`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1.5rem 1.75rem;

  h1 {
    margin-bottom: 0;
  }

  .settings-card {
    margin-top: 1.5rem;
    padding: 1.5rem 1.75rem;
    border-radius: var(--border-radius-lg);
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
  }

  .settings-card h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .settings-card p {
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  .logout-btn {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-lg);
    border: 1px solid transparent;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    transition:
      color var(--transition),
      background var(--transition);
    color: var(--red-dark);
    background: var(--red-light);
  }

  .logout-btn:hover {
    color: var(--white);
    background: var(--red-dark);
  }
`;

export default Wrapper;
