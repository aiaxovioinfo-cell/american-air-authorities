"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag.
 *
 * framer-motion's useReducedMotion reads matchMedia, which is unavailable
 * during SSR — so it returns `false` on the server but the real value on the
 * client's first render. Any component that branches its RENDERED markup on
 * that value produces a server/client mismatch (React #418/#423) for users
 * who actually have "reduce motion" enabled.
 *
 * This hook forces `false` for the server render and the first client render
 * (so they always agree), then reports the real preference after mount. The
 * post-mount switch simply collapses animations to their resting state, which
 * is exactly what a reduced-motion user wants.
 */
export function useSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!prefersReduced : false;
}
