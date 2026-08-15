"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type Variant = "brass" | "ghost";

/**
 * Magnetic CTA — the button translates up to 6px toward the cursor within a
 * 60px radius and springs back on leave. transform/opacity only. Disabled
 * under reduced motion and on coarse pointers (the pull needs a hovering
 * cursor to mean anything). Internal hrefs keep Next.js client routing.
 */
export function MagneticButton({
  href,
  children,
  variant = "brass",
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-6, Math.min(6, mx * 0.35)));
    y.set(Math.max(-6, Math.min(6, my * 0.35)));
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-sm font-semibold tracking-wide will-change-transform";
  const styles =
    variant === "brass"
      ? "bg-brass text-black hover:bg-brass-light brushed-brass shadow-plate"
      : "border border-brass/60 text-bone hover:border-brass hover:text-brass-light font-mono uppercase tracking-[0.12em]";

  const isInternal = href.startsWith("/");
  const inner = isInternal ? (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${styles} ${className}`}
      data-cursor="target"
    >
      {children}
    </Link>
  ) : (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${styles} ${className}`}
      data-cursor="target"
    >
      {children}
    </a>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      className="inline-flex will-change-transform"
    >
      {inner}
    </motion.div>
  );
}
