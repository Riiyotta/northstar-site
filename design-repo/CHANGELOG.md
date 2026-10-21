# Changelog

## 1.2.0 (snapshot 2026-10-21T13:05:40Z, re-checked 2026-10-21T13:05:40Z)

Motion-fix pass: the contracts follow the motion changes now in site/src.

- /go pinned feature text: pattern `sticky-pinned-text` now describes the CSS scroll-driven
  version (named view-timeline `--pin-row` on `.pin-row`; `.pin-text` runs pin-slide, pin-fade-in
  and pin-fade-out over `cover calc(50vh - 33.5px)` → `cover calc(100% - 50vh - 33.5px)`, 200px
  fades, translateY ±h/2, base opacity 0; only under `@supports (animation-timeline: view())`,
  ≥640.02px and no-preference). The JS scroll/rAF hook is recorded as the fallback for browsers
  without view timelines. The `feature.sticky-row` contract and the sticky-feature-row component cite src/index.css.
- Product-hero loops: new pattern `hero-video-loop` (infinite iterations; cycles mail 35.9s,
  docs 28.3s, go 10s in `cycleMsBySlot`; seamless first/last frame on /mail and /docs; viewport-gated;
  locked fallback `static-complete-frame`). `hero.product-video` and `media.demo-video` now allow only
  this pattern; the example PageSpec's /mail hero uses it.
- Homepage one-shot: new pattern `hero-video-oneshot` (7000ms, one iteration, locked fallback
  `static-final-frame`), allowed only as an `additional` pattern on `hero.carousel`. A looping hero
  on the carousel is rejected.
- FAQ: `faq.accordion` `mode` is pinned to `single`; /go, /agents and /enterprise are all single-open
  (src/components/enterprise/FaqAccordion.jsx now passes `single`).
- Smooth scrolling: `compatibility/motion-patterns.json` gains `siteWide.smoothScroll`
  (`html { scroll-behavior: smooth }` under no-preference; ScrollToTop uses `behavior: 'instant'`
  so route changes jump). `smooth-scroll-anchor` notes that the scroll duration is browser-chosen
  (about 0.79s observed on /plans) and not pinned.
- Motion patterns: 12 → 14 (motion-patterns.json version 1.1.0). PageSpec motion
  properties are unchanged, so the schema stays closed with const-pinned values, and the allowlist
  is unchanged (allowlistVersion stays 1.0.0).
- Spot checks: `reduced-motion-video` updated; `product-hero-loops`, `sticky-row-view-timeline`,
  `faq-single-open` and `smooth-scroll-site-wide` added.
- Adversarial suite: 46 → 56 mutations (looping hero on the homepage carousel, as primary and as
  additional; one-shot or generic demo loop on a product hero; multi-open FAQ on /go, /agents and
  /enterprise).
- Citations regenerated: src data re-dumped and every citation recomputed from its anchor text
  (382 citations). This fixes the 14 citations that had drifted when lines moved in
  src/index.css and src/App.jsx.

## 1.1.0 (snapshot 2026-10-21T12:30:14Z, re-checked 2026-10-21T12:30:14Z)

- Spec copy replaced: every copy string in CLONE_SPEC.md, specs/plans.md and specs/enterprise.md
  that had been reworded from the original site now quotes (or points to) the independently written
  implementation in src/data/content.js, src/data/plans.js, src/data/enterprise.js and
  src/components/Banner.jsx. Measured lengths, line counts and all geometry, colour, type and motion
  values are unchanged. The spot check `spec-copy-excluded` is now `resolved` and cites the copy note
  in each spec.
- Mail-client names renamed: the /mail compatibility line (src/data/mail.js compat.c / compat.e)
  now uses the invented names Wrenmail and Driftpost; the example PageSpec follows, and the spot check
  `third-party-names-in-copy` is `resolved`.
- Citations regenerated: src data re-dumped and every citation recomputed from its anchor text
  against the edited specs (335 citations).
- repositoryVersion is now machine-checked: verify_all.py REPOSITORY_VERSION requires the newest
  CHANGELOG entry to equal registry.manifest.json `repositoryVersion` (prove_drift.py has a matching defect).

## 1.0.0 (snapshot 2026-10-21T11:45:01Z, re-checked 2026-10-21T12:15:37Z)

Initial build from scratch, bottom-up: tokens, primitives, components, sections, templates,
compatibility graph, Draft-07 schema, example PageSpec, semantic validator, adversarial suite,
manifest/allowlist/docs.

- 308 tokens across foundation, semantic, component and layout layers, plus light and dark themes.
- 10 primitives, 24 components, 37 section contracts. Every text field carries maxChars/maxWords from measured lengths.
- 7 templates for 7 routes (1:1). The ComingSoon catch-all and the future team/use-case/store/company families are recorded as out of scope.
- 31 graph rules, each implemented in schema/semantic_validate.py with the same severity; 12 closed motion patterns with locked reduced-motion fallbacks.
- 12 closed asset roles with generation and licensing policy; 6 compliance-critical roles have pinned policies.
- Adversarial suite: 8 controls, 46 mutations, 2 warn-only cases.
- The schema is generated from the contracts (schema/build_schema.py) and checked for sync.
- Regenerated after the concurrent pixel audit and artwork passes landed in src (/mail rows 6–10 media side, data string lengths, component props), then re-checked against current source before packaging.
