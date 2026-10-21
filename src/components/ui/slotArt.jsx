import { illustrations } from '../../illustrations'

// Artwork for slot `id`, falling back to an existing illustration (`fallback`
// id) until dedicated art is registered under `id`.
export function slotArt(id, fallback, props) {
  const Art = illustrations[id] ?? illustrations[fallback]
  return Art ? <Art {...props} /> : null
}
