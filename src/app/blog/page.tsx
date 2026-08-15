import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Straight HVAC advice for Tampa homeowners from ${site.name} — no marketing filler.`,
  alternates: { canonical: `${site.url}/blog` },
};

/**
 * Blog scaffold. Titles below are planned topics; wire these to a CMS or MDX
 * before launch. {/* TODO: client to confirm editorial calendar *\/}
 */
const POSTS = [
  {
    title: "Blowing warm air? Five things to check before you call",
    tag: "AC repair",
    dek: "Quick checks that tell you whether it's a filter, a breaker, or a compressor — and when to stop and call a tech.",
  },
  {
    title: "Why a bigger AC isn't a better AC",
    tag: "Installation",
    dek: "Oversized systems short-cycle, leave humidity behind, and wear out early. What a real load calculation actually does.",
  },
  {
    title: "The Tampa maintenance schedule that prevents July breakdowns",
    tag: "Maintenance",
    dek: "What to do in spring and fall so your system isn't the one that fails on the hottest day of the year.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Straight advice"
        title={["From the", "shop"]}
        intro="Practical HVAC guidance for Tampa homeowners — written by technicians, not a content mill."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x space-y-4">
          {POSTS.map((p, i) => (
            <RevealItem
              as="article"
              key={i}
              className="group flex flex-col gap-2 rounded-md border border-brass/20 bg-graphite p-8 shadow-plate transition-transform duration-300 hover:translate-x-1"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light">
                {p.tag}
              </span>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
                {p.title}
              </h2>
              <p className="max-w-measure leading-relaxed text-bone/75">
                {p.dek}
              </p>
              <span className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                Coming soon
              </span>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
