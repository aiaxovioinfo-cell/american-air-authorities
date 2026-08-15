import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Job-site photos of installs and repairs by ${site.name} across Tampa Bay.`,
  alternates: { canonical: `${site.url}/gallery` },
};

/**
 * PLACEHOLDER gallery — swap these tiles for the client's own job-site photos
 * (dark equipment-detail shots, clean installs). Do NOT use stock photography
 * of a family on a sofa. Use next/image with real dimensions + alt text.
 * {/* TODO: client to provide job-site photography *\/}
 */
const TILES = [
  "Condenser replacement — New Tampa",
  "Rooftop unit service — Brandon",
  "Air handler install — Riverview",
  "Ductwork detail — Lutz",
  "Commercial split system — Tampa",
  "Maintenance tune-up — Wesley Chapel",
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our own work"
        title={["Job-site", "gallery"]}
        intro="Real installs and repairs from around Tampa Bay. Photos are added as jobs wrap — no stock imagery, just our work."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((label, i) => (
            <RevealItem
              as="figure"
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-md border border-brass/20 bg-graphite"
            >
              {/* Placeholder tile — replace with <Image src=... /> at launch. */}
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_30%_20%,rgba(169,121,57,0.14),transparent_60%)]" />
              <div className="engineering-grid absolute inset-0 opacity-40" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-brass/20 bg-carbon/70 p-4 backdrop-blur-sm">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-bone/85">
                  {label}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ash">
                  Photo TBD
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
