# Hosting, security and email

The three live websites on HostGator: **Virtual Office Angels**, **Virtual Financial Support** and
**Virtual Loans Assistant**. Work on the new Virtual Office Angels website itself is in
[`../wordpress-integration/`](../wordpress-integration/README.md).

Last updated 25 October 2026.

## Files

| File | What it is |
| --- | --- |
| [PHP_UPGRADE_REPORT_2026-10-24.md](PHP_UPGRADE_REPORT_2026-10-24.md) | Plain-language report of the PHP upgrade on the night of 23–24 October. A PDF copy sits beside it (not in Git) |
| [PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23.md](PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23.md) | The technical record: the plan, the results per site, and how to undo the change |

Backups, `.htaccess` copies, screenshots and the patched plugin files are kept outside Git, in
`private/wordpress-backups/` and `private/wordpress-upgrade/`.

## Open items

This is the live list. Tick and date each item when it is done.

### From the PHP upgrade, worst first

- [ ] **Two `clientcare@virtualfinancialsupport.com.au` mailboxes** (checked 25 October). The team
  leader works from the **Pro** one, which also receives the website form emails. Email from outside
  goes to the **Business** one (the domain's MX record points there): 817 emails in its inbox, no
  forwarders. Until the move to Pro, the team leader should check the Business mailbox too.
  **Do not** set Pro's Email Routing to Remote: that would send form enquiries to the unread mailbox
- [ ] When Virtual Financial Support moves to Pro: back up the Business mailbox; point the domain's
  website and mail DNS to Pro (needs approval); set Pro's Email Routing to Local; confirm a test from
  Gmail arrives on Pro; a few days later, remove the domain and its mailbox from Business
- [ ] Virtual Office Angels' copy on the Business plan: remove it during the move, or set its Email
  Routing there to Remote so mail from that server reaches the real mailbox on Pro
- [x] Wordfence scan on all three sites, 25 October. No active malware. Virtual Financial Support: 9 plugins with
  security fixes to install. Virtual Office Angels: 16 Critical (6 were the old WP Logo Showcase copy, now
  deleted; 3 plugins with holes that have no fix yet). Virtual Loans
  Assistant: 1 result, an abandoned plugin. Monthly scan, 4 November: Virtual Loans Assistant, the same single result. Plugin names and details are in `private/wordpress-security/`, kept outside Git
- [ ] Install the plugin updates on Virtual Financial Support and Virtual Office Angels, after a backup; remove
  unused or abandoned plugins on all three (named in the scan results in
  `private/wordpress-security/`)
  - [x] Virtual Office Angels **staging**, 31 October: database backup, then 4 plugin updates and
    WordPress 7.1.4; the modified Twenty Twenty-Five file repaired in Wordfence. All 153 staging
    redirects checked from outside before and after; the pages checked by eye (Coming soon hides
    them from outside)
  - [x] Virtual Office Angels **live**, 31 October: database and plugins backup (database copy
    downloaded, intact), then 19 plugin updates in groups and WordPress 7.1.4, checking the pages
    after each group: no errors, the page-builder layout, mega menu and slider intact; checked by eye
    too
  - [ ] Virtual Office Angels live: the old site's **page builder** not updated: its update needs a
    paid support renewal. The new website does not use it, so it goes at launch (3 November). Never
    install a copy from an unofficial site. Name and version in `private/wordpress-security/`
  - [x] Virtual Office Angels live, 31 October: **19 inactive plugins deleted**, among them most of
    the ones with no fix or abandoned. Pages, menu, slider, sitemap and the `http` → `https`
    redirect checked afterwards. Names in `private/wordpress-security/`
  - [ ] Virtual Office Angels live: the inactive **newsletter plugin** (MailPoet). Its subscriber list
    was checked 12 November in phpMyAdmin: only Ms Anne's own two addresses, never confirmed, so
    nothing to export; the deploy removes it. The active plugins with no fix or abandoned stay until launch
    (the old site uses them); staging has none of them
  - [x] Virtual Financial Support, 16 November: full backup (database and files, kept on the
    server), then all 18 plugin updates in three groups, the page builder last on its own, with its
    database update run. All 12 pages checked after each group (no errors, same page-builder content)
    and by eye; the contact form shows. WordPress was already 7.1.4. Its theme has an update
    (3.3.3 → 3.3.10) that WordPress was set to install itself the same day. Names in
    `private/wordpress-security/`
  - [x] Virtual Financial Support, 18 November: full backup (kept on the server), then the two
    abandoned plugins deactivated, checked and deleted. One had nothing to do (the plugin it served
    was already off); the other made visitors' scripts load deferred. All 12 pages checked before
    and after (no errors, same page-builder content) and by eye. Scripts now load the normal way, as
    they always did for logged-in staff; a replacement setting in the cache plugin was not switched
    on (it can defer scripts the old plugin skipped, so it needs its own test). Names in
    `private/wordpress-security/`
  - [x] Virtual Loans Assistant, 16 November: full backup (database and files, kept on the server),
    then the abandoned plugin from the scans deactivated and deleted. It had never been set up and
    nothing on the site used it. All 10 pages checked afterwards (no errors) and by eye. Wordfence rescan the same day: 0 results (was 1 Critical). Name in
    `private/wordpress-security/`
- [ ] Change passwords one at a time, once the scans are clean: starting with the most exposed ones,
  then the website database, email-sending and hosting passwords. Turn on two-step login
  for the hosting and WordPress admins
- [x] Remove the 2023 leftover files from the Virtual Office Angels live and staging sites: deleted 25 October, after backups (exact paths in
  `private/wordpress-upgrade/PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23_FULL.md`, kept outside Git)
- [ ] Check the Wordfence firewall level on the upgraded sites; re-optimise if it fell back to Basic.
  For Virtual Office Angels, with its plugin updates: `private/wordpress-security/VOA_FIREWALL_AND_PLUGIN_UPDATES_2026-10-30.txt`
  (kept outside Git, as it names the vulnerable plugins)
  - [x] Virtual Office Angels, 31 October: live and staging had both fallen to Basic (live's
    `auto_prepend_file` line in `.user.ini` was commented out). Optimised, staging first as
    Wordfence advises for a site inside another's folder, then live; both LiteSpeed/lsapi, both now
    **Extended Protection**. Live and staging pages checked afterwards. The `.htaccess` and
    `.user.ini` backups are in `private/wordpress-security/voa/10-30-2026/`
  - [ ] Virtual Financial Support and Virtual Loans Assistant
- [x] Open Elementor once on Virtual Financial Support to confirm the page editor works: opens
  normally after the 16 November update (closed without saving)
- [ ] Ask HostGator to explain the 35-minute HTTPS outage on the Business plan server
- [x] Reconnect Jetpack on Virtual Loans Assistant (renews its connection keys): 16 November, after a
  backup. Site disconnected and reconnected; the owner is now VA Mhari's WordPress.com account
  (was a user called "Admin"). Stats carried over; Jetpack Protect: no vulnerabilities
- [ ] List every website on both HostGator plans; agree with Ms Anne which to keep; back up and remove
  the rest
- [ ] Later: DMARC for `virtualofficeangels.com.au` (DNS change, needs approval)

### Carried over from the October task list

These were open on 5 October. Their status has not been recorded since, so confirm each one, then tick
it or remove it.

- [ ] HostGator account recovery email changed to a mailbox someone can reach, so the October lockout
  cannot recur
- [ ] Off-site backups: UpdraftPlus's Google Drive connection never worked. 11 November: staging was
  found signed in to a Google account named "VA Joseph" (copied from live, so live is probably the
  same). Removed on staging and replaced with the team's support Gmail address (VA Mhari's decision);
  schedule files weekly (keep 4) and database daily (keep 14), which live inherits at launch
  (launch plan step 18). Schedule saved and a database-only test backup uploaded to Drive on
  12 November ("Google Drive: OK" in the log). 16 November: the first scheduled backups (database,
  then files) ran and uploaded to Drive ("Google Drive: OK"), but **3.7 days late**: the database run due
  13 November 2:26 ran 16 November 7:51, so none ran 13 to 15 November. WordPress only starts scheduled
  jobs when someone visits the site, and staging, behind Coming Soon, gets almost no visits. Live has
  daily visitors, so it should keep to time; a server cron job on HostGator calling `wp-cron.php` would
  make it reliable on both (hosting change, needs approval). Still to do: a test restore. Find out whether VA Joseph's Drive holds website backups (they contain the
  database, enquiries included) and have them deleted or handed over
- [ ] Keep one HostGator plan. The 4 October research found Business and Pro have the same features
  and differ only in size; it recommended keeping Pro unless everything fits within Business's 50
  sites and 50 GB after the old sites are removed. Use the renewal prices on the billing page
- [ ] Former staff access reviewed beyond wp-admin: HostGator users, FTP, email accounts, Crazy Domains,
  any Google account linked through Site Kit, UpdraftPlus remote storage
  - 16 November, HostGator: 2 account users (the owner, and the team's Tech login, whose profile
    still carried a former VA's name: renamed "VOA Tech Support"; its phone and address are still
    theirs). 7 extra FTP logins, one reaching the whole Business plan and one with an unrecognised
    name: **nothing deleted**, asked of Ms Anne (approvals item 11). Anonymous FTP off, no SSH keys,
    no extra Web Disk accounts on either plan. The other cPanel logins are email only (approvals
    item 8). Details in `private/wordpress-security/HOSTGATOR_ACCESS_REVIEW_2026-11-16.txt`
- [ ] An "accounts and services" table, without passwords: each HostGator plan's renewal date, the
  Crazy Domains registrar details (expiry, auto-renew, registrant, nameservers), Wordfence edition and
  who receives its alerts
  - Started 10 November in `private/ACCOUNTS_AND_SERVICES.md` (outside Git). Filled: the four domains'
    registrar, registrant, nameservers, email and web hosts, and both HostGator plans' dates. Found two
    accounts not recorded before: Cloudflare (DNS for Virtual Financial Support and Virtual Loans
    Assistant) and Microsoft 365 (email for virtualofficeangels.com). Still to fill: the domain expiry
    dates and auto-renew (needs Crazy Domains access from Ms Anne; two .au domains are already in their
    renewal window), the Cloudflare and Microsoft 365 owners, and Wordfence editions and alert
    recipients
- [ ] Find out whether an Elegant Themes (Divi) licence is being paid, and for which site. Virtual
  Loans Assistant uses Divi
- [ ] A mail client (Thunderbird or Outlook, IMAP) for the HostGator mailboxes, if still wanted

## Monthly, on the last Friday (next: Friday 27 November)

**30 October:**

- **Virtual Office Angels live:** 27 results (10 Critical, 1 High, 16 Medium). No malware and no
  suspicious files; down from 31, because the 6 leftover-plugin files are gone. Everything else is
  plugins: updates waiting, 3 with holes that have no fix yet, and 3 abandoned, the same ones as on
  25 October. WordPress 7.0.8 has 7.1.4 waiting. The details are in `private/wordpress-security/voa/`, kept
  outside Git.
- **Virtual Office Angels staging:** 6 results (5 Medium, 1 Low), none Critical. No malware. Four
  plugin updates and WordPress 7.0.8 → 7.1.4. One modified file in the unused Twenty Twenty-Five
  theme, checked against the original release: only two CSS settings swapped, harmless; Repair
  restores it. Staging has 34 themes and plugins against live's 56, and none of live's vulnerable or
  abandoned plugins. The first attempt failed because staging still had live's Wordfence key from
  the copy. Live's licence is **Premium**; its key is in the password manager, and staging now has
  a free licence of its own.
- Virtual Financial Support and Virtual Loans Assistant: not recorded yet.

- **Ms Anne's mailbox:** review Spam and Junk before emptying them; mark anything legitimate as *Not
  spam*; note phishing that imitates HostGator, Crazy Domains or WordPress
- **Wordfence scan on each live site:** record the date and the number of issues, screenshot anything
  Critical. Delete or repair nothing without a fresh backup and a second opinion
- **Article uploads to live:** a category, a featured image, alt text, a clean slug, a Yoast title and
  description, and no links to `stagingsite2`. Keep a list of posts added after the staging clone,
  because they are not on staging
