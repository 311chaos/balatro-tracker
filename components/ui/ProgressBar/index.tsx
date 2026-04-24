"use client";

import { Progress } from "@base-ui/react/progress";
import { cn } from "@/lib/utils";

export const ProgressRoot = Progress.Root;

export const ProgressTrack = ({
  className,
  height = 8,
  ...props
}: Progress.Track.Props & { height?: number }) => (
  <Progress.Track
    className={cn("w-full rounded-full bg-zinc-800 overflow-hidden", className)}
    style={{ height }}
    {...props}
  />
);

export const ProgressIndicator = ({
  className,
  color = "var(--orange-500)",
  ...props
}: Progress.Indicator.Props & { color?: string }) => (
  <Progress.Indicator
    className={cn("h-full", className)}
    style={{ backgroundColor: color, transition: "var(--transition-progress)" }}
    {...props}
  />
);

type ProgressBarProps = {
  current: number;
  total: number;
  fillColor?: string;
  height?: number;
  "aria-label"?: string;
};

export const ProgressBar = ({
  current,
  total,
  fillColor = "var(--orange-500)",
  height = 8,
  "aria-label": ariaLabel = `${current} of ${total}`,
}: ProgressBarProps) => {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-zinc-100">
          {current} <span className="font-normal text-zinc-400">/ {total}</span>
        </span>
        <span className="text-base font-semibold text-zinc-400">{pct}%</span>
      </div>
      <ProgressRoot value={pct} className="w-full" aria-label={ariaLabel}>
        <ProgressTrack height={height}>
          <ProgressIndicator color={fillColor} />
        </ProgressTrack>
      </ProgressRoot>
    </div>
  );
};
