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
| [EMAIL_PHP_UPGRADE_COMPLETED_2026-10-24.txt](EMAIL_PHP_UPGRADE_COMPLETED_2026-10-24.txt) | The announcement sent to the team |

Backups, `.htaccess` copies, screenshots and the patched plugin files are kept outside Git, in
`wordpress-backups/` and `wordpress-upgrade/`.

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
- [ ] Wordfence scan on all three sites. Read the results only, delete nothing
- [ ] Change passwords one at a time, once the scans are clean: starting with the most exposed ones,
  then the website database, email-sending and hosting passwords. Turn on two-step login
  for the hosting and WordPress admins
- [ ] Remove the 2023 leftover files from the Virtual Office Angels live site, after a backup (exact paths in
  `wordpress-upgrade/PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23_FULL.md`, kept outside Git)
- [ ] Check the Wordfence firewall level on the upgraded sites; re-optimise if it fell back to Basic
- [ ] Open Elementor once on Virtual Financial Support to confirm the page editor works
- [ ] Ask HostGator to explain the 35-minute HTTPS outage on the Business plan server
- [ ] Reconnect Jetpack on Virtual Loans Assistant (renews its connection keys)
- [ ] List every website on both HostGator plans; agree with Ms Anne which to keep; back up and remove
  the rest
- [ ] Later: DMARC for `virtualofficeangels.com.au` (DNS change, needs approval)

### Carried over from the October task list

These were open on 5 October. Their status has not been recorded since, so confirm each one, then tick
it or remove it.

- [ ] HostGator account recovery email changed to a mailbox someone can reach, so the October lockout
  cannot recur
- [ ] Off-site backups: UpdraftPlus's Google Drive connection never worked. Decide whose Google account
  backups go to, agree a schedule, and test a restore
- [ ] Keep one HostGator plan. The 4 October research found Business and Pro have the same features
  and differ only in size; it recommended keeping Pro unless everything fits within Business's 50
  sites and 50 GB after the old sites are removed. Use the renewal prices on the billing page
- [ ] Former staff access reviewed beyond wp-admin: HostGator users, FTP, email accounts, Crazy Domains,
  any Google account linked through Site Kit, UpdraftPlus remote storage
- [ ] An "accounts and services" table, without passwords: each HostGator plan's renewal date, the
  Crazy Domains registrar details (expiry, auto-renew, registrant, nameservers), Wordfence edition and
  who receives its alerts
- [ ] Find out whether an Elegant Themes (Divi) licence is being paid, and for which site. Virtual
  Loans Assistant uses Divi
- [ ] A mail client (Thunderbird or Outlook, IMAP) for the HostGator mailboxes, if still wanted

## Monthly, on the last Friday (next: Friday 30 October)

- **Ms Anne's mailbox:** review Spam and Junk before emptying them; mark anything legitimate as *Not
  spam*; note phishing that imitates HostGator, Crazy Domains or WordPress
- **Wordfence scan on each live site:** record the date and the number of issues, screenshot anything
  Critical. Delete or repair nothing without a fresh backup and a second opinion
- **Article uploads to live:** a category, a featured image, alt text, a clean slug, a Yoast title and
  description, and no links to `stagingsite2`. Keep a list of posts added after the staging clone,
  because they are not on staging
