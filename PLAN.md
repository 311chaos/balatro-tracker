# Balatro Gold Sticker Tracker — Project Plan

## Overview

A web app for tracking which Balatro collectibles you have earned a gold sticker on. Starts with jokers, but is structured to incrementally support other item categories (tarots, vouchers, planet cards). Features a filterable item grid, live progress bar, and **localStorage-first persistence** — no account required. Signing in is optional and enables cross-device sync by storing progress in the database.

---

## Tech Stack

| Concern      | Decision                 | Notes                                                            |
| ------------ | ------------------------ | ---------------------------------------------------------------- |
| Framework    | Next.js (App Router)     | Full SSR/SSG support, file-based routing                         |
| Styling      | Tailwind CSS + shadcn/ui | SSR-compatible, no runtime cost, great DX                        |
| Auth         | Auth.js v5               | Magic link via email, Prisma adapter — **optional for users**    |
| Email        | Resend                   | Free tier (3k/month), first-class Auth.js integration            |
| Database     | Postgres via Neon        | Free tier, serverless, Vercel-native                             |
| ORM          | Prisma                   | Type-safe queries, easy migrations                               |
| Hosting      | Vercel                   | Free hobby tier — **set spending limits before launch**          |
| Joker images | jsDelivr (GitHub CDN)    | Sprite sheet from `Signez/balatro-sprites-i18n`, always use `2x` |
| Joker data   | Config-driven JSON       | Manually updated for DLC/patches                                 |

---

## Vercel Spending Limit Reminder

> **Before deploying to production:** Go to Vercel project settings → Billing → set a hard spend limit.
> This prevents unexpected charges if the app is ever hit with unusual traffic.

---

## Data Model

Each collectible category gets its own progress table because the tracked data differs:

- **Jokers** have a sticker level (tied to stake difficulty) that may be incrementally tracked
- **Other items** (tarots, vouchers, planets) are binary — unlocked or not

This avoids nullable columns that only apply to one category and keeps each table self-documenting. Adding a new category is a small migration (one new table), not a schema redesign.

```prisma
// Standard Auth.js Prisma adapter tables (auto-generated)
model User {
  id                  String    @id @default(cuid())
  email               String    @unique
  emailVerified       DateTime?
  accounts            Account[]
  sessions            Session[]
  jokerProgress       UserJokerProgress[]
  tarotProgress       UserTarotProgress[]
  voucherProgress     UserVoucherProgress[]
  planetProgress      UserPlanetProgress[]
}

model Account { ... }   // Auth.js managed
model Session { ... }   // Auth.js managed
model VerificationToken { ... }  // Auth.js managed

// Jokers — tracks sticker level earned (corresponds to stake difficulty, lowest to highest)
enum StickerLevel {
  WHITE
  RED
  GREEN
  BLACK
  BLUE
  PURPLE
  ORANGE
  GOLD
}

model UserJokerProgress {
  id           String       @id @default(cuid())
  userId       String
  jokerId      String       // matches `id` in jokers config
  stickerLevel StickerLevel // highest level earned
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, jokerId])
}

// Other categories — binary unlocked/not (row presence = unlocked)
model UserTarotProgress {
  id        String   @id @default(cuid())
  userId    String
  tarotId   String   // matches `id` in tarots config
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, tarotId])
}

model UserVoucherProgress {
  id        String   @id @default(cuid())
  userId    String
  voucherId String
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, voucherId])
}

model UserPlanetProgress {
  id        String   @id @default(cuid())
  userId    String
  planetId  String
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, planetId])
}
```

> V1 only implements `UserJokerProgress`. The other tables are defined upfront so the initial migration covers the full intended schema — avoids a breaking migration later when adding categories.

---

## Item Config Structure

All item definitions live in static TypeScript config files under `config/`. The `spriteX` and `spriteY` values are pixel offsets into the relevant 2x sprite sheet. A shared base type keeps the `ItemSprite` component generic.

```ts
// config/types.ts

// Ordered lowest → highest stake
export type StickerLevel =
  | "WHITE"
  | "RED"
  | "GREEN"
  | "BLACK"
  | "BLUE"
  | "PURPLE"
  | "ORANGE"
  | "GOLD";
export type Rarity = "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";

// Shared by all item types — used by generic components
export type CollectibleItem = {
  id: string;
  name: string;
  spriteX: number;
  spriteY: number;
};

// Jokers extend the base with rarity (for filtering) and support sticker levels
export type Joker = CollectibleItem & {
  rarity: Rarity;
};

// Other categories are just the base shape — no rarity, no levels
export type TarotCard = CollectibleItem;
export type Voucher = CollectibleItem;
export type PlanetCard = CollectibleItem;
```

```ts
// config/jokers.ts
export const JOKERS: Joker[] = [
  { id: "joker", name: "Joker", rarity: "COMMON", spriteX: 0, spriteY: 0 },
  { id: "greedy", name: "Greedy Joker", rarity: "COMMON", spriteX: 71, spriteY: 0 },
  // ... all ~150 jokers
];
```

**Sprite sheet URLs** (all from the same repo, all use `2x`):

```
Jokers:   https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/Jokers.png
Tarots:   https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/Tarots.png
Vouchers: https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/Vouchers.png
Planets:  https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/boosters.png
```

**Sticker/stake badge component:**

`PokerChip` / `PokerChipBase` — pure CSS poker chips, no image assets needed.
- `PokerChipBase` — low-level: accepts raw `chipColor`, `ringColor`, `notch1Color`, `notch2Color`, `size` props
- `PokerChip` — convenience wrapper: accepts `variant: StickerLevel` + `size`, maps to colors automatically

> When adding DLC content, add new entries to the relevant config file and confirm sprite offsets from the 2x sheet. No DB migration required.

---

## App Routes

```
/                          → Landing page: "Start Tracking" CTA + optional sign-in link
/verify                    → "Check your email" confirmation screen (post magic-link send)
/tracker                   → Overview: progress summary across all categories (public)
/tracker/jokers            → Joker tracker — filterable grid with sticker levels (V1)
/tracker/tarots            → Tarot tracker (future)
/tracker/vouchers          → Voucher tracker (future)
/tracker/planets           → Planet tracker (future)
/api/auth/[...nextauth]    → Auth.js catch-all route
```

> All `/tracker` routes are **public** — no auth required. Auth is opt-in for cross-device sync.
> V1 only builds `/tracker/jokers`. The `/tracker` overview can start as a redirect to `/tracker/jokers`.

---

## Page: `/tracker/jokers`

This is the core of the app. The page is fully client-rendered for interactive filtering.

### Data flow

1. `TrackerClient` mounts and reads progress from **localStorage** (key: `joker-progress`)
2. If the user is signed in, progress is fetched from the DB and merged/synced with localStorage
3. All mutations write to localStorage immediately (optimistic); if signed in, also fire a Server Action to persist to DB
4. When a signed-in user first visits, if localStorage has data and DB is empty, prompt to import local progress into their account

### UI Layout

```
┌─────────────────────────────────────────────────────┐
│  Balatro Gold Sticker Tracker     [Sign in to sync] │  ← or [user@email.com  Sign out]
├─────────────────────────────────────────────────────┤
│  Progress: ████████████░░░░░░░  47 / 150  (31%)     │  ← updates with filters
├─────────────────────────────────────────────────────┤
│  [Search by name...]  [Rarity ▾]  [Show: All ▾]    │
├─────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ 🃏   │ │ 🃏   │ │ 🃏   │ │ 🃏   │ │ 🃏   │     │
│  │Joker │ │Greedy│ │Lusty │ │Wrathf│ │Glutto│     │
│  │Common│ │Common│ │Common│ │Common│ │Common│     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│            ...                                      │
└─────────────────────────────────────────────────────┘
```

### Filter behavior

- Rarity filter: multi-select pill buttons (COMMON / UNCOMMON / RARE / LEGENDARY) ✅
- Completion toggle: All / Collected / Missing ✅
- Name search: debounced client-side substring match ✅
- Sticker level filter (by stake tier) — **not yet implemented**
- Progress bar — currently shows global totals; spec calls for reflecting visible jokers only — **not yet implemented**

### Toggling a joker

- Clicking a joker card immediately updates localStorage
- If signed in, also fires a **Server Action** to persist to DB
- No loading state needed — localStorage write is synchronous

---

## Key Components

```
app/
  page.tsx                        ← Landing page: CTA + optional sign-in
  verify/page.tsx                 ← "Check your email" screen
  tracker/
    page.tsx                      ← Redirect to /tracker/jokers (V1)
    jokers/
      page.tsx                    ← Server component: passes session to TrackerClient
      actions.ts                  ← Server Actions: set/update joker sticker level (auth-gated)
    tarots/                       ← Future
    vouchers/                     ← Future
    planets/                      ← Future
components/
  tracker/
    TrackerClient.tsx             ← Client component: owns localStorage state + filter state
    ItemGrid.tsx                  ← Renders filtered list of ItemCard (generic)
    ItemCard.tsx                  ← Single item: sprite + name + completion state (generic)
    ItemSprite.tsx                ← CSS sprite positioning (generic — takes spriteX/Y + sheetUrl)
    ProgressBar.tsx               ← Progress bar + fraction display
    FilterBar.tsx                 ← Name search + completion toggle (generic)
    jokers/
      JokerFilterBar.tsx          ← Extends FilterBar with rarity + sticker level filters
      JokerCard.tsx               ← Extends ItemCard with sticker level indicator
  ui/
    PokerChip.tsx                 ← Variant wrapper: accepts StickerLevel, maps to PokerChipBase
    PokerChipBase.tsx             ← Raw color props, full control — used by PokerChip
config/
  types.ts                        ← Shared types + STICKER_COLORS + STICKER_LEVELS
  jokers.ts                       ← Joker definitions
  tarots.ts                       ← Future
  vouchers.ts                     ← Future
  planets.ts                      ← Future
lib/
  auth.ts                         ← Auth.js config
  db.ts                           ← Prisma client singleton
```

---

## Auth Flow

Auth is **optional** — the app is fully usable without it.

1. User visits `/tracker/jokers` directly, progress stored in localStorage
2. If user wants cross-device sync: clicks "Sign in to sync" in the nav
3. User is sent to `/` (sign-in page), enters their email
4. Auth.js sends a magic link via Resend
5. User is redirected to `/verify` ("Check your email")
6. User clicks the link → session created → redirected back to `/tracker/jokers`
7. On return: if localStorage has progress and DB is empty, offer to import it
8. Subsequent visits: session cookie keeps them logged in; "Sign in to sync" becomes user email + sign out

---

## Environment Variables

```env
# Auth.js
AUTH_SECRET=                  # openssl rand -base64 32
AUTH_URL=                     # e.g. https://your-app.vercel.app

# Resend
AUTH_RESEND_KEY=              # from resend.com dashboard

# Database
DATABASE_URL=                 # Neon connection string (pooled)
DATABASE_URL_UNPOOLED=        # Neon direct connection string (for migrations)
```

---

## Build Phases

### Phase 1 — Foundation ✅
*Checkpoint: app loads at localhost, DB tables exist in Neon dashboard*

- [x] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [x] Install shadcn/ui
- [x] Install Prisma, write full schema (all 4 progress tables + Auth.js tables), connect to Neon
- [x] Run initial migration
- [x] Install Auth.js v5 + Prisma adapter + Resend provider
- [x] Set up `lib/db.ts` Prisma singleton and `lib/auth.ts`
- [x] Populate `.env` with all required variables

### Phase 2 — Auth ✅
*Checkpoint: enter email → receive magic link → land on `/tracker`*

- [x] Build `/` sign-in page (email input form + redirect to tracker if already signed in)
- [x] Build `/verify` confirmation screen
- [x] Wire Auth.js to Resend, test magic link email end-to-end
- [x] Remove auth guard from `/tracker` — all tracker routes are public
- [x] Update `/` landing page: show "Start Tracking" CTA prominently, sign-in as secondary action
- [x] Nav: show "Sign in to sync" when anonymous, user email + sign out when authenticated

### Phase 3 — Static UI ✅
*Checkpoint: full tracker UI visible with mock data, filters and progress bar work client-side*

- [x] Build `PokerChipBase` component — raw color props
- [x] Build `PokerChip` component — variant wrapper (StickerLevel → colors)
- [x] Build `ItemSprite` component — sprite sheet offsets verified and rendering correctly
- [x] Build `JokerCard` combining sprite + name + rarity + sticker badge
- [x] Build `ProgressBar` component
- [x] Build `FilterBar` (name search, rarity multi-select, completion toggle) — `JokerFilterBar` merged into `FilterBar`
- [x] Build `JokerList` (combines `ItemGrid` + `TrackerClient`) wired to live joker config + localStorage
- [x] Populate `config/jokers.ts` with full joker list and confirmed sprite offsets

> **Known gaps vs. spec:**
> - Progress bar currently shows global progress (all jokers), not filtered progress. Spec says it should reflect currently visible jokers.
> - Sticker level filter (by stake tier) not yet implemented in `FilterBar`. Only name, rarity, and completion status are filterable.
> - Landing page (`/`) currently redirects directly to `/tracker/jokers`. The planned CTA landing page is deferred.

### Phase 3b — Component System (not in original plan)
*Added: Button component, design tokens, Storybook*

- [x] Custom `Button` built on Base UI + CVA — full variant/size/color prop system
- [x] Game colour tokens (`config/colors.ts`, `config/buttonColors.ts`) — rarity + stake colours as Tailwind theme vars
- [x] `Button` color prop: rarity and stake colours with automatic `color-mix()` interaction states
- [x] Color + variant compatibility — ghost, outline, secondary, link variants work alongside the color prop
- [x] Storybook configured — picks up component-level stories and MDX from `components/**`
- [x] Stories + MDX docs for: `Button`, `Input`, `ItemSprite`, `JokerCard`, `PokerChip`, `PokerChipBase`, `ProgressBar`
- [x] `@custom-variant` pseudo-states — `pseudo-hover/active/focus-visible` defined once, cover both real browser states and Storybook simulation

### Phase 4 — Live Data ✅ (except import prompt)
*Checkpoint: toggle a joker, refresh — localStorage persists; sign in — DB persists across devices*

- [x] `JokerList` reads/writes localStorage for anonymous users
- [x] When signed in, server component fetches DB progress via `getJokerProgress()` and passes as `initialProgress`
- [x] Server Actions (`upsertJokerProgress`, `deleteJokerProgress`) write to DB when session exists
- [ ] Import prompt: when signed-in user has localStorage data but empty DB, offer one-click import

### Phase 5 — Deploy
*Checkpoint: app live on Vercel, auth works in production*

- [ ] Deploy to Vercel, configure all environment variables
- [ ] **Set Vercel spending limit**
- [ ] Smoke test: use tracker anonymously, sign in, verify data persists

---

## Roadmap

**V1 — Jokers**

- Joker grid with sticker level tracking
- Filter by name, rarity, sticker level, completion status
- Progress bar (updates with filters)
- localStorage-first with optional magic link auth for cross-device sync

**V2 — Additional categories**

- Tarot cards (unlocked/not)
- Vouchers (unlocked/not)
- Planet cards (unlocked/not)
- `/tracker` overview dashboard with per-category progress summary

**Stretch Goals**

- DLC content (add to config on release, no migration needed)
- Public shareable progress URL (e.g. `/u/[username]`)
- Stats page (e.g. rarest jokers collected, completion % by rarity)
