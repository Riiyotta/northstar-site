// /mail copy deck (specs/mail.md 14). Independently written Northstar copy.
// Inline spans: `brand` -> text-action (#714cb6 / #d4c7ff), `hl` -> text-highlight.

export const hero = {
  h1a: 'Mail that moves at your pace',
  h1b: 'for every team',
  p1: 'Northstar Inbox turns a crowded mailbox into a calm daily plan.',
  p2: 'Built for people who reply fast and think in priorities.',
  cta: 'Get started',
}

export const logosIntro = 'Teams that run on us'

export const stat = {
  l1: 'Across our customers, Inbox sorted',
  hl: '2.4 billion notes',
  l2: ' without a backlog.',
}

export const problem = {
  h2a: 'Your inbox is ',
  h2b: 'a to-do list other people keep editing',
  p1: 'Requests, alerts and introductions all arrive in one stream with equal weight. Sorting that stream by hand quietly eats the focus you meant to give the real work.',
  p2: 'Northstar Inbox gives the stream a shape, so the first screen you see each morning is the one that matters.',
}

// [before, brand span, after]
export const pillars = [
  { id: 'mail-pillar-icon-1', className: 'h-[81px] w-[78px]', parts: ['Open each morning with ', 'a short queue', ', not a pile'] },
  { id: 'mail-pillar-icon-2', className: 'h-[81px] w-[78px]', parts: ['Hit ', 'fewer surprises', ' hiding in long threads'] },
  { id: 'mail-pillar-icon-3', className: 'h-[79px] w-[77px]', parts: ['', 'Hand off cleanly', ' at every shift end'] },
]

export const compat = {
  a: 'Plugs straight',
  b: ' into your ',
  c: 'Wrenmail',
  d: ' or ',
  e: 'Driftpost',
}

// Split feature rows (mail.md 8). `lead`: the brand span comes first.
// media: mail.assets.json ids; bg = the section bg the art sits on.
const FEATURE_BG = '#f7f5f2'
const feature = (id) => ({ id, bg: FEATURE_BG, className: 'aspect-[720/627]' })

export const featuresA = [
  {
    h2a: 'Delegate ',
    h2b: 'to Pilot mode',
    lead: false,
    sub: 'House rules written in plain words',
    body: [
      'Tell Pilot how you like things handled: file every receipt, flag anything from legal, decline cold pitches politely, nudge me if a client goes quiet. Pilot applies those rules the moment mail arrives and keeps a running log of each action, so you can review what happened and undo any step.',
      'Skim the log once a day and tweak the rules as your role changes.',
    ],
    link: 'See more',
    media: feature('mail-feature-ai'),
  },
  {
    h2a: 'Morning Brief,',
    h2b: ' ready before your coffee',
    lead: true,
    sub: 'One page that sums up the night shift',
    body: [
      'Colleagues in other time zones keep working while you sleep. Instead of facing forty unread threads, you get a single page that groups overnight activity by project, notes what was decided, and lists the replies waiting on you.',
      'Choose which senders and labels feed the brief, pick the hour it lands, and open any line to jump straight into the full conversation. Forward it to a teammate who is covering for you, and they start the day with exactly the same picture of what changed and what is due.',
    ],
    media: feature('mail-feature-split'),
  },
  {
    h2a: 'Pin what ',
    h2b: 'matters this week',
    lead: false,
    sub: 'A shelf above your inbox',
    body: [
      'Contracts under review, travel plans, a five-person hiring loop: some threads need to stay in sight for days. Pin them to the shelf and they sit above everything else on every device, then quietly unpin themselves once the thread is marked done.',
      'Drag pins into the order you think in, give each one a colour, and share a whole shelf with the person covering your accounts while you are away. They see the same priorities without a long handover document.',
    ],
    media: feature('mail-feature-reminder'),
  },
  {
    h2a: 'Shared drafts',
    h2b: ' for your hardest replies',
    lead: true,
    sub: 'Write the sensitive ones as a group',
    body: [
      "A refund dispute, a press question, a note to a board member: some messages are too important to send on one person's judgement.",
      'Open the draft to colleagues and watch their cursors appear. Suggestions show inline, and nobody has to copy text into a chat.',
      'Add an approval step for messages that touch legal or finance. The draft stays locked until a named reviewer signs off, and the final version keeps a record of who changed what, which helps when someone asks later.',
    ],
    media: feature('mail-feature-comments'),
  },
  {
    h2a: 'Protect ',
    h2b: 'all your deep-work hours',
    lead: false,
    sub: 'Your mail waits while you concentrate',
    body: [
      'Deep focus rarely ends with a bang. It ends with one small ping after another.',
      'Quiet hours hold back anything that is not urgent until your focus block ends, then hand you a tidy summary. A short VIP list can always break through, so nothing critical waits on you.',
      'Turn on quiet hours for a team during a launch week. Your status shows colleagues you are heads-down, and blocks sync with your calendar, so meetings and mail stop competing for the same time.',
    ],
    media: feature('mail-feature-snippets'),
  },
]

const GRID_ASPECT = 'aspect-[480/308]'
export const grid = [
  { title: 'Translate any thread instantly', media: { id: 'mail-grid-send-later', bg: '#a8c8f8', className: GRID_ASPECT } },
  { title: 'Read a long thread as a recap', media: { id: 'mail-grid-quick-reply', bg: '#e8e8f8', className: GRID_ASPECT } },
  { title: 'Archive a whole sender in one go', media: { id: 'mail-grid-snooze', bg: '#6878e8', className: GRID_ASPECT } },
  { title: 'Attach files from any cloud drive', media: { id: 'mail-grid-shortcuts', bg: '#6878e8', className: GRID_ASPECT } },
  { title: 'Set an away reply in seconds', media: { id: 'mail-grid-profile', bg: '#6878e8', className: GRID_ASPECT } },
  { title: 'Search by what you remember', media: { id: 'mail-grid-unsubscribe', bg: '#a8c8f8', className: GRID_ASPECT } },
]

export const featuresB = [
  {
    h2a: 'Stay easy to reach',
    h2b: ' on the road too',
    lead: true,
    sub: 'Light mail for patchy wifi',
    body: [
      'Travel mode trims images and attachments so messages load on the weakest signal.',
      'Replies queue offline and send in order once you land. Your away note switches on automatically when your calendar shows a flight, and switches off when you check in at the hotel.',
      'Teammates see a small plane next to your name, so they know a slower answer is expected rather than ignored.',
    ],
    media: feature('mail-feature-opens'),
  },
  {
    h2a: 'Tone check',
    h2b: ' pre-send',
    lead: true,
    sub: 'Catch any sharp edge in advance',
    body: [
      'Late in the day it is easy to write something that reads colder than you meant. Tone check highlights phrases that may land badly with the reader, explains why in a single line, and offers a warmer alternative you can accept with one click or ignore if the bluntness is on purpose.',
      'It runs entirely locally on your draft, and nothing is stored once you hit send.',
    ],
    media: feature('mail-feature-autocorrect'),
  },
  {
    h2a: 'Hand off threads',
    h2b: ' with context',
    lead: true,
    sub: 'Nobody has to start from zero',
    body: [
      'Accounts change hands when people go on leave, switch teams or move on. The new owner usually inherits a stack of threads and no idea which promises were made, which questions are still open, or who on the other side matters most.',
      'A handoff note travels with every reassigned thread: a short summary, open commitments and key contacts, written by AI and checked by the outgoing owner.',
    ],
    media: feature('mail-feature-presence'),
  },
  {
    h2a: 'Capture receipts',
    h2b: ' without any typing',
    lead: true,
    sub: 'Totals land right in your expense sheet',
    body: [
      'Receipts arrive by mail, get buried, and resurface at month end.',
      'Inbox spots receipts and invoices as they come in, reads the vendor, amount and date, and adds a row to the expense sheet you choose. Anything it is unsure about waits in a small review list for you.',
    ],
    link: 'See more',
    media: feature('mail-feature-calendar'),
  },
  {
    h2a: 'Tame newsletters',
    h2b: ' into one calm weekly read',
    lead: true,
    sub: 'A single digest instead of forty pings',
    body: [
      'Subscriptions are worth keeping until they bury the rest. Inbox moves them out of the main view and gathers every issue into one weekly digest, with the opening lines of each so you can decide what to read.',
      'Unsubscribe straight from the weekly digest, or mark a favourite so its new issues still show up the moment they are published.',
    ],
    media: feature('mail-feature-event'),
  },
]

export const quotes = {
  title: 'Notes from teams who made the switch',
  items: [
    {
      quote:
        'We run a twelve-person studio and every client used to email everyone. Pilot rules sort that out before any of us look, and the Morning Brief means our designers start the day sketching instead of digging through threads.',
      name: 'Morgan Ashcroft',
      role: 'CEO of Fieldkit',
      logo: { id: 'mail-quote-logo-1', fallback: 'logo-7' },
      avatar: { id: 'mail-quote-avatar-1', bg: '#588898' },
    },
    {
      quote:
        'Handoffs used to cost us a week of catch-up after any leave. Now the notes are already waiting on each thread, and our customers barely notice that the person answering them has changed.',
      name: 'Riley Okafo',
      role: 'Senior Director of Client Success at Lumena',
      logo: { id: 'mail-quote-logo-2', fallback: 'logo-8' },
      avatar: { id: 'mail-quote-avatar-2', bg: '#887868' },
    },
  ],
}

export const cta = {
  title: 'Bring your team to a calmer inbox today',
  btn1: 'Get started',
  btn2: 'Contact sales',
}
