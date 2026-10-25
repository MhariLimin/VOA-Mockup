# WordPress integration

Moving the approved Layout 1 design from the React prototype onto the client's WordPress site, as a
custom theme. Last updated **2026-10-25**.

## Where things stand

- **The theme is built:** all 22 pages match the React build. It is installed on the staging copy at
  `/staging/1384/`.
- **The live and staging sites run PHP 8.3.36** since 23 October 2026.
- **What is left before launch** is all in [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md): content,
  SEO, tracking, forms, security, legal, testing and launch day.

## Files

| File | Read it for |
| --- | --- |
| [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md) | **Start here.** Everything still needed before the staging site replaces the live site |
| [COMPLETED.md](COMPLETED.md) | How the theme was built and verified (a record as of 2026-10-04) |
| [REDIRECTS.md](REDIRECTS.md) | The old-to-new address list for review, and [redirects.csv](redirects.csv) to import it |
| [reference/WORDPRESS_LIVE_SITE_STATUS.md](reference/WORDPRESS_LIVE_SITE_STATUS.md) | What the live site is, its concerns, and its open questions (snapshot of early October) |
| [reference/CONTENT_ASSET_AUDIT.md](reference/CONTENT_ASSET_AUDIT.md) | Inventory of routes, articles, images, logos, testimonials, FAQs and forms |
| [reference/WORDPRESS_ARCHITECTURE.md](reference/WORDPRESS_ARCHITECTURE.md) | How the React site maps to WordPress templates, post types and blocks |
| [reference/MIGRATION_RUNBOOK.md](reference/MIGRATION_RUNBOOK.md) | Click-by-click steps 1–13, from backup to cutover and rollback |

The theme code lives in [`wordpress-theme/`](../../wordpress-theme/README.md), which has its own build
state table and local-testing notes. Hosting, PHP and email work for all three websites is in
[`../hosting/`](../hosting/README.md).

`etc/` holds local records that stay out of Git: scan screenshots, the hosting email inventory, the
2–5 October hours and the weekly update email.

## Keeping these current

Tick and date items in the go-live checklist as they are done, rather than starting new status files.
The October status files (PENDING, BLOCKERS, TASKS) were folded into it and into
`../hosting/README.md` on 2026-10-25; git history keeps them.
