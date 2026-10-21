import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'

// CLONE_SPEC.md 0.9 Buttons. Colours come from the semantic context vars, so the
// same variant renders correctly inside `.ctx-dark` sections.
const base =
  'inline-flex items-center justify-center gap-1 py-1.5 whitespace-nowrap'

const variants = {
  primary:
    'min-h-[52px] px-5 rounded-12 text-button bg-action text-on-action hover:bg-action-hover active:bg-action-active transition-colors duration-base ease-in-out',
  primaryCompact:
    'min-h-9 px-4 rounded-8 text-button-compact bg-action text-on-action hover:bg-action-hover active:bg-action-active transition-colors duration-base ease-in-out',
  link:
    'px-0 rounded-8 text-button text-action hover:text-action-hover hover:underline underline-offset-2 decoration-1 transition-colors duration-base ease-ease',
  linkCompact:
    'px-0 rounded-8 text-button-compact text-action hover:text-action-hover hover:underline underline-offset-2 decoration-1 transition-colors duration-base ease-ease',
  // 48px "compact-large" (plans.md 3.6 floating header): 16/600 label (measured)
  primaryMid:
    'min-h-12 px-5 rounded-12 text-button bg-action text-on-action hover:bg-action-hover active:bg-action-active transition-colors duration-base ease-in-out',
  primaryOutlineMid:
    'min-h-12 px-5 rounded-12 text-button text-action shadow-ring-1 hover:shadow-ring-2 hover:text-action-hover transition-shadow duration-base ease-in-out',
  // plans.md 1b compare button: transparent, purple text, hover tint
  primaryGhost:
    'min-h-[52px] px-5 rounded-12 text-button text-action bg-transparent hover:bg-hover-tint transition-colors duration-base ease-in-out',
  primaryOutline:
    'min-h-[52px] px-5 rounded-12 text-button text-action shadow-ring-1 hover:shadow-ring-2 hover:text-action-hover transition-shadow duration-base ease-in-out',
  // go.md 0.1 secondaryFilled (dark context): rgba(255,255,255,.9) -> #fff, text #292827
  secondaryFilled:
    'min-h-[52px] px-5 rounded-12 text-button bg-action-secondary text-on-action hover:bg-action-secondary-hover transition-colors duration-base ease-in-out',
  secondaryOutline:
    'min-h-[52px] px-5 rounded-12 text-button text-action-secondary shadow-ring-1 hover:shadow-ring-2 transition-shadow duration-base ease-in-out',
  secondaryOutlineCompact:
    'min-h-9 px-4 rounded-8 text-button-compact text-action-secondary shadow-ring-1 hover:shadow-ring-2 transition-shadow duration-base ease-in-out',
  // Sign-in trigger: compact outline with a border-sub ring (header + drawer)
  signIn:
    'min-h-9 px-4 rounded-8 text-button-compact text-action-secondary shadow-ring-sub-1 hover:shadow-ring-sub-2 hover:text-action-secondary-hover transition-shadow duration-base ease-in-out',
  ghostIcon:
    'size-9 p-0 rounded-full text-action-secondary bg-transparent hover:bg-hover-tint transition-colors duration-base ease-in-out',
  text:
    'min-h-9 px-0 rounded-none text-nav text-fg hover:underline underline-offset-2',
}

// Trailing icon: `arrow` (homepage arrow-right), `caret` ('right' | 'down').
export default function Button({ as, variant = 'primary', className = '', children, arrow, caret, ...props }) {
  const Tag = as || (props.href ? 'a' : 'button')
  const compact = variant === 'linkCompact' || variant === 'primaryCompact'
  return (
    <Tag
      className={`${base} ${variants[variant]} ${className}`}
      {...(Tag === 'button' && !props.type ? { type: 'button' } : {})}
      {...props}
    >
      {children}
      {arrow && <ArrowRight size={compact ? 16 : 20} aria-hidden="true" />}
      {caret === 'right' && <ChevronRight size={20} aria-hidden="true" />}
      {caret === 'down' && <ChevronDown size={20} aria-hidden="true" />}
    </Tag>
  )
}
