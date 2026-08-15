"use client";

import { motion } from "framer-motion";
import { EmblemMark } from "@/components/brand/EmblemMark";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Page transition — a carbon wipe with the emblem centered, ~500ms.
 * template.tsx re-mounts on every navigation, so the covering panel animates
 * out on entry, reading as a wipe between routes. Content fades up underneath.
 * Fully skipped under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useSafeReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-carbon"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "opacity" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 1 }}
          animate={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmblemMark className="h-16 w-auto" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>
    </>
  );
}
