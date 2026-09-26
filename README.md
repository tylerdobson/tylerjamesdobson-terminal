# Tyler James Dobson — Terminal Portfolio

A static portfolio presented as an interactive command prompt. Visitors can explore Tyler’s background, experience, projects, technical skills, contact links, and GitHub contribution calendar using typed commands or clickable links.

Source repository: [tylerdobson/tylerjamesdobson-terminal](https://github.com/tylerdobson/tylerjamesdobson-terminal).

## Features

- Command Prompt inspired interface with clickable output and a mobile submit button.
- Commands: `help`, `dir`, `about`, `projects`, `experience`, `stack`, `contact`, `resume`, `activity`, `all`, `type`, `cd`, `history`, `cls`, and `exit`.
- Tab completion, command history, keyboard navigation, reduced-motion support, and an accessible output log.
- The terminal runs entirely in the visitor’s browser. Commands browse portfolio content; they do not execute shell commands.
- The resume is available by email request and is not bundled as a public download.

## Technology

Next.js, React, TypeScript, and CSS. The site uses a static export and system monospace fonts.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:4400](http://localhost:4400).

## Build for hosting

```sh
npm run build
```

The static site is written to `out/`. Serve or deploy the contents of that directory with a static host. The site has no server process and does not use `next start`.

The app expects to live at the domain root. Hosting it under a path such as `/portfolio/` requires configuring a Next.js `basePath` and updating root-relative links, including the activity download. Hosting and domain setup are separate from this source repository; no automatic deployment workflow is configured.

## Source files

| Path | Purpose |
| --- | --- |
| `app/page.tsx`, `app/layout.tsx` | Page assembly, metadata, and document layout |
| `app/portfolio.ts` | Biography, experience, projects, and command descriptions |
| `app/contact.ts`, `app/tech.ts` | Public contact links and technical skills |
| `components/terminal-portfolio.tsx` | Interactive terminal and command handling |
| `components/terminal-output.tsx` | Portfolio output and contribution calendar |
| `app/globals.css` | Terminal styling and responsive layouts |
| `app/activity.ts`, `app/github-activity.json` | Saved activity data and display types |
| `scripts/fetch-activity.mjs` | Refreshes the activity snapshot using public GitHub endpoints |
| `public/activity.txt` | Downloadable contribution calendar and daily counts |

## GitHub activity snapshot

The activity view is generated at build time from Tyler’s public GitHub contribution calendar and public commit endpoints. Its capture date is shown in the terminal, and the downloadable `activity.txt` contains the calendar’s daily counts. GitHub’s public calendar can include aggregate counts for private-repository activity when those counts are enabled on the profile. Recent commit details are fetched only from public endpoints. No GitHub token is required.

To refresh the snapshot separately:

```sh
npm run refresh:activity
```

If GitHub cannot be reached during a build, the build keeps the last saved snapshot and its original capture date. The standalone refresh command reports a failure instead of silently keeping stale data.

## Privacy and public content

The deployed application does not make automatic third-party requests or use analytics. Typed commands and history stay in page memory and are not transmitted or persisted. GitHub, LinkedIn, X, and email links open only when a visitor chooses them.

Experience and education details, contact links, project descriptions, skills, and the contribution snapshot are intended as public portfolio information. The `public/` directory contains only the activity download. A private resume, phone number, street address, credentials, and legacy design assets are not included.

## License

No license grant is provided for this repository. All rights reserved.
