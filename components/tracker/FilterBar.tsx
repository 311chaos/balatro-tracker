'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { RARITIES, type RarityType } from '@/config/types';

const RARITY_LABELS: Record<RarityType, string> = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
};
const RARITY_COLORS: Record<RarityType, string> = {
  COMMON: 'var(--zinc-400)',
  UNCOMMON: 'var(--blue-500)',
  RARE: 'var(--red-500)',
  LEGENDARY: 'var(--yellow-500)',
};

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'missing', label: 'Missing' },
  { value: 'collected', label: 'Collected' },
] as const;

type Status = 'all' | 'missing' | 'collected';

export type FilterState = {
  q: string;
  rarities: RarityType[];
  status: Status;
};

export const parseFilters = (params: URLSearchParams): FilterState => {
  const q = params.get('q') ?? '';
  const rarityParam = params.get('rarity');
  const rarities = rarityParam
    ? (rarityParam
        .split(',')
        .filter((r) => RARITIES.includes(r as RarityType)) as RarityType[])
    : [];
  const statusParam = params.get('status');
  const status: Status =
    statusParam === 'missing' || statusParam === 'collected'
      ? statusParam
      : 'all';
  return { q, rarities, status };
};

export const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { q: urlQ, rarities, status } = parseFilters(searchParams);

  const [inputValue, setInputValue] = useState(urlQ);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFocused = useRef(false);

  // Keep local input in sync if URL changes externally (e.g. back/forward)
  useEffect(() => {
    if (!isFocused.current) setInputValue(urlQ);
  }, [urlQ]);

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === '') {
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
      update('q', value || null);
    }, 300);
  };

  const toggleRarityType = (rarity: RarityType) => {
    const next = rarities.includes(rarity)
      ? rarities.filter((r) => r !== rarity)
      : [...rarities, rarity];
    update('rarity', next.length > 0 ? next.join(',') : null);
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-xl bg-zinc-950 p-4"
      style={{ border: '2px solid var(--orange-500)' }}
    >
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
        }}
        placeholder="Search jokers…"
        size="lg"
        clearable={true}
        autoComplete="off"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-balatro text-base font-semibold tracking-wide text-zinc-400 uppercase">
          Rarity:
        </span>
        <button
          onClick={() => update('rarity', null)}
          className="font-balatro cursor-pointer rounded-full border px-3 py-1 text-sm font-medium tracking-widest transition-colors"
          style={{
            borderColor:
              rarities.length === 0 ? 'var(--orange-500)' : 'var(--zinc-600)',
            color:
              rarities.length === 0 ? 'var(--zinc-950)' : 'var(--zinc-400)',
            backgroundColor:
              rarities.length === 0 ? 'var(--orange-500)' : 'transparent',
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
              className="font-balatro cursor-pointer rounded-full border px-3 py-1 text-sm font-medium tracking-widest transition-colors"
              style={{
                borderColor: RARITY_COLORS[rarity],
                color: active ? 'var(--zinc-950)' : RARITY_COLORS[rarity],
                backgroundColor: active ? RARITY_COLORS[rarity] : 'transparent',
              }}
            >
              {RARITY_LABELS[rarity]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-balatro text-base font-semibold tracking-wide text-zinc-400 uppercase">
          Status:
        </span>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => update('status', value === 'all' ? null : value)}
            className="font-balatro cursor-pointer rounded-full border px-3 py-1 text-sm font-medium tracking-widest transition-colors"
            style={{
              borderColor:
                status === value ? 'var(--orange-500)' : 'var(--zinc-600)',
              color: status === value ? 'var(--zinc-950)' : 'var(--zinc-400)',
              backgroundColor:
                status === value ? 'var(--orange-500)' : 'transparent',
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
