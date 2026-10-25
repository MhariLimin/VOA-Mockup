# PHP Security Upgrade: Night Report

24 October 2026 (night of 23–24 October, PH time) · VA Mhari

All three live websites now run **PHP 8.3.36**, the version that fixes the critical PHP security flaw announced this
week. All three were checked after the change and are working normally.

## What is PHP, and why did we do this

PHP is the software that runs our WordPress websites behind the scenes. A serious flaw found in PHP this week lets
attackers take over a website's server without a password. The fix is to move each website to a corrected version of
PHP. HostGator also patched its servers, but our sites were on old PHP versions that no longer receive regular fixes,
so we moved them to a current, fixed one.

## What we did tonight

| Time (PH) | Website | What happened | Result |
| --- | --- | --- | --- |
| 12:25 AM | Virtual Loans Assistant | Backed up, upgraded from PHP 8.1 to 8.3.36 | Pages, page editor and contact form all work |
| 1:00 AM | Virtual Financial Support | Backed up, saved an undo copy of its settings, upgraded from PHP 7.4 to 8.3.36 | Pages work; email sending works |
| 1:15–1:50 AM | Virtual Financial Support | Website unreachable for about 35 minutes | A HostGator server problem, not ours; it recovered on its own |
| 2:30 AM | Virtual Office Angels | Backed up, saved an undo copy of its settings | Ready |
| 2:45 AM | Virtual Office Angels | First upgrade attempt: the website showed an error for about 5 minutes | Switched back right away; website restored |
| 2:50–3:05 AM | Virtual Office Angels | Found the cause (the old testimonials plugin), fixed it, upgraded again | Pages, page editor and contact form all work |

Before every change, a full backup was taken, and every main page was checked before and after. Each site's PHP
version was confirmed in WordPress afterwards: **8.3.36** on all three.

## What went wrong, and how it was fixed

- **Virtual Office Angels' first attempt failed.** One old plugin, *Testimonials Showcase* (it displays the
  testimonials), was written for older PHP and could not run on the new version. Two lines of it were updated to work
  on both the old and the new PHP, and the second attempt succeeded. This plugin will no longer be needed once the new
  website design goes live.
- **Virtual Financial Support's 35-minute outage** was on HostGator's side: every website on that server was affected,
  including ones we did not change. HostGator should be asked what happened.

## Important things we found

- **Virtual Financial Support enquiries are going to the wrong mailbox.** Enquiries from its website are delivered to a
  duplicate `clientcare@virtualfinancialsupport.com.au` mailbox in our other HostGator account, not the real one. Some
  client enquiries may have been missed for a while. The fix is one setting, but it needs approval first.
- **Old unused websites are a risk.** Our two HostGator plans hold around 30 websites, many of them old copies and
  tests. They share space with our live websites, so a break-in on any of them can reach the live ones too.
- **Leftover files from an old infection** were found on the Virtual Office Angels website, dating back to 2023. They
  are not active, but they should be reviewed and removed.

## Next session

- [ ] Check the duplicate mailbox for missed Virtual Financial Support enquiries, and pass any on
- [ ] Get approval for the email setting fix (for both Virtual Financial Support and Virtual Office Angels), then apply it
- [ ] List all websites on both HostGator plans; agree with Ms Anne which to keep; back up and remove the rest
- [ ] Run a fresh security scan (Wordfence) on all three live websites
- [ ] Remove the 2023 leftover files from the Virtual Office Angels website, after a backup
- [ ] Change passwords, one at a time, starting with the most exposed ones, then the
  website database, email-sending and hosting passwords; turn on two-step login for the hosting and WordPress admins
- [ ] Check the Wordfence firewall level on the upgraded websites
- [ ] Open the page editor (Elementor) on Virtual Financial Support once, to confirm it works
- [ ] Ask HostGator to explain the 35-minute outage on the Business plan server
- [ ] Reconnect Jetpack on Virtual Loans Assistant (renews its connection keys)
- [ ] Later: set up DMARC email protection for the Virtual Office Angels domain (needs approval)

## For reference (technical)

- Backups taken tonight: `wordpress-backups/vla-live/`, `vfs-live/`, `voa-live/` (not in Git)
- Undo copies of the PHP settings and the plugin fix: `wordpress-upgrade/` (not in Git)
- Full technical record: `docs/hosting/PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23.md`
