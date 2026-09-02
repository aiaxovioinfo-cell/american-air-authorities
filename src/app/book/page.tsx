import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookingForm } from "@/components/forms/BookingForm";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Service Call",
  description: `Book same-day HVAC service in Tampa. ${site.name} · York certified · emergency service 7 days a week, 7 AM–10 PM EST · Lic #${site.license}.`,
  alternates: { canonical: `${site.url}/book` },
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Same-day slots held open"
        title={["Book a", "service call"]}
        intro="Tell us what's happening and how soon you need us. For a no-cool emergency, call directly — you'll reach our office manager."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.7fr]">
          <Reveal>
            <RevealItem>
              <BookingForm />
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Call now</p>
              <a
                href={site.phoneHref}
                className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {site.phoneVanity}
              </p>
              <div className="hairline-rule my-6" />
              <ul className="space-y-3 text-sm text-bone/80">
                <li>Answered {site.hours.days}, {site.hours.display}</li>
                <li>Same-day dispatch for no-cool calls</li>
                <li>Flat-rate pricing, evenings and weekends included</li>
                <li>Licensed &amp; insured · {site.licenseState} #{site.license}</li>
              </ul>
              <address className="mt-6 not-italic text-sm leading-relaxed text-ash">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </>
  );
}
