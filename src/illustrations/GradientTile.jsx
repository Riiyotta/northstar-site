// Gradient tile artwork (70x70 canvas): signin-tile-1..3 and tab-icon-1..15.
import { C, useUid } from './tokens'

const svgBase = { display: 'block', width: '100%', height: '100%', overflow: 'visible' }

const TONES = {
  purple: [C.p40, C.p60],
  green: [C.green, C.greenDeep],
  orange: [C.orange, C.orangeDeep],
  night: [C.p60, C.p100],
}

export default function GradientTile({ icon: Icon, tone = 'purple', radius, glyph, label, className, style }) {
  const uid = useUid('gt')
  const [a, b] = TONES[tone]
  return (
    <svg viewBox="0 0 70 70" className={className} style={{ ...svgBase, ...style }} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`${uid}-hl`} cx="0.25" cy="0.15" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={70} height={70} rx={radius} fill={`url(#${uid}-bg)`} />
      <rect width={70} height={70} rx={radius} fill={`url(#${uid}-hl)`} />
      <rect x={0.75} y={0.75} width={68.5} height={68.5} rx={radius - 0.75} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth={1.5} />
      <Icon x={(70 - glyph) / 2} y={(70 - glyph) / 2} width={glyph} height={glyph} color="#fff" strokeWidth={2} aria-hidden="true" />
    </svg>
  )
}
