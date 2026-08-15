import { site } from "./site";
import { cities } from "./cities";

/**
 * LocalBusiness + HVACBusiness JSON-LD. Includes the license number,
 * full service area, and phone so search engines can surface the
 * emergency-ready details a panicked homeowner is searching for.
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
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [site.instagram.url],
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
