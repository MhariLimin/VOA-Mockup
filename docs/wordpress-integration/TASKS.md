# Task list — weeks of 5 and 12 October 2026

The user's list, expanded. **Hours in bold are the user's own estimates.** The rest are suggestions,
marked *(est.)*, for honest planning, not targets to fill. Tasks marked **Added** were not on the
original list but are needed.

Status key: ✅ done · 🔓 can start now · 🔒 blocked (see [BLOCKERS.md](BLOCKERS.md)) · 🔁 recurring

## Suggested order

| Week | Tasks |
| --- | --- |
| **5–9 Oct** | 8 → 7 → 1.1 → 2 → 3 → A1 → A2 → 9 → 1 (theme steps 6–7) |
| **12–16 Oct** | 13 → 4 → 6 → 5 → 1 (step 9, browser review) → write the checklists for 10–12 |
| **Fri 30 Oct** | First run of the month-end tasks 10, 11 and 12 |

Task 8 goes first because HostGator access gates 4, 6, 9 (full backup), 13 and the PHP upgrade.

---

## 1. Finish the code conversion to PHP — 🔓 *(est. 6 h of review and checks across both weeks)*

Claude builds; your time goes on reviewing.
- [x] Service pages, the nine remaining page templates, Insights and articles — all 22 pages match the
      React build exactly (2026-10-04)
- [ ] ~~Block patterns~~ — deferred; see the architecture refinement of 2026-10-04
- [ ] **First browser review**: desktop and mobile, light and dark, compared side by side with the
      React site, including every interactive part
- [ ] Zip the theme ready for staging (runbook step 7)

**Deliverable:** a complete theme that renders every route locally, with a list of the visual
differences from React.

### 1.1 Review the live site's WordPress page structure — **1 h** 🔓

Read only. Change nothing, and when leaving any editor, **close without updating**.
- [x] **Pages → All Pages:** count the pages and note which ones show a *WPBakery / Backend Editor*
      button. Check them against the redirect map in `reference/WORDPRESS_LIVE_SITE_STATUS.md`
      section 5.2, and flag any page missing from it.
- [x] **Appearance → Menus**, and **Mega Menu** in the sidebar: screenshot the menu structure.
- [x] **Appearance → Widgets:** note anything in the footer or sidebar the new site would lose.
- [x] **Contact → Contact Forms:** record the forms that exist and, while there, the **Mail → To**
      recipient (Q6).
- [x] **Posts:** compare the *All*, *Published* and *Draft* counts (Q12). Read from the backup: 98 + 2 drafts.

**Deliverable:** your notes appended to the status doc, or sent to Claude to add.

**Done 2026-10-04** from the database backup and a read-only browser pass: status doc 3.8, and the
ten orphan pages checked against their content in REDIRECTS.md.

## 2. Research how to import the code into WordPress — **1 h** 🔓

Largely answered already. Confirm it and note your questions.
- The theme goes in as a **ZIP**: staging → Appearance → Themes → Add New → Upload Theme (runbook
  step 7).
- **The ZIP carries design only, not content.** Posts already live in the database, so a staging clone
  brings them across. Pages, menus, forms and redirects are rebuilt (runbook steps 8–10).
- **Later updates** are a new ZIP each time; the runbook covers replacing the theme safely.
- [ ] Read runbook steps 7–10 and list anything unclear.

## 3. Research whether Divi is still needed — **1 h** 🔓

Finding so far: **Divi is not installed.** The live site uses WPBakery, and the new theme needs
neither.
- [ ] Ask whoever pays the bills whether an **Elegant Themes (Divi) subscription** is being paid. If so,
      it may be cancellable. That is the client's decision.
- [ ] Find out where the belief that the site uses Divi came from (Q1). A second WordPress site
      somewhere might use it.
- [ ] Also note that **WPBakery** may carry a licence that retires at cutover.

**Deliverable:** one line in the status doc closing Q1.

## 4. Research HostGator, Crazy Domains and Wordfence — 🔒 HostGator part *(est. 2 h)*

Goal: one page mapping **who owns what, where, and when it renews**. Record facts only; don't guess.
- **HostGator** (after task 8)
  - [ ] Plan name, renewal date and price
  - [ ] Which domains and email accounts it hosts
  - [ ] Whether backups and staging are included
  - [ ] Disk usage
- **Crazy Domains**
  - [ ] Confirm whether it is the registrar for `virtualofficeangels.com.au`
  - [ ] Expiry date and auto-renew setting
  - [ ] Who the registrant is (`.com.au` needs an eligible Australian entity)
  - [ ] Where the nameservers point
  - [ ] Who can log in
- **Wordfence**
  - [ ] Free or Premium
  - [ ] Scan schedule
  - [ ] Who receives the alert emails
  - [ ] Whether two-factor login is on

**Deliverable:** an "accounts and services" table. Keep passwords out of it.

## 5. Research and set up Outlook and Thunderbird — 🔒 needs mailbox settings *(est. 1.5 h)*

- [ ] Decide what it's for. Likely reading the HostGator-hosted mailboxes, such as Ms. Anne's (task 10),
      and making sure HostGator's verification emails reach a mailbox someone can open (the cause of
      task 8).
- [ ] Get the incoming (IMAP) and outgoing (SMTP) settings from cPanel → **Email Accounts → Connect
      Devices**. This needs task 8 first.
- [ ] Pick one client rather than running both. Thunderbird is free; check whether Outlook needs a
      licence on that machine.
- [ ] Use **IMAP, not POP**. POP can remove mail from the server.

**Deliverable:** a working mailbox plus a note of the settings, without passwords.

## 6. Research whether the Business or Pro plan is better to keep — 🔒 *(est. 1 h)*

Depends on tasks 8 and 13. Compare the two on what this site **actually uses**:
- [ ] Number of sites and domains hosted (from task 13)
- [ ] Email accounts and storage
- [ ] Disk space: the site is 1.75 GB, plus backups and staging
- [ ] Staging and backups included, PHP 8 available, and SSL
- [ ] **Renewal** price, not the introductory one

**Deliverable:** a recommendation with the comparison table. The decision is the client's.

**Research, 2026-10-04** (HostGator's public plan page, hostgator.com/web-hosting):
- On HostGator's **current** plans, Business and Pro have **the same features**: staging, SSL, Cloudflare
  CDN, malware scanning and removal, firewall, phone and chat support, SSH. They differ only in size:
  Business 50 websites, 50 GB, ~200K visits a month; Pro 100 websites, 100 GB, ~400K.
- Prices are not shown on the public page. Third-party reviews (2026) put Business at about US$22 a
  month on renewal; Pro is dearer. **Use the renewal prices on the account's own billing page.**
- The account's subscriptions may be older versions of these plans with different terms; the billing
  page is the authority.
- **Recommendation:** keep one plan. Most sites are on Pro, so keep Pro and move the few Business
  sites into it, then let Business lapse at its renewal date. Moving a site with mailboxes moves its
  email too, so each move is planned. Exception: if, after the old site copies are removed, everything
  fits within 50 sites and 50 GB, Business alone is the cheaper choice.

## 7. Check WordPress users and whether Joseph's access can be removed — 🔓 *(est. 0.5 h)*

**Confirm with the client before removing anyone.**

**2026-10-04, from the backup: there is no WordPress account named Joseph.** The four users are
listed in `reference/WORDPRESS_LIVE_SITE_STATUS.md` 3.8. Ask whose `voa.webdev@gmail.com` is; if it
is Joseph's, that is the account to review. His other access (below) still needs checking.

- [ ] **Users → All Users:** note Joseph's role and the number in his **Posts** column.
- [ ] **Safest order:** change his role to *Subscriber*, or reset his password, first. Delete later,
      once nothing breaks.
- [ ] **If deleting:** WordPress asks what to do with his content. Choose **"Attribute all content
      to"** another user. **Never "Delete all content"**, because that deletes his posts.
- [ ] Check access beyond wp-admin too:
  - HostGator users
  - FTP accounts
  - Email accounts
  - Crazy Domains
  - Any Google account linked through Site Kit
  - UpdraftPlus remote storage
- [ ] While there, list **every** admin user, so stale access is caught in one pass.

## 8. Troubleshoot the HostGator lockout and reset the credentials — **1 h** 🔒→🔓

- [ ] **Stop attempting logins.** Wait out the 24 hours.
- [ ] If it is still locked, contact **HostGator support** (chat or phone). Ask them to clear the
      lock and to **change the verification email** to a mailbox you can reach.
- [ ] If the account is in the client's name, support may need the client to verify ownership.
- [ ] Once in, set a new password and store it in a password manager. Enable two-factor login with a
      reachable email or authenticator app, and update the account contacts.

**Deliverable:** working access, plus the recovery email fixed for good.

## 9. Enforce backups for Virtual Office Angels — 🔓 database · 🔒 full *(est. 1.5 h the first time)*

- [x] **Done 2026-10-04:** database-only backup through UpdraftPlus, downloaded and checked
      (29.5 MB, 158 tables). Kept in `wordpress-backups/`, which git ignores.
- [ ] **Google Drive is not actually connected** (`no_refresh_token` in the log). Decide whose Google
      account backups belong in, then reconnect it under Settings → UpdraftPlus → Settings.
- [ ] After task 8: check disk space, then take a full backup (step 1b).
- [ ] Check whether UpdraftPlus already sends backups off-server, under Settings → remote storage.
      A backup kept only on the same server is not a backup.
- [ ] Agree a schedule with the client. Suggested: database weekly and files monthly, kept off-server
      and with a set number of copies retained.
- [ ] **Test it.** Note the file sizes. A restore onto staging is the only real proof.

**Deliverable:** a written backup policy, plus one verified backup on file.

## 10. Month-end spam cleaning for Ms. Anne's account — 🔁 *(est. 0.5 h a month)*

- [ ] Review the **Spam** and **Junk** folders before emptying them. Mark anything legitimate as *Not
      spam* so the filter learns.
- [ ] Check cPanel → **Spam Filters** sensitivity if spam levels are high (after task 8).
- [ ] Note any phishing that imitates HostGator, Crazy Domains or WordPress. Those are worth flagging.

**Next due:** Fri 30 Oct.

## 11. Month-end Wordfence scan — 🔁 *(est. 0.5–1 h a month)*

- [ ] Wordfence → Scan → **Start New Scan**
- [ ] Record the date and the number of issues, and screenshot anything **Critical**.
- [ ] **Delete or repair nothing** from the results without a fresh backup and a second opinion.
- [ ] **This month's scan is needed early**, before staging is cloned. It answers Q10, the six odd
      theme folders.

**Next due:** first run this week, then Fri 30 Oct.

## 12. Month-end article uploads — 🔁 *(est. 1 h a batch)*

- [ ] Until cutover, upload articles to the **live** site as usual.
- [ ] **Migration catch:** articles added to live after staging is cloned **will not be on staging**.
      Keep a running list, and re-add or re-sync them before cutover.
- [ ] Per-article checklist:
  - A **category**, since the posts currently have none (Q8)
  - A **featured image**
  - Alt text on images
  - A clean slug
  - A Yoast title and description
  - **No links to `stagingsite2`**

**Next due:** Fri 30 Oct.

## 13. Screenshot the emails and website domains per HostGator plan — 🔒 *(est. 1 h)*

After task 8, in cPanel:
- [ ] **Domains:** the main domain, addon domains and subdomains. Check whether the other two sites,
      Virtual Loans Assistant and Virtual Financial Support, share this plan.
- [ ] **Email Accounts:** every mailbox and its storage use
- [ ] **Disk Usage**
- [ ] **Store the screenshots privately, not in this repository.** They show account details, and the
      repository is on GitHub.

**Deliverable:** feeds tasks 4 and 6.

---

## Added tasks

| # | Task | Status | Why |
| --- | --- | --- | --- |
| A1 | Read the contact-form recipient (Q6). Contact → Contact Forms → Mail → To | ✅ 2026-10-04: `clientcare@virtualofficeangels.com.au` | Needed for the forms step; no HostGator needed |
| A2 | Approve the redirect map (status doc 5.2) and the URLs for the three renamed services and `/why-voa` | 🔓 | Needed before redirects and cutover |
| A3 | Create staging, then lock it down (runbook steps 2–3). **First check wp-admin → HostGator → Staging**: the backup shows a staging copy already exists | 🔓 backup done; scan first (task 11) | Unlocks theme step 10 and real PHP testing |
| A4 | Fix the three `stagingsite2` links in the captured article bodies, and check whether the live posts carry them too | 🔓 | They point at the old staging copy, not the real site |
| A5 | Ask the client for privacy policy, terms and cookie-consent requirements | 🔓 | Needed before cutover |
