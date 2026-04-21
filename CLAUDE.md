@AGENTS.md

# Balatro Gold Sticker Tracker

A web app for tracking which Balatro collectibles the user has earned a **gold sticker** on. Config-driven item data, filterable grid, live progress bar. localStorage-first — no account required. Optional sign-in enables cross-device sync via Postgres.

> Full plan, data model, route map, and build phase checklist: `PLAN.md`

---

## Domain vocabulary

- **Joker** — one of ~150 collectible cards, each with a rarity and a sprite offset
- **Rarity** — `COMMON` | `UNCOMMON` | `RARE` | `LEGENDARY` — drives UI colour
- **Stake / Sticker level** — difficulty tiers ordered `WHITE → RED → GREEN → BLACK → BLUE → PURPLE → ORANGE → GOLD`. Gold sticker = highest achievement per joker.
- **Collectibles** — V1 tracks jokers only. Future: tarots, vouchers, planet cards (all binary unlocked/not, no sticker levels).

---

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js App Router | |
| Styling | Tailwind v4 + shadcn/ui | Base UI primitives, CVA for variants |
| Auth | Auth.js v5 | Magic link via Resend — **optional for users** |
| Database | Neon (Postgres) + Prisma ORM | |
| Hosting | Vercel | **Set spending limit before production** |
| Item images | CSS sprite sheet via jsDelivr | Always use `2x` version |

---

## Build status

| Phase | Status |
|---|---|
| Foundation — Next.js scaffold, DB schema, Auth.js wiring | ✅ Done |
| Auth — magic link flow, sign-in modal, user menu | ✅ Done |
| Static UI — Button, Navbar, PokerChip, FilterBar, ProgressBar | 🔄 In progress |
| Live data — localStorage + DB sync, Server Actions | ⬜ Not started |
| Deploy | ⬜ Not started |

---

## Key architecture decisions

- **localStorage-first**: anonymous progress lives in localStorage. DB sync only fires when signed in. No auth gate on any `/tracker` route.
- **Config-driven items**: all item definitions (`id`, `name`, `rarity`, `spriteX`, `spriteY`) are static TypeScript in `config/`. No CMS or DB reads for item data.
- **Sprite sheets**: item images are a single CDN-hosted PNG per category. `spriteX`/`spriteY` are pixel offsets into the `2x` sheet.
  - Jokers: `https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/Jokers.png`
  - Tarots: `.../2x/Tarots.png` — Vouchers: `.../2x/Vouchers.png` — Planets: `.../2x/boosters.png`
- **Separate progress tables per category**: jokers track `StickerLevel` (enum); other categories are binary (row presence = unlocked). Avoids nullable columns that only apply to one type.
