# State landing pages (mockup)

Prepared 18 October 2026 for the SEO campaign proposal of 19 October. Status: **mockup for review**,
React build only, not linked from the navigation, no WordPress version.

- `/virtual-assistants/new-south-wales`
- `/virtual-assistants/queensland`

Code: `src/content/statePages.ts` (data), `src/pages/StatePage.tsx` (layout), routes in
`src/app/App.tsx`, one style block at the end of `src/styles/global.css` (the per-state logo
columns).

## Why these two states

The 30 client logos in the website carousel (`src/content/source/staging/clients.json`) were looked
up on ABN Lookup (abr.business.gov.au, the government business register) on 18 October 2026. Ten
logos had been saved without a name; their names were read from the artwork.

| State | Clients | Confidence |
| --- | --- | --- |
| New South Wales | **18** | Exact business name registered in NSW, except where noted |
| Queensland | **2** | Exact name |
| Victoria | 1 | Exact name |
| Western Australia | 1 | Exact name |
| NSW or Queensland, unclear | 3 | Same name registered in both, or a franchise |
| Not found | 4 | Name too common or not registered |
| Overseas | 1 | Philippines |

### The lookup, client by client

| Client | State (postcode) | Note |
| --- | --- | --- |
| Rezi Finance | NSW (2018) | |
| Jennings Mortgages | NSW (2000) | |
| Smart Start Financial | NSW (2159) | "Smart Start Financial Services" |
| RessFin | NSW (2022) | Logo had no saved name |
| BK Lending Solutions | NSW (2765) | Logo had no saved name |
| Vantage Financial | NSW (2000) | "Vantage Financial Group Pty Ltd"; a "Vantage Finance" is in VIC, so likely, not certain |
| Wealth Focus | NSW (2095) | |
| ACF Group | NSW (2000) | "ACF Group Pty Ltd" |
| OctopusBot | NSW (2000) | |
| Sydney Cabling | NSW (2142) | |
| GetIt Installed | NSW (2767) | |
| Air Exchange | NSW (2516) | "Air Exchange A/sia Pty Ltd"; logo had no saved name |
| Road Surgeons | NSW (2019) | Logo had no saved name |
| Parrot Digital | NSW (2060) | Logo had no saved name |
| ALRA | NSW (2103) | "Australia's Leading Recruitment Agency"; logo had no saved name |
| SkyBlue Dermatology | NSW (2031) | Randwick, from healthdirect; not found on ABN Lookup by name |
| Cactus Skin Care | NSW (2481) | "Cactus Skincare"; the logo artwork reads "cactus flower", so check |
| Pool Aide | NSW (2446) | Logo had no saved name |
| Stratfund | QLD (4209) | |
| Thrifty Money | QLD (4209) | |
| Stimulus Finance | VIC (3205) | "The Trustee for Stimulus Finance Trust" |
| Think Capital | WA (6104) | |
| SAI Real Estate | NSW (2173) or QLD (4152) | Both names registered |
| Integra Consultancy | QLD (4055) or NSW (2122) | Both registered; logo had no saved name |
| First Class Accounts | Several | A franchise network, head office on the Gold Coast, QLD |
| CrossRoads | Not found | Too many businesses with this name |
| MyBookkeeper | Not found | Too many businesses with this name |
| YMLife | Not found | No registered name |
| Focus | Not found | Logo had no saved name; name too common |
| SureServ | Overseas | A Philippine healthcare-lending app |

Limits: a logo on the website shows a past or present client, not a current one, and says nothing
about how much work each gives. The client's own list (deck question 2) is the real source.

## What the pages contain

Built from existing sections, in order: the homepage hero (the same rotating photographs, four
figures and dots, with a heading for the state), the state's client logos, working hours, three
services, a client story, four FAQs, and the contact section. The closing omits the four-figure
strip other pages carry, because the hero already shows it.

Reused content, unchanged: the homepage hero description, the FAQ answers (operating hours, weekend
work, communication, privacy), the service titles and summaries, and the Epping NSW case study.

Written for the mockup (not client copy): the headings ("Virtual assistants for … businesses.",
"Trusted by businesses across ….", "Support that works your hours.", "The support … clients use
most.", "What … businesses ask us.", "Looking for virtual support in …?"), the hours panel items,
the services chosen per state, and the Queensland placeholders.

## Before any of this goes live

- Each client's permission to show its logo on a state page.
- The client's answers in the deck: real client locations, office address, hours across time zones.
- A WordPress page template, once the client approves the approach.
