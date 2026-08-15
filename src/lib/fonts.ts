import {
  Big_Shoulders_Display,
  Manrope,
  IBM_Plex_Mono,
} from "next/font/google";

/**
 * Three type roles, self-hosted by next/font with font-display: swap.
 *  - Display: Big Shoulders Display — industrial signage, stencilled authority.
 *  - Body:    Manrope — geometric and clean without being Inter.
 *  - Utility: IBM Plex Mono — the "instrument readout" voice for specs.
 */
export const fontDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
