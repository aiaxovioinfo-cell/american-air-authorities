import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, email, or visit ${site.name} in Tampa. 24/7 emergency HVAC · Lic #${site.license}.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={["Contact", "us"]}
        intro="The fastest way to reach us is the phone — it's answered day and night. Prefer email or want to book online? Those work too."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <RevealItem className="h-full rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Call · 24/7</p>
              <a
                href={site.phoneHref}
                className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {site.phoneVanity}
              </p>
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="h-full rounded-lg border border-brass/20 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Email</p>
              <a
                href={site.emailHref}
                className="break-words text-lg text-bone hover:text-brass-light"
              >
                {site.email}
              </a>
              <p className="mt-4 eyebrow mb-2 text-brass-light">Instagram</p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-bone hover:text-brass-light"
              >
                {site.instagram.handle}
              </a>
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="h-full rounded-lg border border-brass/20 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Visit</p>
              <address className="not-italic leading-relaxed text-bone/85">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region}{" "}
                {site.address.postalCode}
              </address>
              <p className="mt-4 eyebrow mb-1 text-brass-light">License</p>
              <p className="font-mono text-sm text-bone">
                {site.licenseState} #{site.license}
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <Reveal className="container-x mt-12 px-0">
          <RevealItem>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-sm bg-brass px-8 py-4 font-semibold text-black brushed-brass shadow-plate transition-transform hover:-translate-y-1"
            >
              Book a service call
            </Link>
          </RevealItem>
        </Reveal>
      </section>
    </>
  );
}
