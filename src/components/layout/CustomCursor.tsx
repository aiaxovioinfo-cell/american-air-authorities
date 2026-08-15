"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a small brass ring that scales up and inverts over
 * interactive elements. Fine-pointer + hover only; never rendered on touch,
 * never under reduced motion. Pure transform, driven with rAF for smoothness.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    const ring = ringRef.current;
    if (!ring) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [data-cursor='target'], input, textarea, select, [role='button']",
      );
      ring.dataset.active = interactive ? "1" : "0";
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-brass transition-[width,height,background-color,border-color] duration-200 [@media(hover:hover)and(pointer:fine)]:block data-[active='1']:h-12 data-[active='1']:w-12 data-[active='1']:border-brass-light data-[active='1']:bg-brass/20 data-[active='1']:mix-blend-difference"
    />
  );
}
