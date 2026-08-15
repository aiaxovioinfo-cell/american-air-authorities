import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";

/**
 * Shared interior-page header band. Applied across every non-home route so
 * the shell is consistent: engineering grid, mono eyebrow, display H1.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string[];
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-brass/15 bg-carbon pt-[112px]">
      <div className="engineering-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,rgba(169,121,57,0.10),transparent_60%)]" />
      <Reveal className="container-x relative py-16 md:py-24">
        <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
          {eyebrow}
        </RevealItem>
        <HeadlineReveal
          as="h1"
          className="font-display font-extrabold uppercase text-bone text-hero"
          lines={title}
        />
        {intro && (
          <RevealItem
            as="p"
            className="mt-6 max-w-measure text-lg leading-relaxed text-bone/80"
          >
            {intro}
          </RevealItem>
        )}
      </Reveal>
    </section>
  );
}
