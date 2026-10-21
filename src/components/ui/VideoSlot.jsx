import { useEffect, useRef, useState } from 'react'
import { MediaSlot } from './Media'

// Demo "video" (mail.md 2/12.1, docs.md 3/13.1, go.md 3/13.2-13.3). A
// MediaSlot illustration stands in for the video; its CSS animation is the
// "playback", toggled with animation-play-state (.motion-paused).
// Viewport-gated like the original: IntersectionObserver thresholds [0, .2];
// resumes once >= 20% is visible, pauses once fully out of view. The button
// pauses/resumes by hand (that choice wins while in view).
//   className:    frame size / aspect / radius
//   control:      'outside' (controls_outsideBottomLeft: 10px below, left) |
//                 'inside'  (controls_insideBottomLeft: absolute, inset 4)
//   controlColor: icon colour (currentColor), default #292827
//   stroke:       circle stroke width (2 on /mail and /docs, 1.5 on /go)
//   caption:      visually hidden caption after the video (go.md 3)
function PlayPauseIcon({ playing, stroke }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth={stroke} />
      {playing ? (
        <>
          <rect x="11.5" y="10" width="2" height="12" rx="1" fill="currentColor" />
          <rect x="18.5" y="10" width="2" height="12" rx="1" fill="currentColor" />
        </>
      ) : (
        <path d="M13 10.5v11a.6.6 0 0 0 .9.5l8.6-5.5a.6.6 0 0 0 0-1L13.9 10a.6.6 0 0 0-.9.5Z" fill="currentColor" />
      )}
    </svg>
  )
}

export default function VideoSlot({
  id,
  art,
  bg,
  className = '',
  control = 'outside',
  controlColor = '#292827',
  stroke = 2,
  caption,
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setInView(false)
        else if (entry.intersectionRatio >= 0.2) setInView(true)
      },
      { threshold: [0, 0.2] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = inView && !userPaused
  const button = (
    <button
      type="button"
      aria-label={playing ? 'Pause animation' : 'Play animation'}
      onClick={() => setUserPaused(playing)}
      className={`grid size-8 shrink-0 cursor-pointer place-items-center bg-transparent p-0 ${
        control === 'inside' ? 'absolute bottom-1 left-1' : ''
      }`}
      style={{ color: controlColor }}
    >
      <PlayPauseIcon playing={playing} stroke={stroke} />
    </button>
  )

  if (control === 'inside')
    return (
      <div ref={ref} className="relative w-full">
        <MediaSlot id={id} art={art} bg={bg} className={`${className} ${playing ? '' : 'motion-paused'}`} />
        {button}
        {caption && <p className="sr-only">{caption}</p>}
      </div>
    )

  return (
    <div className="flex w-full flex-col items-start">
      <div ref={ref} className="w-full">
        <MediaSlot id={id} art={art} bg={bg} className={`${className} ${playing ? '' : 'motion-paused'}`} />
      </div>
      <div className="mt-2.5 flex">{button}</div>
      {caption && <p className="sr-only">{caption}</p>}
    </div>
  )
}
