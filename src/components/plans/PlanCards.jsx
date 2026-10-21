import { compareCta, highlightLabel, plans } from '../../data/plans'
import Button from '../ui/Button'
import ProductGlyph from './ProductGlyph'

// plans.md 1b. Seams >=640 make the 4 cards read as one joined table; <640
// they stack (highlighted first, free tier last) as separate rounded cards.
const SEAMS = [
  'rounded-8 sm:rounded-r-none sm:border-r-0', // first
  'rounded-8 sm:rounded-none sm:border-r-0', // middle, before the highlighted card
  '', // highlighted (see HIGHLIGHT)
  'rounded-8 sm:rounded-l-none sm:border-l-0', // last, follows the highlighted card
]
const HIGHLIGHT = 'relative z-[1] rounded-b-8 border-line-base bg-accent-subdued shadow-elevation-large sm:rounded-none'
const NORMAL = 'border-line-sub bg-white'

const ORDER = { free: 'order-1 sm:order-none' } // <640: highlighted -1, free 1, others 0

function PlanCard({ plan, index }) {
  const hl = plan.highlight
  return (
    <div className={`flex flex-col items-center ${hl ? '-order-1 sm:order-none' : (ORDER[plan.tier] ?? '')}`}>
      <div
        className={`flex h-9 w-full items-center justify-center rounded-t-8 text-caption ${
          hl ? 'border border-b-0 border-neutral-90 bg-neutral-90 text-white' : ''
        }`}
      >
        {hl ? highlightLabel : null}
      </div>
      <div
        className={`flex h-full w-full max-w-[480px] flex-col items-start gap-6 border px-3 py-6 font-medium text-fg lg:px-6 ${
          hl ? HIGHLIGHT : `${NORMAL} ${SEAMS[index]}`
        }`}
      >
        <div className="flex flex-col gap-4 sm:min-h-[174px] lg:min-h-[134px] xl:min-h-[108px]">
          <h2 className="text-balance text-plan-name sm:text-plan-name-md lg:text-plan-name">{plan.name}</h2>
          <p className="text-pretty text-plan-desc-sm xl:text-plan-desc">{plan.description}</p>
        </div>
        <div className="flex flex-col gap-1 sm:min-h-[120px]">
          <h3 className="text-plan-price sm:text-plan-price-md lg:text-plan-price">{plan.price}</h3>
          <p className="min-h-[22px] text-caption text-fg-sub">{plan.cadence}</p>
          {plan.monthly && (
            <p className="h-[18px] text-[12px] leading-[18px]">
              <strong className="font-bold">{plan.monthly}</strong> <span className="font-medium">when billed monthly</span>
            </p>
          )}
        </div>
        <Button
          variant={hl ? 'primary' : 'primaryOutline'}
          href="#"
          className={`!h-[52px] w-full !whitespace-normal !px-3 !py-px text-center ${hl ? '' : 'hover:text-action-hover'}`}
        >
          {plan.cta}
        </Button>
        <div className="flex w-full flex-col gap-4">
          <ul className="flex flex-col gap-3 sm:min-h-[120px]">
            {plan.products.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <ProductGlyph product={p} size={20} />
                <span className="text-product-name capitalize">{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-includes text-fg">{plan.includes}</p>
          <ul className="check-list flex flex-col gap-3 ps-6">
            {plan.features.map((f) => (
              <li key={f} className="leading-[10px] marker:text-[14px]">
                <span className="align-super text-[14px] font-medium text-fg">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function PlanCards({ onCompare }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 pt-16">
      <div className="flex w-full flex-wrap items-stretch justify-around sm:flex-nowrap">
        {plans.map((plan, i) => (
          <PlanCard key={plan.key} plan={plan} index={i} />
        ))}
      </div>
      <Button variant="primaryGhost" caret="down" onClick={onCompare} className="mb-6 hidden lg:inline-flex">
        {compareCta}
      </Button>
    </div>
  )
}
