import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { InfoIcon } from './Icons'

// plans.md 3.4 info tooltip. Shows ~200ms after hover (or on keyboard focus),
// fades in .2s ease, hides instantly. Placed to the right of the trigger:
// x = trigger right + 10.5, y = trigger top - 5.6. Portalled to <body> so
// accordion/table overflow can't clip it.
const DELAY_MS = 200
const GAP_X = 10.5
const LIFT_Y = 5.6
const MAX_W = 200

export default function Tooltip({ text, children }) {
  const id = useId()
  const ref = useRef(null)
  const timer = useRef(0)
  const [pos, setPos] = useState(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const show = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const r = ref.current.getBoundingClientRect()
      const docW = document.documentElement.clientWidth
      // Keep the tip inside the viewport (no sideways scroll on narrow windows).
      const left = Math.min(r.right + GAP_X, docW - MAX_W - 8) + window.scrollX
      setPos({ left, top: r.top - LIFT_Y + window.scrollY })
    }, DELAY_MS)
  }
  const hide = () => {
    clearTimeout(timer.current)
    setPos(null)
  }

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        aria-describedby={pos ? id : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="inline-flex shrink-0 cursor-pointer rounded-4"
      >
        {children ?? <InfoIcon />}
      </div>
      {pos &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            className="tooltip-in pointer-events-none absolute z-tooltip w-max max-w-[200px] rounded-8 bg-neutral-90 px-2 py-1 text-tooltip text-white shadow-elevation-small"
            style={{ left: pos.left, top: pos.top }}
          >
            {/* Arrow: size not measured in the spec (6px chosen), points left */}
            <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden="true" className="absolute -left-[5px] top-[9px] fill-neutral-90">
              <path d="M6 0v10L0.6 5.8a1 1 0 0 1 0-1.6Z" />
            </svg>
            {text}
          </div>,
          document.body,
        )}
    </>
  )
}
