/**
 * Generates an 11-step OKLCH color scale for each canonical game color.
 * Run with:  npx tsx scripts/generate-palette.ts
 *
 * The canonical color anchors at its natural lightness. Chroma tapers
 * toward a floor (CHROMA_FLOOR_PCT of canonical) at both extremes rather
 * than to zero — this keeps step 50 a faint tint and step 950 a dark shade
 * rather than collapsing to plain white / black.
 */

import { formatHex, parse, oklch as toOklch } from 'culori';

const CANONICAL: Record<string, string> = {
  // Rarity — adjusted to L≈0.640 (step 500) while preserving hue
  // common removed — use zinc-400 (#a1a1aa) instead
  // uncommon removed — use stake-blue (#3991e0) instead
  rare: '#df5a5c', // was #f87171 (L=0.711, step 400)
  legendary: '#ffd500', // custom yellow scale, canonical at step 500
  // Stake — white/black removed (use zinc scale instead)
  'stake-red': '#df5a5c', // finalized red ✓
  'stake-green': '#4ba256', // was #339944 ✓ finalized
  'stake-blue': '#3991e0', // was #2288DD ✓ finalized
  'stake-purple': '#9e6de7', // was #7744BB (L=0.508, step 600)
  'stake-orange': '#f28f0d', // custom carrot orange scale
};

// Lightness targets for each scale step (OKLCH scale, 0–1)
const STEPS: [number, number][] = [
  [50, 0.975],
  [100, 0.94],
  [200, 0.88],
  [300, 0.82],
  [400, 0.74],
  [500, 0.64],
  [600, 0.54],
  [700, 0.44],
  [800, 0.34],
  [900, 0.24],
  [950, 0.165],
];

const L_MIN = 0.165;
const L_MAX = 0.975;
// Chroma floors differ by side:
// - Light side (above canonical): small floor — a faint tint is enough at high lightness.
// - Dark side (below canonical): larger floor — low lightness needs more chroma before any
//   hue is visible, so without a higher floor the dark steps collapse to near-black.
const CHROMA_FLOOR_LIGHT = 0.18;
const CHROMA_FLOOR_DARK = 0.4;

const generateScale = (hex: string): [number, string][] => {
  const base = toOklch(parse(hex));
  if (!base) throw new Error(`Cannot parse: ${hex}`);

  const { l: L_base, c: C_base, h: H_base = 0 } = base;
  const rangeAbove = L_MAX - L_base;
  const rangeBelow = L_base - L_MIN;

  return STEPS.map(([step, targetL]) => {
    const aboveCanonical = targetL >= L_base;
    const chromaFactor = aboveCanonical
      ? 1 - (targetL - L_base) / rangeAbove
      : 1 - (L_base - targetL) / rangeBelow;

    const floor = aboveCanonical ? CHROMA_FLOOR_LIGHT : CHROMA_FLOOR_DARK;
    const c = Math.max(C_base * floor, C_base * chromaFactor);

    const hex = formatHex({ mode: 'oklch', l: targetL, c, h: H_base });

    return [step, hex];
  });
};

// ── Output ────────────────────────────────────────────────────────────────────

for (const [name, canonical] of Object.entries(CANONICAL)) {
  const scale = generateScale(canonical);

  // Find which step is closest to the canonical color
  const base = toOklch(parse(canonical))!;
  const anchor = STEPS.reduce(
    (prev, [step, l]) =>
      Math.abs(l - base.l) <
      Math.abs(STEPS.find(([s]) => s === prev)![1] - base.l)
        ? step
        : prev,
    STEPS[0][0],
  );

  console.log(`\n  // ${name}  (canonical ${canonical} ≈ ${anchor})`);
  for (const [step, hex] of scale) {
    const marker = step === anchor ? '  ← canonical' : '';
    console.log(`  ${String(step).padEnd(4)}: "${hex}",${marker}`);
  }
}
