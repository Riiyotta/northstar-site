import { testimonials as t } from '../../data/plans'
import { illustrations } from '../../illustrations'
import { MediaSlot } from '../ui/Media'

// Company wordmarks reuse three of the homepage's invented logos, in white.
const COMPANY_ART = ['testimonial-company-1', 'testimonial-company-2', 'testimonial-company-3']

// plans.md 2: dark-blue 3-up testimonials with portraits and serif quotes.
export default function TestimonialTrio() {
  return (
    <section className="ctx-dark bg-blue-90">
      <div className="content-wrapper flex flex-col items-center gap-12 py-section [--content-max:1208px] sm:gap-20">
        <h3 className="max-w-text text-balance text-center text-heading-md text-fg">{t.title}</h3>
        <div className="flex w-full flex-col gap-12 sm:flex-row sm:gap-[72px]">
          {t.items.map((it, i) => {
            const Logo = illustrations[COMPANY_ART[i]]
            return (
              <figure key={it.name} className="flex flex-[1_1_0%] flex-col gap-4">
                <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                  <MediaSlot id={`testimonial-portrait-${i + 1}`} bg={it.portraitBg} className="size-[75px] shrink-0 rounded-full" />
                  <span
                    data-asset={`testimonial-company-${i + 1}`}
                    aria-hidden="true"
                    className="block shrink-0"
                    style={{ width: it.company.w, height: it.company.h }}
                  >
                    <Logo color="#ffffff" opacity={1} />
                  </span>
                </div>
                <blockquote className="relative font-serif text-serif-quote text-fg before:absolute before:end-full before:top-0 before:me-px before:content-['“']">
                  {it.quote}
                </blockquote>
                <figcaption>
                  <span className="block text-menu-title text-fg">{it.name}</span>
                  <span className="block font-serif text-serif-small text-fg">{it.role}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
