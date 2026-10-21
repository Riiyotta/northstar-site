import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Bot, Calendar, Clock, FileText, Inbox, Layers, ListChecks, Mail, MessageSquare,
  PenLine, Phone, Send, Sparkles, Users, Wand2, Workflow, Zap,
} from 'lucide-react'
import { featureTabs } from '../data/content'
import { TAB_ICONS, TabCardBg } from '../illustrations'

// Generic stand-ins for the brand tab-label icons (tab-label-icon-1..5)
const tabIcons = [Sparkles, Phone, PenLine, Inbox, Workflow]
// Generic glyphs for the 15 card icon tiles (tab-icon-1..15)
const cardIcons = [Wand2, Send, ListChecks, Users, Calendar, MessageSquare, PenLine, Zap, FileText, Layers, Mail, Clock, Bot, Users, Workflow]
// Manifest placeholder gradients: purple, green, orange
const gradients = [
  'linear-gradient(135deg, #9e7be0, #714cb6)',
  'linear-gradient(135deg, #3ac7a1, #148072)',
  'linear-gradient(135deg, #ff9d56, #c25000)',
]

const FADE = '32px' // edge-fade width (spec 5.4)

// Mask only the edge(s) that have hidden overflow.
function useEdgeFade() {
  const ref = useRef(null)
  const [mask, setMask] = useState('none')
  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = el.scrollLeft > 0
    const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    if (!start && !end) return setMask('none')
    setMask(
      `linear-gradient(to right, ${start ? 'transparent' : '#000'} 0, #000 ${start ? FADE : '0px'}, #000 calc(100% - ${end ? FADE : '0px'}), ${end ? 'transparent' : '#000'} 100%)`,
    )
  }, [])
  useEffect(() => {
    const el = ref.current
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', update)
    }
  }, [update])
  return [ref, mask]
}

// 5.4 Tabbed feature cards. Switching is instant (no motion, no autoplay).
// Panels share one grid cell and use 1fr rows, so every card takes the height of
// the tallest card across all panels (matches the original at every width).
export default function FeatureTabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [listRef, mask] = useEdgeFade()

  return (
    <section className="ctx-light bg-neutral-5 pb-section">
      <div className="content-wrapper">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Northstar Agent features"
          className="no-scrollbar flex h-[60px] w-full overflow-x-auto border-b border-line-sub"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {featureTabs.map((tab, i) => {
            const Icon = tabIcons[i]
            const isActive = i === activeIndex
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`feature-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`feature-panel-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`relative flex flex-[1_0_auto] items-center justify-center gap-1 whitespace-nowrap p-4 text-medium ${
                  isActive
                    ? 'text-fg after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-neutral-90'
                    : 'rounded-t-6 text-fg-sub transition-colors duration-base ease-in-out hover:bg-hover-tint'
                }`}
              >
                <Icon size={20} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="grid pt-16">
          {featureTabs.map((tab, p) => (
            <div
              key={tab.label}
              role="tabpanel"
              id={`feature-panel-${p}`}
              aria-labelledby={`feature-tab-${p}`}
              className={`[grid-area:1/1] grid auto-rows-fr grid-cols-1 gap-vp sm:grid-cols-3 ${
                p === activeIndex ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
            >
              {tab.cards.map((card, c) => {
                const n = p * 3 + c
                const Icon = cardIcons[n]
                return (
                  <article
                    key={card.bold}
                    className="relative flex flex-col gap-4 overflow-hidden rounded-12 bg-neutral-10 p-8 shadow-xsmall"
                  >
                    <span
                      data-asset="tab-card-bg"
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden rounded-12"
                      style={{ background: 'radial-gradient(#f2f0eb, #e8e0ff)' }}
                    >
                      <TabCardBg />
                    </span>
                    <span
                      data-asset={`tab-icon-${n + 1}`}
                      aria-hidden="true"
                      className="relative grid size-[70px] place-items-center rounded-16 text-white"
                      style={{ background: gradients[n % 3] }}
                    >
                      {TAB_ICONS[n] ? (() => { const Art = TAB_ICONS[n]; return <Art /> })() : <Icon size={32} />}
                    </span>
                    <div className="relative flex flex-col gap-2">
                      <h3 className="text-heading-xs text-fg">
                        <span className="font-bold">{card.bold}</span>
                        {card.rest}
                      </h3>
                      <p className="text-small text-fg-sub">{card.body}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
