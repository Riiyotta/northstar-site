# Northstar marketing site (Vite + React clone of a live SaaS site's layout/motion, under a fictional brand with independently written copy), at http://localhost:5288

Source: Northstar marketing site (Vite + React clone of a live SaaS site's layout/motion, under a fictional brand with independently written copy), at http://localhost:5288
Status: **derived-from-codebase**
7 routes · 7 templates · 42 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Homepage, Product page: Inbox, Product page: Pages) account for 3 of 7 routes (43%). The remaining 4 routes span 4 templates.

| template | routes | share |
|---|---:|---:|
| Homepage | 1 | 14% |
| Product page: Inbox | 1 | 14% |
| Product page: Pages | 1 | 14% |
| Product page: Assistant (chaptered) | 1 | 14% |
| Product page: Agents | 1 | 14% |
| Pricing | 1 | 14% |
| Enterprise | 1 | 14% |

## Page chrome

**1 routes carry chrome = `signin+banner`** — Homepage.

**3 routes carry chrome = `product-cta`** — Product page: Inbox, Product page: Pages, Product page: Agents.

**1 routes carry chrome = `product-cta+light-footer`** — Product page: Assistant (chaptered).

**2 routes carry chrome = `signin`** — Pricing, Enterprise.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.footer-dark` | SHELL | 6 | 6 | `components/Footer.jsx` | Every route except /go. |
| `cta.cta-final` | CTA | 5 | 5 | `components/ui/CtaBand.jsx` | Five routes: /mail, /docs, /go, /agents and /enterprise. |
| `shell.header-product` | SHELL | 4 | 4 | `components/Header.jsx (cta, bg props) + components/MobileDrawer.jsx` | Product pages whose route has a `header: { cta }` option: /mail, /docs, /go and /agents. |
| `features.section-intro` | FEATURES | 4 | 4 | `components/ui/Intro.jsx` | Four product pages: /mail, /docs, /agents and /enterprise. |
| `features.icon-grid` | FEATURES | 4 | 4 | `components/ui/IconFeatureGrid.jsx` | Four routes: /mail, /docs, /agents and /enterprise. |
| `shell.header-signin` | SHELL | 3 | 3 | `components/Header.jsx + components/SignInMenu.jsx + components/MobileDrawer.jsx` | Routes with no `header` option in routes.js: the homepage, /plans and /enterprise. |
| `proof.logo-strip-rotating` | PROOF | 3 | 3 | `components/LogoStrip.jsx (variant home/mail/plans)` | Three routes: the homepage, /mail and /plans. |
| `features.split-feature` | FEATURES | 3 | 3 | `components/ui/SplitFeature.jsx` | Three routes: /docs, /agents and /enterprise. |
| `features.card-grid` | FEATURES | 3 | 3 | `components/ui/CardGrid.jsx` | Three routes: /mail, /docs and /enterprise. |
| `support.faq` | SUPPORT | 3 | 3 | `components/ui/Faq.jsx (enterprise via components/enterprise/FaqAccordion.jsx)` | Three routes: /go, /agents and /enterprise. |
| `hero.product-centered` | HERO | 2 | 2 | `components/ui/ProductHero.jsx` | Two product pages: /mail and /go. |
| `hero.split` | HERO | 2 | 2 | `components/enterprise/SplitHero.jsx` | Two pages: /agents (light) and /enterprise (dark purple). |
| `proof.logo-strip-static` | PROOF | 2 | 2 | `components/LogoStrip.jsx (variant agents/enterprise)` | Two routes: /agents and /enterprise. |
| `proof.testimonial-feature` | PROOF | 2 | 2 | `components/Testimonial.jsx` | Two routes: the homepage and /docs. |
| `proof.quote-grid` | PROOF | 2 | 2 | `components/ui/QuoteGrid.jsx` | Two routes: /mail (with avatars) and /enterprise. |
| `features.split-feature-rows` | FEATURES | 2 | 2 | `pages/Mail.jsx FeatureRows + pages/Enterprise.jsx (map over components/ui/SplitFeature.jsx)` | Two routes: /mail (two runs of five) and /enterprise (one run of four). |
| `features.helper-cards` | FEATURES | 2 | 2 | `components/ui/HelperCard.jsx` | Two routes: /go and /agents. |
| `cta.cta-band` | CTA | 2 | 2 | `components/ui/CtaBand.jsx` | Two routes: /go (lavender) and /enterprise (#f2f0eb). |
| `shell.announcement-banner` | SHELL | 1 | 1 | `components/Banner.jsx` | Homepage only; it is rendered inside pages/Home.jsx, not the Layout. |
| `shell.footer-light` | SHELL | 1 | 1 | `components/Footer.jsx (tone="light")` | /go only, via `footer: 'light'` in routes.js. |
| `hero.product-carousel` | HERO | 1 | 1 | `components/Hero.jsx` | Homepage only. |
| `hero.centered-over-art` | HERO | 1 | 1 | `pages/Docs.jsx (BgArt + components/ui/Intro.jsx)` | /docs only. |
| `hero.pricing-intro` | HERO | 1 | 1 | `components/plans/SuiteIntro.jsx` | /plans only. |
| `proof.stat-band` | PROOF | 1 | 1 | `pages/Mail.jsx (inline PageSection)` | /mail only. |
| `proof.video-showcase` | PROOF | 1 | 1 | `pages/Docs.jsx (BgArt + components/ui/VideoSlot.jsx + LogoStrip variant docs)` | /docs only. |
| `proof.testimonial-trio` | PROOF | 1 | 1 | `components/plans/TestimonialTrio.jsx` | /plans only. |
| `proof.quote-pair` | PROOF | 1 | 1 | `pages/Agents.jsx (inline TwoColumn)` | /agents only. |
| `proof.compliance-badges` | PROOF | 1 | 1 | `pages/Enterprise.jsx (LogoGrid + components/enterprise/BadgePlaceholder.jsx)` | /enterprise only. |
| `features.home-agent-group` | FEATURES | 1 | 1 | `components/AgentSection.jsx + components/FeatureTabs.jsx` | Homepage only. |
| `features.home-inbox-bento` | FEATURES | 1 | 1 | `components/InboxBento.jsx` | Homepage only. |
| `features.home-pages-group` | FEATURES | 1 | 1 | `components/PagesSection.jsx` | Homepage only. |
| `features.home-enterprise-block` | FEATURES | 1 | 1 | `components/Enterprise.jsx` | Homepage only. |
| `features.chapter-intro` | FEATURES | 1 | 1 | `components/go/ChapterIntro.jsx` | /go only (chapters 01–04). |
| `features.sticky-feature-rows` | FEATURES | 1 | 1 | `components/go/StickyFeatureRow.jsx` | /go only (chapters 01 and 04). |
| `features.chapter-split` | FEATURES | 1 | 1 | `pages/Go.jsx (components/go/ChapterIntro.jsx ChapterStack + MediaSlot)` | /go only. |
| `features.bento` | FEATURES | 1 | 1 | `components/ui/Bento.jsx` | /agents only. |
| `features.aside-row` | FEATURES | 1 | 1 | `components/ui/Aside.jsx (variant="title")` | /agents only. |
| `features.connectors-strip` | FEATURES | 1 | 1 | `pages/Go.jsx (MediaSlot connectors-strip)` | /go only (chapter 03). |
| `pricing.plan-cards` | PRICING | 1 | 1 | `components/plans/PlanCards.jsx` | /plans only. |
| `pricing.plan-comparison` | PRICING | 1 | 1 | `components/plans/PlanComparison.jsx` | /plans only; it is hidden below 1080px. |
| `pricing.floating-plan-header` | PRICING | 1 | 1 | `components/plans/FloatingPlanHeader.jsx` | /plans only, tied to pricing.plan-comparison. |
| `cta.cta-final-home` | CTA | 1 | 1 | `components/FinalCta.jsx` | Homepage only. |

**18 shared sections** appear in more than one template and belong in a component library.

**24 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **signin+banner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-signin` | shared ×3 |
| 2 | SHELL | `shell.announcement-banner` | page-local |
| 3 | HERO | `hero.product-carousel` | page-local |
| 4 | PROOF | `proof.logo-strip-rotating` | shared ×3 |
| 5 | FEATURES | `features.home-agent-group` | page-local |
| 6 | PROOF | `proof.testimonial-feature` | shared ×2 |
| 7 | FEATURES | `features.home-inbox-bento` | page-local |
| 8 | FEATURES | `features.home-pages-group` | page-local |
| 9 | FEATURES | `features.home-enterprise-block` | page-local |
| 10 | CTA | `cta.cta-final-home` | page-local |
| 11 | SHELL | `shell.footer-dark` | shared ×6 |

### Product page: Inbox — `template.product-mail`

1 route · `/mail` · chrome: **product-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-product` | shared ×4 |
| 2 | HERO | `hero.product-centered` | shared ×2 |
| 3 | PROOF | `proof.logo-strip-rotating` | shared ×3 |
| 4 | PROOF | `proof.stat-band` | page-local |
| 5 | FEATURES | `features.section-intro` | shared ×4 |
| 6 | FEATURES | `features.icon-grid` | shared ×4 |
| 7 | FEATURES | `features.section-intro` | shared ×4 |
| 8 | FEATURES | `features.split-feature-rows` | shared ×2 |
| 9 | FEATURES | `features.card-grid` | shared ×3 |
| 10 | FEATURES | `features.split-feature-rows` | shared ×2 |
| 11 | PROOF | `proof.quote-grid` | shared ×2 |
| 12 | CTA | `cta.cta-final` | shared ×5 |
| 13 | SHELL | `shell.footer-dark` | shared ×6 |

### Product page: Pages — `template.product-docs`

1 route · `/docs` · chrome: **product-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-product` | shared ×4 |
| 2 | HERO | `hero.centered-over-art` | page-local |
| 3 | PROOF | `proof.video-showcase` | page-local |
| 4 | FEATURES | `features.split-feature` | shared ×3 |
| 5 | FEATURES | `features.icon-grid` | shared ×4 |
| 6 | FEATURES | `features.section-intro` | shared ×4 |
| 7 | FEATURES | `features.section-intro` | shared ×4 |
| 8 | FEATURES | `features.card-grid` | shared ×3 |
| 9 | FEATURES | `features.section-intro` | shared ×4 |
| 10 | FEATURES | `features.icon-grid` | shared ×4 |
| 11 | PROOF | `proof.testimonial-feature` | shared ×2 |
| 12 | FEATURES | `features.section-intro` | shared ×4 |
| 13 | FEATURES | `features.split-feature` | shared ×3 |
| 14 | FEATURES | `features.split-feature` | shared ×3 |
| 15 | FEATURES | `features.section-intro` | shared ×4 |
| 16 | FEATURES | `features.icon-grid` | shared ×4 |
| 17 | CTA | `cta.cta-final` | shared ×5 |
| 18 | SHELL | `shell.footer-dark` | shared ×6 |

### Product page: Assistant (chaptered) — `template.product-go`

1 route · `/go` · chrome: **product-cta+light-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-product` | shared ×4 |
| 2 | HERO | `hero.product-centered` | shared ×2 |
| 3 | FEATURES | `features.chapter-intro` | page-local |
| 4 | FEATURES | `features.sticky-feature-rows` | page-local |
| 5 | FEATURES | `features.chapter-intro` | page-local |
| 6 | FEATURES | `features.helper-cards` | shared ×2 |
| 7 | CTA | `cta.cta-band` | shared ×2 |
| 8 | FEATURES | `features.chapter-intro` | page-local |
| 9 | FEATURES | `features.connectors-strip` | page-local |
| 10 | FEATURES | `features.chapter-intro` | page-local |
| 11 | FEATURES | `features.sticky-feature-rows` | page-local |
| 12 | FEATURES | `features.chapter-split` | page-local |
| 13 | SUPPORT | `support.faq` | shared ×3 |
| 14 | CTA | `cta.cta-final` | shared ×5 |
| 15 | SHELL | `shell.footer-light` | page-local |

### Product page: Agents — `template.product-agents`

1 route · `/agents` · chrome: **product-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-product` | shared ×4 |
| 2 | HERO | `hero.split` | shared ×2 |
| 3 | PROOF | `proof.logo-strip-static` | shared ×2 |
| 4 | FEATURES | `features.split-feature` | shared ×3 |
| 5 | FEATURES | `features.section-intro` | shared ×4 |
| 6 | FEATURES | `features.helper-cards` | shared ×2 |
| 7 | FEATURES | `features.split-feature` | shared ×3 |
| 8 | FEATURES | `features.split-feature` | shared ×3 |
| 9 | FEATURES | `features.section-intro` | shared ×4 |
| 10 | FEATURES | `features.bento` | page-local |
| 11 | FEATURES | `features.aside-row` | page-local |
| 12 | PROOF | `proof.quote-pair` | page-local |
| 13 | FEATURES | `features.section-intro` | shared ×4 |
| 14 | FEATURES | `features.icon-grid` | shared ×4 |
| 15 | SUPPORT | `support.faq` | shared ×3 |
| 16 | CTA | `cta.cta-final` | shared ×5 |
| 17 | SHELL | `shell.footer-dark` | shared ×6 |

### Pricing — `template.pricing`

1 route · `/plans` · chrome: **signin**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-signin` | shared ×3 |
| 2 | HERO | `hero.pricing-intro` | page-local |
| 3 | PRICING | `pricing.plan-cards` | page-local |
| 4 | PROOF | `proof.logo-strip-rotating` | shared ×3 |
| 5 | PROOF | `proof.testimonial-trio` | page-local |
| 6 | PRICING | `pricing.plan-comparison` | page-local |
| 7 | PRICING | `pricing.floating-plan-header` | page-local |
| 8 | SHELL | `shell.footer-dark` | shared ×6 |

### Enterprise — `template.enterprise`

1 route · `/enterprise` · chrome: **signin**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header-signin` | shared ×3 |
| 2 | HERO | `hero.split` | shared ×2 |
| 3 | PROOF | `proof.logo-strip-static` | shared ×2 |
| 4 | FEATURES | `features.section-intro` | shared ×4 |
| 5 | FEATURES | `features.split-feature-rows` | shared ×2 |
| 6 | CTA | `cta.cta-band` | shared ×2 |
| 7 | FEATURES | `features.split-feature` | shared ×3 |
| 8 | FEATURES | `features.section-intro` | shared ×4 |
| 9 | FEATURES | `features.icon-grid` | shared ×4 |
| 10 | PROOF | `proof.compliance-badges` | page-local |
| 11 | FEATURES | `features.section-intro` | shared ×4 |
| 12 | FEATURES | `features.split-feature` | shared ×3 |
| 13 | FEATURES | `features.card-grid` | shared ×3 |
| 14 | PROOF | `proof.quote-grid` | shared ×2 |
| 15 | SUPPORT | `support.faq` | shared ×3 |
| 16 | CTA | `cta.cta-final` | shared ×5 |
| 17 | SHELL | `shell.footer-dark` | shared ×6 |

## Section reference

### SHELL

_Site chrome rendered by the Layout or per-route options: header variants, announcement banner, footer variants._

**`shell.header-signin`** — A sticky 67px white header: wordmark, six click-open dropdown nav items, 'Contact sales', and an outline 'Sign in' button that opens the animated three-product menu. Below 1080px it collapses into a slide-in drawer.

· Routes with no `header` option in routes.js: the homepage, /plans and /enterprise. · appears on 3 routes · implemented by `components/Header.jsx + components/SignInMenu.jsx + components/MobileDrawer.jsx`

**`shell.header-product`** — The same header shell with the Sign in menu replaced by 'Contact sales', a 'Log in' text link and a filled compact CTA whose label is set per route. An optional background colour also paints the drawer and main.

· Product pages whose route has a `header: { cta }` option: /mail, /docs, /go and /agents. · appears on 4 routes · implemented by `components/Header.jsx (cta, bg props) + components/MobileDrawer.jsx`

**`shell.announcement-banner`** — A 56px lavender strip under the header holding one line of copy and a 'Learn more' link whose arrow nudges on hover.

· Homepage only; it is rendered inside pages/Home.jsx, not the Layout. · appears on 1 routes · implemented by `components/Banner.jsx`

**`shell.footer-dark`** — A mulberry (#421d24) footer: brand title, four link columns (Products, Company, Legal with a cookie button, Connect with social icons) and a giant 5%-white wordmark.

· Every route except /go. · appears on 6 routes · implemented by `components/Footer.jsx`

**`shell.footer-light`** — The same footer layout in a light tone: #dedbd5 background, dark text, 80%-opacity links that underline on hover.

· /go only, via `footer: 'light'` in routes.js. · appears on 1 routes · implemented by `components/Footer.jsx (tone="light")`

### HERO

_The first content block of a page, carrying the H1 and primary CTA._

**`hero.product-carousel`** — A three-slide product switcher: a split-gradient grid with a nav list, a 10s autoplay progress bar, and 500ms cross-fades of copy and illustration. Below 1080px it becomes a single-slide layout with a next button.

· Homepage only. · appears on 1 routes · implemented by `components/Hero.jsx`

**`hero.product-centered`** — A centred hero: a product lockup inside the H1, then a lede and a single filled CTA, then a full-width demo VideoSlot with a play/pause control.

· Two product pages: /mail and /go. · appears on 2 routes · implemented by `components/ui/ProductHero.jsx`

**`hero.centered-over-art`** — A centred Intro-based hero (lockup, H1, filled and outline buttons) laid over full-bleed decorative chip artwork.

· /docs only. · appears on 1 routes · implemented by `pages/Docs.jsx (BgArt + components/ui/Intro.jsx)`

**`hero.split`** — A two-column hero with the H1, lede and buttons beside a large illustration. It stacks below 1080px.

· Two pages: /agents (light) and /enterprise (dark purple). · appears on 2 routes · implemented by `components/enterprise/SplitHero.jsx`

**`hero.pricing-intro`** — A pricing-page title block: the H1 over a four-cell product glyph grid, on a beige-to-white gradient.

· /plans only. · appears on 1 routes · implemented by `components/plans/SuiteIntro.jsx`

### PROOF

_Social proof and trust signals: logos, stats, testimonials, quotes, compliance badges._

**`proof.logo-strip-rotating`** — A hairline-bordered grid of six customer wordmarks (six columns on desktop, 3×2 below 1080px). It fades in, then every 2s swaps one random cell to another logo from an 11-logo pool.

· Three routes: the homepage, /mail and /plans. · appears on 3 routes · implemented by `components/LogoStrip.jsx (variant home/mail/plans)`

**`proof.logo-strip-static`** — The same logo grid, faded in once and never rotating, with variant-specific heading and colour (white on dark for enterprise).

· Two routes: /agents and /enterprise. · appears on 2 routes · implemented by `components/LogoStrip.jsx (variant agents/enterprise)`

**`proof.stat-band`** — A dark band with a single large statistic headline (highlighted span) over a watermark numeral illustration.

· /mail only. · appears on 1 routes · implemented by `pages/Mail.jsx (inline PageSection)`

**`proof.video-showcase`** — A 16:9 demo VideoSlot with a pause button, followed by a proof line and a static six-logo grid, all over a pastel blurred background.

· /docs only. · appears on 1 routes · implemented by `pages/Docs.jsx (BgArt + components/ui/VideoSlot.jsx + LogoStrip variant docs)`

**`proof.testimonial-feature`** — One large testimonial quote on lavender (#e8e0ff) with attribution and an optional company logo and link.

· Two routes: the homepage and /docs. · appears on 2 routes · implemented by `components/Testimonial.jsx`

**`proof.testimonial-trio`** — Three testimonials on dark blue (#0a476d), each with a round illustrated portrait, a serif quote and a company wordmark.

· /plans only. · appears on 1 routes · implemented by `components/plans/TestimonialTrio.jsx`

**`proof.quote-grid`** — An Intro heading followed by a two-column grid of customer quotes: a logo figure, the quote, and the name and role, with an optional avatar.

· Two routes: /mail (with avatars) and /enterprise. · appears on 2 routes · implemented by `components/ui/QuoteGrid.jsx`

**`proof.quote-pair`** — An Intro heading followed by two testimonials laid out with TwoColumn rather than QuoteGrid. It is visually close to proof.quote-grid but built separately.

· /agents only. · appears on 1 routes · implemented by `pages/Agents.jsx (inline TwoColumn)`

**`proof.compliance-badges`** — Two six-cell grids of invented compliance-style seal badges, followed by a link.

· /enterprise only. · appears on 1 routes · implemented by `pages/Enterprise.jsx (LogoGrid + components/enterprise/BadgePlaceholder.jsx)`

### FEATURES

_Blocks that explain the product: intros, split rows, grids, bentos, cards, composite homepage groups._

**`features.home-agent-group`** — The homepage's Agent product group: a centred intro, a wide media aside, two side-by-side asides, then five tabs of three feature cards each.

· Homepage only. · appears on 1 routes · implemented by `components/AgentSection.jsx + components/FeatureTabs.jsx`

**`features.home-inbox-bento`** — The homepage's Inbox product intro with a three-card bento (one large card, two stacked).

· Homepage only. · appears on 1 routes · implemented by `components/InboxBento.jsx`

**`features.home-pages-group`** — The homepage's Pages product group: an intro, a wide media card and two media cards.

· Homepage only. · appears on 1 routes · implemented by `components/PagesSection.jsx`

**`features.home-enterprise-block`** — A dark (#281647) two-column enterprise teaser with copy and buttons beside a console illustration.

· Homepage only. · appears on 1 routes · implemented by `components/Enterprise.jsx`

**`features.section-intro`** — A standalone heading block (H2, optional body, optional lockup, optional CTAs) that opens a group. Used on its own as a PageSection.

· Four product pages: /mail, /docs, /agents and /enterprise. · appears on 4 routes · implemented by `components/ui/Intro.jsx`

**`features.chapter-intro`** — A left-aligned chapter opener: a monospace '0N / 05 · LABEL' eyebrow, an H2 and a lede, on dashed side rails with a dashed top line.

· /go only (chapters 01–04). · appears on 1 routes · implemented by `components/go/ChapterIntro.jsx`

**`features.split-feature`** — A single two-column row of a heading and body (optional subtitle and link) beside an illustration, with the media on either side.

· Three routes: /docs, /agents and /enterprise. · appears on 3 routes · implemented by `components/ui/SplitFeature.jsx`

**`features.split-feature-rows`** — A run of consecutive split-feature rows, each its own PageSection, alternating which side the media sits on.

· Two routes: /mail (two runs of five) and /enterprise (one run of four). · appears on 2 routes · implemented by `pages/Mail.jsx FeatureRows + pages/Enterprise.jsx (map over components/ui/SplitFeature.jsx)`

**`features.sticky-feature-rows`** — A run of rows where the text sits pinned mid-viewport beside a looping VideoSlot, fading in and out over 200px of scroll at 640px and above. On mobile they are plain stacked rows.

· /go only (chapters 01 and 04). · appears on 1 routes · implemented by `components/go/StickyFeatureRow.jsx`

**`features.chapter-split`** — The chapter 05 trust block: the chapter eyebrow/H2/lede stack beside a single illustration.

· /go only. · appears on 1 routes · implemented by `pages/Go.jsx (components/go/ChapterIntro.jsx ChapterStack + MediaSlot)`

**`features.icon-grid`** — A grid of icon tiles, each with a title, body and optional link. It comes in 2, 3, 4 and 6 column layouts, plus a centred variant.

· Four routes: /mail, /docs, /agents and /enterprise. · appears on 4 routes · implemented by `components/ui/IconFeatureGrid.jsx`

**`features.card-grid`** — A grid of image cards with a caption or a title, detail and link.

· Three routes: /mail, /docs and /enterprise. · appears on 3 routes · implemented by `components/ui/CardGrid.jsx`

**`features.helper-cards`** — Rows of agent/helper cards with an icon tile, a title and body (bordered with a tinted top band on /go, white rounded on /agents), optionally followed by an 'all agents' button.

· Two routes: /go and /agents. · appears on 2 routes · implemented by `components/ui/HelperCard.jsx`

**`features.bento`** — A 7/5-column bento: one large card beside two stacked cards, each with copy and an illustration.

· /agents only. · appears on 1 routes · implemented by `components/ui/Bento.jsx`

**`features.aside-row`** — A wide aside card followed by two side-by-side aside cards, each with the heading first and small body text below.

· /agents only. · appears on 1 routes · implemented by `components/ui/Aside.jsx (variant="title")`

**`features.connectors-strip`** — A static strip of invented app glyphs illustrating integrations: one row at 640px and up, two rows below.

· /go only (chapter 03). · appears on 1 routes · implemented by `pages/Go.jsx (MediaSlot connectors-strip)`

### PRICING

_Plan presentation and comparison._

**`pricing.plan-cards`** — Four plan cards (name, price, description, CTA, feature list). The third is highlighted with a 'Top choice' tab, a lavender background and a large elevation, followed by a 'compare plans' button at 1080px and up. On mobile the order is highlighted, Pro tier, Enterprise tier, Free.

· /plans only. · appears on 1 routes · implemented by `components/plans/PlanCards.jsx`

**`pricing.plan-comparison`** — Feature comparison at 1080px and up: five accordion groups of fourteen section tables and 115 rows, holding check, text or empty cells, with Beta tags and info tooltips. The highlighted plan's column is shaded.

· /plans only; it is hidden below 1080px. · appears on 1 routes · implemented by `components/plans/PlanComparison.jsx`

**`pricing.floating-plan-header`** — A fixed bar of plan names and CTAs that slides in over the site header (0.3s) while the comparison table is in view.

· /plans only, tied to pricing.plan-comparison. · appears on 1 routes · implemented by `components/plans/FloatingPlanHeader.jsx`

### SUPPORT

_Question/answer content._

**`support.faq`** — A centred FAQ title and a list of accordion items with 0.2s height/opacity transitions and a rotating caret. It can be set so only one item opens at a time.

· Three routes: /go, /agents and /enterprise. · appears on 3 routes · implemented by `components/ui/Faq.jsx (enterprise via components/enterprise/FaqAccordion.jsx)`

### CTA

_Conversion bands placed mid-page or as the closing block._

**`cta.cta-band`** — A mid-page conversion band: a heading and a button, split or centred, on a tinted background, with optional background art.

· Two routes: /go (lavender) and /enterprise (#f2f0eb). · appears on 2 routes · implemented by `components/ui/CtaBand.jsx`

**`cta.cta-final`** — The closing conversion band directly above the footer: a heading and one or two buttons, stacked or split, usually the same mulberry as the footer.

· Five routes: /mail, /docs, /go, /agents and /enterprise. · appears on 5 routes · implemented by `components/ui/CtaBand.jsx`

**`cta.cta-final-home`** — The homepage's closing band: a heading and an outline button on #281647 over an animated gradient background illustration.

· Homepage only. · appears on 1 routes · implemented by `components/FinalCta.jsx`
