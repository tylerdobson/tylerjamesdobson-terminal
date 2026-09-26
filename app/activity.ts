import snapshot from './github-activity.json'

export type Commit = { repo: string; message: string; date: string; url: string }
export type ContributionSummary = {
  username: string
  source: string
  from: string
  to: string
  total: number
  activeDays: number
  calendar: string
  quarters: { from: string; to: string; calendar: string }[]
}

export const CAPTURED_AT = snapshot.capturedAt
export const ACTIVITY: Commit[] = snapshot.commits
export const CONTRIBUTIONS: ContributionSummary = {
  username: snapshot.username,
  source: snapshot.source,
  from: snapshot.from,
  to: snapshot.to,
  total: snapshot.total,
  activeDays: snapshot.activeDays,
  calendar: snapshot.calendar,
  quarters: snapshot.quarters,
}
