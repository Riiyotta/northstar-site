import { pages } from '../data/content'
import Intro from './ui/Intro'
import Aside, { rowFromLg, rowFromSm } from './ui/Aside'

// 8. Group B: "Pages" product (bg #f7f5f2). Same building blocks as section 5.
export default function PagesSection() {
  const [left, right] = pages.pair
  return (
    <>
      <section className="ctx-light bg-neutral-5 py-section">
        <div className="content-wrapper">
          <Intro {...pages.intro} />
        </div>
      </section>

      <section className="ctx-light bg-neutral-5 pb-vp">
        <div className="content-wrapper">
          <Aside
            tone="light"
            bg="#dedbd5"
            {...pages.wide}
            media={{ id: 'media-pages-wide', bg: '#dedbd5' }}
            layoutClass={rowFromSm}
            mediaClass="aspect-[1080/721] w-full sm:w-1/2 lg:aspect-[1440/628] lg:w-3/5"
          />
        </div>
      </section>

      {/* Two asides side-by-side from 640 ("smallSingleColumn"); media below text until 1080 */}
      <section className="ctx-light bg-neutral-5 pb-section">
        <div className="content-wrapper flex flex-col gap-vp sm:flex-row">
          <Aside
            className="sm:flex-1"
            tone="light"
            bg="#e8e0ff"
            {...left}
            media={{ id: 'media-pages-ai', bg: '#e8e0ff' }}
            layoutClass={rowFromLg}
            mediaClass="aspect-[1080/721] w-full lg:aspect-[1080/758] lg:w-1/2"
          />
          <Aside
            className="sm:flex-1"
            tone="dark"
            bg="#421d24"
            {...right}
            media={{ id: 'media-pages-connect', bg: '#421d24' }}
            layoutClass={rowFromLg}
            mediaClass="aspect-[1080/721] w-full lg:aspect-[1080/911] lg:w-1/2"
          />
        </div>
      </section>
    </>
  )
}
