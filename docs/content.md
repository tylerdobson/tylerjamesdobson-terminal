# Content sources and maintenance

Reviewed September 26, 2026.

## Source of truth

The owner confirmed `resume.pdf` as the latest resume for this update. Its education wording, employment roles and dates, certifications, leadership, and listed tools are the source for the personal background. The original document is not distributed in this repository.

GitHub repository code and manifests were reviewed to substantiate additional languages and development tools. A technology appearing in code is evidence of use, not an expertise rating, employment history, or proof of sole authorship. The site does not invent skill percentages, years of experience, audience numbers, or production outcomes.

Projects are intentionally omitted from the site. The public GitHub activity snapshot remains available independently.

## Files to maintain

- `app/portfolio.ts`: profile, education, experience, certifications, leadership, and terminal directory/help text.
- `app/tech.ts`: categorized languages and tools. Python, SQL, R, JavaScript, HTML/CSS, Java, data/BI tools, and AI workflow tools follow the resume. TypeScript, web frameworks, Node.js, Supabase, and Playwright are supported by inspected GitHub code.
- `app/contact.ts`: public email, LinkedIn, and GitHub. The email matches both the confirmed resume and the public GitHub profile. Conflicting X profile values were omitted.
- `app/resume.ts`: text formatting only. The download reuses the same facts as the rendered resume instead of maintaining a second copy.
- `scripts/fetch-activity.mjs`: public contribution calendar and recent public commits, with the actual capture date displayed.

The source resume's phone number and additional university email are intentionally omitted from this public version. The public resume contains no project section.

## Before updating or launching

Review dates marked “Present” against the owner's current status. Treat certificate titles and dates as resume-reported unless separately verified. Do not substitute a differently worded web resume solely because its code commit is newer. Update source facts once, then check `about`, `experience`, `stack`, `resume`, `contact`, `all`, and both downloads.

The calendar refresh is a dated snapshot, not a continuous feed. A successful deployment requires a fresh calendar; recent commit retrieval is best effort. No private repository credentials or authenticated activity APIs are used by the build.
