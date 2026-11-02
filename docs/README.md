# Documentation

Reorganised 2026-10-04, 2026-10-25 and 2026-11-03. Removed files stay in git history.

Outside `docs/`, the repository holds only the app (`src/`, `public/`, `scripts/`) and the WordPress theme
(`wordpress-theme/`). Two local folders are never committed: `private/` (site backups, Wordfence scans,
upgrade files, Business Profile screenshots, the access register) and `misc/` (files kept beside the
project but not part of it).

## Start here

| If you need | Open |
| --- | --- |
| What is left before the new website goes live | [`wordpress-integration/GO_LIVE_CHECKLIST.md`](wordpress-integration/GO_LIVE_CHECKLIST.md) |
| Hosting, security and email to-dos for all three websites, and the monthly tasks | [`hosting/README.md`](hosting/README.md) |
| How the React prototype was built and how the user works | [`project/SESSION_HANDOFF.md`](project/SESSION_HANDOFF.md) |

## Folders

| Folder | What it holds |
| --- | --- |
| [`wordpress-integration/`](wordpress-integration/README.md) | The new Virtual Office Angels WordPress site: go-live checklist, redirects, and the `reference/` documents (architecture, live-site record, content audit, migration runbook) |
| [`hosting/`](hosting/README.md) | HostGator, PHP, security and email for Virtual Office Angels, Virtual Financial Support and Virtual Loans Assistant |
| [`seo/`](seo/) | The Sydney, Brisbane and Melbourne landing pages and the content writer brief |
| [`project/`](project/) | Session handoffs (to 26 September, and 8–18 October) and the Virtual Staffing recommendation |
| [`revisions/`](revisions/) | The numbered revision guides from the client rounds; `WEEK_3_REVISION_GUIDE.md` is the latest |
| [`client-content/`](client-content/) | The client's own source documents: About Us, HR-Managed Virtual Support, Service Pages, the content writer's city, Digital Marketing and SEO files, and the redirect map |
| [`reference-images/`](reference-images/) | Feedback screenshots the revision guides point to, the client's logo files, and `VOA LOGOS.png`, the source of the site logo (`scripts/build-logo.ps1`). Was `ref-images/` at the top level |
| [`archive/`](archive/) | Superseded material kept for history: the Bolt prompt pack (`bolt-prompts/`, was at the top level) |

## Removed

| File | When | Why |
| --- | --- | --- |
| `BOLT_REBUILD_BRIEF.md` | 2026-10-04 | Instructions for the abandoned Bolt workflow |
| `WEEK_2_ACTION_PLAN.md` | 2026-10-04 | Week 2 was complete |
| `wordpress-integration/PENDING.md`, `BLOCKERS.md`, `TASKS.md` | 2026-10-25 | Out of date since early October. Open items moved to the go-live checklist and `hosting/README.md` |
