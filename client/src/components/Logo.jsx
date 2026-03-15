import { Link } from "react-router-dom";

/**
 * Reusable Astra logo: links to home by default, inherits color via currentColor.
 * Use className to control size and color (e.g. from styled-components).
 */
export default function Logo({ to = "/", className, ...props }) {
  return (
    <Link to={to} className={className} aria-label="Astra home" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 32"
        fill="none"
        aria-hidden
        style={{ display: "block", width: "auto" }}
      >
        <text
          x="0"
          y="24"
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.02em",
            fill: "currentColor",
          }}
        >
          ✦
        </text>
        <text
          x="28"
          y="24"
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.02em",
            fill: "currentColor",
          }}
        >
          Astra
        </text>
      </svg>
    </Link>
  );
}

// import logo from "../assets/logo.svg"

// const Logo = () => {
//   return <img src={logo} alt="Astra" className="logo" />;
// };

// export default Logo;
