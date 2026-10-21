Source: https://superhuman.com/enterprise

# Clone spec: enterprise page (`/enterprise`)

I measured this page live on 2026-10-21 with a local Playwright Chrome (normal desktop Chrome UA, `reducedMotion: 'no-preference'`) at 1440, 1024, 768 and 390 wide. Every px value comes from `getComputedStyle` / `getBoundingClientRect` or from the page's CSS modules (`two-column_*`, `multi-column_*`, `title-description-block_*`, `page-section_*`, `group_*`, `hero-title_*`, `asset-grid_*`, `list_*`, `accordion_*`, `cta-button_*`).

Global tokens, buttons, header and footer: see `../CLONE_SPEC.md`. **Header and footer are unchanged here, so they are not re-specced. There is no announcement banner on this page.** The final CTA section is `#421d24`, the same color as the footer, so the two read as one continuous mulberry block.

**Copy rule.** Every text node is listed with its role and original length (in parentheses) plus a same-length neutral placeholder for **Northstar**. Mapping: Mail → **Inbox**, Docs → **Pages**, Go → **Assistant**. The writing-assistant brand maps to **Agents**. No logos, screenshots or illustrations are reproduced. Media slots are described in section 13 and in `enterprise.assets.json`.

> **Copy note.** Quoted copy strings in this spec are the independently written implementation in `src/data/enterprise.js`, not placeholders derived from the original; every length and line count is the measured original, not the length of the quoted string.

New tokens (also listed in `plans.md`): `type-display-small` = `clamp(36px, 16px + 3.125vw, 61px)` / lh **1.1** / ls -0.0275em / 460 (61 @1440, 48 @1024, 40 @768, 36 @390). `type-heading-small` = `clamp(24px, 18.4px + 0.875vw, 31px)` / lh 1.2 / ls -0.0275em / 460 (31 @1440, 27.36 @1024, 25.12 @768, 24 @390). Existing tokens used: `heading-large` (49 / 40.16 / 34.72 / 32), `heading-medium` (39 / 33.28 / 29.76 / 28), `large` (20 / 18.96 / 18.32 / 18), `medium` 18/27, `small` 16/24.

---

## 0. Page structure, groups and spacing rules

Sections are built from three generic layout primitives, so build these once:
- **`PageSection`**: `content-wrapper` (global container: max 1280, vp padding 32/24/16; at 1440 the box is 1344 with 48px auto margins) + `padding-block: 96px` (≥640) / `40px` (<640).
- **`SectionGroup`**: a wrapper with a single bg color. Inside a group, **every section after the first has padding-top 0**. Each section keeps its own padding-bottom of 96/40.
- Text alignment per block: centered blocks use `align-items:center; text-align:center`, and text max-width is **900px** (global `max-w-text`).

| # | block | bg | component | 1440 y/h | 1024 y/h | 768 y/h | 390 y/h |
|---|---|---|---|---|---|---|---|
| G1 | **group** (hero + logos) | `#281647` (dark) | `SectionGroup` | 67 / 994 | 67 / 1778 | 67 / 1551 | 67 / 1122 |
| 1 | hero (2-col) | ↑ | new `SplitHero` | 67 / 749 | 67 / 1456 | 67 / 1229 | 67 / 829 |
| 2 | customer logos (static) | ↑ | **reuse `LogoStrip`** (static, dark) | 816 / 245 | 1523 / 322 | 1296 / 322 | 896 / 293 |
| G2 | **group** (intro + 4 feature rows) | `#ffffff` | `SectionGroup` | 1061 / 2596 | 1845 / 2277 | 1618 / 2606 | 1189 / 3406 |
| 3 | centered intro | ↑ | `SectionIntro` (**reuse `Intro`** minus lockup/CTAs) | 1061 / 388 | 1845 / 366 | 1618 / 353 | 1189 / 327 |
| 4 | feature A (Assistant) | ↑ | new `SplitFeature` | 1449 / 552 | 2212 / 458 | 1972 / 568 | 1516 / 767 |
| 5 | feature B (Agents) | ↑ | `SplitFeature` | 2001 / 552 | 2670 / 523 | 2540 / 577 | 2283 / 774 |
| 6 | feature C (Pages) | ↑ | `SplitFeature` | 2553 / 552 | 3193 / 482 | 3117 / 592 | 3057 / 791 |
| 7 | feature D (Inbox) | ↑ | `SplitFeature` | 3105 / 552 | 3675 / 447 | 3710 / 514 | 3848 / 747 |
| 8 | CTA band | `#f2f0eb` | new `CtaBand` (centered) | 3657 / 386 | 4122 / 316 | 4224 / 351 | 4595 / 233 |
| 9 | feature E (agent builder) | `#ffffff` | `SplitFeature` | 4043 / 800 | 4438 / 660 | 4576 / 664 | 4828 / 930 |
| G3 | **group** (security) | `#0c4243` (dark) | `SectionGroup` | 4843 / 1246 | 5098 / 1460 | 5240 / 1475 | 5758 / 2168 |
| 10 | security intro | ↑ | `SectionIntro` | 4843 / 356 | 5098 / 345 | 5240 / 339 | 5758 / 370 |
| 11 | security features 3×2 | ↑ | new `IconFeatureGrid` | 5198 / 494 | 5443 / 565 | 5579 / 587 | 6128 / 1304 |
| 12 | compliance badges (2 grids) + link | ↑ | **reuse `LogoStrip`** ×2 (static) + link | 5693 / 396 | 6008 / 550 | 6165 / 550 | 7431 / 494 |
| G4 | **group** (resources) | `#e8e0ff` (purple-10) | `SectionGroup` | 6089 / 1271 | 6558 / 1128 | 6715 / 1116 | 7925 / 2341 |
| 13 | resources title | ↑ | `SectionIntro` | 6089 / 251 | 6558 / 240 | 6715 / 234 | 7925 / 157 |
| 14 | featured report (image left) | ↑ | `SplitFeature` (media-first) | 6340 / 572 | 6798 / 462 | 6949 / 478 | 8082 / 713 |
| 15 | resource cards ×4 | ↑ | new `CardGrid` | 6911 / 448 | 7260 / 426 | 7426 / 405 | 8795 / 1471 |
| 16 | customer quotes ×2 | `#281647` (dark) | new `QuoteGrid` | 7359 / 615 | 7685 / 631 | 7831 / 679 | 10266 / 944 |
| 17 | FAQ | `#ffffff` | new `FaqAccordion` (shared `Accordion`) | 7974 / 1092 | 8317 / 1081 | 8510 / 1075 | 11210 / 1241 |
| 18 | final CTA (left-aligned) | `#421d24` (dark) | new `CtaBlock` (variant of `FinalCta`) | 9066 / 402 | 9398 / 391 | 9585 / 385 | 12451 / 335 |
| — | footer (shared) | `#421d24` | `Footer` | 9468 / … | 9789 / … | 9969 / … | 12786 / … |
| | document height | | | 10327 | 10931 | 11111 | 14609 |

Dark contexts (G1, G3, 16, 18) flip the semantic tokens: text white, text-sub `rgba(255,255,255,0.8)`, borders `rgba(252,250,247,0.2)`, primary button bg `#d4c7ff` / text `#292827`, primaryLink `#d4c7ff`.

### Shared two-column primitive (`TwoColumn`)
- Flex. `gap` (the `gapM` variant): **24** (<640), **40** (640–1280), **64** (≥1280).
- Columns `flex:1 1 0` (equal widths), each a flex column with `justify-content:center` and an inner gap equal to the viewport padding (32 / 24 / 16).
- **`smallSingleCol`** (sections 4–7, 9, 14): row from **640** up, stacked below. Column widths 608 @1440, 468 @1024, 340 @768, 358 @390.
- **`mediumSingleCol`** (hero): row from **1080** up. Stacked at 1024 and 768 (text first, then media).
- Stacked order = DOM order (text then media, except section 14, which is media then text).

### Shared text block (`title-description-block`)
Column, **gap 24**. The heading is an `h2`, then optional `p` / `ul` / CTA `p`. Empty `<p>` nodes exist in the original between some items. They have 0 height but still take a 24px gap, which is why some CTA gaps measure 24+24. Measured positions below already include this.

### Bulleted list (`list_ulList`)
`ul` with no list-style. Each `li` is `display:grid; grid-template-columns:auto 1fr`, `text-medium`. `li::before{content:"•"; font-size:125%; line-height:125%; margin-inline:12px; color:inherit}`, so the bullet column is 29.6px wide. The li line box is 28.125px. The text is a `p` (text-medium 18/27 540, text-sub). Rows stack with 0 gap.

### Text link CTA (`primaryLink` + caret)
16/16 600 `#714cb6` (dark context `#d4c7ff`), padding-block 6, height 32, radius 8, gap 4. **Trailing icon: 20px `caret-right` chevron (not the arrow icon used on the homepage).** Hover: underline (same as homepage primaryLink). <640 the CTA `a` is `width:100%` (left-aligned content).

---

## 1. Hero (G1, `SplitHero`)
- `PageSection` padding 96/96 (40/40 <640). `TwoColumn` **mediumSingleCol**, gap 64 @1440 / 40 @1024, 768 / 24 @390. 1440: row 1280×557.3, two 608 columns.
- **Text column** (vertically centered, inner gap 24): a `header` (column, gap **24** ≥640 / **12** <640), then the CTA row.
  - Eyebrow `h1`: text-medium 18/27 540, text-sub `rgba(255,255,255,0.8)`, balance. "Northstar at company scale" (25)
  - Title `h2`: **type-display-small**, white, balance. 3 lines @1440 (608×201), 2 lines @1024 (900 wide), 2 @768 (691), 3 @390. "One AI layer across mail, docs and every app you run." (51)
  - Lede `p`: text-large (20/30 @1440), text-sub, pretty. 4 lines @1440. "Large organizations pile up dozens of disconnected tools and a handful of stalled AI pilots. Northstar swaps that sprawl for one well-governed suite that employees actually enjoy and security teams can audit." (214)
  - CTA container: `margin-top:16px`. Row ≥640 (wrap, gap 16). Column <640, where the button is full width (358). One **primaryFilled** large button in the dark scheme: bg `#d4c7ff`, text `#292827` 16/600, 122.9×52, radius 12, padding 6/20, hover `#bea1f5`. "See a demo" (10)
- **Media column**: `figure > picture > img` with `object-fit:cover` and **no radius**. Size **608×557.3** @1440 (aspect **1080:990**), 976×894.7 @1024, 720×660 @768, 358×328.3 @390. Placeholder `ent-hero` (see 13).
- Vertical positions @1440: eyebrow y 197.5, title 248.5, lede 473.8, button 633.8. The text block is 488 tall, centered in the 557 column.

## 2. Customer logos (G1, static `LogoStrip`)
- `PageSection` padding-top 0, bottom 96 (40). Column centered.
- Intro `p`: text-medium 18/27 540 text-sub (dark), centered, balance. 430.5 wide @1440 (1 line), 2 lines @390. "Picked by operators, engineers and sellers worldwide" (53)
- `asset-grid` margin-top 40 (≥1080) / 36. Borders `rgba(252,250,247,0.2)` (dark context). **6 cols** ≥1080 (213.2×81 cells), **3×2** below (216 @1024/768, centered 649 wide; 119 @390).
- 6 white monochrome wordmarks, `object-fit:contain`, 72–80 tall (natural 197×72 / 214×80).
- **Motion: mount fade-in only (opacity 0→1, .5s ease-in-out). No rotation**: zero DOM mutations in 30s in view. Use `LogoStrip` with rotation disabled.

## 3. Centered intro (G2)
- `PageSection` 96/96 (40/40). Text block centered, gap 24.
- `h2` heading-large `#292827`, 900 max, 2 lines @1440, balance. "Four apps, one admin console, and a shared memory of your work" (64)
- `p` text-medium text-sub `rgba(20,20,19,0.65)`, balance, 2 lines @1440 / 4 @390. "Assistant, Agents, Pages and Inbox share context with one another, so employees copy and paste less and IT gets one place to set policy and watch usage." (154)

## 4–7, 9. Feature rows (`SplitFeature`)
Common: `PageSection` padding-top **0** (inside G2), padding-bottom 96 (40). `TwoColumn` smallSingleCol, **text left / media right** (on mobile, text above media). Text column vertically centered.
Text block: `h2` **heading-medium** `#292827` (balance) → `p` text-medium text-sub (pretty) → `ul` bullets (3 items, each 1 line @1440, 2 lines @768/390) → CTA `p` containing the primaryLink + caret.

| row | h2 | p | bullets | link | media slot (size @1440 / 1024 / 768 / 390) |
|---|---|---|---|---|---|
| 4 Assistant | "A helper that speaks up first" (28) | "Northstar Assistant watches the calendars, inboxes and files your team uses, then raises a hand when something needs attention: a missed reply, a deadline clash, a file someone needs." (191) | "Raises the context people need before a meeting" (50); "Tracks promises made across chat, mail and calls" (50); "Finds a file, answers the question, and takes the next action" (61) | "Learn more" (10) | `ent-feature-assistant` 608×456 / 468×351 / 340×255 / 358×268.5 (4:3) |
| 5 Agents | "Helpers inside the tools your team currently pays for" (42) | "Instead of yet another tab, Northstar Agents show up in email clients, CRMs and editors, giving each employee assistance in the context of the task." (141) | "Shares context between apps so helpers stay up to date." (57); "Handles hand-offs among trackers, CRMs, calendars and mail" (58); "Plugs into hundreds of services without custom engineering" (59) | "Explore agents" (14) | `ent-feature-agents` same sizes (4:3) |
| 6 Pages | "Where plans really get done" (28) | "Northstar Pages turns scattered spreadsheets, specs and status reports into one AI-assisted workspace, so teams debate the decision instead of hunting for the latest version of a file." (184) | "Goals, specs and progress kept in one place everyone can see" (59); "Tables that refresh from your live systems" (42); "Hands repetitive upkeep to automations, not people." (50) | "Browse Pages" (12) | `ent-feature-pages` same (4:3) |
| 7 Inbox | "An inbox that triages itself for every employee" (48) | "Northstar Inbox ranks what is urgent, has a draft waiting for the routine stuff, and lets colleagues weigh in privately." (118) | "Important senders up top, bulk mail out of view" (45); "Gentle nudges when someone has not written back" (50); "Comment on a draft together before it goes out" (55) | "Browse Inbox" (12) | `ent-feature-inbox` same (4:3) |
| 9 Agent builder (own section, bg #fff, padding **96/96**) | "Turn every repeatable process into a helper" (46) | "Inside Assistant, a visual builder lets ops, sales and HR teams assemble their own helpers from plain-language instructions, then make them available in whichever tools people already use." (176) | "Start from a plain description, or code it with the SDK." (56); "Publish once and it appears in every app at once." (48); "Pick up proven helpers from a library other teams share" (56) | "Try the agent builder" (20) | `ent-feature-builder` **608×608** / 468×468 / 340×340 / 358×358 (1:1) |

Measured text-block heights @1440: 316 / 336 / 340 / 336 / 363 (h2 1 or 2 lines at 46.8 each). Row heights 456 (608 for row 9). Media `object-fit:cover`, radius 0. At 1024/768 the media is shorter than the text column, so it is vertically centered (e.g. row 4 @768: text 472 tall, media 255 at y +108).

## 8. CTA band (`CtaBand`)
- Bg `#f2f0eb`, `PageSection` 96/96 (40/40). Centered, gap 24.
- `h2` heading-large `#292827`, 2 lines @1440 (900), 1 line @1024 (818 wide), balance. "Get an estimate of the hours your org could recover" (48)
- primaryFilled (light context) `#714cb6`/white, 122.9×52. Hover `#533192`. "See a demo" (10)

## 10–12. Security group (G3, bg `#0c4243`, dark)
**10 intro**: `PageSection` 96/96. Centered `h2` heading-large white (1 line @1440, 665 wide). "Ready for your vendor questionnaire" (34) `p` text-medium text-sub-dark, 3 lines @1440 (900), 7 lines @390. "Security reviews tend to stall AI rollouts. We publish our controls, undergo regular third-party audits, encrypt everything in transit and at rest, and give admins the logs they need, so procurement can move ahead without months of back-and-forth email." (256)

**11 Icon feature grid** (`IconFeatureGrid`), padding-top 0 / bottom 96:
- `multi-column`: container query. `grid-template-columns: repeat(var(--_columns),1fr)` with **3 columns when the container is ≥640px wide**, 1 below. `gap` = viewport padding (**32 / 24 / 24 / 16**). Cells: 405.3 @1440, 309.3 @1024, 224 @768, 358 @390. 2 rows. Row height 183 @1440.
- Cell: column gap 24: icon `figure` (img **69×71**, artwork, see 13) → `h2` **type-heading-small** white (1 line @1440, wraps at 768) → `p` text-medium text-sub-dark.
- Items (title / description; implemented `security.items`): (1) "Keys you control" (15) / "Revoke access to stored data anytime." (36) (2) "Adoption and value data" (23) / "See which teams use AI and what it is worth to you" (50) (3) "Central policy controls" (23) / "Turn features on or off by group in one console." (46) (4) "SAML single sign-on" (19) / "Use the identity provider your company runs today" (48) (5) "Fine-grained roles and access" (28) / "Grant exactly the rights each department needs" (46) (6) "Audited against key standards" (29) / "Third-party reports ready for your review team" (46)

**12 Compliance badges**, padding-top 0 / bottom 96. Column centered:
- **Two** `asset-grid`s, each margin-top **40** (36 <1080), 6 cols ≥1080 / 3 cols below, dark-context hairlines `rgba(252,250,247,0.2)`, cells 81 tall. Each cell holds a 214×80 badge image (contain).
- The badge artwork is a white or grey circular emblem with a short white label (about 9–17 chars), on transparent. 12 cells. Placeholders: "Standard A1" … "Standard A12", each with a 34px circle emblem.
- Then a title-description block (centered, gap 24, with an empty `p` first) holding a primaryLink in dark context (`#d4c7ff`) + caret-right. 266×32. "Visit the Northstar trust center" (33)
- Static: fade-in on mount only, no rotation.

## 13–15. Resources group (G4, bg `#e8e0ff`, light)
**13 title**: `PageSection` 96/96, centered `h2` heading-large `#292827`, 1 line. "Reading for IT and ops leaders" (30)

**14 Featured report** (`SplitFeature`, **media first**), padding-top 0 / bottom 96:
- Media column (left on desktop, top on mobile): `picture` with **border-radius 8px; overflow:hidden**. Img cover, **608×475.5** @1440 (aspect **624:488**), 468×366 @1024, 340×265.9 @768, 358×280 @390. Slot `ent-report`.
- Text column (right): `h2` **heading-large** `#292827` (3 lines @1440, 176.4 tall) "Shadow Stacks: What Happens When Employees Pick Their Own AI Tools" (64) → `p` text-medium text-sub "We surveyed thousands of knowledge workers about the unofficial apps they lean on. The results reveal hidden costs, real security gaps, and a clear path for leaders who want AI spending to pay off." (191) → primaryLink + caret "Read the report" (15).

**15 Resource cards** (`CardGrid`), padding-top 0 / bottom 96:
- `multi-column` with **4 columns when the container is ≥640** (296 @1440, 226 @1024, 162 @768), 1 col <640. Gap 32 / 24 / 24 / 16.
- Card (no bg, no border): column gap 24: `figure` image **296×198** (3:2, natural 360×240, `cover`). **The rounded corners (about 12px) and the dark backgrounds are baked into the artwork**; the img has radius 0 → `h2` **type-heading-small** `#292827` (2 lines @1440; 3–4 lines @768) → primaryLink "Learn more" + caret.
- **@390 the image does not stretch**: it stays 296×198 (left-aligned) inside the 358 column.
- Titles (implemented `resources.cards`): "From Pilot to Habit: Making AI Stick at Work" (42), "A CIO Field Manual for AI" (23), "Counting the Hours: A Practical AI ROI Model" (42), "Writing an AI Policy People Will Follow" (37). Link: "Learn more" (10) ×4.
- Slots `ent-resource-1..4`.

## 16. Customer quotes (`QuoteGrid`, bg `#281647`, dark)
- `PageSection` 96/96 (40/40). Title block centered with **padding-bottom 80**. `h2` heading-large white, 1 line. "What customers tell us" (21)
- `multi-column` **2 columns** when the container is ≥640 (624 @1440, 476 @1024, 348 @768), 1 col <640. Gap 32 / 24 / 24 / 16.
- Each column is a text block (gap 24, left-aligned):
  1. `figure`: a white customer wordmark, **237×53** (cover). Slot `ent-quote-logo-1/2`.
  2. Quote `p`: text-medium 18/27 540 text-sub-dark `rgba(255,255,255,0.8)`, pretty, with curly quotes included. 3 lines @1440, 5 @768/390.
  3. An empty `p` (24 gap).
  4. Attribution `p`: same style. Name on line 1, `<br>`, role on line 2 (2 lines @1440, 3 @768).
- Copy (implemented `quotes.items`): (1) "“We evaluated five vendors. Northstar was the one whose engineers joined our calls, fixed issues within days, and asked what we needed next. Agents and Pages are now part of how our whole company plans.”" (207) — "Imani Castillo" (14) / "Senior VP of Workplace Technology at Redwater Group" (52). (2) "“Our support reps answer hundreds of emails a day. After switching to Northstar Inbox, first-response times dropped and the team stopped dreading Monday mornings. I would not go back.”" (208) — "Leo Hartmann" (11) / "Former Head of Customer Support at Pinecrest Travel" (50).
- No carousel. Static.

## 17. FAQ (`FaqAccordion`, bg `#ffffff`)
- `PageSection` 96/96 (40/40). Title block centered, **padding-bottom 80**. `h2` heading-large `#292827`. "Frequently asked questions" (26)
- Accordion root: `inline-size: min(90ch, 100%)`, which measures **817.9px**. Centered (x 311 @1440, 103 @1024). Full width (720 / 358) on smaller screens. Column, gap 0.
- **10 items, all collapsed by default** (`aria-expanded="false"`).
  - Item `border-top:1px solid rgba(115,113,109,0.2)`. The last item also has `border-bottom`. Item height **76** (75 button + 1 border). 102 @390 when the question wraps to 2 lines.
  - Button: flex `space-between`, `align-items:center`, gap 16, **padding-block 24**, no padding-inline, `cursor:pointer`.
  - Question span: **text-medium 18/27 weight 460** (regular, not 540), `#292827`, balance.
  - Icon: **20px caret-small-down**, right edge, `transition: transform .2s ease`. It rotates -180° when open.
  - Panel: same `Accordion` mechanics as the `/plans` comparison: `height:0 → auto` + `opacity 0 → 1`, **.2s ease**, `content-visibility` allow-discrete, `interpolate-size: allow-keywords`. When open, the panel inner gets **padding-bottom 24**. Body: text-small **16/24 540**, text-sub `rgba(20,20,19,0.65)`, pretty. Paragraphs are separated by `margin-block:12px` on the following `p`. Links inside are `#714cb6`, underlined on hover.
  - No hover background on these triggers. The hover tint only applies in the plans comparison accordion.
- Questions and answers (answers stay hidden until opened; strings are the implemented `faq.items` in `src/data/enterprise.js`, lengths are the measured originals):
  1. "Which apps come with an enterprise contract?" (42) → A: "An enterprise agreement includes Assistant, Agents, Pages and Inbox for every licensed seat, along with the admin console, usage reporting, priority support and a dedicated success manager." (187) / "You can also choose which apps each department receives. Some customers start with Pages for planning teams and add Inbox for sales later, all under one contract and invoice." (180)
  2. "What audits has Northstar passed?" (30) → A: "Northstar completes a SOC 2 Type II audit every year and holds ISO 27001 certification for its hosting platform." (114) / "Your security team can request the full audit reports, our latest penetration test summary and a completed standard questionnaire through the trust center. We also sign a data processing agreement and answer custom questionnaires during procurement, usually within two weeks." (278)
  3. "Can we provision and remove users automatically via SCIM?" (55) → A: "Yes. SCIM provisioning is available on enterprise plans, so new hires get seats on day one and departing staff lose access as soon as HR offboards them." (149) / "Group membership in your directory can map to roles inside Northstar, which keeps permissions in sync without manual work. Setup guides cover the most common directories, and our onboarding engineers can join a call to walk your IT team through it." (240)
  4. "Which regions host our workspace, and who holds the keys?" (53) → A: "Workspaces are hosted with major cloud providers in the United States, the European Union or Australia, chosen during setup." (129) / "All content is encrypted with AES-256 at rest and TLS 1.2 or later in transit. Enterprise customers can supply their own encryption keys and revoke them whenever they choose." (174)
  5. "Will Northstar work with the identity system we already run?" (62) → A: "Northstar supports SAML 2.0 and OpenID Connect, so it works with nearly every modern identity provider. Admins can require single sign-on for all members, enforce session timeouts, and restrict access to approved devices. Most teams finish setup in an afternoon." (275) / "If you run a less common provider, our team will help test the connection first." (80)
  6. "Which operating systems and browsers are supported?" (47) → A: lead-in "Northstar runs on macOS, Windows, iOS and Android." (47), then 5 paragraphs "Browser extensions are available for Chrome, Edge, Firefox, Safari and Arc." (78) / "Settings and drafts sync across devices instantly, so you can start a reply on a laptop and finish it on your phone without losing a word along the way." (158) / "Admins can limit which clients are allowed, for example blocking mobile access for certain roles, and can remotely sign people out of a lost device from the console in a few clicks." (176) / "Offline mode keeps recent mail and documents available on flights and in spotty coverage, then syncs your changes once you reconnect." (138) / "Accessibility matters to us. The apps support screen readers, full keyboard navigation and adjustable text sizes, and we test each release against current WCAG guidelines before it ships." (187)
  7. "How do enterprise contracts and seat pricing work?" (52) → A: "Enterprise pricing is per seat with an annual commitment, and volume discounts begin at 250 seats." (97) / "Talk to sales for a quote. Most proposals include a paid pilot so you can measure results before scaling up." (113)
  8. "Is anything we write used to improve shared AI models?" (53) → A: "No. Content your organization creates in Northstar is never used to train models that serve other customers, and our AI providers are contractually barred from retaining your prompts or outputs. Admins can review which features call external models, disable any of them, and download logs showing exactly what data was sent and when, which helps during audits." (371)
  9. "What does a typical rollout look like for a company of 5,000 people?" (71) → A: lead-in "Most large rollouts happen in waves, starting with a pilot group of 50." (71) + "During the pilot we set baseline metrics, run live training sessions, and gather feedback to tune default settings. You can read [the full enterprise rollout guide] for timelines, checklists and sample emails." (208), which contains an inline link of 32 chars (`#714cb6`, the bracketed text)
  10. "Can our data stay within a specific country?" (46) → A: "Yes. Enterprise customers can pin all workspace content, backups and search indexes to a single region, currently the United States, the European Union or Australia. AI processing for those workspaces also stays in-region. If your company needs a location we do not yet offer, tell our sales team, since new regions are prioritized by demand." (342)
- Closed panel inner heights (the open height adds 24 padding): 120, 144, 144, 120, 120, 276, 72, 96, 72, 96 @1440.

## 18. Final CTA (`CtaBlock`, bg `#421d24`, dark)
- `PageSection` 96/96 (40/40). **Left-aligned** text block (`align-items:start`), gap 24.
- `h2` heading-large white, 1 line @1440 (851 wide), balance. "Simple to adopt. Straightforward to govern." (42)
- `p` text-medium text-sub-dark, 1 line (644 wide), 2 lines @390. "Give every employee a capable assistant while IT keeps the keys to the kingdom." (81)
- An empty `p`, then a primaryFilled **dark** button (`#d4c7ff` / `#292827`), 122.9×52, which stays inline at 390. "See a demo" (10)
- It differs from the homepage `FinalCta` (2-col with an outline button on `#281647` with an animated bg). This one is a single left-aligned column with no background media.

---

## Responsive notes (what changes per breakpoint)
- **<1080**: hero stacks (text, then a 976/720-wide image). Logo grids become 3×2. Everything else stays 2-col down to 640.
- **640–1280**: two-column gap 40. Viewport padding 24.
- **<640**: everything is 1 column. Padding-block 40. Vp 16. Two-column gap 24, inner column gap 16. Multi-column gap 16. The hero CTA is full width. Primary links are full width. FAQ questions wrap.
- Heading sizes follow the clamps listed at the top (all fluid, no steps).

---

## 13. Media slots (descriptions for original artwork; full list in `enterprise.assets.json`)
| slot | size @1440 (aspect) | radius | depicts (draw an original equivalent) | dominant colors |
|---|---|---|---|---|
| `ent-hero` | 608×557 (1080:990) | 0 | A portrait of a person in three-quarter profile on the right, lit warm pink/magenta, set against deep purple. About 9 floating lavender line-glyph app icons (database stack, document, envelope, search, location pin, chart, quote marks, a "G"-like ring, the assistant mark) are scattered on the left. A large rounded translucent panel sits behind the figure. | `#281647` 30%, `#7878a8`, `#483060`, magenta `#510529` |
| logo cells (G1) | 6 × up to 214×80 | 0 | white monochrome company wordmarks | white on `#281647` |
| `ent-feature-assistant` | 608×456 (4:3) | 0 (square) | A pastel pink/lilac background with fine diagonal hatching. A centered 3-line caption with one phrase highlighted in a lavender box. A small white avatar bubble with the assistant mark. A white prompt card ("Type any prompt…" + gear) with a 4-item action menu (icon + label rows). | `#f0f0f0`, `#ffffff`, `#f0d8f0`, `#f0d8d8` |
| `ent-feature-agents` | 608×456 (4:3) | 0 | A teal/aqua gradient. The right side shows a document paragraph with an underlined suggestion. A floating white suggestion card (brand chip "Style rules", ✓ ✕ ⋯ actions, a correction with strikethrough → replacement, a purple **Accept** and a ghost **Dismiss** button, a hand cursor on Accept). | `#d8f0f0`, `#ffffff`, `#60c0d8`, `#78c0d8` |
| `ent-feature-pages` | 608×456 (4:3) | 0 | An iridescent pink/orange/lilac gradient. An "AI" prompt card with a sparkle icon and typed text. Below it a "Project Tracker" table: columns task / work-stream (green pills) / owner (avatar) / due date / status pills; 4 rows. Avatars + "Share" top right. | `#ffffff` 52%, `#f0a8c0`, `#d8a8d8`, `#f0a8d8` |
| `ent-feature-inbox` | 608×456 (4:3) | 0 | A blue→violet gradient with a dashed circle arc. Three stacked white pill chips ("Inbox labeled / organized / cleaned" style with check boxes). On the right an email list panel with split-inbox tabs (4 tabs with counts) and 4 rows (name, colored label pill, subject). | `#ffffff`, `#f0f0ff`, `#7890f0`, `#c0d8f0` |
| `ent-feature-builder` | 608×608 (1:1) | 0 | A blue/pink gradient frame. A floating card with a pink icon tile and a 2-line agent name. An agent-builder form: "Run agent" (outline) + "Update" (purple) buttons; sections Instructions (Role + 3-line text), Triggers (dropdown rows, "+ Add trigger"), Tools and Access. | `#ffffff`, `#fff0f0`, `#60a8f0`, `#cbd2ff` |
| `ent-security-1..6` | 69×71 each | baked (about 12) | A white rounded-square tile with a 20px dark line icon centered: key, report/chart page, admin grid with gear, fingerprint, user with gear, folder with lock. | white 72% on `#0c4243` |
| `ent-badge-1..12` | 214×80 each | 0 | Compliance-style circular emblem (about 34px; globe/laurel/stars variants) + short white label, monochrome | white/grey on `#0c4243` |
| `ent-report` | 608×475.5 (624:488) | **8** (on `picture`) | A dark purple abstract collage: a circle filled with handwriting texture, a tilted violet square, a translucent white card with large serif text, a bright blue folder shape at the bottom. | `#301860`, `#303060`, `#48a8d8`, `#f0d8ff` |
| `ent-resource-1` | 296×198 (3:2) | baked ~12 | Maroon background with faint line art. A cyan/teal card with serif body text, a magenta gradient square, a white check-badge tile. | `#481818`, `#481830`, `#60c0d8` |
| `ent-resource-2` | 296×198 | baked ~12 | Maroon background. A white app-icon tile with the brand mark, a magenta-to-teal gradient card with serif article text. | `#481818`, `#78c0d8` |
| `ent-resource-3` | 296×197.3 (592:395) | baked ~12 | Deep purple background. A coral/red painterly square, a lilac card with a small diagram. | `#301860`, `#481860`, `#ff4860` |
| `ent-resource-4` | 296×198 | baked ~12 | Maroon background with line-art circles. A reaching hand (warm orange), a white circle, a cyan/violet gem shape, an iridescent card. | `#481818`, `#481830`, `#f0d8ff` |
| `ent-quote-logo-1/2` | 237×53 | 0 | white customer wordmarks (a word mark; a mark + word) | white on `#281647` |

---

## 14. Motion summary (`/enterprise`)
1. **Logo/badge grids** (sections 2 and 12, 18 cells): each `<picture>` runs `asset-grid-fade-in` (opacity 0→1, **.5s ease-in-out**) once on mount. **No rotation** (0 mutations in 30s).
2. **FAQ accordion**: open/close height + opacity **.2s ease** (`interpolate-size: allow-keywords`), caret rotate 0 ↔ -180°, .2s ease. Only under `prefers-reduced-motion: no-preference`.
3. **Hover**: primaryFilled bg 200ms ease-in-out (`#714cb6`→`#533192` light; `#d4c7ff`→`#bea1f5` dark). primaryLink color + underline.
4. **None**: no load animation in the hero (`document.getAnimations()` is empty), no scroll-triggered reveals, no parallax, no sticky elements beyond the shared header, no carousel. The page attaches 15 IntersectionObservers (`threshold [0, 0.5]`), one per section, but no class or style change was observed while scrolling, so treat them as analytics/impression tracking. The `two-column` sticky scroll-timeline effect exists in CSS but is **not enabled** on any section here.

---

## 15. Components: reuse vs new
| piece | status |
|---|---|
| Header / Footer / MobileDrawer / SignInMenu | reuse unchanged. No Banner. |
| `Button` | reuse (primaryFilled light/dark, primaryLink). Add a **`caret-right` trailing-icon** option for primaryLink (this page uses a chevron, not the arrow). |
| `LogoStrip` | reuse with a **static mode** (no rotation), a **dark-context** border color, an optional intro line (text-medium), and multiple grids stacked. |
| `Intro` | reuse as `SectionIntro` (no lockup, optional CTAs, optional subtitle `p`) |
| `SectionGroup` / `PageSection` | **new** primitives (group bg + padding-top 0 rule) |
| `TwoColumn` + `SplitFeature` (heading-medium/large, p, bullet list, link; media cover; mediaFirst option) | **new** |
| `SplitHero` (eyebrow + display title + lede + CTA, mediumSingleCol) | **new** (the homepage `Enterprise.jsx` is similar but uses an eyebrow/heading-large/2 CTAs, so either extend it or build new) |
| `BulletList` (`•` grid list) | **new** |
| `IconFeatureGrid` (3-col, icon + heading-small + p) | **new** |
| `CardGrid` (4-col resource cards) | **new** |
| `QuoteGrid` (2-col logo + quote + attribution) | **new** |
| `CtaBand` (centered h2 + button) / `CtaBlock` (left-aligned h2 + p + button) | **new** (small) |
| `Accordion` / `FaqAccordion` | **new, shared** with `/plans` (same timing and caret) |

---

## 16. Not measured / caveats
- Footer height per width was not re-measured (it is shared). It starts right after section 18.
- **Badge and logo label text** is baked into the SVGs. The lengths above are approximate (read from screenshots).
- The FAQ open-state heights were derived from the CSS (inner + 24px padding), not from clicking each item.
- The resource-card corner radius (about 12px) is baked into the image, so I estimated it from screenshots. It was not computed.
- The third-party cookie banner, chat widget (Inter font, `Ruby.mp4`) and analytics are not part of the design.
