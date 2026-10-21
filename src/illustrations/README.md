# Northstar illustrations

Original, code-drawn art (inline SVG + CSS, no bitmaps) for every media slot in
`asset-manifest.json`. All names, emails, subjects and companies are invented.

## Usage

```jsx
import { illustrations } from './illustrations'
const Art = illustrations['media-agent-wide']
<MediaSlot id="media-agent-wide" className="aspect-[1440/617] ..."><Art /></MediaSlot>
```

- Every component fills its parent at 100% x 100%. Size the parent with the slot's
  aspect ratio, radius and `overflow:hidden` (as `MediaSlot` already does).
- Screenshot-style art is drawn on a canvas with the slot's natural aspect and
  scaled with `preserveAspectRatio="… slice"` (behaves like `object-fit: cover`),
  so the 3:2 mobile crops still look right.
- Hero art is top-aligned (`xMidYMin`) because the desktop hero clips the slot to
  650px of 800.9px. Key content sits in the top ~80%.
- `bg-cta` is an absolutely positioned layer (`inset:0`), so its parent needs `position:relative`.
- Logos, lockups and icons take an optional `color` (they use `currentColor`). Customer
  logos also take `opacity` (default 0.55 on `#292827`).
- Motion: each hero slide runs a 7s one-shot timeline (iteration-count 1, fill forwards),
  matching the 7.03s videos that play once and hold their last frame; Hero.jsx re-keys the
  art per activation. The CTA background drifts slowly (stands in for the original's GIF).
  Carets, typing dots, spinners and sparks are static (no perpetual decorative loops). Under `prefers-reduced-motion: reduce`, all animation stops,
  and motion-only layers (typing covers, carets, cursors, toasts) are hidden, so each
  piece shows a complete static frame.
- Colours come from CLONE_SPEC 0.4 (`C` in `primitives.jsx`).

## id → component → slot

| Manifest id | Component | Slot / where | Canvas, bg |
|---|---|---|---|
| `logo-header` | `LogoHeader` (brand.jsx) | Header, left | 167:24, fill `#292827` |
| `logo-footer` | `LogoFooter` (brand.jsx) | Footer brand column | 167:24, fill `#fff` |
| `wordmark-footer` | `WordmarkFooter` (brand.jsx) | Giant footer wordmark | 1280:123, `rgba(255,255,255,.05)` |
| `hero-video-1` | `HeroInbox` (hero.jsx) | Hero slide 1, Inbox: mail list. Rows rise in, the top row is marked done, the list shifts up and a toast appears | 1368:1712, `#281647` |
| `hero-video-2` | `HeroAgent` (hero.jsx) | Hero slide 2, Agent: chat panel over a thread. Prompt, typing dots, a streamed summary and draft, then action chips | 1368:1712, `#0c4243` |
| `hero-video-3` | `HeroPages` (hero.jsx) | Hero slide 3, Pages: doc editor. A line is typed, a collaborator cursor moves and a comment pops in | 1368:1712, `#421d24` |
| `hero-nav-icon-1` | `HeroNavIconInbox` (brand.jsx) | Hero nav row 1 | 24:24, currentColor |
| `hero-nav-icon-2` | `HeroNavIconAgent` (brand.jsx) | Hero nav row 2 | 24:24, currentColor |
| `hero-nav-icon-3` | `HeroNavIconPages` (brand.jsx) | Hero nav row 3 | 24:24, currentColor |
| `logo-1` | `LogoHalcyon` (brand.jsx) | Logo strip cell 1 | 229:80 |
| `logo-2` | `LogoBrightfield` (brand.jsx) | Logo strip cell 2 | 213:80 |
| `logo-3` | `LogoOdessaLabs` (brand.jsx) | Logo strip cell 3 | 228:80 |
| `logo-4` | `LogoKestrel` (brand.jsx) | Logo strip cell 4 | 230:80 |
| `logo-5` | `LogoMarlow` (brand.jsx) | Logo strip cell 5 | 213:80 |
| `logo-6` | `LogoVoltline` (brand.jsx) | Logo strip cell 6 | 213:80 |
| `logo-7` … `logo-11` | `LogoPinecrest`, `LogoNorthbayHealth`, `LogoCorvid`, `LogoAldergrove`, `LogoTessellate` (brand.jsx) | Logo strip rotation pool (cycled into the 6 cells by LogoStrip.jsx) | 213-232:80 |
| `lockup-agent` | `LockupAgent` (brand.jsx) | Section 5 intro | 195:25 |
| `lockup-inbox` | `LockupInbox` (brand.jsx) | Section 7 intro | 208:25 |
| `lockup-pages` | `LockupPages` (brand.jsx) | Section 8 intro | 211:25 |
| `media-agent-wide` | `AgentInlineSuggest` (agent.jsx) | 5.2 wide aside: an inline "be more direct" suggestion popover in an email draft | 1440:617, `#0c4243` |
| `media-agent-chat` | `AgentContextChat` (agent.jsx) | 5.3 left aside: a chat about the budget sheet on screen | 1080:901, `#421d24` |
| `media-agent-app` | `AgentHub` (agent.jsx) | 5.3 right aside: an agent hub with 4 parallel tasks (running, done, review, queued) | 1080:901, `#dedbd5` |
| `tab-card-bg` | `TabCardBg` (brand.jsx) | 5.4 tab card background | 405:262, `#f2f0eb` to `#e8e0ff` |
| `tab-icon-1` … `tab-icon-15` | `TAB_ICONS[0…14]` (tiles.js) | 5.4 card media tiles. Gradients cycle purple, green, orange | 70:70 |
| `media-inbox-drafts` | `InboxDrafts` (inbox.jsx) | 7 card A, bleed top: a reply drafted for you | 1080:721, `#714cb6` |
| `media-inbox-availability` | `InboxAvailability` (inbox.jsx) | 7 card B, full background: a share-availability week grid that fades out under the card copy | 1080:478, `#281647` |
| `media-inbox-split` | `InboxSplit` (inbox.jsx) | 7 card C, bleed top: split inbox tabs and rows | 1080:486, `#dedbd5` |
| `media-pages-wide` | `PagesEditor` (pages.jsx) | 8 wide aside: a doc editor with a sidebar, a slash/block menu and an outline | 1440:628, `#dedbd5` |
| `media-pages-ai` | `PagesAiSummary` (pages.jsx) | 8 left aside: "What did we decide?" answered from the page | 1080:758, `#e8e0ff` |
| `media-pages-connect` | `PagesConnect` (pages.jsx) | 8 right aside: mail, calendar, files and chat linked into a page | 1080:911, `#421d24` |
| `media-enterprise` | `EnterpriseConsole` (enterprise.jsx) | 9 right column: an admin security console | 1080:608, `#141413` |
| `bg-cta` | `CtaBackground` (brand.jsx) | 10 final CTA: animated gradient blobs, sheen, grain and twinkles | cover, `#281647` |
| `signin-tile-1` | `SigninTileInbox` (brand.jsx) | Sign-in menu row 1 | 48px, r12 |
| `signin-tile-2` | `SigninTileAgent` (brand.jsx) | Sign-in menu row 2 | 48px, r12 |
| `signin-tile-3` | `SigninTilePages` (brand.jsx) | Sign-in menu row 3 | 48px, r12 |

Not covered, by design: `tab-label-icon-1..5`, `social-icons` and `generic-icons`. The
manifest marks these as open-icon-set glyphs, so use `lucide-react` directly.

## Files

- `primitives.jsx`: the `Art` canvas, text, avatar, window, chip, kbd and icon helpers
- `tokens.js`: the colour tokens `C`, `STAR_PATH` and `useUid` (non-component exports)
- `tiles.js` + `GradientTile.jsx`: the gradient tile factory and `TAB_ICONS`
- `illustrations.css`: all `ns-*` keyframes plus the reduced-motion rules (imported by `primitives.jsx`)
- `hero.jsx`, `agent.jsx`, `inbox.jsx`, `pages.jsx`, `enterprise.jsx`, `brand.jsx`
- `index.js`: the `illustrations` registry (default export too)
