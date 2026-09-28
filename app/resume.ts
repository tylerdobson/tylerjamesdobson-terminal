import { CERTIFICATIONS, EDUCATION, EXPERIENCE, LEADERSHIP, PROFILE, type PortfolioData } from './portfolio'

// The display and download share the same data so corrections reach both.
export function resumeText(data: PortfolioData): string {
  return [
    'TYLER JAMES DOBSON',
    PROFILE.headline,
    PROFILE.location,
    ...data.channels.map(channel => `${channel.name}: ${channel.value}`),
    '',
    'EDUCATION',
    `${EDUCATION.school} | ${EDUCATION.location}`,
    `${EDUCATION.degree} | ${EDUCATION.graduation}`,
    `Relevant coursework: ${EDUCATION.coursework.join(', ')}`,
    '',
    'EXPERIENCE',
    ...EXPERIENCE.flatMap(position => [
      `${position.role} | ${position.organization}`,
      `${position.dates} | ${position.location}`,
      ...position.highlights.map(highlight => `- ${highlight}`),
      '',
    ]),
    'TOOLS & SKILLS',
    ...data.skills.map(group => `${group.name}: ${group.items.join(', ')}`),
    '',
    'CERTIFICATIONS',
    ...CERTIFICATIONS.map(certificate => `${certificate.name} | ${certificate.issuer} | ${certificate.date}`),
    '',
    'LEADERSHIP',
    ...LEADERSHIP.flatMap(position => [
      `${position.role} | ${position.organization}${position.dates ? ` | ${position.dates}` : ''}`,
      position.description,
      '',
    ]),
    'Website: https://tylerjamesdobson.com',
    '',
  ].join('\n')
}
