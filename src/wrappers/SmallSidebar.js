// import styled from "styled-components";

// const Wrapper = styled.aside`
//   display: none;

//   @media (min-width: 992px) {
//     display: block;
//     background: var(--astra-surface);
//     border-right: 1px solid var(--astra-border);
//     min-height: 100vh;
//     position: sticky;
//     top: 0;
//   }

//   .sidebar-inner {
//     padding: 1rem 0.5rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     height: 100%;
//   }

//   .sidebar-logo {
//     margin-bottom: 1.5rem;
//   }

//   .sidebar-logo a {
//     color: var(--astra-text);
//   }

//   .sidebar-logo svg {
//     height: 1.75rem;
//     width: auto;
//   }

//   .sidebar-nav {
//     display: flex;
//     flex-direction: column;
//     gap: 0.25rem;
//     flex: 1;
//     width: 100%;
//     align-items: center;
//   }

//   .sidebar-link {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 2.75rem;
//     height: 2.75rem;
//     border-radius: var(--border-radius-lg);
//     color: var(--astra-muted);
//     text-decoration: none;
//     transition: color 0.15s ease, background 0.15s ease;
//   }

//   .sidebar-link:hover {
//     color: var(--astra-text);
//     background: var(--astra-card);
//   }

//   .sidebar-link.active {
//     color: var(--astra-text);
//     background: var(--astra-card);
//   }

//   .sidebar-expand {
//     width: 100%;
//     border: none;
//     background: transparent;
//     cursor: pointer;
//     margin-top: auto;
//     padding-top: 1rem;
//     border-top: 1px solid var(--astra-border);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: var(--border-radius-lg);
//     color: var(--astra-muted);
//     transition: color 0.15s ease, background 0.15s ease;
//   }

//   .sidebar-expand:hover {
//     color: var(--astra-text);
//     background: var(--astra-card);
//   }
// `;

// export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.aside`
  @media (max-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-500);
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
    color: var(--primary-500);
  }
`;
export default Wrapper;
