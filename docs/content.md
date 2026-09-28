# Content sources and maintenance

Reviewed September 28, 2026.

## Source of truth

The current source is `Tyler-Dobson-Resume-Updated.pdf`, downloaded September 28, 2026. It lists a B.S. in Business Analytics & Information Systems at the University of South Florida, expected May 2027. It supplies the resume's employment roles and dates, projects, skills, coursework, and leadership. The original PDF is not distributed in this repository.

GitHub repository code and manifests were reviewed to substantiate additional languages and development tools. A technology appearing in code is evidence of use, not an expertise rating, employment history, or proof of sole authorship. The site does not invent skill percentages, years of experience, audience numbers, or production outcomes.

The projects directory includes Pausepin, UFC Prediction Model, Nostos, and tylerjamesdobson.com. Pausepin, Nostos, and the website link to their public source repositories. The UFC repository is private, so the site gives a high-level, research-stage description without a source link or prediction-performance claim. Project summaries were checked against the repositories on September 28, 2026. The public GitHub activity snapshot remains available independently.

## Files to maintain

- `app/portfolio.ts`: profile, projects, education, experience, coursework, leadership, and terminal directory/help text.
- `app/tech.ts`: categorized languages and tools from the updated resume. On September 28, Tyler requested that AI tools, including Claude Code, Codex, and Cursor, be excluded from the displayed stack.
- `app/contact.ts`: public emails, LinkedIn, and GitHub. Tyler confirmed `tydobson41@gmail.com`, `tylerjamesdobson1@gmail.com`, and `tylerdobson@usf.edu` as contact addresses on September 28. Conflicting X profile values were omitted.
- `app/resume.ts`: the resume name, public contact selection, and text formatting. The download reuses the same facts as the rendered resume instead of maintaining a second copy.
- `scripts/fetch-activity.mjs`: public contribution calendar and recent public commits, with the actual capture date displayed.

The source PDF includes a phone number, which remains omitted from the public website. The public resume uses the PDF's two email addresses and profile links; the separate `contact` command also retains Tyler's requested personal email. The public resume includes the same four projects as the site directory. Its UFC entry does not link to the private repository.

## Before updating or launching

Review dates marked “Present” against the owner's current status. Do not substitute a differently worded web resume solely because its code commit is newer. Update source facts once, then check `about`, `experience`, `projects`, `stack`, `resume`, `contact`, `all`, and both downloads.

The calendar refresh is a dated snapshot, not a continuous feed. A successful deployment requires a fresh calendar; recent commit retrieval is best effort. No private repository credentials or authenticated activity APIs are used by the build.
