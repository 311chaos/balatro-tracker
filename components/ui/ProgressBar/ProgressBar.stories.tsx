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
    from: { control: 'text' },
    to: { control: 'text' },
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
      { from: 'var(--zinc-300)', to: 'var(--zinc-500)', label: 'Common' },
      { from: 'var(--blue-300)', to: 'var(--blue-500)', label: 'Uncommon' },
      { from: 'var(--red-400)', to: 'var(--red-600)', label: 'Rare' },
      {
        from: 'var(--yellow-300)',
        to: 'var(--yellow-500)',
        label: 'Legendary',
      },
    ];
    const values = [82, 41, 12, 3];

    return (
      <div className="flex w-96 flex-col gap-3 rounded-xl bg-zinc-900 p-6">
        <p className="mb-1 text-xs font-medium tracking-wide text-zinc-100 uppercase">
          Jokers collected by rarity
        </p>
        {rarityColors.map(({ from, to, label }, i) => {
          const pct = values[i];
          return (
            <div key={label} className="flex items-center gap-3">
              <span
                className="w-20 shrink-0 text-xs font-medium"
                style={{ color: to }}
              >
                {label}
              </span>
              <ProgressRoot
                value={pct}
                className="flex-1"
                aria-label={`${label} jokers collected`}
              >
                <ProgressTrack height={12}>
                  <ProgressIndicator from={from} to={to} />
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
  { label: 'Red', from: 'var(--red-400)', to: 'var(--red-600)' },
  { label: 'Orange', from: 'var(--yellow-400)', to: 'var(--orange-500)' },
  { label: 'Yellow', from: 'var(--yellow-300)', to: 'var(--yellow-500)' },
  { label: 'Green', from: 'var(--green-400)', to: 'var(--green-600)' },
  { label: 'Blue', from: 'var(--blue-300)', to: 'var(--blue-500)' },
  { label: 'Purple', from: 'var(--purple-400)', to: 'var(--purple-600)' },
];

export const AllPaletteColors: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5 rounded-xl bg-zinc-900 p-6">
      {PALETTE_COLORS.map(({ label, from, to }, i) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] font-medium tracking-wide text-zinc-400 uppercase">
            {label}
          </span>
          <ProgressBar
            current={Math.round(150 * ((i + 1) / PALETTE_COLORS.length))}
            total={150}
            from={from}
            to={to}
            aria-label={`${label} progress`}
          />
        </div>
      ))}
    </div>
  ),
  decorators: [],
};
