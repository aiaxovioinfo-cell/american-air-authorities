import type { StaticImageData } from "next/image";

import crewCarryingYorkCondenser from "../../public/gallery/crew-carrying-york-condenser.jpg";
import yorkCondenserOnNewPad from "../../public/gallery/york-condenser-on-new-pad.jpg";
import yorkAirHandlerClosetInstall from "../../public/gallery/york-air-handler-closet-install.jpg";
import yorkTwoFanOutdoorUnit from "../../public/gallery/york-two-fan-outdoor-unit.jpg";
import yorkCondenserMulchBed from "../../public/gallery/york-condenser-mulch-bed.jpg";
import yorkCondenserBesideSecondUnit from "../../public/gallery/york-condenser-beside-second-unit.jpg";
import goodmanPackagedUnitOnPad from "../../public/gallery/goodman-packaged-unit-on-pad.jpg";
import compactSideDischargeOutdoorUnit from "../../public/gallery/compact-side-discharge-outdoor-unit.jpg";
import grandaireCondenserGlassFront from "../../public/gallery/grandaire-condenser-glass-front.jpg";
import beforeAfterLennoxToYorkCondenser from "../../public/gallery/before-after-lennox-to-york-condenser.jpg";
import beforeAfterLennoxToYorkAirHandler from "../../public/gallery/before-after-lennox-to-york-air-handler.jpg";
import beforeAfterOldCondenserToGrandaire from "../../public/gallery/before-after-old-condenser-to-grandaire.jpg";
import grandaireCondenserWallBracketCommercial from "../../public/gallery/grandaire-condenser-wall-bracket-commercial.jpg";

/**
 * Client job-site photos. Captions describe only what is visible in the frame:
 * no locations, customer names, or dates. Add a photo by dropping a
 * descriptively named file in public/gallery/, importing it here, and adding
 * an entry — the static import gives next/image its dimensions and blur.
 *
 * Two of the original 15 photos are held back in /gallery-held (outside
 * public/, git-ignored) pending client review: both show the same pale khaki
 * button-up shirt, not the green company tees — possibly an older uniform, a
 * subcontractor, or another company's crew; unconfirmed. One of them is the
 * only service-call photo, which is why "Service" is intentionally empty (and
 * hidden) and /services/ac-repair has no photo strip. Don't fill it with a
 * substitute — release the held photo only once the client confirms.
 */
export type GalleryCategory =
  | "installations"
  | "before-after"
  | "service"
  | "commercial";

/** Pages that pull a photo strip from this list. */
export type PhotoPlacement = "home" | "installation" | "ac-repair" | "commercial-hvac";

export type GalleryPhoto = {
  src: StaticImageData;
  category: GalleryCategory;
  alt: string;
  caption: string;
  placements?: PhotoPlacement[];
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "installations", label: "Installations" },
  { id: "before-after", label: "Before & After" },
  { id: "service", label: "Service" },
  { id: "commercial", label: "Commercial" },
];

export const galleryPhotos: GalleryPhoto[] = [
  // ── Installations ────────────────────────────────────────────────────────
  {
    src: crewCarryingYorkCondenser,
    category: "installations",
    alt: "Two technicians in green American Air Authorities shirts carrying a new York condenser across a yard",
    caption: "Two of our techs carrying a new York condenser into place by hand.",
    placements: ["home", "installation"],
  },
  {
    src: yorkAirHandlerClosetInstall,
    category: "installations",
    alt: "New York air handler installed in a hallway closet with a PVC condensate drain",
    caption:
      "York air handler set in a hallway closet, with the condensate drain re-piped in PVC.",
    placements: ["installation"],
  },
  {
    src: yorkTwoFanOutdoorUnit,
    category: "installations",
    alt: "York two-fan side-discharge outdoor unit on a new concrete pad beside a house",
    caption: "York two-fan side-discharge outdoor unit set level on a new pad.",
    placements: ["installation"],
  },
  {
    src: yorkCondenserOnNewPad,
    category: "installations",
    alt: "York condenser secured to a new concrete pad with hurricane tie-down brackets",
    caption:
      "York condenser on a new pad, secured with hurricane tie-down brackets at each corner.",
  },
  {
    src: yorkCondenserMulchBed,
    category: "installations",
    alt: "York condenser on a concrete pad in a mulch bed, with an insulated line set running to the wall",
    caption:
      "York condenser on a fresh pad, with the insulated line set run neatly to the wall.",
  },
  {
    src: yorkCondenserBesideSecondUnit,
    category: "installations",
    alt: "York condenser on a concrete pad next to a second outdoor unit, below wall-mounted disconnect boxes",
    caption:
      "York condenser set on a pad beside a second outdoor unit, wired from the wall disconnects.",
  },
  {
    src: goodmanPackagedUnitOnPad,
    category: "installations",
    alt: "Goodman packaged air conditioning unit on a concrete pad with a PVC condensate drain",
    caption:
      "Goodman packaged unit set on a concrete pad, with a PVC condensate drain off the side.",
  },
  {
    src: compactSideDischargeOutdoorUnit,
    category: "installations",
    alt: "Compact side-discharge outdoor unit on a new concrete pad below a wall-mounted disconnect",
    caption:
      "Compact side-discharge outdoor unit on a new pad, wired from a wall-mounted disconnect.",
  },
  {
    src: grandaireCondenserGlassFront,
    category: "installations",
    alt: "GrandAire condenser on a concrete pad with hurricane brackets beside a glass-fronted wall",
    caption:
      "GrandAire condenser on a raised pad, secured with hurricane tie-down brackets.",
  },

  // ── Before & After ───────────────────────────────────────────────────────
  {
    src: beforeAfterLennoxToYorkCondenser,
    category: "before-after",
    alt: "Before: a weathered Lennox condenser on a stained pad. After: a new York condenser on a new pad",
    caption:
      "Weathered Lennox condenser replaced with a new York unit on a new, raised pad.",
    placements: ["home"],
  },
  {
    src: beforeAfterLennoxToYorkAirHandler,
    category: "before-after",
    alt: "Before: an old Lennox air handler in a water-stained closet. After: a new York air handler with a PVC drain",
    caption:
      "Old Lennox air handler in a water-stained closet swapped for a York unit with a new PVC drain.",
    placements: ["home"],
  },
  {
    src: beforeAfterOldCondenserToGrandaire,
    category: "before-after",
    alt: "Before: a faded, corroded condenser. After: a new GrandAire condenser on a new pad",
    caption: "Faded, corroded condenser replaced with a new GrandAire unit on a new pad.",
  },

  // ── Commercial ───────────────────────────────────────────────────────────
  {
    src: grandaireCondenserWallBracketCommercial,
    category: "commercial",
    alt: "GrandAire condenser mounted on an aluminum wall bracket on the side of a concrete-block building",
    caption:
      "GrandAire condenser mounted on an aluminum wall bracket on a block building, keeping it off the ground.",
    placements: ["commercial-hvac"],
  },
];

/** Photos placed on a page; empty for pages with none (e.g. most service slugs). */
export function photosFor(placement: string): GalleryPhoto[] {
  return galleryPhotos.filter((p) => p.placements?.some((pl) => pl === placement));
}
