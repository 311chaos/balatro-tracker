<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Code Style

- **Named exports only.** Do not use `export default function X()`. Exception: Next.js page/layout files require a default export — declare the component as `const X = () => {}` and add `export default X` on a separate line at the end.
- **Arrow functions only.** Use `const X = () => {}` instead of `function X() {}` everywhere — top-level functions, component inner functions, and helpers alike.

# Component Structure

## Folder conventions

| Location                       | Purpose                                                        | Examples                                      |
| ------------------------------ | -------------------------------------------------------------- | --------------------------------------------- |
| `components/ui/ComponentName/` | Base-level UI primitives — no app/domain knowledge             | `Button`, `Input`, `ProgressBar`, `PokerChip` |
| `components/ui/*.tsx` (flat)   | Thin shadcn re-exports with no local logic                     | `dialog.tsx`, `dropdown-menu.tsx`             |
| `components/{domain}/`         | Compound or domain-specific components that compose primitives | `tracker/`, `emails/`                         |

**When to use a folder vs a flat file:** if a component has stories, docs, a CSS module, or internal sub-components, it lives in its own folder with an `index.tsx` entry point. Flat files are only for simple shadcn wrappers.

## Required files for every `components/ui/` component

Every base component folder must ship with:

- `index.tsx` — the component
- `ComponentName.stories.tsx` — Storybook stories (Playground + any state/variant grids)
- `ComponentName.mdx` — Storybook docs (prop table, usage examples, canvas embeds)

Compound components in `components/{domain}/` do not require stories unless they are reused across more than one page.

# UI Primitives

## Interactive elements

Use **Base UI** (`@base-ui/react/*`) for all interactive primitives (buttons, dialogs, menus, etc.). Base UI provides accessible behaviour without opinionated styles. Wrap it with CVA for variants.

- Render-prop pattern for element swapping: `<Button render={<a href="..." />}>`
- Never use plain HTML `<button>` or `<a>` where a Base UI primitive exists.

## Variants and styling

- **CVA** (`class-variance-authority`) for all variant/size logic. Keep variant strings in the `cva()` call — do not derive classes in render.
- **Pseudo-state variants** — use `pseudo-hover:`, `pseudo-active:`, `pseudo-focus-visible:` (defined in `globals.css` via `@custom-variant`) instead of plain `hover:`/`active:`/`focus-visible:`. This keeps real browser states and Storybook simulation states defined in one place.
- **CSS modules** — use a colocated `ComponentName.module.css` only when styles cannot be expressed as Tailwind classes (e.g. `color-mix()` values). Do not put component styles in `globals.css`.

# Accessibility tests

Run before every commit:

```bash
npx vitest run --project storybook
```

This runs `@storybook/addon-a11y` via `@storybook/addon-vitest` in headless Chromium against every story. The global `a11y: { test: "error" }` in `.storybook/preview.tsx` means any axe violation fails the suite.

**Key rules that bite here:**

- `color-contrast` (WCAG AA, 4.5:1 for normal text, 3:1 for large/bold) — the most common failure
- Stories render in **light mode** by default (no dark CSS class in test env) — use solid dark backgrounds in story wrappers, not `bg-black/80` (semi-transparent composites to ~`#333333` over the white body)
- Gold/yellow accents (e.g. the Sign In button) use `yellow-500` directly — not a custom token. Yellow on a light body background will fail contrast; always pair with a dark wrapper (`bg-black` / `bg-zinc-950`)

## Color system

Game colours use the existing OKLCH palette scales defined in `config/colors.ts` and `app/globals.css`. There are **no** `rarity-*` or `stake-*` Tailwind tokens, and **no** `color` prop on Button or DropdownMenu — that system is not implemented.

Use palette utilities directly:

- Legendary / gold → `yellow-500` (`#ffd500`), always on a dark background
- Rare → `red-400` on dark surfaces, `red-600` on light (contrast-safe steps)
- Uncommon → `blue-500` / `blue-300` (light/dark respectively)
- Common → `zinc-400`

Apply colour via `className` or inline `style={{ color: "var(--red-400)" }}`. Do not invent custom tokens or pass unimplemented props.
