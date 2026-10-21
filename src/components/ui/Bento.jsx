import { MediaSlot } from './Media'

// agents.md 8b: generalized bento (same card mechanics as the homepage
// InboxBento). Two-column 7/5 spans from 640 (gap vp), stacked below.
// Card: radius 12, padding 32, gap 16, clip; media bleeds to the top edge
// (margin -32 -32 0); content (gap 8) h3 heading-xs + p text-small.
// Card A fills the left column with its content pinned to the bottom; the
// right column's cards stretch to fill its height.
function Card({ card, pin = false, className = '' }) {
  return (
    <article
      className={`${card.dark ? 'ctx-dark' : 'ctx-light'} flex min-w-0 flex-col gap-4 overflow-clip rounded-12 p-8 ${className}`}
      style={{ background: card.bg }}
    >
      <MediaSlot id={card.media.id} art={card.media.art} bg={card.media.bg} className={`-mx-8 -mt-8 ${card.media.aspect}`} />
      <div className={`flex flex-col gap-2 ${pin ? 'mt-auto' : ''}`}>
        <h3 className="text-heading-xs text-fg">{card.title}</h3>
        <p className="text-small text-fg-sub">{card.body}</p>
      </div>
    </article>
  )
}

export default function Bento({ main, side }) {
  return (
    <div className="flex flex-col gap-vp sm:grid sm:grid-cols-[7fr_5fr]">
      <Card card={main} pin />
      <div className="flex min-w-0 flex-col gap-vp">
        {side.map((c) => (
          <Card key={c.title} card={c} className="sm:flex-1" />
        ))}
      </div>
    </div>
  )
}
