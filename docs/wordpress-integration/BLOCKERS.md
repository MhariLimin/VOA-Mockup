# Blockers

Worst first. Each entry says what it blocks and what clears it.

## 1. HostGator account lockout

- **State:**
  - The account is locked after repeated failed logins.
  - The password was reset successfully, but the account is still locked.
  - The lock appears from mobile data too, so it is on the account, not on the network.
- **Blocks:**
  - cPanel, and with it the PHP 8 upgrade (runbook step 6)
  - The full-backup fallback
  - A disk-space check
  - The email and domain inventory (task 13)
  - The plan review (task 6)
  - Cutover
- **Clears by:**
  - Waiting out the 24 hours the message states, without any further login attempts, which may
    extend the lock
  - Contacting HostGator support (chat or phone)
  - If the account is in the client's name, support may need the client to verify ownership
- **Root cause to fix afterwards:** the verification email went to an address nobody can reach.
  Update the account's contact email so this cannot recur (task 8).

## 2. No verified backup

- **State:** none taken or downloaded (Q9). Postponed on 2026-10-03 while HostGator access is sorted.
- **Blocks:**
  - Creating staging
  - Any plugin or PHP change
  - Any clean-up based on the Wordfence results
- **Note:** this is **not** blocked by HostGator. A **database-only** backup through UpdraftPlus in
  wp-admin works without cPanel (runbook step 1a), and it is the irreplaceable part. Only the full
  backup is risky without a disk-space check.
- **Clears by:** runbook step 1a, then downloading the file and checking it is not 0 KB.

## 3. No staging site

- **State:** not created. It can be made from wp-admin → HostGator → Staging without cPanel, but
  only after blocker 2 is cleared.
- **Blocks:**
  - Theme step 10: real content, the working contact form, Yoast and redirects
  - Testing on the real PHP version
  - QA

## 4. PHP 7.4 on the live server

- **State:** PHP 7.4 has been end of life since November 2022. The theme is written for both 7.4 and
  8.x, but it has only been tested on 8.3.
- **Blocks:** confidence that the theme runs on the live server.
- **Clears by:** testing on staging. The upgrade itself waits on blocker 1.

## 5. Client inputs still missing

| Item | Blocks |
| --- | --- |
| Contact-form recipient. **Retrievable now** in wp-admin; see PENDING.md | Forms |
| Email-sending (SMTP) access | Reliable form delivery |
| Approval of the redirect map and the renamed-service URLs | Redirects, cutover |
| Privacy policy, terms and cookie consent | Cutover |
| Founder portrait rights; service-page feedback quotes | Final content only |
| Analytics and Search Console access (Q7, none) | Traffic-based decisions. Worked around by redirecting everything |
| Video URLs | Nothing. Deferred by the client |

## 6. Security unknowns on live

- **State:**
  - Six randomly-named theme folders with no readable metadata are awaiting the Wordfence scan (Q10).
  - WP File Manager, a plugin with a history of serious vulnerabilities, is active.
- **Blocks:** cloning to staging, because a problem should not be copied forward.
- **Clears by:** a Wordfence scan **with results read and nothing deleted**, after the backup exists.
