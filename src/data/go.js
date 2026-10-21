// /go copy deck (specs/go.md 15). Independently written Northstar copy.
// FAQ answers are original, written to the lengths/structures in go.md 10.

export const hero = {
  h1: 'Fewer tabs. More finished work by lunchtime.',
  lede: 'From the first coffee to the last message, Northstar Assistant quietly carries the small jobs: drafting, sorting, summarizing and checking, so your focus stays put.',
  cta: 'Get it',
}

// Feature rows: media slot, reused art (if any), bg, control colour (go.md 13.3), sr caption.
const row = (n, art, color, caption) => ({
  id: `go-row-${n}-video`,
  art,
  controlColor: color,
  caption,
})

export const ch1 = {
  eyebrow: '01 / 05 · WHILE YOU TYPE',
  title: 'Small nudges, big time savings',
  lede: 'Northstar watches for the moments that slow you down (a clumsy line, a half-done reply, a missed detail) and offers a quick, quiet fix.',
  rows: [
    {
      title: 'Your second pair of eyes',
      body: 'Wherever there is a cursor, Northstar reads along and underlines what is unclear, wordy or off-tone. One tap swaps in the stronger version.',
      media: { ...row(1, 'media-agent-wide', '#ffffff', 'Writing suggestions demo'), bg: '#e3eef5' },
    },
    {
      title: 'An inbox that triages itself before you arrive',
      body: 'Newsletters go one way, receipts another, and the urgent note from your manager lands on top with a draft reply waiting.',
      media: { ...row(2, 'media-inbox-split', '#ffffff', 'Inbox triage'), bg: '#e2e7e8' },
    },
    {
      title: 'Walk into every call prepared',
      body: 'A one-page brief arrives before each meeting. Afterward, decisions and owners are captured and shared with everyone who attended.',
      media: { ...row(3, undefined, '#292827', 'Meeting brief and recap demo'), bg: '#f1f5f9' },
    },
    {
      title: "It cites your team's own documents",
      body: 'Connect your wikis, drives and project boards. Ask a question and the reply links back to the exact page it came from, so checking takes seconds.',
      media: { ...row(4, 'media-pages-ai', '#292827', 'Cited answers'), bg: '#3f3d3c' },
    },
  ],
}

export const ch2 = {
  eyebrow: '02 / 05 · TOOLKIT',
  title: 'Specialists on demand',
  lede: 'Add the skills you care about. Each stays out of the way until the task in front of you calls for it.',
  row1: [
    {
      title: 'Wordsmith',
      body: 'Catches typos, awkward phrasing and runaway sentences. Over time it learns which suggestions you accept and quietly drops the rest.',
      link: 'Learn more',
      icon: 'helper-icon-1',
      band: { id: 'helper-band-1', bg: '#d0e7de', aspect: 'aspect-[318/106]' },
    },
    {
      title: 'Message Sorter',
      body: 'Labels, archives and snoozes incoming mail using rules you never had to write, then lines up suggested answers. Lives in Northstar Inbox.',
      link: 'Learn more',
      icon: 'helper-icon-2',
      band: { id: 'helper-band-2', bg: '#f2d0cf', aspect: 'aspect-[318/103]' },
    },
    {
      title: 'Citation Checker',
      body: 'Reads your draft for numbers, dates, names and quotes, then compares each one against the documents you trust. Anything it cannot back up is flagged for your review.',
      link: 'Learn more',
      icon: 'helper-icon-3',
      band: { id: 'helper-band-3', bg: '#e6d5da', aspect: 'aspect-[318/103]' },
    },
    {
      title: 'Morning Memo',
      body: 'A single note waiting at 8 a.m.: what changed overnight in your projects, which customers wrote in, and the three items on your calendar that deserve some prep.',
      icon: 'helper-icon-4',
      band: { id: 'helper-band-4', bg: '#e1cbec', aspect: 'aspect-[318/103]' },
    },
  ],
  row2: [
    {
      title: 'Skill Builder',
      body: 'Describe a repeatable job in plain words and pick what sets it off: a keystroke, a time of day, or an event like a closed deal or a new calendar invite. Northstar handles the rest.',
      link: 'Start building',
      icon: 'helper-icon-5',
    },
    {
      title: 'Marketplace',
      body: 'Hundreds of ready-to-install skills, made by our team and vetted partners, cover everything from lesson plans to forecasting to legal review. Add one in a click.',
      link: 'View the store',
      icon: 'helper-icon-6',
    },
  ],
}

export const band = { title: 'Spend your hours on what only you can do', cta: 'Get it' }

export const ch3 = {
  eyebrow: '03 / 05 · YOUR STACK',
  title: 'Wired to your apps',
  lede: 'Northstar reads from the calendars, trackers, drives and CRMs your team already pays for. Pick a prebuilt integration or wire up your own, and every suggestion reflects current details.',
  link: 'View integrations',
}

export const ch4 = {
  eyebrow: '04 / 05 · EVERYWHERE',
  title: 'Reach it your way',
  lede: 'Some days you want quiet suggestions; other days a full conversation, or a job that runs at 6 a.m. Northstar offers each mode, and you can jump between them quite freely.',
  rows: [
    {
      title: 'Inline edits',
      body: 'Suggestions appear as a soft underline on the words themselves. Hover to preview, press Tab to accept, and the sentence you were writing carries on.',
      media: { ...row(5, undefined, '#292827', 'Inline edits demo'), bg: '#e7eaeb' },
    },
    {
      title: 'Ask about anything open',
      body: 'Puzzled by a clause in a contract? Highlight it and ask; the explanation opens alongside.',
      media: { ...row(6, 'media-agent-chat', '#292827', 'Ask about the open page'), bg: '#fcfaf8' },
    },
    {
      title: 'One keystroke',
      body: 'Press the shortcut from any field and a small prompt pops up in place. No new window to manage.',
      media: { ...row(7, undefined, '#292827', 'Shortcut prompt'), bg: '#e4f2f4' },
    },
    {
      title: 'Rooms',
      body: 'Tag Northstar in a shared channel and it catches latecomers up or settles the open question.',
      media: { ...row(8, undefined, '#ffffff', 'Team channel'), bg: '#f3f7fb' },
    },
    {
      title: 'Home base',
      body: 'A full-screen workspace for big asks, saved skills and your morning memos.',
      media: { ...row(9, 'media-agent-app', '#292827', 'Home'), bg: '#3f3d3c' },
    },
  ],
}

export const ch5 = {
  eyebrow: '05 / 05 · TRUST & CONTROL',
  title: 'Locked down, always',
  lede: 'Encryption in transit and at rest, single sign-on and regular third-party audits are the baseline, not an upgrade. Admins choose retention windows and who may switch on which skills. Customer content is never used to train shared models unless an organization opts in, and on business plans that setting starts switched off.',
  media: { id: 'trust-collage', art: 'media-enterprise', bg: '#f2e4e5', className: 'aspect-[720/404]' },
}

export const faq = {
  title: 'Things people want to know',
  items: [
    {
      q: 'Who is Northstar for?',
      a: [
        'Anyone who spends the day writing, answering and organizing. Teams in support, sales, operations and product use it most, but solo users get the same help.',
      ],
    },
    {
      q: 'Which apps and browsers does Northstar Assistant support?',
      a: [
        'The assistant runs as a desktop app and as a browser extension, so it can help almost anywhere you type. Current support covers the following places today:',
        {
          list: [
            'Desktop apps for macOS and Windows, with the same shortcuts and settings on both systems.',
            'Extensions for the major Chromium-based browsers and for Firefox and Safari.',
            'Northstar Inbox and Pages, where suggestions appear right inside the editor.',
            'Most web apps with a text field, including chat tools, ticketing systems and CRMs, with deeper actions in the apps you connect from the integrations page.',
            'Mobile keyboards on iOS and Android, which offer rewrites and short replies but not the full set of skills.',
          ],
        },
      ],
    },
    {
      q: 'Is there a free plan I can try?',
      a: [
        [
          'Yes. The free plan includes inline suggestions, a monthly allowance of assistant requests and a handful of starter skills, with no time limit and no card required. When you need more requests, team sharing or admin controls, compare the paid tiers on the ',
          'pricing page',
          ' and upgrade from your account settings in a couple of clicks.',
        ],
      ],
    },
    {
      q: 'How long does it take to set up?',
      a: [
        'Most people are up and running in under five minutes. Install the app or extension, sign in, choose the apps it may read from, and the first suggestions appear the next time you start typing anywhere.',
      ],
    },
    {
      q: 'Can I turn off suggestions for certain apps or websites?',
      a: [
        'Yes. Open the assistant settings and add any app or site to the paused list, either permanently or for a set time. You can also pause everything with one shortcut when you are presenting or sharing your screen. Admins on business plans can set company-wide rules, for example keeping the assistant off in finance tools, and those rules override personal settings.',
      ],
    },
    {
      q: 'Which languages are supported?',
      a: [
        [
          'Suggestions and rewrites work in more than twenty languages, including English, Spanish, French, German, Portuguese, Italian, Dutch and Japanese, and the assistant can translate between any of them. Quality is highest in English, and we publish an updated ',
          'language list',
          ' whenever a new one reaches general availability.',
        ],
        'Answers follow the language you write in, so a question asked in German gets a German reply even when your interface is set to English.',
      ],
    },
    {
      q: 'Does it work offline too?',
      a: [
        'Basic spelling and grammar checks keep working without a connection, because they run on your device. Rewrites, summaries, answers from your documents and every skill that touches a connected app need to reach our servers, so they pause while you are offline and resume automatically once you reconnect. Drafts you write in the meantime are saved locally and nothing is lost. If you often work on planes or in places with weak signal, turn on the offline pack in settings to download larger on-device models for faster local checks.',
      ],
    },
    {
      q: 'Who on my team can see what I write?',
      a: [
        [
          'Nobody, unless you choose to share. Your drafts, prompts and assistant history are private to your account. Admins can see usage totals and which skills are switched on, but not the content itself. Read the full details in our ',
          'privacy overview',
          '.',
        ],
      ],
    },
    {
      q: 'How do I cancel my subscription?',
      a: [
        'You can cancel at any time from billing settings, and your plan stays active until the end of the current period.',
        'Pick the steps that match how you subscribed:',
        { list: ['Subscribed on the web: open billing settings', 'Subscribed in the Mac app: use account settings', 'Subscribed on iOS: use the App Store', 'Subscribed on Android: use Google Play'] },
        ['Need a hand? ', 'Contact support', ''],
        { bold: 'Refunds:', text: 'annual plans cancelled within fourteen days of renewal are refunded in full; after that, the plan simply runs to the end of the term.' },
        'Your data stays available to export for thirty days.',
      ],
    },
    {
      q: 'Can an administrator manage skills and settings for the whole company?',
      a: [
        'Yes. On business and enterprise plans, admins get a console that controls the assistant for everyone in the organization. From there they can decide which skills are available, which teams may use them and which connected apps each skill is allowed to read from or write to.',
        'Admins also set retention windows for assistant history, require single sign-on, and choose whether new skills from the marketplace need approval before anyone can install them. Changes apply within a few minutes and are recorded in an audit log that can be exported or streamed to your security tools.',
        'For larger rollouts, settings can be grouped into policies and assigned to departments, so a support team and a legal team can run with different defaults under one account and one invoice.',
      ],
    },
    {
      q: 'What happens to my drafts and conversation history if I move to a different plan?',
      a: [
        'Everything comes with you. Drafts, saved prompts, custom skills and assistant history stay attached to your account when you upgrade or downgrade. If a lower plan does not include a feature, its data is kept read-only until you upgrade again.',
      ],
    },
    {
      q: 'Does Northstar work on my phone?',
      a: [
        'Yes, through the Northstar keyboard for iOS and Android and inside the Inbox and Pages mobile apps. On a phone you get rewrites, quick replies, summaries of long threads and answers from your connected documents. Building and editing custom skills, the marketplace and admin settings are desktop-only for now, but anything you set up there syncs to your phone automatically. Install the keyboard from your app store, sign in with the same account, and your preferences carry over without any extra setup.',
      ],
    },
    {
      q: 'How do I share a custom skill with my team?',
      a: [
        'Open the skill in the builder, choose Share, and pick people, a team or the whole organization. Teammates see it in their skill list right away and can run it with the same steps and triggers you set up. You stay the owner, so later edits reach everyone automatically, and you can switch sharing off at any time. On business plans, an admin may need to approve a shared skill before it appears for others, especially if it connects to apps that hold customer data. Each run is logged under the person who triggered it, so it is always clear who did what.',
      ],
    },
    {
      q: 'Where can I report a bug or get help?',
      a: [
        'Use the Help item in the assistant menu to send a report; it attaches the app version and recent error details for you, and you can add a screenshot before sending. Our help center has step-by-step guides for setup, integrations and billing, and a status page shows any ongoing incidents. Paid plans include chat and email support during business hours, and enterprise customers also get a named contact. Most reports receive a first reply within one working day, and fixes ship in regular weekly updates.',
      ],
    },
  ],
}

export const final = { title: 'Give your to-do list a head start', cta: 'Create an account' }
