// /agents page art (registered in registry-goAgents.js). All agent names,
// people and copy are invented; app marks come from app-glyphs.jsx.
import {
  ArrowUp,
  BellRing,
  CalendarClock,
  ChartColumn,
  ChevronDown,
  FileSearch,
  History,
  Home,
  Inbox,
  Languages,
  Laptop,
  ListChecks,
  ListCollapse,
  Monitor,
  Plus,
  Scissors,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { AppGlyph } from './app-glyphs'
import { Art, Avatar, Chip, Dots, Glow, Ico, Line, Star, T, Window } from './primitives'
import { C, useUid } from './tokens'

/* Gradient tile with the star mark. */
function MarkTile({ id, x, y, s = 48, from = C.p60, to = C.p100 }) {
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.26} fill={`url(#${id})`} />
      <Star x={x + s * 0.24} y={y + s * 0.24} size={s * 0.52} fill={C.white} />
    </g>
  )
}

/* Small app tile holding an invented app glyph. */
function AppTile({ i, x, y, s = 56, fill = C.white, stroke = C.n20, r }) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={r ?? s * 0.24} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <g transform={`translate(${x + s * 0.2} ${y + s * 0.2}) scale(${(s * 0.6) / 56})`}>
        <AppGlyph i={i} />
      </g>
    </g>
  )
}

function Toggle({ x, y, on = true }) {
  return (
    <g>
      <rect x={x} y={y} width={52} height={30} rx={15} fill={on ? C.p60 : C.n20} />
      <circle cx={on ? x + 37 : x + 15} cy={y + 15} r={11} fill={C.white} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* agents-builder-art · describe a routine, pick a trigger (720:720)   */
/* ------------------------------------------------------------------ */

export function AgentsBuilder({ className, style }) {
  const uid = useUid('ab')
  const x = 64
  const y = 128
  const w = 592
  const lx = x + 32
  const fw = w - 64
  return (
    <Art w={720} h={720} label="An agent builder with a description, plain-language steps, a trigger and the apps it may use" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.p20} />
          <stop offset="0.5" stopColor={C.p10} />
          <stop offset="1" stopColor={C.orange} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect x={24} y={24} width={672} height={672} rx={32} fill={`url(#${uid}-frame)`} />
      <Glow id={`${uid}-g`} cx={600} cy={120} r={260} color={C.p30} opacity={0.5} />

      {/* dashed connectors */}
      <g stroke={C.p40} strokeWidth={2} strokeDasharray="6 7" fill="none">
        <path d="M150 104 V128" />
        <path d="M592 100 V128" />
      </g>

      {/* floating title chip + save */}
      <rect x={64} y={44} width={356} height={60} rx={18} fill={C.white} stroke={C.p20} strokeWidth={2} />
      <MarkTile id={`${uid}-t`} x={78} y={54} s={40} from={C.orange} to={C.orangeDeep} />
      <T x={132} y={83} size={24} weight={720} fill={C.n90}>
        Weekly client recap
      </T>
      <Chip x={528} y={50} w={128} h={50} fill={C.p60} text="Publish" color={C.white} size={22} r={14} />

      <Window id={`${uid}-win`} x={x} y={y} w={w} h={516} r={24} fill={C.n0}>
        <T x={lx} y={y + 48} size={19} weight={700} fill={C.n60} letterSpacing="0.05em">
          DESCRIPTION
        </T>
        <rect x={lx} y={y + 62} width={fw} height={56} rx={12} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
        <T x={lx + 18} y={y + 98} size={22} weight={520} fill={C.n80}>
          Sends each client a short Friday recap.
        </T>

        <T x={lx} y={y + 156} size={19} weight={700} fill={C.n60} letterSpacing="0.05em">
          INSTRUCTIONS
        </T>
        <rect x={lx} y={y + 170} width={fw} height={150} rx={12} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
        {['Collect the tickets closed this week', 'List wins first, then open items', 'Draft an email in my usual tone'].map((l, i) => (
          <g key={l}>
            <circle cx={lx + 32} cy={y + 207 + i * 42} r={14} fill={C.p10} />
            <T x={lx + 32} y={y + 214 + i * 42} size={17} weight={720} fill={C.p60} anchor="middle">
              {i + 1}
            </T>
            <T x={lx + 58} y={y + 215 + i * 42} size={21} weight={520} fill={C.n80}>
              {l}
            </T>
          </g>
        ))}

        <T x={lx} y={y + 358} size={19} weight={700} fill={C.n60} letterSpacing="0.05em">
          TRIGGER
        </T>
        <rect x={lx} y={y + 372} width={300} height={52} rx={12} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
        <Ico as={CalendarClock} x={lx + 16} y={y + 386} size={24} color={C.p60} />
        <T x={lx + 50} y={y + 405} size={21} weight={600} fill={C.n90}>
          Fridays at 4:00 PM
        </T>
        <Ico as={ChevronDown} x={lx + 266} y={y + 388} size={20} color={C.n40} />
        <Toggle x={lx + 324} y={y + 383} />
        <T x={lx + 386} y={y + 405} size={19} weight={560} fill={C.n80}>
          Ask before sending
        </T>

        <T x={lx} y={y + 456} size={19} weight={700} fill={C.n60} letterSpacing="0.05em">
          APPS IT MAY USE
        </T>
        {[
          [6, 'Helpdesk'],
          [2, 'CRM'],
          [4, 'Chat'],
        ].map(([g, label], i) => (
          <g key={label}>
            <rect x={lx + i * 160} y={y + 466} width={148} height={42} rx={21} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
            <g transform={`translate(${lx + i * 160 + 12} ${y + 473}) scale(${28 / 56})`}>
              <AppGlyph i={g} />
            </g>
            <T x={lx + i * 160 + 48} y={y + 494} size={19} weight={600} fill={C.n80}>
              {label}
            </T>
          </g>
        ))}
      </Window>

      {/* test result */}
      <rect x={452} y={648} width={196} height={44} rx={14} fill={C.white} stroke={C.p20} strokeWidth={2} />
      <circle cx={478} cy={670} r={11} fill={C.green} />
      <path d="M472 670 l4 4 l8 -8" stroke={C.white} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <T x={498} y={677} size={20} weight={650} fill={C.n90}>
        Test passed
      </T>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* agent-icon-1..8 · white tiles with a mulberry glyph (77:77)         */
/* ------------------------------------------------------------------ */

function AgentTile({ icon, label, className, style }) {
  return (
    <svg viewBox="0 0 77 77" className={`ns-art ${className ?? ''}`} style={style} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <rect x={0.75} y={0.75} width={75.5} height={75.5} rx={18} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
      <Ico as={icon} x={20.5} y={20.5} size={36} color={C.m100} stroke={1.9} />
    </svg>
  )
}

export const AgentIconClearCut = (p) => <AgentTile icon={Scissors} label="Clear Cut" {...p} />
export const AgentIconAgenda = (p) => <AgentTile icon={ListChecks} label="Agenda Assembler" {...p} />
export const AgentIconTranslator = (p) => <AgentTile icon={Languages} label="Translator" {...p} />
export const AgentIconSummarizer = (p) => <AgentTile icon={ListCollapse} label="Summarizer" {...p} />
export const AgentIconNudger = (p) => <AgentTile icon={BellRing} label="Follow-up Nudger" {...p} />
export const AgentIconScheduler = (p) => <AgentTile icon={CalendarClock} label="Scheduler" {...p} />
export const AgentIconDataPuller = (p) => <AgentTile icon={ChartColumn} label="Data Puller" {...p} />
export const AgentIconContractLens = (p) => <AgentTile icon={FileSearch} label="Contract Lens" {...p} />

/* ------------------------------------------------------------------ */
/* trust-icon-1..3 · on #f7f5ff (69:71)                                */
/* ------------------------------------------------------------------ */

function TrustTile({ icon, label, className, style }) {
  const uid = useUid('tt')
  return (
    <svg viewBox="0 0 69 71" className={`ns-art ${className ?? ''}`} style={style} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${uid}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.2" floodColor={C.p40} floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width={69} height={71} fill={C.p0} />
      <rect x={1} y={1} width={67} height={66} rx={16} fill={C.white} stroke={C.p10} strokeWidth={1.5} filter={`url(#${uid}-s)`} />
      <Ico as={icon} x={18.5} y={17.5} size={32} color={C.n90} stroke={1.8} />
    </svg>
  )
}

export const TrustIconLog = (p) => <TrustTile icon={History} label="Every action logged" {...p} />
export const TrustIconAudit = (p) => <TrustTile icon={ShieldCheck} label="Certified and audited" {...p} />
export const TrustIconRules = (p) => <TrustTile icon={SlidersHorizontal} label="Admins set the rules" {...p} />

/* ------------------------------------------------------------------ */
/* bento-assistant-art · control room for the agents (840:492)         */
/* ------------------------------------------------------------------ */

const ROSTER = [
  [Scissors, 'Clear Cut', 'Tidied 3 drafts', 'Done', C.greenDeep, C.g0],
  [CalendarClock, 'Scheduler', 'Proposing 2 slots', 'Running', C.p60, C.p10],
  [ListCollapse, 'Summarizer', 'Thread recap ready', 'Review', C.orangeDeep, C.n10],
  [BellRing, 'Follow-up Nudger', 'Queued for 4 PM', 'Queued', C.n60, C.n10],
]

export function BentoAssistant({ className, style }) {
  const uid = useUid('ba')
  const x = 172
  const y = 34
  const w = 500
  return (
    <Art w={840} h={492} label="The assistant listing which agents are running, done or waiting for review" align="xMidYMin" className={className} style={style}>
      <defs>
        <pattern id={`${uid}-dots`} width={22} height={22} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={1.8} fill={C.p20} />
        </pattern>
      </defs>
      <rect width={840} height={492} fill={`url(#${uid}-dots)`} />

      {/* faded app windows behind */}
      <g opacity={0.6}>
        <Window id={`${uid}-l`} x={22} y={80} w={250} h={380} r={16} fill={C.n0} shadow={false}>
          <Ico as={Inbox} x={42} y={98} size={22} color={C.n40} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={52} cy={156 + i * 58} r={14} fill={[C.p30, C.green, C.orange, C.p50, C.n30][i]} />
              <Line x={76} y={146 + i * 58} w={120} h={9} fill={C.n20} />
              <Line x={76} y={162 + i * 58} w={160} h={8} fill={C.n10} />
            </g>
          ))}
        </Window>
        <Window id={`${uid}-r`} x={568} y={60} w={250} h={400} r={16} fill={C.n0} shadow={false}>
          <Line x={592} y={92} w={150} h={16} fill={C.n30} />
          {[130, 152, 174, 210, 232, 254, 290, 312].map((ly, i) => (
            <Line key={ly} x={592} y={ly} w={[190, 170, 120, 196, 160, 90, 180, 140][i]} h={9} fill={C.n20} />
          ))}
        </Window>
      </g>

      {/* assistant window */}
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={470} r={22} fill={C.white}>
        <MarkTile id={`${uid}-m`} x={x + 24} y={y + 22} s={44} />
        <T x={x + 82} y={y + 52} size={26} weight={720} fill={C.n90}>
          Assistant
        </T>
        <Chip x={x + w - 168} y={y + 28} w={144} h={34} fill={C.p10} text="4 agents on" color={C.p60} size={18} />
        <line x1={x} x2={x + w} y1={y + 86} y2={y + 86} stroke={C.n10} strokeWidth={2} />
        {ROSTER.map(([I, name, note, status, color, bg], i) => {
          const ry = y + 104 + i * 70
          return (
            <g key={name}>
              <rect x={x + 24} y={ry} width={52} height={52} rx={14} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
              <Ico as={I} x={x + 37} y={ry + 13} size={26} color={C.m100} />
              <T x={x + 92} y={ry + 23} size={22} weight={680} fill={C.n90}>
                {name}
              </T>
              <T x={x + 92} y={ry + 48} size={18} weight={500} fill={C.n60}>
                {note}
              </T>
              <rect x={x + w - 130} y={ry + 10} width={106} height={32} rx={16} fill={bg} />
              <circle cx={x + w - 112} cy={ry + 26} r={5} fill={color} />
              <T x={x + w - 100} y={ry + 32} size={17} weight={650} fill={color}>
                {status}
              </T>
            </g>
          )
        })}
        <rect x={x + 24} y={y + 394} width={w - 48} height={56} rx={28} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <Ico as={Sparkles} x={x + 44} y={y + 410} size={24} color={C.p60} />
        <T x={x + 78} y={y + 429} size={20} weight={500} fill={C.n40}>
          Hand off a task to an agent
        </T>
        <circle cx={x + w - 52} cy={y + 422} r={20} fill={C.p60} />
        <Ico as={ArrowUp} x={x + w - 63} y={y + 411} size={22} color={C.white} stroke={2.5} />
      </Window>

      {/* floating action chips */}
      <g>
        <rect x={14} y={300} width={144} height={46} rx={23} fill={C.p60} />
        <T x={86} y={330} size={19} weight={680} fill={C.white} anchor="middle">
          Accept all
        </T>
        <rect x={676} y={160} width={154} height={46} rx={23} fill={C.white} stroke={C.p20} strokeWidth={2} />
        <Ico as={CalendarClock} x={690} y={172} size={22} color={C.p60} />
        <T x={718} y={190} size={18} weight={650} fill={C.n90}>
          Book 2:30 PM
        </T>
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* bento-mail-art · triage in the inbox (600:214, dark purple)         */
/* ------------------------------------------------------------------ */

export function BentoMail({ className, style }) {
  const tabs = [
    ['Important', 8, true],
    ['Team', 3],
    ['Updates', 12],
    ['Other'],
  ]
  const rows = [
    ['RL', C.orange, 'Rosa Lindgren', 'Contract redlines', 'Draft ready'],
    ['TP', C.green, 'Theo Park', 'Re: Q4 kickoff', 'Nudge sent', true],
    ['LB', C.p40, 'Ledgerly Billing', 'Receipt #4821', 'Filed'],
  ]
  return (
    <Art w={600} h={214} label="An inbox with split tabs and three triaged messages" align="xMidYMin" className={className} style={style}>
      <rect width={600} height={214} fill={C.p100} />
      {tabs.map(([label, n, active], i) => {
        const tx = 24 + i * 140
        return (
          <g key={label}>
            <rect x={tx} y={18} width={130} height={36} rx={18} fill={active ? C.p20 : 'rgba(255,255,255,0.06)'} />
            <T x={tx + 18} y={42} size={16} weight={active ? 700 : 560} fill={active ? C.p100 : C.p20}>
              {label}
            </T>
            {n && (
              <T x={tx + 112} y={42} size={14} weight={700} fill={active ? C.p60 : C.p30} anchor="end">
                {n}
              </T>
            )}
          </g>
        )
      })}
      {rows.map(([ini, av, from, subj, tag, hi], i) => {
        const ry = 68 + i * 52
        return (
          <g key={from}>
            {hi && <rect x={12} y={ry} width={576} height={48} rx={12} fill={C.p60} opacity={0.55} />}
            <Avatar cx={44} cy={ry + 24} r={15} fill={av} initials={ini} />
            <T x={70} y={ry + 30} size={17} weight={680} fill={C.white}>
              {from}
            </T>
            <T x={220} y={ry + 30} size={17} weight={500} fill={C.p20}>
              {subj}
            </T>
            <rect x={448} y={ry + 11} width={124} height={26} rx={13} fill={hi ? C.white : 'rgba(255,255,255,0.1)'} />
            <T x={510} y={ry + 29} size={14} weight={680} fill={hi ? C.p80 : C.p20} anchor="middle">
              {tag}
            </T>
          </g>
        )
      })}
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* bento-web-art · works across the sites you have open (600:214)      */
/* ------------------------------------------------------------------ */

export function BentoWeb({ className, style }) {
  const uid = useUid('bw')
  const s = 84
  return (
    <Art w={600} h={214} label="Rows of website and app tiles with the assistant mark on one of them" align="xMinYMin" className={className} style={style}>
      <rect width={600} height={214} fill={C.n20} />
      {[0, 1].map((row) =>
        Array.from({ length: 7 }, (_, i) => {
          const tx = 24 + row * 52 + i * (s + 18)
          const ty = 22 + row * 102
          const g = (i * 3 + row * 5) % 8
          return <AppTile key={`${row}-${i}`} i={g} x={tx} y={ty} s={s} r={22} stroke="none" />
        }),
      )}
      {/* the assistant riding along on one site */}
      <circle cx={24 + 52 + 2 * 102 + s - 6} cy={124 + 6} r={20} fill={C.white} />
      <MarkTile id={`${uid}-m`} x={24 + 52 + 2 * 102 + s - 22} y={124 - 10} s={32} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* aside-desktop-art · native desktop app (720:471, on mulberry)       */
/* ------------------------------------------------------------------ */

export function AsideDesktop({ className, style }) {
  const uid = useUid('ad')
  const x = 40
  const y = 132
  const w = 760
  const cx = x + 120
  return (
    <Art w={720} h={471} label="Available on macOS and Windows, above a desktop app window" align="xMinYMin" className={className} style={style}>
      <T x={40} y={62} size={26} weight={600} fill={C.n0} opacity={0.75}>
        Available on
      </T>
      {[
        [Monitor, 'macOS', 210],
        [Laptop, 'Windows', 386],
      ].map(([I, label, px]) => (
        <g key={label}>
          <rect x={px} y={26} width={label === 'macOS' ? 160 : 190} height={52} rx={26} fill={C.mBlack} />
          <Ico as={I} x={px + 20} y={40} size={24} color={C.n0} />
          <T x={px + 56} y={60} size={24} weight={650} fill={C.n0}>
            {label}
          </T>
        </g>
      ))}

      <Window id={`${uid}-win`} x={x} y={y} w={w} h={420} r={22} fill={C.n0} dark>
        <rect x={x} y={y} width={92} height={420} fill={C.n10} />
        <Dots x={x + 22} y={y + 30} />
        {[Home, Inbox, Search, Settings].map((I, i) => (
          <g key={i}>
            {i === 0 && <rect x={x + 20} y={y + 64} width={52} height={52} rx={14} fill={C.white} />}
            <Ico as={I} x={x + 32} y={y + 76 + i * 70} size={28} color={i === 0 ? C.m100 : C.n40} />
          </g>
        ))}
        <MarkTile id={`${uid}-m`} x={cx} y={y + 30} s={48} from={C.m100} to={C.mBlack} />
        <T x={cx} y={y + 122} size={38} weight={740} fill={C.n90}>
          Good morning, Robin
        </T>
        <rect x={cx} y={y + 144} width={560} height={68} rx={22} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <Ico as={Sparkles} x={cx + 22} y={y + 164} size={28} color={C.m100} />
        <T x={cx + 64} y={y + 187} size={26} weight={500} fill={C.n40}>
          Ask anything or run an agent
        </T>
        <T x={cx} y={y + 254} size={22} weight={600} fill={C.n60}>
          Connect your apps
        </T>
        {[0, 1, 2, 3, 4].map((i) => (
          <AppTile key={i} i={[0, 1, 4, 5, 7][i]} x={cx + i * 62} y={y + 270} s={50} />
        ))}
        <rect x={cx + 312} y={y + 270} width={50} height={50} rx={12} fill={C.n10} />
        <Ico as={Plus} x={cx + 325} y={y + 283} size={24} color={C.n60} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* aside-ai-tools-art · open protocol hub (720:639, pastel)            */
/* ------------------------------------------------------------------ */

// Invented marks for "other AI tools": abstract, not any real product.
const TOOL_MARKS = [
  // orbit
  () => (
    <g fill="none" strokeWidth={3}>
      <circle cx={28} cy={28} r={8} fill={C.p60} stroke="none" />
      <ellipse cx={28} cy={28} rx={22} ry={10} stroke={C.p40} transform="rotate(-25 28 28)" style={{ transformBox: 'view-box' }} />
    </g>
  ),
  // hex nodes
  () => (
    <g>
      <path d="M28 6 L47 17 V39 L28 50 L9 39 V17 Z" fill="none" stroke={C.greenDeep} strokeWidth={3} strokeLinejoin="round" />
      {[[28, 6], [47, 17], [47, 39], [28, 50], [9, 39], [9, 17]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4.5} fill={C.green} />
      ))}
    </g>
  ),
  // burst
  () => (
    <g stroke={C.orangeDeep} strokeWidth={4} strokeLinecap="round">
      {[0, 30, 60, 90, 120, 150].map((a) => {
        const dx = 18 * Math.sin((a * Math.PI) / 180)
        const dy = 18 * Math.cos((a * Math.PI) / 180)
        return <line key={a} x1={28 - dx} y1={28 - dy} x2={28 + dx} y2={28 + dy} />
      })}
    </g>
  ),
  // stacked waves
  () => (
    <g fill="none" strokeWidth={4} strokeLinecap="round">
      <path d="M8 20 q10 -8 20 0 t20 0" stroke={C.p40} />
      <path d="M8 30 q10 -8 20 0 t20 0" stroke={C.p60} />
      <path d="M8 40 q10 -8 20 0 t20 0" stroke={C.p80} />
    </g>
  ),
  // triad
  () => (
    <g>
      <circle cx={28} cy={14} r={9} fill={C.m100} />
      <circle cx={15} cy={38} r={9} fill={C.orange} />
      <circle cx={41} cy={38} r={9} fill={C.p40} />
    </g>
  ),
  // split square
  () => (
    <g>
      <rect x={8} y={8} width={40} height={40} rx={12} fill={C.green} />
      <path d="M8 48 L48 8 V36 a12 12 0 0 1 -12 12 Z" fill={C.greenDeep} />
    </g>
  ),
]

export function AsideAiTools({ className, style }) {
  const uid = useUid('at')
  const hub = { x: 360, y: 330 }
  const ts = 112
  const pos = [
    [80, 120],
    [40, 274],
    [80, 428],
    [528, 120],
    [568, 274],
    [528, 428],
  ]
  return (
    <Art w={720} h={639} label="Northstar in the centre, linked to six other AI tools" className={className} style={style}>
      <Glow id={`${uid}-g1`} cx={620} cy={600} r={420} color={C.p20} opacity={0.7} />
      <Glow id={`${uid}-g2`} cx={560} cy={560} r={300} color={C.orange} opacity={0.18} />
      <Glow id={`${uid}-g3`} cx={80} cy={40} r={360} color={C.white} opacity={0.6} />
      <Chip x={250} y={40} w={220} h={44} fill={C.white} stroke={C.p20} text="Open protocol" color={C.p60} size={20} />
      <g stroke={C.p40} strokeWidth={2.5} strokeDasharray="7 8" fill="none">
        {pos.map(([px, py]) => (
          <line key={`${px}-${py}`} x1={hub.x} y1={hub.y} x2={px + ts / 2} y2={py + ts / 2} />
        ))}
      </g>
      {pos.map(([px, py], i) => {
        const M = TOOL_MARKS[i]
        return (
          <g key={`${px}-${py}`}>
            <rect x={px} y={py} width={ts} height={ts} rx={28} fill={C.white} stroke={C.p10} strokeWidth={2} />
            <g transform={`translate(${px + 26} ${py + 26}) scale(${60 / 56})`}>
              <M />
            </g>
          </g>
        )
      })}
      <circle cx={hub.x} cy={hub.y} r={104} fill={C.white} opacity={0.55} />
      <MarkTile id={`${uid}-hub`} x={hub.x - 72} y={hub.y - 72} s={144} />
    </Art>
  )
}
