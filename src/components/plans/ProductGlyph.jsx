import { Compass } from 'lucide-react'
import { HeroNavIconAgent, HeroNavIconInbox, HeroNavIconPages } from '../../illustrations/brand'
import { illustrations } from '../../illustrations'

// glyph-inbox / glyph-agents / glyph-pages / glyph-assistant (plans.assets.json):
// a mulberry (#421d24) tile with a white symbol; Agents is a circle. Stand-in
// built from the homepage nav icons (Assistant uses lucide Compass) until
// dedicated artwork exists.
const GLYPHS = {
  inbox: { Icon: HeroNavIconInbox, round: false },
  agents: { Icon: HeroNavIconAgent, round: true },
  pages: { Icon: HeroNavIconPages, round: false },
  assistant: { Icon: Compass, round: false },
}

export default function ProductGlyph({ product, size = 24 }) {
  const { Icon, round } = GLYPHS[product]
  const Art = illustrations[`glyph-${product}`]
  const inner = Math.round(size * 0.66)
  return (
    <span
      data-asset={`glyph-${product}`}
      aria-hidden="true"
      className={`grid shrink-0 place-items-center bg-icon-product text-white ${round ? 'rounded-full' : 'rounded-6'}`}
      style={{ width: size, height: size }}
    >
      {Art ? (
        <span className="block size-full">
          <Art />
        </span>
      ) : (
        <Icon size={inner} className="block" style={{ width: inner, height: inner }} />
      )}
    </span>
  )
}
