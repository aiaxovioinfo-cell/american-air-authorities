import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Section 9 — the loudest moment on the page. Full-bleed brass gradient
 * with the noise overlay. One headline, one line, phone + booking button.
 * Body text sits on brass, so it uses black/carbon (not bone) to stay above
 * AA contrast at these sizes.
 */
export function CtaBand() {
  return (
    <section aria-label="Book now" className="relative z-10 overflow-hidden">
      <div className="relative bg-cta-band py-20 md:py-28">
        {/* noise sits over the gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <Reveal className="container-x relative text-center">
          <RevealItem
            as="p"
            className="mx-auto mb-4 font-mono text-xs uppercase tracking-[0.18em] text-black/70"
          >
            No cool? Don&rsquo;t wait.
          </RevealItem>
          <RevealItem
            as="h2"
            className="mx-auto max-w-4xl font-display text-[clamp(34px,5.5vw,76px)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
          >
            Get the AC back on today
          </RevealItem>
          <RevealItem
            as="p"
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-black/80"
          >
            Same-day slots held open for no-cool emergencies across Tampa Bay.
            Call now or book online and a licensed tech will be on the way.
          </RevealItem>
          <RevealItem className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-carbon px-8 py-4 font-display text-xl font-bold tracking-tight text-brass-light shadow-plate transition-transform hover:-translate-y-1"
              data-cursor="target"
            >
              {site.phoneDisplay}
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-sm border-2 border-black px-8 py-4 font-semibold text-black transition-colors hover:bg-black hover:text-brass-light"
              data-cursor="target"
            >
              Book a service call
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
