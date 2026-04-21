"use client";

import { ItemSprite } from "@/components/ui/ItemSprite";
import { PokerChip } from "@/components/ui/PokerChip";
import { JOKER_SHEET_URL, type JokerId } from "@/config/jokers";
import { STICKER_COLORS, type Joker, type StickerLevel } from "@/config/types";

type Props = {
  joker: Joker & { id: JokerId };
  stickerLevel: StickerLevel | null;
  onToggle: (level: StickerLevel | null) => void;
};

const RARITY_COLORS: Record<Joker["rarity"], string> = {
  COMMON: "var(--rarity-common)",
  UNCOMMON: "var(--rarity-uncommon)",
  RARE: "var(--rarity-rare)",
  LEGENDARY: "var(--rarity-legendary)",
};

const RARITY_LABELS: Record<Joker["rarity"], string> = {
  COMMON: "Common",
  UNCOMMON: "Uncommon",
  RARE: "Rare",
  LEGENDARY: "Legendary",
};

export const JokerCard = ({ joker, stickerLevel, onToggle }: Props) => {
  const isStickered = stickerLevel !== null;
  const borderColor = isStickered
    ? STICKER_COLORS[stickerLevel].ring
    : "transparent";

  const handleClick = () => {
    onToggle(isStickered ? null : "GOLD");
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 rounded-lg bg-black/20 p-3 transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 cursor-pointer"
      style={{ border: `2px solid ${borderColor}` }}
      title={joker.name}
    >
      <div style={{ position: "relative" }}>
        <ItemSprite
          spriteX={joker.spriteX}
          spriteY={joker.spriteY}
          additionalLayers={joker.additionalLayers}
          sheetUrl={JOKER_SHEET_URL}
          name={joker.id}
          size={100}
        />
        {isStickered && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <PokerChip variant={stickerLevel} size={24} />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-0.5">
        <span className="w-full truncate text-center text-lg font-semibold text-zinc-100 font-balatro tracking-widest">
          {joker.name}
        </span>
        <span
          className="text-xs font-medium uppercase tracking-wide font-balatro"
          style={{ color: RARITY_COLORS[joker.rarity] }}
        >
          {RARITY_LABELS[joker.rarity]}
        </span>
      </div>
    </button>
  );
};
