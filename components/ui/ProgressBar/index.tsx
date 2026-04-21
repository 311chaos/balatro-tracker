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
  color = "var(--stake-gold)",
  ...props
}: Progress.Indicator.Props & { color?: string }) => (
  <Progress.Indicator
    className={cn("h-full transition-all duration-300", className)}
    style={{ backgroundColor: color }}
    {...props}
  />
);

type ProgressBarProps = {
  current: number;
  total: number;
  fillColor?: string;
  height?: number;
};

export const ProgressBar = ({
  current,
  total,
  fillColor = "var(--stake-gold)",
  height = 8,
}: ProgressBarProps) => {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-zinc-100">
          {current}{" "}
          <span className="font-normal text-zinc-400">/ {total}</span>
        </span>
        <span className="text-sm font-semibold text-zinc-400">{pct}%</span>
      </div>
      <ProgressRoot value={pct} className="w-full">
        <ProgressTrack height={height}>
          <ProgressIndicator color={fillColor} />
        </ProgressTrack>
      </ProgressRoot>
    </div>
  );
};
