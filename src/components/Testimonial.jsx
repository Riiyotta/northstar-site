import { testimonial as t } from '../data/content'
import Button from './ui/Button'

// 6. Testimonial (homepage defaults).
// docs.md 9 variant: pass `quote` ({ text, name, role, link }) and a `logo`
// node (226x51 slot): logo on top, heading-lg quote with no bold span,
// name <br> role in text-sub, an extra 24px, then a caret link.
export default function Testimonial({ quote, logo }) {
  if (quote)
    return (
      <section className="ctx-light bg-purple-10 py-section">
        <div className="content-wrapper">
          <figure className="mx-auto flex max-w-text flex-col items-center gap-6 text-center">
            {logo}
            <blockquote>
              <h2 className="text-heading-lg text-fg">{quote.text}</h2>
            </blockquote>
            <figcaption className="text-medium text-fg-sub">
              {quote.name}
              <br />
              {quote.role}
            </figcaption>
            <Button variant="link" href="#" caret="right" className="mt-6">
              {quote.link}
            </Button>
          </figure>
        </div>
      </section>
    )

  return (
    <section className="ctx-light bg-purple-10 py-section">
      <div className="content-wrapper">
        <figure className="mx-auto flex max-w-text flex-col items-center gap-6 text-center">
          <blockquote>
            <h2 className="text-heading-md text-fg">
              {t.before}
              <span className="font-bold">{t.bold}</span>
              {t.after}
            </h2>
          </blockquote>
          <figcaption className="text-medium">
            <span className="block text-fg">{t.name}</span>
            <span className="block text-fg-sub">{t.role}</span>
          </figcaption>
          <Button variant="link" href="#" arrow>
            {t.cta}
          </Button>
        </figure>
      </div>
    </section>
  )
}
