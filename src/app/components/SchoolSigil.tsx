import React from "react";
import type { SchoolType } from "../curses_data";

// Hand-drawn woodcut-style sigils for each school — NO emoji, matches the
// parchment / ink letterpress aesthetic. Stroke takes the school colour.
export function SchoolSigil({
  school,
  size = 22,
  color = "currentColor",
  strokeWidth = 1.7,
}: {
  school: SchoolType;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (school) {
    case "defense": // 防禦 — heater shield with ward cross
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2.5 L20 5.5 V12 C20 16.8 16.2 19.8 12 21.5 C7.8 19.8 4 16.8 4 12 V5.5 Z" />
          <path d="M12 6.5 V16 M8 11 H16" />
        </svg>
      );
    case "attack": // 攻擊 — crossed blades
      return (
        <svg {...common} aria-hidden>
          <path d="M6 4 L18 18" />
          <path d="M18 4 L6 18" />
          <path d="M4.5 5.5 L7.5 2.5" />
          <path d="M16.5 2.5 L19.5 5.5" />
          <circle cx="18.4" cy="18.4" r="1.3" />
          <circle cx="5.6" cy="18.4" r="1.3" />
        </svg>
      );
    case "healing": // 治癒 — elixir flask with cross
      return (
        <svg {...common} aria-hidden>
          <path d="M10 3 H14" />
          <path d="M10.5 3 V8 L6.7 16.5 C6.1 19.2 8.2 21 12 21 C15.8 21 17.9 19.2 17.3 16.5 L13.5 8 V3" />
          <path d="M8.6 15.5 H15.4" />
          <path d="M12 11.2 V14.2 M10.5 12.7 H13.5" />
        </svg>
      );
    case "illusion": // 幻術 — crescent moon + spark
      return (
        <svg {...common} aria-hidden>
          <path d="M17 4.2 A8 8 0 1 0 17 19.8 A6.2 6.2 0 1 1 17 4.2 Z" />
          <path d="M6.5 5 V9 M4.5 7 H8.5" />
        </svg>
      );
    case "contract": // 契約 — quill over signature line
      return (
        <svg {...common} aria-hidden>
          <path d="M5 18.5 C5 18.5 12 17.5 16 8 C17.4 5.2 18 4 18 4 C18 4 14 6 11 10.5 C8 15 5 18.5 5 18.5 Z" />
          <path d="M5 18.5 L8 15.5" />
          <path d="M4 21.2 H13" />
        </svg>
      );
    case "insight": // 洞察 — all-seeing eye with rays
      return (
        <svg {...common} aria-hidden>
          <path d="M2.6 12 C6.2 6.6 17.8 6.6 21.4 12 C17.8 17.4 6.2 17.4 2.6 12 Z" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M12 4.4 V2.4 M19.4 6 L20.8 4.6 M4.6 6 L3.2 4.6" />
        </svg>
      );
    default:
      return null;
  }
}
