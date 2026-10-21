// Placeholder copy for the fictional "Northstar" brand (CLONE_SPEC.md).
// Lengths approximate the original character counts given in the spec.

// 1.1 Desktop nav + dropdowns
export const navItems = [
  {
    label: 'Products',
    items: ['Northstar app', 'Agents', 'Mail', 'Calendar', 'Docs', 'Shortcuts', 'Download desktop'],
  },
  {
    label: 'Solutions',
    columns: [
      { title: 'By department', items: ['Sales', 'Marketing', 'Support', 'Engineering', 'Recruiting', 'Leadership'] },
      { title: 'Use cases', items: ['Meetings', 'Email triage', 'Writing', 'Scheduling', 'Research'] },
    ],
  },
  {
    label: 'AI',
    columns: [
      { title: 'Agents', items: ['Helper deck', 'Ask-anywhere', 'Live margin notes', 'Helper studio'] },
      { title: 'AI features', items: ['Smart replies', 'Auto drafts', 'Summaries'] },
    ],
  },
  {
    label: 'Resources',
    items: ['Getting started', 'Customer stories', 'Help center', 'Product tour', 'Deep work playbook', 'Press', 'Webinars'],
  },
  {
    label: 'Pricing',
    items: ['All pricing', 'Team', 'Plus', 'Enterprise plans'],
  },
  { label: 'Blog', href: '#' },
]

// 1.2 Sign-in product menu
export const signInProducts = [
  { title: 'Agent', desc: 'Helpers across all your tools' },
  { title: 'Inbox', desc: 'Email triaged before you look' },
  { title: 'Pages', desc: 'Shared docs with a co-writer' },
]

// 3.2 Hero slides
export const heroNavHeading = 'Pick a tool. Keep your focus.'
export const heroSlides = [
  {
    id: 'inbox',
    end: '#281647',
    navTitle: 'Inbox',
    navDesc: 'Triage a full morning of mail in minutes',
    name: 'Northstar Inbox',
    tagline: 'Mail that sorts itself first',
    cta: 'Get Inbox',
    asset: { id: 'hero-video-1', bg: '#281647' },
  },
  {
    id: 'agent',
    end: '#0c4243',
    navTitle: 'Agent',
    navDesc: 'A second pair of hands in each open tab.',
    name: 'Northstar Agent',
    tagline: 'Help that follows your cursor',
    cta: 'Try Agent',
    asset: { id: 'hero-video-2', bg: '#0c4243' },
  },
  {
    id: 'pages',
    end: '#421d24',
    navTitle: 'Pages',
    navDesc: 'Docs that people and AI co-author',
    name: 'Northstar Pages',
    tagline: 'From rough notes to a signed-off plan',
    cta: 'Try Pages',
    asset: { id: 'hero-video-3', bg: '#421d24' },
  },
]

// 4. Logo strip
export const logoIntro = 'From small startups to global firms, teams run on Northstar'

// 5. Agent group
export const agent = {
  intro: {
    lockup: { id: 'lockup-agent', name: 'Northstar Agent', width: 195 },
    title: 'A helper in the margin of everything you do',
    body: 'No new app to learn. Northstar Agent sits quietly inside your existing tools and steps in when it can help.',
    cta: 'Try Agent',
  },
  wide: {
    label: 'Live margin notes',
    body: 'Northstar leaves small notes in the margin when a claim looks shaky, a date clashes, or a tone runs hot.',
  },
  pair: [
    { label: 'Ask-anywhere', body: 'Highlight anything, ask a question, get the answer in place.' },
    { label: 'Helper deck', body: 'Hand off a batch of jobs and watch them finish at once.' },
  ],
}

// 5.4 Feature tabs (5 panels x 3 cards)
export const featureTabs = [
  {
    label: 'Featured',
    cards: [
      { bold: 'Tune the suggestions', rest: ' to your taste', body: 'Dismiss a suggestion once and Northstar remembers, so the next round of notes is quieter.' },
      { bold: 'Answer anywhere', rest: ' in your tools', body: 'Northstar reads the thread, checks your files and calendar, then proposes a reply to send.' },
      { bold: 'Catch asks', rest: ' in any thread', body: 'Every request aimed at you lands in a checklist that shows who asked and by when.' },
    ],
  },
  {
    label: 'Before the meeting',
    cards: [
      { bold: 'Show up ready', rest: ' for every single call', body: 'A one-screen dossier lists who is joining, what they care about, and open questions.' },
      { bold: 'Sketch an agenda', rest: ' in a moment', body: 'Scraps from chats and docs become a running order that everyone can comment on.' },
      { bold: 'Close the loop', rest: ' when it wraps', body: 'Decisions, owners and deadlines land in a recap that is waiting before you stand up.' },
    ],
  },
  {
    label: 'Drafting desk',
    cards: [
      { bold: 'Keep your own voice, quirks and all,', rest: ' in every draft', body: 'Northstar studies the phrases you reach for most, so its suggestions read like something you would type.' },
      { bold: 'Cut the fluff', rest: ' and keep what matters', body: 'Turn a rambling update into three crisp lines that still carry the whole story.' },
      { bold: 'Catch slips', rest: ' before send', body: 'Misspelled names, wrong dates and clumsy sentences get flagged early on.' },
    ],
  },
  {
    label: 'Email on autopilot',
    cards: [
      { bold: 'Rank what matters', rest: ' without rules', body: 'Mail from people you work with stays front and center; bulk senders wait their turn.' },
      { bold: 'Start the day', rest: ' with drafts done', body: 'Overnight, routine questions get answers queued up for a quick approval.' },
      { bold: 'Park any thread', rest: ' for a while', body: 'Set it aside and Northstar resurfaces it the moment it starts to matter again.' },
    ],
  },
  {
    label: 'Helper studio',
    cards: [
      { bold: 'Describe it, deploy it', body: 'Write a few sentences about a chore you repeat each week and get a helper that handles it.' },
      { bold: 'Pass it along', body: 'Post a helper to your workspace library and colleagues can put it to work instantly.' },
      { bold: 'Plug in your stack', body: 'Give helpers read access to calendars, files and chat so their answers fit your work.' },
    ],
  },
]

// 6. Testimonial
export const testimonial = {
  before: '“Mornings were lost to email. Now I can ',
  bold: 'start real work by nine',
  after: '. The triage is done before I even sit down with my first coffee.”',
  name: 'Tomás Lindgren',
  role: 'Head of Operations, Field Services, Coastal Freight Group',
  cta: 'View all customer stories',
}

// 7. Inbox bento
export const inbox = {
  intro: {
    lockup: { id: 'lockup-inbox', name: 'Northstar Inbox', width: 208 },
    title: 'Get your mornings back',
    titleSub: 'from mail and meetings',
    body: 'Northstar Inbox reads ahead, sorts the pile and drafts the easy answers, leaving you the hard ones.',
    cta: 'Get Inbox',
  },
  cardA: {
    label: 'Ghostwriter',
    body: 'Open a message and a reply is already waiting, phrased the way you would say it. Tweak a word, then send.',
  },
  cardB: {
    label: 'Bookable time slots',
    body: 'Paste a few open windows into a message; the other person picks one and it is set.',
  },
  cardC: {
    label: 'Focus lanes',
    body: 'Mail flows into lanes you define, such as customers, teammates and alerts, so you handle one kind at a time.',
  },
}

// 8. Pages group
export const pages = {
  intro: {
    lockup: { id: 'lockup-pages', name: 'Northstar Pages', width: 211 },
    title: 'Decide together',
    titleSub: 'in docs that draft alongside you',
    body: 'Northstar Pages gives each project a living document: specs, meeting notes and roadmaps sit side by side, AI drafts what is missing, and comments turn into decisions that stay on record.',
    cta: 'Try Pages',
  },
  wide: {
    label: 'Pages',
    body: 'Open an empty doc or pick a starter, and AI sketches the outline, fills in tables and tidies the headings.',
  },
  pair: [
    { label: 'Outliner', body: 'Type a rough request and get back a page with real shape.' },
    { label: 'Live sync', body: 'Tickets, files and status updates flow in from other tools and stay current.' },
  ],
}

// 9. Enterprise
export const enterprise = {
  eyebrow: 'Northstar at company scale',
  title: 'Easy for every user, sound for every audit',
  body: 'Roll out AI across departments with the access controls, audit trails and support a large company needs.',
  cta: 'Request a demo',
}

// 10. Final CTA
export const finalCta = { title: 'Clear the decks. Do the work.', cta: 'Get started' }

// 11. Footer
export const footer = {
  title: 'Building calmer tools for busy teams',
  columns: [
    {
      title: 'Products',
      links: ['Northstar Agent', 'Northstar Inbox', 'Northstar Pages', 'Desktop app', 'Mobile app', 'Integrations', 'Pricing'],
    },
    {
      title: 'Company',
      links: [
        'About', 'Careers', 'Blog', 'Press', 'Customers', 'Partners', 'Security', 'Status',
        'Events', 'Newsroom', 'Brand', 'Contact', 'Help center', 'Community',
      ],
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy policy', 'Subprocessors', 'Customer data processing addendum', 'Responsible use policy'],
      cookieButton: 'Cookie preferences',
    },
    {
      title: 'Connect',
      social: ['LinkedIn', 'X', 'TikTok', 'Instagram', 'Threads', 'Facebook'],
    },
  ],
}
