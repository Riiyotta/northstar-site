import Button from './Button'
import { Lockup } from './Media'

// 5.1 title-description block (also used by 7 and 8).
// CTA group: gap 16, margin-top 24 (spec 0.3) on top of the 24px stack gap.
// lockup, body and cta are optional (enterprise.md "SectionIntro").
// Product-page extensions (mail.md / docs.md / agents.md):
//   media:      node rendered first (lockup slot or a figure, mail.md 7)
//   titleAs:    'h2' (default) | 'h1'; titleClass overrides the type role
//   body:       string or array of paragraphs
//   ctas:       [{ label, variant }] button group instead of `cta`
//   ctaClass:   extra classes for the CTA group (e.g. stretch on mobile)
export default function Intro({
  lockup,
  media,
  title,
  titleSub,
  titleAs: Title = 'h2',
  titleClass = 'text-heading-lg',
  body,
  cta,
  ctas,
  ctaClass = '',
  className = '',
}) {
  const paragraphs = body == null ? [] : Array.isArray(body) ? body : [body]
  return (
    <div className={`flex flex-col items-center gap-6 text-center ${className}`}>
      {lockup && <Lockup {...lockup} />}
      {media}
      <Title className={`max-w-text text-fg ${titleClass}`}>
        {title}
        {titleSub && (
          <>
            {' '}
            <span className="text-fg-sub">{titleSub}</span>
          </>
        )}
      </Title>
      {paragraphs.map((p, i) => (
        <p key={i} className="max-w-text text-medium text-fg-sub">
          {p}
        </p>
      ))}
      {cta && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" href="#">
            {cta}
          </Button>
          <Button variant="link" href="#" arrow>
            Learn more
          </Button>
        </div>
      )}
      {ctas && (
        <div className={`mt-6 flex items-center justify-center gap-4 ${ctaClass}`}>
          {ctas.map((c) => (
            <Button key={c.label} variant={c.variant ?? 'primary'} href="#" className={c.className ?? ''}>
              {c.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
