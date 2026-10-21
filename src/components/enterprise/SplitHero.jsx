import { hero } from '../../data/enterprise'
import Button from '../ui/Button'
import { MediaSlot } from '../ui/Media'
import PageSection from '../ui/PageSection'
import TwoColumn, { Column } from '../ui/TwoColumn'

const ENTERPRISE_MEDIA = { id: 'ent-hero', bg: '#281647', className: 'aspect-[1080/990]' }

// enterprise.md 1: mediumSingleCol (row from 1080). Text column: header
// (eyebrow h1, display title, lede; gap 24 / 12 <640) + CTA row (mt 16).
// agents.md 3a: same layout with no eyebrow (the title becomes the h1), a
// two-button CTA row (both stretch <640) and its own media slot. Props
// default to the /enterprise content.
export default function SplitHero({
  eyebrow = hero.eyebrow,
  title = hero.title,
  body = hero.body,
  ctas = [{ label: hero.cta, variant: 'primary' }],
  media = ENTERPRISE_MEDIA,
}) {
  const Title = eyebrow ? 'h2' : 'h1'
  return (
    <PageSection>
      <TwoColumn from="lg">
        <Column>
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3 sm:gap-6">
              {eyebrow && <h1 className="max-w-text text-balance text-medium text-fg-sub">{eyebrow}</h1>}
              <Title className="max-w-text text-balance text-display-sm text-fg">{title}</Title>
              <p className="max-w-text text-pretty text-large text-fg-sub">{body}</p>
            </header>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {ctas.map((c) => (
                <Button key={c.label} variant={c.variant} href="#" className="w-full sm:w-auto">
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </Column>
        <Column>
          <figure>
            <MediaSlot id={media.id} art={media.art} bg={media.bg} className={`w-full ${media.className}`} />
          </figure>
        </Column>
      </TwoColumn>
    </PageSection>
  )
}
