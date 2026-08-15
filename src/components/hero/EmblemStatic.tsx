"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * High-quality static/vector emblem that paints immediately (no WebGL cost),
 * used as:
 *  - the instant hero image before the 3D canvas is ready,
 *  - the permanent emblem on mobile / low-end / reduced-motion devices.
 *
 * It also plays the page-load choreography with SVG transforms:
 * chevrons fly in and lock, the shield scales up, a specular bar sweeps
 * across the brass. Under reduced motion it renders the final state only.
 */
export function EmblemStatic({
  play = true,
  className,
}: {
  play?: boolean;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  const animate = play && !reduce;

  const chevron = (side: "l" | "r", i: number) => {
    const fromX = side === "l" ? -160 : 160;
    const stroke = side === "l" ? "url(#embOlive)" : "url(#embBrass)";
    const d =
      side === "l"
        ? `M ${52 - i * 4} ${88 + i * 26} L ${22} ${100 + i * 26} L ${52 - i * 4} ${112 + i * 26}`
        : `M ${188 + i * 4} ${88 + i * 26} L ${218} ${100 + i * 26} L ${188 + i * 4} ${112 + i * 26}`;
    return (
      <motion.path
        key={`${side}${i}`}
        d={d}
        stroke={stroke}
        initial={animate ? { x: fromX, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.4 + i * 0.09,
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    );
  };

  return (
    <div className={className}>
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
        role="img"
        aria-label="American Air Authorities insignia — eagle head on an arrowhead shield flanked by rank chevrons"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="embStudio" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#1a1c12" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <linearGradient id="embBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5E4119" />
            <stop offset="38%" stopColor="#A97939" />
            <stop offset="66%" stopColor="#E0B478" />
            <stop offset="85%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#A97939" />
          </linearGradient>
          <linearGradient id="embOlive" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D2110" />
            <stop offset="55%" stopColor="#3E461F" />
            <stop offset="100%" stopColor="#6C7A38" />
          </linearGradient>
          <clipPath id="embClip">
            <circle cx="120" cy="120" r="118" />
          </clipPath>
        </defs>

        <g clipPath="url(#embClip)">
          <circle cx="120" cy="120" r="120" fill="url(#embStudio)" />

          {/* chevrons */}
          <g fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
            {[0, 1, 2].map((i) => chevron("l", i))}
            {[0, 1, 2].map((i) => chevron("r", i))}
          </g>

          {/* shield + eagle scale up and settle */}
          <motion.g
            initial={animate ? { scale: 0.4, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "120px 120px" }}
          >
            <path
              d="M120 24 L182 54 L182 128 Q182 176 120 214 Q58 176 58 128 L58 54 Z"
              fill="url(#embOlive)"
              stroke="url(#embBrass)"
              strokeWidth="4"
            />
            <path
              d="M120 40 L168 63 L168 126 Q168 164 120 195 Q72 164 72 126 L72 63 Z"
              fill="none"
              stroke="url(#embBrass)"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M120 70 C132 70 142 79 145 92 L157 96 L146 104 C147 116 141 126 130 131 L133 142 L120 137 C108 141 96 137 90 127 C84 117 86 104 95 97 C99 82 108 70 120 70 Z"
              fill="url(#embBrass)"
            />
            <circle cx="126" cy="92" r="3.4" fill="#0B0C08" />
            <path d="M157 96 L170 99 L157 102 Z" fill="url(#embBrass)" />
          </motion.g>

          {/* specular sweep across the brass, left to right, once */}
          {animate && (
            <motion.rect
              x="-120"
              y="0"
              width="90"
              height="240"
              fill="url(#embBrass)"
              opacity="0.0"
              style={{ mixBlendMode: "screen" }}
              initial={{ x: -120, opacity: 0 }}
              animate={{ x: 300, opacity: [0, 0.5, 0] }}
              transition={{ delay: 1.4, duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
