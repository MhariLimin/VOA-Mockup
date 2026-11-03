# Go-live checklist: VOA staging to the live website

Prepared 23 October 2026, updated 2 November. Sections 1–7 must be done, or deliberately waived by the
client, before the staging site replaces the live site. Section 8 is work that does not block the launch
and is done afterwards. On 2 November the remaining content, tracking and legal items, and the SEO copy
the writer has not sent, were moved to after launch: they are marked *(after launch)*. Items marked *(added)* were not on the original list. Hosting and security work
for all three websites is tracked in [`../hosting/README.md`](../hosting/README.md).

## 1. Content

- [x] **Testimonials** completed and approved, each with the client's consent to be named (confirmed 2 November)
- [ ] *(after launch)* **Team leaders' reviews and revisions** implemented (the "Staging site comments" tab), then approved
- [x] **Facts made consistent everywhere** *(added)*, checked 2 November:
  - the office address: the website shows Ground Floor, 465 Victoria Avenue, Chatswood, as the
    tracker does
  - business hours: **9am–6pm** on the website (FAQ answer changed 28 October). The Google Business
    Profile (9am–5:30pm) is in section 3
  - phone numbers: 1 300 737 883 throughout; the team leaders called it and it works (tracker)
- [ ] *(after launch)* The article author name decided: display name (the theme) or username (`annevillavieja`, as in
  React). Usernames shown publicly help password guessing *(added)* 

```
Need Author Bio Section in every article
```

## 2. SEO

- [x] **Home page SEO**, **service pages SEO** (10) and **other pages SEO**, applied on staging and checked 2 November: the writer's titles and
  descriptions ("SEO Titles, Meta Descriptions, and URL Slugs for VOA Revamp.xlsx", 2 November) are in
  the theme, with the writer's new addresses for seven services and About (`/about-us/`). Applied on
  staging with Appearance → Site setup → **Apply the addresses and SEO update**. The writer sent
  none for How It Works, Insights and Videos: Yoast's automatic title until they do *(after launch)*
- [ ] **Redirects**: the 154 old addresses (54 pages and archives, 100 articles), tested on staging with
  `redirects-staging-1384.csv`, then imported on live at launch with `redirects.csv`. See
  `REDIRECTS_STAGING_GUIDE.txt` *(added)*
  - [x] Tested on staging, 28 October: all 153 answer with one 301 to the right address, and all
    117 landing pages load
  - [x] Updated 2 November for the new addresses: the About Us row removed (`/about-us/` is now the
    page itself), `/client-case-studies/` → `/client-stories/` and `/voa/yes-want-book…` → `/contact/`
    added, from the client's updated redirect map
  - [x] Before launch: delete the staging test redirects (guide step 9). Done 2 November
  - [ ] Launch day: import `redirects.csv` on live and test again (guide step 10)
- [x] Duplicates removed, 1 November: the 24 old pages, `/home-old/` and `/contact-us/` among them,
  are in staging's Trash, and Thank You is hidden from search. The page sitemap now lists 13 pages;
  all 153 staging redirects checked afterwards. See `SITEMAP_CLEANUP_STAGING_GUIDE.txt` *(added)*
- [ ] The sitemap: `https://` addresses only (set on launch day, `LAUNCH_AND_ROLLBACK_PLAN.md` step 8).
  The old testimonials sitemap is already gone on staging (checked 30 October) *(added)*
- [ ] Search engine visibility: **on** for live, **off** for staging (Settings → Reading) *(added)*

## 3. Tracking

- [ ] *(after launch)* **Google Analytics** set up and recording visits (none exists on the Business Profile account)
- [ ] *(after launch)* **Google Search Console** set up, the site verified, the sitemap submitted
- [ ] *(after launch)* **Google Business Profile** updated: website link, hours and address checked; confirm the change prompt *(added)*

## 4. Security and server

- [x] **PHP upgraded** to 8.3.36 on 23 October 2026. Staging shares the live site's PHP setting, so it
  moved too. Live pages, the WPBakery editor and the contact form were checked; see
  [`../hosting/`](../hosting/README.md)
- [x] **PHP2Shell vulnerability** (CVE-2026-109618 and CVE-2026-109619): fixed by moving to PHP 8.3.36,
  a fixed release, confirmed in Site Health *(added)*
- [x] The 2023 leftover infection files removed from live and from staging (which had the same files), after
  backups, on 25 October. Both sites checked afterwards *(added)*
- [x] The old WP Logo Showcase copy deleted from live's `wp-content/updraft/plugins-old/` on 25 October;
  staging has no such folder *(added)*
- [x] A clean Wordfence scan of staging *(added)*: its updates and the Repair were done on 31 October. On 30 October staging's scan failed: it still had
  live's licence key from the copy. Live's key, which is **Premium**, is in the password manager, and
  staging was reset to a free licence. Live's Premium key must be put back after launch
  (`LAUNCH_AND_ROLLBACK_PLAN.md` step 12). Scanned the same day: 6 results, none Critical, no
  malware; clean once its 4 plugin updates, WordPress 7.1.4 and the theme-file Repair are done

## 5. Legal *(added)*

- [ ] *(after launch)* Privacy policy and terms pages, current and linked in the footer. Live has none today
- [ ] *(after launch)* A decision on cookie consent, now that Analytics will be added

## 6. Testing *(added)*

- [x] Every page checked on desktop, tablet and phone, in light and dark mode (1 November, local
  copy of the theme; a home-page layout fix followed). Keyboard-only not checked
- [x] All 100 posts on staging, published, dated, under `/insights/`, one author (2 November). None has
  a featured image, as on live: the theme uses each article's first picture
- [x] Search, its no-results message and the 404 page work (local copy, 2 November); menus by eye
- [x] Fixed 2 November with the Site setup update button: one article on staging, "When Does a Remote Support Role Require Industry Experience?": its
  six links were broken (an image address joined to the page address). Two more articles linked to
  the old staging site (`/stagingsite2/why-us/`); they now point at `/managed-virtual-support/`

## 7. Launch day *(added)*

The full sequence, with the rollback, is [`LAUNCH_AND_ROLLBACK_PLAN.md`](LAUNCH_AND_ROLLBACK_PLAN.md)
(updated 1 November). **Launch: Tuesday 3 November 2026**, after the meeting; VA Mhari launches it,
no sign-off needed.

- [ ] A fresh full backup of live, downloaded off the server; working off-server backups going forward
- [x] The launch method confirmed, 2 November: staging's HostGator → Manage WordPress → Staging →
  "Deploy all changes". It overwrites live completely, including anything published there since
  the clone (none on 1 November)
- [x] A rollback plan, with someone available to run it: VA Mhari, 1 November
- [x] A launch window: Tuesday 3 November, after the meeting

## 8. After launch *(not blocking)*

- [ ] The first two weeks: test the redirects again, submit the sitemap, watch Search Console for 404 errors *(added)*
- [ ] **Videos**: the old website's one video ("Contracts") is on the Videos page since 3 November; more videos, and captions for it, when provided
- [ ] Post categories decided: the posts have none, and the theme currently works one out from the
  title *(added)*
- [ ] **Old articles:** SEO title, meta description and focus keyphrase in Yoast for each of the 98 posts
- [x] **SEO campaign pages** (Sydney, Brisbane, Melbourne): the writer's content, Yoast SEO title and
  description, built in the theme and checked on staging, 27 October
- [ ] Email routing fixed: the Business plan holds a copy of the Virtual Office Angels domains, so some
  mail sent from there never reaches the real mailbox. Needs approval *(added)*
- [ ] PageSpeed Insights run on mobile and desktop on the live site, and problems fixed *(added)*
