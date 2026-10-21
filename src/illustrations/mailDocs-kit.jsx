// Shared building blocks for the /mail and /docs art (mail-art.jsx,
// mail-marks.jsx, docs-art.jsx). Static inline SVG, colours from tokens.js.
import { C } from './tokens'

/** Diagonal stripe / cloud / sparkle / wave texture clipped to a panel. */
function Texture({ id, kind, x, y, w, h }) {
  if (kind === 'stripes') {
    return (
      <g clipPath={`url(#${id}-clip)`} opacity={0.35}>
        {Array.from({ length: Math.ceil((w + h) / 26) }, (_, i) => (
          <line key={i} x1={x + i * 26 - h} y1={y + h} x2={x + i * 26} y2={y} stroke={C.white} strokeWidth={7} />
        ))}
      </g>
    )
  }
  if (kind === 'clouds') {
    const cloud = (cx, cy, k, o) => (
      <g opacity={o}>
        <circle cx={cx - 34 * k} cy={cy} r={22 * k} />
        <circle cx={cx} cy={cy - 14 * k} r={32 * k} />
        <circle cx={cx + 36 * k} cy={cy - 2 * k} r={24 * k} />
        <rect x={cx - 56 * k} y={cy} width={116 * k} height={22 * k} rx={11 * k} />
      </g>
    )
    return (
      <g clipPath={`url(#${id}-clip)`} fill={C.white}>
        {cloud(x + w * 0.28, y + h * 0.72, 1.3, 0.55)}
        {cloud(x + w * 0.74, y + h * 0.3, 1, 0.45)}
        {cloud(x + w * 0.9, y + h * 0.86, 0.8, 0.35)}
      </g>
    )
  }
  if (kind === 'sparkle') {
    const pts = [
      [0.18, 0.2, 16],
      [0.42, 0.12, 9],
      [0.7, 0.3, 13],
      [0.3, 0.55, 10],
      [0.84, 0.62, 8],
      [0.56, 0.78, 12],
      [0.12, 0.82, 7],
    ]
    return (
      <g clipPath={`url(#${id}-clip)`} fill={C.white}>
        {pts.map(([px, py, s], i) => {
          const cx = x + w * px
          const cy = y + h * py
          return <path key={i} d={`M${cx} ${cy - s} L${cx + s * 0.22} ${cy - s * 0.22} L${cx + s} ${cy} L${cx + s * 0.22} ${cy + s * 0.22} L${cx} ${cy + s} L${cx - s * 0.22} ${cy + s * 0.22} L${cx - s} ${cy} L${cx - s * 0.22} ${cy - s * 0.22} Z`} opacity={0.75} />
        })}
      </g>
    )
  }
  if (kind === 'waves') {
    return (
      <g clipPath={`url(#${id}-clip)`} fill="none" stroke={C.white} strokeWidth={5} opacity={0.3}>
        {Array.from({ length: 9 }, (_, i) => {
          const yy = y + 20 + i * (h / 8)
          let d = `M${x - 10} ${yy}`
          for (let px = 0; px <= w + 20; px += 40) d += ` Q${x + px + 10} ${yy - 14} ${x + px + 20} ${yy} T${x + px + 40} ${yy}`
          return <path key={i} d={d} />
        })}
      </g>
    )
  }
  return null
}

/** Rounded gradient panel (the coloured cards that sit behind the UI). */
export function Panel({ id, x, y, w, h, r = 28, from, to, texture, angle = 'diag' }) {
  const [x2, y2] = angle === 'down' ? [0, 1] : angle === 'across' ? [1, 0] : [1, 1]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2={x2} y2={y2}>
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${id}-g)`} />
      {texture && <Texture id={id} kind={texture} x={x} y={y} w={w} h={h} />}
    </g>
  )
}

/** Full-bleed gradient background for the 480x308 grid tiles. */
export function Bleed({ id, w, h, from, to, glow }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        {glow && (
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={glow} stopOpacity="0.7" />
            <stop offset="1" stopColor={glow} stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-bg)`} />
      {glow && <ellipse cx={w * 0.85} cy={h * 0.1} rx={w * 0.55} ry={h * 0.6} fill={`url(#${id}-glow)`} />}
    </g>
  )
}

/** Soft drop shadow filter definition. */
export function SoftShadow({ id, dy = 10, blur = 14, opacity = 0.16 }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy={dy} stdDeviation={blur} floodColor={C.n100} floodOpacity={opacity} />
      <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={C.n100} floodOpacity="0.06" />
    </filter>
  )
}

/** Plain white card with soft shadow (no clipping). */
export function Card({ id, x, y, w, h, r = 20, fill = C.white, stroke = 'rgba(115,113,109,0.14)', shadow = true, children }) {
  return (
    <g>
      <defs>
        {shadow && <SoftShadow id={`${id}-sh`} dy={18} blur={22} opacity={0.16} />}
        <clipPath id={`${id}-clip`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} filter={shadow ? `url(#${id}-sh)` : undefined} />
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
    </g>
  )
}

/** Frosted chip used on the gradient grid tiles. */
export function Glass({ x, y, w, h, r = 14, strong = false }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={strong ? C.white : 'rgba(255,255,255,0.18)'}
      stroke={strong ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)'}
      strokeWidth={1.5}
    />
  )
}

/** Mouse pointer arrow. */
export function Pointer({ x, y, s = 1, fill = C.n90 }) {
  return (
    <path
      d="M0 0 L0 23 L6 17.5 L10.5 27 L14.5 25 L10 15.8 L17.5 15.8 Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={fill}
      stroke={C.white}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  )
}

/** Small on/off toggle. */
export function Toggle({ x, y, on = true, color = C.p60 }) {
  return (
    <g>
      <rect x={x} y={y} width={40} height={24} rx={12} fill={on ? color : C.n20} />
      <circle cx={on ? x + 28 : x + 12} cy={y + 12} r={9} fill={C.white} />
    </g>
  )
}

/**
 * Square app-icon tile: gradient rounded square with a centred glyph.
 * `size` = artboard (viewBox) size, `tile` = tile size inside it.
 * `glyph` renders inside a 24-unit box (stroke paths or a lucide icon).
 */
export function IconTile({ id, size, tile, from, to, glyphColor, shadow = false, glyph, className, style, label }) {
  const o = (size - tile) / 2
  const g = tile * 0.5
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`ns-art ${className ?? ''}`} style={style} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        {shadow && <SoftShadow id={`${id}-s`} dy={size * 0.05} blur={size * 0.06} opacity={0.18} />}
      </defs>
      <rect x={o} y={o} width={tile} height={tile} rx={tile * 0.26} fill={`url(#${id}-t)`} filter={shadow ? `url(#${id}-s)` : undefined} />
      <rect x={o + 0.75} y={o + 0.75} width={tile - 1.5} height={tile - 1.5} rx={tile * 0.26 - 0.75} fill="none" stroke={C.white} strokeOpacity={0.35} strokeWidth={1.5} />
      <g
        transform={`translate(${size / 2 - g / 2} ${size / 2 - g / 2}) scale(${g / 24})`}
        fill="none"
        stroke={glyphColor}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        color={glyphColor}
      >
        {glyph}
      </g>
    </svg>
  )
}
