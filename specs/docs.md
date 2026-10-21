Source: https://superhuman.com/docs

# Clone spec: `/docs` → Northstar Pages page

Measured live on 2026-10-21 with a local Playwright Chromium (desktop Chrome 130 UA, `reducedMotion: 'no-preference'`) at viewport widths **1440, 1024, 768 and 390**. All px values come from `getComputedStyle` / `getBoundingClientRect` or the site's CSS. Global tokens, header, footer, buttons and the 640/1080 breakpoint model are in `../CLONE_SPEC.md`. The tokens added for product pages (`display-sm`, `heading-sm`, the caret link icon, the product-page header CTAs, and the 96/40 grouped-section padding) are defined in `mail.md` §0 and are **shared with this page**.

Copy is not reproduced. Every text node has an id in the **copy deck** (§15), with its role, original length and independently written Northstar copy (±10% length). Media slot sizes, aspect ratios, colours and descriptions are in `docs.assets.json`.

Brand mapping: Superhuman Docs → **Northstar Pages**, Docs AI → **Pages AI**, Go → **Northstar Assistant**, the Grammarly suite item → **Northstar Agents**, Mail → **Northstar Inbox**.

---

## 0. Deltas vs the homepage
- **Header**: same product-page variant as `/mail` (`mail.md` §0.1). There is no banner and `<main>` starts at y=67. Right CTAs are "Contact sales" + "Log in" + a primary filled compact button labelled `hero.cta1` (17 ch; the button measures **128.3×36**). The drawer footer has the same 3 rows.
- **Footer**: identical (859.2 at 1440, 1822.8 at 390). Reuse it.
- **New button usage: light-context `primaryOutline`.** Text and inset 1px ring `#714cb6`, transparent bg, 52px tall, radius 12, padding `6px 20px`. Hover: ring 2px and colour `#533192`, `box-shadow 200ms ease-in-out`. This was measured. The existing `primaryOutline` variant already maps to `--action`, so it works in a `.ctx-light` section unchanged.
- Section padding: 96/96 (40/40 under 640). Inside a group, the later sections are `0 / 96` (`mail.md` §0.4).
- Logo strip here is **static** (6 logos, no rotation) and sits inside the video section.

---

## 1. Section order and geometry
Document y / height in px.

| # | id | section | bg | group | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|---|
| D1 | hero | Centered hero + bg art | `#f2f0eb` + art | A | 67 / 526.2 | 67 / 497.6 | 67 / 480 | 67 / 425.8 |
| D2 | video | Demo video + proof + logos | `#ffffff` + pastel art | A | 593.2 / 1007 | 564.6 / 913 | 547 / 769 | 492.8 / 536.4 |
| D3 | ai | AI split row (dark) | `#421d24` | B | 1600.2 / 625.2 | 1477.6 / 525.7 | 1316 / 434.6 | 1029.2 / 529.5 |
| D4 | aicards | 3 icon cards (dark) | `#421d24` | B | 2225.4 / 373.4 | 2003.3 / 391.7 | 1750.6 / 443.4 | 1558.6 / 880.8 |
| D5 | band | Heading + single CTA | `#f2f0eb` | – | 2598.8 / 441.6 | 2394.9 / 372.2 | 2194 / 407.3 | 2439.4 / 327.2 |
| D6 | surface | 2×2 media cards | `#ffffff` | – | 3040.3 / 1636.2 | 2767.1 / 1465.5 | 2601.3 / 1363.9 | 2766.6 / 2281.3 |
| D7 | hubs | 4 icon cards (dark) | `#281647` | – | 4676.5 / 709.8 | 4232.6 / 663 | 3965.3 / 693.8 | 5047.9 / 1406 |
| D8 | quote | Logo + big quote | `#e8e0ff` | – | 5386.3 / 660.2 | 4895.6 / 569.6 | 4659.1 / 550 | 6453.9 / 581.7 |
| D9 | stack | Centered intro | `#f7f5f2` | C | 6046.5 / 328.8 | 5465.2 / 318.2 | 5209 / 311.7 | 7035.6 / 288.8 |
| D10 | integrations | Split row | `#f7f5f2` | C | 6375.3 / 587.5 | 5783.4 / 474.3 | 5520.7 / 370.9 | 7324.4 / 605.1 |
| D11 | connector | Split row + link | `#f7f5f2` | C | 6962.7 / 571.4 | 6257.7 / 462.2 | 5891.6 / 421.3 | 7929.5 / 663 |
| D12 | suite | 2×2 icon cards | `#ffffff` | – | 7534.2 / 914.5 | 6719.8 / 943.5 | 6312.9 / 953.2 | 8592.5 / 1443.2 |
| D13 | cta | Closing CTA (dark) | `#421d24` | – | 8448.7 / 401.8 | 7663.3 / 391.2 | 7266.1 / 384.7 | 10035.7 / 296.4 |
| – | footer | shared Footer | `#421d24` | – | 8850.8 / 859.2 | | | 10331.2 / 1822.8 |
| | | **document height** | | | **9710** | **9197** | **8792** | **12155** |

D13 and the footer are the same `#421d24` with no border between them, so they read as one block.

**Component map**
| section | reuse / new |
|---|---|
| D1 | **Reuse the `Intro` pattern.** Extend it with: `titleAs="h1"` using `display-sm`; lockup on top (`Lockup` id `lockup-pages`, **217** wide; the homepage was 211); a two-button CTA group where the second button is `primaryOutline`; plus a full-bleed `MediaSlot` background (`docs-hero-bg`). Wrap it in a new thin `HeroSection` with a bg art prop. |
| D2 | **New `VideoShowcase`**: the same video + pause-control block as `/mail` M1 (extract it as `DemoVideo` and share it), with a 0px radius here. Below it, **reuse `LogoStrip`** with `rotate={false}`, transparent cells, intro `text-medium`, and no section of its own. |
| D3, D10, D11 | **`SplitFeature`** (new, shared with `/mail`) with `gap="M"` (64/40/24) and `heading="lg"`. Media is always on the right; on mobile text comes first. |
| D4, D7, D12 | **`CardGrid`** (new, shared) variant `icon`: 74px icon tile, `heading-sm` title, `text-medium` body, optional caret link. D4 has 3 columns, D7 has 4, D12 has 2. |
| D5 | `Intro` pattern: centered h2 + one CTA, title block `padding-bottom: 80`. |
| D6 | `CardGrid` variant `media` (2 columns, 3:2 image, title, body, caret link). |
| D8 | **Reuse `Testimonial`** with props: `logo` slot on top, heading size `heading-lg` (the homepage uses `heading-md` + a bold span; here there is no bold span), and an extra 24px before the link. |
| D9 | `Intro` pattern (h2 + p only). |
| D13 | **`CtaBand`** (new, shared with `/mail` M11) plus a paragraph. |

---

## 2. D1 Hero (`#f2f0eb`, dark text)
- Section `position:relative`, padding `96 vp 96` (40/16 at 390).
- **Background art** `docs-hero-bg`: absolutely positioned `inset:0`, `img` 100%×100%, **`object-fit: cover`**, centered (natural 2560×639).
  - At 1440 the art scales to about 2107×526 with the sides cropped. The scattered UI chips stay visible left and right of the copy.
  - At 390 only the empty centre strip shows.
  - The art's own bg is `#f2f0eb`.
- Title block: centered column, gap 24, width `min(90vw, 900px)` (900 / 900 / 691.2 / 351).
  1. Lockup `lockup-pages` 217×25.
  2. `h1` **display-sm** `#292827`: `hero.h1` (47 ch). 2 lines at 1440, 1024 and 768 (134.2 / 105.6 / 88). 3 lines at 390 (118.8).
  3. `p` text-medium text-sub: `hero.p` (72 ch). 1 line, 595.5 wide at ≥768; 2 lines at 390.
  4. CTA group: `margin-top: 24` (48 below the p), row, gap 16, centered. It stays a row at 390 (296.9 wide).
     - primaryFilled light, 158.1×52, `hero.cta1`.
     - **primaryOutline light**, 122.9×52, `hero.cta2`.
- Rhythm at 1440: lockup 163, h1 212, p 370.2, buttons 445.2–497.2, section end 593.2.

## 3. D2 Video + proof + logos (`#ffffff`, same group as D1)
- Section `position:relative`. Padding `0 vp 96` (40 at 390).
- **Background art** `docs-video-bg`: absolutely positioned and covering the **whole section**, including behind the logos. `object-fit: cover`, natural 1440×616. It is a soft pastel blur: off-white at the top fading to pink/lilac/peach toward the bottom. It can be drawn with layered CSS radial gradients; it has no objects.
- Column centered (no gap between children):
  1. **Video** `docs-hero-video`: `width:100%` of the content box, max 1280. Aspect **16:9**, **radius 0**, `object-fit: contain`.
     - Sizes: 1280×720 (1440), 976×549 (1024), 720×405 (768), 358×201.4 (390).
     - Attributes: `autoplay muted playsinline`, preload metadata, no poster. Sources are an mp4 (hvc1) and a webm; the webm played (28.29s).
  2. Controls row: `margin-top: 10`, a 32×32 pause/play icon button, left-aligned (x = video left). Identical to `/mail`.
  3. `p` text-medium text-sub, centered: `proof.p` (45 ch). 1 line at ≥768 (385.3 wide); 2 lines at 390.
  4. **Logo grid** (hairline table as homepage §4), `margin-top: 40` (≥1080) / `36` (<1080). Cells have a transparent bg so the pastel art shows through.
     - ≥1080: 6 × 213.2×81.
     - <1080: 3×2, shrink-wrapped to **643** wide (214px cells) at 1024 and 768. 358 wide (119px cells) at 390.
     - Logos are `object-fit: contain`, 213×80 natural (`docs-logo-1…6`), dark marks.
     - **No rotation**: unchanged for 12s+. They run the one-time mount `fadeIn` 500ms ease-in-out.

## 4. D3 AI split row (`#421d24`, dark context)
- Padding 96/96 (40/40). `SplitFeature`, gapM: **64 (≥1280) / 40 (640–1280) / 24 (<640)**. Row at ≥640.
- Columns: 608 (1440), 468 (1024), 340 (768). Stacked 358 at 390.
- **Text (left)**, vertically centered, gap 24:
  - `h2` heading-lg white: `ai.h2` (26 ch). 1 line at 1440 and 1024; 2 lines at 768.
  - `p` text-medium `rgba(255,255,255,.8)`: `ai.p` (174 ch). 3 lines at 1440.
- **Media (right)** `docs-ai-tracker`: 720:513 (1.4035), `cover`, radius 0. Sizes 608×433.2, 468×333.7, 340×242.6, 358×255.1. The art is drawn on mulberry, with corners matching `#421d24`.
- Below 640: text first, then media, gap 24.

## 5. D4 AI cards (`#421d24`, same group, padding `0/96`)
- Grid 3 columns at container ≥640 (405.3 / 309.3 / 224), gap vp. 1 column at 390 (gap 16).
- Card: flex-col, gap 24, left aligned:
  - Icon `docs-ai-icon-1..3` 74×74.
  - `h2` heading-sm white: `ai.cN.h` (36 / 39 / 43 ch, 2 lines at 1440).
  - `p` text-medium white-80: `ai.cN.p` (127 / 124 / 124 ch, 3 lines).
- Card height 277.4 (1440), 295.7 (1024), 347.4 (768), 260.6–287.6 (390).

## 6. D5 Band (`#f2f0eb`)
- Padding 96/96 (40/40).
- Title block: centered, `padding-bottom: 80`. `h2` heading-lg `#292827`, `band.h2` (47 ch), max 900. 2 lines at 1440 and 768, 1 line at 1024 (841.9), 3 lines at 390.
- Then a centered primaryFilled light button, 158.1×52, `band.cta` (17 ch). At 390 it is **full width, 358×52**.

## 7. D6 Surface grid (`#ffffff`)
- Padding 96/96 (40/40).
- Title block: centered, gap 24, `padding-bottom: 80`.
  - `h2` heading-lg: `surface.h2` (34 ch, 1 line at ≥768, 697.9 wide at 1440).
  - `p` text-medium sub: `surface.p` (94 ch, 1 line at 1440 and 1024).
- Grid: 2 columns: 624 / gap 32 (1440), 476 / 24 (1024), 348 / 24 (768). 1 column at 390, gap 16.
- Card: flex-col, gap 24:
  1. Media `docs-surface-docs | -projects | -hub | -workflows`: **3:2 (720×480)**, `cover`, radius 0. Sizes 624×416, 476×317.3, 348×232, 358×238.8. The art has its own beige panel (`#f2f0ea`) to its edges, so it reads as a beige card on white.
  2. `h2` heading-sm `#292827`: `surface.cN.h`, 1 line.
  3. `p` text-medium sub: `surface.cN.p`, 2 lines at 1440.
  4. primaryLink with caret, 105.8×32: `link` ("Learn more", 10 ch).
- Card heights 611.2 (1440), 535.2 (1024), 474.1 (768), 452.6–479.6 (390).

## 8. D7 Hubs (`#281647`, dark)
- Padding 96/96 (40/40).
- Title block: centered, `padding-bottom: 80`.
  - `h2` heading-lg white: `hubs.h2` (43 ch). 2 lines at 1440 (900 wide); 1 line at 1024 and 768.
  - `p` text-medium white-80: `hubs.p` (62 ch, 1 line).
- Grid **4 columns** at container ≥640: 296 / gap 32 (1440), 226 / 24 (1024), **162 / 24 (768, still 4 columns)**. 1 column at 390, gap 16.
- Card: flex-col, `align-items:flex-start`, gap 24:
  - Icon `docs-hub-icon-1..4` 74×74.
  - `h2` heading-sm white, 1 word: `hubs.cN.h`.
  - `p` text-medium white-80: `hubs.cN.p`, 2 lines at 1440, 3–5 lines at 768.
  - primaryLink dark (`#d4c7ff`, hover `#bea1f5` + underline) with caret: `hubs.cN.l` (16 / 18 / 14 / 19 ch).
- Card height 269.2 (1440), 291.8 (1024), 329.1 (768), 260.8 (390).

## 9. D8 Quote (`#e8e0ff`, light)
- Padding 96/96 (40/40). Centered column, max 900, gap 24:
  1. Logo `docs-quote-logo` 226×51.
  2. `h2` **heading-lg** `#292827`, centered, `quote.h2` (135 ch, wrapped in curly quotes, no bold span).
     - 4 lines at 1440 (235.2 tall), 3 lines at 1024 and 768 (144.6 / 125), 7 lines at 390 (268.7).
  3. `p` text-medium text-sub, centered: `quote.name` `<br>` `quote.role` (2 lines, 148.4 wide).
  4. An empty `p` (0 height). This gives an extra 24px.
  5. primaryLink with caret, 203.1×32: `quote.link` (25 ch).
- Rhythm at 1440: logo 5482.3, h2 5557.3, p 5816.5, link 5918.5, section end 6046.5.

## 10. D9–D11 Integrations group (`#f7f5f2`)
- **D9 Stack intro**: padding 96/96. Centered block, gap 24.
  - `h2` heading-lg `stack.h2` (41 ch, 1 line at ≥768).
  - `p` text-medium sub `stack.p` (167 ch, 2 lines at 1440, 900 wide).
- **D10 Integrations** (padding `0/96`): `SplitFeature` gapM. Text left, vertically centered:
  - `h2` heading-lg `int.h2` (17 ch).
  - `p` text-medium sub `int.p` (262 ch, 4 lines at 1440).
  - Media right `docs-integrations`: **720:582 (1.2371)**, sizes 608×491.5, 468×378.3, 340×274.9, 358×289.8.
- **D11 Connector** (padding `0/96`): same layout. The text column has `align-items:flex-start`.
  - `h2` heading-lg `mcp.h2` (27 ch, 2 lines at 1440).
  - `p` text-medium sub `mcp.p` (230 ch, 4 lines).
  - primaryLink caret `link`.
  - Media `docs-connector`: **720:563 (1.2789)**, sizes 608×475.4, 468×366.2, 340×266.1 (vertically centered at 768, offset 29.6), 358×280.2.
- Below 640, both rows stack text first, gap 24.

## 11. D12 Suite (`#ffffff`)
- Padding 96/96 (40/40).
- Title block: centered, `padding-bottom: 80`.
  - `h2` heading-lg `suite.h2` (34 ch).
  - `p` text-medium sub `suite.p` (48 ch).
- Grid 2 columns: 624 / 32 (1440), 476 / 24 (1024), 348 / 24 (768). 1 column at 390, gap 16.
- Card: flex-col, gap 24:
  - Icon `docs-suite-icon-assistant | -agents | -pages | -inbox`. The first three are 74×74; **the inbox icon is 85×85**.
  - `h2` heading-sm `#292827`: `suite.cN.h`. Each is "Product: tagline" in plain text with no bold. 2 lines at 1440, except card 4 (1 line).
  - `p` text-medium sub: `suite.cN.p`, 2 lines.
  - No links.
- Card heights 250.4 / 250.4 / 250.4 / 224.2 at 1440. The second row starts at +282.3.

## 12. D13 Closing CTA (`#421d24`, dark): `CtaBand`
- Padding 96/96 (40/40). Left-aligned column, gap 24, width 538.1 at 1440.
  - `h2` heading-lg white: `cta.h2` (21 ch, 1 line, 455.2 wide).
  - `p` text-medium white-80: `cta.p` (68 ch, 1 line at ≥768, 2 lines at 390).
  - CTA group: `margin-top: 24` (so 48 below the p), row, gap 16. It stays a row at 390.
    - primaryFilled **dark** (`#d4c7ff` / `#292827`), 158.1×52, `cta.btn1`.
    - primaryOutline **dark** (`#d4c7ff` ring), 122.9×52, `cta.btn2`.

---

## 13. Motion and interaction (complete list for this route)
1. **Demo video (D2)**
   - Autoplays muted inline. It also autoplays under reduced motion.
   - Duration 28.29s. There is no `loop` attribute, but the component restarts it when it ends (measured). Treat it as a loop.
   - **Viewport-gated** by an IntersectionObserver with thresholds `[0, 0.2]`. It paused when scrolled away (at t=1.23) and resumed when scrolled back. It was still playing at the D2 section top and paused once the page was scrolled to D3.
   - Pause/play button: swaps `aria-label` "Pause animation" ⇄ "Play animation" and the icon. No transition.
2. **Logo grid**: one-time `fadeIn` 500ms ease-in-out on mount. No rotation.
3. **Hover** (measured):
   - primaryFilled `#714cb6`→`#533192` (dark `#d4c7ff`→`#bea1f5`), 200ms ease-in-out.
   - primaryOutline light: ring 1px `#714cb6` → 2px `#533192` with text `#533192`. Dark: `#d4c7ff` → `#bea1f5`. 200ms ease-in-out.
   - primaryLink: colour + underline.
4. **None observed**
   - No scroll-triggered reveals: no element waits at opacity 0 or offset, checked before and after a full slow scroll.
   - No parallax, no carousel, no tabs or accordions, no header change.
   - The background images are static.
   - The per-section IntersectionObservers (`[0,.5]`) and link prefetch observers (`rootMargin: 200px`) have no visual effect.
   - The CSS contains `two-column` scroll-timeline keyframes, but they are **inactive** on this route.

## 14. Not measured / caveats
- The video is described from colour sampling and one still frame. Draw original UI art.
- The background SVG for D1 is 2.5 MB of chip illustrations. Only its layout (chips left and right, empty centre) was recorded.
- The Northstar copy is written independently (new feature names and angles). Lengths are within ±10% and line counts are in the measured text-node table. Redraw the media art so it fits the new copy.
- There is no viewport >1440 data.

## 15. Copy deck (independently written Northstar copy)
The copy is original. It is not a rewording of the source: the features, angles and titles are new, and it covers the same roles at a similar length. `link` is reused for every "Learn more". `hero.cta1` is also the header button.


| id | role | orig chars | Northstar copy (chars) |
|---|---|---|---|
| `hero.h1` | h1 | 47 | `Every plan your team writes, alive in one page` (46) |
| `hero.p` | lede | 72 | `Draft, decide and track in shared pages that an AI teammate keeps tidy.` (71) |
| `hero.cta1` | button / header button | 17 | `Start using Pages` (17) |
| `hero.cta2` | outline button | 10 | `See a demo` (10) |
| `proof.p` | proof line | 45 | `Picked by product, ops and design teams alike` (45) |
| `ai.h2` | h2 | 26 | `An editor that builds back` (26) |
| `ai.p` | body | 174 | `Describe the thing you need, whether that is a hiring tracker, a weekly status table or a launch checklist, and Pages AI lays it out with real columns, owners and buttons your team can use.` (189) |
| `ai.c1.h` | card title | 36 | `Outlines that grow from one sentence` (36) |
| `ai.c1.p` | card body | 127 | `Start with a single line about the goal. Pages proposes sections, headings and open questions, and you keep only what helps.` (124) |
| `ai.c2.h` | card title | 39 | `Formula help for people who hate formulas` (41) |
| `ai.c2.p` | card body | 124 | `Ask for a running total or a deadline flag in plain words and the right formula appears in the column, explained in a note.` (123) |
| `ai.c3.h` | card title | 43 | `Mini-apps you assemble just by describing them` (46) |
| `ai.c3.p` | card body | 124 | `A vote button, a sign-up sheet, a small approval flow: say what it should do and it lives inside the page from then on.` (119) |
| `band.h2` | h2 | 47 | `Your next kickoff deserves a better home than chat` (50) |
| `band.cta` | button | 17 | `Start using Pages` (17) |
| `surface.h2` | h2 | 34 | `Four ways teams use a single page` (33) |
| `surface.p` | lede | 94 | `The same canvas stretches from a one-line idea to the system a whole department runs on daily.` (94) |
| `surface.c1.h` | card title | 18 | `Briefs that update` (18) |
| `surface.c1.p` | card body | 108 | `Specs and briefs pull in live numbers and task status, so the document never drifts from what is true.` (102) |
| `link` | link | 10 | `Learn more` (10) |
| `surface.c2.h` | card title | 18 | `Sprint launch board` (19) |
| `surface.c2.p` | card body | 135 | `Columns for every stage, cards for every task, and a timeline view for the people who think in weeks rather than in sticky notes.` (129) |
| `surface.c3.h` | card title | 14 | `Answers desk` (12) |
| `surface.c3.p` | card body | 148 | `Collect policies and how-tos in one place. New colleagues ask a question in plain language and get a reply that points to the exact paragraph.` (142) |
| `surface.c4.h` | card title | 9 | `Requests` (8) |
| `surface.c4.p` | card body | 140 | `Turn a form into a queue with owners, due dates and automatic reminders, so requests stop arriving as stray messages in five channels.` (134) |
| `hubs.h2` | h2 | 43 | `Starter spaces your departments can adopt` (41) |
| `hubs.p` | lede | 62 | `Copy a template, rename a few things, and it is yours by lunch.` (63) |
| `hubs.c1.h` | card title | 7 | `Design` (6) |
| `hubs.c1.p` | card body | 67 | `Critique boards, asset lists and review dates in one shared spot.` (65) |
| `hubs.c1.l` | link | 16 | `Design team hub` (15) |
| `hubs.c2.h` | card title | 9 | `Growth` (6) |
| `hubs.c2.p` | card body | 59 | `Experiment logs with results that update by themselves.` (55) |
| `hubs.c2.l` | link | 18 | `Growth team hub` (15) |
| `hubs.c3.h` | card title | 5 | `Revenue` (7) |
| `hubs.c3.p` | card body | 70 | `Territory plans and forecast tables that the whole region can edit.` (67) |
| `hubs.c3.l` | link | 14 | `Revenue hub` (11) |
| `hubs.c4.h` | card title | 10 | `People` (6) |
| `hubs.c4.p` | card body | 64 | `Onboarding checklists, policies and open roles for every team.` (62) |
| `hubs.c4.l` | link | 19 | `People team hub` (15) |
| `quote.h2` | quote | 135 | `“Our weekly planning call shrank from an hour to fifteen minutes, since everyone arrives having read the same page already.”` (124) |
| `quote.name` | name | 18 | `Avery Lindqvist P.` (18) |
| `quote.role` | role | 14 | `PM at Harborly` (14) |
| `quote.link` | link | 25 | `Read more customer stories` (26) |
| `stack.h2` | h2 | 41 | `Your other apps, finally on speaking terms` (42) |
| `stack.p` | lede | 167 | `Bring tickets, design files and customer records into the page where decisions get made. People stop pasting screenshots, and the AI can see the full picture.` (158) |
| `int.h2` | h2 | 17 | `Live two-way sync` (17) |
| `int.p` | body | 262 | `Link a row to an issue in your tracker or a deal in your CRM and the fields stay matched in both directions. Change a status here and it changes there; close a ticket there and the page reflects it. You can also trigger actions, like opening an issue, from inside the table.` (274) |
| `mcp.h2` | h2 | 27 | `Open to any AI you prefer` (25) |
| `mcp.p` | body | 230 | `Add Pages as a connector in the AI tools your team already prefers. Assistants can read the pages you allow, draft new ones and update tables, while admins decide exactly which spaces stay off limits and review a log of every change made.` (238) |
| `suite.h2` | h2 | 34 | `Four Northstar apps, one workspace` (34) |
| `suite.p` | lede | 48 | `All of them share one account, data and search.` (47) |
| `suite.c1.h` | card title | 50 | `Northstar Assistant answers inside any app you open` (51) |
| `suite.c1.p` | card body | 123 | `Highlight text anywhere and ask a question. Answers draw on your own pages and mail, with links back to where they came from.` (125) |
| `suite.c2.h` | card title | 53 | `Northstar Agents run the repetitive jobs in the background` (58) |
| `suite.c2.p` | card body | 118 | `Set an agent to chase approvals, tidy trackers or prepare weekly reports, and check its work whenever you like.` (111) |
| `suite.c3.h` | card title | 55 | `Northstar Pages is where plans, notes and data come together` (60) |
| `suite.c3.p` | card body | 123 | `Documents, tables and small apps live side by side, so one link is enough to bring anyone up to speed on a project.` (115) |
| `suite.c4.h` | card title | 42 | `Northstar Inbox keeps mail short and sorted` (43) |
| `suite.c4.p` | card body | 131 | `Rules, briefs and quiet hours turn a noisy mailbox into a short list, and handoff notes keep accounts moving when people change roles.` (134) |
| `cta.h2` | h2 | 21 | `Start a page together` (21) |
| `cta.p` | body | 68 | `Invite three colleagues, open a blank page, see what you build by Friday.` (73) |
| `cta.btn1` | button | 17 | `Start using Pages` (17) |
| `cta.btn2` | button | 10 | `See a demo` (10) |


## 16. Measured text nodes (role, original length, line counts)
Set text so the line counts roughly match at each width. DOM section index → spec id: 0–12 = D1–D13. Spans are inline segments inside the preceding heading or paragraph.

| section | node | role | own chars | lines 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|---|---|---|
| 0 | h1 #1 | display-small | 47 | 2 | 2 | 2 | 3 |
| 0 | p #2 | text-medium | 72 | 1 | 1 | 1 | 2 |
| 1 | p #1 | text-medium | 45 | 1 | 1 | 1 | 2 |
| 2 | h2 #1 | heading-large | 26 | 1 | 1 | 2 | 1 |
| 2 | p #2 | text-medium | 174 | 3 | 3 | 5 | 4 |
| 3 | h2 #1 | heading-small | 36 | 2 | 2 | 2 | 2 |
| 3 | p #2 | text-medium | 127 | 3 | 4 | 5 | 3 |
| 3 | h2 #3 | heading-small | 39 | 2 | 2 | 2 | 2 |
| 3 | p #4 | text-medium | 124 | 3 | 4 | 5 | 3 |
| 3 | h2 #5 | heading-small | 43 | 2 | 2 | 3 | 2 |
| 3 | p #6 | text-medium | 124 | 3 | 4 | 5 | 4 |
| 4 | h2 #1 | heading-large | 47 | 2 | 1 | 2 | 3 |
| 5 | h2 #1 | heading-large | 34 | 1 | 1 | 1 | 2 |
| 5 | p #2 | text-medium | 94 | 1 | 1 | 2 | 3 |
| 5 | h2 #3 | heading-small | 18 | 1 | 1 | 1 | 1 |
| 5 | p #4 | text-medium | 108 | 2 | 2 | 3 | 3 |
| 5 | h2 #5 | heading-small | 18 | 1 | 1 | 1 | 1 |
| 5 | p #6 | text-medium | 135 | 2 | 3 | 4 | 4 |
| 5 | h2 #7 | heading-small | 14 | 1 | 1 | 1 | 1 |
| 5 | p #8 | text-medium | 148 | 2 | 3 | 4 | 4 |
| 5 | h2 #9 | heading-small | 9 | 1 | 1 | 1 | 1 |
| 5 | p #10 | text-medium | 140 | 2 | 3 | 4 | 4 |
| 6 | h2 #1 | heading-large | 43 | 2 | 1 | 1 | 2 |
| 6 | p #2 | text-medium | 62 | 1 | 1 | 1 | 2 |
| 6 | h2 #3 | heading-small | 7 | 1 | 1 | 1 | 1 |
| 6 | p #4 | text-medium | 67 | 2 | 3 | 4 | 2 |
| 6 | h2 #5 | heading-small | 9 | 1 | 1 | 1 | 1 |
| 6 | p #6 | text-medium | 59 | 2 | 3 | 4 | 2 |
| 6 | h2 #7 | heading-small | 5 | 1 | 1 | 1 | 1 |
| 6 | p #8 | text-medium | 70 | 2 | 3 | 4 | 2 |
| 6 | h2 #9 | heading-small | 10 | 1 | 1 | 1 | 1 |
| 6 | p #10 | text-medium | 64 | 2 | 3 | 4 | 2 |
| 7 | h2 #1 | heading-large | 135 | 4 | 3 | 3 | 7 |
| 7 | p #2 | text-medium | 32 | 2 | 2 | 2 | 2 |
| 8 | h2 #1 | heading-large | 41 | 1 | 1 | 1 | 2 |
| 8 | p #2 | text-medium | 167 | 2 | 2 | 2 | 4 |
| 9 | h2 #1 | heading-large | 17 | 1 | 1 | 1 | 1 |
| 9 | p #2 | text-medium | 262 | 4 | 5 | 7 | 7 |
| 10 | h2 #1 | heading-large | 27 | 2 | 2 | 2 | 2 |
| 10 | p #2 | text-medium | 230 | 4 | 5 | 6 | 6 |
| 11 | h2 #1 | heading-large | 34 | 1 | 1 | 1 | 2 |
| 11 | p #2 | text-medium | 48 | 1 | 1 | 1 | 2 |
| 11 | h2 #3 | heading-small | 50 | 2 | 2 | 2 | 2 |
| 11 | p #4 | text-medium | 123 | 2 | 3 | 3 | 3 |
| 11 | h2 #5 | heading-small | 53 | 2 | 2 | 2 | 2 |
| 11 | p #6 | text-medium | 118 | 2 | 3 | 3 | 3 |
| 11 | h2 #7 | heading-small | 55 | 2 | 2 | 2 | 2 |
| 11 | p #8 | text-medium | 123 | 2 | 3 | 3 | 3 |
| 11 | h2 #9 | heading-small | 42 | 1 | 2 | 2 | 2 |
| 11 | p #10 | text-medium | 131 | 2 | 3 | 4 | 4 |
| 12 | h2 #1 | heading-large | 21 | 1 | 1 | 1 | 1 |
| 12 | p #2 | text-medium | 68 | 1 | 1 | 1 | 2 |

