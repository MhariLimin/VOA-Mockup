# Launch and rollback plan: VOA staging to the live website

30 October 2026, updated 1 November · VA Mhari. **Launch: Tuesday 3 November 2026**, before the
meeting that day. VA Mhari launches it; no sign-off is needed.

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

### By 2 November

1. **Launch window:** the morning of Tuesday 3 November, 3 hours, finished before the meeting. Keep
   the rest of that day and the next morning free in case something needs fixing.
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
5. The staging sitemap cleanup done (`SITEMAP_CLEANUP_STAGING_GUIDE.txt`).

### The day before (2 November)

6. Check again for any article, page or setting changed on live since 28 October (none on
   1 November). Copy each one to staging (an article also needs a row in `redirects.csv`).
7. ~~Delete the "Staging test" redirect group on staging~~ Done 2 November, after the addresses and
   SEO update (Appearance → Site setup) was applied and checked. Staging's old addresses now answer
   404 until live gets `redirects.csv` at step 10.
8. Back up **staging** (UpdraftPlus, database and files) so the build itself is safe.

## Launch day

Times are from the start of the window. Stop at any step that does not go as written.

### Backup: 0:00 to 0:45

1. **Full backup of live**, kept off the server, by both routes:
   - UpdraftPlus → Backup Now with the database and **all** files. Download all five parts
     (Database, Plugins, Themes, Uploads, Others) and check none is 0 KB.
   - cPanel → **Backup Wizard** → full backup, downloaded too, if cPanel access is available. It
     runs outside WordPress, so it works even if wp-admin breaks.
2. Export from live what the deploy would lose: contact form enquiries (Flamingo → Inbound Messages
   → Export, if live has it) and anything else from the step 6 list.
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
15. **Decision at 2:45:** launched, or **Rollback**. Report the result at the meeting.

### After the window

16. Google Search Console: submit `https://virtualofficeangels.com.au/sitemap_index.xml` (once access
    is given).
17. Google Business Profile: check the website link and the hours (9am–6pm).
18. Wordfence → Scan → Start New Scan on live, now the new website.
19. End the content freeze.

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
6. Tell the team it is back, and report it at the meeting. Write down what went wrong; fix it on
   staging; pick a new date.

## Two weeks after

- Re-test the redirects; watch Search Console for "Not found" errors and add a redirect for any
  old address still getting visits.
- Redirect the old staging copy, `/stagingsite2/`, to the home page (two live articles linked to it;
  [`../hosting/WEBSITE_INVENTORY_2026-10-25.md`](../hosting/WEBSITE_INVENTORY_2026-10-25.md) #5).
- The rest of checklist section 8.

## Open before this plan is final

- Whether live keeps contact form enquiries in wp-admin (Flamingo) that need exporting
