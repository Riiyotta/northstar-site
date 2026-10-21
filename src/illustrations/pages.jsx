// Section 8 media: media-pages-wide, media-pages-ai, media-pages-connect.
import {
  CalendarDays,
  CheckSquare,
  ChevronRight,
  CornerDownLeft,
  FileText,
  Folder,
  Hash,
  Heading1,
  Mail,
  Sparkles,
  Table,
} from 'lucide-react'
import { Art, Avatar, Chip, Dots, Glow, Ico, Line, Star, T, Window } from './primitives'
import { C, useUid } from './tokens'

/* ------------------------------------------------------------------ */
/* media-pages-wide · doc editor with slash menu (1440:628, #dedbd5)   */
/* ------------------------------------------------------------------ */

export function PagesEditor({ className, style }) {
  const uid = useUid('pw')
  const x = 90
  const y = 60
  const w = 1260
  const sideW = 270
  const cx = x + sideW + 80
  return (
    <Art w={1440} h={628} bg={C.n20} label="A team document with a block menu open" className={className} style={style}>
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={640} r={22} fill={C.white}>
        {/* sidebar */}
        <rect x={x} y={y} width={sideW} height={640} fill={C.n5} />
        <line x1={x + sideW} x2={x + sideW} y1={y} y2={y + 640} stroke={C.n10} strokeWidth={2} />
        <Dots x={x + 30} y={y + 34} />
        <T x={x + 30} y={y + 96} size={17} weight={700} fill={C.n40}>
          TEAM SPACE
        </T>
        {[
          ['Roadmap', false],
          ['Launch brief', true],
          ['Meeting notes', false],
          ['Hiring plan', false],
          ['Brand voice', false],
        ].map(([label, active], i) => (
          <g key={label}>
            {active && <rect x={x + 16} y={y + 116 + i * 46} width={sideW - 32} height={40} rx={9} fill={C.n10} />}
            <Ico as={FileText} x={x + 30} y={y + 126 + i * 46} size={20} color={active ? C.n90 : C.n40} />
            <T x={x + 62} y={y + 142 + i * 46} size={19} weight={active ? 680 : 540} fill={active ? C.n90 : C.n60}>
              {label}
            </T>
          </g>
        ))}

        {/* content */}
        <text x={cx} y={y + 48} fontSize={17} fontWeight={540} fill={C.n40}>
          Team space <tspan dx={4}>/</tspan>
          <tspan dx={6} fill={C.n80}>
            Launch brief
          </tspan>
        </text>
        <Avatar cx={x + w - 150} cy={y + 40} r={18} fill={C.orange} initials="AR" ring={C.white} />
        <Avatar cx={x + w - 122} cy={y + 40} r={18} fill={C.p50} initials="JT" ring={C.white} />
        <Chip x={x + w - 92} y={y + 22} w={70} h={36} fill={C.n90} text="Share" color={C.white} size={16} r={9} />

        <T x={cx} y={y + 128} size={44} weight={760} fill={C.n90}>
          Launch brief
        </T>
        <T x={cx} y={y + 184} size={22} weight={500} fill={C.n80}>
          Everything the team needs for the spring release, in one place.
        </T>
        <T x={cx} y={y + 248} size={26} weight={720} fill={C.n90}>
          Key messages
        </T>
        {[
          'Set up a workspace in under a minute',
          'Bring docs, mail and tasks together',
        ].map((m, i) => (
          <g key={m}>
            <circle cx={cx + 8} cy={y + 284 + i * 38} r={4} fill={C.n80} />
            <T x={cx + 26} y={y + 291 + i * 38} size={21} weight={500} fill={C.n80}>
              {m}
            </T>
          </g>
        ))}
        <T x={cx} y={y + 386} size={22} weight={500} fill={C.n90}>
          /
        </T>
        <rect className="ns-caret" x={cx + 12} y={y + 366} width={2.5} height={26} fill={C.n90} />

        {/* slash menu */}
        <defs>
          <filter id={`${uid}-menu`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#292827" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x={cx - 6} y={y + 404} width={360} height={226} rx={16} fill={C.white} stroke={C.n20} filter={`url(#${uid}-menu)`} />
        {[
          [Sparkles, 'Ask AI', 'Write, edit or summarise', true],
          [Heading1, 'Heading', 'Section title'],
          [CheckSquare, 'To-do list', 'Track tasks'],
          [Table, 'Table', 'Rows and columns'],
        ].map(([I, label, hint, active], i) => (
          <g key={label}>
            {active && <rect x={cx + 4} y={y + 414 + i * 52} width={340} height={48} rx={10} fill={C.p0} />}
            <rect x={cx + 14} y={y + 422 + i * 52} width={32} height={32} rx={8} fill={active ? C.p60 : C.n5} stroke={active ? 'none' : C.n10} />
            <Ico as={I} x={cx + 21} y={y + 429 + i * 52} size={18} color={active ? C.white : C.n60} />
            <T x={cx + 60} y={y + 444 + i * 52} size={19} weight={650} fill={C.n90}>
              {label}
            </T>
            <T x={cx + 60} y={y + 444 + i * 52} size={16} weight={500} fill={C.n40} dx={label.length * 10 + 12}>
              {hint}
            </T>
          </g>
        ))}

        {/* right rail: page outline */}
        <g transform={`translate(${x + w - 250} ${y + 230})`}>
          <T x={0} y={0} size={16} weight={700} fill={C.n40}>
            ON THIS PAGE
          </T>
          {['Overview', 'Key messages', 'Timeline', 'Owners'].map((s, i) => (
            <g key={s}>
              <rect x={0} y={20 + i * 40} width={3} height={26} rx={1.5} fill={i === 1 ? C.n90 : C.n10} />
              <T x={16} y={39 + i * 40} size={18} weight={i === 1 ? 680 : 520} fill={i === 1 ? C.n90 : C.n60}>
                {s}
              </T>
            </g>
          ))}
        </g>
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-pages-ai · ask the page (1080:758, #e8e0ff)                   */
/* ------------------------------------------------------------------ */

export function PagesAiSummary({ className, style }) {
  const uid = useUid('pa')
  const x = 90
  const w = 900
  return (
    <Art w={1080} h={758} bg={C.p10} label="An AI prompt summarising decisions from a document" className={className} style={style}>
      <Glow id={`${uid}-g`} cx={960} cy={60} r={460} color={C.white} opacity={0.7} />

      {/* doc behind */}
      <Window id={`${uid}-doc`} x={x + 40} y={60} w={w - 80} h={760} r={26} fill={C.white} shadow={false}>
        <T x={x + 96} y={150} size={44} weight={760} fill={C.n90}>
          Weekly sync
        </T>
        {[200, 248, 296].map((ly, i) => (
          <Line key={ly} x={x + 96} y={ly} w={[620, 540, 400][i]} h={20} fill={C.n10} />
        ))}
      </Window>

      {/* prompt + answer */}
      <Window id={`${uid}-ask`} x={x} y={310} w={w} h={520} r={28} fill={C.white}>
        <rect x={x} y={310} width={w} height={110} fill={C.p0} />
        <Ico as={Sparkles} x={x + 40} y={345} size={40} color={C.p60} />
        <T x={x + 100} y={380} size={36} weight={620} fill={C.n90}>
          What did we decide?
        </T>
        <rect x={x + w - 92} y={340} width={52} height={50} rx={12} fill={C.p60} />
        <Ico as={CornerDownLeft} x={x + w - 80} y={351} size={28} color={C.white} stroke={2.5} />
        <line x1={x} x2={x + w} y1={420} y2={420} stroke={C.p20} strokeWidth={2} />

        {[
          ['Ship the beta on the 10th', C.p60],
          ['Kim owns the launch email', C.greenDeep],
          ['Pricing review moves to May', C.orangeDeep],
        ].map(([d, col], i) => (
          <g key={d}>
            <circle cx={x + 62} cy={480 + i * 72} r={11} fill={col} />
            <T x={x + 96} y={493 + i * 72} size={36} weight={560} fill={C.n90}>
              {d}
            </T>
          </g>
        ))}
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-pages-connect · sources linked into a page (1080:911, #421d24)*/
/* ------------------------------------------------------------------ */

const SOURCES = [
  { icon: Mail, label: 'Mail thread', x: 70, y: 120, col: C.p40 },
  { icon: CalendarDays, label: 'Kickoff call', x: 640, y: 90, col: C.orange },
  { icon: Folder, label: 'Design files', x: 60, y: 660, col: C.green },
  { icon: Hash, label: 'launch-team', x: 650, y: 690, col: C.p20 },
]

export function PagesConnect({ className, style }) {
  const uid = useUid('pc')
  const card = { x: 300, y: 300, w: 480, h: 300 }
  const ccx = card.x + card.w / 2
  const ccy = card.y + card.h / 2
  return (
    <Art w={1080} h={911} bg={C.m100} label="A page connected to mail, calendar, files and chat" className={className} style={style}>
      <Glow id={`${uid}-g`} cx={540} cy={450} r={520} color="#7a3442" opacity={0.7} />

      {/* connectors */}
      {SOURCES.map((s) => {
        const sx = s.x + 185
        const sy = s.y + 50
        const midY = (sy + ccy) / 2
        return (
          <path
            key={s.label}
            d={`M${sx} ${sy} C ${sx} ${midY}, ${ccx} ${midY}, ${ccx} ${ccy}`}
            fill="none"
            stroke="rgba(252,250,247,0.28)"
            strokeWidth={3}
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        )
      })}

      {/* source chips */}
      {SOURCES.map((s) => (
        <g key={s.label}>
          <rect x={s.x} y={s.y} width={370} height={100} rx={26} fill="rgba(255,255,255,0.08)" stroke="rgba(252,250,247,0.2)" strokeWidth={2} />
          <rect x={s.x + 20} y={s.y + 20} width={60} height={60} rx={16} fill={s.col} />
          <Ico as={s.icon} x={s.x + 34} y={s.y + 34} size={32} color={C.n90} stroke={2.2} />
          <T x={s.x + 100} y={s.y + 62} size={34} weight={620} fill={C.white}>
            {s.label}
          </T>
        </g>
      ))}

      {/* central page card */}
      <Window id={`${uid}-card`} x={card.x} y={card.y} w={card.w} h={card.h} r={28} fill={C.white} dark>
        <rect x={card.x + 32} y={card.y + 32} width={60} height={60} rx={16} fill={C.m100} />
        <Star x={card.x + 46} y={card.y + 46} size={32} fill={C.white} />
        <T x={card.x + 112} y={card.y + 74} size={38} weight={740} fill={C.n90}>
          Launch hub
        </T>
        <T x={card.x + 32} y={card.y + 150} size={28} weight={520} fill={C.n60}>
          4 sources synced
        </T>
        <Line x={card.x + 32} y={card.y + 186} w={400} h={18} fill={C.n10} />
        <Line x={card.x + 32} y={card.y + 222} w={320} h={18} fill={C.n10} />
        <Ico as={ChevronRight} x={card.x + card.w - 64} y={card.y + 46} size={32} color={C.n40} />
      </Window>
    </Art>
  )
}

