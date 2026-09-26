export type SkillGroup = { name: string; items: string[] }

export const SKILL_GROUPS: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'R', 'Java', 'HTML', 'CSS'] },
  { name: 'Data & business intelligence', items: ['pandas', 'NumPy', 'ETL', 'Tableau', 'Power BI', 'Excel', 'SQLite', 'Streamlit', 'Plotly'] },
  { name: 'Web development', items: ['React', 'Next.js', 'Node.js', 'Astro', 'Tailwind CSS', 'Vite', 'Three.js', 'Supabase'] },
  { name: 'AI & assisted development', items: ['LLM evaluation', 'Prompt engineering', 'Claude Code', 'Codex', 'Cursor'] },
  { name: 'Development & testing', items: ['Git / GitHub', 'pytest', 'Playwright', 'VS Code', 'PowerShell'] },
]
