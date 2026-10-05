# Redirects

[`redirects.csv`](redirects.csv) is the import file for the **Redirection** plugin, which is already
installed on the live site. It sends every old address to its new one, so links and search results
keep working after the switch.

**Source of truth: `VOA_Redirect_Map.xlsx`**, supplied 2026-10-05 (decision: where it and the earlier
list disagreed, the spreadsheet wins). The file was rebuilt from it the same day. It replaces the
earlier 26-row list.

## What is in it: 151 redirects

| Group | Count | Where they go |
| --- | ---: | --- |
| Articles, `/{article}/` | 98 | `/insights/{article}/`, the same name. One per published post, checked against the database backup: none missing, none extra |
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

## How to import (staging first; live only at cutover)

1. Run **Appearance → Site setup** first: it creates the new pages and sets article addresses to
   `/insights/{article}/`. Redirecting before that would send visitors to pages that do not exist yet.
2. wp-admin → **Tools → Redirection → Import/Export** → **Import**, choose `redirects.csv`, **Upload**.
3. Check the count it reports: **151**.
4. In a private browser window, test a few: an old service page, `/about-us/`, an old article, a
   `/tag/…` page, and `//yes-want-book-no-obligation-appointment/` (the double slash is the one most
   likely to behave differently on a real server).
