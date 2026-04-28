import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@/components/ui/Tag';
import { colors } from '@/config/colors';

const EXAMPLE_COLORS = [
  { hex: colors.zinc[400], label: 'zinc-400' },
  { hex: colors.red[400], label: 'red-400' },
  { hex: colors.orange[400], label: 'orange-400' },
  { hex: colors.yellow[500], label: 'yellow-500' },
  { hex: colors.green[400], label: 'green-400' },
  { hex: colors.blue[400], label: 'blue-400' },
  { hex: colors.purple[500], label: 'purple-500' },
];

const meta: Meta<typeof Tag> = {
  title: 'Base Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'color' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    active: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: {
    color: colors.purple[500],
    size: 'md',
    active: false,
    children: 'Label preview',
    onClick: () => {},
  },
};

export const Colors: Story = {
  args: {
    size: 'sm',
  },

  render: (args) => (
    <div>
      <div
        style={{
          padding: 32,
          borderRadius: 12,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          rowGap: 16,
        }}
      >
        {EXAMPLE_COLORS.flatMap(({ hex, label }) => [
          <Tag
            key={`${hex}-off`}
            color={hex}
            onClick={() => {}}
            size={args.size}
          >
            {label}
          </Tag>,
          <Tag
            key={`${hex}-on`}
            color={hex}
            active
            onClick={() => {}}
            size={args.size}
          >
            {label}
          </Tag>,
        ])}
      </div>
    </div>
  ),

  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
};

export const WithDelete: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: 32,
          borderRadius: 12,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <Tag color={colors.blue[400]} active onDelete={() => {}}>
          Uncommon
        </Tag>
        <Tag color={colors.red[400]} active onDelete={() => {}}>
          Rare
        </Tag>
        <Tag color={colors.purple[500]} active onDelete={() => {}}>
          Legendary
        </Tag>
        <Tag color={colors.zinc[400]} onDelete={() => {}}>
          Common
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: 32,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Tag size="sm" color={colors.purple[500]} active onClick={() => {}}>
          Small
        </Tag>
        <Tag size="md" color={colors.purple[500]} active onClick={() => {}}>
          Medium
        </Tag>
        <Tag size="lg" color={colors.purple[500]} active onClick={() => {}}>
          Large
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
};
