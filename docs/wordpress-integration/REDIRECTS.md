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

## Proposed targets — checked against each page's content (10)

You decided all ten old pages with no equivalent should redirect (Q11). **Each page was read on the
live site on 2026-10-04** (read only), and two targets changed as a result.

| Old address | Target | What the page actually contains |
| --- | --- | --- |
| `/specialised-recruitment/` | `/services/` | 2017 pitch for skilled, pre-qualified, managed assistants |
| `/specialised-recruitment-services/` | `/services/` | Summaries of four services (mortgage, real estate, financial planning, accounting) |
| `/businesses-these-days/` | **`/why-voa/`** *(was `/`)* | Two paragraphs on Virtual Office Angels managing the VA for you: the Managed Virtual Support message |
| `/client-case-studies/` | `/client-stories/` | **One full case study** (an Epping business consultancy). The new site has no equivalent; see below |
| `/simply-too-busy/` | **`/services/`** *(was `/`)* | One sentence introducing "a few of our services" |
| `/we-do-what-other-company-dont/` | `/why-voa/` | **Empty**, title only |
| `/work-with-us/` | `/contact/` | **Empty**, title only. Not a careers page, so the worry about it is settled |
| `/how-we-help/` | `/how-it-works/` | Six benefits and a five-step hiring process |
| `/home-old/` | `/` | An old copy of the home page. It shows two broken plugin codes as text, and is indexable today |
| `/yes-want-book-no-obligation-appointment/` | `/contact/` | A sales letter ending in a SurveyMonkey booking link; the contact form replaces it |

**Content with no home on the new site:** the client case study on `/client-case-studies/`. It names no
client, only "a Business Consultancy and Management Services Company based in Epping, NSW". Ask the
client whether it should become an Insights article or a section of Client Stories; until then the
redirect sends visitors to Client Stories, which carries testimonials but not this story.

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
