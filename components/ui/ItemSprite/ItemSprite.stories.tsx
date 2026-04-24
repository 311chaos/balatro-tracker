import type { Meta, StoryObj } from "@storybook/react";
import { ItemSprite } from "@/components/ui/ItemSprite";
import { JOKERS, JOKER_SHEET_URL, type JokerId } from "@/config/jokers";

const JOKER_IDS = JOKERS.map((j) => j.id) as JokerId[];
const JOKER_BY_ID = Object.fromEntries(JOKERS.map((j) => [j.id, j])) as Record<
  JokerId,
  (typeof JOKERS)[number]
>;

const meta: Meta<{ jokerId: JokerId; size: number }> = {
  title: "UI/ItemSprite",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    jokerId: { control: "select", options: JOKER_IDS },
    size: { control: { type: "range", min: 20, max: 200, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { jokerId: "JOKER", size: 71 },
  render: ({ jokerId, size }) => {
    const joker = JOKER_BY_ID[jokerId];
    return (
      <ItemSprite
        spriteX={joker.spriteX}
        spriteY={joker.spriteY}
        additionalLayers={
          "additionalLayers" in joker ? joker.additionalLayers : undefined
        }
        sheetUrl={JOKER_SHEET_URL}
        name={joker.id}
        size={size}
      />
    );
  },
};

export const AllJokers: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        padding: 24,
        background: "var(--zinc-950)",
        borderRadius: 12,
        maxWidth: 900,
      }}
    >
      {JOKERS.map((joker) => (
        <div
          key={joker.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
          title={joker.id}
        >
          <ItemSprite
            spriteX={joker.spriteX}
            spriteY={joker.spriteY}
            additionalLayers={
              "additionalLayers" in joker ? joker.additionalLayers : undefined
            }
            sheetUrl={JOKER_SHEET_URL}
            name={joker.id}
            size={48}
          />
          <span
            style={{
              color: "#fff",
              fontSize: 9,
              fontFamily: "monospace",
              maxWidth: 48,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {joker.name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 24,
        padding: 24,
        background: "var(--zinc-950)",
        borderRadius: 12,
      }}
    >
      {[32, 48, 71, 100, 142].map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ItemSprite
            spriteX={0}
            spriteY={0}
            sheetUrl={JOKER_SHEET_URL}
            name="JOKER"
            size={size}
          />
          <span style={{ color: "#fff", fontSize: 10 }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
