import { agent } from '../data/content'
import Intro from './ui/Intro'
import Aside, { rowFromSm } from './ui/Aside'
import FeatureTabs from './FeatureTabs'

// 5. Group A: "Agent" product (bg #f7f5f2). Grouped sections after the first
// have padding-top 0; non-last ones have padding-bottom = vp.
export default function AgentSection() {
  const [left, right] = agent.pair
  return (
    <>
      {/* 5.1 Intro */}
      <section className="ctx-light bg-neutral-5 py-section">
        <div className="content-wrapper">
          <Intro {...agent.intro} />
        </div>
      </section>

      {/* 5.2 Wide media aside */}
      <section className="ctx-light bg-neutral-5 pb-vp">
        <div className="content-wrapper">
          <Aside
            tone="dark"
            bg="#0c4243"
            {...agent.wide}
            media={{ id: 'media-agent-wide', bg: '#0c4243' }}
            layoutClass={rowFromSm}
            mediaClass="aspect-[1080/721] w-full sm:w-1/2 lg:aspect-[1440/617] lg:w-3/5"
          />
        </div>
      </section>

      {/* 5.3 Two asides (stack <1080; each aside is body+media row from 640) */}
      <section className="ctx-light bg-neutral-5 pb-vp">
        <div className="content-wrapper flex flex-col gap-vp lg:flex-row">
          <Aside
            className="lg:flex-1"
            tone="dark"
            bg="#421d24"
            {...left}
            media={{ id: 'media-agent-chat', bg: '#421d24' }}
            layoutClass={rowFromSm}
            mediaClass="aspect-[1080/721] w-full sm:w-1/2 lg:aspect-[6/5]"
          />
          <Aside
            className="lg:flex-1"
            tone="light"
            bg="#dedbd5"
            {...right}
            media={{ id: 'media-agent-app', bg: '#dedbd5' }}
            layoutClass={rowFromSm}
            mediaClass="aspect-[1080/721] w-full sm:w-1/2 lg:aspect-[6/5]"
          />
        </div>
      </section>

      {/* 5.4 Tabs */}
      <FeatureTabs />
    </>
  )
}
