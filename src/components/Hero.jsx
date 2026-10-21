import { useCallback, useEffect, useRef, useState } from 'react'
import { Bot, ChevronRight, FileText, Mail } from 'lucide-react'
import { heroNavHeading, heroSlides } from '../data/content'
import Button from './ui/Button'
import { MediaSlot } from './ui/Media'

const navIcons = [Mail, Bot, FileText] // generic stand-ins for hero-nav-icon-1..3

// Measured on the original: autoAdvanceMs 1e4, dissolve 500ms (JS + CSS).
const SLIDE_MS = 10000
const DISSOLVE_MS = 500

// Shared visibility for stacked slide layers (copy + asset). The incoming
// layer runs dissolve-in and the outgoing one dissolve-out (500ms ease, both)
// for DISSOLVE_MS, after which it is hidden. Other layers are hidden + paused.
const layer = (i, active, outgoing) => {
  if (i === active) return '[grid-area:1/1] visible opacity-100 dissolve-in'
  if (i === outgoing) return '[grid-area:1/1] visible opacity-0 dissolve-out'
  return '[grid-area:1/1] invisible opacity-0 motion-paused'
}

// 2px progress track. Mounted only while autoplaying (as on the original);
// the fill's animationend advances the slide. Hidden under reduced motion.
function Progress({ onEnd }) {
  return (
    <span aria-hidden="true" className="absolute inset-x-0 -top-[2px] h-[2px] overflow-hidden motion-reduce:hidden">
      <span
        className="progress-fill block h-full w-full bg-[rgba(252,250,247,0.2)]"
        style={{ animationDuration: `${SLIDE_MS}ms` }}
        onAnimationEnd={onEnd}
      />
    </span>
  )
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(reducedMotionQuery).matches)
  useEffect(() => {
    const mq = window.matchMedia(reducedMotionQuery)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Original: IntersectionObserver thresholds [0, .5]; enters at ratio >= .5,
// leaves at ratio <= 0.
function useInView(ref, enterThreshold = 0.5) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0) setInView(false)
        else if (entry.intersectionRatio >= enterThreshold) setInView(true)
      },
      { threshold: [0, enterThreshold] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, enterThreshold])
  return inView
}

// 3. Hero carousel ("product switcher")
export default function Hero() {
  const sectionRef = useRef(null)
  // active: current slide; outgoing: previous slide while it dissolves out;
  // plays[i]: bumps each time slide i activates, re-keying its illustration
  // so its 7s one-shot timeline restarts from 0 (stands in for the video restarting).
  const [state, setState] = useState({ active: 0, outgoing: null, plays: heroSlides.map(() => 0) })
  const { active: activeIndex, outgoing, plays } = state
  const [interacted, setInteracted] = useState(false) // any user selection stops autoplay
  const [focusWithin, setFocusWithin] = useState(false) // focus inside pauses it (original)
  const inView = useInView(sectionRef)
  const reducedMotion = useReducedMotion()
  const autoplay = !interacted && !focusWithin && inView && !reducedMotion && heroSlides.length > 1

  const goTo = useCallback((i) => {
    setState((s) => {
      if (i === s.active) return s
      const nextPlays = s.plays.slice()
      nextPlays[i] += 1
      return { active: i, outgoing: s.active, plays: nextPlays }
    })
  }, [])

  // Drop the outgoing layer after the 500ms dissolve.
  useEffect(() => {
    if (outgoing === null) return
    const t = setTimeout(() => setState((s) => ({ ...s, outgoing: null })), DISSOLVE_MS)
    return () => clearTimeout(t)
  }, [outgoing, activeIndex])

  const advance = useCallback(() => goTo((activeIndex + 1) % heroSlides.length), [goTo, activeIndex])

  const select = (i) => {
    setInteracted(true)
    goTo(i)
  }
  const slide = heroSlides[activeIndex]
  const MobileIcon = navIcons[activeIndex]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Northstar products"
      ref={sectionRef}
      data-autoplay={autoplay}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false)
      }}
      className="ctx-dark hero-bg"
      // END colour swaps instantly (no transition)
      style={{ '--hero-end': slide.end }}
    >
      <div className="hero-grid lg:content-wrapper">
        {/* Copy cell */}
        <div className="hero-copy mx-4 mb-4 mt-9 grid sm:mx-6 sm:mb-14 sm:mt-10 lg:m-0 lg:pr-4 lg:pt-10">
          {heroSlides.map((s, i) => (
            <div key={s.id} aria-hidden={i !== activeIndex} className={`flex flex-col gap-8 lg:gap-6 ${layer(i, activeIndex, outgoing)}`}>
              <h2 className="max-w-text text-heading-lg text-fg">
                {s.name} <span className="text-fg-soft">{s.tagline}</span>
              </h2>
              <div className="flex flex-wrap items-stretch gap-4">
                <Button variant="primaryCompact" href="#">
                  {s.cta}
                </Button>
                <Button variant="linkCompact" href="#" arrow>
                  Learn more
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Asset cell: video placeholders (1368x1712), top-aligned, cropped at 650 on desktop */}
        <div className="hero-asset px-4 sm:px-0 lg:relative lg:overflow-hidden">
          <div className="grid lg:absolute lg:inset-x-0 lg:top-0">
            {heroSlides.map((s, i) => (
              // Re-keyed on each activation so the illustration timeline restarts at 0;
              // the outgoing slide keeps its key so it doesn't jump while fading out.
              <MediaSlot
                key={`${s.id}-${plays[i]}`}
                id={s.asset.id}
                bg={s.asset.bg}
                className={`aspect-[1368/1712] w-full ${layer(i, activeIndex, outgoing)}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop navigation (>=1080) */}
        <div className="hero-nav relative z-[1] hidden self-end lg:block">
          <p className="mb-6 text-xsmall text-fg-sub">{heroNavHeading}</p>
          <div role="group" aria-label="Choose a product">
            {heroSlides.map((s, i) => {
              const Icon = navIcons[i]
              const isActive = i === activeIndex
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-current={isActive}
                  onClick={() => select(i)}
                  className={`group relative grid w-full grid-cols-[24px_minmax(3rem,auto)_1fr_auto] items-center gap-3 border-t border-line-soft px-8 py-4 text-left text-xsmall hover:bg-hero-row ${
                    isActive ? 'bg-hero-row' : ''
                  }`}
                >
                  {isActive && autoplay && <Progress key={`bar-${activeIndex}`} onEnd={advance} />}
                  <Icon
                    size={24}
                    aria-hidden="true"
                    className={`text-white group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-50'}`}
                  />
                  <span className={`group-hover:opacity-100 ${isActive ? 'text-white opacity-100' : 'text-fg-sub opacity-50'}`}>
                    {s.navTitle}
                  </span>
                  <span className={`pl-6 ${isActive ? 'text-white' : 'text-fg-sub'}`}>{s.navDesc}</span>
                  <span />
                </button>
              )
            })}
          </div>
        </div>

        {/* Tablet / mobile navigation (<1080): current slide only + next button */}
        <div className="hero-nav sticky bottom-0 z-[1] sm:static lg:hidden">
          <div className="relative">
            {/* ::before filled with the END colour */}
            <span aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--hero-end)' }} />
            <div className="relative flex items-center gap-3 border-t border-line-sub bg-[rgba(255,255,255,0.1)] px-4 py-5">
              {autoplay && <Progress key={`m-bar-${activeIndex}`} onEnd={advance} />}
              <MobileIcon size={16} aria-hidden="true" className="shrink-0 self-start text-white" />
              <div className="min-w-0 flex-1 text-xsmall" aria-live="polite">
                <p className="text-white">{slide.navTitle}</p>
                <p className="text-fg-sub">{slide.navDesc}</p>
              </div>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => select((activeIndex + 1) % heroSlides.length)}
                className="grid size-8 shrink-0 place-items-center rounded-full border border-[rgba(255,255,255,0.65)] bg-transparent text-white"
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
