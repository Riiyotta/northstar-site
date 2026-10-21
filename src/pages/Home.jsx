import Banner from '../components/Banner'
import Hero from '../components/Hero'
import LogoStrip from '../components/LogoStrip'
import AgentSection from '../components/AgentSection'
import Testimonial from '../components/Testimonial'
import InboxBento from '../components/InboxBento'
import PagesSection from '../components/PagesSection'
import Enterprise from '../components/Enterprise'
import FinalCta from '../components/FinalCta'

// Section order: CLONE_SPEC.md section 12
export default function Home() {
  return (
    <>
      <Banner />
      <Hero />
      <LogoStrip />
      <AgentSection />
      <Testimonial />
      <InboxBento />
      <PagesSection />
      <Enterprise />
      <FinalCta />
    </>
  )
}
