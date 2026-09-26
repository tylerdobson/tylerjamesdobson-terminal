import type { ContributionSummary } from './activity'

export type PortfolioProject = { slug: string; name: string; stack: string; description: string; href?: string; aliases?: string[] }

export const PROFILE = {
  headline: 'Artificial Intelligence & Analytics',
  location: 'Tampa, Florida',
  bio: 'I evaluate AI models and build analytics tools that turn data into decisions. My work spans LLM evaluation, Python and SQL pipelines, KPI dashboards, forecasting, and workflow automation.',
  education: 'Studying Artificial Intelligence & Business Analytics at the University of South Florida. Graduating May 2027.',
  focus: 'Python / SQL / LLM evaluation / Multi-agent systems / Business intelligence',
  primarySkills: ['Python', 'SQL', 'LLM evaluation', 'Large Language Models', 'Multi-agent Systems', 'Prompt Engineering', 'ETL Pipelines', 'Tableau', 'Power BI', 'Excel', 'R', 'Java', 'Codex', 'Claude Code', 'Cursor'],
}

export const EXPERIENCE = [
  {
    role: 'AI Model Evaluation Contractor',
    organization: 'Handshake AI Fellowship / Handshake',
    location: 'Tampa, FL / Remote / Part-time',
    dates: 'Apr 2026 – Present',
    highlights: [
      'Evaluate AI-generated text, code, and multimodal outputs for accuracy, reasoning quality, and instruction-following against project-specific rubrics.',
      'Provide written response-level feedback supporting LLM training and evaluation workflows under strict confidentiality.',
      'Identify inconsistencies in model behavior across diverse prompts and benchmark-style tasks.',
    ],
  },
  {
    role: 'Data Science Extern',
    organization: 'The Global Career Accelerator',
    location: 'Tampa, FL / Remote / Part-time',
    dates: 'May 2026 – Present',
    highlights: [
      'Selected for a USF/Podium credit-bearing externship, building SQL and Python skills with pandas and NumPy through industry-partner projects with Intel and The Recording Academy.',
      'Collaborate with a global student cohort under industry-practitioner mentorship on Grammy.com content and audience strategy analyses.',
    ],
  },
  {
    role: 'Bar Back',
    organization: 'Oak View Group',
    location: 'Tampa, FL / Part-time',
    dates: 'Jan 2026 – Present',
    highlights: [
      'Manage inventory flow and restocking across multiple service areas during arena events serving 15,000–20,000+ attendees.',
      'Coordinate product movement under time-sensitive conditions to maintain service throughput during peak-volume periods.',
    ],
  },
  {
    role: 'Bartender',
    organization: 'Legends Global',
    location: 'Philadelphia, PA / Part-time',
    dates: 'May 2024 – Present',
    highlights: [
      'Process 200+ transactions per shift across Clover, Toast, and Micros POS systems at events approaching 20,000 attendees.',
      'Maintain speed, accuracy, and guest experience while coordinating service teams under sustained high-volume conditions.',
    ],
  },
]

export const PROJECTS: PortfolioProject[] = [
  {
    slug: 'pausepin',
    name: 'Pausepin',
    aliases: ['pause pin'],
    stack: 'TypeScript / Node.js / SQLite / Git',
    description: 'A local CLI for preserving your goal, next action, and stopping point. Park ideas, save checkpoints, and resume with your notes plus a check for changes in the Git working tree. Zero runtime dependencies; no account, telemetry, or cloud sync.',
    href: 'https://github.com/tylerdobson/pausepin',
  },
  {
    slug: 'unova-canvas-usf',
    name: 'Unova Canvas Theme / USF',
    aliases: ['unova', 'canvas-theme', 'unova canvas theme', 'unova canvas theme usf'],
    stack: 'JavaScript / CSS / Chrome Extension / C++',
    description: 'An unofficial presentation-only Chrome extension for the MyUSF Canvas dashboard. Combines an Unova-inspired skyline and animated Generation V Pokémon with a C++/ASCII terminal workbench, independent appearance controls, local preferences, and reduced-motion support. The terminal is a JavaScript visualization; the extension does not change coursework or submit academic actions.',
    href: 'https://github.com/tylerdobson/Canvas-Theme',
  },
  {
    slug: 'decision-intelligence',
    name: 'Decision Intelligence Lab',
    stack: 'Python / SQL / pandas / Streamlit / Plotly / pytest',
    description: 'An analytics sandbox with KPI, forecasting, scenario-analysis, and recommendation engines over 1,728 modeled operating records. Includes SQLite storage, documented assumptions, export workflows, and calculation tests.',
    href: 'https://github.com/tylerdobson/decision-intelligence-lab',
  },
  {
    slug: 'nostos',
    name: 'Nostos',
    stack: 'Three.js / WebGL',
    description: 'A voyage of Odysseus home from Troy. The ship cannot make ground to windward at all.',
  },
  {
    slug: 'crypto-cycle',
    name: 'Crypto Cycle Intelligence Lab',
    stack: 'Python / Simulation & calibration',
    description: 'Probabilistic cryptocurrency cycle simulation, calibration, and decision intelligence.',
  },
  {
    slug: 'airbnb',
    name: 'Airbnb Market Intelligence',
    stack: 'Python / SQL / Analytics',
    description: '1,631 listings across six areas. Revenue estimated from nightly rate and availability, and labelled as an estimate.',
  },
  {
    slug: 'career-command-center',
    name: 'Career Command Center',
    stack: 'Next.js / TypeScript',
    description: 'Full-stack evidence tracker with seed data, tests, and demo media.',
  },
  {
    slug: 'charge-frontier',
    name: 'Charge Frontier',
    stack: 'React / Vite',
    description: 'Web demo from the charge-web project. Demo data is fictional.',
  },
  {
    slug: 'sbn-autostyling',
    name: 'SBN Autostyling',
    stack: 'Website',
    description: 'An automotive styling website with guides and a client-work showcase.',
  },
  {
    slug: 'task-manager',
    name: 'Task Manager',
    stack: 'React / Next.js',
    description: 'A task management application and dashboard.',
  },
  {
    slug: 'spotify-analytics',
    name: 'Spotify Analytics',
    stack: 'Python / pandas / Plotly / Streamlit',
    description: 'A data visualization dashboard exploring Spotify features and top content.',
  },
  {
    slug: 'sales-forecasting',
    name: 'Sales Forecasting',
    stack: 'Tableau',
    description: 'A sales forecasting dashboard and Tableau workbook.',
  },
  {
    slug: 'sec-financials',
    name: 'SEC Financials ETL',
    stack: 'Python / ETL / SEC EDGAR',
    description: 'An end-to-end pipeline that ingests SEC EDGAR filings into structured balance sheet, income statement, and cash flow tables with reproducible transformations.',
  },
  {
    slug: 'skill-radar',
    name: 'Job Market Skill Radar',
    stack: 'Analytics',
    description: 'Job market analysis with a role-family skill matrix and skill-category summaries.',
  },
]

export const ROOT_PATH = 'C:\\Users\\Tyler'

export const DIRECTORY = [
  { name: 'projects', kind: '<DIR>', command: 'projects', description: 'Selected work & experiments' },
  { name: 'experience', kind: '<DIR>', command: 'experience', description: 'AI evaluation, data science & operations' },
  { name: 'about.txt', kind: '', command: 'type about.txt', description: 'A little about me' },
  { name: 'stack.txt', kind: '', command: 'type stack.txt', description: 'Languages, tools & frameworks' },
  { name: 'contact.txt', kind: '', command: 'type contact.txt', description: 'Get in touch' },
  { name: 'resume.txt', kind: '', command: 'type resume.txt', description: 'Request my resume' },
  { name: 'activity.log', kind: '', command: 'activity', description: 'GitHub contributions / ASCII calendar' },
] as const

export const HELP = [
  ['dir', 'List the current directory'],
  ['about', 'Read my bio (also: whoami)'],
  ['projects', 'Browse all projects'],
  ['projects <name>', 'Read a project, e.g. projects nostos'],
  ['experience', 'AI evaluation, data science, and work history'],
  ['stack', 'View my technical stack (also: skills)'],
  ['contact', 'Email and social links'],
  ['resume', 'Request my resume by email'],
  ['activity', 'GitHub contribution calendar and text log'],
  ['all', 'Read the full portfolio in one output'],
  ['type <file>', 'Read a file, e.g. type about.txt'],
  ['cd <directory>', 'Navigate to projects, experience, or ..'],
  ['history', 'Show commands from this session'],
  ['cls', 'Clear the screen (also: clear or Ctrl+L)'],
  ['help', 'Show this command list'],
  ['exit', 'Close this terminal session'],
] as const

export type PortfolioData = {
  channels: { name: string; value: string; href: string }[]
  skills: string[]
  activity: { repo: string; message: string; date: string; url: string }[]
  capturedAt: string
  contributions: ContributionSummary
}
