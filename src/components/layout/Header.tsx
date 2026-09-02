"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { EmblemMark } from "@/components/brand/EmblemMark";
import { primaryNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function Header() {
  const reduce = useSafeReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-brass/20 bg-carbon/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        {/* Logo left */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <EmblemMark className="h-8 w-auto" />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-lg font-extrabold tracking-tight text-brass-light">
              AMERICAN
            </span>
            <span className="block font-display text-lg font-extrabold tracking-tight text-olive-light">
              AIR AUTHORITIES
            </span>
          </span>
        </Link>

        {/* Nav center */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {primaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-sm text-bone/85 transition-colors hover:text-brass-light"
              data-cursor="target"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA right — one responsive link (icon only < sm, icon + number ≥ sm) */}
        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-brass/60 bg-brass p-2.5 text-black brushed-brass transition-colors hover:bg-brass-light sm:px-4 sm:py-2.5 sm:font-mono sm:text-xs sm:font-medium sm:uppercase sm:tracking-[0.12em]"
            data-cursor="target"
          >
            <PhoneGlyph />
            <span className="hidden sm:inline">{site.phoneDisplay}</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-brass/30 text-bone lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            data-cursor="target"
          >
            <span className="sr-only">Open menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Structural brass hairline under the bar when condensed */}
      {scrolled && <div className="hairline-rule" />}

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] engineering-grid bg-carbon lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="container-x flex h-[68px] items-center justify-between">
              <span className="font-display text-lg font-extrabold text-brass-light">
                MENU
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-brass/30 text-bone"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav
              aria-label="Mobile"
              className="container-x mt-6 flex flex-col gap-1"
            >
              {primaryNav.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-brass/15 py-4 font-display text-3xl font-bold uppercase tracking-tight text-bone hover:text-brass-light"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={site.phoneHref}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-brass px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-black brushed-brass"
              >
                <PhoneGlyph />
                {site.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.2 2.3 3 3.1c-.6.2-1 .9-.8 1.5.9 3.6 3.6 6.3 7.2 7.2.6.2 1.3-.2 1.5-.8l.8-2.2c.1-.4-.1-.9-.5-1.1l-2-.9c-.3-.1-.7 0-.9.2l-.7.8C6.9 7 5 5.1 4.2 3.4l.8-.7c.2-.2.3-.6.2-.9"
        fill="currentColor"
      />
    </svg>
  );
}
