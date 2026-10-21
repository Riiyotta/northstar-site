Source: https://superhuman.com/plans

# Clone spec: pricing page (`/plans`)

I measured this page live on 2026-10-21 with a local Playwright Chrome (normal desktop Chrome UA, `reducedMotion: 'no-preference'`) at 1440, 1024, 768 and 390 wide. Every px value comes from `getComputedStyle` / `getBoundingClientRect` or from the page's own CSS modules (`plan_*`, `plans-comparison_*`, `features-comparison_*`, `plans-comparison-floating-header_*`, `testimonials_*`, `trusted-by_*`, `intro_*`, `product-icons_*`, `accordion_*`, `tooltip_*`, `tag_*`).

Global tokens (colors, type roles, spacing, buttons, radii, shadows), the header and the footer are the ones in `../CLONE_SPEC.md`. **The header and footer are unchanged on this page, so they are not re-specced here.** Two page-level differences:
- **No announcement banner.** `Banner` is not rendered on `/plans`. The sticky header (67px) sits directly on top of the content.
- `main` sets `--content-max-width: 1440px` and `min-width: 23.5rem`.

**Copy rule.** Every text node is listed with its role and its original character count in parentheses, plus a same-length neutral placeholder for **Northstar**. Product mapping: Mail → **Inbox**, Docs → **Pages**, Go → **Assistant**. The 4th product on the original (a writing assistant) maps to **Agents**. Plan names, prices and feature labels are invented. Prices were shown in INR on the original because the page geo-localises currency. The placeholders use `$`, and the price lengths match the INR strings.

> **Copy note.** Quoted copy strings in this spec are the independently written implementation in `src/data/plans.js` (and the "when billed monthly" label in `src/components/plans/PlanCards.jsx`), not placeholders derived from the original; every length and line count is the measured original (a second number after `/` is the implemented string's length).

New tokens this page needs (not in `tailwind.config.js` yet):
| token | value | used by |
|---|---|---|
| `blue-90` | `#0a476d` | testimonials section bg (dark context: text white) |
| `type-display-small` | `clamp(36px, 16px + 3.125vw, 61px)` / lh 1.1 / ls -0.0275em / 460 | page h1 (61 @1440, 48 @1024, 40 @768, 36 @390) |
| `type-heading-small` | `clamp(24px, 18.4px + 0.875vw, 31px)` / lh 1.2 / ls -0.0275em / 460 | (letter-spacing used on the 14px product names: -0.385px) |
| serif face | `"Super Serif VF", Georgia, Times, serif` | testimonial quotes and roles only. Substitute an OFL serif, e.g. `"Source Serif 4"`, and fall back to Georgia. The metrics were **not** compared (see caveats). |
| `elevation-large` | `0 0 0 1px rgb(71 69 67/4%), 0 1px 1px .5px rgb(71 69 67/4%), 0 3px 3px -1.5px rgb(71 69 67/2%), 0 6px 6px -3px rgb(71 69 67/4%), 0 12px 12px -6px rgb(71 69 67/4%), 0 24px 24px -12px rgb(71 69 67/4%), 0 48px 48px -24px rgb(71 69 67/4%), 0 96px 96px -32px rgb(71 69 67/6%), 0 0 0 1px rgb(222 219 213/20%)` | highlighted plan card |
| `elevation-small` | `0 0 0 1px rgb(71 69 67/4%), 0 16px 8px -8px rgb(71 69 67/1%), 0 12px 6px -6px rgb(71 69 67/2%), 0 5px 5px -2.5px rgb(71 69 67/8%), 0 1px 3px -1.5px rgb(71 69 67/16%), 0 0 0 1px rgb(222 219 213/20%)` | tooltip |
| `border-base` | `#8d8a86` (neutral-40) | highlighted card border, table highlight column, expanded accordion trigger underline |
| `icon-product` | `#421d24` (mulberry-100) | product glyph icons |
| `icon-soft` | `rgba(41,40,39,0.5)` | info icons in table |
| `bg-accent-subdued` | `#f7f5ff` (purple-0) | highlighted card bg |

---

## 0. Section order and offsets (document y / height, px)

| # | section | component | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|
| — | header (shared, sticky) | `Header` | 0 / 67 | 0 / 67 | 0 / 67 | 0 / 67 |
| 1 | gradient wrapper (contains 1a–1c) | new `PlansTop` wrapper | 67 / 1673 | 67 / 1753.5 | 67 / 1882 | 67 / 4127 |
| 1a | title + product intro grid | new `SuiteIntro` | 67 / 299 | 67 / 283 | 67 / 297.5 | 67 / 487 |
| 1b | plan cards (+ compare button ≥1080) | new `PlanCards` | 366 / 1076 | 350 / 1119 | 364.5 / 1233.6 | 554 / 3281 |
| 1c | trusted-by logo grid | **reuse `LogoStrip`** (cycling variant, new paddings) | 1442 / 298 | 1469.5 / 351 | 1598 / 351 | 3835 / 359 |
| 2 | 3-up testimonials (dark blue) | new `TestimonialTrio` | 1740 / 609 | 1820.5 / 729 | 1949 / 806 | 4194 / 1258 |
| 3 | plans & features comparison | new `PlanComparison` (+ `FloatingPlanHeader`, shared `Accordion`, `Tooltip`, `Tag`) | 2349 / 6953 | **hidden** (`display:none` <1080) | hidden | hidden |
| — | footer (shared) | `Footer` | 9302 / 859 | 2549 / 1142 | 2755 / 1141 | 5452 / 1823 |
| | document height | | 10161 | 3691 | 3896 | 7275 |

Layout breakpoints used on this page: `640.02px`, `1080.02px`, `1280.02px` (same as global).

---

## 1. Gradient wrapper (`section`, holds 1a, 1b, 1c)

- `display:flex; flex-direction:column; background: linear-gradient(0deg, #ffffff 70%, #dedbd5 153%)`. This gives a warm beige wash at the top that fades to white by about 30% of the 1673px height. It is the page's only background behind the header.
- Padding-inline: **80px** (≥1080) / **32px** (640–1080) / **24px** (<640). This differs from the global container (32/24/16). Inner width: 1280 @1440, 960 @1024, 704 @768, 342 @390.

### 1a. Title + product intro (`SuiteIntro`)
- Column, `align-items:center`, `gap:32px`, `padding-top:64px` (all widths).
- **h1** `type-display-small`, weight 460, color `#292827`, centered, `text-wrap:balance`, max-width 900. Measured: 61/67.1 ls -1.6775 (1440, 596×67, 1 line); 48/52.8 (1024); 40/44 (768); 36/39.6 (390, 2 lines 342×79). Text (implemented, `pageTitle`): "Find the right plan for you" (orig 21).
- **Product grid** (`intro`): `display:grid; grid-template-columns: repeat(4,1fr)` ≥640, `repeat(2,1fr)` <640. Max-width 960, border `1px solid rgba(115,113,109,0.2)`, radius **16px**, `overflow:hidden`. No gaps and no inner dividers: the cells sit flush on a white bg. Size: 960×136 @1440, 960×134.4 @1024, 704×157.5 @768 (cells 175.5 wide), 342×312 @390 (2×2, cells 170×155).
  - Cell: bg `#ffffff`, padding **24px 16px**, column gap 8.
  - Row 1: flex, gap 8, center-aligned. A **24×24 product glyph** (color `#421d24`: a rounded-square tile with a white symbol, see manifest) + the product name in `text-large` (20/30 @1440, 18.96/28.44 @1024, 18.32/27.48 @768, 18/27 @390), weight 540, ls -0.0075em, color text-sub `rgba(20,20,19,0.65)`.
  - Row 2: description `text-small` 16/24 540 ls -0.12px, text-sub. 2 lines @1440, 3 lines @768/390.
  - Cells in order: **Inbox** "Inbox" (orig 4) — "Email that sorts and drafts itself" (35); **Agents** "Agents" (orig 9) — "Feedback on every sentence, in any tool" (41); **Pages** "Pages" (orig 4) — "Living docs for projects, with an AI co-author." (48); **Assistant** "Assistant" (orig 2) — "A single helper that knows your whole context" (45). Product names may differ in length because they are brand names.

### 1b. Plan cards (`PlanCards`)
Wrapper: column, center-aligned, `gap:40px`, `padding-top:64px`, max-width 1440. It holds the cards row and then the compare button.

**Cards row** (`plans-comparison_container`): `display:flex; align-items:stretch; justify-content:space-around`. ≥640: `flex-wrap:nowrap`. <640: `flex-wrap:wrap`, cards stack.
- **4 plans.** Each `planContainer` is a flex column (centered) made of a 36px **highlight box** plus the **card** (`height:100%`, max-width 480).
- Plan container widths (content-sized, not equal): 1440: 320 / 320 / 320 / 320. 1024: 243.4 / 237.1 / 243.4 / 236.2. 768: 178.5 / 173.8 / 178.5 / 173.2. 390: each 342 (full width). Row height: 896 @1440 (card 861.4), 1055.3 @1024 (card 1020.5), 1169.6 @768 (card 1134.7).
- **DOM order = desktop order:** 1 Seed (free tier), 2 Arc, 3 **Meridian (highlighted)**, 4 Federation (custom pricing).
- **<640 order** (CSS `order`): highlighted = -1, free = 1, others = 0 → **Meridian, Arc, Federation, Seed**. Measured y @390: Meridian 618 (h 868), Arc 1486 (h 820), Federation 2306 (h 780), Seed 3086 (h 749). The containers touch (0 gap). The empty 34px highlight box above each non-highlighted card gives a visual gap.

**Highlight box** (all cards): height 36 (measures 34.5–34.9), width 100%, radius `8px 8px 0 0`, flex-centered, 14/22 540. Transparent and empty on normal cards. Highlighted card: bg `#292827`, `border:1px solid #292827` (no bottom border), text white. Text: "Most picked" (orig 10).

**Card** (`plan_plan`):
- bg `#ffffff`, `border:1px solid rgba(115,113,109,0.2)`, color `#292827`, weight 540, column, `gap:24px`, `align-items:start`.
- Padding: **24px** all sides (≥1080) / **24px 12px** (<1080).
- Seams ≥640 (the 4 cards read as one joined table): first card has radius `8px 0 0 8px` and **no right border**. Middle non-highlighted cards have no right border. The last card has radius `0 8px 8px 0`. A card that follows the highlighted card has **no left border**.
- <640: non-highlighted cards have a full border and radius 8. Highlighted card has radius `0 0 8px 8px`.
- **Highlighted card**: `position:relative; z-index:1; border:1px solid #8d8a86; background:#f7f5ff; box-shadow: elevation-large`. Radius 0 ≥640.
- Inside, top to bottom:
  1. **Top** (`plan_top`): column gap 16. min-height **108** (≥1280) / **134** (1080–1280) / **174** (640–1080) / none (<640).
     - Title h2: **36px**/40 600 ls -0.99px (≥1080 and <640). **24px**/40 ls -0.66 (640–1080). `text-wrap:balance`.
     - Description p: **18px**/26 540 ls -0.135 (≥1280). **16px**/26 ls -0.12 (below 1280). Color `#292827`. `text-wrap:pretty`. 2 lines @1440, 3 lines @768.
  2. **Prices** (`plan_prices`): column gap 4, min-height **120** (≥640).
     - Price h3: **32px**/48 600 ls -0.88 (≥1080, <640) / **18px**/48 ls -0.495 (640–1080).
     - Cadence: 14/22 540 text-sub, min-height 22. It is empty on the free and custom tiers but still reserves its height.
     - Monthly line (paid tiers only): 12/18, height 18. A `<strong>` price at 700 + a span at 540, both `#292827`.
  3. **CTA**: full width, height **52**, padding `1px 12px`, radius 12, 16/16 600, centered label.
     - Non-highlighted: **primaryOutline** (transparent bg, `box-shadow: inset 0 0 0 1px #714cb6`, text `#714cb6`. Hover: `inset 0 0 0 2px #533192`, text `#533192`, `transition: box-shadow .2s ease-in-out`).
     - Highlighted: **primaryFilled** (bg `#714cb6`, text white, hover bg `#533192`, `transition: background-color .2s ease-in-out`).
  4. **Features block** (column gap 16):
     - Product rows (`productIcons`): column gap 12, min-height **120** (≥640). Each row: 20×20 glyph (`#421d24`) + gap 8 + name 14/20 540 ls -0.385px `text-transform:capitalize`. Seed and Arc have 3 rows (Agents, Pages, Assistant). Meridian and Federation have 4 rows (Inbox, Agents, Pages, Assistant).
     - "Includes" header: 16/28 **600** `#292827`.
     - Feature `ul`: `padding-inline-start:24px`, column gap 12, `list-style-image` = a **21×20 check**. Draw it as an SVG polyline (6.49,11.09)→(9.41,14.01)→(15.97,7.45), stroke `#474543`, width 1.458, round caps. `li` has line-height 10px with `::marker` 14px. The text `span` is 14px 540 `#292827` `vertical-align:super`. Item heights: 2-line 36.3, 1-line 20 (@1440, column 247 wide).

Plan copy (orig length in parens):
| | Seed (plan 1) | Arc (plan 2) | Meridian (plan 3, highlighted) | Federation (plan 4) |
|---|---|---|---|---|
| name | "Seed" (4) | "Arc" (3) | "Meridian" (8) | "Federation" (10) |
| description | "Try the essentials at no cost and see what sticks for you." (57) | "For individuals who write a lot and want help with it every day." (58) | "For teams that live in email and docs all day long." (51) | "For companies that need audits, governance and a named partner." (62) |
| price | "$ 0" (3) | "$ 9.5" (5) | "$ 24.5" (6) | "Custom" (6) |
| cadence | (empty) | "per seat / month, if billed yearly." (35) | same | (empty) |
| monthly line | — | "$ 11.5" (6) + " " + "when billed monthly" (19) | same pattern | — |
| CTA | "Start the Seed plan" (19) | "Start the Arc plan" (18) | "Start the Meridian plan" (23) | "Talk to sales" (13) |
| includes header | "Seed includes:" (14) | "Everything in Seed, and also this:" (34) | "Everything in Arc, and also this:" (33) | "Everything in Meridian, and also this:" (38) |

Feature bullets:
- Seed (5): "Get quick answers from AI without switching windows" (52); "Clarity checks across twenty languages" (39); "First drafts tuned to the way you already like to write" (48); "Shared docs with embedded tables, charts, kanban boards and quick polls" (71); "Keep docs current using formulas and basic automations." (56)
- Arc (6): "Unlimited paragraph-level rewrites and translations every month" (66); "Check work for AI-generated text and borrowed lines." (52); "House-style rules applied automatically" (38); "Host public docs at your own URL, styled with your logo" (56); "No cap on doc size and a month of restore points." (50); "Starter layouts that suggest structure as you go along" (56)
- Meridian (6): "The full Northstar Inbox, with AI triage switched on for all" (57); "Lanes, labels and priority ranking that set themselves up for you." (67); "Reply drafts waiting in every thread, in your own words" (54); "Look up and edit CRM contacts and deals from the side of any message." (72); "No limit on doc automations and every revision kept forever." (62); "Live embeds from issue trackers, code hosts and design files" (59)
- Federation (7): "Adoption and ROI reports" (23); "Granular admin and security policy" (36); "SAML single sign-on" (19); "Role-based access controls" (28); "Data loss prevention" (20); "BYOK encryption" (15); "Named success manager" (22)

**No billing toggle.** The CSS bundle ships a `billing-switch` (segmented monthly/annual control), but it is **not rendered** on this page. Annual pricing is shown, with the monthly price as a secondary line. Don't build a toggle.

**Compare button** (≥1080 only, `display:none` at ≤1080px): **primaryGhost** large. 314.9×52, padding 6/20, radius 12, transparent bg (hover `rgba(0,0,0,0.05)`, `.2s ease-in-out`), text `#714cb6` 16/16 600, trailing **20px caret-down** icon, gap 4, `margin-bottom:24px`. Centered at y 1366 @1440. Text: "See every plan side by side below" (orig 34). Click: **smooth-scrolls** the window to the top of section 3 (native `scrollIntoView({behavior:'smooth'})`). Sampled scrollY 0 → 942 → 1027 → 1725 → 2097 → 2265 → 2327 → 2348 → 2349, settling in about 700ms.

### 1c. Trusted-by logo grid (reuse `LogoStrip`)
- `content-wrapper` inside the gradient section: margin-inline = global viewport padding (32/24/16). Content width 1216 @1440, 912 @1024, 656 @768, 310 @390. <640: max-width 30rem.
- Padding-block (`--trusted-by-padding-block`): **72/80** (≥1280), **72/64** (1080–1280), **64/64** (640–1080), **48/64** (<640).
- Heading `p`: **20px / 24px / 460**, `#292827`, centered, `text-wrap:pretty` (it overrides the homepage 16px text-small/text-sub style). Text: "Startups and global firms alike plan their days here" (orig 53).
- Grid: same as homepage `asset-grid`: top+left hairline on the container, right+bottom on cells, `rgba(115,113,109,0.2)`. margin-top 40 (≥1080) / 36. **6 cols** ≥1080 (cells 202.5×81 @1440), **3 cols × 2 rows** below (303.7 @1024, 218.3 @768, 103 @390). Logos `object-fit:contain`, 80 tall, natural 228×80.
- **Motion: rotating logos. This is the same behavior as the existing `LogoStrip` cycling implementation, so reuse it as is.** Measured over 30s with a MutationObserver: every **2000ms** one random cell gets `fadeOut` (opacity 1→0, **.5s ease-in-out**). **500ms** later its `<picture>` is removed (the cell is blank). **500ms** after that (1000ms after fade-out start) a new logo mounts with `fadeIn` (0→1, .5s ease-in-out). Pool: **11 logos** across 6 cells, and no logo is shown twice at once. It **keeps cycling when the grid is scrolled out of view** (24 mutations in 12s off-screen). On first mount every logo plays the 500ms fade-in.

---

## 2. Testimonials (`TestimonialTrio`, new)

- `section` bg **`#0a476d`** (dark context: base text white). Full bleed.
- Container: `content-wrapper` with max-width **1208** + padding-inline (32 / 24 / 16), so the box is 1272 @1440. Column, center-aligned. Padding-block **96** (≥640) / **40** (<640). Gap **80** (≥640) / **48** (<640).
- **h3** `heading-medium` (39/46.8 @1440, 33.28/39.94 @1024, 29.76/35.71 @768, 28/33.6 @390), 460, white, centered, balance. 1 line @1440 (836 wide). Text: "What teams tell us after a few weeks on Northstar" (orig 50).
- Items: flex **row** ≥640 with `gap:72px`, **column** <640 with `gap:48px`. Each item `flex:1 1`, column gap 16. Item width: 354.7 @1440, 277.3 @1024, 192 @768, 358 @390.
  - Images row: ≥1080 a **row** (center-aligned, gap 16). <1080 a **column** (start-aligned, gap 16). It holds a **75×75 circular portrait** (`border-radius:50%`) and a **white company wordmark** (161×39, 111×31, 119×33; heights 31–39).
  - `blockquote` (`position:relative`): **serif** 18/27 weight 460, ls -0.135, white. Hanging open quote via `::before{content:"“"; position:absolute; inset-inline-end:100%; top:0; margin-inline-end:1px}`, which sits about 9px left of the text column. 4 lines @1440 (5 for the third).
  - Attribution: name **sans** 16/24 **700** white, then role **serif** 16/24 460 white (separate lines).
- Copy (implemented, `testimonials.items`): (1) "The first week, I archived a backlog I had ignored for a year. By the second, my team was asking for seats. It is the rare tool people adopt without being told to." (163) — "Dana Morrow" (11), "COO, Tidewater" (14). (2) "We rolled out Pages for planning and Agents for writing, and support has been hands-on since day one. Questions get answered by people who clearly know our setup well." (177) — "Felix Bramwell" (14), "VP of Product, Copperleaf Labs" (28). (3) "Before approving anything, we ran Northstar through a full vendor review and it passed cleanly. Since launch, Inbox has cut response times for our analysts, and nobody wants the old setup back." (200) — "Sana Iqbal" (11), "Head of Security Engineering, Bellhaven" (42).

---

## 3. Plans & features comparison (`PlanComparison`, ≥1080 only)

`display:none` below 1080.02px. Nothing replaces it on tablet or mobile, and the compare button is hidden too.

### 3.1 Container
- Outer: full-bleed, bg **`#f7f5f2`**, flex centered.
- Inner: **1080 wide** (centered, x 180 @1440), column, padding **80px 0**.
- Title h3: `heading-large` (49/58.8 @1440) but weight **540**, `#292827`, `padding-bottom:32px`, left-aligned, max-width 900. Text: "Plans and features" (18).

### 3.2 Header row (in-flow `thead`)
- `table` 1080 wide, `table-layout:fixed; border-collapse:collapse`. Columns: **feature column 400** (auto) + **4 plan columns × 170**.
- One `tr`, **44px** tall. Cells: padding `0 8px` (feature cell padding-left 24), vertical-middle. Labels: 18/27 **700** `#292827` (capitalize). The feature cell is left-aligned: "Feature" (7). Plan cells are centered: Seed / Arc / Meridian / Federation. Not highlighted.

### 3.3 Groups = accordion (5 items, all **expanded by default**)
Accordion root: column, gap 0, width 1080. Item: transparent bg, no side borders, radius 0, `border-top:1px solid rgba(115,113,109,0.2)`, and the last item also has `border-bottom`.
- **Trigger** `button` (inside an `h3`): full width, flex `space-between`, `align-items:center`, gap 16, **padding-block 12px**, no padding-inline. Height **65**. Color `#000` (button default).
  - Label span: **32px/40px 540**, ls -0.24px, `#292827`, sans.
  - Icon: **20px caret-small-down** at the right edge. Expanded = rotated 180° (`transform: rotate(-180deg)`), collapsed = 0. `transition: transform .2s ease` (only under `prefers-reduced-motion: no-preference`).
  - Expanded trigger: `border-bottom:1px solid #8d8a86`.
  - Hover: bg `rgba(0,0,0,0.05)`. Focus-visible: `outline:2px solid #714cb6; outline-offset:-5px; border-radius:8px`.
- **Panel**: collapsed = `height:0; opacity:0; content-visibility:hidden; overflow:hidden`. Expanded = `height:auto; opacity:1`. `transition: height .2s ease, opacity .2s ease, content-visibility .2s allow-discrete`, with `:root{interpolate-size:allow-keywords}` so `height:auto` animates. Measured collapse of the first group: panel height 1240 → 733 → 245 → 96 → 5 → 0 over about 200ms, opacity 1 → .59 → .20 → .08 → 0, caret rotating in sync. No extra padding inside the panel (group height = 1 + 65 + sum of its tables).
- Group trigger texts: Assistant (orig 2), Agents (orig 9), Inbox (orig 4), Pages (orig 4), "Across the suite" (16).
- Group heights @1440 (expanded): 1305.5, 1215, 1792, 1481.5, 864. Collapsed: 65 each.

### 3.4 Section tables (inside each panel)
Each feature section is its own `table` (same column grid, 1080 fixed) with `border-bottom:1px solid rgba(115,113,109,0.2)`.
- **Section title row** (`thead tr`): **74px**. First cell padding-left 24, label **16/24 700** `#292827` (some have a trailing info icon, see below). The other 4 cells are empty. The highlighted column cell still gets the highlight bg and borders.
- **Feature rows**: **44px**. The **last row of each section is 60px** (`padding-bottom:16px`, padding-top 0, so its content sits higher).
  - Feature cell: padding-left 24 (right 0). Content: flex row, gap 4, center-aligned. Label `span` **12px/18px 540**, ls -0.09px, `#292827`, max-width 325. Optional **Beta tag** and/or **info icon** after it.
  - Value cells: 170 wide, padding `0 8px`, centered, vertical-middle, `line-height:18px`. A value is one of:
    - **check**: SVG 18×13 rendered (viewBox 20×20 check path, `fill: currentColor`, color `#292827`), `margin:0 auto`.
    - **text**: 12/18 540 `#292827`, centered, wraps to 2 lines when needed (for example a 49-char string fills 154px over 2 lines). Can carry a trailing info icon.
    - **empty**: nothing at all. **There are no dash glyphs.**
  - **Highlighted column** (3rd plan, Meridian): every `th`/`td` in it has bg **`#f2f0eb`** and `border-left/right:1px solid #8d8a86`. That draws a continuous tinted column from each group's first section to its end. It is not highlighted in the top `thead`.
- **Beta tag**: inline-flex pill, bg `#e8e0ff`, text `#3f256f`, `border:1px solid #e8e0ff`, **12px/14.4px 600**, ls -0.12px, padding `1px 6px`, radius **6px**. Measured 38.5×18.4 with "Beta" (4). Placeholder: "Beta" → "Beta" (generic UI label) or "New!".
- **Info icon + tooltip**: a 14×14 info glyph (circle outline with "i"), color `rgba(41,40,39,0.5)`, wrapped in `div.tooltip_trigger` (inline-flex, `cursor:pointer`, `aria-describedby` → tooltip).
  - Hover: after about **200ms** delay a tooltip mounts. `position:absolute`, **max-width 200**, bg `#292827`, text white **12px/18px 400**, padding `4px 8px`, radius **8**, shadow `elevation-small`, `pointer-events:none`. Animation `tooltip_fade-in .2s ease` (opacity 0→1). Then `opacity:1`. The base state is `opacity:0; transform:scale(.95)`, but the visible class overrides the transform with its translate.
  - Placement: **to the right** of the icon, 10.5px gap (tooltip x = icon right + 10.5), top 5.6px above the icon top. It has a small SVG arrow, fill `#292827`, pointing left. The arrow size was not measured. Example: a 50-char tip renders 200×44 (2 lines).
  - Mouse-out: removed immediately.
  - Tooltip copy is not visible until hover. Use neutral sentences of 40–80 chars.
- **"+ More" row** (Agents group, row 14): feature cell holds `"+"` (12px `#292827`) followed by a link "More" (12px, `#292827`, `text-decoration:underline`, `target=_blank`). The value cells are empty.

### 3.5 Table content (invented labels)
Columns: Seed | Arc | **Meridian (highlighted)** | Federation. Lengths are shown as (original length / implemented-string length when they differ). Labels and text values are the implemented strings from `src/data/plans.js` `comparison`; each cell's value type (check / text / empty) is exact.


**Group: Assistant** (trigger text 2 ch → "Assistant")


*Section row* (74px): "Features" (8)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Available on web, desktop and mobile devices" (40/44) |  | 44 | check | check | check | check |
| 2 | "Open as a full window, a side panel or in-line" (49/46) |  | 44 | check | check | check | check |
| 3 | "Chat with AI on web, desktop and mobile devices" (46/47) |  | 44 | "Core chat features" (19/18) | "Full chat, limited-time trial" (31/29) | "Full chat, limited-time trial" (31/29) | "Full chat, limited-time trial" (31/29) |
| 4 | "Proactive next-step prompts" (24/27) | Beta tag | 44 | "Limited access" (14) | "Full feature, limited-time trial" (33/32) | "Full feature, limited-time trial" (33/32) | "Full feature, limited-time trial" (33/32) |
| 5 | "Cursor-side questions and answers" (34/33) | Beta tag | 44 | "Limited access" (14) | "Full feature, limited-time trial" (33/32) | "Full feature, limited-time trial" (33/32) | "Full feature, limited-time trial" (33/32) |
| 6 | "Thread organization" (17/19) | info icon | 44 | check | check | check | check |
| 7 | "Extended thinking on complex, layered tasks" (39/43) |  | 44 | "Limited" (7) | check | check | check |
| 8 | "Proofread" (9) |  | 44 | "Core grammar checks and in-line feedback" (42/40) | "Full access, with customization on a trial basis" (49/48) | "Full access, with customization on a trial basis" (49/48) | "Full access, with customization on a trial basis" (49/48) |
| 9 | "Writing agents made by our own team" (35) | info icon | 44 | "Limited" (7) | check | check | check |
| 10 | "Writing agents that step in without prompting" (45) | info icon | 44 | (empty) | "Trial only." (13/11) | "Trial only." (13/11) | "Trial only." (13/11) |
| 11 | "Custom agents" (13) | Beta tag | 44 | (empty) | "Limited" (7) +info | "Extended" (8) +info | "All" (4/3) |
| 12 | "Publish agents to your team library" (35) |  | 44 | (empty) | check | check | check |
| 13 | "Adapt agents others shared" (26) |  | 44 | (empty) | check | check | check |
| 14 | "Email assistant" (15) |  | 44 | (empty) | check | check | check |
| 15 | "Connectors" (10) | info icon | 44 | (empty) | "Individual" (8/10) +info | "Team" (4) +info | "Federation" (10) +info |
| 16 | "API" (3) |  | 44 | (empty) | check | check | check |
| 17 | "Partner agents" (14) |  | 44 | (empty) | check | check | check |
| 18 | "Sync interval settings" (19/22) |  | 44 | (empty) | "Coming soon" (11) | "Coming soon" (11) | "Coming soon" (11) |
| 19 | "Import volume limits" (21/20) |  | 60 | (empty) | "Coming soon" (11) | "Coming soon" (11) | "Coming soon" (11) |

*Section row* (74px): "Privacy" (7)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Model training" (14) |  | 60 | "Opt-out" (7) | "Opt-out" (7) | "Opt-out" (7) | "Off by default" (14) |

*Section row* (74px): "Usage" (5) +info

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Usage dashboard" (14/15) |  | 44 | "Coming soon" (11) | "Coming soon" (11) | "Coming soon" (11) | "Coming soon" (11) |
| 2 | "Usage credits" (13) |  | 60 | (empty) | "Trial only." (13/11) | "Trial only." (13/11) | "Trial only." (13/11) |

**Group: Agents** (trigger text 9 ch → "Agents")


*Section row* (74px): "Writing features" (16)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Grammar and spell check" (23) | info icon | 44 | check | check | check | check |
| 2 | "Tone detection" (14) | info icon | 44 | check | check | check | check |
| 3 | "Tone suggestions" (16) | info icon | 44 | "Limited" (7) | check | check | check |
| 4 | "Sentence rewrites" (17) | info icon | 44 | (empty) | check | check | check |
| 5 | "Flow and readability" (19/20) | info icon | 44 | (empty) | check | check | check |
| 6 | "Inclusive wording checks" (23/24) | info icon | 44 | (empty) | check | check | check |
| 7 | "Bibliography formatting" (25/23) | info icon | 44 | (empty) | check | check | check |
| 8 | "Prompt-based generation" (24/23) | info icon | 44 | "Starter quota" (15/13) | "Larger quota" (12) | "Highest quota" (12/13) | "Highest quota" (12/13) |
| 9 | "Translate whole passages, 19 languages" (37/38) | info icon | 44 | "Limited" (7) | "Unlimited" (9) | "Unlimited" (9) | "Unlimited" (9) |
| 10 | "Rewrite whole passages in any language" (34/38) | info icon | 44 | "Limited" (7) | "Unlimited" (9) | "Unlimited" (9) | "Unlimited" (9) |
| 11 | "Final-pass proofing agent" (27/25) | info icon | 44 | "Limited" (7) | "Unlimited" (9) | "Unlimited" (9) | "Unlimited" (9) |
| 12 | "AI detection agent" (18) | info icon | 44 | (empty) | "Unlimited" (9) | "Unlimited" (9) | "Unlimited" (9) |
| 13 | "Copied-text scanner agent" (24/25) | info icon | 44 | (empty) | check | check | check |
| 14 | "+" then link "More" (4) (underlined, opens catalog) |  | 44 | (empty) | (empty) | (empty) | (empty) |
| 15 | "Pages agent access" (16/18) | info icon | 60 | check | check | check | check |

*Section row* (74px): "Team features" (13)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "ROI report" (10) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 2 | "Team writing health score" (29/25) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 3 | "Style guide" (11) | info icon | 44 | (empty) | "1" (1) | "1" (1) | "Unlimited" (9) |
| 4 | "Brand voices" (11/12) | info icon | 44 | (empty) | "1" (1) | "1" (1) | "Unlimited" (9) |
| 5 | "Term glossary" (15/13) | info icon | 44 | (empty) | check | check | check |
| 6 | "Snippets" (8) | info icon | 44 | (empty) | check | check | check |
| 7 | "Analytics dashboard" (19) | info icon | 60 | (empty) | "Team analytics" (14) | "Team analytics" (14) | "Team and per-person analytics" (29) |

**Group: Inbox** (trigger text 4 ch → "Inbox")


*Section row* (74px): "AI" (2)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Ask AI" (6) | info icon | 44 | (empty) | (empty) | check | check |
| 2 | "Drafts that sound like you wrote them" (36/37) | info icon | 44 | (empty) | (empty) | check | check |
| 3 | "One-tap reply" (13) | info icon | 44 | (empty) | (empty) | check | check |
| 4 | "One-tap event" (13) | info icon | 44 | (empty) | (empty) | check | check |
| 5 | "Auto drafts" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 6 | "Auto archive" (12) | info icon | 44 | (empty) | (empty) | check | check |
| 7 | "Auto labels" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 8 | "Auto reminders" (14) | info icon | 44 | (empty) | (empty) | check | check |
| 9 | "Auto summary" (14/12) | info icon | 44 | (empty) | (empty) | check | check |
| 10 | "Autocorrect" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 11 | "Autocomplete" (12) | info icon | 44 | (empty) | (empty) | check | check |
| 12 | "Custom auto labels" (18) | info icon | 60 | (empty) | (empty) | check | check |

*Section row* (74px): "Email productivity" (18)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Focus lanes" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 2 | "Snippets" (8) | info icon | 44 | (empty) | (empty) | check | check |
| 3 | "Remind me" (9) | info icon | 44 | (empty) | (empty) | check | check |
| 4 | "Snooze" (6) | info icon | 44 | (empty) | (empty) | check | check |
| 5 | "Unsubscribe" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 6 | "Read statuses" (13) | info icon | 44 | (empty) | (empty) | check | check |
| 7 | "Quote reply" (11) | info icon | 44 | (empty) | (empty) | check | check |
| 8 | "Offline mode" (15/12) | info icon | 44 | (empty) | (empty) | check | check |
| 9 | "Open tracking" (12/13) | info icon | 44 | (empty) | (empty) | check | check |
| 10 | "Look up and edit customer records beside any open email" (59/55) | info icon | 60 | (empty) | (empty) | check | check |

*Section row* (74px): "Calendar and meeting booking" (26/28)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Calendar" (8) | info icon | 44 | (empty) | (empty) | check | check |
| 2 | "Bookable slots sent inside a message" (32/36) | info icon | 44 | (empty) | (empty) | check | check |
| 3 | "Attach a video call link to any event with one shortcut" (51/55) | info icon | 60 | (empty) | (empty) | check | check |

*Section row* (74px): "Team collaboration" (18)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Shared mail threads" (20/19) | info icon | 44 | (empty) | (empty) | check | check |
| 2 | "Team comments" (13) | info icon | 44 | (empty) | (empty) | check | check |
| 3 | "Shared drafts" (13) | info icon | 44 | (empty) | (empty) | check | check |
| 4 | "Seen-by indicators" (18) | info icon | 44 | (empty) | (empty) | check | check |
| 5 | "Who-is-replying alerts" (21/22) | info icon | 44 | (empty) | (empty) | check | check |
| 6 | "Team scheduling" (15) | info icon | 60 | (empty) | (empty) | check | check |

**Group: Pages** (trigger text 4 ch → "Pages")


*Section row* (74px): "Core" (4)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Pages and objects" (17) | info icon | 44 | "Limited for shared docs" (23) | "Unlimited" (9) | "Unlimited" (9) | "Unlimited" (9) |
| 2 | "Pages AI writer" (17/15) | Beta tag, info icon | 44 | "Trial only." (13/11) | check | check | check |
| 3 | "Databases" (9) | Beta tag, info icon | 44 | (empty) | (empty) | check | check |
| 4 | "AI-generated views" (18) | Beta tag, info icon | 44 | "Trial only." (13/11) | check | check | check |
| 5 | "Automations" (11) | info icon | 44 | "Low limit" (9) | "Higher limit" (12) | "Unlimited" (9) | "Unlimited" (9) |
| 6 | "Attachments" (11) | info icon | 44 | "1 GB per doc" (11/12) | "5 GB per doc" (11/12) | "Unlimited" (9) | "Unlimited" (9) |
| 7 | "Connectors" (10) | info icon | 44 | "Manual refresh" (14) | "Daily refresh" (13) | "Hourly refresh" (14) | "Hourly refresh" (14) |
| 8 | "Forms" (5) | info icon | 44 | "Unlimited" (9) | "Your branding plus conditional steps" (34/36) | "Your branding plus conditional steps" (34/36) | "Your branding plus conditional steps" (34/36) |
| 9 | "Linked docs" (9/11) | info icon | 44 | "Simple linked-doc tables" (24) | "Linked-doc tables" (16/17) | "Linked tables and actions" (26/25) | "Linked tables and actions" (26/25) |
| 10 | "Version history" (15) | info icon | 44 | "7 days" (6) | "30 days" (7) | "Unlimited" (9) | "Unlimited" (9) |
| 11 | "Desktop and mobile apps" (22/23) | info icon | 44 | check | check | check | check |
| 12 | "API" (3) | info icon | 60 | "Trial only." (13/11) | check | check | check |

*Section row* (74px): "Collaboration and sharing" (23/25)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Real-time collaboration" (23) | info icon | 44 | check | check | check | check |
| 2 | "Page and folder sharing" (20/23) | info icon | 44 | check | check | check | check |
| 3 | "Synced blocks" (10/13) | info icon | 44 | check | check | check | check |
| 4 | "Unlisted docs" (12/13) | info icon | 44 | (empty) | check | check | check |
| 5 | "Custom domains" (14) | info icon | 44 | (empty) | check | check | check |
| 6 | "Locking" (7) | info icon | 44 | (empty) | (empty) | check | check |
| 7 | "Field-level locks" (16/17) | info icon | 44 | (empty) | (empty) | check | check |
| 8 | "Required approval steps" (21/23) | info icon | 60 | (empty) | (empty) | check | check |

*Section row* (74px): "Workspace features" (18)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Unlimited folders" (17) | info icon | 44 | check | check | check | check |
| 2 | "Custom icons" (12) | info icon | 44 | (empty) | check | check | check |
| 3 | "Folder permissions" (20/18) | info icon | 44 | (empty) | (empty) | check | check |
| 4 | "Subfolders" (10) | info icon | 44 | (empty) | (empty) | check | check |
| 5 | "Readership analytics" (22/20) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 6 | "Domain capture" (14) | info icon | 60 | (empty) | (empty) | (empty) | check |

**Group: Across the suite** (trigger text 16 ch → "Across the suite")


*Section row* (74px): "Support and success" (19)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "Help center" (11) | info icon | 44 | check | check | check | check |
| 2 | "Webinars and training" (21) | info icon | 44 | check | check | check | "Private" (7) |
| 3 | "Customer success" (16) | info icon | 44 | (empty) | (empty) | (empty) | "Dedicated" (8/9) |
| 4 | "Priority support" (16) | info icon | 44 | (empty) | (empty) | check | check |
| 5 | "Live chat" (9) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 6 | "Guided onboarding" (17) | info icon | 60 | (empty) | (empty) | (empty) | check |

*Section row* (74px): "Security, compliance, and admin controls" (40)

| # | label (len) | flags | h | Seed | Arc | Meridian | Federation |
|---|---|---|---|---|---|---|---|
| 1 | "SAML SSO" (8) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 2 | "SCIM" (4) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 3 | "SOC 2 Type II" (14/13) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 4 | "Audit logs" (10) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 5 | "Organization-wide controls" (27/26) | info icon | 44 | (empty) | (empty) | (empty) | check |
| 6 | "HIPAA" (5) | info icon | 44 | (empty) | (empty) | (empty) | "Agents, Pages, Assistant only" (28/29) |
| 7 | "Legal hold and e-discovery" (26) | info icon | 44 | (empty) | (empty) | (empty) | "Pages only" (9/10) |
| 8 | "BYOK" (4) | info icon | 60 | (empty) | (empty) | (empty) | "Agents and Inbox only" (23/21) |


Totals: **5 groups, 14 section tables, 115 feature rows** (+14 section-title rows; per group: Assistant 3 sections / 22 rows, Agents 2 / 22, Inbox 4 / 31, Pages 3 / 26, Across the suite 2 / 14). Value types: check, text, empty. No dashes, no crosses.

### 3.6 Floating plan header (`FloatingPlanHeader`, ≥1080 only)
A second, fixed copy of the plan header that slides down while the table is in view.
- `position:fixed; top:0; left:0; right:0; z-index:300` (above the site header, which is z 201, so it **covers the sticky header**). Bg **`#f2f0eb`**, shadow **`elevation-medium`**, height **201**. `display:none` <1080.
- Hidden: `transform: translateY(-110%)` (measured -221.1px). Visible: `translateY(0)`. `transition: transform .3s ease-in-out`. `aria-hidden` toggles with it.
- **Trigger (scroll listener, measured by bisection @1440):** **shows** once `scrollY ≥ 2448.5`, which is when the in-flow table header's top edge (doc y 2519.7) reaches **71px** below the viewport top. **Hides** again once `scrollY ≥ 9051.5`, which is when the bottom of the accordion (doc y 9221.7) rises to **170px** from the viewport top. It is hidden above and below that range (bidirectional).
- Content: column centered → `table` 1080 (`table-layout:fixed`). One flex row (`justify-content:end`). The first cell is empty (400 wide, flex 1). Then 4 plan cells × 170, each padding **16px 8px**, holding a column with gap 8:
  - Plan name: 20/30 **700** `#292827`, left-aligned (the highlighted column's button text is also 700).
  - Price: 18/27 540 `#292827`.
  - Cadence: 16/24 540 text-sub, min-height 40 (2 lines). Empty for the free and custom tiers.
  - CTA: min-width 120, **154×48**, padding 6/20, radius 12, label **14px**/16 600 centered. Non-highlighted are primaryOutline (inset 1px `#714cb6`). Highlighted is primaryFilled `#714cb6`/white.
  - Copy: Seed / "$ 0" (3) / CTA "Get Seed" (8); Arc / "$ 9.5" (5) / "per seat / month, if billed yearly." (35) / "Get Arc" (7); Meridian / "$ 24.5" (6) / same cadence / "Get Meridian" (12); Federation / "Custom" (6) / "Talk to sales" (13).

---

## 4. Motion summary (`/plans`)
1. **Logo grid rotation** (section 1c): 2000ms period, one random cell. Fade-out .5s ease-in-out, blank for .5s, fade-in .5s ease-in-out with a logo not currently shown. 11-logo pool. Runs while off-screen. The existing `LogoStrip` already implements this (including the reduced-motion opt-out).
2. **Floating plan header**: translateY(-110%) ↔ 0, **.3s ease-in-out**, scroll-position trigger (see 3.6).
3. **Accordion groups**: height/opacity **.2s ease** with `interpolate-size`. Caret rotate 180°, .2s ease. Hover bg tint.
4. **Tooltip**: about 200ms hover delay, then a .2s ease fade-in. Instant hide.
5. **Compare button**: native smooth scroll to the comparison (about 700ms).
6. Hover micro-interactions: outline buttons inset ring 1→2px and color → `#533192`, .2s ease-in-out. Filled buttons bg → `#533192`. Ghost button bg `rgba(0,0,0,.05)`.
7. **None**: no load-in animations, no scroll-triggered reveals (`document.getAnimations()` empty after a full scroll), no parallax, no carousel. The page registers an IntersectionObserver (`threshold [0, .5]`) on one section, but no style or class change was observed, so treat it as analytics. The other IntersectionObserver (`rootMargin 200px`) is Next.js link prefetch.

---

## 5. Components: reuse vs new
| piece | status |
|---|---|
| Header, Footer, MobileDrawer, SignInMenu | reuse, unchanged. No Banner on this page. |
| `Button` (primaryFilled, primaryOutline, primaryLink) | reuse. Add a **`primaryGhost`** variant (transparent, purple text, hover tint) and a **48px compact-large** size for the floating header (14px label). |
| `LogoStrip` | reuse the cycling logic. Make the heading style (20/24/460 base color) and the section padding configurable, and it must render inside the gradient wrapper (transparent bg). |
| `SuiteIntro` (h1 + 4-cell product grid) | **new** |
| `PlanCards` / `PlanCard` (+ highlight box, product rows, check list) | **new** |
| `TestimonialTrio` (dark-blue 3-up with portraits, serif quotes) | **new** (the homepage `Testimonial` is a single centered quote, so it doesn't fit) |
| `PlanComparison` (title, thead, section tables, highlighted column) | **new** |
| `Accordion` (generic: trigger + animated panel + caret) | **new, shared** with `/enterprise` FAQ |
| `Tooltip`, `Tag` (Beta pill) | **new**, small |
| `FloatingPlanHeader` | **new** |

---

## 6. Not measured / caveats
- **Comparison and floating header below 1080**: they don't exist (CSS `display:none`), so there is nothing to measure.
- **Tooltip arrow** size and exact offset math were not measured. The position is from one sample (icon at viewport 296.5,442.6 → tooltip at 321,437).
- **Serif font**: "Super Serif VF" is proprietary. I did not measure a metric match for the substitute. Expect small wrap differences in the testimonial quotes.
- **Currency**: the original rendered INR (₹) for this geo. Prices here are invented.
- The cookie-consent banner (third-party, Transcend), the chat widget (Qualified: its `Inter` fonts and a `Ruby.mp4` video) and the analytics scripts are not part of the design. Don't clone them.
- The `plan-card_*`, `callout_*`, `faq_*` and `billing-switch_*` CSS modules exist in the bundle but are **not rendered** on this variant of the page.
