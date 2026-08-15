import Link from "next/link";
import type { Service } from "@/lib/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * One template drives every /services/[slug] page. Fill it from the service
 * catalog in lib/services.ts — add a service there and it renders here.
 */
export function ServiceTemplate({ service }: { service: Service }) {
  return (
    <>
      <PageHeader
        eyebrow={service.eyebrow}
        title={service.title.toUpperCase().split(" ")}
        intro={service.intro}
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.9fr]">
          {/* What's included */}
          <Reveal>
            <RevealItem as="div" className="mb-8 inline-flex text-brass">
              <ServiceIcon name={service.icon} />
            </RevealItem>
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              What&rsquo;s included
            </RevealItem>
            <ul className="mt-6 space-y-4">
              {service.bullets.map((b) => (
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
          </Reveal>

          {/* Symptoms (if any) + call panel */}
          <Reveal>
            {service.symptoms && (
              <RevealItem className="rounded-lg border border-brass/20 bg-graphite p-8 shadow-plate">
                <p className="eyebrow mb-4 text-brass-light">
                  Sound familiar?
                </p>
                <ul className="space-y-3">
                  {service.symptoms.map((s) => (
                    <li
                      key={s}
                      className="border-b border-brass/10 pb-3 text-bone/85 last:border-0"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            )}

            <RevealItem className="mt-6 rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Talk to a tech</p>
              <a
                href={site.phoneHref}
                className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex flex-1 items-center justify-center rounded-sm bg-brass px-6 py-3.5 font-semibold text-black brushed-brass transition-transform hover:-translate-y-1"
                >
                  Book a service call
                </Link>
                <Link
                  href="/financing"
                  className="inline-flex flex-1 items-center justify-center rounded-sm border border-brass/60 px-6 py-3.5 text-sm text-bone transition-colors hover:border-brass hover:text-brass-light"
                >
                  See financing
                </Link>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
