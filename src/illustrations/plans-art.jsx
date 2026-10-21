// /plans + shared small marks: glyph-inbox/agents/pages/assistant (mulberry
// product glyphs built around the Northstar four-point star),
// testimonial-portrait-1..3 (abstract geometric avatars, not people) and the
// fictional wordmarks for testimonial-company-1..3 / ent-quote-logo-1..2.
// Static inline SVG, no motion.
import { C, STAR_PATH, useUid } from './tokens'

const FONT = "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif"
const svgBase = { display: 'block', width: '100%', height: '100%' }

/** Four-point star centred on (cx, cy) with size s. */
function StarAt({ cx, cy, s, fill = '#fff', stroke, strokeWidth }) {
  return (
    <path
      d={STAR_PATH}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth ? (strokeWidth * 24) / s : undefined}
      strokeLinejoin="round"
      transform={`translate(${cx - s / 2} ${cy - s / 2}) scale(${s / 24})`}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Product glyphs (24-unit, mulberry #421d24)                          */
/* ------------------------------------------------------------------ */

function Glyph({ label, round = false, className, style, children }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ ...svgBase, ...style }} role="img" aria-label={label}>
      {round ? <circle cx={12} cy={12} r={12} fill={C.m100} /> : <rect width={24} height={24} rx={6} fill={C.m100} />}
      <g fill="none" stroke="#fff" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

/** glyph-inbox: envelope with a star spark at the flap corner. */
export const GlyphInbox = (p) => (
  <Glyph label="Inbox" {...p}>
    <rect x={5.5} y={7.5} width={12.5} height={9.5} rx={1.6} />
    <path d="M6.2 8.6 L11.75 12.6 L17.3 8.6" />
    <StarAt cx={18.2} cy={6.4} s={6.4} fill="#fff" stroke={C.m100} strokeWidth={1.4} />
  </Glyph>
)

/** glyph-agents: circle, open ring with a star in its gap. */
export const GlyphAgents = (p) => (
  <Glyph label="Agents" round {...p}>
    <path d="M17.1 9.2 A6 6 0 1 1 14.8 6.7" strokeWidth={2} />
    <StarAt cx={16.9} cy={6.9} s={5.6} />
  </Glyph>
)

/** glyph-pages: page lines ending in a star. */
export const GlyphPages = (p) => (
  <Glyph label="Pages" {...p}>
    <path d="M6.5 7.5 H17.5 M6.5 12 H17.5 M6.5 16.5 H12" />
    <StarAt cx={16} cy={16.5} s={5.2} />
  </Glyph>
)

/** glyph-assistant: compass ring around a large star. */
export const GlyphAssistant = (p) => (
  <Glyph label="Assistant" {...p}>
    <circle cx={12} cy={12} r={7} strokeWidth={1.3} strokeOpacity={0.7} />
    <StarAt cx={12} cy={12} s={11} />
  </Glyph>
)

/* ------------------------------------------------------------------ */
/* testimonial-portrait-1..3 (1:1, circular crop by the slot)          */
/* ------------------------------------------------------------------ */

function Portrait({ label, bg: [b0, b1], skin, hair, top, accent, variant, className, style }) {
  const uid = useUid('pt')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} style={{ ...svgBase, ...style }} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={b0} />
          <stop offset="1" stopColor={b1} />
        </linearGradient>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top[0]} />
          <stop offset="1" stopColor={top[1]} />
        </linearGradient>
      </defs>
      <rect width={100} height={100} fill={`url(#${uid}-bg)`} />
      <circle cx={78} cy={22} r={26} fill={accent} opacity={0.35} />
      {variant === 2 && <circle cx={50} cy={30} r={17} fill={hair} />}
      {/* shoulders */}
      <path d="M14 104 C 14 80, 30 70, 50 70 C 70 70, 86 80, 86 104 Z" fill={`url(#${uid}-top)`} />
      {/* neck */}
      <rect x={44} y={56} width={12} height={16} rx={5} fill={skin} />
      <path d="M44 66 h12 l-6 7 z" fill="#000" opacity={0.08} />
      {/* head */}
      <ellipse cx={50} cy={46} rx={15} ry={17} fill={skin} />
      {variant === 1 && <path d="M34 46 C 33 30, 44 25, 52 26 C 62 26, 68 33, 66 44 C 60 36, 48 36, 34 46 Z" fill={hair} />}
      {variant === 2 && <path d="M35 44 C 35 32, 44 28, 50 28 C 58 28, 66 33, 65 44 C 58 38, 43 37, 35 44 Z" fill={hair} />}
      {variant === 3 && (
        <>
          <path d="M34 42 C 34 30, 42 26, 50 26 C 60 26, 67 31, 66 42 L 64 40 C 58 34, 44 33, 36 40 Z" fill={hair} />
          <g fill="none" stroke={hair} strokeWidth={1.6}>
            <circle cx={44} cy={47} r={4.2} />
            <circle cx={56} cy={47} r={4.2} />
            <path d="M48.2 47 h3.6" />
          </g>
        </>
      )}
      <ellipse cx={42} cy={54} rx={3} ry={2} fill="#ff8a7a" opacity={0.25} />
      <ellipse cx={58} cy={54} rx={3} ry={2} fill="#ff8a7a" opacity={0.25} />
      {/* collar star accent */}
      <StarAt cx={66} cy={86} s={9} fill={accent} />
    </svg>
  )
}

export const TestimonialPortrait1 = (p) => (
  <Portrait
    label="Illustrated avatar"
    bg={['#0a6aa6', '#004878']}
    skin="#d8a890"
    hair="#5a3a2a"
    top={['#f2f0eb', '#bfbcb6']}
    accent="#8fd3ff"
    variant={1}
    {...p}
  />
)

export const TestimonialPortrait2 = (p) => (
  <Portrait
    label="Illustrated avatar"
    bg={['#3a1c1c', '#0c0606']}
    skin="#a86048"
    hair="#140a0a"
    top={[C.p60, C.p90]}
    accent={C.orange}
    variant={2}
    {...p}
  />
)

export const TestimonialPortrait3 = (p) => (
  <Portrait
    label="Illustrated avatar"
    bg={['#ffffff', '#e8e0ff']}
    skin="#c98f6c"
    hair="#2b2a3a"
    top={[C.green, C.greenDeep]}
    accent={C.p40}
    variant={3}
    {...p}
  />
)

/* ------------------------------------------------------------------ */
/* Fictional wordmarks (left-aligned, white by default)                */
/* ------------------------------------------------------------------ */

function Wordmark({ w, h, label, color = C.white, opacity = 1, className, style, children }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMinYMid meet"
      className={className}
      style={{ ...svgBase, color, ...style }}
      role="img"
      aria-label={label}
    >
      <g opacity={opacity} fill="currentColor" fontFamily={FONT}>
        {children}
      </g>
    </svg>
  )
}

/** Brightway (161x39): rising sun over a horizon line. */
export const LogoBrightway = (p) => (
  <Wordmark w={161} h={39} label="Brightway" {...p}>
    <path d="M3 27 a13 13 0 0 1 26 0 z" />
    <rect x={0} y={30} width={32} height={3} rx={1.5} />
    {[-60, -30, 0, 30, 60].map((a) => (
      <rect key={a} x={15} y={4} width={2} height={5} rx={1} transform={`rotate(${a} 16 27)`} />
    ))}
    <text x={40} y={28} fontSize={22} fontWeight={760} letterSpacing="-0.5" textLength={119} lengthAdjust="spacingAndGlyphs">
      Brightway
    </text>
  </Wordmark>
)

/** Larkin (111x31): two-stroke wing mark. */
export const LogoLarkin = (p) => (
  <Wordmark w={111} h={31} label="Larkin" {...p}>
    <path d="M1 20 C 6 9, 14 6, 22 7 C 16 10, 13 14, 12 20 Z" />
    <path d="M10 23 C 14 16, 19 13, 25 13 C 21 16, 19 19, 18 23 Z" opacity={0.6} />
    <text x={30} y={22} fontSize={20} fontWeight={640} letterSpacing="-0.3" textLength={80} lengthAdjust="spacingAndGlyphs">
      larkin
    </text>
  </Wordmark>
)

/** Halcyo (119x33): ring with an orbiting dot. */
export const LogoHalcyo = (p) => (
  <Wordmark w={119} h={33} label="Halcyo" {...p}>
    <circle cx={13} cy={16.5} r={9.5} fill="none" stroke="currentColor" strokeWidth={4} />
    <circle cx={21.5} cy={8} r={3.5} />
    <text x={32} y={24} fontSize={21} fontWeight={560} letterSpacing="0.2" textLength={86} lengthAdjust="spacingAndGlyphs">
      HALCYO
    </text>
  </Wordmark>
)

/** Kite (sized for 237x53): diamond kite with a tail. */
export const LogoKite = (p) => (
  <Wordmark w={150} h={40} label="Kite" {...p}>
    <path d="M17 2 L30 15 L17 32 L4 15 Z" />
    <path d="M17 2 V32 M4 15 H30" stroke="#000" strokeOpacity={0.25} strokeWidth={1.5} />
    <path d="M17 32 q-3 3 0 5 q3 2 0 3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    <text x={40} y={28} fontSize={28} fontWeight={780} letterSpacing="-0.8" textLength={56} lengthAdjust="spacingAndGlyphs">
      Kite
    </text>
  </Wordmark>
)
