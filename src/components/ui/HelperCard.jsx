import Button from './Button'
import { MediaSlot } from './Media'

// HelperCard (go.md 5, agents.md 5b): flex-col, gap 16, padding 32, clip.
//   bordered: #f2f0eb, 1px border-sub, radius 0; content top-aligned. An
//             optional gradient `band` image is pinned to the top behind it.
//   white:    #fff, radius 12, no border; content pinned to the bottom.
// No hover state on the card (only the link). iconClass sets the tile size.
// Link row: white cards keep the original's empty <p> spacers (8px above and
// below the link; agents.md card 4 has no spacer above, `spacerBefore`);
// bordered cards stretch the link <640.
export default function HelperCard({
  variant = 'bordered',
  title,
  body,
  link,
  icon,
  iconClass,
  iconBg = '#ffffff',
  band,
  spacerBefore = true,
}) {
  const white = variant === 'white'
  return (
    <div
      className={`relative flex flex-col gap-4 overflow-clip p-8 ${
        white ? 'rounded-12 bg-white' : 'border border-line-sub bg-neutral-10'
      }`}
    >
      {band && (
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
          <MediaSlot id={band.id} bg={band.bg} className={`w-full ${band.aspect}`} />
        </div>
      )}
      <MediaSlot id={icon} bg={iconBg} className={`relative shrink-0 ${iconClass}`} />
      <div className={`relative flex flex-col items-start gap-2 ${white ? 'mt-auto' : ''}`}>
        <h3 className="text-heading-xs text-fg">{title}</h3>
        <p className="text-small text-fg-sub">{body}</p>
        {link && (
          <p className={white ? `${spacerBefore ? 'mt-2' : ''} mb-2` : 'self-stretch'}>
            <Button variant="link" href="#" caret="right" className={white ? '' : 'max-sm:w-full'}>
              {link}
            </Button>
          </p>
        )}
      </div>
    </div>
  )
}
