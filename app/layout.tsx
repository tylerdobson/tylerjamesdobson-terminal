import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL('https://tylerjamesdobson.com'),
  title: 'Tyler James Dobson',
  description: 'Tyler James Dobson is a Business Analytics and Information Systems major at the University of South Florida. Explore his education, experience, skills, resume, and GitHub activity in an interactive terminal.',
  alternates: { canonical: '/' },
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#000000' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <a className="skip" href="#terminal-command">Skip to command prompt</a>{children}
  </body></html>
}
