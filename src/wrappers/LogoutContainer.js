import styled from "styled-components";

// Local styles for the logout card only.
// Layout (max-width, page padding, etc.) stays in Profile wrapper,
// so this container doesn't introduce extra indentation.
const Wrapper = styled.div`

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
