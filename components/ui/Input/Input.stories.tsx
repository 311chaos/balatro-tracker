import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
          <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
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
