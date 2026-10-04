# Blockers

Worst first. Each entry says what it blocks and what clears it.

## 1. HostGator account lockout

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

## 2. No staging site yet

- **State:**
  - **The database backup is done (2026-10-04), so this is no longer waiting on that.**
  - The backup shows a staging copy already exists in the database: 158 tables prefixed `staging_`.
    Check wp-admin → HostGator → Staging before creating a new one.
- **Blocks:**
  - Installing the theme on a real copy of the site
  - Forms, Yoast and redirects
  - Testing on PHP 7.4
  - QA
- **Also wanted before cloning:** the Wordfence scan (blocker 4), so a problem is not copied forward.

## 3. PHP 7.4 on the live server

- **State:** PHP 7.4 has been end of life since November 2022. The theme avoids newer PHP syntax, but
  it has only been tested on 8.3.
- **Blocks:** confidence that the theme runs on the live server.
- **Plan (proposed 2026-10-04):** run staging on PHP 8.x while live stays on 7.4 with the old site.
  HostGator sets PHP per domain or folder, so the two can differ. **When the new site goes live, live
  must move to PHP 8 too**, because it will run the same theme — so the live upgrade is a cutover step,
  and the old site's plugins need to survive it, or be retired first.
- **Clears by:** setting staging's PHP version (cPanel → MultiPHP Manager, so it waits on blocker 1,
  unless HostGator's staging tool offers it), then testing the theme there.

## 4. Security unknowns on live

- **State:**
  - Six randomly-named theme folders with no readable metadata are awaiting the Wordfence scan (Q10).
  - WP File Manager, a plugin with a history of serious vulnerabilities, is active.
- **Blocks:** cloning to staging.
- **Clears by:** a Wordfence scan **with results read and nothing deleted**. The database backup now
  exists, so the scan can run.

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
| Contact-form recipient. **Retrievable now** in wp-admin | Forms |
| Email-sending (SMTP) access | Reliable form delivery |
| Approval of the redirect map and the renamed-service URLs | Redirects, cutover |
| Privacy policy, terms and cookie consent | Cutover |
| Founder portrait rights; service-page feedback quotes | Final content only |
| Analytics and Search Console access (Q7, none) | Traffic-based decisions. Worked around by redirecting everything |
| Video URLs | Nothing. Deferred by the client |
