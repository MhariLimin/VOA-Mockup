# Virtual Office Angels — WordPress theme

The production target: a custom hybrid theme reproducing the approved Mock Layout 1 design, which
lives in this repository as the React app in `src/`.

The React build stays the visual and behavioural reference until this theme is approved. **Do not
destabilise it to make progress here.**

Plan: `docs/WORDPRESS_ARCHITECTURE.md` · Steps: `docs/MIGRATION_RUNBOOK.md` ·
Live site facts: `docs/WORDPRESS_LIVE_SITE_STATUS.md`

## State: build steps 1–5 and 8 complete

| | Step | Status |
| --- | --- | --- |
| 1 | Skeleton — activates cleanly, renders header and footer | **Done** |
| 2 | CSS port, 3,011 lines from `src/styles/global.css` | **Done** |
| 3 | JS modules | **Done** — 8 modules |
| 4 | Post types, nav walker, icons | **Done** |
| 5 | `front-page.php` and its nine section parts | **Done** |
| 6 | `single-voa_service.php` + custom blocks | Next |
| 7 | Remaining page templates (About, How It Works, Why, Client Stories, Videos, FAQs, Contact, Thank you, Services index) | |
| 8 | `home.php`, `single.php`, `archive.php`, `search.php`, `page.php`, `404.php` | **Done** |
| 9 | Patterns for client-editable sections | |
| 10 | Content, forms, Yoast, redirects | Needs staging |

Steps 1–9 need no server access.

## Running it locally

There is no local WordPress in this repository — it is built and tested against a throwaway install in
the session scratchpad, so nothing heavy lands on the project drive.

**Requirements:** PHP 8.3 (`winget install PHP.PHP.8.3`). No MySQL, no Docker, no installer.

The install uses the official **SQLite database integration** plugin, so the whole environment is
WordPress core plus one plugin plus a `.sqlite` file — about 100 MB.

Three things that are easy to trip over, recorded so they are not rediscovered:

1. **The winget PHP ships no `php.ini` at all**, so none of its bundled extensions load. One has to be
   written, pointing `extension_dir` at the package's `ext/` folder and enabling at least `mbstring`,
   `sqlite3`, `pdo_sqlite`, `gd`, `curl`, `openssl`, `zip` and `fileinfo`.
2. **The SQLite plugin's `db.copy` drop-in references `WP_PLUGIN_DIR` before WordPress defines it.**
   It has to be guarded with `defined()`, or every request dies with a fatal error. The line below it
   already has a working `realpath()` fallback.
3. **Activating the theme and inspecting it must be two separate requests.** `switch_theme()` runs
   after `init` has already fired, so the theme's post types will read as missing in the same request
   that activates it. They are fine on the next one.

The theme is **copied** into `wp-content/themes/`, not symlinked — Windows symlinks need elevation.
Re-copy after editing.

## Verification at step 1

Run against PHP 8.3.33 and WordPress 7.1.2, with `WP_DEBUG` on.

- `php -l` — all 10 PHP files pass
- Theme activates with **no errors** and **nothing in `debug.log`**: no fatals, warnings or notices
- `voa_service` registered, public, `rewrite => services`, REST enabled
- `voa_testimonial` and `voa_client` registered, non-public — so no single pages, no archive and **no
  sitemap entry**, which is what removes the stray public `ttshowcase` sitemap
- Both menu locations registered; all five image sizes registered
- `theme.json` parses, and its seven palette slugs reach `wp_get_global_settings()`
- Home page HTTP 200; a nonsense URL returns a genuine 404
- All eight stylesheets enqueue **in cascade order**; all seven scripts load
- Both fonts preload and serve as `font/woff2`
- Logos, stylesheets and images all serve 200

**Not verified:** anything visual. There is no CSS yet — step 2. The live site runs WordPress 7.0.6
against 7.1.2 here, and **PHP 7.4 against 8.3 here**, which is the larger gap: the theme is written to
run on both, but that remains unproven until it is on staging.

## Fonts

`assets/fonts/` — Manrope and Inter, self-hosted. Subset and converted to WOFF2, cutting them 85% and
88% to 23 KB and 103 KB. See the README there, including what happens if copy ever needs a character
outside the subset.
