// plans.md 3.4 Beta tag: inline pill, purple-10 bg, purple-90 text.
export default function Tag({ children }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-6 border border-purple-10 bg-purple-10 px-1.5 py-px text-tag text-purple-90">
      {children}
    </span>
  )
}
