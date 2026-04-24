import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/Typography",
  tags: ["autodocs"],
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

const SIZES = [
  { label: "text-sm", className: "text-sm" },
  { label: "text-base", className: "text-base" },
  { label: "text-lg", className: "text-lg" },
  { label: "text-xl", className: "text-xl" },
  { label: "text-2xl", className: "text-2xl" },
  { label: "text-3xl", className: "text-3xl" },
  { label: "text-4xl", className: "text-4xl" },
] as const;

export const BalatroFont: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 bg-black/80">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-100">
          m6x11 — Sizes
        </p>
        {SIZES.map(({ label, className }) => (
          <div key={label} className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-[10px] font-mono text-zinc-100">
              {label}
            </span>
            <span className={`font-balatro text-zinc-100 ${className}`}>
              Balatro Tracker
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-100">
          m6x11 — Tracking
        </p>
        {(
          [
            "tracking-normal",
            "tracking-wide",
            "tracking-wider",
            "tracking-widest",
          ] as const
        ).map((t) => (
          <div key={t} className="flex items-baseline gap-4">
            <span className="w-32 shrink-0 text-[10px] font-mono text-zinc-100">
              {t}
            </span>
            <span className={`font-balatro text-xl text-zinc-100 ${t}`}>
              Balatro Tracker
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-100">
          m6x11 — In context
        </p>
        <div className="rounded-xl bg-zinc-900 p-6 flex flex-col gap-2">
          <h1 className="font-balatro text-3xl text-zinc-100 tracking-wide">
            Balatro Tracker
          </h1>
          <p className="font-balatro text-sm text-zinc-400 tracking-wide leading-relaxed max-w-md">
            Track your gold stickers across every joker.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-100">
          m6x11 — Rarity labels
        </p>
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Common",   color: "var(--zinc-400)"   },
            { label: "Uncommon", color: "var(--blue-500)"   },
            { label: "Rare",     color: "var(--red-500)"    },
            { label: "Legendary",color: "var(--yellow-500)" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="font-balatro text-lg tracking-wide"
              style={{ color }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
};
