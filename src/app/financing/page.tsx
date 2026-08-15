import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financing",
  description: `Financing available on approved credit for new HVAC systems and major repairs. ${site.name}, Tampa.`,
  alternates: { canonical: `${site.url}/financing` },
};

export default function FinancingPage() {
  return (
    <>
      <PageHeader
        eyebrow="On approved credit"
        title={["Financing", "options"]}
        intro="A new system shouldn't wait for a windfall. We offer financing on approved credit so you can get the equipment you need now and pay for it on a schedule that works."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              How it works
            </RevealItem>
            <ul className="mt-6 space-y-4">
              {[
                "Get a flat-rate quote on your repair or new system — no obligation.",
                "Apply for financing during your visit; approvals are usually quick.",
                "Choose a term that fits your budget and we schedule the work.",
              ].map((b) => (
                <RevealItem
                  as="li"
                  key={b}
                  className="flex gap-3 text-lg leading-relaxed text-bone/85"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  {b}
                </RevealItem>
              ))}
            </ul>
            <RevealItem as="p" className="mt-6 max-w-measure text-sm leading-relaxed text-ash">
              {/* TODO: client to confirm — add specific lender, terms, APR, and promo details. */}
              Specific terms, promotional periods, and lender details are
              confirmed at the time of your quote.
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Ready to start</p>
              <a
                href={site.phoneHref}
                className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Call for a flat-rate quote and ask about financing, or book a
                visit online.
              </p>
              <Link
                href="/book"
                className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-brass px-6 py-3.5 font-semibold text-black brushed-brass transition-transform hover:-translate-y-1"
              >
                Book a service call
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
