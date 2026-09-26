import TerminalPortfolio from '@/components/terminal-portfolio'
import { ACTIVITY, CAPTURED_AT, CONTRIBUTIONS } from './activity'
import { CHANNELS } from './contact'
import { TECH } from './tech'
import { PROFILE } from './portfolio'

export default function Home() {
  return <TerminalPortfolio data={{
    channels: CHANNELS.map(({ name, value, href }) => ({ name, value, href })),
    skills: [...new Set([...PROFILE.primarySkills, ...TECH.map(({ name }) => name)])],
    activity: ACTIVITY,
    capturedAt: CAPTURED_AT,
    contributions: CONTRIBUTIONS,
  }} />
}
