import { FileChartColumn, Fingerprint, FolderLock, KeyRound, LayoutGrid, UserCog } from 'lucide-react'
import { illustrations } from '../../illustrations'

// ent-security-1..6 (69x71): white rounded tile (~12 radius baked in the
// original artwork) with a centred 20px dark line icon. Stand-in composed from
// lucide icons until dedicated artwork exists.
const ICONS = [KeyRound, FileChartColumn, LayoutGrid, Fingerprint, UserCog, FolderLock]

export default function SecurityIcon({ index }) {
  const Icon = ICONS[index]
  const Art = illustrations[`ent-security-${index + 1}`]
  if (Art) {
    return (
      <span data-asset={`ent-security-${index + 1}`} aria-hidden="true" className="block h-[71px] w-[69px]">
        <Art />
      </span>
    )
  }
  return (
    <span
      data-asset={`ent-security-${index + 1}`}
      aria-hidden="true"
      className="grid h-[71px] w-[69px] place-items-center rounded-12 bg-white text-neutral-90"
    >
      <Icon size={20} />
    </span>
  )
}
