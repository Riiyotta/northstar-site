// ent-badge-1..12: placeholder from enterprise.md 12: a 34px circle emblem
// + a short white label ("Standard A1" ... "Standard A12"), monochrome.
import { illustrations } from '../../illustrations'

export default function BadgePlaceholder({ n }) {
  const Art = illustrations[`ent-badge-${n}`]
  if (Art) {
    return (
      <span data-asset={`ent-badge-${n}`} aria-hidden="true" className="block h-20 w-full">
        <Art />
      </span>
    )
  }
  return (
    <span className="flex h-20 w-full items-center justify-center gap-2 text-white">
      <span className="size-[34px] shrink-0 rounded-full border-2 border-current opacity-80" />
      <span className="text-xsmall">Standard A{n}</span>
    </span>
  )
}
