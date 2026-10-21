import LogoStrip from '../components/LogoStrip'
import Testimonial from '../components/Testimonial'
import Button from '../components/ui/Button'
import CardGrid from '../components/ui/CardGrid'
import CtaBand from '../components/ui/CtaBand'
import IconFeatureGrid from '../components/ui/IconFeatureGrid'
import Intro from '../components/ui/Intro'
import { LockupSlot, MediaSlot } from '../components/ui/Media'
import PageSection, { SectionGroup } from '../components/ui/PageSection'
import SplitFeature from '../components/ui/SplitFeature'
import VideoSlot from '../components/ui/VideoSlot'
import { slotArt } from '../components/ui/slotArt'
import { ai, band, connector, cta, hero, hubs, integrations, proof, quote, stack, suite, surface } from '../data/docs'

// docs.md 3: 6 static logos (homepage logo art until docs-logo-N art exists).
const LOGO_IDS = Array.from({ length: 6 }, (_, i) => `docs-logo-${i + 1}`)
const logoArt = (id) => slotArt(id, `logo-${id.split('-').pop()}`)

const icon = (id, size = 'size-[74px]') => <MediaSlot id={id} bg="transparent" className={size} />
const aiCards = ai.cards.map((c) => ({ ...c, icon: icon(c.id) }))
const hubCards = hubs.cards.map((c) => ({ ...c, icon: icon(c.id) }))
const suiteCards = suite.cards.map((c) => ({ ...c, icon: icon(c.id, c.size) }))

// Full-bleed background art (object-fit cover, inset 0) behind a section.
const BgArt = ({ id, bg }) => <MediaSlot id={id} bg={bg} className="!absolute inset-0" />

// /docs (no Banner). Section order: docs.md 1.
export default function Docs() {
  return (
    <>
      {/* Group A: D1 hero (#f2f0eb + art), D2 video + proof + logos (#fff + pastel art) */}
      <div className="ctx-light">
        <div className="relative bg-neutral-10">
          <BgArt id="docs-hero-bg" bg="#f2f0eb" />
          <PageSection className="relative">
            <Intro
              media={<LockupSlot id="lockup-pages" product="Pages" width={217} />}
              titleAs="h1"
              titleClass="text-display-sm"
              title={hero.h1}
              body={hero.p}
              ctas={[
                { label: hero.cta1, variant: 'primary' },
                { label: hero.cta2, variant: 'primaryOutline' },
              ]}
            />
          </PageSection>
        </div>
        <div className="relative bg-white">
          <BgArt id="docs-video-bg" bg="#ffffff" />
          <PageSection className="relative flex flex-col items-center !pt-0">
            <div className="w-full max-w-[1280px]">
              <VideoSlot id="docs-hero-video" art="hero-video-3" bg="#f8f8f8" className="aspect-video w-full" />
            </div>
            <LogoStrip variant="docs" intro={proof} ids={LOGO_IDS} renderArt={logoArt} />
          </PageSection>
        </div>
      </div>

      {/* Group B: D3 AI split + D4 AI cards (dark mulberry) */}
      <SectionGroup dark className="bg-mulberry-100">
        <PageSection>
          <SplitFeature title={ai.title} titleSize="lg" body={ai.body} media={ai.media} />
        </PageSection>
        <PageSection>
          <IconFeatureGrid items={aiCards} />
        </PageSection>
      </SectionGroup>

      {/* D5 band */}
      <SectionGroup className="bg-neutral-10">
        <PageSection>
          <Intro title={band.title} className="pb-20" />
          <div className="flex justify-center">
            <Button variant="primary" href="#" className="max-sm:w-full">
              {band.cta}
            </Button>
          </div>
        </PageSection>
      </SectionGroup>

      {/* D6 surface grid */}
      <SectionGroup className="bg-white">
        <PageSection>
          <Intro title={surface.title} body={surface.body} className="pb-20" />
          <CardGrid variant="detail" columns={2} items={surface.cards} />
        </PageSection>
      </SectionGroup>

      {/* D7 hubs (dark purple) */}
      <SectionGroup dark className="bg-purple-100">
        <PageSection>
          <Intro title={hubs.title} body={hubs.body} className="pb-20" />
          <IconFeatureGrid columns={4} items={hubCards} />
        </PageSection>
      </SectionGroup>

      {/* D8 quote */}
      <Testimonial
        quote={quote}
        logo={
          <span data-asset="docs-quote-logo" aria-hidden="true" className="block h-[51px] w-[226px]">
            {slotArt('docs-quote-logo', 'logo-9', { color: '#292827', opacity: 1 })}
          </span>
        }
      />

      {/* Group C: D9 stack intro, D10 integrations, D11 connector */}
      <SectionGroup className="bg-neutral-5">
        <PageSection>
          <Intro title={stack.title} body={stack.body} />
        </PageSection>
        <PageSection>
          <SplitFeature titleSize="lg" {...integrations} />
        </PageSection>
        <PageSection>
          <SplitFeature titleSize="lg" {...connector} linkStretch={false} />
        </PageSection>
      </SectionGroup>

      {/* D12 suite */}
      <SectionGroup className="bg-white">
        <PageSection>
          <Intro title={suite.title} body={suite.body} className="pb-20" />
          <IconFeatureGrid columns={2} items={suiteCards} />
        </PageSection>
      </SectionGroup>

      {/* D13 closing CTA */}
      <CtaBand
        title={cta.title}
        body={cta.body}
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
