"use client";

/**
 * Section 3 — credential marquee on olive. Slow horizontal scroll, pauses
 * on hover, track duplicated for a seamless loop. Pure CSS transform
 * animation; disabled under prefers-reduced-motion (handled in globals.css).
 */
const ITEMS = [
  "York Certified Comfort Expert",
  "Same-day repairs",
  "Flat-rate pricing",
  "Emergency service · 7 days · 7 AM–10 PM EST",
  "Financing available",
  "Licensed & insured",
];

export function CredentialStrip() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Credentials"
      className="relative z-10 overflow-hidden border-y border-brass/20 bg-olive-ramp py-4"
    >
      <div className="group flex select-none overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-0 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((item, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-bone/90"
            >
              <span className="px-6">{item}</span>
              <span aria-hidden className="text-brass-light">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
