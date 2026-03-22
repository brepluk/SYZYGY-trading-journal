import { Link } from "react-router-dom";

/**
 * Inline “SYZYGY” with subtle star-like pulse on each Y (shared with hero title).
 * Pass aria-hidden on the nav logo (parent link has a label); omit on hero if h1 has aria-label.
 */
export function SyzygyWordmark({ className, ...props }) {
  return (
    <span
      className={className ? `wordmark-syzygy ${className}` : "wordmark-syzygy"}
      {...props}
    >
      <span>S</span>
      <span className="syzygy-y">Y</span>
      <span>Z</span>
      <span className="syzygy-y">Y</span>
      <span>G</span>
      <span className="syzygy-y">Y</span>
    </span>
  );
}

/**
 * Syzygy logo: ✦ + wordmark, links home by default, inherits color via currentColor.
 */
export default function Logo({ to = "/", className, ...props }) {
  return (
    <Link
      to={to}
      className={className ? `logo-wordmark ${className}` : "logo-wordmark"}
      aria-label="Syzygy home"
      {...props}
    >
      <span className="logo-wordmark-icon" aria-hidden>
        ✦
      </span>
      <SyzygyWordmark aria-hidden />
    </Link>
  );
}
