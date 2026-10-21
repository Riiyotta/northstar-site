import Accordion from './Accordion'
import Intro from './Intro'
import PageSection, { SectionGroup } from './PageSection'

// Shared FAQ section (enterprise.md 17, go.md 10, agents.md 11): centred h2
// (padding-bottom 80) + the shared Accordion. Answer body: text-small,
// text-sub; consecutive p get 12px block margins.
// Answer parts: 'text' | [before, link, after] | { list: [...] } | { bold, text }
// Lists (go.md 10): no markers, li indented 29.7px, li+li margin-top 12, a
// hollow 12px circle bullet (1.5px currentColor border) centred vertically.
function Part({ part, linkClass }) {
  // Strings first: String.prototype.bold would otherwise match `part.bold`.
  if (typeof part === 'string') return <p>{part}</p>
  if (Array.isArray(part))
    return (
      <p>
        {part[0]}
        <a href="#" className={linkClass}>
          {part[1]}
        </a>
        {part[2]}
      </p>
    )
  if (part.list)
    return (
      <ul>
        {part.list.map((li) => (
          <li
            key={li}
            className="relative pl-[29.7px] before:absolute before:left-0 before:top-1/2 before:size-3 before:-translate-y-1/2 before:rounded-full before:border-[1.5px] before:border-current [&+li]:mt-3"
          >
            {li}
          </li>
        ))}
      </ul>
    )
  if (part.bold != null && typeof part.bold === 'string')
    return (
      <p>
        <b className="font-bold">{part.bold}</b> {part.text}
      </p>
    )
  return <p>{part}</p>
}

export default function Faq({
  title,
  items,
  single = false,
  className = '',
  sectionClass = '',
  // 90ch of the original font = 817.9px (Hanken's ch is narrower).
  rootClass = 'w-full max-w-[818px]',
  // Answer links (measured): text colour, underlined (offset 3px), colour
  // -> #141413 over .2s ease on hover.
  linkClass = 'text-fg underline underline-offset-[3px] transition-colors duration-base ease-ease hover:text-neutral-100',
}) {
  const accordionItems = items.map((it, i) => ({
    key: `faq-${i}`,
    title: it.q,
    content: (
      <div className="text-pretty text-small text-fg-sub [&>*+*]:my-3">
        {it.a.map((part, j) => (
          <Part key={j} part={part} linkClass={linkClass} />
        ))}
      </div>
    ),
  }))
  return (
    <SectionGroup className={className}>
      <PageSection className={sectionClass}>
        <Intro title={title} className="pb-20" />
        <Accordion variant="faq" single={single} items={accordionItems} className={`mx-auto ${rootClass}`} />
      </PageSection>
    </SectionGroup>
  )
}
