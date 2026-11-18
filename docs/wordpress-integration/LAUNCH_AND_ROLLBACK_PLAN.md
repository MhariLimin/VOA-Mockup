# Launch and rollback plan: VOA staging to the live website

30 October 2026, updated 8 November · VA Mhari. **Launch date: to be confirmed by Ms Anne.** It was
set for Tuesday 3 November, after the meeting, and is on hold. VA Mhari launches it; no sign-off is needed.

This is the exact sequence that step 12 of [`reference/MIGRATION_RUNBOOK.md`](reference/MIGRATION_RUNBOOK.md)
left to be written once the facts were known. It replaces steps 12 and 13 there. What must be finished
*before* launch (content, SEO, tracking, legal, testing) stays in
[`GO_LIVE_CHECKLIST.md`](GO_LIVE_CHECKLIST.md) sections 1–6.

## How the launch works

The new website is already built on staging (`/staging/1384/`): the new theme, the new pages, all 100
articles at `/insights/{article}/`, and the redirects tested. Launch copies staging over live with
HostGator's staging tool (**Deploy all changes**). That replaces live's files **and its database**.

Because the database is replaced, **anything changed on live after staging was copied is lost**
unless it is copied to staging first:

| Changed on live | What happens at launch | What to do |
| --- | --- | --- |
| A new article | Lost | Freeze: no new articles on live until the launch is confirmed. Any already published: add to staging, plus a row in `redirects.csv`. Checked 1 November: no article or page added or changed on live since 28 October; both sites have 100 articles |
| Contact form enquiries kept in wp-admin, comments | Lost from wp-admin (the emails already sent are not affected) | Export them from live on launch day, before the deploy |
| Plugin updates, settings, users, passwords | Staging's versions replace them | Make the same change on staging, or redo it after launch |
| Wordfence licence key | Staging's own free key replaces live's **Premium** key: live drops to the free version | Put live's Premium key back after launch (step 12). **Required** |

Email, the domain and DNS are not touched by the launch.

## Who

| Who | Does |
| --- | --- |
| VA Mhari | Every wp-admin and HostGator step, and the decision to roll back (the 30-minute rule below) |
| Claude (in a session) | The checks from outside: every page, all 154 redirects, the sitemap, search-engine settings |
| HostGator support (live chat) | Standby, in case wp-admin is unreachable |

## Before the launch day

### Before the launch day

1. **Launch window:** the date Ms Anne confirms, 3 hours. Keep the rest of that day and the next
   morning free in case something needs fixing.
2. Tell the team the **content freeze**: nothing published or changed on live until the launch is
   confirmed.
3. **Live's Wordfence Premium key** is in the password manager (copied 30 October, before staging
   was reset to a free licence). Never in chat or in this repository. Also confirm the wordfence.com
   login works and the licence does not expire around the launch date.
4. **Deploy method** confirmed 2 November. It is in **staging's** wp-admin: HostGator →
   Manage WordPress → **Staging** section, or directly
   `/staging/1384/wp-admin/admin.php?page=hostgator#/settings/staging`. The Staging Site row has a
   menu set to **Deploy all changes** (the default; keep it, so files and database match), a dark
   **↻** button that runs the deploy, and a red bin that **deletes staging**. The Production Site row
   has **Clone to staging**, which copies live over staging and would wipe the new website: never
   click it. Staging was created 22 September 2026.
5. The staging sitemap cleanup done (1–2 November).

### The day before

6. Check again for any article, page or setting changed on live since 28 October (none on
   1 November). Copy each one to staging (an article also needs a row in `redirects.csv`). This
   includes any of the writer's November articles published on live. VA Mhari is the only one who
   uploads articles (11 November), so this is a short check of her own uploads, not a full comparison.
7. ~~Delete the "Staging test" redirect group on staging~~ Done 2 November, after the addresses and
   SEO update (Appearance → Site setup) was applied and checked. Staging's old addresses now answer
   404 until live gets `redirects.csv` at step 10.
8. Back up **staging** (UpdraftPlus, database and files) so the build itself is safe.
9. **New passwords ready** *(added 8 November)*. The deploy gives live staging's users and
   passwords, so without a change both websites share the same logins, and a password leaked from
   staging would also open live. On staging, Users → All Users: remove former staff and accounts
   nobody uses (the deploy carries the list to live). For each user who stays, a new strong password
   for **live**: ready 8 November in a private file outside this repository (all five users kept).
   Never in chat or this repository. Do not
   set them on staging: the deploy would copy them to live and the two would match again.
10. **Staging up to date** *(added 8 November)*: the latest theme uploaded (the 3 November build: the
    Videos page, service-page feedback, the four home testimonials), plus anything approved since
    (post categories, News & Community, Privacy Policy and Terms of Use) built into the theme,
    uploaded, then Appearance → Site setup. Check the changed pages on staging by eye.
    **Which theme is active goes live.** Staging can hold two themes (9 November): "Virtual Office
    Angels", the approved site, and "Virtual Office Angels (Preview)", which adds the items waiting
    for approval. Before the deploy, Appearance → Themes must show the approved one as **Active**,
    unless Ms Anne has approved the preview's items by then.
    Both installed on staging on 9 November, the approved one active (with the six new client
    logos), the preview installed but not active.
11. **Contact form tested on staging** *(added 8 November)*. In the team leaders' review (tracker,
    "Staging site comments"), enquiries from Mortgage, Financial Planning and Accounting arrived, but
    those from most other pages were reported as not received. Check Flamingo → Inbound Messages on
    staging for those tests, then send a fresh test from the Contact page, a service page and the home
    page, and check `clientcare@virtualofficeangels.com.au`, spam included. Fix any failure before
    launch: launch day's single test (step 13) is too late to find it.
    **Tested 11 November:** Flamingo holds all 20 of the team leaders' tests (13–14 October), so the
    form saved every one. Fresh tests from 12 pages (home, About, Services and nine service pages):
    each reached the server; 7 were sent and arrived in clientcare, and 5 were stopped by **Akismet**
    as spam (reCAPTCHA had passed them), because one address sent many in a few minutes. The other
    12 pages show the same working form (checked without sending). Two things to fix before launch:
    - **Akismet's false positives are silent.** The visitor sees "There was an error trying to send
      your message", no email is sent, and the enquiry sits in Flamingo → Inbound Messages → Spam.
      **Fixed in the theme, 12 November** (`inc/forms.php`, VA Mhari's choice): an enquiry only
      Akismet objects to is now sent, with "[Check: possible spam]" at the start of the subject, and
      the visitor gets Thank You. Anything reCAPTCHA or Contact Form 7's own checks catch stays
      blocked, and the visitor is then shown the email address and phone number. Uploaded and
      tested 12 November with Akismet's test name: sent, Thank You shown, and the email arrived in
      clientcare labelled "[Check: possible spam]". Flamingo still
      files its own copy of such an enquiry under Spam (it reads Akismet's verdict itself); the
      email is what the team works from.
    - **WordPress's admin email** (Settings → General) on staging is an address built from Ms Anne's name,
      not a valid address, so WordPress's notices go nowhere. Set a real address on staging so the
      deploy carries it; WordPress confirms it by email first. 12 November: changed to
      the team's support Gmail address (VA Mhari's choice) and confirmed the same day.
    - **Test enquiries cleared** from staging's Flamingo on 12 November (38: the team leaders' and
      ours), Trash emptied, so none reach live. Any test sent after this adds a new one: clear it
      again before the deploy.
12. **Settings made on staging, so the deploy carries them** *(added 8 November)*: author archives
    off if agreed (go-live checklist section 4); the Google Search Console verification code in
    Yoast (Settings → Site connections): done 8 November, on live and staging.

## Launch day

Times are from the start of the window. Stop at any step that does not go as written.

### Backup: 0:00 to 0:45

1. **Full backup of live**, kept off the server, by both routes:
   - UpdraftPlus → Backup Now with the database and **all** files. Download all five parts
     (Database, Plugins, Themes, Uploads, Others) and check none is 0 KB.
   - cPanel → **Backup Wizard** → full backup, downloaded too, if cPanel access is available. It
     runs outside WordPress, so it works even if wp-admin breaks.
2. Export from live what the deploy would lose: anything from the step 6 list. Checked 12 November,
   nothing else needs exporting: live has no Flamingo, so its enquiries exist only as emails in
   clientcare; the inactive newsletter plugin (MailPoet) holds only Ms Anne's own two addresses,
   added at install in February 2023 and never confirmed, and an older email plugin's tables are
   empty.
3. Write down the time. **Rollback is possible from here on.**

### Deploy: 0:45 to 1:15

4. Staging's wp-admin → HostGator → Manage WordPress → **Staging** (before-launch step 4). Check the
   menu says **Deploy all changes**, then click the dark **↻** button beside it and confirm if asked.
   Wait until it reports success. Do not click anything else while it runs, and never **Clone to
   staging** or the red bin.
5. Open `https://virtualofficeangels.com.au/` in a private window. It shows either the new home page
   or the Coming Soon page. Either is fine at this point. A server error is not: go to **Rollback**.

### Switch it on: 1:15 to 1:45

All on **live** wp-admin (`virtualofficeangels.com.au/wp-admin/`), which now has staging's logins.

6. **Coming soon off.** HostGator → Coming Soon → Turn off (or the admin bar notice).
7. **Search engines allowed.** Settings → Reading → untick *Discourage search engines from indexing
   this site* → Save. *(Staging had it ticked. Left ticked, Google drops the whole website.)*
8. **`https` addresses.** Settings → General → WordPress Address and Site Address both
   `https://virtualofficeangels.com.au` → Save. Log in again if asked. This fixes the `http://`
   addresses in the sitemap.
9. **Permalinks refreshed.** Settings → Permalinks → Save Changes, without changing anything.
10. **Redirects imported.** Tools → Redirection → Import/Export → Import → `redirects.csv` (the
    live file, *not* the staging one). Count: **154**.
11. **Cache cleared.** Admin bar → Caching → Purge All, and any other cache plugin live shows.
12. **Wordfence Premium back on.** Live's licence is **Premium**; the deploy brings staging's free
    key. Wordfence → Dashboard → Global Options → Wordfence License → paste live's key (from the
    password manager) → Save. Check the licence box says **Premium**. If it says the key is in use
    elsewhere, log into wordfence.com and assign the licence to `virtualofficeangels.com.au`; do not
    buy a new one. Then Wordfence → Firewall → Manage WAF: *Enabled and Protecting*, *Extended
    Protection*. The deploy may carry staging's firewall setting, which points into
    `/staging/1384/`. If the level says Basic, or Wordfence says the firewall is set up for another
    path: **Remove Extended Protection** if offered, then **Optimize the Wordfence Firewall** again
    (LiteSpeed/lsapi, both sites optimised on 31 October). Staging shows a notice that it is linked
    to Wordfence Central under a different site URL, from the copy; if live shows it after the
    deploy, never click **Disconnect all**: note it and check before acting.

### Test: 1:45 to 2:45

13. VA Mhari, in a private window, on a computer and a phone:
    - Home, About, Services, one service page, Client Stories, Insights, one article, FAQs, Contact
    - Light and dark mode on the home page; the menu on the phone
    - **A real contact form enquiry**: it lands on Thank You and the email reaches
      `clientcare@virtualofficeangels.com.au` (check spam)
    - A few old addresses: `/about-us/`, `/contact-us/`, an old service page, an old article
14. Claude, from outside:
    - every page answers 200, and a nonsense address answers 404
    - all 154 redirects take one 301 to the right page, and their 117 destinations load
    - `http://` and `www.` addresses go to `https://virtualofficeangels.com.au/`
    - the sitemap lists only `https://` addresses: 13 pages and 100 articles, no old pages, no
      Thank You
    - no page tells search engines to stay away, except Thank You
    - no link or image points at `/staging/1384/`
15. **Decision at 2:45:** launched, or **Rollback**. Report the result to the team.

### After the window

16. Google Search Console: submit `https://virtualofficeangels.com.au/sitemap_index.xml` (once access
    is given). Google Analytics: the tracking code added, if the property is set up, and a visit shows
    in its Realtime report.
17. Google Business Profile: check the website link and the hours (9am–6pm).
18. Off-site backups *(added 11 November)*: live now has staging's UpdraftPlus settings, Google Drive
    (the team's support Gmail address; files weekly, keep 4; database daily, keep 14). UpdraftPlus →
    Settings: check the account holder shown is that account, not the old one, then Backup Now
    (database only) and check it reaches Drive's `UpdraftPlus` folder.
    Wordfence → Scan → Start New Scan on live, now the new website. Plugins: the old site's plugins
    (the old page builder, the newsletter plugin and the others named in `private/wordpress-security/`)
    are gone, as on staging.
19. End the content freeze.
20. **New passwords on live**, the same day: Users → each user → Edit → Set New Password, pasted from
    the private passwords file (before-launch step 9; it has a box to tick for each user). Change
    Mhari last, as WordPress may ask you to log in again. Tell each person their new live password
    privately. Staging keeps the old ones. Then move the passwords into the password manager and
    delete the file. Then turn on two-step login for the administrators (Wordfence → Login Security).
    If staging is ever deployed again, live gets staging's passwords back: set them again.

## When to roll back

Roll back if any of these is still wrong **30 minutes** after it is found:

- The website or wp-admin shows an error, or a blank page
- The home, Contact or service pages are broken for visitors
- The contact form does not deliver
- Most redirects fail, or pages loop ("too many redirects")
- The Coming Soon page cannot be switched off

Fix these *without* rolling back: a wrong redirect, a missing image, a typo, a Search Console or
Business Profile step.

## Rollback

Staging is not changed by a deploy, so the new website stays safe there while live goes back.

1. Tell the team the rollback has started, and the time.
2. **If wp-admin opens:** UpdraftPlus → Existing backups → the backup from launch step 1 →
   **Restore** → tick all five parts → Restore. If that backup is not listed (the deploy may have
   replaced the backup folder): **Upload backup files** → choose the five downloaded files → then
   Restore as above.
3. **If wp-admin does not open:** HostGator live chat. Ask them to restore the site from the cPanel
   full backup (launch step 1), or from their own server backup made before the launch time.
4. Admin bar → Caching → Purge All.
5. Check, in a private window: the old home page, `/about-us/`, `/contact-us/` and one article load
   as before the launch; a contact form enquiry arrives; Wordfence → Scan runs (live's own key
   comes back with its database).
6. Tell the team it is back, and report it to Ms Anne. Write down what went wrong; fix it on
   staging; pick a new date.

## Two weeks after

- Re-test the redirects; watch Search Console for "Not found" errors and add a redirect for any
  old address still getting visits.
- Redirect the old staging copy, `/stagingsite2/`, to the home page (two live articles linked to it;
  [`../hosting/WEBSITE_INVENTORY_2026-10-25.md`](../hosting/WEBSITE_INVENTORY_2026-10-25.md) #5).
- The rest of checklist section 8.

## Open before this plan is final

- The launch date
