import { site } from "@/lib/site";
import { EMBLEM } from "@/lib/emblemGeometry";

/**
 * The real American Air Authorities mark: a bold olive "A" / arrowhead with
 * an eagle head carved in negative space, flanked by three trapezoidal wing
 * bars each side — olive left, brass right.
 *
 * Geometry is pixel-traced from the client's logo-mark.png (see
 * src/lib/emblemGeometry.ts) so it stays crisp at any size instead of
 * scaling the tiny 195x99 raster. Colors are sampled from the file.
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
  return (
    <svg
      viewBox={`0 0 ${EMBLEM.viewW} ${EMBLEM.viewH}`}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        fill={monochrome ? "currentColor" : EMBLEM.colors.olive}
        d={EMBLEM.oliveSvgPath}
      />
      <path
        fillRule="evenodd"
        fill={monochrome ? "currentColor" : EMBLEM.colors.brass}
        d={EMBLEM.brassSvgPath}
        opacity={monochrome ? 0.7 : 1}
      />
    </svg>
  );
}
