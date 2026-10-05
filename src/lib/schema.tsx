import { site } from "./site";
import { cities } from "./cities";
import { googleReviewsUrl } from "./reviews";

/**
 * LocalBusiness + HVACBusiness JSON-LD. Includes the license number,
 * full service area, and phone so search engines can surface the
 * emergency-ready details a panicked homeowner is searching for.
 *
 * DELIBERATELY NO Review or AggregateRating markup (decided Oct 2026 — not an
 * oversight). Google treats reviews a business shows about itself as
 * self-serving: they're ineligible for review rich results on LocalBusiness,
 * so stars would never appear in search, and marking up reviews taken from
 * Google adds a structured-data guidelines risk for no gain. The stars that
 * matter come from the Google Business Profile (linked in sameAs) and already
 * show in the map pack. The review cards on the site stay as visible content.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    name: site.name,
    slogan: site.tagline,
    telephone: site.phoneDisplay,
    email: site.email,
    url: site.url,
    image: `${site.url}/og.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
    })),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `${site.licenseState} HVAC Contractor License #${site.license}`,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: site.credential,
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: [site.instagram.url, googleReviewsUrl],
  };
}


/**
 * FAQPage schema for a city page's Q&A block. Lets the per-city questions
 * qualify for FAQ rich results and reinforces that each page is distinct.
 */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, site-authored content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
