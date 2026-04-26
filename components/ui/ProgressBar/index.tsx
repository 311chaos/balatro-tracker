'use client';

import { Progress } from '@base-ui/react/progress';
import { cn } from '@/lib/utils';

export const ProgressRoot = Progress.Root;

export const ProgressTrack = ({
  className,
  height = 8,
  ...props
}: Progress.Track.Props & { height?: number }) => (
  <Progress.Track
    className={cn('w-full overflow-hidden rounded-full bg-zinc-800', className)}
    style={{ height }}
    {...props}
  />
);

export const ProgressIndicator = ({
  className,
  from = 'var(--yellow-400)',
  to = 'var(--orange-500)',
  ...props
}: Progress.Indicator.Props & { from?: string; to?: string }) => (
  <Progress.Indicator
    className={cn('h-full', className)}
    style={{
      background: `linear-gradient(to right, ${from}, ${to})`,
      transition: 'var(--transition-progress)',
    }}
    {...props}
  />
);

type ProgressBarProps = {
  current: number;
  total: number;
  from?: string;
  to?: string;
  height?: number;
  'aria-label'?: string;
};

export const ProgressBar = ({
  current,
  total,
  from = 'var(--yellow-400)',
  to = 'var(--orange-500)',
  height = 8,
  'aria-label': ariaLabel = `${current} of ${total}`,
}: ProgressBarProps) => {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-zinc-100">
          {current} <span className="font-normal text-zinc-400">/ {total}</span>
        </span>
        <span className="text-base font-semibold text-zinc-400">{pct}%</span>
      </div>
      <ProgressRoot value={pct} className="w-full" aria-label={ariaLabel}>
        <ProgressTrack height={height}>
          <ProgressIndicator from={from} to={to} />
        </ProgressTrack>
      </ProgressRoot>
    </div>
  );
};
