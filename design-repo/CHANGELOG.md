# Changelog

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
