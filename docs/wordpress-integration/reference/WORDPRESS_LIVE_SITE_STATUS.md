# Live WordPress status, concerns and open questions

Recorded 2026-10-02. This is the backtrack point for the migration: what the live site actually is,
what worried me about it, and what still needs a decision.

**Source of every fact below:** the WordPress Site Health report (Tools → Site Health → Info), the
Yoast sitemap index, and two screenshots of the Posts list and the post editor, all supplied by the
user on 2026-10-02. Nothing here came from touching the site.

Site: `https://virtualofficeangels.com.au` · wp-admin accessible · HostGator shared hosting ·
cPanel staging available through HostGator → Manage WordPress → Staging.

---

## 1. The headline correction: there is no Divi

The session started on the assumption that the live site runs **Divi Builder**. It does not.

| | Assumed | Actual |
| --- | --- | --- |
| Theme | Divi | **Twenty Sixteen 3.9** (a 2015 WordPress default theme) |
| Builder | Divi Builder | **WPBakery Page Builder 8.7.2** (formerly Visual Composer) |
| Menu | Divi | **Max Mega Menu 3.10.6** |
| Slider | Divi | **Smart Slider 3** |
| Theme styling | Divi options | **Customize Twenty Sixteen 1.0.2** (BoldThemes plugin) |

An inactive `twentysixteen Child Theme 1.0.0` exists but is not the live theme — the **parent** theme
is active, which means any direct theme-file edits would be lost on a WordPress update. Worth knowing,
though it stops mattering once we replace the theme.

**Still unanswered:** where the Divi belief came from. If a second WordPress install exists somewhere
with Divi on it, it has to be identified before planning continues.

## 2. The best finding: the blog posts are clean

The post editor screenshot shows a post open in the **standard WordPress block editor** with real
headings, paragraphs and an inline image. No `[vc_row]` / `[vc_column]` shortcode wrappers.

This was the single biggest risk in the whole migration and it is **not present**. Builder-authored
content does not survive a theme change — it renders as visible shortcode text — so had the articles
been built in WPBakery, every one would have needed manual rebuilding.

WPBakery markup is therefore confined to **Pages**, and every page is being replaced by a new
Layout 1 design anyway. We need the pages' URLs and their factual copy, not their markup, and both are
already captured locally.

**Caveats seen in the same two screenshots:**
- **100 posts across 5 pages.** The prototype carries 30. Roughly 70 articles are unaccounted for.
- Every post listed is **Uncategorized with no tags**.
- The post that was opened has **no featured image set** — its image is inline in the body instead.
  If that is typical, article cards in the new design have no thumbnail to pull.

## 3. Concerns, worst first

### 3.1 Six oddly-named theme directories — investigate before cloning

The inactive theme list contains six copies of Twenty Fifteen in directories named:

```
hrjrgptgkv   iytramqrxe   nhrmxetiav   paexvozfiu   vwpbthfdlj   zooghjlzoo
```

All six report author "Anonymous" and version "(undefined)", meaning they have no readable theme
header. That is abnormal. It can be debris from a failed migration, but randomly-named theme folders
with no metadata are also a known hiding place for injected files.

**Action:** run a full Wordfence scan **before** cloning to staging, so a problem is not copied
forward. Do not delete them until there is a verified backup and the scan result has been read.

### 3.1a Old site copies in the public web folder — found 2026-10-04

The Wordfence scan log shows it reading files from several other WordPress installs beside the live
site: `stagingsite/`, `stagingsite2/`, `staging/1384/`, `OLD_VOA/`, `voa_old/`, `newdirectory/` and
`freestrategysession/`. That is why the scan covers 214,816 files and takes hours.

They are publicly reachable, probably carry outdated plugins, and are a common way into a site; they
also consume the account's disk space, and UpdraftPlus does not back them up. **Nothing is to be
deleted** until the scan has been read, a full backup exists, and the client agrees which copies
still matter.

Also visible in the same screenshot: wp-admin shows **14 plugin updates** pending.

**The scan of 2026-10-04 failed** partway through the malware stage — no status update for over 16
minutes, stopped by the user. Before it stalled, five stages finished with **no issues**: spamvertising,
spam, blocklist, server state and **file changes** (core, theme and plugin files compared with the
official originals). The malware scan of file contents did not complete. The plan is to re-run it with
the old copies excluded (`stagingsite/*`, `stagingsite2/*`, `staging/*`, `OLD_VOA/*`, `voa_old/*`,
`newdirectory/*`, `freestrategysession/*`) — a live Wordfence setting, made by the user.

**The second scan completed** the same day, after the old copies were excluded: 79,663 files, 39
plugins, 18 themes, 128 posts, 21 comments, 82,232 URLs, 4 users, in 40 minutes. **34 results.**
(One more copy, `voa/`, was still scanned; add `voa/*` to the exclusions next time.)

| Area | Result |
| --- | --- |
| **The six oddly-named theme folders (Q10)** | **No malware found** in any of the 18 themes. Q10 answered |
| File changes, password strength, users and options, spam, blocklist | Clean |
| **WP Logo Showcase Responsive Slider and Carousel** | **Critical.** One file matches a known backdoor signature (`Backdoor:PHP/anylcadmin`, in `wpos-analytics/includes/class-anylc-admin.php`), and nine more link to `essentialplugin.com`, which is on Wordfence's domain blocklist. The same files also sit in an old copy at `wp-content/updraft/plugins-old/`. **wordpress.org closed this plugin permanently on 2026-04-07 for a security issue** (checked against the wordpress.org plugin API on 2026-10-04), so no fixed version exists |
| Plugins with security fixes waiting (Critical) | Site Kit by Google, UpdraftPlus, WP File Manager, WPBakery Page Builder, Really Simple Security |
| Plugins with updates waiting (Medium) | Redirection, Responsive Menu, Smush, WP-PageNavi, Yoast SEO, HTML5 Video Player, Imagify, MailPoet, Max Mega Menu |
| Abandoned plugins (Medium) | Async JavaScript, Customize Twenty Sixteen |
| WordPress core (Low) | 7.0.6, with 7.1.2 available |
| Old plugin copies | `wp-content/updraft/plugins-old/` also holds an old Slider Revolution (`revslider_old-prev`), the plugin with the critical vulnerability |

**Recommended response — every step is a live-site change, so each needs the client's approval:**

1. **Now:** deactivate and delete *WP Logo Showcase*. The old site's logo carousel disappears; the
   new theme does not use the plugin. Then re-scan, and have each of the 4 users change their password,
   since a backdoor signature cannot be ruled out as a real compromise from here.
2. Delete the stale copies in `wp-content/updraft/plugins-old/`, and the inactive Slider Revolution.
3. Take a **plugins-and-themes** backup in UpdraftPlus (no uploads, so it is small), then apply the
   security updates to the plugins the site keeps using until cutover: UpdraftPlus, Really Simple
   Security, Site Kit, Yoast SEO, Redirection, Imagify, WPBakery.
4. Deactivate and delete **WP File Manager** rather than updating it, unless someone actively uses it.
5. Plugins on the retire list that are inactive: delete rather than update.
6. WordPress core: update on staging first.

**Three results had been marked "ignored" by someone earlier:**

| Finding | Severity | Found | Recommendation |
| --- | --- | --- | --- |
| **Slider Revolution has a security vulnerability** | **Critical** | 2024-12-04 | Inactive, but its files are on the server, and it is among the most attacked plugins. **Remove** — it is already on the retire list. Needs client approval |
| Velvet Blues Update URLs appears abandoned (last updated 2020) | Medium | 2023-05-02 | A one-off URL tool, not needed day to day. Retire |
| 50 paths skipped for the malware scan by scan settings | Low | 2023-02-24 | An existing exclusion list; review what it skips |

### 3.2 PHP 7.4.33 — end of life

`php_version: 7.4.33`. PHP 7.4 stopped receiving security patches in November 2022. A new theme
should target PHP 8.1 or later.

Changed in cPanel → MultiPHP Manager, **on staging first** — several of the older plugins may not
survive the jump, though most of those are ones being removed anyway.

### 3.3 The install is very heavy

| Measure | Value | Note |
| --- | --- | --- |
| Total size | 1.75 GB | |
| **Database** | **376.44 MB** | Far larger than ~100 posts justifies — likely revisions, Wordfence tables, transients |
| Uploads | 240.09 MB | |
| Plugins on disk | 206.11 MB | 38 plugins installed |
| PHP `time_limit` | **30 s** | Clones, backups and imports commonly time out at this |
| `max_input_vars` | 1000 | Large builder pages can exceed this when saving |

The 30-second limit combined with a 376 MB database is the usual reason a staging clone or an
UpdraftPlus restore fails halfway. Cleaning the database before cloning is worth the time.

### 3.4 WP File Manager is active

`WP File Manager 8.0.4` gives filesystem access from inside wp-admin and has a history of serious
vulnerabilities. It should be deactivated unless someone is actively using it.

### 3.5 Yoast is emitting `http://` URLs

The sitemap index lists its six child sitemaps as `http://virtualofficeangels.com.au/...` even though
Site Health reports `https_status: true`. Usually means the WordPress Address / Site Address settings
are still `http`. It affects canonical URLs and is worth fixing regardless of this project.

### 3.6 Leftover caching drop-in

`advanced-cache.php` is present as a drop-in while `WP_CACHE` is `false`, and three caching plugins
are installed (Async JavaScript active; LiteSpeed Cache and WP Rocket inactive). Harmless, but it is
dead weight and can confuse later debugging.

### 3.7 Contact Form 7 — two forms, read 2026-10-04

Read from each form's Mail tab by the user; nothing saved.

| | Contact form (2016) | Contact form_Ads (2024) |
| --- | --- | --- |
| Shortcode id | `e2c7adb` | `32bf865` |
| **To** | `clientcare@virtualofficeangels.com.au` | same |
| From | `[EnterFirstName] <wordpress@virtualofficeangels.com.au>` | same |
| Subject | Virtual Contact Form | same |
| Additional headers | `Reply-To: <wordpress@virtualofficeangels.com.au>` | same |
| Body | First name, last name, email, phone, message | Same, headed "From Google ADS" |
| Mail (2), the visitor's copy | Off | Off |

- **Reply-To points at `wordpress@`, not the visitor.** Pressing Reply on an enquiry does not answer the
  visitor; staff have to copy the address from the body. The new form sets Reply-To to the visitor.
- The Ads form differs only by the "From Google ADS" line in the body, so it is how Google Ads
  enquiries are told apart.
- **Where each form is used** (from the database backup, published pages only):
  - **Contact form_Ads** (post 1890): only on the page **Contact, `/contact/`** (page 1887, created
    2024-02-05, two weeks after the form). That page is the Google Ads landing page.
  - **Contact form** (post 100): About Us and eight service pages.
  - An unused Templatera template, "Contacr Us", points at a form 696 that no longer exists. Harmless.
- **Clash at cutover:** the new site's main Contact page also lives at `/contact/`, reached from the
  menu. A fixed "From Google ADS" label there would mislabel every ordinary enquiry. The label has to
  come from the visit instead (Google's ad-click marker in the address), which depends on how the ads
  are set up: unknown, no Ads access.
- The footer says the mail came from "Design", the site's title when the form was made in 2016.
- The red **1** on the Contact menu: the backup holds **no recorded configuration errors** for either
  form, so it most likely counts the "Validate Contact Form 7 Configuration" notice itself, a check that
  has not been run since the plugin was updated.

## 4. Plugins: 20 active, 18 inactive

### Keep through the migration

| Plugin | Why |
| --- | --- |
| **Yoast SEO 28.4** | SEO configuration and sitemaps |
| **Redirection 5.10.0** | Already installed — this is the redirect-map tool |
| **Wordfence Security 9.0.2** | Security scanning |
| **UpdraftPlus 1.26.7** | Backup and restore |
| **Akismet 5.7.2** | Comment spam |
| **Contact Form 7 6.1.7** | The current contact form. Simple, migrates cleanly |
| **Imagify 2.3.3** | Image optimisation |

### Retire with the old theme

WPBakery Page Builder · Templatera · Visual Composer Modal Popups · Customize Twenty Sixteen ·
Max Mega Menu · Smart Slider 3 · WP-PageNavi · WP Logo Showcase · Async JavaScript ·
Duplicate Page · WP Last Modified Info

### Decide

- **Testimonials Showcase 1.3.7** creates a `ttshowcase` post type with its own **public sitemap**.
  The testimonials are therefore *content*, not theme text. Keep the post type, or move them into the
  new theme?
- **WP File Manager** — see 3.4.

### Duplication to clear up

Three menu plugins (Max Mega Menu active; WP Mega Menu, Responsive Menu, WP Responsive Menu inactive),
two sliders (Smart Slider 3 active, Slider Revolution inactive), two image optimisers (Imagify active,
Smush inactive), three caching plugins, two video players (both inactive). **Site Kit by Google is
inactive**, so Analytics and Search Console are probably not connected through it — needs confirming
separately.

## 5. URL inventory and draft redirect map

Fetched read-only from the public Yoast sitemaps on 2026-10-03, with the user's authorisation. No
other access to the site.

- **`page-sitemap.xml` — 30 pages**
- **`post-sitemap.xml` — 98 URLs listed.** The wp-admin Posts screen shows "100 items" and the fetch
  tool's own header counted 96. The difference is probably drafts or pending posts, which do not
  appear in a sitemap. **Confirm the exact published count from wp-admin** before the migration.
- Permalinks are `/%postname%/`. Yoast also publishes `ttshowcase`, `category`, `post_tag` and
  `author` sitemaps.

### 5.1 Posts

**All 30 articles in the React build exist on live, slug for slug — zero mismatches.** That means the
prototype's article URLs can be kept exactly as they are and no post needs a redirect.

**68 live posts are not in the build.** Per the decision in section 6, all of them migrate.

### 5.2 Pages — the draft redirect map

Twenty of the thirty pages map onto a new route:

| Old live URL | New route | Note |
| --- | --- | --- |
| `/` | `/` | unchanged |
| `/services/` | `/services` | unchanged |
| `/mortgage-loans-processing-support/` | `/services/mortgage-loans` | |
| `/financial-planning-assistance-administration/` | `/services/financial-planning` | |
| `/accounting-bookkeeping-assistance/` | `/services/accounting-bookkeeping` | |
| `/real-estate-administration-support/` | `/services/real-estate-conveyancing` | |
| `/business-back-office-and-admin-support/` | `/services/back-office-admin` | |
| `/digital-marketing-assistance/` | `/services/digital-marketing` | |
| `/sales-and-marketing-support/` | `/services/sales-marketing` | |
| `/creative-writing-and-copywriting-assistance/` | `/services/creative-copywriting` | |
| `/it-services-and-technology/` | `/services/it-technology` | |
| `/about-us/` | `/about` | |
| `/how-it-works/` | `/how-it-works` | unchanged |
| `/why-us/` | `/why-voa` | |
| `/testimonials/` | `/client-stories` | |
| `/blog/` | `/insights` | |
| `/videos/` | `/videos` | unchanged |
| `/faq/` | `/faqs` | note the plural changes |
| `/contact-us/` | `/contact` | |
| `/contact/` | `/contact` | **duplicate of the above — two live contact pages** |

**`/services/insurance-processing` has no old equivalent.** It is a genuinely new page. Nine of the
ten services map; insurance processing does not exist on the live site.

### 5.3 Ten pages with no destination — decision needed

Seven are from **2017** and have not been touched since:

`/specialised-recruitment/` · `/businesses-these-days/` · `/client-case-studies/` ·
`/simply-too-busy/` · `/we-do-what-other-company-dont/` · `/work-with-us/` · `/how-we-help/`

Three are more recent:

- `/specialised-recruitment-services/` (2024) — near-duplicate of the 2017 `/specialised-recruitment/`
- `/home-old/` (2024) — a stale copy of the home page, **currently indexable**
- `/yes-want-book-no-obligation-appointment/` (2024) — a booking funnel page

Each needs either a redirect target or a deliberate 410. Check Search Console for traffic before
deciding — a 2017 page with inbound links is worth redirecting; one with none is not.

Two to raise regardless of this project: **`/home-old/` should not be indexable**, and the duplicate
`/contact/` and `/contact-us/` pages are splitting whatever authority that page has.

## 6. Decisions taken

Answered by the user on 2026-10-03.

| # | Question | Decision |
| --- | --- | --- |
| Q2 | The ~68 extra live articles | **Migrate all of them.** Every post keeps its URL, so no post redirects are needed and no ranking is lost |
| Q3 | Can the client work without a drag-and-drop builder? | **Yes — Gutenberg with pre-built patterns.** The custom hybrid theme proceeds as planned |
| Q4 | Testimonials | **Move into the theme.** Four testimonials do not justify a plugin and a custom post type; this removes the Testimonials Showcase dependency and the stray public `ttshowcase` sitemap |
| — | Wordfence scan | User will run it |
| — | Sitemaps | User authorised the read-only fetch; done, see section 5 |

### Consequences of Q4

- `ttshowcase` URLs currently sit in a public sitemap and may be indexed. Each one needs a redirect to
  `/client-stories` and the sitemap must be removed from Yoast.
- The testimonial content must be exported from the post type before the plugin is deactivated.

## 6a. Still open

| # | Question | Status |
| --- | --- | --- |
| Q1 | Where did the Divi belief come from — is there a second WordPress install? | **Open** |
| Q5 | Does hosting stay on HostGator? | **Open** |
| Q6 | Contact Form 7 recipient | **Resolved 2026-10-04:** `clientcare@virtualofficeangels.com.au`. See 3.7 |
| Q7 | Analytics / Search Console | **No access** (2026-10-03). Orphan-page decisions are made without traffic data |
| Q8 | Posts have no categories or tags; at least one has no featured image. Fix during migration, or accept? | **Open** |
| Q10 | Do the six odd theme directories appear in the Wordfence scan? | **Awaiting scan** |
| Q11 | Ten orphan pages: redirect or 410? | **Resolved 2026-10-03: redirect all ten.** No Search Console access, so we do not guess — a redirect keeps any inbound link value, a 410 discards it |
| Q12 | Exact published post count: wp-admin says 100, the sitemap lists 98 | **Open** |

### Q9 — backup: DONE (database only), 2026-10-04

A database-only UpdraftPlus backup was taken on 2026-10-04 and downloaded off the server:
`backup_2026-10-04-0610_…-db.gz`, 29.5 MB, 158 tables. It was checked locally: the archive is
intact and its header names the live site, WordPress 7.0.6, PHP 7.4.33 and MySQL 5.7.44. It is kept in
`wordpress-backups/`, which is git-ignored — it holds user accounts and must never reach GitHub.

**Three things the backup log revealed:**

- **The Google Drive connection does not work.** UpdraftPlus lists Google Drive as remote storage, but
  the upload failed with `no_refresh_token` — it was never authorised, or the authorisation lapsed.
  Backups have therefore not been reaching Drive; the last ones in the history are May and March 2025.
  Reconnecting it needs a decision on *whose* Google account backups belong in (task 9).
- **A staging copy already exists in the same database:** 158 tables prefixed `staging_`. Check
  wp-admin → HostGator → Staging before creating another.
- **There are two staging copies on the server, not one.** Wordfence's file list in the backup names
  files under both `/stagingsite/` and `/stagingsite2/`. The first has Elementor, Jetpack and Twenty
  Twenty-Five installed — a different setup from the live site, and possibly where the belief that the
  site uses a page builder other than WPBakery came from (Q1).
- **UpdraftPlus keeps only the two newest database backups** (`retain_db=2`), and pruned the March 2025
  one during this run.

Still outstanding: a **files** backup (uploads, themes, plugins), which waits on a disk-space check —
see runbook step 1b.

## 7. Standing constraints

- **Nothing is built, tested or cleaned on the live site.** Staging only, until cutover is explicitly
  authorised.
- A verified, downloaded backup exists before any clone, PHP change or plugin change.
- Staging is password-protected and set to discourage search engines — an indexable staging copy
  competes with the live site in search results.
- The WordPress build happens in an isolated directory. The React app in this repository stays
  operational as the visual reference until the WordPress version is approved.
