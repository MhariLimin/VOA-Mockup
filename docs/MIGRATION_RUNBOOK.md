# Migration runbook

Written 2026-10-03 for someone who has not worked with WordPress before. Every step says **why** it
exists, **what to click**, **what can go wrong**, and **what to report back**.

Follow the steps in order. Do not skip ahead — several of them exist only to make the next one safe.

> **If a screen does not match what is written here, stop and send a screenshot.** HostGator
> customises the WordPress admin, and plugin versions change their labels. Guessing is how sites get
> broken.

---

## Access matrix — read this first

Access to **cPanel** (HostGator's own control panel) was lost on 2026-10-03: it now requires email
verification on an address the user cannot reach. Restoring it is a live work item.

| Step | Needs cPanel? | Status |
| --- | --- | --- |
| 1. Backup | Only for the fallback method | **Partly blocked** — see step 1 |
| 2. Create staging | No — the HostGator plugin inside wp-admin does it | Ready |
| 3. Lock staging down | Possibly — see step 3 | Ready, with a workaround |
| 4. Scan staging | No | Ready |
| 5. Clean staging | No | Ready |
| 6. PHP 8 upgrade | **Yes** | **Blocked** |
| 7. Install the theme | No | Ready |
| 8. Rebuild content | No | Ready |
| 9. Forms | No | Ready |
| 10. SEO and redirects | No | Ready |
| 11. QA | No | Ready |
| 12. Cutover | Probably | **Blocked, and needs client authorisation anyway** |

**Three ways to restore cPanel access**, easiest first:

1. The account owner recovers the verification email, or adds a reachable address as an account contact
2. The account owner creates a cPanel sub-user
3. The account owner performs the handful of cPanel steps on a call

---

## Vocabulary

| Term | What it means here |
| --- | --- |
| **wp-admin** | The WordPress dashboard — `virtualofficeangels.com.au/wp-admin` |
| **cPanel** | HostGator's server control panel. A *different* login from wp-admin |
| **Staging** | A private copy of the whole site. Breaking it costs nothing |
| **Production / live** | The real public site. Off-limits for changes |
| **Theme** | Controls how the site looks. We are replacing this |
| **Plugin** | Adds a feature. We are removing many and keeping a few |
| **Post** | A blog article. There are about 98 |
| **Page** | A fixed page such as About or Contact. There are 30 |

---

## Step 0 — Standing rules

These hold for the whole project.

- **Never press anything labelled "Publish", "Deploy to Production", or "Push to Live"** in the
  HostGator staging tool. It overwrites the real site. Cutover is a deliberate, authorised event, not
  a button pressed in passing.
- **Never press "Restore"** in UpdraftPlus unless we are deliberately rolling back.
- **Do not change anything on the live site.** Staging only.
- **A backup lives on your own machine.** A copy sitting on the same server is not a backup.
- If something looks wrong, **stop and ask**. Nothing here is urgent enough to guess at.

---

## Step 1 — Back up the live site

### Why

Everything after this reads from the live site. If the staging clone misbehaves, or a plugin removal
goes wrong later, this is the only way back.

### Pre-flight: disk space

**A backup writes a second copy of the site onto the same server.** The site is 1.75 GB, so a full
backup is roughly another 1.5 GB. If the account does not have that headroom, the disk fills and the
live site goes down — and without cPanel there is no easy way to clear it.

Normally you would read this in cPanel → **Disk Usage**. That is currently unavailable, so:

- Open **wp-admin → HostGator** in the sidebar and look for anything about plan, storage or usage.
- Open **WP File Manager** in the sidebar and look along the bottom edge — its file browser sometimes
  shows disk space. **Change nothing.**

If neither gives a number, **do not run a full backup.** Use the database-only route below.

### 1a. Database-only backup — the safe route, do this one

The database holds every post, page, setting and testimonial. It is the irreplaceable part. The files
are mostly images, which can be re-downloaded.

1. **Settings → UpdraftPlus Backups**
2. Before anything else, look at **Existing backups** partway down. If one already exists from the
   last few days, you may only need to download it.
3. Click the **Settings** tab and check *"Choose your remote storage"*. If Google Drive or Dropbox is
   already connected, backups may already be going offsite — report this, it changes things.
4. Back on the first tab, click **Backup Now**.
5. In the window that opens:
   - ✅ Include the database in the backup
   - ❌ **Untick** "Include any files in the backup"
   - ✅ Only allow this backup to be deleted manually
6. Click **Backup Now**.
7. It should take a few minutes. When it appears under **Existing backups**, click the **Database**
   button, wait for it to prepare, then click **Download to your computer**.
8. Check the downloaded file is **not 0 KB**. Move it out of Downloads to somewhere safe.

### 1b. Full backup — only once disk space is confirmed

Same as above but leave "Include any files" ticked.

- Expect **15–60 minutes**. It will appear to stall; that is normal, because the server kills any PHP
  process after 30 seconds and UpdraftPlus resumes itself in chunks.
- Keep the browser tab open on that page.
- Download **all five** files: Database, Plugins, Themes, Uploads, Others. Roughly 500 MB in total.
- **Priority if you must stop:** Database, then Uploads. Plugins and themes are reinstallable.

### What can go wrong

| Problem | What to do |
| --- | --- |
| Backup stalls past 90 minutes | Stop. Report it. Switch to database-only |
| Backup fails partway | Settings tab → untick everything except one group → run them one at a time |
| Downloaded file is 0 KB | The download failed. Retry. A backup you *think* you have is worse than none |
| Disk fills up | Stop immediately and report. Do not run anything else |

**Blocked fallback:** cPanel → *Backup Wizard* → *Download a Full Website Backup* runs outside PHP and
ignores the 30-second limit. Unavailable until cPanel access returns.

### Report back

Database file size · whether a backup already existed · whether remote storage is connected

---

## Step 2 — Create the staging site

### Why

A private clone where everything can be broken safely. This becomes the build environment.

### Prerequisites

Step 1 complete.

### Steps

1. In wp-admin, click **HostGator** in the left sidebar.
2. Find the **Staging** section. Labels vary; look for a Staging tab or card.
3. Click **Create Staging Site** (or similar).
4. Wait. Cloning 1.75 GB takes a while — possibly 10–30 minutes. It runs on the server, so you can
   close the tab.
5. When it finishes you will get a **staging URL** — usually something like
   `staging.virtualofficeangels.com.au`. **Send it to me.**

### What can go wrong

- **Creation fails or times out.** Usually disk space — the clone needs another 1.75 GB. Report it.
- **No staging option visible.** Not all HostGator plans include it. Screenshot what you see.

### After it exists — know which site you are on

The HostGator plugin switches wp-admin between live and staging. **Before every change from now on,
confirm which one you are in.** There is normally a banner or an indicator in the plugin.

If you are ever unsure: **stop and check.** This is the single easiest way to damage the live site by
accident.

### Report back

Staging URL · how long it took · how you tell the two apart in the admin

---

## Step 3 — Lock staging down

### Why

A public copy of the site competes with the real one in Google and can outrank it. It must not be
crawlable.

### Steps

**3a. Discourage search engines** — on staging:

1. **Settings → Reading**
2. ✅ **Discourage search engines from indexing this site**
3. **Save Changes**

**3b. Hide it from visitors.** Normally cPanel → *Directory Privacy*. Without cPanel:

- The HostGator plugin may offer a **Coming Soon** or **Maintenance** mode — use it if present.
- Otherwise a maintenance-mode plugin, installed **on staging only**.

### Verify

Open the staging URL in a private browsing window. You should not see the normal site.

### Report back

Confirmation that both are done, and which method worked for 3b

---

## Step 4 — Scan staging

### Why

The live site has six theme folders with random names — `hrjrgptgkv`, `iytramqrxe`, `nhrmxetiav`,
`paexvozfiu`, `vwpbthfdlj`, `zooghjlzoo` — all reporting author "Anonymous" with no version. That is
abnormal. It may be debris from an old migration, or it may be something hiding.

We scan the **clone**, not live: same answer, and it respects the live-site permission boundary.

### Steps

1. On **staging**: **Wordfence → Scan**
2. Click **Start New Scan**
3. Wait — 10–30 minutes
4. Read the results. Screenshot anything flagged as **Critical** or **High**

### Important

**Delete nothing yet.** Report first. Deleting a file that turns out to be legitimate breaks the site;
deleting one that is malicious without understanding how it arrived means it comes back.

### Report back

Screenshot of the results summary · whether any of the six folders appear

---

## Step 5 — Clean staging

### Why

376 MB of database for ~100 posts is 50× larger than it should be — old revisions, expired temporary
data, plugin tables. Combined with the 30-second limit, this is what makes later operations time out.

### Steps — staging only, and only after step 4 is reported

**5a. Database**

1. **Plugins → Add New** → search **WP-Optimize** → Install → Activate
2. **WP-Optimize → Database**
3. Tick the safe items: post revisions, auto-drafts, trashed posts, spam comments, expired transients
4. **Run optimisation**
5. Note the size before and after

**5b. Remove the old builder and its companions**

Only once the new theme is in place and pages are rebuilt — removing these first will break how the
staging site looks. Listed here so the full set is in one place:

WPBakery Page Builder · Templatera · Visual Composer Modal Popups · Customize Twenty Sixteen ·
Max Mega Menu · Smart Slider 3 · WP-PageNavi · WP Logo Showcase · Async JavaScript ·
Duplicate Page · WP Last Modified Info · Testimonials Showcase *(export its content first — step 8)*

**Keep:** Yoast SEO · Redirection · Wordfence · UpdraftPlus · Akismet · Contact Form 7 · Imagify

**5c. The odd theme folders** — delete on staging only, after the scan has been reviewed together.

### Report back

Database size before and after

---

## Step 6 — PHP 8 — **BLOCKED**

### Why

The server runs **PHP 7.4.33**, which stopped receiving security patches in November 2022. Launching a
new site on it is not acceptable.

### Steps, once cPanel access returns

1. cPanel → **MultiPHP Manager**
2. Select the **staging** domain only
3. Set to **PHP 8.1** or **8.2**
4. Apply, then click through the staging site looking for errors

Some older plugins may break. Most of those are ones being removed anyway.

**Also worth checking:** the HostGator plugin inside wp-admin sometimes exposes a PHP version
selector. If it does, this stops being blocked. Have a look and report.

---

## Step 7 — Install the theme

### Why

This is where the approved Layout 1 design arrives.

### How the code is delivered

The theme lives in the project's Git repository and is given to you as a **.zip** file. The repository
stays the source of truth; staging is only where it runs.

### Steps

1. On **staging**: **Appearance → Themes**
2. **Add New** → **Upload Theme**
3. Choose the .zip → **Install Now**
4. **Activate**
5. The site will look broken until content is rebuilt. That is expected.

### For each later update

Same route — upload the new zip. WordPress will ask whether to replace the existing version; say yes.

**With SFTP or SSH this becomes much faster**, which is another reason to chase the cPanel access.

### Report back

That it activated without a fatal error · a screenshot of the staging home page

---

## Step 8 — Rebuild the content

### Why — and an important clarification

**The posts, images, users and settings are already on staging**, because staging is a clone. Nothing
needs importing.

The work is: **rebuild the 30 pages** in the new design, because their current content is WPBakery
builder markup that will not survive the theme change. The ~98 posts are ordinary editor content and
carry over untouched.

### Order

1. **Export the testimonials first.** Testimonials Showcase holds four of them. Copy the text out
   before that plugin is deactivated, or they are lost.
2. Rebuild the pages, highest traffic first: Home, Services, the ten service pages, About,
   How It Works, Why Us, Testimonials, Blog, Videos, FAQ, Contact.
3. Rebuild the menus: **Appearance → Menus**.
4. Deal with the ten orphan pages — see step 10.
5. Only then deactivate the old plugins from step 5b.

### Watch for

- **Three article bodies link to `stagingsite2`** — broken links that must be corrected.
- **Every post is "Uncategorized" with no tags.** Decide whether to categorise during this pass.
- **At least one post has no featured image.** Article cards will have no thumbnail.
- A client logo is recorded as `Rezi Finance (1)` — a filename artefact, not a real name.

### Report back

Pages rebuilt so far · anything in the old content with no home in the new design

---

## Step 9 — Forms

### Why

The React prototype's form is a mock — it navigates to a thank-you page and does nothing else. Contact
Form 7 is already installed and already handles the live form.

### Steps

1. **Contact → Contact Forms** — review the existing form
2. Match its fields to the new design: first name\*, last name, email\*, phone, business name,
   industry, message\*, consent checkbox\*
3. **Set the recipient address.** *Currently unknown — must be confirmed with the client.*
4. **Install WP Mail SMTP** and configure it. Without this, shared-hosting mail often lands in spam or
   vanishes
5. Spam protection: Akismet is active; add CF7's own honeypot or Turnstile
6. **Send a real test from the public staging URL**, not from the admin preview
7. Confirm it arrives, and check the spam folder too

### Report back

Confirmed recipient · a test email that actually arrived

---

## Step 10 — SEO and redirects

### Why

30 page URLs change. Without redirects, every existing link and search result lands on a 404 and the
accumulated ranking is lost.

**Good news: all 98 post URLs stay exactly as they are.** Only pages need redirects.

### Steps

1. **Yoast SEO → Settings** — re-check titles and descriptions after the theme change
2. **Remove the `ttshowcase` sitemap** once testimonials move into the theme
3. Fix the sitemap emitting `http://` URLs — usually **Settings → General**, where the WordPress
   Address and Site Address should both be `https://`
4. **Tools → Redirection** — enter the redirect map. The full map is in
   `docs/WORDPRESS_LIVE_SITE_STATUS.md` section 5.2
5. The **ten orphan pages** need a decision each — redirect or let them 404. Check Google Search
   Console for traffic first. Seven are from 2017

### Two live-site issues to raise regardless

- **`/home-old/` is publicly indexable** — a stale duplicate of the home page
- **`/contact/` and `/contact-us/` both exist** — splitting that page's authority

### Report back

Redirect count entered · decision on the ten orphan pages

---

## Step 11 — QA

Work through this on staging before anyone discusses cutover.

**Every page**
- [ ] Light theme and dark theme
- [ ] Desktop, tablet, phone
- [ ] Keyboard only — tab through, nothing unreachable
- [ ] Reduced motion enabled — no animation, nothing broken
- [ ] No console errors

**Content**
- [ ] All 98 posts present, correct dates and authors
- [ ] Featured images present, or a deliberate fallback
- [ ] No `[vc_row]` or similar shortcode text visible anywhere
- [ ] No link points at `stagingsite2`
- [ ] Testimonials present and attributed correctly

**Function**
- [ ] Contact form sends and arrives, from every page carrying it
- [ ] Menus correct on desktop and mobile
- [ ] Search works
- [ ] 404 page appears for a nonsense URL

**Redirects** — test each old URL by hand, confirm one hop to the right destination

**Performance** — PageSpeed Insights against the staging URL, both mobile and desktop

---

## Step 12 — Cutover

### Prerequisites — all of them

- [ ] Step 11 fully complete
- [ ] **Explicit written client authorisation**
- [ ] A **fresh full backup of live**, downloaded
- [ ] cPanel access restored
- [ ] A rollback plan agreed, and someone available to run it
- [ ] Scheduled for a low-traffic window, never a Friday afternoon

### Do not improvise this step

The HostGator staging tool's deploy button overwrites production wholesale. Whether that is the right
mechanism depends on what has changed on live in the meantime — if anyone has published a post on live
since the clone was made, a blind deploy destroys it.

**Come back to this document when the prerequisites are met and we will write the exact sequence
then**, against the facts as they stand at the time.

---

## Step 13 — Rollback

If cutover goes wrong:

1. Do not try to fix forward under pressure
2. **UpdraftPlus → Existing backups** → the pre-cutover backup → **Restore**
3. Select all components → run it → wait
4. Verify the site is back
5. Only then work out what happened

If UpdraftPlus itself is unreachable, the downloaded backup files plus HostGator support are the
fallback — which is exactly why step 1 exists.

---

## Progress log

| Step | Status | Date | Notes |
| --- | --- | --- | --- |
| 1. Backup | Deferred | | Waiting on cPanel access; disk headroom unverified |
| 2. Staging | Not started | | |
| 3. Lock down | Not started | | |
| 4. Scan | Not started | | |
| 5. Clean | Not started | | |
| 6. PHP 8 | **Blocked** | | Needs cPanel |
| 7. Theme | Not started | | Waiting on architecture + build |
| 8. Content | Not started | | |
| 9. Forms | Not started | | Recipient address unknown |
| 10. SEO | Not started | | |
| 11. QA | Not started | | |
| 12. Cutover | Not started | | Needs client authorisation |
