# City landing pages (mockup)

Status: **mockup for review**, React build only, not linked from the navigation, no WordPress
version. Updated 22 October 2026; replaces the New South Wales and Queensland state mockups of
18 October.

- `/virtual-assistants/sydney`
- `/virtual-assistants/brisbane` (covers Brisbane and the Gold Coast)
- `/virtual-assistants/melbourne`

Code: `src/content/locationPages.ts` (data), `src/pages/LocationPage.tsx` (layout), routes in
`src/app/App.tsx`, one style block at the end of `src/styles/global.css` (the client wall's columns).

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
| **Sydney** | **7** | **10** | Road Surgeons (Botany): admin. Industrias Services Group (Alexandria): admin, bookkeeping. RedP Marketing (Revesby): 3 digital marketing. Sureserve Financial Services (Woollahra): financial planning admin. Integra Consulting (Eastwood): executive admin. Pool Aide (Lindfield): admin and accounts. Ressfin Total Lending Solution (Bondi Junction): loan processing |
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

Built from existing sections: the homepage hero (same rotating photographs, four figures and dots,
with a heading for the city), the city's clients, working hours, the services its clients use (most
VAs first), a client story, four FAQs, and the contact section.

- **Clients:** a logo where the website's library has one, otherwise the business name, with the
  suburb. Logos used: Road Surgeons, Pool Aide, Ressfin, and two to confirm: the "SureServ" logo for
  Sureserve Financial Services and the "Integra Consultancy" logo for Integra Consulting. Industrias,
  RedP, Seet Advisory, Coastal Financial and Velar Finance have no logo in the library.
- **Client story:** Sydney uses the existing case study (a consultancy in Epping, Sydney). Brisbane
  and Melbourne have placeholders.

Reused content, unchanged: the homepage hero description, the FAQ answers (operating hours, weekend
work, communication, privacy), the service titles and summaries, and the case study.

Written for the mockup (not client copy): the headings ("Virtual assistants for … businesses.",
"Trusted by businesses across ….", "Support that works your hours.", "The support … clients use.",
"What … businesses ask us.", "Looking for virtual support in …?"), the client-count sentence, the
hours panel items, and the Brisbane and Melbourne placeholders.

## Before any of this goes live

- Each client's permission to be named, or to have its logo shown, on a public page.
- Keyword Planner volumes for the three cities, to confirm the order (and Brisbane versus Melbourne).
- Answers still open from the deck: Brisbane's hours during daylight saving; 5pm or 5:30pm (Google
  Business Profile says 5:30, the website says 5).
- A WordPress page template, once the client approves the approach.
