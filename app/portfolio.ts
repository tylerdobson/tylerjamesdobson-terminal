import type { ContributionSummary } from './activity'
import type { SkillGroup } from './tech'

export const PROFILE = {
  headline: 'Business Analytics and Information Systems',
  location: 'Tampa, Florida',
  focus: 'Python / JavaScript / SQL / Data Analysis / Business Intelligence',
}

export const EDUCATION = {
  school: 'University of South Florida',
  location: 'Tampa, FL',
  degree: 'B.S. in Business Analytics & Information Systems',
  graduation: 'Expected May 2027',
  coursework: ['Database Design and Administration', 'Python for Business Analytics', 'Systems Analysis and Design', 'Business Application Development'],
}

export const DATA_SCIENCE_PROGRAM = {
  name: 'Data Science Program',
  organization: 'The Global Career Accelerator',
  dates: 'May 2026 – Aug 2026',
  highlights: [
    'Completed USF/Podium credit-bearing coursework; developed SQL and Python (pandas, NumPy) skills through industry-partner projects with Intel and The Recording Academy.',
    'Collaborated with a global student cohort under industry-practitioner mentorship to deliver analyses on Grammy.com content and audience strategy.',
  ],
}

export const LEADERSHIP = [
  { role: 'Social Resources Chair', organization: 'Alpha Epsilon Pi (Psi Phi)', dates: 'Nov 2025 – Aug 2026', description: 'Coordinated event logistics, vendor communication, and executive board updates under budget and compliance constraints.' },
  { role: 'Leadership Development Scholar', organization: 'National Society of Leadership and Success', dates: 'Sep 2024 – Present', description: 'Completed programming in communication, accountability, team development, and public speaking.' },
  { role: 'Member', organization: 'Future Business Leaders of America, USF Chapter', dates: '', description: 'Chapter programming across business analytics, finance, and information systems professional development.' },
]

export const EXPERIENCE = [
  {
    role: 'AI Model Evaluation Contractor',
    organization: 'Handshake AI Fellowship, Handshake',
    location: 'Tampa, FL (Remote) / Part-time',
    dates: 'Apr 2026 – Present',
    highlights: [
      'Evaluate AI-generated text, code, and multimodal outputs against project-specific rubrics for accuracy, reasoning quality, and instruction-following.',
      'Provide written response-level feedback supporting LLM training and evaluation workflows under strict confidentiality.',
      'Surface inconsistencies in model behavior across diverse prompts and benchmark-style task types using independent judgment.',
    ],
  },
  {
    role: 'Bar Back',
    organization: 'Oak View Group',
    location: 'Tampa, FL / Part-time',
    dates: 'Jan 2026 – Present',
    highlights: [
      'Manage inventory flow and restocking across multiple service areas during arena events serving 15,000–20,000+ attendees.',
      'Coordinate product movement under time-sensitive conditions to keep service throughput high during peak-volume periods.',
    ],
  },
  {
    role: 'Bartender',
    organization: 'Legends Global',
    location: 'Philadelphia, PA / Part-time',
    dates: 'May 2024 – Aug 2026',
    highlights: [
      'Processed 200+ transactions per shift across Clover, Toast, and Micros POS systems at events approaching 20,000 attendees.',
      'Maintained speed, accuracy, and guest experience while coordinating service teams under sustained high-volume conditions.',
    ],
  },
]

export const ROOT_PATH = 'C:\\Users\\Tyler'

export type PortfolioProject = {
  slug: string
  name: string
  stack: string
  description: string
  href?: string
  aliases?: string[]
  note?: string
}

export const PROJECTS: PortfolioProject[] = [
  {
    slug: 'pausepin',
    name: 'Pausepin',
    stack: 'TypeScript / Node.js / SQLite',
    description: 'Built a local-first CLI that saves task checkpoints and next actions in SQLite, with Git change detection to restore context between development sessions.',
    href: 'https://github.com/tylerdobson/pausepin',
  },
  {
    slug: 'ufc-prediction-model',
    name: 'UFC Prediction Model',
    stack: 'Python / SQLite / Streamlit',
    description: 'Developed a research-stage win-probability modeling pipeline and dashboard comparing Elo and logistic regression with chronological holdouts, probability calibration, and timestamped data checks.',
    aliases: ['ufc', 'ufc prediction', 'ufc model'],
    note: 'Private repository; source is not publicly available.',
  },
  {
    slug: 'nostos',
    name: 'Nostos',
    stack: 'JavaScript / Three.js / GLSL',
    description: 'Created an interactive sailing experience with procedural environments, ocean shaders, first-person controls, and adaptive rendering for varying hardware.',
    href: 'https://github.com/tylerdobson/nostos',
  },
  {
    slug: 'this-website',
    name: 'tylerjamesdobson.com',
    stack: 'Next.js / React / TypeScript',
    description: 'Built and deployed a responsive terminal-style portfolio with command navigation, keyboard autocomplete, and GitHub activity integration.',
    aliases: ['website', 'site', 'portfolio', 'tylerjamesdobson.com'],
    href: 'https://github.com/tylerdobson/tylerjamesdobson.com--Portfolio-Website',
  },
]

export const DIRECTORY = [
  { name: 'projects', kind: '<DIR>', command: 'projects', description: 'Selected work' },
  { name: 'experience', kind: '<DIR>', command: 'experience', description: 'AI evaluation & event operations' },
  { name: 'about.txt', kind: '', command: 'type about.txt', description: 'A little about me' },
  { name: 'stack.txt', kind: '', command: 'type stack.txt', description: 'Languages, tools & frameworks' },
  { name: 'contact.txt', kind: '', command: 'type contact.txt', description: 'Get in touch' },
  { name: 'resume.txt', kind: '', command: 'type resume.txt', description: 'Education, experience, projects & skills' },
  { name: 'activity.log', kind: '', command: 'activity', description: 'GitHub contributions / ASCII calendar' },
] as const

export const HELP = [
  ['dir', 'List the current directory'],
  ['about', 'Read my background (also: whoami)'],
  ['projects', 'Browse selected work'],
  ['projects <name>', 'Read a project, e.g. projects nostos'],
  ['experience', 'AI evaluation and event operations'],
  ['stack', 'View my technical stack (also: skills)'],
  ['contact', 'Email and social links'],
  ['resume', 'Read my resume or download a text copy'],
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
  skills: SkillGroup[]
  activity: { repo: string; message: string; date: string; url: string }[]
  capturedAt: string
  contributions: ContributionSummary
}
