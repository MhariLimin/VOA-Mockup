# Blockers

Worst first. Each entry says what it blocks and what clears it.

## 1. HostGator account lockout — CLEARED 2026-10-05

**Access regained on 2026-10-05.** Kept below for the record. Still to do: change the account's
verification email to va4voa@gmail.com (TASK_HOURS.md, recommendation 2), so this cannot recur.


- **State:**
  - The account is locked after repeated failed logins.
  - The password was reset successfully, but the account is still locked.
  - The lock appears from mobile data too, so it is on the account, not on the network.
- **Blocks:**
  - cPanel, and with it the PHP 8 upgrade (runbook step 6)
  - The files backup's fallback and the disk-space check
  - The email and domain inventory (task 13)
  - The plan review (task 6)
  - Cutover
- **Clears by:**
  - Waiting out the 24 hours the message states, without further login attempts, which may extend
    the lock
  - Contacting HostGator support (chat or phone)
  - If the account is in the client's name, support may need the client to verify ownership
- **Root cause to fix afterwards:** the verification email went to an address nobody can reach.
  Update the account's contact email (task 8).

## 2. No staging site yet — a copy exists, but is out of date

**2026-10-05:** wp-admin → HostGator → Staging shows a staging copy at `/staging/1384`, created
2026-09-22. It predates the plugin deletion and the password resets, so it still carries both. Refresh it
with **Clone to staging** before building on it. Never use **Deploy all changes** before launch.


- **State:**
  - **The database backup is done (2026-10-04), so this is no longer waiting on that.**
  - The backup shows a staging copy already exists in the database: 158 tables prefixed `staging_`,
    and files under two folders, `/stagingsite/` and `/stagingsite2/`. Check wp-admin → HostGator →
    Staging before creating a new one.
- **Blocks:**
  - Installing the theme on a real copy of the site
  - Forms, Yoast and redirects
  - QA
- **Also wanted before cloning:** the Wordfence scan (blocker 4), so a problem is not copied forward.

## 3. PHP 7.4 on the live server — no longer blocks the theme

- **State:** PHP 7.4 has been end of life since November 2022. **The theme itself is now proven on
  7.4** (2026-10-04: every page matches, no errors), so this no longer blocks installing it.
- **Blocks:** nothing in the theme. It remains a security risk for the live site, and the upgrade is
  still wanted before or at cutover.
- **Plan (proposed 2026-10-04):** staging can run PHP 8.x while live stays on 7.4 with the old site;
  HostGator sets PHP per domain or folder. The theme works on either, so the live upgrade is no
  longer forced by the new site — but it is still strongly recommended at or before cutover, for
  security. The old site's plugins need to survive it, or be retired first.
- **Clears by:** setting PHP 8 in cPanel → MultiPHP Manager (waits on blocker 1), staging first.

## 4. A compromised plugin on live — found 2026-10-04, DELETED 2026-10-05

**2026-10-05:** the user deleted WP Logo Showcase, then reset every administrator password and demoted
`voa.webdev@gmail.com` to Contributor. Still to do: delete the old copy in
`wp-content/updraft/plugins-old/`, re-scan with Wordfence, and refresh the staging copy (blocker 2).


- **State:** the completed Wordfence scan found a **backdoor signature** in *WP Logo Showcase Responsive
  Slider and Carousel*, a plugin **wordpress.org closed permanently on 2026-04-07 for a security
  issue**. Five other plugins have security updates waiting. The six odd theme folders came back
  **clean**. Full results and the recommended response: `reference/WORDPRESS_LIVE_SITE_STATUS.md`,
  section 3.1a.
- **Blocks:** cloning to staging (a compromise should not be copied forward), and confidence in the
  live site generally.
- **Clears by:** the client approving the removal of that plugin, then a clean re-scan. Every step is a
  live-site change.
- **Decision pending (2026-10-04):** the user has no permission to change live. Recommended interim
  step, put to the client: **deactivate** the plugin (one click, reversible, nothing deleted; the old
  site's logo carousel stops showing). Whatever the client decides, the plugin is **deleted on staging
  immediately after the clone**, and if it stays active on live, Wordfence runs weekly until cutover.
- **Deactivated on live (2026-10-04)** by the user. The files are still on disk, including the copy in
  `wp-content/updraft/plugins-old/`, so a re-scan will still flag them; deletion remains the fix.
  Next live step recommended: deactivate **WP File Manager** if nobody uses it.
- **Side effect:** the live home page now shows the plugin's code as text under "Who we work with".
  Fix, with the client's OK: remove that text block from the Home page (revisions keep the old version).

## 5. Backups are not going off-site automatically

- **State:** UpdraftPlus is set to send backups to Google Drive, but the connection was never
  authorised or has lapsed (`no_refresh_token`). The last scheduled backups in its history are from
  May and March 2025, and it keeps only the two newest.
- **Blocks:** nothing today, because the manual backup was downloaded. It is a standing risk to the
  live site.
- **Clears by:** deciding whose Google account backups go to, then reconnecting it (task 9).

## 6. Client inputs still missing

| Item | Blocks |
| --- | --- |
| Email-sending (SMTP) access | Reliable form delivery |
| Approval of the redirect map and the renamed-service URLs | Redirects, cutover |
| Privacy policy, terms and cookie consent | Cutover |
| Founder portrait rights; service-page feedback quotes | Final content only |
| Analytics and Search Console access (Q7, none) | Traffic-based decisions. Worked around by redirecting everything |
| Video URLs | Nothing. Deferred by the client |
