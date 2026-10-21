// Gradient tiles: the factory behind signin-tile-1..3 (brand.jsx) and the
// tab-icon-1..15 set. Lives outside brand.jsx because neither export is a
// component (React Fast Refresh needs component-only modules). Plain .js, so
// createElement instead of JSX.
import { createElement } from 'react'
import {
  BookOpen,
  Bot,
  CalendarDays,
  Feather,
  Filter,
  Inbox,
  Languages,
  Layers,
  Mail,
  PenLine,
  Rocket,
  Sparkles,
  Users,
  Wand2,
  Zap,
} from 'lucide-react'
import GradientTile from './GradientTile'

export const tile = (icon, tone, label, radius = 18, glyph = 30) => {
  const Tile = (p) => createElement(GradientTile, { icon, tone, label, radius, glyph, ...p })
  Tile.displayName = `Tile(${label})`
  return Tile
}

// tab-icon-1..15, three per tab panel, cycling purple / green / orange
export const TAB_ICONS = [
  tile(Sparkles, 'purple', 'Suggestions'),
  tile(Inbox, 'green', 'Inbox'),
  tile(PenLine, 'orange', 'Writing'),
  tile(CalendarDays, 'purple', 'Meeting prep'),
  tile(Users, 'green', 'People'),
  tile(BookOpen, 'orange', 'Briefs'),
  tile(Feather, 'purple', 'Tone'),
  tile(Languages, 'green', 'Translate'),
  tile(Wand2, 'orange', 'Rewrite'),
  tile(Filter, 'purple', 'Filters'),
  tile(Zap, 'green', 'Automations'),
  tile(Layers, 'orange', 'Bundles'),
  tile(Bot, 'purple', 'Helpers'),
  tile(Rocket, 'green', 'Launch'),
  tile(Mail, 'orange', 'Follow-ups'),
]
