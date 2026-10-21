import { MediaSlot } from './Media'

// Media "aside" card (spec 5.2, 5.3, 8). Layout classes are passed in as full
// static strings so Tailwind can see them.
//   layoutClass: flex direction per breakpoint (body + media)
//   mediaClass:  media width + aspect ratio per breakpoint
//   variant:     'default' (text-xsmall label + heading-xs body) |
//                'title' (agents.md 8c: heading-xs title + text-small body, gap 12/24)
export default function Aside({ tone = 'dark', bg, label, body, media, layoutClass, mediaClass, className = '', variant = 'default' }) {
  return (
    <aside
      className={`${tone === 'dark' ? 'ctx-dark' : 'ctx-light'} flex overflow-clip rounded-12 ${layoutClass} ${className}`}
      style={{ background: bg }}
    >
      {variant === 'title' ? (
        <div className="flex flex-1 flex-col gap-3 p-8">
          <p className="text-heading-xs text-fg">{label}</p>
          <div className="flex flex-col gap-6">
            <p className="text-small text-fg-sub">{body}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-3 p-8">
          <p className="text-xsmall text-fg-sub">{label}</p>
          <p className="text-heading-xs text-fg">{body}</p>
        </div>
      )}
      <MediaSlot id={media.id} art={media.art} bg={media.bg} className={`shrink-0 ${mediaClass}`} />
    </aside>
  )
}

// Layout presets: body beside media from sm (640) or from lg (1080) up.
export const rowFromSm = 'flex-col sm:flex-row sm:items-end'
export const rowFromLg = 'flex-col lg:flex-row lg:items-end'
