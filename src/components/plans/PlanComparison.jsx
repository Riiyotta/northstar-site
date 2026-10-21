import { forwardRef, useRef } from 'react'
import { betaLabel, comparison, comparisonTitle, featureHeader, moreLink, plans } from '../../data/plans'
import Accordion from '../ui/Accordion'
import { CheckMark } from '../ui/Icons'
import Tag from '../ui/Tag'
import Tooltip from '../ui/Tooltip'
import FloatingPlanHeader from './FloatingPlanHeader'

// plans.md 3: comparison table (>=1080 only). Fixed 1080 grid: feature column
// 400 + 4 plan columns x 170. The highlighted plan's column is tinted
// (#f2f0eb) with border-base side borders in every section table.
const HL = plans.findIndex((p) => p.highlight)
const hlCell = 'bg-neutral-10 border-x border-line-base'

function Cols() {
  return (
    <colgroup>
      <col />
      {plans.map((p) => (
        <col key={p.key} className="w-[170px]" />
      ))}
    </colgroup>
  )
}

function Value({ v }) {
  if (v.type === 'check') return <CheckMark className="mx-auto block text-neutral-90" />
  if (v.type === 'text')
    return (
      <span className="inline-flex items-center justify-center gap-1 text-micro text-fg">
        <span>{v.text}</span>
        {v.info && <Tooltip text={v.info} />}
      </span>
    )
  return null
}

function FeatureLabel({ row }) {
  if (row.label === '+more')
    return (
      <span className="text-micro text-fg">
        +{' '}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-[3px] transition-colors duration-base ease-ease hover:text-neutral-100"
        >
          {moreLink}
        </a>
      </span>
    )
  return (
    <span className="flex items-center gap-1">
      <span className="max-w-[325px] text-micro text-fg">{row.label}</span>
      {row.beta && <Tag>{betaLabel}</Tag>}
      {row.info && <Tooltip text={row.info} />}
    </span>
  )
}

function SectionTable({ section }) {
  const last = section.rows.length - 1
  return (
    <table className="w-[1080px] table-fixed border-collapse border-b border-line-sub">
      <Cols />
      <thead>
        <tr className="h-[74px]">
          <th scope="col" className="pl-6 text-left align-middle">
            <span className="inline-flex items-center gap-1 text-section-title text-fg">
              {section.title}
              {section.info && <Tooltip text={section.info} />}
            </span>
          </th>
          {plans.map((p, i) => (
            <th key={p.key} aria-hidden="true" className={i === HL ? hlCell : ''} />
          ))}
        </tr>
      </thead>
      <tbody>
        {section.rows.map((row, r) => {
          const pad = r === last ? 'h-[60px] pb-4 pt-0' : 'h-11'
          return (
            <tr key={row.label}>
              <th scope="row" className={`pl-6 pr-0 text-left align-middle font-medium ${pad}`}>
                <FeatureLabel row={row} />
              </th>
              {row.values.map((v, i) => (
                <td key={i} className={`px-2 text-center align-middle leading-[18px] ${pad} ${i === HL ? hlCell : ''}`}>
                  <Value v={v} />
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const HeaderRow = forwardRef(function HeaderRow(_, ref) {
  return (
    <table ref={ref} className="w-[1080px] table-fixed border-collapse">
      <Cols />
      <thead>
        <tr className="h-11">
          <th scope="col" className="pl-6 pr-2 text-left align-middle text-table-head capitalize text-fg">
            {featureHeader}
          </th>
          {plans.map((p) => (
            <th key={p.key} scope="col" className="px-2 text-center align-middle text-table-head capitalize text-fg">
              {p.name}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  )
})

const groups = comparison.map((g) => ({
  key: g.key,
  title: g.title,
  content: g.sections.map((s) => <SectionTable key={s.title} section={s} />),
}))

export default function PlanComparison({ id }) {
  const headRef = useRef(null)
  const endRef = useRef(null)
  return (
    <section id={id} className="ctx-light hidden justify-center bg-neutral-5 lg:flex">
      <div className="flex w-[1080px] flex-col py-20">
        <h3 className="max-w-[900px] pb-8 text-heading-lg font-medium text-fg">{comparisonTitle}</h3>
        <HeaderRow ref={headRef} />
        <div ref={endRef}>
          <Accordion variant="compare" items={groups} defaultOpen className="w-[1080px]" />
        </div>
      </div>
      <FloatingPlanHeader headRef={headRef} endRef={endRef} />
    </section>
  )
}
