# Balatro Gold Sticker Tracker — Project Plan

## Overview

A web app for tracking which Balatro collectibles you have earned a gold sticker on. Starts with jokers, but is structured to incrementally support other item categories (tarots, vouchers, planet cards). Features a filterable item grid, live progress bar, and user auth for per-user persistence.

---

## Tech Stack

| Concern      | Decision                 | Notes                                                            |
| ------------ | ------------------------ | ---------------------------------------------------------------- |
| Framework    | Next.js (App Router)     | Full SSR/SSG support, file-based routing                         |
| Styling      | Tailwind CSS + shadcn/ui | SSR-compatible, no runtime cost, great DX                        |
| Auth         | Auth.js v5               | Magic link via email, Prisma adapter                             |
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

All item definitions live in static TypeScript config files under `src/config/`. The `spriteX` and `spriteY` values are pixel offsets into the relevant 2x sprite sheet. A shared base type keeps the `ItemSprite` component generic.

```ts
// src/config/types.ts

// Ordered lowest → highest stake
export type StickerLevel =
  | "white"
  | "red"
  | "green"
  | "black"
  | "blue"
  | "purple"
  | "orange"
  | "gold";
export type Rarity = "common" | "uncommon" | "rare" | "legendary";

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
// src/config/jokers.ts
export const JOKERS: Joker[] = [
  { id: "joker", name: "Joker", rarity: "common", spriteX: 0, spriteY: 0 },
  {
    id: "greedy",
    name: "Greedy Joker",
    rarity: "common",
    spriteX: 71,
    spriteY: 0,
  },
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

**Sticker/stake badge images:**

Sticker badges will be rendered as pure CSS poker chips — no image assets needed. The design uses a radial gradient for the concentric rings and three rotated divs for the cross notches (0°, 45°, -45°).
https://www.cssbattlesolutions.com/154-poker-chip

This will be a `PokerChip` React component that accepts `chipColor` and `notchColor` props, sized as a small badge overlay on the `JokerCard`. Each sticker level maps to a color pair:

```ts
// src/config/types.ts
export const STICKER_COLORS: Record<
  StickerLevel,
  { chip: string; notch: string }
> = {
  white: { chip: "#FFFFFF", notch: "#AAAAAA" },
  red: { chip: "#CC3333", notch: "#7A1A1A" },
  green: { chip: "#33AA55", notch: "#1A6632" },
  black: { chip: "#333333", notch: "#111111" },
  blue: { chip: "#3366CC", notch: "#1A3D7A" },
  purple: { chip: "#7733CC", notch: "#421A7A" },
  orange: { chip: "#E87722", notch: "#8A4010" },
  gold: { chip: "#FCBE5C", notch: "#998235" },
};
```

The `PokerChip` component will be a self-contained div using inline styles (not Tailwind) since the radial gradient and absolute positioning don't map cleanly to utility classes. It renders as a fixed-size badge overlaid in the corner of the `JokerCard`.

```
components/
  ui/
    PokerChip.tsx   ← accepts chipColor, notchColor, size props
```

**Implementation notes for `PokerChip`:**
- The reference CSS is designed at ~200px. Keep internal dimensions at original scale and use `transform: scale()` with `transform-origin: top left` to size it down to badge size (~28–32px) — avoids recalculating all pixel values.
- The notch divs use `position: absolute`, so the component's outer container needs `position: relative` with an explicit width and height to contain them.
- Use inline styles throughout — the dynamic `chipColor`/`notchColor` values in the radial gradient can't be set via Tailwind utility classes at runtime.

> When adding DLC content, add new entries to the relevant config file and confirm sprite offsets from the 2x sheet. No DB migration required.

---

## App Routes

```
/                          → Landing page with sign-in form (magic link email input)
/verify                    → "Check your email" confirmation screen
/tracker                   → Overview: progress summary across all categories (protected)
/tracker/jokers            → Joker tracker — filterable grid with sticker levels (V1)
/tracker/tarots            → Tarot tracker (future)
/tracker/vouchers          → Voucher tracker (future)
/tracker/planets           → Planet tracker (future)
/api/auth/[...nextauth]    → Auth.js catch-all route
```

> V1 only builds `/tracker/jokers`. The `/tracker` overview page can start as a simple redirect to `/tracker/jokers` and be expanded into a real dashboard when more categories are added.

---

## Page: `/tracker`

This is the core of the app. Rendered server-side with the user's completed joker IDs fetched from the DB, then handed to a client component for interactive filtering.

### Data flow

1. Server component fetches `UserJokerProgress` for the current user from Neon via Prisma
2. Passes `completedJokerIds: string[]` as a prop to the client component
3. Client component owns all filter state (name search, rarity, completion toggle)

### UI Layout

```
┌─────────────────────────────────────────────────────┐
│  Balatro Gold Sticker Tracker           [Sign out]  │
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

- Progress bar numerator/denominator reflects **currently visible jokers** only
- Rarity filter: multi-select or single dropdown (common / uncommon / rare / legendary)
- Completion toggle: All / Collected / Missing
- Name search: client-side substring match against joker name

### Toggling a joker

- Clicking a joker card fires a **Server Action** (`markGoldSticker` / `removeGoldSticker`)
- Optimistic UI update on the client while the server action completes
- No separate API route needed — Server Actions handle the DB write

---

## Key Components

Generic components are driven by `CollectibleItem` so they work across all categories without modification. Category-specific logic (sticker levels, rarity filtering) lives only in the joker-specific layer.

```
src/
  app/
    page.tsx                        ← Landing / sign-in page (server component)
    verify/page.tsx                 ← "Check your email" screen
    tracker/
      page.tsx                      ← Overview: category summary cards (V1: redirect to /jokers)
      jokers/
        page.tsx                    ← Server component: fetches joker progress, renders TrackerClient
        actions.ts                  ← Server Actions: set/update joker sticker level
      tarots/                       ← Future
      vouchers/                     ← Future
      planets/                      ← Future
  components/
    tracker/
      TrackerClient.tsx             ← Client component: owns filter state, renders grid
      ItemGrid.tsx                  ← Renders filtered list of ItemCard (generic)
      ItemCard.tsx                  ← Single item: sprite + name + completion state (generic)
      ItemSprite.tsx                ← CSS sprite positioning (generic — takes spriteX/Y + sheetUrl)
      ProgressBar.tsx               ← Progress bar + fraction display
      FilterBar.tsx                 ← Name search + completion toggle (generic)
      jokers/
        JokerFilterBar.tsx          ← Extends FilterBar with rarity + sticker level filters
        JokerCard.tsx               ← Extends ItemCard with sticker level indicator
  config/
    types.ts                        ← Shared types: CollectibleItem, Joker, StickerLevel, etc.
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

1. User lands on `/`, enters their email address
2. Auth.js sends a magic link email via Resend
3. User is redirected to `/verify` ("Check your email")
4. User clicks the link in their email
5. Auth.js validates the token, creates a session, redirects to `/tracker`
6. Subsequent visits: session cookie keeps them logged in
7. Sign out clears the session cookie

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

### Phase 1 — Foundation
*Checkpoint: app loads at localhost, DB tables exist in Neon dashboard*

- [ ] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Install shadcn/ui
- [ ] Install Prisma, write full schema (all 4 progress tables + Auth.js tables), connect to Neon
- [ ] Run initial migration
- [ ] Install Auth.js v5 + Prisma adapter + Resend provider (config only, no UI yet)
- [ ] Set up `src/lib/db.ts` Prisma singleton and `src/lib/auth.ts`
- [ ] Populate `.env.local` with all required variables

### Phase 2 — Auth
*Checkpoint: enter email → receive magic link → land on placeholder `/tracker` page*

- [ ] Build `/` login page (email input form)
- [ ] Build `/verify` confirmation screen
- [ ] Wire Auth.js to Resend, test magic link email end-to-end
- [ ] Add session guard to `/tracker` (redirect to `/` if not authed)
- [ ] Add sign out button to placeholder `/tracker` page

### Phase 3 — Static UI
*Checkpoint: full tracker UI visible with mock data, filters and progress bar work client-side*

- [ ] Build `PokerChip` component — render all 8 sticker levels side by side to review colors
- [ ] Build `ItemSprite` component — verify sprite sheet offsets render correctly
- [ ] Build `JokerCard` combining sprite + name + rarity + sticker badge
- [ ] Build `ProgressBar` component
- [ ] Build `FilterBar` and `JokerFilterBar` (name search, rarity, sticker level, completion toggle)
- [ ] Build `ItemGrid` and `TrackerClient` wired to hardcoded mock joker data
- [ ] Populate `src/config/jokers.ts` with full joker list and confirmed sprite offsets

### Phase 4 — Live Data
*Checkpoint: toggle a joker sticker level, refresh, change persists*

- [ ] Swap mock data for real DB fetch in `/tracker/jokers/page.tsx` (server component)
- [ ] Implement Server Actions in `actions.ts` for setting/updating sticker level
- [ ] Add optimistic UI to `TrackerClient` so toggles feel instant

### Phase 5 — Deploy
*Checkpoint: app live on Vercel, auth works in production*

- [ ] Deploy to Vercel, configure all environment variables
- [ ] **Set Vercel spending limit**
- [ ] Smoke test: sign in, toggle a joker, verify persistence

---

## Roadmap

**V1 — Jokers**

- Joker grid with sticker level tracking
- Filter by name, rarity, sticker level, completion status
- Progress bar (updates with filters)
- Magic link auth

**V2 — Additional categories**

- Tarot cards (unlocked/not)
- Vouchers (unlocked/not)
- Planet cards (unlocked/not)
- `/tracker` overview dashboard with per-category progress summary

**Stretch Goals**

- DLC content (add to config on release, no migration needed)
- Public shareable progress URL (e.g. `/u/[username]`)
- Stats page (e.g. rarest jokers collected, completion % by rarity)
