// ent-badge-1..12 (212x80 cell, white on #0c4243): invented compliance-style
// seals. These are NOT real certification marks: every label is made up and
// no real standard, body or logo is referenced. One circular rosette seal
// style, a centred line glyph, and a two-line label. Static inline SVG.
import { C } from './tokens'

const FONT = "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif"

// 24-unit line glyphs drawn inside the seal
const G = {
  leaf: 'M5 19 C5 9 11 5 19 5 C19 13 15 19 5 19 Z M5 19 L13 11',
  key: 'M9.5 14.5 a4 4 0 1 1 0.01 0 M12.3 11.7 L19 5 M16.5 7.5 l2 2 M14.5 9.5 l1.5 1.5',
  shield: 'M12 3 l7 3 v5 c0 5 -3 8 -7 10 c-4 -2 -7 -5 -7 -10 v-5 z M9 12 l2 2 l4 -4',
  cube: 'M12 3 l8 4.5 v9 l-8 4.5 l-8 -4.5 v-9 z M4 7.5 l8 4.5 l8 -4.5 M12 12 v9',
  ledger: 'M6 4 h12 v16 h-12 z M9 8 h6 M9 12 h6 M9 16 h3',
  pulse: 'M3 12 h4 l2 -5 l4 10 l2 -5 h6',
  lock: 'M6 11 h12 v9 h-12 z M8.5 11 V8 a3.5 3.5 0 0 1 7 0 v3 M12 14.5 v2',
  check: 'M6 12.5 l4 4 l8 -9',
  globe: 'M12 4 a8 8 0 1 1 -0.01 0 M4 12 h16 M12 4 c3 3 3 13 0 16 c-3 -3 -3 -13 0 -16',
  star: 'M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z',
  doc: 'M7 3 h7 l4 4 v14 h-11 z M14 3 v4 h4 M10 12 h5 M10 16 h5',
  layers: 'M12 4 l8 4 l-8 4 l-8 -4 z M4 12 l8 4 l8 -4 M4 16 l8 4 l8 -4',
}

const BADGES = [
  ['Data Care L1', 'HANDLING', 'leaf'],
  ['Access Ready', 'IDENTITY', 'key'],
  ['Privacy Pledge', 'PRIVACY', 'shield'],
  ['Secure Build', 'ENGINEERING', 'cube'],
  ['Trust Ledger', 'RECORDS', 'ledger'],
  ['Uptime Assured', 'AVAILABILITY', 'pulse'],
  ['Key Custody', 'ENCRYPTION', 'lock'],
  ['Clean Trail', 'LOGGING', 'check'],
  ['Region Bound', 'HOSTING', 'globe'],
  ['Vendor Vetted', 'SUPPLIERS', 'star'],
  ['Open Disclosure', 'TRANSPARENCY', 'doc'],
  ['Resilience T2', 'CONTINUITY', 'layers'],
]

// rosette outline: 24 scallops between r=19 and r=17
const ROSETTE = (() => {
  const n = 48
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 ? 17.2 : 19
    d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)} `
  }
  return `${d}Z`
})()

export function Badge({ n = 1, color = C.white, className, style }) {
  const [name, tag, glyph] = BADGES[(n - 1) % BADGES.length]
  const textW = Math.max(name.length * 7.3, tag.length * 6.2)
  const gw = 40 + 11 + textW
  const x0 = Math.round((212 - gw) / 2)
  return (
    <svg
      viewBox="0 0 212 80"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', color, ...style }}
      role="img"
      aria-label={`${name} badge`}
    >
      <g transform={`translate(${x0 + 20} 40)`} fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        <path d={ROSETTE} strokeWidth={1.5} />
        <circle r={13.5} strokeWidth={0.9} strokeDasharray="1.6 2.2" opacity={0.65} />
        <path d={G[glyph]} transform="translate(-7.2 -7.2) scale(0.6)" strokeWidth={2.6} />
      </g>
      <g fill="currentColor" fontFamily={FONT}>
        <text x={x0 + 51} y={39} fontSize={13} fontWeight={650} letterSpacing="-0.1">
          {name}
        </text>
        <text x={x0 + 51} y={53} fontSize={9.5} fontWeight={600} letterSpacing="1" opacity={0.6}>
          {tag}
        </text>
      </g>
    </svg>
  )
}

export const Badge1 = (p) => <Badge n={1} {...p} />
export const Badge2 = (p) => <Badge n={2} {...p} />
export const Badge3 = (p) => <Badge n={3} {...p} />
export const Badge4 = (p) => <Badge n={4} {...p} />
export const Badge5 = (p) => <Badge n={5} {...p} />
export const Badge6 = (p) => <Badge n={6} {...p} />
export const Badge7 = (p) => <Badge n={7} {...p} />
export const Badge8 = (p) => <Badge n={8} {...p} />
export const Badge9 = (p) => <Badge n={9} {...p} />
export const Badge10 = (p) => <Badge n={10} {...p} />
export const Badge11 = (p) => <Badge n={11} {...p} />
export const Badge12 = (p) => <Badge n={12} {...p} />
