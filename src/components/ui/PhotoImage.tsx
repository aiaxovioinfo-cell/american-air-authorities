import type { StaticImageData } from "next/image";
import { DeferredImage } from "@/components/ui/DeferredImage";

/**
 * Widths requested from the image optimizer. Every value must be in Next's
 * allowed list (default images.deviceSizes ∪ images.imageSizes) or
 * /_next/image rejects the request — keep in sync if next.config changes them.
 */
const WIDTHS = [384, 640, 750, 828, 1080, 1200] as const;
const QUALITY = 75;

const optimized = (src: string, w: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${QUALITY}`;

/**
 * Server-side wrapper: builds the optimized srcset (AVIF/WebP, negotiated by
 * /_next/image) as plain strings. It deliberately imports nothing at runtime
 * from next/image — even getImageProps() pulls next/image's client component
 * into the page bundle — so the only script that ships is DeferredImage.
 */
export function PhotoImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
}) {
  // Never request more pixels than the original has (keep at least one width).
  const widths = WIDTHS.filter((w) => w <= src.width);
  if (widths.length === 0) widths.push(WIDTHS[0]);
  const fallback = widths.filter((w) => w <= 828).pop() ?? widths[0];

  return (
    <DeferredImage
      img={{
        src: optimized(src.src, fallback),
        srcSet: widths.map((w) => `${optimized(src.src, w)} ${w}w`).join(", "),
        sizes,
        width: src.width,
        height: src.height,
        alt,
      }}
      blurDataURL={src.blurDataURL}
      className={className}
    />
  );
}
