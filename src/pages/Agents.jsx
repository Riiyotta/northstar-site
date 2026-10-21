import SplitHero from '../components/enterprise/SplitHero'
import LogoStrip from '../components/LogoStrip'
import Aside from '../components/ui/Aside'
import Bento from '../components/ui/Bento'
import Button from '../components/ui/Button'
import CtaBand from '../components/ui/CtaBand'
import Faq from '../components/ui/Faq'
import HelperCard from '../components/ui/HelperCard'
import IconFeatureGrid from '../components/ui/IconFeatureGrid'
import Intro from '../components/ui/Intro'
import { MediaSlot } from '../components/ui/Media'
import PageSection, { SectionGroup } from '../components/ui/PageSection'
import SplitFeature from '../components/ui/SplitFeature'
import TwoColumn, { Column } from '../components/ui/TwoColumn'
import { slotArt } from '../components/ui/slotArt'
import { assist, build, cards, faq, final, hero, logosIntro, quotes, tools, trust, where } from '../data/agents'

// agents.md 3b: 6 static grey wordmarks (homepage logo art at ~40% until
// logo-aN art exists).
const LOGO_IDS = Array.from({ length: 6 }, (_, i) => `logo-a${i + 1}`)
const logoArt = (id) => slotArt(id, `logo-${id.slice(6)}`, { opacity: 0.4 })

const trustItems = trust.items.map((t, i) => ({
  ...t,
  icon: <MediaSlot id={`trust-icon-${i + 1}`} bg="#ffffff" className="h-[71px] w-[69px]" />,
}))

const bento = {
  main: {
    ...where.bento.a,
    bg: '#e8e0ff',
    media: { id: 'bento-assistant-art', bg: '#e8e2fa', aspect: 'aspect-[840/492]' },
  },
  side: [
    {
      ...where.bento.b,
      bg: '#281647',
      dark: true,
      media: { id: 'bento-mail-art', bg: '#281646', aspect: 'aspect-[600/214]' },
    },
    {
      ...where.bento.c,
      bg: '#dedbd5',
      media: { id: 'bento-web-art', bg: '#dedbd5', aspect: 'aspect-[600/214]' },
    },
  ],
}

// /agents (no Banner, white header). Section order: agents.md 2.
export default function Agents() {
  return (
    <>
      {/* 3 hero + logos (#f7f5ff) */}
      <SectionGroup className="bg-purple-0">
        <SplitHero
          eyebrow={null}
          title={hero.title}
          body={hero.body}
          ctas={[
            { label: hero.cta1, variant: 'primary' },
            { label: hero.cta2, variant: 'primaryOutline' },
          ]}
          media={hero.media}
        />
        <PageSection>
          <LogoStrip variant="agents" intro={logosIntro} ids={LOGO_IDS} renderArt={logoArt} />
        </PageSection>
      </SectionGroup>

      {/* 4 assistant split (dark purple, image left) */}
      <SectionGroup dark className="bg-purple-100">
        <PageSection>
          <SplitFeature gap="L" titleSize="lg" mediaFirst {...assist} />
        </PageSection>
      </SectionGroup>

      {/* 5 agent cards group (#f2f0eb) */}
      <SectionGroup className="bg-neutral-10">
        <PageSection>
          <Intro title={cards.title} />
        </PageSection>
        <PageSection>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {cards.items.map((c, i) => (
              <HelperCard
                key={c.title}
                variant="white"
                {...c}
                link={cards.link}
                icon={`agent-icon-${i + 1}`}
                iconClass="size-[77px]"
                spacerBefore={i !== 3}
              />
            ))}
          </div>
        </PageSection>
        <PageSection className="flex justify-center">
          <Button variant="primary" href="#" className="max-sm:w-full">
            {cards.cta}
          </Button>
        </PageSection>
      </SectionGroup>

      {/* 6 builder split (white, image left, no CTA) */}
      <SectionGroup className="bg-white">
        <PageSection>
          <SplitFeature gap="L" titleSize="lg" bodyClass="text-large" mediaFirst {...build} />
        </PageSection>
      </SectionGroup>

      {/* 7 tools split (mulberry, text left) */}
      <SectionGroup dark className="bg-mulberry-100">
        <PageSection>
          <SplitFeature gap="L" titleSize="md" {...tools} />
        </PageSection>
      </SectionGroup>

      {/* 8 "where" group (#f2f0eb) */}
      <SectionGroup className="bg-neutral-10">
        <PageSection>
          <Intro title={where.title} body={where.body} />
        </PageSection>
        <PageSection className="pb-vp">
          <Bento {...bento} />
        </PageSection>
        <PageSection className="pb-vp">
          <Aside
            variant="title"
            tone="dark"
            bg="#0c4243"
            label={where.docs.label}
            body={where.docs.body}
            media={{ id: 'aside-pages-art', art: 'media-pages-wide', bg: '#e8ecea' }}
            className="[container-type:inline-size]"
            layoutClass="flex-col sm:flex-row sm:items-end"
            mediaClass="aspect-[1440/658] w-full sm:w-[50cqi] lg:w-[60cqi]"
          />
        </PageSection>
        <PageSection>
          <div className="flex flex-col gap-vp sm:flex-row">
            <Aside
              variant="title"
              tone="dark"
              bg="#421d24"
              label={where.desk.label}
              body={where.desk.body}
              media={{ id: 'aside-desktop-art', bg: '#5a3b40' }}
              className="[container-type:inline-size] sm:flex-[1_1_0%]"
              layoutClass="flex-col lg:flex-row lg:items-end"
              mediaClass="aspect-[720/471] w-full lg:w-[50cqi]"
            />
            <Aside
              variant="title"
              tone="light"
              bg="#ffffff"
              label={where.other.label}
              body={where.other.body}
              media={{ id: 'aside-ai-tools-art', bg: '#e6f2fd' }}
              className="[container-type:inline-size] sm:flex-[1_1_0%]"
              layoutClass="flex-col lg:flex-row lg:items-end"
              mediaClass="aspect-[720/639] w-full lg:w-[50cqi]"
            />
          </div>
        </PageSection>
      </SectionGroup>

      {/* 9 testimonials (QuotePair) */}
      <SectionGroup className="bg-white">
        <PageSection>
          <Intro title={quotes.title} className="pb-20" />
          <TwoColumn gap="L">
            {quotes.items.map((q) => (
              <Column key={q.line1}>
                <div className="flex flex-col gap-6">
                  <p className="text-pretty text-medium text-fg-sub">{q.quote}</p>
                  <p className="text-medium text-fg-sub">
                    {q.line1}
                    <br />
                    {q.line2}
                  </p>
                </div>
              </Column>
            ))}
          </TwoColumn>
        </PageSection>
      </SectionGroup>

      {/* 10 trust (#f7f5ff) */}
      <SectionGroup className="bg-purple-0">
        <PageSection>
          <Intro title={trust.title} className="pb-20 [&>p]:text-large" body={trust.body} />
          <IconFeatureGrid items={trustItems} />
        </PageSection>
      </SectionGroup>

      {/* 11 FAQ (single-open) */}
      <Faq title={faq.title} items={faq.items} single className="bg-white" />

      {/* 12 final CTA (stacked, left) */}
      <CtaBand
        title={final.title}
        body={final.body}
        align="start"
        dark
        className="bg-mulberry-100"
        titleClass="max-w-[792.7px]"
        ctas={[
          { label: final.cta1, variant: 'primary' },
          { label: final.cta2, variant: 'primaryOutline' },
        ]}
      />
    </>
  )
}
