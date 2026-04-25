import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { JokerCard } from '@/components/ui/JokerCard';
import { JOKERS } from '@/config/jokers';
import { STICKER_LEVELS, type StickerLevel } from '@/config/types';

const jokerOptions = Object.fromEntries(JOKERS.map((j) => [j.name, j]));

const meta: Meta<typeof JokerCard> = {
  title: 'UI/JokerCard',
  component: JokerCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex gap-4 rounded-xl bg-zinc-950 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    joker: {
      control: 'select',
      options: Object.keys(jokerOptions),
      mapping: jokerOptions,
    },
    stickerLevel: {
      control: 'select',
      options: [null, ...STICKER_LEVELS],
    },
    onToggle: { action: 'toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof JokerCard>;

export const Playground: Story = {
  args: {
    joker: JOKERS[0],
    stickerLevel: null,
  },
};

export const Unstickered: Story = {
  args: {
    joker: JOKERS[0],
    stickerLevel: null,
    onToggle: () => {},
  },
};

export const GoldSticker: Story = {
  args: {
    joker: JOKERS[0],
    stickerLevel: 'GOLD',
    onToggle: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [level, setLevel] = useState<StickerLevel | null>(null);
    return (
      <JokerCard joker={JOKERS[0]} stickerLevel={level} onToggle={setLevel} />
    );
  },
};

export const AllRarities: Story = {
  render: () => {
    const samples = [
      JOKERS.find((j) => j.rarity === 'COMMON')!,
      JOKERS.find((j) => j.rarity === 'UNCOMMON')!,
      JOKERS.find((j) => j.rarity === 'RARE')!,
      JOKERS.find((j) => j.rarity === 'LEGENDARY')!,
    ];
    const [levels, setLevels] = useState<(StickerLevel | null)[]>([
      null,
      null,
      'GOLD',
      'GOLD',
    ]);
    return (
      <div className="flex gap-4">
        {samples.map((joker, i) => (
          <JokerCard
            key={joker.id}
            joker={joker}
            stickerLevel={levels[i]}
            onToggle={(l) =>
              setLevels((prev) => prev.map((v, idx) => (idx === i ? l : v)))
            }
          />
        ))}
      </div>
    );
  },
};
