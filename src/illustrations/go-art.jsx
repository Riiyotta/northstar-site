// /go page art (registered in registry-goAgents.js). All names, channels and
// copy are invented. The feature-row pieces (go-row-3/5/7/8-video) and the
// looping hero (go-hero-video) stand in for demo videos inside VideoSlot:
// each runs a gentle CSS loop (--ns-ga-dur) that VideoSlot pauses with
// animation-play-state. Their un-animated state is a complete still frame,
// which is what prefers-reduced-motion shows.
import {
  AtSign,
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Hash,
  Inbox,
  Mail,
  MessageSquare,
  Paperclip,
  Search,
  Smile,
  Sparkles,
} from 'lucide-react'
import './go-agents.css'
import { AppGlyph } from './app-glyphs'
import { Art, Avatar, Chip, Dots, Glow, Ico, Line, Star, T, Window } from './primitives'
import { C, useUid } from './tokens'

const RW = 1200
const RH = 800

/* Gradient product tile with the star mark (the assistant's avatar). */
function BotTile({ id, x, y, s = 52, from = C.p60, to = C.p100 }) {
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

/* Large keycap for the shortcut demo. */
function Key({ x, y, w = 76, label, size = 30 }) {
  return (
    <g>
      <rect x={x} y={y + 6} width={w} height={72} rx={14} fill={C.n30} />
      <rect x={x} y={y} width={w} height={72} rx={14} fill={C.white} stroke={C.n20} strokeWidth={2} />
      <T x={x + w / 2} y={y + 46} size={size} weight={650} fill={C.n80} anchor="middle">
        {label}
      </T>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* go-row-3-video · meeting brief before the call, recap after (9s)    */
/* ------------------------------------------------------------------ */

export function GoRowMeetingBrief({ className, style }) {
  const uid = useUid('gr3')
  const x = 100
  const y = 70
  const w = 1000
  const h = 690
  const cx = x + 132 // content x
  return (
    <Art
      w={RW}
      h={RH}
      label="A team chat where the assistant posts a meeting brief and then a recap"
      className={`ns-ga-loop ${className ?? ''}`}
      style={{ '--ns-ga-dur': '9s', ...style }}
    >
      <Glow id={`${uid}-g1`} cx={1080} cy={60} r={520} color={C.p30} opacity={0.45} />
      <Glow id={`${uid}-g2`} cx={140} cy={760} r={420} color={C.p20} opacity={0.5} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={h} r={26} fill={C.white}>
        {/* icon rail */}
        <rect x={x} y={y} width={92} height={h} fill={C.n5} />
        <line x1={x + 92} x2={x + 92} y1={y} y2={y + h} stroke={C.n10} strokeWidth={2} />
        <BotTile id={`${uid}-ws`} x={x + 22} y={y + 26} s={48} from={C.p40} to={C.p80} />
        {[Hash, MessageSquare, Calendar, Bell].map((I, i) => (
          <g key={i}>
            {i === 0 && <rect x={x + 18} y={y + 104} width={56} height={56} rx={14} fill={C.p10} />}
            <Ico as={I} x={x + 30} y={y + 116 + i * 76} size={32} color={i === 0 ? C.p60 : C.n40} />
          </g>
        ))}

        {/* channel header */}
        <T x={cx} y={y + 62} size={34} weight={720} fill={C.n90}>
          # design-sync
        </T>
        <T x={x + w - 40} y={y + 60} size={24} weight={560} fill={C.n40} anchor="end">
          Today · 1:45 PM
        </T>
        <line x1={x + 92} x2={x + w} y1={y + 96} y2={y + 96} stroke={C.n10} strokeWidth={2} />

        {/* brief from the assistant */}
        <g className="ns-ga-in-0">
          <BotTile id={`${uid}-bot`} x={cx} y={y + 124} s={56} />
          <T x={cx + 76} y={y + 150} size={28} weight={720} fill={C.n90}>
            Northstar
          </T>
          <Chip x={cx + 222} y={y + 126} w={94} h={32} fill={C.p10} text="Agent" color={C.p60} size={18} />
          <T x={cx + 76} y={y + 188} size={28} weight={520} fill={C.n80}>
            Your brief for Design sync at 2:00 PM
          </T>
        </g>
        <g className="ns-ga-in-1">
          <rect x={cx + 76} y={y + 212} width={720} height={250} rx={18} fill={C.p0} stroke={C.p10} strokeWidth={2} />
          <T x={cx + 104} y={y + 256} size={22} weight={700} fill={C.p60} letterSpacing="0.06em">
            AGENDA
          </T>
        </g>
        {[
          ['Review onboarding flow v3', 'ns-ga-in-2'],
          ['Decide on the beta invite list', 'ns-ga-in-3'],
        ].map(([label, cls], i) => (
          <g key={label} className={cls}>
            <circle cx={cx + 112} cy={y + 293 + i * 50} r={6} fill={C.p60} />
            <T x={cx + 132} y={y + 304 + i * 50} size={30} weight={560} fill={C.n90}>
              {label}
            </T>
          </g>
        ))}
        <g className="ns-ga-in-4">
          <line x1={cx + 104} x2={cx + 768} y1={y + 384} y2={y + 384} stroke={C.p10} strokeWidth={2} />
          <Ico as={Paperclip} x={cx + 104} y={y + 404} size={26} color={C.n40} />
          <Chip x={cx + 142} y={y + 400} w={250} h={38} fill={C.white} stroke={C.n20} text="Onboarding spec" color={C.n80} size={20} r={10} />
          <Chip x={cx + 404} y={y + 400} w={262} h={38} fill={C.white} stroke={C.n20} text="Thread · 4 replies" color={C.n80} size={20} r={10} />
        </g>

        {/* recap after the call */}
        <g className="ns-ga-in-6">
          <T x={cx + 76} y={y + 512} size={24} weight={600} fill={C.n40}>
            2:34 PM
          </T>
          <rect x={cx + 76} y={y + 530} width={720} height={66} rx={16} fill={C.g0} stroke={C.green} strokeWidth={2} />
          <circle cx={cx + 112} cy={y + 563} r={16} fill={C.green} />
          <path d={`M${cx + 104} ${y + 563} l6 6 l11 -12`} stroke={C.white} strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <T x={cx + 142} y={y + 573} size={27} weight={600} fill={C.greenDeep}>
            Recap sent: 2 decisions, 3 owners
          </T>
        </g>

        {/* composer */}
        <rect x={cx} y={y + h - 82} width={w - 172} height={58} rx={29} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <T x={cx + 30} y={y + h - 44} size={24} weight={500} fill={C.n40}>
          Reply in #design-sync
        </T>
        <Ico as={Smile} x={x + w - 92} y={y + h - 68} size={30} color={C.n40} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* go-row-5-video · inline edit: underline, preview, Tab to accept (8s) */
/* ------------------------------------------------------------------ */

export function GoRowInlineEdits({ className, style }) {
  const uid = useUid('gr5')
  const x = 110
  const y = 64
  const w = 980
  const lx = x + 70
  const flagW = 384
  return (
    <Art
      w={RW}
      h={RH}
      label="A document with a soft underline under a wordy phrase and a suggestion to accept with Tab"
      className={`ns-ga-loop ${className ?? ''}`}
      style={{ '--ns-ga-dur': '8s', ...style }}
    >
      <Glow id={`${uid}-g1`} cx={1120} cy={720} r={520} color={C.green} opacity={0.28} />
      <Glow id={`${uid}-g2`} cx={80} cy={80} r={460} color={C.p30} opacity={0.35} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={760} r={24} fill={C.white}>
        <rect x={x} y={y} width={w} height={70} fill={C.n5} />
        <Dots x={x + 34} y={y + 35} />
        <Ico as={FileText} x={x + 110} y={y + 22} size={26} color={C.n60} />
        <T x={x + 146} y={y + 44} size={22} weight={600} fill={C.n60}>
          Launch notes
        </T>
        <T x={lx} y={y + 160} size={44} weight={760} fill={C.n90}>
          Welcome flow, round two
        </T>
        <T x={lx} y={y + 204} size={22} weight={520} fill={C.n40}>
          Draft · edited just now
        </T>

        <T x={lx} y={y + 272} size={33} weight={500} fill={C.n80}>
          We are rebuilding the first-run screens
        </T>
        {/* line 2: wordy phrase (old) and its accepted rewrite (new) */}
        <g className="ns-ga-old">
          <text x={lx} y={y + 324} fontSize={33} fontWeight={500} fill={C.n90} textLength={flagW} lengthAdjust="spacingAndGlyphs">
            in order to make sure that
          </text>
          <T x={lx + flagW + 10} y={y + 324} size={33} weight={500} fill={C.n80}>
            new teams
          </T>
        </g>
        <g className="ns-ga-flag">
          <rect x={lx - 6} y={y + 290} width={flagW + 12} height={46} rx={8} fill={C.p10} opacity={0.75} />
          <line x1={lx} x2={lx + flagW} y1={y + 338} y2={y + 338} stroke={C.p50} strokeWidth={3.5} strokeDasharray="3 7" strokeLinecap="round" />
        </g>
        <g className="ns-ga-old">
          {/* repaint text over the highlight so it reads on top */}
          <text x={lx} y={y + 324} fontSize={33} fontWeight={500} fill={C.n90} textLength={flagW} lengthAdjust="spacingAndGlyphs">
            in order to make sure that
          </text>
        </g>
        <g className="ns-ga-new" opacity={0}>
          <rect x={lx - 6} y={y + 290} width={48} height={46} rx={8} fill={C.g0} />
          <T x={lx} y={y + 324} size={33} weight={650} fill={C.greenDeep}>
            so
          </T>
          <T x={lx + 46} y={y + 324} size={33} weight={500} fill={C.n80}>
            new teams
          </T>
          <Chip x={lx + 560} y={y + 294} w={176} h={40} fill={C.g0} stroke={C.green} text="Accepted" color={C.greenDeep} size={20} />
        </g>
        <T x={lx} y={y + 376} size={33} weight={500} fill={C.n80}>
          reach their first finished page faster.
        </T>

        {/* suggestion popover */}
        <g className="ns-ga-pop">
          <defs>
            <filter id={`${uid}-pop`} x="-10%" y="-20%" width="120%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor={C.p100} floodOpacity="0.18" />
            </filter>
          </defs>
          <rect x={lx - 10} y={y + 404} width={700} height={236} rx={20} fill={C.white} stroke={C.n20} filter={`url(#${uid}-pop)`} />
          <BotTile id={`${uid}-bot`} x={lx + 18} y={y + 428} s={44} />
          <T x={lx + 76} y={y + 459} size={26} weight={700} fill={C.n90}>
            Tighten wording
          </T>
          <T x={lx + 664} y={y + 459} size={22} weight={560} fill={C.n40} anchor="end">
            Clarity
          </T>
          <text x={lx + 18} y={y + 520} fontSize={29} fontWeight={500}>
            <tspan fill={C.n40} textDecoration="line-through">
              in order to make sure that
            </tspan>
            <tspan fill={C.greenDeep} fontWeight={680}>
              {'   so'}
            </tspan>
          </text>
          <Chip x={lx + 18} y={y + 560} w={150} h={50} fill={C.p60} text="Accept" color={C.white} size={22} r={12} />
          <g className="ns-ga-press">
            <rect x={lx + 184} y={y + 566} width={74} height={38} rx={8} fill={C.n10} stroke={C.n20} strokeWidth={2} />
            <T x={lx + 221} y={y + 592} size={20} weight={650} fill={C.n60} anchor="middle">
              Tab
            </T>
          </g>
          <T x={lx + 290} y={y + 593} size={22} weight={560} fill={C.n60}>
            Dismiss
          </T>
        </g>
        {/* rest of the page */}
        {[
          [668, 640],
          [710, 560],
        ].map(([ly, lw]) => (
          <Line key={ly} x={lx} y={y + ly} w={lw} h={16} fill={C.n10} />
        ))}
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* go-row-7-video · one keystroke opens a prompt in place (8s)         */
/* ------------------------------------------------------------------ */

export function GoRowShortcut({ className, style }) {
  const uid = useUid('gr7')
  const x = 96
  const y = 60
  const w = 1008
  const lx = x + 68
  const py = y + 390 // prompt top
  return (
    <Art
      w={RW}
      h={RH}
      label="An essay with a caret where a shortcut opens a small assistant prompt in place"
      className={`ns-ga-loop ${className ?? ''}`}
      style={{ '--ns-ga-dur': '8s', ...style }}
    >
      <Glow id={`${uid}-g1`} cx={1100} cy={100} r={520} color={C.green} opacity={0.3} />
      <Glow id={`${uid}-g2`} cx={160} cy={760} r={460} color={C.greenDeep} opacity={0.16} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={780} r={24} fill={C.n0}>
        <T x={lx} y={y + 100} size={22} weight={650} fill={C.n40} letterSpacing="0.06em">
          ESSAY · DRAFT 3
        </T>
        <T x={lx} y={y + 160} size={42} weight={760} fill={C.n90}>
          Why small teams ship faster
        </T>
        {['Small teams move quickly because every', 'decision has an owner. When a question', 'comes up, someone answers it that day.'].map((l, i) => (
          <T key={l} x={lx} y={y + 240 + i * 50} size={33} weight={500} fill={C.n80}>
            {l}
          </T>
        ))}
        {/* I-beam at the end of the paragraph */}
        <g transform={`translate(${lx + 604} ${y + 312})`}>
          <rect x={0} y={0} width={3} height={42} fill={C.greenDeep} />
          <rect x={-8} y={0} width={19} height={3} rx={1.5} fill={C.greenDeep} />
          <rect x={-8} y={39} width={19} height={3} rx={1.5} fill={C.greenDeep} />
        </g>

        {/* inline prompt */}
        <g className="ns-ga-prompt">
          <defs>
            <filter id={`${uid}-sh`} x="-10%" y="-30%" width="120%" height="180%">
              <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor={C.g90} floodOpacity="0.18" />
            </filter>
          </defs>
          <rect x={lx - 8} y={py} width={760} height={84} rx={20} fill={C.white} stroke={C.green} strokeWidth={2.5} filter={`url(#${uid}-sh)`} />
          <Ico as={Sparkles} x={lx + 18} y={py + 26} size={32} color={C.greenDeep} />
          <T x={lx + 66} y={py + 53} size={29} weight={540} fill={C.n90}>
            Add an example from our last launch
          </T>
          <defs>
            <clipPath id={`${uid}-type`}>
              <rect x={lx + 62} y={py + 14} width={600} height={58} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-type)`}>
            <rect
              className="ns-ga-wipe-a ns-motion-only"
              style={{ '--ns-reveal': '600px' }}
              x={lx + 62}
              y={py + 18}
              width={600}
              height={50}
              fill={C.white}
            />
          </g>
          <rect x={lx + 680} y={py + 22} width={52} height={40} rx={10} fill={C.g90} />
          <path d={`M${lx + 695} ${py + 43} h20 m-8 -8 l8 8 l-8 8`} stroke={C.white} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* inserted sentence */}
        <g className="ns-ga-insert" opacity={0}>
          <rect x={lx - 8} y={py + 6} width={740} height={64} rx={10} fill={C.g0} />
          <T x={lx} y={py + 50} size={33} weight={560} fill={C.greenDeep}>
            Our beta went from idea to live in nine days.
          </T>
        </g>

        {[
          [560, 820],
          [606, 760],
          [652, 840],
          [698, 520],
        ].map(([ly, lw]) => (
          <Line key={ly} x={lx} y={y + ly} w={lw} h={16} fill={C.n10} />
        ))}
      </Window>

      {/* the keystroke */}
      <g className="ns-ga-keys ns-motion-only">
        <rect x={720} y={150} width={330} height={110} rx={24} fill={C.n90} opacity={0.9} />
        <Key x={744} y={168} w={88} label="Alt" size={26} />
        <T x={854} y={216} size={30} weight={700} fill={C.white} anchor="middle">
          +
        </T>
        <Key x={876} y={168} w={150} label="Space" size={26} />
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* go-row-8-video · tag the assistant in a shared room (7s)            */
/* ------------------------------------------------------------------ */

export function GoRowRooms({ className, style }) {
  const uid = useUid('gr8')
  const x = 150
  const y = 64
  const w = 900
  const h = 690
  const cx = x + 40
  return (
    <Art
      w={RW}
      h={RH}
      label="A shared channel where someone tags the assistant and it posts a catch-up summary"
      className={`ns-ga-loop ${className ?? ''}`}
      style={{ '--ns-ga-dur': '7s', ...style }}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={C.g90} />
          <stop offset="0.55" stopColor={C.p90} />
          <stop offset="1" stopColor={C.p60} />
        </linearGradient>
      </defs>
      <rect width={RW} height={RH} fill={`url(#${uid}-bg)`} />
      <Glow id={`${uid}-g1`} cx={1060} cy={120} r={420} color={C.p30} opacity={0.4} />
      <Glow id={`${uid}-g2`} cx={120} cy={760} r={380} color={C.green} opacity={0.22} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={h} r={26} fill={C.white} dark>
        <T x={cx} y={y + 62} size={34} weight={720} fill={C.n90}>
          # launch-room
        </T>
        <T x={cx + 252} y={y + 60} size={24} weight={540} fill={C.n40}>
          14 members
        </T>
        <Avatar cx={x + w - 132} cy={y + 50} r={20} fill={C.orange} initials="LK" ring={C.white} />
        <Avatar cx={x + w - 102} cy={y + 50} r={20} fill={C.greenDeep} initials="DM" ring={C.white} />
        <Avatar cx={x + w - 72} cy={y + 50} r={20} fill={C.p50} initials="+9" ring={C.white} />
        <line x1={x} x2={x + w} y1={y + 96} y2={y + 96} stroke={C.n10} strokeWidth={2} />

        {/* latecomer */}
        <Avatar cx={cx + 26} cy={y + 150} r={26} fill={C.orange} initials="LK" />
        <T x={cx + 70} y={y + 142} size={26} weight={700} fill={C.n90}>
          Lena Kovac
        </T>
        <T x={cx + 222} y={y + 142} size={22} weight={520} fill={C.n40}>
          9:58 AM
        </T>
        <T x={cx + 70} y={y + 180} size={29} weight={500} fill={C.n80}>
          Just joined. What did I miss?
        </T>

        {/* the tag */}
        <g className="ns-ga-in-0">
          <Avatar cx={cx + 26} cy={y + 244} r={26} fill={C.greenDeep} initials="DM" />
          <T x={cx + 70} y={y + 236} size={26} weight={700} fill={C.n90}>
            Dario Mendes
          </T>
          <T x={cx + 252} y={y + 236} size={22} weight={520} fill={C.n40}>
            9:59 AM
          </T>
          <rect x={cx + 66} y={y + 248} width={176} height={42} rx={10} fill={C.p10} />
          <Ico as={AtSign} x={cx + 76} y={y + 256} size={26} color={C.p60} />
          <T x={cx + 106} y={y + 278} size={27} weight={650} fill={C.p60}>
            Northstar
          </T>
          <T x={cx + 254} y={y + 278} size={29} weight={500} fill={C.n80}>
            catch Lena up, and who owns QA?
          </T>
        </g>

        {/* typing */}
        <g className="ns-ga-dots ns-motion-only">
          <rect x={cx + 70} y={y + 318} width={96} height={46} rx={23} fill={C.n10} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={cx + 96 + i * 22} cy={y + 341} r={6} fill={C.n40} />
          ))}
        </g>

        {/* answer */}
        <g className="ns-ga-in-2">
          <BotTile id={`${uid}-bot`} x={cx} y={y + 316} s={52} />
          <T x={cx + 70} y={y + 338} size={26} weight={700} fill={C.n90}>
            Northstar
          </T>
          <T x={cx + 204} y={y + 338} size={22} weight={520} fill={C.n40}>
            9:59 AM
          </T>
          <T x={cx + 70} y={y + 376} size={29} weight={500} fill={C.n80}>
            Here is the short version, Lena:
          </T>
          <rect x={cx + 66} y={y + 396} width={w - 156} height={190} rx={16} fill={C.n5} stroke={C.n10} strokeWidth={2} />
        </g>
        {[
          ['Launch moved to Tuesday the 21st', 'ns-ga-in-3'],
          ['Copy is final, screenshots due Friday', 'ns-ga-in-4'],
          ['QA owner: Priya (confirmed in thread)', 'ns-ga-in-5'],
        ].map(([label, cls], i) => (
          <g key={label} className={cls}>
            <circle cx={cx + 98} cy={y + 444 + i * 52} r={6} fill={C.p60} />
            <T x={cx + 118} y={y + 454 + i * 52} size={28} weight={540} fill={C.n90}>
              {label}
            </T>
          </g>
        ))}

        <rect x={cx} y={y + h - 80} width={w - 80} height={56} rx={28} fill={C.white} stroke={C.n20} strokeWidth={2} />
        <T x={cx + 28} y={y + h - 43} size={24} weight={500} fill={C.n40}>
          Message #launch-room
        </T>
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* go-hero-video · looping: a reply drafted line by line (10s)         */
/* ------------------------------------------------------------------ */

export function GoHeroLoop({ className, style }) {
  const uid = useUid('gh')
  const HW = 1600
  const HH = 900
  const x = 290
  const y = 70
  const w = 1020
  const h = 790
  const bx = x + 60
  const lines = [
    'Hi Hana, confirming the Harbor Loft for March 12.',
    'Headcount is 38, and dietary notes are in the sheet.',
    'I will send the final agenda on Wednesday.',
  ]
  return (
    <Art
      w={HW}
      h={HH}
      label="A frosted browser window where the assistant drafts an email reply line by line"
      className={`ns-ga-loop ${className ?? ''}`}
      style={{ '--ns-ga-dur': '10s', ...style }}
    >
      <defs>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id={`${uid}-sh`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="30" stdDeviation="36" floodColor={C.p100} floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width={HW} height={HH} fill={C.p90} />
      <g filter={`url(#${uid}-blur)`}>
        <g className="ns-ga-swirl">
          <ellipse cx={420} cy={260} rx={420} ry={240} fill={C.p60} opacity={0.85} />
          <ellipse cx={1240} cy={700} rx={460} ry={260} fill={C.m100} opacity={0.9} />
        </g>
        <g className="ns-ga-swirl-r">
          <ellipse cx={1250} cy={180} rx={360} ry={200} fill={C.p40} opacity={0.75} />
          <ellipse cx={360} cy={760} rx={380} ry={220} fill={C.p100} opacity={0.9} />
          <ellipse cx={800} cy={460} rx={260} ry={160} fill={C.p30} opacity={0.45} />
        </g>
      </g>

      {/* frosted browser */}
      <rect x={x} y={y} width={w} height={h} rx={28} fill={C.n0} opacity={0.9} filter={`url(#${uid}-sh)`} />
      <rect x={x} y={y} width={w} height={h} rx={28} fill="none" stroke={C.white} strokeOpacity={0.7} strokeWidth={2} />
      <defs>
        <clipPath id={`${uid}-clip`}>
          <rect x={x} y={y} width={w} height={h} rx={28} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-clip)`}>
        {/* tab strip */}
        <rect x={x} y={y} width={w} height={66} fill={C.p10} opacity={0.7} />
        <Dots x={x + 34} y={y + 33} />
        {[
          [Mail, 'Inbox', true],
          [MessageSquare, 'Team chat'],
          [FileText, 'Offsite plan'],
        ].map(([I, label, active], i) => {
          const tx = x + 110 + i * 214
          return (
            <g key={label}>
              {active && <rect x={tx} y={y + 12} width={204} height={54} rx={14} fill={C.n0} />}
              <Ico as={I} x={tx + 20} y={y + 28} size={24} color={active ? C.p60 : C.n60} />
              <T x={tx + 54} y={y + 47} size={22} weight={active ? 680 : 560} fill={active ? C.n90 : C.n60}>
                {label}
              </T>
            </g>
          )
        })}
        <rect x={x} y={y + 66} width={w} height={64} fill={C.n0} />
        <rect x={x + 24} y={y + 78} width={w - 48} height={42} rx={21} fill={C.n10} />
        <Ico as={Search} x={x + 44} y={y + 88} size={22} color={C.n40} />
        <T x={x + 78} y={y + 106} size={20} weight={520} fill={C.n40}>
          Search mail and people
        </T>
        <line x1={x} x2={x + w} y1={y + 130} y2={y + 130} stroke={C.n20} strokeWidth={1.5} />

        {/* thread */}
        <Ico as={Inbox} x={bx} y={y + 166} size={28} color={C.n40} />
        <T x={bx + 42} y={y + 190} size={32} weight={740} fill={C.n90}>
          Re: Venue for the March offsite
        </T>
        <rect x={bx} y={y + 220} width={w - 120} height={112} rx={18} fill={C.white} stroke={C.n10} strokeWidth={2} />
        <Avatar cx={bx + 44} cy={y + 262} r={24} fill={C.orange} initials="HB" />
        <T x={bx + 82} y={y + 258} size={23} weight={680} fill={C.n90}>
          Hana Brooks
        </T>
        <T x={bx + w - 150} y={y + 258} size={20} weight={520} fill={C.n40} anchor="end">
          8:12 AM
        </T>
        <T x={bx + 82} y={y + 300} size={24} weight={500} fill={C.n60}>
          Can you confirm the venue and headcount by Thursday?
        </T>

        {/* reply composer */}
        <rect x={bx} y={y + 356} width={w - 120} height={384} rx={18} fill={C.white} stroke={C.p20} strokeWidth={2.5} />
        <T x={bx + 30} y={y + 402} size={22} weight={560} fill={C.n40}>
          To
        </T>
        <Chip x={bx + 66} y={y + 378} w={170} h={36} fill={C.n10} text="Hana Brooks" color={C.n80} size={19} />
        <Chip x={bx + w - 400} y={y + 378} w={250} h={36} fill={C.p10} text="Drafting with Northstar" color={C.p60} size={18} />
        <line x1={bx + 24} x2={bx + w - 144} y1={y + 430} y2={y + 430} stroke={C.n10} strokeWidth={2} />
        <g className="ns-ga-draft">
          {lines.map((l, i) => (
            <T key={l} x={bx + 30} y={y + 484 + i * 48} size={27} weight={500} fill={C.n80}>
              {l}
            </T>
          ))}
          <defs>
            <clipPath id={`${uid}-draft`}>
              <rect x={bx + 4} y={y + 440} width={w - 128} height={160} />
            </clipPath>
          </defs>
          <g className="ns-motion-only" clipPath={`url(#${uid}-draft)`} style={{ '--ns-reveal': '760px' }}>
            {lines.map((l, i) => (
              <rect key={l} className={`ns-ga-line-${i}`} x={bx + 26} y={y + 452 + i * 48} width={760} height={44} fill={C.white} />
            ))}
          </g>
        </g>

        {/* send split-button */}
        <g transform={`translate(${bx + 30} ${y + 660})`}>
          <rect width={170} height={56} rx={14} fill={C.p60} />
          <rect className="ns-ga-send ns-motion-only" width={170} height={56} rx={14} fill={C.p80} opacity={0} />
          <T x={60} y={36} size={24} weight={700} fill={C.white} anchor="middle">
            Send
          </T>
          <line x1={118} x2={118} y1={12} y2={44} stroke={C.white} strokeOpacity={0.4} strokeWidth={2} />
          <Ico as={ChevronDown} x={130} y={16} size={24} color={C.white} />
        </g>
        <T x={bx + 230} y={y + 696} size={21} weight={540} fill={C.n40}>
          Tab to edit · Esc to discard
        </T>
      </g>

      {/* pointer */}
      <g className="ns-ga-pointer ns-motion-only">
        <path
          d={`M${bx + 120} ${y + 690} l0 42 l11 -10 l9 20 l9 -4 l-9 -19 l15 -1 z`}
          fill={C.n90}
          stroke={C.white}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* helper-band-1..4 · tinted washes that fade into the card (#f2f0eb)  */
/* ------------------------------------------------------------------ */

function Band({ a, b, c, label, className, style }) {
  const uid = useUid('hb')
  return (
    <Art w={318} h={106} label={label} className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-h`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor={a} />
          <stop offset="0.55" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
        <linearGradient id={`${uid}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.n10} stopOpacity="0" />
          <stop offset="0.55" stopColor={C.n10} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.n10} stopOpacity="1" />
        </linearGradient>
        <filter id={`${uid}-f`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width={318} height={106} fill={`url(#${uid}-h)`} opacity={0.55} />
      <g filter={`url(#${uid}-f)`} opacity={0.6}>
        <ellipse cx={70} cy={18} rx={90} ry={34} fill={a} />
        <ellipse cx={250} cy={30} rx={110} ry={30} fill={b} />
      </g>
      <rect width={318} height={106} fill={`url(#${uid}-v)`} />
    </Art>
  )
}

export const HelperBand1 = (p) => <Band a={C.green} b={C.g0} c={C.greenDeep} label="Mint wash" {...p} />
export const HelperBand2 = (p) => <Band a={C.orange} b={C.n5} c={C.orangeDeep} label="Peach wash" {...p} />
export const HelperBand3 = (p) => <Band a={C.m100} b={C.p30} c={C.p20} label="Rose wash" {...p} />
export const HelperBand4 = (p) => <Band a={C.p30} b={C.p20} c={C.p40} label="Lilac wash" {...p} />

/* ------------------------------------------------------------------ */
/* helper-icon-1..6 · skill tiles                                      */
/* ------------------------------------------------------------------ */

function Tile({ s = 69, fill = C.white, stroke = C.n20, label, children, className, style }) {
  return (
    <svg viewBox={`0 0 ${s} ${s}`} className={`ns-art ${className ?? ''}`} style={style} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <rect x={0.5} y={0.5} width={s - 1} height={s - 1} fill={fill} stroke={stroke} />
      {children}
    </svg>
  )
}

// 1 Wordsmith: a caret over a squiggle being straightened
export function HelperIconWordsmith(p) {
  return (
    <Tile label="Wordsmith" {...p}>
      <path d="M17 41 q4 -6 8 0 t8 0 t8 0" stroke={C.orange} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M17 48 h34" stroke={C.greenDeep} strokeWidth={3} strokeLinecap="round" />
      <path d="M44 18 l8 8 l-17 17 l-10 2 l2 -10 z" fill={C.p10} stroke={C.p60} strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M40 22 l8 8" stroke={C.p60} strokeWidth={2.6} />
    </Tile>
  )
}

// 2 Message Sorter: envelope with sort lanes
export function HelperIconSorter(p) {
  return (
    <Tile label="Message Sorter" {...p}>
      <rect x={14} y={20} width={34} height={25} rx={5} fill={C.p10} stroke={C.p60} strokeWidth={2.6} />
      <path d="M15 22 l16 12 l16 -12" stroke={C.p60} strokeWidth={2.6} fill="none" strokeLinejoin="round" />
      <rect x={30} y={42} width={26} height={7} rx={3.5} fill={C.green} />
      <rect x={34} y={51} width={22} height={7} rx={3.5} fill={C.orange} />
    </Tile>
  )
}

// 3 Citation Checker: quote mark with a verified tick
export function HelperIconCitation(p) {
  return (
    <Tile label="Citation Checker" {...p}>
      <rect x={13} y={14} width={34} height={42} rx={5} fill={C.white} stroke={C.n40} strokeWidth={2.4} />
      <path d="M20 26 h20 M20 33 h20 M20 40 h12" stroke={C.n30} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={46} cy={44} r={11} fill={C.green} />
      <path d="M41 44 l4 4 l7 -8" stroke={C.white} strokeWidth={2.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Tile>
  )
}

// 4 Morning Memo: a cup with steam and a sunrise
export function HelperIconMemo(p) {
  return (
    <Tile label="Morning Memo" {...p}>
      <path d="M17 32 h28 v8 a12 12 0 0 1 -12 12 h-4 a12 12 0 0 1 -12 -12 z" fill={C.orange} opacity={0.9} />
      <path d="M45 35 h3 a5 5 0 0 1 0 10 h-4" stroke={C.orangeDeep} strokeWidth={2.6} fill="none" />
      <path d="M25 16 q-3 4 0 8 M32 14 q-3 5 0 10 M39 16 q-3 4 0 8" stroke={C.p40} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <path d="M14 57 h40" stroke={C.n30} strokeWidth={2.4} strokeLinecap="round" />
    </Tile>
  )
}

// 5 Skill Builder: custom sparkle (flat warm-grey tile)
export function HelperIconBuilder(p) {
  return (
    <Tile s={64} fill={C.n20} stroke="none" label="Skill Builder" {...p}>
      <path d="M30 14 C31 25 33 28 44 30 C33 32 31 35 30 46 C29 35 27 32 16 30 C27 28 29 25 30 14 Z" fill={C.n60} />
      <path d="M45 39 C45.5 43 46.5 44 50 44.5 C46.5 45 45.5 46 45 50 C44.5 46 43.5 45 40 44.5 C43.5 44 44.5 43 45 39 Z" fill={C.n60} />
    </Tile>
  )
}

// 6 Marketplace: 2x2 grid with a plus
export function HelperIconStore(p) {
  return (
    <Tile s={64} fill={C.n20} stroke="none" label="Marketplace" {...p}>
      <rect x={16} y={16} width={13} height={13} rx={3.5} fill={C.n60} />
      <rect x={35} y={16} width={13} height={13} rx={3.5} fill={C.n60} />
      <rect x={16} y={35} width={13} height={13} rx={3.5} fill={C.n60} />
      <path d="M41.5 35 v13 M35 41.5 h13" stroke={C.n60} strokeWidth={3.4} strokeLinecap="round" />
    </Tile>
  )
}

/* ------------------------------------------------------------------ */
/* cta-band-bg · soft lavender light streaks (1440:244, bg #e8e0ff)    */
/* ------------------------------------------------------------------ */

export function CtaBandBg({ className, style }) {
  const uid = useUid('cb')
  return (
    <Art w={1440} h={244} bg={C.p10} label="" className={className} style={style}>
      <defs>
        <filter id={`${uid}-f`} x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-f)`}>
        <ellipse cx={330} cy={60} rx={420} ry={46} fill={C.p20} opacity={0.8} transform="rotate(-8 330 60)" style={{ transformBox: 'view-box' }} />
        <ellipse cx={900} cy={170} rx={520} ry={52} fill={C.p30} opacity={0.42} transform="rotate(-6 900 170)" style={{ transformBox: 'view-box' }} />
        <ellipse cx={1240} cy={70} rx={360} ry={40} fill={C.p0} opacity={0.95} transform="rotate(-10 1240 70)" style={{ transformBox: 'view-box' }} />
        <ellipse cx={620} cy={230} rx={300} ry={36} fill={C.p0} opacity={0.8} />
      </g>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* connectors-strip · invented app tiles (not real third-party marks)  */
/* ------------------------------------------------------------------ */

const LABELS = ['Calendar', 'Files', 'CRM', 'Tasks', 'Chat', 'Wiki', 'Helpdesk', 'Metrics']

function ConnTile({ i, x, y, s, label, size }) {
  const k = (s * 0.5) / 56
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.22} fill={C.n10} stroke={C.n20} strokeWidth={1.5} />
      <g transform={`translate(${x + s * 0.25} ${y + s * 0.25}) scale(${k})`}>
        <AppGlyph i={i} />
      </g>
      <T x={x + s / 2} y={y + s + size * 1.5} size={size} weight={560} fill={C.n60} anchor="middle">
        {label}
      </T>
    </g>
  )
}

export function ConnectorsStrip({ className = '', style }) {
  const uid = useUid('cs')
  return (
    <>
      <Art w={1440} h={195} label="Connector tiles for calendar, files, CRM, tasks, chat, wiki, helpdesk and metrics apps" className={`ns-ga-wide ${className}`} style={style}>
        <defs>
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={C.white} stopOpacity="0" />
            <stop offset="0.2" stopColor={C.white} stopOpacity="1" />
            <stop offset="0.8" stopColor={C.white} stopOpacity="1" />
            <stop offset="1" stopColor={C.white} stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}-m`}>
            <rect width={1440} height={195} fill={`url(#${uid}-fade)`} />
          </mask>
        </defs>
        <g mask={`url(#${uid}-m)`}>
          {LABELS.map((l, i) => (
            <ConnTile key={l} i={i} x={110 + i * 160} y={22} s={120} label={l} size={17} />
          ))}
        </g>
      </Art>
      <Art w={390} h={198} label="Connector tiles for calendar, files, CRM, tasks, chat, wiki, helpdesk and metrics apps" className={`ns-ga-narrow ${className}`} style={style}>
        {LABELS.map((l, i) => (
          <ConnTile key={l} i={i} x={31 + (i % 4) * 88} y={8 + Math.floor(i / 4) * 98} s={64} label={l} size={12} />
        ))}
      </Art>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* final-cta-bg · dark glow with faint code (1440:431, bg #0c4243)     */
/* ------------------------------------------------------------------ */

const CODE = [
  'skill "morning-memo" {',
  '  trigger: schedule("weekdays 08:00")',
  '  read: [calendar, tracker, inbox]',
  '  steps: summarize(changes, since: "yesterday")',
  '  deliver: memo(to: me, length: "short")',
  '}',
  'skill "chase-replies" {',
  '  trigger: thread.quiet(days: 3)',
  '  draft: reminder(tone: "warm")',
  '}',
]

export function FinalCtaBg({ className, style }) {
  const uid = useUid('fc')
  return (
    <Art w={1440} h={431} bg={C.g90} label="" className={className} style={style}>
      <defs>
        <filter id={`${uid}-f`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={C.white} opacity={0.05}>
        {CODE.map((l, i) => (
          <text key={i} x={760} y={60 + i * 34} fontSize={20} xmlSpace="preserve">
            {l}
          </text>
        ))}
      </g>
      <g filter={`url(#${uid}-f)`}>
        <ellipse cx={420} cy={220} rx={300} ry={170} fill={C.p80} opacity={0.75} />
        <ellipse cx={980} cy={180} rx={320} ry={150} fill={C.p60} opacity={0.38} />
        <ellipse cx={680} cy={260} rx={220} ry={120} fill={C.m100} opacity={0.9} />
        <ellipse cx={640} cy={230} rx={110} ry={70} fill={C.orangeDeep} opacity={0.55} />
      </g>
    </Art>
  )
}
