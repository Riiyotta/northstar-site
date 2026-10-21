import { ChevronDown } from 'lucide-react'

// Chevron rotates -180deg when open (rotate .3s ease, spec 1 / 13.4)
export default function Chevron({ open, size = 14 }) {
  return (
    <ChevronDown
      size={size}
      aria-hidden="true"
      className="shrink-0 [transition:rotate_var(--dur-slow)_ease]"
      style={{ rotate: open ? '-180deg' : '0deg' }}
    />
  )
}
