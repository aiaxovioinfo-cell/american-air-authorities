/**
 * Service catalog. Drives the /services hub, the four homepage cards,
 * and the per-service template pages. Icon names map to the line icons
 * in components/icons — brass strokes, no emoji, no snowflakes.
 */
export type Service = {
  slug: string;
  title: string;
  icon: "repair" | "install" | "commercial" | "maintenance" | "emergency";
  eyebrow: string;
  short: string; // homepage card copy
  intro: string; // service page lede
  symptoms?: string[]; // "in the customer's words"
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    icon: "repair",
    eyebrow: "Diagnostic · Flat-rate",
    short:
      "Blowing warm air, tripping the breaker, or making a noise it didn't make yesterday. We diagnose the fault and give you the price before any work begins.",
    intro:
      "When the house won't cool, you don't need a sales pitch — you need a straight diagnosis and a price you can say yes to. You get a clear diagnosis and a price you can approve before any work starts.",
    symptoms: [
      "Blowing warm air on a hot day",
      "Tripping the breaker or won't turn on",
      "A grinding, rattling, or hissing noise",
      "Water pooling around the air handler",
      "Runs constantly but never cools down",
    ],
    bullets: [
      "Full system diagnostic before any quote",
      "Flat-rate pricing — the invoice matches the quote",
      "Repairs on all major brands, not just York",
      "Same-day slots held open for no-cool calls",
    ],
  },
  {
    slug: "installation",
    title: "System Installation",
    icon: "install",
    eyebrow: "Load-calc · York CCE",
    short:
      "A right-sized system, sized by a real load calculation — not a bigger unit sold on guesswork. Installed clean and commissioned properly.",
    intro:
      "A new system is only as good as the install. We run a Manual J load calculation, match the equipment to your home, and commission it so it runs efficiently on day one and year ten.",
    bullets: [
      "Manual J load calculation on every install",
      "York equipment as a Certified Comfort Expert dealer",
      "Old system and refrigerant hauled away and reclaimed",
      "Financing available on approved credit",
    ],
  },
  {
    slug: "commercial-hvac",
    title: "Commercial HVAC",
    icon: "commercial",
    eyebrow: "Rooftop · Restaurant · Retail",
    short:
      "Rooftop units, restaurants, and retail floors that can't afford to lose a service day. We plan our visits around your business hours.",
    intro:
      "A down system in a restaurant or store isn't an inconvenience — it's lost revenue by the hour. We service rooftop units and light commercial systems on a schedule that protects your operating day.",
    bullets: [
      "Rooftop package units and split systems",
      "Restaurant, retail, and small office spaces",
      "Scheduled maintenance to prevent peak-season failures",
      "Priority response for existing commercial accounts",
    ],
  },
  {
    slug: "maintenance-plans",
    title: "Maintenance Plans",
    icon: "maintenance",
    eyebrow: "Tune-up · Priority",
    short:
      "Two visits a year that catch the small failure before it becomes the July breakdown. Priority scheduling when you do need us.",
    intro:
      "Most emergency calls start as a cheap part that nobody caught in time. A maintenance plan is two thorough visits a year that keep your system efficient and put you at the front of the line when something does go wrong.",
    bullets: [
      "Two comprehensive maintenance visits per year",
      "Priority scheduling ahead of non-members",
      "Full inspection of electrical, refrigerant, and airflow",
      "Cleaning of condenser coils",
      "Cleaning the drain system",
      "Disinfecting the air handler",
      "Written report on what we checked and found",
    ],
  },
  {
    slug: "emergency",
    title: "Emergency AC Repair",
    icon: "emergency",
    eyebrow: "Same-day · No-cool",
    short:
      "95° outside and 80% humidity inside is not a wait-until-Monday problem. We run emergency calls seven days a week, 7 AM to 10 PM EST.",
    intro:
      "Systems don't fail on a schedule. When the house won't cool, call and reach our office manager — not a call center — seven days a week, 7 AM to 10 PM EST, and we hold same-day slots open for no-cool emergencies.",
    bullets: [
      "Emergency service seven days a week, 7 AM to 10 PM EST",
      "Same-day dispatch for no-cool emergencies",
      "Flat-rate pricing, evenings and weekends included",
      "Straight answer on repair vs. replace, on the spot",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// The four cards featured on the homepage (emergency lives in the CTA band).
export const homepageServices = services.filter(
  (s) => s.slug !== "emergency",
);
