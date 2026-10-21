// /docs page art: hero chip backdrop, pastel video backdrop, the four
// "surface" cards (720x480 on #f2f0ea), AI / hub / suite icon tiles and the
// quote wordmark. Static inline SVG; all names and companies are invented.
import { ArrowUp, ChevronDown, ChevronRight, Link2, MessageSquare, Sparkles } from 'lucide-react'
import { Art, Avatar, Chip, Ico, Line, T } from './primitives'
import { Card, IconTile, SoftShadow } from './mailDocs-kit'
import { C, useUid } from './tokens'

const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif"

/* ------------------------------------------------------------------ */
/* docs-hero-bg (2560x639, #f2f0eb): floating chips beside the copy    */
/* Centre (x 740-1820) stays empty; at 1440 only x 405-2155 is visible, */
/* at 390 only the empty centre shows.                                   */
/* ------------------------------------------------------------------ */

const STATUS = {
  grey: [C.white, C.n20, C.n60, C.n40],
  blue: [C.skyLight, C.sky, C.skyDeep, C.skyDeep],
  green: [C.g0, 'rgba(20,128,114,0.3)', C.greenDeep, C.green],
  purple: [C.p0, C.p20, C.p60, C.p50],
}

function StatusPill({ x, y, kind, text, sid }) {
  const [fill, stroke, ink, dot] = STATUS[kind]
  const w = text.length * 11 + 58
  return (
    <g filter={`url(#${sid})`}>
      <rect x={x} y={y} width={w} height={46} rx={23} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <circle cx={x + 24} cy={y + 23} r={6} fill={dot} />
      <T x={x + 40} y={y + 30} size={19} weight={650} fill={ink}>
        {text}
      </T>
    </g>
  )
}

function PersonTag({ x, y, name, role, col, ini, sid }) {
  const w = (name.length + role.length) * 10.4 + 92
  return (
    <g filter={`url(#${sid})`}>
      <rect x={x} y={y} width={w} height={50} rx={25} fill={C.white} stroke={col} strokeWidth={2} />
      <Avatar cx={x + 26} cy={y + 25} r={16} fill={col} initials={ini} />
      <T x={x + 52} y={y + 32} size={19} weight={700}>
        {name}
      </T>
      <T x={x + 60 + name.length * 10.6} y={y + 32} size={18} weight={520} fill={C.n40}>
        {role}
      </T>
    </g>
  )
}

function Segment({ x, y, a, b, sid }) {
  const wa = a.length * 11 + 34
  const wb = b.length * 11 + 34
  return (
    <g filter={`url(#${sid})`}>
      <rect x={x} y={y} width={wa + wb + 10} height={50} rx={25} fill={C.n20} />
      <rect x={x + 5} y={y + 5} width={wa} height={40} rx={20} fill={C.white} />
      <T x={x + 5 + wa / 2} y={y + 31} size={18} weight={700} anchor="middle">
        {a}
      </T>
      <T x={x + 5 + wa + wb / 2} y={y + 31} size={18} weight={600} fill={C.n60} anchor="middle">
        {b}
      </T>
    </g>
  )
}

function Tag({ x, y, text, col, sid }) {
  const w = text.length * 10.6 + 52
  return (
    <g filter={`url(#${sid})`}>
      <rect x={x} y={y} width={w} height={42} rx={10} fill={C.white} stroke={col} strokeWidth={2} />
      <rect x={x + 14} y={y + 14} width={14} height={14} rx={4} fill={col} />
      <T x={x + 38} y={y + 28} size={18} weight={640} fill={C.n80}>
        {text}
      </T>
    </g>
  )
}

export function DocsHeroBg({ className, style }) {
  const uid = useUid('dhb')
  const sid = `${uid}-s`
  return (
    <Art w={2560} h={639} bg={C.n10} label="Floating status pills, owner tags and view toggles around the headline" className={className} style={style}>
      <defs>
        <SoftShadow id={sid} dy={6} blur={8} opacity={0.08} />
      </defs>
      {/* far left (wide screens only) */}
      <Tag x={60} y={120} text="Retro notes" col={C.green} sid={sid} />
      <StatusPill x={150} y={330} kind="purple" text="Drafting" sid={sid} />
      <Tag x={40} y={520} text="Hiring plan" col={C.roseDeep} sid={sid} />

      {/* left of the copy (visible canvas at 1440 is x 405-2155) */}
      <StatusPill x={450} y={64} kind="grey" text="Draft" sid={sid} />
      <PersonTag x={430} y={176} name="Mara" role="owner" col={C.sky} ini="ML" sid={sid} />
      <Segment x={500} y={300} a="Page" b="Table" sid={sid} />
      <StatusPill x={440} y={424} kind="blue" text="Deciding" sid={sid} />
      <Tag x={540} y={544} text="Q3 roadmap" col={C.orange} sid={sid} />

      {/* right of the copy */}
      <StatusPill x={1880} y={64} kind="green" text="Approved" sid={sid} />
      <PersonTag x={1900} y={170} name="Ravi" role="reviewer" col={C.roseDeep} ini="RK" sid={sid} />
      <Segment x={1860} y={290} a="Doc" b="Board" sid={sid} />
      <PersonTag x={1920} y={408} name="Leah" role="design" col={C.orange} ini="LS" sid={sid} />
      <StatusPill x={1850} y={540} kind="green" text="Done" sid={sid} />
      <Tag x={2000} y={544} text="Budget" col={C.green} sid={sid} />

      {/* far right (wide screens only) */}
      <Tag x={2330} y={110} text="Launch" col={C.sky} sid={sid} />
      <StatusPill x={2250} y={300} kind="blue" text="In review" sid={sid} />
      <StatusPill x={2380} y={480} kind="grey" text="Idea" sid={sid} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* docs-video-bg (1440x616 cover): pastel blurred gradient              */
/* ------------------------------------------------------------------ */

export function DocsVideoBg({ className, style }) {
  const uid = useUid('dvb')
  const blobs = [
    [420, 600, 420, C.rose, 0.9],
    [760, 640, 460, C.p10, 0.95],
    [1060, 580, 380, C.rose, 0.8],
    [600, 470, 300, C.orange, 0.16],
    [930, 430, 280, C.p20, 0.45],
    [250, 420, 260, C.p10, 0.6],
    [1250, 470, 300, C.roseDeep, 0.22],
  ]
  return (
    <Art w={1440} h={616} bg={C.n10} label="" className={className} style={style}>
      <defs>
        {blobs.map(([, , , col, o], i) => (
          <radialGradient key={i} id={`${uid}-b${i}`}>
            <stop offset="0" stopColor={col} stopOpacity={o} />
            <stop offset="0.55" stopColor={col} stopOpacity={o * 0.45} />
            <stop offset="1" stopColor={col} stopOpacity="0" />
          </radialGradient>
        ))}
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.n10} stopOpacity="1" />
          <stop offset="0.35" stopColor={C.n10} stopOpacity="0.85" />
          <stop offset="0.7" stopColor={C.n10} stopOpacity="0" />
        </linearGradient>
      </defs>
      {blobs.map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={r * 1.25} ry={r} fill={`url(#${uid}-b${i})`} />
      ))}
      <rect width={1440} height={616} fill={`url(#${uid}-top)`} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* docs-surface-docs · Briefs that update                              */
/* ------------------------------------------------------------------ */

export function DocsSurfaceDocs({ className, style }) {
  const uid = useUid('dsd')
  const x = 50
  const y = 40
  const w = 600
  return (
    <Art w={720} h={480} bg={C.n10} label="A brief whose metrics and task counts update live, with a teammate's comment" className={className} style={style}>
      <Card id={`${uid}-p`} x={x} y={y} w={w} h={480} r={18}>
        <T x={x + 30} y={y + 38} size={15} weight={560} fill={C.n40}>
          Product  /  Checkout  /  Brief
        </T>
        <Avatar cx={x + w - 150} cy={y + 32} r={13} fill={C.p40} initials="ML" ring={C.white} />
        <Avatar cx={x + w - 128} cy={y + 32} r={13} fill={C.green} initials="TR" ring={C.white} />
        <Chip x={x + w - 104} y={y + 18} w={76} h={30} fill={C.p60} text="Share" color={C.white} size={14} />
        <T x={x + 30} y={y + 92} size={30} weight={760}>
          Checkout redesign brief
        </T>
        <circle cx={x + 36} cy={y + 117} r={5} fill={C.green} />
        <T x={x + 48} y={y + 122} size={14} weight={560} fill={C.n60}>
          Live data · refreshed 2 min ago
        </T>

        {/* live stat tiles */}
        <rect x={x + 30} y={y + 140} width={250} height={84} rx={14} fill={C.n5} stroke={C.n10} />
        <T x={x + 48} y={y + 168} size={12} weight={750} fill={C.n40} letterSpacing="0.08em">
          CONVERSION
        </T>
        <T x={x + 48} y={y + 206} size={28} weight={760}>
          3.8%
        </T>
        <T x={x + 120} y={y + 205} size={15} weight={700} fill={C.greenDeep}>
          ▲ 0.4 pts
        </T>
        <rect x={x + 296} y={y + 140} width={270} height={84} rx={14} fill={C.n5} stroke={C.n10} />
        <T x={x + 314} y={y + 168} size={12} weight={750} fill={C.n40} letterSpacing="0.08em">
          BUILD TASKS
        </T>
        <T x={x + 314} y={y + 200} size={20} weight={720}>
          6 of 9 done
        </T>
        <rect x={x + 314} y={y + 208} width={232} height={6} rx={3} fill={C.n20} />
        <rect x={x + 314} y={y + 208} width={155} height={6} rx={3} fill={C.p60} />

        <T x={x + 30} y={y + 272} size={19} weight={720}>
          Overview
        </T>
        <T x={x + 30} y={y + 304} size={17} weight={500} fill={C.n80}>
          We are cutting checkout to two steps so that
        </T>
        <T x={x + 30} y={y + 332} size={17} weight={500} fill={C.n80}>
          returning buyers finish faster.
        </T>
        <rect x={x + 26} y={y + 343} width={242} height={28} rx={5} fill={C.butter} />
        <T x={x + 30} y={y + 362} size={17} weight={600} fill={C.n90}>
          Launch stays on November 12.
        </T>
        <rect x={x + 278} y={y + 345} width={42} height={24} rx={12} fill={C.p10} />
        <Ico as={MessageSquare} x={x + 285} y={y + 350} size={14} color={C.p60} />
        <T x={x + 304} y={y + 362} size={13} weight={700} fill={C.p60}>
          2
        </T>
        <Line x={x + 30} y={y + 384} w={380} h={10} fill={C.n10} />
        <Line x={x + 30} y={y + 404} w={300} h={10} fill={C.n10} />
      </Card>

      <Card id={`${uid}-c`} x={438} y={292} w={262} h={136} r={16}>
        <Avatar cx={464} cy={322} r={14} fill={C.p40} initials="ML" />
        <T x={486} y={327} size={15} weight={700}>
          Mara Lind
        </T>
        <T x={680} y={327} size={12} weight={560} fill={C.n40} anchor="end">
          now
        </T>
        <T x={456} y={362} size={15} weight={520} fill={C.n80}>
          Numbers refresh on their own,
        </T>
        <T x={456} y={384} size={15} weight={520} fill={C.n80}>
          so nobody pastes them in again.
        </T>
        <T x={456} y={412} size={13} weight={680} fill={C.p60}>
          Reply
        </T>
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* docs-surface-projects · Sprint launch board                         */
/* ------------------------------------------------------------------ */

const BOARD = [
  ['To do', C.n40, ['Pricing page', 'Press kit', 'Beta invites']],
  ['In progress', C.sky, ['Email drip', 'Docs update']],
  ['Review', C.orange, ['Launch post', 'QA pass']],
  ['Done', C.green, ['Changelog', 'Demo video', 'Logo swap']],
]
const TAGS = [
  [C.p10, C.p60, 'Web'],
  [C.g0, C.greenDeep, 'Ops'],
  ['#fff1e6', C.orangeDeep, 'PR'],
]
const AVS = [C.p40, C.green, C.orange, C.p60, C.skyDeep]

export function DocsSurfaceProjects({ className, style }) {
  const uid = useUid('dsp')
  const x = 30
  const y = 68
  const w = 650
  const colW = 142
  return (
    <Art w={720} h={480} bg={C.n10} label="A sprint board with four status columns and an AI prompt adding a column" className={className} style={style}>
      <Card id={`${uid}-b`} x={x} y={y} w={w} h={440} r={18}>
        <T x={x + 26} y={y + 40} size={21} weight={760}>
          Sprint 14 · Launch
        </T>
        <rect x={x + 26} y={y + 56} width={190} height={34} rx={17} fill={C.n10} />
        <rect x={x + 29} y={y + 59} width={88} height={28} rx={14} fill={C.white} />
        <T x={x + 73} y={y + 78} size={14} weight={700} anchor="middle">
          Board
        </T>
        <T x={x + 165} y={y + 78} size={14} weight={600} fill={C.n60} anchor="middle">
          Timeline
        </T>
        {BOARD.map(([name, col, cards], ci) => {
          const cx = x + 22 + ci * (colW + 12)
          return (
            <g key={name}>
              <rect x={cx} y={y + 106} width={colW} height={330} rx={12} fill={C.n5} />
              <circle cx={cx + 16} cy={y + 128} r={5} fill={col} />
              <T x={cx + 28} y={y + 134} size={15} weight={720}>
                {name}
              </T>
              <T x={cx + colW - 12} y={y + 134} size={14} weight={600} fill={C.n40} anchor="end">
                {cards.length}
              </T>
              {cards.map((t, i) => {
                const ky = y + 148 + i * 82
                const [tf, ti, tl] = TAGS[(ci + i) % 3]
                return (
                  <g key={t}>
                    <rect x={cx + 8} y={ky} width={colW - 16} height={72} rx={10} fill={C.white} stroke={C.n20} />
                    <T x={cx + 20} y={ky + 28} size={16} weight={680}>
                      {t}
                    </T>
                    <rect x={cx + 20} y={ky + 40} width={40} height={20} rx={6} fill={tf} />
                    <T x={cx + 40} y={ky + 55} size={12} weight={700} fill={ti} anchor="middle">
                      {tl}
                    </T>
                    <circle cx={cx + colW - 30} cy={ky + 50} r={10} fill={AVS[(ci * 2 + i) % 5]} />
                  </g>
                )
              })}
            </g>
          )
        })}
      </Card>

      <Card id={`${uid}-ai`} x={426} y={20} w={276} h={110} r={16} stroke={C.p40}>
        <Ico as={Sparkles} x={444} y={38} size={20} color={C.p60} />
        <T x={472} y={54} size={15} weight={560} fill={C.n80}>
          Add a QA column and move
        </T>
        <T x={472} y={76} size={15} weight={560} fill={C.n80}>
          flagged cards into it
        </T>
        <circle cx={672} cy={104} r={16} fill={C.p60} />
        <Ico as={ArrowUp} x={663} y={95} size={18} color={C.white} stroke={2.6} />
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* docs-surface-hub · Answers desk                                     */
/* ------------------------------------------------------------------ */

export function DocsSurfaceHub({ className, style }) {
  const uid = useUid('dsh')
  const x = 28
  const y = 56
  const w = 610
  const sb = 168
  const mx = x + sb + 26
  const tree = [
    ['Policies', 0, 'open'],
    ['Leave', 1, 'on'],
    ['Expenses', 1],
    ['Security', 1],
    ['How-tos', 0, 'closed'],
    ['Laptop setup', 1],
    ['Book travel', 1],
  ]
  return (
    <Art w={720} h={480} bg={C.n10} label="A policy page answering a plain-language question with a link to the exact paragraph" className={className} style={style}>
      <Card id={`${uid}-p`} x={x} y={y} w={w} h={450} r={18}>
        <rect x={x} y={y} width={sb} height={450} fill={C.n5} />
        <line x1={x + sb} x2={x + sb} y1={y} y2={y + 450} stroke={C.n10} strokeWidth={1.5} />
        <T x={x + 20} y={y + 38} size={16} weight={760}>
          Answers desk
        </T>
        {tree.map(([t, lvl, st], i) => {
          const ty = y + 64 + i * 38
          return (
            <g key={t}>
              {st === 'on' && <rect x={x + 10} y={ty} width={sb - 20} height={32} rx={8} fill={C.p10} />}
              {st === 'open' && <Ico as={ChevronDown} x={x + 16} y={ty + 8} size={16} color={C.n60} />}
              {st === 'closed' && <Ico as={ChevronRight} x={x + 16} y={ty + 8} size={16} color={C.n60} />}
              <T x={x + 38 + lvl * 14} y={ty + 21} size={15} weight={st === 'on' || lvl === 0 ? 680 : 520} fill={st === 'on' ? C.p60 : C.n80}>
                {t}
              </T>
            </g>
          )
        })}

        <T x={mx} y={y + 54} size={26} weight={760}>
          Leave policy
        </T>
        <T x={mx} y={y + 90} size={12} weight={750} fill={C.n40} letterSpacing="0.08em">
          OWNERS
        </T>
        {[C.p40, C.green, C.orange, C.skyDeep].map((c, i) => (
          <Avatar key={c} cx={mx + 14 + i * 24} cy={y + 114} r={13} fill={c} initials={['AK', 'JO', 'MS', 'RT'][i]} ring={C.white} />
        ))}
        <T x={mx} y={y + 176} size={17} weight={720}>
          3.1 Requesting time off
        </T>
        <Line x={mx} y={y + 190} w={330} h={10} fill={C.n10} />
        <Line x={mx} y={y + 208} w={280} h={10} fill={C.n10} />
        <T x={mx} y={y + 254} size={17} weight={720}>
          3.2 Carry-over
        </T>
        <rect x={mx - 6} y={y + 268} width={392} height={64} rx={8} fill={C.butter} />
        <T x={mx} y={y + 292} size={16} weight={540} fill={C.n90}>
          Up to five unused days roll into the next
        </T>
        <T x={mx} y={y + 320} size={16} weight={540} fill={C.n90}>
          year and expire on March 31.
        </T>
        <T x={mx} y={y + 370} size={12} weight={750} fill={C.n40} letterSpacing="0.08em">
          QUICK LINKS
        </T>
        <Chip x={mx} y={y + 384} w={146} h={32} fill={C.white} stroke={C.n20} text="Request leave" color={C.n80} size={14} />
        <Chip x={mx + 156} y={y + 384} w={166} h={32} fill={C.white} stroke={C.n20} text="Holiday calendar" color={C.n80} size={14} />
      </Card>

      <Card id={`${uid}-q`} x={398} y={24} w={302} h={196} r={16}>
        <rect x={430} y={42} width={252} height={58} rx={14} fill={C.n10} />
        <T x={446} y={66} size={15} weight={560} fill={C.n90}>
          How many vacation days
        </T>
        <T x={446} y={88} size={15} weight={560} fill={C.n90}>
          carry over to next year?
        </T>
        <Ico as={Sparkles} x={416} y={116} size={18} color={C.p60} />
        <T x={442} y={131} size={15} weight={650} fill={C.n90}>
          Up to 5 days, used by March 31.
        </T>
        <rect x={416} y={150} width={178} height={32} rx={16} fill={C.p0} stroke={C.p20} />
        <Ico as={Link2} x={428} y={158} size={16} color={C.p60} />
        <T x={450} y={171} size={14} weight={700} fill={C.p60}>
          Leave policy § 3.2
        </T>
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* docs-surface-workflows · Requests (form -> queue)                    */
/* ------------------------------------------------------------------ */

const PRIORITY = {
  High: ['#fff1e6', C.orangeDeep],
  Med: [C.skyLight, C.skyDeep],
  Low: [C.n10, C.n60],
}
const REQUESTS = [
  ['Spring banners', C.p40, 'Nov 18', 'High'],
  ['Pitch deck refresh', C.green, 'Nov 20', 'Med'],
  ['Event signage', C.orange, 'Nov 22', 'Low'],
  ['Icon set update', C.skyDeep, 'Nov 25', 'Med'],
  ['Case study layout', C.p60, 'Nov 27', 'High'],
]

function Field({ x, y, w, label, value, select }) {
  return (
    <g>
      <T x={x} y={y} size={12} weight={700} fill={C.n40}>
        {label}
      </T>
      <rect x={x} y={y + 8} width={w} height={34} rx={8} fill={C.white} stroke={C.n20} strokeWidth={1.5} />
      <T x={x + 12} y={y + 30} size={14} weight={560} fill={C.n90}>
        {value}
      </T>
      {select && <Ico as={ChevronDown} x={x + w - 26} y={y + 17} size={16} color={C.n40} />}
    </g>
  )
}

export function DocsSurfaceWorkflows({ className, style }) {
  const uid = useUid('dsw')
  const x = 28
  const y = 50
  const w = 520
  const fx = 432
  const fy = 104
  const fw = 264
  return (
    <Art w={720} h={480} bg={C.n10} label="A request form feeding a queue with owners, due dates and priorities" className={className} style={style}>
      <Card id={`${uid}-t`} x={x} y={y} w={w} h={420} r={18}>
        <T x={x + 24} y={y + 42} size={21} weight={760}>
          Design requests
        </T>
        <Chip x={x + 214} y={y + 22} w={80} h={28} fill={C.p0} text="12 open" color={C.p60} size={13} />
        <rect x={x} y={y + 66} width={w} height={38} fill={C.n5} />
        {[
          ['Request', 24],
          ['Owner', 206],
          ['Due', 268],
          ['Priority', 336],
        ].map(([h, hx]) => (
          <T key={h} x={x + hx} y={y + 90} size={13} weight={700} fill={C.n40}>
            {h}
          </T>
        ))}
        {REQUESTS.map(([t, col, due, pr], i) => {
          const ry = y + 104 + i * 56
          const [pf, pi] = PRIORITY[pr]
          return (
            <g key={t}>
              <T x={x + 24} y={ry + 35} size={15} weight={620}>
                {t}
              </T>
              <circle cx={x + 222} cy={ry + 30} r={12} fill={col} />
              <T x={x + 268} y={ry + 35} size={14} weight={520} fill={C.n60}>
                {due}
              </T>
              <rect x={x + 336} y={ry + 17} width={58} height={26} rx={8} fill={pf} />
              <T x={x + 365} y={ry + 35} size={13} weight={700} fill={pi} anchor="middle">
                {pr}
              </T>
              <line x1={x + 24} x2={x + w - 24} y1={ry + 56} y2={ry + 56} stroke={C.n10} strokeWidth={1.5} />
            </g>
          )
        })}
      </Card>

      <Card id={`${uid}-f`} x={fx} y={fy} w={fw} h={350} r={18}>
        <T x={fx + 22} y={fy + 38} size={18} weight={760}>
          New request
        </T>
        <Field x={fx + 22} y={fy + 66} w={fw - 44} label="Title" value="Spring banners" />
        <Field x={fx + 22} y={fy + 126} w={fw - 44} label="Team" value="Growth" select />
        <Field x={fx + 22} y={fy + 186} w={(fw - 54) / 2} label="Due" value="Nov 18" />
        <Field x={fx + 32 + (fw - 54) / 2} y={fy + 186} w={(fw - 54) / 2} label="Budget" value="$1,200" />
        <rect x={fx + 22} y={fy + 252} width={fw - 44} height={40} rx={10} fill={C.p60} />
        <T x={fx + fw / 2} y={fy + 277} size={15} weight={700} fill={C.white} anchor="middle">
          Submit request
        </T>
        <T x={fx + fw / 2} y={fy + 320} size={12} weight={560} fill={C.n40} anchor="middle">
          Owner reminded 2 days before due
        </T>
      </Card>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* Icon tiles                                                          */
/* ------------------------------------------------------------------ */

const G = {
  doc: <path d="M6.5 3h7.5l4 4v14h-11.5z M14 3v4h4 M9.5 11.5h5 M9.5 14.5h5 M9.5 17.5h3" />,
  table: <path d="M4.5 4h15a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-13a1.5 1.5 0 0 1 1.5-1.5z M3 9.5h18 M3 14.75h18 M9.5 4v16" />,
  blocks: <path d="M4 4h6.5v6.5h-6.5z M13.5 4h6.5v6.5h-6.5z M4 13.5h6.5v6.5h-6.5z M16.75 13.5v6.5 M13.5 16.75h6.5" />,
  pencil: <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z M13.5 7l3 3 M4 20h6" />,
  megaphone: <path d="M3.5 10v4h3l7.5 4.5v-13L6.5 10z M17 9.2a4 4 0 0 1 0 5.6 M19.5 6.8a7.5 7.5 0 0 1 0 10.4 M7 14l1 5.5h2.5l-1-4.5" />,
  coins: (
    <path d="M5 6.5a7 2.5 0 1 0 14 0a7 2.5 0 1 0-14 0 M5 6.5v4.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6.5 M5 11v4.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V11" />
  ),
  people: <path d="M9 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7z M2.5 20.5a6.5 6.5 0 0 1 13 0 M16 4.3a3.3 3.3 0 0 1 0 6.4 M17.5 14.2a6 6 0 0 1 4 6.3" />,
  sparkle: <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />,
  bot: <path d="M6 8.5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z M12 8.5V5 M12 3.5v.01 M9 13.5v1.5 M15 13.5v1.5 M2 13v3 M22 13v3" />,
  mail: <path d="M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z M3.5 7l8.5 6 8.5-6" />,
}

function tile(glyph, label, { size = 74, tileSize = 74, from, to, ink, shadow = false }) {
  function DocsIcon({ className, style }) {
    const uid = useUid('dti')
    return <IconTile id={uid} size={size} tile={tileSize} from={from} to={to} glyphColor={ink} shadow={shadow} glyph={glyph} className={className} style={style} label={label} />
  }
  return DocsIcon
}

// docs-ai-icon-1..3: pale pink-lilac tiles on mulberry, mulberry glyphs
const AI = { from: C.p10, to: C.rose, ink: C.mBlack }
export const DocsAiIcon1 = tile(G.doc, 'Outline document', AI)
export const DocsAiIcon2 = tile(G.table, 'Formula table', AI)
export const DocsAiIcon3 = tile(G.blocks, 'Mini-app blocks', AI)

// docs-hub-icon-1..4: pale pink tiles on deep purple, purple glyphs
const HUB = { from: C.rose, to: C.p10, ink: C.p100 }
export const DocsHubIcon1 = tile(G.pencil, 'Design', HUB)
export const DocsHubIcon2 = tile(G.megaphone, 'Growth', HUB)
export const DocsHubIcon3 = tile(G.coins, 'Revenue', HUB)
export const DocsHubIcon4 = tile(G.people, 'People', HUB)

// docs-suite-icon-*: rose tiles with a soft shadow on white
const SUITE = { from: C.white, to: C.rose, ink: C.m100, shadow: true, tileSize: 66 }
export const DocsSuiteAssistant = tile(G.sparkle, 'Assistant', SUITE)
export const DocsSuiteAgents = tile(G.bot, 'Agents', SUITE)
export const DocsSuitePages = tile(G.doc, 'Pages', SUITE)
export const DocsSuiteInbox = tile(G.mail, 'Inbox', { ...SUITE, size: 85, tileSize: 74 })

/* ------------------------------------------------------------------ */
/* docs-quote-logo (226x51): invented serif wordmark "Harborly"        */
/* ------------------------------------------------------------------ */

export function DocsQuoteLogo({ color = C.n90, opacity = 1, className, style }) {
  return (
    <svg viewBox="0 0 226 51" className={`ns-art ${className ?? ''}`} style={{ color, ...style }} role="img" aria-label="Harborly" xmlns="http://www.w3.org/2000/svg">
      <g opacity={opacity}>
        <path d="M24 20 q5 -5 10 0 t10 0 M22 28 q5 -5 10 0 t10 0 t10 0 M28 36 q5 -5 10 0" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
        <text x={64} y={36} fontFamily={SERIF} fontSize={31} fontWeight={600} letterSpacing="-0.5" fill="currentColor" textLength={136} lengthAdjust="spacingAndGlyphs">
          Harborly
        </text>
      </g>
    </svg>
  )
}
