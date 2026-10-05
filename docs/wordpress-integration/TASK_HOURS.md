# Virtual Office Angels — WordPress integration

Task list and hours, 2–5 October 2026. **Total: 32.0 hours.**

## Summary

| # | Task | Hours |
| --- | --- | ---: |
| 1 | Finish the code conversion to PHP (WordPress theme) | 9.5 |
| 1.1 | Review the current live website's WordPress page build structure | 1.0 |
| 2 | Research how to import the PHP code into WordPress | 1.0 |
| 3 | Research whether WordPress Divi is still needed | 1.0 |
| 4 | Research HostGator, Crazy Domains and Wordfence | 1.5 |
| 5 | Research whether the Business or Pro plan is better to keep | 1.0 |
| 6 | Check the current WordPress users, reset their passwords and remove unneeded access | 1.0 |
| 7 | Troubleshoot the HostGator login verification issue + reset credentials | 1.5 |
| 8 | Virtual Office Angels backup enforcement | 1.0 |
| 9 | End-of-month Wordfence scanning | 3.0 |
| 10 | Scan vulnerability assessment and actions taken | 1.5 |
| 11 | Live website audit and content inventory | 1.5 |
| 12 | Documentation and progress reporting | 1.0 |
| 13 | Client revisions of 5 October: copy, images, final page addresses, case study (mockup and theme) | 3.0 |
| 14 | Redirect map rebuilt from the client's spreadsheet and test-imported | 1.0 |
| 15 | Staging set up with the new theme, and the issues found there fixed | 2.5 |
| | **Total** | **32.0** |

Hours are estimates of the time each task took, allocated across the work actually done.

---

## 1. Finish the code conversion to PHP — 9.5 h

The approved React mockup (Layout 1) converted into a custom WordPress theme that reproduces it
exactly: same pages, headings, text, images, layout, colours, light/dark theme and interactions.
Folder: `wordpress-theme/virtual-office-angels/`

### 1a. Theme foundation and architecture — 2.0 h
- Architecture plan: how each mockup page and component maps to WordPress templates, pages, posts, a
  Service post type, menus and plugins ([reference/WORDPRESS_ARCHITECTURE.md](reference/WORDPRESS_ARCHITECTURE.md)).
- Theme skeleton: `style.css` header, `functions.php`, `theme.json` (settings only), asset loading.
- Ported the mockup's four stylesheets and rewrote its React behaviour as small plain JavaScript
  modules: header menus (hover, click, Escape, mobile), light/dark toggle, scroll reveals,
  client-logo carousel, backdrop rotator, the How It Works journey, accordions, FAQ topics, Insights
  filter and paging.
- Templates for the home page, articles, archives, search, standard pages and the 404 page.
- Self-hosted the Manrope and Inter fonts; later switched off (decision: match the mockup, which
  shows the system font). One setting turns them back on.

### 1b. Local WordPress test environment — 0.5 h
- PHP 8.3 installed; a local WordPress 7.1.2 copy (SQLite database, no server software needed)
  running the theme straight from the repository, seeded with the 30 articles. Used for every test
  below. Emails are captured to a file instead of being sent.

### 1c. Exact-copy rebuild — 2.5 h
- Scripts that generate the theme's content from the mockup itself, so nothing is retyped:

  | Command | Does |
  | --- | --- |
  | `npm run wp:export` | Copies page text, 59 images and the stylesheets into the theme |
  | `npm run wp:reference` | Renders every mockup page to HTML for comparison |
  | `npm run wp:compare` | Compares WordPress with the mockup, word by word |

- A template for every route: home, Services, About, How It Works, Managed Virtual Support, Client
  Stories, Insights, Videos, FAQs, Contact, Thank You, the ten service pages and the 404 page. All SVG
  icons ported.
- **Appearance → Site setup** admin screen: one click creates the 11 pages and 10 service pages, sets
  the home and posts pages, and seeds the services' Yoast titles and descriptions. It only adds what
  is missing; it never changes or deletes anything.

### 1d. Verification — 1.5 h
- Markup comparison: **22 of 22 pages match the mockup.**
- Browser review side by side with the mockup: layout and colours on desktop (light and dark) and
  phone width, plus every interactive part: theme toggle, menus, hero dots, service hover, journey,
  article rail, FAQ (one open at a time), accordions, systems diagram, carousel pause, 6-second
  backdrop, Insights filter and paging, FAQ topics. No console errors.
- Fixed along the way: a rounding difference on How It Works; WordPress default styles that added
  link underlines and changed the body text size; emoji scripts removed.

### 1e. Compatibility, packaging and clean-up — 1.0 h
- PHP 7.4 test (the live server's version): all 22 pages match, no PHP errors.
- `npm run wp:zip` builds the upload file `virtual-office-angels.zip` (133 files, 8.1 MB).
- Removed the "prototype" notices from the form and footer in both builds; the ten service SEO titles
  now end "| Virtual Office Angels"; fixed the "Rezi Finance" logo label; removed unused styles.

### 1f. Contact form, sending for real — 2.0 h
- Sends through Contact Form 7 (already used on live) and looks identical to the mockup: 20 of 20
  elements measured the same on the Contact page, home page and a service page.
- Sends to the address the live forms use (`clientcare@virtualofficeangels.com.au`); Reply-To is the
  visitor, so staff can answer with one click (live replies to `wordpress@` instead).
- Enquiries from Google Ads start "From Google ADS", as on live, worked out from the ad click.
- Flamingo keeps a copy of every enquiry in wp-admin, with consent, date, time and IP.
- Akismet spam checks; sent enquiries go to Thank You; if Contact Form 7 is ever off, the page says
  the form is unavailable instead of pretending to send.
- Tested in the browser and on PHP 7.4: errors, a full submission, the email, the saved copy.

## 1.1. Review the current live website's WordPress page build structure — 1.0 h

Read only, from the database backup and the public site. Nothing was changed.
- **Pages:** 30 published, all covered by the redirect list; 3 drafts (not public). 27 of the 30 are
  built with WPBakery.
- **Posts:** 98 published + 2 drafts = the 100 shown in wp-admin.
- **Menus:** four exist; the header uses "Menu top 2" through Max Mega Menu. Five services appear in
  no menu on live; the new site lists all ten.
- **Widgets and footer:** nothing the new site would lose.
- Opened the ten old pages with no new equivalent and checked each redirect against its content. Two
  targets changed. Two pages are empty. One client case study has no home on the new site yet.
- **Contact forms:** two live forms, both sending to `clientcare@`; the Google Ads one is on
  `/contact/`.

## 2. Research how to import the PHP code into WordPress — 1.0 h
- Route: **Appearance → Themes → Add New → Upload Theme** with the ZIP, activate, then
  **Appearance → Site setup**.
- What the ZIP carries (design, templates, scripts, images) and what it does not (articles, plugins,
  menus, SEO settings, redirects); those come from cloning live to staging.
- Plan: build and test on HostGator staging first, never on live. Staging can run PHP 8 while live
  stays on PHP 7.4; the theme works on both.
- Step-by-step migration runbook written ([reference/MIGRATION_RUNBOOK.md](reference/MIGRATION_RUNBOOK.md)).
- First redirect import file for the Redirection plugin prepared (26 redirects); replaced on 5 October
  by the client's full map (task 14).

## 3. Research whether WordPress Divi is still needed — 1.0 h
- **Divi is not installed and not used.** The live site runs the Twenty Sixteen theme with WPBakery
  Page Builder, Max Mega Menu, Smart Slider 3 and the Customize Twenty Sixteen plugin.
- The new theme needs no page builder, so Divi is not needed.
- Still to confirm: where the Divi belief came from, and whether anyone pays for an Elegant Themes
  (Divi) subscription that could be cancelled.

## 4. Research HostGator, Crazy Domains and Wordfence — 1.5 h
- **Wordfence:** scan options, why scans take hours on this site (old site copies in the web folder,
  214,816 files), excluding folders, recovering a stalled scan, reading the results.
- **HostGator:** the staging tool, PHP version per domain/folder, the plan comparison (task 5).
- Found that a staging copy already exists in the database, plus two old staging folders.
- Still to do (needs HostGator access): Crazy Domains registrations, renewal dates and login holder;
  the HostGator email and domain inventory.

## 5. Research whether the Business or Pro plan is better to keep — 1.0 h
- On HostGator's current plans, Business and Pro have the same features (staging, SSL, Cloudflare
  CDN, malware scanning and removal, firewall, phone and chat support). Only the size differs:

  | | Business | Pro |
  | --- | --- | --- |
  | Websites | 50 | 100 |
  | Storage | 50 GB SSD | 100 GB SSD |
  | Traffic it is sized for | ~200K visits a month | ~400K visits a month |

- Recommendation: keep one plan, most likely **Pro** (most sites are already on it). Move the few
  Business sites across, mailboxes included, and let Business lapse at its renewal date.
- Still to do: each plan's renewal date and renewal price, and the sites, domains, disk use and email
  accounts on each, from the HostGator billing page.

## 6. Check the current WordPress users, reset their passwords and remove unneeded access — 1.0 h
- Four users, all Administrators: `admin` (shown as Anne; owns all 98 posts and 30 pages, must never
  be deleted), `anne`, `voa.webdev@gmail.com` (owner unknown) and `Mhari`.
- **There is no WordPress account for Joseph.**
- **5 October, with permission:** reset the password of every administrator account, own account
  included, after the backdoored plugin was deleted.
- `voa.webdev@gmail.com` demoted from Administrator to **Contributor**, since no one appears to use it.

## 7. Troubleshoot the HostGator login verification issue + reset credentials — 1.5 h
- Verification code retrieved and password reset, but the account is locked after repeated failed
  logins. The lock also appears on mobile data, so it is on the account, not the network.
- Cause: the verification email goes to an address that is hard to reach.
- **5 October: access to HostGator regained.**
- Checked the staging tool in wp-admin (HostGator → Staging): a staging copy already exists at
  `/staging/1384`, created 22 September 2026.

## 8. Virtual Office Angels backup enforcement — 1.0 h
- First full UpdraftPlus backup failed; its log was read to find why.
- Database backup taken and downloaded: 29.5 MB, 158 tables, checked intact, stored outside the
  repository.
- Found: backups are not reaching Google Drive (the connection was never authorised or has lapsed);
  the last scheduled backups are from March and May 2025; only the two newest are kept.
- Still to do: the files backup (after checking disk space), and reconnecting off-site storage.

## 9. End-of-month Wordfence scanning — 3.0 h
- First scan ran for hours, stalled in the malware stage and was stopped. The stages before it were
  clean (spam, blocklist, server state, file changes).
- Cause: old copies of the site in the web folder (`stagingsite`, `stagingsite2`, `staging/1384`,
  `OLD_VOA`, `voa_old`, `newdirectory`, `freestrategysession`).
- Second scan with those folders excluded: completed in 40 minutes. It covered 79,663 files,
  39 plugins, 18 themes, 128 posts and 4 users, and returned 34 results.

## 10. Scan vulnerability assessment and actions taken — 1.5 h

**Assessment**
- **Critical:** *WP Logo Showcase Responsive Slider and Carousel* contains a known backdoor signature
  and links to a blocklisted domain. WordPress.org closed it permanently on 7 April 2026 for a security
  issue, so no fixed version exists. An old copy also sits in a backup folder.
- Critical updates waiting: Site Kit, UpdraftPlus, WP File Manager, WPBakery, Really Simple Security.
  Medium: nine more plugins. Two abandoned plugins. WordPress core 7.0.6 (7.1.2 out).
- The six oddly-named theme folders are clean.
- Three results ignored earlier were reviewed; Slider Revolution (critical, inactive) should still be
  removed.

**Actions taken**
- WP Logo Showcase deactivated on live, then **deleted on 5 October**, before the passwords were
  changed.
- Every administrator password reset after the deletion (task 6).
- Checked the effect of deactivating WP File Manager (nothing on the public site changes).
- Found the side effect of removing the plugin: the live home page shows the plugin's code as text
  under "Who we work with". Fix proposed.

## 11. Live website audit and content inventory — 1.5 h
- Audit from the site's Site Health report: WordPress 7.0.6 on PHP 7.4 (end of life since 2022),
  38 plugins (20 active, 18 inactive), a 1.75 GB install with a 376 MB database, WP File Manager
  active, Yoast publishing `http://` addresses, a leftover caching file.
- URL inventory from the public sitemaps: 30 pages and 98 posts. All 30 articles in the mockup exist
  on live with the same address, so no article needs a redirect.
- Content and asset audit of the mockup: every page, article, image, logo, testimonial, FAQ and form,
  with what still needs the client's approval.
- Two live posts link to the old staging copy (`/stagingsite2/why-us/`); fix recorded.
- First batch of questions for the client asked and answered (redirect all orphan pages, migrate all
  articles, testimonials and logos approved, videos deferred).

## 12. Documentation and progress reporting — 1.0 h
- Reorganised the project documentation and created the WordPress integration folder: COMPLETED,
  PENDING, BLOCKERS, TASKS, REDIRECTS and the reference documents.
- Recorded every finding as it happened, so the work can be picked up by anyone.

## 13. Client revisions of 5 October — 3.0 h

From *Recommended Changes_VOA MockUp.docx* and *VOA_Redirect_Map.xlsx*, done in both the mockup and the
WordPress theme, and checked (all 22 pages still match; light and dark checked in the browser).
- **Insights:** new heading; the two buttons in the opening removed; new header photo.
- **FAQs:** new heading; the button now reads "Ask Us a Question", solid orange.
- **Home page:** four new hero photos (two old ones replaced), resized for the web.
- **Final page addresses** for the ten services and `/managed-virtual-support` (was `/why-voa`), with
  menus and links updated and the old mockup addresses forwarding.
- **Articles at `/insights/{article}/`** in WordPress, set by Site setup, with the author, category and
  tag pages kept at their own addresses.
- **Client Stories:** the live site's client case study added, word for word, without its sales
  section (it claimed "Top 10%" where the site says "Top 5%").

## 14. Redirect map rebuilt from the client's spreadsheet — 1.0 h
- `redirects.csv` rebuilt from *VOA_Redirect_Map.xlsx*: **151 redirects**, including all 98 articles
  (each checked against the live posts). Three held back, each with a reason.
- Test-imported into the Redirection plugin on the local copy: all 151 imported, each old address takes
  a single redirect to a page that loads.

## 15. Staging set up with the new theme, and the issues found there fixed — 2.5 h

The new site now runs on the HostGator staging copy, `virtualofficeangels.com.au/staging/1384/`,
hidden behind HostGator's coming-soon page.
- **Staging refreshed:** the 22 September copy was re-cloned from the cleaned live site (no backdoored
  plugin, new passwords). The plugin's automatic sign-in failed, so staging is reached by logging in
  at its own address.
- **Installed:** Flamingo; the theme uploaded and activated; **Site setup** run: 6 pages and the 10
  service pages created, the Insights page set, articles moved to `/insights/…`, the "Website enquiry"
  form created. Search engines discouraged.
- **Fixed, each found on staging and checked there:**
  - The header sat under WordPress's admin bar for logged-in users (logo cut off).
  - Article cards showed placeholder blocks: none of the 98 live posts has a featured image, so the
    theme now uses the first picture in each article (89 have one; 9 keep the placeholder).
  - The header was taller than the mockup: old-design plugins (Customize Twenty Sixteen, WPBakery,
    WP-PageNavi, Max Mega Menu) were adding their styles and scripts. They were deactivated on staging
    only; they are retired at launch anyway.
  - A gap under the header: HostGator's "Site Preview" notice bar for logged-in users, hidden behind
    the header. The theme now hides it.

---

## Open items and recommendations

Every item below changes the live site or an account, so each needs the client's approval first.

### 1. Plugins: what to update, keep, delete or retire

The live site had 38 plugins (20 active, 18 inactive). WP Logo Showcase was deleted on 5 October,
leaving 37. "Retire at launch" means the old design depends on it, so it stays until the new theme
goes live. An inactive plugin's files can still be attacked, so inactive plugins nobody needs should be
deleted rather than updated.

**Active (19)**

| Plugin | Version (latest) | Action |
| --- | --- | --- |
| UpdraftPlus | 1.26.7 (1.26.8) | **Keep, update now** (critical security fix) |
| Yoast SEO | 28.4 (28.6) | **Keep, update now** |
| Redirection | 5.10.0 (5.10.1) | **Keep, update now** (imports the redirect map) |
| Imagify | 2.3.3 (2.3.4) | **Keep, update now** |
| Wordfence Security | 9.0.2 | **Keep**, keep updated |
| Akismet Anti-spam | 5.7.2 | **Keep** (protects the contact form) |
| Contact Form 7 | 6.1.7 | **Keep** (the new form uses it) |
| The HostGator Plugin | 3.2.1 | **Keep** (runs staging) |
| Disable XML-RPC | 1.0.1 | **Keep** (blocks a common attack route) |
| WPBakery Page Builder | 8.7.2 (9.0.1) | **Update now** (critical security fix), retire at launch |
| Max Mega Menu | 3.10.6 (3.10.8) | **Update now**, retire at launch |
| WP-PageNavi | 2.94.5 (3.0.1) | **Update now**, retire at launch |
| WP File Manager | 8.0.4 (8.0.6) | **Deactivate and delete** unless someone uses it (full file access from wp-admin; critical update waiting). cPanel's File Manager does the same job |
| Smart Slider 3 | 3.5.1.39 | Retire at launch |
| Testimonials Showcase | 1.3.7 | Retire at launch: its `/testimonial/…` pages are redirected to Client Stories |
| WP Last Modified Info | 1.9.6 | Retire at launch |
| Duplicate Page | 4.5.9 | Retire at launch |
| Async JavaScript | 2.21.08.31 | Retire at launch (abandoned) |
| Customize Twenty Sixteen | 1.0.2 | Retire at launch (abandoned) |

**Inactive (18): delete**

| Plugin | Version (latest) | Note |
| --- | --- | --- |
| Slider Revolution | 6.7.31 | **Delete first**: critical known vulnerability |
| Really Simple Security | 9.8.1 (9.8.3) | Critical update waiting; inactive, so delete. HTTPS is handled by the host |
| Site Kit by Google | 1.186.0 (1.188.0) | Critical update waiting; inactive. Reinstall later if Analytics is connected |
| MailPoet | 5.37.0 (5.40.0) | **Check first** whether it holds a subscriber list; export it before deleting |
| WPCode Lite | 2.3.9 | **Check first** for saved code snippets |
| WP Rocket | 3.16.3 | Paid caching plugin, inactive; check whether a licence is being paid for |
| LiteSpeed Cache | 7.9.1 | Caching for a server type this host does not use |
| Smush | 4.3.2 (4.3.4) | Duplicate of Imagify |
| Responsive Menu | 4.7.3 (4.7.4) | One of four menu plugins |
| WP Mega Menu | 1.4.2 | One of four menu plugins |
| WP Responsive Menu | 3.2.3 | One of four menu plugins |
| HTML5 Video Player | 2.13.0 (2.13.1) | Unused video player |
| Easy Video Player | 1.2.2.14 | Unused video player |
| Templatera | 1.1.12 | WPBakery add-on |
| Visual Composer Modal Popups | 1.4.6 | WPBakery add-on |
| Schema | 1.7.9.6 | Yoast already adds schema |
| WP Clone | 2.4.8 | Site-copy tool; a full-site export tool left installed is a risk |
| WordPress Importer | 0.9.6 | One-off import tool; reinstall if ever needed |

**Also delete:** the old plugin copies in `wp-content/updraft/plugins-old/` (an old WP Logo Showcase and
an old Slider Revolution). With HostGator access back, cPanel's File Manager can do it.

**Add with the new site:** Flamingo (saved copy of every enquiry) and WP Mail SMTP (reliable email).

**Order:** take a plugins backup in UpdraftPlus → delete the inactive plugins → apply the updates →
run a Wordfence scan.

### 2. Two-step login on every account, and access for Mhari and va4voa@gmail.com on each

The backdoor finding is a reason to lock every door, not just WordPress. Recommended for each account
below: **two-step login (2FA) on**, and access for **Mhari** and **va4voa@gmail.com**, the email the
HostGator account uses. Where a service allows extra users, each person gets their own login (an
invitation), not a shared password; where it allows only one login, the password and the 2FA backup
codes go in a password manager both can open.

| Account | 2FA | Access for Mhari and va4voa@gmail.com |
| --- | --- | --- |
| WordPress (every administrator) | Wordfence → Login Security (free) | Mhari: own administrator account (has it). va4voa@gmail.com: its own administrator account |
| HostGator | HostGator's two-step verification | va4voa@gmail.com as the account and verification email; Mhari through it or as an authorised user |
| Crazy Domains | Its two-step verification | Both, or the login in the shared password manager |
| Email (`clientcare@` and the other mailboxes) | Per mailbox, where the provider offers it | Admin access to the mail accounts |
| Google account that receives backups | Google 2-Step Verification | Owner or editor access (see 5) |
| Google Analytics, Search Console, Google Ads | Google 2-Step Verification | Added as users, if the client uses them |

### 3. Passwords

- **Done 5 October:** every WordPress administrator password reset, after the backdoored plugin was
  deleted.
- **Still to do:** new passwords for HostGator, Crazy Domains and the email accounts, now that
  HostGator access is back.

### 4. Administrator accounts

| Account | Now | Recommendation |
| --- | --- | --- |
| `admin` (Anne) | Administrator, password reset | Keep; turn on two-step login. Owns every post and page; never delete it without moving its content |
| `anne` | Administrator, password reset | Owns nothing; likely a second account of Anne's. Ask the client, then change to Subscriber or remove |
| `voa.webdev@gmail.com` | **Contributor** (since 5 October) | A Contributor can still log in and write drafts. Once the client confirms no one uses it, change it to Subscriber or delete it |
| `Mhari` | Administrator, password reset | Keep; turn on two-step login |
| va4voa@gmail.com | none | Add as its own administrator account (see 2) |

### 5. Permission to change the Google Drive that receives backups
- UpdraftPlus is set to send backups to Google Drive, but the connection is broken, and no scheduled
  backup has run since May 2025.
- Recommended: the client approves reconnecting it to a Google account the team controls (for
  example `va4voa@gmail.com`), with weekly full backups and daily database backups, keeping more than
  the current two copies.

### 6. Staging: keep it separate from live until launch
- Done 5 October: staging was refreshed from the cleaned live site and now runs the new theme (task 15).
- **Never use Deploy all changes until launch**: it copies staging over the live site.
- Keep coming-soon mode on for staging, so only logged-in users see it.
- The old design's plugins are deactivated on staging only; on live they stay until launch.

### 7. The contact form's email sending is not set up yet

- The new form is built and saves every enquiry in wp-admin (Flamingo), but **sending the email has
  not been set up or tested on the server**. On shared hosting, WordPress's built-in mail often lands
  in spam or never arrives, so treat it as not working until a real test proves otherwise.
- On staging the form's recipient is set to the developer's own email, so tests do not reach the
  client's inbox.
- Recommended, before launch:
  1. Install **WP Mail SMTP** and connect it to a real mailbox or mail service (for example the
     domain's own mailbox on HostGator, or a transactional email service).
  2. Add the domain's email authentication records (SPF, DKIM and DMARC) in DNS, so the emails are
     trusted. This needs access to wherever the domain's DNS is managed.
  3. Send a test from the staging site's own Contact page; check the inbox and the spam folder, and
     that the copy appears under **Flamingo → Inbound Messages**.
  4. Set the recipient back to `clientcare@virtualofficeangels.com.au` at launch.
- Until then, no enquiry is lost: Flamingo keeps a copy of each one in wp-admin.

### 8. Future work: let the right people edit the site's content in wp-admin

- Today the page text and pictures (headings, hero photos, service page content, FAQs) come from the
  theme itself, generated from the approved mockup. This keeps the site an exact copy of the design,
  but **any wording or picture change needs a developer** to edit the mockup and re-upload the theme.
  Only articles are edited in wp-admin.
- Recommended next phase: make the main content editable in wp-admin, limited by role:
  - **Editors** (content staff): change headings and text, swap hero and service page pictures,
    edit FAQs and testimonials, publish articles. They cannot change the design, plugins or settings.
  - **Administrators**: everything, including the layout and settings.
- How: give each page type its own editing screen (fields for each heading, paragraph and picture),
  with the theme still controlling the layout so edits cannot break the design. This can be built into
  the theme, or with a fields plugin such as Advanced Custom Fields; the choice and any licence cost
  would be agreed first.
- Trade-off: once content is edited in wp-admin, the website becomes the source of truth for it, and
  the React mockup is no longer kept in step.

### 9. Also waiting on the client
- OK to publish the case study on Client Stories (then its old address can be redirected).
- Whether the old booking link (`/voa/yes-want-book-no-obligation-appointment/`) needs a booking flow,
  or the contact form replaces it.
- OK to remove the broken plugin code from the live home page.
- Whether an Elegant Themes (Divi) subscription is being paid.
- Who runs the Google Ads, and whether auto-tagging is on (needed for the "From Google ADS" label).
- Approve the contact form's fallback wording.
