import Link from "next/link";
import { cities } from "@/lib/cities";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";

export function ServiceArea() {
  return (
    <section
      aria-label="Service area"
      className="relative z-10 bg-carbon py-24 md:py-32"
    >
      <div className="container-x">
        <Reveal className="mb-12 max-w-measure">
          <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
            Where we work
          </RevealItem>
          <HeadlineReveal
            as="h2"
            className="font-display text-section font-bold uppercase text-bone"
            lines={["Tampa Bay,", "covered"]}
          />
          <RevealItem as="p" className="mt-5 text-lg leading-relaxed text-bone/80">
            {cities.length} communities across Hillsborough and Pasco. If
            you&rsquo;re nearby and not listed, call — chances are we cover you
            too.
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="flex flex-wrap gap-3">
          {cities.map((c) => (
            <RevealItem as="li" key={c.slug}>
              <Link
                href={`/service-area/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-brass/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-bone transition-all duration-300 hover:-translate-y-[3px] hover:border-brass hover:bg-brass hover:text-black"
                data-cursor="target"
              >
                {c.name}
                <span className="text-brass-light transition-colors group-hover:text-black">
                  ›
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
