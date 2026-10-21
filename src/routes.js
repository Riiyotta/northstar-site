import Plans from './pages/Plans'
import EnterprisePage from './pages/Enterprise'
import Mail from './pages/Mail'
import Docs from './pages/Docs'
import Go from './pages/Go'
import Agents from './pages/Agents'

// Route table. Paths mirror the original site's structure; `ready` pages have
// a real component in src/pages, the rest render ComingSoon until built.
// Route-level layout options (read by Layout in App.jsx):
//   header: { cta, bg } product-page header (mail.md 0.1, go.md 1): "Contact
//           sales" + "Log in" + a primaryCompact `cta`, instead of the Sign in
//           menu. `bg` also paints the drawer and <main> (go.md page bg).
//   footer: 'light' -> Footer tone="light" (go.md 12).
export const routes = [
  { path: '/mail', title: 'Northstar Inbox', Component: Mail, header: { cta: 'Get started' } },
  { path: '/docs', title: 'Northstar Pages', Component: Docs, header: { cta: 'Start using Pages' } },
  { path: '/go', title: 'Northstar Assistant', Component: Go, header: { cta: 'Sign up', bg: '#f7f5f2' }, footer: 'light' },
  { path: '/agents', title: 'Northstar Agents', Component: Agents, header: { cta: 'Sign up' } },
  { path: '/plans', title: 'Pricing', Component: Plans },
  { path: '/enterprise', title: 'Northstar for Enterprise', Component: EnterprisePage },
]

// Nav/footer label -> route. Labels without an entry stay as "#".
const linkMap = {
  'Northstar app': '/go',
  Agents: '/agents',
  Mail: '/mail',
  Docs: '/docs',
  'All pricing': '/plans',
  Team: '/plans',
  Plus: '/plans',
  'Enterprise plans': '/enterprise',
  'Northstar Agent': '/agents',
  'Northstar Inbox': '/mail',
  'Northstar Pages': '/docs',
  Pricing: '/plans',
  Security: '/enterprise',
}

export const hrefFor = (label) => linkMap[label] ?? '#'
