import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `See what Tampa homeowners and businesses say about ${site.name}. York-certified, family-owned HVAC.`,
  alternates: { canonical: `${site.url}/reviews` },
};

/**
 * PLACEHOLDER reviews for layout only — replace with verified Google reviews
 * (Places API or an embedded widget) before launch.
 * {/* TODO: client to confirm — wire in real Google reviews *\/}
 */
const REVIEWS = [
  {
    name: "Placeholder — homeowner, New Tampa",
    body: "AC quit on a Saturday in July. They answered, came the same day, and the invoice matched the quote exactly. No games.",
  },
  {
    name: "Placeholder — restaurant manager, Brandon",
    body: "Rooftop unit went down mid-service. They worked around our hours and had us cool before the dinner rush.",
  },
  {
    name: "Placeholder — homeowner, Wesley Chapel",
    body: "Two other companies tried to sell me a whole new system. These guys found the actual part and fixed it for a fraction.",
  },
  {
    name: "Placeholder — homeowner, Carrollwood",
    body: "Older house, aging system. They were honest about what needed replacing now and what could wait. Rare.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What Tampa says"
        title={["Customer", "reviews"]}
        intro="Verified Google reviews are wired in at launch. Below are representative examples of the work and the standard we hold."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x grid grid-cols-1 gap-5 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <RevealItem
              as="div"
              key={i}
              className="rounded-lg border border-brass/20 bg-graphite p-8 shadow-plate"
            >
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 20 20" fill="#E0B478" stroke="#A97939" strokeWidth="1" aria-hidden>
                    <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
                  </svg>
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-bone/85">
                &ldquo;{r.body}&rdquo;
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {r.name}
              </p>
            </RevealItem>
          ))}
        </Reveal>
        <p className="container-x mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash/70">
          Sample reviews shown for layout · verified Google reviews at launch
        </p>
      </section>

      <CtaBand />
    </>
  );
}
