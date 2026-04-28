'use client';

import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hexToRgb, rgbToHsl, rgbToLuminance } from '@/lib/colors';
import styles from './Tag.module.css';

export type TagSize = 'sm' | 'md' | 'lg';

const tagVariants = cva(
  [
    'inline-flex items-center rounded-full relative',
    'outline-none select-none whitespace-nowrap',
    'font-balatro font-medium tracking-widest leading-none',
    'transition-[background-color,box-shadow,border-color,color,filter] duration-120 ease-linear',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'pl-2.5 py-0.5 text-xs gap-1',
        md: 'pl-3 py-1 text-sm gap-1',
        lg: 'pl-4 py-1.5 text-base gap-1.5',
      },
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      deletable: { true: '', false: '' },
    },
    compoundVariants: [
      { size: 'sm', deletable: false, className: 'pr-2.5' },
      { size: 'md', deletable: false, className: 'pr-3' },
      { size: 'lg', deletable: false, className: 'pr-4' },
      { size: 'sm', deletable: true, className: 'pr-6' },
      { size: 'md', deletable: true, className: 'pr-6' },
      { size: 'lg', deletable: true, className: 'pr-7' },
    ],
    defaultVariants: { size: 'md', interactive: false, deletable: false },
  },
);

const DELETE_ICON_SIZE: Record<TagSize, number> = { sm: 10, md: 12, lg: 14 };

// ─── Types ────────────────────────────────────────────────────────────────────
export type TagProps = {
  color: string;
  surface?: string;
  size?: TagSize;
  active?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
  children: React.ReactNode;
};

// ─── Component ───────────────────────────────────────────────────────────────
export const Tag = ({
  color,
  surface,
  size = 'md',
  active = false,
  className,
  children,
  onClick,
  onDelete,
}: TagProps) => {
  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);
  const lum = rgbToLuminance(r, g, b);

  const colorVars = {
    '--v2-r': r,
    '--v2-g': g,
    '--v2-b': b,
    '--v2-h': h,
    '--v2-s': s,
    '--v2-l': l,
    '--v2-lum': lum,
    ...(surface !== undefined ? { '--v2-surface': surface } : {}),
  } as React.CSSProperties;

  const tagClass = cn(
    styles.tag,
    tagVariants({
      size,
      interactive: !!onClick && onDelete === undefined,
      deletable: onDelete !== undefined,
    }),
    className,
  );

  const nudge = 'translate-y-px';
  const iconSize = DELETE_ICON_SIZE[size ?? 'md'];

  if (onDelete !== undefined) {
    return (
      <span data-active={active} className={tagClass} style={colorVars}>
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
              'inline-flex cursor-pointer items-center border-none bg-transparent p-0 font-[inherit] tracking-[inherit] text-current outline-none',
              nudge,
            )}
          >
            {children}
          </button>
        ) : (
          <span className={nudge}>{children}</span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={
            typeof children === 'string' ? `Remove ${children}` : 'Remove'
          }
          className="pseudo-hover:bg-[color-mix(in_oklch,currentColor_18%,transparent)] pseudo-focus-visible:ring-1 pseudo-focus-visible:ring-current absolute right-1 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-1 text-current transition-[background-color] duration-100 outline-none"
        >
          <X size={iconSize} strokeWidth={2.5} />
        </button>
      </span>
    );
  }

  // Toggle tag.
  if (onClick) {
    return (
      <button
        aria-pressed={active}
        data-active={active}
        onClick={onClick}
        className={tagClass}
        style={colorVars}
      >
        <span className={nudge}>{children}</span>
      </button>
    );
  }

  // Display badge — non-interactive.
  return (
    <span data-active={active} className={tagClass} style={colorVars}>
      <span className={nudge}>{children}</span>
    </span>
  );
};
