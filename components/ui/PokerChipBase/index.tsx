'use client';

type Props = {
  chipColor: string; // main body / center color
  ringColor: string; // dark rim and inner ring
  notch1Color: string; // cardinal notch marks: N, E, S, W
  notch2Color: string; // diagonal notch marks: NE, SE, SW, NW
  size?: number;
};

const BASE_SIZE = 200;
const RIM_RADIUS = 78; // px from center to middle of rim band
const NOTCH_W = 28; // notch width (perpendicular to radius)
const NOTCH_H = 36; // notch height (along radius, covers the rim band)
const INNER_RADIUS = 60; // inner circle radius
const INNER_BORDER = 6; // inner circle border thickness

// Gradient stops (radius = 100px)
const G_CENTER = 58; // chipColor 0 → here
const G_RING_END = 66; // ringColor inner band → here
const G_RIM_END = 88; // chipColor rim → here, then ringColor to 100px edge

// 8 notch positions: alternating cardinal (notch1) and diagonal (notch2)
const NOTCH_ANGLES: { angle: number; cardinal: boolean }[] = [
  { angle: 0, cardinal: true }, // N
  { angle: 45, cardinal: false }, // NE
  { angle: 90, cardinal: true }, // E
  { angle: 135, cardinal: false }, // SE
  { angle: 180, cardinal: true }, // S
  { angle: 225, cardinal: false }, // SW
  { angle: 270, cardinal: true }, // W
  { angle: 315, cardinal: false }, // NW
];

export const PokerChipBase = ({
  chipColor,
  ringColor,
  notch1Color,
  notch2Color,
  size = 40,
}: Props) => {
  const scale = size / BASE_SIZE;

  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          position: 'relative',
          width: BASE_SIZE,
          height: BASE_SIZE,
          borderRadius: '50%',
          background: `radial-gradient(circle,
            ${chipColor} ${G_CENTER}px,
            ${ringColor} ${G_CENTER}px ${G_RING_END}px,
            ${chipColor} ${G_RING_END}px ${G_RIM_END}px,
            ${ringColor} ${G_RIM_END}px
          )`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* 8 notch marks positioned individually in the rim band */}
        {NOTCH_ANGLES.map(({ angle, cardinal }) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const cx = BASE_SIZE / 2 + RIM_RADIUS * Math.cos(rad);
          const cy = BASE_SIZE / 2 + RIM_RADIUS * Math.sin(rad);
          return (
            <div
              key={angle}
              style={{
                position: 'absolute',
                width: NOTCH_W,
                height: NOTCH_H,
                background: cardinal ? notch1Color : notch2Color,
                left: cx - NOTCH_W / 2,
                top: cy - NOTCH_H / 2,
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}

        {/* Inner circle: covers center, provides inner ring border */}
        <div
          style={{
            position: 'absolute',
            width: INNER_RADIUS * 2,
            height: INNER_RADIUS * 2,
            background: chipColor,
            border: `${INNER_BORDER}px solid ${ringColor}`,
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
          }}
        />

        {/* Gloss overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at 35% 30%,
              rgba(255,255,255,0.18) 0%,
              transparent 60%
            ), linear-gradient(to bottom,
              rgba(255,255,255,0.04) 0%,
              rgba(0,0,0,0.28) 100%
            )`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
