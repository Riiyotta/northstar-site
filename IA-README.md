# Northstar site: information architecture

`ia.json` is the only file to edit by hand. `IA.md` and `matrix.csv` are
**generated** from it, so never edit them directly; they get overwritten.

```bash
node validate.mjs   # consistency checks (hard failures + informational notes)
node build.mjs      # regenerates IA.md and matrix.csv
```

The structure was derived from the code itself (`src/routes.js`,
`src/App.jsx`, `src/pages/*.jsx`) rather than from the specs. Each section
names the component that renders it in `implementedBy`, with paths relative
to `src/`. The `*` catch-all (`pages/ComingSoon.jsx`), which stands in for
links to pages not built yet, is not counted as a route.

## What the data shows

- **Every page is its own shape.** There are 7 routes and 7 templates, with no
  patterned collections. The 42 sections split into 18 shared (used on 2 or
  more routes) and 24 page-local, so most of the build effort for new pages
  will be composing the shared set.
- **One block does most of the framing.** `features.section-intro` (`ui/Intro.jsx`)
  appears 13 times across 4 routes, and `features.split-feature` appears 8 times
  across 3. Changes to either ripple through most product pages, so re-check
  `/mail`, `/docs`, `/agents` and `/enterprise` after editing them.
- **The homepage predates the shared primitives.** 7 of its 11 sections are
  homepage-only composites: the carousel, the banner, the Agent, Inbox and Pages
  groups, the enterprise block and the closing CTA. `cta.cta-final-home`
  (`FinalCta.jsx`) does the same job as `cta.cta-final` (`ui/CtaBand.jsx`), and
  `InboxBento.jsx` overlaps `ui/Bento.jsx`. These are candidates to fold into the
  shared components, once someone checks that the homepage's measured geometry
  survives the change.
- **One near-duplicate on the product pages.** `proof.quote-pair` (an inline
  `TwoColumn` in `pages/Agents.jsx`) is visually close to `proof.quote-grid`
  (`ui/QuoteGrid.jsx`, used on `/mail` and `/enterprise`), but is built
  separately.

The header and footer variants are a route-level choice in `src/routes.js`,
recorded as `chrome`:

| `chrome` | Routes |
|---|---|
| `signin+banner` | `/` |
| `signin` | `/plans`, `/enterprise` |
| `product-cta` | `/mail`, `/docs`, `/agents` |
| `product-cta+light-footer` | `/go` |

## Validator notes

`validate.mjs` flags five "scope mentions N" notes: on `chapter-intro`,
`sticky-feature-rows`, `connectors-strip`, `plan-comparison` and `cta-band`.
All five are false positives. The numbers it picked up are chapter numbers, a
1080px breakpoint and a hex colour, not route counts. All hard invariants
reconcile.
