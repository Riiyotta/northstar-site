// Looping hero art for /mail (mail-hero-video) and /docs (docs-hero-video).
// The original hero videos restart on `ended`, so they play continuously
// (mail 35.9s, docs 28.3s). These reuse the homepage hero scenes but swap the
// 7s one-shot timelines for seamless cycles (keyframes in
// mailDocs-hero-loops.css, where 0% and 100% are the same frame). The
// homepage carousel keeps the one-shot HeroInbox / HeroPages untouched.
import { HeroInbox, HeroPages } from './hero'
import './mailDocs-hero-loops.css'

export function MailHeroLoop({ className = '', style }) {
  return <HeroInbox className={`ns-loop-mail ${className}`} style={style} />
}

export function DocsHeroLoop({ className = '', style }) {
  return <HeroPages className={`ns-loop-docs ${className}`} style={style} />
}
