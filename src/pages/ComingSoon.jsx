// Temporary stand-in for routes whose page hasn't been built yet.
export default function ComingSoon({ title }) {
  return (
    <section className="content-wrapper grid min-h-[60vh] place-items-center py-section text-center">
      <div>
        <h1 className="text-heading-lg text-fg">{title}</h1>
        <p className="mt-4 text-small text-fg-sub">This page is being built.</p>
      </div>
    </section>
  )
}
