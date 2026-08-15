"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { homepageServices, type Service } from "@/lib/services";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { HeadlineReveal } from "@/components/ui/HeadlineReveal";

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="relative z-10 bg-carbon py-24 md:py-32"
    >
      <div className="container-x">
        <Reveal className="mb-14 max-w-measure">
          <RevealItem as="p" className="eyebrow mb-4 text-brass-light">
            What we do
          </RevealItem>
          <HeadlineReveal
            as="h2"
            className="font-display text-section font-bold uppercase text-bone"
            lines={["Straight answers,", "clean work"]}
          />
          <RevealItem as="p" className="mt-5 text-lg leading-relaxed text-bone/80">
            Repairs, installs, and commercial work handled by licensed
            technicians — not a rotating cast of subcontractors on commission.
          </RevealItem>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {homepageServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 20,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 180,
    damping: 20,
  });
  // Brass specular gradient tracks the pointer.
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(140px 140px at ${x} ${y}, rgba(255,242,214,0.18), transparent 70%)`,
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : { rotateX: rotX, rotateY: rotY, transformPerspective: 900 }
      }
      className="group relative [transform-style:preserve-3d]"
    >
      <Link
        href={`/services/${service.slug}`}
        className="relative block h-full overflow-hidden rounded-md border border-brass/20 bg-graphite p-7 shadow-plate"
        data-cursor="target"
      >
        {/* pointer-tracking specular */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}

        {/* icon lifts above the card face on hover (separate Z layer) */}
        <div
          className="mb-6 inline-flex text-brass transition-transform duration-300 group-hover:-translate-y-1"
          style={reduce ? undefined : { transform: "translateZ(40px)" }}
        >
          <ServiceIcon name={service.icon} />
        </div>

        <p className="eyebrow mb-2 text-brass-light">{service.eyebrow}</p>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
          {service.title}
        </h3>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-bone/75">
          {service.short}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-brass-light">
          Learn more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
