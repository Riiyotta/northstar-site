// enterprise.md 16: 2 cols when the container is >=640 wide. Each column:
// logo figure (237x53, `logo` is the artwork node), quote p, empty p (24 gap),
// attribution p (name <br> role), trailing empty block (one more 24 gap).
// mail.md 10: with `item.avatar` (60x60 node) the column becomes a card:
// flex-col gap vp = [the block above, avatar].
export default function QuoteGrid({ items }) {
  return (
    <div className="multi-column">
      <div className="multi-column-grid [--_columns:2]">
        {items.map((it) => {
          const block = (
            <div key={it.name} className="flex flex-col items-start gap-6">
              <figure className="h-[53px] w-[237px]">{it.logo}</figure>
              <p className="text-pretty text-medium text-fg-sub">{it.quote}</p>
              <p className="mt-6 text-medium text-fg-sub">
                {it.name}
                <br />
                {it.role}
              </p>
              {/* enterprise.md 16: the original ends each column with an empty
                  text block, so one more 24px gap follows the attribution. */}
              {!it.avatar && <span aria-hidden="true" className="block" />}
            </div>
          )
          if (!it.avatar) return block
          return (
            <div key={it.name} className="flex flex-col items-start gap-vp">
              {block}
              <figure className="size-[60px]">{it.avatar}</figure>
            </div>
          )
        })}
      </div>
    </div>
  )
}
