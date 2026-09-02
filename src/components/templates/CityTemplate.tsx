import Link from "next/link";
import type { City } from "@/lib/cities";
import { services } from "@/lib/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * One template drives every /service-area/[city] page. The per-city content —
 * intro, neighborhoods, housing stock, local factors, FAQ — lives in
 * lib/cities.ts so each page reads as its own page, not a name-swapped
 * template. The route, metadata, and FAQ JSON-LD all follow from that data.
 */
export function CityTemplate({ city }: { city: City }) {
  return (
    <>
      <PageHeader
        eyebrow={`Service area · ${city.county} County`}
        title={["HVAC in", city.name.toUpperCase()]}
        intro={city.intro}
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              What we do in {city.name}
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 max-w-measure text-lg leading-relaxed text-bone/85"
            >
              Same-day AC repair, new-system installation, commercial rooftop
              work, and emergency service seven days a week, 7 AM to 10 PM EST —
              handled by licensed, York-certified technicians who live and work
              in the Tampa Bay area. In {city.name} you get a clear diagnosis and
              a price you can approve before any work starts.
            </RevealItem>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <RevealItem as="li" key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block rounded-sm border border-brass/20 bg-graphite p-4 transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="font-display text-lg font-bold uppercase tracking-tight text-bone">
                      {s.title}
                    </span>
                    <span className="mt-1 block text-sm text-ash">
                      {s.eyebrow}
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <RevealItem className="rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">
                {city.name} · same-day
              </p>
              <a
                href={site.phoneHref}
                className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Serving {city.name} and the surrounding {city.county} County
                communities. Call or book online and we&rsquo;ll be on the way.
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

      {/* Local housing stock + neighborhoods */}
      <section className="relative z-10 border-t border-brass/15 bg-graphite py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-measure">
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              {city.name} homes we work on
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 text-lg leading-relaxed text-bone/85"
            >
              {city.housing}
            </RevealItem>
          </Reveal>

          {city.neighborhoods.length > 0 && (
            <Reveal className="mt-8">
              <RevealItem
                as="p"
                className="eyebrow mb-3 text-brass-light"
              >
                Neighborhoods we cover in {city.name}
              </RevealItem>
              <RevealItem as="ul" className="flex flex-wrap gap-2.5">
                {city.neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-brass/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-bone/85"
                  >
                    {n}
                  </li>
                ))}
              </RevealItem>
            </Reveal>
          )}
        </div>
      </section>

      {/* Local climate / siting factors */}
      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-measure">
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
            >
              Local factors we plan around
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 text-lg leading-relaxed text-bone/85"
            >
              {city.local}
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* City-specific FAQ */}
      {city.faqs.length > 0 && (
        <section className="relative z-10 border-t border-brass/15 bg-graphite py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <RevealItem
                as="h2"
                className="font-display text-3xl font-bold uppercase tracking-tight text-bone"
              >
                {city.name} HVAC questions, answered
              </RevealItem>
              <RevealItem as="div" className="mt-8 max-w-measure divide-y divide-brass/15 border-y border-brass/15">
                {city.faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-display text-lg font-bold uppercase tracking-tight text-bone marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="mr-2 text-brass-light group-open:hidden">+</span>
                      <span className="mr-2 hidden text-brass-light group-open:inline">–</span>
                      {f.q}
                    </summary>
                    <p className="mt-3 text-[0.975rem] leading-relaxed text-bone/80">
                      {f.a}
                    </p>
                  </details>
                ))}
              </RevealItem>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
