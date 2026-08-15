"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll (lerp 0.09) wired into GSAP ScrollTrigger so every
 * scroll-driven timeline hangs off the same loop.
 *
 * Lenis + GSAP are dynamically imported inside the effect, and only when
 * they'll actually be used: never under prefers-reduced-motion, and never on
 * touch/coarse-pointer devices (native momentum scrolling is better there and
 * smooth-scroll JS only adds main-thread cost). This keeps ~40KB of scroll
 * libraries off the critical path on mobile, where they hurt Lighthouse TBT
 * without benefit. Framer's scroll-driven reveals don't depend on Lenis, so
 * the page stays fully animated either way.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const onRaf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onRaf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(onRaf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
