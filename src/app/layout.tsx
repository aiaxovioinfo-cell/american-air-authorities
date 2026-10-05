import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { businessJsonLd, JsonLd } from "@/lib/schema";
import { SHARE_IMAGE } from "@/lib/metadata";

const HOME_DESCRIPTION =
  "Family-owned, York-certified HVAC in Tampa. AC repair, installation and emergency service seven days a week, 7 AM–10 PM EST. Flat-rate pricing, licensed.";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Tampa HVAC | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  // Homepage description (150–155 chars). Other pages set their own via
  // pageMetadata() in lib/metadata.ts; og/twitter below repeat this string.
  description: HOME_DESCRIPTION,
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
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Tampa HVAC`,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE.url],
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

        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
