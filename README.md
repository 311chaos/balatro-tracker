# Balatro Tracker

**[balatro-tracker.vercel.app](https://balatro-tracker.vercel.app/)**

A full-stack web app for tracking gold sticker progress across every joker in [Balatro](https://www.playbalatro.com/). Sign in to sync your collection across devices — no password required.

![Gold poker chip favicon](app/icon.svg)

---

## Features

- Browse all 150+ jokers with sprite art, rarity, and description
- Tap a poker chip to cycle through stake levels (White → Gold)
- Progress persists per-user in a cloud database when signed in
- Unauthenticated users get a fully functional local-only experience
- Magic link sign-in — no passwords, no OAuth friction
- Responsive layout with a Balatro-inspired pixel font and felt aesthetic

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) — App Router, Server Components, Server Actions |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) with CSS custom properties for theming |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) built on [Base UI](https://base-ui.com) primitives |
| **Authentication** | [Auth.js v5](https://authjs.dev) (NextAuth) with magic link via [Resend](https://resend.com) |
| **Email** | [Resend](https://resend.com) + [React Email](https://react.email) for transactional templates |
| **Database** | [Neon](https://neon.tech) — serverless Postgres |
| **ORM** | [Prisma](https://www.prisma.io) |
| **Deployment** | [Vercel](https://vercel.com) |
| **Component Explorer** | [Storybook 8](https://storybook.js.org) with Next.js Vite adapter |
| **Testing** | [Vitest](https://vitest.dev) |

## Architecture Highlights

**Server Components + Server Actions** — data fetching and mutations happen on the server by default. Client components are opt-in and scoped to interactive UI only (chip toggles, sign-in modal, user menu).

**Auth pattern** — `Auth.js` issues a session cookie after email verification. The `Navbar` server component reads the session and passes server actions down to client sub-components as props, keeping `next-auth` and database imports out of the browser bundle entirely.

**Design tokens** — rarity and stake colours are defined once in `config/colors.ts`, injected as CSS custom properties at the root layout level, and consumed by Tailwind utility classes throughout. No colour values are duplicated.

**Component library** — all primitives (Input, PokerChip, JokerCard, ProgressBar, etc.) are documented in Storybook with stories covering variants and states. Colour tokens and typography have dedicated design token stories.

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in AUTH_SECRET, AUTH_RESEND_KEY, DATABASE_URL

# Push the Prisma schema to your database
npx prisma db push

# Start the dev server
npm run dev

# Run Storybook
npm run storybook
```

## Project Structure

```
app/                  # Next.js App Router pages and layouts
  tracker/jokers/     # Main joker tracker page
  api/auth/           # Auth.js route handler
components/
  ui/                 # Reusable UI primitives (each with a Storybook story)
    Navbar/           # Auth-aware site header
  tracker/            # Feature-specific components
config/               # Static data — joker catalogue, colour tokens, types
emails/               # React Email templates
lib/
  actions/            # Server actions (auth, joker progress)
  auth.ts             # Auth.js configuration
  db.ts               # Prisma client singleton
prisma/               # Schema and migrations
stories/              # Design token Storybook docs (colours, typography, icon)
```
