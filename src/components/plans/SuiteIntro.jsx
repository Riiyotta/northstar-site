import { pageTitle, products } from '../../data/plans'
import ProductGlyph from './ProductGlyph'

// plans.md 1a: h1 + 4-cell product grid (4 cols >=640, 2x2 below).
export default function SuiteIntro() {
  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <h1 className="max-w-[900px] text-balance text-center text-display-sm text-fg">{pageTitle}</h1>
      <div className="grid w-full max-w-[960px] grid-cols-2 overflow-hidden rounded-16 border border-line-sub sm:grid-cols-4">
        {products.map((p) => (
          <div key={p.key} className="flex flex-col gap-2 bg-white px-4 py-6">
            <div className="flex items-center gap-2">
              <ProductGlyph product={p.key} size={24} />
              <p className="text-large text-fg-sub">{p.name}</p>
            </div>
            <p className="text-small text-fg-sub">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
