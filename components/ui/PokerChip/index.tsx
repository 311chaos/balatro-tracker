'use client';

import { PokerChipBase } from '@/components/ui/PokerChipBase';
import { STICKER_COLORS, type StickerLevel } from '@/config/types';

type Props = {
  variant: StickerLevel;
  size?: number;
};

export const PokerChip = ({ variant, size }: Props) => {
  const { chip, ring, notch1, notch2 } = STICKER_COLORS[variant];
  return (
    <PokerChipBase
      chipColor={chip}
      ringColor={ring}
      notch1Color={notch1}
      notch2Color={notch2}
      size={size}
    />
  );
};
