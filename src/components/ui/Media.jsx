import { illustrations } from '../../illustrations'
import { Lockup as BrandLockup } from '../../illustrations/brand'

// Media slot (asset-manifest.json). Sized via className (aspect, width,
// radius); renders the slot's illustration over the manifest `bg` fill.
// Art registered under the slot id wins; `art` names a fallback illustration
// to reuse until the slot has its own.
export function MediaSlot({ id, art, bg, className = '', children }) {
  const Art = illustrations[id] ?? illustrations[art]
  return (
    <div
      data-asset={id}
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ background: bg }}
    >
      {Art && <Art />}
      {children}
    </div>
  )
}

// Simple original star glyph used by the wordmark and lockups.
export function StarGlyph({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
    </svg>
  )
}

// logo-header / logo-footer: 167x24 text wordmark.
export function Wordmark({ className = '' }) {
  return (
    <span data-asset="logo" className={`inline-flex h-6 w-[167px] items-center gap-1.5 text-wordmark ${className}`}>
      <StarGlyph size={20} />
      Northstar
    </span>
  )
}

// lockup-agent / lockup-inbox / lockup-pages: product lockup at 25px tall.
export function Lockup({ id, name, width }) {
  return (
    <span
      data-asset={id}
      className="inline-flex h-[25px] items-center gap-2 whitespace-nowrap text-lockup text-fg"
      style={{ width }}
    >
      <span
        className="grid size-[25px] shrink-0 place-items-center rounded-6 text-white"
        style={{ background: 'linear-gradient(135deg, #714cb6, #281647)' }}
      >
        <StarGlyph size={13} />
      </span>
      {name}
    </span>
  )
}

// Product lockup slot drawn at a given box size (mail.md 2, docs.md 2, go.md 3).
// Uses the artwork registered under `id`; until one exists, the shared brand
// lockup is drawn for `product` at the slot width.
export function LockupSlot({ id, product, width, className = '' }) {
  const Art = illustrations[id]
  return (
    <span data-asset={id} className={`inline-block h-[25px] align-baseline ${className}`} style={{ width }}>
      {Art ? <Art /> : <BrandLockup product={product} width={width} />}
    </span>
  )
}
