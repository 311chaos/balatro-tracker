import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    size: "md",
    placeholder: "Search jokers…",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {size}
          </span>
          <Input size={size} placeholder={`Size ${size}`} />
        </div>
      ))}
    </div>
  ),
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState("Joker");
    return (
      <div className="w-72">
        <Input
          size="md"
          clearable
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          placeholder="Search jokers…"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    placeholder: "Disabled input",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

const SIZES = ["sm", "md", "lg"] as const;

const STATE_COLS: {
  label: string;
  props: React.ComponentProps<typeof Input>;
  className?: string;
}[] = [
  { label: "Default", props: { placeholder: "Placeholder" } },
  { label: "With value", props: { value: "Unstoppable", readOnly: true, "aria-label": "With value" } },
  { label: "Focus", props: { placeholder: "Placeholder" }, className: "pseudo-focus" },
  { label: "Error", props: { "aria-invalid": true, value: "bad@", readOnly: true, "aria-label": "Error state" } },
  { label: "Disabled", props: { placeholder: "Placeholder", disabled: true } },
  { label: "Readonly", props: { value: "Read only", readOnly: true, "aria-label": "Readonly" } },
];

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center gap-4">
        <span className="w-12 shrink-0" />
        {STATE_COLS.map(({ label }) => (
          <span
            key={label}
            className="w-36 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>
      {SIZES.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-12 shrink-0 text-[10px] font-mono text-muted-foreground">
            {size}
          </span>
          {STATE_COLS.map(({ label, props, className }) => (
            <div key={label} className="w-36">
              <Input size={size} className={className} {...props} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Input
        size="md"
        aria-invalid
        value="bad@email"
        readOnly
        placeholder="Email address"
      />
      <p className="text-xs text-destructive">Enter a valid email address.</p>
    </div>
  ),
};

export const ClearableEmpty: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          With value — clear button visible
        </span>
        <Input
          size="md"
          clearable
          value="Joker"
          readOnly
          placeholder="Search jokers…"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Empty — clear button hidden
        </span>
        <Input size="md" clearable value="" placeholder="Search jokers…" />
      </div>
    </div>
  ),
};
