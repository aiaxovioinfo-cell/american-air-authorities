"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ElementType } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Headline reveal — split by LINE, never by character (character-by-character
 * is a tell). Each line clips up from a mask, staggered 90ms. A brass specular
 * shimmer sweeps across once when the headline enters view.
 *
 * The whileInView observer is attached to a STABLE container (never translated)
 * and the lines animate via variants — otherwise a line translated 110% down
 * pushes its own box out of view and the observer can never reach threshold.
 */
const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

export function HeadlineReveal({
  lines,
  className,
  as = "h1",
  shimmer = true,
}: {
  lines: string[];
  className?: string;
  as?: ElementType;
  shimmer?: boolean;
}) {
  const reduce = useSafeReducedMotion();
  const Tag = as as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [runShimmer, setRunShimmer] = useState(false);

  useEffect(() => {
    if (reduce || !shimmer) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRunShimmer(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, shimmer]);

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        className={`inline-block ${
          shimmer ? (runShimmer ? "shimmer-target shimmer-run" : "shimmer-target") : ""
        }`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              custom={i}
              variants={lineVariants}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
