import ChapterIntro, { ChapterStack } from '../components/go/ChapterIntro'
import StickyFeatureRow from '../components/go/StickyFeatureRow'
import CtaBand from '../components/ui/CtaBand'
import Faq from '../components/ui/Faq'
import HelperCard from '../components/ui/HelperCard'
import { MediaSlot } from '../components/ui/Media'
import PageSection, { SectionGroup } from '../components/ui/PageSection'
import ProductHero from '../components/ui/ProductHero'
import { band, ch1, ch2, ch3, ch4, ch5, faq, final, hero } from '../data/go'

// go.md 0.2: every main section draws the dashed rails; chapter starts add
// the top line. Page bg #f7f5f2 comes from the route (header.bg).
const RAILS = 'cutout'
const CHAPTER = 'cutout cutout-top'

function FeatureRows({ rows }) {
  return rows.map((r) => (
    <PageSection key={r.media.id} className={RAILS}>
      <StickyFeatureRow {...r} />
    </PageSection>
  ))
}

// /go (no Banner). Section order: go.md 2.
export default function Go() {
  return (
    <>
      {/* 3 hero */}
      <SectionGroup>
        <ProductHero
          className={RAILS}
          lockup={{ id: 'lockup-assistant', product: 'Assistant', width: 195 }}
          lines={[hero.h1]}
          lede={hero.lede}
          cta={hero.cta}
          titleClass="w-full"
          video={{
            id: 'go-hero-video',
            art: 'hero-video-2',
            bg: '#4d3371',
            className: 'aspect-video w-full',
            control: 'inside',
            controlColor: '#ffffff',
            stroke: 1.5,
            caption: 'Assistant demo',
          }}
        />
      </SectionGroup>

      {/* 4 chapter 01 */}
      <SectionGroup>
        <PageSection className={CHAPTER}>
          <ChapterIntro {...ch1} />
        </PageSection>
        <FeatureRows rows={ch1.rows} />
      </SectionGroup>

      {/* 5 chapter 02: helper cards */}
      <SectionGroup>
        <PageSection className={`${CHAPTER} pb-vp`}>
          <ChapterIntro {...ch2} />
        </PageSection>
        <PageSection className={`${RAILS} pb-vp`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {ch2.row1.map((c) => (
              <HelperCard key={c.title} {...c} iconClass="size-[69px]" />
            ))}
          </div>
        </PageSection>
        <PageSection className={RAILS}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {ch2.row2.map((c) => (
              <HelperCard key={c.title} {...c} iconClass="size-16" iconBg="#dedbd5" />
            ))}
          </div>
        </PageSection>
      </SectionGroup>

      {/* 6 CTA band (lavender) */}
      <CtaBand
        title={band.title}
        layout="split"
        split="8/4"
        headingSize="md"
        cta={band.cta}
        bgArt={{ id: 'cta-band-bg', bg: '#e8e0ff' }}
        className="bg-purple-10"
        sectionClass={RAILS}
      />

      {/* 7 chapter 03: connectors */}
      <SectionGroup>
        <PageSection className={`${CHAPTER} pb-vp`}>
          <ChapterIntro {...ch3} />
        </PageSection>
        <PageSection className={RAILS}>
          <MediaSlot id="connectors-strip" bg="#f2f0eb" className="aspect-[390/198] w-full sm:aspect-[1440/195]" />
        </PageSection>
      </SectionGroup>

      {/* 8 chapter 04 */}
      <SectionGroup>
        <PageSection className={CHAPTER}>
          <ChapterIntro {...ch4} reversed />
        </PageSection>
        <FeatureRows rows={ch4.rows} />
      </SectionGroup>

      {/* 9 chapter 05: trust */}
      <SectionGroup>
        <PageSection className={CHAPTER}>
          <div className="flex flex-col gap-vp sm:flex-row">
            <div className="flex min-w-0 flex-[1_1_0%] flex-col justify-center">
              <ChapterStack {...ch5} />
            </div>
            <figure className="flex min-w-0 flex-[1_1_0%] flex-col justify-center">
              <MediaSlot {...ch5.media} className={`w-full ${ch5.media.className}`} />
            </figure>
          </div>
        </PageSection>
      </SectionGroup>

      {/* 10 FAQ (single-open) */}
      <Faq
        title={faq.title}
        items={faq.items}
        single
        sectionClass={RAILS}
      />

      {/* 11 final CTA (dark green) */}
      <CtaBand
        title={final.title}
        layout="split"
        split="6/6"
        headingSize="md"
        dark
        ctas={[{ label: final.cta, variant: 'secondaryFilled' }]}
        bgArt={{ id: 'final-cta-bg', bg: '#0c4243' }}
        className="bg-green-90"
        sectionClass={RAILS}
      />
    </>
  )
}
