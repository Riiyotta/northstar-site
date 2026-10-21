import { AtSign, Briefcase, Camera, Hash, Music2, ThumbsUp, ToggleRight } from 'lucide-react'
import { hrefFor } from '../routes'
import { footer } from '../data/content'
import { Wordmark } from './ui/Media'

// Lucide 1.x has no brand icons; generic glyphs stand in for the social marks.
const socialIcons = {
  LinkedIn: Briefcase,
  X: Hash,
  TikTok: Music2,
  Instagram: Camera,
  Threads: AtSign,
  Facebook: ThumbsUp,
}

// footer nav-link: full-width flex row, 80% white; hover = underline only
// (colour stays at 80%, measured on the live footer)
const LINK_BASE = 'flex text-footer-link transition-colors duration-base ease-ease hover:underline hover:underline-offset-2'

// Tones: dark = homepage mulberry (CLONE_SPEC 11). light = go.md 12: #dedbd5,
// #292827 titles, rgba(41,40,39,.8) links (hover underline only), 5% wordmark.
const TONES = {
  dark: {
    footer: 'ctx-dark bg-mulberry-100 text-white',
    logo: 'text-white',
    link: `${LINK_BASE} text-fg-sub`,
    wordmark: 'text-[rgba(255,255,255,0.05)]',
  },
  light: {
    footer: 'ctx-light bg-neutral-20 text-neutral-90',
    logo: 'text-neutral-90',
    link: `${LINK_BASE} text-[rgba(41,40,39,0.8)]`,
    wordmark: 'text-[rgba(41,40,39,0.05)]',
  },
}

// 11. Footer (dark, #421d24; light variant on /go)
export default function Footer({ tone = 'dark' }) {
  const t = TONES[tone]
  const linkClass = t.link
  return (
    <footer className={t.footer}>
      <div className="content-wrapper grid grid-cols-1 gap-4 pb-4 pt-9 sm:grid-cols-[auto_1fr] sm:gap-8 sm:pb-12 sm:pt-16">
        {/* Brand column */}
        <div className="flex flex-col gap-6 sm:w-[235px] lg:w-[450px]">
          <span className={`flex ${t.logo}`}>
            <Wordmark />
          </span>
          <h3 className="mb-12 max-w-[23ch] text-footer-brand-sm sm:mb-0 lg:text-footer-brand">{footer.title}</h3>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-footer-title">{col.title}</h3>
              <ul className="flex flex-col gap-4">
                {col.links?.map((label) => (
                  <li key={label}>
                    <a href={hrefFor(label)} className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
                {col.cookieButton && (
                  <li>
                    <button type="button" className={`items-center gap-[5px] text-left ${linkClass}`}>
                      {col.cookieButton}
                      {/* privacy-choices icon slot, 40px wide */}
                      <ToggleRight width={40} height={20} aria-hidden="true" />
                    </button>
                  </li>
                )}
                {col.social?.map((label) => {
                  const Icon = socialIcons[label]
                  return (
                    <li key={label}>
                      <a href="#" className={`items-center ${linkClass}`}>
                        <Icon size={20} aria-hidden="true" className="mr-1" />
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Giant watermark wordmark (wordmark-footer), 1280x123 at 1440 */}
        <svg
          data-asset="wordmark-footer"
          aria-hidden="true"
          viewBox="0 0 1280 123"
          className={`col-span-full block aspect-[1280/123] w-full ${t.wordmark}`}
        >
          <text
            x="0"
            y="123"
            textLength="1280"
            lengthAdjust="spacingAndGlyphs"
            fontSize="172"
            fontWeight="700"
            fill="currentColor"
          >
            NORTHSTAR
          </text>
        </svg>
      </div>
    </footer>
  )
}
