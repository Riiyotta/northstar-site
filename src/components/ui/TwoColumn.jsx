// enterprise.md "TwoColumn". Gaps:
//   M  (gapM, default): 24 (<640) / 40 (640-1280) / 64 (>=1280)
//   L  (gapL, mail.md 8 / agents.md 0): 32 (<640) / 64 (640-1280) / 128 (>=1280)
//   vp (go.md 0.2): the viewport padding, 16 / 24 / 32
// Columns flex 1 1 0, each a centred flex column with an inner gap = --vp.
// from="sm": smallSingleCol (row from 640). from="lg": mediumSingleCol (row from 1080).
const ROW = { sm: 'sm:flex-row', lg: 'lg:flex-row' }
const GAP = {
  M: 'gap-6 sm:gap-10 xl:gap-16',
  L: 'gap-8 sm:gap-16 xl:gap-32',
  vp: 'gap-vp',
}

export default function TwoColumn({ from = 'sm', gap = 'M', className = '', children }) {
  return <div className={`flex flex-col ${GAP[gap]} ${ROW[from]} ${className}`}>{children}</div>
}

export function Column({ className = '', children }) {
  return <div className={`flex min-w-0 flex-[1_1_0%] flex-col justify-center gap-vp ${className}`}>{children}</div>
}
