import { useEffect, useState } from 'react'
import { plans } from '../../data/plans'
import Button from '../ui/Button'

// plans.md 3.6: fixed copy of the plan header (>=1080 only). Slides in
// (translateY(-110%) -> 0, .3s ease-in-out) once the in-flow table header's
// top reaches 71px from the viewport top, and out again once the bottom of
// the accordion rises to 170px. Bidirectional.
const SHOW_AT = 71
const HIDE_AT = 170

export default function FloatingPlanHeader({ headRef, endRef }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const head = headRef.current
      const end = endRef.current
      if (!head || !end) return
      setVisible(head.getBoundingClientRect().top <= SHOW_AT && end.getBoundingClientRect().bottom > HIDE_AT)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // Collapsing/expanding groups moves the accordion bottom without a scroll.
    const ro = new ResizeObserver(update)
    ro.observe(endRef.current)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [headRef, endRef])

  return (
    <div
      aria-hidden={!visible}
      {...(visible ? {} : { inert: '' })}
      className={`fixed inset-x-0 top-0 z-floating-header hidden h-[201px] justify-center bg-neutral-10 shadow-medium transition-transform duration-slow ease-in-out lg:flex ${
        visible ? 'translate-y-0' : '-translate-y-[110%]'
      }`}
    >
      <div className="flex w-[1080px] justify-end">
        <div className="flex-1" />
        {plans.map((p) => (
          <div key={p.key} className="flex w-[170px] flex-col gap-2 px-2 py-4">
            <p className="text-left text-float-name text-fg">{p.name}</p>
            {/* measured: price + cadence share one 75px block (no gap) */}
            <div className="min-h-[75px]">
              <p className="text-medium text-fg">{p.price}</p>
              <p className="text-small text-fg-sub">{p.cadence}</p>
            </div>
            <Button
              variant={p.highlight ? 'primaryMid' : 'primaryOutlineMid'}
              href="#"
              tabIndex={visible ? undefined : -1}
              className="w-full min-w-[120px]"
            >
              {p.floatCta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
