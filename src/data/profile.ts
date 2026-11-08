export type Job = {
  role: string
  company: string
  location: string
  start: string
  end: string
  current?: boolean
  bullets: string[]
}

export type SkillGroup = {
  title: string
  note: string
  items: string[]
}

export const navItems = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'skills', label: 'Capabilities', index: '03' },
  { id: 'contact', label: 'Contact', index: '04' },
] as const

export const profile = {
  name: 'Rejie Rufin',
  firstName: 'Rejie',
  initials: 'RR',
  role: 'Freight Forwarding & Shipping Operations Specialist',
  shortRole: 'Import customs manifests, documentation & operations tooling',
  location: 'Bacoor City, Philippines',
  availability: 'Open to operations & automation roles',
  email: 'rejierufinxxxii@gmail.com',
  phone: '0960-342-7321',
  phoneHref: '+639603427321',
  linkedin: 'https://www.linkedin.com/in/rejie-rufin-837113147',
  website: 'https://rejierufin.github.io',
  // Drop your photo at public/portrait.jpg and it replaces the monogram.
  portraitSrc: '/portrait.jpg',
  avatarSrc: '/avatar.svg',
  heroHeadline: ['Import freight,', 'documented right', 'the first time.'],
  heroLede:
    'Nine years across freight forwarding and customs documentation — import manifests, air and sea freight paperwork, and the process tools that keep both accurate.',
  marquee: [
    'Import customs manifests',
    'Ocean freight',
    'Air export',
    'e2m / e-Trade',
    'Customs compliance',
    'Manifest & EDI',
    'Process automation',
    'Power Apps',
    'Pre-arrival control',
  ],
}

export const toolGroups = [
  {
    label: 'Microsoft',
    items: [
      'Microsoft 365',
      'Outlook',
      'Teams',
      'Excel',
      'SharePoint',
      'OneDrive',
      'Power Apps',
      'Power Automate',
      'Copilot',
      'Edge',
    ],
  },
  {
    label: 'Google',
    items: ['Chrome', 'Drive', 'Sheets', 'Docs', 'Forms', 'Gemini', 'Colab'],
  },
]

export const stats = [
  { value: '9+', label: 'Years in freight & shipping operations' },
  { value: 'VN · KH', label: 'Customs markets filed daily' },
  { value: 'e2m', label: 'Customs system owned end to end' },
]

export const jobs: Job[] = [
  {
    role: 'Import Customs Manifest Specialist',
    company: 'Maersk Global Service Centre',
    location: 'Philippines',
    start: 'Nov 2023',
    end: 'Present',
    current: true,
    bullets: [
      'Prepare and submit import customs manifests for shipments arriving in Vietnam and Cambodia, meeting regulatory cut-offs.',
      'Hold a high bar on manifest report accuracy, with on-time completion across every filing cycle.',
      'Resolve documentation discrepancies, amendments and shipment exceptions with international agents, carriers and customs brokers.',
    ],
  },
  {
    role: 'Senior Documentation Officer / IMPEX Coordinator',
    company: 'ATR International Freight Inc.',
    location: 'Port Area, Manila',
    start: 'Aug 2017',
    end: 'Nov 2023',
    bullets: [
      'Led end-to-end import air and sea manifest processing and submission through the e-Trade / e2m customs system.',
      'Oversaw air export shipments from booking through cargo uplift — MAWB, HAWB, commercial invoices, packing lists, export declarations and shipping instructions.',
      'Kept shipment data and documentation accurate and audit-ready under time-sensitive regulatory requirements.',
    ],
  },
  {
    role: 'Liaison Officer',
    company: 'Inspira Prime International Corp.',
    location: 'Quezon City',
    start: 'Aug 2016',
    end: 'May 2017',
    bullets: [
      'Led permit processing, renewals, registrations and regulatory documentation with the BIR, LGUs and other government agencies.',
      'Coordinated with government offices, banks and external stakeholders to keep compliance and business deadlines aligned.',
    ],
  },
  {
    role: 'Administrative Staff',
    company: 'Municipal Treasurer’s Office',
    location: 'Municipality of Isabel',
    start: 'Feb 2016',
    end: 'May 2016',
    bullets: [
      'Handled financial documentation, payroll administration, employee records, data entry and treasury reporting.',
      'Protected the accuracy and confidentiality of financial, tax and employee records.',
    ],
  },
  {
    role: 'Census Area Supervisor',
    company: 'Philippine Statistics Authority',
    location: 'Tacloban City, Leyte',
    start: 'Aug 2015',
    end: '',
    bullets: [
      'Led field operations and coordinated census area activities to support accurate, on-time data collection.',
      'Mentored enumerators on data-gathering procedures and field protocols, and reconciled inconsistencies before submission.',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Freight operations',
    note: 'The day-to-day of moving cargo',
    items: [
      'Import customs manifests',
      'Ocean freight documentation',
      'Air export coordination',
      'Shipment tracking & pre-arrival control',
      'Customs compliance',
      'Discrepancy & amendment resolution',
    ],
  },
  {
    title: 'Documentation',
    note: 'Paperwork that clears and moves shipments',
    items: [
      'MAWB & HAWB',
      'Commercial invoices',
      'Packing lists',
      'Export declarations',
      'Shipping instructions',
      'Manifest & EDI handling',
      'e2m / e-Trade filings',
    ],
  },
  {
    title: 'Process & systems',
    note: 'Making the work visible and repeatable',
    items: [
      'Process mapping',
      'Business rules & exceptions',
      'Data validation',
      'Workflow automation',
      'Process ownership',
      'Continuous improvement',
      'Control dashboards',
    ],
  },
  {
    title: 'Tooling',
    note: 'What I build with',
    items: [
      'Microsoft Power Apps',
      'Power Automate',
      'Microsoft 365',
      'SharePoint',
      'OneDrive',
      'Google Workspace',
      'Google Colab',
      'Gemini & Copilot',
      'AI-assisted development',
    ],
  },
]

export const capabilities = [
  {
    step: '01',
    title: 'Read the real process',
    body: 'Start with how the work actually runs, and where it breaks — not the version written in the SOP.',
  },
  {
    step: '02',
    title: 'Map it, set the rules',
    body: 'Document the workflow, then define the business rules, exceptions and the data that must be true at each step.',
  },
  {
    step: '03',
    title: 'Build the tool',
    body: 'Trackers, dashboards, validation tools and control centres — mostly in Power Apps, with AI-assisted no-code builds.',
  },
  {
    step: '04',
    title: 'Validate, then hand over',
    body: 'Test against live shipments, close the edge cases, and leave the team with something they will keep using.',
  },
]

export const education = {
  degree: 'Bachelor of Science in Shipping Management',
  school: 'Palompon Institute of Technology',
  years: '2011 — 2015',
}
