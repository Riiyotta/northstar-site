// /docs copy deck (specs/docs.md 15). Independently written Northstar copy.

export const hero = {
  h1: 'Every plan your team writes, alive in one page',
  p: 'Draft, decide and track in shared pages that an AI teammate keeps tidy.',
  cta1: 'Start using Pages',
  cta2: 'See a demo',
}

export const proof = 'Picked by product, ops and design teams alike'

export const ai = {
  title: 'An editor that builds back',
  body: 'Describe the thing you need, be it a hiring tracker, a status table or a launch checklist, and Pages AI lays it out with columns, owners and buttons your team can use.',
  media: { id: 'docs-ai-tracker', art: 'media-pages-wide', bg: '#421d24', className: 'aspect-[720/513]' },
  cards: [
    {
      id: 'docs-ai-icon-1',
      title: 'Outlines that grow from one sentence',
      body: 'Start with a single line about the goal. Pages proposes sections, headings and open questions, and you keep only what helps.',
    },
    {
      id: 'docs-ai-icon-2',
      title: 'Formula help for people who hate formulas',
      body: 'Ask for a running total or a deadline flag in plain words and the right formula appears in the column, explained in a note.',
    },
    {
      id: 'docs-ai-icon-3',
      title: 'Mini-apps you assemble just by describing them',
      body: 'A vote button, a sign-up sheet, a small approval flow: say what it should do and it lives right inside the page from that moment on.',
    },
  ],
}

export const band = { title: 'Your next kickoff deserves a better home than chat', cta: 'Start using Pages' }

const SURFACE = 'aspect-[3/2]'
export const surface = {
  title: 'Four ways teams use a single page',
  body: 'The same canvas stretches from a one-line idea to the system a whole department runs on daily.',
  cards: [
    {
      title: 'Briefs that update',
      body: 'Specs and briefs pull in live numbers and task status, so the document never drifts from what is true.',
      cta: 'Learn more',
      media: { id: 'docs-surface-docs', bg: '#f2f0ea', className: SURFACE },
    },
    {
      title: 'Sprint launch board',
      body: 'Columns for every stage, cards for every task, and a timeline view for all the people who think in weeks rather than in sticky notes.',
      cta: 'Learn more',
      media: { id: 'docs-surface-projects', bg: '#f2f0ea', className: SURFACE },
    },
    {
      title: 'Answers desk',
      body: 'Collect policies and how-tos in one place. New colleagues ask a question in plain language and get a reply that points to the exact paragraph.',
      cta: 'Learn more',
      media: { id: 'docs-surface-hub', bg: '#f2f0ea', className: SURFACE },
    },
    {
      title: 'Requests',
      body: 'Turn a form into a queue with owners, due dates and automatic reminders, so requests stop arriving as stray messages in five channels.',
      cta: 'Learn more',
      media: { id: 'docs-surface-workflows', bg: '#f2f0ea', className: SURFACE },
    },
  ],
}

export const hubs = {
  title: 'Starter spaces your departments could adopt',
  body: 'Copy a template, rename a few things, and it is yours by lunch.',
  cards: [
    { id: 'docs-hub-icon-1', title: 'Design', body: 'Critique boards, asset lists and review dates in one shared spot.', link: 'Design team hub' },
    { id: 'docs-hub-icon-2', title: 'Growth', body: 'Experiment logs with the results that update by themselves.', link: 'Growth team hub' },
    { id: 'docs-hub-icon-3', title: 'Revenue', body: 'Territory plans and forecast tables that the whole region can edit.', link: 'Revenue hub' },
    { id: 'docs-hub-icon-4', title: 'People', body: 'Onboarding checklists, policies and open roles for every team.', link: 'People team hub' },
  ],
}

export const quote = {
  text: '“Our weekly planning call shrank from an hour to fifteen minutes, since everyone arrives having read the same page already.”',
  name: 'Avery Lindqvist P.',
  role: 'PM at Harborly',
  link: 'Read more customer stories',
}

export const stack = {
  title: 'Your other apps, finally on speaking terms',
  body: 'Bring tickets, design files and customer records into the page where decisions get made. People stop pasting screenshots, and the AI can see the full picture.',
}

export const integrations = {
  title: 'Live two-way sync',
  body: 'Link a row to an issue in your tracker or a deal in your CRM and the fields stay matched in both directions. Change a status here and it changes there; close a ticket there and the page reflects it. You can also trigger actions, like opening an issue, from inside the table.',
  media: { id: 'docs-integrations', art: 'media-pages-connect', bg: '#f7f5f2', className: 'aspect-[720/582]' },
}

export const connector = {
  title: 'Open to any AI you already prefer',
  body: 'Add Pages as a connector in the AI tools your team already prefers. Assistants can read the pages you allow, draft new ones and update tables, while admins decide exactly which spaces stay off limits and review a log of every change made.',
  link: { label: 'Learn more' },
  media: { id: 'docs-connector', art: 'media-pages-ai', bg: '#f7f5f2', className: 'aspect-[720/563]' },
}

export const suite = {
  title: 'Four Northstar apps, one workspace',
  body: 'All of them share one account, data and search.',
  cards: [
    {
      id: 'docs-suite-icon-assistant',
      size: 'size-[74px]',
      title: 'Northstar Assistant answers inside any app you open',
      body: 'Highlight text anywhere and ask a question. Answers draw on your own pages and mail, with links back to where they came from.',
    },
    {
      id: 'docs-suite-icon-agents',
      size: 'size-[74px]',
      title: 'Northstar Agents run the repetitive jobs in the background',
      body: 'Set an agent to chase approvals, tidy trackers or prepare weekly reports, and check its work whenever you feel like it.',
    },
    {
      id: 'docs-suite-icon-pages',
      size: 'size-[74px]',
      title: 'Northstar Pages is where plans, notes and data come together',
      body: 'Documents, tables and small apps live side by side, so one link is enough to bring anyone up to speed on a whole project.',
    },
    {
      id: 'docs-suite-icon-inbox',
      size: 'size-[85px]',
      title: 'Northstar Inbox keeps mail short and sorted',
      body: 'Rules, briefs and quiet hours turn a noisy mailbox into a short list, and handoff notes keep accounts moving when people change roles.',
    },
  ],
}

export const cta = {
  title: 'Start a page together',
  body: 'Invite three colleagues, open a blank page, see what you build by Friday.',
  btn1: 'Start using Pages',
  btn2: 'See a demo',
}
