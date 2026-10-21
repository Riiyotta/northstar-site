// Non-component exports shared by the illustrations (kept out of the .jsx
// component modules so React Fast Refresh can hot-swap those cleanly).
import { useId } from 'react'

/** Document-unique id prefix for gradients/clipPaths (safe inside url(#…)). */
export function useUid(prefix = 'ns') {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
}

export const C = {
  // CLONE_SPEC 0.4
  n0: '#fcfaf7',
  n5: '#f7f5f2',
  n10: '#f2f0eb',
  n20: '#dedbd5',
  n30: '#bfbcb6',
  n40: '#8d8a86',
  n60: '#73716d',
  n80: '#474543',
  n90: '#292827',
  n95: '#1f1e1d',
  n100: '#141413',
  p0: '#f7f5ff',
  p10: '#e8e0ff',
  p20: '#d4c7ff',
  p30: '#bea1f5',
  p40: '#9e7be0',
  p50: '#8861ca',
  p60: '#714cb6',
  p80: '#533192',
  p90: '#3f256f',
  p100: '#281647',
  g0: '#f4fdfa',
  g90: '#0c4243',
  g100: '#17261f',
  m100: '#421d24',
  mBlack: '#241013',
  white: '#ffffff',
  // accent tints used inside tab icons (spec 5.4 placeholder gradients)
  green: '#3ac7a1',
  greenDeep: '#148072',
  orange: '#ff9d56',
  orangeDeep: '#c25000',
  // /mail + /docs art accents (mail.assets.json / docs.assets.json dominant colours)
  sky: '#78a8f8',
  skyLight: '#d6e6fc',
  skyDeep: '#4f8fe6',
  indigo: '#6878e8',
  indigoDeep: '#4a5bd0',
  teal: '#5fc4d4',
  rose: '#f6d3e6',
  roseDeep: '#e58fc0',
  butter: '#fdeeb5',
}

/** Original Northstar mark: a four-point star. Drawn in a 24-unit box. */
export const STAR_PATH = 'M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z'
