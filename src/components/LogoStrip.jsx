import { useEffect, useState } from 'react'
import { logoIntro } from '../data/content'
import { illustrations } from '../illustrations'

// Rotation measured on the original (cycling variant): 11 logos share 6 cells.
// After the mount fade-in, a 1s clock alternates: a random cell (never the
// same cell twice in a row) fades out (.5s ease-in-out, fill none) and goes
// blank; 1s after the fade-out started it fades in (.5s ease-in-out) with a
// random logo that is not currently on screen. One cell changes every 2s; the
// first fade-out starts ~1.5s after the mount fade-in. No rotation under
// prefers-reduced-motion.
const POOL = Array.from({ length: 11 }, (_, i) => `logo-${i + 1}`)
const CELLS = 6
const FIRST_OUT_MS = 1500
const SWAP_MS = 1000 // fade-out start -> fade-in start
const PERIOD_MS = 2000 // fade-out start -> next fade-out start

const pick = (list) => list[Math.floor(Math.random() * list.length)]

function useLogoRotation(pool, rotate, firstOutMs = FIRST_OUT_MS) {
  // phase: 'in' (mount / swap fade-in), 'out' (fading out), 'empty' (blank)
  const [cells, setCells] = useState(() => pool.slice(0, CELLS).map((id) => ({ id, phase: 'in', gen: 0 })))

  useEffect(() => {
    if (!rotate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers = new Set()
    const later = (fn, ms) => {
      const t = setTimeout(() => {
        timers.delete(t)
        fn()
      }, ms)
      timers.add(t)
    }
    let lastCell = -1
    const tick = () => {
      const cell = pick([...Array(CELLS).keys()].filter((i) => i !== lastCell))
      lastCell = cell
      setCells((cs) => cs.map((c, i) => (i === cell ? { ...c, phase: 'out' } : c)))
      later(() => {
        setCells((cs) => {
          const shown = new Set(cs.map((c) => c.id))
          const next = pick(pool.filter((id) => !shown.has(id)))
          return cs.map((c, i) => (i === cell ? { id: next, phase: 'in', gen: c.gen + 1 } : c))
        })
      }, SWAP_MS)
      later(tick, PERIOD_MS)
    }
    later(tick, firstOutMs)
    return () => timers.forEach(clearTimeout)
  }, [pool, rotate, firstOutMs])

  const onFadeOutEnd = (cell) =>
    setCells((cs) => cs.map((c, i) => (i === cell && c.phase === 'out' ? { ...c, phase: 'empty' } : c)))

  return [cells, onFadeOutEnd]
}

const defaultArt = (id) => {
  const Logo = illustrations[id]
  return Logo ? <Logo /> : null
}

// asset-grid: top+left hairline on the container, right+bottom on cells.
// 6 cols >=1080, 3 cols below. Every logo fades in once on mount; with
// `rotate` the 11-logo pool cycles through the 6 cells (see above).
//   ids:       slot ids (data-asset); pool when rotating, else the 6 shown
//   renderArt: id -> artwork node
//   firstOutMs: delay before the first fade-out (mail.md 3: ~1.06s)
export function LogoGrid({ ids = POOL, rotate = false, firstOutMs, renderArt = defaultArt, className = '', logoClass = '' }) {
  const [cells, onFadeOutEnd] = useLogoRotation(ids, rotate, firstOutMs)
  return (
    <ul className={`grid w-full grid-cols-3 border-l border-t border-line-sub lg:grid-cols-6 ${className}`}>
      {cells.map((c, n) => (
        <li key={n} data-logo-cell className="grid h-[81px] place-items-center border-b border-r border-line-sub">
          {c.phase !== 'empty' && (
            // Re-keyed per swap so .logo-fade-in restarts on the new logo.
            <span
              key={`${c.id}-${c.gen}`}
              data-asset={c.id}
              aria-hidden="true"
              onAnimationEnd={c.phase === 'out' ? () => onFadeOutEnd(n) : undefined}
              className={`${c.phase === 'out' ? 'logo-fade-out' : 'logo-fade-in'} block ${logoClass}`}
            >
              {renderArt(c.id)}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

// Per-page styling.
//   home:       CLONE_SPEC 4 (own #f7f5f2 section, 16px text-sub intro, rotating)
//   plans:      plans.md 1c (transparent, inside the gradient wrapper; 20/24
//               base-colour heading; trusted-by paddings; 80px-tall logos; rotating)
//   enterprise: enterprise.md 2 (static, dark context, text-medium intro;
//               rendered inside a PageSection, so no own section/padding)
const VARIANTS = {
  home: {
    as: 'section',
    section: 'ctx-light bg-neutral-5 py-section',
    wrapper: 'content-wrapper flex flex-col items-center',
    intro: 'max-w-text text-center text-small text-fg-sub',
    grid: 'mt-9 max-w-[694px] lg:mt-10 lg:max-w-none',
    logo: 'h-7 w-[min(120px,80%)] text-neutral-90',
    rotate: true,
  },
  plans: {
    as: 'div',
    section: 'pb-16 pt-12 sm:pt-16 lg:pt-[72px] xl:pb-20',
    wrapper: 'content-wrapper flex flex-col items-center',
    intro: 'max-w-text text-pretty text-center text-trusted-heading text-fg',
    grid: 'mt-9 max-w-[30rem] sm:max-w-none lg:mt-10',
    logo: 'h-20 w-full',
    rotate: true,
  },
  enterprise: {
    as: 'div',
    section: '',
    wrapper: 'flex flex-col items-center',
    intro: 'max-w-text text-balance text-center text-medium text-fg-sub',
    grid: 'mt-9 max-w-[649px] lg:mt-10 lg:max-w-none',
    logo: 'h-20 w-full',
    rotate: false,
  },
  // mail.md 3: rendered inside a PageSection (group bg #f2f0eb); text-medium
  // intro; rotating; <1080 grid shrink-wrapped to ~691-694 (230px cells).
  mail: {
    as: 'div',
    section: '',
    wrapper: 'flex flex-col items-center',
    intro: 'max-w-text text-balance text-center text-medium text-fg-sub',
    grid: 'mt-9 max-w-[694px] lg:mt-10 lg:max-w-none',
    logo: 'h-20 w-full',
    rotate: true,
    firstOutMs: 1060,
  },
  // docs.md 3 / agents.md 3b: static (one-time fade-in), text-medium intro,
  // transparent cells; <1080 grid 643 (docs) / 649 (agents) wide.
  docs: {
    as: 'div',
    section: '',
    wrapper: 'flex flex-col items-center',
    intro: 'max-w-text text-balance text-center text-medium text-fg-sub',
    grid: 'mt-9 max-w-[643px] lg:mt-10 lg:max-w-none',
    logo: 'h-20 w-full',
    rotate: false,
  },
  agents: {
    as: 'div',
    section: '',
    wrapper: 'flex flex-col items-center',
    intro: 'max-w-text text-balance text-center text-medium text-fg-sub',
    grid: 'mt-9 max-w-[649px] lg:mt-10 lg:max-w-none',
    // measured: logo boxes fill the cell (212x80 / 118x80), contain-fit
    logo: 'h-20 w-full',
    rotate: false,
  },
}

// 4. Customer logo strip
export default function LogoStrip({ variant = 'home', intro = logoIntro, ids = POOL, renderArt }) {
  const v = VARIANTS[variant]
  const Tag = v.as
  return (
    <Tag className={v.section}>
      <div className={v.wrapper}>
        <p className={v.intro}>{intro}</p>
        <LogoGrid ids={ids} rotate={v.rotate} firstOutMs={v.firstOutMs} renderArt={renderArt} className={v.grid} logoClass={v.logo} />
      </div>
    </Tag>
  )
}
