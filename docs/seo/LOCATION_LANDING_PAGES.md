# City landing pages (mockup)

Status: **built in the React mockup and the WordPress theme**, not linked from the navigation. Updated
27 October 2026 with the content writer's copy; replaces the New South Wales and Queensland state
mockups of 18 October.

**WordPress (27 October 2026):** the theme renders the three pages with `page-location.php` from
`data/locations.json`, exported from `locationPages.ts` by `npm run wp:export`. **Appearance → Site
setup** creates the pages and seeds each new page's Yoast title and description. Their copy and client
logos are editable under **Website Content** (`wordpress-theme/CONTENT_EDITING.md`). Tested on a local
WordPress 7.1.3 / PHP 8.3: the comparison script reports all three pages identical to the React build,
a test edit and logo showed on Sydney only and restored cleanly, and the error log stayed empty. Not yet
installed on VOA staging.

- `/virtual-assistants-sydney`
- `/virtual-assistants-brisbane` (covers Brisbane and the Gold Coast)
- `/virtual-assistants-melbourne`

The first mockup addresses (`/virtual-assistants/sydney` and so on) redirect to these.

Code: `src/content/locationPages.ts` (data), `src/pages/LocationPage.tsx` (layout), routes in
`src/app/App.tsx`, two style blocks at the end of `src/styles/global.css` (the client wall's columns,
and the service cards' h3 headings).

## Why cities, not states

- The owner does not want state-wide pages: New South Wales is too large an area.
- Australians search by city ("virtual assistant Sydney") far more than by state. This is the usual
  pattern, not yet measured for these terms; Keyword Planner should confirm it.
- Suburbs and sub-regions (Bondi Junction, Eastern Suburbs) were considered and rejected: few people
  search at that level, and with current clients only, each would have one to four clients.

## The data: current clients only

Source: the "VA & Client Info" sheet in `260922-VOA Action Items Tracker.xlsx`, sent by the team
leaders on 21 October 2026. Virtual Office Angels' own staff are excluded. The 30 logos in the website
carousel are **not** used as data; past clients and logo-only businesses are left out.

| City | Clients | VAs | Clients (suburb) and the services their VAs provide |
| --- | --- | --- | --- |
| **Sydney** | **7** | **10** | Road Surgeons (Botany): admin. Industrias Service Group (Alexandria): admin, bookkeeping. RedP Marketing (Revesby): 3 digital marketing. Sureserve Financial Services (Woollahra): financial planning admin. Integra Consulting (Eastwood): executive admin. Pool Aide (Lindfield): admin and accounts. Ressfin Total Lending Solution (Bondi Junction): loan processing |
| **Brisbane & Gold Coast** | **2** | **2** | Seet Advisory (Toowong): financial planning. Coastal Financial Consultants (Helensvale, Gold Coast): mortgage support |
| **Melbourne** | **1** | **1** | Velar Finance (Doncaster East): loan processing |
| Wollongong | 1 | 1 | Hokus E-bikes (Corrimal): Shopify and social media. No page yet |

Brisbane and the Gold Coast share one page: they are about an hour apart, and both clients are in
finance.

The tracker item asked for clients "for the last 2 years"; the sheet appears to list current
placements only.

## Why these three, and the risk

- **Sydney** has the clients, the VAs, the office (Chatswood) and the verified Google Business Profile.
- **Brisbane** and **Melbourne** have one or two clients each, so their pages are thin. Each still has
  something genuinely local: Brisbane's clock does not change for daylight saving; Melbourne's clients
  are in mortgage broking. Expand these pages as clients are added there.
- Google treats many near-identical location pages as doorway pages. Keep each page's content local
  (its clients, their industries, its hours, a local story) and do not add cities with no clients.

## What the pages contain

**Copy source (27 October 2026):** the content writer's three documents,
`VOA_<City>_Service Page Area Page_On-Page SEO Optimized.docx`. They set each page's address, SEO title
and meta description, and the copy and order of every section: hero, local clients, working hours,
services, client story and FAQs. The layout, the four hero figures and the closing contact section
are unchanged.

- **SEO title and description:** set on each page while it is open, so the mockup shows them in the
  browser tab. WordPress will need them in Yoast.
- **Clients:** a logo where the website's library has one, otherwise the business name, with the
  location. Logos used: Road Surgeons, Pool Aide, Ressfin, and two to confirm: the "SureServ" logo for
  Sureserve Financial Services and the "Integra Consultancy" logo for Integra Consulting. The writer
  asked for logos for Industrias, RedP, Seet Advisory and Coastal Financial, which the library does not
  have: their names show until the logos are supplied. Velar Finance shows its name, as asked.
- **Services:** the writer's own cards and wording: five for Sydney, two for Brisbane, one for
  Melbourne, with h3 headings. As on every service list, a card's description appears on hover (always
  on phones) and is cut at three lines, so the longer descriptions are shortened there.
- **Client story:** each city has the writer's story and a "Services we offer" list. Sydney's replaces
  the Epping case study link.
- **FAQs:** only the writer's questions (Sydney four, Brisbane and Melbourne five each), with h3
  question headings. They replace the four general FAQs.

The writer's links pointed at preview sites (chatgpt.site, the Vercel mockup); here they point at the
mockup's own pages. Links to government websites open in a new tab.

Not from the writer: the highlighted heading words (the city or area), the closing section heading
("Looking for virtual support in …?"), and two panel labels without their colon.

## Before any of this goes live

- Logos for Industrias Service Group, RedP Marketing, Seet Advisory and Coastal Financial
  Consultants.
- The writer's spelling "authorized" in the Sydney and Brisbane mortgage cards; the rest of the copy
  uses "authorised".
- Keyword Planner volumes for the three cities, to confirm the order (and Brisbane versus Melbourne).
- An answer still open: 5pm or 5:30pm (Google Business Profile says 5:30, the website says 5). The
  writer's copy no longer states the hours.
- On VOA staging: upload the new theme ZIP (after a database backup), run **Appearance → Site setup**
  once, then check the three pages and their Yoast fields.
