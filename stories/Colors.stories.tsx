import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "@/config/colors";

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
type Step = (typeof STEPS)[number];

type Scale = {
  name: string;
  steps: Record<Step, string>;
};

const s = (steps: Record<number, string>) => steps as Record<Step, string>;

const PALETTE: Scale[] = [
  { name: "Zinc",   steps: s(colors.zinc)   },
  { name: "Red",    steps: s(colors.red)    },
  { name: "Orange", steps: s(colors.orange) },
  { name: "Yellow", steps: s(colors.yellow) },
  { name: "Green",  steps: s(colors.green)  },
  { name: "Blue",   steps: s(colors.blue)   },
  { name: "Purple", steps: s(colors.purple) },
];

// ── Contrast utilities ────────────────────────────────────────────────────────

const toLinear = (c: number) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const contrastRatio = (bg: string, fg: string): number => {
  const l1 = luminance(bg);
  const l2 = luminance(fg);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
};

const ZINC_50  = "#fafafa";
const ZINC_950 = "#09090b";

const getTextColor = (bg: string): { hex: string; ratio: number } => {
  const onLight = contrastRatio(bg, ZINC_50);
  const onDark  = contrastRatio(bg, ZINC_950);
  return onLight >= onDark
    ? { hex: ZINC_50,  ratio: onLight }
    : { hex: ZINC_950, ratio: onDark  };
};

// ── Swatch ────────────────────────────────────────────────────────────────────

const SWATCH_W = 96;
const SWATCH_H = 120;

const Swatch = ({ scale, step }: { scale: Scale; step: Step }) => {
  const bg = scale.steps[step];
  const { hex: textColor, ratio } = getTextColor(bg);
  const passesAA = ratio >= 4.5;

  return (
    <div
      title={`${scale.name} ${step}: ${bg}`}
      style={{
        width: SWATCH_W,
        height: SWATCH_H,
        borderRadius: 6,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 4px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: textColor,
          opacity: 0.75,
          userSelect: "none",
        }}
      >
        {step}
      </span>

      <span
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: textColor,
          letterSpacing: "0.02em",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        {bg}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: textColor,
            opacity: 0.7,
            userSelect: "none",
          }}
        >
          {ratio.toFixed(2)}
        </span>
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 700,
            color: textColor,
            opacity: passesAA ? 1 : 0.45,
            userSelect: "none",
          }}
        >
          {passesAA ? "AA✓" : "AA✗"}
        </span>
      </div>
    </div>
  );
};

// ── Scale block ───────────────────────────────────────────────────────────────

const ColorScaleBlock = ({ scale }: { scale: Scale }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <h3
      style={{
        margin: 0,
        fontSize: 13,
        fontWeight: 600,
        color: "var(--zinc-50)",
        fontFamily: "sans-serif",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {scale.name}
    </h3>
    <div style={{ display: "flex", gap: 3 }}>
      {STEPS.map((step) => (
        <Swatch key={step} scale={scale} step={step} />
      ))}
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const BasePaletteView = () => (
  <div
    style={{
      background: "var(--zinc-800)",
      minHeight: "100vh",
      padding: "40px 48px",
      display: "flex",
      flexDirection: "column",
      gap: 28,
      fontFamily: "sans-serif",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--zinc-400)",
        }}
      >
        Design Tokens
      </p>
      <h1
        style={{
          margin: "4px 0 0",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--zinc-50)",
        }}
      >
        Color Scales
      </h1>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: 13,
          color: "var(--zinc-300)",
          maxWidth: 600,
        }}
      >
        Each swatch shows its hex value, WCAG contrast ratio against the
        auto-selected text color (zinc-50 or zinc-950), and AA pass/fail.
      </p>
    </div>

    {PALETTE.map((scale) => (
      <ColorScaleBlock key={scale.name} scale={scale} />
    ))}
  </div>
);

// ── Story ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "fullscreen",
    a11y: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Scales: Story = {
  render: () => <BasePaletteView />,
};
