# American Air Authorities — Website

Marketing site for **American Air Authorities**, a family-owned, York-certified
HVAC contractor in Tampa, FL. The single job of this site is to make the phone
ring — for a homeowner whose AC just died in the heat, and for a commercial
manager who can't lose a service day.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind**, with a 3D
brushed-brass emblem hero (react-three-fiber), scroll-driven motion (GSAP +
Lenis), and component animation (Framer Motion).

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also runs lint + typecheck)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18.18+ is required (Next.js 14).

---

## Brand system

All brand decisions live in two places — change them here, not in components:

- **`tailwind.config.ts`** — the full color token system (carbon, graphite,
  olive, brass ramps, bone, ash), type scale, and gradients. There is **no blue
  anywhere** on purpose; cool light reads as pale bone.
- **`src/app/globals.css`** — the same tokens as CSS variables, plus the
  textures (film grain, engineering grid, brushed-brass streak, hairline rule)
  and the custom-cursor / reduced-motion rules.

Fonts are self-hosted via `next/font` in `src/lib/fonts.ts`:
Big Shoulders Display (display), Manrope (body), IBM Plex Mono (utility/specs).

---

## Editing content

Content is data-driven — you rarely need to touch component JSX:

| What | File |
|---|---|
| Phone, email, address, license, credential | `src/lib/site.ts` |
| Services (cards + `/services/[slug]` pages) | `src/lib/services.ts` |
| Cities (`/service-area/[city]` pages) | `src/lib/cities.ts` |
| Nav + footer links | `src/lib/nav.ts` |
| JSON-LD schema (LocalBusiness / HVACBusiness) | `src/lib/schema.tsx` |

Add a service to `services.ts` or a city to `cities.ts` and its page, metadata,
sitemap entry, and JSON-LD `areaServed` all follow automatically.

### Things marked as placeholders (search for `TODO: client to confirm`)

- **Reviews** (`/reviews`, homepage carousel) — representative examples for
  layout. Wire in verified Google reviews before launch.
- **Gallery** (`/gallery`) — placeholder tiles. Replace with the client's own
  job-site photos using `next/image` (real dimensions + alt text). No stock
  photography of a family on a sofa.
- **Blog** / **Careers** — planned topics and example roles.
- **Financing** — specific lender, APR, and promo terms.
- **Booking form** (`src/components/forms/BookingForm.tsx`) — currently composes
  a `mailto:`. Connect it to a real API route / CRM endpoint before launch.

No statistics, job counts, or "years in business" are invented anywhere — only
the verified facts from `site.ts` are used.

---

## Swapping the logo / emblem

The insignia currently ships as **vector artwork** interpreted from the brief
(eagle head on an arrowhead shield, olive + brass chevrons):

- `src/components/brand/EmblemMark.tsx` — the inline SVG lockup used in the
  header, footer, watermarks, and page-transition wipe.
- `src/components/hero/EmblemStatic.tsx` — the animated static hero emblem
  (also the mobile / reduced-motion end state).
- `public/emblem-static.svg` — standalone file used for favicon / Open Graph.

**To use the client's real artwork:**

1. Drop the supplied file at `public/emblem-static.png` (and/or `.svg`).
2. In `src/components/hero/Hero.tsx`, replace `<EmblemStatic />` with a
   `next/image` pointing at that file (keep the same wrapper so the scroll
   dolly still applies).
3. Point `icons.icon` and the OG `images` in `src/app/layout.tsx` at the new
   file, and update `image` in `src/lib/schema.tsx`.
4. Swap `EmblemMark` usages in the header/footer if you want the raster mark
   there too.

---

## The 3D hero — and how to toggle it off

The signature is a 3D brushed-brass medallion (`src/components/hero/Emblem3D.tsx`)
that drifts on its Y axis, tilts toward the cursor, catches a moving warm
specular highlight, and is surrounded by volumetric air ribbons.

It is engineered **not** to hurt performance:

- Dynamically imported with `ssr: false`, so it never blocks first paint.
- The static SVG emblem paints immediately; the canvas fades in over it.
- `dpr` capped at `[1, 2]`; the render loop **pauses** when the hero scrolls
  out of view (`frameloop` flips to `never`).
- The canvas is **skipped entirely** on mobile, on coarse pointers, on
  `navigator.hardwareConcurrency <= 4`, and under `prefers-reduced-motion`.
  Those devices get the high-quality static emblem instead.

**To disable the 3D scene globally**, open `src/components/hero/Hero.tsx` and
force the static path:

```ts
// in the capability effect, replace the body with:
setUse3D(false);
return;
```

The site is fully functional and on-brand with the canvas off.

---

## Motion & accessibility

- **Smooth scroll** via Lenis (`lerp: 0.09`), wired into GSAP ScrollTrigger
  (`src/components/layout/SmoothScroll.tsx`).
- **Custom cursor** (brass ring) runs on fine pointers only
  (`src/components/layout/CustomCursor.tsx`).
- **Everything** respects `prefers-reduced-motion: reduce`, which collapses the
  site to instant state changes while remaining fully usable. Transforms and
  opacity only — no animating layout properties.
- Brass focus rings, a skip link, semantic landmarks, and `tel:` links on every
  phone number are built in.

---

## Route map

```
/                     Homepage (full build)
/about
/services             hub → /services/[slug] (ac-repair, installation,
                              commercial-hvac, maintenance-plans, emergency)
/financing
/service-area         hub → /service-area/[city] (12 cities from one template)
/reviews  /gallery  /blog  /careers  /book  /contact
```

`sitemap.xml` and `robots.txt` are generated from the data in `src/lib`.
