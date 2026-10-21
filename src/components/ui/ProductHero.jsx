import Button from './Button'
import { LockupSlot } from './Media'
import PageSection from './PageSection'
import VideoSlot from './VideoSlot'

// Centred product hero with a demo video (mail.md 2 "ProductHero", go.md 3
// "CenteredVideoHero").
// Title block: flex-col gap 24, margin-bottom 40 (>=640) / 24.
//   header: flex-col gap 24 / 12 (<640): h1 display-sm (first line = the
//           inline-block product lockup + <br>, then `lines` split by <br>),
//           text-large text-sub lede.
//   CTA: margin-top 16, centred row; <640 a column with a stretched button.
// titleClass: width of the title block (mail shrink-wraps to the h1, go is
// the full text max). video: VideoSlot props + `wrapClass` (frame width).
export default function ProductHero({ lockup, lines, lede, cta, titleClass = '', video, className = '' }) {
  const { wrapClass = 'w-full', ...videoProps } = video
  return (
    <PageSection className={`flex flex-col items-center text-center ${className}`}>
      <div className={`mb-6 flex max-w-text flex-col gap-6 sm:mb-10 ${titleClass}`}>
        <header className="flex flex-col gap-3 sm:gap-6">
          <h1 className="text-display-sm text-fg">
            <LockupSlot {...lockup} />
            {lines.map((line) => (
              <span key={line}>
                <br />
                {line}
              </span>
            ))}
          </h1>
          <p className="text-large text-fg-sub">{lede}</p>
        </header>
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-center">
          <Button variant="primary" href="#">
            {cta}
          </Button>
        </div>
      </div>
      <div className={wrapClass}>
        <VideoSlot {...videoProps} />
      </div>
    </PageSection>
  )
}
