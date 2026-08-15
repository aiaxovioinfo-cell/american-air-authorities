// Regenerate the emblem geometry, favicon SVGs, and OG image from the
// client's raster mark. Run: node scripts/trace-logo.mjs
//
// Pipeline: pixel-classify logo-mark.png into olive/brass masks, trace their
// boundaries into polygons, Douglas-Peucker simplify, and emit:
//   - src/lib/emblemGeometry.ts  (paths + polygon rings + sampled colors)
//   - public/logo-mark.svg / logo-mark-wide.svg  (flat vector marks)
//   - public/og.png  (1200x630 Open Graph card)
//
// Requires: pngjs (devDependency). Edit COLORS only if the brand palette
// itself changes — everything else is derived from the file.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PNG } from "pngjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public/logo-mark.png");
const COLORS = { olive: "#3E461F", brass: "#A97939" };

const s = PNG.sync.read(fs.readFileSync(SRC));
const W = s.width,
  H = s.height,
  d = s.data;

const cls = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return "x";
  const i = (y * W + x) * 4,
    r = d[i],
    g = d[i + 1],
    b = d[i + 2],
    a = d[i + 3];
  if (a < 90 || r + g + b < 70) return "x";
  return r > g + 6 ? "B" : "O"; // brass is red-dominant, olive green-dominant
};
const maskFor = (c) => {
  const m = [];
  for (let y = 0; y < H; y++) {
    m[y] = [];
    for (let x = 0; x < W; x++) m[y][x] = cls(x, y) === c ? 1 : 0;
  }
  return m;
};
function edges(m) {
  const E = [];
  const I = (x, y) => (x >= 0 && y >= 0 && x < W && y < H ? m[y][x] : 0);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!m[y][x]) continue;
      if (!I(x - 1, y)) E.push([[x, y], [x, y + 1]]);
      if (!I(x, y + 1)) E.push([[x, y + 1], [x + 1, y + 1]]);
      if (!I(x + 1, y)) E.push([[x + 1, y + 1], [x + 1, y]]);
      if (!I(x, y - 1)) E.push([[x + 1, y], [x, y]]);
    }
  return E;
}
const key = (p) => p[0] + "," + p[1];
function stitch(E) {
  const bs = new Map();
  for (const e of E) {
    const k = key(e[0]);
    (bs.get(k) || bs.set(k, []).get(k)).push(e);
  }
  const used = new Set(),
    loops = [],
    dir = (e) => [e[1][0] - e[0][0], e[1][1] - e[0][1]];
  for (const e0 of E) {
    if (used.has(e0)) continue;
    const loop = [e0[0].slice()];
    let cur = e0;
    used.add(e0);
    for (let g = 0; g < 300000; g++) {
      loop.push(cur[1].slice());
      const cand = (bs.get(key(cur[1])) || []).filter((e) => !used.has(e));
      if (!cand.length) break;
      let nx;
      if (cand.length === 1) nx = cand[0];
      else {
        const [dx, dy] = dir(cur);
        let bst = null,
          ba = 1e9;
        for (const c of cand) {
          const [ex, ey] = dir(c);
          const ang = Math.atan2(dx * ey - dy * ex, dx * ex + dy * ey);
          if (-ang < ba) {
            ba = -ang;
            bst = c;
          }
        }
        nx = bst;
      }
      used.add(nx);
      cur = nx;
      if (key(cur[1]) === key(loop[0])) break;
    }
    if (loop.length > 3) loops.push(loop);
  }
  return loops;
}
const area = (p) => {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i],
      [x2, y2] = p[(i + 1) % p.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a) / 2;
};
const bbox = (p) => {
  let x0 = 1e9,
    y0 = 1e9,
    x1 = -1e9,
    y1 = -1e9;
  for (const [x, y] of p) {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  return [x0, y0, x1 - x0, y1 - y0];
};
const pd = (p, a, b) => {
  const [x, y] = p,
    [x1, y1] = a,
    [x2, y2] = b,
    dx = x2 - x1,
    dy = y2 - y1,
    L = dx * dx + dy * dy;
  if (!L) return Math.hypot(x - x1, y - y1);
  let t = ((x - x1) * dx + (y - y1) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
};
function dp(p, e) {
  if (p.length < 3) return p;
  let dm = 0,
    idx = 0;
  for (let i = 1; i < p.length - 1; i++) {
    const dd = pd(p[i], p[0], p[p.length - 1]);
    if (dd > dm) {
      dm = dd;
      idx = i;
    }
  }
  if (dm > e) return dp(p.slice(0, idx + 1), e).slice(0, -1).concat(dp(p.slice(idx), e));
  return [p[0], p[p.length - 1]];
}
function simp(loop, e) {
  let p = loop.slice();
  if (key(p[0]) === key(p[p.length - 1])) p = p.slice(0, -1);
  return dp(p.concat([p[0]]), e).slice(0, -1);
}
function getLoops(col, eps) {
  let L = stitch(edges(maskFor(col)));
  L = L.filter((l) => {
    const [, , w, h] = bbox(l);
    return area(l) >= 6 && w >= 3 && h >= 3;
  });
  return L.map((l) => simp(l, eps)).filter((p) => p.length >= 3);
}

const byArea = (a) =>
  a.map((p) => ({ p, A: area(p), bb: bbox(p) })).sort((x, y) => y.A - x.A);
const O = byArea(getLoops("O", 1.1));
const B = byArea(getLoops("B", 1.1));
const oliveMain = O[0].p;
const oliveBars = O.slice(1).filter((o) => o.bb[2] > 25).map((o) => o.p);
const oliveDetail = O.slice(1).filter((o) => o.bb[2] <= 25 && o.A > 12).map((o) => o.p);
const brassBars = B.filter((o) => o.bb[2] > 25).map((o) => o.p);
const toPath = (p) => "M" + p.map((q) => q[0] + " " + q[1]).join(" L") + " Z";
const oliveSvg = [oliveMain, ...oliveBars, ...oliveDetail].map(toPath).join(" ");
const brassSvg = brassBars.map(toPath).join(" ");
const asArr = (p) => "[" + p.map((q) => "[" + q[0] + "," + q[1] + "]").join(",") + "]";

fs.writeFileSync(
  path.join(ROOT, "src/lib/emblemGeometry.ts"),
  `// AUTO-GENERATED from public/logo-mark.png by scripts/trace-logo.mjs (do not hand-edit).
// Pixel-traced geometry of the American Air Authorities mark, in the source
// artwork's native ${W}x${H} coordinate space. Exact colors sampled from the file.
export const EMBLEM = {
  viewW: ${W},
  viewH: ${H},
  colors: { olive: "${COLORS.olive}", brass: "${COLORS.brass}" },
  // Full detail for crisp 2D rendering (fill-rule: evenodd).
  oliveSvgPath: ${JSON.stringify(oliveSvg)},
  brassSvgPath: ${JSON.stringify(brassSvg)},
  // Polygon rings for 3D extrusion.
  oliveMain: ${asArr(oliveMain)},
  oliveBars: [${oliveBars.map(asArr).join(",")}],
  brassBars: [${brassBars.map(asArr).join(",")}],
} as const;
`,
);

const offY = (W - H) / 2;
fs.writeFileSync(
  path.join(ROOT, "public/logo-mark.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${W}" height="${W}"><g transform="translate(0 ${offY})"><path fill="${COLORS.olive}" fill-rule="evenodd" d="${oliveSvg}"/><path fill="${COLORS.brass}" fill-rule="evenodd" d="${brassSvg}"/></g></svg>`,
);
fs.writeFileSync(
  path.join(ROOT, "public/logo-mark-wide.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path fill="${COLORS.olive}" fill-rule="evenodd" d="${oliveSvg}"/><path fill="${COLORS.brass}" fill-rule="evenodd" d="${brassSvg}"/></svg>`,
);

// OG card 1200x630, supersampled
function fillPolys(grid, polys, val, GW, GH) {
  for (let y = 0; y < GH; y++) {
    const yc = y + 0.5,
      xs = [];
    for (const poly of polys)
      for (let i = 0; i < poly.length; i++) {
        const [x1, y1] = poly[i],
          [x2, y2] = poly[(i + 1) % poly.length];
        if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) {
          const t = (yc - y1) / (y2 - y1);
          xs.push(x1 + t * (x2 - x1));
        }
      }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2)
      for (let x = Math.ceil(xs[k] - 0.5); x <= Math.floor(xs[k + 1] - 0.5); x++)
        if (x >= 0 && x < GW) grid[y * GW + x] = val;
  }
}
const OGW = 1200,
  OGH = 630,
  SS = 2,
  gw = OGW * SS,
  gh = OGH * SS;
const grid = new Uint8Array(gw * gh);
const scale = (gh * 0.42) / H,
  ex = (gw - W * scale) / 2,
  ey = (gh - H * scale) / 2;
const tx = (poly) => poly.map(([x, y]) => [ex + x * scale, ey + y * scale]);
fillPolys(grid, [oliveMain, ...oliveBars, ...oliveDetail].map(tx), 1, gw, gh);
fillPolys(grid, brassBars.map(tx), 2, gw, gh);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const [orv, ogv, obv] = hex(COLORS.olive);
const [brv, bgv, bbv] = hex(COLORS.brass);
const og = new PNG({ width: OGW, height: OGH });
for (let y = 0; y < OGH; y++)
  for (let x = 0; x < OGW; x++) {
    let so = 0,
      sb = 0,
      cnt = 0;
    for (let dy = 0; dy < SS; dy++)
      for (let dx = 0; dx < SS; dx++) {
        const v = grid[(y * SS + dy) * gw + (x * SS + dx)];
        cnt++;
        if (v === 1) so++;
        else if (v === 2) sb++;
      }
    const fo = so / cnt,
      fb = sb / cnt,
      bg = 1 - fo - fb;
    let R = Math.round(11 * bg + orv * fo + brv * fb);
    let G = Math.round(12 * bg + ogv * fo + bgv * fb);
    let B2 = Math.round(8 * bg + obv * fo + bbv * fb);
    if (y >= OGH - 70 && y <= OGH - 69) {
      R = brv;
      G = bgv;
      B2 = bbv;
    }
    const di = (y * OGW + x) * 4;
    og.data[di] = R;
    og.data[di + 1] = G;
    og.data[di + 2] = B2;
    og.data[di + 3] = 255;
  }
fs.writeFileSync(path.join(ROOT, "public/og.png"), PNG.sync.write(og));

console.log(
  `Traced ${SRC}\n  olive: 1 main + ${oliveBars.length} bars + ${oliveDetail.length} detail\n  brass: ${brassBars.length} bars\nWrote emblemGeometry.ts, logo-mark.svg, logo-mark-wide.svg, og.png`,
);
