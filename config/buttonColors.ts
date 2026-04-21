import { colors } from "./colors";

export type ButtonColor =
  | "rarity-common"
  | "rarity-uncommon"
  | "rarity-rare"
  | "rarity-legendary"
  | "stake-white"
  | "stake-red"
  | "stake-green"
  | "stake-black"
  | "stake-blue"
  | "stake-purple"
  | "stake-orange"
  | "stake-gold";

export const BUTTON_COLORS: Record<ButtonColor, { bg: string; text: string }> =
  {
    "rarity-common":    { bg: colors.rarity.common,    text: colors.zinc[950] },
    "rarity-uncommon":  { bg: colors.rarity.uncommon,  text: colors.zinc[950] },
    "rarity-rare":      { bg: colors.rarity.rare,      text: colors.zinc[950] },
    "rarity-legendary": { bg: colors.rarity.legendary, text: colors.zinc[950] },
    "stake-white":      { bg: colors.stake.white,      text: colors.zinc[950] },
    "stake-red":        { bg: colors.stake.red,        text: "#ffffff"         },
    "stake-green":      { bg: colors.stake.green,      text: "#ffffff"         },
    "stake-black":      { bg: colors.stake.black,      text: "#ffffff"         },
    "stake-blue":       { bg: colors.stake.blue,       text: "#ffffff"         },
    "stake-purple":     { bg: colors.stake.purple,     text: "#ffffff"         },
    "stake-orange":     { bg: colors.stake.orange,     text: "#ffffff"         },
    "stake-gold":       { bg: colors.stake.gold,       text: colors.zinc[950] },
  };

export const RARITY_COLORS: ButtonColor[] = [
  "rarity-common",
  "rarity-uncommon",
  "rarity-rare",
  "rarity-legendary",
];

export const STAKE_COLORS: ButtonColor[] = [
  "stake-white",
  "stake-red",
  "stake-green",
  "stake-black",
  "stake-blue",
  "stake-purple",
  "stake-orange",
  "stake-gold",
];
