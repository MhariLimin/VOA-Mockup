# Mockup 1 Revision & Content Integration Guide

This is the working checklist for Week 2 items **1 (Mockup revisions)** and **2 (Content integration with Paola)**. It is a reworded, organized version of the client's raw revision notes, written so each item is unambiguous and independently checkable. Nothing in this document has been implemented yet — it is the spec to implement against.

Per `CLAUDE.md`: implement only confirmed items, preserve Layout 1's identity, verify desktop/mobile + both themes + motion/reduced-motion for every change, and do not scrape or copy live-site content beyond what's already captured locally.

## References / legend

| Term | Resolves to |
| --- | --- |
| **Layout 1** | This repo, `main` branch — the approved design, current source of truth |
| **Layout 2** | `mock-layout-2` branch — rejected as an overall design, but named below as the **source of specific components/sections only** |
| **VOA Content** | `E:\_Yua\VOA\Mock Layout\VOA Content` — a separate static-HTML proposal (its own `dist` build). Used **only as a copy/content source** for the sections named below. Do not merge its code, dependencies, or build into this repo. |
| **ref-images** | `E:\_Yua\VOA\Mock Layout\VOA Layout 1\ref-images` — contains `image0.png`, `image1.png`, `image2.png` (referenced below) |
| `image<n>.png` (no path given) | Parent directory `E:\_Yua\VOA\Mock Layout\` — contains `image.png`, `image2.png`–`image5.png` |

**Note on scope reversal — confirmed by the user on 2026-09-20:** `CLAUDE.md` previously stated the standalone Services Overview page was intentionally removed and should not be restored without a new request, and that `VOA Content` should not be merged into this project without explicit request. Item HP1 below restores a `/services` page adapted from Layout 2, and multiple items below pull specific copy from `VOA Content`. Per `CLAUDE.md`'s own precedence rule, this request supersedes those two prior decisions for the specific items listed — nothing else about that guidance changes, and `VOA Content`'s code/build is still not merged.

Status tags used below: **[Confirmed]** — clear enough to implement · **[Assumption]** — implementing against a stated interpretation · **[Blocked]** — waiting on external input.

---

## Global (applies to every page)

**Status: G1–G3 implemented, awaiting review.** Files touched: `src/styles/tokens.css`, `src/styles/global.css`, `src/components/layout/PageShell.tsx`, `src/components/layout/PageClosing.tsx` (new), `src/pages/SourcePage.tsx`, `src/pages/BlogArticlePage.tsx`. Verified: `npm run lint` clean, `tsc --noEmit` clean on both configs, production build succeeds. Earlier in-browser checks (both themes, 390px stacking, reduced-motion override specificity) were done on the pre-Layout-2 version of G3; the Layout 2 restyle that followed has been verified by build only, at the user's request to stop using the browser tooling.

**G3 visual treatment:** reproduces Layout 2's `.l2-method-band` exactly — `#0b2236` full-bleed dark band, three flat equal columns, 1px `rgb(255 255 255 / 15%)` dividers with a left edge on the first column, `#83cfff` numbers at 0.68rem/800, white 1.12rem headings, `#b9c9d5` 0.84rem body, single column below 48rem with bottom dividers. The section heading is retained above the band (eyebrow in `#83cfff`, white h2) per the user's instruction, which is the one intentional difference from Layout 2, where the band carries no heading.

Judgment calls made during implementation, open to reversal:
- Article detail pages (`/insights/:slug`, 30 routes) **do** get G2 + G3, on the "every page" reading.
- `/thank-you` and the 404 page **do not** — a submission confirmation that immediately re-asks for an enquiry reads as a bug, and neither is a content page.
- `/why-voa` now shows the 6-item benefits grid **and** the 3-item model section, which is duplicative. WVOA1 rewrites that page from `VOA Content` later, which resolves it; flagging rather than pre-empting that work.

- **G1. [Done — approved and rolled out sitewide]** Overall sizing reduced one step: `html { font-size: 90% }` in `tokens.css`, so every rem-based size (type, spacing, cards, radii, header height) renders ~10% smaller. Approved on the home page 2026-09-20 and rolled out to every page; the temporary `data-compact-scale` review gate in `PageShell` has been removed.
- **G2.** Every page **except** `/contact` **and the home page** gets a "Your next step" contact-form section at the very bottom, directly before the footer. *(Home is excluded because it already ends in its own direct contact form — confirmed 2026-09-20. Do not relabel or restyle the existing homepage form.)*
- **G3.** Every page that gets G2 also gets a new **"The Virtual Office Angels model"** three-column section directly above it. Home and `/contact` are excluded. Layout follows Layout 2's services-page three-column pattern, with a slightly improved entrance animation plus a new hover animation. Exact copy, sourced from `mock-layout-2:src/pages/SourcePage.tsx`:
  - **Specialist matching** — Candidates are considered against the role, industry, systems, and preferred working style.
  - **Australian-managed** — Clients have an Australian-based contact supporting communication and expectations.
  - **End-to-end support** — Recruitment, onboarding, feedback, performance, and continuity sit within one service.
  - *(Layout 2 defines three further items — Team leader oversight, Administration handled, Continuity planning — which are **not** part of this three-column section.)*

---

## Header

**Status: H1–H3 and H5–H7 accepted after one revision round. H4 remains blocked.** Revisions applied 2026-09-20: dark theme no longer overrides the orange header rule; the dropdown chevron moved onto its own row beneath the label (Layout 2 style, with a matching spacer on plain links so all items align, and a flex fallback in the mobile drawer); the mega panel was rebuilt on Layout 1's own eyebrow/link/text-link idioms so it stops reading as a transplant; the About dropdown item is now "About us". Files touched: `src/components/layout/Header.tsx`, `src/content/navigation.ts`, `src/content/sourcePages.ts`, `src/styles/global.css`. Verified by `npm run lint`, `tsc --noEmit` on both configs, and a production build — no browser verification, per the user's instruction to stop using the browser tooling.

Note: H5's "View all services →" link needs a `/services` destination, so the route was registered now using the existing `ServicesPage` renderer and a new page brief in `sourcePages.ts`. It currently uses the old Layout 1 directory design; **HP1 restyles it from Layout 2** and is still outstanding. The footer's "Services" link still points at `/services/mortgage-loans` and could move to `/services`, but that is left for FTR1.

- **H1. [Confirmed 2026-09-20]** Adopt Layout 2's header menu behavior: dropdowns open on hover, and the orange underline on the bottom of the header bar returns. Implemented as a **hybrid**, approved by the user on condition it behaves the same as Layout 2 for mouse users: hover-to-open on pointer devices, click/Enter-to-open and Escape-to-close retained for keyboard, tap-to-open on touch. *(This supersedes the previous `CLAUDE.md` rule that Layout 1 dropdowns are click-only.)*
- **H2.** Replace the "Get Started Today" button with a phone number (top-right of header), preceded by a call icon. Both icon and text are the same orange as the button they replace. Clicking it navigates to `/contact` (not a `tel:` link).
- **H3.** Increase the Virtual Office Angels logo size.
- **H4. [Blocked]** Swap in the client-supplied logo file once received — not yet delivered.
- **H5.** Rebuild the Services dropdown to match `ref-images/image0.png`; cross-reference the equivalent dropdown markup/layout in `VOA Content`.
- **H6.** Move FAQs under the Insights dropdown instead of its own top-level nav item. **The `/faqs` route/URL does not change** — menu placement only, so no redirect is needed now or at WordPress cutover.
- **H7.** Merge the "Our Story" and "Founder & Leadership" dropdown entries into a single nav item labelled **"About Virtual Office Angels"**, linking to `/about` (top of page, no anchor). Both sections remain on the page and are read in order by scrolling; the `#story` and `#leadership` anchors stay valid for any existing in-page or external links.

---

## Home page

Confirmed full section order, top to bottom (settled 2026-09-20):

1. Hero
2. Our Clients (logo carousel)
3. Specialised virtual assistant services (renamed service cards section)
4. Why Virtual Office Angels
5. How It Works
6. Combined "A more considered match" + "Founder & Leadership"
7. Client-experience media section *(unchanged position)*
8. Insights — 3 article previews *(unchanged position)*
9. Testimonials — 3 previews *(unchanged position)*
10. Summary FAQs *(unchanged position)*
11. Existing direct contact form → Footer

The homepage gets **neither** the "Your next step" section (G2) **nor** the "Virtual Office Angels model" section (G3). Its existing contact form stays as-is.

**Status: HP1–HP12 implemented, awaiting review.** Files touched: `src/pages/HomePage.tsx`, `src/pages/SourcePage.tsx`, `src/content/homeContent.ts`, `src/content/siteContent.ts`, `src/styles/global.css`. Verified by lint, `tsc --noEmit` on both configs, and a production build; no browser verification per the user's instruction.

Revisions applied after first review (2026-09-20):
- **HP2** — the dark hero was reverted. The hero keeps Layout 1's light, theme-aware treatment and takes only the reference's orange emphasis, applied to "Specialised" and "Fully Managed" in the headline.
- **HP3** — hero padding, minimum height and stat-panel spacing were tightened so the four-figure row sits within the first screen (measured: panel bottom 685px against a 743px viewport).
- **HP7/HP8** — `grid-auto-rows: 1fr` makes every service card the same height (measured: all six at 128px), and the longer systems lists were trimmed (Mortgage 7→4, Financial Planning 6→4, Back Office 5→3, Digital Marketing 6→3). Service pages still carry the complete lists under SP4.
- **HP9** — rebuilt to match the source section's own format: a copy column beside four expandable support stages (Support planning, Specialist matching, Onboarding & integration, Ongoing delivery support), each revealing its description and bullet points, one open at a time. The earlier four-card version broke the three-column grid and lost the source format.

Remaining judgment calls:
- The hero's old proof line ("Australian-managed · Matching specialist virtual assistants since 2010") was dropped, since the four-stat row now carries that role and `image1.png` has no equivalent line.
- **HP9 and HP10 cover adjacent ground** — the support stages and the How It Works steps both describe sequence. HP9 was adapted as instructed; if the repetition reads badly, How It Works is the one to differentiate.
- **HP10** is a four-across step track with dashed connectors, keeping the existing markup so its established reveal/stagger motion still applies.
- The hidden `.legacy-home-founder` duplicate was removed as part of the HP6 merge, along with the now-dead CSS for the evidence strip, the duplicated testimonial intro, and the old intro section.

Section-level changes:

- **HP1.** "Explore services" buttons link to a new `/services` overview page, adapted from Layout 2's `/services` page but restyled to Layout 1 fonts, theme, and sizing. *(This reinstates the previously-removed Services Overview route — see scope-reversal note above.)*
- **HP2.** Replace the hero text content and font color with the copy shown in `ref-images/image1.png`. Keep the current button labels/text as-is; only the surrounding copy and color change.
- **HP3.** Add the four-column stat row from `ref-images/image1.png` to the hero: **15+ years**, **Top 5%**, **12 months**, **100% managed**.
- **HP4.** Rebuild "Our Clients" to follow Layout 2's "Trusted Partnership" section layout.
- **HP5.** Remove the three-column section that currently follows Our Clients (Australian-managed / Specialist Matching / Established in 2010). This is superseded by the new sitewide "Virtual Office Angels model" section (G3), which is similar in spirit but not identical in copy — the two are not the same section.
- **HP6.** Merge "A more considered match" and "Founder & Leadership" into one section. Its link/CTA text becomes "Learn more about us."
- **HP7.** Rename "Industries and capabilities" to **"Specialised virtual assistant services"**; replace the subheading "Specialist support where precision matters" with the copy shown in `ref-images/image2.png` (cross-check against the "Specialised virtual assistant services" section on the `VOA Content` homepage), plus the paragraph that follows it there. Keep the existing service-card layout/grid as-is.
- **HP8.** Append the following text below each service card's existing copy. The word "Systems" renders in the site's existing orange accent color; each system name listed after it is underlined and rendered at slightly lower opacity:
  - Mortgage & Loans — *Systems: Connective, Mercury, Podium, Symmetry, Flex, AdviserLogic and COIN.*
  - Financial Planning — *Systems: Xplan, Risk Researcher, WealthSolver, CALM, Midwinter and AdviserLogic.*
  - Accounting & Bookkeeping — *Systems: Xero, Saasu and MYOB.*
  - Real Estate — *Systems: your property CRM, email and administration platforms.*
  - Back Office & Admin — *Systems: Your CRM, Email and calendar platforms, Microsoft 365 or Google Workspace, Cloud document storage, Task-management tools.*
  - Digital Marketing — *Systems: Google Analytics, Facebook and Instagram, TikTok, YouTube, Your CMS, Approved design and campaign tools.*
  - Sales & Marketing — *Systems: Your CRM, Approved email and calling tools, Lead-research sources, Order-management platforms, Reporting templates.* †
  - Creative & Copywriting — *Systems: Your content-management system, Shared document platforms, Editorial calendars, Research sources, Brand and style guidelines.* †
  - IT & Technology — *Systems: WordPress, Website content systems, Analytics platforms, Approved design tools, Task and issue trackers.* †

  † These three were not in the client's note; sourced from the matching `VOA Content` service pages (`sales-marketing-support/`, `creative-writing-assistance/`, `it-services-technology/`) on the user's instruction. Not invented.

  **Shortened lists are deliberate — confirmed 2026-09-20.** The homepage cards intentionally run shorter than the `VOA Content` service pages (Mortgage omits Salestrekker; Financial Planning omits Microsoft Office; Accounting omits Microsoft Excel and Client document systems; Real Estate condenses four entries into "email and administration platforms"). Rule: **homepage card = the client's shortened list verbatim** (teaser), **service page Systems experience (SP4) = the full `VOA Content` list**. This is not a data error; do not "correct" the homepage lists.
- **HP9.** Rework "Why Virtual Office Angels" using `VOA Content`'s homepage "More than recruitment" section as the base: trim it down, and edit the adapted copy so it still directly answers "why Virtual Office Angels" rather than reading as a generic recruitment pitch.
- **HP10.** Redesign "How It Works" (homepage summary version) from scratch. Pull in any useful content from `VOA Content` that isn't already duplicated elsewhere on the homepage. Target: compact, visually clear, understandable at a glance — not a rework of the full `/how-it-works` page (see HIW section below for that).
- **HP11.** Insights preview: replace "Practical guidance for building effective remote support." with **"Practical thinking for better delegation and virtual staffing."**, and add a new description line after it: **"Explore current guidance on building capacity, choosing the right support and getting more value from a virtual team."** Cross-check against `VOA Content`'s "Insights and resources" homepage section.
- **HP12.** FAQ preview: add description text after the heading: **"Direct answers to the questions Australian businesses ask when considering managed virtual support."**

---

## Services pages (shared template, all 9 services)

**Status: SP1–SP7 implemented, awaiting review.** New file `src/content/serviceDetails.ts` holds the per-service content extracted from `VOA Content` (title, trimmed lead, tags, six role-scope entries, systems, FAQs) for all nine services. `SourcePage.tsx` rewrites the service template; `global.css` adds the hero, tags, accordion, systems and role-fit styles. Verified by lint, `tsc --noEmit` on both configs, and a production build — no browser check, per instruction.

Judgment calls to review:
- **SP2 lead trimming** — every source lead ends with the same boilerplate sentence ("Recruitment, onboarding, HR, payroll, IT and ongoing team support are managed for you"), which repeats the hero and the model band. Leads are trimmed to their first sentence only.
- **SP1 hero** — the service image became the dimmed hero background, and the separate aside image was dropped, because Layout 2's masthead carries one image, not two. The service-specific image requirement is still met.
- **SP5 "When this role fits"** does exist in `VOA Content` on all nine service pages — an earlier claim that it did not was wrong, caused by scanning only part of one page. It is now taken from source verbatim: the section heading, four fit conditions, and the "Clear role boundaries" card beside it. No composed copy remains on these pages.
- **Accordions default to fully collapsed** (SP3 and SP6), so the headings stay scannable; panels remain in the DOM and toggle with `hidden` so `aria-controls` always resolves. The home page's managed-support panel keeps its first item open, since that section would read as an empty column otherwise.
- **Hero legibility was measured, not eyeballed**: each service image was sampled behind the text band and composited against the overlay's weakest point. Worst contrast against white is 9.19:1 (IT & Technology); all nine clear WCAG AAA.

- **SP1.** Hero section adopts Layout 2's low-opacity background-image treatment only. "Where Support Helps" section and current font choices stay as-is.
- **SP2.** Hero title (`<h1>`) and description copy come from the matching page in `VOA Content` (its `.hero-lead`). Keep descriptions compact — trim, don't paste the full paragraph. Do not adopt `VOA Content`'s buttons; keep Layout 1's own CTA buttons. Add its `scope-tags` under each hero. Full mapping, extracted from `VOA Content/dist/services/*/index.html`:

  | Layout 1 route | VOA Content page | Hero title | Hero tags |
  | --- | --- | --- | --- |
  | `/services/mortgage-loans` | `mortgage-loans-processing-support/` | Mortgage Processing Virtual Assistant Support | Application administration · Broker CRM updates · Settlement coordination |
  | `/services/financial-planning` | `financial-planning-admin-support/` | Financial Planning Virtual Assistant Support | Client administration · Xplan support · Meeting preparation |
  | `/services/accounting-bookkeeping` | `accounting-bookkeeping-support/` | Accounting and Bookkeeping Virtual Assistant Support | Reconciliation support · Payables and receivables · Reporting preparation |
  | `/services/real-estate-conveyancing` | `real-estate-admin-support/` | Real Estate Virtual Assistant Support | CRM administration · Prospect follow-up · Property documentation |
  | `/services/back-office-admin` | `back-office-admin-support/` | Administrative Virtual Assistant Services | Executive administration · Inbox and calendar support · Customer coordination |
  | `/services/digital-marketing` | `digital-marketing-assistance/` | Digital Marketing Virtual Assistant Support | Campaign administration · Social publishing · Analytics reporting |
  | `/services/sales-marketing` | `sales-marketing-support/` | Sales and Marketing Virtual Assistant Support | Lead research · CRM administration · Customer follow-up |
  | `/services/creative-copywriting` | `creative-writing-assistance/` | Copywriting Virtual Assistant Support | Article support · Website copy · Proofreading and publishing |
  | `/services/it-technology` | `it-services-technology/` | IT Virtual Assistant Services and Technology Support | Website maintenance · WordPress support · Technical administration |

  **Titles: adopt the `VOA Content` headings above verbatim as the visible `<h1>`** (confirmed 2026-09-20) — e.g. `/services/mortgage-loans` renders "Mortgage Processing Virtual Assistant Support", not "Mortgage & Loans". Shorter names may still be used in nav, dropdowns, breadcrumbs and homepage cards where the full title won't fit; the H1 and page title use the long form.
- **SP3.** "Where Support Helps" content is rebuilt from `VOA Content`'s "Role scope" section (its `.task-grid` of six numbered task cards per service), keeping Layout 1's current visual layout. Each responsibility row becomes expandable/collapsible, revealing that card's description text. Only one row may be open at a time — opening a new row auto-closes the previously open one.
- **SP4.** Add a new "Systems experience" section, using the full `.system-list` from each `VOA Content` service page:
  - Mortgage & Loans — Connective, Mercury, Podium, Salestrekker, Symmetry, Flex, AdviserLogic, COIN
  - Financial Planning — Xplan, Risk Researcher, WealthSolver, CALM, Midwinter, AdviserLogic, Microsoft Office
  - Accounting & Bookkeeping — Xero, MYOB, Saasu, Microsoft Excel, Client document systems
  - Real Estate — Your property CRM, Email and calendar platforms, Cloud document storage, Agency workflow tools
  - Back Office & Admin — Your CRM, Email and calendar platforms, Microsoft 365 or Google Workspace, Cloud document storage, Task-management tools
  - Digital Marketing — Google Analytics, Facebook and Instagram, TikTok, YouTube, Your CMS, Approved design and campaign tools
  - Sales & Marketing — Your CRM, Approved email and calling tools, Lead-research sources, Order-management platforms, Reporting templates
  - Creative & Copywriting — Your content-management system, Shared document platforms, Editorial calendars, Research sources, Brand and style guidelines
  - IT & Technology — WordPress, Website content systems, Analytics platforms, Approved design tools, Task and issue trackers
- **SP5.** Add a new "When this role fits" section after Systems experience — original layout, styled to match this site's theme (no direct Layout 2/VOA Content equivalent specified).
- **SP6.** Add a new "Questions about the service" section after "When this role fits." Source: each `VOA Content` service page carries three service-specific Q&As in its `.faq-list` (also mirrored in that page's `FAQPage` JSON-LD). Use the same one-open-at-a-time accordion behavior as SP3/FAQ1.
- **SP7.** Page ends with the global "The Virtual Office Angels model" (G3) and "Your next step" (G2) sections.

Confirmed per-service-page order: Hero → Where Support Helps → Systems experience → When this role fits → Questions about the service → The Virtual Office Angels model → Your next step.

---

## How It Works page

- **HIW1.** Full rework of page content — pull in useful material from `VOA Content` if available.
- **HIW2.** Make the page feel more procedural/step-by-step, since it's explicitly a "how it works" explainer.
- **HIW3.** Improve animation and layout generally.

**Status: HIW1–HIW3 implemented, awaiting review.** New file `src/content/processContent.ts` carries "The four parts of managed virtual support" from `VOA Content`'s managed virtual support page — four named stages, each with a summary line and three checkpoints, all source copy. `ProcessPage` in `SourcePage.tsx` is rebuilt as a compact hero plus a sticky-intro timeline; `global.css` adds the rail, checkpoints and per-stage entrance.

**Content split to be aware of — this affects WVOA1.** `VOA Content`'s managed virtual support page is the source for *both* this page and the Why Virtual Office Angels page. To stop them duplicating each other, it has been divided:
- **`/how-it-works`** takes "The four parts of managed virtual support" — the procedural stages.
- **`/why-voa`** should take the remainder when WVOA1 is built: "What is an HR-managed virtual support solution?", "Clear ownership keeps the working relationship effective" (the shared-responsibilities split), and "What to know before building the role" (four Q&As).

This narrows WVOA1's "adopt all sections" instruction by one section. Flagged for confirmation.

Also note: the home page's Why Virtual Office Angels band uses the shorter "More than recruitment" stage names (Support planning / Specialist matching / Onboarding & integration / Ongoing delivery support), while this page uses the longer service names (Workforce consulting / Talent sourcing / Onboarding and integration / Ongoing delivery support). Both are source copy from different pages of the proposal; if the duplication reads badly, the home page band is the one to change.

`processSteps` was removed from `homeContent.ts`, since nothing used it after the home page moved to the responsibility split.

---

## Why Virtual Office Angels page

- **WVOA1.** Adopt all sections/content from `VOA Content`'s `/managed-virtual-support` page.
- **WVOA2.** Follow the services-page template structure end-to-end: hero (with an image, matching the services-page hero pattern) through "Your next step."

---

## Client Stories & Testimonials page

**Status: CST1–CST2 implemented, awaiting review.** Rebuilt in `SourcePage.tsx`; testimonial sizing in `global.css`; hero image added to the `/client-stories` brief. Verified by lint, `tsc --noEmit` on both configs, and a production build, plus a browser check of the hero and cards.

- **CST1** — services-page structure: image hero (contrast measured at 9.8:1, clears AAA) → client logo carousel → testimonials → Virtual Office Angels model → Your next step.
- **CST2** — cards now use Layout 2's sizing (three columns, `0.85rem` gap, `1.25rem` padding, 1rem/1.65 quote type) with its 3px orange top rule, while keeping Layout 1's gradient surface, shadow and hover. Layout 2's dark featured card was excluded as instructed. The orange border is declared after the shared card treatment, which would otherwise repaint all four borders.
- **Two cleanups taken while the page was open:** the testimonial data duplicated inside `SourcePage.tsx` was dropped in favour of the shared `src/content/testimonials.ts` module (debt recorded in `CLAUDE.md`), and the generic `VA` avatar placeholder was removed so this page shows real initials like the home page.
- Hero image is `4e5d7159c6-…-business-people-working-common-desk`, which also serves as one article's featured image. Reused deliberately; it is the only library photo showing colleagues working together, and the two contexts differ in size and placement.

- **CST1.** Follow the services-page template from hero through "Your next step" (hero gets an image, same as services pages).
- **CST2.** Rework the testimonial cards: keep Layout 1's animation and gradient coloring, but resize the containers and text to match Layout 2's sizing (excluding Layout 2's dark container background). Add Layout 2's orange top border line to every card.

---

## FAQs page

- **FAQ1.** Layout stays as-is. Behavior change only: restrict expansion to one FAQ row at a time — opening a new row closes whichever one was previously open. *(Same accordion behavior as SP3.)*

---

## Articles & Blog / Videos & Resources pages

- **ART1. [Delegated to us]** Decide whether these two pages' heroes adopt the low-opacity background-image treatment (SP1-style) or stay as they are. Confirmed approach: build the services-page hero first, judge these two against the real rendered pattern, then decide and flag the choice to the user.
- **ART2.** Add pagination: show the latest 10 items by default, with controls to reach older articles/videos. **Scope: `/insights` and `/videos` only** — Client Stories is explicitly out of scope and keeps its current full listing.

---

## About Virtual Office Angels page

- **ABT1.** Layout stays as-is. Rewrite "Our Story" to focus on the company rather than the founder (the founder now has her own dedicated section) — cross-reference `https://virtualofficeangels.com.au/about-us/` for source material.
- **ABT2.** Move the founder-specific material currently in "Our Story" into "Founder & Leadership," and expand/enrich that section.

*(This keeps the two narratives distinct, consistent with the existing rule in `CLAUDE.md` that Our Story and Founder & Leadership must not duplicate the same copy.)*

---

## Footer

- **FTR1.** Replace only the left-hand column of the Layout 1 footer with the left-hand column of `VOA Content`'s footer. Everything else in the footer is unchanged.

---

## Resolved decisions (all settled 2026-09-20)

| # | Item | Decision |
| --- | --- | --- |
| 1 | Scope reversal | Restoring `/services` and sourcing copy from `VOA Content` is correct; supersedes prior `CLAUDE.md` rules |
| 2 | Header dropdowns (H1) | Hybrid approved, provided mouse behavior matches Layout 2 |
| 3 | Homepage G2/G3 | Both excluded from home; existing contact form stays untouched |
| 4 | Homepage order | Current bottom-half order retained — see Home page list above |
| 5 | Service tags + systems (SP2/SP4/HP8) | Extracted from `VOA Content`; all 9 services mapped |
| 6 | `ref-images` path | `VOA Layout 1/ref-images/` |
| 7 | Global sizing (G1) | ~10% token reduction, **home page first**, sitewide rollout only after sign-off |
| 8 | Pagination (ART2) | `/insights` and `/videos` only, 10 per page; Client Stories unchanged |
| 9 | Articles/Videos hero (ART1) | Delegated to us — decide after the services hero is built, then flag the choice |
| 10 | FAQs nav (H6) | Menu placement only; `/faqs` URL unchanged, no redirect |
| 11 | About nav merge (H7) | Single item "About Virtual Office Angels" → `/about` top; anchors stay valid |
| 12 | Systems list lengths (HP8) | Short homepage lists are deliberate; full lists only on service pages |
| 13 | Service page titles (SP2) | Adopt `VOA Content` SEO headings verbatim as the visible H1 |
| 14 | Nine services | Build all nine; apply every services-page change equally |

**Accepted risk on #14:** Sales & Marketing, Creative & Copywriting, and IT & Technology are still flagged in `CLAUDE.md` as production-only and unconfirmed by the client. We build them now; if the client later rejects their scope, three service pages and their nav entries come out. Keep them structurally identical to the other six so removal is clean.

## Open questions

None outstanding. The only remaining unknowns are the external blockers below.

## Known blockers (not decisions — waiting on external input)

- **B1.** Client-supplied logo file (H4) — not yet delivered.
- **B2.** Paola's approved copy/assets for content integration — not yet supplied; this guide only covers the client's own mockup-revision notes, not new source copy.

## Execution notes

- Treat each numbered item (G-, H-, HP-, SP-, HIW-, WVOA-, CST-, FAQ-, ART-, ABT-, FTR-) as an independently verifiable unit of work; reference these IDs in commit messages / change logs for traceability.
- Verify every implemented item on desktop + mobile, light + dark theme, and with motion + `prefers-reduced-motion`, per `CLAUDE.md`.
- Run `npm run lint` and `npm run build` after implementation and report exact results — do not claim a check passed without running it.
- Do not implement anything above marked **[Needs decision]** by guessing; resolve via the Open Questions list first, or implement the unambiguous parts of that item and leave the ambiguous part flagged.
