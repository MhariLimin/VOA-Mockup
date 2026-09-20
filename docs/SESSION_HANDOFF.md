# Session handoff — Mockup 1 revisions

Written 2026-09-21 to continue this work on another device. Read this first, then `docs/MOCKUP_1_REVISION_GUIDE.md`, which is the authoritative checklist of the client's requested changes and every decision made against it.

## Where things stand

The client's Mockup 1 revision list has been worked through **category by category**, each reviewed and approved before moving on. Completed and approved:

| Category | Items | Status |
| --- | --- | --- |
| Global | G1–G3 | Approved |
| Header | H1–H3, H5–H7 | Approved (**H4 blocked** — client logo file) |
| Home page | HP1–HP12 | Approved |
| Services pages | SP1–SP7 | Approved |
| `/services` index | — | Approved (revamp beyond original scope) |
| How It Works | HIW1–HIW3 | Approved |
| Managed Virtual Support (was Why VOA) | WVOA1–WVOA2 | Approved |
| Client Stories & Testimonials | CST1–CST2 | Rebuilt after review feedback; **awaiting approval** |

**Not started:** FAQs page (FAQ1), Articles & Blog / Videos (ART1–ART2), About page (ABT1–ABT2), Footer (FTR1).

## How to work on this

These were agreed during the session and should carry over.

- **Work one category at a time.** Implement, report, wait for approval, then move on. Do not run ahead.
- **Browser use is opt-in.** The user asked that the Chrome plugin not be used freely because of token cost. Ask, or use it only when they say so. Visual claims that were not checked must be stated as unverified.
- **After every change:** `npm run lint`, `npx tsc --noEmit -p tsconfig.app.json`, `npx tsc --noEmit -p tsconfig.node.json`, and a production build. Build to a scratch directory (`npx vite build --outDir <scratch>`) because deleting the existing `dist` hits `EPERM` in this environment.
- **Dev server:** `npm run dev`. It frequently lands on **port 5174** because 5173 is still held.
- **Never invent copy.** Everything user-facing comes from `VOA Content` or existing captured source. When something had to be written, it was flagged explicitly.
- **Report format:** bullets and short sections, not paragraphs. Lead with what changed, then what needs their eye.

## Content architecture — the part that is easy to get wrong

The client's source material describes the service two ways, and both were needed in several places. The split below was agreed after a long discussion; breaking it re-introduces duplication.

| Where | Content | Source section |
| --- | --- | --- |
| Home → "How it works" | The four stages, summaries only | "More than recruitment" |
| Home → "Managed virtual support" (dark band) | Ownership split, two cards | "Clear ownership keeps the working relationship effective" |
| `/how-it-works` | The four stages, expandable, with detail + checkpoints | "More than recruitment" |
| `/why-voa` | Definition, full ownership split, four questions | rest of the managed virtual support page |

**The rule:** every home page section must preview the page it is named after. The user was explicit that section names cannot be renamed to fit their content — the content moves instead.

## Navigation

Restructured at the end of the session to five categories:

- **Services** — mega dropdown (two link columns + summary panel)
- **Virtual Support** — How It Works, Managed Virtual Support
- **Insights** — Articles & Blog, Videos & Resources
- **FAQs** — top level, no dropdown
- **About** — About us, Client Stories & Testimonials, Contact

"Why Virtual Office Angels" was renamed **Managed Virtual Support** everywhere (nav, footer, page eyebrow, home band). The route is still `/why-voa` — unchanged deliberately, but worth confirming before WordPress migration since the URL no longer matches the label.

Client Stories was placed under **About** rather than Insights (the user asked which was better). Reasoning: Insights is editorial output; testimonials are evidence about the company. Easy to move if they disagree.

## Files added this session

| File | Purpose |
| --- | --- |
| `src/components/layout/PageClosing.tsx` | The shared "Virtual Office Angels model" + "Your next step" sections (G2/G3) |
| `src/content/serviceDetails.ts` | Per-service content for all nine services, machine-extracted from `VOA Content` |
| `src/content/processContent.ts` | The four support stages ("More than recruitment") |
| `src/content/managedContent.ts` | Ownership split + managed virtual support page content |
| `docs/MOCKUP_1_REVISION_GUIDE.md` | The revision checklist, decisions and open questions |
| `ref-images/` | The client's reference screenshots (image0–image2) |

## Open items

**Blocked on the client**
- **H4** — the real logo file has not been supplied.
- Paola's approved copy for the content-integration work (Week 2 item 2).

**Decisions still outstanding**
- The three production-only services (Sales & Marketing, Creative & Copywriting, IT & Technology) are built but their scope is still unconfirmed by the client. Built to be cleanly removable.
- `/why-voa` route name versus its new "Managed Virtual Support" label.
- Client Stories under About versus Insights.

**Known debt**
- `SourcePage.tsx` still carries a fallback branch for services without a `serviceDetails` entry. Harmless, but dead once all nine are confirmed.
- Route-specific SEO/meta is still not implemented; `index.html` has one generic title.
- Contact forms remain prototypes — no submission, validation, spam protection or consent record.

## New input I have not reviewed

`docs/updated_src/` contains three PDFs added on 2026-09-20 at ~23:38, **after** the day's work and not by me:

- `HR-Managed Virtual Support.pdf`
- `HR-Managed Virtual Support (1).pdf`
- `SERVICE PAGES_VOA.pdf`

These have not been opened or compared against what is built. They may be updated client copy — possibly the Paola content the plan has been waiting on. **Check these before continuing**, since they could supersede content already implemented on the service pages and the managed virtual support page.

## Verification at handoff

- `npm run lint` — clean
- `tsc --noEmit` on both configs — clean
- Production build — succeeds
- All work is committed on `main`. **Nothing has been pushed**; the remote is untouched.
