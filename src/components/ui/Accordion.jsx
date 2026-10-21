import { useId, useState } from 'react'
import { CaretSmallDown } from './Icons'

// Shared accordion (plans.md 3.3, enterprise.md 17).
// Panel: height 0 <-> content + opacity 0 <-> 1, .2s ease. Height animates via
// grid-template-rows 0fr <-> 1fr (same visual result as the original's
// `interpolate-size: allow-keywords` height:auto, but it works in every
// browser). Caret rotates -180deg, .2s ease. Both only under no-preference.
const VARIANTS = {
  // /plans comparison groups: 32/40 label, 12px block padding, hover tint,
  // expanded trigger gets a border-base underline.
  compare: {
    trigger:
      'py-3 hover:bg-hover-tint focus-visible:rounded-8 focus-visible:outline-2 focus-visible:outline-action focus-visible:-outline-offset-[5px]',
    triggerOpen: 'border-b border-line-base',
    label: 'text-group-title text-fg',
    panelInner: '',
  },
  // /enterprise FAQ: text-medium at weight 460, 24px block padding, no hover.
  faq: {
    trigger: 'py-6',
    triggerOpen: '',
    label: 'text-medium font-regular text-fg text-balance',
    panelInner: 'pb-6',
  },
}

// single: opening an item closes the open one (go.md 10, agents.md 11).
export default function Accordion({ items, variant = 'faq', defaultOpen = false, single = false, className = '' }) {
  const uid = useId()
  const v = VARIANTS[variant]
  const [open, setOpen] = useState(() => new Set(defaultOpen ? items.map((it) => it.key) : []))
  const toggle = (key) =>
    setOpen((prev) => {
      if (single) return new Set(prev.has(key) ? [] : [key])
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((it, i) => {
        const isOpen = open.has(it.key)
        const triggerId = `${uid}-t${i}`
        const panelId = `${uid}-p${i}`
        return (
          <div key={it.key} className={`border-t border-line-sub ${i === items.length - 1 ? 'border-b' : ''}`}>
            <h3 className="max-w-none">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(it.key)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left text-black ${v.trigger} ${isOpen ? v.triggerOpen : ''}`}
              >
                <span className={v.label}>{it.title}</span>
                <CaretSmallDown
                  className="shrink-0 motion-safe:transition-transform motion-safe:duration-base motion-safe:ease-ease"
                  style={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid motion-safe:transition-[grid-template-rows,opacity,visibility] motion-safe:duration-base motion-safe:ease-ease ${
                isOpen ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className={v.panelInner}>{it.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
