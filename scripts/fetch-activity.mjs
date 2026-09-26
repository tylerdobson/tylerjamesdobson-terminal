import { readFile, writeFile } from 'node:fs/promises'

const username = 'tylerdobson'
const source = `https://github.com/users/${username}/contributions`
const snapshotPath = new URL('../app/github-activity.json', import.meta.url)
const textPath = new URL('../public/activity.txt', import.meta.url)
const glyphs = ['.', ':', '+', '*', '#']
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })

async function request(url, json = false) {
  const response = await fetch(url, {
    headers: { Accept: json ? 'application/vnd.github+json' : 'text/html', 'User-Agent': 'tylerdobson-portfolio' },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
  return json ? response.json() : response.text()
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]))
}

function readContributions(html) {
  const counts = new Map()
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g)) {
    const count = match[2].match(/^(No|[\d,]+) contributions? on /)
    if (count) counts.set(attributes(match[1]).for, count[1] === 'No' ? 0 : Number(count[1].replaceAll(',', '')))
  }
  const days = [...html.matchAll(/<td\b[^>]*data-date="[^"]+"[^>]*>/g)].map(match => {
    const properties = attributes(match[0])
    const count = counts.get(properties.id)
    const level = Number(properties['data-level'])
    if (count === undefined || !Number.isInteger(level) || level < 0 || level > 4) throw new Error('Incomplete contribution day')
    return { date: properties['data-date'], count, level }
  }).sort((first, second) => first.date.localeCompare(second.date))
  if (days.length < 350 || days.length > 371) throw new Error('Incomplete contribution calendar')
  for (const [index, day] of days.entries()) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date)) throw new Error('Invalid calendar date')
    if (index && Date.parse(day.date) - Date.parse(days[index - 1].date) !== 86400000) throw new Error('Contribution calendar has missing or duplicate dates')
  }
  const total = days.reduce((sum, day) => sum + day.count, 0)
  const reported = html.match(/([\d,]+)\s+contributions?\s+in the last year/)
  if (!reported || total !== Number(reported[1].replaceAll(',', ''))) throw new Error('Contribution total does not match GitHub')
  return { days, total }
}

function makeCalendar(weeks) {
  const labels = Array(weeks.length * 2 + 1).fill(' ')
  let lastMonth = ''
  for (const [index, week] of weeks.entries()) {
    const day = week.find(Boolean)
    if (!day) continue
    const month = day.date.slice(0, 7)
    if (month !== lastMonth) {
      const nextDay = weeks[index + 1]?.find(Boolean)
      if (index === 0 && nextDay && nextDay.date.slice(0, 7) !== month) {
        lastMonth = month
        continue
      }
      const label = monthFormat.format(new Date(day.date))
      if (index * 2 + label.length <= labels.length) {
        for (const [offset, character] of [...label].entries()) labels[index * 2 + offset] = character
      }
      lastMonth = month
    }
  }
  return [
    '    ' + labels.join('').trimEnd(),
    ...weekdays.map((weekday, dayIndex) => weekday + ' ' + weeks.map(week => week[dayIndex] ? glyphs[week[dayIndex].level] : ' ').join(' ')),
  ].join('\n')
}

async function recentCommits() {
  const events = await request(`https://api.github.com/users/${username}/events/public?per_page=100`, true)
  const repositories = [...new Set(events
    .filter(event => event.type === 'PushEvent')
    .sort((first, second) => second.created_at.localeCompare(first.created_at))
    .map(event => event.repo.name))].slice(0, 5)
  const results = await Promise.allSettled(repositories.map(async repository => {
    const commits = await request(`https://api.github.com/repos/${repository}/commits?author=${username}&per_page=4`, true)
    return commits.map(commit => ({
      repo: repository.split('/')[1],
      message: commit.commit.message.split('\n')[0].trim(),
      date: commit.commit.author.date,
      url: commit.html_url,
    }))
  }))
  const rows = results.filter(result => result.status === 'fulfilled').flatMap(result => result.value)
  return [...new Map(rows.map(row => [row.url, row])).values()]
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, 8)
}

function makeText(snapshot) {
  return [
    'GITHUB CONTRIBUTION LOG / @' + username,
    '='.repeat(64),
    snapshot.from + ' through ' + snapshot.to,
    'Updated: ' + snapshot.capturedAt,
    snapshot.total + ' contributions / ' + snapshot.activeDays + ' active days',
    '',
    snapshot.calendar,
    '',
    'Less  . : + * #  More     . = no contributions',
    '',
    'RECENT PUBLIC COMMITS',
    ...snapshot.commits.map(commit => commit.date.slice(0, 10) + '  ' + commit.repo + '\n  ' + commit.message + '\n  ' + commit.url),
    '',
    'DAILY CONTRIBUTION COUNTS / newest first',
    ...[...snapshot.days].reverse().map(day => day.date + '  ' + String(day.count).padStart(4) + '  ' + glyphs[day.level]),
    '',
    'Source: ' + source,
    'Counts reflect the public GitHub contribution calendar, not only commits.',
    '',
  ].join('\n')
}

try {
  const html = await request(source)
  const { days, total } = readContributions(html)
  const commits = await recentCommits().catch(error => {
    process.stderr.write(`Recent commits unavailable: ${error.message}\n`)
    return []
  })
  const start = new Date(days[0].date)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())
  const weeks = []
  for (const day of days) {
    const weekIndex = Math.floor((Date.parse(day.date) - start.getTime()) / 604800000)
    weeks[weekIndex] ??= Array(7).fill(null)
    weeks[weekIndex][new Date(day.date).getUTCDay()] = day
  }
  const quarterSize = Math.ceil(weeks.length / 4)
  const quarters = Array.from({ length: 4 }, (_, index) => {
    const section = weeks.slice(index * quarterSize, (index + 1) * quarterSize)
    const sectionDays = section.flat().filter(Boolean)
    return { from: sectionDays[0].date, to: sectionDays.at(-1).date, calendar: makeCalendar(section) }
  })
  const snapshot = {
    username,
    source,
    capturedAt: new Date().toISOString(),
    from: days[0].date,
    to: days.at(-1).date,
    total,
    activeDays: days.filter(day => day.count > 0).length,
    calendar: makeCalendar(weeks),
    quarters,
    days,
    commits,
  }
  await writeFile(snapshotPath, JSON.stringify(snapshot, null, 2) + '\n')
  await writeFile(textPath, makeText(snapshot))
  process.stdout.write(`Refreshed ${total} contributions across ${days.length} days and ${commits.length} public commits.\n`)
} catch (error) {
  if (!process.argv.includes('--allow-stale')) throw error
  const saved = JSON.parse(await readFile(snapshotPath, 'utf8'))
  if (!saved.days?.length || !saved.calendar || !saved.capturedAt) throw error
  await writeFile(textPath, makeText(saved))
  process.stderr.write(`GitHub refresh failed; retaining the snapshot dated ${saved.capturedAt}: ${error.message}\n`)
}
