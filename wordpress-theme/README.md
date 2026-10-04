# Virtual Office Angels — WordPress theme

The production target: a custom theme that is an **exact copy** of the approved Mock Layout 1 design,
which lives in this repository as the React app in `src/`.

The React build stays the visual and behavioural reference until this theme is approved. **Do not
destabilise it to make progress here.**

Status, tasks and blockers: `docs/wordpress-integration/` · Plan, steps and live-site facts:
`docs/wordpress-integration/reference/`

## State: every page built and matching the React build

| | Step | Status |
| --- | --- | --- |
| 1 | Skeleton | **Done** |
| 2 | Stylesheets — generated from `src/styles/` | **Done** |
| 3 | Behaviour scripts | **Done** — 9 modules |
| 4 | Services post type, icons | **Done** |
| 5 | Home page | **Done** |
| 6 | Service pages | **Done** — from data, not blocks |
| 7 | Services index, About, How It Works, Managed Virtual Support, Client Stories, Videos, FAQs, Contact, Thank you | **Done** |
| 8 | Insights, article, archive, search, generic page, 404 | **Done** |
| 9 | Block patterns | Deferred — see the architecture refinement of 2026-10-04 |
| 10 | Content, forms, Yoast, redirects | Needs staging |

## How the theme stays an exact copy

Nothing visible is retyped. Three scripts in `scripts/wordpress/` tie the theme to the React build:

| Command | Does |
| --- | --- |
| `npm run wp:export` | Regenerates `data/*.json` from the React content modules, copies every design image into `assets/media/`, and copies the four stylesheets into `assets/css/` |
| `npm run wp:reference -- <dir>` | Renders every React route to static HTML in `<dir>` |
| `npm run wp:compare -- <dir> <wordpress-url>` | Diffs WordPress against those files, tag by tag and word by word |
| `npm run wp:zip` | Builds `wordpress-theme/virtual-office-angels.zip`, the file you upload — with forward-slash paths a Linux host can unpack |

**After any change to the React content or styles:** run the export, then the comparison, and commit
the regenerated files with the change.

`tokens.css`, `themes.css`, `typography.css` and `global.css` are generated — never edit them here.
WordPress-only rules go in `assets/css/wordpress.css`; the fonts are declared in `assets/css/fonts.css`.

On Git Bash, set `MSYS_NO_PATHCONV=1` when passing a route such as `/` to the comparison, or Git Bash
rewrites it into a Windows path.

## What the theme contains

| Folder | Contents |
| --- | --- |
| `data/` | The copy, exported from React: site, home, pages, services, process, managed, faqs, testimonials, clients, articles, accent phrases |
| `assets/media/` | 59 design images, 7.8 MB |
| `assets/css/`, `assets/js/`, `assets/fonts/`, `assets/images/` | Styles, behaviour, the two self-hosted fonts, the logo |
| `inc/` | `data.php` (reads the data), `icons.php` (every SVG), `post-types.php` (Services), `install.php` (site setup), `setup.php`, `enqueue.php` |
| `template-parts/layout/` | The shared pieces: closing section, contact form, accordion, carousel, image hero, article card, pagination |
| Templates | `front-page.php`, `page-{slug}.php` for each design page, `single-voa_service.php`, `home.php` (Insights), `single.php`, `archive.php`, `search.php`, `page.php`, `404.php` |

## Installing on a site

1. Upload the theme ZIP and activate it — runbook step 7.
2. **Appearance → Site setup → Create what is missing.** It adds any of the eleven pages and ten
   services that do not exist yet, and sets the home and posts pages. It never edits or deletes
   anything, and running it twice is harmless.
3. Articles need nothing: the theme renders the posts already in WordPress.

## Running it locally

There is no local WordPress in this repository. It is built and tested against a throwaway install in
the session scratchpad: WordPress core, the official **SQLite database integration** plugin and PHP's
built-in server — about 100 MB, no MySQL, no Docker.

**Requirements:** PHP 8.3 (`winget install PHP.PHP.8.3`).

The theme folder is **linked** into `wp-content/themes/` with a directory junction, which needs no
elevation on Windows (`New-Item -ItemType Junction`), so edits show on the next request.

Things that are easy to trip over:

1. **The winget PHP ships no `php.ini`**, so none of its extensions load. Write one pointing
   `extension_dir` at the package's `ext/` folder and enabling at least `mbstring`, `sqlite3`,
   `pdo_sqlite`, `gd`, `curl`, `openssl`, `zip`, `fileinfo` and `exif`.
2. **The SQLite plugin's `db.copy` drop-in references `WP_PLUGIN_DIR` before WordPress defines it.**
   Guard it with `defined()`; the next line already has a `realpath()` fallback.
3. **Activate the theme and inspect it in two separate requests.** `switch_theme()` runs after `init`,
   so the Services post type reads as missing in the request that activates it.
4. **Extract the whole WordPress archive.** A partial extraction runs until something needs a missing
   class — the image editor, on the first media upload.

## Verification

Run on 2026-10-04 against PHP 8.3.33 and WordPress 7.1.2, with `WP_DEBUG` on and the 30 real articles
loaded.

- **All 22 React routes match** the WordPress output in the comparison — header, page and footer
- Every route returns the right status: 200 for the pages, an article, search and a category archive;
  404 for a missing page and a missing service
- 102 stylesheets, scripts, fonts and images referenced by five pages all serve 200, and both CSS
  background images resolve
- `debug.log` empty; `php -l` clean on every PHP file; `node --check` clean on every script
- React project: lint, both TypeScript configs and a production build all pass

**Browser review, same day:** every element's position, size, colours and text size measured in both
builds and compared — identical on all 22 pages at 1536, 1280 and 390 px wide, light and dark. Every
interactive part exercised on both sides with the same result; no console errors. Details in
`docs/wordpress-integration/COMPLETED.md`.

**Not verified:**

- **Touch devices.** Behaviour was driven by mouse and scripted clicks on a desktop browser.
- **Fonts match the prototype by not loading Manrope and Inter** (decision 2026-10-04). The React build
  names them but never loads them, so both show the system font. `VOA_LOAD_FONTS` in
  `inc/enqueue.php` turns them on; do the same in the React build if that happens.
- **PHP 7.4 — now verified.** The same checks pass on the official PHP 7.4.33, the live server's
  version: every page matches and the error log stays empty.
