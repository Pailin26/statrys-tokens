# Statrys Tokens (`@statrys/tokens`, `@statrys/icons`)

Foundation layer for the Statrys Design System — the single source of truth for
design tokens (color, typography, spacing, radius, effects, motion, z-index),
shared by both [statrys-design-web](https://github.com/Pailin26/statrys-design-web)
(`@statrys/web-ds`) and [statrys-design-app](https://github.com/Pailin26/statrys-design-app)
(`@statrys/app-ds`).

This repo used to be `packages/tokens` + `packages/icons` inside the monorepo
(`statrys-design`) before it was split by platform. History for those two
paths was preserved across the split.

## Layout

```
primitives/    ← raw scale values (color, spacing, radius, typography, ...)
semantic/      ← per-component + cross-cutting semantic tokens (bg.json, button.json, ...)
build/         ← Style Dictionary config + custom transforms
fonts/         ← GT Walsheim LC (.ttf for native, .woff2 for web) — licensed, see fonts.css
icons/         ← icon set scaffold (manifest.json, package.json) — not yet built out or
                 published as an installable package; packages/icons/src has no real
                 icon components yet, so nothing currently depends on it
```

Tokens follow a three-tier structure — see the *Component-level tokens* rule
in the consuming repos' `docs/contributing.md`: a component's style file may
only reference its own `semantic/<component>.json` tokens, never a primitive
or another file's semantic token directly.

## Build

```bash
npm install
npm run build
```

Outputs to `dist/`:
- `tokens.css` — CSS custom properties (web)
- `tokens.js` / `tokens.d.ts` / `tokens.json` — plain values (React Native — dimensions/font
  sizes are stripped of their `px` unit and converted to numbers, since RN's `StyleSheet`
  needs numbers, not CSS strings)

## Consuming from `web-ds` / `app-ds`

Until this is published to a registry, consuming repos install it as a git dependency:

```json
"@statrys/tokens": "github:Pailin26/statrys-tokens"
```

Bump to a specific commit/tag when you want a pinned version instead of always
tracking `main` — see `docs/versioning.md`.

## Docs

- `docs/versioning.md` — semver policy across `@statrys/tokens`, `@statrys/icons`,
  `@statrys/web-ds`, `@statrys/app-ds`
- `docs/figma-sync.md` — working notes for the Figma Dev Mode MCP server
