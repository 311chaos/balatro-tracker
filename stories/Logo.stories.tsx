import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@/components/ui/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Design Tokens/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
    a11y: { test: 'off' },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 18, max: 160, step: 1 },
      description: 'Height in px — width scales proportionally',
    },
  },
  args: {
    size: 36,
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center bg-zinc-950 p-6">
      <Logo {...args} />
    </div>
  ),
};

const PRESET_SIZES = [18, 24, 36, 48, 72] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-zinc-950 p-6">
      {PRESET_SIZES.map((size) => (
        <div key={size} className="flex items-center gap-6">
          <Logo size={size} />
          <span className="font-mono text-[10px] text-zinc-500">{size}px</span>
        </div>
      ))}
    </div>
  ),
};
