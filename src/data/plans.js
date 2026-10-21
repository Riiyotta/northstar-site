// /plans placeholder copy (specs/plans.md). All names, prices and labels are
// invented placeholders of the original lengths.

export const pageTitle = 'Find the right plan for you'

// 1a product grid (glyph ids from plans.assets.json)
export const products = [
  { key: 'inbox', name: 'Inbox', body: 'Email that sorts and drafts itself' },
  { key: 'agents', name: 'Agents', body: 'Feedback on every sentence, in any tool' },
  { key: 'pages', name: 'Pages', body: 'Living docs for projects, with an AI co-author.' },
  { key: 'assistant', name: 'Assistant', body: 'A single helper that knows your whole context' },
]

const CADENCE = 'per seat / month, if billed yearly.'

// 1b plan cards, DOM (= desktop) order. `highlight` = Meridian.
export const plans = [
  {
    key: 'seed',
    name: 'Seed',
    tier: 'free',
    description: 'Try the essentials at no cost and see what sticks for you.',
    price: '$ 0',
    cadence: '',
    monthly: null,
    cta: 'Start the Seed plan',
    floatCta: 'Get Seed',
    products: ['agents', 'pages', 'assistant'],
    includes: 'Seed includes:',
    features: [
      'Get quick answers from AI without switching windows',
      'Clarity checks across twenty languages',
      'First drafts tuned to the way you already like to write',
      'Shared docs with embedded tables, charts, kanban boards and quick polls',
      'Keep docs current using formulas and basic automations.',
    ],
  },
  {
    key: 'arc',
    name: 'Arc',
    description: 'For individuals who write a lot and want help with it every day.',
    price: '$ 9.5',
    cadence: CADENCE,
    monthly: '$ 11.5',
    cta: 'Start the Arc plan',
    floatCta: 'Get Arc',
    products: ['agents', 'pages', 'assistant'],
    includes: 'Everything in Seed, and also this:',
    features: [
      'Unlimited paragraph-level rewrites and translations every month',
      'Check work for AI-generated text and borrowed lines.',
      'House-style rules applied automatically',
      'Host public docs at your own URL, styled with your logo',
      'No cap on doc size and a month of restore points.',
      'Starter layouts that suggest structure as you go along',
    ],
  },
  {
    key: 'meridian',
    name: 'Meridian',
    highlight: true,
    description: 'For teams that live in email and docs all day long.',
    price: '$ 24.5',
    cadence: CADENCE,
    // Spec gap: plans.md only gives Arc's monthly amount ("same pattern" for
    // Meridian). Placeholder of the same length as the annual price.
    monthly: '$ 29.5',
    cta: 'Start the Meridian plan',
    floatCta: 'Get Meridian',
    products: ['inbox', 'agents', 'pages', 'assistant'],
    includes: 'Everything in Arc, and also this:',
    features: [
      'The full Northstar Inbox, with AI triage switched on for all',
      'Lanes, labels and priority ranking that set themselves up for you.',
      'Reply drafts waiting in every thread, in your own words',
      'Look up and edit CRM contacts and deals from the side of any message.',
      'No limit on doc automations and every revision kept forever.',
      'Live embeds from issue trackers, code hosts and design files',
    ],
  },
  {
    key: 'federation',
    name: 'Federation',
    tier: 'custom',
    description: 'For companies that need audits, governance and a named partner.',
    price: 'Custom',
    cadence: '',
    monthly: null,
    cta: 'Talk to sales',
    floatCta: 'Talk to sales',
    products: ['inbox', 'agents', 'pages', 'assistant'],
    includes: 'Everything in Meridian, and also this:',
    features: [
      'Adoption and ROI reports',
      'Granular admin and security policy',
      'SAML single sign-on',
      'Role-based access controls',
      'Data loss prevention',
      'BYOK encryption',
      'Named success manager',
    ],
  },
]

export const highlightLabel = 'Most picked'
export const compareCta = 'See every plan side by side below'

// 1c
export const trustedHeading = 'Startups and global firms alike plan their days here'

// 2 testimonials (portrait bg = first manifest dominant colour; company
// wordmark size from the manifest)
export const testimonials = {
  title: 'What teams tell us after a few weeks on Northstar',
  items: [
    {
      quote:
        'The first week, I archived a backlog I had ignored for a year. By the second, my team was asking for seats. It is the rare tool people adopt without being told to.',
      name: 'Dana Morrow',
      role: 'COO, Tidewater',
      portraitBg: '#004878',
      company: { w: 161, h: 39 },
    },
    {
      quote:
        'We rolled out Pages for planning and Agents for writing, and support has been hands-on since day one. Questions get answered by people who clearly know our setup well.',
      name: 'Felix Bramwell',
      role: 'VP of Product, Copperleaf Labs',
      portraitBg: '#000000',
      company: { w: 111, h: 31 },
    },
    {
      quote:
        'Before approving anything, we ran Northstar through a full vendor review and it passed cleanly. Since launch, Inbox has cut response times for our analysts, and nobody wants the old setup back.',
      name: 'Sana Iqbal',
      role: 'Head of Security Engineering, Bellhaven',
      portraitBg: '#ffffff',
      company: { w: 119, h: 33 },
    },
  ],
}

// 3 comparison ---------------------------------------------------------------
export const comparisonTitle = 'Plans and features'
export const featureHeader = 'Feature'
export const betaLabel = 'Beta'

// Tooltip copy is hidden until hover; neutral 40-80 char sentences.
const TIPS = [
  'Hover any cell to see exactly what each plan unlocks for you.',
  'Full limits and regional notes live in our documentation hub.',
  'Works in the browser extension, desktop app and mobile apps.',
  'Workspace owners decide whether this is turned on for everyone.',
  'Allowances refresh per seat when each new billing cycle begins.',
]
let tipIndex = 0
const tip = () => TIPS[tipIndex++ % TIPS.length]

// Cell shorthand: C = check, _ = empty, string = text, [text, 'i'] = text + info.
const C = 'check'
const _ = null
// Row: [label, flags, seed, arc, meridian, federation]; flags: 'b' beta, 'i' info.
const row = ([label, flags = '', ...vals]) => ({
  label,
  beta: flags.includes('b'),
  info: flags.includes('i') ? tip() : null,
  values: vals.map((v) =>
    Array.isArray(v) ? { type: 'text', text: v[0], info: tip() } : v === C ? { type: 'check' } : v ? { type: 'text', text: v } : { type: 'empty' },
  ),
})
const section = (title, rows, info = false) => ({ title, info: info ? tip() : null, rows: rows.map(row) })

const TRIAL_CHAT = 'Full chat, limited-time trial'
const TRIAL_FEAT = 'Full feature, limited-time trial'
const TRIAL_TAIL = 'Full access, with customization on a trial basis'
const BRIEF = 'Trial only.'
const SOON = 'Coming soon'
const NL = 'Unlimited'
const FORMS = 'Your branding plus conditional steps'

export const comparison = [
  {
    key: 'assistant',
    title: 'Assistant',
    sections: [
      section('Features', [
        ['Available on web, desktop and mobile devices', '', C, C, C, C],
        ['Open as a full window, a side panel or in-line', '', C, C, C, C],
        ['Chat with AI on web, desktop and mobile devices', '', 'Core chat features', TRIAL_CHAT, TRIAL_CHAT, TRIAL_CHAT],
        ['Proactive next-step prompts', 'b', 'Limited access', TRIAL_FEAT, TRIAL_FEAT, TRIAL_FEAT],
        ['Cursor-side questions and answers', 'b', 'Limited access', TRIAL_FEAT, TRIAL_FEAT, TRIAL_FEAT],
        ['Thread organization', 'i', C, C, C, C],
        ['Extended thinking on complex, layered tasks', '', 'Limited', C, C, C],
        ['Proofread', '', 'Core grammar checks and in-line feedback', TRIAL_TAIL, TRIAL_TAIL, TRIAL_TAIL],
        ['Writing agents made by our own team', 'i', 'Limited', C, C, C],
        ['Writing agents that step in without prompting', 'i', _, BRIEF, BRIEF, BRIEF],
        ['Custom agents', 'b', _, ['Limited'], ['Extended'], 'All'],
        ['Publish agents to your team library', '', _, C, C, C],
        ['Adapt agents others shared', '', _, C, C, C],
        ['Email assistant', '', _, C, C, C],
        ['Connectors', 'i', _, ['Individual'], ['Team'], ['Federation']],
        ['API', '', _, C, C, C],
        ['Partner agents', '', _, C, C, C],
        ['Sync interval settings', '', _, SOON, SOON, SOON],
        ['Import volume limits', '', _, SOON, SOON, SOON],
      ]),
      section('Privacy', [['Model training', '', 'Opt-out', 'Opt-out', 'Opt-out', 'Off by default']]),
      section(
        'Usage',
        [
          ['Usage dashboard', '', SOON, SOON, SOON, SOON],
          ['Usage credits', '', _, BRIEF, BRIEF, BRIEF],
        ],
        true,
      ),
    ],
  },
  {
    key: 'agents',
    title: 'Agents',
    sections: [
      section('Writing features', [
        ['Grammar and spell check', 'i', C, C, C, C],
        ['Tone detection', 'i', C, C, C, C],
        ['Tone suggestions', 'i', 'Limited', C, C, C],
        ['Sentence rewrites', 'i', _, C, C, C],
        ['Flow and readability', 'i', _, C, C, C],
        ['Inclusive wording checks', 'i', _, C, C, C],
        ['Bibliography formatting', 'i', _, C, C, C],
        ['Prompt-based generation', 'i', 'Starter quota', 'Larger quota', 'Highest quota', 'Highest quota'],
        ['Translate whole passages, 19 languages', 'i', 'Limited', NL, NL, NL],
        ['Rewrite whole passages in any language', 'i', 'Limited', NL, NL, NL],
        ['Final-pass proofing agent', 'i', 'Limited', NL, NL, NL],
        ['AI detection agent', 'i', _, NL, NL, NL],
        ['Copied-text scanner agent', 'i', _, C, C, C],
        ['+more', '', _, _, _, _],
        ['Pages agent access', 'i', C, C, C, C],
      ]),
      section('Team features', [
        ['ROI report', 'i', _, _, _, C],
        ['Team writing health score', 'i', _, _, _, C],
        ['Style guide', 'i', _, '1', '1', NL],
        ['Brand voices', 'i', _, '1', '1', NL],
        ['Term glossary', 'i', _, C, C, C],
        ['Snippets', 'i', _, C, C, C],
        ['Analytics dashboard', 'i', _, 'Team analytics', 'Team analytics', 'Team and per-person analytics'],
      ]),
    ],
  },
  {
    key: 'inbox',
    title: 'Inbox',
    sections: [
      section(
        'AI',
        [
          'Ask AI',
          'Drafts that sound like you wrote them',
          'One-tap reply',
          'One-tap event',
          'Auto drafts',
          'Auto archive',
          'Auto labels',
          'Auto reminders',
          'Auto summary',
          'Autocorrect',
          'Autocomplete',
          'Custom auto labels',
        ].map((l) => [l, 'i', _, _, C, C]),
      ),
      section(
        'Email productivity',
        [
          'Focus lanes',
          'Snippets',
          'Remind me',
          'Snooze',
          'Unsubscribe',
          'Read statuses',
          'Quote reply',
          'Offline mode',
          'Open tracking',
          'Look up and edit customer records beside any open email',
        ].map((l) => [l, 'i', _, _, C, C]),
      ),
      section(
        'Calendar and meeting booking',
        ['Calendar', 'Bookable slots sent inside a message', 'Attach a video call link to any event with one shortcut'].map((l) => [
          l,
          'i',
          _,
          _,
          C,
          C,
        ]),
      ),
      section(
        'Team collaboration',
        [
          'Shared mail threads',
          'Team comments',
          'Shared drafts',
          'Seen-by indicators',
          'Who-is-replying alerts',
          'Team scheduling',
        ].map((l) => [l, 'i', _, _, C, C]),
      ),
    ],
  },
  {
    key: 'pages',
    title: 'Pages',
    sections: [
      section('Core', [
        ['Pages and objects', 'i', 'Limited for shared docs', NL, NL, NL],
        ['Pages AI writer', 'bi', BRIEF, C, C, C],
        ['Databases', 'bi', _, _, C, C],
        ['AI-generated views', 'bi', BRIEF, C, C, C],
        ['Automations', 'i', 'Low limit', 'Higher limit', NL, NL],
        ['Attachments', 'i', '1 GB per doc', '5 GB per doc', NL, NL],
        ['Connectors', 'i', 'Manual refresh', 'Daily refresh', 'Hourly refresh', 'Hourly refresh'],
        ['Forms', 'i', NL, FORMS, FORMS, FORMS],
        ['Linked docs', 'i', 'Simple linked-doc tables', 'Linked-doc tables', 'Linked tables and actions', 'Linked tables and actions'],
        ['Version history', 'i', '7 days', '30 days', NL, NL],
        ['Desktop and mobile apps', 'i', C, C, C, C],
        ['API', 'i', BRIEF, C, C, C],
      ]),
      section('Collaboration and sharing', [
        ['Real-time collaboration', 'i', C, C, C, C],
        ['Page and folder sharing', 'i', C, C, C, C],
        ['Synced blocks', 'i', C, C, C, C],
        ['Unlisted docs', 'i', _, C, C, C],
        ['Custom domains', 'i', _, C, C, C],
        ['Locking', 'i', _, _, C, C],
        ['Field-level locks', 'i', _, _, C, C],
        ['Required approval steps', 'i', _, _, C, C],
      ]),
      section('Workspace features', [
        ['Unlimited folders', 'i', C, C, C, C],
        ['Custom icons', 'i', _, C, C, C],
        ['Folder permissions', 'i', _, _, C, C],
        ['Subfolders', 'i', _, _, C, C],
        ['Readership analytics', 'i', _, _, _, C],
        ['Domain capture', 'i', _, _, _, C],
      ]),
    ],
  },
  {
    key: 'suite',
    title: 'Across the suite',
    sections: [
      section('Support and success', [
        ['Help center', 'i', C, C, C, C],
        ['Webinars and training', 'i', C, C, C, 'Private'],
        ['Customer success', 'i', _, _, _, 'Dedicated'],
        ['Priority support', 'i', _, _, C, C],
        ['Live chat', 'i', _, _, _, C],
        ['Guided onboarding', 'i', _, _, _, C],
      ]),
      section('Security, compliance, and admin controls', [
        ['SAML SSO', 'i', _, _, _, C],
        ['SCIM', 'i', _, _, _, C],
        ['SOC 2 Type II', 'i', _, _, _, C],
        ['Audit logs', 'i', _, _, _, C],
        ['Organization-wide controls', 'i', _, _, _, C],
        ['HIPAA', 'i', _, _, _, 'Agents, Pages, Assistant only'],
        ['Legal hold and e-discovery', 'i', _, _, _, 'Pages only'],
        ['BYOK', 'i', _, _, _, 'Agents and Inbox only'],
      ]),
    ],
  },
]

export const moreLink = 'More'
