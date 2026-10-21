// Section 9 media: media-enterprise (1080:608, dominant #141413).
import { Activity, Globe, KeyRound, LayoutGrid, Lock, Settings, ShieldCheck, Users } from 'lucide-react'
import { Art, Chip, Glow, Ico, T, Window } from './primitives'
import { C, useUid } from './tokens'

const D = {
  panel: '#1f1e1d',
  card: '#292827',
  line: 'rgba(252,250,247,0.08)',
  sub: 'rgba(255,255,255,0.65)',
  soft: 'rgba(255,255,255,0.4)',
}

export function EnterpriseConsole({ className, style }) {
  const uid = useUid('en')
  const x = 70
  const y = 56
  const w = 1010
  const nav = 210
  const cx = x + nav + 32
  // adoption sparkline
  const pts = [8, 14, 12, 22, 26, 24, 34, 40, 38, 50, 58, 64]
  const chartW = 330
  const chartH = 110
  const path = pts
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * chartW} ${chartH - (v / 70) * chartH}`)
    .join(' ')
  return (
    <Art w={1080} h={608} bg={C.n100} label="Admin console showing workspace security settings and adoption" className={className} style={style}>
      <Glow id={`${uid}-g`} cx={900} cy={40} r={460} color={C.p80} opacity={0.5} />
      <Window id={`${uid}-win`} x={x} y={y} w={w} h={620} r={22} fill={D.panel} dark>
        {/* nav */}
        <rect x={x} y={y} width={nav} height={620} fill="#191817" />
        <line x1={x + nav} x2={x + nav} y1={y} y2={y + 620} stroke={D.line} strokeWidth={2} />
        <T x={x + 28} y={y + 52} size={20} weight={720} fill={C.white}>
          Admin
        </T>
        {[
          [LayoutGrid, 'Overview'],
          [Users, 'Members'],
          [ShieldCheck, 'Security', true],
          [Activity, 'Audit log'],
          [Settings, 'Settings'],
        ].map(([I, label, active], i) => (
          <g key={label}>
            {active && <rect x={x + 14} y={y + 84 + i * 46} width={nav - 28} height={38} rx={9} fill="rgba(255,255,255,0.08)" />}
            <Ico as={I} x={x + 28} y={y + 93 + i * 46} size={20} color={active ? C.white : D.soft} />
            <T x={x + 60} y={y + 109 + i * 46} size={17} weight={active ? 650 : 520} fill={active ? C.white : D.sub}>
              {label}
            </T>
          </g>
        ))}

        {/* header */}
        <T x={cx} y={y + 60} size={28} weight={720} fill={C.white}>
          Workspace security
        </T>
        <T x={cx} y={y + 90} size={16} weight={520} fill={D.sub}>
          1,248 members · 3 domains verified
        </T>

        {/* stat cards */}
        {[
          [KeyRound, 'Single sign-on', 'Enforced', C.green],
          [Lock, 'Data retention', '90 days', C.p30],
          [Globe, 'Region', 'EU only', C.orange],
        ].map(([I, label, val, col], i) => {
          const sx = cx + i * 246
          return (
            <g key={label}>
              <rect x={sx} y={y + 118} width={230} height={120} rx={16} fill={D.card} stroke={D.line} strokeWidth={2} />
              <Ico as={I} x={sx + 20} y={y + 138} size={22} color={col} />
              <T x={sx + 52} y={y + 155} size={16} weight={560} fill={D.sub}>
                {label}
              </T>
              <T x={sx + 20} y={y + 212} size={28} weight={700} fill={C.white}>
                {val}
              </T>
            </g>
          )
        })}

        {/* adoption chart */}
        <rect x={cx} y={y + 258} width={374} height={250} rx={16} fill={D.card} stroke={D.line} strokeWidth={2} />
        <T x={cx + 22} y={y + 294} size={17} weight={620} fill={C.white}>
          Weekly active
        </T>
        <T x={cx + 22} y={y + 334} size={30} weight={720} fill={C.white}>
          92%
        </T>
        <Chip x={cx + 98} y={y + 310} w={70} h={28} fill="rgba(58,199,161,0.16)" text="+6%" color={C.green} size={15} />
        <defs>
          <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.p40} stopOpacity="0.45" />
            <stop offset="1" stopColor={C.p40} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform={`translate(${cx + 22} ${y + 370})`}>
          <path d={`${path} L${chartW} ${chartH} L0 ${chartH} Z`} fill={`url(#${uid}-area)`} />
          <path d={path} fill="none" stroke={C.p30} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        </g>

        {/* audit log */}
        <rect x={cx + 390} y={y + 258} width={332} height={250} rx={16} fill={D.card} stroke={D.line} strokeWidth={2} />
        <T x={cx + 412} y={y + 294} size={17} weight={620} fill={C.white}>
          Audit log
        </T>
        {[
          ['SSO policy updated', '2m'],
          ['Domain verified', '1h'],
          ['Admin role granted', '3h'],
          ['Export approved', '1d'],
        ].map(([e, t], i) => (
          <g key={e}>
            <circle cx={cx + 420} cy={y + 336 + i * 42} r={5} fill={i === 0 ? C.green : D.soft} />
            <T x={cx + 436} y={y + 342 + i * 42} size={16} weight={540} fill={D.sub}>
              {e}
            </T>
            <T x={cx + 700} y={y + 342 + i * 42} size={15} weight={520} fill={D.soft} anchor="end">
              {t}
            </T>
          </g>
        ))}
      </Window>
    </Art>
  )
}
