import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { DeferredImage } from "@/components/ui/DeferredImage";
import { galleryCategories, galleryPhotos } from "@/lib/gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Job-site photos of installs and replacements by ${site.name} — York, GrandAire, and Goodman equipment, before and after.`,
  alternates: { canonical: `${site.url}/gallery` },
};

/**
 * Photos and captions live in lib/gallery.ts. Categories with no approved
 * photos are skipped (nav and section) rather than rendered empty.
 */
const sections = galleryCategories
  .map((c) => ({ ...c, photos: galleryPhotos.filter((p) => p.category === c.id) }))
  .filter((c) => c.photos.length > 0);

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our own work"
        title={["Job-site", "gallery"]}
        intro="Real installs and replacements by our crews. No stock imagery — every photo here is our work, added as jobs wrap."
      />

      <nav
        aria-label="Gallery categories"
        className="relative z-10 border-b border-brass/15 bg-carbon"
      >
        <ul className="container-x flex flex-wrap gap-x-6 gap-y-2 py-5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="font-mono text-xs uppercase tracking-[0.14em] text-bone/80 underline-offset-4 hover:text-brass-light hover:underline"
              >
                {s.label}{" "}
                <span className="text-ash">({s.photos.length})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-heading`}
          className="relative z-10 scroll-mt-28 bg-carbon py-16 md:py-20"
        >
          <div className="container-x">
            <h2
              id={`${s.id}-heading`}
              className="mb-8 font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl"
            >
              {s.label}
            </h2>
            {/* Masonry via CSS columns: photos keep their natural aspect ratio. */}
            <Reveal className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {s.photos.map((p) => (
                <RevealItem
                  as="figure"
                  key={p.src.src}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-md border border-brass/20 bg-graphite"
                >
                  <DeferredImage
                    src={p.src}
                    alt={p.alt}
                    sizes="(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-brass/20 p-4 text-sm leading-relaxed text-bone/80">
                    {p.caption}
                  </figcaption>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
