"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Section-reveal primitive from the motion spec: clip-path mask from below,
 * translateY(32px) -> 0, 800ms, reveal easing, children staggered 80ms,
 * fires once at 15% visibility, never re-animates on scroll back.
 * Collapses to an instant state change under prefers-reduced-motion.
 */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

type Tag =
  | "div"
  | "section"
  | "ul"
  | "li"
  | "header"
  | "p"
  | "span"
  | "h2"
  | "h3"
  | "article"
  | "figure"
  | "blockquote";

export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useSafeReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

/** A single staggered child inside <Reveal>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useSafeReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
