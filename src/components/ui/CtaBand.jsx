import Button from './Button'
import { MediaSlot } from './Media'
import PageSection, { SectionGroup } from './PageSection'

// enterprise.md 8 (CtaBand, centred h2 + button) and 18 (CtaBlock,
// left-aligned h2 + p + button). Colours follow the section context.
// Product-page extensions:
//   ctas:        [{ label, variant }] CTA group (mail.md 11, docs.md 12, agents.md 12)
//   headingSize: 'lg' (default) | 'md' (go.md 6/11)
//   layout:      'stack' (default) | 'split' (go.md 6/11: h2 left, button right,
//                spans `split` = '8/4' | '6/6', gap vp; stacked <640 with a
//                full-width button)
//   bgArt:       { id, art?, bg } absolutely positioned cover art behind the content
//   sectionClass: extra classes on the PageSection (e.g. go.md rails)
//   titleClass:  extra classes on the title block (width caps)
const SPLIT_LEFT = { '8/4': 'sm:flex-[2_1_0%]', '6/6': 'sm:flex-[1_1_0%]' }

export default function CtaBand({
  title,
  body,
  cta,
  ctas,
  align = 'center',
  dark = false,
  className = '',
  headingSize = 'lg',
  layout = 'stack',
  split = '8/4',
  bgArt,
  sectionClass = '',
  titleClass = '',
}) {
  const center = align === 'center'
  const heading = headingSize === 'md' ? 'text-heading-md' : 'text-heading-lg'
  const group = ctas ?? [{ label: cta, variant: 'primary' }]
  return (
    <SectionGroup dark={dark} className={`${bgArt ? 'relative' : ''} ${className}`}>
      {bgArt && <MediaSlot id={bgArt.id} art={bgArt.art} bg={bgArt.bg} className="!absolute inset-0" />}
      <PageSection className={`${bgArt ? 'relative' : ''} ${sectionClass}`}>
        {layout === 'split' ? (
          <div className="flex flex-col gap-vp sm:flex-row sm:items-center">
            <h2 className={`min-w-0 flex-[1_1_0%] text-fg ${heading} ${SPLIT_LEFT[split]}`}>{title}</h2>
            <div className="flex min-w-0 flex-[1_1_0%] flex-col sm:items-end">
              {group.map((c) => (
                <Button key={c.label} variant={c.variant ?? 'primary'} href="#" className="w-full sm:w-auto">
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'items-start'} ${titleClass}`}>
            <h2 className={`max-w-text text-balance text-fg ${heading}`}>{title}</h2>
            {body && <p className="max-w-text text-medium text-fg-sub">{body}</p>}
            {ctas ? (
              <div className="mt-6 flex flex-row gap-4">
                {ctas.map((c) => (
                  <Button key={c.label} variant={c.variant ?? 'primary'} href="#">
                    {c.label}
                  </Button>
                ))}
              </div>
            ) : (
              <Button variant="primary" href="#" className={body ? 'mt-6' : ''}>
                {cta}
              </Button>
            )}
          </div>
        )}
      </PageSection>
    </SectionGroup>
  )
}
