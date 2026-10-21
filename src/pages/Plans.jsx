import LogoStrip from '../components/LogoStrip'
import PlanCards from '../components/plans/PlanCards'
import PlanComparison from '../components/plans/PlanComparison'
import SuiteIntro from '../components/plans/SuiteIntro'
import TestimonialTrio from '../components/plans/TestimonialTrio'
import { trustedHeading } from '../data/plans'
import { illustrations } from '../illustrations'

const COMPARE_ID = 'compare-plans'

// plans.md 1c: the 11 homepage logos, drawn as #303030 wordmarks (manifest).
const plansLogo = (id) => {
  const Logo = illustrations[id]
  return Logo ? <Logo color="#303030" opacity={1} /> : null
}

// plans.md 1b: native smooth scroll to the top of the comparison.
const scrollToCompare = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(COMPARE_ID)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}

// /plans (no Banner). main: --content-max-width 1440px, min-width 23.5rem.
export default function Plans() {
  return (
    <div className="min-w-[23.5rem] [--content-max:1440px]">
      <section className="ctx-light flex flex-col bg-plans-top px-6 sm:px-8 lg:px-20">
        <SuiteIntro />
        <PlanCards onCompare={scrollToCompare} />
        <LogoStrip variant="plans" intro={trustedHeading} renderArt={plansLogo} />
      </section>
      <TestimonialTrio />
      <PlanComparison id={COMPARE_ID} />
    </div>
  )
}
