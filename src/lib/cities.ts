/**
 * Service-area cities. Each drives a /service-area/[slug] page from one
 * template. Blurbs name a real local landmark or trait — never generic
 * "we proudly serve" filler.
 */
export type City = {
  slug: string;
  name: string;
  county: "Hillsborough" | "Pasco";
  blurb: string;
};

export const cities: City[] = [
  {
    slug: "tampa",
    name: "Tampa",
    county: "Hillsborough",
    blurb:
      "From South Tampa bungalows to the towers downtown, we keep the city cool through every August afternoon storm.",
  },
  {
    slug: "new-tampa",
    name: "New Tampa",
    county: "Hillsborough",
    blurb:
      "Our home base off Amberly Drive. Tech-heavy neighborhoods and newer builds mean smart thermostats and zoned systems we know cold.",
  },
  {
    slug: "south-tampa",
    name: "South Tampa",
    county: "Hillsborough",
    blurb:
      "South Tampa's Hyde Park and Palma Ceia bungalows run tight attics, undersized ducts, and additions the original system was never meant to cool. We right-size the fix instead of overselling a bigger condenser.",
  },
  {
    slug: "brandon",
    name: "Brandon",
    county: "Hillsborough",
    blurb:
      "Brandon runs hard on its AC. When a system quits mid-shift, a same-day call keeps the house and the home office livable.",
  },
  {
    slug: "riverview",
    name: "Riverview",
    county: "Hillsborough",
    blurb:
      "Fast-growing Riverview subdivisions get builder-grade units that age quickly in the heat. We repair them and replace them right.",
  },
  {
    slug: "wesley-chapel",
    name: "Wesley Chapel",
    county: "Pasco",
    blurb:
      "Wesley Chapel homes off SR-56 push their systems in the humidity. We tune them so they hold a set temperature without short-cycling.",
  },
  {
    slug: "lutz",
    name: "Lutz",
    county: "Hillsborough",
    blurb:
      "Lutz spreads out over lakes and larger lots, and larger homes need honest load calculations — not a bigger unit sold on guesswork.",
  },
  {
    slug: "carrollwood",
    name: "Carrollwood",
    county: "Hillsborough",
    blurb:
      "Established Carrollwood homes often run older ducts and aging condensers. We find the real fault before quoting a full replacement.",
  },
  {
    slug: "temple-terrace",
    name: "Temple Terrace",
    county: "Hillsborough",
    blurb:
      "Near USF and the golf course, Temple Terrace mixes older homes and rentals. We keep tenants comfortable and landlords out of surprises.",
  },
  {
    slug: "valrico",
    name: "Valrico",
    county: "Hillsborough",
    blurb:
      "Valrico's mature neighborhoods lean on their AC eight months a year. Maintenance here is what keeps a July breakdown from happening.",
  },
  {
    slug: "odessa",
    name: "Odessa",
    county: "Pasco",
    blurb:
      "Odessa's larger properties and outbuildings often need multiple systems balanced. We handle the whole footprint, not just the main house.",
  },
  {
    slug: "land-o-lakes",
    name: "Land O' Lakes",
    county: "Pasco",
    blurb:
      "Land O' Lakes sits far enough north that a broken system means a real wait for the big chains. We answer the phone the same day.",
  },
  {
    slug: "seffner",
    name: "Seffner",
    county: "Hillsborough",
    blurb:
      "Seffner homes and small commercial shops off I-4 count on flat-rate pricing so the invoice matches the quote, every time.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
