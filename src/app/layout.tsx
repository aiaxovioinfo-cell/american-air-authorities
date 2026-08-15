import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { businessJsonLd, JsonLd } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Tampa HVAC | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Family-owned, York-certified HVAC in Tampa. Same-day AC repair, installation, and 24/7 emergency service across Hillsborough and Pasco. Flat-rate pricing, licensed and insured.",
  keywords: [
    "Tampa HVAC",
    "AC repair Tampa",
    "air conditioning Tampa",
    "HVAC contractor Tampa",
    "emergency AC repair",
    "York Certified Comfort Expert",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Tampa HVAC`,
    description:
      "Same-day AC repair and 24/7 emergency HVAC across Tampa Bay. Family owned, York certified, flat-rate pricing.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} insignia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Tampa HVAC`,
    description:
      "Same-day AC repair and 24/7 emergency HVAC across Tampa Bay. Family owned, York certified.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/logo-mark.svg", type: "image/svg+xml" },
      { url: "/logo-mark.png", type: "image/png" },
    ],
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#0B0C08",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen bg-carbon text-bone antialiased">
        <JsonLd data={businessJsonLd()} />
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-black"
        >
          Skip to content
        </a>

        <div className="noise-overlay" aria-hidden />
        <CustomCursor />

        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
