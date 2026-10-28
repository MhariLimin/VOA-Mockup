# Redirects

[`redirects.csv`](redirects.csv) is the import file for the **Redirection** plugin, which is already
installed on the live site. It sends every old address to its new one, so links and search results
keep working after the switch.

**Source of truth: `VOA_Redirect_Map.xlsx`**, supplied 2026-10-05 (decision: where it and the earlier
list disagreed, the spreadsheet wins). The file was rebuilt from it the same day. It replaces the
earlier 26-row list.

## What is in it: 153 redirects

| Group | Count | Where they go |
| --- | ---: | --- |
| Articles, `/{article}/` | 100 | `/insights/{article}/`, the same name. One per published post, checked against the database backup: none missing, none extra. Plus the two published since: 15 October (`when-does-a-remote-support-role-require-industry-experience`) and 26 October (`niche-virtual-assistant-roles`), added 2026-10-28. Add a row for every article published on live before launch |
| Old pages | 24 | Their new page, e.g. `/about-us/` → `/about/`, `/why-us/` → `/managed-virtual-support/`, each old service page → its final service address |
| Old testimonial pages, `/testimonial/…` | 5 | `/client-stories/` |
| Tag, category and listing pages (`/tag/…`, `/category/…`, `/author/anne/page/2/` …) | 21 | `/insights/` |
| Broken old links (`//yes-want-…`, `/financial-planning-assistance-and-administration/`) | 2 | `/contact/`, the financial planning service |
| `/category/blog/` | 1 | `/insights/`. The spreadsheet holds it until the articles are migrated; they all come across with the staging clone, so it is ready |

Every target ends in a slash, so no redirect lands on WordPress's own slash redirect: each old address
takes **one** 301 to a page that loads.

## Held back: 3

| Old address | Why |
| --- | --- |
| `/client-case-studies/` | The spreadsheet: publish the case study on Client Stories first. The section is built (revision E, 2026-10-05); add this redirect once the client approves it |
| `/voa/yes-want-book-no-obligation-appointment/` | The spreadsheet: "Review first", confirm the booking flow. Today it shows the old home page |
| `/services` (no slash) | WordPress adds the slash itself; a rule here could loop |

Kept as they are, no redirect: `/`, `/services/`, `/how-it-works/`, `/videos/`, `/contact/`, and
`/author/anne/` (the theme keeps author pages at `/author/…`).

## Tested locally (2026-10-05)

On the local WordPress copy, with Redirection 5.10.1 (live has 5.10.0):

- The import created **151** redirects. The header row was recognised and skipped.
- Every one answers with a single 301 to its target. All 53 page and archive redirects, and the 30
  articles the local copy holds, land on a page that loads. The other 68 articles exist only on live,
  so they can be checked on staging.

## Staging copy

Redirection matches the whole address, including the folder WordPress sits in, so `redirects.csv`
matches nothing on staging (`/staging/1384/`) and its targets point at the live site.
[`redirects-staging-1384.csv`](redirects-staging-1384.csv) is the same 153 rows with `/staging/1384`
in front of every source and target, for testing only. Import it into its own group and delete that
group before launch. Step-by-step: [`REDIRECTS_STAGING_GUIDE.txt`](REDIRECTS_STAGING_GUIDE.txt).

## Tested on staging (2026-10-28)

`redirects-staging-1384.csv` imported on VOA staging. Checked from outside with plain requests:

- All **153** answer with a single 301 to exactly the expected address.
- All **117** distinct landing pages answer 200, both new articles included. Staging is in Coming
  Soon mode, but that page keeps the real status code (404 for a missing page), so the check holds.
- The Redirects list shows 155: the 2 extra were already on staging, copied from live, and are
  both disabled there: `/services-2/` → `/services/` (last hit January 2025) and
  `/voa/how-it-works/` → `/how-it-works/` (last hit November 2024). Neither source is in the new
  list and both targets keep their address, so they are left as they are. They sit outside the
  "Staging test" group, so deleting that group before launch does not remove them.
- Each tested redirect now shows 1 hit dated 28 October: that is the test request, not a visitor.

## How to import (staging first; live only at cutover)

1. Run **Appearance → Site setup** first: it creates the new pages and sets article addresses to
   `/insights/{article}/`. Redirecting before that would send visitors to pages that do not exist yet.
2. wp-admin → **Tools → Redirection → Import/Export** → **Import**, choose `redirects.csv`, **Upload**.
3. Check the count it reports: **153**.
4. In a private browser window, test a few: an old service page, `/about-us/`, an old article, a
   `/tag/…` page, and `//yes-want-book-no-obligation-appointment/` (the double slash is the one most
   likely to behave differently on a real server).
