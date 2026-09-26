# Session handoff — Virtual Office Angels Mock Layout 1

Written 2026-09-26 (end of the week 2 work). Read `CLAUDE.md` first, then this file, then
`docs/MOCKUP_1_REVISION_GUIDE.md` for the numbered revision items.

---

## 1. Where the project stands

- The React/Vite prototype on `main` is the approved **Mock Layout 1** design and the visual reference
  for the planned custom WordPress theme.
- All numbered Mockup 1 revision categories are complete and approved.
- All three client content documents in `docs/updated_src/` are integrated.
- The home page now follows the **deployed VOA Content site** (`https://voa-mockup.vercel.app/`) for
  section headings, descriptions and highlight colours.
- Nothing is deployed from this repository by a session. The user pushes and deploys.

### Branches (2026-09-26)

| Branch | Commit | Purpose |
| --- | --- | --- |
| `main` | `c1e6563` | Current work. Pushed to `origin/main`. |
| `legacy-w2` | `c1e6563` | Rollback point taken at the end of week 2. |
| `legacy-w1` | `b351731` | Rollback point from week 1. |
| `mock-layout-2` | `8f552ef` | Rejected alternate design. Do not merge its visual system in. |
| `bolt/layout-enhance-1` | `2b41706` | Historical Bolt work, already merged where applicable. |

Week 2 commits on `main`: `69f6a64`, `d4ff43f`, `fcf6558`, `c1e6563`.

---

## 2. Connected Virtual Office Angels websites

The client also operates these sites. They are linked from the About page "Other specialist websites"
section (`sisterSites` in `src/content/siteContent.ts`) and are a **useful source of imagery and copy
references** for future changes.

| Site | URL | Local logo | Focus |
| --- | --- | --- | --- |
| Virtual Office Angels — production | `https://virtualofficeangels.com.au/` | `public/assets/source/staging/images/0afc8f6269-untitled-5.png` (header logo) | Main company site |
| Virtual Office Angels — staging | `https://virtualofficeangels.com.au/stagingsite2/` | — | Source of the captured content in `src/content/source/staging/` |
| VOA Content proposal (deployed) | `https://voa-mockup.vercel.app/` | — | The newest approved homepage copy. See section 4. |
| Virtual Financial Support | `https://virtualfinancialsupport.com.au/` | `public/assets/brands/virtual-financial-support.png` (354×69) | Virtual support for financial planners, mortgage and insurance brokers, accountants, bookkeepers |
| Virtual Loans Assistant | `https://virtualloansassistant.com.au/` | `public/assets/brands/virtual-loans-assistant.png` (631×87) | Online loans processing through virtual assistants |

Notes for using these as image sources:
- Both sister-site logos have an **orange background**, so `.brand-logo` renders them on a matching
  orange plate (`#e37818`) at equal height. Keep that treatment if you add more brands.
- Plain `curl` is rejected by the sister sites (HTTP 406). Send browser-like headers, or open them in
  the browser tool.
- Do not scrape or re-run the sync scripts (`sync:staging`, `sync:blogs`, `sync:clients`) unless the
  user explicitly asks. They overwrite generated source data.
- Any image taken from these sites needs client confirmation of rights before production.

---

## 3. Local image libraries (what is already available)

| Location | Contents |
| --- | --- |
| `public/assets/source/staging/images/` | 116 staging images: service photos, founder portrait, 30 client logos |
| `public/assets/source/staging/blog-images/` | 39 article images |
| `public/assets/brands/` | The two sister-site logos |
| `public/assets/voa-logo-orange.png` | Footer logo for the dark background |

Useful facts found while assigning images this session:
- Filenames are `<hash>-<original name>`. The **same original name means the same photo**, so different
  hashes are duplicates or crops. Check before assigning an image, or the same photo appears twice.
- The staging library has **no unused photographs left**. Everything unused is a client logo.
- Two blog images were saved to disk under **truncated filenames**, so their articles rendered with no
  preview. `src/content/blogContent.ts` maps the long names to the saved files (`savedImageNames`).
  If more source images are captured, check for the same truncation.

---

## 4. Copy sources, in order of authority

1. **The user's current instruction.**
2. **The deployed VOA Content site**, `https://voa-mockup.vercel.app/`. Its live text lives in
   `VOA Content/saved-state/owner-saved-state.json` under `content` → `homepage-text-<n>`.
   **The local `VOA Content/dist/index.html` is older** (15 Sep) and still has the previous hero
   headline, so read the saved state, not `dist`.
3. **The client documents** in `docs/updated_src/`:
   - `SERVICE PAGES_VOA.pdf` — all ten service pages
   - `About Us Page_CONTENT_VOA.docx` — About page
   - `HR-Managed Virtual Support.pdf` — Managed Virtual Support page
4. **Captured staging content** in `src/content/source/staging/`.

Never invent user-facing copy. When something has to be written, flag it (see section 8).

**VOA Content location differs by device:**
- E: device → `E:\_Yua\VOA\Mock Layout\VOA Content`
- D: device → `D:\Mhari\Apollo\VOA-Content\voa-mockup`

---

## 5. What was done in this session

### 5.1 Service pages — all ten rebuilt from `SERVICE PAGES_VOA.pdf`

`src/content/serviceDetails.ts` was generated from a transcription machine-checked against the PDF
text: 522 strings, zero mismatches. Deliberate edits only: "VOA" written out as "Virtual Office Angels"
in four FAQ answers, and "authorised"/"fulfilment" in Australian spelling.

- **Page order:** hero → role scope (accordion) → systems → when this role fits (+ boundary card) →
  **client feedback** → FAQs → four-step managed band (dark) → closing contact form.
- **Hero buttons** follow the PDF: "Find The Right Fit" / "See What You Can Delegate".
- **New service:** Insurance Processing at `/services/insurance-processing`.
- **Renamed services keep their old URLs:** Executive & Administrative (`/services/back-office-admin`),
  Sales & E-Commerce (`/services/sales-marketing`), Copywriting (`/services/creative-copywriting`).
  Settle naming with a redirect map at WordPress migration.
- **Boundary card kept** at the user's request. It is not in the PDF: nine services carry the older
  VOA Content text, Insurance uses its own PDF FAQ answer.
- **Client feedback section** uses the Client Stories card style with the PDF's own placeholders
  ("Feedback currently being gathered." on Mortgage and Financial Planning, "Feedback is currently
  being gathered." on the other eight), three cards labelled "Client name" / "Business", and a generic
  person icon instead of initials. Replace with approved feedback when it exists.
- **Closing heading** uses a smaller size (`.service-closing h2`) because the PDF headings are long.
- **SEO titles and meta descriptions** are stored per service but **not applied** — no per-route meta
  exists yet.
- Services mega menu regrouped into two columns of five, with the PDF labels.

### 5.2 About and Managed Virtual Support (corrections from the previous session)

- The Managed Virtual Support page had been **paraphrased**; all copy is now verbatim from the PDF.
  The home ownership band shared that data and changed with it.
- About: H1 restored to "About Virtual Office Angels"; Our Story and Founder recombined (text left,
  portrait right); "We listen before we recruit" moved into "The way we work"; a specialist-websites
  section added (see section 2); hover states added throughout.
- Managed Virtual Support uses the About-style hero. Photo-background heroes are reserved for service
  pages and the `/services` index.
- The shared contact form matches both documents: Business name, Industry dropdown,
  "What support do you need?", "Submit enquiry".

### 5.3 Insights, Videos and FAQs

- **Insights and Videos** now open with an image hero in the Managed Virtual Support style (heading,
  two buttons, image or poster), then the list section.
- **Section headings were removed** at the user's request — the list sections show only a small label
  and a count ("Article library · 30 articles").
- **Pagination scrolls back** to the top of its section (`scrollToSection`, smooth unless the visitor
  prefers reduced motion). Note: Chrome skips smooth scrolling in background tabs, so automated checks
  can look like it failed.
- **FAQs page has no hero.** It uses a two-column layout: a sticky left column with the heading, the
  topic list (with counts) and "Ask another question"; the questions on the right. It opens on
  "The service" so the page starts with 3 rows instead of 12. Topics live in `faqContent.ts`
  (`faqTopics`) and reference the verbatim source questions by index.
- **Video placeholders:** `VideoPoster` renders a player-style frame marked "Coming soon" with the
  video number, title and a 0:00 bar. It is also the Videos hero image.
- **Two article images repaired** (see section 3).

### 5.4 Home page aligned with the deployed site

| Section | Now reads |
| --- | --- |
| Hero | "Get **Specialised** & **HR Managed** Virtual Support!" + the deployed description. Emphasis uses our blue (`--accent`), not the deployed orange. Buttons: "Find the Right Fit" / "Explore services". |
| Fourth hero figure | "HR, payroll, and ongoing team support" |
| Our clients | "Trusted by leading **Australian businesses**." |
| Specialised services | "…your **industry**, **systems** and **standards**." |
| More than recruitment | Merged section, see below |
| Founder | "Australian-led, people-first outsourcing company" / "Built on **HR expertise** and first-hand **market experience**." |
| Insights | "Insights and resources" / "Learn more about **delegation** and **virtual staffing**." |
| Client feedback | "What Australian businesses say about **working with Virtual Office Angels**." |
| FAQs | "Before you delegate and **get started**." + the five deployed Q&As |
| Let's talk | "Tell us where your business needs virtual support." |

- **Highlight colour:** `--heading-accent` in `themes.css` — `#dc4f1e` in light theme (our button orange
  `#ee7d16` fails contrast on the pale background at heading sizes), `#ff9a3d` in dark theme. Applied
  through `main h2 em`.
- **"More than recruitment"** replaces the two separate sections (Managed virtual support + How it
  works). It has the deployed heading, intro, two buttons (`/how-it-works`, `/why-voa`) and four stage
  cards: Consulting & Planning, Sourcing & Matching, Onboarding & Integration, Ongoing Delivery &
  Support. **The bullets were deliberately dropped** so the How It Works page keeps its purpose.
  Copy lives in `homeContent.ts` → `moreThanRecruitment`.
- **Home FAQs** are the deployed five questions with their links: "specialised virtual assistant
  services" → `/services`, "how our matching process works" → `/why-voa` (the deployed site links its
  own Managed Virtual Support page). The four questions written for the first mockup were removed.
- **Managed virtual support band bug fixed:** its checkmark had been saved corrupted as `'¹3'` and
  rendered as "13". It is now `'\2713'`.

### 5.5 "The Virtual Office Angels model" separator

Revision G3's three-column band (Specialist matching / Australian-managed / End-to-end support) was
unsourced copy. It is now a **compact dark strip** (`.voa-strip`, ~130px tall) carrying the four
sourced hero figures: 15+ years, Top 5%, 12 months, 100% managed. It appears on every page that uses
`PageClosing`, immediately above the contact form. The home page does not use it, so the figures never
appear twice on one page. **`MOCKUP_1_REVISION_GUIDE.md` G3 is now out of date.**

### 5.6 Meta language removed

User-facing text that described the prototype or referred to the staging/production sites was removed:
the Insights, Videos and FAQs hero descriptions, and the Thank You page's "The production version
will state…" line.

**Still present, awaiting a decision:**
- Footer: "Prototype content requires final Virtual Office Angels verification."
- Under every contact form: "Prototype form only. Connect validation, spam protection, consent
  records, and WordPress form handling before launch."

---

## 6. Content architecture — do not break this

| Where | Content | Source module |
| --- | --- | --- |
| Home → hero, figures, service cards, FAQs, "More than recruitment" | | `homeContent.ts`, `siteContent.ts` |
| Home → founder section | Two paragraphs from the deployed site | `HomePage.tsx` |
| `/how-it-works` | Four stages, expandable, with detail | `processContent.ts` |
| `/why-voa` (Managed Virtual Support) | Definition, ownership split, FAQs | `managedContent.ts` |
| Service pages (10) | Everything | `serviceDetails.ts` |
| `/faqs` | 12 source questions + topic grouping | `faqContent.ts` |
| `/insights`, `/insights/:slug` | 30 articles | `blogContent.ts` + `source/staging/` |
| Client Stories, home testimonials | 4 testimonials | `testimonials.ts` |
| Shared closing | Separator strip + contact form | `components/layout/PageClosing.tsx` |

Navigation (`navigation.ts`): Services (mega dropdown, two columns of five), Virtual Support, Insights,
FAQs, About. "Why Virtual Office Angels" is labelled **Managed Virtual Support** everywhere; the route
is still `/why-voa`.

---

## 7. How to work on this

### 7.1 The working loop (this is how the user runs the project)

1. **The user gives raw feedback**, usually per page or per section, often a screenshot, a pasted
   phrase from the deployed site, or a short list of gripes ("this section feels too big", "there's a
   bug on the bullets").
2. **Turn it into an unambiguous spec before touching code.** For a large batch this means rewriting
   the raw notes into `docs/MOCKUP_1_REVISION_GUIDE.md`: grouped by page/category, one numbered ID per
   change (G-, H-, HP-, SP-, HIW-, WVOA-, CST-, FAQ-, ART-, ABT-, FTR-), each written so it is
   independently checkable, with a legend resolving every term the user used ("Layout 2",
   "VOA Content", "image2.png"). Tag each item **[Confirmed]**, **[Assumption]** (state the
   interpretation) or **[Blocked]** (name the missing input). For a small batch, restate the same
   structure in the reply instead of editing the guide.
3. **Ask the open questions in one batch** before implementing. The user prefers being handed a short
   list of decisions ("Ask me the questions you need to proceed") over being asked one at a time
   mid-task. Where there is an obvious default, recommend one rather than listing options neutrally.
4. **Implement one page or category at a time**, in the smallest patch that does the job.
5. **Verify**, then **report** (see 7.3) and **wait for approval** before moving to the next category.
   The user answers "Passed" / "That's good" / "you can now work on X".
6. **Record the outcome in the guide** for batch work: a status line per category ("Status: HP1–HP12
   implemented, awaiting review"), the files touched, the verification actually run, the judgment calls
   made, and anything deliberately left for the user to reverse.
7. **Commit only when asked.** Sessions never push.

### 7.2 Implementation and styling conventions

- **Reuse before inventing.** Match an existing section's markup and classes (`section-heading`,
  `content-split`, `task-panel`, `home-testimonial-grid`, `faq-list`, `inner-hero-grid`) so a new
  section inherits the site's spacing, elevation, hover and reveal behaviour for free.
- **Scope new CSS to a new class** on the section, appended to `global.css` with a one-line comment
  saying what it is for. Never restyle a shared component to fix one page — add a modifier
  (`.service-closing h2`, `.home-managed`, `.voa-strip`, `.testimonial-grid-3`).
- **Watch specificity when adding to old rules.** A `.video-placeholder > span` rule silently overrode
  new child spans this session; the fix was a separate class, not `!important`.
- **Colour comes from tokens** in `themes.css`, defined for both themes. Check contrast before using
  orange on a light background — `--action` (#ee7d16) fails at heading sizes, which is why
  `--heading-accent` exists.
- **Preserve motion and accessibility on every change:** scroll reveals, staggered cards, hover lift,
  `prefers-reduced-motion`, keyboard operation, `aria-pressed` on filter buttons, `aria-label` on
  paginations, real focus states.
- **Prefer the honest placeholder** over invented content: "Coming soon" posters, initials or a generic
  icon instead of fake portraits, the document's own "feedback currently being gathered" text.
- **Content lives in `src/content/*`,** not inline in components, when it is copy the client may change.
- **Small patches only.** No unrelated refactors, no formatting churn, no new dependencies.
- **Check the rendered page before declaring a visual defect** — class names are not evidence.

### 7.3 Response preferences

- **Bullets and short labelled sections. Never paragraphs.** Short tables are welcome for
  before/after or per-page mappings.
- **Lead with the outcome**, then what changed (file paths), then what was verified, then what needs
  the user's decision. Close with "Nothing is committed yet" when that is the case.
- **Be explicit about what was not checked** — mobile widths and dark theme are the usual gaps. Never
  imply a browser check that did not happen.
- **Name invented text every time.** The user repeatedly asks for source-backed copy only.
- **Recommend, don't survey.** When asked "is X better or ours?", give a recommendation with reasons,
  then apply it if it is reversible, and say so.
- **Keep it short.** No preamble, no recap of the request, no narrating what is about to happen.

### 7.4 Commands and environment

- **After every change:** `npm run lint`, `npx tsc --noEmit -p tsconfig.app.json`,
  `npx tsc --noEmit -p tsconfig.node.json`, and a production build to a scratch directory
  (`npx vite build --outDir <scratch> --emptyOutDir`) — deleting the existing `dist` hits `EPERM` here.
- **Browser use is opt-in.** The Chrome extension costs tokens; the user says when to use it. Batch
  browser steps into one call. Reveal animations must be forced
  (`data-visible` / `data-page-visible`) before screenshotting, and Chrome skips smooth scrolling and
  sometimes screenshots entirely while the tab is in the background.
- **Dev server:** `npm run dev` (port 5173). It stops when the session ends.
- **Editing tips learned here:** complex multi-line edits are more reliable written as a Python script
  in the scratchpad than as a shell heredoc. Write source files with `newline='\n'` — the repo is LF.
- **Reading PDFs on this device:** `pdftotext -raw` (Git Bash) handles table cells correctly.
  pdfplumber and PIL are not installed. The Read tool opens PDFs directly.
- **Long sessions get expensive.** Context is re-read every turn; start a fresh session per work block
  and rely on this handoff.

---

## 8. Text written for the prototype (needs approved copy)

- Insights and Videos: no hero description at all now.
- FAQ topic names: The service · Working with your virtual assistant · Hours & availability ·
  Costs & privacy.
- Section labels and buttons: "Article library", "Video library", "Questions and answers",
  "Browse articles", "Watch videos", "Read articles", "Browse questions", "See how it works",
  "Explore managed virtual support", "Find the Right Fit".
- Video placeholder titles (three) and the "Coming soon" label.
- The home page eyebrow "Australian-managed specialist support" (from the first mockup; the deployed
  hero has no eyebrow).
- The line under "Trusted by leading Australian businesses" — no deployed equivalent; removal was
  suggested and is still open.

---

## 9. Open items

**Blocked on the client**
- **H4** — the real high-resolution logo file has not been supplied.
- **Insurance hero image** — currently an unused library photo (house model, coins, laptop).
- **Service client feedback** — all 30 cards are placeholders.
- **Approved videos** — URLs, captions and transcripts; the three cards are placeholders.
- **Client logos, testimonials and portraits** — consent and rights confirmation.

**Needs client confirmation**
- **Anne's experience:** the home page now says "two decades" (deployed copy) while the About page's
  Our Story still says "over 35 years" (the About document). The conflict is unresolved.
- **Industry dropdown values** — the documents specify the field, not its options.
- **`/why-voa` route name** versus its Managed Virtual Support label — settle before WordPress.
- **Client Stories** under About vs. Insights.
- Whether the two "Prototype…" notices in section 5.6 should be removed.

**Documents that are now out of date — fix or ignore deliberately**
- `CLAUDE.md` → "Homepage composition currently implemented" still lists the old 13-section home page
  (separate founder, services, Why VOA, How It Works sections) and the old carousel/CTA notes. The home
  page has since been rebuilt; treat this handoff as current for the home page.
- `CLAUDE.md` also still says service pages show the sitewide model band and that Layout 1 dropdowns
  are click-only (H1 made them hover-on-pointer).
- `MOCKUP_1_REVISION_GUIDE.md` → G3 describes the three-column model band that section 5.5 replaced.
- `docs/WEEK_2_ACTION_PLAN.md` → items 1 and 2 (mockup revisions, content integration) are done.
  **Not started:** the content/asset audit, the WordPress + SEO/GEO decision record, the WordPress
  theme and content architecture, the starter theme foundation, and the progress report.

**Known debt**
- Route-specific SEO/meta not implemented; `index.html` has one generic title. Per-service SEO strings
  already exist in `serviceDetails.ts`.
- Contact forms are prototypes — no submission, validation, spam protection or consent record.
- `ServicesPage` in `SourcePage.tsx` is **live** (the `/services` index). Do not remove it.
- `SourcePage.tsx` keeps a fallback branch for services without a `serviceDetails` entry.
- `MOCKUP_1_REVISION_GUIDE.md` G3 no longer matches the built section (see 5.5).

---

## 10. Verification at handoff

- `npm run lint` — clean
- `npx tsc --noEmit` on both configs — clean
- Production build — succeeds (~4.3s, built to a scratch directory)
- Browser-checked this session: service pages (Insurance, Executive & Administrative), About,
  Insights, Videos, FAQs, Client Stories and the whole home page, **desktop light theme only**
- **Not checked:** mobile widths and dark theme for everything changed this session
- Working tree clean; `main` and `legacy-w2` both at `c1e6563`
