import type { Config } from "tailwindcss";

/**
 * American Air Authorities — brand token system.
 *
 * Colors are sampled directly from the military-insignia logo:
 * olive emblem + brass chevrons on true black. NO blue / cyan / teal
 * is defined anywhere in this file on purpose — cool light reads as
 * pale bone, never cyan. Do not add arbitrary hex values in components;
 * reach for these tokens instead.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000", // true logo background
        carbon: "#0B0C08", // primary page surface
        graphite: "#14160F", // raised surfaces, cards
        olive: {
          DEFAULT: "#3E461F", // LOGO GREEN — emblem, "AIR AUTHORITIES"
          shadow: "#1D2110",
          mid: "#3E461F",
          light: "#6C7A38",
        },
        brass: {
          DEFAULT: "#A97939", // LOGO GOLD — chevrons, "AMERICAN"
          shadow: "#5E4119",
          mid: "#A97939",
          light: "#E0B478",
          spec: "#FFF2D6",
        },
        bone: "#EDE7DA", // primary text on dark
        ash: "#8E9182", // secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // H1 scale from the brief.
        hero: [
          "clamp(48px, 7vw, 104px)",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        section: [
          "clamp(34px, 4.5vw, 68px)",
          { lineHeight: "0.96", letterSpacing: "-0.02em" },
        ],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      maxWidth: {
        measure: "62ch",
      },
      boxShadow: {
        plate:
          "0 1px 0 0 rgba(224,180,120,0.10) inset, 0 18px 40px -24px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "brass-ramp":
          "linear-gradient(135deg, #5E4119 0%, #A97939 38%, #E0B478 62%, #FFF2D6 82%, #A97939 100%)",
        "olive-ramp":
          "linear-gradient(135deg, #1D2110 0%, #3E461F 55%, #6C7A38 100%)",
        "cta-band":
          "linear-gradient(120deg, #A97939 0%, #8A6230 45%, #5E4119 100%)",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
