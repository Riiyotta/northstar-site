import Button from '../ui/Button'

// go.md 0.3 chapter intro stack: mono eyebrow ("NN / 05 · LABEL", uppercase in
// the copy), heading-large h2, text-medium text-sub lede, optional caret link.
export function ChapterStack({ eyebrow, title, lede, link }) {
  return (
    <div className="flex max-w-text flex-col items-start gap-6">
      <p className="text-small text-fg-sub">
        <span className="font-mono text-eyebrow">{eyebrow}</span>
      </p>
      <h2 className="text-heading-lg text-fg">{title}</h2>
      <p className="text-pretty text-medium text-fg-sub">{lede}</p>
      {link && (
        <p className="self-stretch">
          <Button variant="link" href="#" caret="right" className="max-sm:w-full">
            {link}
          </Button>
        </p>
      )}
    </div>
  )
}

// Two-column 8/4 (gap vp, row from 640): the stack sits in the span-8 column,
// the span-4 column stays empty. <640 the empty column still takes part in
// the column flow (0 tall, but the 16px gap counts); `reversed` puts it first.
export default function ChapterIntro({ reversed = false, ...props }) {
  return (
    <div className={`flex gap-vp sm:flex-row ${reversed ? 'flex-col-reverse' : 'flex-col'}`}>
      <div className="min-w-0 sm:flex-[2_1_0%]">
        <ChapterStack {...props} />
      </div>
      <div className="min-w-0 sm:flex-[1_1_0%]" />
    </div>
  )
}
