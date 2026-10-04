# Redirects — for review

[`redirects.csv`](redirects.csv) is the import file for the **Redirection** plugin, which is already
installed on the live site. It sends every old page address to its new one, so links and search
results keep working after the switch. Built 2026-10-04 from section 5 of
[`reference/WORDPRESS_LIVE_SITE_STATUS.md`](reference/WORDPRESS_LIVE_SITE_STATUS.md).

**Nothing is imported yet, and nothing should be until you approve this list.** The import is for
staging first, and for live only at cutover.

## Agreed mappings (15)

These come straight from the draft redirect map: each old page has an obvious new equivalent.

| Old address | New address |
| --- | --- |
| `/mortgage-loans-processing-support/` | `/services/mortgage-loans/` |
| `/financial-planning-assistance-administration/` | `/services/financial-planning/` |
| `/accounting-bookkeeping-assistance/` | `/services/accounting-bookkeeping/` |
| `/real-estate-administration-support/` | `/services/real-estate-conveyancing/` |
| `/business-back-office-and-admin-support/` | `/services/back-office-admin/` |
| `/digital-marketing-assistance/` | `/services/digital-marketing/` |
| `/sales-and-marketing-support/` | `/services/sales-marketing/` |
| `/creative-writing-and-copywriting-assistance/` | `/services/creative-copywriting/` |
| `/it-services-and-technology/` | `/services/it-technology/` |
| `/about-us/` | `/about/` |
| `/why-us/` | `/why-voa/` |
| `/testimonials/` | `/client-stories/` |
| `/blog/` | `/insights/` |
| `/faq/` | `/faqs/` |
| `/contact-us/` | `/contact/` |

Pages whose address does not change need no redirect: `/`, `/services/`, `/how-it-works/`, `/videos/`
and `/contact/`. Articles keep their addresses, so none of them need one either.

## Proposed targets — please check (10)

You decided all ten old pages with no equivalent should redirect (Q11). **Where they go is my
proposal, chosen from each page's address only — I have not seen their content.** Open each on the
live site and check the target fits.

| Old address | Proposed target | Why — and what to check |
| --- | --- | --- |
| `/specialised-recruitment/` | `/services/` | Recruitment of specialists is what the services index covers |
| `/specialised-recruitment-services/` | `/services/` | Near-duplicate of the one above |
| `/businesses-these-days/` | `/` | Reads like a general marketing page |
| `/client-case-studies/` | `/client-stories/` | Closest match |
| `/simply-too-busy/` | `/` | Reads like a general marketing page |
| `/we-do-what-other-company-dont/` | `/why-voa/` | A "why choose us" page |
| `/work-with-us/` | `/contact/` | **Check this one.** If it is a careers page for virtual assistants rather than for clients, it needs a different home |
| `/how-we-help/` | `/how-it-works/` | Closest match |
| `/home-old/` | `/` | A stale copy of the home page |
| `/yes-want-book-no-obligation-appointment/` | `/contact/` | A booking page; the contact form replaces it |

## One pattern rule — please check

| Rule | Target | Note |
| --- | --- | --- |
| Anything under `/ttshowcase/` | `/client-stories/` | The old testimonials plugin publishes each testimonial as its own page, listed in a public sitemap. **Confirm the addresses really start `/ttshowcase/`** by opening that sitemap; adjust the rule if not |

## How to import (when approved)

1. wp-admin → **Tools → Redirection → Import/Export**.
2. Under **Import**, choose `redirects.csv`, then **Upload**.
3. Check the count it reports: **26**.
4. Test three or four old addresses in a private browser window.

The file has a header row (`source,target,regex,code`). If the import preview shows a redirect from
`source` to `target`, delete that one row afterwards — Redirection's handling of a header row has not
been checked here.
