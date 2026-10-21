// /enterprise page media: ent-hero, ent-report, ent-resource-1..4 and the
// ent-security-1..6 icon tiles. All original, static (no motion), inline SVG.
// Names, numbers and workspaces are invented.
import {
  Activity,
  Bot,
  CalendarDays,
  CreditCard,
  FileText,
  Inbox,
  LayoutGrid,
  Mail,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Art, Avatar, Chip, Dots, Glow, Ico, Line, Star, T, Window } from './primitives'
import { C, STAR_PATH, useUid } from './tokens'

const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif"

/** Wavy "handwriting" strokes: n parallel sine lines filling a box. */
function scribble(x, y, w, h, n, amp = 4, period = 26, seed = 0) {
  const out = []
  for (let i = 0; i < n; i++) {
    const yy = y + (i + 0.5) * (h / n)
    let d = `M${x} ${yy}`
    for (let px = 0; px <= w; px += 6) {
      const k = Math.sin((px + i * 17 + seed) / period) * amp * (0.6 + 0.4 * Math.sin(i * 1.7 + px / 90))
      d += ` L${x + px} ${(yy + k).toFixed(1)}`
    }
    out.push(d)
  }
  return out
}

/* ------------------------------------------------------------------ */
/* ent-hero (1080:990, #281647): workspace overview console            */
/* ------------------------------------------------------------------ */

const HERO_FLOAT = [
  [Mail, 24, 92, 58, -8],
  [Sparkles, 950, 70, 64, 10],
  [CalendarDays, 18, 470, 54, 6],
  [Bot, 1000, 380, 56, -6],
  [MessageSquare, 120, 878, 52, 8],
  [FileText, 900, 880, 58, -10],
  [Zap, 520, 40, 48, 0],
  [Users, 1006, 640, 48, 12],
  [Inbox, 340, 905, 46, -4],
]

export function EntHero({ className, style }) {
  const uid = useUid('eh')
  const x = 96
  const y = 168
  const w = 888
  const h = 620
  const nav = 196
  const cx = x + nav + 30
  const cw = x + w - 30 - cx
  const spark = [10, 14, 13, 19, 22, 21, 28, 31, 30, 37, 41, 44]
  const sw = 150
  const sh = 40
  const sp = spark.map((v, i) => `${i ? 'L' : 'M'}${(i / (spark.length - 1)) * sw} ${sh - (v / 46) * sh}`).join(' ')
  return (
    <Art w={1080} h={990} bg={C.p100} label="Workspace overview with seats, adoption by product and members" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.p60} />
          <stop offset="1" stopColor={C.p100} />
        </linearGradient>
        <linearGradient id={`${uid}-fl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.p20} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.p20} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.p40} />
          <stop offset="1" stopColor={C.p60} />
        </linearGradient>
      </defs>
      <Glow id={`${uid}-g1`} cx={880} cy={120} r={520} color={C.p60} opacity={0.55} />
      <Glow id={`${uid}-g2`} cx={140} cy={900} r={480} color="#8a1450" opacity={0.45} />
      <rect x={60} y={120} width={960} height={720} rx={40} fill="rgba(212,199,255,0.07)" stroke="rgba(212,199,255,0.14)" strokeWidth={2} />

      {/* floating lavender app glyphs */}
      {HERO_FLOAT.map(([I, fx, fy, s, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${fx + s / 2} ${fy + s / 2})`}>
          <rect x={fx} y={fy} width={s} height={s} rx={s * 0.28} fill={`url(#${uid}-fl)`} stroke="rgba(212,199,255,0.3)" strokeWidth={1.5} />
          <Ico as={I} x={fx + s * 0.27} y={fy + s * 0.27} size={s * 0.46} color={C.p20} stroke={1.8} />
        </g>
      ))}

      <Window id={`${uid}-win`} x={x} y={y} w={w} h={h} r={24} fill={C.n0}>
        {/* top bar */}
        <rect x={x} y={y} width={w} height={56} fill={C.white} />
        <line x1={x} x2={x + w} y1={y + 56} y2={y + 56} stroke={C.n20} strokeWidth={1.5} />
        <Dots x={x + 26} y={y + 28} />
        <rect x={x + w - 300} y={y + 13} width={270} height={30} rx={15} fill={C.n10} />
        <Ico as={Search} x={x + w - 288} y={y + 21} size={14} color={C.n40} />
        <T x={x + w - 266} y={y + 33} size={13} weight={500} fill={C.n40}>
          Search members, settings…
        </T>

        {/* sidebar */}
        <rect x={x} y={y + 56} width={nav} height={h - 56} fill={C.n5} />
        <line x1={x + nav} x2={x + nav} y1={y + 56} y2={y + h} stroke={C.n20} strokeWidth={1.5} />
        <rect x={x + 18} y={y + 76} width={30} height={30} rx={8} fill={`url(#${uid}-tile)`} />
        <Star x={x + 24} y={y + 82} size={18} fill={C.white} />
        <T x={x + 58} y={y + 89} size={14} weight={700}>
          Fernhill Studio
        </T>
        <T x={x + 58} y={y + 105} size={11.5} weight={500} fill={C.n60}>
          Enterprise
        </T>
        {[
          [LayoutGrid, 'Overview', true],
          [Users, 'Members'],
          [Sparkles, 'Products'],
          [ShieldCheck, 'Security'],
          [Activity, 'Audit log'],
          [CreditCard, 'Billing'],
        ].map(([I, label, active], i) => (
          <g key={label}>
            {active && <rect x={x + 12} y={y + 130 + i * 40} width={nav - 24} height={32} rx={8} fill={C.p10} />}
            <Ico as={I} x={x + 24} y={y + 138 + i * 40} size={16} color={active ? C.p80 : C.n60} />
            <T x={x + 50} y={y + 151 + i * 40} size={13.5} weight={active ? 650 : 520} fill={active ? C.p90 : C.n80}>
              {label}
            </T>
          </g>
        ))}
        <rect x={x + 14} y={y + h - 92} width={nav - 28} height={72} rx={12} fill={C.white} stroke={C.n20} />
        <T x={x + 28} y={y + h - 64} size={12} weight={650}>
          Renewal in 84 days
        </T>
        <Line x={x + 28} y={y + h - 50} w={nav - 56} h={6} fill={C.n10} />
        <Line x={x + 28} y={y + h - 50} w={(nav - 56) * 0.72} h={6} fill={C.p50} />

        {/* header */}
        <T x={cx} y={y + 100} size={24} weight={720} letterSpacing="-0.4">
          Workspace overview
        </T>
        <T x={cx} y={y + 124} size={13.5} weight={500} fill={C.n60}>
          Last 30 days · 3 verified domains
        </T>
        <Chip x={x + w - 30 - 118} y={y + 84} w={118} h={32} fill={C.n90} text="Invite people" color={C.white} size={13} />

        {/* KPI cards */}
        {[0, 1, 2].map((i) => {
          const kw = (cw - 28) / 3
          const kx = cx + i * (kw + 14)
          const ky = y + 148
          return (
            <g key={i}>
              <rect x={kx} y={ky} width={kw} height={112} rx={14} fill={C.white} stroke={C.n20} />
              {i === 0 && (
                <>
                  <T x={kx + 18} y={ky + 30} size={12.5} weight={560} fill={C.n60}>
                    Seats in use
                  </T>
                  <T x={kx + 18} y={ky + 66} size={26} weight={720} letterSpacing="-0.5">
                    1,248
                  </T>
                  <T x={kx + 92} y={ky + 66} size={14} weight={520} fill={C.n40}>
                    / 1,400
                  </T>
                  <Line x={kx + 18} y={ky + 84} w={kw - 36} h={8} fill={C.n10} />
                  <Line x={kx + 18} y={ky + 84} w={(kw - 36) * 0.89} h={8} fill={`url(#${uid}-bar)`} />
                </>
              )}
              {i === 1 && (
                <>
                  <T x={kx + 18} y={ky + 30} size={12.5} weight={560} fill={C.n60}>
                    Weekly active
                  </T>
                  <T x={kx + 18} y={ky + 66} size={26} weight={720} letterSpacing="-0.5">
                    91%
                  </T>
                  <g transform={`translate(${kx + 18} ${ky + 72}) scale(${(kw - 36) / sw} 0.75)`}>
                    <path d={sp} fill="none" stroke={C.p50} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  </g>
                </>
              )}
              {i === 2 && (
                <>
                  <T x={kx + 18} y={ky + 30} size={12.5} weight={560} fill={C.n60}>
                    Hours saved
                  </T>
                  <T x={kx + 18} y={ky + 66} size={26} weight={720} letterSpacing="-0.5">
                    4,120
                  </T>
                  <Chip x={kx + 18} y={ky + 78} w={60} h={22} fill="rgba(58,199,161,0.16)" text="+12%" color={C.greenDeep} size={12} />
                </>
              )}
            </g>
          )
        })}

        {/* adoption by product */}
        {(() => {
          const ax = cx
          const ay = y + 276
          const aw = cw * 0.56
          return (
            <g>
              <rect x={ax} y={ay} width={aw} height={282} rx={14} fill={C.white} stroke={C.n20} />
              <T x={ax + 20} y={ay + 34} size={15} weight={680}>
                Adoption by product
              </T>
              {[
                ['Inbox', 0.94, [C.p40, C.p60]],
                ['Agents', 0.78, [C.green, C.greenDeep]],
                ['Pages', 0.63, [C.orange, C.orangeDeep]],
                ['Assistant', 0.71, [C.p60, C.m100]],
              ].map(([name, v, [a, b]], i) => {
                const ry = ay + 64 + i * 52
                return (
                  <g key={name}>
                    <defs>
                      <linearGradient id={`${uid}-p${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={a} />
                        <stop offset="1" stopColor={b} />
                      </linearGradient>
                    </defs>
                    <rect x={ax + 20} y={ry} width={30} height={30} rx={8} fill={`url(#${uid}-p${i})`} />
                    <Star x={ax + 27} y={ry + 7} size={16} fill={C.white} />
                    <T x={ax + 62} y={ry + 13} size={13.5} weight={620}>
                      {name}
                    </T>
                    <Line x={ax + 62} y={ry + 20} w={aw - 140} h={7} fill={C.n10} />
                    <Line x={ax + 62} y={ry + 20} w={(aw - 140) * v} h={7} fill={b} />
                    <T x={ax + aw - 20} y={ry + 27} size={13} weight={650} fill={C.n80} anchor="end">
                      {Math.round(v * 100)}%
                    </T>
                  </g>
                )
              })}
            </g>
          )
        })()}

        {/* members */}
        {(() => {
          const mx = cx + cw * 0.56 + 14
          const my = y + 276
          const mw = cw - cw * 0.56 - 14
          return (
            <g>
              <rect x={mx} y={my} width={mw} height={282} rx={14} fill={C.white} stroke={C.n20} />
              <T x={mx + 18} y={my + 34} size={15} weight={680}>
                New members
              </T>
              {[
                ['AL', 'Ada L.', 'Admin', C.p50],
                ['TN', 'Theo N.', 'Member', C.greenDeep],
                ['MS', 'Mira S.', 'Member', C.orangeDeep],
                ['JK', 'Jun K.', 'Owner', C.p80],
              ].map(([ini, name, role, col], i) => {
                const ry = my + 72 + i * 50
                return (
                  <g key={name}>
                    <Avatar cx={mx + 34} cy={ry} r={15} fill={col} initials={ini} />
                    <T x={mx + 58} y={ry + 5} size={13.5} weight={600}>
                      {name}
                    </T>
                    <Chip
                      x={mx + mw - 18 - 64}
                      y={ry - 11}
                      w={64}
                      h={22}
                      fill={role === 'Member' ? C.n10 : C.p10}
                      text={role}
                      color={role === 'Member' ? C.n60 : C.p80}
                      size={11.5}
                    />
                  </g>
                )
              })}
            </g>
          )
        })()}
      </Window>

      {/* floating status card */}
      <Window id={`${uid}-toast`} x={650} y={732} w={330} h={92} r={18} fill={C.white}>
        <rect x={670} y={754} width={48} height={48} rx={14} fill="rgba(58,199,161,0.16)" />
        <Ico as={ShieldCheck} x={682} y={766} size={24} color={C.greenDeep} />
        <T x={734} y={774} size={15} weight={680}>
          SSO enforced
        </T>
        <T x={734} y={796} size={13} weight={500} fill={C.n60}>
          All members sign in with SAML
        </T>
      </Window>
      {/* floating agents card */}
      <Window id={`${uid}-ag`} x={52} y={112} w={228} h={74} r={16} fill={C.white}>
        <rect x={68} y={128} width={42} height={42} rx={12} fill={`url(#${uid}-tile)`} />
        <path d={STAR_PATH} fill={C.white} transform="translate(77 137) scale(1)" />
        <T x={122} y={146} size={13} weight={560} fill={C.n60}>
          Agents deployed
        </T>
        <T x={122} y={168} size={19} weight={720}>
          24 active
        </T>
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* ent-report (624:488, #301860): editorial report cover               */
/* ------------------------------------------------------------------ */

export function EntReport({ className, style }) {
  const uid = useUid('er')
  const lines = scribble(40, 60, 300, 300, 22, 4.5, 22, 3)
  return (
    <Art w={624} h={488} bg="#301860" label="Abstract report cover: textured circle, violet square, folder and a serif title card" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#301860" />
          <stop offset="1" stopColor="#1f2350" />
        </linearGradient>
        <clipPath id={`${uid}-circ`}>
          <circle cx={190} cy={210} r={150} />
        </clipPath>
        <linearGradient id={`${uid}-sq`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.p40} />
          <stop offset="1" stopColor={C.p80} />
        </linearGradient>
        <linearGradient id={`${uid}-fold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5cbce8" />
          <stop offset="1" stopColor="#2f86c0" />
        </linearGradient>
        <linearGradient id={`${uid}-card`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d8ff" stopOpacity="0.26" />
          <stop offset="1" stopColor="#f0d8ff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width={624} height={488} fill={`url(#${uid}-bg)`} />
      {/* fine grid */}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={i * 52} x2={i * 52} y1={0} y2={488} stroke="#f0d8ff" strokeOpacity="0.05" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`h${i}`} x1={0} x2={624} y1={i * 52} y2={i * 52} stroke="#f0d8ff" strokeOpacity="0.05" />
      ))}

      {/* textured circle */}
      <circle cx={190} cy={210} r={150} fill="#3d2470" />
      <g clipPath={`url(#${uid}-circ)`} fill="none" stroke="#d8c4ff" strokeOpacity="0.55" strokeWidth={1.6} strokeLinecap="round">
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <circle cx={190} cy={210} r={150} fill="none" stroke="#f0d8ff" strokeOpacity="0.25" strokeWidth={1.5} />

      {/* violet square */}
      <rect x={398} y={34} width={156} height={156} rx={6} fill={`url(#${uid}-sq)`} transform="rotate(8 476 112)" />

      {/* blue folder */}
      <g transform="translate(446 350) rotate(-8)">
        <path d="M0 18 a10 10 0 0 1 10 -10 h58 l16 16 h96 a10 10 0 0 1 10 10 v118 a10 10 0 0 1 -10 10 h-170 a10 10 0 0 1 -10 -10 z" fill={`url(#${uid}-fold)`} />
        <path d="M0 50 h190 v98 a10 10 0 0 1 -10 10 h-170 a10 10 0 0 1 -10 -10 z" fill="#48a8d8" />
        <rect x={20} y={70} width={60} height={6} rx={3} fill="#e8f6ff" opacity={0.7} />
      </g>

      {/* translucent title card */}
      <rect x={236} y={168} width={300} height={226} rx={18} fill={`url(#${uid}-card)`} stroke="#f0d8ff" strokeOpacity="0.4" strokeWidth={1.5} />
      <T x={262} y={204} size={11.5} weight={650} fill="#f0d8ff" letterSpacing="2" opacity={0.85}>
        FIELD REPORT · 2026
      </T>
      <text fontFamily={SERIF} fill="#f7eeff" fontWeight={460} letterSpacing="-1">
        <tspan x={260} y={262} fontSize={46}>
          The
        </tspan>
        <tspan x={260} y={312} fontSize={46} fontStyle="italic">
          Patchwork
        </tspan>
        <tspan x={260} y={362} fontSize={46}>
          Problem
        </tspan>
      </text>
      <Star x={494} y={196} size={22} fill="#f0d8ff" />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* ent-resource-1..4 (3:2): card covers                                */
/* ------------------------------------------------------------------ */

const MAROON = '#481818'
const PLUM = '#301860'

function LineArt({ w, h, kind = 'arcs', color = '#f0c8d8', opacity = 0.22 }) {
  if (kind === 'circles') {
    return (
      <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={1.2}>
        {[40, 70, 100, 130, 160].map((r) => (
          <circle key={r} cx={w * 0.22} cy={h * 0.78} r={r} />
        ))}
        {[30, 55, 80].map((r) => (
          <circle key={`b${r}`} cx={w * 0.86} cy={h * 0.12} r={r} />
        ))}
      </g>
    )
  }
  return (
    <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={1.2}>
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${-20 + i * 46} ${h + 10} Q ${w * 0.5} ${h * 0.1 - i * 8} ${w + 20} ${-10 + i * 30}`} />
      ))}
    </g>
  )
}

function CoverTag({ x, y, label, dark = false }) {
  const w = label.length * 6.6 + 22
  return (
    <g>
      <rect x={x} y={y} width={w} height={20} rx={10} fill={dark ? 'rgba(20,10,10,0.55)' : 'rgba(255,255,255,0.16)'} stroke="rgba(255,255,255,0.28)" />
      <T x={x + w / 2} y={y + 14} size={10.5} weight={700} fill="#fff" anchor="middle" letterSpacing="1">
        {label}
      </T>
    </g>
  )
}

/** ent-resource-1 (guide): teal serif card, magenta square, white check tile. */
export function EntResourceGuide({ className, style }) {
  const uid = useUid('r1')
  return (
    <Art w={360} h={240} bg={MAROON} label="Guide cover: teal card with serif title, magenta square and a check badge" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={MAROON} />
          <stop offset="1" stopColor="#481830" />
        </linearGradient>
        <linearGradient id={`${uid}-mag`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0479e" />
          <stop offset="1" stopColor="#7a1d6a" />
        </linearGradient>
        <linearGradient id={`${uid}-teal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fd3e3" />
          <stop offset="1" stopColor="#3ea8c2" />
        </linearGradient>
      </defs>
      <rect width={360} height={240} fill={`url(#${uid}-bg)`} />
      <LineArt w={360} h={240} />
      <rect x={210} y={26} width={110} height={110} rx={8} fill={`url(#${uid}-mag)`} transform="rotate(-6 265 81)" />
      <rect x={44} y={72} width={196} height={128} rx={12} fill={`url(#${uid}-teal)`} />
      <text fontFamily={SERIF} fill="#0f2f36" fontWeight={500} letterSpacing="-0.4">
        <tspan x={62} y={118} fontSize={25}>
          From pilot
        </tspan>
        <tspan x={62} y={148} fontSize={25} fontStyle="italic">
          to practice
        </tspan>
      </text>
      <Line x={62} y={170} w={70} h={5} fill="#0f2f36" opacity={0.3} />
      <g>
        <rect x={232} y={150} width={56} height={56} rx={14} fill="#fff" />
        <circle cx={260} cy={178} r={15} fill="none" stroke={MAROON} strokeWidth={2.4} />
        <path d="M253 178 l5 5 l9 -10" fill="none" stroke={MAROON} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <CoverTag x={20} y={20} label="GUIDE" />
    </Art>
  )
}

/** ent-resource-2 (webinar): white app tile with the star, gradient serif card, play control. */
export function EntResourceWebinar({ className, style }) {
  const uid = useUid('r2')
  return (
    <Art w={360} h={240} bg={MAROON} label="Webinar cover: app tile with a star mark beside a gradient title card" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-card`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d04a9a" />
          <stop offset="0.55" stopColor="#8a7ad0" />
          <stop offset="1" stopColor="#5ec3d8" />
        </linearGradient>
        <linearGradient id={`${uid}-star`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.p60} />
          <stop offset="1" stopColor={C.m100} />
        </linearGradient>
      </defs>
      <LineArt w={360} h={240} kind="circles" />
      <rect x={138} y={46} width={196} height={150} rx={14} fill={`url(#${uid}-card)`} />
      <text fontFamily={SERIF} fill="#fff" fontWeight={480} letterSpacing="-0.4">
        <tspan x={158} y={94} fontSize={23}>
          The enterprise
        </tspan>
        <tspan x={158} y={122} fontSize={23} fontStyle="italic">
          AI briefing
        </tspan>
      </text>
      <circle cx={174} cy={164} r={14} fill="rgba(255,255,255,0.92)" />
      <path d="M170 157 l11 7 l-11 7 z" fill="#8a3a7a" />
      <Line x={196} y={161} w={110} h={6} fill="#fff" opacity={0.5} />
      <g>
        <rect x={34} y={84} width={84} height={84} rx={22} fill="#fff" />
        <rect x={34} y={84} width={84} height={84} rx={22} fill="none" stroke="#000" strokeOpacity="0.06" />
        <path d={STAR_PATH} fill={`url(#${uid}-star)`} transform="translate(52 102) scale(2)" />
      </g>
      <g>
        <circle cx={40} cy={30} r={4} fill="#ff5a6a" />
        <T x={52} y={34} size={11} weight={700} fill="#fff" letterSpacing="1">
          LIVE WEBINAR
        </T>
      </g>
    </Art>
  )
}

/** ent-resource-3 (case study, 592:395): coral painterly square + lilac diagram card. */
export function EntResourceCaseStudy({ className, style }) {
  const uid = useUid('r3')
  const bars = [38, 52, 46, 70, 84, 104]
  return (
    <Art w={592} h={395} bg={PLUM} label="Case study cover: painterly coral square beside a lilac card with a rising chart" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={PLUM} />
          <stop offset="1" stopColor="#481860" />
        </linearGradient>
        <radialGradient id={`${uid}-coral`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ff8a7a" />
          <stop offset="0.55" stopColor="#ff4860" />
          <stop offset="1" stopColor="#b8203f" />
        </radialGradient>
        <clipPath id={`${uid}-sq`}>
          <rect x={60} y={70} width={230} height={230} rx={10} />
        </clipPath>
      </defs>
      <rect width={592} height={395} fill={`url(#${uid}-bg)`} />
      <rect x={60} y={70} width={230} height={230} rx={10} fill={`url(#${uid}-coral)`} transform="rotate(-4 175 185)" />
      <g clipPath={`url(#${uid}-sq)`} transform="rotate(-4 175 185)" fill="none" strokeLinecap="round">
        {scribble(50, 60, 250, 250, 14, 9, 38, 11).map((d, i) => (
          <path key={i} d={d} stroke={i % 3 ? '#ffb0a0' : '#8a1030'} strokeOpacity={i % 3 ? 0.35 : 0.3} strokeWidth={i % 2 ? 7 : 4} />
        ))}
      </g>
      <rect x={250} y={110} width={290} height={210} rx={18} fill="#f0d8ff" />
      <T x={276} y={150} size={13} weight={700} fill={C.p90} letterSpacing="1.5">
        CASE STUDY
      </T>
      <text x={276} y={186} fontFamily={SERIF} fontSize={26} fontWeight={500} fill={C.p100} letterSpacing="-0.4">
        3.4x faster replies
      </text>
      {bars.map((b, i) => (
        <rect key={i} x={278 + i * 38} y={296 - b} width={24} height={b} rx={5} fill={i === bars.length - 1 ? '#ff4860' : C.p30} />
      ))}
      <path d={bars.map((b, i) => `${i ? 'L' : 'M'}${290 + i * 38} ${288 - b}`).join(' ')} fill="none" stroke={C.p90} strokeWidth={2} strokeDasharray="4 5" />
      <Star x={500} y={128} size={20} fill={C.p60} />
    </Art>
  )
}

/** ent-resource-4 (checklist): line-art circles, orange arc, white orb, gem, iridescent checklist card. */
export function EntResourceChecklist({ className, style }) {
  const uid = useUid('r4')
  return (
    <Art w={360} h={240} bg={MAROON} label="Checklist cover: iridescent card with ticked rows, a faceted gem and an orange arc" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={MAROON} />
          <stop offset="1" stopColor="#481830" />
        </linearGradient>
        <linearGradient id={`${uid}-iri`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d8ff" />
          <stop offset="0.5" stopColor="#ffe0ec" />
          <stop offset="1" stopColor="#d8f0ff" />
        </linearGradient>
        <linearGradient id={`${uid}-arc`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.orange} />
          <stop offset="1" stopColor={C.orangeDeep} />
        </linearGradient>
      </defs>
      <rect width={360} height={240} fill={`url(#${uid}-bg)`} />
      <LineArt w={360} h={240} kind="circles" />
      <path d="M-10 214 C 40 120, 120 100, 168 136" fill="none" stroke={`url(#${uid}-arc)`} strokeWidth={20} strokeLinecap="round" />
      <circle cx={70} cy={74} r={30} fill="#fff" />
      <rect x={150} y={42} width={168} height={160} rx={14} fill={`url(#${uid}-iri)`} />
      <T x={168} y={70} size={11} weight={700} fill={C.p90} letterSpacing="1.2">
        AI CHECKLIST
      </T>
      {[0.82, 0.64, 0.74, 0.5].map((v, i) => {
        const ry = 88 + i * 26
        const done = i < 3
        return (
          <g key={i}>
            <rect x={168} y={ry} width={16} height={16} rx={4} fill={done ? C.p60 : 'none'} stroke={C.p60} strokeWidth={1.6} />
            {done && <path d={`M${172} ${ry + 8} l3 3 l6 -6`} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
            <Line x={192} y={ry + 5} w={104 * v} h={6} fill={C.p90} opacity={done ? 0.35 : 0.6} />
          </g>
        )
      })}
      {/* gem */}
      <g transform="translate(110 150)">
        <path d="M0 14 L14 0 H42 L56 14 L28 50 Z" fill="#7a5ad8" />
        <path d="M0 14 H56 L28 50 Z" fill="#5ec3d8" />
        <path d="M14 0 L20 14 H36 L42 0 Z" fill="#b8a6ff" />
        <path d="M20 14 L28 50 L36 14 Z" fill="#9ae0ec" />
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* ent-security-1..6 (69x71): white tile + centred 20px line icon      */
/* ------------------------------------------------------------------ */

const SEC_PATHS = {
  // own-key encryption: key with a small star bow
  encryption: (
    <>
      <circle cx="8" cy="15" r="4.5" />
      <path d="M11.2 11.8 L20 3 M16.5 6.5 l2.5 2.5 M14 9 l2 2" />
      <path d="M8 13.2 L8.5 14.5 L9.8 15 L8.5 15.5 L8 16.8 L7.5 15.5 L6.2 15 L7.5 14.5 Z" fill="currentColor" stroke="none" />
    </>
  ),
  // reporting / audit log: page with rising bars
  audit: (
    <>
      <path d="M6 3 h8 l4 4 v13 a1 1 0 0 1 -1 1 h-11 a1 1 0 0 1 -1 -1 v-16 a1 1 0 0 1 1 -1 z" />
      <path d="M14 3 v4 h4" />
      <path d="M9 17 v-3 M12 17 v-5 M15 17 v-2" />
    </>
  ),
  // admin controls: sliders
  admin: (
    <>
      <path d="M4 6 h16 M4 12 h16 M4 18 h16" strokeOpacity="0.45" />
      <circle cx="15" cy="6" r="2.2" fill="#fff" />
      <circle cx="8" cy="12" r="2.2" fill="#fff" />
      <circle cx="13" cy="18" r="2.2" fill="#fff" />
    </>
  ),
  // single sign-on: fingerprint arcs
  sso: (
    <>
      <path d="M5.5 9 a7 7 0 0 1 13 0" />
      <path d="M4.5 14.5 a8 8 0 0 0 .3 -2 M19.2 12.5 a8 8 0 0 1 -.6 3.5" />
      <path d="M8 18.5 a6 6 0 0 0 1.2 -4.5 a3 3 0 0 1 6 0 a10 10 0 0 1 -1.2 6" />
      <path d="M12 14 v1.5 a9 9 0 0 1 -2 5" />
      <path d="M7.2 12.5 a5 5 0 0 1 9.8 0 v1" />
    </>
  ),
  // custom roles: person + shield
  roles: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20 a6 6 0 0 1 10 -4.5" />
      <path d="M17.5 12 l3.5 1.4 v2.8 c0 2.4 -1.6 3.8 -3.5 4.6 c-1.9 -.8 -3.5 -2.2 -3.5 -4.6 v-2.8 z" />
      <path d="M16.2 16.3 l1 1 l1.8 -2" />
    </>
  ),
  // data retention / standards: folder + lock
  retention: (
    <>
      <path d="M3 7 a1 1 0 0 1 1 -1 h5 l2 2 h9 a1 1 0 0 1 1 1 v10 a1 1 0 0 1 -1 1 h-16 a1 1 0 0 1 -1 -1 z" />
      <rect x="9.5" y="13" width="5" height="4" rx="0.8" />
      <path d="M10.5 13 v-1.2 a1.5 1.5 0 0 1 3 0 v1.2" />
    </>
  ),
}

function SecurityTile({ kind, label, className, style }) {
  return (
    <svg
      viewBox="0 0 69 71"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', color: C.n90, ...style }}
      role="img"
      aria-label={label}
    >
      <rect x={0} y={0} width={69} height={71} rx={12} fill={C.white} />
      <g
        transform="translate(24.5 25.5) scale(0.8333)"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {SEC_PATHS[kind]}
      </g>
    </svg>
  )
}

export const SecurityEncryption = (p) => <SecurityTile kind="encryption" label="Encryption key" {...p} />
export const SecurityAudit = (p) => <SecurityTile kind="audit" label="Audit report" {...p} />
export const SecurityAdmin = (p) => <SecurityTile kind="admin" label="Admin controls" {...p} />
export const SecuritySso = (p) => <SecurityTile kind="sso" label="Single sign-on" {...p} />
export const SecurityRoles = (p) => <SecurityTile kind="roles" label="Roles and permissions" {...p} />
export const SecurityRetention = (p) => <SecurityTile kind="retention" label="Data retention" {...p} />
