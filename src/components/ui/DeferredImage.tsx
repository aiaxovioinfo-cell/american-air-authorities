"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Below-the-fold photo that doesn't compete with first paint.
 *
 * Native lazy loading on a throttled mobile connection starts fetching
 * anything within ~2500px of the viewport, so a photo grid under a page
 * header downloads during load and slows the header reveal (the LCP).
 * This mounts the <Image> only once its tile is within 300px of the
 * viewport, showing the blur placeholder at the exact aspect ratio until
 * then — no layout shift. A <noscript> <img> covers crawlers / no-JS.
 */
export function DeferredImage({
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
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        className={className}
      />
    );
  }

  return (
    <>
      <span
        ref={ref}
        role="img"
        aria-label={alt}
        className={`block bg-cover bg-center ${className ?? ""}`}
        style={{
          aspectRatio: `${src.width} / ${src.height}`,
          backgroundImage: src.blurDataURL ? `url("${src.blurDataURL}")` : undefined,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src.src}
          alt={alt}
          width={src.width}
          height={src.height}
          loading="lazy"
          className={className}
        />
      </noscript>
    </>
  );
}
