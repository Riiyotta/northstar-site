// enterprise.md 0: PageSection = content-wrapper + padding-block 96 (>=640) / 40.
// SectionGroup = one background colour; every PageSection after the first
// inside a group has padding-top 0 (each keeps its own padding-bottom).
export function SectionGroup({ dark = false, className = '', children }) {
  return (
    <div className={`${dark ? 'ctx-dark' : 'ctx-light'} [&>section+section]:pt-0 ${className}`}>{children}</div>
  )
}

export default function PageSection({ className = '', children, ...props }) {
  return (
    <section className={`content-wrapper py-section ${className}`} {...props}>
      {children}
    </section>
  )
}
