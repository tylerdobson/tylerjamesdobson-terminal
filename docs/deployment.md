# Deploying the terminal portfolio

This site exports static files to `out/` and is configured for
`https://tylerjamesdobson.com`. The deployment workflow runs only when manually
dispatched on `main`; pushing code or opening a pull request does not deploy it.

## Current hosting

The site launched on September 26, 2026. Squarespace manages the domain and DNS;
GitHub Pages hosts the static site. The domain is verified on the `tylerdobson`
account, HTTPS is enforced, and `www` redirects to the apex domain. The
`github-pages` environment permits deployments from `main` only.

The [first successful deployment](https://github.com/tylerdobson/tylerjamesdobson-terminal/actions/runs/36279638125)
published commit `ff5c9eaea74bd45ed46e646b0d1492315f110bc8`. The live resume,
contribution calendar, HTTPS, and redirects were checked after deployment.
The calendar is refreshed by each manual deployment; it is not a live feed.

## Before the first deployment

Review the website content and every included download before making the site
live. The repository and exported files are public, including resume and contact
information. The build needs no application secrets or server.

The domain owner must register `tylerjamesdobson.com` if they do not already own
it, pay the registrar's registration and renewal fees, and provide access to its
DNS settings. Check availability and both prices at checkout. No domain purchase
or registrar account is configured by this repository.

GitHub Pages supports public repositories on GitHub Free. Standard GitHub-hosted
Actions runners are free for public repositories and Pages. This workflow uses
`ubuntu-latest`, retains its small Pages artifact for one day, and does not create
a dependency cache. Domain charges are separate. See [Pages availability and
limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
and [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## Configure the domain and Pages

1. In the `tylerdobson` account's **Settings → Pages**, add and verify the domain.
   GitHub provides a TXT value for
   `_github-pages-challenge-tylerdobson.tylerjamesdobson.com`. Add the exact value
   at the DNS provider, verify it on GitHub, and keep that TXT record. See
   [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
2. After the content review, open this repository's **Settings → Pages**, select
   **GitHub Actions** as the publishing source, and set the custom domain to
   `tylerjamesdobson.com`. Set the custom domain before pointing its traffic at
   GitHub Pages.
3. Add the following DNS records. Replace conflicting parking records for `@`
   and `www`, preserving unrelated records such as mail configuration. Use
   DNS-only mode if the provider offers proxying.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `tylerdobson.github.io` |

Optional IPv6 records:

| Type | Name | Value |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Avoid wildcard DNS records. GitHub Actions publishing does not require a `CNAME`
file in the source. Correct apex and `www` records let GitHub redirect `www` to
the configured apex domain. DNS propagation can take up to 24 hours. Check the
[official domain configuration guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
for the current record values before changing DNS.

4. Allow GitHub to issue the certificate, then enable **Enforce HTTPS** in Pages
   settings. HTTPS can take up to an hour after domain configuration. If the
   domain has CAA records, they must permit `letsencrypt.org`. See [HTTPS
   configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
   and [certificate troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).
5. Restrict the repository's `github-pages` environment to deployments from
   `main` in **Settings → Environments**.

## Deploy a reviewed commit

In **Actions → Deploy terminal portfolio → Run workflow**, select `main` and
run the workflow after reviewing that branch's current commit.

The workflow:

- skips builds requested on other branches;
- checks that Pages is configured for `https://tylerjamesdobson.com`;
- installs the lockfile with Node.js 22 and `npm ci`;
- requires a successful public contribution-calendar refresh;
- builds once using `npx --no-install next build`, with Next telemetry disabled;
- uploads only `out/` and deploys it using GitHub's Pages artifact flow.

Calling Next directly avoids repeating the refresh through npm's `prebuild`
hook. An unavailable calendar stops deployment. Recent public commit lookup is
best-effort and may return fewer commits or none when GitHub requests fail. The
snapshot changes in the build workspace and deployed artifact; the workflow
does not commit those changes back to the repository. Activity remains dated
until the next deployment; there is no scheduled refresh or automatic deployment.

The build job has read permissions. Only the deployment job receives Pages write
and identity-token permissions. The workflow uses GitHub's provided token, with
no stored personal access token. The Actions are pinned to full commit IDs; see
[custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

This is a domain-root build. The default project URL under
`tylerdobson.github.io/tylerjamesdobson-terminal/` requires different base-path and
download-link handling; it is not the target for this workflow. Pages serves
static files and cannot run a Next.js server or a contact-form backend.

## Verify the live site

- Confirm the apex and `www` DNS records publicly resolve correctly.
- Check the HTTPS certificate, HTTP-to-HTTPS redirect, and `www`-to-apex redirect.
- Open the terminal on desktop and mobile; check navigation, keyboard controls,
  contact/source links, the resume flow, the calendar, and activity download.
- Check for missing assets and browser console errors. Record the deployment's
  commit SHA and URL.

To roll back content, restore the prior reviewed content in a new commit on
`main`, review it, and run the workflow again.
