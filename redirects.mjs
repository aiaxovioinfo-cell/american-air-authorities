/**
 * 301 redirect map — old Wix URLs → new site paths.
 *
 * READY FOR DNS CUTOVER. Until americanairauthorities.com points at this
 * Vercel project, these rules are effectively inert (they also apply on the
 * *.vercel.app domain, where almost nothing requests these paths). The moment
 * the domain moves, every old bookmarked / indexed / backlinked Wix URL lands
 * on the right new page instead of a 404, and link equity transfers.
 *
 * Source of the old URL list — the live Wix sitemaps, captured 2026-09-02:
 *   https://www.americanairauthorities.com/pages-sitemap.xml
 *   https://www.americanairauthorities.com/booking-services-sitemap.xml
 * Each old page's identity was confirmed from its <title>.
 *
 * NOT redirected (new site already serves the same path): "/", "/services",
 * "/reviews".
 *
 * TODO: client to confirm
 *   1. After cutover, open Google Search Console → Pages / Performance, export
 *      the full list of indexed old URLs, and add redirects for anything not
 *      covered here (old blog posts, campaign landing pages, backlinked paths).
 *   2. /service-page/duct-cleaning is pointed at /services/maintenance-plans
 *      as the closest match. If duct cleaning is still an offered service it
 *      should get its own page, and this target should change.
 *   3. Confirm there was never a standalone /about, /financing, or /blog URL
 *      on the Wix site (none appear in its sitemaps).
 */

/** @type {import('next').NextConfig['redirects']} */
export const wixRedirects = [
  // Duplicate "copy of" pages the Wix editor left behind.
  { source: "/copy-of-home", destination: "/", statusCode: 301 },
  {
    // Wix <title>: "Residential AC Services"
    source: "/copy-of-commercial-hvac-services",
    destination: "/services/ac-repair",
    statusCode: 301,
  },

  // Wix numbered service pages.
  {
    // Wix <title>: "Commercial HVAC Services"
    source: "/services-1",
    destination: "/services/commercial-hvac",
    statusCode: 301,
  },
  {
    // Wix <title>: "Residential HVAC Installation"
    source: "/services-8",
    destination: "/services/installation",
    statusCode: 301,
  },

  // Portfolio / gallery.
  {
    // Wix <title>: "Gallery"
    source: "/projects-8",
    destination: "/gallery",
    statusCode: 301,
  },

  // Booking + contact.
  { source: "/book-online", destination: "/book", statusCode: 301 },
  {
    // The old "Contact" nav link pointed here; the page itself is titled
    // "Careers". Sending it to /careers to match the actual content.
    source: "/contact-4",
    destination: "/careers",
    statusCode: 301,
  },

  // Wix Bookings service page. TODO above — closest current match.
  {
    source: "/service-page/duct-cleaning",
    destination: "/services/maintenance-plans",
    statusCode: 301,
  },
];
