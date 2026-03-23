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

  /* Panel – half screen width, slides in from left (semantic vars = same as BigSidebar / theme toggle) */
  .content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    min-width: 260px;
    max-width: 320px;
    background: var(--background-secondary-color);
    border-right: 1px solid var(--border-color);
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
    color: var(--logo-color);
  }

  .sidebar-logo .logo-wordmark {
    font-size: 1.05rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    background: var(--card-background);
    color: var(--text-secondary-color);
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
    color: var(--text-color);
    background: var(--accent-color);
    border-color: var(--accent-color);
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
    color: var(--text-secondary-color);
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
    color: var(--text-color);
    background: var(--card-background);
  }

  .nav-link.active {
    color: var(--text-color);
    background: var(--card-background);
  }

  .nav-link span {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* —— Very small phones —— */
  @media (max-width: 28rem) {
    .content {
      width: 82%;
      min-width: 0;
      max-width: none;
      padding: 2.75rem 0.85rem 1.05rem;
    }

    .sidebar-logo {
      margin-bottom: 1rem;
    }

    .sidebar-logo .logo-wordmark {
      font-size: 0.95rem;
    }

    .close-btn {
      top: 0.75rem;
      right: 0.75rem;
      width: 2.25rem;
      height: 2.25rem;
      font-size: 1.05rem;
    }

    .nav-link {
      padding: 0.65rem 0.85rem;
      font-size: 0.92rem;
    }

    .nav-link span {
      font-size: 1.05rem;
    }
  }
`;
export default Wrapper;
