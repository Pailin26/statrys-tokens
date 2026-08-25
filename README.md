# Statrys Tokens (`@statrys/tokens`, plus per-category icon packages like `@statrys/countryicon`)

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
semantic/      ← cross-cutting semantic tokens, shared by many components (bg.json, text.json, ...)
component/     ← per-component tokens, one file per component (button.json, toggle.json, ...) —
                 may alias semantic/ (or, rarely, primitives/) tokens, but never another
                 component's file
build/         ← Style Dictionary config + custom transforms
fonts/         ← GT Walsheim LC (.ttf for native, .woff2 for web) — licensed, see fonts.css
countryicon/   ← @statrys/countryicon — country flag icon set (260 flags), real Flag
                 component for web + React Native, not yet published as an installable
                 package (see "Consuming" below). One category per package going
                 forward — handdrawnicon/, fileicon/ etc. will be siblings, not
                 subfolders of this one, when they're built out
```

Tokens follow a three-tier structure (`primitives/` → `semantic/` →
`component/`) — see the *Component-level tokens* rule in the consuming
repos' `docs/contributing.md`: a component's style file may only reference
its own `component/<name>.json` tokens, never a primitive or another
component's/semantic file's token directly. Physically split into its own
folder 2026-08-21 — previously component files lived alongside the
cross-cutting ones in `semantic/`.

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

A git dependency like the one above always resolves to the *repo root's*
`package.json` (`@statrys/tokens` itself) — there's no standard way to point
a git dependency at a subdirectory's separate package. That means
`@statrys/countryicon` (and future sibling icon packages) can't be installed
by `web-ds`/`app-ds` the same way until it either becomes its own repo, or
some other distribution path is worked out. Not yet resolved.

## Docs

- `docs/versioning.md` — semver policy across `@statrys/tokens`, `@statrys/countryicon`,
  `@statrys/web-ds`, `@statrys/app-ds`
- `docs/figma-sync.md` — working notes for the Figma Dev Mode MCP server
