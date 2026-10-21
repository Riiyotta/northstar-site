Source: https://superhuman.com/mail

# Clone spec: `/mail` → Northstar Inbox page

Measured live on 2026-10-21 with a local Playwright Chromium (desktop Chrome 130 UA, `reducedMotion: 'no-preference'`) at viewport widths **1440, 1024, 768 and 390** (900px tall; 844 for the drawer check). All px values come from `getComputedStyle` / `getBoundingClientRect` or from the site's own CSS. Global tokens, header, footer, buttons and the 640/1080 breakpoint model are in `../CLONE_SPEC.md` and are **not** repeated. This file lists only what is new or different on this route.

Copy is not reproduced. Every text node has an id in the **copy deck** (section 14). The deck gives the original length and independently written Northstar copy of similar length (±10%). Media slots are listed by id. Sizes, aspect ratios, colours and a description of each slot are in `mail.assets.json`, which sits next to this file.

Brand mapping: Superhuman Mail → **Northstar Inbox**, Superhuman AI → **Northstar AI**, Superhuman (company) → **Northstar**.

---

## 0. Deltas vs the homepage (read first)

### 0.1 Header: the right-hand CTAs change. The rest is unchanged.
The sticky 67px header, logo, nav row, dropdowns, drawer mechanics and footer are identical to `CLONE_SPEC.md` §1 and §11. The footer was re-measured: 859.2px tall at 1440 and 1822.8 at 390, with the same 4 columns, 32 links and colour `#421d24`. **Reuse `Header` and `Footer`.**
- **There is no announcement banner.** `<main>` starts at y=67, directly under the header.
- Right CTA group (`gap: 16px`, items 36px tall, top y=15):
  1. "Contact sales": the existing unstyled text CTA, 97.6 wide, 16/460, `#292827`.
  2. **"Log in"** (new, 6 ch): the same unstyled text CTA (`Button variant="text"`), 43.9 wide, 16/460, underline on hover.
  3. **Primary filled compact** (new in header): `Button variant="primaryCompact"`, bg `#714cb6`, text `#fff`, 14/600, line-height 18, radius 8, padding `6px 16px`, 103.6×36. Hover bg `#533192`. Label `hero.cta` ("Get started", 11 ch).
  - The "Sign in ▾" product menu (`SignInMenu`) is **not present** on this route.
  - At 1440 the x positions are 1083 / 1196 / 1256. At 640–1080 all three show plus the 36px hamburger. Below 640 only the hamburger shows.
- **Drawer footer** (<1080): three full-width rows stacked with gap 12 (y 688 / 736 / 784 at 390×844). Each row is 326×36: "Contact sales" (text), "Log in" (text), then the primary filled compact button (36px tall, **not** 52).
- The 6th nav item reads "Love" (a 4-char plain link) on every route measured today, including `/`. The label difference from the homepage spec ("Blog") is a site-wide content change, not specific to this page. Keep a 4-char placeholder.
- Implementation: give `Header`/`MobileDrawer` a `ctaVariant` prop (`'signin'` for home, `'login'` for product pages), plus a `primaryLabel` prop.

### 0.2 New type roles (add to `tailwind.config.js` `fontSize`)
| token | formula (source CSS) | line-height | letter-spacing | weight | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|---|
| `display-sm` (h1) | `clamp(36px, 16px + 3.125vw, 61px)` | **1.1** | -0.0275em | 460 | 61 / 67.1 / -1.6775 | 48 / 52.8 / -1.32 | 40 / 44 / -1.1 | 36 / 39.6 / -0.99 |
| `heading-sm` (feature subheads) | `clamp(24px, 18.4px + 0.875vw, 31px)` | 1.2 | -0.0275em | 460 | 31 / 37.2 / -0.8525 | 27.36 / 32.83 / -0.7524 | 25.12 / 30.14 / -0.6908 | 24 / 28.8 / -0.66 |

Measured values of the existing roles on this page, for checking:
- `heading-md`: 39 / 33.28 / 29.76 / 28px.
- `heading-xs`: 25 / 22.4 / 20.8 / 20px.
- `large` (text-large): 20/30, 18.96/28.44, 18.32/27.48, 18/27.
- `heading-lg` and `medium`: as in the homepage spec.

### 0.3 New colour tokens
- `text-highlight`: `light-dark(#3b96ff /*sky-60*/, #62abff /*sky-40*/)`. It is only used inside the dark stat band, where it renders **`#62abff`**. Add `sky: { 40: '#62abff', 60: '#3b96ff' }` and a `--highlight` context var.
- `text-brand` = the action-primary colour (`#714cb6` light / `#d4c7ff` dark). It is used for inline emphasis spans inside headings. Use `text-action`.
- The new section background on this page is `#f2f0eb` (neutral-10), used for the hero and logos. The other backgrounds are `#ffffff`, `#f7f5f2`, `#281647` and `#421d24`. All are already tokens.

### 0.4 Section padding rule on this page
Section content wrapper padding is **96px** (≥640) / **40px** (<640) top and bottom. Inside a group, sections after the first have **padding-top 0** and keep **padding-bottom 96 / 40**. The homepage spec says vp for that bottom padding; here it is measured as 96. Horizontal padding is vp (32/24/24/16), as on the homepage.

### 0.5 Shared link icon
`primaryLink` ("See more") uses a **20×20 caret-right (chevron) icon**, gap 4px, not the arrow used on the homepage. Add `icon="caret"` to `Button` (lucide `ChevronRight` size 20, strokeWidth ≈1.5). Hover: colour `#714cb6` → `#533192` plus an underline. This was measured.

---

## 1. Section order and geometry
Document y / height in px. The doc height includes the 67px header and the footer.

| # | id | section | bg | group | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|---|
| M1 | hero | Product hero + video | `#f2f0eb` | A | 67 / 1291.3 | 67 / 1245.2 | 67 / 1056.9 | 67 / 755 |
| M2 | logos | Logo strip (rotating) | `#f2f0eb` | A | 1358.3 / 245 | 1312.2 / 322 | 1123.9 / 322 | 822 / 266 |
| M3 | stat | Stat band (dark) | `#281647` | A | 1603.3 / 390 | 1634.2 / 336.9 | 1445.9 / 304.3 | 1088 / 308.7 |
| M4 | problem | Centered intro | `#ffffff` | B | 1993.3 / 438.6 | 1971.2 / 369.2 | 1750.2 / 431.3 | 1396.8 / 432.2 |
| M5 | pillars | 3 icon pillars | `#ffffff` | B | 2431.9 / 261 | 2340.4 / 254.8 | 2181.5 / 250.9 | 1828.9 / 505 |
| M6 | compat | App icons + heading | `#f7f5f2` | – | 2692.9 / 442.8 | 2595.1 / 432.2 | 2432.4 / 425.7 | 2333.9 / 348.8 |
| M7a–e | f1–f5 | 5 split feature rows | `#f7f5f2` | C | 3135.7 / 693.6, then 597.6, 596.8, 596.8, 597.6 | 3027.3 / 608.8, 550.7, 492.5, 574.7, 574.7 | 2858.1 / 686, 650.7, 620.6, 701.7, 674.7 | 2682.7 / 857, 931.3, 815, 926.5, 928.3 |
| M8 | grid | 6-card media grid (dark) | `#281647` | – | 6218 / 852.2 | 5828.6 / 714.9 | 6191.8 / 651.4 | 7140.9 / 1826.3 |
| M9a–e | f6–f10 | 5 split feature rows | `#f7f5f2` | D | 7070.2 / 693.6, then 597.6 ×4 | 6543.5 / 616.7, 492.9, 492.9, 498.7, 492.9 | 6843.2 / 686.6, 561, 539.6, 544.7, 569.7 | 8967.2 / 885.5, 761, 794.5, 825.3, 796.3 |
| M10 | quotes | Two testimonials (dark) | `#281647` | – | 10154.2 / 682.8 | 9137.6 / 691.2 | 9744.8 / 738.7 | 13029.9 / 1059.8 |
| M11 | cta | Closing CTA (dark) | `#421d24` | – | 10837 / 350.8 | 9828.8 / 340.2 | 10483.5 / 333.7 | 14089.7 / 256.8 |
| – | footer | shared Footer | `#421d24` | – | 11186.4 / 859.2 | | | 14346.1 / 1822.8 |
| | | **document height** | | | **12047** | **11311** | **11959** | **16169** |

The group wrappers have their own backgrounds:
- Group A is `#f2f0eb`. M3 paints its own `#281647`.
- Group B is `#ffffff`.
- Groups C and D wrap `#f7f5f2` sections. D's wrapper is `#fff`, but every section in it paints `#f7f5f2`.

M10 (`#281647`) sits directly on M11 (`#421d24`), and M11 sits directly on the footer (`#421d24`). There are no borders: M11 and the footer read as one continuous mulberry block.

**Component map**
| section | reuse / new |
|---|---|
| M1 | **New `ProductHero`** (centered lockup-in-h1, display-sm, text-large lede, single CTA, rounded video with a pause control). Reuse `Lockup`, `Button`, `MediaSlot`. |
| M2 | **Reuse `LogoStrip`**. Add props: `intro` text, `introClass="text-medium"`, `bg="#f2f0eb"`, `paddingTop={0}`. Rotation timing is identical (§3). |
| M3 | **New `StatBand`**. |
| M4 | **Reuse the `Intro` pattern** (centered title-description block) without lockup/CTA, with an inline brand span and 2 paragraphs. Make lockup/cta optional and `body` accept an array. |
| M5 | **New `CardGrid`** (shared with docs; variant `centered-icon`). |
| M6 | `Intro` pattern with a media figure on top (reuse Intro and replace the lockup slot with `MediaSlot`). |
| M7 / M9 | **New `SplitFeature`** (shared with docs: two-column text + media row, alternating side). |
| M8 | `CardGrid` variant `media-caption` (dark). |
| M10 | **New `TestimonialPair`** (logo + quote + attribution + avatar cards). Different from the homepage `Testimonial`. |
| M11 | **New `CtaBand`** (left-aligned h2 + CTA group; no background art). Shared with docs D13. The homepage `FinalCta` has an h2/button split row and GIF art, so it does not fit. |

---

## 2. M1 Product hero (`#f2f0eb`)
- Wrapper padding `96px vp 96px` (≥640) / `40px 16px 40px` (<640).
- Column: flex, `align-items:center`, `text-align:center`.

**Title block** (`flex-col`, gap 24, `margin-bottom: 40px` (≥640) / `24px` (<640)). Width shrinks to the longest h1 line: 753.1 (1440), 592.6 (1024), 499 (768), 351 (390).
1. `header`: flex-col, **gap 24 (≥640) / 12 (<640)**.
   - `h1` `display-sm`, colour `#292827`, centered. Its content in order:
     1. Lockup `lockup-inbox` (208×25 image, `display:inline-block`, baseline-aligned) followed by `<br>`. It takes the first line box: at 1440 the image top is 30px below the h1 top (line box 67.1).
     2. Text `hero.h1a` (29 ch), then `<br>`, then `hero.h1b` (15 ch).
     - Lines: 3 at 1440, 1024 and 768 (h1 heights 201.3 / 158.4 / 132). At 390 there are 4 lines (158.4) because `h1a` wraps.
   - `p` `large` (text-large), colour text-sub `rgba(20,20,19,.65)`, centered.
     - Content: `hero.p1` `<br>` `hero.p2`.
     - Height 60 at 1440 (2 lines), 56.8 at 1024, 54.9 at 768, 108 at 390 (4 lines).
2. CTA container: `margin-top: 16px` (so header→button = 40px).
   - ≥640: a centered row.
   - <640: flex-col, and the button stretches to **351×52**.
   - The button is primaryFilled large (light): `#714cb6`, 121.8×52, radius 12, label `hero.cta`.

**Video frame** (`mail-hero-video`)
- `width:100%; max-width:960px`, aspect **3:2**, `border-radius:16px; overflow:hidden`, `object-fit: contain`.
- Sizes: 960×640 at 1440 and 1024 (x 240 / 32), 720×480 at 768, 358×238.7 at 390.
- Attributes: `autoplay muted playsinline`, preload metadata, no poster, no `loop` attribute (JS restarts it; see §12).

**Controls row** (`controls_outsideBottomLeft`)
- `margin-top: 10px`, flex, left-aligned to the video's left edge.
- It holds one **32×32 icon button**: transparent bg, no border, colour `#292827`.
- `aria-label`: "Pause animation" ⇄ "Play animation".
- Icon (32 viewBox): circle r=15 with a 2px `currentColor` stroke, plus either two 2×12 rounded bars (pause) or a play triangle. Draw it with inline SVG.

Vertical rhythm at 1440:
- Wrapper top 67 → title block 163 (96 padding).
- h1 163–364.3. p 388.3 (gap 24).
- Button 488.3–540.3. Video 580.3–1220.3 (40 below the button).
- Control 1230.3–1262.3. Section end 1358.3 (96 padding).

## 3. M2 Logo strip (`#f2f0eb`, same group as M1)
- Padding `0 vp 96` (40 at 390). Centered column.
- `p` text-medium **18/27/540**, text-sub, 19 ch (`logos.p`), 156.6 wide. Note: the homepage strip uses text-small 16px here.
- Grid `margin-top: 40px` (≥1080) / `36px` (<1080). Hairline table exactly as homepage §4:
  - ≥1080: 6 columns of 213.2×81.
  - <1080: 3 columns × 2 rows. The grid is **shrink-wrapped** to the logo art, so the 1fr columns resolve to 230/231px at 1024/768 (container 691/694) and 119px at 390 (358).
  - Logos sit in `object-fit:contain` slots 80px tall: 229×80, 214×80, 230×80, or 198×72 for the shorter marks.
- **Rotation (measured with a MutationObserver over 25s, then polled for 50s):**
  - The first fade-out comes ≈1.06s after the cells mount.
  - Then **every 2000ms one cell** (random, never the same cell twice in a row) runs: `fadeOut` (opacity 1→0, **500ms ease-in-out**) → the cell is empty for 500ms → a new logo mounts with `fadeIn` (0→1, **500ms ease-in-out**). Fade-in starts at +1000ms after fade-out starts.
  - The incoming mark is one not currently shown. 7 distinct marks were seen at 1440 in 50s, and further marks (≥9 total) appeared in the 390 run, so the pool is larger than the 6 cells.
  - Rotation **keeps running when scrolled out of view**: 16 mutations in 8s while away.
  - This is the existing `LogoStrip` behaviour: reuse it and pass the pool (`logo-1…logo-N`, N ≥ 9).
  - The CSS declares no reduced-motion override for these keyframes. The existing clone stops rotation under reduced motion, which is fine to keep.

## 4. M3 Stat band (`#281647`, dark context)
- Section `position:relative`. Padding `0 vp 96` (40 at 390): there is **no top padding**.
- **Background art** `mail-stat-bg`: absolutely positioned `inset:0`, `img` 100%×100%, **`object-fit: contain`** (centered, natural 1440×464) over the section bg.
  - At 1440 it renders the art about 1210×390 centered horizontally.
  - At 390 it renders about 390×126, centered vertically.
  - The art is a giant numeral watermark, only slightly lighter than the bg (dominant `#281848`, art strokes about `#382858`).
- `h2` `heading-lg`, white, centered. It is a shrink-wrapped block: 726.1 wide at 1440, 595.1 at 1024, 514.5 at 768, 351 at 390.
  - It begins with **three empty line boxes** (three `<br>`). These push the text down over the watermark. Implement as `padding-top: 3.6em` (3 × line-height 1.2) or keep the `<br>`s.
  - Then `stat.l1` (33 ch) `<br>` + `<span class="text-highlight">stat.hl</span>` (16 ch, **`#62abff`**) + `stat.l2` (19 ch).
  - Total h2 heights: 294 / 240.9 / 208.3 / 268.7 (at 390 the text wraps to 4 lines).

## 5. M4 Problem intro (`#ffffff`)
- Padding 96/96 (40/40).
- Centered title-description block: flex-col, gap 24, max-width `min(90vw, 900px)`.
- `h2` heading-lg `#292827`: `problem.h2a` (13 ch incl. trailing space) + `<span class="text-action">problem.h2b</span>` (37 ch, `#714cb6`). 2 lines at 1440 and 768, 1 line at 1024 (805.7 wide), 3 lines at 390.
- `p` text-medium text-sub `problem.p1` (158 ch, 2 lines at 1440, 900 wide).
- `p` text-medium text-sub `problem.p2` (105 ch, 1 line at 1440).

## 6. M5 Pillars (`#ffffff`, same group as M4)
- Padding `0 vp 96` (40).
- Grid (`multi-column`, a container query on its own width ≥640 → 3 columns, otherwise 1 column):
  - 3 × 405.3 with gap 32 (1440)
  - 3 × 309.3 with gap 24 (1024)
  - 3 × 224 with gap 24 (768)
  - 1 × 358 with gap 16 (390)
- Item: flex-col, `align-items:center`, `text-align:center`, gap 24:
  - icon slot `mail-pillar-icon-1..3` (78×81, 78×81, 77×79; no radius; the art is a gradient rounded tile)
  - `p` heading-xs **text-sub**, containing an inline `text-action` span.
- Copy:
  - item 1: `pillar1.a` + span `pillar1.b` + `pillar1.c`
  - item 2: `pillar2.a` + span `pillar2.b` + `pillar2.c`
  - item 3: span `pillar3.a` + `pillar3.c`
- Text wraps to 2 lines (1 line for item 3 at 1440).
- Item heights: 165 (1440), 158.8 (1024), 154.9 (768), 153/153/127 (390).

## 7. M6 Compatibility (`#f7f5f2`, standalone)
- Padding 96/96 (40/40). Centered block, gap 24.
- Figure `mail-compat-icons`: `img` **922×168**, `object-fit: cover`. Below 922 it is clipped to the content width: 922×168 at 1024 (block 922 wide), 720×168 at 768, 358×168 at 390. The art is centered, so the two icon tiles stay centered.
- `h2` heading-lg, colour `#292827`. Built from spans:
  - `<span class="text-fg">compat.a</span>` + `compat.b` + `<span class="text-action">compat.c</span>` + `compat.d` + `<span class="text-action">compat.e</span>`.
  - 1 line at 1440 (823.9 wide), 1024 and 768. 2 lines at 390.

## 8. M7 / M9 Split feature rows (`#f7f5f2`): `SplitFeature`, 10 rows

**Container** (`two-column`, `gapL`): flex.
- `flex-direction: row` at ≥640, `column` below.
- Gap **128 (≥1280) / 64 (640–1280) / 32 (<640)**.
- Two equal columns (`flex: 1 1 50%`), each a flex-col with `justify-content:center` and gap vp, so the **shorter column is vertically centered**.
- Column width: 576 (1440), 456 (1024), 328 (768), 358 (390 stacked).

**Media column**: one `img`, aspect **720:627 (1.1483)**, `object-fit: cover`, radius 0. The art includes its own rounded cards on a transparent bg (the corner pixels equal the section bg `#f7f5f2`).
- Rendered size: 576×501.6, 456×396.9, 328×285.3, 358×311.6.

**Text column**: title-description block, flex-col, **gap 24**, left aligned:
1. `h2` **heading-md** `#292827` with one `text-action` span, either leading (e.g. f2, f4, f6–f10) or trailing (f1, f3, f5). See the deck for which part is the span.
2. `p` **heading-sm**, `#292827` (subhead, 1 line at 1440).
3. 1 to 3 `p` text-medium text-sub (18/27).
4. Optional primaryLink "See more" with a caret (f1 and f9 only): 91.8×32, label 8 ch (`f1.link`).

**Side and order.** On desktop and tablet the media alternates:

| row | f1 | f2 | f3 | f4 | f5 | f6 | f7 | f8 | f9 | f10 |
|---|---|---|---|---|---|---|---|---|---|---|
| media side | L | R | L | R | L | R | L | R | L | R |

**Below 640, the text always comes first and the media second.** The source uses `order:-1` on desktop for the "media left" rows and resets it on mobile.

**Padding.** The first row of each group (f1, f6) has padding 96/96. The others have `0/96` (40 at 390). Heights are in the §1 table.

Paragraph counts (ids in the deck):

| row | paragraphs | link |
|---|---|---|
| f1 | p1, p2 | yes |
| f2 | p1, p2 | – |
| f3 | p1, p2 | – |
| f4 | p1, p2, p3 | – |
| f5 | p1, p2, p3 | – |
| f6 | p1, p2, p3 | – |
| f7 | p1, p2 | – |
| f8 | p1, p2 | – |
| f9 | p1, p2 | yes |
| f10 | p1, p2 | – |

Media ids are in `mail.assets.json`, in order: `mail-feature-ai, -split, -reminder, -comments, -snippets, -opens, -autocorrect, -presence, -calendar, -event`.

## 9. M8 Media grid (`#281647`, dark, standalone)
- Padding 96/96 (40/40). **There is no heading.**
- Grid: 3 columns at a container width ≥640, otherwise 1 column. Gap = vp: 32 (1440), 24 (1024/768), 16 (390). Column widths 405.3 / 309.3 / 224 / 358.
- Card: flex-col, gap 24. Two rows of 3 at desktop and tablet.
  - Media `img` with aspect **480:308 (1.5584)**, `cover`, radius 0. The art fills to its edges (no transparent corners). Sizes: 405.3×260.1, 309.3×198.6, 224×143.8, 358×229.7.
  - Caption `p` **heading-xs**, colour **`rgba(255,255,255,0.8)`**, left aligned, 1 line at 1440, 2 lines at 768.
- Card heights: 314.1 (1440), 249.5 (1024), 217.7 (768), 277.7 (390).
- Captions `grid.c1…c6`. Media `mail-grid-send-later, -quick-reply, -snooze, -shortcuts, -profile, -unsubscribe`.

## 10. M10 Testimonials (`#281647`, dark)
- Padding 96/96 (40/40).
- Title block: centered, padding-bottom **80**. `h2` heading-lg white, 37 ch (`quotes.h2`), 1 line at 1440 (847 wide), 2 lines at 390.
- Grid:
  - 2 columns: 624 with gap 32 (1440), 476/24 (1024), 348/24 (768)
  - 1 column: 358 with gap 16 (390)
- Card: flex-col, gap = vp (32 / 24 / 24 / 16).
  1. Content block: flex-col, gap 24, left aligned:
     - Logo slot `mail-quote-logo-1/2`: **237×53**, white wordmark.
     - Quote `p` text-medium **`rgba(255,255,255,.8)`** (`quote1.p` 228 ch / `quote2.p` 201 ch, 3 lines at 1440). There are no quotation marks.
     - An empty `p` (0 height). It adds one extra 24px gap, so the quote→name distance is 48.
     - Attribution `p` text-medium `rgba(255,255,255,.8)`: name `<br>` role, 2 lines (`quoteN.name` / `quoteN.role`).
  2. Avatar `mail-quote-avatar-1/2`: **60×60** circle photo, left aligned.
- Card heights at 1440: 352 = 260 block + 32 + 60.

## 11. M11 Closing CTA (`#421d24`, dark): `CtaBand`
- Padding 96/96 (40/40). Left-aligned column.
- Title block: gap 24, width 870.4 at 1440, max `min(90vw,900px)`.
  - `h2` heading-lg white, `cta.h2` (41 ch). 1 line at ≥768 (870.4 / 713.4 / 616.8 wide). 2 lines at 390.
  - CTA group: `margin-top: 24px` (with the 24px block gap, the buttons sit 48px below the h2), flex row, gap 16. It **stays a row at 390** (121.8 + 16 + 138.6):
    - primaryFilled **dark** (bg `#d4c7ff`, text `#292827`, hover `#bea1f5`), 121.8×52, `cta.btn1`.
    - primaryOutline **dark** (text and inset 1px ring `#d4c7ff`; hover ring 2px and colour `#bea1f5`), 138.6×52, `cta.btn2`.
- Height 350.8 (1440), 340.2 (1024), 333.7 (768), 256.8 (390).

---

## 12. Motion and interaction (complete list for this route)
1. **Hero video**
   - Autoplays muted inline from load. It also autoplays under `prefers-reduced-motion: reduce` (measured).
   - Duration 35.93s. There is no `loop` attribute, but when it ends the component restarts it from 0 (measured: seeking to `duration-1` produced playback from t≈0 again 2.5s later). Treat it as a **loop**.
   - **Viewport-gated**: an `IntersectionObserver` with thresholds `[0, 0.2]` on the `<video>`. Scrolling it out of view **pauses** it, and scrolling back **resumes** from the same time (paused at t=1.15 → playing again at t=1.96).
   - The pause button toggles `video.pause()/play()` and swaps the icon and `aria-label`. No transition.
2. **Logo rotation**: §3. A 2s period; 500ms ease-in-out fade-out, 500ms blank, then 500ms ease-in-out fade-in.
3. **Hover**
   - Buttons: background-color 200ms ease-in-out (`#714cb6`→`#533192`; dark `#d4c7ff`→`#bea1f5`).
   - Outline buttons: inset ring 1→2px and colour change, `box-shadow 200ms ease-in-out`.
   - primaryLink: colour + underline.
   - Header/footer: as in the homepage spec.
4. **None observed**
   - No scroll-triggered reveals: no element waits at opacity 0 or offset before scrolling into view, and all transforms are `none`. This was checked before and after a full scroll.
   - No parallax and no sticky elements besides the header.
   - No header change over dark sections: its background stays `#fff` at every section.
   - No tabs, accordions or carousels on this page.
   - Per-section `IntersectionObserver`s (threshold `[0,0.5]`) and link observers (`rootMargin: 200px`) exist, but they cause **no visual change** (analytics/prefetch). Do not clone them.
   - The source CSS also contains `two-column` scroll-timeline "sticky" keyframes. They are **not** active on this route (no `effectActive` class).

## 13. Not measured / caveats
- Exact logo pool membership: rotation is random. ≥9 distinct marks were seen across runs; reuse the clone's pool.
- Video frame content was sampled only for colours and one still. Draw original UI art; do not trace.
- The Northstar copy is written independently: different features, angles and wording. Only role, length (±10%) and line counts follow the original. Media art descriptions in the manifest describe the original UI type. Redraw the art so it matches the new feature names.
- Hover states were measured in light and dark contexts for the primary, outline and link buttons. The focus ring is as in the global spec.
- There is no viewport >1440 data.

## 14. Copy deck (independently written Northstar copy)
The copy is original. It is not a rewording of the source: the features, angles and titles are new, and it covers the same roles at a similar length. Inline span ids (`*.h2a/b`, `stat.hl`, `pillarN.b`, `compat.c/e`) mark where the brand or highlight colour goes; see the section text for which segment is coloured. 

| id | role | orig chars | Northstar copy (chars) |
|---|---|---|---|
| `hero.h1a` | h1 line 1 | 29 | `Mail that moves at your pace` (28) |
| `hero.h1b` | h1 line 2 | 15 | `for every team` (14) |
| `hero.p1` | lede line 1 | 60 | `Northstar Inbox turns a crowded mailbox into a calm daily plan.` (63) |
| `hero.p2` | lede line 2 | 58 | `Built for people who reply fast and think in priorities.` (56) |
| `hero.cta` | button | 11 | `Get started` (11) |
| `logos.p` | logo intro | 19 | `Teams that run on us` (20) |
| `stat.l1` | stat h2 line 1 | 33 | `Across our customers, Inbox sorted` (34) |
| `stat.hl` | stat highlight span | 16 | `2.4 billion notes` (17) |
| `stat.l2` | stat h2 tail | 19 | ` without a backlog.` (19) |
| `problem.h2a` | h2 plain | 13 | `Your inbox is ` (14) |
| `problem.h2b` | h2 brand span | 37 | `a to-do list other people keep editing` (38) |
| `problem.p1` | body | 158 | `Requests, alerts and introductions all arrive in one stream with equal weight. Sorting that stream by hand quietly eats the focus you meant to give the real work.` (162) |
| `problem.p2` | body | 105 | `Northstar Inbox gives the stream a shape, so the first screen you see each morning is the one that matters.` (107) |
| `pillar1.a` | pillar text | 23 | `Open each morning with ` (23) |
| `pillar1.b` | pillar span | 13 | `a short queue` (13) |
| `pillar1.c` | pillar text | 11 | `, not a pile` (12) |
| `pillar2.a` | pillar text | 3 | `Hit ` (4) |
| `pillar2.b` | pillar span | 15 | `fewer surprises` (15) |
| `pillar2.c` | pillar text | 23 | ` hiding in long threads` (23) |
| `pillar3.a` | pillar span | 18 | `Hand off cleanly` (16) |
| `pillar3.c` | pillar text | 18 | ` at every shift end` (19) |
| `compat.a` | h2 base span | 15 | `Plugs straight` (14) |
| `compat.b` | h2 text | 10 | ` into your ` (11) |
| `compat.c` | h2 brand span | 5 | `Wrenmail` (8) |
| `compat.d` | h2 text | 4 | ` or ` (4) |
| `compat.e` | h2 brand span | 7 | `Driftpost` (9) |
| `f1.h2a` | h2 text | 9 | `Delegate ` (9) |
| `f1.h2b` | h2 brand span | 13 | `to Pilot mode` (13) |
| `f1.sub` | subhead | 31 | `House rules written in plain words` (34) |
| `f1.p1` | body | 285 | `Tell Pilot how you like things handled, in ordinary sentences: file every receipt, flag anything from legal, decline cold pitches politely, nudge me if a client goes quiet. Pilot applies those rules the moment mail arrives and keeps a running log of each action, so you can review what happened and undo any step.` (313) |
| `f1.p2` | body | 66 | `Skim the log once a day and tweak the rules as your role changes.` (65) |
| `f1.link` | link | 8 | `See more` (8) |
| `f2.h2a` | h2 brand span | 14 | `Morning Brief,` (14) |
| `f2.h2b` | h2 text | 21 | ` ready before coffee` (20) |
| `f2.sub` | subhead | 35 | `One page that sums up the night shift` (37) |
| `f2.p1` | body | 231 | `Colleagues in other time zones keep working while you sleep. Instead of waking up to forty unread threads, you get a single page that groups overnight activity by project, notes what was decided, and lists the replies waiting on you.` (233) |
| `f2.p2` | body | 266 | `Choose which senders and labels feed the brief, pick the hour it lands, and open any line to jump straight into the full conversation. Forward it to an assistant or a teammate who is covering for you, and they start the day with exactly the same picture of what changed and what is due.` (286) |
| `f3.h2a` | h2 text | 10 | `Pin what ` (9) |
| `f3.h2b` | h2 brand span | 19 | `matters this week` (17) |
| `f3.sub` | subhead | 25 | `A shelf above your inbox` (24) |
| `f3.p1` | body | 265 | `Contracts under review, travel plans, a hiring loop with five interviewers: some conversations need to stay in sight for days. Pin them to the shelf and they sit above everything else on every device, then quietly unpin themselves once the thread is marked done so the shelf stays short.` (287) |
| `f3.p2` | body | 206 | `Drag pins into the order you think in, give each one a colour, and share a whole shelf with the person covering your accounts while you are away. They see the same priorities without a long handover document.` (208) |
| `f4.h2a` | h2 brand span | 17 | `Shared drafts` (13) |
| `f4.h2b` | h2 text | 15 | ` for hard replies` (17) |
| `f4.sub` | subhead | 35 | `Write the sensitive ones as a group` (35) |
| `f4.p1` | body | 133 | `A refund dispute, a press question, a note to a board member: some messages are too important to send on one person's judgement.` (128) |
| `f4.p2` | body | 129 | `Open the draft to colleagues and watch their cursors appear. Suggestions show inline, and nobody has to copy text into a chat.` (126) |
| `f4.p3` | body | 214 | `Add an approval step for messages that touch legal or finance. The draft stays locked until a named reviewer signs off, and the final version keeps a record of who changed what, which helps when someone asks later.` (214) |
| `f5.h2a` | h2 text | 14 | `Protect ` (8) |
| `f5.h2b` | h2 brand span | 20 | `your deep-work hours` (20) |
| `f5.sub` | subhead | 34 | `Mail waits while you concentrate` (32) |
| `f5.p1` | body | 86 | `Long stretches of thinking rarely end with a bang. They end with one small ping after another.` (94) |
| `f5.p2` | body | 186 | `Quiet hours hold back anything that is not urgent until your focus block ends, then hand you a tidy summary. A short VIP list can always break through, so nothing critical waits on you.` (185) |
| `f5.p3` | body | 206 | `Turn on quiet hours for a whole team during a launch week. Your status shows colleagues you are heads-down, and blocks sync with your calendar, so meetings and mail stop competing for the same scarce time.` (205) |
| `grid.c1` | card caption | 29 | `Translate any thread instantly` (30) |
| `grid.c2` | card caption | 31 | `Read a long thread as a recap` (29) |
| `grid.c3` | card caption | 34 | `Archive a whole sender in one go` (32) |
| `grid.c4` | card caption | 33 | `Attach files from any cloud drive` (33) |
| `grid.c5` | card caption | 30 | `Set an away reply in seconds` (28) |
| `grid.c6` | card caption | 28 | `Search by what you remember` (27) |
| `f6.h2a` | h2 brand span | 20 | `Stay easy to reach` (18) |
| `f6.h2b` | h2 text | 11 | ` on the road` (12) |
| `f6.sub` | subhead | 29 | `Light mail for patchy wifi` (26) |
| `f6.p1` | body | 80 | `Travel mode trims images and attachments so messages load on the weakest signal.` (80) |
| `f6.p2` | body | 181 | `Replies queue offline and send in the right order once you land. Your away note switches on automatically when your calendar shows a flight, and switches off when you check in at the hotel.` (189) |
| `f6.p3` | body | 111 | `Teammates see a small plane next to your name, so they know a slower answer is expected rather than ignored.` (108) |
| `f7.h2a` | h2 brand span | 10 | `Tone check` (10) |
| `f7.h2b` | h2 text | 10 | ` pre-send` (9) |
| `f7.sub` | subhead | 30 | `Catch a sharp edge in advance` (29) |
| `f7.p1` | body | 270 | `Late in the day it is easy to write something that reads colder than you meant. Tone check highlights phrases that may land badly with the reader, explains why in a single line, and offers a warmer alternative you can accept with one click or ignore if the bluntness is on purpose.` (281) |
| `f7.p2` | body | 78 | `It runs locally on your draft, and nothing is stored once you hit send.` (71) |
| `f8.h2a` | h2 brand span | 16 | `Hand off threads` (16) |
| `f8.h2b` | h2 text | 15 | ` with context` (13) |
| `f8.sub` | subhead | 30 | `Nobody has to start from zero` (29) |
| `f8.p1` | body | 223 | `Accounts change hands when people go on leave, switch teams or move on. The new owner usually inherits a stack of threads and no idea which promises were made, which questions are still open, or who on the other side matters most.` (230) |
| `f8.p2` | body | 155 | `A handoff note travels with every reassigned thread: a short summary, open commitments and key contacts, written by AI and checked by the outgoing owner.` (153) |
| `f9.h2a` | h2 brand span | 19 | `Capture receipts` (16) |
| `f9.h2b` | h2 text | 20 | ` without any typing` (19) |
| `f9.sub` | subhead | 36 | `Totals land in your expense sheet` (33) |
| `f9.p1` | body | 67 | `Receipts arrive by mail, get buried, and resurface at month end.` (64) |
| `f9.p2` | body | 198 | `Inbox spots receipts and invoices as they come in, reads the vendor, amount and date, and adds a row to the expense sheet you choose. Anything it is unsure about waits in a small review list for you.` (199) |
| `f10.h2a` | h2 brand span | 15 | `Tame newsletters` (16) |
| `f10.h2b` | h2 text | 24 | ` into one calm weekly read` (26) |
| `f10.sub` | subhead | 37 | `A single digest instead of forty pings` (38) |
| `f10.p1` | body | 205 | `Subscriptions are worth keeping until they bury everything else. Inbox moves them out of the main view and gathers every issue into one weekly digest, with the opening lines of each so you can decide what to read.` (213) |
| `f10.p2` | body | 127 | `Unsubscribe straight from the digest, or mark a favourite so its new issues still show up the moment they are published.` (120) |
| `quotes.h2` | section h2 | 37 | `Notes from teams who made the switch` (36) |
| `quote1.p` | quote | 228 | `We run a twelve-person studio and every client used to email everyone. Pilot rules sort that out before any of us look, and the Morning Brief means our designers start the day sketching instead of digging through threads.` (221) |
| `quote1.name` | name | 16 | `Morgan Ashcroft` (15) |
| `quote1.role` | role | 15 | `CEO of Fieldkit` (15) |
| `quote2.p` | quote | 201 | `Handoffs used to cost us a week of catch-up whenever someone went on leave. Now the notes are already waiting on each thread, and our customers barely notice that the person answering them has changed.` (201) |
| `quote2.name` | name | 11 | `Riley Okafo` (11) |
| `quote2.role` | role | 43 | `Senior Director of Client Success at Lumena` (43) |
| `cta.h2` | h2 | 41 | `Bring your team to a calmer inbox today` (39) |
| `cta.btn1` | button | 11 | `Get started` (11) |
| `cta.btn2` | button | 13 | `Contact sales` (13) |


## 15. Measured text nodes (role, original length, line counts)
Set text so the line counts roughly match at each width. DOM section index → spec id: 0 M1, 1 M2, 2 M3, 3 M4, 4 M5, 5 M6, 6–10 M7a–e, 11 M8, 12–16 M9a–e, 17 M10, 18 M11. Spans are inline segments inside the preceding heading or paragraph.

| section | node | role | own chars | lines 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|
| 0 | h1 #1 | display-small | 44 | 3 | 3 | 3 | 4 |
| 0 | p #2 | text-large | 118 | 2 | 2 | 2 | 4 |
| 1 | p #1 | text-medium | 19 | 1 | 1 | 1 | 1 |
| 2 | h2 #1 | heading-large | 52 | 5 | 5 | 5 | 7 |
| 2 | span #2 | span (highlight span) | 16 | 1 | 1 | 1 | 1 |
| 3 | h2 #1 | heading-large | 12 | 2 | 1 | 2 | 3 |
| 3 | span #2 | span (brand span) | 37 | 2 | 1 | 2 | 3 |
| 3 | p #3 | text-medium | 158 | 2 | 2 | 2 | 4 |
| 3 | p #4 | text-medium | 105 | 1 | 1 | 2 | 3 |
| 4 | p #1 | heading-xsmall | 34 | 2 | 2 | 2 | 2 |
| 4 | span #2 | span (brand span) | 13 | 1 | 1 | 1 | 1 |
| 4 | p #3 | heading-xsmall | 25 | 2 | 2 | 2 | 2 |
| 4 | span #4 | span (brand span) | 15 | 1 | 1 | 1 | 1 |
| 4 | p #5 | heading-xsmall | 17 | 1 | 2 | 2 | 1 |
| 4 | span #6 | span (brand span) | 18 | 1 | 1 | 1 | 1 |
| 5 | h2 #1 | heading-large | 12 | 1 | 1 | 1 | 2 |
| 5 | span #2 | span | 15 | 1 | 1 | 1 | 1 |
| 5 | span #3 | span (brand span) | 5 | 1 | 1 | 1 | 1 |
| 5 | span #4 | span (brand span) | 7 | 1 | 1 | 1 | 1 |
| 6 | h2 #1 | heading-medium | 8 | 1 | 1 | 1 | 1 |
| 6 | span #2 | span (brand span) | 13 | 1 | 1 | 1 | 1 |
| 6 | p #3 | heading-small | 31 | 1 | 1 | 2 | 1 |
| 6 | p #4 | text-medium | 285 | 4 | 6 | 8 | 7 |
| 6 | p #5 | text-medium | 66 | 1 | 2 | 2 | 2 |
| 7 | h2 #1 | heading-medium | 20 | 2 | 2 | 2 | 2 |
| 7 | span #2 | span (brand span) | 14 | 1 | 1 | 1 | 1 |
| 7 | p #3 | heading-small | 35 | 1 | 1 | 2 | 2 |
| 7 | p #4 | text-medium | 231 | 4 | 5 | 6 | 6 |
| 7 | p #5 | text-medium | 266 | 4 | 5 | 7 | 7 |
| 8 | h2 #1 | heading-medium | 9 | 1 | 1 | 2 | 1 |
| 8 | span #2 | span (brand span) | 19 | 1 | 1 | 2 | 1 |
| 8 | p #3 | heading-small | 25 | 1 | 1 | 1 | 1 |
| 8 | p #4 | text-medium | 265 | 4 | 5 | 7 | 6 |
| 8 | p #5 | text-medium | 206 | 3 | 4 | 6 | 5 |
| 9 | h2 #1 | heading-medium | 14 | 2 | 2 | 2 | 2 |
| 9 | span #2 | span (brand span) | 17 | 1 | 1 | 1 | 1 |
| 9 | p #3 | heading-small | 35 | 1 | 1 | 2 | 1 |
| 9 | p #4 | text-medium | 133 | 2 | 3 | 4 | 4 |
| 9 | p #5 | text-medium | 129 | 2 | 3 | 4 | 4 |
| 9 | p #6 | text-medium | 214 | 4 | 4 | 6 | 5 |
| 10 | h2 #1 | heading-medium | 13 | 1 | 2 | 2 | 2 |
| 10 | span #2 | span (brand span) | 20 | 1 | 1 | 1 | 1 |
| 10 | p #3 | heading-small | 34 | 1 | 1 | 2 | 2 |
| 10 | p #4 | text-medium | 86 | 2 | 2 | 2 | 2 |
| 10 | p #5 | text-medium | 186 | 3 | 4 | 5 | 5 |
| 10 | p #6 | text-medium | 206 | 3 | 4 | 6 | 5 |
| 11 | p #1 | heading-xsmall | 29 | 1 | 1 | 2 | 1 |
| 11 | p #2 | heading-xsmall | 31 | 1 | 1 | 2 | 1 |
| 11 | p #3 | heading-xsmall | 34 | 1 | 1 | 2 | 1 |
| 11 | p #4 | heading-xsmall | 33 | 1 | 1 | 2 | 1 |
| 11 | p #5 | heading-xsmall | 30 | 1 | 1 | 2 | 1 |
| 11 | p #6 | heading-xsmall | 28 | 1 | 1 | 2 | 1 |
| 12 | h2 #1 | heading-medium | 10 | 1 | 2 | 2 | 2 |
| 12 | span #2 | span (brand span) | 20 | 1 | 2 | 2 | 2 |
| 12 | p #3 | heading-small | 29 | 1 | 1 | 1 | 1 |
| 12 | p #4 | text-medium | 80 | 2 | 2 | 3 | 2 |
| 12 | p #5 | text-medium | 181 | 3 | 4 | 5 | 5 |
| 12 | p #6 | text-medium | 111 | 2 | 2 | 3 | 3 |
| 13 | h2 #1 | heading-medium | 9 | 1 | 1 | 1 | 1 |
| 13 | span #2 | span (brand span) | 10 | 1 | 1 | 1 | 1 |
| 13 | p #3 | heading-small | 30 | 1 | 1 | 2 | 1 |
| 13 | p #4 | text-medium | 270 | 4 | 6 | 8 | 7 |
| 13 | p #5 | text-medium | 78 | 2 | 2 | 3 | 2 |
| 14 | h2 #1 | heading-medium | 14 | 1 | 1 | 2 | 2 |
| 14 | span #2 | span (brand span) | 16 | 1 | 1 | 1 | 1 |
| 14 | p #3 | heading-small | 30 | 1 | 1 | 1 | 1 |
| 14 | p #4 | text-medium | 223 | 3 | 5 | 6 | 5 |
| 14 | p #5 | text-medium | 155 | 3 | 3 | 4 | 4 |
| 15 | h2 #1 | heading-medium | 19 | 2 | 2 | 2 | 2 |
| 15 | span #2 | span (brand span) | 19 | 1 | 1 | 1 | 1 |
| 15 | p #3 | heading-small | 36 | 1 | 1 | 2 | 2 |
| 15 | p #4 | text-medium | 67 | 1 | 2 | 2 | 2 |
| 15 | p #5 | text-medium | 198 | 3 | 4 | 5 | 5 |
| 16 | h2 #1 | heading-medium | 23 | 2 | 2 | 2 | 2 |
| 16 | span #2 | span (brand span) | 15 | 1 | 1 | 1 | 1 |
| 16 | p #3 | heading-small | 37 | 1 | 1 | 2 | 2 |
| 16 | p #4 | text-medium | 205 | 3 | 4 | 6 | 5 |
| 16 | p #5 | text-medium | 127 | 2 | 3 | 4 | 3 |
| 17 | h2 #1 | heading-large | 37 | 1 | 1 | 1 | 2 |
| 17 | p #2 | text-medium | 228 | 3 | 4 | 6 | 6 |
| 17 | p #3 | text-medium | 31 | 2 | 2 | 2 | 2 |
| 17 | p #4 | text-medium | 201 | 3 | 4 | 5 | 5 |
| 17 | p #5 | text-medium | 54 | 2 | 2 | 3 | 2 |
| 18 | h2 #1 | heading-large | 41 | 1 | 1 | 1 | 2 |

