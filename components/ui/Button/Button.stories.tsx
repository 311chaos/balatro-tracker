import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import {
  BUTTON_COLORS,
  RARITY_COLORS,
  STAKE_COLORS,
  type ButtonColor,
} from "@/config/buttonColors";

const COLOR_OPTIONS = [undefined, ...Object.keys(BUTTON_COLORS)] as const;
const VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;
const SIZES = ["xs", "sm", "default", "lg"] as const;

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    color: { control: "select", options: COLOR_OPTIONS },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-2">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Rarity
        </p>
        <div className="flex flex-wrap gap-2">
          {RARITY_COLORS.map((c) => (
            <Button key={c} color={c}>
              {c.replace("rarity-", "")}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Stake
        </p>
        <div className="flex flex-wrap gap-2">
          {STAKE_COLORS.map((c) => (
            <Button key={c} color={c}>
              {c.replace("stake-", "")}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {SIZES.map((size) => (
        <Button key={size} size={size} color="stake-gold">
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

const STATE_COLS: { label: string; className?: string; disabled?: boolean }[] =
  [
    { label: "Default" },
    { label: "Hover", className: "pseudo-hover" },
    { label: "Active", className: "pseudo-active" },
    { label: "Focus", className: "pseudo-focus" },
    { label: "Disabled", disabled: true },
  ];

const COLOR_VARIANT_PAIRS = [
  "default",
  "ghost",
  "outline",
  "secondary",
  "link",
] as const;

const SAMPLE_COLORS: ButtonColor[] = [
  "rarity-common",
  "rarity-rare",
  "rarity-legendary",
  "stake-gold",
  "stake-blue",
];

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0" />
        {SAMPLE_COLORS.map((c) => (
          <span
            key={c}
            className="w-28 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
          >
            {c.replace(/^(rarity|stake)-/, "")}
          </span>
        ))}
      </div>
      {COLOR_VARIANT_PAIRS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-[10px] font-mono text-zinc-600">
            {variant}
          </span>
          {SAMPLE_COLORS.map((c) => (
            <div key={c} className="w-28 flex justify-center">
              <Button variant={variant} color={c}>
                {variant}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const VariantStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0" />
        {STATE_COLS.map(({ label }) => (
          <span
            key={label}
            className="w-24 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
          >
            {label}
          </span>
        ))}
      </div>
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-[10px] font-mono text-zinc-600">
            {variant}
          </span>
          {STATE_COLS.map(({ label, className, disabled }) => (
            <div key={label} className="w-24 flex justify-center">
              <Button
                variant={variant}
                data-variant={variant}
                className={className}
                disabled={disabled}
              >
                {label}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AsAnchor: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0" />
        {STATE_COLS.map(({ label }) => (
          <span
            key={label}
            className="w-24 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0 text-[10px] font-mono text-zinc-600">
          default
        </span>
        {STATE_COLS.map(({ label, className, disabled }) => (
          <div key={label} className="w-24 flex justify-center">
            <Button
              render={<a href="#" />}
              className={className}
              disabled={disabled}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-36 shrink-0" />
        {STATE_COLS.map(({ label }) => (
          <span
            key={label}
            className="w-20 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
          >
            {label}
          </span>
        ))}
      </div>
      {([...RARITY_COLORS, ...STAKE_COLORS] as ButtonColor[]).map((c) => (
        <div key={c} className="flex items-center gap-4">
          <span className="w-36 shrink-0 text-[10px] font-mono text-zinc-600">
            {c}
          </span>
          {STATE_COLS.map(({ label, className, disabled }) => (
            <div key={label} className="w-20 flex justify-center">
              <Button color={c} className={className} disabled={disabled}>
                {label}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
