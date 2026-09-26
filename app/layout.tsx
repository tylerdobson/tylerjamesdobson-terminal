import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL('https://tylerjamesdobson.com'),
  title: 'Tyler James Dobson — AI & Analytics',
  description: 'Tyler James Dobson works in AI model evaluation and data science, building Python and SQL analytics, decision-support tools, and automated workflows. Explore his experience and projects in an interactive terminal.',
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#000000' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <a className="skip" href="#terminal-command">Skip to command prompt</a>{children}
  </body></html>
}
