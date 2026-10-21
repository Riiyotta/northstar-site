// Section 7 bento media: media-inbox-drafts, media-inbox-availability,
// media-inbox-split.
import { CalendarDays, Clock, Paperclip, Reply, Send, Sparkles } from 'lucide-react'
import { Art, Avatar, Chip, Glow, Ico, Kbd, Line, T, Window } from './primitives'
import { C, useUid } from './tokens'

/* ------------------------------------------------------------------ */
/* media-inbox-drafts · reply drafted in your voice (1080:721, #714cb6)*/
/* ------------------------------------------------------------------ */

export function InboxDrafts({ className, style }) {
  const uid = useUid('id')
  const x = 110
  const w = 860
  return (
    <Art w={1080} h={721} bg={C.p60} label="An email reply that has already been drafted, ready to send" className={className} style={style}>
      <Glow id={`${uid}-g1`} cx={980} cy={60} r={460} color={C.p30} opacity={0.55} />
      <Glow id={`${uid}-g2`} cx={80} cy={700} r={420} color={C.p90} opacity={0.6} />

      {/* incoming message, slightly behind */}
      <Window id={`${uid}-in`} x={x + 30} y={70} w={w - 60} h={250} r={24} fill={C.n5} shadow={false}>
        <Avatar cx={x + 90} cy={128} r={30} fill={C.orange} initials="CL" />
        <T x={x + 136} y={124} size={28} weight={700} fill={C.n90}>
          Casey Lund
        </T>
        <T x={x + 136} y={156} size={22} weight={520} fill={C.n40}>
          Can we push our call?
        </T>
        <T x={x + w - 90} y={124} size={22} weight={560} fill={C.n40} anchor="end">
          10:24 AM
        </T>
        <T x={x + 60} y={220} size={26} weight={500} fill={C.n80}>
          Something came up on my end. Would Thursday
        </T>
        <T x={x + 60} y={258} size={26} weight={500} fill={C.n80}>
          afternoon work instead?
        </T>
      </Window>

      {/* drafted reply */}
      <Window id={`${uid}-draft`} x={x} y={270} w={w} h={500} r={26} fill={C.white}>
        <Ico as={Reply} x={x + 40} y={306} size={30} color={C.n60} />
        <T x={x + 84} y={330} size={25} weight={600} fill={C.n60}>
          Reply to Casey
        </T>
        <rect x={x + w - 270} y={298} width={230} height={46} rx={23} fill={C.p0} stroke={C.p20} strokeWidth={2} />
        <Ico as={Sparkles} x={x + w - 254} y={309} size={24} color={C.p60} />
        <T x={x + w - 222} y={329} size={21} weight={680} fill={C.p60}>
          Drafted for you
        </T>
        <line x1={x + 40} x2={x + w - 40} y1={370} y2={370} stroke={C.n10} strokeWidth={2} />

        <T x={x + 40} y={426} size={30} weight={520} fill={C.n90}>
          Hi Casey, no problem at all.
        </T>
        <T x={x + 40} y={472} size={30} weight={520} fill={C.n90}>
          Thursday at 2:00 or 3:30 both work for me.
        </T>
        <T x={x + 40} y={518} size={30} weight={520} fill={C.n90}>
          I will send an updated invite once you pick one.
        </T>
        <rect className="ns-caret" x={x + 40} y={538} width={3} height={36} fill={C.p60} />

        <line x1={x + 40} x2={x + w - 40} y1={600} y2={600} stroke={C.n10} strokeWidth={2} />
        <rect x={x + 40} y={624} width={150} height={56} rx={14} fill={C.p60} />
        <Ico as={Send} x={x + 62} y={638} size={26} color={C.white} />
        <T x={x + 100} y={661} size={25} weight={680} fill={C.white}>
          Send
        </T>
        <Kbd x={x + 210} y={640} label="⌘" size={14} />
        <Kbd x={x + 240} y={640} label="Enter" size={14} />
        <Ico as={Paperclip} x={x + w - 140} y={638} size={28} color={C.n40} />
        <Ico as={Clock} x={x + w - 86} y={638} size={28} color={C.n40} />
      </Window>
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-inbox-availability · share times (1080:478, #281647)          */
/* Full-card background: card copy sits over the bottom-left, so the  */
/* art lives in the upper/right area and fades into the card colour.  */
/* ------------------------------------------------------------------ */

export function InboxAvailability({ className, style }) {
  const uid = useUid('ia')
  const days = ['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18']
  const slots = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ]
  const times = ['9:30', '11:00', '2:00']
  const cx = 250
  const cw = 760
  return (
    <Art w={1080} h={478} bg={C.p100} label="A week of open time slots ready to share in an email" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.42" stopColor={C.p100} stopOpacity="0" />
          <stop offset="0.74" stopColor={C.p100} stopOpacity="0.9" />
          <stop offset="1" stopColor={C.p100} stopOpacity="1" />
        </linearGradient>
      </defs>
      <Glow id={`${uid}-g`} cx={860} cy={40} r={420} color={C.p60} opacity={0.6} />

      <Window id={`${uid}-cal`} x={cx} y={36} w={cw} h={420} r={22} fill={C.white}>
        <Ico as={CalendarDays} x={cx + 30} y={60} size={28} color={C.p60} />
        <T x={cx + 72} y={83} size={25} weight={700} fill={C.n90}>
          Share availability
        </T>
        <Chip x={cx + cw - 200} y={56} w={170} h={38} fill={C.p0} stroke={C.p20} text="30 min" color={C.p60} size={19} />
        {days.map((d, i) => {
          const colX = cx + 30 + i * ((cw - 60) / 5)
          const colW = (cw - 60) / 5 - 12
          return (
            <g key={d}>
              <T x={colX + colW / 2} y={140} size={19} weight={650} fill={C.n60} anchor="middle">
                {d}
              </T>
              {slots[i].map((on, j) =>
                on ? (
                  <g key={j}>
                    <rect x={colX} y={160 + j * 58} width={colW} height={46} rx={11} fill={i === 3 && j === 2 ? C.p60 : C.p0} stroke={i === 3 && j === 2 ? C.p60 : C.p20} strokeWidth={2} />
                    <T x={colX + colW / 2} y={190 + j * 58} size={19} weight={650} fill={i === 3 && j === 2 ? C.white : C.p60} anchor="middle">
                      {times[j]}
                    </T>
                  </g>
                ) : (
                  <rect key={j} x={colX} y={160 + j * 58} width={colW} height={46} rx={11} fill={C.n5} />
                ),
              )}
            </g>
          )
        })}
      </Window>

      <rect width={1080} height={478} fill={`url(#${uid}-fade)`} />
    </Art>
  )
}

/* ------------------------------------------------------------------ */
/* media-inbox-split · split inbox (1080:486, #dedbd5)                 */
/* ------------------------------------------------------------------ */

const SPLITS = [
  ['Important', 8, true],
  ['Team', 3],
  ['Updates', 21],
  ['Calendar', 2],
]

const SPLIT_ROWS = [
  ['Harper Quinn', 'Signed contract attached', C.p50, 'HQ'],
  ['Leo Brandt', 'Quick question on the brief', C.greenDeep, 'LB'],
  ['Mina Sato', 'Lunch next week?', C.orange, 'MS'],
]

export function InboxSplit({ className, style }) {
  const uid = useUid('is')
  const x = 150
  const w = 780
  return (
    <Art w={1080} h={486} bg={C.n20} label="An inbox split into Important, Team, Updates and Calendar" className={className} style={style}>
      <Window id={`${uid}-win`} x={x} y={52} w={w} h={500} r={24} fill={C.white}>
        <g>
          {SPLITS.reduce(
            (acc, [label, n, active]) => {
              const cw = 34 + label.length * 13 + String(n).length * 12 + 18
              acc.nodes.push(
                <g key={label}>
                  <rect x={acc.x} y={82} width={cw} height={52} rx={26} fill={active ? C.n90 : C.n5} stroke={active ? C.n90 : C.n10} strokeWidth={2} />
                  <T x={acc.x + 22} y={116} size={23} weight={650} fill={active ? C.white : C.n80}>
                    {label}
                  </T>
                  <T x={acc.x + cw - 20} y={116} size={20} weight={650} fill={active ? C.p20 : C.n40} anchor="end">
                    {n}
                  </T>
                </g>,
              )
              acc.x += cw + 12
              return acc
            },
            { x: x + 36, nodes: [] },
          ).nodes}
        </g>
        <line x1={x} x2={x + w} y1={164} y2={164} stroke={C.n10} strokeWidth={2} />
        {SPLIT_ROWS.map(([from, subj, col, ini], i) => {
          const ry = 164 + i * 98
          return (
            <g key={from}>
              <Avatar cx={x + 70} cy={ry + 49} r={28} fill={col} initials={ini} />
              <T x={x + 116} y={ry + 42} size={25} weight={700} fill={C.n90}>
                {from}
              </T>
              <T x={x + 116} y={ry + 76} size={23} weight={500} fill={C.n60}>
                {subj}
              </T>
              <Line x={x + w - 130} y={ry + 32} w={90} h={14} fill={C.n10} />
              <line x1={x + 116} x2={x + w} y1={ry + 98} y2={ry + 98} stroke={C.n10} strokeWidth={2} />
            </g>
          )
        })}
      </Window>
    </Art>
  )
}
