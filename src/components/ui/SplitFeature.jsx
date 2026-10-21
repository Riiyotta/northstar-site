import BulletList from './BulletList'
import Button from './Button'
import { MediaSlot } from './Media'
import TwoColumn, { Column } from './TwoColumn'

// enterprise.md 4-7, 9, 14: title-description block beside a cover media slot.
// titleSize: 'md' (heading-medium) | 'lg' (heading-large).
// media: { id, art?, bg, className } where className sets aspect/radius.
// mediaFirst: media column first in the DOM (left on desktop, top when stacked).
// Product-page extensions (mail.md 8, docs.md 4/10, agents.md 4/6/7):
//   gap:       TwoColumn gap ('M' | 'L' | 'vp')
//   subtitle:  heading-small p under the h2 (mail.md 8)
//   body:      string or array of paragraphs; bodyClass sets their type role
//   mediaLeft: media on the left from 640 up, but text first when stacked
//   mediaNode: custom media (replaces the MediaSlot figure)
//   linkStretch: <640 the link fills its (90vw-capped) paragraph, label centred
//   spacer:    trailing empty text block (one more 24px gap), as measured on
//              enterprise.md 6
export default function SplitFeature({
  title,
  titleSize = 'md',
  subtitle,
  body,
  bodyClass = 'text-medium',
  bullets,
  link,
  media,
  mediaNode,
  mediaFirst = false,
  mediaLeft = false,
  gap = 'M',
  linkStretch = true,
  spacer = false,
}) {
  const paragraphs = body == null ? [] : Array.isArray(body) ? body : [body]
  const text = (
    <Column key="text">
      <div className="flex flex-col gap-6">
        <h2 className={`text-balance text-fg ${titleSize === 'lg' ? 'text-heading-lg' : 'text-heading-md'}`}>{title}</h2>
        {subtitle && <p className="text-heading-sm text-fg">{subtitle}</p>}
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-pretty text-fg-sub ${bodyClass}`}>
            {p}
          </p>
        ))}
        {bullets && <BulletList items={bullets} />}
        {link && (
          <p>
            <Button variant="link" href={link.href ?? '#'} caret="right" className={linkStretch ? 'max-sm:w-full' : ''}>
              {link.label}
            </Button>
          </p>
        )}
        {spacer && <span aria-hidden="true" className="block" />}
      </div>
    </Column>
  )
  const mediaCol = (
    <Column key="media" className={mediaLeft ? 'sm:order-first' : ''}>
      {mediaNode ?? (
        <figure>
          <MediaSlot id={media.id} art={media.art} bg={media.bg} className={`w-full ${media.className ?? ''}`} />
        </figure>
      )}
    </Column>
  )
  return (
    <TwoColumn from="sm" gap={gap}>
      {mediaFirst ? [mediaCol, text] : [text, mediaCol]}
    </TwoColumn>
  )
}
