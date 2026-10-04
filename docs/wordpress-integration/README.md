# WordPress integration

Moving the approved Layout 1 design from the React prototype onto the client's WordPress site, as a
custom theme. Last updated **2026-10-04**.

## Where things stand

- **Theme build: 6 of 10 steps done.** Home page, articles, Insights, search, pages and 404 all render
  on a local WordPress with no errors.
- **Nothing has touched the live site.** No backup has been taken and no staging site exists yet.
- **Main blocker: the HostGator account is locked.** See [BLOCKERS.md](BLOCKERS.md).

## Files

| File | Read it for |
| --- | --- |
| [COMPLETED.md](COMPLETED.md) | What is done and how it was verified |
| [PENDING.md](PENDING.md) | What is left that can be worked on now |
| [BLOCKERS.md](BLOCKERS.md) | What is stuck, what it blocks, and how to clear it |
| [TASKS.md](TASKS.md) | The task list for the weeks of 5 and 12 October 2026 |
| [reference/WORDPRESS_LIVE_SITE_STATUS.md](reference/WORDPRESS_LIVE_SITE_STATUS.md) | What the live site actually is, its concerns, and every open question — the backtrack point |
| [reference/CONTENT_ASSET_AUDIT.md](reference/CONTENT_ASSET_AUDIT.md) | Inventory of routes, articles, images, logos, testimonials, FAQs and forms |
| [reference/WORDPRESS_ARCHITECTURE.md](reference/WORDPRESS_ARCHITECTURE.md) | How the React site maps to WordPress templates, post types and blocks |
| [reference/MIGRATION_RUNBOOK.md](reference/MIGRATION_RUNBOOK.md) | Click-by-click steps 1–13, from backup to cutover and rollback |

The theme code lives in [`wordpress-theme/`](../../wordpress-theme/README.md), which has its own build
state table and local-testing notes.

## Keeping these current

Update the three status files whenever a step changes state, and move items between them rather than
duplicating them. The reference documents are the detail; these files are the summary.
