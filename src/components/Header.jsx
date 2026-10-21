import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { navItems } from '../data/content'
import { hrefFor } from '../routes'
import Button from './ui/Button'
import { Wordmark } from './ui/Media'
import Chevron from './ui/Chevron'
import SignInMenu from './SignInMenu'
import MobileDrawer from './MobileDrawer'

// 1.1 dropdown item: min-h 42, padding 0 24 0 16, hover tint radius 6
const menuLink =
  'flex min-h-[42px] items-center whitespace-nowrap rounded-6 pl-4 pr-6 text-nav text-fg transition-colors duration-base ease-in-out hover:bg-hover-tint'

// nav-link: min-h 42, padding-inline 8; hover = action-secondary-hover + underline
const navLink =
  'flex min-h-[42px] items-center gap-1 px-2 text-nav text-fg hover:text-action-secondary-hover hover:underline hover:underline-offset-2'

function Dropdown({ item, id }) {
  // Surface appears instantly (spec: animation none)
  return (
    <div
      id={id}
      className="absolute left-0 top-full z-dropdown rounded-16 bg-white p-6 shadow-medium"
    >
      {item.items ? (
        <ul className="flex flex-col gap-4">
          {item.items.map((label) => (
            <li key={label}>
              <a href={hrefFor(label)} className={menuLink}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex gap-4">
          {item.columns.map((col, i) => (
            <Fragment key={col.title}>
              {i > 0 && <hr aria-hidden="true" className="h-auto w-px self-stretch border-0 bg-line-sub" />}
              <div className="min-w-[200px]">
                <p className="mb-4 px-4 text-menu-title text-fg">{col.title}</p>
                <ul className="flex flex-col gap-4">
                  {col.items.map((label) => (
                    <li key={label}>
                      <a href={hrefFor(label)} className={menuLink}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

// cta: product-page variant (mail.md 0.1 / go.md 1): "Contact sales" + "Log in"
// (unstyled) + a primaryCompact button labelled `cta`, no Sign in menu.
// bg: header background (default #fff; /go uses #f7f5f2), shared with the drawer.
export default function Header({ cta, bg }) {
  // One open menu at a time: a nav label, 'signin', or null
  const [openMenu, setOpenMenu] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  const toggle = (key) => setOpenMenu((cur) => (cur === key ? null : key))

  return (
    <header
      ref={headerRef}
      className="ctx-light sticky top-0 z-header h-[67px] border-b border-line-sub bg-white"
      style={bg ? { background: bg } : undefined}
    >
      <div className="content-wrapper flex h-[66px] items-center justify-between">
        <div className="flex items-center">
          <a href="/" aria-label="Northstar home" className="flex h-[42px] w-[167px] items-center text-neutral-90">
            <Wordmark />
          </a>

          <nav aria-label="Main" className="ml-8 hidden lg:block">
            <ul className="flex gap-2">
              {navItems.map((item) => {
                const open = openMenu === item.label
                const menuId = `nav-menu-${item.label.toLowerCase()}`
                return (
                  <li key={item.label} className="relative">
                    {item.href ? (
                      <a
                        href={item.href}
                        className={navLink}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={menuId}
                          onClick={() => toggle(item.label)}
                          className={navLink}
                        >
                          {item.label}
                          <Chevron open={open} />
                        </button>
                        {open && <Dropdown item={item} id={menuId} />}
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="text" href="#" className="hidden sm:inline-flex">
            Contact sales
          </Button>
          {cta ? (
            <>
              <Button variant="text" href="#" className="hidden sm:inline-flex">
                Log in
              </Button>
              <Button variant="primaryCompact" href="#" className="hidden sm:inline-flex">
                {cta}
              </Button>
            </>
          ) : (
            <div className="relative hidden sm:block">
              <Button
                variant="signIn"
                aria-expanded={openMenu === 'signin'}
                aria-controls="signin-menu"
                onClick={() => toggle('signin')}
              >
                Sign in
                <Chevron open={openMenu === 'signin'} size={16} />
              </Button>
              {openMenu === 'signin' && <SignInMenu id="signin-menu" />}
            </div>
          )}
          <Button
            variant="ghostIcon"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => {
              setOpenMenu(null)
              setDrawerOpen(true)
            }}
          >
            <Menu size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} cta={cta} bg={bg} />
    </header>
  )
}
