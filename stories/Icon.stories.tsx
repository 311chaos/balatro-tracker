import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design Tokens/App Icon',
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
    a11y: { test: 'off' },
  },
};

export default meta;
type Story = StoryObj;

const SIZES = [16, 32, 64, 128, 256] as const;

const ENV_ICONS = [
  { label: 'Local', url: '/icons/icon-local.svg', env: 'localhost' },
  {
    label: 'Preview',
    url: '/icons/icon-preview.svg',
    env: 'VERCEL_ENV=preview',
  },
  {
    label: 'Production',
    url: '/icons/icon-prod.svg',
    env: 'VERCEL_ENV=production',
  },
  {
    label: 'Storybook',
    url: '/icons/icon-storybook.svg',
    env: 'storybook dev',
  },
] as const;

export const GoldChip: Story = {
  name: 'All Environments',
  render: () => (
    <div className="flex flex-col gap-10 bg-black/80 p-6">
      {ENV_ICONS.map(({ label, url, env }) => (
        <div key={label} className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <p className="text-xs font-medium tracking-widest text-zinc-100 uppercase">
              {label}
            </p>
            <span className="font-mono text-[10px] text-zinc-500">{env}</span>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <img
                  src={url}
                  width={size}
                  height={size}
                  alt={`${label} app icon`}
                />
                <span className="font-mono text-[10px] text-zinc-100">
                  {size}px
                </span>
              </div>
            ))}
          </div>

          <div className="flex w-fit items-center gap-3 rounded-t-lg bg-zinc-800 px-4 py-2">
            <img src={url} width={16} height={16} alt="" />
            <span className="text-sm text-zinc-200">Balatro Tracker</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
