import Button from './Button'

// Column count classes (static strings so Tailwind sees them).
const COLS = { 2: '[--_columns:2]', 3: '[--_columns:3]', 4: '[--_columns:4]' }

// enterprise.md 11: multi-column (3 cols when the container is >=640 wide),
// cell = icon figure, heading-small h2, text-medium text-sub p (gap 24).
// Extensions:
//   columns: 2 | 3 | 4 (docs.md 5/8/11)
//   item.link: optional caret primaryLink (docs.md 8)
//   variant 'centered' (mail.md 6): centred icon + heading-xs text-sub p
//     (`item.text`, may contain an inline text-action span)
export default function IconFeatureGrid({ items, columns = 3, variant = 'default' }) {
  return (
    <div className="multi-column">
      <div className={`multi-column-grid ${COLS[columns]}`}>
        {items.map((it, i) =>
          variant === 'centered' ? (
            <div key={i} className="flex flex-col items-center gap-6 text-center">
              <figure>{it.icon}</figure>
              <p className="text-heading-xs text-fg-sub">{it.text}</p>
            </div>
          ) : (
            <div key={it.title} className={`flex flex-col gap-6 ${it.link ? 'items-start' : ''}`}>
              <figure>{it.icon}</figure>
              <h2 className="text-heading-sm text-fg">{it.title}</h2>
              <p className="text-medium text-fg-sub">{it.body}</p>
              {it.link && (
                <Button variant="link" href="#" caret="right">
                  {it.link}
                </Button>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  )
}
