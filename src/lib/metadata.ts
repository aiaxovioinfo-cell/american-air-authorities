import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Per-page metadata in one place, so description, og:description and
 * twitter:description are always the same string, and every page shares with
 * its own title, URL and image.
 *
 * Why a helper: Next merges metadata shallowly. A page that sets `openGraph`
 * replaces the layout's whole openGraph object (that dropped og:image on the
 * city and service pages), and a page that sets only `description` inherits
 * the layout's site-wide og/twitter text.
 *
 * Descriptions: purpose-written, 150–155 characters (Google truncates around
 * 155–160), leading with the place and the service plus one specific detail.
 * Never derive them from page body copy.
 */
export const SHARE_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name} insignia`,
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title; the layout template appends " · American Air Authorities". */
  title: string;
  description: string;
  /** Route path, e.g. "/gallery". */
  path: string;
}): Metadata {
  if (
    process.env.NODE_ENV !== "production" &&
    (description.length < 150 || description.length > 155)
  ) {
    console.warn(
      `[metadata] ${path}: description is ${description.length} chars (want 150–155)`,
    );
  }
  const url = `${site.url}${path}`;
  const shareTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url,
      title: shareTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
