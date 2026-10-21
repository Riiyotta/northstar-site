// /mail small art: grid tiles (mail-grid-*, 480x308), pillar icons,
// compatibility glyphs, the stat watermark, quote avatars and quote
// wordmarks. Static inline SVG; every name, provider and company is invented.
import {
  Archive,
  CalendarDays,
  FileText,
  Languages,
  Mail,
  Presentation,
  Reply,
  Search,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Art, Avatar, Ico, T } from './primitives'
import { Bleed, Card, Glass, IconTile, SoftShadow, Toggle } from './mailDocs-kit'
import { C, useUid } from './tokens'

const GW = 480
const GH = 308
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"

/* ------------------------------------------------------------------ */
/* mail-grid-send-later · Translate any thread instantly               */
/* ------------------------------------------------------------------ */

export function MailGridTranslate({ className, style }) {
  const uid = useUid('mgt')
  const x = 40
  const y = 38
  const w = 400
  return (
    <Art w={GW} h={GH} label="A message shown translated into English, with the original line above" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.sky} to={C.skyDeep} glow={C.skyLight} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={300} r={18}>
        <Avatar cx={x + 38} cy={y + 38} r={18} fill={C.orange} initials="LF" />
        <T x={x + 66} y={y + 44} size={17} weight={700}>
          Lucía Ferraz
        </T>
        <T x={x + w - 22} y={y + 44} size={14} weight={560} fill={C.n40} anchor="end">
          9:12 AM
        </T>
        <line x1={x} x2={x + w} y1={y + 70} y2={y + 70} stroke={C.n10} strokeWidth={1.5} />
        <T x={x + 22} y={y + 98} size={14} weight={500} fill={C.n40} fontStyle="italic">
          Olá equipe, a entrega mudou para sexta.
        </T>
        <T x={x + 22} y={y + 130} size={18} weight={600}>
          Hi team, the delivery moved to Friday.
        </T>
        <T x={x + 22} y={y + 158} size={18} weight={600}>
          I will share the new plan by noon.
        </T>
        <rect x={x + 22} y={y + 182} width={w - 44} height={40} rx={20} fill={C.p0} stroke={C.p20} />
        <Ico as={Languages} x={x + 38} y={y + 192} size={20} color={C.p60} />
        <T x={x + 66} y={y + 207} size={14} weight={680} fill={C.p60}>
          Translated from Portuguese
        </T>
        <T x={x + w - 40} y={y + 207} size={14} weight={600} fill={C.n60} anchor="end">
          Show original
        </T>
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-grid-quick-reply · Read a long thread as a recap               */
/* ------------------------------------------------------------------ */

export function MailGridRecap({ className, style }) {
  const uid = useUid('mgr')
  const chips = [
    ['Recap', 104, true],
    ['Decisions', 130],
    ['Open items', 136],
  ]
  return (
    <Art w={GW} h={GH} label="A 23-message thread condensed into a three-point recap" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.sky} to={C.p40} glow={C.p10} />
      {chips.reduce(
        (acc, [label, cw, on]) => {
          acc.nodes.push(
            <g key={label}>
              <Glass x={acc.x} y={30} w={cw} h={40} r={20} strong={on} />
              <T x={acc.x + cw / 2} y={56} size={16} weight={700} fill={on ? C.p60 : C.white} anchor="middle">
                {label}
              </T>
            </g>,
          )
          acc.x += cw + 10
          return acc
        },
        { x: 40, nodes: [] },
      ).nodes}
      <Card id={`${uid}-c`} x={40} y={90} w={400} h={250} r={18}>
        <Ico as={Sparkles} x={62} y={112} size={20} color={C.p60} />
        <T x={92} y={128} size={17} weight={720}>
          Recap of 23 messages
        </T>
        <T x={418} y={128} size={13} weight={560} fill={C.n40} anchor="end">
          5 people
        </T>
        {['Budget approved at $40k for Q1', 'Mina owns the vendor follow-up', 'Still open: date for the kickoff'].map((t, i) => (
          <g key={t}>
            <circle cx={68} cy={162 + i * 34} r={4} fill={i === 2 ? C.orange : C.p50} />
            <T x={84} y={168 + i * 34} size={16} weight={540} fill={C.n80}>
              {t}
            </T>
          </g>
        ))}
        <T x={62} y={282} size={14} weight={680} fill={C.p60}>
          Jump to the thread →
        </T>
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-grid-snooze · Archive a whole sender in one go                 */
/* ------------------------------------------------------------------ */

export function MailGridArchiveSender({ className, style }) {
  const uid = useUid('mga')
  const cy = 154
  const wheel = [
    ['Cloudbox Alerts', -84, 0.28],
    ['Daily Deals Club', -44, 0.5],
    ['Travel Points', 44, 0.5],
    ['Weekend Picks', 84, 0.28],
  ]
  return (
    <Art w={GW} h={GH} label="Archiving every email from one sender, picked from a scrolling list" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.indigo} to={C.indigoDeep} glow={C.p30} />
      {wheel.map(([n, dy, o]) => (
        <T key={n} x={150} y={cy + dy + 6} size={17} weight={600} fill={C.white} opacity={o}>
          {n}
        </T>
      ))}
      <Glass x={52} y={cy - 30} w={60} h={60} r={18} />
      <Ico as={Archive} x={70} y={cy - 12} size={24} color={C.white} />
      <defs>
        <SoftShadow id={`${uid}-s`} dy={8} blur={10} opacity={0.22} />
      </defs>
      <rect x={128} y={cy - 30} width={302} height={60} rx={30} fill={C.white} filter={`url(#${uid}-s)`} />
      <rect x={140} y={cy - 18} width={36} height={36} rx={10} fill={C.orangeDeep} />
      <T x={158} y={cy + 7} size={18} weight={800} fill={C.white} anchor="middle">
        P
      </T>
      <T x={188} y={cy + 6} size={18} weight={720}>
        Promo Weekly
      </T>
      <T x={414} y={cy + 6} size={14} weight={650} fill={C.n40} anchor="end">
        48 emails
      </T>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-grid-shortcuts · Attach files from any cloud drive              */
/* ------------------------------------------------------------------ */

function DriveGlyph({ kind, x, y }) {
  if (kind === 'cloud')
    return <path d={`M${x + 9} ${y + 27} a7 7 0 0 1 1 -14 a9 9 0 0 1 17 -1 a6.5 6.5 0 0 1 2 15 z`} fill={C.skyDeep} />
  if (kind === 'stack')
    return (
      <g>
        <rect x={x + 7} y={y + 7} width={16} height={16} rx={4} fill={C.green} />
        <rect x={x + 14} y={y + 14} width={16} height={16} rx={4} fill={C.greenDeep} opacity={0.9} />
      </g>
    )
  return (
    <g>
      <circle cx={x + 19} cy={y + 19} r={11} fill="none" stroke={C.p60} strokeWidth={5} />
      <circle cx={x + 28} cy={y + 10} r={4} fill={C.orange} />
    </g>
  )
}

const FILES = [
  ['cloud', 'brief_v3.pdf'],
  ['stack', 'q4-budget.xlsx'],
  ['ring', 'offsite.deck'],
  ['cloud', 'logo-kit.zip'],
  ['ring', 'notes.md'],
  ['stack', 'photos/'],
]

export function MailGridAttach({ className, style }) {
  const uid = useUid('mgf')
  return (
    <Art w={GW} h={GH} label="Files from several cloud drives offered as attachments" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.indigo} to={C.p60} glow={C.sky} />
      <T x={40} y={46} size={13} weight={750} fill={C.white} opacity={0.8} letterSpacing="0.1em">
        ATTACH FROM ANY DRIVE
      </T>
      {FILES.map(([kind, name], i) => {
        const cx = 40 + (i % 2) * 206
        const cy = 66 + Math.floor(i / 2) * 76
        return (
          <g key={name}>
            <Glass x={cx} y={cy} w={194} h={62} r={16} />
            <rect x={cx + 11} y={cy + 11} width={40} height={40} rx={11} fill={C.white} />
            <DriveGlyph kind={kind} x={cx + 12} y={cy + 12} />
            <T x={cx + 62} y={cy + 37} size={14} weight={600} fill={C.white} fontFamily={MONO}>
              {name}
            </T>
          </g>
        )
      })}
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-grid-profile · Set an away reply in seconds                    */
/* ------------------------------------------------------------------ */

export function MailGridAway({ className, style }) {
  const uid = useUid('mgw')
  const x = 60
  const y = 30
  const w = 360
  const rows = [
    [Reply, 'Auto-reply', 'toggle'],
    [CalendarDays, 'Oct 21 – Oct 28'],
    [UserRound, 'Cover: Jamie Ortiz'],
  ]
  return (
    <Art w={GW} h={GH} label="An away reply set up with dates and a colleague covering" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.skyDeep} to={C.indigoDeep} glow={C.sky} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={300} r={20}>
        <Avatar cx={x + 52} cy={y + 52} r={26} fill={C.greenDeep} initials="NH" />
        <circle cx={x + 72} cy={y + 72} r={8} fill={C.orange} stroke={C.white} strokeWidth={3} />
        <T x={x + 92} y={y + 48} size={19} weight={720}>
          Noor Haddad
        </T>
        <T x={x + 92} y={y + 72} size={15} weight={560} fill={C.orangeDeep}>
          Away · back Monday the 28th
        </T>
        <line x1={x} x2={x + w} y1={y + 102} y2={y + 102} stroke={C.n10} strokeWidth={1.5} />
        {rows.map(([I, label, kind], i) => {
          const ry = y + 102 + i * 50
          return (
            <g key={label}>
              <Ico as={I} x={x + 26} y={ry + 15} size={20} color={C.n60} />
              <T x={x + 58} y={ry + 31} size={16} weight={600} fill={C.n80}>
                {label}
              </T>
              {kind === 'toggle' && <Toggle x={x + w - 64} y={ry + 13} />}
              {i < 2 && <line x1={x + 58} x2={x + w - 24} y1={ry + 50} y2={ry + 50} stroke={C.n10} strokeWidth={1.5} />}
            </g>
          )
        })}
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-grid-unsubscribe · Search by what you remember                 */
/* ------------------------------------------------------------------ */

export function MailGridSearch({ className, style }) {
  const uid = useUid('mgq')
  const x = 50
  const y = 30
  const w = 380
  const results = [
    [Mail, 'Re: Offsite agenda', 'Kai Moreno · Sep 2'],
    [Presentation, 'Offsite kickoff deck', 'From Kai · Sep 3 · 18 slides'],
    [CalendarDays, 'Offsite day one', 'Event · Sep 12'],
  ]
  return (
    <Art w={GW} h={GH} label="A plain-language search finding the right deck among mail, files and events" className={className} style={style}>
      <Bleed id={uid} w={GW} h={GH} from={C.skyLight} to={C.sky} glow={C.white} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={300} r={20}>
        <rect x={x + 14} y={y + 14} width={w - 28} height={44} rx={12} fill={C.n5} stroke={C.p30} strokeWidth={1.5} />
        <Ico as={Search} x={x + 28} y={y + 26} size={20} color={C.p60} />
        <T x={x + 58} y={y + 42} size={15} weight={560} fill={C.n90}>
          the deck Kai sent before the offsite
        </T>
        {results.map(([I, t, m], i) => {
          const ry = y + 70 + i * 62
          const on = i === 1
          return (
            <g key={t}>
              {on && <rect x={x + 10} y={ry} width={w - 20} height={58} rx={12} fill={C.n10} />}
              <rect x={x + 22} y={ry + 11} width={36} height={36} rx={10} fill={on ? C.p60 : C.n5} />
              <Ico as={I} x={x + 30} y={ry + 19} size={20} color={on ? C.white : C.n60} />
              <T x={x + 70} y={ry + 26} size={16} weight={700}>
                {t}
              </T>
              <T x={x + 70} y={ry + 46} size={13} weight={520} fill={C.n60}>
                {m}
              </T>
              {on && <FileText x={x + w - 46} y={ry + 19} width={20} height={20} color={C.n40} strokeWidth={2} aria-hidden="true" />}
            </g>
          )
        })}
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-pillar-icon-1..3 (78x81, white): lilac-to-sky tiles             */
/* ------------------------------------------------------------------ */

const PILLAR_GLYPHS = [
  // a short queue each morning: sunrise
  <path key="a" d="M3 18.5h18 M6.5 18.5a5.5 5.5 0 0 1 11 0 M12 5v3 M4.9 10.4l1.8 1.6 M19.1 10.4l-1.8 1.6 M7 21.5h10" />,
  // fewer surprises in long threads: thread bubble with summary lines
  <path key="b" d="M5 4.5h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-7.5l-4.5 3.5v-3.5H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z M7.5 9h9 M7.5 12.5h5.5" />,
  // clean handoff: two people with a pass arrow
  <g key="c">
    <circle cx={6.8} cy={11} r={2.6} />
    <circle cx={17.2} cy={11} r={2.6} />
    <path d="M2.5 20a4.3 4.3 0 0 1 8.6 0 M12.9 20a4.3 4.3 0 0 1 8.6 0 M9 4.5h6 M13 2.5l2 2-2 2" />
  </g>,
]

function pillar(i, label) {
  function PillarIcon({ className, style }) {
    const uid = useUid('mpi')
    return (
      <IconTile id={uid} size={78} tile={60} from={C.p20} to={C.sky} glyphColor={C.white} shadow glyph={PILLAR_GLYPHS[i]} className={className} style={style} label={label} />
    )
  }
  return PillarIcon
}

export const MailPillarIcon1 = pillar(0, 'Sunrise: a short queue each morning')
export const MailPillarIcon2 = pillar(1, 'Thread bubble: fewer surprises')
export const MailPillarIcon3 = pillar(2, 'Two people: a clean handoff')

/* ------------------------------------------------------------------ */
/* mail-compat-icons (922x168, #f7f5f2): invented Wrenmail + Driftpost      */
/* ------------------------------------------------------------------ */

export function MailCompatIcons({ className, style }) {
  const uid = useUid('mci')
  const t = 100
  const y = 34
  const x1 = 461 - 12 - t
  const x2 = 461 + 12
  return (
    <Art w={922} h={168} label="App icons for the Wrenmail and Driftpost mail services" className={className} style={style}>
      <defs>
        <SoftShadow id={`${uid}-s`} dy={8} blur={10} opacity={0.14} />
        <linearGradient id={`${uid}-m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.orange} />
          <stop offset="0.55" stopColor={C.roseDeep} />
          <stop offset="1" stopColor={C.p50} />
        </linearGradient>
        <linearGradient id={`${uid}-p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.sky} />
          <stop offset="1" stopColor={C.indigoDeep} />
        </linearGradient>
      </defs>
      {[x1, x2].map((x) => (
        <rect key={x} x={x} y={y} width={t} height={t} rx={24} fill={C.white} stroke="rgba(115,113,109,0.12)" filter={`url(#${uid}-s)`} />
      ))}
      {/* Wrenmail: warm gradient envelope with a rounded flap and a green dot */}
      <rect x={x1 + 20} y={y + 28} width={60} height={44} rx={10} fill={`url(#${uid}-m)`} />
      <path d={`M${x1 + 25} ${y + 34} Q${x1 + 50} ${y + 60} ${x1 + 75} ${y + 34}`} fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" />
      <circle cx={x1 + 78} cy={y + 28} r={9} fill={C.green} stroke={C.white} strokeWidth={3} />
      {/* Driftpost: blue mailbox with a slot and a raised flag */}
      <path d={`M${x2 + 24} ${y + 78} V${y + 44} a18 18 0 0 1 36 0 V${y + 78} Z`} fill={`url(#${uid}-p)`} />
      <rect x={x2 + 32} y={y + 46} width={20} height={5} rx={2.5} fill={C.white} />
      <rect x={x2 + 62} y={y + 30} width={4} height={30} rx={2} fill={C.n60} />
      <rect x={x2 + 62} y={y + 30} width={16} height={11} rx={2} fill={C.orange} />
      <rect x={x2 + 38} y={y + 78} width={8} height={8} fill={C.n40} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-stat-bg (1440x464, #281647): watermark of the statistic        */
/* ------------------------------------------------------------------ */

export function MailStatBg({ className, style }) {
  return (
    <Art w={1440} h={464} bg={C.p100} label="" align="xMidYMid" className={className} style={style}>
      <text x={720} y={386} fontSize={430} fontWeight={800} fill={C.white} opacity={0.07} textAnchor="middle" letterSpacing="-0.04em">
        2.4B
      </text>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-quote-avatar-1/2 (60x60 round): abstract illustrated people    */
/* ------------------------------------------------------------------ */

export function MailQuoteAvatar1({ className, style }) {
  const uid = useUid('mqa')
  return (
    <Art w={60} h={60} label="Illustrated portrait" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.teal} />
          <stop offset="1" stopColor={C.g90} />
        </linearGradient>
      </defs>
      <rect width={60} height={60} fill={`url(#${uid}-bg)`} />
      <path d="M8 62 C9 47 19 41 30 41 C41 41 51 47 52 62 Z" fill={C.p100} />
      <path d="M24 37 h12 v7 a6 6 0 0 1 -12 0 z" fill={C.n20} />
      <ellipse cx={30} cy={27} rx={10.5} ry={12} fill={C.n10} />
      <path d="M19 26 C18 14 26 11 31 12 C38 12 43 17 41 27 C39 21 34 19 28 20 C24 21 21 23 19 26 Z" fill={C.g100} />
      <path d="M40.5 31 a3 3 0 0 0 0 -6" fill={C.n20} />
    </Art>
  )
}

export function MailQuoteAvatar2({ className, style }) {
  const uid = useUid('mqb')
  return (
    <Art w={60} h={60} label="Illustrated portrait" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.orange} />
          <stop offset="1" stopColor={C.orangeDeep} />
        </linearGradient>
      </defs>
      <rect width={60} height={60} fill={`url(#${uid}-bg)`} />
      <circle cx={30} cy={24} r={15} fill={C.mBlack} />
      <circle cx={18} cy={30} r={7} fill={C.mBlack} />
      <circle cx={42} cy={30} r={7} fill={C.mBlack} />
      <path d="M8 62 C9 47 19 42 30 42 C41 42 51 47 52 62 Z" fill={C.m100} />
      <path d="M25 37 h10 v7 a5 5 0 0 1 -10 0 z" fill={C.rose} />
      <ellipse cx={30} cy={29} rx={9.5} ry={11} fill={C.rose} />
      <path d="M20.5 27 C21 15 39 15 39.5 27 C36 21 24 21 20.5 27 Z" fill={C.mBlack} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* mail-quote-logo-1/2 (237x53): invented customer wordmarks            */
/* ------------------------------------------------------------------ */

function QuoteMark({ w = 237, h = 53, label, color = C.white, opacity = 1, className, style, children }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMinYMid meet"
      className={`ns-art ${className ?? ''}`}
      style={{ color, ...style }}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity} fill="currentColor">
        {children}
      </g>
    </svg>
  )
}

export function MailQuoteLogoFieldkit(p) {
  return (
    <QuoteMark label="Fieldkit" {...p}>
      <rect x={1} y={13} width={27} height={27} rx={7} fill="none" stroke="currentColor" strokeWidth={2.4} />
      <path d="M7 34 L14.5 19 L22 34 Z M14.5 26 v8" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" />
      <text x={38} y={35} fontSize={21} fontWeight={800} letterSpacing="3.2" textLength={118} lengthAdjust="spacing">
        FIELDKIT
      </text>
    </QuoteMark>
  )
}

export function MailQuoteLogoLumena(p) {
  return (
    <QuoteMark label="Lumena" {...p}>
      <rect x={1.2} y={12.2} width={28} height={28} rx={7} fill="none" stroke="currentColor" strokeWidth={2.4} />
      <path d="M7 31 a8.5 8.5 0 0 1 17 0 Z" />
      <rect x={6} y={33.5} width={19} height={2.6} rx={1.3} />
      <text x={40} y={35} fontSize={25} fontWeight={720} letterSpacing="-0.6" textLength={92} lengthAdjust="spacingAndGlyphs">
        Lumena
      </text>
    </QuoteMark>
  )
}
