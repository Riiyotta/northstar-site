Source: https://superhuman.com/go

# Clone spec: assistant product page (`/go` → **Northstar Assistant**)

I measured this page live on 2026-10-21 with a local Playwright Chrome (normal desktop Chrome UA, `reducedMotion: 'no-preference'`, cookie banner hidden) at 1440, 1024, 768 and 390 wide (900px viewport height; 844 at 390). Every px value comes from `getComputedStyle` / `getBoundingClientRect` or from the page's own CSS modules (`two-column_*`, `card_*`, `accordion_*`, `controls_*`, `animation-video_*`, `hero-title_*`, `content-wrapper_*`, `page-section_*`, `list_*`).

Global tokens (colors, base type roles, spacing, buttons, radii, shadows) are in `../CLONE_SPEC.md` and `tailwind.config.js`. The footer *layout* and the header *layout* are shared. This page changes both: see §1 and §12.

**Copy rule.** Copy is not reproduced. Every text node is referenced by a key, and the **copy deck in §15** gives its role, its original character count, and an independently written placeholder for **Northstar** of similar length. Product mapping: Go → **Northstar Assistant** ("the assistant"), Mail → **Inbox**, Docs → **Pages**, Superhuman agents → **Northstar Agents** / "helpers". Third-party brand names (the writing-assistant brand, chat apps, CRMs) are replaced with generic nouns.

**Page-level facts**
- No announcement banner. The hero section starts directly under the 67px sticky header (y = 67).
- Page background, `--color-bg-primary`, is **`#f7f5f2`** (neutral-5) on this page, not white. The sticky header and the mobile drawer `<dialog>` inherit it.
- **"Cutout" rails.** Every `main` section shows a 1px **dashed** `border-sub` line on both inline edges of the content-wrapper box (`::after`, `inset: 0`, `border-inline: 1px dashed`). The first section of each numbered chapter also draws a 1px dashed horizontal line across the full content-wrapper width at its top edge (`::before`, `border-block-start: 1px dashed`). Details are in §0.2.
- Fonts loaded: Super Sans VF (upright and italic), **Super Sans Mono VF** (used for the chapter eyebrows), Super Serif VF (loaded but unused here). For the mono substitute see §0.1.
- Images are served as AVIF through `<picture>` (Contentful). SVG is used for the lockup, card icons and card gradient bands. Video is MP4 (H.264, 60fps).

## 0. New tokens and shared building blocks

### 0.1 Tokens not yet in `tailwind.config.js`
| token | value | used by |
|---|---|---|
| `type-display-small` | `clamp(36px, 16px + 3.125vw, 61px)` / lh **1.1** / ls -0.0275em / 460. Computed 61/67.1 @1440, 48/52.8 @1024, 40/44 @768, 36/39.6 @390 | hero h1 |
| `type-heading-medium` | already exists (`heading-md`). Computed here: 39/46.8 @1440, 33.28/39.94 @1024, 29.76/35.71 @768, 28/33.6 @390 | feature row titles, CTA bands |
| mono face | original `"Super Sans Mono VF"`, 16px / lh 24px / **540** / ls -0.12px, color text-sub. The measured advance is 9.61px per char (23 chars = 221px). **Substitute: `"JetBrains Mono"` variable (OFL, 0.6em advance), with letter-spacing **0**. That gives 9.6px per char, which matches within 0.2%.** Fallback: `ui-monospace, SFMono-Regular, Menlo, monospace` | chapter eyebrows |
| `bg-page` (this page) | `#f7f5f2` | body, header, drawer, most sections |
| `rail` | `1px dashed rgba(115,113,109,0.2)` (light) / `1px dashed rgba(252,250,247,0.2)` (dark sections) | §0.2 |
| `secondaryFilled` button | bg `rgba(255,255,255,0.9)` → hover `#ffffff`. Text `#292827`. Min-h 52, padding 6/20, radius 12, `transition: background-color .2s ease-in-out`. This is `action-secondary` in a dark context, with text-inverse | final CTA |

### 0.2 Section shell (content-wrapper + page-section), measured
- Container is the same as the homepage: `width: min(100% - 2·vp, 1280)`, padding-inline vp, centered. Content widths are 1280 / 976 / 720 / 358, and the wrapper box is 1344 / 1024 / 768 / 390.
- Section padding-block is 96 (≥640) / 40 (<640). Inside a "group" (one chapter) every section after the first has padding-top 0. The bottom padding varies per section and is listed with each section below.
- **Rails** (all sections in `main`, not the header or footer): a `::after` with `position:absolute; inset:0; border-inline: 1px dashed var(--border-sub); pointer-events:none` on the content-wrapper box. At 1440 the lines sit at x = 48 and x = 1391. At 1024 and 768 they sit at x = 0 and x = vw−1, so they coincide with the viewport edges. At 390 they also sit at the viewport edges. Color: `rgba(115,113,109,.2)`, or `rgba(252,250,247,.2)` inside the dark final-CTA section.
- **Chapter top line**: a `::before` on the first section of each chapter group (§4a, §5a, §7a, §8a, §9 below): `position:absolute; top:0; left:0; right:0; border-top: 1px dashed var(--border-sub)`. The hero, the CTA bands and the FAQ do **not** have it.
- Two-column helper (`two-column_container`): flex row at ≥640 (`smallSingleCol`). Gap = vp (32 / 24 / 16). Column width = `flex: 1 1 calc(100% / (12 / span))`. Spans used: **8 / 4** (chapter intros, CTA band) and **6 / 6** (feature rows, trust, final CTA). Below 640 it is a single column, and `reversed` puts the last DOM child first.

### 0.3 Chapter intro block (`ChapterIntro`, new; used 5×)
Left column (span 8, so 832 / 634.7 / 464 / 351 wide); the right span-4 column stays empty. Flex column, gap 24, left-aligned:
1. Eyebrow `p` text-small (16/24/540, text-sub) wrapping a mono `span`: `"NN / 05 · LABEL"` (uppercase is in the source text, not a transform).
2. `h2` heading-large (49/58.8 @1440, 40.16/48.19 @1024, 34.72/41.66 @768, 32/38.4 @390), `#292827`.
3. `p` text-medium (18/27/540, -0.135px), text-sub `rgba(20,20,19,.65)`.
4. Optional: `p` containing a primaryLink with a trailing **20×20 chevron-right** (gap 4), 16/600, `#714cb6`. Hover: `#533192`, underline, offset 2px.

The eyebrow-to-h2 gap and the h2-to-p gap are both 24 (flex gap). The eyebrow `p` box is 24 tall, and the mono span inside it is 19 tall.

---

## 1. Header (shared layout, **different CTAs and background**)
Same component as the homepage header (`CLONE_SPEC.md` §1): sticky, 67px, bottom border `rgba(115,113,109,.2)`, logo 167×24, primary nav at ≥1080 with the same 6 items at the same x positions. Differences, all measured:
- **Background `#f7f5f2`** (`--color-bg-primary` of this page). The homepage uses `#fff`. No change on scroll (checked at 19 scroll positions).
- **Right CTAs** (`gap: 16px`, flex, centered):
  - "Contact sales": unstyled text CTA, 16/460/19.2, 97.6×36, `#292827`. Hover underline, offset 2px.
  - **"Log in"** (6 ch, placeholder "Log in"): the same unstyled text CTA, 43.9×36.
  - **"Sign up"** (7 ch, placeholder "Sign up"): **primaryFilled compact**, 80.1×36, padding 6/16, radius 8, 14/600/18, bg `#714cb6`, text `#fff`, hover `#533192`.
  - The homepage "Sign in" outline button and its product menu are **absent** on this page.
- Visibility by width: ≥640 shows all three CTAs (x at 1024: 694 / 808 / 868. At 768: 438 / 552 / 612). At <1080 a 36×36 hamburger (secondaryGhost, radius 999) follows at the far right. At <640 only the logo and the hamburger show.
- **Mobile drawer** (`<dialog>`, bg `#f7f5f2`): same nav list as the homepage (rows 326×59 at 390). **Footer** (padding 24/32, gap 12, top border, shadow `0 -4px 8px .5px rgb(71 69 67/16%)`) contains three full-width rows, each 326×36: "Contact sales" (unstyled), "Log in" (unstyled), "Sign up" (primaryFilled compact, radius 8).
- Implementation: give `Header` a `variant="product"` (or `ctas` prop) plus a `bg` prop. Do not fork it.

---
## 2. Section order and offsets (document y / height, px)

| # | section | bg | component | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|
| — | header (sticky) | `#f7f5f2` | `Header` variant (§1) | 0 / 67 | 0 / 67 | 0 / 67 | 0 / 67 |
| 3 | hero | `#f7f5f2` | new `CenteredVideoHero` | 67 / 1329.3 | 67 / 1112.2 | 67 / 939.9 | 67 / 675.8 |
| 4a | ch.01 intro | `#f7f5f2` | new `ChapterIntro` | 1396 / 376.8 | 1179 / 366.2 | 1007 / 386.7 | 743 / 352.8 |
| 4b–e | ch.01 feature rows ×4 | `#f7f5f2` | new `StickyFeatureRow` | 1773, 2285, 2797, 3309 / 512 each | 1545 … / 413.3 each | 1394 … / 328 each | 1096 / 460.3, 1556 / 466.8, 2023 / 460.3, 2483 / 493.8 |
| 5a | ch.02 intro | `#f7f5f2` | `ChapterIntro` | 3821 / 285.8 | 3199 / 294.2 | 2706 / 287.7 | 2977 / 263.4 |
| 5b | helper cards, row 1 (4 cards) | `#f2f0eb` cards | new `HelperCard` grid | 4107 / 405 | 3493 / 643.8 | 2993 / 711.9 | 3240 / 1356 |
| 5c | helper cards, row 2 (2 cards) | `#f2f0eb` cards | `HelperCard` grid | 4512 / 392 | 4137 / 412.9 | 3705 / 435 | 4596 / 732 |
| 6 | CTA band (lavender) | `#e8e0ff` + bg image | new `CtaBand` (or a `FinalCta` variant) | 4904 / 244 | 4550 / 244 | 4140 / 263.4 | 5328 / 215.2 |
| 7a | ch.03 intro + link | `#f7f5f2` | `ChapterIntro` | 5148 / 368.8 | 4794 / 377.2 | 4404 / 397.7 | 5543 / 373.4 |
| 7b | connectors strip (static image) | `#f7f5f2` | `MediaSlot` | 5517 / 269.3 | 5171 / 227.9 | 4801 / 193.5 | 5917 / 221.8 |
| 8a | ch.04 intro | `#f7f5f2` | `ChapterIntro` | 5786 / 376.8 | 5399 / 393.2 | 4995 / 386.7 | 6138 / 341.4 |
| 8b–f | ch.04 feature rows ×5 | `#f7f5f2` | `StickyFeatureRow` | 6163, 6675, 7187, 7699, 8211 / 512 each | 5792 … / 413.3 each | 5381 … / 328 each | 6480 / 460.3, 6940 / 433.3, 7373 / 433.3, 7807 / 433.3, 8240 / 406.3 |
| 9 | ch.05 trust (text + image) | `#f7f5f2` | new `SplitMedia` | 8723 / 542.1 | 7859 / 474.2 | 7021 / 521.7 | 8646 / 623.2 |
| 10 | FAQ accordion | `#f7f5f2` | new shared `Faq` / `Accordion` | 9265 / 1395.8 | 8333 / 1385.2 | 7543 / 1378.7 | 9269 / 1463.8 |
| 11 | final CTA band (dark green) | `#0c4243` + bg image | `CtaBand` dark | 10661 / 244 | 9718 / 244 | 8922 / 263.4 | 10733 / 215.2 |
| 12 | footer (**light variant**) | `#dedbd5` | `Footer` variant | 10905 / 859.2 | 9962 / 1142 | 9185 / 1141.4 | 10948 / 1822.8 |
| | **document height** | | | **11764** | **11104** | **10327** | **12771** |

All feature rows at a given width ≥640 have the same height: the video height plus the bottom padding (416+96, 317.3+96, 232+96). At 390 the height varies with the text length.

---

## 3. Hero (`CenteredVideoHero`, new)
Section padding 96 / 32 (inline vp), or 40 at <640. A centered flex column.
- **Title group** (max-width = text max `min(90vw, 900px)`; 900 / 900 / 691.2 / 351 wide): flex column, gap 24 (≥640) / **12** (<640). `margin-bottom: 40` (≥640) / 24 (<640).
  - `h1` `type-display-small`, `#292827`, centered. Its **first line is the product lockup**: an inline-block `picture` **195×25** (`lockup-assistant`, the same at all widths) followed by a `<br>`. Then the headline text (`hero.h1`). Line count including the lockup line: 3 at 1440, 1024 and 768, and 4 at 390. h1 height 201.3 / 158.4 / 132 / 158.4. Lockup top sits 30px below the h1 top at 1440 (it rides the 67.1px line box, bottom-aligned on the baseline).
  - `p` (`hero.lede`) text-large (`clamp(18px,16.4px+.25vw,20px)`, lh 1.5, 540, ls -0.0075em; 20/30 @1440, 18.96/28.44 @1024, 18.32/27.48 @768, 18/27 @390), text-sub, centered. 2 lines at ≥768, 4 lines at 390.
  - CTA row: `margin-top: 16` (so 40 below the lede in total), flex, centered, gap 16. One **primaryFilled large** button (`hero.cta`, 87.3×52, padding 6/20, radius 12, `#714cb6`). At <640 the row is a column and the button stretches to the title width (351×52).
- **Video** (`go-hero-video`): full content width, 16:9. Sizes 1280×720 / 976×549 / 720×405 / 358×201.4. Radius 0, `object-fit: contain`, no border. Wrapped in a `position:relative` frame with a **play/pause control** (§13.3) at bottom-left, inset 4px (`controls_insideBottomLeft`, `--_controls-spacing: 4px`). A visually hidden caption (13 ch) follows the video.

## 4. Chapter 01 (group; chapter top line on 4a)
### 4a. Intro
`ChapterIntro`: eyebrow `ch1.eyebrow`, h2 `ch1.h2` (1 line at ≥1024, 1 at 768, 2 at 390), p `ch1.lede` (2 / 2 / 3 / 4 lines). Padding 96 top and **96 bottom** (40 / 40 at 390).

### 4b–4e. Sticky feature rows (`StickyFeatureRow`, new), 4 rows
Each row is its own section: padding-top 0, **padding-bottom 96** (40 at <640). Inline padding vp.
- ≥640: two-column 6/6, gap vp. DOM order is [text column, media column]. With `reversed`, the media comes **first only below 640**.
  - **Media column** (right): the video in a frame, 624×416 / 476×317.3 / 348×232 (**3:2**, natural 1200×800), radius 0. Play/pause control bottom-left inset 4. A visually hidden caption (lengths 23 / 13 / 28 / 13 ch).
  - **Text column** (left, `align-items:flex-start`, `justify-content:center`): a flex column, gap 24: `h2` **heading-medium** (`#292827`) + `p` text-medium text-sub. Text block widths at 1440: h2 397 / 624 / 478 / 624 (it wraps at 624), p 624.
  - The text column carries the **scroll-driven "pinned text" effect** (§13.1). It is invisible (`opacity:0; visibility:hidden`) except while its row passes the middle of the viewport.
- <640 (390): single column. Video first (358×238.7), then a **16px** gap, then the text block (h2 heading-medium 28/33.6, gap 24, p). No scroll effect: the text is always visible.
- Copy: `f1.*` to `f4.*`.

## 5. Chapter 02: helper cards (group; chapter top line on 5a)
### 5a. Intro
`ChapterIntro` (`ch2.*`), with **padding-bottom = vp** (32 / 24 / 24 / 16).

### 5b. Card row 1: 4 cards. 5c. Card row 2: 2 cards
Two sections. 5b has padding-bottom vp. 5c has padding-bottom 96 (40).
- Grid: **row 1** is 4 columns at ≥1080 (296 each, gap 32), 2 columns at 640–1080 (476 / 348 each, gap 24), and 1 column at <640 (358, gap 16). **Row 2** is 2 columns at ≥640 (624 / 476 / 348), 1 column at <640.
- **`HelperCard` (bordered variant)**: `display:flex; flex-direction:column; gap:16px; padding:32px; background:#f2f0eb; border:1px solid rgba(115,113,109,.2); border-radius:0` (`corner-radius-none`), `overflow:clip; position:relative`. All cards in a row are the same height (stretch).
  - Row-1 cards only: **gradient band** background (`card_backgroundAbsolute`: `position:absolute; inset:0; overflow:hidden; border-radius:inherit`). It contains a full-width image pinned to the top: 294×98 (card 1, natural 318×106) or 294×95.2 (cards 2–4, natural 318×103). Its width follows the card's inner width: 474 @1024, 346 @768, 356 @390. It is a soft tinted wash that fades into the card bg (see the manifest).
  - **Icon**: row 1 is a **69×69** tile, row 2 is a **64×64** tile, `position:relative` above the band.
  - **Content** (`card_contentAlignTop`, gap 8): `h3` heading-xsmall (25/30 @1440, 22.4/26.88 @1024, 20.8/24.96 @768, 20/24 @390), `#292827`. Then `p` text-small (16/24/540) text-sub. Then a `p` that holds a **primaryLink** (32px tall, 16/600, `#714cb6`, trailing 20px chevron-right, gap 4). Card 4 has **no link**.
  - Card heights: row 1 is 373 @1440, 297.9 @1024, 320 / 344 (two rows) @768, and 319 / 319 / 343 / 311 @390. Row 2 is 296 @1440, 316.9 @1024, 339 @768, 338 @390.
  - **No hover effect** on the card (bg, shadow and transform are unchanged on hover). Only the link has a hover state.
- Copy: `card1.*` to `card6.*`. Link labels: `card1.link` for cards 1–3, `card5.link`, `card6.link`.

## 6. CTA band, lavender (`CtaBand`, new; or extend `FinalCta` with props)
- Section bg `#e8e0ff`, `position:relative`. Background image (`cta-band-bg`) absolute `inset:0`, `object-fit:cover`, fills the section.
- Content-wrapper padding 96 (40). Two-column **8/4** (832 / 416 @1440, 634.7 / 317.3 @1024, 464 / 232 @768, stacked @390), `align-items: center`:
  - Left: `h2` **heading-medium**, `#292827` (`band.h2`, 1 line at ≥1024, 733px wide @1440; 2 lines at 768 and 390).
  - Right: flex column `align-items:flex-end` (text-align end). **primaryFilled large** button (`band.cta`, 87.3×52).
  - 390: h2, then a 16 gap, then the button at full width (358×52).
- Heights 244 / 244 / 263.4 / 215.2. Rails are drawn, but there is no chapter top line.

## 7. Chapter 03: connectors (group; chapter top line on 7a)
- 7a `ChapterIntro` (`ch3.*`) **with the link** (`ch3.link`, 156.4×32 incl. chevron). The link `p` sits 24 below the lede. Padding-bottom vp.
- 7b **Connectors strip**: one static image, centered, full content width. Sizes 1280×173.3 (natural 1440×195) / 976×131.9 / 720×97.5 / **358×181.8** at 390 (the 390 art is a different, taller crop, natural 390×198). Radius 0. Padding-bottom 96 (40). Checked over time: **not a marquee**. It has no animation or transform and does not change.

## 8. Chapter 04: "any surface" (group; chapter top line on 8a)
- 8a `ChapterIntro` (`ch4.*`), padding-bottom 96.
- 8b–8f: five `StickyFeatureRow`s, identical in structure to §4. Copy `f5.*` to `f9.*`. Video captions are 23 / 23 / 14 / 11 / 6 ch.

## 9. Chapter 05: trust (`SplitMedia`, new; chapter top line)
Single section, padding 96 (40). Two-column **6/6**, gap vp:
- Left: the `ChapterIntro` stack (eyebrow `ch5.eyebrow`, h2 `ch5.h2`, p `ch5.lede`, 5 lines @1440, 6 @1024, 8 @768 and @390), vertically centered.
- Right: image `trust-collage`: 624×350.1 (natural 720×404, ≈16:9) / 476×267.1 / 348×195.3 / 358×200.8. Radius 0, cover.
- 390: text first, a 16 gap, then the image.

## 10. FAQ (`Faq` + `Accordion`, new and shared with `/agents` and `/plans`)
Section padding 96 (40). No chapter top line.
- Title block: centered, `padding-bottom: 80` (`pb-20x`). `h2` heading-large `#292827` (`faq.h2`, 1 line at ≥768, 2 at 390).
- **Accordion root**: `inline-size: min(90ch, 100%)`, centered. That is **817.9px** at 1440 and 1024 (90ch of the 16px original font), 720 @768, 358 @390. With Hanken Grotesk use `max-width: 818px` explicitly instead of `90ch`.
- **Item**: `border-top: 1px solid rgba(115,113,109,.2)`. The last item also has a border-bottom. 14 items. Closed height is 76 (75 + 1 border).
  - Trigger: `h3` > `button` full width, `display:flex; justify-content:space-between; align-items:center; gap:16px; padding:24px 0`. Text `span` text-medium with weight **460** (18/27/460, -0.135px), `#292827`, left-aligned. Icon: a **20×20 caret-down**, color `#000` (the button's `currentColor`), `transition: transform 200ms ease` (only under no-preference). **No hover style** (bg, color and underline are unchanged; cursor pointer).
  - Panel: closed `height:0; opacity:0; content-visibility:hidden; overflow:hidden`. Open `height:auto; opacity:1; content-visibility:visible`. `transition: height .2s ease, opacity .2s ease, content-visibility .2s ease` (allow-discrete), with `interpolate-size: allow-keywords` on the root. The inner wrapper gets `padding-bottom: 24` when open.
  - Answer content: text-small (16/24/540), text-sub. Consecutive `p` get `margin-block: 12px`. Inline links are `#292827` (text-base), the same size. Bold spans use 700.
  - Bullet lists (Q2 and Q9): `list-style:none`. Each `li` is indented **29.7px**, and `li + li` gets margin-top 12. The bullet is a `::before` **hollow circle 12×12, `border:1.5px solid currentColor`, radius 50%**, absolutely positioned at left 0, vertically centered (`top:50%; translateY(-50%)`).
  - **Behaviour: single-open.** Opening an item closes the open one. All start closed.
- Content lengths (question / answer parts): see copy deck §15. Answer structures:
  Q1 p140 · Q2 p208 + ul[121/101/99/233/155] · Q3 p328 (1 link) · Q4 p218 · Q5 p389 · Q6 p456 (2 links) · Q7 p523 · Q8 p257 (1 link) · Q9 p123, p51, ul[48/50/38/42] (each item is a link), p "label:" bold + link (40), p138 with a bold span, p58 · Q10 p403, p427, p361 · Q11 p252 · Q12 p476 · Q13 p501 · Q14 p467. Fill answers with independently written Northstar sentences of about these lengths that answer the new `faq.q*` questions (the questions are new topics, not rewordings; only the answer layout structure above carries over).

## 11. Final CTA band, dark green (`CtaBand`, dark)
- Section bg **`#0c4243`** (green-90, dark context, so text is white and the rails are `rgba(252,250,247,.2)`). Background image (`final-cta-bg`) absolute and cover.
- Padding 96 (40). Two-column **6/6** (624 / 624 @1440): left `h2` heading-medium **white** (`final.h2`; 1 line @≥1024, 2 lines @768 and @390). Right `align-items:flex-end`: **secondaryFilled** button (`final.cta`, 150×52, bg `rgba(255,255,255,.9)`, text `#292827`, hover bg `#fff`).
- 390: stacked. The button is full width (358×52).
- Heights 244 / 244 / 263.4 / 215.2.

## 12. Footer (**light variant**)
Same layout, columns, gaps and heights as `CLONE_SPEC.md` §11 (859.2 / 1142 / 1141.4 / 1822.8). Only the colors change:
| element | homepage (mulberry) | **/go** |
|---|---|---|
| bg | `#421d24` | **`#dedbd5`** (neutral-20) |
| logo, brand h3, column titles | `#fff` | **`#292827`** |
| links + social icons | `rgba(255,255,255,.8)` | **`rgba(41,40,39,.8)`** |
| link hover | (color → white) | **underline** (`text-decoration-line: underline`). The color stays `rgba(41,40,39,.8)` (measured), `transition: color .2s ease` |
| giant wordmark | `rgba(255,255,255,.05)` | **`rgba(41,40,39,.05)`** |
The column item counts are the same (7 / 14 / 6 incl. the cookie-preferences button / 6). Implement as `<Footer tone="light" />`, which is a `ctx-light` instead of a `ctx-dark` context.

---

## 13. Motion and interaction (all measured)

### 13.1 Pinned text in feature rows (scroll-driven, CSS view timeline)
Only at ≥640 and only under `prefers-reduced-motion: no-preference`, with `@supports (animation-timeline: view())`. Under reduced motion, or with no support, the text column is static, visible, and vertically centered beside its video.
- The row container gets `view-timeline-name: --section` (the timeline subject is the 2-column row, height `h` = video height: 416 / 317.3 / 232).
- The text column gets three linear animations on that timeline:
  ```css
  animation-name: sticky-slide, sticky-fade-in, sticky-fade-out;
  animation-timing-function: linear;
  animation-fill-mode: both, forwards, forwards;
  animation-timeline: --section, --section, --section;
  animation-range: var(--win-start) var(--win-end),
                   var(--win-start) var(--fade-in-end),
                   var(--fade-out-start) var(--win-end);
  opacity: 0; visibility: hidden;          /* base state */
  @keyframes sticky-slide   { from { transform: translateY(var(--ty-start)) } to { transform: translateY(var(--ty-end)) } }
  @keyframes sticky-fade-in { from { opacity:0; visibility:hidden } to { opacity:1; visibility:visible } }
  @keyframes sticky-fade-out{ from { opacity:1; visibility:visible } to { opacity:0; visibility:hidden } }
  ```
- JS sets the CSS variables inline on the row container and recomputes them on resize. They depend on viewport height `H`, header height `hdr = 67` and row height `h`. These formulas reproduce every measured value at 1440×900, 1440×1200, 1024×900 and 768×900:
  ```
  T          = H + h                         // length of the 'cover' view timeline in px
  center     = (hdr + H) / 2                 // middle of the visible area below the sticky header
  winStart   = (H - center) / T              // row top reaches the visible center
  winEnd     = (H - center + h) / T          // row has scrolled h further
  fadeInEnd  = winStart + 200 / T            // 200px linear fade in
  fadeOutStart = winEnd - 200 / T            // 200px linear fade out (overlaps fade in when h < 400)
  --ty-start = -h/2 ;  --ty-end = +h/2
  ```
  Example (1440×900, h=416): `--win-start: 31.649%; --fade-in-end: 46.847%; --fade-out-start: 48.062%; --win-end: 63.260%; --ty-start:-208px; --ty-end:208px`. At 1024: ±158.66px, 34.21 / 50.64 / 43.85 / 60.28%. At 768: ±116px, 36.79 / 54.46 / 39.62 / 57.29%.
- **Perceived effect**: while the row scrolls through, the translate cancels the scroll exactly, so the text block stays **pinned** with its center at the center of the visible area (viewport y ≈ 275 at 1440×900). It fades in over the first 200px of scroll and out over the last 200px, and is fully opaque for only about 16px at 1440. Only one row's text is visible at a time, which reads as a crossfade between captions while the videos scroll past on the right. Sampled at 1440: secTop-in-viewport 450 → opacity 0.17, 400 → 0.42, 300 → 0.92, 250 → 0.91, 150 → 0.41, 67 → 0.
- A JS fallback would read row `getBoundingClientRect().top` on scroll (rAF), compute `p = (H - top) / T`, and apply the same piecewise-linear opacity and `translateY(-h/2 + (p - winStart)/(winEnd - winStart) * h)` clamped to the window.

### 13.2 Videos (hero + 9 feature videos)
- Attributes: `autoplay muted playsinline`, no `loop` attribute, no poster. Feature videos have **no src until near view**: an IntersectionObserver (`rootMargin 0`, `threshold [0, 0.2]`) assigns the src and plays. Leaving view **pauses** the video, and coming back **resumes** from the same time (not restarted). Measured: videos at currentTime 4.5 stay paused at 4.5 after scrolling away.
- **Looping**: when a video ends it restarts from 0 (the hero was seeked to duration−1 and was playing again at 1.42s about 2.5s later). Implement with an `ended` → `currentTime=0; play()` handler, or simply `loop`.
- Durations (for placeholder animations): hero 40.65s; rows 13.97, 12.40, 10.83, 16.45, 12.15, 11.45, 14.75, 8.12, 6.97s.
- Under reduced motion, show a static frame (no autoplay) and keep the control.

### 13.3 Play/pause control
- A `button` (unstyled, 32×32), absolute bottom-left with a 4px inset inside the video frame. Its content is a **32×32 SVG: a 1.5px-stroke circle (r=15) with a pause glyph (two bars) or a play glyph (triangle)**, `stroke: currentColor`.
- `aria-label` toggles between "Pause animation" and "Play animation" (keep these generic labels). Clicking toggles `video.paused`. No hover style.
- Icon color per video (as measured): white `#fff` on the hero and rows 1, 2 and 8; `#292827` on rows 3–7 and 9, which have light video corners.

### 13.4 Accordion
200ms `ease` height (0 ↔ auto) and opacity, plus the caret rotating 0 → **-180deg** over 200ms ease. Single-open. Sampled while opening: t50 → h 15.9 / op 0.22, t100 → 50.8 / 0.71, t150 → 66.6 / 0.92, t250 → 72 / 1.

### 13.5 Hover micro-interactions
Buttons change bg over 200ms ease-in-out (`#714cb6` → `#533192`. secondaryFilled `.9` → `1` white). primaryLink → `#533192` plus underline, offset 2px. Header nav and footer links change color over .2s ease, and nav chevrons rotate over .3s. Cards, video frames and images have **no** hover effect.

### 13.6 Not present
No load or entrance animations (no `animation` other than §13.1 is active after load, and `document.getAnimations()` shows only the view-timeline ones). No IntersectionObserver-driven reveals. No marquee or carousel. No parallax beyond §13.1. No header change on scroll. The sections are observed at thresholds [0, .5], which appears to be analytics only, since no style changes were observed.

---

## 14. Component plan (reuse vs new)
| section | component | status |
|---|---|---|
| Header | `Header` | **extend**: `bg` + `ctas="login-signup"` variant (§1) |
| Hero | `CenteredVideoHero` | **new**. Reuses `Lockup` (new id `lockup-assistant`), `Button`, and a new `VideoSlot` with `PlayPauseControl` |
| Chapter intros ×5 | `ChapterIntro` | **new** (the eyebrow mono line is new; the h2 and p roles match `Intro`, but left-aligned in an 8/4 split) |
| Feature rows ×9 | `StickyFeatureRow` | **new** (scroll-driven pinned text, §13.1) |
| Helper cards | `HelperCard` (`variant="bordered"`) + grid | **new** (also used, as `variant="white"`, on `/agents`) |
| CTA band + final CTA | `CtaBand` | **new**, or generalize `FinalCta` to take `bg`, `bgArt`, `headingSize="md"`, `button` and `split` props |
| Connectors strip | `MediaSlot` | **reuse** |
| Trust | `SplitMedia` | **new** (shared with `/agents` §§4, 7, 8) |
| FAQ | `Faq` / `Accordion` | **new, shared** (`/agents`, `/plans`) |
| Footer | `Footer` | **extend**: `tone="light"` |
| Rails | `.cutout` utility on the content wrapper (+ `.cutout-top` on chapter starts) | **new** CSS utility |

---

## 15. Copy deck (role → original length → placeholder)
Roles: `hero.h1` display-small · `*.lede`/`f*.p` text-medium (hero lede text-large) · `ch*.eyebrow` mono · `ch*.h2` heading-large · `f*.h2`, `band.h2`, `final.h2` heading-medium · `card*.h3` heading-xsmall · `card*.p` text-small · `*.link`/`*.cta` button text · `faq.q*` text-medium 460. `len` is the original's character count (keep for mapping); `len (new)` is the placeholder's. Placeholders are independently written; lengths are within ±10%.

| key | len | len (new) | placeholder |
|---|---|---|---|
| `hero.h1` | 62 | 61 | Less switching between tabs. More finished work by lunchtime. |
| `hero.lede` | 163 | 164 | From the first coffee to the last message, Northstar Assistant quietly carries the small jobs: drafting, sorting, summarizing and checking, so your focus stays put. |
| `hero.cta` | 6 | 6 | Get it |
| `ch1.eyebrow` | 23 | 24 | 01 / 05 · WHILE YOU TYPE |
| `ch1.h2` | 31 | 30 | Small nudges, big time savings |
| `ch1.lede` | 128 | 128 | Northstar watches for the moments that slow you down (a clumsy line, a half-done reply, a missed detail) and offers a quick fix. |
| `f1.h2` | 23 | 24 | Your second pair of eyes |
| `f1.p` | 135 | 139 | Wherever there is a cursor, Northstar reads along and underlines what is unclear, wordy or off-tone. One tap swaps in the stronger version. |
| `f2.h2` | 45 | 46 | An inbox that triages itself before you arrive |
| `f2.p` | 122 | 120 | Newsletters go one way, receipts another, and the urgent note from your manager lands on top with a draft reply waiting. |
| `f3.h2` | 28 | 29 | Walk into every call prepared |
| `f3.p` | 130 | 129 | A one-page brief arrives before each meeting. Afterward, decisions and owners are captured and shared with everyone who attended. |
| `f4.h2` | 34 | 34 | It cites your team's own documents |
| `f4.p` | 144 | 145 | Connect your wikis, drives and project boards. Ask a question and the reply links back to the exact page it came from, so checking takes seconds. |
| `ch2.eyebrow` | 16 | 17 | 02 / 05 · TOOLKIT |
| `ch2.h2` | 21 | 21 | Specialists on demand |
| `ch2.lede` | 100 | 101 | Add the skills you care about. Each stays out of the way until the task in front of you calls for it. |
| `card1.h3` | 9 | 9 | Wordsmith |
| `card1.p` | 136 | 131 | Catches typos, awkward phrasing and runaway sentences. Over time it learns which suggestions you accept and quietly drops the rest. |
| `card1.link` | 10 | 10 | Learn more |
| `card2.h3` | 15 | 14 | Message Sorter |
| `card2.p` | 133 | 137 | Labels, archives and snoozes incoming mail using rules you never had to write, then lines up suggested answers. Lives in Northstar Inbox. |
| `card3.h3` | 17 | 16 | Citation Checker |
| `card3.p` | 158 | 149 | Reads your draft for numbers, dates and quotes, then compares each one against documents you trust. Anything it cannot back up is flagged for review. |
| `card4.h3` | 11 | 12 | Morning Memo |
| `card4.p` | 167 | 160 | A single note waiting at 8 a.m.: what changed overnight in your projects, which customers wrote in, and the three items on your calendar that deserve some prep. |
| `card5.h3` | 13 | 13 | Skill Builder |
| `card5.p` | 182 | 180 | Describe a repeatable job in plain words and pick what sets it off: a keystroke, a time of day, or an event like a closed deal or a new calendar invite. Northstar handles the rest. |
| `card5.link` | 14 | 14 | Start building |
| `card6.h3` | 11 | 11 | Marketplace |
| `card6.p` | 155 | 161 | Hundreds of ready-to-install skills, made by our team and vetted partners, cover everything from lesson plans to forecasting to legal review. Add one in a click. |
| `card6.link` | 14 | 14 | View the store |
| `band.h2` | 43 | 45 | Spend your hours on the parts only you can do |
| `band.cta` | 6 | 6 | Get it |
| `ch3.eyebrow` | 20 | 20 | 03 / 05 · YOUR STACK |
| `ch3.h2` | 17 | 18 | Wired to your apps |
| `ch3.lede` | 187 | 185 | Northstar reads from the calendars, trackers, drives and CRMs your team already pays for. Pick a prebuilt integration or wire up your own, and every suggestion reflects current details. |
| `ch3.link` | 18 | 17 | View integrations |
| `ch4.eyebrow` | 21 | 20 | 04 / 05 · EVERYWHERE |
| `ch4.h2` | 18 | 17 | Reach it your way |
| `ch4.lede` | 169 | 164 | Some days you want quiet suggestions; other days a full conversation, or a job that runs at 6 a.m. Northstar offers each mode, and you can move between them freely. |
| `f5.h2` | 12 | 12 | Inline edits |
| `f5.p` | 141 | 148 | Suggestions appear as a soft underline on the words themselves. Hover to preview, press Tab to accept, and the sentence you were writing carries on. |
| `f6.h2` | 23 | 23 | Ask about anything open |
| `f6.p` | 94 | 89 | Puzzled by a clause in a contract? Highlight it and ask; the explanation opens alongside. |
| `f7.h2` | 14 | 13 | One keystroke |
| `f7.p` | 93 | 95 | Press the shortcut from any field and a small prompt pops up in place. No new window to manage. |
| `f8.h2` | 5 | 5 | Rooms |
| `f8.p` | 88 | 92 | Tag Northstar in a shared channel and it catches latecomers up or settles the open question. |
| `f9.h2` | 10 | 9 | Home base |
| `f9.p` | 74 | 74 | A full-screen workspace for big asks, saved skills and your morning memos. |
| `ch5.eyebrow` | 26 | 25 | 05 / 05 · TRUST & CONTROL |
| `ch5.h2` | 18 | 19 | Locked down, always |
| `ch5.lede` | 331 | 324 | Encryption in transit and at rest, single sign-on and regular third-party audits are the baseline, not an upgrade. Admins choose retention windows and who may switch on which skills. Customer content is never used to train shared models unless an organization opts in, and on business plans that setting starts switched off. |
| `faq.h2` | 26 | 26 | Things people want to know |
| `faq.q1` | 22 | 21 | Who is Northstar for? |
| `faq.q2` | 56 | 57 | Which apps and browsers does Northstar Assistant support? |
| `faq.q3` | 29 | 31 | Is there a free plan I can try? |
| `faq.q4` | 30 | 32 | How long does it take to set up? |
| `faq.q5` | 59 | 56 | Can I turn off suggestions for certain apps or websites? |
| `faq.q6` | 33 | 30 | Which languages are supported? |
| `faq.q7` | 26 | 25 | Does it work offline too? |
| `faq.q8` | 37 | 36 | Who on my team can see what I write? |
| `faq.q9` | 32 | 32 | How do I cancel my subscription? |
| `faq.q10` | 72 | 70 | Can an administrator manage skills and settings for the whole company? |
| `faq.q11` | 81 | 81 | What happens to my drafts and conversation history if I move to a different plan? |
| `faq.q12` | 33 | 32 | Does Northstar work on my phone? |
| `faq.q13` | 43 | 43 | How do I share a custom skill with my team? |
| `faq.q14` | 38 | 37 | Where can I report a bug or get help? |
| `final.h2` | 30 | 33 | Give your to-do list a head start |
| `final.cta` | 17 | 17 | Create an account |

Visually hidden video captions: lengths are hero 13; rows 23 / 13 / 28 / 13 / 23 / 23 / 14 / 11 / 6. They are screen-reader only, so their length does not affect layout. Use `"Assistant demo"`-style labels, or the row's `h2` placeholder.

---

## 16. Not measured / caveats
- **Video frames** were not inspected frame by frame. Each slot has its size, duration, play logic and a one-line description of the UI it shows (`go.assets.json`). Draw original looping animations, or use a static illustration with a CSS loop.
- The **pinned-text variables** are set by page JS. The formulas in §13.1 are derived from four measured viewport/row combinations and match all of them to 3 decimals, but the original source code was not read.
- **Video play threshold**: inferred from the observer's thresholds `[0, 0.2]`. A video was observed playing once in view and paused once out of view. The exact 20% cut-in point was not bisected.
- **Viewport >1440** was not tested. The container max is 1280 up to 1440, and the global spec notes 1440 above that.
- The **cookie-consent banner** (third-party) was hidden for measurement and should not be cloned.
- The footer "cookie preferences" item in Legal is a `button` (26 ch, 169.5 wide @1440), not a link. It is the same as on the homepage.
