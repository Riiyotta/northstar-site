import { Info } from 'lucide-react'

// Small UI glyphs named in plans.assets.json / enterprise.assets.json.

// icon-caret-small-down: 20px, small rounded chevron (colour = currentColor).
export function CaretSmallDown({ className = '', style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} style={style}>
      <path d="M6.5 8.5 10 12l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// icon-check: thin filled check, 18x13 rendered from a 20x20 viewBox.
export function CheckMark({ className = '' }) {
  return (
    <svg width="18" height="13" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7.72 15.03 3.2 10.5a.75.75 0 0 1 1.06-1.06l4 4 7.48-7.47a.75.75 0 1 1 1.06 1.06l-8 8a.75.75 0 0 1-1.08 0Z" />
    </svg>
  )
}

// icon-info: 14x14 circle outline with "i", rgba(41,40,39,0.5).
export function InfoIcon() {
  return <Info size={14} strokeWidth={1.75} aria-hidden="true" className="text-icon-soft" />
}
