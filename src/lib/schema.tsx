import { site } from "./site";
import { cities } from "./cities";
import { googleReviewsUrl, type CustomerReview } from "./reviews";

/** Stable node id so other JSON-LD (e.g. Review.itemReviewed) can point here. */
const BUSINESS_ID = `${site.url}/#business`;

/**
 * LocalBusiness + HVACBusiness JSON-LD. Includes the license number,
 * full service area, and phone so search engines can surface the
 * emergency-ready details a panicked homeowner is searching for.
 *
 * TODO: client to confirm — add aggregateRating ONLY once we have the real
 * Google profile figures ("ratingValue X.X, reviewCount N"), and show the
 * same figure visibly on the page. Never derive it from the reviews we show.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
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
 * One Review node per displayed review. reviewBody is exactly the text on the
 * page (truncated reviews keep their ellipsis) and the rating is shown as
 * stars on each card. No aggregateRating here — see businessJsonLd.
 */
export function reviewsJsonLd(list: CustomerReview[]) {
  return {
    "@context": "https://schema.org",
    "@graph": list.map((r) => ({
      "@type": "Review",
      itemReviewed: {
        "@type": ["HVACBusiness", "LocalBusiness"],
        "@id": BUSINESS_ID,
        name: site.name,
      },
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body + (r.truncated ? " …" : ""),
    })),
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
