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

// .sidebar-logo {
//   margin-bottom: 1.5rem;
// }

// .sidebar-logo a {
//   color: var(--astra-text);
// }

// .sidebar-logo svg {
//   height: 1.75rem;
//   width: auto;
// }

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
  @media (min-width: 992px) {
    display: none;
  }

  /* Backdrop – tap outside to close */
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.25s ease,
      visibility 0.25s ease;
  }

  .sidebar-container.show-sidebar {
    opacity: 1;
    visibility: visible;
  }

  /* Panel – half screen width, slides in from left */
  .content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    min-width: 260px;
    max-width: 320px;
    background: var(--astra-surface);
    border-right: 1px solid var(--astra-border);
    z-index: 999;
    padding: 3.25rem 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.25s ease-out;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .sidebar-container.show-sidebar .content {
    transform: translateX(0);
  }

  .sidebar-logo {
    margin-bottom: 1.25rem;
  }

  .sidebar-logo a {
    color: var(--astra-text);
  }

  .sidebar-logo svg {
    height: 1.75rem;
    width: auto;
  }

  /* Astra-themed close button */
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--astra-border);
    border-radius: var(--border-radius-lg);
    background: var(--astra-card);
    color: var(--astra-muted);
    font-size: 1.15rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      color 0.15s ease,
      background 0.15s ease,
      border-color 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .close-btn:hover {
    color: var(--astra-text);
    background: var(--astra-accent);
    border-color: var(--astra-accent);
  }

  .nav-links {
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius-lg);
    color: var(--astra-muted);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }

  .nav-link:hover {
    color: var(--astra-text);
    background: var(--astra-card);
  }

  .nav-link.active {
    color: var(--astra-text);
    background: var(--astra-card);
  }

  .nav-link span {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default Wrapper;
