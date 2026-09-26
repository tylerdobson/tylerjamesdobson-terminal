import type { ContributionSummary } from './activity'
import type { SkillGroup } from './tech'

export const PROFILE = {
  headline: 'Artificial Intelligence & Analytics',
  location: 'Tampa, Florida',
  bio: 'I am a University of South Florida student working in AI model evaluation. My technical work includes Python and SQL analysis, data pipelines, dashboards, and forecasting.',
  focus: 'Python / SQL / LLM evaluation / Data analysis / ETL',
}

export const EDUCATION = {
  school: 'University of South Florida',
  location: 'Tampa, Florida',
  degree: 'B.S. in Artificial Intelligence, Business Analytics & Information Systems',
  graduation: 'Expected May 2027',
  coursework: ['Business Analytics', 'Information Systems', 'Data Analysis', 'SQL & Databases', 'Programming Fundamentals (Python, Java)', 'Statistics'],
}

export const CERTIFICATIONS = [
  { name: 'Programming with Python Professional Certificate', issuer: 'OpenEDG Python Institute', date: 'May 2026' },
  { name: 'Career Essentials in Data Analysis', issuer: 'Microsoft & LinkedIn', date: 'Apr 2026' },
  { name: 'Career Essentials in GitHub Professional Certificate', issuer: 'GitHub', date: 'Apr 2026' },
]

export const LEADERSHIP = [
  { role: 'Social Resources Chair', organization: 'Alpha Epsilon Pi (Psi Phi)', dates: 'Nov 2025 – Present', description: 'Coordinate event logistics, vendor communication, and executive board updates under budget and compliance constraints.' },
  { role: 'Leadership Development Scholar', organization: 'National Society of Leadership and Success', dates: 'Sep 2024 – Present', description: 'Completed programming in communication, accountability, team development, and public speaking.' },
  { role: 'Member', organization: 'Future Business Leaders of America, USF Chapter', dates: '', description: 'Chapter programming across business analytics, finance, and information systems professional development.' },
]

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

export const ROOT_PATH = 'C:\\Users\\Tyler'

export const DIRECTORY = [
  { name: 'experience', kind: '<DIR>', command: 'experience', description: 'AI evaluation, data science & operations' },
  { name: 'about.txt', kind: '', command: 'type about.txt', description: 'A little about me' },
  { name: 'stack.txt', kind: '', command: 'type stack.txt', description: 'Languages, tools & frameworks' },
  { name: 'contact.txt', kind: '', command: 'type contact.txt', description: 'Get in touch' },
  { name: 'resume.txt', kind: '', command: 'type resume.txt', description: 'Education, experience & skills' },
  { name: 'activity.log', kind: '', command: 'activity', description: 'GitHub contributions / ASCII calendar' },
] as const

export const HELP = [
  ['dir', 'List the current directory'],
  ['about', 'Read my bio (also: whoami)'],
  ['experience', 'AI evaluation, data science, and work history'],
  ['stack', 'View my technical stack (also: skills)'],
  ['contact', 'Email and social links'],
  ['resume', 'Read my resume or download a text copy'],
  ['activity', 'GitHub contribution calendar and text log'],
  ['all', 'Read the full portfolio in one output'],
  ['type <file>', 'Read a file, e.g. type about.txt'],
  ['cd <directory>', 'Navigate to experience or ..'],
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
