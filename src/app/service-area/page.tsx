import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Area — Tampa Bay HVAC",
  description: `We serve twelve communities across Hillsborough and Pasco County, including Tampa, New Tampa, Brandon, Riverview, and Wesley Chapel. ${site.name}.`,
  alternates: { canonical: `${site.url}/service-area` },
};

export default function ServiceAreaHub() {
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        title={["Service", "Area"]}
        intro="Twelve communities across Hillsborough and Pasco. Pick your city for local details, or call — if you're nearby and not listed, chances are we cover you too."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <RevealItem as="div" key={c.slug}>
              <Link
                href={`/service-area/${c.slug}`}
                className="group flex h-full flex-col rounded-md border border-brass/20 bg-graphite p-6 shadow-plate transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light">
                  {c.county} County
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-bone">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">
                  {c.blurb}
                </p>
                <span className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-brass-light">
                  View {c.name} →
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
