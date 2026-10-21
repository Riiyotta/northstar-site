Source: https://superhuman.com/agents

# Clone spec: agents page (`/agents` → **Northstar Agents**)

I measured this page live on 2026-10-21 with a local Playwright Chrome (normal desktop Chrome UA, `reducedMotion: 'no-preference'`, cookie banner hidden) at 1440, 1024, 768 and 390 wide (900px viewport; 844 at 390). Every px value comes from `getComputedStyle` / `getBoundingClientRect` or from the page's CSS modules (`two-column_*`, `card_*`, `media-object_*`, `multi-column_*`, `asset-grid_*`, `accordion_*`, `hero-title_*`, `cta-group_*`).

Global tokens, buttons, the footer and the header layout come from `../CLONE_SPEC.md`. Shared new pieces defined in `go.md` are referenced, not repeated: `type-display-small`, `type-heading-small`, the header CTA variant, `Faq`/`Accordion`, `HelperCard`, `SplitMedia`.

**Copy rule.** Copy is not reproduced. The **copy deck in §14** lists every text node by key with its original length and a Northstar placeholder. Placeholders are independently written; lengths are within ±10%. Mapping: Superhuman agents → **Northstar Agents**, Go → **the assistant / Northstar Assistant**, Mail → **Inbox/Mail**, Docs → **Pages**. Named third-party agents and brands are replaced with generic agent names.

**Page-level facts**
- No announcement banner. The first section starts at y = 67.
- `--color-bg-primary` is **`#ffffff`** here. The header is white, the same as the homepage.
- **No dashed rails** on this page (`::after` / `::before` cutouts are off on every section).
- **Motion is minimal**: a one-time logo fade-in, the accordion, and hover states. No scroll-driven effects, no videos, no carousels, no reveal-on-scroll (§12).
- Images are AVIF via `<picture>`. Agent icons, trust icons and customer logos are SVG.

## 0. New tokens
| token | value | used by |
|---|---|---|
| `type-display-small` | `clamp(36px, 16px + 3.125vw, 61px)` / lh 1.1 / ls -0.0275em / 460. 61/67.1, 48/52.8, 40/44, 36/39.6 | hero h1 |
| `type-heading-small` | `clamp(24px, 18.4px + 0.875vw, 31px)` / lh 1.2 / ls -0.0275em / 460. **31/37.2 @1440, 27.36/32.83 @1024, 25.12/30.14 @768, 24/28.8 @390** | trust column titles (§10) |
| `purple-0` as section bg | `#f7f5ff` | hero group, trust section |
| two-column gaps | `gapM`: 24 (<640) / 40 (640–1080) / **64** (≥1080). `gapL`: 32 / 64 / **128** | hero (M), split sections (L) |

Two-column breakpoints used here: `smallSingleCol` is a row at ≥640. `mediumSingleCol` is a row only at **≥1080** (hero). Below the breakpoint the columns stack in DOM order.

---

## 1. Header
The same **product variant** as `/go` (`go.md` §1): CTAs "Contact sales" + "Log in" (unstyled) + "Sign up" (primaryFilled compact 80.1×36). The difference from `/go` is the background, which is **`#ffffff`** here. Drawer and visibility rules are identical. No change on scroll.

## 2. Section order and offsets (document y / height, px)

| # | section | bg | component | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|
| — | header | `#fff` | `Header` (product CTAs) | 0 / 67 | 0 / 67 | 0 / 67 | 0 / 67 |
| 3a | hero (split) | `#f7f5ff` | new `SplitHero` | 67 / 687.7 | 67 / 1253.8 | 67 / 1077.8 | 67 / 755.2 |
| 3b | logo strip | `#f7f5ff` | **reuse `LogoStrip`** (static variant) | 754.7 / 245 | 1320.8 / 322 | 1144.8 / 322 | 822.2 / 293 |
| 4 | assistant split (image left) | `#281647` dark | `SplitMedia` | 999.7 / 768 | 1642.8 / 648 | 1466.8 / 532 | 1115.2 / 800.2 |
| 5a | cards intro | `#f2f0eb` | **reuse `Intro`** (no lockup/CTA) | 1767.7 / 309.6 | 2290.8 / 288.4 | 1998.8 / 275.3 | 1915.3 / 195.2 |
| 5b | agent cards 4×2 | `#f2f0eb` | `HelperCard` (white) grid | 2077.3 / 814 | 2579.2 / 1351.5 | 2274.1 / 1439.8 | 2110.5 / 2656 |
| 5c | "all agents" button | `#f2f0eb` | `Button` | 2891.3 / 148 | 3930.7 / 148 | 3713.9 / 148 | 4766.5 / 92 |
| 6 | builder split (image left) | `#ffffff` | `SplitMedia` | 3039.3 / 768 | 4078.7 / 648 | 3861.9 / 520 | 4858.5 / 732.8 |
| 7 | tools split (image right) | `#421d24` dark | `SplitMedia` | 3807.3 / 724 | 4726.7 / 613 | 4381.9 / 494.8 | 5591.3 / 691.2 |
| 8a | "where" intro | `#f2f0eb` | `Intro` | 4531.3 / 360.6 | 5339.6 / 291.2 | 4876.7 / 353.3 | 6282.5 / 261.8 |
| 8b | bento (1 + 2 cards) | `#f2f0eb` | **generalize `InboxBento`** | 4891.9 / 654.9 | 5630.8 / 568.3 | 5230 / 512.8 | 6544.3 / 897.1 |
| 8c | wide aside (Pages) | `#f2f0eb` | **reuse `Aside`** (title variant) | 5546.8 / 382.9 | 6199.1 / 246.8 | 5742.8 / 188.5 | 7441.4 / 327.7 |
| 8d | two asides | `#f2f0eb` | **reuse `Aside`** ×2 | 5929.7 / 372.9 | 6445.8 / 669.5 | 5931.4 / 554 | 7769.1 / 880.1 |
| 9 | testimonials (2-up) | `#ffffff` | new `QuotePair` | 6302.6 / 516.8 | 7115.3 / 560.2 | 6485.3 / 634.7 | 8649.2 / 791.4 |
| 10 | trust (3 columns) | `#f7f5ff` | new `FeatureColumns` | 6819.4 / 652 | 7675.5 / 633.9 | 7120 / 652.9 | 9440.6 / 1021.8 |
| 11 | FAQ | `#ffffff` | shared `Faq` (`go.md` §10) | 7471.4 / 1395.8 | 8309.4 / 1385.2 | 7772.9 / 1378.7 | 10462.4 / 1571.8 |
| 12 | final CTA (stacked, left) | `#421d24` dark | `FinalCta` **stacked variant** | 8867.2 / 401.8 | 9694.6 / 391.2 | 9151.5 / 411.7 | 12034.1 / 361.8 |
| 13 | footer | `#421d24` | **reuse `Footer`** (unchanged, mulberry) | 9269 / 859.2 | 10085.8 / 1142 | 9563 / 1141 | 12395.9 / 1822.8 |
| | **document height** | | | **10128** | **11228** | **10705** | **14219** |

Grouping: 3a+3b form one group (bg `#f7f5ff`), and so do 5a–5c and 8a–8d (bg `#f2f0eb`). Within a group, later sections have padding-top 0. Paddings are listed per section.

---
## 3. Hero group (bg `#f7f5ff`)
### 3a. `SplitHero` (new)
- Section padding 96 / 96 (40 at <640). Two-column `mediumSingleCol` + `gapM`.
- **≥1080**: row, gap **64**. Text column 608 (span 6) + image column 608. Both columns use `justify-content:center`. The row height equals the image height (495.7), so the text block (310.2 tall) is vertically centered (top at y 256).
- **640–1080**: stacked. Text first (full width, text max `min(90vw,900px)`: 900 @1024, 691.2 @768), then a **40** gap, then the image at full content width.
- **<640**: stacked with a gap of 24.
- Text column (flex column, gap 24, left-aligned):
  - `h1` display-small `#292827` (`hero.h1`; 2 lines @1440, **1 line** @1024 (900 wide), 2 @768, 2 @390).
  - `p` text-large text-sub (`hero.lede`; 2 lines @1440, 1024 and 768, 4 @390).
  - CTA row (`hero-title_ctasContainer`): `margin-top:16`, flex row, gap 16, `align-items:center`. **primaryFilled large** (`hero.cta1`, 163.1×52) + **primaryOutline large light** (`hero.cta2`, 167.4×52, transparent, text `#714cb6`, `box-shadow: inset 0 0 0 1px #714cb6`, hover 2px ring over 200ms ease-in-out). At <640 the row becomes a column and **both buttons stretch to 358×52** (gap 16).
- Image `agents-hero-art`: 608×495.7 (natural 720×587) / 976×796.2 / 720×586.9 / 358×292. Radius 0 (any rounding is baked into the art), cover.

### 3b. Logo strip (**reuse `LogoStrip`**, static)
- Padding-top 0, padding-bottom 96 (40). The intro `p` is **text-medium** (18/27/540), text-sub, centered (`logos.intro`; 1 line at ≥768, 2 at 390). The homepage uses text-small, so make the text role a prop.
- Grid: identical to the homepage `asset-grid` (hairline table: container top + left border, cells right + bottom border, all `rgba(115,113,109,.2)`). It is 6 columns at ≥1080 (1280×82, cells 213.2×81) and 3×2 below 1080 (649×163 at 1024 and 768, cells about 216×81; 358×163 at 390, cells 119×81). Margin-top 40 (≥1080) / 36 (<1080).
- **6 logos, no rotation**: watched for 30s and no cell changed. Each logo fades in once on mount: `opacity 0→1, 500ms ease-in-out`. Use the homepage component with `rotate={false}` and 6 logos (`logo-a1`…`logo-a6`, 212×80 contain, natural 214–215×80). The logos render as grey wordmarks on `#f7f5ff`.

## 4. Assistant split, dark purple (`SplitMedia`, gapL, image left)
- Section bg **`#281647`** (dark context). Padding 96 (40). Two-column `smallSingleCol` + **gapL** (128 / 64 / 32).
- Image column first: `agents-assist-art` **576×576** (natural 720×720, 1:1), **figure radius 8px with overflow clip**. 456×456 @1024, 328×328 @768, 358×358 @390.
- Text column (vertically centered; flex column, gap 24): `h2` heading-large **white** (`assist.h2`, 2 lines @1440, 3 @1024, 768 and 390). `p` text-medium `rgba(255,255,255,.8)` (`assist.p`, 3 / 4 / 5 / 5 lines). Then a `p` holding the **primaryLink dark** (`assist.link`, `#d4c7ff`, hover `#bea1f5` + underline, 20px chevron-right, 175.9×32).
- Column widths: 576/576 @1440, 456/456 @1024, 328/328 @768. At 390 it stacks: image, then 32, then text.

## 5. Agent cards group (bg `#f2f0eb`)
### 5a. Intro
`Intro` with only an `h2` (heading-large, centered, `cards.h2`, max 900; 2 lines @1440 and @1024, 2 @768 (691.2 wide), 3 @390). Padding 96 / 96 (40 / 40). Height 309.6 / 288.4 / 275.3 / 195.2.
### 5b. 8 agent cards (`HelperCard`, **white variant**)
- Padding-top 0, padding-bottom **96** (40). Grid (`multi-column`): **4 columns at ≥1080** (296 each, gap 32), 2 columns at 640–1080 (476 / 348, gap 24), 1 column at <640 (358, gap 16). Two rows at 1440 (heights 339 and 347; row gap 32).
- Card: `background:#fff; border-radius:12px; padding:32px; display:flex; flex-direction:column; gap:16px; overflow:clip`. **No border, no shadow, no hover effect.**
  - Icon `agent-icon-1..8`: **77×77** (white rounded tile with a hairline border and a dark mulberry-tinted glyph).
  - Content (`card_content`, gap 8, **`margin-top:auto`**, so it is bottom-aligned when cards in a row stretch): `h3` heading-xsmall `#292827`, `p` text-small text-sub, then a **primaryLink** (`cards.link`, 124×32, chevron-right 20px). Two empty `p` elements surround the link in the DOM and add no height.
  - Card heights: 339 / 347 @1440, 295.9 @1024, 318 @768, 293–317 @390.
- Copy `a1.*` to `a8.*`.
### 5c. Centered button
Padding 0 / 96 (40). A single **primaryFilled large** (`cards.cta`, 167.9×52) centered. At 390 it is full width (358×52).

## 6. Builder split, white (`SplitMedia`, gapL, image left)
- bg `#ffffff`, padding 96 (40). Same geometry as §4 (576 / 456 / 328 / 358 squares), but the **image radius is 0** (`agents-builder-art`, natural 720×720).
- Text: `h2` heading-large `#292827` (`build.h2`, 2 lines) + `p` **text-large** text-sub (`build.p`, 4 / 5 / 6 / 6 lines), gap 24. **No CTA.**
- 390: image first, then 32, then text.

## 7. Tools split, mulberry (`SplitMedia`, gapL, **text left, image right**)
- bg **`#421d24`** (dark). Padding 96 (40). Text column first: `h2` **heading-medium** white (`tools.h2`, 1 line @≥1024, 2 @768, 1 @390). `p` text-medium 80% white (`tools.p`). Link primaryLink dark (`tools.link`, 183.8×32).
- Image `agents-tools-art`: **576×532** (natural 720×665) / 456×421 / 328×302.8 / 358×330.6. Radius 0.
- 390: text first, then 32, then the image.

## 8. "Where" group (bg `#f2f0eb`)
### 8a. Intro
`Intro` centered: `h2` heading-large (`where.h2`, 2 lines @1440 (900 wide), 1 line @1024 (822.7), 2 @768, 2 @390). Gap 24. `p` text-medium text-sub (`where.p`, 1 line @≥1024, 2 @768, 3 @390). Padding 96 / 96.
### 8b. Bento (generalize `InboxBento`: same card mechanics, different spans and content)
- Padding 0 / vp (32 / 24 / 24 / 16). Two-column **7/5 spans**: 728 + 520 (gap 32) @1440, 555.3 + 396.7 (gap 24) @1024, 406 + 290 (gap 24) @768, stacked at 390 (gap 16).
- **Card A** (left, full column height 622.9 / 544.3 / 488.8 / 337.9): bg **`#e8e0ff`** (light), radius 12, padding 32, gap 16, overflow clip.
  - **Bleed media** on top (`margin: -32px -32px 0`): `bento-assistant-art` 728×426.4 (natural 840×492) / 555.3×325.5 / 406×237.9 / 358×209.9.
  - Content (gap 8, **`margin-top:auto`**, pinned to the bottom): `h3` heading-xsmall `#292827` (`bento.go.h3`, 2 ch) + `p` text-small text-sub (`bento.go.p`).
- **Right column** (flex column, gap = column gap 32 / 24 / 24 / 16):
  - **Card B**: bg **`#281647`** (dark), 520×295.5 / 396.7×272.1 / 290×232.4 / 358×255.6. Bleed media `bento-mail-art` 520×185.5 (natural 600×214) / 396.7×141.3 / 290×103.5 / 358×127.6, then content 16 below it: h3 **white** (`bento.mail.h3`), p 80% white.
  - **Card C**: bg **`#dedbd5`** (light), same size. Media `bento-web-art` (same sizes), h3 `#292827` (`bento.web.h3`) + p text-sub.
  - At ≥640 the right cards stretch to fill the column height (Card C is 248.1 @1024 and 232.4 @768, the same as B at 768).
### 8c. Wide aside (**reuse `Aside`**, but **title variant**)
- Padding 0 / vp. `aside` full content width, bg **`#0c4243`** (dark), radius 12, overflow clip, flex row `align-items:end`. Container-query media width: **60cqi at ≥1080, 50cqi below**.
  - Body (flex 1, `padding:32`, flex column, gap 12): **title `p` heading-xsmall white** (`docs.label`, 4 ch). Then a `div` (gap 24, color text-sub) holding a `p` **text-small** `rgba(255,255,255,.8)` (`docs.p`). **Note:** this is the reverse of the homepage aside, which pairs a text-xsmall label with a heading-xsmall body. Add a `variant="title"` prop to `Aside`.
  - Media `aside-pages-art`: 768×350.9 (natural 1440×658) / 488×222.8 / 360×164.5. At **390** the aside stacks (body on top, then media 358×163.7). Aside heights 350.9 / 222.8 / 164.5 / 311.7.
### 8d. Two asides (**reuse `Aside`**, title variant)
- Padding 0 / 96 (40). Two-column 6/6 (624 each, gap 32 @1440; 476 @1024; 348 @768, gap 24; stacked @390, gap 16).
- Left `aside` bg **`#421d24`** (dark): title `desk.label` white + p `desk.p` 80% white. Media `aside-desktop-art` **312×204.1** (natural 720×471), bottom-aligned in a 276.9-tall aside.
- Right `aside` bg **`#ffffff`** (light): title `other.label` `#292827` + p `other.p` text-sub. Media `aside-ai-tools-art` **312×276.9** (natural 720×639).
- Body column 312 wide at 1440 (50cqi of a 624 container).
- At **1024 / 768** each aside wraps internally: the body is on top (`padding 32`) and the media is below it at full aside width, aligned to the bottom. Desktop media 476×311.2 / 348×227.5, AI tools media 476×422.7 / 348×309. Both asides are the same height: 573.5 @1024 and 458 @768.
- 390: stacked asides 358×358.4 (media 358×234.4) and 358×465.7 (media 358×317.7).

## 9. Testimonials, white (`QuotePair`, new)
- Padding 96 (40). Title block centered, **padding-bottom 80**: `h2` heading-large `#292827` (`quotes.h2`, 1 line).
- Two-column `smallSingleCol` + **gapL** (576 + 576, gap 128 @1440; 456 + 456, gap 64 @1024; 328 + 328, gap 64 @768; stacked with gap 32 @390). Each column is a flex column with gap 24, vertically centered:
  - Quote `p` text-medium **text-sub** (`q1` / `q2`, with curly quotes in the text; 4 lines @1440, 6/5 @1024, 8/8 @768, 7/7 @390).
  - Attribution `p` text-medium text-sub, **two lines split by `<br>`** (name + role, then company): `q1.attr` / `q2.attr`.
- No avatars, no cards, no carousel.

## 10. Trust, 3 columns (`FeatureColumns`, new) (bg `#f7f5ff`)
- Padding 96 (40). Title block centered, gap 24, padding-bottom 80: `h2` heading-large (`trust.h2`, 1 line) + `p` **text-large** text-sub (`trust.p`, 2 lines @≥768 at 900 / 900 / 691.2 wide, 4 @390).
- `multi-column` grid: **3 columns at container ≥640** (405.3 each, gap 32 @1440; 309.3, gap 24 @1024; 224, gap 24 @768). At 390 it is 1 column with gap 16.
- Column: flex column, gap 24: icon `trust-icon-1..3` **69×71** (figure), then `h2` **type-heading-small** `#292827` (`t1.h2`…; 31/37.2 @1440, 27.36/32.83 @1024, 25.12/30.14 @768 (the 3rd wraps to 2 lines), 24/28.8 @390), then `p` text-medium text-sub.

## 11. FAQ (white): shared `Faq` (see `go.md` §10)
Identical component and metrics: centered h2 (`faq.h2`), padding-bottom 80, accordion root 817.9 / 817.9 / 720 / 358, 14 items, closed item 76px, single-open, 200ms ease. bg `#ffffff`. Heights 1395.8 / 1385.2 / 1378.7 / 1571.8 (2-line questions wrap at 390).
Answer structures (all `p`, no lists): Q1 427 · Q2 424 · Q3 356 · Q4 176 (bold lead-in, 17 ch) + 217 (bold lead-in, 13 ch) · Q5 72 + 211 + 236 · Q6 103 + 264 · Q7 205 + 281 · Q8 171 + 317 · Q9 337 · Q10 420 · Q11 248 · Q12 189 (1 link) · Q13 307 · Q14 325 (1 link). Fill answers with independently written Northstar sentences of about these lengths that answer the new `faq.q*` questions.

## 12. Final CTA, mulberry (`FinalCta` **stacked variant**)
- bg **`#421d24`** (dark). Padding 96 (40). **Left-aligned single column** (`align-items:start`), title block max 792.7 wide (the p's natural width), gap 24:
  - `h2` heading-large white (`final.h2`, 1 line @≥768, 2 @390).
  - `p` text-medium `rgba(255,255,255,.8)` (`final.p`, 1 line @1440 and @1024, 2 @768 (691.2 = 90vw), 3 @390).
  - CTA group (`cta-group`): `margin-top:24`, flex **row** (also at 390), gap 16. **primaryFilled large dark** (`final.cta1`, 163.1×52, bg `#d4c7ff`, text `#292827`, hover `#bea1f5`) + **primaryOutline large dark** (`final.cta2`, 167.4×52, text `#d4c7ff`, inset 1px `#d4c7ff` ring → 2px on hover).
- **No background art.** It differs from the homepage `FinalCta` (two-column, gif background): add `layout="stacked"`, `bg`, `body`, and a `ctas[]` prop.

## 13. Footer
Unchanged from the homepage (mulberry `#421d24`, white text). Same heights. **Reuse `Footer` as-is.**

---

## 12b. Motion and interaction (measured)
- **Logo fade-in**: each of the 6 logos runs `asset-grid-fade-in` (opacity 0→1) **500ms ease-in-out** once on mount. No cycling (unchanged over 30s, in view).
- **Accordion**: as in `go.md` §13.4 (200ms ease height/opacity, caret 0 → -180deg, single-open).
- **Hover**: primaryFilled bg 200ms ease-in-out (`#714cb6`→`#533192`, or `#d4c7ff`→`#bea1f5` on dark). primaryOutline ring 1→2px (box-shadow 200ms ease-in-out). primaryLink color + underline (offset 2px). Nav and footer links `color .2s ease`. **Cards and asides have no hover state** (bg, shadow, transform and cursor are unchanged).
- **None observed**: `document.getAnimations()` is empty after load. There are no CSS scroll timelines, no video, no IntersectionObserver-driven reveals (only link prefetch observers with rootMargin 200px, plus section analytics observers at thresholds [0, .5] that change no styles), no parallax, no carousel or marquee, and no header change on scroll.

## 13b. Component plan
| section | component | status |
|---|---|---|
| Header | `Header` (product CTAs, bg `#fff`) | **extend** (shared with `/go`) |
| 3a | `SplitHero` | **new** (h1 display-small, lede text-large, 2 CTAs, image; stacks <1080) |
| 3b | `LogoStrip` | **reuse**: props `textRole="medium"`, `rotate={false}`, `logos` (6) |
| 4, 6, 7 | `SplitMedia` | **new** (props: `reverse`, `gap="L"`, `headingSize`, `bodyRole`, `cta`, `mediaRadius`). Shared with `/go` §9 (gap = vp) |
| 5a, 8a | `Intro` | **reuse** (make `lockup`, `body`, `cta` optional) |
| 5b | `HelperCard` grid | **new, shared** (`variant="white"`: bg #fff, r12, no border; `/go` uses `variant="bordered"`) |
| 5c | `Button` | reuse |
| 8b | `InboxBento` → `Bento` | **generalize** (spans 7/5, content prop, card bg per card, card A content pinned bottom) |
| 8c, 8d | `Aside` | **reuse** + `variant="title"` (title heading-xsmall + body text-small) |
| 9 | `QuotePair` | **new** |
| 10 | `FeatureColumns` | **new** (needs `type-heading-small`) |
| 11 | `Faq` / `Accordion` | **new, shared** |
| 12 | `FinalCta` | **extend** (stacked layout, two CTAs, body text, no art) |
| 13 | `Footer` | reuse |

---

## 14. Copy deck (role → original length → placeholder)
Roles: `hero.h1` display-small · `hero.lede`, `build.p`, `trust.p` text-large · `*.h2` heading-large except `tools.h2` heading-medium and `t*.h2` heading-small · `a*.h3`, `bento.*.h3`, `docs/desk/other.label` heading-xsmall · `a*.p`, `bento.*.p`, `docs/desk/other.p` text-small · remaining `*.p`, quotes and attributions text-medium · `*.cta*`/`*.link` button text · `faq.q*` text-medium 460. `⏎` marks the `<br>` in attributions (counted as 1 ch). `len` is the original's count (keep for mapping); `len (new)` is the placeholder's. Placeholders are independently written; lengths are within ±10%.

| key | len | len (new) | placeholder |
|---|---|---|---|
| `hero.h1` | 42 | 41 | Hand off the busywork and keep the credit |
| `hero.lede` | 129 | 134 | Northstar Agents are small specialists you can call on in documents, mail and the browser, each one tuned to finish a single job well. |
| `hero.cta1` | 14 | 14 | Create account |
| `hero.cta2` | 17 | 18 | View agent library |
| `logos.intro` | 53 | 52 | Already part of the daily routine at these companies |
| `assist.h2` | 52 | 50 | Think of the assistant as dispatch for your agents |
| `assist.p` | 170 | 177 | It keeps track of the document, thread or page you have open, routes each request to the specialist best suited to it, and returns the result in place, ready to accept or tweak. |
| `assist.link` | 19 | 20 | Inside the assistant |
| `cards.h2` | 61 | 57 | A bench of specialists, each one trained for a single job |
| `a1.h3` | 9 | 9 | Clear Cut |
| `a1.p` | 74 | 72 | Trims filler, fixes grammar and shortens sentences that run on too long. |
| `a2.h3` | 17 | 16 | Agenda Assembler |
| `a2.p` | 85 | 83 | Builds a meeting agenda from the invite, the last thread and any open action items. |
| `a3.h3` | 11 | 10 | Translator |
| `a3.p` | 93 | 94 | Converts drafts into over thirty languages while keeping names, numbers and formatting intact. |
| `a4.h3` | 11 | 10 | Summarizer |
| `a4.p` | 91 | 91 | Condenses long threads, reports and transcripts into a few bullet points you can skim fast. |
| `a5.h3` | 16 | 16 | Follow-up Nudger |
| `a5.p` | 105 | 108 | Remembers who owes you a reply and drafts a polite reminder when a conversation has gone quiet for too long. |
| `a6.h3` | 9 | 9 | Scheduler |
| `a6.p` | 95 | 96 | Finds a time that works for everyone, proposes slots in your message and books the room for you. |
| `a7.h3` | 11 | 11 | Data Puller |
| `a7.p` | 89 | 88 | Grabs the latest figure from a spreadsheet or dashboard and drops it into your sentence. |
| `a8.h3` | 14 | 13 | Contract Lens |
| `a8.p` | 111 | 111 | Highlights renewal dates, unusual clauses and missing signatures in agreements before they go out for approval. |
| `cards.link` | 13 | 14 | Add this agent |
| `cards.cta` | 18 | 18 | Browse the library |
| `build.h2` | 40 | 40 | Teach Northstar a routine in plain words |
| `build.p` | 214 | 215 | Write the steps the way you would explain them to a new colleague, choose the moment it should kick in, and connect the apps it may touch. Test it on a sample, adjust, then publish it to yourself or your whole team. |
| `tools.h2` | 30 | 28 | Keep every record up to date |
| `tools.p` | 171 | 173 | When a deal moves, the CRM updates. When a ticket closes, the customer hears back. Agents read and write across your connected apps, so the chores between systems disappear. |
| `tools.link` | 22 | 20 | Explore integrations |
| `where.h2` | 48 | 49 | No new app to learn, no extra window to keep open |
| `where.p` | 93 | 93 | Agents live in the software you open every morning, from your inbox to your browser to Pages. |
| `bento.go.h3` | 2 | 9 | Assistant |
| `bento.go.p` | 58 | 54 | The control room for every agent you have switched on. |
| `bento.mail.h3` | 4 | 5 | Inbox |
| `bento.mail.p` | 54 | 55 | Triage, answer and chase threads without leaving email. |
| `bento.web.h3` | 8 | 8 | Browsers |
| `bento.web.p` | 45 | 45 | Works across the sites you already have open. |
| `docs.label` | 4 | 5 | Pages |
| `docs.p` | 61 | 61 | Outline, research and tighten long documents while you draft. |
| `desk.label` | 7 | 7 | Desktop |
| `desk.p` | 33 | 34 | Native apps for macOS and Windows. |
| `other.label` | 14 | 13 | Open protocol |
| `other.p` | 69 | 64 | Connect agents to the models and assistants you already pay for. |
| `quotes.h2` | 23 | 24 | Heard from our customers |
| `q1` | 292 | 291 | “Our support team used to spend Monday mornings sorting the weekend backlog. Now the queue is triaged, summarized and half-answered before anyone logs in. We moved those hours into calling customers back, and satisfaction scores climbed for three straight quarters. It paid for itself fast.” |
| `q1.attr` | 28 | 30 | Sam Ito, VP Support ⏎ Harborline |
| `q2` | 274 | 272 | “I write for a living, so I expected to hate it. Instead it handles the parts I dread: checking quotes, chasing approvals, reformatting for each channel. My drafts still sound like me, they just reach editors two days sooner, and I finally have time to pitch new stories.” |
| `q2.attr` | 70 | 71 | Morgan Lee, Senior Editor and Newsletter Author ⏎ Brightwater Media Group |
| `trust.h2` | 29 | 29 | Built to earn your confidence |
| `trust.p` | 130 | 131 | Clear controls, careful defaults and plain-language policies, so you always know what an agent did, why it did it, and what it saw. |
| `t1.h2` | 19 | 19 | Every action logged |
| `t1.p` | 98 | 98 | Review a timeline of what each agent read, changed or sent, and undo any step with a single click. |
| `t2.h2` | 20 | 21 | Certified and audited |
| `t2.p` | 96 | 93 | Independent audits, single sign-on and encryption at every layer come standard on every plan. |
| `t3.h2` | 21 | 20 | Admins set the rules |
| `t3.p` | 60 | 61 | Decide which agents your team can use and what they can open. |
| `faq.h2` | 26 | 24 | Answers before you begin |
| `faq.q1` | 20 | 21 | What can an agent do? |
| `faq.q2` | 32 | 30 | How many agents can I turn on? |
| `faq.q3` | 36 | 34 | Do agents act without my approval? |
| `faq.q4` | 69 | 70 | Can I limit which connected apps a particular agent is allowed to use? |
| `faq.q5` | 71 | 70 | What happens if an agent makes a mistake or produces the wrong result? |
| `faq.q6` | 49 | 47 | Can I share an agent I built with my coworkers? |
| `faq.q7` | 55 | 55 | Do scheduled agents keep running when my laptop is off? |
| `faq.q8` | 55 | 54 | Which file types and formats can agents read and edit? |
| `faq.q9` | 66 | 67 | How are agents priced on team plans compared with individual plans? |
| `faq.q10` | 53 | 52 | Can I see a history of everything an agent has done? |
| `faq.q11` | 32 | 34 | Do agents work in other languages? |
| `faq.q12` | 42 | 41 | Is there a limit on how often agents run? |
| `faq.q13` | 40 | 41 | How do I remove an agent I no longer use? |
| `faq.q14` | 40 | 36 | Who do I contact if an agent breaks? |
| `final.h2` | 29 | 30 | Give your to-do list some help |
| `final.p` | 99 | 98 | Set up your first agent in a few minutes, free, and see how much of the week it hands back to you. |
| `final.cta1` | 14 | 14 | Create account |
| `final.cta2` | 17 | 18 | View agent library |

Product-name notes (the only keys outside ±10%): `bento.go.h3` "Assistant", `bento.mail.h3` "Inbox" and `docs.label` "Pages" are Northstar product names. The originals are 2–4 ch, so no real label can stay within ±10%. Each is a single-line heading-xsmall in a card at least 290px wide, so line counts are unchanged at every breakpoint.

---

## 15. Not measured / caveats
- The images are static AVIF illustrations. Each slot has its size, aspect, radius and dominant colors, plus a description of the UI it depicts (`agents.assets.json`). Draw original artwork.
- The agent-card icons and trust icons are brand-drawn SVG tiles. Only their size and sampled colors were recorded.
- The hero image corners look rounded inside the art. The `<img>` and `<figure>` computed radius is 0, so treat any rounding as part of the artwork.
- **Viewport >1440** was not tested.
- The cookie banner was hidden for measurement and should not be cloned.
- The §2 footer offset at 768 is rounded to whole px.
