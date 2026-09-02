"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";

/**
 * Section 5 — the four steps are a genuine sequence, so the numbering is
 * earned. A brass line fills left-to-right (scaleX, never width) as the
 * section scrolls in; each node lights up as the fill reaches it. Vertical
 * on mobile. The point: no surprises on the invoice.
 */
const STEPS = [
  {
    n: "01",
    title: "You call",
    body: "Reach our office manager, seven days a week, 7 AM to 10 PM EST, and tell us what the system is doing.",
  },
  {
    n: "02",
    title: "We diagnose",
    body: "A licensed tech finds the actual fault, not a guess, and shows you what's wrong.",
  },
  {
    n: "03",
    title: "You approve the price",
    body: "Flat-rate, up front. Nothing gets done until you say yes to the number.",
  },
  {
    n: "04",
    title: "We follow up",
    body: "We confirm the fix held and you're comfortable. The job isn't done until it's right.",
  },
];

export function Process() {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      aria-label="How it works"
      className="relative z-10 border-t border-brass/15 bg-graphite py-24 md:py-32"
    >
      <div className="container-x">
        <Reveal className="mb-16 max-w-measure">
          <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
            The process
          </RevealItem>
          <HeadlineReveal
            as="h2"
            className="font-display text-section font-bold uppercase text-bone"
            lines={["No surprises", "on the invoice"]}
          />
        </Reveal>

        <div ref={ref} className="relative">
          {/* rail — horizontal on desktop, vertical on mobile */}
          <div className="pointer-events-none absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-brass/15 md:hidden" />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {/* desktop horizontal track */}
            <div className="absolute left-0 right-0 top-[19px] hidden h-px bg-brass/15 md:block" />
            <motion.div
              className="absolute left-0 top-[19px] hidden h-px w-full origin-left bg-brass md:block"
              style={reduce ? { scaleX: 1 } : { scaleX: fill }}
              aria-hidden
            />

            {STEPS.map((step, i) => {
              // node lights up when the fill passes its position
              const threshold = i / (STEPS.length - 1);
              return (
                <Node
                  key={step.n}
                  step={step}
                  fill={fill}
                  threshold={threshold}
                  reduce={!!reduce}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Node({
  step,
  fill,
  threshold,
  reduce,
}: {
  step: (typeof STEPS)[number];
  fill: ReturnType<typeof useTransform<number, number>>;
  threshold: number;
  reduce: boolean;
}) {
  const lit = useTransform(fill, (v): number =>
    v >= threshold - 0.001 ? 1 : 0,
  );
  const dotColor = useTransform(lit, [0, 1], ["#5E4119", "#E0B478"]);
  const dotScale = useTransform(lit, [0, 1], [1, 1.25]);

  return (
    <div className="relative pl-12 md:pl-0 md:pt-12">
      {/* node dot */}
      <motion.span
        className="absolute left-2 top-1 block h-3.5 w-3.5 rounded-full ring-4 ring-graphite md:left-3 md:top-3"
        style={
          reduce
            ? { backgroundColor: "#E0B478" }
            : { backgroundColor: dotColor, scale: dotScale }
        }
        aria-hidden
      />
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-brass-light">
        Step {step.n}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-bone">
        {step.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/75">
        {step.body}
      </p>
    </div>
  );
}
