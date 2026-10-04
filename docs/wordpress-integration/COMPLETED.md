# Completed

As of 2026-10-04.

## Planning and investigation

- **Four reference documents** in [`reference/`](reference/): the live-site record, the content and
  asset audit, the architecture, and the migration runbook.
- **The live site was mapped without changing anything**, using Site Health, the Yoast sitemaps and
  screenshots.
- **Key findings**
  - **There is no Divi.** The live site runs Twenty Sixteen 3.9 with the WPBakery page builder.
  - **The blog posts are clean block-editor content**, so they survive a theme change. WPBakery markup
    exists only on Pages, and every page is being rebuilt anyway.
  - **All 30 articles in the React build exist on live under the same slugs**, so no article redirects
    are needed.
  - A draft redirect map covers every live page (status doc section 5.2).
- **Concerns recorded:**
  - PHP 7.4 is end of life.
  - Six randomly-named theme folders could be suspicious.
  - The database is 376 MB.
  - WP File Manager is active.
  - Yoast is emitting `http://` URLs.

## Decisions taken

| Decision | Date |
| --- | --- |
| Custom hybrid theme, not a page-builder recreation | Week 2 |
| Migrate **all ~100 articles**, keeping their URLs | 2026-10-03 |
| Standard WordPress block editor (Gutenberg) — no drag-and-drop builder | 2026-10-03 |
| Testimonials and client logos move into the theme; the Testimonials Showcase plugin retires | 2026-10-03 |
| Self-host the Manrope and Inter fonts | 2026-10-03 |
| Articles without a featured image get a tinted fallback block | 2026-10-03 |
| All ten orphan pages are redirected, none returns 410 | 2026-10-03 |
| Permission confirmed for the 4 named testimonials and 30 client logos | 2026-10-03 |
| Videos deferred | 2026-10-03 |

## Local test environment

- PHP 8.3.33, plus WordPress 7.1.2 on SQLite. No MySQL and no Docker, about 100 MB.
- It lives outside the project drive. Three setup traps are documented in `wordpress-theme/README.md`.

## Theme build — `wordpress-theme/virtual-office-angels/`

| Step | What | Commit |
| --- | --- | --- |
| 1 | Skeleton: activates cleanly, header and footer, menus, image sizes | `a0b8517` |
| 2 | Full stylesheet ported unchanged (3,011 lines) | `eedc6f6` |
| 3 | 8 behaviour scripts: theme toggle, menus, reveals, hero backdrop, carousel, journey, accordion | `eedc6f6` |
| 4 | Post types (services, testimonials, client logos), nav walker, icons | `a0b8517` |
| 5 | Home page, all nine sections | `ee1fa3a` |
| 8 | Article, Insights index, archive, search, page and 404 templates | `7a19c13` |
| — | Fonts subset to WOFF2, 85–88 % smaller | `e124b9b` |

## Verification actually run

- `php -l` passes on all 29 PHP files, and `node --check` passes on all 8 scripts.
- Every route was tested against seeded content: home, Insights, an article, a page, a service,
  search, and a nonsense URL. All return the correct status (200, or a genuine 404).
- **`debug.log` stays empty**, with no errors, warnings or notices.

**Not verified:**
- **Nothing has been viewed in a browser.**
- **Nothing has been tested on PHP 7.4**, which the live server still runs.
