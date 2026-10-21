// /enterprise placeholder copy (specs/enterprise.md). Neutral placeholders of
// the original lengths; nothing is taken from the original site.

export const hero = {
  eyebrow: 'Northstar at company scale',
  title: 'One AI layer across mail, docs and every app you run.',
  body: 'Large organizations pile up dozens of disconnected tools and a handful of stalled AI pilots. Northstar swaps that sprawl for one well-governed suite that employees actually enjoy and security teams can audit.',
  cta: 'See a demo',
}

export const logosIntro = 'Picked by operators, engineers and sellers worldwide'

export const intro = {
  title: 'Four apps, one admin console, and a shared memory of your work',
  body: 'Assistant, Agents, Pages and Inbox share context with one another, so employees copy and paste less and IT gets one place to set policy and watch usage.',
}

// 4-7 (media sizes: 4:3, cover, radius 0). `art` reuses a homepage illustration.
export const features = [
  {
    title: 'A helper that speaks up first',
    body: 'Northstar Assistant watches the calendars, inboxes and files your team uses, then raises a hand when something needs attention: a missed reply, a deadline clash, a file someone needs.',
    bullets: [
      'Raises the context people need before a meeting',
      'Tracks promises made across chat, mail and calls',
      'Finds a file, answers the question, and takes the next action',
    ],
    link: { label: 'Learn more' },
    media: { id: 'ent-feature-assistant', art: 'media-agent-chat', bg: '#f0f0f0', className: 'aspect-[4/3]' },
  },
  {
    title: 'Helpers inside the tools your team currently pays for',
    body: 'Instead of yet another tab, Northstar Agents show up in email clients, CRMs and editors, giving each employee assistance in the context of the task.',
    bullets: [
      'Shares context between apps so helpers stay up to date.',
      'Handles hand-offs among trackers, CRMs, calendars and mail',
      'Plugs into hundreds of services without custom engineering',
    ],
    link: { label: 'Explore agents' },
    media: { id: 'ent-feature-agents', art: 'media-agent-wide', bg: '#d8f0f0', className: 'aspect-[4/3]' },
  },
  {
    title: 'Where plans really get done',
    body: 'Northstar Pages turns scattered spreadsheets, specs and status reports into one AI-assisted workspace, so teams debate the decision instead of hunting for the latest version of a file.',
    bullets: [
      'Goals, specs and progress kept in one place everyone can see',
      'Tables that refresh from your live systems',
      'Hands repetitive upkeep to automations, not people.',
    ],
    link: { label: 'Browse Pages' },
    media: { id: 'ent-feature-pages', art: 'media-pages-ai', bg: '#ffffff', className: 'aspect-[4/3]' },
  },
  {
    title: 'An inbox that triages itself for every employee',
    body: 'Northstar Inbox ranks what is urgent, has a draft waiting for the routine stuff, and lets colleagues weigh in privately.',
    bullets: [
      'Important senders up top, bulk mail out of view',
      'Gentle nudges when someone has not written back',
      'Comment on a draft together before it goes out',
    ],
    link: { label: 'Browse Inbox' },
    media: { id: 'ent-feature-inbox', art: 'media-inbox-split', bg: '#ffffff', className: 'aspect-[4/3]' },
  },
]

export const ctaBand = { title: 'Get an estimate of the hours your org could recover', cta: 'See a demo' }

// 9 (1:1)
export const builder = {
  title: 'Turn every repeatable process into a helper',
  body: 'Inside Assistant, a visual builder lets ops, sales and HR teams assemble their own helpers from plain-language instructions, then make them available in whichever tools people already use.',
  bullets: [
    'Start from a plain description, or code it with the SDK.',
    'Publish once and it appears in every app at once.',
    'Pick up proven helpers from a library other teams share',
  ],
  link: { label: 'Try the agent builder' },
  media: { id: 'ent-feature-builder', art: 'media-agent-app', bg: '#ffffff', className: 'aspect-square' },
}

export const security = {
  title: 'Ready for your vendor questionnaire',
  body: 'Security reviews tend to stall AI rollouts. We publish our controls, undergo regular third-party audits, encrypt everything in transit and at rest, and give admins the logs they need, so procurement can move ahead without months of back-and-forth email.',
  items: [
    { title: 'Keys you control', body: 'Revoke access to stored data anytime.' },
    { title: 'Adoption and value data', body: 'See which teams use AI and what it is worth to you' },
    { title: 'Central policy controls', body: 'Turn features on or off by group in one console.' },
    { title: 'SAML single sign-on', body: 'Use the identity provider your company runs today' },
    { title: 'Fine-grained roles and access', body: 'Grant exactly the rights each department needs' },
    { title: 'Audited against key standards', body: 'Third-party reports ready for your review team' },
  ],
  link: 'Visit the Northstar trust center',
}

export const resources = {
  title: 'Reading for IT and ops leaders',
  report: {
    title: 'Shadow Stacks: What Happens When Employees Pick Their Own AI Tools',
    body: 'We surveyed thousands of knowledge workers about the unofficial apps they lean on. The results reveal hidden costs, real security gaps, and a clear path for leaders who want AI spending to pay off.',
    link: { label: 'Read the report' },
    media: { id: 'ent-report', bg: '#301860', className: 'aspect-[624/488] rounded-8' },
  },
  cards: [
    { title: 'From Pilot to Habit: Making AI Stick at Work', cta: 'Learn more', media: { id: 'ent-resource-1', bg: '#481818' } },
    { title: 'A CIO Field Manual for AI', cta: 'Learn more', media: { id: 'ent-resource-2', bg: '#481818' } },
    {
      title: 'Counting the Hours: A Practical AI ROI Model',
      cta: 'Learn more',
      media: { id: 'ent-resource-3', bg: '#301860', className: 'aspect-[592/395]' },
    },
    { title: 'Writing an AI Policy People Will Follow', cta: 'Learn more', media: { id: 'ent-resource-4', bg: '#481818' } },
  ],
}

export const quotes = {
  title: 'What customers tell us',
  items: [
    {
      quote:
        '“We evaluated five vendors. Northstar was the one whose engineers joined our calls, fixed issues within days, and asked what we needed next. Agents and Pages are now part of how our whole company plans.”',
      name: 'Imani Castillo',
      role: 'Senior VP of Workplace Technology at Redwater Group',
      logo: { id: 'ent-quote-logo-1' },
    },
    {
      quote:
        '“Our support reps answer hundreds of emails a day. After switching to Northstar Inbox, first-response times dropped and the team stopped dreading Monday mornings. I would not go back.”',
      name: 'Leo Hartmann',
      role: 'Former Head of Customer Support at Pinecrest Travel',
      logo: { id: 'ent-quote-logo-2' },
    },
  ],
}

// 17 FAQ: answers are arrays of paragraphs. A paragraph may be
// [before, linkText, after] for an inline link.
export const faq = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'Which apps come with an enterprise contract?',
      a: [
        'An enterprise agreement includes Assistant, Agents, Pages and Inbox for every licensed seat, along with the admin console, usage reporting, priority support and a dedicated success manager.',
        'You can also choose which apps each department receives. Some customers start with Pages for planning teams and add Inbox for sales later, all under one contract and invoice.',
      ],
    },
    {
      q: 'What audits has Northstar passed?',
      a: [
        'Northstar completes a SOC 2 Type II audit every year and holds ISO 27001 certification for its hosting platform.',
        'Your security team can request the full audit reports, our latest penetration test summary and a completed standard questionnaire through the trust center. We also sign a data processing agreement and answer custom questionnaires during procurement, usually within two weeks.',
      ],
    },
    {
      q: 'Can we provision and remove users automatically via SCIM?',
      a: [
        'Yes. SCIM provisioning is available on enterprise plans, so new hires get seats on day one and departing staff lose access as soon as HR offboards them.',
        'Group membership in your directory can map to roles inside Northstar, which keeps permissions in sync without manual work. Setup guides cover the most common directories, and our onboarding engineers can join a call to walk your IT team through it.',
      ],
    },
    {
      q: 'Which regions host our workspace, and who holds the keys?',
      a: [
        'Workspaces are hosted with major cloud providers in the United States, the European Union or Australia, chosen during setup.',
        'All content is encrypted with AES-256 at rest and TLS 1.2 or later in transit. Enterprise customers can supply their own encryption keys and revoke them whenever they choose.',
      ],
    },
    {
      q: 'Will Northstar work with the identity system we already run?',
      a: [
        'Northstar supports SAML 2.0 and OpenID Connect, so it works with nearly every modern identity provider. Admins can require single sign-on for all members, enforce session timeouts, and restrict access to approved devices. Most teams finish setup in an afternoon.',
        'If you run a less common provider, our team will help test the connection first.',
      ],
    },
    {
      q: 'Which operating systems and browsers are supported?',
      a: [
        'Northstar runs on macOS, Windows, iOS and Android.',
        'Browser extensions are available for Chrome, Edge, Firefox, Safari and Arc.',
        'Settings and drafts sync across devices instantly, so you can start a reply on a laptop and finish it on your phone without losing a word along the way.',
        'Admins can limit which clients are allowed, for example blocking mobile access for certain roles, and can remotely sign people out of a lost device from the console in a few clicks.',
        'Offline mode keeps recent mail and documents available on flights and in spotty coverage, then syncs your changes once you reconnect.',
        'Accessibility matters to us. The apps support screen readers, full keyboard navigation and adjustable text sizes, and we test each release against current WCAG guidelines before it ships.',
      ],
    },
    {
      q: 'How do enterprise contracts and seat pricing work?',
      a: [
        'Enterprise pricing is per seat with an annual commitment, and volume discounts begin at 250 seats.',
        'Talk to sales for a quote. Most proposals include a paid pilot so you can measure results before scaling up.',
      ],
    },
    {
      q: 'Is anything we write used to improve shared AI models?',
      a: [
        'No. Content your organization creates in Northstar is never used to train models that serve other customers, and our AI providers are contractually barred from retaining your prompts or outputs. Admins can review which features call external models, disable any of them, and download logs showing exactly what data was sent and when, which helps during audits.',
      ],
    },
    {
      q: 'What does a typical rollout look like for a company of 5,000 people?',
      a: [
        'Most large rollouts happen in waves, starting with a pilot group of 50.',
        [
          'During the pilot we set baseline metrics, run live training sessions, and gather feedback to tune default settings. You can read ',
          'the full enterprise rollout guide',
          ' for timelines, checklists and sample emails.',
        ],
      ],
    },
    {
      q: 'Can our data stay within a specific country?',
      a: [
        'Yes. Enterprise customers can pin all workspace content, backups and search indexes to a single region, currently the United States, the European Union or Australia. AI processing for those workspaces also stays in-region. If your company needs a location we do not yet offer, tell our sales team, since new regions are prioritized by demand.',
      ],
    },
  ],
}

export const finalCta = {
  title: 'Simple to adopt. Straightforward to govern.',
  body: 'Give every employee a capable assistant while IT keeps the keys to the kingdom.',
  cta: 'See a demo',
}
