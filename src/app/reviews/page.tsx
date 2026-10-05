import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { googleReviewsUrl, reviews } from "@/lib/reviews";

export const metadata: Metadata = pageMetadata({
  title: "Reviews",
  description:
    "Google reviews of American Air Authorities from Tampa homeowners and businesses — repairs, full installs, maintenance and duct work, in their own words.",
  path: "/reviews",
});

/**
 * Real Google reviews, customer wording as written. Selection and rules
 * (truncation, no ratings, no review JSON-LD) live in lib/reviews.ts.
 */
export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What Tampa says"
        title={["Customer", "reviews"]}
        intro="A selection of our Google reviews, in our customers' own words — repairs, full installs, maintenance, and commercial work."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x grid grid-cols-1 gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <RevealItem
              as="figure"
              key={r.name}
              className="rounded-lg border border-brass/20 bg-graphite p-8 shadow-plate"
            >
              <blockquote className="text-lg leading-relaxed text-bone/85">
                &ldquo;{r.body}
                {r.truncated ? " …" : ""}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {r.name} · Google review
              </figcaption>
            </RevealItem>
          ))}
        </Reveal>
        <div className="container-x mt-10">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-brass/60 px-6 py-3.5 text-sm text-bone transition-colors hover:border-brass hover:text-brass-light"
          >
            Read all reviews on Google &rarr;
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
