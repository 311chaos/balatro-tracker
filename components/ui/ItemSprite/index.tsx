'use client';

type SpriteLayer = { spriteX: number; spriteY: number; scale?: number };

import type { JokerId } from '@/config/jokers';

type Props = {
  spriteX: number;
  spriteY: number;
  additionalLayers?: SpriteLayer[];
  sheetUrl: string;
  name: JokerId;
  size?: number;
};

const SPRITE_W = 142;
const SPRITE_H = 190;

const SpriteDiv = ({
  spriteX,
  spriteY,
  sheetUrl,
  scale,
  position,
  layerScale = 1,
}: Omit<SpriteLayer, 'scale'> & {
  sheetUrl: string;
  scale: number;
  position: 'relative' | 'absolute';
  layerScale?: number;
}) => {
  const effectiveScale = scale * layerScale;
  const left = layerScale !== 1 ? (SPRITE_W * scale * (1 - layerScale)) / 2 : 0;
  const top = layerScale !== 1 ? (SPRITE_H * scale * (1 - layerScale)) / 2 : 0;

  return (
    <div
      style={{
        position,
        top,
        left,
        width: SPRITE_W,
        height: SPRITE_H,
        backgroundImage: `url(${sheetUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${-(spriteX * 2)}px ${-(spriteY * 2)}px`,
        imageRendering: 'pixelated',
        transform: `scale(${effectiveScale})`,
        transformOrigin: 'top left',
      }}
    />
  );
};

export const ItemSprite = ({
  spriteX,
  spriteY,
  additionalLayers,
  sheetUrl,
  name,
  size = 71,
}: Props) => {
  const scale = size / SPRITE_W;

  return (
    <div
      style={{
        width: size,
        height: Math.round(SPRITE_H * scale),
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
      title={name}
    >
      <SpriteDiv
        spriteX={spriteX}
        spriteY={spriteY}
        sheetUrl={sheetUrl}
        scale={scale}
        position="relative"
      />
      {additionalLayers?.map((layer, i) => (
        <SpriteDiv
          key={i}
          spriteX={layer.spriteX}
          spriteY={layer.spriteY}
          sheetUrl={sheetUrl}
          scale={scale}
          position="absolute"
          layerScale={layer.scale ?? 1}
        />
      ))}
    </div>
  );
};
