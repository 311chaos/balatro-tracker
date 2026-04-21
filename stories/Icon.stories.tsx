import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/App Icon",
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
};

export default meta;
type Story = StoryObj;

const SIZES = [16, 32, 64, 128, 256] as const;

export const GoldChip: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 bg-black/80">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          App Icon — Sizes
        </p>
        <div className="flex items-end gap-6 flex-wrap">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <img src="/icon.svg" width={size} height={size} alt="App icon" />
              <span className="text-[10px] font-mono text-zinc-600">{size}px</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          In context — Browser tab
        </p>
        <div className="flex items-center gap-3 rounded-t-lg bg-zinc-800 px-4 py-2 w-fit">
          <img src="/icon.svg" width={16} height={16} alt="App icon" />
          <span className="text-sm text-zinc-200">Balatro Tracker</span>
        </div>
      </div>
    </div>
  ),
};
