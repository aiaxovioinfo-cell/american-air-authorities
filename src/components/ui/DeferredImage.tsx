"use client";

import { useEffect, useRef, useState } from "react";

/** Plain <img> attributes, computed on the server by getImageProps(). */
export type DeferredImgProps = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  alt: string;
};

/**
 * Below-the-fold photo that doesn't compete with first paint.
 *
 * Native lazy loading on a throttled mobile connection starts fetching
 * anything within ~2500px of the viewport, so a photo grid under a page
 * header downloads during load and slows the header reveal (the LCP).
 * This mounts the <img> only once its tile is within 300px of the
 * viewport, showing the blur placeholder at the exact aspect ratio until
 * then — no layout shift. A <noscript> <img> covers crawlers / no-JS.
 *
 * Deliberately a plain <img>, not next/image: the srcset is built on the
 * server (see PhotoImage), so next/image's client runtime never ships.
 */
export function DeferredImage({
  img,
  blurDataURL,
  className,
}: {
  img: DeferredImgProps;
  blurDataURL?: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (ready) {
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...img}
        decoding="async"
        className={className}
        style={
          blurDataURL
            ? { backgroundImage: `url("${blurDataURL}")`, backgroundSize: "cover" }
            : undefined
        }
      />
    );
  }

  return (
    <>
      <span
        ref={ref}
        role="img"
        aria-label={img.alt}
        className={`block bg-cover bg-center ${className ?? ""}`}
        style={{
          aspectRatio: `${img.width} / ${img.height}`,
          backgroundImage: blurDataURL ? `url("${blurDataURL}")` : undefined,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...img} loading="lazy" className={className} />
      </noscript>
    </>
  );
}
