// /mail split-feature art (mail-feature-*, 720x627 on #f7f5f2): a white
// Northstar Inbox card stacked over two offset gradient panels. Each picture
// illustrates the Northstar copy in src/data/mail.js. Static; all names,
// subjects and companies are invented.
import {
  ArrowRight,
  Check,
  Clock,
  Lock,
  Moon,
  Newspaper,
  Pin,
  Plane,
  Plus,
  Receipt,
  Send,
  Sparkles,
  Star as StarIcon,
  Sunrise,
  Table2,
  Undo2,
  WifiOff,
  Zap,
} from 'lucide-react'
import { Art, Avatar, Chip, Ico, Line, T } from './primitives'
import { Card, Panel, Pointer } from './mailDocs-kit'
import { C, useUid } from './tokens'

const W = 720
const H = 627

function Stage({ label, className, style, children }) {
  return (
    <Art w={W} h={H} bg={C.n5} label={label} className={className} style={style}>
      {children}
    </Art>
  )
}

/** Small rounded tag chip with tinted fill. */
function Tag({ x, y, text, tint, ink, size = 15, h = 24 }) {
  const w = text.length * size * 0.58 + 20
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={tint} />
      <T x={x + w / 2} y={y + h / 2 + size * 0.36} size={size} weight={650} fill={ink} anchor="middle">
        {text}
      </T>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-ai · Delegate to Pilot mode (plain-word house rules)   */
/* ------------------------------------------------------------------ */

const RULES = ['File every receipt in Finance', 'Flag anything from legal', 'Decline cold pitches politely']

export function MailFeatureAi({ className, style }) {
  const uid = useUid('mfa')
  const x = 90
  const y = 92
  const w = 540
  return (
    <Stage label="Pilot mode rules written in plain sentences, with a log of today's actions" className={className} style={style}>
      <Panel id={`${uid}-a`} x={36} y={34} w={440} h={330} from={C.p30} to={C.p60} />
      <Panel id={`${uid}-b`} x={290} y={300} w={394} h={292} from={C.teal} to={C.greenDeep} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={448} r={24}>
        <rect x={x + 32} y={y + 28} width={44} height={44} rx={12} fill={C.p0} />
        <Ico as={Sparkles} x={x + 42} y={y + 38} size={24} color={C.p60} />
        <T x={x + 92} y={y + 59} size={26} weight={720}>
          Pilot rules
        </T>
        <rect x={x + w - 128} y={y + 32} width={96} height={36} rx={18} fill={C.g0} stroke="rgba(20,128,114,0.25)" />
        <circle cx={x + w - 106} cy={y + 50} r={5} fill={C.green} />
        <T x={x + w - 92} y={y + 57} size={18} weight={680} fill={C.greenDeep}>
          Active
        </T>
        <line x1={x} x2={x + w} y1={y + 98} y2={y + 98} stroke={C.n10} strokeWidth={2} />

        {RULES.map((r, i) => {
          const ry = y + 118 + i * 62
          return (
            <g key={r}>
              <circle cx={x + 50} cy={ry + 22} r={14} fill={C.p60} />
              <Ico as={Check} x={x + 41} y={ry + 13} size={18} color={C.white} stroke={3} />
              <T x={x + 80} y={ry + 30} size={22} weight={560} fill={C.n90}>
                {r}
              </T>
              {i < 2 && <line x1={x + 80} x2={x + w - 32} y1={ry + 52} y2={ry + 52} stroke={C.n10} strokeWidth={1.5} />}
            </g>
          )
        })}

        <rect x={x + 32} y={y + 312} width={w - 64} height={54} rx={14} fill={C.white} stroke={C.p30} strokeWidth={2} strokeDasharray="7 6" />
        <Ico as={Plus} x={x + 50} y={y + 327} size={24} color={C.p60} />
        <T x={x + 86} y={y + 346} size={20} weight={560} fill={C.n40}>
          Nudge me if a client goes quiet
        </T>
        <rect className="ns-caret" x={x + 376} y={y + 326} width={2.5} height={26} fill={C.p60} />

        <rect x={x} y={y + 388} width={w} height={60} fill={C.n5} />
        <line x1={x} x2={x + w} y1={y + 388} y2={y + 388} stroke={C.n10} strokeWidth={2} />
        <Ico as={Clock} x={x + 32} y={y + 407} size={22} color={C.n60} />
        <T x={x + 64} y={y + 425} size={19} weight={560} fill={C.n60}>
          Today: 12 actions logged
        </T>
        <Ico as={Undo2} x={x + w - 118} y={y + 407} size={22} color={C.p60} />
        <T x={x + w - 90} y={y + 425} size={19} weight={680} fill={C.p60}>
          Review
        </T>
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-split · Morning Brief                                   */
/* ------------------------------------------------------------------ */

const BRIEF_ROWS = [
  ['Ines Moreau', 'Atlas', C.p10, C.p60, 'Approve the final launch copy?', C.p40, 'IM'],
  ['Theo Lang', 'Hiring', C.g0, C.greenDeep, 'Panel feedback needed by noon', C.green, 'TL'],
  ['Kofi Mensah', 'Vendors', '#fff1e6', C.orangeDeep, 'Signed quote attached for review', C.orange, 'KM'],
]

export function MailFeatureSplit({ className, style }) {
  const uid = useUid('mfs')
  const x = 80
  const y = 74
  const w = 560
  const tabs = [
    ['Atlas launch', 14, true],
    ['Hiring', 9],
    ['Vendors', 15],
  ]
  return (
    <Stage label="A Morning Brief that groups overnight mail by project and lists replies waiting on you" className={className} style={style}>
      <Panel id={`${uid}-a`} x={300} y={28} w={392} h={320} from={C.p10} to={C.p30} />
      <Panel id={`${uid}-b`} x={28} y={292} w={384} h={304} from={C.sky} to={C.indigo} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={482} r={24}>
        <rect x={x + 30} y={y + 28} width={44} height={44} rx={12} fill="#fff1e6" />
        <Ico as={Sunrise} x={x + 40} y={y + 38} size={24} color={C.orangeDeep} />
        <T x={x + 90} y={y + 59} size={26} weight={720}>
          Morning Brief
        </T>
        <T x={x + w - 30} y={y + 58} size={18} weight={560} fill={C.n40} anchor="end">
          Tue · 7:00 AM
        </T>
        <T x={x + 30} y={y + 104} size={19} weight={520} fill={C.n60}>
          Overnight: 38 messages across 3 projects
        </T>
        {tabs.reduce(
          (acc, [label, n, on]) => {
            const cw = label.length * 10.4 + 56
            acc.nodes.push(
              <g key={label}>
                <rect x={acc.x} y={y + 124} width={cw} height={38} rx={19} fill={on ? C.n90 : C.n5} stroke={on ? C.n90 : C.n10} strokeWidth={1.5} />
                <T x={acc.x + 16} y={y + 149} size={17} weight={650} fill={on ? C.white : C.n80}>
                  {label}
                </T>
                <T x={acc.x + cw - 15} y={y + 149} size={16} weight={650} fill={on ? C.p20 : C.n40} anchor="end">
                  {n}
                </T>
              </g>,
            )
            acc.x += cw + 10
            return acc
          },
          { x: x + 30, nodes: [] },
        ).nodes}

        <rect x={x + 30} y={y + 182} width={w - 60} height={46} rx={12} fill={C.g0} stroke="rgba(20,128,114,0.18)" />
        <Ico as={Check} x={x + 46} y={y + 194} size={22} color={C.greenDeep} stroke={2.6} />
        <text x={x + 80} y={y + 211} fontSize={18}>
          <tspan fontWeight={700} fill={C.greenDeep}>
            Decided
          </tspan>
          <tspan fontWeight={520} fill={C.n80}>
            {'  '}Launch moves to Thursday the 24th
          </tspan>
        </text>

        <T x={x + 30} y={y + 264} size={15} weight={700} fill={C.n40} letterSpacing="0.08em">
          WAITING ON YOU · 3
        </T>
        {BRIEF_ROWS.map(([name, tag, tint, ink, subj, av, ini], i) => {
          const ry = y + 278 + i * 66
          return (
            <g key={name}>
              <Avatar cx={x + 52} cy={ry + 33} r={20} fill={av} initials={ini} />
              <T x={x + 86} y={ry + 26} size={19} weight={700}>
                {name}
              </T>
              <Tag x={x + 86 + name.length * 10.6 + 10} y={ry + 9} text={tag} tint={tint} ink={ink} size={13} h={22} />
              <T x={x + 86} y={ry + 52} size={17} weight={500} fill={C.n60}>
                {subj}
              </T>
              <T x={x + w - 30} y={ry + 26} size={15} weight={560} fill={C.n40} anchor="end">
                {['2:14 AM', '4:40 AM', '6:05 AM'][i]}
              </T>
              {i < 2 && <line x1={x + 86} x2={x + w - 30} y1={ry + 65} y2={ry + 65} stroke={C.n10} strokeWidth={1.5} />}
            </g>
          )
        })}
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-reminder · Pin what matters this week (the shelf)      */
/* ------------------------------------------------------------------ */

const PINS = [
  ['Vendor contract', 'Legal review', C.orange],
  ['Lisbon trip', 'Flights on Thu', C.sky],
  ['Hiring loop', '5 interviewers', C.green],
]

export function MailFeatureReminder({ className, style }) {
  const uid = useUid('mfr')
  const x = 84
  const y = 74
  const w = 552
  return (
    <Stage label="A shelf of pinned threads above the inbox, with a pinned confirmation toast" className={className} style={style}>
      <Panel id={`${uid}-a`} x={28} y={26} w={410} h={304} from={C.skyLight} to={C.skyDeep} />
      <Panel id={`${uid}-b`} x={240} y={318} w={452} h={282} from={C.rose} to={C.p30} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={436} r={24}>
        <Ico as={Pin} x={x + 30} y={y + 30} size={24} color={C.p60} />
        <T x={x + 64} y={y + 50} size={24} weight={720}>
          Shelf
        </T>
        <T x={x + 140} y={y + 50} size={18} weight={560} fill={C.n40}>
          3 pinned this week
        </T>
        {PINS.map(([t, s, col], i) => {
          const cx = x + 26 + i * 170
          return (
            <g key={t}>
              <rect x={cx} y={y + 76} width={160} height={92} rx={14} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
              <rect x={cx} y={y + 76} width={160} height={8} rx={4} fill={col} />
              <rect x={cx} y={y + 80} width={160} height={4} fill={col} />
              <T x={cx + 16} y={y + 120} size={17} weight={700}>
                {t}
              </T>
              <T x={cx + 16} y={y + 148} size={15} weight={520} fill={C.n60}>
                {s}
              </T>
            </g>
          )
        })}
        <line x1={x} x2={x + w} y1={y + 194} y2={y + 194} stroke={C.n10} strokeWidth={2} />
        <T x={x + 30} y={y + 228} size={15} weight={700} fill={C.n40} letterSpacing="0.08em">
          INBOX
        </T>
        {[
          ['Harper Quinn', 'Venue deposit is due Friday', C.p50, 'HQ'],
          ['Leo Brandt', 'Notes from the design crit', C.greenDeep, 'LB'],
          ['Mina Sato', 'Can we move our 1:1?', C.orange, 'MS'],
        ].map(([n, s, col, ini], i) => {
          const ry = y + 244 + i * 62
          return (
            <g key={n}>
              <Avatar cx={x + 50} cy={ry + 30} r={19} fill={col} initials={ini} />
              <T x={x + 82} y={ry + 36} size={19} weight={680}>
                {n}
              </T>
              <T x={x + 222} y={ry + 36} size={18} weight={500} fill={C.n60}>
                {s}
              </T>
              <line x1={x + 82} x2={x + w - 30} y1={ry + 61} y2={ry + 61} stroke={C.n10} strokeWidth={1.5} />
            </g>
          )
        })}
      </Card>
      <defs>
        <linearGradient id={`${uid}-toast`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.skyDeep} />
          <stop offset="1" stopColor={C.p60} />
        </linearGradient>
      </defs>
      <rect x={150} y={486} width={420} height={62} rx={31} fill={`url(#${uid}-toast)`} />
      <Ico as={Pin} x={176} y={505} size={24} color={C.white} />
      <T x={210} y={524} size={20} weight={650} fill={C.white}>
        Pinned Vendor contract
      </T>
      <rect x={462} y={498} width={92} height={38} rx={19} fill="rgba(255,255,255,0.22)" />
      <T x={508} y={523} size={16} weight={760} fill={C.white} anchor="middle" letterSpacing="0.06em">
        UNDO
      </T>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-comments · Shared drafts for hard replies              */
/* ------------------------------------------------------------------ */

export function MailFeatureComments({ className, style }) {
  const uid = useUid('mfc')
  const x = 84
  const y = 70
  const w = 552
  return (
    <Stage label="A shared reply draft with a suggested edit, a teammate's cursor, a comment and a legal sign-off step" className={className} style={style}>
      <Panel id={`${uid}-a`} x={28} y={26} w={392} h={300} from={C.teal} to={C.greenDeep} texture="stripes" />
      <Panel id={`${uid}-b`} x={300} y={300} w={392} h={300} from={C.skyLight} to={C.sky} texture="clouds" />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={486} r={24}>
        <T x={x + 30} y={y + 46} size={15} weight={700} fill={C.n40} letterSpacing="0.08em">
          SHARED DRAFT
        </T>
        <T x={x + 30} y={y + 76} size={22} weight={720}>
          Re: Refund for order 4417
        </T>
        {[
          [C.orange, 'RA'],
          [C.p50, 'PN'],
          [C.green, 'SR'],
        ].map(([col, ini], i) => (
          <Avatar key={ini} cx={x + w - 112 + i * 32} cy={y + 58} r={16} fill={col} initials={ini} ring={C.white} />
        ))}
        <line x1={x} x2={x + w} y1={y + 100} y2={y + 100} stroke={C.n10} strokeWidth={2} />

        <T x={x + 30} y={y + 142} size={21} weight={520} fill={C.n90}>
          Hi Dana, thanks for bearing with us.
        </T>
        <text x={x + 30} y={y + 178} fontSize={21} fontWeight={520} fill={C.n90}>
          We{' '}
          <tspan fill={C.n40} style={{ textDecoration: 'line-through' }}>
            may
          </tspan>{' '}
          <tspan fill={C.greenDeep} fontWeight={650} style={{ textDecoration: 'underline' }}>
            will
          </tspan>{' '}
          refund the full order
        </text>
        <T x={x + 30} y={y + 214} size={21} weight={520} fill={C.n90}>
          by Friday, no return needed.
        </T>
        {/* collaborator cursor */}
        <rect x={x + 302} y={y + 192} width={2.5} height={28} fill={C.orange} />
        <rect x={x + 302} y={y + 220} width={44} height={20} rx={5} fill={C.orange} />
        <T x={x + 324} y={y + 235} size={13} weight={700} fill={C.white} anchor="middle">
          Rae
        </T>

        <Avatar cx={x + 50} cy={y + 268} r={18} fill={C.p50} initials="PN" />
        <T x={x + 80} y={y + 265} size={18} weight={700}>
          Priya Natarajan
        </T>
        <T x={x + 80} y={y + 287} size={15} weight={520} fill={C.n40}>
          commented · 2m
        </T>
        <rect x={x + 80} y={y + 302} width={400} height={50} rx={14} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
        <text x={x + 98} y={y + 334} fontSize={18} fontWeight={540} fill={C.n80}>
          <tspan fill={C.p60} fontWeight={700}>
            @Sam
          </tspan>{' '}
          are we safe to promise Friday?
        </text>

        <rect x={x} y={y + 380} width={w} height={106} fill={C.n5} />
        <line x1={x} x2={x + w} y1={y + 380} y2={y + 380} stroke={C.n10} strokeWidth={2} />
        <rect x={x + 30} y={y + 406} width={272} height={44} rx={22} fill={C.p0} stroke={C.p20} strokeWidth={1.5} />
        <Ico as={Lock} x={x + 46} y={y + 417} size={20} color={C.p60} />
        <T x={x + 74} y={y + 434} size={17} weight={680} fill={C.p60}>
          Needs sign-off from Legal
        </T>
        <rect x={x + w - 152} y={y + 404} width={122} height={48} rx={14} fill={C.n20} />
        <Ico as={Send} x={x + w - 132} y={y + 418} size={20} color={C.n60} />
        <T x={x + w - 102} y={y + 435} size={18} weight={680} fill={C.n60}>
          Send
        </T>
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-snippets · Protect your deep-work hours                */
/* ------------------------------------------------------------------ */

export function MailFeatureSnippets({ className, style }) {
  const uid = useUid('mfq')
  const x = 70
  const y = 112
  const w = 530
  return (
    <Stage label="Quiet hours holding non-urgent mail until a focus block ends, with VIPs still allowed through" className={className} style={style}>
      <Panel id={`${uid}-a`} x={28} y={26} w={380} h={300} from={C.rose} to={C.roseDeep} texture="sparkle" />
      <Panel id={`${uid}-b`} x={300} y={300} w={392} h={300} from={C.sky} to={C.indigo} />
      {/* held mail, peeking from behind */}
      <Card id={`${uid}-m`} x={392} y={50} w={290} h={150} r={18}>
        <T x={414} y={86} size={15} weight={700} fill={C.n40} letterSpacing="0.08em">
          HELD FOR LATER
        </T>
        <Line x={414} y={104} w={220} h={10} fill={C.n10} />
        <Line x={414} y={124} w={180} h={10} fill={C.n10} />
        <Line x={414} y={144} w={200} h={10} fill={C.n10} />
      </Card>
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={446} r={24}>
        <circle cx={x + 52} cy={y + 50} r={22} fill={C.p100} />
        <Ico as={Moon} x={x + 41} y={y + 39} size={22} color={C.p20} />
        <T x={x + 88} y={y + 59} size={26} weight={720}>
          Quiet hours
        </T>
        <Chip x={x + w - 158} y={y + 32} w={128} h={36} fill={C.p0} stroke={C.p20} text="until 12:00" color={C.p60} size={17} />

        {[C.green, C.orange, C.p40].map((col, i) => (
          <Avatar key={col} cx={x + 46 + i * 30} cy={y + 108} r={15} fill={col} initials={['JE', 'MS', 'AL'][i]} ring={C.white} />
        ))}
        <T x={x + 126} y={y + 114} size={17} weight={540} fill={C.n60}>
          You and 2 teammates are heads-down
        </T>

        <rect x={x + 30} y={y + 144} width={w - 60} height={12} rx={6} fill={C.n10} />
        <rect x={x + 30} y={y + 144} width={(w - 60) * 0.62} height={12} rx={6} fill={C.p60} />
        <T x={x + 30} y={y + 182} size={15} weight={600} fill={C.n40}>
          9:00
        </T>
        <T x={x + w - 30} y={y + 182} size={15} weight={600} fill={C.n40} anchor="end">
          12:00
        </T>

        <rect x={x + 30} y={y + 202} width={w - 60} height={56} rx={14} fill={C.n5} />
        <Ico as={Clock} x={x + 46} y={y + 219} size={22} color={C.n60} />
        <T x={x + 78} y={y + 237} size={18} weight={600} fill={C.n80}>
          14 held: 9 updates, 3 invites, 2 FYIs
        </T>

        <T x={x + 30} y={y + 294} size={15} weight={700} fill={C.n40} letterSpacing="0.08em">
          VIP · ALWAYS BREAKS THROUGH
        </T>
        {[
          ['Jordan Ellis', 'Board deck: one last number', C.greenDeep, 'JE'],
          ['Ops on-call', 'Checkout errors above 2%', C.orangeDeep, 'OC'],
        ].map(([n, s, col, ini], i) => {
          const ry = y + 308 + i * 64
          return (
            <g key={n}>
              <Avatar cx={x + 50} cy={ry + 32} r={19} fill={col} initials={ini} />
              <T x={x + 82} y={ry + 27} size={18} weight={700}>
                {n}
              </T>
              <T x={x + 82} y={ry + 50} size={16} weight={500} fill={C.n60}>
                {s}
              </T>
              <rect x={x + w - 116} y={ry + 16} width={86} height={30} rx={15} fill={C.butter} />
              <Ico as={Zap} x={x + w - 106} y={ry + 23} size={16} color={C.orangeDeep} />
              <T x={x + w - 86} y={ry + 36} size={14} weight={700} fill={C.orangeDeep}>
                VIP
              </T>
            </g>
          )
        })}
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-opens · Stay easy to reach on the road (travel mode)   */
/* ------------------------------------------------------------------ */

export function MailFeatureOpens({ className, style }) {
  const uid = useUid('mfo')
  const fx = 196
  const fy = 228
  const fw = 488
  return (
    <Stage label="Travel mode: an offline outbox queuing replies that send in order after landing" className={className} style={style}>
      <Panel id={`${uid}-a`} x={300} y={26} w={392} h={320} from={C.skyLight} to={C.sky} texture="clouds" />
      <Panel id={`${uid}-b`} x={28} y={296} w={380} h={304} from={C.rose} to={C.p30} />

      {/* status email behind */}
      <Card id={`${uid}-e`} x={54} y={58} w={470} h={290} r={22}>
        <Avatar cx={98} cy={104} r={22} fill={C.p60} initials="JO" />
        <T x={132} y={100} size={19} weight={700}>
          Jules Okoro
        </T>
        <rect x={246} y={83} width={112} height={26} rx={13} fill={C.p0} />
        <Ico as={Plane} x={256} y={88} size={16} color={C.p60} />
        <T x={278} y={101} size={13} weight={700} fill={C.p60}>
          In transit
        </T>
        <T x={132} y={124} size={15} weight={520} fill={C.n40}>
          Away note on until 6:40 PM
        </T>
        <T x={78} y={170} size={19} weight={650}>
          Status before my flight
        </T>
        <Line x={78} y={188} w={380} h={10} fill={C.n10} />
        <Line x={78} y={208} w={330} h={10} fill={C.n10} />
        <Line x={78} y={228} w={250} h={10} fill={C.n10} />
      </Card>

      <Card id={`${uid}-o`} x={fx} y={fy} w={fw} h={346} r={24}>
        <T x={fx + 28} y={fy + 50} size={24} weight={720}>
          Outbox
        </T>
        <rect x={fx + 126} y={fy + 28} width={160} height={30} rx={15} fill={C.n5} stroke={C.n10} />
        <Ico as={WifiOff} x={fx + 138} y={fy + 35} size={16} color={C.n60} />
        <T x={fx + 160} y={fy + 48} size={14} weight={650} fill={C.n60}>
          Offline · 3 queued
        </T>
        <line x1={fx} x2={fx + fw} y1={fy + 78} y2={fy + 78} stroke={C.n10} strokeWidth={2} />
        {[
          ['Mara Lind', 'Contract notes', '2:14 PM'],
          ['Ops team', 'Weekend rota', '2:20 PM'],
          ['Felix Grant', 'Re: Site visit', '2:31 PM'],
        ].map(([to, subj, t], i) => {
          const ry = fy + 78 + i * 62
          return (
            <g key={to}>
              <T x={fx + 28} y={ry + 38} size={14} weight={700} fill={C.n30}>
                {i + 1}
              </T>
              <Ico as={Send} x={fx + 48} y={ry + 22} size={20} color={C.p50} />
              <T x={fx + 82} y={ry + 38} size={18} weight={680}>
                {to}
              </T>
              <T x={fx + 214} y={ry + 38} size={17} weight={500} fill={C.n60}>
                {subj}
              </T>
              <T x={fx + fw - 28} y={ry + 38} size={15} weight={560} fill={C.n40} anchor="end">
                {t}
              </T>
              <line x1={fx + 28} x2={fx + fw - 28} y1={ry + 62} y2={ry + 62} stroke={C.n10} strokeWidth={1.5} />
            </g>
          )
        })}
        <rect x={fx} y={fy + 264} width={fw} height={82} fill={C.p0} />
        <circle cx={fx + 52} cy={fy + 305} r={20} fill={C.p60} />
        <Ico as={Plane} x={fx + 42} y={fy + 295} size={20} color={C.white} />
        <T x={fx + 84} y={fy + 300} size={18} weight={700} fill={C.p80}>
          Sends in order when you land
        </T>
        <T x={fx + 84} y={fy + 323} size={15} weight={520} fill={C.p50}>
          Images trimmed for slow wifi
        </T>
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-autocorrect · Tone check pre-send                       */
/* ------------------------------------------------------------------ */

export function MailFeatureAutocorrect({ className, style }) {
  const uid = useUid('mft')
  const x = 70
  const y = 74
  const w = 570
  return (
    <Stage label="Tone check highlighting a curt phrase in a draft and offering a warmer alternative" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-pill`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.skyDeep} />
          <stop offset="1" stopColor={C.p60} />
        </linearGradient>
      </defs>
      <Panel id={`${uid}-a`} x={28} y={26} w={392} h={300} from={C.teal} to={C.greenDeep} texture="stripes" />
      <Panel id={`${uid}-b`} x={300} y={300} w={392} h={300} from={C.skyLight} to={C.sky} texture="clouds" />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={420} r={24}>
        <T x={x + 30} y={y + 48} size={18} weight={560} fill={C.n40}>
          To
        </T>
        <T x={x + 66} y={y + 48} size={18} weight={650} fill={C.n80}>
          Leo Brandt
        </T>
        <rect x={x + w - 168} y={y + 24} width={140} height={34} rx={17} fill={`url(#${uid}-pill)`} />
        <Ico as={Sparkles} x={x + w - 154} y={y + 32} size={18} color={C.white} />
        <T x={x + w - 130} y={y + 47} size={15} weight={700} fill={C.white}>
          Tone check
        </T>
        <line x1={x} x2={x + w} y1={y + 74} y2={y + 74} stroke={C.n10} strokeWidth={2} />
        <T x={x + 30} y={y + 110} size={18} weight={560} fill={C.n40}>
          Subject
        </T>
        <T x={x + 104} y={y + 110} size={18} weight={650} fill={C.n80}>
          Launch timeline
        </T>
        <line x1={x} x2={x + w} y1={y + 134} y2={y + 134} stroke={C.n10} strokeWidth={2} />

        <T x={x + 30} y={y + 180} size={22} weight={520}>
          Hi Leo,
        </T>
        <rect x={x + 26} y={y + 196} width={242} height={36} rx={6} fill={C.butter} />
        <path
          d={`M${x + 30} ${y + 233} ${Array.from({ length: 39 }, (_, i) => `q 3 ${i % 2 ? 4 : -4} 6 0`).join(' ')}`}
          fill="none"
          stroke={C.orangeDeep}
          strokeWidth={2}
        />
        <T x={x + 30} y={y + 222} size={22} weight={520}>
          As I said twice already, the launch
        </T>
        <T x={x + 30} y={y + 260} size={22} weight={520}>
          date has not changed. Please plan
        </T>
        <T x={x + 30} y={y + 298} size={22} weight={520}>
          around Thursday.
        </T>
      </Card>

      <Card id={`${uid}-p`} x={262} y={404} w={404} h={186} r={20}>
        <circle cx={292} cy={438} r={14} fill="#fff1e6" />
        <T x={292} y={444} size={17} weight={800} fill={C.orangeDeep} anchor="middle">
          !
        </T>
        <T x={316} y={444} size={18} weight={720}>
          May read as impatient
        </T>
        <T x={280} y={474} size={15} weight={520} fill={C.n60}>
          “Twice already” can sound like a reprimand.
        </T>
        <rect x={280} y={490} width={368} height={40} rx={10} fill={C.p0} stroke={C.p20} />
        <T x={296} y={516} size={17} weight={600} fill={C.p80}>
          To recap, the launch date has not…
        </T>
        <rect x={280} y={542} width={96} height={34} rx={17} fill={`url(#${uid}-pill)`} />
        <T x={328} y={564} size={15} weight={700} fill={C.white} anchor="middle">
          Accept
        </T>
        <T x={396} y={564} size={15} weight={650} fill={C.n60}>
          Ignore
        </T>
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-presence · Hand off threads with context               */
/* ------------------------------------------------------------------ */

export function MailFeaturePresence({ className, style }) {
  const uid = useUid('mfp')
  const x = 80
  const y = 66
  const w = 560
  return (
    <Stage label="A reassigned thread carrying an AI handoff note with summary, open commitments and key contacts" className={className} style={style}>
      <Panel id={`${uid}-a`} x={36} y={24} w={648} h={250} from={C.p10} to={C.p30} texture="stripes" />
      <Panel id={`${uid}-b`} x={336} y={322} w={356} h={278} from={C.indigo} to={C.p60} />
      <Card id={`${uid}-c`} x={x} y={y} w={w} h={498} r={24}>
        <T x={x + 30} y={y + 50} size={24} weight={720}>
          Northwind renewal
        </T>
        <Chip x={x + w - 160} y={y + 28} w={130} h={32} fill={C.p0} stroke={C.p20} text="Reassigned" color={C.p60} size={15} />
        <Avatar cx={x + 44} cy={y + 82} r={13} fill={C.greenDeep} initials="JE" />
        <T x={x + 64} y={y + 88} size={16} weight={600} fill={C.n60}>
          Jordan Ellis
        </T>
        <Ico as={ArrowRight} x={x + 170} y={y + 74} size={18} color={C.n40} />
        <Avatar cx={x + 210} cy={y + 82} r={13} fill={C.orange} initials="SR" />
        <T x={x + 230} y={y + 88} size={16} weight={600} fill={C.n60}>
          Sam Rivera
        </T>
        <line x1={x} x2={x + w} y1={y + 112} y2={y + 112} stroke={C.n10} strokeWidth={2} />
        {[
          ['Ana Ruiz', 'Can we add three more seats?', 'Oct 2'],
          ['Jordan Ellis', 'Pricing attached, valid to the 30th', 'Oct 4'],
        ].map(([n, s, d], i) => {
          const ry = y + 112 + i * 50
          return (
            <g key={n} opacity={0.75}>
              <T x={x + 30} y={ry + 32} size={17} weight={680}>
                {n}
              </T>
              <T x={x + 150} y={ry + 32} size={16} weight={500} fill={C.n40}>
                {s}
              </T>
              <T x={x + w - 30} y={ry + 32} size={14} weight={560} fill={C.n40} anchor="end">
                {d}
              </T>
              <line x1={x + 30} x2={x + w - 30} y1={ry + 50} y2={ry + 50} stroke={C.n10} strokeWidth={1.5} />
            </g>
          )
        })}

        <rect x={x + 22} y={y + 226} width={w - 44} height={196} rx={16} fill={C.p0} stroke={C.p40} strokeWidth={2} />
        <Ico as={Sparkles} x={x + 42} y={y + 244} size={20} color={C.p60} />
        <T x={x + 70} y={y + 261} size={18} weight={720} fill={C.p80}>
          Handoff note
        </T>
        <T x={x + w - 42} y={y + 261} size={14} weight={600} fill={C.p50} anchor="end">
          Checked by Jordan
        </T>
        <T x={x + 42} y={y + 294} size={17} weight={520} fill={C.n80}>
          Renewal for 40 seats; price agreed, contract out.
        </T>
        <T x={x + 42} y={y + 328} size={13} weight={750} fill={C.n40} letterSpacing="0.08em">
          OPEN COMMITMENTS
        </T>
        {['Send the SSO setup guide by Friday', 'Confirm Q1 invoice dates with Ana'].map((t, i) => (
          <g key={t}>
            <rect x={x + 42} y={y + 342 + i * 34} width={18} height={18} rx={5} fill={C.white} stroke={C.p40} strokeWidth={2} />
            <T x={x + 72} y={y + 357 + i * 34} size={16} weight={560} fill={C.n80}>
              {t}
            </T>
          </g>
        ))}

        <T x={x + 30} y={y + 458} size={13} weight={750} fill={C.n40} letterSpacing="0.08em">
          KEY CONTACTS
        </T>
        {[
          ['AR', C.p40, 'Ana, CFO'],
          ['DK', C.green, 'Dev, IT lead'],
          ['MO', C.orange, 'Mei, buyer'],
        ].map(([ini, col, label], i) => (
          <g key={ini}>
            <Avatar cx={x + 162 + i * 128} cy={y + 453} r={14} fill={col} initials={ini} />
            <T x={x + 182 + i * 128} y={y + 459} size={15} weight={600} fill={C.n80}>
              {label}
            </T>
          </g>
        ))}
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-calendar · Capture receipts (into the expense sheet)   */
/* ------------------------------------------------------------------ */

export function MailFeatureCalendar({ className, style }) {
  const uid = useUid('mfx')
  const sx = 262
  const sy = 204
  const sw = 424
  const rows = [
    ['Ridgeway Air', 'Oct 12', '$412.60'],
    ['Cafe Lumen', 'Oct 15', '$38.20'],
    ['Ledgerly', 'Oct 19', '$248.00', true],
  ]
  return (
    <Stage label="A receipt email whose vendor, date and amount are added as a new row in an expense sheet" className={className} style={style}>
      <Panel id={`${uid}-a`} x={28} y={26} w={410} h={300} from={C.skyLight} to={C.rose} texture="clouds" />
      <Panel id={`${uid}-b`} x={300} y={300} w={392} h={300} from={C.p30} to={C.p60} texture="waves" />

      <Card id={`${uid}-e`} x={48} y={76} w={316} h={300} r={22}>
        <rect x={72} y={100} width={40} height={40} rx={11} fill={C.g0} />
        <Ico as={Receipt} x={82} y={110} size={20} color={C.greenDeep} />
        <T x={124} y={116} size={17} weight={700}>
          Ledgerly Billing
        </T>
        <T x={124} y={138} size={14} weight={520} fill={C.n40}>
          Your October receipt
        </T>
        <line x1={72} x2={340} y1={160} y2={160} stroke={C.n10} strokeWidth={1.5} />
        <T x={72} y={192} size={15} weight={560} fill={C.n60}>
          Receipt #20418
        </T>
        <T x={72} y={218} size={15} weight={560} fill={C.n60}>
          Paid Oct 19
        </T>
        <rect x={68} y={238} width={190} height={50} rx={10} fill="none" stroke={C.p50} strokeWidth={2} strokeDasharray="6 5" />
        <T x={80} y={258} size={13} weight={700} fill={C.p50} letterSpacing="0.06em">
          TOTAL
        </T>
        <T x={80} y={281} size={20} weight={760}>
          $248.00
        </T>
        <Chip x={72} y={312} w={124} h={32} fill={C.g0} text="Captured" color={C.greenDeep} size={15} />
      </Card>

      <Card id={`${uid}-s`} x={sx} y={sy} w={sw} h={344} r={22}>
        <Ico as={Table2} x={sx + 26} y={sy + 26} size={22} color={C.p60} />
        <T x={sx + 58} y={sy + 44} size={20} weight={720}>
          Expenses · October
        </T>
        <rect x={sx} y={sy + 70} width={sw} height={40} fill={C.n5} />
        {['Vendor', 'Date', 'Amount'].map((h, i) => (
          <T key={h} x={i === 2 ? sx + sw - 26 : sx + 26 + i * 182} y={sy + 96} size={14} weight={700} fill={C.n40} anchor={i === 2 ? 'end' : undefined}>
            {h}
          </T>
        ))}
        {rows.map(([v, d, a, isNew], i) => {
          const ry = sy + 110 + i * 54
          return (
            <g key={v}>
              {isNew && <rect x={sx + 8} y={ry + 4} width={sw - 16} height={46} rx={10} fill={C.p0} stroke={C.p20} />}
              <T x={sx + 26} y={ry + 33} size={17} weight={isNew ? 700 : 560} fill={isNew ? C.p80 : C.n80}>
                {v}
              </T>
              {isNew && <Ico as={Sparkles} x={sx + 112} y={ry + 18} size={16} color={C.p50} />}
              <T x={sx + 208} y={ry + 33} size={16} weight={520} fill={C.n60}>
                {d}
              </T>
              <T x={sx + sw - 26} y={ry + 33} size={17} weight={650} fill={isNew ? C.p80 : C.n80} anchor="end">
                {a}
              </T>
              {!isNew && <line x1={sx + 26} x2={sx + sw - 26} y1={ry + 54} y2={ry + 54} stroke={C.n10} strokeWidth={1.5} />}
            </g>
          )
        })}
        <rect x={sx + 26} y={sy + 288} width={138} height={32} rx={16} fill="#fff1e6" />
        <circle cx={sx + 44} cy={sy + 304} r={5} fill={C.orange} />
        <T x={sx + 56} y={sy + 309} size={14} weight={700} fill={C.orangeDeep}>
          1 to review
        </T>
        <T x={sx + sw - 26} y={sy + 309} size={15} weight={650} fill={C.n60} anchor="end">
          Total $698.80
        </T>
      </Card>
    </Stage>
  )
}

/* ------------------------------------------------------------------ */
/* mail-feature-event · Tame newsletters into one weekly read          */
/* ------------------------------------------------------------------ */

const DIGEST = [
  ['F', C.greenDeep, 'Field Notes', 'Why small teams ship faster'],
  ['M', C.skyDeep, 'Market Morning', 'Rates hold steady into winter'],
  ['D', C.p60, 'Design Weekly', 'Five type pairings we keep using', 'fav'],
  ['P', C.orangeDeep, 'Promo Digest', '48% off everything this weekend', 'unsub'],
]

export function MailFeatureEvent({ className, style }) {
  const uid = useUid('mfn')
  const x = 178
  const y = 186
  const w = 506
  return (
    <Stage label="Newsletters gathered into one weekly digest with opening lines, favourites and one-click unsubscribe" className={className} style={style}>
      <Panel id={`${uid}-a`} x={36} y={24} w={648} h={260} from={C.p40} to={C.p80} />
      <Panel id={`${uid}-b`} x={36} y={378} w={460} h={224} from={C.skyLight} to={C.sky} texture="clouds" />

      <Card id={`${uid}-e`} x={64} y={58} w={430} h={220} r={22}>
        <T x={88} y={96} size={14} weight={700} fill={C.n40} letterSpacing="0.06em">
          FIELD NOTES · ISSUE 112
        </T>
        <T x={88} y={126} size={19} weight={700}>
          Why small teams ship faster
        </T>
        <Line x={88} y={144} w={360} h={9} fill={C.n10} />
        <Line x={88} y={162} w={300} h={9} fill={C.n10} />
        <T x={88} y={204} size={15} weight={650} fill={C.p60} style={{ textDecoration: 'underline' }}>
          Unsubscribe
        </T>
        <Pointer x={124} y={200} s={0.95} />
      </Card>

      <Card id={`${uid}-d`} x={x} y={y} w={w} h={400} r={24}>
        <Ico as={Newspaper} x={x + 28} y={y + 30} size={24} color={C.p60} />
        <T x={x + 62} y={y + 50} size={22} weight={720}>
          Weekly digest
        </T>
        <Chip x={x + 222} y={y + 30} w={100} h={28} fill={C.p0} text="12 issues" color={C.p60} size={14} />
        <T x={x + w - 28} y={y + 50} size={14} weight={560} fill={C.n40} anchor="end">
          Sun · 8:00 AM
        </T>
        <line x1={x} x2={x + w} y1={y + 76} y2={y + 76} stroke={C.n10} strokeWidth={2} />
        {DIGEST.map(([l, col, name, line, flag], i) => {
          const ry = y + 76 + i * 72
          return (
            <g key={name}>
              <rect x={x + 26} y={ry + 16} width={40} height={40} rx={10} fill={col} />
              <T x={x + 46} y={ry + 43} size={20} weight={800} fill={C.white} anchor="middle">
                {l}
              </T>
              <T x={x + 82} y={ry + 32} size={17} weight={700}>
                {name}
              </T>
              <T x={x + 82} y={ry + 55} size={15} weight={500} fill={C.n60}>
                {line}
              </T>
              {flag === 'fav' && <Ico as={StarIcon} x={x + w - 50} y={ry + 24} size={22} color={C.orange} />}
              {flag === 'unsub' && <Chip x={x + w - 128} y={ry + 21} w={104} h={30} fill={C.white} stroke={C.n20} text="Unsubscribe" color={C.n80} size={13} />}
              {i < 3 && <line x1={x + 82} x2={x + w - 26} y1={ry + 72} y2={ry + 72} stroke={C.n10} strokeWidth={1.5} />}
            </g>
          )
        })}
        <T x={x + 28} y={y + 380} size={15} weight={680} fill={C.p60}>
          Read all 12 issues →
        </T>
      </Card>
    </Stage>
  )
}
