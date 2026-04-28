import { colors } from '@/config/colors';
import { type RarityType } from '@/config/types';

export const hexToRgb = (hex: string) => {
  const h = hex.replace(/^#/, '');
  if (!/^[0-9a-f]{6}$/i.test(h)) return { r: 128, g: 128, b: 128 };
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

// WCAG 2.x relative luminance — https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
// Constants come from two standards:
//   - IEC 61966-2-1 (sRGB spec): piecewise linearization curve (0.04045, 12.92, 0.055, 1.055, 2.4)
//   - ITU-R BT.709 (HDTV): per-channel luminance weights (0.2126 R, 0.7152 G, 0.0722 B)
//     reflecting human eye sensitivity — green appears ~5× brighter than blue at equal energy.
// This is the same formula axe and browser devtools use to compute contrast ratios.
export const rgbToLuminance = (r: number, g: number, b: number): number => {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

export const rgbToHsl = (r: number, g: number, b: number) => {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (l > 0.5 ? 2 - max - min : max + min);
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const RARITY_LABELS = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
} satisfies Record<RarityType, string>;

export const RARITY_COLORS = {
  COMMON: colors.zinc[400],
  UNCOMMON: colors.blue[400],
  RARE: colors.red[400],
  LEGENDARY: colors.yellow[500],
} satisfies Record<RarityType, string>;

export const RARITY_CHIP_COLORS = {
  COMMON: 'zinc',
  UNCOMMON: 'blue',
  RARE: 'red',
  LEGENDARY: 'yellow',
} as const satisfies Record<RarityType, string>;
