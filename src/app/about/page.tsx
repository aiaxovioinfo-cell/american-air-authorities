import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { EmblemMark } from "@/components/brand/EmblemMark";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a family-owned, York-certified HVAC contractor serving Tampa Bay. Licensed, insured, and built on doing the job right the first time.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Family owned · Tampa"
        title={["Not a", "roll-up"]}
        intro="American Air Authorities is a small, licensed, factory-certified HVAC contractor in Tampa — the kind where the tech who quotes your job is the tech who does it."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              The difference you can feel on the invoice
            </RevealItem>
            <RevealItem as="p" className="mt-5 max-w-measure text-lg leading-relaxed text-bone/85">
              Private equity has been buying up Tampa&rsquo;s HVAC contractors,
              putting sales quotas on the wall and commission boards in the break
              room. When your comfort is someone&rsquo;s sales target, you get
              upsold on a system you didn&rsquo;t need.
            </RevealItem>
            <RevealItem as="p" className="mt-4 max-w-measure text-lg leading-relaxed text-bone/85">
              We&rsquo;re the other thing. Family owned, York certified, and small
              enough that the person who answers the phone knows the person
              turning the wrench. We diagnose honestly, quote flat-rate, and stand
              behind the work.
            </RevealItem>

            <RevealItem className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { k: "License", v: `${site.licenseState} #${site.license}` },
                { k: "Certified", v: "York Comfort Expert" },
                { k: "Coverage", v: "24/7 emergency" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-sm border border-brass/25 bg-graphite p-4"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light">
                    {b.k}
                  </p>
                  <p className="mt-1 text-sm text-bone">{b.v}</p>
                </div>
              ))}
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="relative overflow-hidden rounded-lg border border-brass/20 bg-graphite p-10 shadow-plate">
              <EmblemMark
                className="pointer-events-none absolute -right-8 -top-4 h-auto w-[24rem] opacity-[0.06]"
                monochrome
              />
              <div className="relative">
                <p className="eyebrow mb-3 text-brass-light">Our standard</p>
                <blockquote className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-bone">
                  We do the job right, the first time.
                </blockquote>
                <p className="mt-5 leading-relaxed text-bone/80">
                  A fair diagnosis, a price you approve before we start, and a
                  system that holds after we leave.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
