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
- **VOA Content location differs by device:**
  - E: device → `E:\_Yua\VOA\Mock Layout\VOA Content`
  - D: device → `D:\Mhari\Apollo\VOA-Content\voa-mockup`
- **Git: commit only.** Sessions commit locally and never push; the user pushes.

## Service pages — integrated from SERVICE PAGES_VOA.pdf (2026-09-21)

All ten service pages now use the PDF's copy. `src/content/serviceDetails.ts` was generated from a transcription that was machine-checked against the PDF text: 522 strings, zero mismatches. Deliberate edits only: "VOA" written out as "Virtual Office Angels" in four FAQ answers, and "authorised"/"fulfilment" in Australian spelling.

- **Page order:** hero → role scope → systems → when to hire (+ boundary card) → FAQs → per-service managed-support band (four steps, dark) → "Find the right specialised virtual assistant" contact section. Service pages no longer show the sitewide three-column model band.
- **Hero buttons** follow the PDF: "Find The Right Fit" / "See What You Can Delegate".
- **New service:** Insurance Processing at `/services/insurance-processing`.
- **Renamed services keep their old URLs:** Executive & Administrative (`/services/back-office-admin`), Sales & E-Commerce (`/services/sales-marketing`), Copywriting (`/services/creative-copywriting`). Settle URL naming with a redirect map at WordPress migration.
- **Boundary card kept** at the user's request. It is not in the PDF; nine services carry the older VOA Content text, and Insurance uses its own PDF FAQ answer on advice.
- **Client feedback sections omitted:** the PDF has only "Feedback currently being gathered" placeholders.
- **SEO titles and meta descriptions** are stored per service in `serviceDetails.ts` but not yet applied (no per-route meta exists).
- The "production-site service" flags are removed, since the client has now supplied full content for those services.
- Reading PDFs on this device: `pdftotext -raw` (Git Bash) extracts table cells correctly; pdfplumber is not installed.

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
- **Insurance hero image:** uses an unused library photo (house model, coins, laptop). Replace if the client has a better one.
- **Service testimonials:** each service page has a "Client feedback" section (PDF heading, three "Client name/business" cards with the PDF placeholder "Feedback (is) currently being gathered."). Replace the placeholders with real, approved feedback.

**Needs client confirmation**
- **Anne's experience:** the About Us document says "over 35 years" in Our Story but "two decades" in the FAQ. Both are shown exactly as written until the client confirms.
- **Industry dropdown values:** the documents specify the field but not its options. It currently lists the About document's "Who we support" areas plus "Other".

**Corrections made in the third session (2026-09-21)**
- The Managed Virtual Support page was **not** fully integrated as previously recorded: several bullets and both FAQ answers were paraphrased rather than taken from the PDF. All copy is now verbatim from `HR-Managed Virtual Support.pdf`. The home page ownership band shares this data and changed with it.
- About page: H1 restored to "About Virtual Office Angels" (the intro paragraph had been used as the H1); "View our services" links now go to `/services`; two dropped source sentences restored; Our Story and Founder recombined into one section (text left, portrait right, no caption); the "We listen before we recruit" paragraph moved to "The way we work". A specialist-websites section links to Virtual Financial Support and Virtual Loans Assistant.
- The four stages on `/how-it-works` and the home preview now use the PDF's names and text (Consulting & Role Planning, Sourcing & Candidate Matching, Onboarding & Integration, Ongoing Delivery & Support).
- The shared contact form now matches both documents (Business name, Industry dropdown, "What support do you need?", "Submit enquiry"). About and Managed Virtual Support use their documents' own "Let's talk" copy; the contact page uses the shared form instead of its own copy.
- Managed Virtual Support uses the About-style hero. Photo-background heroes are reserved for the service pages and the `/services` index.

**Decisions still outstanding**
- `/why-voa` route name versus its "Managed Virtual Support" label — confirm before WordPress.
- Client Stories under About vs. Insights — easy to move.

**Known debt**
- `SourcePage.tsx` fallback branch for services without a `serviceDetails` entry — harmless dead code once all services are confirmed.
- Route-specific SEO/meta not implemented; `index.html` has one generic title.
- Contact forms are prototypes — no real submission, validation, spam protection, or consent record.
- `ServicesPage` in `SourcePage.tsx` is **live** — it renders the `/services` index (template `services`). Do not remove it.

## Verification at handoff

- `npm run lint` — clean
- `tsc --noEmit` on both configs — clean
- Production build — succeeds (built in ~1.5s)
- All work committed on `main`. `d4ff43f` is already on `origin/main` (pushed by the user). Future sessions commit only; the user pushes.
