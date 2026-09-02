import type { Service } from "@/lib/services";

/**
 * Line icons drawn in brass, 1.5px stroke. No snowflakes, flames,
 * thermometers, or emoji — these read as instrument/equipment marks.
 */
const common = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ServiceIcon({ name }: { name: Service["icon"] }) {
  switch (name) {
    case "repair":
      // Wrench over a gauge
      return (
        <svg {...common}>
          <path d="M26 6a6 6 0 0 0-7.7 7.7L7 25v8h8l11.3-11.3A6 6 0 0 0 34 14l-4 4-4-4 4-4a6 6 0 0 0-4-4Z" />
          <circle cx="11" cy="29" r="1.4" />
        </svg>
      );
    case "install":
      // Condenser unit with fan
      return (
        <svg {...common}>
          <rect x="7" y="9" width="26" height="22" rx="2" />
          <circle cx="20" cy="20" r="7" />
          <path d="M20 20 20 14M20 20 25.2 23M20 20 14.8 23" />
          <path d="M10 34h4M26 34h4" />
        </svg>
      );
    case "commercial":
      // Rooftop building with unit
      return (
        <svg {...common}>
          <path d="M6 33V17l9-4v20M15 33V21l13-5v17" />
          <path d="M28 33V13l6 3v17M6 33h30" />
          <rect x="18" y="24" width="6" height="4" />
        </svg>
      );
    case "maintenance":
      // Clipboard checklist
      return (
        <svg {...common}>
          <rect x="9" y="7" width="22" height="27" rx="2" />
          <path d="M15 7h10v4H15zM14 17l2 2 4-4M14 25l2 2 4-4" />
          <path d="M24 18h4M24 26h4" />
        </svg>
      );
    case "emergency":
      // emergency clock with bolt
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="13" />
          <path d="M21 12l-4 8h5l-4 8" />
        </svg>
      );
    default:
      return null;
  }
}
