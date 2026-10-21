import Button from './Button'
import { MediaSlot } from './Media'

// Column count classes (static strings so Tailwind sees them).
const COLS = { 2: '[--_columns:2]', 3: '[--_columns:3]', 4: '[--_columns:4]' }

// enterprise.md 15: 4 cols when the container is >=640 wide, 1 below.
// Card: 3:2 cover image (max 296 wide, does not stretch on mobile),
// heading-small h2, primaryLink + caret (gap 24). No card bg or border.
// Variants:
//   'media' (default): enterprise.md 15 (above)
//   'caption':  mail.md 9 - full-width media + heading-xs caption p, text-sub
//   'detail':   docs.md 7 - full-width media, heading-sm h2, text-medium body,
//               optional caret link
export default function CardGrid({ items, variant = 'media', columns = 4 }) {
  return (
    <div className="multi-column">
      <div className={`multi-column-grid ${COLS[columns]}`}>
        {items.map((it) => {
          const media = (
            <MediaSlot
              id={it.media.id}
              art={it.media.art}
              bg={it.media.bg}
              className={`w-full ${it.media.className ?? 'aspect-[3/2]'}`}
            />
          )
          if (variant === 'caption')
            return (
              <div key={it.title} className="flex flex-col gap-6">
                <figure>{media}</figure>
                <p className="text-heading-xs text-fg-sub">{it.title}</p>
              </div>
            )
          if (variant === 'detail')
            return (
              <div key={it.title} className="flex flex-col items-start gap-6">
                <figure className="w-full">{media}</figure>
                <h2 className="text-heading-sm text-fg">{it.title}</h2>
                {it.body && <p className="text-pretty text-medium text-fg-sub">{it.body}</p>}
                {it.cta && (
                  <p className="w-full">
                    <Button variant="link" href={it.href ?? '#'} caret="right" className="max-sm:w-full">
                      {it.cta}
                    </Button>
                  </p>
                )}
              </div>
            )
          return (
            <div key={it.title} className="flex flex-col items-start gap-6">
              <figure className="w-full max-w-[296px]">{media}</figure>
              <h2 className="text-heading-sm text-fg">{it.title}</h2>
              <p className="w-full">
                <Button variant="link" href={it.href ?? '#'} caret="right" className="max-sm:w-full">
                  {it.cta}
                </Button>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
