# Session handoff — content integration and page updates

Written 2026-09-21 (second session). Read this file first, then `docs/MOCKUP_1_REVISION_GUIDE.md`.

## Where things stand

All Mockup 1 revision categories are now complete and approved. In addition, three updated content documents supplied by the client were read and integrated this session.

| Category | Items | Status |
| --- | --- | --- |
| Global | G1–G3 | Approved |
| Header | H1–H3, H5–H7 | Approved (**H4 blocked** — client logo file) |
| Home page | HP1–HP12 | Approved |
| Services pages | SP1–SP7 | Approved |
| `/services` index | — | Approved (revamp beyond original scope) |
| How It Works | HIW1–HIW3 | Approved |
| Managed Virtual Support (was Why VOA) | WVOA1–WVOA2 | Approved |
| Client Stories & Testimonials | CST1–CST2 | Approved |
| FAQs page | FAQ1 | Approved |
| Articles & Blog / Videos | ART1–ART2 | Approved |
| About page | ABT1–ABT2 | Approved |
| Footer | FTR1 | Approved |

## Content documents integrated this session

Three documents were supplied in `docs/updated_src/` and read this session:

| File | Status |
| --- | --- |
| `HR-Managed Virtual Support.pdf` | **Integrated** — `managedContent.ts` updated |
| `About Us Page_CONTENT_VOA.docx` | **Integrated** — About page fully updated |
| `SERVICE PAGES_VOA.pdf` | **Not started** — deferred at user request; do this next |

`HR-Managed Virtual Support (1).pdf` was a duplicate of the above PDF and has been removed.

## What was done this session

### Mockup revisions (all approved)
- **FAQ1** — FAQs page converted to single-open controlled `<details>` accordion.
- **ART1/ART2** — Insights page gains category filter + pagination (10 per page). Videos page gains pagination structure. `VIDEO_PLACEHOLDERS` const added.
- **ABT1/ABT2** — About page restructured: Our Story now Anne-focused; Founder & Leadership section replaced.
- **FTR1** — Footer brand logo changed to orange variant (`/assets/voa-logo-orange.png`, width 260px).

### Content integration from source documents
- **About page** — fully rebuilt from `About Us Page_CONTENT_VOA.docx`:
  - Hero: new title + summary from document; CTAs now link to `/services/mortgage-loans` and `/contact`
  - Our Story: Anne-founded narrative ("Built on HR expertise")
  - Who We Support: new section with 8 service areas + link
  - The Way We Work: new dark section with 4 value cards (Clarity, Accountability, Consistency, Client Care)
  - FAQs: 6 Q&As using the existing Accordion component
- **Managed Virtual Support page** — updated from `HR-Managed Virtual Support.pdf`:
  - `ownershipSplit` bullets updated in both columns
  - `includes` checklist updated (6 items, new wording)
  - `questions` reduced from 4 to 2 (the two the PDF specifies)

### New files added this session
| File | Purpose |
| --- | --- |
| `public/assets/voa-logo-orange.png` | Orange logo for dark footer background |
| `.values-grid` CSS | 2-column card grid used in the About page "The way we work" section |

## How to work on this

These rules were agreed across both sessions and carry over.

- **Work one category at a time.** Implement, report, wait for approval, then move on.
- **Browser use is opt-in.** The user asked that the Chrome plugin not be used freely because of token cost. Ask first, or use it only when they say so. Visual claims that were not checked must be stated as unverified.
- **After every change:** `npm run lint`, `npx tsc --noEmit -p tsconfig.app.json`, `npx tsc --noEmit -p tsconfig.node.json`, and a production build. Build to a scratch directory (`npx vite build --outDir <scratch>`) because deleting the existing `dist` hits `EPERM` in this environment.
- **Dev server:** `npm run dev`. It frequently lands on **port 5174** because 5173 is still held.
- **Never invent copy.** Everything user-facing comes from `VOA Content` or existing captured source. When something had to be written, it was flagged explicitly.
- **Report format:** bullets and short sections, not paragraphs. Lead with what changed, then what needs their eye.
- **VOA Content location on this device:** `D:\Mhari\Apollo\VOA-Content\voa-mockup` (not E: drive — that path is from a different device).

## Next task: service pages update from SERVICE PAGES_VOA.pdf

This is the only outstanding content task. The PDF is at `docs/updated_src/SERVICE PAGES_VOA.pdf`.

**Before starting:** Read the PDF using pdfplumber via Python — `python -c "import pdfplumber; ..."`. Do not use pandoc (not installed on this device's PATH from Bash). Python is available via PowerShell as `python`.

**What the PDF contains (from prior session read):**
- Updated hero titles, lead copy, scope tags for all services
- Updated role scope items (with descriptions), systems lists, "when to hire" fits
- Updated managed support section and FAQs per service
- One new service: **Insurance Processing**
- Renamed services: Back Office & Admin → **Executive & Administrative Virtual Support**; Sales & Marketing → **Sales & E-Commerce** (Shopify scope); Creative & Copywriting → **Copywriting Virtual Assistant Support**

**Files to change:**
- `src/content/serviceDetails.ts` — all service content (titles, leads, tags, scope, systems, fits, FAQs)
- `src/content/sourcePages.ts` — service briefs (paths, titles, summaries, images); add new Insurance Processing entry
- `src/content/navigation.ts` — if service names or paths change in the dropdown
- `src/app/App.tsx` — if a new route is added for Insurance Processing

**User instruction:** "use these updated content to modify the current content we have on our website."

## Content architecture — do not break this

| Where | Content | Source |
| --- | --- | --- |
| Home → "How it works" | Four stages, summaries only | `processContent.ts` |
| Home → "Managed virtual support" dark band | Ownership split, two cards | `managedContent.ts` → `ownershipSplit` |
| `/how-it-works` | Four stages, expandable, with detail + checkpoints | `processContent.ts` |
| `/why-voa` | Definition, full ownership split, 2 FAQs | `managedContent.ts` → `managedSupportPage` |

## Navigation (unchanged from prior session)

Five categories:
- **Services** — mega dropdown (two link columns + summary panel)
- **Virtual Support** — How It Works, Managed Virtual Support
- **Insights** — Articles & Blog, Videos & Resources
- **FAQs** — top level, no dropdown
- **About** — About us, Client Stories & Testimonials, Contact

"Why Virtual Office Angels" is labelled **Managed Virtual Support** everywhere. Route stays `/why-voa` — confirm before WordPress migration.

## Open items

**Blocked on the client**
- **H4** — the real high-resolution logo file has not been supplied.
- Insurance Processing service: needs a route, image, and confirmation this is a new service (not a rename of an existing one).
- The three production-only services (Sales & Marketing, Creative & Copywriting, IT & Technology) — scope still unconfirmed. Built to be cleanly removable.

**Decisions still outstanding**
- `/why-voa` route name versus its "Managed Virtual Support" label — confirm before WordPress.
- Client Stories under About vs. Insights — easy to move.

**Known debt**
- `SourcePage.tsx` fallback branch for services without a `serviceDetails` entry — harmless dead code once all services are confirmed.
- Route-specific SEO/meta not implemented; `index.html` has one generic title.
- Contact forms are prototypes — no real submission, validation, spam protection, or consent record.
- `SourcePage.tsx` still contains dead `ServicesPage` renderer and `services` template union — no route points to it.
- Homepage has hidden `.legacy-home-founder` markup — cleanup candidate only in a focused pass.

## Verification at handoff

- `npm run lint` — clean
- `tsc --noEmit` on both configs — clean
- Production build — succeeds (built in ~1.5s)
- All work committed on `main`. **Nothing has been pushed**; remote is untouched.
