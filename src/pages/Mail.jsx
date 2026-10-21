import LogoStrip from '../components/LogoStrip'
import CardGrid from '../components/ui/CardGrid'
import CtaBand from '../components/ui/CtaBand'
import IconFeatureGrid from '../components/ui/IconFeatureGrid'
import Intro from '../components/ui/Intro'
import { MediaSlot } from '../components/ui/Media'
import PageSection, { SectionGroup } from '../components/ui/PageSection'
import ProductHero from '../components/ui/ProductHero'
import QuoteGrid from '../components/ui/QuoteGrid'
import SplitFeature from '../components/ui/SplitFeature'
import { slotArt } from '../components/ui/slotArt'
import { compat, cta, featuresA, featuresB, grid, hero, logosIntro, pillars, problem, quotes, stat } from '../data/mail'

// mail.md 3: rotating pool (>= 9 marks); homepage logo art until mail-logo-N art exists.
const LOGO_POOL = Array.from({ length: 11 }, (_, i) => `mail-logo-${i + 1}`)
const logoArt = (id) => slotArt(id, `logo-${id.split('-').pop()}`)

const Brand = ({ children }) => <span className="text-action">{children}</span>

// mail.md 8: the brand span leads or trails; media alternates per group:
// f1-f5 start with media left (L, R, L, ...), f6-f10 start with media right
// (measured: R, L, R, ...).
const featureTitle = (f) =>
  f.lead ? (
    <>
      <Brand>{f.h2a}</Brand>
      {f.h2b}
    </>
  ) : (
    <>
      {f.h2a}
      <Brand>{f.h2b}</Brand>
    </>
  )

function FeatureRows({ rows, firstLeft = true }) {
  return rows.map((f, i) => (
    <PageSection key={f.media.id}>
      <SplitFeature
        gap="L"
        title={featureTitle(f)}
        subtitle={f.sub}
        body={f.body}
        link={f.link ? { label: f.link } : undefined}
        media={f.media}
        mediaLeft={(i % 2 === 0) === firstLeft}
      />
    </PageSection>
  ))
}

const pillarItems = pillars.map((p) => ({
  icon: <MediaSlot id={p.id} bg="#ffffff" className={p.className} />,
  text: (
    <>
      {p.parts[0]}
      <Brand>{p.parts[1]}</Brand>
      {p.parts[2]}
    </>
  ),
}))

const quoteItems = quotes.items.map((q) => ({
  ...q,
  logo: (
    <span data-asset={q.logo.id} aria-hidden="true" className="block h-full w-full">
      {slotArt(q.logo.id, q.logo.fallback, { color: '#ffffff', opacity: 1 })}
    </span>
  ),
  avatar: <MediaSlot id={q.avatar.id} bg={q.avatar.bg} className="size-[60px] rounded-full" />,
}))

// /mail (no Banner). Section order: mail.md 1.
export default function Mail() {
  return (
    <>
      {/* Group A: M1 hero, M2 logos (#f2f0eb), M3 stat band (own #281647) */}
      <SectionGroup className="bg-neutral-10">
        <ProductHero
          lockup={{ id: 'lockup-inbox', product: 'Inbox', width: 208 }}
          lines={[hero.h1a, hero.h1b]}
          lede={
            <>
              {hero.p1}
              <br />
              {hero.p2}
            </>
          }
          cta={hero.cta}
          titleClass="max-sm:w-full"
          video={{
            id: 'mail-hero-video',
            art: 'hero-video-1',
            bg: '#e8e8f8',
            className: 'aspect-[3/2] w-full rounded-16',
            wrapClass: 'w-full max-w-[960px]',
          }}
        />
        <PageSection>
          <LogoStrip variant="mail" intro={logosIntro} ids={LOGO_POOL} renderArt={logoArt} />
        </PageSection>
        <section className="ctx-dark relative bg-purple-100">
          {/* mail-stat-bg: object-fit contain, centred (natural 1440x464) */}
          <div className="absolute inset-0 grid place-items-center [container-type:size]" aria-hidden="true">
            <MediaSlot id="mail-stat-bg" bg="#281647" className="aspect-[1440/464] w-[min(100cqw,100cqh*3.1034)]" />
          </div>
          <div className="content-wrapper relative pb-section">
            <h2 className="mx-auto w-fit max-w-text pt-[3.6em] text-center text-heading-lg text-fg">
              {stat.l1}
              <br />
              <span className="text-highlight">{stat.hl}</span>
              {stat.l2}
            </h2>
          </div>
        </section>
      </SectionGroup>

      {/* Group B: M4 problem + M5 pillars (#fff) */}
      <SectionGroup className="bg-white">
        <PageSection>
          <Intro
            title={
              <>
                {problem.h2a}
                <Brand>{problem.h2b}</Brand>
              </>
            }
            body={[problem.p1, problem.p2]}
          />
        </PageSection>
        <PageSection>
          <IconFeatureGrid variant="centered" items={pillarItems} />
        </PageSection>
      </SectionGroup>

      {/* M6 compatibility (#f7f5f2) */}
      <SectionGroup className="bg-neutral-5">
        <PageSection>
          <Intro
            media={
              <figure className="flex w-full justify-center overflow-hidden">
                <MediaSlot id="mail-compat-icons" bg="#f7f5f2" className="h-[168px] w-[922px] max-w-none shrink-0" />
              </figure>
            }
            title={
              <>
                <span className="text-fg">{compat.a}</span>
                {compat.b}
                <Brand>{compat.c}</Brand>
                {compat.d}
                <Brand>{compat.e}</Brand>
              </>
            }
          />
        </PageSection>
      </SectionGroup>

      {/* Group C: M7 f1-f5 */}
      <SectionGroup className="bg-neutral-5">
        <FeatureRows rows={featuresA} />
      </SectionGroup>

      {/* M8 media grid (dark, no heading) */}
      <SectionGroup dark className="bg-purple-100">
        <PageSection>
          <CardGrid variant="caption" columns={3} items={grid} />
        </PageSection>
      </SectionGroup>

      {/* Group D: M9 f6-f10 */}
      <SectionGroup className="bg-neutral-5">
        <FeatureRows rows={featuresB} firstLeft={false} />
      </SectionGroup>

      {/* M10 testimonials (dark) */}
      <SectionGroup dark className="bg-purple-100">
        <PageSection>
          <Intro title={quotes.title} className="pb-20" />
          <QuoteGrid items={quoteItems} />
        </PageSection>
      </SectionGroup>

      {/* M11 closing CTA (same mulberry as the footer) */}
      <CtaBand
        title={cta.title}
        align="start"
        dark
        className="bg-mulberry-100"
        ctas={[
          { label: cta.btn1, variant: 'primary' },
          { label: cta.btn2, variant: 'primaryOutline' },
        ]}
      />
    </>
  )
}
