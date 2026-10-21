import { inbox } from '../data/content'
import Intro from './ui/Intro'
import { MediaSlot } from './ui/Media'

function CardText({ label, body }) {
  return (
    <div className="flex max-w-[900px] flex-col gap-2">
      <p className="text-xsmall text-fg-sub">{label}</p>
      <h3 className="text-heading-xs text-fg">{body}</h3>
    </div>
  )
}

// 7. "Inbox" product section (bento)
export default function InboxBento() {
  const { cardA, cardB, cardC } = inbox
  return (
    <section className="ctx-light bg-neutral-5 py-section">
      <div className="content-wrapper">
        <div className="pb-20">
          <Intro {...inbox.intro} />
        </div>

        <div className="flex flex-col gap-vp lg:grid lg:grid-cols-[728fr_520fr]">
          {/* Card A: bleed media top, content pinned bottom */}
          <article className="ctx-dark flex flex-col gap-4 overflow-clip rounded-12 bg-purple-60 p-8 min-w-0">
            <MediaSlot id="media-inbox-drafts" bg="#714cb6" className="-mx-8 -mt-8 aspect-[1080/721]" />
            <div className="mt-auto">
              <CardText {...cardA} />
            </div>
          </article>

          <div className="flex min-w-0 flex-col gap-vp">
            {/* Card B: sized to its background image, content over it at the bottom */}
            <article className="ctx-dark grid overflow-clip rounded-12 bg-purple-100">
              <MediaSlot
                id="media-inbox-availability"
                bg="#281647"
                className="aspect-[1080/721] rounded-12 [grid-area:1/1] sm:aspect-[1080/478]"
              />
              <div className="relative self-end p-8 [grid-area:1/1]">
                <CardText {...cardB} />
              </div>
            </article>

            {/* Card C: bleed media top, then content */}
            <article className="ctx-light flex flex-col gap-4 overflow-clip rounded-12 bg-neutral-20 p-8">
              <MediaSlot
                id="media-inbox-split"
                bg="#dedbd5"
                className="-mx-8 -mt-8 aspect-[358/258.8] sm:aspect-[1080/486]"
              />
              <CardText {...cardC} />
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
