// import styled from "styled-components";

// const Wrapper = styled.nav`
//   height: var(--nav-height);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
//   background: var(--syzygy-surface);

//   .nav-center {
//     display: flex;
//     width: 90vw;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .nav-left {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//   }

//   .toggle-btn {
//     background: transparent;
//     border: none;
//     font-size: 1.75rem;
//     color: var(--syzygy-text);
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     padding: 0.25rem;
//     transition: color var(--transition);
//   }
//   .toggle-btn:hover {
//     color: var(--syzygy-accent);
//   }

//   .logo-text {
//     font-size: 1.25rem;
//     font-weight: 600;
//     color: var(--syzygy-text);
//     letter-spacing: var(--letter-spacing);
//     margin: 0;
//     text-transform: capitalize;
//   }

//   .date-filter {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

//   .date-filter-label {
//     font-size: 0.85rem;
//     color: var(--syzygy-muted);
//   }

//   .date-filter-select {
//     padding: 0.35rem 0.75rem;
//     border-radius: var(--border-radius);
//     border: 1px solid var(--syzygy-border);
//     background: var(--syzygy-card);
//     color: var(--syzygy-text);
//     font-size: 0.9rem;
//     min-width: 140px;
//     cursor: pointer;
//   }

//   .date-filter-select:focus {
//     outline: none;
//     border-color: var(--syzygy-accent);
//   }

//   .btn-container {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

// .profile-link {
//   width: 2.25rem;
//   height: 2.25rem;
//   border-radius: 50%;
//   background: var(--syzygy-card);
//   border: 1px solid var(--syzygy-border);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--syzygy-muted);
//   text-decoration: none;
//   transition: border-color var(--transition), color var(--transition);
// }
// .profile-link:hover {
//   border-color: var(--syzygy-accent);
//   color: var(--syzygy-accent);
// }

//   @media (min-width: 992px) {
//     position: sticky;
//     top: 0;
//     z-index: 10;

//     .nav-center {
//       width: 90%;
//     }
//   }
// `;

// export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .nav-center {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    width: 90vw;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .nav-title {
    justify-self: center;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    margin: 0;
    text-transform: capitalize;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-self: end;
  }

  /* Mobile: less cramped – hide section label, compact date filter */
  @media (max-width: 768px) {
    height: 3.5rem;

    .nav-center {
      gap: 0.35rem;
    }

    .nav-title {
      display: none;
    }

    .nav-center {
      grid-template-columns: auto 1fr;
    }

    .nav-right {
      grid-column: 2;
    }

    .date-filter-select {
      min-width: 0;
      width: 5.5rem;
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
    }

    /* On very small screens hide the name, keep just the icon */
    .profile-link span.profile-name {
      display: none;
    }
  }

  .toggle-btn {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    transition: color var(--transition);
  }

  .toggle-btn:hover {
    color: var(--accent-color);
  }

  .date-filter {
    display: flex;
    align-items: center;
  }

  .date-filter-select {
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--card-background);
    color: var(--text-color);
    font-size: 0.9rem;
    min-width: 140px;
    cursor: pointer;
  }

  .date-filter-select:focus {
    outline: none;
    border-color: var(--accent-color);
  }
  .profile-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    color: var(--text-secondary-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition:
      border-color var(--transition),
      color var(--transition),
      background var(--transition);
  }
  .profile-link:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
  }
`;
export default Wrapper;
