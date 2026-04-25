# Balatro Tracker — Design System

**Live product:** https://balatro-tracker.vercel.app/

**Source repository:** https://github.com/311chaos/balatro-tracker (public)

Balatro Tracker is a full-stack web app for tracking Gold Stake sticker progress across every Joker in the card game [Balatro](https://www.playbalatro.com/). Users sign in via magic link to sync their collection across devices, or use a fully functional local-only experience without signing in.

---

## Product Context

### The Core Loop

- Browse all 150+ Jokers displayed as pixel-art cards on a green felt background
- Each Joker can earn a **stake sticker** — a colored poker chip overlay — representing the highest difficulty completed with that Joker
- Stake levels progress: **White → Red → Green → Black → Blue → Purple → Orange → Gold**
- The goal is to earn a **Gold** stake sticker on every Joker
- A progress bar at the top tracks overall completion

### Surfaces

- **Tracker page** (`/tracker/jokers`) — the main app; joker grid with FilterBar, ProgressBar, JokerCards
- **Navbar** — site header with magic-link sign-in modal and user menu
- **Auth flow** — email sign-in via Resend magic links

### Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui + Base UI · Auth.js v5 · Prisma + Neon · Vercel

---

## Content Fundamentals

**Tone:** Concise, game-native, slightly dry. The product assumes the user knows what Balatro is — no hand-holding. Copy is minimal; the art and color do the work.

**Casing:** Title case for labels and headings (`Gold Stake`, `Riff-raff`). ALL CAPS for category labels in the filter bar (`RARITY:`, `STATUS:`). Joker names use their canonical in-game casing (including unusual names like `Séance`, `Oops! All 6s`, `Mr. Bones`).

**Voice:** Second-person implied ("Track your progress"). No emoji. No exclamation points except in canonical game names. Short, punchy; nothing decorative.

**Font personality:** The `m6x11` pixel font is used for all branded text — Joker names, rarity labels, filter labels, the site title. It gives the product a strong retro-game identity. UI chrome (inputs, dropdowns, buttons) use Geist Sans.

**Numbers:** Counts are displayed as `{current} / {total}` with a percentage alongside.

---

## Visual Foundations

### Color Philosophy

The palette is built around three axes:

1. **Zinc neutrals** — the UI scaffold. Almost everything background/foreground uses zinc. Dark mode is the default; zinc-950 is the base background.
2. **Rarity colors** — semantic signal for Joker rarity. Non-negotiable; these match the game exactly.
3. **Stake colors** — a progression from muted (white) to prestigious (gold). Gold is the primary brand accent.

The felt green (`#1a4d2e` + checkerboard overlay) is the single non-zinc background, used exclusively for the Joker grid container.

### Typography

| Role                | Font                 | Weight  | Notes                                      |
| ------------------- | -------------------- | ------- | ------------------------------------------ |
| Brand / Joker names | `m6x11` (pixel font) | 400     | `tracking-widest`, `letter-spacing: 0.1em` |
| Body / UI           | Geist Sans           | 400–600 | System-quality sans                        |
| Mono / Code         | Geist Mono           | 400     | Used for code samples                      |

Text scale: `text-xs` (12px) for rarity labels, `text-sm` (14px) for UI chrome, `text-base` (16px) for filter labels and counts, `text-lg` (18px) for joker names, `text-2xl` (24px) for the site title in Navbar.

### Backgrounds

- **Page background:** `zinc-950` (`#09090b`) — near-black
- **Navbar:** `zinc-950` with `border-b border-zinc-800`
- **Filter bar:** `zinc-950` with `border: 2px solid var(--stake-gold)` — gold border is a key accent
- **Joker grid container:** `felt-bg` — dark green (`#1a4d2e`) + 24px checkerboard pattern using `rgba(0,0,0,0.07)` overlays
- **Joker cards:** `bg-black/20` hover `bg-black/35`
- No light mode content; the app is dark-only in practice

### Cards

- **Joker card:** `rounded-lg`, `p-3`, `bg-black/20`, `border: 2px solid {sticker ring color or transparent}`, hover `bg-black/35`
- **Filter bar:** `rounded-xl`, `p-4`, `bg-zinc-950`, `border: 2px solid var(--stake-gold)`
- No drop shadows on cards; depth is conveyed by the felt bg contrast

### Borders & Radius

- Base radius: `0.625rem` (10px)
- Scale: sm → md → lg → xl → 2xl → 3xl → 4xl (multiplied by base)
- Joker cards: `rounded-lg` = `var(--radius)`
- Filter bar: `rounded-xl` = `calc(var(--radius) * 1.4)`
- Chips/pills: `rounded-full`
- Border color: `zinc-800` for structural; `stake-gold` for active/accent; rarity color for rarity filter pills

### Spacing

Tailwind v4 defaults. Key landmarks:

- Page padding: `px-6 py-6`
- Card internal: `p-3` to `p-4`
- Grid gap: `gap-3`
- Stack gap: `gap-2` to `gap-6`

### Animations & Interactions

- `transition-colors` on JokerCard hover (quick, no duration specified = 150ms default)
- `transition-all duration-300` on ProgressBar indicator fill
- Press state: `translate-y-px` on active Button (subtle press-down)
- Hover: background lightens/darkens via `black/20 → black/35` on cards; `opacity: 0.8` on some buttons
- No entrance animations, no spring physics, no page transitions

### PokerChip Component

The `PokerChipBase` is a custom SVG-style chip rendered entirely in CSS/React. Key details:

- Radial gradient: chip color → ring color band → chip color rim → ring color edge
- 8 notch marks (4 cardinal in `notch1Color`, 4 diagonal in `notch2Color`)
- Inner circle with border
- Gloss overlay (radial + linear gradient)
- Box shadow: `0 2px 8px rgba(0,0,0,0.6)`
- Size: `size` prop (default 40px, rendered at 200px then scaled)

### Iconography

See ICONOGRAPHY section below.

---

## ICONOGRAPHY

The app uses **no icon font or third-party icon library**. Visual identity comes from:

1. **Poker chip components** — the `PokerChipBase` and `PokerChip` React components are the primary interactive icons. Each stake level has its own chip color combination.
2. **Sprite-sheet art** — Joker images are loaded from the CDN sprite sheet (`https://cdn.jsdelivr.net/gh/Signez/balatro-sprites-i18n@main/dist/en/2x/Jokers.png`). The `ItemSprite` component handles all sprite positioning with `imageRendering: pixelated`.
3. **App icon** — a simple poker chip SVG (`assets/icon-prod.svg`) used as the favicon/PWA icon in different environment variants (prod, preview, local, storybook).
4. **No emoji** — none in the codebase UI; emoji appear only in canonical game content.
5. **No SVG illustrations** — the felt pattern and chip components are the entire visual language.

Key asset: `assets/icon-prod.svg` (poker chip icon)
Joker sprites: fetched from CDN — no local copies needed.

---

## Files

```
README.md                   ← This file
SKILL.md                    ← Agent skill definition
colors_and_type.css         ← CSS custom properties for the full token system
fonts/
  m6x11.ttf                 ← Brand pixel font
assets/
  icon-prod.svg             ← App icon (poker chip)
preview/
  colors-rarity.html        ← Rarity color swatches
  colors-stake.html         ← Stake color progression
  colors-zinc.html          ← Zinc neutral scale
  type-specimen.html        ← Typography specimens
  felt-bg.html              ← Felt background pattern
  poker-chips.html          ← PokerChip component all variants
  joker-cards.html          ← JokerCard component examples
  filter-bar.html           ← FilterBar component
  progress-bar.html         ← ProgressBar component
  buttons.html              ← Button variants
  spacing-radius.html       ← Spacing & radius tokens
ui_kits/
  tracker/
    README.md               ← UI kit notes
    index.html              ← Interactive tracker prototype
```
