import LogoStrip, { LogoGrid } from '../components/LogoStrip'
import BadgePlaceholder from '../components/enterprise/BadgePlaceholder'
import FaqAccordion from '../components/enterprise/FaqAccordion'
import SecurityIcon from '../components/enterprise/SecurityIcon'
import SplitHero from '../components/enterprise/SplitHero'
import { builder, ctaBand, features, finalCta, intro, logosIntro, quotes, resources, security } from '../data/enterprise'
import { illustrations } from '../illustrations'
import Button from '../components/ui/Button'
import CardGrid from '../components/ui/CardGrid'
import CtaBand from '../components/ui/CtaBand'
import IconFeatureGrid from '../components/ui/IconFeatureGrid'
import Intro from '../components/ui/Intro'
import PageSection, { SectionGroup } from '../components/ui/PageSection'
import QuoteGrid from '../components/ui/QuoteGrid'
import SplitFeature from '../components/ui/SplitFeature'

// 2: six white wordmarks (reusing the homepage's invented logo-1..6 art).
const LOGO_IDS = Array.from({ length: 6 }, (_, i) => `ent-logo-${i + 1}`)
const logoArt = (id) => {
  const Logo = illustrations[`logo-${id.split('-').pop()}`]
  return <Logo color="#ffffff" opacity={1} />
}

// 12: two static 6-cell compliance grids (spec placeholders).
const BADGES_A = Array.from({ length: 6 }, (_, i) => `ent-badge-${i + 1}`)
const BADGES_B = Array.from({ length: 6 }, (_, i) => `ent-badge-${i + 7}`)
const badgeArt = (id) => <BadgePlaceholder n={id.split('-').pop()} />

// 16: white customer wordmarks (homepage logo-7 / logo-8 art).
const quoteItems = quotes.items.map((q) => {
  const Logo = illustrations[q.logo.art ?? q.logo.id]
  return {
    ...q,
    logo: (
      <span data-asset={q.logo.id} aria-hidden="true" className="block h-full w-full">
        <Logo color="#ffffff" opacity={1} />
      </span>
    ),
  }
})

const securityItems = security.items.map((it, i) => ({ ...it, icon: <SecurityIcon index={i} /> }))

// /enterprise (no Banner). Section order: enterprise.md 0.
export default function EnterprisePage() {
  return (
    <>
      {/* G1 hero + logos */}
      <SectionGroup dark className="bg-purple-100">
        <SplitHero />
        <PageSection>
          <LogoStrip variant="enterprise" intro={logosIntro} ids={LOGO_IDS} renderArt={logoArt} />
        </PageSection>
      </SectionGroup>

      {/* G2 intro + 4 feature rows */}
      <SectionGroup className="bg-white">
        <PageSection>
          <Intro title={intro.title} body={intro.body} className="[&>p]:text-balance" />
        </PageSection>
        {features.map((f, i) => (
          <PageSection key={f.title}>
            <SplitFeature {...f} spacer={i === 2} />
          </PageSection>
        ))}
      </SectionGroup>

      {/* 8 */}
      <CtaBand title={ctaBand.title} cta={ctaBand.cta} className="bg-neutral-10" />

      {/* 9 */}
      <SectionGroup className="bg-white">
        <PageSection>
          <SplitFeature {...builder} />
        </PageSection>
      </SectionGroup>

      {/* G3 security */}
      <SectionGroup dark className="bg-green-90">
        <PageSection>
          <Intro title={security.title} body={security.body} />
        </PageSection>
        <PageSection>
          <IconFeatureGrid items={securityItems} />
        </PageSection>
        <PageSection className="flex flex-col items-center">
          <LogoGrid ids={BADGES_A} renderArt={badgeArt} className="mt-9 max-w-[649px] lg:mt-10 lg:max-w-none" logoClass="w-full" />
          <LogoGrid ids={BADGES_B} renderArt={badgeArt} className="mt-9 max-w-[649px] lg:mt-10 lg:max-w-none" logoClass="w-full" />
          <p className="mt-6 flex w-full justify-center">
            <Button variant="link" href="#" caret="right">
              {security.link}
            </Button>
          </p>
        </PageSection>
      </SectionGroup>

      {/* G4 resources */}
      <SectionGroup className="bg-purple-10">
        <PageSection>
          <Intro title={resources.title} />
        </PageSection>
        <PageSection>
          <SplitFeature {...resources.report} titleSize="lg" mediaFirst />
        </PageSection>
        <PageSection>
          <CardGrid items={resources.cards} />
        </PageSection>
      </SectionGroup>

      {/* 16 quotes */}
      <SectionGroup dark className="bg-purple-100">
        <PageSection>
          <Intro title={quotes.title} className="pb-20" />
          <QuoteGrid items={quoteItems} />
        </PageSection>
      </SectionGroup>

      {/* 17 */}
      <FaqAccordion />

      {/* 18 final CTA (left-aligned, same mulberry as the footer) */}
      <CtaBand {...finalCta} align="start" dark className="bg-mulberry-100" />
    </>
  )
}
