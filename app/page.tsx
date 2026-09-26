import TerminalPortfolio from '@/components/terminal-portfolio'
import { ACTIVITY, CAPTURED_AT, CONTRIBUTIONS } from './activity'
import { CHANNELS } from './contact'
import { SKILL_GROUPS } from './tech'

export default function Home() {
  return <TerminalPortfolio data={{
    channels: CHANNELS.map(({ name, value, href }) => ({ name, value, href })),
    skills: SKILL_GROUPS,
    activity: ACTIVITY,
    capturedAt: CAPTURED_AT,
    contributions: CONTRIBUTIONS,
  }} />
}
