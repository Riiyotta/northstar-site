import { faq } from '../../data/enterprise'
import Faq from '../ui/Faq'

// enterprise.md 17: centred title (pb 80) + shared Accordion, 818px (90ch of
// the original font) wide, all items collapsed. Body text-small, text-sub;
// following p get 12px block margins; links use the shared FAQ link style.
// Single-open like the original: opening an item closes the previous one.
export default function FaqAccordion() {
  return <Faq title={faq.title} items={faq.items.map((it) => ({ q: it.q, a: it.a }))} className="bg-white" single />
}
