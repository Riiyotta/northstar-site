import { enterprise as e } from '../data/content'
import Button from './ui/Button'
import { MediaSlot } from './ui/Media'

// 9. Enterprise (dark). Columns split 5:7 (480/672 at 1440, 380/532 at 1024, 273/383 at 768).
export default function Enterprise() {
  return (
    <section className="ctx-dark bg-purple-100 py-section">
      <div className="content-wrapper flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-32">
        <div className="flex flex-col justify-center gap-6 sm:flex-[5_1_0%]">
          <p className="max-w-text text-large text-fg-sub">{e.eyebrow}</p>
          <h2 className="max-w-text text-heading-lg text-fg">{e.title}</h2>
          <p className="max-w-text text-medium text-fg-sub">{e.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" href="#">
              {e.cta}
            </Button>
            <Button variant="link" href="#" arrow>
              Learn more
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end sm:flex-[7_1_0%]">
          <MediaSlot id="media-enterprise" bg="#141413" className="aspect-[3/2] w-full sm:aspect-[1080/608]" />
        </div>
      </div>
    </section>
  )
}
