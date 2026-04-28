'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';
import { colors } from '@/config/colors';
import { RARITIES, type RarityType } from '@/config/types';
import { RARITY_COLORS, RARITY_LABELS } from '@/lib/colors';

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
        <Tag
          color={colors.orange[500]}
          active={rarities.length === 0}
          onClick={() => update('rarity', null)}
        >
          All
        </Tag>
        {RARITIES.map((rarity) => (
          <Tag
            key={rarity}
            color={RARITY_COLORS[rarity]}
            active={rarities.includes(rarity)}
            onClick={() => toggleRarityType(rarity)}
          >
            {RARITY_LABELS[rarity]}
          </Tag>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-balatro text-base font-semibold tracking-wide text-zinc-400 uppercase">
          Status:
        </span>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <Tag
            key={value}
            color={colors.orange[500]}
            active={status === value}
            onClick={() => update('status', value === 'all' ? null : value)}
          >
            {label}
          </Tag>
        ))}
      </div>
    </div>
  );
};
