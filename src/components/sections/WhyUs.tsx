import { EmblemMark } from "@/components/brand/EmblemMark";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";
import { site } from "@/lib/site";

const BADGES = [
  {
    label: "Factory certified",
    value: "York Certified Comfort Expert Dealer",
    note: "A credential York gives to a small number of dealers, not every contractor with a van.",
  },
  {
    label: "Licensed & insured",
    value: `${site.licenseState} #${site.license}`,
    note: "A verifiable state license. Ask the last three contractors who quoted you for theirs.",
  },
  {
    label: "Emergency service",
    value: "We are here at times of need",
    note: "Emergency service seven days a week, 7 AM to 10 PM EST, when the house won't cool.",
  },
];

export function WhyUs() {
  return (
    <section
      aria-label="Why choose us"
      className="relative z-10 bg-carbon py-24 md:py-32"
    >
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* LEFT — headline + credential plates */}
        <Reveal>
          <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
            Why American Air Authorities
          </RevealItem>
          <HeadlineReveal
            as="h2"
            className="font-display text-section font-bold uppercase text-bone"
            lines={["Family owned.", "Not a roll-up."]}
          />
          <RevealItem as="p" className="mt-5 max-w-measure text-lg leading-relaxed text-bone/80">
            Private equity is buying up Tampa&rsquo;s HVAC contractors and
            putting a commission board in the break room. We are the
            alternative: a small, licensed, factory-certified outfit where you
            get a clear diagnosis and a price you can approve before any work
            starts.
          </RevealItem>

          <ul className="mt-8 space-y-3">
            {BADGES.map((b) => (
              <RevealItem
                as="li"
                key={b.value}
                className="group rounded-sm border border-brass/30 bg-graphite p-4 shadow-plate transition-transform duration-300 hover:translate-x-1.5"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light">
                  {b.label}
                </p>
                <p className="mt-0.5 font-display text-lg font-bold uppercase tracking-tight text-bone">
                  {b.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ash">{b.note}</p>
              </RevealItem>
            ))}
          </ul>
        </Reveal>

        {/* RIGHT — pull-quote panel with watermarked emblem */}
        <Reveal>
          <RevealItem className="relative overflow-hidden rounded-lg border border-brass/20 bg-graphite p-10 shadow-plate md:p-14">
            <EmblemMark
              className="pointer-events-none absolute -right-10 -top-6 h-auto w-[28rem] opacity-[0.06]"
              monochrome
            />
            <div className="relative">
              <span className="font-display text-6xl leading-none text-brass/50">
                &ldquo;
              </span>
              <blockquote className="mt-2 max-w-measure font-display text-2xl font-bold uppercase leading-tight tracking-tight text-bone md:text-3xl">
                We do the job right, the first time.
              </blockquote>
              <p className="mt-6 max-w-measure text-lg leading-relaxed text-bone/80">
                That isn&rsquo;t a slogan we bought from a marketing agency.
                It&rsquo;s the standard the whole shop is measured against — an
                accurate diagnosis, a
                price you approve before we start, and a system that holds after
                we leave.
              </p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-brass-light">
                — The American Air Authorities crew
              </p>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
