// Hero slides (asset ids hero-video-1..3). Canvas = the video's natural
// 1368x1712. At >=1080 the hero crops the slot to 650px of 800.9px, so all
// key content stays inside the top ~80% (y < 1380). Each runs a 7s one-shot and holds its final frame.
import {
  Archive,
  ArrowUp,
  Bold,
  CheckSquare,
  Clock,
  FileText,
  Italic,
  Link,
  List,
  MessageSquare,
  PenLine,
  Search,
  Sparkles,
  Square,
  Star as StarIcon,
  Underline,
} from 'lucide-react'
import { Art, Avatar, Chip, Dots, Glow, Ico, Kbd, Line, Star, T, Window } from './primitives'
import { C, useUid } from './tokens'

const W = 1368
const H = 1712

/* ------------------------------------------------------------------ */
/* hero-video-1 · Northstar Inbox                                      */
/* ------------------------------------------------------------------ */

const MAIL_ROWS = [
  { from: 'Avery Lindqvist', subject: 'Venue shortlist for the offsite', snippet: 'Three options, all walkable from the station', time: '9:42 AM', av: C.p40, initials: 'AL', star: true },
  { from: 'Tomas Reyes', subject: 'Q3 roadmap review', snippet: 'Moved the sync to Thursday so design can join', time: '9:15 AM', av: C.green, initials: 'TR' },
  { from: 'Billing · Ledgerly', subject: 'Your invoice is ready', snippet: 'Invoice #20418 for October is attached', time: '8:51 AM', av: C.n40, initials: 'L' },
  { from: 'Priya Natarajan', subject: 'Draft: onboarding guide v2', snippet: 'Left a few comments on the setup section', time: '8:30 AM', av: C.orange, initials: 'PN' },
  { from: 'Sam Okafor', subject: 'Re: Pricing page copy', snippet: 'Love the new headline. One small nit on the FAQ', time: 'Yesterday', av: C.p60, initials: 'SO' },
  { from: 'Juno Park', subject: 'Photos from the workshop', snippet: '42 photos shared with you in a folder', time: 'Yesterday', av: C.greenDeep, initials: 'JP' },
  { from: 'Elena Marsh', subject: 'Intro: Kai from Brightfield', snippet: 'Kai leads partnerships and would love to chat', time: 'Mon', av: C.p80, initials: 'EM' },
  { from: 'Noah Bennett', subject: 'Weekly metrics digest', snippet: 'Activation is up 6% week over week', time: 'Mon', av: C.orangeDeep, initials: 'NB' },
  { from: 'Iris Calloway', subject: 'Holiday schedule', snippet: 'The office closes early on Friday', time: 'Sun', av: C.p30, initials: 'IC' },
  { from: 'Marco Ruiz', subject: 'Re: Hiring panel', snippet: 'Added two more interview slots', time: 'Sat', av: C.green, initials: 'MR' },
]

function MailRow({ row, x, y, w, unread }) {
  return (
    <g>
      <Avatar cx={x + 52} cy={y + 66} r={26} fill={row.av} initials={row.initials} />
      <T x={x + 100} y={y + 54} size={25} weight={unread ? 700 : 560} fill={C.n90}>
        {row.from}
      </T>
      <T x={x + w - 40} y={y + 54} size={21} weight={560} fill={C.n40} anchor="end">
        {row.time}
      </T>
      <text x={x + 100} y={y + 92} fontSize={23}>
        <tspan fontWeight={unread ? 650 : 540} fill={C.n90}>
          {row.subject}
        </tspan>
        <tspan fontWeight={480} fill={C.n40}>
          {'  '}
          {row.snippet}
        </tspan>
      </text>
      {row.star && <Ico as={StarIcon} x={x + w - 64} y={y + 74} size={22} color={C.orange} />}
      <line x1={x + 100} x2={x + w} y1={y + 131.5} y2={y + 131.5} stroke={C.n10} strokeWidth={1.5} />
    </g>
  )
}

export function HeroInbox({ className, style }) {
  const uid = useUid('hi')
  const wx = 96
  const wy = 150
  const ww = 1360
  const rowH = 132
  const listY = wy + 250
  return (
    <Art w={W} h={H} bg={C.p100} label="Northstar Inbox showing a prioritised mail list" align="xMidYMin" className={className} style={style}>
      <Glow id={`${uid}-g1`} cx={1180} cy={180} r={620} color={C.p60} opacity={0.55} />
      <Glow id={`${uid}-g2`} cx={140} cy={1380} r={520} color={C.p80} opacity={0.5} />
      <Window id={`${uid}-win`} x={wx} y={wy} w={ww} h={1640} r={24} fill={C.n0}>
        {/* top bar */}
        <rect x={wx} y={wy} width={ww} height={84} fill={C.white} />
        <line x1={wx} x2={wx + ww} y1={wy + 84} y2={wy + 84} stroke={C.n10} strokeWidth={2} />
        <Dots x={wx + 36} y={wy + 42} />
        <rect x={wx + 380} y={wy + 20} width={520} height={44} rx={12} fill={C.n5} stroke={C.n10} />
        <Ico as={Search} x={wx + 398} y={wy + 31} size={22} color={C.n40} />
        <T x={wx + 432} y={wy + 50} size={20} weight={500} fill={C.n40}>
          Search mail, people, files
        </T>
        <Kbd x={wx + 846} y={wy + 31} label="/" />

        {/* heading + split tabs */}
        <T x={wx + 48} y={wy + 152} size={40} weight={720} fill={C.n90}>
          Inbox
        </T>
        <Chip x={wx + 172} y={wy + 124} w={150} h={36} fill={C.p10} text="12 unread" color={C.p60} size={18} />
        {[
          ['Important', 12, true],
          ['Team', 4],
          ['Updates', 9],
          ['Other'],
        ].map(([label, n, active], i) => {
          const x = wx + 48 + i * 176
          return (
            <g key={label}>
              <T x={x} y={wy + 212} size={22} weight={active ? 680 : 540} fill={active ? C.n90 : C.n40}>
                {label}
              </T>
              {n && (
                <T x={x + label.length * 12 + 10} y={wy + 212} size={18} weight={600} fill={active ? C.p60 : C.n30}>
                  {n}
                </T>
              )}
              {active && <rect x={x} y={wy + 230} width={150} height={4} rx={2} fill={C.p60} />}
            </g>
          )
        })}
        <line x1={wx} x2={wx + ww} y1={wy + 234} y2={wy + 234} stroke={C.n10} strokeWidth={2} />

        {/* selection highlight (stays on the first slot; the next row slides into it) */}
        <rect x={wx + 16} y={listY + 4} width={ww - 32} height={rowH - 8} rx={14} fill={C.p0} />
        <rect x={wx + 16} y={listY + 24} width={5} height={rowH - 48} rx={2.5} fill={C.p60} />

        <g className="ns-seam">
          <g className="ns-hi-done">
            <g className="ns-rise-0">
              <MailRow row={MAIL_ROWS[0]} x={wx + 16} y={listY} w={ww - 140} unread />
            </g>
          </g>
          <g className="ns-hi-shift" style={{ '--ns-row-h': `${rowH}px` }}>
            {MAIL_ROWS.slice(1).map((row, i) => (
              <g key={row.subject} className={`ns-rise-${i + 1}`}>
                <MailRow row={row} x={wx + 16} y={listY + (i + 1) * rowH} w={ww - 140} unread={i < 3} />
              </g>
            ))}
          </g>
        </g>
      </Window>

      {/* "Marked done" toast */}
      <g className="ns-toast ns-motion-only">
        <rect x={430} y={1210} width={500} height={76} rx={38} fill={C.n90} />
        <circle cx={476} cy={1248} r={18} fill={C.green} />
        <path d="M467 1248 l6 6 l12 -13" stroke={C.white} strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <T x={510} y={1256} size={24} weight={620} fill={C.white}>
          Marked done
        </T>
        <T x={760} y={1256} size={22} weight={560} fill={C.p20}>
          Undo
        </T>
        <Kbd x={830} y={1237} label="Z" dark />
      </g>

      {/* side rail: archive / snooze shortcuts */}
      <g opacity={0.9}>
        <rect x={24} y={420} width={52} height={168} rx={26} fill="rgba(255,255,255,0.08)" />
        <Ico as={Archive} x={38} y={440} size={24} color="rgba(255,255,255,0.75)" />
        <Ico as={Clock} x={38} y={492} size={24} color="rgba(255,255,255,0.75)" />
        <Ico as={StarIcon} x={38} y={544} size={24} color="rgba(255,255,255,0.75)" />
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* hero-video-2 · Northstar Agent                                      */
/* ------------------------------------------------------------------ */

export function HeroAgent({ className, style }) {
  const uid = useUid('ha')
  // background document
  const dx = 72
  const dy = 140
  // agent panel
  const px = 470
  const py = 300
  const pw = 840
  const ph = 1040
  return (
    <Art w={W} h={H} bg={C.g90} label="Northstar Agent summarising a thread beside a document" align="xMidYMin" className={className} style={style}>
      <Glow id={`${uid}-g1`} cx={1100} cy={260} r={640} color="#1f7a74" opacity={0.6} />
      <Glow id={`${uid}-g2`} cx={200} cy={1300} r={560} color={C.g100} opacity={0.7} />

      {/* document behind */}
      <Window id={`${uid}-doc`} x={dx} y={dy} w={860} h={1640} r={22} fill={C.n0}>
        <rect x={dx} y={dy} width={860} height={76} fill={C.white} />
        <Dots x={dx + 34} y={dy + 38} />
        <T x={dx + 120} y={dy + 46} size={20} weight={560} fill={C.n40}>
          Thread · Partner launch timeline
        </T>
        <T x={dx + 48} y={dy + 160} size={36} weight={720} fill={C.n90}>
          Partner launch timeline
        </T>
        <Avatar cx={dx + 70} cy={dy + 232} r={22} fill={C.orange} initials="RD" />
        <T x={dx + 104} y={dy + 228} size={21} weight={650} fill={C.n90}>
          Rowan Diaz
        </T>
        <T x={dx + 104} y={dy + 254} size={18} weight={500} fill={C.n40}>
          to team · 3 replies
        </T>
        {/* highlighted context, lights up once the agent cites it */}
        <rect className="ns-ha-highlight" x={dx + 40} y={dy + 296} width={560} height={92} rx={10} fill={C.p10} />
        {[
          [300, 520],
          [336, 470],
          [372, 300],
          [430, 540],
          [466, 500],
          [502, 380],
          [560, 520],
          [596, 440],
          [654, 530],
          [690, 480],
          [726, 260],
        ].map(([y, w]) => (
          <Line key={y} x={dx + 48} y={dy + y} w={w} h={14} fill={C.n20} />
        ))}
        <Avatar cx={dx + 70} cy={dy + 820} r={22} fill={C.p60} initials="KM" />
        <T x={dx + 104} y={dy + 816} size={21} weight={650} fill={C.n90}>
          Kira Moss
        </T>
        <Line x={dx + 104} y={dy + 836} w={150} h={12} fill={C.n10} />
        {[
          [880, 500],
          [916, 430],
          [952, 320],
        ].map(([y, w]) => (
          <Line key={y} x={dx + 48} y={dy + y} w={w} h={14} fill={C.n20} />
        ))}
      </Window>

      {/* agent panel */}
      <Window id={`${uid}-panel`} x={px} y={py} w={pw} h={ph} r={28} fill={C.white}>
        <rect x={px} y={py} width={pw} height={96} fill={C.n5} />
        <line x1={px} x2={px + pw} y1={py + 96} y2={py + 96} stroke={C.n10} strokeWidth={2} />
        <defs>
          <linearGradient id={`${uid}-mark`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.green} />
            <stop offset="1" stopColor={C.greenDeep} />
          </linearGradient>
        </defs>
        <rect x={px + 32} y={py + 26} width={44} height={44} rx={12} fill={`url(#${uid}-mark)`} />
        <Star x={px + 42} y={py + 36} size={24} fill={C.white} />
        <T x={px + 92} y={py + 56} size={25} weight={700} fill={C.n90}>
          Agent
        </T>
        <Chip x={px + 182} y={py + 32} w={146} h={32} fill={C.g0} stroke="#cdeee3" text="Reading thread" color={C.greenDeep} size={15} />
        <T x={px + pw - 36} y={py + 56} size={20} weight={560} fill={C.n40} anchor="end">
          New chat
        </T>

        <g className="ns-seam">
          {/* user message */}
          <g className="ns-ha-user">
            <rect x={px + pw - 36 - 520} y={py + 136} width={520} height={110} rx={24} fill={C.g90} />
            <T x={px + pw - 36 - 492} y={py + 182} size={23} weight={560} fill={C.white}>
              Summarise this thread and draft a
            </T>
            <T x={px + pw - 36 - 492} y={py + 216} size={23} weight={560} fill={C.white}>
              reply that confirms the new dates.
            </T>
          </g>

          {/* typing indicator */}
          <g className="ns-ha-typing ns-motion-only">
            <rect x={px + 36} y={py + 290} width={120} height={56} rx={28} fill={C.n10} />
            <circle className="ns-pulse" cx={px + 72} cy={py + 318} r={7} fill={C.n40} />
            <circle className="ns-pulse ns-pulse-d1" cx={px + 96} cy={py + 318} r={7} fill={C.n40} />
            <circle className="ns-pulse ns-pulse-d2" cx={px + 120} cy={py + 318} r={7} fill={C.n40} />
          </g>

          {/* reply */}
          <g className="ns-ha-reply">
            <Star x={px + 36} y={py + 290} size={26} fill={C.greenDeep} />
            <T x={px + 76} y={py + 312} size={21} weight={650} fill={C.n60}>
              Summary
            </T>
            {[
              'Launch moves from the 14th to the 21st.',
              'Kira owns partner comms; Rowan owns the demo.',
              'Open question: who signs off on pricing?',
            ].map((line, i) => (
              <g key={line}>
                <circle cx={px + 50} cy={py + 366 + i * 46} r={5} fill={C.greenDeep} />
                <T x={px + 72} y={py + 374 + i * 46} size={23} weight={520} fill={C.n90}>
                  {line}
                </T>
              </g>
            ))}

            <rect x={px + 36} y={py + 520} width={pw - 72} height={260} rx={20} fill={C.n5} stroke={C.n10} strokeWidth={2} />
            <Ico as={PenLine} x={px + 64} y={py + 548} size={22} color={C.n60} />
            <T x={px + 96} y={py + 566} size={20} weight={650} fill={C.n60}>
              Draft reply
            </T>
            {[
              'Hi all, thanks for the quick turnaround.',
              'Confirming the partner launch on the 21st.',
              'Kira will send the updated brief by Friday.',
            ].map((line, i) => (
              <T key={line} x={px + 64} y={py + 624 + i * 44} size={23} weight={500} fill={C.n80}>
                {line}
              </T>
            ))}
            {/* streaming wipe, one cover per line */}
            <g className="ns-motion-only" style={{ '--ns-reveal': '720px' }}>
              {[0, 1, 2].map((i) => (
                <rect key={i} className={`ns-wipe-${i}`} x={px + 60} y={py + 596 + i * 44} width={720} height={40} fill={C.n5} />
              ))}
            </g>
          </g>

          {/* follow-up chips */}
          <g className="ns-ha-chips">
            <Chip x={px + 36} y={py + 806} w={178} h={48} fill={C.g90} text="Insert draft" color={C.white} size={19} />
            <Chip x={px + 228} y={py + 806} w={170} h={48} fill={C.white} stroke={C.n20} text="Make shorter" color={C.n80} size={19} />
            <Chip x={px + 412} y={py + 806} w={190} h={48} fill={C.white} stroke={C.n20} text="Friendlier tone" color={C.n80} size={19} />
          </g>
        </g>

        {/* composer */}
        <rect x={px + 28} y={py + ph - 120} width={pw - 56} height={88} rx={22} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <Ico as={Sparkles} x={px + 54} y={py + ph - 89} size={26} color={C.greenDeep} />
        <T x={px + 96} y={py + ph - 68} size={22} weight={500} fill={C.n40}>
          Ask about anything on screen
        </T>
        <rect className="ns-caret" x={px + 94} y={py + ph - 92} width={2.5} height={30} fill={C.n90} />
        <circle cx={px + pw - 76} cy={py + ph - 76} r={26} fill={C.g90} />
        <Ico as={ArrowUp} x={px + pw - 89} y={py + ph - 89} size={26} color={C.white} stroke={2.5} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* hero-video-3 · Northstar Pages                                      */
/* ------------------------------------------------------------------ */

export function HeroPages({ className, style }) {
  const uid = useUid('hp')
  const wx = 104
  const wy = 140
  const ww = 1340
  const cx = wx + 110 // content column x
  const typeX = cx + 44
  const typeY = wy + 1110
  return (
    <Art w={W} h={H} bg={C.m100} label="Northstar Pages document being edited by two people" align="xMidYMin" className={className} style={style}>
      <Glow id={`${uid}-g1`} cx={1160} cy={200} r={640} color="#7a3442" opacity={0.6} />
      <Glow id={`${uid}-g2`} cx={160} cy={1360} r={520} color={C.mBlack} opacity={0.8} />

      <Window id={`${uid}-win`} x={wx} y={wy} w={ww} h={1640} r={24} fill={C.white}>
        {/* toolbar */}
        <rect x={wx} y={wy} width={ww} height={84} fill={C.n5} />
        <line x1={wx} x2={wx + ww} y1={wy + 84} y2={wy + 84} stroke={C.n10} strokeWidth={2} />
        <Dots x={wx + 36} y={wy + 42} />
        <Ico as={FileText} x={wx + 112} y={wy + 30} size={24} color={C.n60} />
        <text x={wx + 148} y={wy + 50} fontSize={21}>
          <tspan fill={C.n40} fontWeight={520}>
            Team space /{' '}
          </tspan>
          <tspan fill={C.n90} fontWeight={620}>
            Spring launch plan
          </tspan>
        </text>
        {/* presence */}
        <Avatar cx={wx + 860} cy={wy + 42} r={20} fill={C.orange} initials="MV" ring={C.n5} />
        <Avatar cx={wx + 892} cy={wy + 42} r={20} fill={C.p50} initials="DH" ring={C.n5} />
        <Avatar cx={wx + 924} cy={wy + 42} r={20} fill={C.greenDeep} initials="+3" ring={C.n5} />
        <Chip x={wx + 966} y={wy + 20} w={110} h={44} fill={C.m100} text="Share" color={C.white} size={19} r={10} />

        {/* format bar */}
        <g transform={`translate(${cx} ${wy + 116})`}>
          <rect width={430} height={52} rx={12} fill={C.white} stroke={C.n10} strokeWidth={2} />
          {[Bold, Italic, Underline, List, CheckSquare, Link, MessageSquare].map((I, i) => (
            <Ico key={i} as={I} x={20 + i * 58} y={14} size={24} color={i === 4 ? C.m100 : C.n60} />
          ))}
        </g>

        {/* title */}
        <T x={cx} y={wy + 270} size={58} weight={760} fill={C.n90}>
          Spring launch plan
        </T>
        <T x={cx} y={wy + 318} size={21} weight={520} fill={C.n40}>
          Updated 2 minutes ago · 6 collaborators
        </T>

        {/* AI summary callout */}
        <rect x={cx} y={wy + 360} width={960} height={170} rx={18} fill="#fbf3f4" stroke="#f0dde0" strokeWidth={2} />
        <Ico as={Sparkles} x={cx + 28} y={wy + 388} size={26} color={C.m100} />
        <T x={cx + 68} y={wy + 409} size={21} weight={680} fill={C.m100}>
          Summary
        </T>
        <T x={cx + 28} y={wy + 456} size={23} weight={500} fill={C.n80}>
          Ship the redesigned onboarding to all workspaces in two waves,
        </T>
        <T x={cx + 28} y={wy + 494} size={23} weight={500} fill={C.n80}>
          with a beta group first and a public launch two weeks later.
        </T>

        {/* goals */}
        <T x={cx} y={wy + 600} size={32} weight={720} fill={C.n90}>
          Goals
        </T>
        {[
          ['Cut time-to-first-doc in half', true],
          ['Invite 40 beta teams by the 10th', true],
          ['Publish help center articles', false],
        ].map(([label, done], i) => (
          <g key={label}>
            <Ico as={done ? CheckSquare : Square} x={cx} y={wy + 634 + i * 52} size={28} color={done ? C.m100 : C.n40} />
            <T
              x={cx + 44}
              y={wy + 657 + i * 52}
              size={24}
              weight={520}
              fill={done ? C.n40 : C.n90}
              textDecoration={done ? 'line-through' : undefined}
            >
              {label}
            </T>
          </g>
        ))}

        {/* timeline table */}
        <T x={cx} y={wy + 860} size={32} weight={720} fill={C.n90}>
          Timeline
        </T>
        <g transform={`translate(${cx} ${wy + 884})`}>
          <rect width={960} height={150} rx={14} fill={C.white} stroke={C.n20} strokeWidth={2} />
          <line x1={0} x2={960} y1={50} y2={50} stroke={C.n20} strokeWidth={2} />
          <line x1={0} x2={960} y1={100} y2={100} stroke={C.n10} strokeWidth={2} />
          <line x1={320} x2={320} y1={0} y2={150} stroke={C.n10} strokeWidth={2} />
          <line x1={640} x2={640} y1={0} y2={150} stroke={C.n10} strokeWidth={2} />
          {['Phase', 'Owner', 'Date'].map((h, i) => (
            <T key={h} x={24 + i * 320} y={33} size={19} weight={680} fill={C.n60}>
              {h}
            </T>
          ))}
          {[
            ['Beta wave', 'Maya V.', 'Apr 10'],
            ['Public launch', 'Dev H.', 'Apr 24'],
          ].map((r, j) =>
            r.map((c, i) => (
              <T key={c} x={24 + i * 320} y={84 + j * 50} size={21} weight={520} fill={C.n80}>
                {c}
              </T>
            )),
          )}
        </g>

        {/* line being typed */}
        <T x={cx} y={typeY} size={30} weight={720} fill={C.n90}>
          •
        </T>
        <T x={typeX} y={typeY} size={27} weight={520} fill={C.n90}>
          We will lock the rollout schedule by Friday.
        </T>
        <g className="ns-hp-type ns-motion-only" style={{ '--ns-reveal': '600px' }}>
          <rect x={typeX - 2} y={typeY - 32} width={620} height={44} fill={C.white} />
          <rect className="ns-caret" x={typeX - 2} y={typeY - 28} width={3} height={36} fill={C.m100} />
          <rect x={typeX - 4} y={typeY - 54} width={84} height={24} rx={6} fill={C.m100} />
          <T x={typeX + 38} y={typeY - 37} size={15} weight={650} fill={C.white} anchor="middle">
            You
          </T>
        </g>
        {/* rest of the page, continues below the fold */}
        <T x={cx} y={wy + 1210} size={32} weight={720} fill={C.n90}>
          Owners
        </T>
        {[
          [1250, 620],
          [1290, 540],
          [1330, 700],
          [1400, 600],
          [1440, 480],
        ].map(([ly, lw]) => (
          <Line key={ly} x={cx} y={wy + ly} w={lw} h={16} fill={C.n10} />
        ))}
      </Window>

      {/* collaborator cursor */}
      <g className="ns-hp-cursor ns-motion-only">
        <path d="M1000 640 l0 40 l11 -10 l8 19 l8 -4 l-8 -18 l15 -1 z" fill={C.orange} stroke={C.white} strokeWidth={2.5} strokeLinejoin="round" />
        <rect x={1024} y={684} width={84} height={30} rx={8} fill={C.orange} />
        <T x={1066} y={705} size={17} weight={680} fill={C.white} anchor="middle">
          Maya
        </T>
      </g>

      {/* comment */}
      <g className="ns-hp-comment">
        <rect x={880} y={720} width={430} height={140} rx={20} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <Avatar cx={924} cy={764} r={22} fill={C.p50} initials="DH" />
        <T x={960} y={760} size={20} weight={680} fill={C.n90}>
          Dev Hollis
        </T>
        <T x={960} y={783} size={16} weight={520} fill={C.n40}>
          just now
        </T>
        <T x={904} y={828} size={21} weight={520} fill={C.n80}>
          Can we add the beta dates here?
        </T>
      </g>
    </Art>
  )
}
