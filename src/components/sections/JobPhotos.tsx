import Link from "next/link";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { DeferredImage } from "@/components/ui/DeferredImage";
import type { GalleryPhoto } from "@/lib/gallery";

/**
 * A row of 1–3 real job-site photos linking through to /gallery. Renders
 * nothing when the page has no approved photos, so a placement can be wired
 * up before the photo exists.
 */
export function JobPhotos({
  photos,
  eyebrow = "From the job site",
  title,
}: {
  photos: GalleryPhoto[];
  eyebrow?: string;
  title: string;
}) {
  if (photos.length === 0) return null;
  const cols =
    photos.length === 1
      ? "max-w-xl"
      : photos.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  // Rendered width per tile, so next/image picks the right srcset entry.
  const sizes =
    photos.length === 1
      ? "(min-width: 640px) 576px, 92vw"
      : photos.length === 2
        ? "(min-width: 1200px) 568px, (min-width: 640px) 46vw, 92vw"
        : "(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw";

  return (
    <section
      aria-label={title}
      className="relative z-10 border-t border-brass/15 bg-carbon py-20 md:py-28"
    >
      <div className="container-x">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <RevealItem as="p" className="eyebrow mb-3 text-brass-light">
              {eyebrow}
            </RevealItem>
            <RevealItem
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-4xl"
            >
              {title}
            </RevealItem>
          </div>
          <RevealItem>
            <Link
              href="/gallery"
              className="font-mono text-xs uppercase tracking-[0.14em] text-brass-light underline-offset-4 hover:underline"
            >
              See the full gallery &rarr;
            </Link>
          </RevealItem>
        </Reveal>

        <Reveal className={`grid grid-cols-1 items-start gap-4 ${cols}`}>
          {photos.map((p) => (
            <RevealItem
              as="figure"
              key={p.src.src}
              className="overflow-hidden rounded-md border border-brass/20 bg-graphite"
            >
              {/* Natural aspect ratio: before/after composites carry their
                  labels at the edges, so cropping would cut them off. */}
              <DeferredImage
                src={p.src}
                alt={p.alt}
                sizes={sizes}
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
  );
}
