"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";
import { googleReviewsUrl, reviews } from "@/lib/reviews";
import { Stars } from "@/components/ui/Stars";

/**
 * Section 7 — reviews carousel with drag + momentum. Real Google reviews,
 * customer wording as written, with each review's Google star rating — see
 * lib/reviews.ts for the selection rules. No review JSON-LD by design (schema.tsx).
 */
export function Reviews() {
  const reduce = useSafeReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDragWidth(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      aria-label="Reviews"
      className="relative z-10 overflow-hidden border-t border-brass/15 bg-graphite py-24 md:py-32"
    >
      <div className="container-x">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-measure">
            <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
              What Tampa says
            </RevealItem>
            <HeadlineReveal
              as="h2"
              className="font-display text-section font-bold uppercase text-bone"
              lines={["Reviews from", "the neighborhood"]}
            />
          </div>
          <RevealItem as="p" className="font-mono text-xs uppercase tracking-[0.14em] text-ash">
            Drag to browse →
          </RevealItem>
        </Reveal>
      </div>

      <div className="container-x">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
          drag={reduce ? false : "x"}
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragElastic={0.08}
          dragMomentum
        >
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="w-[86vw] shrink-0 rounded-lg border border-brass/20 bg-carbon p-8 shadow-plate sm:w-[420px]"
            >
              <Stars n={r.rating} />
              <blockquote className="mt-5 text-lg leading-relaxed text-bone/85">
                &ldquo;{r.body}
                {r.truncated ? " …" : ""}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {r.name} · Google review
              </figcaption>
            </figure>
          ))}
        </motion.div>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-brass-light underline-offset-4 hover:underline"
        >
          Read all reviews on Google &rarr;
        </a>
      </div>
    </section>
  );
}
