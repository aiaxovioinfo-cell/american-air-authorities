"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";

/**
 * Section 7 — reviews carousel with drag + momentum. Brass stars.
 *
 * PLACEHOLDER CONTENT: these are representative examples written for layout,
 * NOT real customer reviews. Wire in live Google reviews before launch
 * (Places API / a reviews widget) and delete this array.
 * {/* TODO: client to confirm — replace with verified Google reviews *\/}
 */
const REVIEWS = [
  {
    name: "Placeholder — homeowner, New Tampa",
    rating: 5,
    body: "AC quit on a Saturday in July. They answered, came the same day, and the price they quoted was the price on the invoice. No games.",
  },
  {
    name: "Placeholder — restaurant manager, Brandon",
    rating: 5,
    body: "Our rooftop unit went down during service. They worked around our hours and had us running before the dinner rush. Didn't lose a table.",
  },
  {
    name: "Placeholder — homeowner, Wesley Chapel",
    rating: 5,
    body: "Two other companies tried to sell me a whole new system. These guys found the actual part, fixed it, and charged a fraction. Honest work.",
  },
];

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
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="w-[86vw] shrink-0 rounded-lg border border-brass/20 bg-carbon p-8 shadow-plate sm:w-[420px]"
            >
              <Stars n={r.rating} />
              <p className="mt-5 text-lg leading-relaxed text-bone/85">
                &ldquo;{r.body}&rdquo;
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ash">
                {r.name}
              </p>
            </div>
          ))}
        </motion.div>
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash/70">
          {/* Placeholder reviews for layout — replace with verified Google reviews. */}
          Sample reviews shown for layout · verified Google reviews at launch
        </p>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill={i < n ? "#E0B478" : "none"}
          stroke="#A97939"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </div>
  );
}
