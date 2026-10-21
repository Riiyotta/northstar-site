Source: https://superhuman.com/

# Clone spec: homepage (`/`)

Measured live with Playwright on 2026-10-21 at viewport widths 1440, 1024, 768 and 390. All px values come from `getComputedStyle` / `getBoundingClientRect`, and the CSS was read from the site's own stylesheets. Copy is **not** reproduced. Each text node lists its role, element, length, and a same-length placeholder for a fictional product, **"Northstar"** (sub-products: *Northstar Inbox*, *Northstar Agent*, *Northstar Pages*). Brand art, logos, screenshots and videos are listed as **sized placeholders** only. The companion file `asset-manifest.json` lists every placeholder slot.

> **Copy note.** Quoted copy strings in this spec are the independently written implementation in `src/data/content.js` (and `src/components/Banner.jsx`), not placeholders derived from the original; every length and line count is the measured original, not the length of the quoted string.

---

## 0. Global tokens

### 0.1 Breakpoints (min-width, from source CSS)
| name | query | used for |
|---|---|---|
| `sm` | `min-width: 640.02px` | 2-col layouts start, larger viewport padding, section padding 96 |
| `lg` | `min-width: 1080.02px` | desktop nav shown, desktop hero carousel, 6-col logo grid, footer title size |
| `xl` | `min-width: 1280.02px` | (minor) |
| `2xl` | `min-width: 1440.02px` | `--content-max-width` becomes 1440px (not verified: viewport tested max 1440) |

Tailwind: `screens: { sm: '640.02px', lg: '1080.02px', xl: '1280.02px', '2xl': '1440.02px' }`. **Note:** the site's "md" (640 to 1080) is a single tier. 1024 and 768 render the **same layout family**.

### 0.2 Container ("content-wrapper")
`width: min(100% - 2*vp, maxW); padding-inline: vp; margin-inline: auto; box-sizing: content-box;`
| viewport | `vp` (viewport padding) | content width measured |
|---|---|---|
| <640 (390) | 16px | 358 |
| 640–1080 (768 / 1024) | 24px | 720 / 976 |
| ≥1080 (1440) | 32px | 1280 (maxW = 1280 at 1440; wrapper box 1344 incl. padding, centered with 48px margins) |

### 0.3 Spacing scale (4px base, `--space-Nx` = N×4px)
0, 4, 6 (1.5x), 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 128, 160.
- Section padding-block: **96px** (≥640) / **40px** (<640).
- Within a "group" of sections, every section after the first has padding-top 0. Non-last grouped sections have padding-bottom = `vp` (32 / 24 / 16).
- Common gaps: grid gutter = `vp` (32 / 24 / 16). Title stacks gap 24. CTA group gap 16, margin-top 24.

### 0.4 Colors (exact hex from CSS vars)
Neutrals: `neutral-0 #fcfaf7`, `neutral-5 #f7f5f2`, `neutral-10 #f2f0eb`, `neutral-20 #dedbd5`, `neutral-30 #bfbcb6`, `neutral-40 #8d8a86`, `neutral-60 #73716d`, `neutral-80 #474543`, `neutral-90 #292827`, `neutral-95 #1f1e1d`, `neutral-100 #141413`, `white #ffffff`.
Purple: `purple-0 #f7f5ff`, `10 #e8e0ff`, `20 #d4c7ff`, `30 #bea1f5`, `40 #9e7be0`, `50 #8861ca`, `60 #714cb6`, `80 #533192`, `90 #3f256f`, `100 #281647`.
Green: `green-90 #0c4243` (plus 0 `#f4fdfa` … 100 `#17261f`).
Mulberry: `mulberry-100 #421d24`, `mulberry-black #241013`.

Semantic tokens. The site uses `light-dark()`: dark sections flip `color-scheme: dark`.
| token | light context | dark context |
|---|---|---|
| text-base | `#292827` | `#ffffff` |
| text-sub | `rgba(20,20,19,0.65)` | `rgba(255,255,255,0.80)` |
| text-soft | `#bfbcb6` | `rgba(255,255,255,0.65)` |
| border-sub | `rgba(115,113,109,0.20)` | `rgba(252,250,247,0.20)` |
| border-soft | `rgba(115,113,109,0.05)` | `rgba(252,250,247,0.08)` |
| transparent-hover | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.10)` |
| action-primary / hover / active | `#714cb6` / `#533192` / `#3f256f` | `#d4c7ff` / `#bea1f5` / `#9e7be0` |
| action-secondary / hover | `#292827` / `#141413` | `rgba(255,255,255,0.9)` / `#fff` |
| text-inverse (on primary btn) | `#ffffff` | `#292827` |
| focus ring | `2px solid #005fcc`, offset 2px | — |

Section/background colors used on the page:
| use | color |
|---|---|
| page / header / dropdown bg | `#ffffff` |
| default section bg ("tertiary") | `#f7f5f2` |
| banner + testimonial section | `#e8e0ff` |
| enterprise + final CTA section | `#281647` (dark) |
| footer | `#421d24` (dark) |
| tab cards | `#f2f0eb` |
| media "asides"/cards | `#0c4243`, `#421d24`, `#dedbd5`, `#e8e0ff`, `#714cb6`, `#281647` (see sections) |

### 0.5 Typography
**Font:** the site uses `"Super Sans VF"`, a proprietary variable font (wght 100–900). Only the upright sans is used on this page. Super Serif VF and Super Sans Mono VF are declared but stay `unloaded`.
**Substitute (Google Fonts, OFL): `Hanken Grotesk` variable, wght 100..900.** I measured both in-browser with the same 45-char string:
- At 49px/460: Super Sans 1019.7px wide, x-height 24.62, cap-height 34.30. Hanken Grotesk: 1027.6px (+0.8%), x 24.16, cap 34.15.
- At 18px/540: 376.7 vs 379.5 (+0.7%).
- Adjustment: add `letter-spacing: -0.0035em` on top of the token tracking to cancel the 0.8% width difference (optional). No size change needed.
- Alternate: `DM Sans` (vertical metrics match almost exactly: x 24.70 / cap 34.30). It is 3.9% wider, so add about `-0.02em` letter-spacing.
- Fallback stack: `"Hanken Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`.
- Weights used: **460** (regular), **540** (medium), **600** (semibold), **700** (bold). Use the variable font so 460/540 render exactly.

Body default: 16px / 1.2 (19.2px) / 460 / color `#292827`.

Type roles (fluid `clamp()` copied from source; computed values shown per width):
| role | formula | wt | line-height | letter-spacing | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|---|
| heading-large (h2) | `clamp(32px, 18.4px + 2.125vw, 49px)` | 460 | 1.2 | -0.0275em | 49 / 58.8 / -1.3475 | 40.16 / 48.19 / -1.104 | 34.72 / 41.66 / -0.955 | 32 / 38.4 / -0.88 |
| heading-medium (quote h2) | `clamp(28px, 19.2px + 1.375vw, 39px)` | 460 (bold spans 700) | 1.2 | -0.0275em | 39 / 46.8 / -1.0725 | — (computed by formula) | | 28 |
| heading-xsmall (card/aside titles) | `clamp(20px, 16px + 0.625vw, 25px)` | 460 (lead-in span 700) | 1.2 | -0.0275em | 25 / 30 / -0.6875 | 22.4 / 26.88 / -0.616 | 20.8 / 24.96 / -0.572 | 20 / 24 / -0.55 |
| text-large (eyebrow) | `clamp(18px, 16.4px + 0.25vw, 20px)` | 540 | 1.5 | -0.0075em | 20 / 30 / -0.15 | | | 18 |
| text-medium (lede, tabs) | 18px | 540 | 1.5 (27px) | -0.0075em (-0.135px) | same all widths |
| text-small (body small) | 16px | 540 | 1.5 (24px) | -0.0075em (-0.12px) | same |
| text-xsmall (labels) | 14px | 540 | 1.2 (16.8px) | normal | same |
| nav link | 16px | 460 | 24px | normal | same |
| button (large, 52px tall) | 16px | 600 | 16px | normal | same |
| button (compact, 36px tall) | 14px | 600 | 18px | normal | same |
| footer brand title (h3) | 28px ≥1080 / 18px below | 540 | 32px / 20px | -0.63px ≥1080 | max-width 23ch |
| footer column title (h3) | 18.72px | 700 | 28.08px | normal | |
| footer link | 16px | 460 | 24px | normal | color `rgba(255,255,255,0.8)` |
| banner text | 16px ≥640 / 14px <640 | 460 | 1.2 | normal | |

Text blocks have `max-width: min(90vw, 900px)`.

### 0.6 Radii
4, 6 (`1.5x`, hover chips), 8 (compact buttons, link-buttons), **12** (cards/asides/large buttons), 14 (sign-in menu rows), **16** (dropdown surfaces), 20, 24, 32, 999 (icon buttons).

### 0.7 Shadows (exact from CSS; base shadow color `#474543`, ring color `#dedbd5`)
- `elevation-xsmall` (tab cards): `0 0 0 1px rgb(71 69 67/4%), 0 4px 8px -2px rgb(71 69 67/6%), 0 2px 4px 0 rgb(71 69 67/4%), 0 1px 2px 0 rgb(71 69 67/4%), 0 0 0 1px rgb(222 219 213/20%)`
- `elevation-medium` (dropdowns): `0 0 0 1px rgb(71 69 67/4%), 0 1px 1px .5px rgb(71 69 67/4%), 0 3px 3px -1.5px rgb(71 69 67/2%), 0 6px 6px -3px rgb(71 69 67/4%), 0 12px 12px -6px rgb(71 69 67/4%), 0 24px 24px -12px rgb(71 69 67/4%), 0 48px 48px -24px rgb(71 69 67/4%), 0 0 0 1px rgb(222 219 213/20%)`
- Mobile dialog footer: `0 -4px 8px .5px rgb(71 69 67/16%)`

### 0.8 Motion tokens
- Durations: fast 100ms, **base 200ms**, slow 300ms, emphasis 400ms. Carousel crossfade 500ms. Carousel slide 10000ms.
- Easings: `ease-in-out` (buttons, menu items), `ease` (links, chevron), **`cubic-bezier(0.16,1,0.3,1)`** ("ease-out-expo", sign-in menu), **`cubic-bezier(0.25,1,0.5,1)`** (progress bar), `ease-out` (mobile drawer).
- `prefers-reduced-motion: reduce` hides the carousel progress bars, and the sign-in menu animations only run under `no-preference`.

### 0.9 Buttons
Shared: inline-flex, centered, gap 4px, padding-block 6px, `transition: background-color 200ms ease-in-out`, focus `outline 2px solid #005fcc` offset 2px. Icons inside are 20px (16px in compact).
| variant | size | padding-inline | radius | light context | dark context | hover |
|---|---|---|---|---|---|---|
| primaryFilled (large) | min-h 52px, 16/600 | 20px | 12px | bg `#714cb6`, text `#fff` | bg `#d4c7ff`, text `#292827` | bg → `#533192` (light) / `#bea1f5` (dark); active `#3f256f` / `#9e7be0` |
| primaryFilled compact (hero) | min-h 36px, 14/600 lh18 | 16px | 8px | — | bg `#d4c7ff`, text `#292827` | same as above |
| primaryLink ("Learn more →") | auto height (32px measured), 16/600 | 0 | 8px | text `#714cb6` | text `#d4c7ff` | text → hover color + `underline`, offset 2px. Trailing 20px arrow-right icon |
| primaryOutline (final CTA) | 52px | 20px | 12px | — | text `#d4c7ff`, `box-shadow: inset 0 0 0 1px currentColor` | inset ring → 2px, `transition: box-shadow 200ms ease-in-out` |
| secondaryOutline compact ("Sign in") | 36px, 14/600 | 16px | 8px | text `#292827`, inset 1px ring | — | inset 2px ring |
| secondaryGhost icon-only (hamburger) | 36×36 | 0 | 999px | transparent, icon `#292827` | — | bg `rgba(0,0,0,.05)` |
| unstyled text CTA ("Contact sales") | 36px min-h, 16/460 | 0 | 0 | `#292827` | — | underline, offset 2px |

---

## 1. Header (sticky)

- `<header>`: `position: sticky; top: 0; z-index: 201;` height **67px** (66 content + 1px bottom border `rgba(115,113,109,0.2)`), bg `#fff`. **There is no change on scroll.** I checked bg, shadow, height, border and backdrop-filter at scrollY 0/300/1940/2487 and they were identical. The announcement banner below scrolls away normally.
- Inner wrapper: flex row, `justify-content: space-between; align-items: center;` container padding as in 0.2.
- **Logo slot**: link 167×42 with an SVG wordmark **167×24**, color `#292827`. Use a placeholder (see manifest `logo-header`).
- **Primary nav** (≥1080 only), `margin-left: 32px`. It is a `ul` flex with gap 8px. Items are buttons/links min-h 42px, padding 0 8px, gap 4px, 16/460/24px, color `#292827`. Buttons carry a trailing 14×14 **chevron-down**, which rotates `-180deg` when open (`transition: rotate .3s ease`).
  - Labels (keep generic): `Products▾`, `Solutions▾`, `AI▾`, `Resources▾`, `Pricing▾`, `Blog` (the original is a 4-char plain link).
  - Item x positions at 1440 (left edges): 279, 386, 494, 552, 669, 761. Widths: 98.9, 100.5, 49.5, 109, 84.1, 50.2.
- **Right CTAs** (`gap: 16px`):
  - ≥640: "Contact sales" text link (unstyled CTA, 97.6px text, 36px tall).
  - "Sign in" secondaryOutline compact button (95px × 36, with a 16px chevron-down icon).
  - <1080: hamburger icon button 36×36, radius 999.
  - <640: only the hamburger is visible (Contact sales and Sign in move into the drawer).

### 1.1 Desktop dropdowns (click to open, `aria-expanded`)
- Surface: absolute, left-aligned with the trigger button's left edge, top = 54px (header inner 12 + 42). Bg `#fff`, radius **16px**, padding **24px**, shadow `elevation-medium`, z-index 100. **No open/close animation** (`animation: none`, it appears instantly). Only the chevron rotates.
- Single-column menus (Products 222×438, Resources 226×438, Pricing 220×264): `ul` flex-column gap 16px. Each link is min-h 42px, padding `0 24px 0 16px`, 16/460/24.
  - Item hover: bg `rgba(0,0,0,.05)`, radius 6px, `transition: background-color 200ms ease-in-out`, no underline.
  - Item counts and label lengths: Products 7 items (13, 6, 4, 8, 4, 9, 16 ch), Resources 7 (10, 16, 11, 12, 18, 5, 8), Pricing 4 (11, 4, 4, 16).
- Two-column menus (Solutions 500×420, AI 481×304): columns ~200px wide with a 32px gap. Each column has a group label (16/700/24, `#292827`, padding-inline 16), then 16px space, then a link list (same item style).
  - Solutions: 6 + 5 items (label lengths 13 / 9 ch).
  - AI: 4 + 3 items (label lengths 6 / 11 ch).
- Placeholder labels: generic nouns of the same length (implemented in `src/data/content.js` `navItems`, e.g. "Northstar app", "Agents", "Mail", "Calendar" …).

### 1.2 "Sign in" product menu
- Surface 308×240, anchored to the right edge of the button, top 59px. Bg `#fff`, radius 16, padding 20, `elevation-medium`, `transform-origin: top right`.
- **Open animation**: 300ms `cubic-bezier(0.16,1,0.3,1)` from `opacity:0; transform: translateY(-6px) scale(.95)`.
- 3 rows (links) in a flex-column with gap 16. Each row is 268×56, padding `4px 12px 4px 4px`, radius 14, gap 8, hover bg `rgba(0,0,0,.05)`.
  - **Row entrance stagger**: 300ms same easing from `opacity:0; translateY(5px)`, delays **50 / 100 / 150ms**.
  - Row content:
    - Icon tile 48×48, radius 12, gradient image background. Use a placeholder gradient purple `#714cb6`→`#281647` with a 20px white glyph (`#f7f5f2`).
    - Title 16/700/24 (2–4 ch; implemented: "Agent", "Inbox", "Pages", `signInProducts`).
    - Description 14/540/16.8, text-sub, 27–30 ch.

### 1.3 Mobile drawer (<1080)
- A native `<dialog>`, full viewport (100dvw × 100dvh), bg `#fff`.
- Open: `slide-in` from `translateX(100%)` 300ms ease-out, and the backdrop fades in 300ms ease-out. Close: reverse, 300ms ease-out.
- It repeats the header row at the top (close button "×" 36×36 in place of the hamburger).
- Body padding `24px 32px`. List `gap: 8px`. Each `li` has padding 8 and a bottom border 1px border-sub. The link/button inside is 42px tall, 16/460.
- Footer of the drawer: padding `24px 32px`, flex-column gap 12, top border border-sub, shadow `0 -4px 8px .5px rgb(71 69 67/16%)`. It holds "Contact sales" (36px, full width) and "Sign in" (52px, full width, outline).

---

## 2. Announcement banner

- Full-bleed `section`, bg **`#e8e0ff`**, height **56px** (min-height 56). Inner: flex row centered, gap 4px, padding 16px 0, wrap.
- Text `p` (16/460/19.2 ≥640, 14/16.8 <640), color `#292827`, 28 ch / 4 words. Implemented (`src/components/Banner.jsx`): **"Need the Northstar Inbox app?"**
- Link "Learn more" (10 ch), same type, plus a **16×12 arrow-right** icon. On hover the icon shifts `translate: 4px` (`transition: translate .3s ease-in-out`) and the link color goes to the hover color (.2s ease).

---

## 3. Hero carousel ("product switcher")

Three slides auto-rotate. Each slide has: product name + tagline (h2), two CTAs, and a tall product video on the right.

### 3.1 Desktop (≥1080) layout, 1440 measurements
- Outer `div` (full-bleed) background, split hard at 50%: `linear-gradient(to right, START 0, START 50%, END 50%, END)`.
- Inner grid (container 1280 + 32 padding, `overflow:hidden`, **height 650px**). `grid-template-columns: 1fr 1fr` (640/640). Rows `auto minmax(0,1fr)` (measured 225.6 / 400.4), row-gap 24. Areas `"copy asset" / "navigation asset"`. Its own background is `linear-gradient(to right, START, END)`.
- START is always **`#141413`**. END depends on the slide (see below). The colour **swaps instantly** with no transition.
- **Copy cell** (top-left): padding `40px 16px 0 0`, flex-column gap 24.
  - `h2` heading-large, color `#fff`, made of a product name line (13–15 ch) plus a `<span>` tagline in text-soft `rgba(255,255,255,.65)` (28–38 ch). The h2 box is 624×118 (2 lines).
  - CTA row gap 16: primaryFilled **compact** (dark: bg `#d4c7ff`, text `#292827`, 36px tall, radius 8, padding 0 16) + primaryLink compact (text `#d4c7ff`, 14/600, with a 16px arrow icon).
- **Navigation cell** (bottom-left, `align-self:end`, z 1):
  - Heading row: right-aligned flex. Label `p` text-xsmall 14/540, `rgba(255,255,255,.8)`, 31 ch, margin-bottom 24.
  - 3 control buttons (640×57 each). Grid `24px minmax(3rem,auto) 1fr auto`, gap 12, padding `16px 32px`, top border 1px `rgba(252,250,247,0.08)`.
    - Columns: 24×24 product icon (opacity .5 → 1 when active), title (14/540, 2–4 ch, opacity .5 → 1), description (14/540, padding-left 24, 39–48 ch).
    - Active/hover row bg: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.06) 10%, rgba(255,255,255,.06) 100%)`.
  - **Progress bar** on the active row: absolute at top −2px, full width, 2px tall, overflow hidden. Fill color `rgba(252,250,247,0.2)`, `transform: scaleX(0→1)`, origin left, **10000ms `cubic-bezier(0.25,1,0.5,1)`**, fill-mode both.
- **Asset cell** (right, spans both rows): stacked slide assets, top-aligned. The video renders **640×800.9** (natural 1368×1712, ratio 0.799) and is **cropped by the 650px container** (bottom 151px hidden). Radius 0.

### 3.2 Slides (order, END color, placeholder copy)
| # | END color | nav title | nav description (len) | h2 name / tagline (len) | CTAs | video |
|---|---|---|---|---|---|---|
| 1 | `#281647` (purple-100) | "Inbox" (4) | 39 ch: "Triage a full morning of mail in minutes" | "Northstar Inbox" (15) / "Mail that sorts itself first" (28) | "Get Inbox" / "Learn more" | `hero-video-1` |
| 2 | `#0c4243` (green-90) | "Agent" (original is 2 ch) | 40 ch: "A second pair of hands in each open tab." | "Northstar Agent" (13–15) / "Help that follows your cursor" (38) | "Try Agent" / "Learn more" | `hero-video-2` |
| 3 | `#421d24` (mulberry-100) | "Pages" (4) | 48 ch: "Docs that people and AI co-author" | "Northstar Pages" (15) / "From rough notes to a signed-off plan" (35) | "Try Pages" / "Learn more" | `hero-video-3` |

Hero nav heading label (31 ch): "Pick a tool. Keep your focus."

### 3.3 Motion: carousel
- Autoplay timeline, measured from load: slide 1 → 2 at about 7.5s after my sampling began (≈10s after mount). Then 2 → 3 at +10.04s and 3 → 1 at +10.04s. So **10s per slide**, and it **loops**.
- Change: the copy and the asset of the outgoing slide both run `dissolve-out` (opacity 1→0) and the incoming ones `dissolve-in` (0→1), each **500ms `ease`**. All layers sit stacked in the same grid cell, so this is a cross-fade. The background END color swaps instantly.
- Video: `autoplay muted playsinline preload="metadata"`, **no loop**, duration 7.03s. It plays from 0 when its slide becomes active and holds its last frame until the slide changes. Inactive videos are paused at 0.
- Clicking a nav row jumps to that slide. After manual clicks no auto-advance was seen for 15s+, so **user interaction stops autoplay**.
- Hover on a nav row applies the active gradient and full-opacity text.
- Reduced motion: progress bars are `display:none`.

### 3.4 Tablet / mobile carousel (<1080)
A different "mobile layout". The page background is a **vertical** `linear-gradient(START, END)` on the slide (<640). At ≥640 it is horizontal and uses the same 50% split.
- **640–1080 (1024 / 768)**: grid `1fr 1fr`. Rows `1fr max-content`. Areas `"copy asset" / "navigation asset"`. Gap 0.
  - Copy: padding 0 24, margin `40px 0 56px`, gap 32. h2 heading-large (40.16 at 1024; 34.72 at 768), compact CTAs.
  - Asset: video fills the right column (512×640.7 at 1024; 384×480.6 at 768), so the carousel height equals the video height (640.7 / 480.6).
  - Nav: one row (height 74.6) showing **only the current slide**: 16px icon + title (14/540 white) + description (14/540 `rgba(255,255,255,.8)`) + a 32×32 round "next" button on the right (transparent, 1px border `rgba(255,255,255,.65)`, 14px chevron-right, white). Padding `20px 16px`, gap 12, top border 1px border-sub. Bg `rgba(255,255,255,.1)` over a `::before` filled with the END color. A 2px progress bar sits at its top edge (same 10s animation).
- **<640 (390)**: single column. Rows: copy (196.8), asset (448), nav (74.6), gap 24.
  - Copy: padding 0 16, margin `36px 0 16px`, h2 32/38.4.
  - Asset: padding 0 16 → video 358×448.
  - **Nav row is `position: sticky; bottom: 0`** within the carousel.
  - Total carousel height 767.4.

---

## 4. Customer logo strip

- Section bg `#f7f5f2`, padding 96 (40 mobile). Column centered.
- Intro `p` text-small (16/540/24, text-sub `rgba(20,20,19,.65)`), centered, 57 ch / 9 words. Implemented (`logoIntro`): "From small startups to global firms, teams run on Northstar"
- **Logo grid** (`asset-grid`): margin-top 40 (≥1080) / 36 (below).
  - Container top + left border 1px border-sub. Each cell has right + bottom border 1px border-sub, so you get a hairline table look.
  - ≥1080: **6 columns** × 1 row. Container 1280×82, cells 213.2×81.
  - <1080: **3 columns × 2 rows**. Cells 231×81 (1024 and 768; container 694 wide, centered). At 390 cells are 119×81, container 358.
  - Each cell holds one logo image, object-fit contain, height 80, width up to the cell (natural aspect ratios 229:80, 213:80, 228:80, 230:80, 213:80, 213:80).
  - **Placeholders `logo-1`…`logo-6`**: grey wordmark-shaped blocks (`#292827` at 40% opacity), max 120×28, centered in each cell.
- Motion: each logo `fade-in` **500ms ease-in-out** on mount. No cycling or marquee: the logos were unchanged over 30s, both in view and out of view.

---

## 5. Group A — "Agent" product (bg `#f7f5f2` throughout)

### 5.1 Intro (title-description block, centered)
Padding 96 top/bottom (40 mobile). Flex-column, center, gap 24.
1. Product lockup image **195×25** (placeholder `lockup-agent`).
2. `h2` heading-large, `#292827`, 41 ch / 8 words, 1 line at 1440 (872px wide), 2 lines at 768/390. Implemented (`agent.intro.title`): "A helper in the margin of everything you do".
3. `p` text-medium 18/540/27, text-sub, 113 ch / 20 words, max-width 900. Implemented (`agent.intro.body`): "No new app to learn. Northstar Agent sits quietly inside your existing tools and steps in when it can help."
4. CTA group (margin-top 24, gap 16, centered): primaryFilled large "Try Agent" (light: `#714cb6` bg, 52px) + primaryLink "Learn more →" (`#714cb6`).

### 5.2 Wide media aside
Padding-top 0, bottom = vp.
- `aside` full container width (1280×329.1 at 1440), radius **12**, overflow clip, bg **`#0c4243`** (dark text context). Flex row, `align-items: end`.
- Body (left): width = remainder (512 at 1440), padding 32, flex-column gap 12.
  - Label `p` text-xsmall 14/540, `rgba(255,255,255,.8)`, 18 ch. Implemented (`agent.wide.label`): "Live margin notes"
  - `p` heading-xsmall 25/30, `#fff`, 102 ch / 13 words. Implemented (`agent.wide.body`): "Northstar leaves small notes in the margin when a claim looks shaky, a date clashes, or a tone runs hot."
- Media (right): max-width **60cqi** (≥1080) / **50cqi** (<1080). Image `cover`.
  - 1440: 768×329.1 (ratio 1440:617).
  - 1024: 488×325.8. 768: 360×240.3.
  - **<640**: the aside stacks: body on top, media below it full-width 358×239 (3:2 art).
  - Placeholder `media-agent-wide`, dominant bg `#0c4243`.

### 5.3 Two asides side-by-side
Two-column flex. Gap 32 (1440) / 24 (tablet) / 16 (mobile). At **<1080 they stack** into one column ("mediumSingleColumn").
- Left aside: bg **`#421d24`** (dark). Body 312 wide. Label (18 ch) + heading-xsmall white (56 ch / 11 words). Media 312×260 (1080:901) at 1440. Placeholder `media-agent-chat`.
- Right aside: bg **`#dedbd5`** (light). Label text-sub (6 ch) + heading-xsmall `#292827` (60 ch / 11 words). Media 312×260. Placeholder `media-agent-app`.
- Each aside is 624×260 at 1440, 976×325.8 at 1024, 720×240.3 at 768, 358×379.8 at 390 (stacked body + 358×239 media).
- Implemented copy (`agent.pair`): label "Ask-anywhere" / "Helper deck". Body "Highlight anything, ask a question, get the answer in place." (orig 56) / "Hand off a batch of jobs and watch them finish at once." (orig 60).

### 5.4 Tabbed feature cards
Padding-bottom 96 (40 mobile).
- **Tablist**: flex row, full width, height 60, bottom border 1px border-sub. `overflow-x:auto`, scrollbar hidden, edge fade via `mask-image` (fade width 32px).
  - 5 tab buttons, each `flex: 1 0 auto`, padding 16, gap 4. Content: 20px icon + label text-medium 18/540/27.
  - Inactive color text-sub. Active color `#292827` plus a `::after` 2px bar `#292827` at the bottom spanning the tab.
  - Hover (inactive): bg `rgba(0,0,0,.05)`, radius `6px 6px 0 0`, 200ms ease-in-out.
  - Labels (8, 17, 14, 20, 12 ch): "Featured", "Before the meeting", "Drafting desk", "Email on autopilot", "Helper studio" (implemented, `featureTabs`).
  - At 1440 the tab widths are 208/278/249/309/236. At 768/390 the tabs overflow and scroll horizontally.
- **Panels**: padding-top 64. All panels are stacked in one grid cell. Inactive panels are `visibility:hidden; opacity:0`. **Switching is instant** (no transition). No auto-rotation (unchanged for 14s).
- Panel content: 3 cards in a grid. **3 columns** at ≥640 (1440: 405.3 each, gap 32. 1024: 309.3, gap 24. 768: 224, gap 24). **1 column** at <640 (gap 16).
- **Card**: padding 32, radius **12**, bg `#f2f0eb`, shadow `elevation-xsmall`, flex-column gap 16.
  - Background: an absolutely positioned tonal SVG (placeholder: soft radial gradient `#f2f0eb`→`#e8e0ff`, radius 12, overflow hidden).
  - Media: **70×70** gradient icon tile (placeholder `tab-icon-*`, rounded square with a purple/green/orange gradient).
  - Content (gap 8): `h3` heading-xsmall with a **bold lead-in span (700)** plus a regular remainder (14–34 ch total), then `p` text-small text-sub (76–100 ch).
  - Card height 290 at 1440 (334.6 at 1024, 377.8 at 768, about 278 at 390).
- Content of the 5 panels × 3 cards: implemented in `featureTabs`, for example h3 "**Tune the suggestions** to your taste" / p "Dismiss a suggestion once and Northstar remembers, so the next round of notes is quieter." Panel 5 cards have only a bold h3 (16–24 ch) and no regular remainder.

---

## 6. Testimonial
- Section bg **`#e8e0ff`**, padding 96 (40). Centered column, max-width 900 (text block 900 at 1440, 691 at 768).
- `h2` heading-medium 39/46.8, `#292827`, 112 ch / 23 words, wrapped in curly quotes, with a **bold (700) mid-sentence span** of 22 ch. 3 lines at 1440. Implemented (`testimonial`): "“Mornings were lost to email. Now I can **start real work by nine**. The triage is done before I even sit down with my first coffee.”"
- Attribution `p` text-medium 18/540/27: name span `#292827` (14 ch, implemented "Tomás Lindgren"), then the role span text-sub (59 ch, implemented "Head of Operations, Field Services, Coastal Freight Group"). The two spans wrap onto 2 lines centered (name, then role).
- primaryLink "View all customer stories →" (25 ch), `#714cb6`, margin-top 24.

---

## 7. "Inbox" product section (bento)
Bg `#f7f5f2`, padding 96.
- Intro block (same as 5.1), plus padding-bottom 80:
  - Lockup **208×25** (`lockup-inbox`).
  - h2 heading-large: "Get your mornings back" (24 ch, `#292827`) + `<span>` text-sub "from mail and meetings" (23 ch). 2 lines centered at 1440.
  - p text-medium (98 ch).
  - CTAs "Get Inbox" + "Learn more →".
- **Bento**: two-column flex, gap 32. Left column 728, right column 520 at 1440. Stacks at <1080.
  - **Card A** (left, 728×658.9): bg **`#714cb6`** (dark text), padding 32, radius 12, overflow clip.
    - Bleed media on top (`margin: -32px -32px 0`) **728×486** (1080:721). Placeholder `media-inbox-drafts`.
    - Content pinned to the bottom (margin-top auto, 40px measured, gap 8): label text-xsmall `rgba(255,255,255,.8)` (11 ch, implemented "Ghostwriter") + `h3` heading-xsmall white (102 ch).
  - **Card B** (right top, 520×230.1): bg **`#281647`**. "Sized to background": a full-card background image 520×230 (1080:478) with the content stacked over it at the bottom (padding 32, label 18 ch + h3 79 ch white). Placeholder `media-inbox-availability`.
  - **Card C** (right bottom, 520×396.8): bg **`#dedbd5`** (light). Bleed media top 520×234 (1080:486), then the content: label text-sub (11 ch) + h3 heading-xsmall `#292827` (111 ch, 3 lines). Placeholder `media-inbox-split`.
  - Right column gap 32 between B and C.
  - 1024: A 976×778 (media 976×651.6), B 976×432.7, C 976×439 media.
  - 768: A 720×603 (media 720×480.7), B 720×319.2.
  - 390: A 358×408 (media 358×239.2), B 358×239.2.

---

## 8. Group B — "Pages" product (bg `#f7f5f2`)
Same building blocks as section 5:
- **Intro**: lockup **211×25** (`lockup-pages`). h2 "Decide together" (15 ch, `#292827`) + span text-sub "in docs that draft alongside you" (31 ch). p text-medium 176 ch (2 lines at 1440). CTAs "Try Pages" + "Learn more →".
- **Wide aside**: bg **`#dedbd5`** (light). Label text-sub (4 ch; implemented "Pages"). Body heading-xsmall `#292827` 124 ch / 24 words. Media 768×334.9 (1440:628). Placeholder `media-pages-wide`.
- **Two asides** (they stay **side-by-side** down to 640: "smallSingleColumn", 476 each at 1024, 348 each at 768, stacked at 390):
  - Left bg **`#e8e0ff`** (light): label 7 ch, body 59 ch (4 lines). Media 312×219 at 1440 (1080:758). At 1024/768 the media sits **below** the text (476×317.8 / 348×232.3).
  - Right bg **`#421d24`** (dark): label 8 ch, body white 77 ch. Media 312×263.2 (1080:911).
  - Placeholders `media-pages-ai`, `media-pages-connect`.
  - Last section of the group: padding-bottom 96.

---

## 9. Enterprise
- Section bg **`#281647`** (dark), padding 96 (40).
- Two-column flex: gap **128** (1440) / **64** (1024, 768) / column gap 32 (390).
- Left column 480 (1440) / 380 (1024) / 273 (768), justify center. Contents:
  - Eyebrow `p` text-large 20/30 `rgba(255,255,255,.8)` (25 ch; implemented "Northstar at company scale").
  - h2 heading-large white 41 ch / 6 words (2 lines). Implemented: "Easy for every user, sound for every audit".
  - p text-medium `rgba(255,255,255,.8)` 112 ch.
  - CTAs: primaryFilled large **dark** (bg `#d4c7ff`, text `#292827`) "Request a demo" (14 ch, 156px wide) + primaryLink `#d4c7ff` "Learn more →". At 768 the CTAs wrap to 2 rows.
- Right column (`align-items: flex-end`): image **672×378.3** (16:9, 1080:608), radius 0, `cover`. 532×299.5 at 1024, 382.7×215.4 at 768, 358×238.7 at 390 (below the text). Placeholder `media-enterprise`, dominant bg `#141413`.

## 10. Final CTA band
- Section bg `#281647`, `position:relative`, height 250.8 (1440) / 288.4 (1024) / 275.3 (768) / 224.8 (390). Padding 96 (40).
- Absolutely positioned **animated GIF background** filling the section (`cover`; natural 850×567). Placeholder `bg-cta`: use a static CSS gradient `linear-gradient(120deg,#281647 0%,#533192 50%,#281647 100%)`. An optional slow `background-position` animation can stand in for the GIF.
- Two-column row: left h2 heading-large white (29 ch, 1 line at 1440; implemented "Clear the decks. Do the work."). Right column: `align-items:flex-end`, primaryOutline (dark) "Get started" (11 ch) 121.8×52, inset 1px `#d4c7ff`.
- At 390: stacked, the button is full width 358×52.

---

## 11. Footer
- Bg **`#421d24`** (dark context), text white.
- Container grid. Padding `64px vp 48px` (≥640) / `36px 16px 16px` (<640).
  - Columns: `auto 1fr` with gap 32 (≥640). 1 column with gap 16 (<640).
- **Brand column** (450 wide at 1440, 235 at 1024/768). Flex-column gap 24.
  - SVG wordmark **167×24** white (`logo-footer`).
  - `h3` brand title 28/32/540, ls -0.63px, max 23ch, white (36 ch / 5 words, 2 lines). Implemented: "Building calmer tools for busy teams". At <1080 it is 18/20. At <640 margin-bottom 48.
- **Link columns nav**: grid gap 40. Columns: 4 at ≥1080 (169.5 each), 2 at 640–1080, 1 at <640.
  - Column title `h3` 18.72/28.08/700 white, margin-bottom 20.
  - List flex-column gap 16. Links 16/460/24, `rgba(255,255,255,0.8)`, padding 0, min-h auto. Hover: color → `#fff` (.2s ease).
  - Columns: "Products" (7 links), "Company" (15 links), "Legal" (6 items; two of them wrap to 48px. The last is a button "Cookie preferences" with a 40px-wide privacy-choices icon, gap 5), "Connect" (6 social links, each with a **20×20 leading icon** + margin-right 4: LinkedIn, X, TikTok, Instagram, Threads, Facebook). Use generic social icons from an open set (e.g. Simple Icons / Lucide) or neutral circles.
  - Footer link labels are generic nav nouns; use placeholders of similar length.
- **Giant wordmark**: spans all columns (`grid-column: 1/-1`). SVG **1280×123** (aspect 10.4:1) at 1440, color `rgba(255,255,255,0.05)` (a watermark). Placeholder `wordmark-footer`: render "NORTHSTAR" in the substitute font at 5% white with the same box size.
- Footer total height: 859 (1440), 1142 (1024), 1141 (768), 1823 (390).

---

## 12. Page section order and heights (document y / height)
| # | section | bg | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|
| 0 | Header (sticky) | #fff | 0 / 67 | 67 | 67 | 67 |
| 1 | Banner | #e8e0ff | 67 / 56 | 56 | 56 | 56 |
| 2 | Hero carousel | split gradient | 123 / 650 | 640.7 | 480.6 | 767.4 |
| 3 | Logo strip | #f7f5f2 | 773 / 338 | 415 | 415 | 327 |
| 4a | Agent intro | #f7f5f2 | 1111 / 451 | 440 | 461 | 411 |
| 4b | Agent wide aside | #f7f5f2 | 1562 / 361 | 350 | 264 | 444 |
| 4c | Agent two asides | #f7f5f2 | 1923 / 292 | 700 | 529 | 792 |
| 4d | Tabbed cards | #f7f5f2 | 2215 / 510 | 555 | 598 | 1030 |
| 5 | Testimonial | #e8e0ff | 2725 / 466 | 446 | 433 | 409 |
| 6 | Inbox bento | #f7f5f2 | 3191 / 1249 | 2345 | 2000 | 1598 |
| 7a | Pages intro | #f7f5f2 | 4440 / 537 | 467 | 529 | 503 |
| 7b | Pages wide aside | #f7f5f2 | 4976 / 367 | 350 | 264 | 444 |
| 7c | Pages two asides | #f7f5f2 | 5343 / 359 | 560 | 496 | 840 |
| 8 | Enterprise | #281647 | 5702 / 570 | 546 | 648 | 684 |
| 9 | Final CTA | #281647 + bg | 6273 / 251 | 288 | 275 | 225 |
| 10 | Footer | #421d24 | 6524 / 859 | 1142 | 1141 | 1823 |
| | **document height** | | **7383** | **9367** | **8657** | **10418** |

---

## 13. Motion summary
1. **Hero carousel**: 10s autoplay per slide, looping. 2px progress bar `scaleX` 0→1 over 10s `cubic-bezier(.25,1,.5,1)`. 500ms `ease` opacity cross-fade of copy and asset. Instant background colour swap. Muted inline video (7s, no loop) restarts on activation. Manual selection stops autoplay. Reduced motion hides the progress bars.
2. **Logo grid**: one-time 500ms ease-in-out fade-in per logo. No rotation.
3. **Sign-in menu**: 300ms ease-out-expo reveal (`translateY(-6px) scale(.95)` → none), rows staggered 50/100/150ms (`translateY(5px)` → 0).
4. **Nav dropdowns**: no surface animation. Chevron rotate 0 → −180deg, .3s ease.
5. **Mobile drawer**: slide in/out from the right, 300ms ease-out. Backdrop fade 300ms.
6. **Hover micro-interactions**: buttons bg 200ms ease-in-out. Outline buttons inset ring 1→2px (200ms). Links color .2s ease plus underline (offset 2–3px, thickness 1px). Banner arrow `translate: 4px` .3s ease-in-out. Menu/tab hover bg `rgba(0,0,0,.05)` 200ms.
7. **Tabs**: instant panel swap, no transition, no autoplay.
8. **None observed**: no scroll-triggered reveals (no element starts at opacity 0 or offset waiting for intersection), no parallax, no marquee, no header change on scroll. The CSS bundle contains a `page_header-fade-in` scroll-timeline animation and a `text-components_fade-up` keyframe (`translateY(16px)`→0), but neither is applied to any element on this homepage.

---

## 14. Not measured / caveats
- **Viewport >1440**: not tested. The source CSS switches `--content-max-width` to 1440px above 1440.02px, so the container probably grows to 1440 content width there.
- **Dark-context hover colors** are taken from the CSS `light-dark()` tokens, not from live hover. I only hovered in light contexts programmatically. Primary dark hover = `#bea1f5`.
- **Exact first-slide delay**: sampling started about 2.5s after load. The first switch at 7.5s is consistent with a 10s duration from mount, but the mount time was not captured precisely.
- **Tab icons (20px)** and **product icons in the hero nav (24px)** are brand-drawn SVG symbols. I describe their size only; use generic open icons (sparkle, calendar, pencil, mail, bot).
- **GIF / video content**: not inspected frame by frame. Only sizes, durations and play behavior were recorded.
- **Testimonial heading at 1024/768**: the computed size follows the clamp formula, but I did not record each value individually.
- **Enterprise image radius**: measured 0 on img/picture. Any rounding visible in the original is baked into the artwork.
- The site loads analytics/consent scripts (GTM, FullStory, Transcend). They have no visual effect and should not be cloned.
