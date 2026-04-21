"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { RARITIES, type RarityType } from "@/config/types";

const RARITY_LABELS: Record<RarityType, string> = {
  COMMON: "Common",
  UNCOMMON: "Uncommon",
  RARE: "Rare",
  LEGENDARY: "Legendary",
};
const RARITY_COLORS: Record<RarityType, string> = {
  COMMON: "var(--rarity-common)",
  UNCOMMON: "var(--rarity-uncommon)",
  RARE: "var(--rarity-rare)",
  LEGENDARY: "var(--rarity-legendary)",
};

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "missing", label: "Missing" },
  { value: "collected", label: "Collected" },
] as const;

type Status = "all" | "missing" | "collected";

export type FilterState = {
  q: string;
  rarities: RarityType[];
  status: Status;
};

export const parseFilters = (params: URLSearchParams): FilterState => {
  const q = params.get("q") ?? "";
  const rarityParam = params.get("rarity");
  const rarities = rarityParam
    ? (rarityParam
        .split(",")
        .filter((r) => RARITIES.includes(r as RarityType)) as RarityType[])
    : [];
  const statusParam = params.get("status");
  const status: Status =
    statusParam === "missing" || statusParam === "collected"
      ? statusParam
      : "all";
  return { q, rarities, status };
};

export const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { q: urlQ, rarities, status } = parseFilters(searchParams);

  const [inputValue, setInputValue] = useState(urlQ);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local input in sync if URL changes externally (e.g. back/forward)
  useEffect(() => {
    setInputValue(urlQ);
  }, [urlQ]);

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      update("q", value || null);
    }, 300);
  };

  const toggleRarityType = (rarity: RarityType) => {
    const next = rarities.includes(rarity)
      ? rarities.filter((r) => r !== rarity)
      : [...rarities, rarity];
    update("rarity", next.length > 0 ? next.join(",") : null);
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-xl bg-zinc-950 p-4"
      style={{ border: "2px solid var(--stake-gold)" }}
    >
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search jokers…"
        size="lg"
        clearable={true}
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-s font-semibold uppercase tracking-wide text-zinc-500 font-balatro">
          Rarity:
        </span>
        <button
          onClick={() => update("rarity", null)}
          className="rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer font-balatro"
          style={{
            borderColor:
              rarities.length === 0 ? "var(--stake-gold)" : "#52525b",
            color: rarities.length === 0 ? "#09090b" : "#a1a1aa",
            backgroundColor:
              rarities.length === 0 ? "var(--stake-gold)" : "transparent",
          }}
        >
          All
        </button>
        {RARITIES.map((rarity) => {
          const active = rarities.includes(rarity);
          return (
            <button
              key={rarity}
              onClick={() => toggleRarityType(rarity)}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer font-balatro"
              style={{
                borderColor: RARITY_COLORS[rarity],
                color: active ? "#09090b" : RARITY_COLORS[rarity],
                backgroundColor: active ? RARITY_COLORS[rarity] : "transparent",
              }}
            >
              {RARITY_LABELS[rarity]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-s font-semibold uppercase tracking-wide text-zinc-500 font-balatro">
          Status:
        </span>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => update("status", value === "all" ? null : value)}
            className="rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer font-balatro"
            style={{
              borderColor: status === value ? "var(--stake-gold)" : "#52525b",
              color: status === value ? "#09090b" : "#a1a1aa",
              backgroundColor:
                status === value ? "var(--stake-gold)" : "transparent",
            }}
            data-active={status === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
