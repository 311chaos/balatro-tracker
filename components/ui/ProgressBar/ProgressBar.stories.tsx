import type { Meta, StoryObj } from "@storybook/react";
import {
  ProgressBar,
  ProgressRoot,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/ProgressBar";
import { STICKER_COLORS, STICKER_LEVELS, RARITIES } from "@/config/types";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-125 rounded-xl bg-zinc-900 p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    current: { control: { type: "range", min: 0, max: 150, step: 1 } },
    total: { control: { type: "range", min: 0, max: 150, step: 1 } },
    fillColor: {
      control: "select",
      options: [
        ...STICKER_LEVELS.map((l) => `var(--stake-${l.toLowerCase()})`),
        "var(--rarity-common)",
        "var(--rarity-uncommon)",
        "var(--rarity-rare)",
        "var(--rarity-legendary)",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  args: { current: 47, total: 150 },
};

export const Empty: Story = {
  args: { current: 0, total: 150 },
};

export const Complete: Story = {
  args: { current: 150, total: 150 },
};

export const ComposableExample: Story = {
  render: () => {
    const rarityColors = {
      COMMON: { fill: "var(--rarity-common)", label: "Common" },
      UNCOMMON: { fill: "var(--rarity-uncommon)", label: "Uncommon" },
      RARE: { fill: "var(--rarity-rare)", label: "Rare" },
      LEGENDARY: { fill: "var(--rarity-legendary)", label: "Legendary" },
    };
    const values = [82, 41, 12, 3];

    return (
      <div className="w-96 rounded-xl bg-zinc-900 p-6 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 mb-1">
          Jokers collected by rarity
        </p>
        {RARITIES.map((rarity, i) => {
          const { fill, label } = rarityColors[rarity];
          const pct = values[i];
          return (
            <div key={rarity} className="flex items-center gap-3">
              <span
                className="w-20 text-xs font-medium shrink-0"
                style={{ color: fill }}
              >
                {label}
              </span>
              <ProgressRoot value={pct} className="flex-1">
                <ProgressTrack height={12}>
                  <ProgressIndicator color={fill} />
                </ProgressTrack>
              </ProgressRoot>
              <span className="w-8 text-right text-xs tabular-nums text-zinc-400">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    );
  },
  decorators: [],
};

export const AllStakeColors: Story = {
  render: () => (
    <div className="w-80 rounded-xl bg-zinc-900 p-6 flex flex-col gap-5">
      {STICKER_LEVELS.map((level, i) => (
        <div key={level} className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
            {STICKER_COLORS[level].label}
          </span>
          <ProgressBar
            current={Math.round(150 * ((i + 1) / STICKER_LEVELS.length))}
            total={150}
            fillColor={`var(--stake-${level.toLowerCase()})`}
          />
        </div>
      ))}
    </div>
  ),
  decorators: [],
};
