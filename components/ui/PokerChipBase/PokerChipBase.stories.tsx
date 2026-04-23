import type { Meta, StoryObj } from "@storybook/react";
import { PokerChipBase } from "@/components/ui/PokerChipBase";
import {
  STICKER_LEVELS,
  STICKER_COLORS,
  type StickerLevel,
} from "@/config/types";

const meta: Meta<typeof PokerChipBase> = {
  title: "UI/PokerChipBase",
  component: PokerChipBase,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    chipColor: { control: "color" },
    ringColor: { control: "color" },
    notch1Color: { control: "color" },
    notch2Color: { control: "color" },
    size: { control: { type: "range", min: 20, max: 120, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof PokerChipBase>;

export const Playground: Story = {
  args: {
    chipColor: STICKER_COLORS.GOLD.chip,
    ringColor: STICKER_COLORS.GOLD.ring,
    notch1Color: STICKER_COLORS.GOLD.notch1,
    notch2Color: STICKER_COLORS.GOLD.notch2,
    size: 80,
  },
};

export const AllStakes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 32,
        background: "#09090b",
        borderRadius: 12,
      }}
    >
      {(STICKER_LEVELS as StickerLevel[]).map((level) => {
        const { chip, ring, notch1, notch2, label } = STICKER_COLORS[level];
        return (
          <div
            key={level}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <PokerChipBase
              chipColor={chip}
              ringColor={ring}
              notch1Color={notch1}
              notch2Color={notch2}
              size={40}
            />
            <span style={{ color: "#fff", fontSize: 14, width: 110 }}>
              {label}
            </span>
            <span
              style={{
                color: "#fff",
                fontSize: 11,
                fontFamily: "monospace",
              }}
            >
              chip: {chip} · ring: {ring} · n1: {notch1} · n2: {notch2}
            </span>
          </div>
        );
      })}
    </div>
  ),
};
