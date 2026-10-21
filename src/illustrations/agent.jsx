// Section 5 media: media-agent-wide, media-agent-chat, media-agent-app.
// The two side asides render as small as 312x260, so type on those canvases
// is drawn large (~34-44 units on a 1080 canvas).
import { ArrowUp, Check, FileText, Plus, Search } from 'lucide-react'
import { Art, Chip, Dots, Glow, Ico, Kbd, Line, Star, T, Window } from './primitives'
import { C, useUid } from './tokens'

/* ------------------------------------------------------------------ */
/* media-agent-wide · inline writing suggestion (1440:617, bg #0c4243) */
/* ------------------------------------------------------------------ */

export function AgentInlineSuggest({ className, style }) {
  const uid = useUid('aw')
  const x = 160
  const y = 64
  const w = 1120
  const lx = x + 56 // body text x
  const flagW = 250 // textLength of the flagged phrase
  return (
    <Art w={1440} h={617} bg={C.g90} label="An email draft with an inline suggestion to make a sentence clearer" className={className} style={style}>
      <Glow id={`${uid}-g`} cx={1240} cy={80} r={520} color="#1f7a74" opacity={0.55} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={640} r={22} fill={C.white}>
        <rect x={x} y={y} width={w} height={64} fill={C.n5} />
        <Dots x={x + 30} y={y + 32} />
        <T x={x + w / 2} y={y + 40} size={20} weight={620} fill={C.n60} anchor="middle">
          New message
        </T>
        <T x={lx} y={y + 112} size={21} weight={520} fill={C.n40}>
          To
        </T>
        <Chip x={lx + 40} y={y + 90} w={210} h={32} fill={C.n10} text="Morgan Hale" color={C.n80} size={18} />
        <line x1={x + 40} x2={x + w - 40} y1={y + 140} y2={y + 140} stroke={C.n10} strokeWidth={2} />
        <T x={lx} y={y + 186} size={25} weight={680} fill={C.n90}>
          Proposal review
        </T>
        <line x1={x + 40} x2={x + w - 40} y1={y + 210} y2={y + 210} stroke={C.n10} strokeWidth={2} />

        <T x={lx} y={y + 262} size={25} weight={500} fill={C.n80}>
          Hi Morgan, thanks for sending the proposal over. Overall it reads well, and
        </T>
        {/* flagged phrase sits at a line start so its box is exact */}
        <rect x={lx - 6} y={y + 282} width={flagW + 12} height={40} rx={6} fill="#e3f6ef" />
        <text x={lx} y={y + 310} fontSize={25} fontWeight={500} fill={C.n90} textLength={flagW} lengthAdjust="spacingAndGlyphs">
          we should probably maybe
        </text>
        <line x1={lx} x2={lx + flagW} y1={y + 320} y2={y + 320} stroke={C.greenDeep} strokeWidth={3} strokeDasharray="2 6" strokeLinecap="round" />
        <T x={lx + flagW + 10} y={y + 310} size={25} weight={500} fill={C.n80}>
          push the review to next week if that works for you.
        </T>

        {/* suggestion popover */}
        <g>
          <defs>
            <filter id={`${uid}-pop`} x="-10%" y="-20%" width="120%" height="160%">
              <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#0c4243" floodOpacity="0.22" />
            </filter>
          </defs>
          <rect x={lx - 8} y={y + 340} width={600} height={196} rx={18} fill={C.white} stroke={C.n20} filter={`url(#${uid}-pop)`} />
          <rect x={lx + 16} y={y + 364} width={36} height={36} rx={10} fill={C.g90} />
          <Star x={lx + 24} y={y + 372} size={20} fill={C.white} />
          <T x={lx + 66} y={y + 389} size={20} weight={700} fill={C.n90}>
            Be more direct
          </T>
          <T x={lx + 572} y={y + 389} size={17} weight={560} fill={C.n40} anchor="end">
            Clarity
          </T>
          <text x={lx + 16} y={y + 440} fontSize={23} fontWeight={500}>
            <tspan fill={C.n40} textDecoration="line-through">
              we should probably maybe push
            </tspan>
            <tspan fill={C.greenDeep} fontWeight={650}>
              {'  let\u2019s move'}
            </tspan>
          </text>
          <Chip x={lx + 16} y={y + 470} w={132} h={42} fill={C.g90} text="Accept" color={C.white} size={18} r={10} />
          <Kbd x={lx + 160} y={y + 480} label="Tab" />
          <T x={lx + 230} y={y + 497} size={18} weight={560} fill={C.n60}>
            Dismiss
          </T>
          <Kbd x={lx + 310} y={y + 480} label="Esc" />
        </g>

        <Line x={lx + 650} y={y + 380} w={300} h={14} fill={C.n10} />
        <Line x={lx + 650} y={y + 416} w={250} h={14} fill={C.n10} />
        <Line x={lx + 650} y={y + 452} w={280} h={14} fill={C.n10} />
        <rect className="ns-caret" x={lx + 650} y={y + 476} width={2.5} height={30} fill={C.n90} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-agent-chat · chat about what's on screen (1080:901, #421d24)  */
/* ------------------------------------------------------------------ */

export function AgentContextChat({ className, style }) {
  const uid = useUid('ac')
  const px = 400
  const py = 110
  const pw = 640
  return (
    <Art w={1080} h={901} bg={C.m100} label="A chat panel answering a question about the spreadsheet on screen" className={className} style={style}>
      <Glow id={`${uid}-g`} cx={900} cy={60} r={520} color="#7a3442" opacity={0.55} />

      {/* the app on screen: a budget sheet */}
      <Window id={`${uid}-sheet`} x={-40} y={60} w={560} h={900} r={20} fill={C.n0}>
        <rect x={-40} y={60} width={560} height={120} fill={C.white} />
        <T x={40} y={140} size={40} weight={720} fill={C.n90}>
          Budget
        </T>
        {Array.from({ length: 9 }).map((_, r) => (
          <g key={r}>
            <line x1={-40} x2={520} y1={200 + r * 76} y2={200 + r * 76} stroke={C.n10} strokeWidth={2} />
            <Line x={40} y={226 + r * 76} w={[150, 120, 170, 110, 140, 160, 120, 150, 130][r]} h={22} fill={r === 0 ? C.n30 : C.n20} />
            <Line x={300} y={226 + r * 76} w={90} h={22} fill={r === 3 ? '#d98a96' : r === 0 ? C.n30 : C.n20} />
          </g>
        ))}
        <rect x={286} y={200 + 3 * 76 + 6} width={180} height={64} rx={8} fill="none" stroke="#b44a5c" strokeWidth={4} />
      </Window>

      {/* chat panel */}
      <Window id={`${uid}-chat`} x={px} y={py} w={pw} h={860} r={28} fill={C.white}>
        <rect x={px + 32} y={py + 32} width={56} height={56} rx={16} fill={C.m100} />
        <Star x={px + 44} y={py + 44} size={32} fill={C.white} />
        <T x={px + 108} y={py + 72} size={36} weight={720} fill={C.n90}>
          Chat
        </T>
        <rect x={px + 32} y={py + 116} width={300} height={54} rx={27} fill={C.n5} stroke={C.n20} strokeWidth={2} />
        <Ico as={FileText} x={px + 52} y={py + 129} size={28} color={C.n60} />
        <T x={px + 92} y={py + 152} size={26} weight={600} fill={C.n80}>
          Budget on screen
        </T>

        <rect x={px + pw - 32 - 470} y={py + 204} width={470} height={84} rx={26} fill={C.m100} />
        <T x={px + pw - 32 - 440} y={py + 258} size={32} weight={580} fill={C.white}>
          What changed this quarter?
        </T>

        <Star x={px + 32} y={py + 324} size={34} fill={C.m100} />
        <T x={px + 84} y={py + 352} size={33} weight={560} fill={C.n90}>
          Travel is down 12%.
        </T>
        <T x={px + 84} y={py + 400} size={33} weight={560} fill={C.n90}>
          Software is up 8%, mostly
        </T>
        <T x={px + 84} y={py + 448} size={33} weight={560} fill={C.n90}>
          from new design tools.
        </T>
        {/* mini bars */}
        <g transform={`translate(${px + 84} ${py + 486})`}>
          <rect width={480} height={150} rx={18} fill={C.n5} />
          {[
            ['Travel', 0.42, '#b44a5c'],
            ['Software', 0.8, C.m100],
          ].map(([label, v, col], i) => (
            <g key={label}>
              <T x={24} y={52 + i * 62} size={24} weight={600} fill={C.n60}>
                {label}
              </T>
              <rect x={160} y={32 + i * 62} width={290} height={26} rx={13} fill={C.n10} />
              <rect x={160} y={32 + i * 62} width={290 * v} height={26} rx={13} fill={col} />
            </g>
          ))}
        </g>

        <rect x={px + 28} y={py + 676} width={pw - 56} height={92} rx={26} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <T x={px + 64} y={py + 733} size={28} weight={500} fill={C.n40}>
          Ask a follow-up
        </T>
        <circle cx={px + pw - 82} cy={py + 722} r={30} fill={C.m100} />
        <Ico as={ArrowUp} x={px + pw - 97} y={py + 707} size={30} color={C.white} stroke={2.5} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-agent-app · agent hub with parallel tasks (1080:901, #dedbd5) */
/* ------------------------------------------------------------------ */

const TASKS = [
  { title: 'Find three offsite venues', meta: 'Browsing 14 pages', status: 'running', tint: C.p60 },
  { title: 'Tidy the newsletter folder', meta: '212 emails archived', status: 'done', tint: C.greenDeep },
  { title: 'Draft the Q3 recap', meta: 'Ready for your edits', status: 'review', tint: C.orangeDeep },
  { title: 'Set up interview slots', meta: 'Starts after recap', status: 'queued', tint: C.n40 },
]

function Status({ x, y, status }) {
  if (status === 'running')
    return (
      <g>
        <circle cx={x} cy={y} r={16} fill="none" stroke={C.p10} strokeWidth={5} />
        <path className="ns-spin" d={`M${x} ${y - 16} a16 16 0 0 1 16 16`} fill="none" stroke={C.p60} strokeWidth={5} strokeLinecap="round" />
      </g>
    )
  if (status === 'done')
    return (
      <g>
        <circle cx={x} cy={y} r={18} fill={C.green} />
        <Ico as={Check} x={x - 11} y={y - 11} size={22} color={C.white} stroke={3} />
      </g>
    )
  if (status === 'review') return <circle cx={x} cy={y} r={10} fill={C.orange} />
  return <circle cx={x} cy={y} r={10} fill="none" stroke={C.n30} strokeWidth={4} />
}

export function AgentHub({ className, style }) {
  const uid = useUid('ah')
  const x = 80
  const y = 90
  const w = 920
  return (
    <Art w={1080} h={901} bg={C.n20} label="Agent hub listing four tasks running in parallel" className={className} style={style}>
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={860} r={28} fill={C.white}>
        <T x={x + 48} y={y + 88} size={44} weight={740} fill={C.n90}>
          Agents
        </T>
        <rect x={x + w - 250} y={y + 42} width={202} height={64} rx={16} fill={C.n90} />
        <Ico as={Plus} x={x + w - 228} y={y + 58} size={32} color={C.white} stroke={2.5} />
        <T x={x + w - 186} y={y + 85} size={28} weight={650} fill={C.white}>
          New task
        </T>
        <rect x={x + 48} y={y + 132} width={w - 96} height={64} rx={16} fill={C.n5} />
        <Ico as={Search} x={x + 70} y={y + 149} size={30} color={C.n40} />
        <T x={x + 114} y={y + 174} size={27} weight={500} fill={C.n40}>
          Search tasks
        </T>

        {TASKS.map((t, i) => {
          const ry = y + 230 + i * 150
          return (
            <g key={t.title}>
              {i > 0 && <line x1={x + 48} x2={x + w - 48} y1={ry} y2={ry} stroke={C.n10} strokeWidth={2} />}
              <rect x={x + 48} y={ry + 34} width={82} height={82} rx={22} fill={t.tint} opacity={0.12} />
              <Star x={x + 69} y={ry + 55} size={40} fill={t.tint} />
              <T x={x + 158} y={ry + 70} size={34} weight={680} fill={C.n90}>
                {t.title}
              </T>
              <T x={x + 158} y={ry + 112} size={27} weight={520} fill={C.n60}>
                {t.meta}
              </T>
              {t.status === 'running' && (
                <g>
                  <rect x={x + 520} y={ry + 102} width={230} height={10} rx={5} fill={C.p10} />
                  <rect x={x + 520} y={ry + 102} width={140} height={10} rx={5} fill={C.p60} />
                </g>
              )}
              {t.status === 'review' && (
                <Chip x={x + 590} y={ry + 84} w={164} h={42} fill="#fff1e6" text="Review" color={C.orangeDeep} size={22} />
              )}
              <Status x={x + w - 84} y={ry + 75} status={t.status} />
            </g>
          )
        })}
      </Window>
    </Art>
  )
}
