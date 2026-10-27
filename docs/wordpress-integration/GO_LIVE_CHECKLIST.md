# Go-live checklist: VOA staging to the live website

Prepared 23 October 2026, updated 27 October. Sections 1–7 must be done, or deliberately waived by the
client, before the staging site replaces the live site. Section 8 is work that does not block the launch
and is done afterwards. Items marked *(added)* were not on the original list. Hosting and security work
for all three websites is tracked in [`../hosting/README.md`](../hosting/README.md).

## 1. Content

- [ ] **Testimonials** completed and approved, each with the client's consent to be named
- [ ] **Team leaders' reviews and revisions** implemented (the "Staging site comments" tab), then approved
- [ ] **Facts made consistent everywhere** *(added)*:
  - the office address (website says Level 13, Suite 1A; the tracker says Ground Floor)
  - business hours (website 9am–5pm; Google Business Profile 9am–5:30pm) 

  ```
  9AM - 6PM Correct
  ```

  - phone numbers
- [ ] The article author name decided: display name (the theme) or username (`annevillavieja`, as in
  React). Usernames shown publicly help password guessing *(added)* 

```
Need Author Bio Section in every article
```

## 2. SEO

- [ ] **Home page SEO**
- [ ] **Service pages SEO** (10 pages)
- [ ] **Other pages SEO** (About, How It Works, Managed Virtual Support, Client Stories, Insights, Videos, FAQs, Contact)
- [ ] **Redirects** for the 30 page addresses that change, entered in the Redirection plugin and each one tested *(added)*
- [ ] Duplicates removed: `/home-old/` and the second contact page (`/contact/` and `/contact-us/`) *(added)*
- [ ] The sitemap: `https://` addresses only; the old testimonials sitemap removed *(added)*
- [ ] Search engine visibility: **on** for live, **off** for staging (Settings → Reading) *(added)*

## 3. Tracking

- [ ] **Google Analytics** set up and recording visits (none exists on the Business Profile account)
- [ ] **Google Search Console** set up, the site verified, the sitemap submitted
- [ ] **Google Business Profile** updated: website link, hours and address checked; confirm the change prompt *(added)*

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
- [ ] A clean Wordfence scan of staging *(added)*

## 5. Legal *(added)*

- [ ] Privacy policy and terms pages, current and linked in the footer
- [ ] A decision on cookie consent, now that Analytics will be added

## 6. Testing *(added)*

- [ ] Every page checked: desktop, tablet and phone; light and dark mode; keyboard only
- [ ] All 98 posts present, with dates, authors and featured images
- [ ] Menus, search and the 404 page work

## 7. Launch day *(added)*

- [ ] A fresh full backup of live, downloaded off the server; working off-server backups going forward
- [ ] An agreed launch method. HostGator's "Deploy all changes" overwrites live completely, including
  anything published there since the clone
- [ ] A rollback plan, with someone available to run it
- [ ] A low-traffic launch window, not a Friday afternoon

## 8. After launch *(not blocking)*

- [ ] The first two weeks: test the redirects again, submit the sitemap, watch Search Console for 404 errors *(added)*
- [ ] **Videos** provided (files or URLs), with captions; the video cards show "Coming soon" until then
- [ ] Post categories decided: the posts have none, and the theme currently works one out from the
  title *(added)*
- [ ] **Old articles:** SEO title, meta description and focus keyphrase in Yoast for each of the 98 posts
- [ ] **SEO campaign pages** (Sydney, Brisbane, Melbourne): content from VA Paola,
  Yoast SEO, and built in WordPress (they exist only in the React mockup today)
- [ ] Email routing fixed: the Business plan holds a copy of the Virtual Office Angels domains, so some
  mail sent from there never reaches the real mailbox. Needs approval *(added)*
- [ ] PageSpeed Insights run on mobile and desktop on the live site, and problems fixed *(added)*
