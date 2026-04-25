import type { Meta, StoryObj } from '@storybook/react';
import {
  ProgressBar,
  ProgressRoot,
  ProgressTrack,
  ProgressIndicator,
} from '@/components/ui/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Base Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-125 rounded-xl bg-zinc-900 p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 150, step: 1 } },
    total: { control: { type: 'range', min: 0, max: 150, step: 1 } },
    fillColor: {
      control: 'select',
      options: [
        'var(--red-500)',
        'var(--orange-500)',
        'var(--yellow-500)',
        'var(--green-500)',
        'var(--blue-500)',
        'var(--purple-500)',
        'var(--zinc-400)',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  args: { current: 47, total: 150, 'aria-label': 'Gold stickers earned' },
};

export const Empty: Story = {
  args: { current: 0, total: 150, 'aria-label': 'Gold stickers earned' },
};

export const Complete: Story = {
  args: { current: 150, total: 150, 'aria-label': 'Gold stickers earned' },
};

export const ComposableExample: Story = {
  render: () => {
    const rarityColors = [
      { fill: 'var(--zinc-400)', label: 'Common' },
      { fill: 'var(--blue-500)', label: 'Uncommon' },
      { fill: 'var(--red-400)', label: 'Rare' },
      { fill: 'var(--yellow-500)', label: 'Legendary' },
    ];
    const values = [82, 41, 12, 3];

    return (
      <div className="flex w-96 flex-col gap-3 rounded-xl bg-zinc-900 p-6">
        <p className="mb-1 text-xs font-medium tracking-wide text-zinc-100 uppercase">
          Jokers collected by rarity
        </p>
        {rarityColors.map(({ fill, label }, i) => {
          const pct = values[i];
          return (
            <div key={label} className="flex items-center gap-3">
              <span
                className="w-20 shrink-0 text-xs font-medium"
                style={{ color: fill }}
              >
                {label}
              </span>
              <ProgressRoot
                value={pct}
                className="flex-1"
                aria-label={`${label} jokers collected`}
              >
                <ProgressTrack height={12}>
                  <ProgressIndicator color={fill} />
                </ProgressTrack>
              </ProgressRoot>
              <span className="w-8 text-right text-xs text-zinc-400 tabular-nums">
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

const PALETTE_COLORS = [
  { label: 'Red', fill: 'var(--red-500)' },
  { label: 'Orange', fill: 'var(--orange-500)' },
  { label: 'Yellow', fill: 'var(--yellow-500)' },
  { label: 'Green', fill: 'var(--green-500)' },
  { label: 'Blue', fill: 'var(--blue-500)' },
  { label: 'Purple', fill: 'var(--purple-500)' },
];

export const AllPaletteColors: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5 rounded-xl bg-zinc-900 p-6">
      {PALETTE_COLORS.map(({ label, fill }, i) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] font-medium tracking-wide text-zinc-400 uppercase">
            {label}
          </span>
          <ProgressBar
            current={Math.round(150 * ((i + 1) / PALETTE_COLORS.length))}
            total={150}
            fillColor={fill}
            aria-label={`${label} progress`}
          />
        </div>
      ))}
    </div>
  ),
  decorators: [],
};
