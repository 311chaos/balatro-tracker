import type { Meta, StoryObj } from "@storybook/react";
import { PokerChip } from "@/components/ui/PokerChip";
import { STICKER_LEVELS, type StickerLevel } from "@/config/types";

const meta: Meta<typeof PokerChip> = {
  title: "UI/PokerChip",
  component: PokerChip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: STICKER_LEVELS,
    },
    size: { control: { type: "range", min: 20, max: 120, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof PokerChip>;

export const Playground: Story = {
  args: {
    variant: "GOLD",
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
      {(STICKER_LEVELS as StickerLevel[]).map((level) => (
        <div
          key={level}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <PokerChip variant={level} size={40} />
          <span style={{ color: "#fff", fontSize: 14 }}>
            {level.charAt(0) + level.slice(1).toLowerCase()} Stake
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    variant: "BLUE",
  },

  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: 32,
        background: "#09090b",
        borderRadius: 12,
      }}
    >
      {[24, 32, 40, 56, 80].map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PokerChip variant="GOLD" size={size} />
          <span style={{ color: "#71717a", fontSize: 11 }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
