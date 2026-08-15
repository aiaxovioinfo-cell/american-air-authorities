"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { EmblemStatic } from "./EmblemStatic";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

// 3D scene is client-only and never blocks first paint.
const Emblem3D = dynamic(() => import("./Emblem3D"), { ssr: false });

const H1_LINES = ["TAMPA'S", "AIR", "AUTHORITY"];

export function Hero() {
  const reduce = useSafeReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const [use3D, setUse3D] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [inView, setInView] = useState(true);

  // Decide once whether this device should run the WebGL scene at all.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lowCore =
      typeof navigator !== "undefined" &&
      (navigator.hardwareConcurrency ?? 8) <= 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 1024;

    if (reduceMotion || lowCore || coarse || small) {
      setUse3D(false);
      return;
    }
    setUse3D(true);
    // Give the static emblem a beat to paint, then mount the canvas.
    const id = window.setTimeout(() => setCanvasReady(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  // Pause the render loop when the hero leaves the viewport.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => setInView(!!e[0]?.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer tilt target for the medallion.
  useEffect(() => {
    if (!use3D) return;
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [use3D]);

  // Scroll dolly: emblem drifts up and out, one screen only (no pinning).
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const emblemY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const emblemOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.6, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] w-full overflow-hidden bg-carbon pt-[68px]"
      aria-label="American Air Authorities — Tampa HVAC"
    >
      {/* engineering grid behind the hero, masked toward the bottom */}
      <div className="engineering-grid pointer-events-none absolute inset-0" />
      {/* warm vignette, no blue */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,rgba(169,121,57,0.10),transparent_60%)]" />

      <div className="container-x relative grid min-h-[calc(92vh-68px)] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — copy */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-brass-light"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.5 }}
          >
            <span>Tampa</span>
            <span className="text-ash">·</span>
            <span>Hillsborough &amp; Pasco</span>
            <span className="text-ash">·</span>
            <span>Lic #{site.license}</span>
          </motion.p>

          <h1 className="font-display font-extrabold uppercase text-bone text-hero">
            {H1_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                {reduce ? (
                  <span className="block">{line}</span>
                ) : (
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 1.6 + i * 0.09,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {i === 2 ? (
                      <span className="text-brass-light">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-measure font-body text-lg leading-relaxed text-bone/85"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.5 }}
          >
            Family-owned, factory-certified HVAC for Tampa homes and businesses.
            When your AC quits in the heat, the tech who quotes the job is the
            tech who does it — and the price you approve is the price you pay.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.5 }}
          >
            <MagneticButton href="/book" variant="brass">
              Book a service call
            </MagneticButton>
            <MagneticButton
              href={site.phoneHref}
              variant="ghost"
              ariaLabel={`Call ${site.phoneDisplay}`}
            >
              {site.phoneDisplay}
            </MagneticButton>
          </motion.div>

          {/* credentials row under a brass hairline */}
          <motion.div
            className="mt-9"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.5 }}
          >
            <div className="hairline-rule mb-4 max-w-measure" />
            <ul className="flex max-w-measure flex-wrap gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
              <li>York Certified Comfort Expert</li>
              <li>Same-day repairs</li>
              <li>Flat-rate pricing</li>
              <li>Licensed &amp; insured</li>
            </ul>
          </motion.div>
        </div>

        {/* RIGHT — emblem */}
        <motion.div
          className="relative order-1 mx-auto aspect-square w-full max-w-[520px] lg:order-2"
          style={
            reduce
              ? undefined
              : { y: emblemY, scale: emblemScale, opacity: emblemOpacity }
          }
        >
          {/* Static emblem paints immediately; canvas fades in over it. */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              use3D && canvasReady && inView ? "opacity-0" : "opacity-100"
            }`}
          >
            <EmblemStatic className="h-full w-full" play />
          </div>

          {use3D && canvasReady && (
            <div className="absolute inset-0">
              <Emblem3D pointer={pointer} frameloop={inView ? "always" : "never"} />
            </div>
          )}
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        <span className="eyebrow text-ash">Scroll</span>
      </div>
    </section>
  );
}
