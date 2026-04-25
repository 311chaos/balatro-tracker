import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

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
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
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

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {SIZES.map((size) => (
        <Button key={size} size={size}>
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

export const VariantStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0" />
        {STATE_COLS.map(({ label }) => (
          <span
            key={label}
            className="w-24 text-center text-[10px] font-medium uppercase tracking-widest text-foreground"
          >
            {label}
          </span>
        ))}
      </div>
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-[10px] font-mono text-foreground">
            {variant}
          </span>
          {STATE_COLS.map(({ label, className, disabled }) => (
            <div key={label} className="w-24 flex justify-center">
              <Button
                variant={variant}
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
            className="w-24 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 shrink-0 text-[10px] font-mono text-muted-foreground">
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
