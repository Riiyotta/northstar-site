// /agents copy deck (specs/agents.md 14). Independently written Northstar copy.
// FAQ answers are original, written to the lengths/structures in agents.md 11.

export const hero = {
  title: 'Hand off the busywork and keep the credit',
  body: 'Northstar Agents are small specialists you can call on in documents, mail and the browser, each one tuned to finish a single job well.',
  cta1: 'Create account',
  cta2: 'View agent library',
  media: { id: 'agents-hero-art', art: 'media-agent-app', bg: '#2d2e65', className: 'aspect-[720/587]' },
}

export const logosIntro = 'Already part of the daily routine at these companies'

export const assist = {
  title: 'Think of your assistant as dispatch for your AI agents',
  body: 'It keeps track of the document, thread or page you have open, routes each request to the specialist best suited to it, and returns the result in place, ready to accept or tweak.',
  link: { label: 'Inside the assistant' },
  media: { id: 'agents-assist-art', art: 'media-agent-chat', bg: '#d1cde9', className: 'aspect-square rounded-8' },
}

export const cards = {
  title: 'A bench of specialists, each one trained for a single job',
  link: 'Add this agent',
  cta: 'Browse the library',
  items: [
    { title: 'Clear Cut', body: 'Trims filler, fixes grammar and shortens sentences that run on too long.' },
    { title: 'Agenda Assembler', body: 'Builds a meeting agenda from the invite, the last thread and any open action items.' },
    { title: 'Translator', body: 'Converts drafts into over thirty languages while keeping names, numbers and formatting intact.' },
    { title: 'Summarizer', body: 'Condenses long threads, reports and meeting transcripts into a few bullet points you can skim fast.' },
    {
      title: 'Follow-up Nudger',
      body: 'Remembers who owes you a reply and drafts a polite reminder when a conversation has gone quiet too long.',
    },
    { title: 'Scheduler', body: 'Finds a time that works for everyone, proposes slots in your message and books the room for you.' },
    { title: 'Data Puller', body: 'Grabs the latest figure from a spreadsheet or dashboard and drops it into your sentence.' },
    {
      title: 'Contract Lens',
      body: 'Highlights renewal dates, unusual clauses and missing signatures before agreements go out for approval.',
    },
  ],
}

export const build = {
  title: 'Teach Northstar a routine in plain words',
  body: 'Write the steps the way you would explain them to a brand-new colleague, choose the moment it should kick in, and connect the apps it may touch. Test it on a sample, adjust, then publish it to yourself or your whole team.',
  media: { id: 'agents-builder-art', bg: '#faf9f8', className: 'aspect-square' },
}

export const tools = {
  title: 'Keep every record up to date',
  body: 'When a deal moves, the CRM updates. When a ticket closes, the customer hears back. Agents read and write across your connected apps, so the chores between systems disappear.',
  link: { label: 'Explore integrations' },
  media: { id: 'agents-tools-art', art: 'media-pages-connect', bg: '#411c23', className: 'aspect-[720/665]' },
}

export const where = {
  title: 'No new app to learn, no extra window to keep open',
  body: 'Agents live in the software you open every morning, from your inbox to your browser to Pages.',
  bento: {
    a: { title: 'Assistant', body: 'The control room for every agent you have switched on.' },
    b: { title: 'Inbox', body: 'Triage, answer and chase threads without leaving email.' },
    c: { title: 'Browsers', body: 'Works across the sites you already have open.' },
  },
  docs: { label: 'Pages', body: 'Outline, research and tighten documents while you draft.' },
  desk: { label: 'Desktop', body: 'Native apps for macOS and Windows.' },
  other: { label: 'Open protocol', body: 'Connect agents to the models and assistants you already pay for.' },
}

export const quotes = {
  title: 'Heard from customers',
  items: [
    {
      quote:
        '“Our support team used to spend Monday mornings sorting the weekend backlog. Now the queue is triaged, summarized and half-answered before anyone logs in. We moved those hours into calling customers back, and satisfaction climbed for three quarters. It paid for itself fast.”',
      line1: 'Sam Ito, VP Support',
      line2: 'Harborline',
    },
    {
      quote:
        '“I write for a living, so I expected to hate it. Instead it handles the parts I dread: checking quotes, chasing approvals, reformatting for each channel. My drafts still sound like me, they just reach editors two days sooner, and I finally have time to pitch new stories.”',
      line1: 'Morgan Lee, Senior Editor and Newsletter Author',
      line2: 'Brightwater Media Group',
    },
  ],
}

export const trust = {
  title: 'Built to earn your trust',
  body: 'Clear controls, careful defaults and plain-language policies, so you always know what an agent did, why it did it, and what it saw there.',
  items: [
    { title: 'Every action logged', body: 'Review a timeline of what each agent read, changed or sent, and undo any step with a single click.' },
    { title: 'Certified and audited', body: 'Independent audits, single sign-on and encryption at every layer come standard on every plan.' },
    { title: 'Admins set all the rules', body: 'Decide which agents your team can use and what they can open.' },
  ],
}

export const faq = {
  title: 'Answers before you even begin',
  items: [
    {
      q: 'What can an agent do?',
      a: [
        'An agent handles one well-defined job, such as tidying a draft, building an agenda, translating a document or pulling a figure from a spreadsheet. You call it from the assistant or let it run on a trigger, and it works inside the apps you already use. Each agent shows what it plans to change, so you stay in charge of the final result every time.',
      ],
    },
    {
      q: 'How many agents can I turn on?',
      a: [
        'There is no fixed limit on how many agents you can switch on. Most people start with three or four that match their daily work and add more as new needs come up. Agents you are not using stay idle and cost nothing extra on any plan. If the list gets long, pin your favourites to the top of the assistant menu and hide the rest until you need them again.',
      ],
    },
    {
      q: 'Do agents act without my approval?',
      a: [
        'Only if you allow it. By default, every agent proposes a change and waits for you to accept it. For routine jobs you trust, you can switch an agent to run automatically, and you can switch it back at any time. Anything that sends a message outside your company always asks first.',
      ],
    },
    {
      q: 'Can I limit which connected apps a particular agent is allowed to use?',
      a: [
        { bold: 'Per agent access:', text: 'open the agent settings and tick only the apps it may read from or write to.' },
        { bold: 'Admin rules:', text: 'on team plans, admins can set company-wide limits that individual users cannot override, such as keeping agents out of finance tools.' },
      ],
    },
    {
      q: 'What happens if an agent makes a mistake or produces the wrong result?',
      a: [
        'You can undo any change an agent made with one click from its activity log.',
        'Every action is recorded with the before and after state, so it is easy to see exactly what went wrong. Use the feedback button to tell the agent what you expected instead; it adjusts its approach next time.',
        'If a mistake affected other people, for example a message that went out too early, the log shows who received it so you can follow up quickly. Admins can pause any agent for the whole team while they investigate.',
      ],
    },
    {
      q: 'Can I share an agent I built with my coworkers?',
      a: [
        'Yes. Open the agent in the builder, choose Share, and pick people or a team.',
        'They can run it right away with the same steps and triggers. You remain the owner, so any edits you make later reach everyone. On team plans an admin may review shared agents before they appear for others, especially ones that touch customer data.',
      ],
    },
    {
      q: 'Do scheduled agents keep running when my laptop is off?',
      a: [
        'Yes. Scheduled and triggered agents run in the cloud, so they keep working when your computer is asleep, closed or offline. Results wait for you in the activity log.',
        'Agents that act on files stored only on your own device are the exception; they run the next time your computer is online and the desktop app is open. You can see which agents need your device in the agent settings page.',
      ],
    },
    {
      q: 'Which file types and formats can agents read and edit?',
      a: [
        'Agents work with documents, spreadsheets, slides, PDFs, plain text and email, plus records in the apps you connect.',
        'They can read most common office formats and edit Pages documents, spreadsheets and email drafts directly. For formats they can only read, such as scanned PDFs or images, they produce a new document with the result instead of changing the original file.',
      ],
    },
    {
      q: 'How are agents priced on team plans compared with individual plans?',
      a: [
        'Individual plans include a monthly allowance of agent runs that covers typical personal use. Team plans pool runs across everyone on the account, add shared agents and admin controls, and let you buy extra capacity in blocks if a busy month needs it. Every plan shows current usage on the billing page.',
      ],
    },
    {
      q: 'Can I see a history of everything an agent has done?',
      a: [
        'Yes. Every agent has an activity log that lists each run with its time, trigger, the apps it touched and the changes it made. You can filter the log by agent, date or app, open any entry to see the before and after, and undo steps from there. Admins on team plans get a combined log for the whole organization that can be exported or sent to your security tools.',
      ],
    },
    {
      q: 'Do agents work in other languages?',
      a: [
        'Yes. Agents understand instructions and content in more than twenty languages and reply in the language you write in. Quality is highest in English, and we add new languages regularly as testing is completed.',
      ],
    },
    {
      q: 'Is there a limit on how often my agents can run?',
      a: [
        [
          'Each plan includes a monthly number of agent runs, and scheduled agents can run as often as every fifteen minutes. See current limits on the ',
          'pricing page',
          '.',
        ],
      ],
    },
    {
      q: 'How do I remove an agent I no longer use?',
      a: [
        'Open the agent list, choose the agent and select Remove. It stops running immediately and disappears from your assistant menu. If you built it yourself, it is kept in your archive for thirty days so you can restore it, and anyone you shared it with will lose access once you remove it.',
      ],
    },
    {
      q: 'Who do I contact if one of my agents breaks?',
      a: [
        [
          'Use the Report button in the agent activity log; it attaches the run details for you. Paid plans include chat and email support during business hours, and enterprise customers have a named contact. You can also check the ',
          'status page',
          ' for any ongoing incidents first.',
        ],
      ],
    },
  ],
}

export const final = {
  title: 'Give your to-do list some help',
  body: 'Set up your first agent in a few minutes, free, and see how much of the week it hands back to you.',
  cta1: 'Create account',
  cta2: 'View agent library',
}
