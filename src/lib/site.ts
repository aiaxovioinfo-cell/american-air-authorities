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
  hoursNote: "24/7 emergency service",
} as const;

export type SiteInfo = typeof site;
