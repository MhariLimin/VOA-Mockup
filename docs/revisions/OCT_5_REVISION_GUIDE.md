# Revisions of 5 October 2026

Sources, both supplied by the user on 2026-10-05 (kept untracked in the repository root):

- `Recommended Changes_VOA MockUp.docx`: Insights and FAQ copy, and new header images
- `VOA_Redirect_Map.xlsx`: final page addresses, the redirect map and a launch guide

The spreadsheet also names the deployed mockup: `https://virtualofficeangels-mockup-1.vercel.app/`.

Tags follow `MOCKUP_1_REVISION_GUIDE.md`: **[Confirmed]** decided by the user, **[Blocked]** waiting
on an input. Each category is done in both builds (React and the WordPress theme), checked, and
approved before the next starts.

## Decisions (asked and answered 2026-10-05)

| Question | Answer |
| --- | --- |
| Adopt the spreadsheet's 11 final page addresses | **Yes, in both builds** |
| Article addresses | **Move to `/insights/{article}/`**, as the spreadsheet says |
| Where the spreadsheet and the earlier redirect list disagree | **The spreadsheet wins** |
| The old client case study | **New section on Client Stories**, the live page's text word for word |
| Orange words, Insights heading | "virtual assistants" |
| Orange words, FAQ heading | "What to know" |
| New header images | The user downloads them into `public/new/` |
| Old archive pages | **Follow the spreadsheet**: most redirect to `/insights/`, `/author/anne/` stays |

## A. Copy and buttons (Word file) — done 2026-10-05, awaiting approval

- **A1** [Confirmed] Insights: remove the "Browse articles" and "Watch videos" buttons from the page
  opening.
- **A2** [Confirmed] Insights heading → "Explore better ways to delegate and work with *virtual
  assistants*."
- **A3** [Confirmed] FAQ heading → "*What to know* before working with us."
- **A4** [Confirmed] FAQ button "Ask another question" → "Ask Us a Question", solid orange (the site's
  primary button) instead of outlined. Still goes to Contact.

## B. Header images (Word file) — done 2026-10-05

- **B1** [Confirmed] Insights page opening: option I1, the person reading at home
  (`public/assets/client/extra/insights-reading-at-home.jpg`).
- **B2** [Confirmed] Home page hero: the user chose to replace slide 3 (video call) and slide 7
  (laughing group). The new options took those two places, and the other two were added at the end:
  ten slides. Originals resized to 1920 px, 167–238 KB; the downloads stay in `public/new/`.

## C. Final page addresses (spreadsheet, "New routes" tab) — done 2026-10-05

- **C1** [Confirmed] Ten service pages:

  | Now | Final |
  | --- | --- |
  | `/services/mortgage-loans` | `/services/mortgage-loans-processing-virtual-support` |
  | `/services/financial-planning` | `/services/virtual-financial-planning-and-admin-assistant` |
  | `/services/accounting-bookkeeping` | `/services/accounting-and-bookkeeping-virtual-assistant` |
  | `/services/insurance-processing` | `/services/insurance-processing-virtual-assistance` |
  | `/services/real-estate-conveyancing` | `/services/real-estate-virtual-assistant-services` |
  | `/services/back-office-admin` | `/services/executive-and-administrative-virtual-assistance` |
  | `/services/digital-marketing` | `/services/digital-marketing-virtual-assistant-services` |
  | `/services/sales-marketing` | `/services/sales-and-e-commerce-virtual-assistant` |
  | `/services/creative-copywriting` | `/services/creative-copywriting-virtual-assistant` |
  | `/services/it-technology` | `/services/it-virtual-assistant-services` |

- **C2** [Confirmed] `/why-voa` → `/managed-virtual-support`.
- **C3** [Confirmed] Articles at `/insights/{article}/` in WordPress (the React build already uses
  this). Technical note: setting WordPress's post addresses to `/insights/%postname%/` also moves the
  author, category and tag archives under `/insights/` by default; `/author/anne/` must stay where it
  is (spreadsheet: Retain), so the theme has to keep the archives at their current addresses.
  Done in `inc/permalinks.php`, set by Site setup; `/insights/page/2/` also kept working.
- **C4** Menus, internal links, the mega menu and Site setup follow the new addresses; the old mockup
  addresses redirect to the new ones.

## D. Redirects (spreadsheet) — done 2026-10-05: 151 redirects, see `docs/wordpress-integration/REDIRECTS.md`

- **D1** Rebuild `redirects.csv` from the spreadsheet's "Ready after launch" rows (58 pages and
  archives, plus the article rows), replacing the earlier list.
- **D2** Keep from the earlier review only what the spreadsheet asks to be checked: `/work-with-us/`
  was confirmed empty on 2026-10-04 (not a careers page), so `/contact/` stands.
- **D3** Rows marked "Publish content first" or "Review first" stay out of the import file until
  their content exists (the case study, `/category/blog/`, `/voa/yes-want-…`).
- **D4** The spreadsheet's view that 68 articles "need migration" does not apply: cloning live to
  staging brings all 98. Their redirects to `/insights/{article}/` are ready once C3 is done.

## E. Client case study (spreadsheet: publish before redirecting) — done 2026-10-05

- **E1** [Confirmed] New section on Client Stories (`#case-study`) carrying the `/client-case-studies/`
  text word for word (read on 2026-10-04), built from the existing split, panel and check list. Text in
  `src/content/caseStudy.ts`. Needs the client's OK to publish, since the live page names no client
  but describes one.
- **E2** [Confirmed] The live page's closing sales section ("What makes Virtual Office Angels
  Different…") is left out: it claims "TOP 10%" hiring where the site says "Top 5%" (user's decision).
- **E3** Written for the layout, not taken from the live page: the eyebrow "Client case study". The
  labels "The Client:" and "Their Challenges:" lost their colons.
- **E4** Once the client approves the section, add `/client-case-studies/` → `/client-stories/` to
  `redirects.csv` (it is held back until then).

## F. Fixes found on staging (5 October 2026)

- **F1** The fixed header sat under WordPress's admin bar for logged-in users (logo cut off, an empty
  strip below the header). Visitors were not affected. `wordpress.css` now moves the header, the
  phone menu and the sticky side panels down by the bar's height when it is shown.
- **F2** Article cards and article headers showed the tinted fallback block instead of a picture. None
  of the 98 live posts has a featured image set; 89 carry their picture in the article text (the
  local test copy had featured images, which hid this). `voa_article_image()` now falls back to the
  first picture in the article, at its large size when it came from the media library. The 9 posts
  with no picture keep the fallback block. As in the mockup, an article whose text opens with its
  picture shows it at the top and again in the text.
- **F3** On staging the header was 107px tall instead of 74px. Cause, measured on staging: the old
  design's **Customize Twenty Sixteen** plugin styles `.site-header` (the old theme used the same
  class name) with 1em of padding top and bottom. WPBakery and WP-PageNavi also add their stylesheets
  and Max Mega Menu a script. Fix: deactivate the old design's plugins on staging, which the plan
  retires at launch anyway; no theme change.
- **F4** With the old plugins off, a gap remained under the header on staging, for logged-in users.
  Cause: The HostGator Plugin adds a "Site Preview - This site is NOT LIVE" bar (`.nfd-site-preview-
  warning`) while coming-soon mode is on; it sat hidden behind the fixed header and pushed the page
  down. `wordpress.css` hides it; the admin bar already shows "Coming soon". Previewed on staging in
  the browser before the change: the hero then starts directly under the header.
