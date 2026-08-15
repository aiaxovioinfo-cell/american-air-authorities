import { site } from "@/lib/site";

/**
 * Vector rendering of the American Air Authorities insignia:
 * an eagle head inside an arrowhead shield, flanked by rank chevrons —
 * olive on the left, brass on the right, on black.
 *
 * This is an interpretation of the supplied logo for use as the static
 * hero fallback, the watermark, and the header lockup. To use the real
 * artwork instead, drop the client PNG at public/emblem-static.png and
 * swap the <Image> in Hero / EmblemStatic (see README).
 */
export function EmblemMark({
  className,
  title = `${site.name} insignia`,
  monochrome = false,
}: {
  className?: string;
  title?: string;
  monochrome?: boolean;
}) {
  const brassStroke = monochrome ? "currentColor" : "url(#brassGrad)";
  const oliveFill = monochrome ? "currentColor" : "url(#oliveGrad)";

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5E4119" />
          <stop offset="38%" stopColor="#A97939" />
          <stop offset="66%" stopColor="#E0B478" />
          <stop offset="85%" stopColor="#FFF2D6" />
          <stop offset="100%" stopColor="#A97939" />
        </linearGradient>
        <linearGradient id="oliveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D2110" />
          <stop offset="55%" stopColor="#3E461F" />
          <stop offset="100%" stopColor="#6C7A38" />
        </linearGradient>
      </defs>

      {/* Rank chevrons — olive left, brass right */}
      <g fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        {[0, 1, 2].map((i) => (
          <path
            key={`l${i}`}
            d={`M ${52 - i * 4} ${88 + i * 26} L ${22} ${100 + i * 26} L ${52 - i * 4} ${112 + i * 26}`}
            stroke={monochrome ? "currentColor" : "url(#oliveGrad)"}
            opacity={monochrome ? 0.6 : 1}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <path
            key={`r${i}`}
            d={`M ${188 + i * 4} ${88 + i * 26} L ${218} ${100 + i * 26} L ${188 + i * 4} ${112 + i * 26}`}
            stroke={brassStroke}
          />
        ))}
      </g>

      {/* Arrowhead shield */}
      <path
        d="M120 24 L182 54 L182 128 Q182 176 120 214 Q58 176 58 128 L58 54 Z"
        fill={oliveFill}
        stroke={brassStroke}
        strokeWidth="4"
      />
      <path
        d="M120 40 L168 63 L168 126 Q168 164 120 195 Q72 164 72 126 L72 63 Z"
        fill="none"
        stroke={brassStroke}
        strokeWidth="2"
        opacity="0.7"
      />

      {/* Eagle head silhouette (stylized) inside the shield */}
      <g fill={brassStroke}>
        <path
          d="M120 70
             C132 70 142 79 145 92
             L157 96 L146 104
             C147 116 141 126 130 131
             L133 142 L120 137
             C108 141 96 137 90 127
             C84 117 86 104 95 97
             C99 82 108 70 120 70 Z"
          fill={brassStroke}
        />
        {/* eye */}
        <circle cx="126" cy="92" r="3.4" fill="#0B0C08" />
        {/* beak notch */}
        <path d="M157 96 L170 99 L157 102 Z" fill={brassStroke} />
      </g>
    </svg>
  );
}
