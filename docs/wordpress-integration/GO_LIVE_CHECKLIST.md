# Go-live checklist: VOA staging to the live website

Prepared 23 October 2026, updated 25 October. Everything below must be done, or deliberately waived by
the client, before the staging site replaces the live site. Items marked *(added)* were not on the
original list. Hosting and security work for all three websites is tracked in
[`../hosting/README.md`](../hosting/README.md).

## 1. Content

- [ ] **Testimonials** completed and approved, each with the client's consent to be named
- [ ] **Videos** provided (files or URLs), with captions; the video cards are still "Coming soon" placeholders
- [ ] **Team leaders' reviews and revisions** implemented (the "Staging site comments" tab), then approved
- [ ] Spell check and final website check signed off (team leaders, HR, Ms Anne) *(added)*
- [ ] **Client logo permission** for the logo carousel and the city pages *(added)*
- [ ] **Facts made consistent everywhere** *(added)*:
  - the office address (website says Level 13, Suite 1A; the tracker says Ground Floor)
  - business hours (website 9am–5pm; Google Business Profile 9am–5:30pm)
  - phone numbers
- [ ] Logo, favicon and fonts: high-resolution logo, a favicon, licensed fonts *(added)*
- [ ] Articles published on live after staging was cloned, copied to staging (e.g. the September 2026 articles) *(added)*
- [ ] The two live posts that link to the old `/stagingsite2/why-us/` page, fixed *(added)*
- [ ] Post categories decided: the posts have none, and the theme currently works one out from the
  title *(added)*
- [ ] The article author name decided: display name (the theme) or username (`annevillavieja`, as in
  React). Usernames shown publicly help password guessing *(added)*

## 2. SEO

- [ ] **Old articles:** SEO title, meta description and focus keyphrase in Yoast for each of the 98 posts
- [ ] **Home page SEO**
- [ ] **Service pages SEO** (10 pages)
- [ ] **Other pages SEO** (About, How It Works, Managed Virtual Support, Client Stories, Insights, Videos, FAQs, Contact)
- [ ] **SEO campaign pages** (Sydney, Brisbane, Melbourne): content from VA Paola, client permissions,
  Yoast SEO, and built in WordPress (they exist only in the React mockup today)
- [ ] **Redirects** for the 30 page addresses that change, entered in the Redirection plugin and each one tested *(added)*
- [ ] A decision on the 10 orphan pages: redirect or let them 404 *(added)*
- [ ] Duplicates removed: `/home-old/` and the second contact page (`/contact/` and `/contact-us/`) *(added)*
- [ ] The sitemap: `https://` addresses only; the old testimonials sitemap removed *(added)*
- [ ] Search engine visibility: **on** for live, **off** for staging (Settings → Reading) *(added)*

## 3. Tracking

- [ ] **Google Analytics** set up and recording visits (none exists on the Business Profile account)
- [ ] **Google Search Console** set up, the site verified, the sitemap submitted
- [ ] Google Ads: auto-tagging on, conversion tracking pointed at the Thank You page, ad links using the new addresses *(added)*
- [ ] **Google Business Profile** updated: website link, hours and address checked; confirm the change prompt *(added)*

## 4. Forms and email *(added)*

- [ ] Contact form sends to `clientcare@virtualofficeangels.com.au`, and the recipient is confirmed
- [ ] WP Mail SMTP set up, so enquiries don't land in spam
- [ ] A real test enquiry sent from every page with a form; it arrives and is saved in Flamingo
- [ ] The Google Ads test (`?gclid=test`) marks the email "From Google ADS"
- [ ] Email routing fixed: the Business plan holds a copy of the Virtual Office Angels domains, so some
  mail sent from there never reaches the real mailbox. Needs approval
- [ ] The form's fallback message (shown only if Contact Form 7 is off) approved; it was written by
  Claude. The consent error says "terms and conditions" but the box is a privacy consent: reword it
  under the form's **Messages** tab
- [ ] DMARC set up for `virtualofficeangels.com.au` (WP Mail SMTP warns about it). Needs approval

## 5. Security and server

- [x] **PHP upgraded** to 8.3.36 on 23 October 2026. Staging shares the live site's PHP setting, so it
  moved too. Live pages, the WPBakery editor and the contact form were checked; see
  [`../hosting/`](../hosting/README.md)
- [ ] The staging site itself checked on 8.3.36: pages, the contact form and the Website Content editor.
  Not recorded as tested on 23 October *(added)*
- [x] **PHP2Shell vulnerability** (CVE-2026-109618 and CVE-2026-109619): fixed by moving to PHP 8.3.36,
  a fixed release, confirmed in Site Health *(added)*
- [x] The 2023 leftover infection files removed from live and from staging (which had the same files), after
  backups, on 25 October. Both sites checked afterwards *(added)*
- [ ] Unused and risky plugins removed (e.g. WP File Manager), the rest updated *(added)*
- [x] The old WP Logo Showcase copy deleted from live's `wp-content/updraft/plugins-old/` on 25 October;
  staging has no such folder *(added)*
- [ ] A clean Wordfence scan of staging *(added)*
- [ ] Admin users reviewed (old staff removed), two-factor login for every admin *(added)*
- [ ] Website Content editor role tested on staging *(added)*

## 6. Legal *(added)*

- [ ] Privacy policy and terms pages, current and linked in the footer
- [ ] A decision on cookie consent, now that Analytics will be added

## 7. Testing *(added)*

- [ ] Every page checked: desktop, tablet and phone; light and dark mode; keyboard only
- [ ] All 98 posts present, with dates, authors and featured images
- [ ] No leftover page-builder code (such as `[vc_row]`) and no links to `stagingsite2`
- [ ] Menus, search and the 404 page work
- [ ] PageSpeed Insights run on mobile and desktop, and problems fixed

## 8. Launch day *(added)*

- [ ] **Written approval from the client** to go live
- [ ] A fresh full backup of live, downloaded off the server; working off-server backups going forward
- [ ] An agreed launch method. HostGator's "Deploy all changes" overwrites live completely, including
  anything published there since the clone
- [ ] A rollback plan, with someone available to run it
- [ ] A low-traffic launch window, not a Friday afternoon
- [ ] After launch: test the redirects again, submit the sitemap, watch Search Console for 404 errors for two weeks
