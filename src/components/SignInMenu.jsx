import { Bot, FileText, Mail } from 'lucide-react'
import { signInProducts } from '../data/content'

const icons = { Agent: Bot, Inbox: Mail, Pages: FileText }

// 1.2 "Sign in" product menu: 308 wide, anchored right, 8px below the 36px button
// (header top 59 = button top 15 + 36 + 8).
export default function SignInMenu({ id }) {
  return (
    // Surface reveal 300ms var(--ease-out-expo) from opacity 0,
    // translateY(-6px) scale(.95) (no fill); original gates it on
    // no-preference and min-width 640.02px. See .menu-reveal in index.css.
    <div
      id={id}
      className="menu-reveal absolute right-0 top-[calc(100%+8px)] z-dropdown w-[308px] origin-top-right rounded-16 bg-white p-5 shadow-medium"
    >
      <ul className="flex flex-col gap-4">
        {signInProducts.map(({ title, desc }, i) => {
          const Icon = icons[title]
          return (
            // Row stagger 300ms var(--ease-out-expo), fill both, from opacity 0,
            // translateY(5px); delay (i + 1) * 50ms = 50 / 100 / 150ms.
            <li key={title} data-stagger-index={i} className="menu-row-in" style={{ '--row-index': i }}>
              <a
                href="#"
                className="flex h-14 items-center gap-2 rounded-14 py-1 pl-1 pr-3 transition-colors duration-base ease-in-out hover:bg-hover-tint"
              >
                <span
                  data-asset={`signin-tile-${i + 1}`}
                  className="grid size-12 shrink-0 place-items-center rounded-12 text-neutral-5"
                  style={{ background: 'linear-gradient(135deg, #714cb6, #281647)' }}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-menu-title text-fg">{title}</span>
                  <span className="text-menu-desc text-fg-sub">{desc}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
