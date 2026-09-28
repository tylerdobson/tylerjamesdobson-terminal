import type { ReactNode } from 'react'
import { CERTIFICATIONS, DIRECTORY, EDUCATION, EXPERIENCE, HELP, LEADERSHIP, PROFILE, PROJECTS, ROOT_PATH, type PortfolioData } from '@/app/portfolio'
import { resumeText } from '@/app/resume'

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
        <p>{EDUCATION.degree} at the {EDUCATION.school}. {EDUCATION.graduation}.</p>
        <p>{PROFILE.focus}</p>
      </div>
    case 'projects':
      return <section className="text-output">
        <h2>Directory of {ROOT_PATH}\projects</h2>
        <ul className="project-list">
          {PROJECTS.map((project, index) => <li key={project.slug}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}.</span>
            <div>
              <h3><CommandLink command={`projects ${project.slug}`} runCommand={runCommand}>{project.name}</CommandLink></h3>
              <p>{project.stack}</p>
              <p>{project.description}</p>
              {project.href ? <p><a href={project.href} target="_blank" rel="noopener noreferrer">View source on GitHub</a></p> : <p>{project.note}</p>}
            </div>
          </li>)}
        </ul>
        <p>{PROJECTS.length} projects. Click a name or type projects &lt;name&gt; for its details.</p>
      </section>
    case 'project': {
      const project = PROJECTS.find(item => item.slug === output.value)
      if (!project) return <p>Project not found. Type projects to list selected work.</p>
      return <article className="text-output project-detail">
        <h2>{project.name}</h2>
        <p>{project.stack}</p>
        <p>{project.description}</p>
        {project.href ? <p><a href={project.href} target="_blank" rel="noopener noreferrer">View source on GitHub</a></p> : <p>{project.note}</p>}
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
        <p>Languages and tools from my resume and GitHub work.</p>
        {data.skills.map(group => <section className="skill-group" key={group.name}>
          <h3>{group.name}</h3>
          <ul className="stack-list">{group.items.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </section>)}
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
      return <div className="all-output resume-output">
        <header className="text-output">
          <h2>Resume / Tyler James Dobson</h2>
          <p>{PROFILE.headline} / {PROFILE.location}</p>
          <p><a href={'data:text/plain;charset=utf-8,' + encodeURIComponent(resumeText(data))} download="tyler-james-dobson-resume.txt">Download resume.txt</a></p>
          <p><a href={email}>Contact me by email</a></p>
        </header>
        <section className="text-output">
          <h3>Education</h3>
          <p>{EDUCATION.school} / {EDUCATION.location}</p>
          <p>{EDUCATION.degree}</p>
          <p>{EDUCATION.graduation}</p>
          <p>Relevant coursework: {EDUCATION.coursework.join(', ')}.</p>
        </section>
        <TerminalOutput output={{ kind: 'experience' }} data={data} runCommand={runCommand} />
        <TerminalOutput output={{ kind: 'stack' }} data={data} runCommand={runCommand} />
        <section className="text-output">
          <h3>Certifications</h3>
          <ul className="experience-highlights">{CERTIFICATIONS.map(certificate => <li key={certificate.name}>
            {certificate.name} / {certificate.issuer} / {certificate.date}
          </li>)}</ul>
        </section>
        <section className="text-output">
          <h3>Leadership</h3>
          <div className="experience-list">{LEADERSHIP.map(position => <article key={position.organization}>
            <h4>{position.role}</h4>
            <p>{position.organization}{position.dates ? ' / ' + position.dates : ''}</p>
            <p>{position.description}</p>
          </article>)}</div>
        </section>
        <TerminalOutput output={{ kind: 'contact' }} data={data} runCommand={runCommand} />
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
        <section><TerminalOutput output={{ kind: 'resume' }} data={data} runCommand={runCommand} /></section>
        <section><TerminalOutput output={{ kind: 'projects' }} data={data} runCommand={runCommand} /></section>
        <section><TerminalOutput output={{ kind: 'activity' }} data={data} runCommand={runCommand} /></section>
      </div>
    case 'text':
      return <p className="plain-output">{output.value}</p>
  }
}
