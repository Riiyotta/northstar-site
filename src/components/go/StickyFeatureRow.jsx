import { useEffect, useRef } from 'react'
import VideoSlot from '../ui/VideoSlot'

const HEADER_H = 67
const FADE_PX = 200
const QUERY = '(min-width: 640.02px) and (prefers-reduced-motion: no-preference)'

// go.md 13.1 pinned text, JS version of the view-timeline effect. For a row of
// height h (the video height) in a viewport of height H:
//   T = H + h; center = (hdr + H) / 2; p = (H - rowTop) / T
//   winStart = (H - center) / T, winEnd = (H - center + h) / T
//   fadeInEnd = winStart + 200 / T, fadeOutStart = winEnd - 200 / T
//   translateY: -h/2 -> +h/2 across [winStart, winEnd] (fill both)
//   opacity: 0 before winStart, linear 0->1 to fadeInEnd, then (fade-out
//   wins once active) linear 1->0 from fadeOutStart to winEnd, 0 after.
// Only >= 640 and under no-preference; otherwise the text is static.
function usePinnedText(rowRef, textRef) {
  useEffect(() => {
    const row = rowRef.current
    const text = textRef.current
    if (!row || !text) return
    const mq = window.matchMedia(QUERY)
    let raf = 0

    const reset = () => {
      text.style.opacity = ''
      text.style.visibility = ''
      text.style.transform = ''
    }
    const update = () => {
      raf = 0
      if (!mq.matches) return reset()
      const H = window.innerHeight
      const { top, height: h } = row.getBoundingClientRect()
      const T = H + h
      const center = (HEADER_H + H) / 2
      const p = (H - top) / T
      const winStart = (H - center) / T
      const winEnd = (H - center + h) / T
      const fade = FADE_PX / T
      const fadeOutStart = winEnd - fade
      const t = Math.min(1, Math.max(0, (p - winStart) / (winEnd - winStart)))
      let opacity = 0
      if (p >= fadeOutStart) opacity = Math.max(0, 1 - (p - fadeOutStart) / fade)
      else if (p >= winStart) opacity = Math.min(1, (p - winStart) / fade)
      text.style.opacity = String(opacity)
      text.style.visibility = opacity > 0 ? 'visible' : 'hidden'
      text.style.transform = `translateY(${-h / 2 + t * h}px)`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mq.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', schedule)
      reset()
    }
  }, [rowRef, textRef])
}

// go.md 4b-4e / 8b-8f: two-column 6/6 (gap vp). Text left (h2 heading-medium
// + text-medium p, gap 24), 3:2 video right with an inside play/pause control.
// Below 640 the video comes first, 16px above the text.
export default function StickyFeatureRow({ title, body, media }) {
  const rowRef = useRef(null)
  const textRef = useRef(null)
  usePinnedText(rowRef, textRef)
  return (
    <div ref={rowRef} className="flex flex-col gap-vp sm:flex-row">
      <div ref={textRef} className="flex min-w-0 flex-[1_1_0%] flex-col items-start justify-center gap-6">
        <h2 className="text-heading-md text-fg">{title}</h2>
        <p className="text-pretty text-medium text-fg-sub">{body}</p>
      </div>
      <div className="min-w-0 flex-[1_1_0%] max-sm:order-first">
        <VideoSlot
          id={media.id}
          art={media.art}
          bg={media.bg}
          className="aspect-[3/2] w-full"
          control="inside"
          controlColor={media.controlColor}
          stroke={1.5}
          caption={media.caption}
        />
      </div>
    </div>
  )
}
