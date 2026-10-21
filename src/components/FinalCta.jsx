import { finalCta } from '../data/content'
import Button from './ui/Button'
import { CtaBackground } from '../illustrations'

// 10. Final CTA band
export default function FinalCta() {
  return (
    <section className="ctx-dark relative overflow-hidden bg-purple-100 py-section">
      {/* bg-cta: the gradient is the static fallback; CtaBackground (absolute,
          inset 0, CSS loops, stopped under reduced motion) stands in for the GIF. */}
      <div
        data-asset="bg-cta"
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(120deg, #281647 0%, #533192 50%, #281647 100%)' }}
      >
        <CtaBackground />
      </div>
      <div className="content-wrapper relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center sm:gap-0">
        <h2 className="max-w-text text-heading-lg text-fg">{finalCta.title}</h2>
        <div className="flex flex-col sm:items-end">
          <Button variant="primaryOutline" href="#" className="w-full sm:w-auto">
            {finalCta.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
