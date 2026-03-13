import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;

  .theme-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: var(--border-radius-lg);
    background: var(--background-color);
    color: var(--text-secondary-color);
    font-size: var(--small-text);
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background var(--transition), color var(--transition);
  }

  .theme-option:hover {
    background: var(--border-color);
  }

  .theme-option.active {
    background: var(--theme-option-active-bg);
    color: var(--text-color);
  }

  .theme-option .radio {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid var(--text-secondary-color);
    flex-shrink: 0;
    display: grid;
    place-items: center;
    transition: border-color var(--transition), background var(--transition);
  }

  .theme-option.active .radio {
    border-color: var(--text-color);
    background: var(--text-color);
    box-shadow: inset 0 0 0 2px var(--theme-option-active-bg);
  }
`;

export default Wrapper;
