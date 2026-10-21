// enterprise.md list_ulList: grid li (bullet column + text), "•" at 125%,
// margin-inline 12px, colour inherited; text is text-medium text-sub. 0 gap.
// The bullet box is pinned to the original glyph advance (0.25em = 5.6px at
// 125%) so the text column starts 29.6px in, as measured.
export default function BulletList({ items }) {
  return (
    <ul>
      {items.map((t) => (
        <li
          key={t}
          className="grid grid-cols-[auto_1fr] text-medium before:mx-3 before:text-[125%] before:leading-[125%] before:w-[0.25em] before:content-['•']"
        >
          <p className="text-pretty text-medium text-fg-sub">{t}</p>
        </li>
      ))}
    </ul>
  )
}
