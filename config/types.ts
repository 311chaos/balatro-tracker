export type StickerLevel =
  | "WHITE"
  | "RED"
  | "GREEN"
  | "BLACK"
  | "BLUE"
  | "PURPLE"
  | "ORANGE"
  | "GOLD";

export const RARITY = {
  COMMON: "COMMON",
  UNCOMMON: "UNCOMMON",
  RARE: "RARE",
  LEGENDARY: "LEGENDARY",
} as const;
export type RarityType = (typeof RARITY)[keyof typeof RARITY];
export const RARITIES = Object.values(RARITY) as RarityType[];

export type CollectibleItem = {
  id: string;
  name: string;
  spriteX: number;
  spriteY: number;
  additionalLayers?: Array<{
    spriteX: number;
    spriteY: number;
    scale?: number;
  }>;
  jokerNumber?: number;
};

export type Joker = CollectibleItem & {
  rarity: RarityType;
};

export type TarotCard = CollectibleItem;
export type Voucher = CollectibleItem;
export type PlanetCard = CollectibleItem;

export const STICKER_LEVELS: StickerLevel[] = [
  "GOLD",
  "ORANGE",
  "PURPLE",
  "BLUE",
  "BLACK",
  "GREEN",
  "RED",
  "WHITE",
];

export const STICKER_COLORS: Record<
  StickerLevel,
  { chip: string; ring: string; notch1: string; notch2: string; label: string }
> = {
  WHITE: {
    chip: "#E8E8E8",
    ring: "#AAAAAA",
    notch1: "#111111",
    notch2: "#111111",
    label: "White Stake",
  },
  RED: {
    chip: "#CC2222",
    ring: "#771111",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Red Stake",
  },
  GREEN: {
    chip: "#339944",
    ring: "#1A5522",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Green Stake",
  },
  BLACK: {
    chip: "#606060",
    ring: "#222222",
    notch1: "#CC2222",
    notch2: "#FFFFFF",
    label: "Black Stake",
  },
  BLUE: {
    chip: "#2288DD",
    ring: "#114477",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Blue Stake",
  },
  PURPLE: {
    chip: "#7744BB",
    ring: "#3D2266",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Purple Stake",
  },
  ORANGE: {
    chip: "#DB663C",
    ring: "#8B2800",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Orange Stake",
  },
  GOLD: {
    chip: "#FA9108",
    ring: "#996600",
    notch1: "#111111",
    notch2: "#FFFFFF",
    label: "Gold Stake",
  },
};
