"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JokerCard } from "@/components/ui/JokerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FilterBar, parseFilters } from "@/components/tracker/FilterBar";
import {
  upsertJokerProgress,
  deleteJokerProgress,
} from "@/lib/actions/jokerProgress";
import { JOKERS } from "@/config/jokers";
import type { StickerLevel } from "@/config/types";

const STORAGE_KEY = "balatro-joker-progress";

type Progress = Record<string, StickerLevel>;

const loadProgress = (): Progress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveProgress = (progress: Progress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const trackable = JOKERS.filter(
  (j): j is Extract<(typeof JOKERS)[number], { jokerNumber: number }> =>
    "jokerNumber" in j,
);

type Props = {
  initialProgress: Progress;
  isAuthenticated: boolean;
};

const JokerListInner = ({ initialProgress, isAuthenticated }: Props) => {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const { q, rarities, status } = parseFilters(searchParams);

  useEffect(() => {
    if (!isAuthenticated) {
      setProgress(loadProgress());
    }
    setMounted(true);
  }, [isAuthenticated]);

  const handleToggle = (jokerId: string, level: StickerLevel | null) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (level === null) {
        delete next[jokerId];
      } else {
        next[jokerId] = level;
      }
      saveProgress(next);
      return next;
    });

    if (isAuthenticated) {
      if (level === null) {
        deleteJokerProgress(jokerId);
      } else {
        upsertJokerProgress(jokerId, level);
      }
    }
  };

  const filtered = trackable.filter((joker) => {
    if (q && !joker.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (rarities.length > 0 && !rarities.includes(joker.rarity)) return false;
    const collected = Boolean(progress[joker.id]);
    if (status === "collected" && !collected) return false;
    if (status === "missing" && collected) return false;
    return true;
  });

  const stickered = trackable.filter((j) => progress[j.id]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <ProgressBar
        current={stickered.length}
        total={trackable.length}
        height={18}
      />
      <FilterBar />
      <div className="felt-bg rounded-xl p-4">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          }}
        >
          {filtered.map((joker) => (
            <JokerCard
              key={joker.id}
              joker={joker}
              stickerLevel={progress[joker.id] ?? null}
              onToggle={(level) => handleToggle(joker.id, level)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-white py-16 font-bold text-lg font-balatro tracking-wide">
            No jokers match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export const JokerList = ({ initialProgress, isAuthenticated }: Props) => {
  return (
    <Suspense>
      <JokerListInner
        initialProgress={initialProgress}
        isAuthenticated={isAuthenticated}
      />
    </Suspense>
  );
};
