// Invented, generic app marks (calendar, files, CRM, tasks, chat, wiki,
// helpdesk, metrics). Deliberately not modelled on any real product's logo.
// Each glyph is drawn in a 56-unit box; place it with a transform.
import { C } from './tokens'

const GLYPHS = [
  // Calendar
  () => (
    <g>
      <rect x={6} y={8} width={44} height={42} rx={9} fill={C.white} stroke={C.orangeDeep} strokeWidth={3} />
      <path d="M6 20 h44 v-3 a9 9 0 0 0 -9 -9 h-26 a9 9 0 0 0 -9 9 z" fill={C.orange} />
      {[0, 1, 2].map((i) => [0, 1].map((j) => <rect key={`${i}${j}`} x={14 + i * 11} y={27 + j * 10} width={6} height={6} rx={1.5} fill={i === 1 && j === 1 ? C.orangeDeep : C.n30} />))}
    </g>
  ),
  // Files
  () => (
    <g>
      <path d="M5 14 a5 5 0 0 1 5 -5 h12 l6 6 h18 a5 5 0 0 1 5 5 v24 a5 5 0 0 1 -5 5 h-36 a5 5 0 0 1 -5 -5 z" fill={C.green} />
      <path d="M5 22 h46 v22 a5 5 0 0 1 -5 5 h-36 a5 5 0 0 1 -5 -5 z" fill={C.greenDeep} opacity={0.35} />
    </g>
  ),
  // CRM
  () => (
    <g>
      <circle cx={28} cy={28} r={22} fill={C.p10} />
      <circle cx={28} cy={22} r={8} fill={C.p60} />
      <path d="M14 42 a14 11 0 0 1 28 0" fill={C.p60} />
      <circle cx={44} cy={14} r={6} fill={C.orange} />
    </g>
  ),
  // Tasks
  () => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={6} y={8 + i * 15} width={11} height={11} rx={3} fill={i < 2 ? C.greenDeep : 'none'} stroke={C.greenDeep} strokeWidth={2.5} />
          <rect x={22} y={11 + i * 15} width={28 - i * 6} height={5} rx={2.5} fill={i < 2 ? C.n30 : C.greenDeep} />
        </g>
      ))}
    </g>
  ),
  // Chat
  () => (
    <g>
      <path d="M6 12 a6 6 0 0 1 6 -6 h22 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-16 l-8 7 v-7 a6 6 0 0 1 -4 -6 z" fill={C.p40} />
      <path d="M22 30 a6 6 0 0 1 6 -6 h16 a6 6 0 0 1 6 6 v10 a6 6 0 0 1 -6 6 v6 l-7 -6 h-9 a6 6 0 0 1 -6 -6 z" fill={C.orange} />
    </g>
  ),
  // Wiki
  () => (
    <g>
      <path d="M28 14 c-6 -5 -14 -6 -22 -4 v34 c8 -2 16 -1 22 4 z" fill={C.orangeDeep} opacity={0.85} />
      <path d="M28 14 c6 -5 14 -6 22 -4 v34 c-8 -2 -16 -1 -22 4 z" fill={C.orange} />
      <path d="M35 20 h9 M35 27 h9 M35 34 h6" stroke={C.white} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  ),
  // Helpdesk
  () => (
    <g>
      <path d="M6 14 h44 v8 a6 6 0 0 0 0 12 v8 h-44 v-8 a6 6 0 0 0 0 -12 z" fill={C.p60} />
      <path d="M20 14 v28" stroke={C.white} strokeWidth={2.4} strokeDasharray="3 4" />
      <circle cx={35} cy={28} r={6} fill={C.white} />
    </g>
  ),
  // Metrics
  () => (
    <g>
      <rect x={7} y={30} width={9} height={18} rx={2.5} fill={C.green} />
      <rect x={20} y={20} width={9} height={28} rx={2.5} fill={C.p40} />
      <rect x={33} y={10} width={9} height={38} rx={2.5} fill={C.orange} />
      <path d="M5 50 h46" stroke={C.n40} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  ),
]

export function AppGlyph({ i }) {
  const G = GLYPHS[((i % GLYPHS.length) + GLYPHS.length) % GLYPHS.length]
  return <G />
}
