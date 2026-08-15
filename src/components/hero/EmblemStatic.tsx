"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { EMBLEM } from "@/lib/emblemGeometry";

/**
 * High-quality static/vector hero emblem — the REAL mark, pixel-traced from
 * the client artwork (src/lib/emblemGeometry.ts), so it stays razor-sharp at
 * hero scale instead of upscaling the 195x99 raster.
 *
 * Paints immediately (no WebGL cost) and is the permanent emblem on mobile /
 * low-end / reduced-motion devices. It also plays the page-load choreography:
 * the wing bars fly in from off-screen left (olive) and right (brass) and lock,
 * the "A" scales up and settles, then a specular bar sweeps across the brass.
 * Under reduced motion it renders the final state only.
 */
const toPath = (pts: readonly (readonly number[])[]) =>
  "M" + pts.map((p) => `${p[0]} ${p[1]}`).join(" L") + " Z";

export function EmblemStatic({
  play = true,
  className,
}: {
  play?: boolean;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  const animate = play && !reduce;
  const cx = EMBLEM.viewW / 2;

  return (
    <div className={className}>
      <svg
        viewBox="-8 -34 211 150"
        className="h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
        role="img"
        aria-label="American Air Authorities insignia — an eagle head in an arrowhead 'A' flanked by wing bars"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="embGlow" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#20241400" />
            <stop offset="0%" stopColor="rgba(62,70,31,0.35)" />
            <stop offset="70%" stopColor="rgba(11,12,8,0)" />
          </radialGradient>
          <linearGradient id="embBrassSheen" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#8A6230" />
            <stop offset="55%" stopColor="#A97939" />
            <stop offset="100%" stopColor="#E0B478" />
          </linearGradient>
          <linearGradient id="embOliveSheen" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#2C331A" />
            <stop offset="60%" stopColor="#3E461F" />
            <stop offset="100%" stopColor="#556028" />
          </linearGradient>
        </defs>

        {/* warm studio glow (never blue) */}
        <ellipse cx={cx} cy="46" rx="150" ry="95" fill="url(#embGlow)" />

        {/* Left olive wing bars — fly in from off-screen left */}
        {EMBLEM.oliveBars.map((bar, i) => (
          <motion.path
            key={`ob${i}`}
            d={toPath(bar)}
            fill="url(#embOliveSheen)"
            initial={animate ? { x: -170, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Right brass wing bars — fly in from off-screen right */}
        {EMBLEM.brassBars.map((bar, i) => (
          <motion.path
            key={`bb${i}`}
            d={toPath(bar)}
            fill="url(#embBrassSheen)"
            initial={animate ? { x: 170, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* The "A" / arrowhead with eagle head — scales up and settles */}
        <motion.g
          initial={animate ? { scale: 0.45, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px 55px` }}
        >
          <path
            fillRule="evenodd"
            fill="url(#embOliveSheen)"
            d={toPath(EMBLEM.oliveMain)}
          />
          {/* eagle brow detail */}
          <path
            fill="url(#embOliveSheen)"
            d="M96 50 L96 52 L98 52 L100 55 L107 54 L107 52 Z"
          />
        </motion.g>

        {/* Specular sweep across the brass, left to right, once */}
        {animate && (
          <motion.rect
            x="-40"
            y="-34"
            width="70"
            height="150"
            fill="#FFF2D6"
            style={{ mixBlendMode: "screen" }}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 210, opacity: [0, 0.35, 0] }}
            transition={{ delay: 1.4, duration: 0.55, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}
