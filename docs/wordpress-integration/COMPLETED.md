# Completed

As of 2026-10-04.

## The theme — every page, matching the React build

- **All 22 pages are built:**
  - Home
  - Services index and all ten service pages
  - About, How It Works, Managed Virtual Support, Client Stories
  - Insights, Videos, FAQs, Contact
  - Thank you and the 404 page
  - Articles, archives and search are built too, though React has no reference for those three.
- **All 22 match the React build exactly**, header and footer included: every heading, paragraph, link,
  image, icon and class. That is checked by a script, not by eye (below).
- **The page text is generated, not retyped.** It is exported from the React content files into the
  theme, so the two cannot drift apart. Retyping is how the first version drifted.
- **The images and stylesheets are copied from React automatically**: 59 images, 7.8 MB.
- **WordPress's own default styling is switched off**, because it added underlined links and a
  different body text size that React does not have.
- **A one-click setup screen**, Appearance → Site setup, creates the pages and services the theme
  needs. It never edits or deletes anything that already exists.

## The tools that keep it exact

| Command | Does |
| --- | --- |
| `npm run wp:export` | Copies text, images and styles from React into the theme |
| `npm run wp:reference` | Renders every React page to HTML |
| `npm run wp:compare` | Compares WordPress with React, word by word |

## Backup — 2026-10-04

- **Database backup taken and downloaded:** 29.5 MB, 158 tables, checked intact. It is in
  `wordpress-backups/`, which git ignores.
- **Not taken yet:** a files backup.

## Planning and investigation

- **Four reference documents** in [`reference/`](reference/): the live-site record, the content and
  asset audit, the architecture, and the migration runbook.
- **The live site was mapped without changing anything:**
  - There is no Divi; the live site uses WPBakery.
  - The blog posts are clean block-editor content, so they survive the theme change.
  - All 30 articles in the React build exist on live under the same URLs.

## Decisions taken

| Decision | Date |
| --- | --- |
| Custom theme, not a page-builder recreation | Week 2 |
| Migrate all ~100 articles, keeping their URLs | 2026-10-03 |
| Standard WordPress editor for articles | 2026-10-03 |
| Testimonials and client logos move into the theme | 2026-10-03 |
| Self-host the Manrope and Inter fonts | 2026-10-03 |
| Articles without a featured image get a tinted fallback block | 2026-10-03 |
| All ten orphan pages are redirected | 2026-10-03 |
| Permission confirmed for the 4 testimonials and 30 client logos | 2026-10-03 |
| Videos deferred | 2026-10-03 |
| **The theme is an exact copy, generated from the React build.** Page text is edited in React and re-exported, not in wp-admin | 2026-10-04 |
| **Fonts: match the approved mockup.** The theme no longer loads Manrope and Inter, because the mockup never did and shows the system font. The files stay in the theme; one setting turns them back on, and the mockup should change at the same time | 2026-10-04 |

## Verification actually run (2026-10-04)

- **The page comparison passes on all 22 pages.**
- **Every page returns the right status:**
  - 200 for the 12 page routes, an article, search and a category page
  - 404 for a missing page and a missing service
- **All 102 files the pages load serve correctly**: stylesheets, scripts, fonts and images.
- **The WordPress error log is empty.**
- **Syntax checks pass on every PHP and JavaScript file.**
- **React project:** lint, the type checks and a production build all pass.

## Browser review (2026-10-04)

Done in Chrome against the React build running side by side, with the user's permission.

- **Layout: identical on all 22 pages.** Every element's position and size was measured in both
  builds (6,500+ elements in all) and compared. Checked at desktop width (1536 and 1280 px) and phone
  width (390 px), in light and dark. The phone-width and dark-mode passes also compared each
  element's text colour, background, border colour, text size and weight. These ran with the theme's
  fonts switched off, so the comparison is like for like. The theme now ships that way: see the
  fonts decision above.
- **One difference found and fixed:** a colour mix on How It Works was off by one part in a million,
  from rounding.
- **Behaviour: the same as React**, step by step:
  - **Theme switch:** colours, label, icon, saved choice and browser colour all update
  - **Menus:** hover-to-open, click-to-open, Escape to close, mobile menu button
  - **Hero:** the dots
  - **Service cards:** the backdrop on hover
  - **Journey diagram:** stage selection and its panel text
  - **Article rail:** the arrows
  - **FAQs:** one-open-at-a-time on the home page
  - **Service-page accordions:** the +/− marks
  - **Systems diagram:** hover
  - **Carousel:** moves, and pauses on hover
  - **Closing slideshow:** every 6 seconds
  - **Insights:** topics, counts, paging, featured card and disabled buttons
  - **FAQs page:** topics
- **No console errors** on the home page, a service page, Insights, FAQs or an article.
- **One deliberate difference:** the WordPress slideshows pause while the browser tab is hidden;
  React's keep running. Visitors never see it.

## PHP 7.4 — the live server's version (2026-10-04)

The official PHP 7.4.33 for Windows, checksum-verified, was run against the same local site.

- Every theme file passes PHP 7.4's syntax check.
- **All 22 pages match React** in the comparison, served by PHP 7.4.
- Search, a category page, an article and the 404 respond correctly, the setup screen and its
  installer run, and the error log stays empty.
- One test-only adjustment: PHP 7.4's bundled SQLite (3.31) is older than the local database layer
  needs (3.37), so the test copy uses the newer SQLite library from PHP 8.3. The live site runs MySQL,
  so this has no bearing on it.

**The theme therefore does not depend on the PHP upgrade.** It can be installed on staging whichever
version staging runs.

## Ready for staging

- **Theme ZIP:** `npm run wp:zip` builds `wordpress-theme/virtual-office-angels.zip` — 131 files,
  8.1 MB, checked: every file's checksum valid, standard forward-slash paths, contents identical to
  the theme folder. Git-ignored; rebuild it whenever the theme changes.
- **Redirect import file:** [`redirects.csv`](redirects.csv), 26 redirects, **awaiting your review** —
  see [REDIRECTS.md](REDIRECTS.md).

## The contact form — built 2026-10-04

- The theme's enquiry form now **really sends**, through Contact Form 7 (already on live). Decisions
  of 2026-10-04: Contact Form 7, Flamingo for a saved copy of each enquiry, Contact Form 7's standard
  error messages, and Google Ads enquiries labelled from the ad-click marker.
- Appearance → Site setup creates it, sending to the address the live forms already use.
- **Checked locally** (Contact Form 7 6.1.7, the live version, and Flamingo 2.6.4):
  - The form looks identical to the mockup on the Contact page, the homepage and a service page, in
    light and dark: 20 of 20 elements measured the same
  - Every route still matches the mockup: 22/22, on PHP 8.3 and PHP 7.4
  - An empty submit shows the errors; a complete one goes to Thank You
  - The email: right fields, blank ones left out, consent recorded, Reply-To the visitor,
    "From Google ADS" only for ad visitors; Flamingo saved each one
  - With Contact Form 7 switched off, the page still loads and says the form is unavailable
- **Not checkable here:** real delivery. Nothing can send email from this machine; the emails were
  captured instead. That is the staging test.

## Changes made on request (2026-10-04)

- The two "prototype" notices — the form's small print and the footer line — removed from both
  builds.
- The ten service SEO titles end "| Virtual Office Angels" instead of "| VOA".

**Not verified:**
- **Touch devices.** Behaviour was driven by mouse and scripted clicks on a desktop browser.
