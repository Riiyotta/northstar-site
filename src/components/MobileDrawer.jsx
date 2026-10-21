import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { navItems } from '../data/content'
import { hrefFor } from '../routes'
import Button from './ui/Button'
import { Wordmark } from './ui/Media'
import Chevron from './ui/Chevron'

// Drawer row: nav-link (min-h 42, padding-inline 8, chevron right after label)
const rowClass =
  'flex min-h-[42px] items-center gap-1 px-2 text-nav hover:text-action-secondary-hover hover:underline hover:underline-offset-2'

function SubList({ items }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((label) => (
        <li key={label}>
          <a
            href={hrefFor(label)}
            className="flex min-h-[42px] items-center rounded-6 pl-4 pr-6 text-nav transition-colors duration-base ease-in-out hover:bg-hover-tint"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

// 1.3 Mobile drawer (<1080): native <dialog>, full viewport.
// cta/bg: product-page variant (see Header): footer rows "Contact sales",
// "Log in" and a 36px primaryCompact button; drawer bg follows the header.
export default function MobileDrawer({ open, onClose, cta, bg }) {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    // Open: [open] runs slide-in from translateX(100%) .3s ease-out and the
    // ::backdrop fades in .3s ease-out. Close: [data-closing] runs the reverse,
    // and dialog.close() waits for the exit animation (see .drawer in index.css).
    if (open) {
      dialog.removeAttribute('data-closing')
      if (!dialog.open) dialog.showModal()
      return
    }
    if (!dialog.open) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      dialog.close()
      return
    }
    let done = false
    const finish = () => {
      if (done) return
      done = true
      dialog.removeAttribute('data-closing')
      if (dialog.open) dialog.close()
    }
    const onEnd = (e) => {
      if (e.target === dialog) finish()
    }
    dialog.addEventListener('animationend', onEnd)
    const fallback = setTimeout(finish, 350) // .3s exit + margin
    dialog.setAttribute('data-closing', '')
    return () => {
      dialog.removeEventListener('animationend', onEnd)
      clearTimeout(fallback)
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      // Esc uses the native instant close (no exit animation, as on the
      // original); the 'close' event syncs state, and the effect above sees
      // the dialog already closed so it skips the slide-out. Only the close
      // button runs the animated exit.
      onClose={onClose}
      aria-label="Menu"
      className="drawer ctx-light m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-white p-0 text-fg"
      style={bg ? { background: bg } : undefined}
    >
      <div className="flex h-full flex-col">
        {/* Repeated header row */}
        <div className="h-[67px] shrink-0 border-b border-line-sub">
          <div className="content-wrapper flex h-[66px] items-center justify-between">
            <a href="/" aria-label="Northstar home" className="flex h-[42px] w-[167px] items-center text-neutral-90">
              <Wordmark />
            </a>
            <Button variant="ghostIcon" aria-label="Close menu" onClick={onClose}>
              <X size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-8 py-6">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isOpen = expanded === item.label
              return (
                <li key={item.label} className="border-b border-line-sub p-2">
                  {item.href ? (
                    <a href={item.href} className={rowClass}>
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className={`${rowClass} w-full text-left`}
                      >
                        {item.label}
                        <Chevron open={isOpen} />
                      </button>
                      {/* Same menu body as the desktop dropdown, inline with 24px padding;
                          two-column menus stack with a 24px gap (no divider). */}
                      {isOpen && (
                        <div className="p-6">
                          {item.items ? (
                            <SubList items={item.items} />
                          ) : (
                            <div className="flex flex-col gap-6">
                              {item.columns.map((col) => (
                                <div key={col.title} className="flex flex-col gap-4">
                                  <p className="px-4 text-menu-title">{col.title}</p>
                                  <SubList items={col.items} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-line-sub px-8 py-6 shadow-drawer sm:items-center">
          <Button variant="text" href="#" className="w-full sm:w-auto">
            Contact sales
          </Button>
          {cta ? (
            <>
              <Button variant="text" href="#" className="w-full sm:w-auto">
                Log in
              </Button>
              <Button variant="primaryCompact" href="#" className="w-full sm:w-auto">
                {cta}
              </Button>
            </>
          ) : (
            <Button variant="signIn" href="#" className="min-h-[52px] w-full sm:w-auto">
              Sign in
              <Chevron size={16} />
            </Button>
          )}
        </div>
      </div>
    </dialog>
  )
}
