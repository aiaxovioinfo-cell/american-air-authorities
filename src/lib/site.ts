/**
 * Single source of truth for verified business facts.
 * Every value here comes from the client brief — do NOT invent
 * statistics, job counts, or years in business. Anything unverified
 * is marked with a TODO in the component that would render it.
 */
export const site = {
  name: "American Air Authorities",
  shortName: "AAA",
  tagline: "We do the job right, the first time",
  // Verified facts only.
  phoneVanity: "1-877-WE-COOL-U",
  phoneDisplay: "1-877-932-6658",
  phoneHref: "tel:+18779326658",
  email: "manager@amairoffice.com",
  emailHref: "mailto:manager@amairoffice.com",
  address: {
    street: "15310 Amberly Drive, Suite 250-63",
    city: "Tampa",
    region: "FL",
    postalCode: "33647",
    country: "US",
    full: "15310 Amberly Drive, Suite 250-63, Tampa, FL 33647",
  },
  geo: {
    // Approximate coordinates for New Tampa / Amberly Dr area.
    latitude: 28.1216,
    longitude: -82.3573,
  },
  license: "CAC1823043",
  licenseState: "Florida",
  credential: "York Certified Comfort Expert (CCE) dealer",
  instagram: {
    handle: "@americanairauthorities",
    url: "https://www.instagram.com/americanairauthorities",
  },
  url: "https://www.americanairauthorities.com",
  /**
   * Business hours — one source of truth. Open every day, 7 AM to 10 PM EST.
   * The client does NOT run an all-hours operation: never claim round-the-clock
   * or overnight availability anywhere on the site. Change a value here and it
   * propagates to on-page copy, the footer, and the JSON-LD.
   */
  hours: {
    display: "7 AM to 10 PM EST",
    compact: "7 AM–10 PM EST",
    days: "seven days a week",
    // Canonical emergency framing — use verbatim wherever it appears.
    emergencyLine: "Emergency service seven days a week, 7 AM to 10 PM EST.",
    // Structured values for schema.org OpeningHoursSpecification.
    opens: "07:00",
    closes: "22:00",
    timeZone: "America/New_York",
  },
} as const;

export type SiteInfo = typeof site;
