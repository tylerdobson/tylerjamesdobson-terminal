import { DATA_SCIENCE_PROGRAM, EDUCATION, EXPERIENCE, LEADERSHIP, PROJECTS, type PortfolioData } from './portfolio'

export const RESUME_NAME = 'Tyler Dobson'
export const RESUME_WEBSITE = 'https://tylerjamesdobson.com'

// Keep the PDF's public contact channels in the resume; the contact command has more options.
export function resumeChannels(data: PortfolioData) {
  return data.channels.filter(channel => ['Email', 'USF email', 'LinkedIn', 'GitHub'].includes(channel.name))
}

export function resumeChannelValue(channel: PortfolioData['channels'][number]) {
  return channel.href.startsWith('https://') ? channel.href.slice('https://'.length) : channel.value
}

// The display and download share the same source facts so corrections reach both.
export function resumeText(data: PortfolioData): string {
  return [
    RESUME_NAME.toUpperCase(),
    EDUCATION.location,
    ...resumeChannels(data).map(channel => `${channel.name}: ${resumeChannelValue(channel)}`),
    `Website: ${RESUME_WEBSITE}`,
    '',
    'EDUCATION',
    `${EDUCATION.school} | ${EDUCATION.location} | ${EDUCATION.graduation}`,
    EDUCATION.degree,
    '',
    'EXPERIENCE',
    ...EXPERIENCE.flatMap(position => [
      `${position.role} | ${position.organization}`,
      `${position.dates} | ${position.location}`,
      ...position.highlights.map(highlight => `- ${highlight}`),
      '',
    ]),
    'PROJECTS',
    ...PROJECTS.flatMap(project => [
      `${project.name} | ${project.stack}`,
      `- ${project.description}`,
      project.href ?? project.note ?? '',
      '',
    ]),
    'TOOLS & SKILLS',
    ...data.skills.map(group => `${group.name}: ${group.items.join(', ')}`),
    '',
    'RELEVANT COURSEWORK',
    EDUCATION.coursework.join('; '),
    `${DATA_SCIENCE_PROGRAM.name} | ${DATA_SCIENCE_PROGRAM.organization} | ${DATA_SCIENCE_PROGRAM.dates}`,
    ...DATA_SCIENCE_PROGRAM.highlights.map(highlight => `- ${highlight}`),
    '',
    'LEADERSHIP',
    ...LEADERSHIP.flatMap(position => [
      `${position.role} | ${position.organization}${position.dates ? ` | ${position.dates}` : ''}`,
      position.description,
      '',
    ]),
  ].join('\n')
}
