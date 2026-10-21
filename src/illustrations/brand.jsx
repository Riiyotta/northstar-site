// Brand marks, small icons and backgrounds:
// logo-header, logo-footer, wordmark-footer, lockup-*, logo-1..6,
// hero-nav-icon-1..3, signin-tile-1..3, tab-icon-1..15, tab-card-bg, bg-cta.
// Everything is original; the six customer wordmarks are invented companies.
import { Bot, FileText, Mail } from 'lucide-react'
import { C, STAR_PATH, useUid } from './tokens'
import { tile } from './tiles'

const FONT = "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif"

const svgBase = { display: 'block', width: '100%', height: '100%', overflow: 'visible' }

/* ------------------------------------------------------------------ */
/* Northstar wordmark + lockups                                        */
/* ------------------------------------------------------------------ */

/** logo-header (167x24, #292827) / logo-footer (#ffffff): colour via `color`. */
export function NorthstarLogo({ color = C.n90, className, style }) {
  return (
    <svg viewBox="0 0 167 24" className={className} style={{ ...svgBase, color, ...style }} role="img" aria-label="Northstar">
      <path d={STAR_PATH} fill="currentColor" transform="translate(0 2) scale(0.8333)" />
      <text x={28} y={19} fontFamily={FONT} fontSize={21} fontWeight={720} letterSpacing="-0.4" fill="currentColor" textLength={136} lengthAdjust="spacingAndGlyphs">
        Northstar
      </text>
    </svg>
  )
}

export const LogoHeader = (p) => <NorthstarLogo color={C.n90} {...p} />
export const LogoFooter = (p) => <NorthstarLogo color={C.white} {...p} />

/** wordmark-footer: giant ghost wordmark, 10.4:1, rgba(255,255,255,.05). */
export function WordmarkFooter({ color = 'rgba(255,255,255,0.05)', className, style }) {
  return (
    <svg viewBox="0 0 1280 123" className={className} style={{ ...svgBase, ...style }} role="img" aria-label="Northstar" preserveAspectRatio="xMidYMid meet">
      <text x={0} y={112} fontFamily={FONT} fontSize={150} fontWeight={800} letterSpacing="-4" fill={color} textLength={1280} lengthAdjust="spacingAndGlyphs">
        northstar
      </text>
    </svg>
  )
}

const PRODUCT_TINTS = {
  Agent: [C.green, C.greenDeep],
  Inbox: [C.p40, C.p60],
  Pages: [C.orange, C.orangeDeep],
}

/** Product lockup: gradient star tile + "Northstar <Product>", 25px tall. */
export function Lockup({ product = 'Inbox', width = 208, color = C.n90, className, style }) {
  const uid = useUid('lk')
  const [a, b] = PRODUCT_TINTS[product] ?? PRODUCT_TINTS.Inbox
  const textW = width - 34
  return (
    <svg viewBox={`0 0 ${width} 25`} className={className} style={{ ...svgBase, color, ...style }} role="img" aria-label={`Northstar ${product}`}>
      <defs>
        <linearGradient id={`${uid}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={25} height={25} rx={6} fill={`url(#${uid}-t)`} />
      <path d={STAR_PATH} fill="#fff" transform="translate(5.5 5.5) scale(0.5833)" />
      <text x={34} y={19} fontFamily={FONT} fontSize={20} fill="currentColor" textLength={textW} lengthAdjust="spacingAndGlyphs">
        <tspan fontWeight={720}>Northstar </tspan>
        <tspan fontWeight={480}>{product}</tspan>
      </text>
    </svg>
  )
}

export const LockupAgent = (p) => <Lockup product="Agent" width={195} {...p} />
export const LockupInbox = (p) => <Lockup product="Inbox" width={208} {...p} />
export const LockupPages = (p) => <Lockup product="Pages" width={211} {...p} />

/* ------------------------------------------------------------------ */
/* Customer logos (fictional)                                          */
/* ------------------------------------------------------------------ */

function LogoFrame({ w, label, color, opacity, className, style, children }) {
  return (
    <svg
      viewBox={`0 0 ${w} 80`}
      className={className}
      style={{ ...svgBase, color, ...style }}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <g opacity={opacity} fill="currentColor" fontFamily={FONT}>
        {children}
      </g>
    </svg>
  )
}

const LOGO_DEFAULTS = { color: C.n90, opacity: 0.55 }

export function LogoHalcyon(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={229} label="Halcyon" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M50 46 a14 14 0 0 1 28 0 z" />
      <rect x={46} y={49} width={36} height={3} rx={1.5} />
      <rect x={52} y={55} width={24} height={3} rx={1.5} />
      <text x={90} y={50} fontSize={24} fontWeight={620} letterSpacing="-0.4" textLength={92} lengthAdjust="spacingAndGlyphs">
        Halcyon
      </text>
    </LogoFrame>
  )
}

export function LogoBrightfield(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={213} label="Brightfield" color={color} opacity={opacity} className={p.className} style={p.style}>
      <rect x={34} y={28} width={10} height={10} rx={2} />
      <rect x={47} y={28} width={10} height={10} rx={2} opacity={0.55} />
      <rect x={34} y={41} width={10} height={10} rx={2} opacity={0.55} />
      <rect x={47} y={41} width={10} height={10} rx={2} />
      <text x={66} y={48} fontSize={22} fontWeight={760} letterSpacing="-0.6" textLength={112} lengthAdjust="spacingAndGlyphs">
        Brightfield
      </text>
    </LogoFrame>
  )
}

export function LogoOdessaLabs(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={228} label="Odessa Labs" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M46 27 l12 7 v14 l-12 7 l-12 -7 v-14 z" fill="none" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" />
      <circle cx={46} cy={41} r={4} />
      <text x={66} y={48} fontSize={22} textLength={128} lengthAdjust="spacingAndGlyphs">
        <tspan fontWeight={650}>odessa</tspan>
        <tspan fontWeight={380}> labs</tspan>
      </text>
    </LogoFrame>
  )
}

export function LogoKestrel(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={230} label="Kestrel" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M38 50 L52 30 L58 40 L66 32 L60 50 L54 44 Z" />
      <text x={76} y={48} fontSize={19} fontWeight={800} letterSpacing="4" textLength={112} lengthAdjust="spacing">
        KESTREL
      </text>
    </LogoFrame>
  )
}

export function LogoMarlow(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={213} label="Marlow & Co" color={color} opacity={opacity} className={p.className} style={p.style}>
      <text x={106.5} y={49} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize={25} fontWeight={600} textLength={136} lengthAdjust="spacingAndGlyphs">
        Marlow &amp; Co
      </text>
      <rect x={66} y={56} width={81} height={1.5} />
    </LogoFrame>
  )
}

export function LogoVoltline(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={213} label="Voltline" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M36 41 h8 l5 -10 l7 20 l5 -10 h8" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      <text x={78} y={48} fontSize={23} fontWeight={760} letterSpacing="-0.8" textLength={96} lengthAdjust="spacingAndGlyphs">
        voltline
      </text>
    </LogoFrame>
  )
}

// logo-7..11: extra invented wordmarks so the strip's rotation pool matches
// the original's size (11 logos cycling through 6 cells).

export function LogoPinecrest(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={220} label="Pinecrest" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M44 24 L56 40 H50 L60 53 H28 L38 40 H32 Z" />
      <text x={68} y={48} fontSize={23} fontWeight={680} letterSpacing="-0.5" textLength={108} lengthAdjust="spacingAndGlyphs">
        Pinecrest
      </text>
    </LogoFrame>
  )
}

export function LogoNorthbayHealth(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={232} label="Northbay Health" color={color} opacity={opacity} className={p.className} style={p.style}>
      <rect x={30} y={27} width={26} height={26} rx={8} fill="none" stroke="currentColor" strokeWidth={3} />
      <rect x={41} y={32} width={4} height={16} rx={1} />
      <rect x={35} y={38} width={16} height={4} rx={1} />
      <text x={66} y={48} fontSize={21} textLength={140} lengthAdjust="spacingAndGlyphs">
        <tspan fontWeight={720}>Northbay</tspan>
        <tspan fontWeight={400}> Health</tspan>
      </text>
    </LogoFrame>
  )
}

export function LogoCorvid(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={213} label="Corvid" color={color} opacity={opacity} className={p.className} style={p.style}>
      <circle cx={52} cy={40} r={13} fill="none" stroke="currentColor" strokeWidth={4} strokeDasharray="62 20" transform="rotate(30 52 40)" />
      <circle cx={52} cy={40} r={3.5} />
      <text x={74} y={49} fontSize={25} fontWeight={600} letterSpacing="-0.9" textLength={84} lengthAdjust="spacingAndGlyphs">
        corvid
      </text>
    </LogoFrame>
  )
}

export function LogoAldergrove(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={228} label="Aldergrove" color={color} opacity={opacity} className={p.className} style={p.style}>
      <text x={114} y={47} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize={22} fontWeight={500} letterSpacing="3" textLength={150} lengthAdjust="spacing">
        ALDERGROVE
      </text>
      <rect x={84} y={53} width={60} height={1.5} />
    </LogoFrame>
  )
}

export function LogoTessellate(p) {
  const { color, opacity } = { ...LOGO_DEFAULTS, ...p }
  return (
    <LogoFrame w={222} label="Tessellate" color={color} opacity={opacity} className={p.className} style={p.style}>
      <path d="M32 52 L42 28 L52 52 Z" />
      <path d="M44 28 L54 52 L64 28 Z" opacity={0.55} />
      <text x={72} y={48} fontSize={22} fontWeight={560} letterSpacing="-0.4" textLength={112} lengthAdjust="spacingAndGlyphs">
        Tessellate
      </text>
    </LogoFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Hero nav icons (24x24, currentColor)                                */
/* ------------------------------------------------------------------ */

function NavIcon({ children, className, style, label }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={{ ...svgBase, ...style }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  )
}

/** Inbox: tray with a rising envelope flap. */
export const HeroNavIconInbox = (p) => (
  <NavIcon label="Inbox" {...p}>
    <path d="M3 13.5 5.4 5.8A2 2 0 0 1 7.3 4.5h9.4a2 2 0 0 1 1.9 1.3L21 13.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M3 13.5h5l1.5 2.5h5l1.5-2.5h5" />
  </NavIcon>
)

/** Agent: four-point star with an orbiting spark. */
export const HeroNavIconAgent = (p) => (
  <NavIcon label="Agent" {...p}>
    <path d="M11 4 12.6 9.4 18 11l-5.4 1.6L11 18l-1.6-5.4L4 11l5.4-1.6z" />
    <path d="M19 3v3M17.5 4.5h3" />
  </NavIcon>
)

/** Pages: folded page with text lines. */
export const HeroNavIconPages = (p) => (
  <NavIcon label="Pages" {...p}>
    <path d="M6 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M14 3v4h4M8 12h8M8 16h5" />
  </NavIcon>
)

/* ------------------------------------------------------------------ */
/* Gradient tiles: signin-tile-1..3 (48px, r12) & tab-icon-1..15 (70px)*/
/* ------------------------------------------------------------------ */


// signin-tile radius 12 at 48px => 17.5 on a 70 canvas; glyph 20px => ~29
export const SigninTileInbox = tile(Mail, 'night', 'Inbox', 17.5, 29)
export const SigninTileAgent = tile(Bot, 'night', 'Agent', 17.5, 29)
export const SigninTilePages = tile(FileText, 'night', 'Pages', 17.5, 29)


/* ------------------------------------------------------------------ */
/* tab-card-bg · tonal background for tab cards (radius 12, #f2f0eb)   */
/* ------------------------------------------------------------------ */

export function TabCardBg({ className, style }) {
  const uid = useUid('tb')
  return (
    <svg viewBox="0 0 405 262" preserveAspectRatio="xMidYMid slice" className={className} style={{ ...svgBase, overflow: 'hidden', ...style }} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-r`} cx="1" cy="0" r="1.1">
          <stop offset="0" stopColor={C.p10} />
          <stop offset="0.55" stopColor="#efeaf4" />
          <stop offset="1" stopColor={C.n10} />
        </radialGradient>
      </defs>
      <rect width={405} height={262} fill={`url(#${uid}-r)`} />
      <g fill="none" stroke={C.p30} strokeOpacity="0.22" strokeWidth={1}>
        {[60, 110, 160, 210, 260, 310].map((r) => (
          <circle key={r} cx={405} cy={0} r={r} />
        ))}
      </g>
      <path d={STAR_PATH} fill={C.p30} fillOpacity="0.18" transform="translate(338 26) scale(1.6)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* bg-cta · animated gradient + grain for the final CTA (#281647)      */
/* ------------------------------------------------------------------ */

const SPARKS = [
  [62, 22, 1.4, 0],
  [74, 64, 1, 1.2],
  [86, 30, 1.6, 2.1],
  [92, 74, 1.1, 0.6],
  [55, 80, 1, 3.1],
  [80, 12, 1.2, 1.7],
  [96, 46, 1.4, 2.6],
]

export function CtaBackground({ className = '', style }) {
  const uid = useUid('cta')
  return (
    <div
      className={`ns-cta ${className}`}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.p100, ...style }}
      aria-hidden="true"
    >
      <div className="ns-blob ns-blob-a" style={{ width: '55%', height: '160%', left: '45%', top: '-60%', background: C.p60, opacity: 0.55 }} />
      <div className="ns-blob ns-blob-b" style={{ width: '45%', height: '140%', left: '60%', top: '10%', background: C.p80, opacity: 0.8 }} />
      <div className="ns-blob ns-blob-c" style={{ width: '35%', height: '120%', left: '25%', top: '40%', background: C.p90, opacity: 0.7 }} />
      <div
        className="ns-sheen"
        style={{
          position: 'absolute',
          inset: '-20% -40%',
          background: 'linear-gradient(115deg, transparent 35%, rgba(212,199,255,0.10) 50%, transparent 65%)',
        }}
      />
      {/* keep the left (headline) side calm and readable */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${C.p100} 0%, rgba(40,22,71,0.85) 30%, rgba(40,22,71,0) 70%)` }} />
      {/* grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <filter id={`${uid}-n`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${uid}-n)`} />
      </svg>
      {/* sparks, positioned in % so they survive any section aspect */}
      {SPARKS.map(([x, y, s, d]) => (
        <svg
          key={`${x}-${y}`}
          className="ns-twinkle"
          viewBox="0 0 24 24"
          style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s * 10, height: s * 10, animationDelay: `${d}s` }}
        >
          <path d={STAR_PATH} fill={C.p20} />
        </svg>
      ))}
    </div>
  )
}
