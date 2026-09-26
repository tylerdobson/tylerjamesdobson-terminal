import type { ReactNode } from 'react'
import { DIRECTORY, EXPERIENCE, HELP, PROFILE, PROJECTS, ROOT_PATH, type PortfolioData } from '@/app/portfolio'

export type TerminalOutputKind = 'directory' | 'about' | 'projects' | 'project' | 'experience' | 'stack' | 'contact' | 'resume' | 'activity' | 'help' | 'all' | 'text'
export type TerminalOutputValue = { kind: TerminalOutputKind; value?: string }

type OutputProps = {
  output: TerminalOutputValue
  data: PortfolioData
  runCommand: (command: string) => void
}

export function CommandLink({ command, runCommand, children }: {
  command: string
  runCommand: OutputProps['runCommand']
  children: ReactNode
}) {
  return <button className="command-link" type="button" onClick={() => runCommand(command)}>{children}</button>
}

export default function TerminalOutput({ output, data, runCommand }: OutputProps) {
  const email = data.channels.find(channel => channel.name === 'Email')?.href ?? ''

  switch (output.kind) {
    case 'directory':
      return <>
        <p>Directory of {ROOT_PATH}</p>
        <ul className="directory-list">
          {DIRECTORY.map(file => <li className="directory-row" key={file.name}>
            <span aria-hidden="true">{file.kind}</span>
            <CommandLink command={file.command} runCommand={runCommand}>{file.name}</CommandLink>
            <span className="directory-description">{file.description}</span>
          </li>)}
        </ul>
        <p>Type <CommandLink command="help" runCommand={runCommand}>help</CommandLink> for all commands. Click a name to open it.</p>
        <p>Or type <CommandLink command="all" runCommand={runCommand}>all</CommandLink> to read everything.</p>
      </>
    case 'about':
      return <div className="text-output">
        <h2>Tyler James Dobson</h2>
        <p>{PROFILE.headline} / {PROFILE.location}</p>
        <p>{PROFILE.bio}</p>
        <p>{PROFILE.education}</p>
        <p>{PROFILE.focus}</p>
      </div>
    case 'projects':
      return <>
        <h2>Directory of {ROOT_PATH}\projects</h2>
        <ul className="project-list">
          {PROJECTS.map((project, index) => <li key={project.slug}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}.</span>
            <div>
              <CommandLink command={`projects ${project.slug}`} runCommand={runCommand}>{project.name}</CommandLink>
              <p>{project.stack}</p>
            </div>
          </li>)}
        </ul>
        <p>{PROJECTS.length} project(s). Click a project to read more.</p>
        <p>Usage: projects &lt;name&gt; — e.g. projects nostos</p>
      </>
    case 'project': {
      const project = PROJECTS.find(project => project.slug === output.value)
      if (!project) return <p>Project not found. Type projects to list available work.</p>
      return <article className="text-output">
        <h2>{project.name}</h2>
        <p>{project.stack}</p>
        <p>{project.description}</p>
        {project.href ? <p><a href={project.href} target="_blank" rel="noopener noreferrer">View project on GitHub</a></p> : null}
        <p><a href={`${email}?subject=${encodeURIComponent(`Tell me about ${project.name}`)}`}>Request project details by email</a></p>
        <p><CommandLink command="projects" runCommand={runCommand}>Back to projects</CommandLink></p>
      </article>
    }
    case 'experience':
      return <section className="text-output">
        <h2>Experience</h2>
        <div className="experience-list">
          {EXPERIENCE.map(position => <article key={position.organization}>
            <h3>{position.role}</h3>
            <p>{position.organization}</p>
            <p>{position.dates} / {position.location}</p>
            <ul className="experience-highlights">
              {position.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
            </ul>
          </article>)}
        </div>
      </section>
    case 'stack':
      return <>
        <h2>Technical stack</h2>
        <ul className="stack-list">{data.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      </>
    case 'contact':
      return <>
        <h2>Get in touch</h2>
        <dl className="contact-list">
          {data.channels.map(channel => <div key={channel.name}>
            <dt>{channel.name}</dt>
            <dd><a href={channel.href} target={channel.href.startsWith('https:') ? '_blank' : undefined} rel="me noopener noreferrer">{channel.value}</a></dd>
          </div>)}
        </dl>
      </>
    case 'resume':
      return <div className="text-output">
        <h2>Resume</h2>
        <p>My resume is available on request.</p>
        <p><a href={`${email}?subject=Resume%20request`}>Request my resume by email</a></p>
      </div>
    case 'activity':
      return <section className="contribution-output">
        <h2>GITHUB CONTRIBUTION LOG / @{data.contributions.username}</h2>
        <p>{data.contributions.from} through {data.contributions.to}</p>
        <p>Updated {data.capturedAt.replace('T', ' ').replace(/\.\d+Z$/, ' UTC')}</p>
        <p>{data.contributions.total.toLocaleString('en-US')} contributions / {data.contributions.activeDays} active days</p>
        <pre className="contribution-calendar contribution-calendar-full" role="img" aria-label={`GitHub contribution heatmap: ${data.contributions.total} contributions. Exact daily counts are available in the text download.`}>{data.contributions.calendar}</pre>
        <div className="contribution-calendar-mobile">
          {data.contributions.quarters.map(quarter => <div key={quarter.from}>
            <p>{quarter.from} to {quarter.to}</p>
            <pre className="contribution-calendar" role="img" aria-label={`Contribution heatmap from ${quarter.from} to ${quarter.to}. Daily counts are available in the text download.`}>{quarter.calendar}</pre>
          </div>)}
        </div>
        <p className="contribution-legend">Less  . : + * #  More</p>
        <p>. = no contributions / each character = one day</p>
        <p>Counts reflect GitHub contributions, not only commits.</p>
        <p className="contribution-links"><a href="/activity.txt" download="tyler-dobson-github-activity.txt">Download activity.txt</a><a href="https://github.com/tylerdobson" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
        <h3>RECENT PUBLIC COMMITS</h3>
        {data.activity.length ? <ul className="activity-list">{data.activity.map(commit => <li key={commit.url}>
          <p>{commit.date.slice(0, 10)} / {commit.repo}</p>
          <a href={commit.url} target="_blank" rel="noopener noreferrer">{commit.message}</a>
        </li>)}</ul> : <p>No recent public commits available in this snapshot.</p>}
      </section>
    case 'help':
      return <>
        <h2>Available commands</h2>
        <dl className="help-list">{HELP.map(([command, description]) => <div key={command}>
          <dt>{command.includes('<') ? command : <CommandLink command={command} runCommand={runCommand}>{command}</CommandLink>}</dt>
          <dd>{description}</dd>
        </div>)}</dl>
        <p>Tab completes a command. Up/down recalls history. Esc clears your input.</p>
        <p>Commands are case-insensitive. Links and filenames are clickable.</p>
      </>
    case 'all':
      return <div className="all-output">
        {(['about', 'experience', 'stack', 'contact', 'resume'] as const).map(kind =>
          <section key={kind}><TerminalOutput output={{ kind }} data={data} runCommand={runCommand} /></section>
        )}
        <section>
          <h2>Projects</h2>
          {PROJECTS.map(project => <article className="text-output all-project" key={project.slug}>
            <h3>{project.name}</h3><p>{project.stack}</p><p>{project.description}</p>
            {project.href ? <p><a href={project.href} target="_blank" rel="noopener noreferrer">View project on GitHub</a></p> : null}
            <a href={`${email}?subject=${encodeURIComponent(`Tell me about ${project.name}`)}`}>Request project details</a>
          </article>)}
        </section>
        <section><TerminalOutput output={{ kind: 'activity' }} data={data} runCommand={runCommand} /></section>
      </div>
    case 'text':
      return <p className="plain-output">{output.value}</p>
  }
}
