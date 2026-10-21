import { ArrowRight } from 'lucide-react'

// 2. Announcement banner
export default function Banner() {
  return (
    <section className="ctx-light min-h-14 bg-purple-10">
      <div className="content-wrapper flex min-h-6 flex-wrap items-center justify-center gap-1 py-4 text-banner-sm sm:text-banner">
        <p>Need the Northstar Inbox app?</p>
        <a
          href="#"
          className="group inline-flex items-center gap-1 text-fg"
        >
          Learn more
          <ArrowRight
            width={16}
            height={12}
            aria-hidden="true"
            className="[transition:translate_var(--dur-slow)_ease-in-out] group-hover:[translate:4px]"
          />
        </a>
      </div>
    </section>
  )
}
