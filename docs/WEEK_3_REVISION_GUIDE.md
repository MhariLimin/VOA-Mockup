# Week 3 Revision Guide

Reworded, numbered version of the client's Week 3 change list. This is the spec to implement
against — nothing here is implemented yet.

Read `claude.md` and `docs/SESSION_HANDOFF.md` first. This guide follows the same conventions as
`docs/MOCKUP_1_REVISION_GUIDE.md`: one ID per independently checkable change, tagged
**[Confirmed]** (clear enough to build), **[Assumption]** (building against a stated
interpretation the user can reverse) or **[Blocked]** (waiting on an external input).

IDs are namespaced `W3-` so they never collide with the Week 2 IDs (G1–G3, H1–H7, HP1–HP12,
SP1–SP7, HIW1–HIW3, WVOA1–WVOA2, CST1–CST2, ART1–ART2, ABT1–ABT2, FAQ1, FTR1).

## Legend

| Term the client used | Resolves to |
| --- | --- |
| "flowchart/diagram card" in the hero | `.match-visual` in `src/pages/HomePage.tsx:26-30` — the two-card "Client brief → Specialist match" visual |
| "the 4 column (15 years.. etc) card" | `.hero-stats` — `heroStats` in `src/content/homeContent.ts`, rendered at `HomePage.tsx:33-37` and again in the sitewide `.voa-strip` |
| "number count on the Our Clients Image Carousel" | The `01 / 30` counter in `.carousel-controls`, `src/components/ui/ClientCarousel.tsx:54` |
| "Specialised virtual assistant services section" | The home `.services-section` card grid, `HomePage.tsx:52-86` |
| "More than Recruitment section" | The home `.home-managed` dark section, `HomePage.tsx:88-109`; copy in `homeContent.ts` → `moreThanRecruitment` |
| "Insights and resources section" | The home `.insight-section`, `HomePage.tsx:124-129` |
| "Let's talk section" | The home closing contact section, `HomePage.tsx:167` |
| "Your next step sections" | `NextStepSection` in `src/components/layout/PageClosing.tsx:79-81` — used by every page except home, `/contact` and `/thank-you` |
| "Service Page → Choose a service section" | The `/services` index directory list, `SourcePage.tsx:104-117` (`.service-directory` / `.directory-card`) |
| "Service Pages → Systems experience & requirements" | `.systems-panel` / `.system-list`, `SourcePage.tsx:60` |
| "When to hire a virtual loans assistant section" | The `.role-fit` two-card section on every service page, `SourcePage.tsx:62-66`. The heading is per-service (`fitHeading`); the loans wording is just the example the client was looking at |
| "Find the right specialised virtual assistant…" | The service-page closing, `NextStepSection className="service-closing"`, `SourcePage.tsx:88` |
| "Managed Virtual Support Page" | `/why-voa`, `WhyPage` in `SourcePage.tsx:258-312` |
| "Shared responsibilities section" | `.role-fit` on `/why-voa`, `SourcePage.tsx:287-300`; copy in `managedContent.ts` → `ownershipSplit` |
| "Articles and Blogs Page" | `/insights`, `InsightsPage` — hero via `ImageHero`, `SourcePage.tsx:357-371` |
| "Clients & Testimonials Page" | `/client-stories`, `StoriesPage` in `SourcePage.tsx:314-340` — currently has **no** hero, just a `.page-intro` |
| "the other 2 websites" | `https://virtualloansassistant.com.au/` and `https://virtualfinancialsupport.com.au/` — see `SESSION_HANDOFF.md` §2. Only their **logos** are in this repo today (`public/assets/brands/`); no photographs from them are local |

## Cross-cutting constraints (apply to every item below)

- **No invented copy.** Any string that has to be written is named in the "Written text" section at
  the end.
- **One shared rotating-background implementation.** W3-HP10, W3-G1, W3-SP2 and W3-CON1 are the
  same feature in four places. Build it once as a small hook plus a modifier class, not four times.
- **Reduced motion:** every rotation (hero, closing sections, hover background) must hold on the
  first image and expose the dot navigation as static controls when `prefers-reduced-motion` is set.
  `src/hooks/useReducedMotion.ts` already exists and is the hook to use.
- **Both themes.** New overlays and glass surfaces need light *and* dark token values in
  `themes.css`; check text contrast over every rotating image, not just the first.
- **Scope new CSS to a new class** appended to `global.css` with a one-line comment. Do not restyle
  `.inner-hero`, `.role-fit`, `.hero-stats` or `.contact-section` globally to fix one page.
- **Images are placeholders.** Every photo assigned in Week 3 comes from the existing local library
  and is expected to be replaced by the client's real images. Keep the assignments in one content
  module per feature so a swap is a one-file edit.
- **Verification per item:** `npm run lint`, `npx tsc --noEmit` on both configs, and a production
  build to a scratch directory. Browser checks only when the user asks for them.

---

## Header

- **W3-H1. [Confirmed]** Make the contact number in the top-right of the header bigger and more
  prominent. Today it is a small text link (`.header-phone`, `global.css:167-181`) at the same
  weight as the nav. Give it a larger font size and heavier weight, a clearer affordance (bordered
  or filled pill in `--action`), and a larger phone icon, while keeping: the existing `/contact`
  destination (not a `tel:` link — decided in Week 2 as H2), the current 48rem hide rule
  (`global.css:1151`), and header height stability. **Checkable:** the number is visibly the
  strongest element on the header's right side at 1440px, and the header does not grow taller.

---

## Home page

- **W3-HP1. [Confirmed — images are placeholders]** The hero (`.home-hero`) gets a rotating
  background image: **5 images, 3-second interval, cross-fade out and in** (not a slide). Keep the
  hero copy, buttons and CTA behaviour exactly as they are; the copy sits above a scrim so it stays
  readable over every image. Requires a new overlay layer because `.home-hero` has no background
  image today. **Placeholder images** — five distinct originals from the local staging library, no
  duplicate originals (the same original filename behind two hashes is the same photo, per
  `SESSION_HANDOFF.md` §3). Proposed set, kept in one exported array so the client's real photos
  replace it in a single edit: `2148908840.jpg`, `2796.jpg`, `2149013955.jpg`, `25711.jpg`,
  `1690.jpg`. **Checkable:** five images cycle at 3s with a fade, and the h1 stays legible on each.
- **W3-HP2. [Confirmed]** Dot navigation at the bottom of the hero — one dot per image, the active
  dot marked, clicking a dot loads that image. Must be real buttons with an accessible label and
  `aria-current` (or `aria-pressed`), keyboard operable, and clicking a dot resets the 3s timer
  rather than fighting it. **Checkable:** five dots, keyboard-reachable, each jumps to its image.
- **W3-HP3. [Assumption — destination needs confirming, see Q1]** Move the `.match-visual`
  flowchart card out of the hero, because the hero now carries a photographic background and the
  card would sit badly on it. **Recommended destination:** the `/how-it-works` page, where it
  illustrates the brief-to-match story and simultaneously satisfies W3-HIW1. Its animation
  (`global.css:562-566`) is hero-scoped and must be re-scoped to wherever it lands.
  **Checkable:** the card no longer renders on `/`, and renders once, styled correctly, in its new home.
- **W3-HP4. [Confirmed]** Restyle the four-figure row (`.hero-stats`) as a **glass panel** that
  blends with the rotating backgrounds: translucent background, backdrop blur, a light hairline
  border, and text colours that hold contrast over both light and dark photos. It sits over the hero
  image rather than on the page background. **Two traps:** (1) `heroStats` also feeds the sitewide
  `.voa-strip` (`PageClosing.tsx:76`), so the glass treatment must apply only to the hero instance;
  (2) `backdrop-filter` needs a solid-colour fallback for browsers that drop it, or the text loses
  its background entirely. **Checkable:** the row reads as glass over all five images, and
  `.voa-strip` on other pages is visually unchanged.
- **W3-HP5. [Assumption — scope needs confirming, see Q2]** Remove the `01 / 30` counter from the
  client carousel. The component is shared with `/client-stories`, so "remove it" is read as
  **remove it in both places**, keeping the ← → buttons (they are the only manual control).
  **Checkable:** no counter anywhere the carousel appears; arrows still work; hover/focus pause and
  the 1s advance are untouched.
- **W3-HP6. [Confirmed]** Fix the service-card preview image. Cause: `.service-card-image`
  (`global.css:290`) is a `3.25rem × 3.75rem` box with `object-fit: cover`, so a wide photo is
  cropped to a narrow vertical sliver — the "fraction of it" the client saw. Fix by giving the
  thumbnail a sensible aspect ratio and width so the photo is recognisable (a wide 16:9 or 4:3 strip,
  or a full-width banner across the card top) without losing the compact card height approved in
  Week 2. **Checkable:** each of the six cards shows a readable photo, and the grid keeps its current
  card height and alignment.
- **W3-HP7. [Confirmed]** On hovering a service card, in addition to the existing lift animation,
  the **whole services section background** becomes that service's image at very low opacity — an
  extra shade, not a visible photo. Implementation notes: drive it from one absolutely-positioned
  layer on the section (not six), cross-fade it, keep it `aria-hidden`, disable it under reduced
  motion, and confirm the section's text contrast is unaffected in both themes. Keyboard focus on a
  card must do the same thing as hover. **Checkable:** hovering card 3 tints the section with image 3
  at low opacity; moving away fades it out; body text contrast unchanged.
- **W3-HP8. [Assumption — expandable behaviour as described below]** Convert the four "More than
  recruitment" cards (`.ownership-grid`: Consulting & Planning → Sourcing & Matching → Onboarding &
  Integration → Ongoing Delivery & Support) into a **horizontal diagram** — connected numbered nodes
  reading left to right on desktop, stacking vertically on mobile. Because each stage has description
  text, the node shows the stage name and heading, and the description is **expandable**: one node
  open at a time, click/Enter to toggle, `aria-expanded` on the trigger, first node open by default
  so the section is not empty on load. Copy is unchanged (`moreThanRecruitment.stages`); the
  deliberately dropped bullets stay dropped (`SESSION_HANDOFF.md` §5.4). It stays inside the dark
  section, so the diagram needs the dark-section colour set. **Checkable:** four connected nodes in a
  row at 1440px, one expanded description at a time, keyboard operable, single column below 48rem.
- **W3-HP9. [Confirmed]** Replace the three-card insights preview (`.home-article-preview`) with a
  **horizontal scroller carrying the 30 latest articles**. `blogArticles` already holds all 30 and
  `blogContent.ts` sorts them, so this is a slice change plus a scroll container. Requirements:
  native horizontal scroll with scroll-snap (so it works by touch and trackpad without JS), visible
  previous/next buttons for mouse users, keyboard-reachable cards, no vertical page-scroll hijack,
  and lazy images so 30 previews do not cost the whole home page. Keep the existing card design and
  the "Browse articles" link. **Checkable:** 30 cards reachable by scroll and by the buttons, no
  layout shift, and the section does not trap the page scroll.
- **W3-HP10. [Confirmed]** The "Let's talk" section gets its own rotating background: **6-second
  interval**, very low opacity, and **weighted to the left** — more visible behind the copy column,
  fading to near nothing behind the form. Implement as a horizontal gradient mask over the image
  layer. The form inputs must keep their solid surface so fields stay legible. This is the same
  component behaviour as W3-G1, so build it once (see Cross-cutting constraints). **Checkable:** the
  image visibly cycles every 6s, left-weighted, form fields unaffected, contrast holds in both themes.

---

## All pages

- **W3-G1. [Confirmed]** Every "Your next step" section (`NextStepSection`) gets the same rotating
  background as W3-HP10: 6s, low opacity, left-weighted. Because service pages render
  `NextStepSection className="service-closing"`, **this one change also delivers W3-SP2.** The home
  "Let's talk" section is separate markup in `HomePage.tsx` and must be pointed at the same
  implementation rather than a copy of it. **Checkable:** `/about`, `/how-it-works`, `/why-voa`,
  `/insights`, `/faqs`, `/client-stories`, all ten service pages and every article page show the
  rotating closing background; `/thank-you` and 404 stay excluded, as decided in Week 2 (G2).
- **W3-G2. [Assumption on which pages, see Q4 — image source partly Blocked, see Q3]** Make the
  process pages less formal and add supporting photos or diagrams. Read as `/how-it-works` and
  `/why-voa` (the two pages that explain process rather than sell a service). "Less formal" is
  interpreted as: break up the long single-column timeline with imagery and a warmer rhythm —
  a supporting photo per stage group, softer section framing — **without** rewriting copy, changing
  stage content, or abandoning Layout 1's restraint. Photos come from the local library first;
  sister-site photography needs Q3 resolved before anything is downloaded. **Checkable:** both pages
  carry at least one relevant photo or diagram above the closing section, and no copy changed.

---

## `/services` index

- **W3-SV1. [Confirmed]** In "Choose a service", each row currently shows number, title,
  description, thumbnail (`filter: grayscale(0.75)`) and an arrow. Change to: **title only at rest**
  — description hidden — and **on hover or focus** the description appears, the thumbnail goes full
  colour and enlarges significantly. Notes: hide the text so it stays reachable (animate
  height/opacity rather than removing it from assistive tech), give the row a stable height so the
  list does not jump, and make `:focus-visible` trigger the same state as `:hover` since the whole
  row is an existing `<Link>`. The enlarged image must not overflow the row or cause horizontal
  scroll. Below 48rem, show the description permanently — hover does not exist on touch.
  **Checkable:** ten rows show titles only; hovering row 4 reveals its description and enlarges its
  colour image; tabbing does the same; no layout jump.

---

## Service pages (all ten)

- **W3-SP1. [Confirmed]** Convert "Systems experience & requirements" from the flat pill list
  (`.system-list`) into a **diagram or a clearly readable table**. Recommendation: a grouped table —
  tool name plus what it is used for — because the content is a plain list of systems per service,
  and a table survives long lists (some services have many) and reads on mobile. The per-service
  system names in `serviceDetails.ts` are verbatim from `SERVICE PAGES_VOA.pdf` and must not change;
  any grouping label or "used for" text would be **written copy** and must be flagged, so the default
  is to group without inventing descriptions. **Checkable:** all ten services render the new layout
  with no system name altered, readable at 390px.
- **W3-SP2. [Confirmed — delivered by W3-G1]** "Find the right specialised virtual assistant for
  your business" gets the rotating background. No separate work; verify on at least three service
  pages after W3-G1.
- **W3-SP3. [Confirmed]** Convert the "When to hire…" section (`.role-fit`: the "A good fit when"
  checklist plus the boundary card) into a **diagram**. The boundary card is deliberately kept
  (`SESSION_HANDOFF.md` §5.1) and must survive the conversion as a visually distinct element rather
  than being merged into the checklist. Copy unchanged. **Checkable:** all ten service pages render
  the diagram with every `fits` item and the boundary card present; single column below 48rem.

> **Note:** `.role-fit` is shared with `/why-voa`'s "Shared responsibilities" (W3-MVS2). Both are
> being converted to diagrams, but they are different content shapes (checklist plus boundary vs. two
> ownership columns), so each needs its own modifier class. Do not restyle `.role-fit` itself.

---

## `/how-it-works`

- **W3-HIW1. [Confirmed]** Incorporate an image into the page. It currently has no imagery at all —
  it opens straight into `.process-layout` with the timeline. Satisfied together with W3-HP3 if the
  flowchart card moves here; a supporting photograph is still needed for W3-G2's "less formal" goal.
  **Checkable:** `/how-it-works` shows at least one image or diagram above the closing section.

---

## `/why-voa` (Managed Virtual Support)

- **W3-MVS1. [Confirmed]** The hero image should occupy **half the section**, with an intuitive,
  distinctive cut between copy and image. Today it is a rounded 4:3 `img` in the right-hand column
  (`.inner-hero-image`, `inner-hero-grid` at 7fr/4fr). Change to a true half-and-half split with a
  shaped edge — an angled or curved cut via `clip-path`, full-bleed to the section edge.
  Requirements: the cut must not clip the heading or crop faces out of the photo; below 48rem it
  becomes image-above-copy with the shape flattened or turned horizontal; `.inner-hero-image` is
  shared, so this needs its own modifier. **Checkable:** the image fills half the hero at 1440px with
  a clean shaped edge, no copy clipped, sensible stack at 390px.
- **W3-MVS2. [Confirmed]** Convert "Shared responsibilities" (`ownershipSplit`: what Virtual Office
  Angels owns vs. what the client owns) into a **diagram** that makes the split visible — a two-sided
  layout with a shared spine rather than two cards side by side. Copy unchanged. **Checkable:** both
  columns' labels, headings, summaries and every list item present; single column below 48rem.

---

## `/insights` (Articles and Blogs)

- **W3-ART1. [Confirmed]** Same treatment as W3-MVS1: the hero image occupies half the section with
  a distinctive cut. `/insights` uses the shared `ImageHero`, which is **also used by `/videos`**,
  where the "image" is the `VideoPoster` placeholder. Decide deliberately whether `/videos` gets the
  same half-section cut (recommendation: yes, for consistency, since the poster fills the same slot)
  and record the choice. **Checkable:** the `/insights` hero is half image with a shaped edge, and
  `/videos` is either consistent with it or deliberately excluded and noted.

---

## `/client-stories` (Clients & Testimonials)

- **W3-CST1. [Confirmed — placeholder image]** The hero should have a low-opacity background image.
  Note the page has **no hero section today** — it opens with a `.page-intro` block followed by the
  carousel, so this adds a hero treatment to that opening block rather than restyling an existing
  hero. Needs a placeholder photo from the local library, flagged for replacement.
  **Checkable:** the opening block shows a low-opacity background image, and heading contrast holds
  in both themes.

---

## `/contact`

- **W3-CON1. [Confirmed]** The "Contact us" section gets the same rotating background as W3-HP10 and
  W3-G1. `ContactPage` uses its own `.contact-section` markup (not `NextStepSection`), so it must be
  pointed at the shared implementation. The contact details list (`dl`) and the form both need to stay
  legible over the images. **Checkable:** `/contact` cycles the background every 6s, left-weighted,
  with the phone, email and address details fully readable.

---

## Implementation status

| Block | Items | Status |
| --- | --- | --- |
| Header | W3-H1 | **Approved** 2026-09-26 |
| Home page | W3-HP1 – W3-HP10 | **Approved** 2026-09-27 |
| All pages | W3-G2 | Not started |
| `/services` | W3-SV1 | **Approved** 2026-09-27 |
| Service pages | W3-SP1, SP3 | **Approved** 2026-09-27 |
| Service pages | W3-SP2 | Implemented 2026-09-27 — see W3-G1 |
| All pages | W3-G1 | Implemented 2026-09-27 via `NextStepSection` |
| `/contact` | W3-CON1 | Implemented 2026-09-27 |
| `/how-it-works` | W3-HIW1, W3-G2 (this page) | Implemented 2026-09-27, awaiting review |
| `/why-voa` | W3-MVS1, MVS2, W3-G2 (this page) | Implemented 2026-09-27, awaiting review |
| `/insights` | W3-ART1 | Implemented 2026-09-27, awaiting review |
| `/client-stories` | W3-CST1 | Implemented 2026-09-27, awaiting review |


### Home page as built

- **Hero:** 5 photographs, 6s each, 2.2s `ease-in-out` cross-fade, dot navigation, glass figure panel,
  flowchart card moved to `/how-it-works`. Scrim 95/80/20% light, 95/86/48% dark.
- **Services:** thumbnail is a 4:3 tile in a 7.5rem column; hovering or focusing a card washes that
  service's photograph across the section at `--service-wash`.
- **More than recruitment:** the four stages are milestones on a **drawn path** — a curve rising from
  first contact, with diamond markers alternating above and below it, and the line running past the
  last milestone and fading off the right edge. The selected stage's heading and description open in
  the panel beneath.
- **Insights:** horizontal rail, all 30 articles, cards 18.5–21rem.
- **Let's talk:** rotating background at `--section-wash`, masked to clear before the form.
- **Carousel:** slide counter removed sitewide.

### `/services` index as built

Rows show number, title and a grayscale thumbnail at rest. Hover or `:focus-visible` reveals the
description, tints the row, turns the title accent blue and scales the photograph to 1.55x in full
colour with a shadow.

**The row height is fixed at 8rem and the description is clamped to three lines.** Without the clamp a
long lead wrapped to a third line and grew the hovered row by 9px, pushing every row below it down as
the pointer moved through the list. Verified after the fix: all ten rows measure 115px, hovered or
not, at both 1536px and 1003px. The cost is that most descriptions end in an ellipsis — row stability
and the full lead cannot both be had without much taller rows. The user accepted this. If it is ever
reversed, remove the clamp and the fixed `min-height` together.

Below 48rem the description stays open and the image does not scale, because touch has no hover.

### Service pages as built

Both sections were rebuilt after a first attempt (a hairline table and a numbered vertical chain) was
rejected as not visually appealing enough. **The client wants designed diagrams with symbols, not
tidied lists.**

**W3-SP1 — systems constellation.** A hub-and-spoke diagram: a rounded-square core carrying a
layered-stack symbol with a halo ring, each system a chip on an ellipse around it with a module
glyph, and dashed spokes drawn in an SVG stretched to the box with `vector-effect="non-scaling-stroke"`
so they stay hairline at any width. Chip positions are computed with trigonometry from the item
count, so 4 to 8 systems all space evenly.

**W3-SP3 — fit backbone.** Four signal cards sit either side of a central vertical backbone carrying
a focus emblem, each tied to the spine by a stub with a node at the junction, each numbered in a
hexagonal badge. The role boundary is kept **off** the backbone in its own dashed, shield-marked card,
because it constrains the role rather than being a fifth signal.

Two bugs found and fixed during review, worth remembering:
- `grid-row: 1 / -1` **collapses to the first row when the grid has no explicit rows.** The spine only
  spanned the top pair and the emblem sat level with row one. Fixed with
  `grid-template-rows: repeat(var(--fit-rows), auto)`, the row count passed from the item count.
- The connector stubs used an independent `clamp()` and stopped ~18px short of the spine. Both the
  middle column and the stub now derive from one `--fit-gutter` variable.

**Icons are deliberately generic.** The four fit statements are **not** in a consistent order across
the ten services (position 1 is loosely "workload building up", but 2-4 differ entirely), so an icon
claiming a specific meaning per position would be inventing one. The hexagon badge, module glyph and
stack symbol are wayfinding marks, not semantic claims. If the client wants per-item iconography, the
content needs a category field per system and per fit.

Below 62rem both diagrams fall back to single-column layouts that keep the symbols; the constellation
drops its spokes and core, since neither reads at that width.

`.system-list` (the original pill styling) is now unused but left in `global.css`.

**Content issue found, not fixed:** `/services/insurance-processing` has `boundaryText` starting with
the bare word "No." — an artifact of that service's boundary copy being lifted verbatim from a PDF FAQ
answer (`SESSION_HANDOFF.md` §5.1 records that Insurance uses its own PDF FAQ answer here). It reads
as a fragment outside its question. Client copy, so flagged rather than edited.

### Rotating closing backgrounds (W3-SP2 / W3-G1 / W3-CON1)

`NextStepSection` now renders `RotatingBackdrop` with `contactBackgrounds`, so **every page closing
with that section gained the rotating background in one change** — service pages, About, How it Works,
Managed Virtual Support, Insights, Videos, FAQs, Client Stories and all 30 article pages. `/contact`
builds its own contact section rather than using `NextStepSection`, so it wires the same backdrop
directly. `/thank-you` and the 404 stay excluded, as they were from Week 2's G2.

### Hover states on the service diagrams

Rebuilt in orange after the blue version was rejected, and made to explain the structure rather than
just tint:

- **Systems constellation:** hovering a chip lights **that system's own spoke** back to the core as a
  solid 2px orange line, dims the other spokes, tints and lifts the chip, and rings the core in
  orange. Driven by React state rather than CSS alone, because the spoke and the chip are in
  different elements.
- **Fit backbone:** hovering a card turns its border, hexagon badge, connector stub and junction node
  orange, thickens the stub to 2px and haloes the node.

**Chip and card text stays at body colour on hover.** The button orange does not carry enough contrast
for small text on a light surface — that is what `--heading-accent` exists for, and it is used for the
glyphs and the boundary eyebrow. Verified computed values: `rgb(238, 125, 22)` on border, stub, node
and badge.

### Orange keywords in headings (client suggestion, 2026-09-27)

Section `<h2>`s and inner-page hero `<h1>`s carry one orange keyword, matching the home page's
existing treatment — `main h2 em` and `main h1 em` colour `<em>` with `--heading-accent`
(#dc4f1e light, #ff9a3d dark).

**The stored copy was not touched.** Headings from content modules are verbatim client text
(`serviceDetails.ts` was machine checked against the PDF), so `src/components/ui/HeadingAccent.tsx`
wraps the match at render time. Phrases are sorted longest-first and only the first match is wrapped,
so no heading gets two coloured fragments.

**Minimum two words.** A single coloured word reads like a typo. `TWO_WORD_MINIMUM` filters the phrase
list at load, so a one-word phrase added later is silently dropped rather than shipping. The
hand-wrapped literal headings were adjusted to match — "The standards behind *our support*." and
"Frequently *asked questions*."

**Excluded heroes, deliberately:**
- **The home hero** keeps its own blue emphasis. `.hero-copy h1 em` has higher specificity than
  `main h1 em`, so it wins without needing an override. Verified: still `rgb(7, 95, 174)`.
- **The ten service heroes** are excluded in the markup — they render `detail.title`, the client's SEO
  title, in white over a photograph. Verified: zero `<em>`, still `rgb(255, 255, 255)`.

Coverage, checked by script over the content and in the browser: **70/70** service-page headings,
**9/9** page titles, zero single-word accents, zero double-wrapped.

Adding copy whose wording misses the list leaves that heading plain rather than breaking —
`HeadingAccent.tsx` is the one file to update.

### `/how-it-works` (W3-HIW1 + the `/how-it-works` half of W3-G2)

**Rebuilt after a rejected first attempt.** That attempt kept the sticky two-column opening with the
brief-to-match card tucked under the CTA, and added a full-bleed dark photo band between the timeline
and the closing. The user rejected it: "the change was awful and the placement of the diagram is not
good". The page now reads:

1. **Hero** — copy left, the brief-to-match card as the hero illustration on the right. The card was
   homeless in a narrow sticky column; it is a diagram, so it belongs where a hero visual goes.
2. **Four-stage flow** — the vertical accordion timeline became four equal cards on a horizontal
   flow, each with its own icon tile, orange step number, title, summary and checkpoints. Nothing is
   hidden behind an accordion any more. Connectors sit in the gaps at icon height: a rail drawn
   behind the cards is invisible, because each card paints its own background over it.
3. **The photograph is a low-opacity wash behind that section**, masked to fade at top and bottom,
   rather than a dark band of its own. The page keeps its image without gaining a second hero.

**The four stages are ring medallions, not cards.** The client pointed at the "We Have A Team Ready
To Take Workload Off Your Hands, Forever" section on virtualfinancialsupport.com.au — four grey ring
icons in a row — and asked for that general idea, improved. Ours adds what the reference does not
have: each ring's **arc fills further than the last** (a quarter, a half, three quarters, whole) and
its **colour walks from the accent blue to the action orange**, so progression is legible before a
word is read. Connectors join the rings at centre height. Checkpoints became chips beneath each
stage, so nothing is hidden behind an accordion and no card chrome is needed — the shape carries the
diagram.

**Stage icons carry real meaning here** — clipboard for role planning, search-with-person for
matching, arrow-into-frame for onboarding, cycle for ongoing support. The four stages are fixed and
named, unlike the service-page fit statements, so semantic icons are honest rather than decorative.

**The wash behind this section runs at `--service-wash * 0.55`** (about 0.11), not the full value.
The medallions have no card background, so the summaries and chips sit directly on the photograph;
at the full wash the text competed with a face behind it. For the same reason the stage summary takes
`--text` at 88% rather than `--muted`, and the chips take `--text` at 80% rather than `--muted`.

**Hover feedback is orange, not the ring's own colour.** The rings keep the blue-to-orange ramp
because it carries the progression, but a mid-ramp colour (stage 2 is 33% orange, 67% blue) mixes to
a muddy slate in sRGB — measured at `#54697B` — which made the chip hover almost invisible. Hover now
lights the arc, icon, halo and chips in `--action`, matching every other hover on the site.

**The hover belongs to the ring, not the disc.** The first version lifted and scaled the icon disc,
which broke the geometry of a disc centred in a circle. It now thickens the arc from 5px to 7px, adds
a halo around the medallion, warms the icon in place, and raises the three chips together.

Copy is untouched: `processIntro.eyebrow` and `processIntro.heading` head the stage section, both
verbatim from HR-Managed Virtual Support.pdf and previously unrendered.

**First sister-site asset, per the user's approval on 2026-09-27:**

| File | Source | Size |
| --- | --- | --- |
| `public/assets/source/sister/virtualfinancialsupport-s03-consulting.jpg` | `https://virtualfinancialsupport.com.au/wp-content/uploads/slider/cache/b8ed9c00327a229fd1ed27d62e2cd088/s03.jpg` | 1920x900, 148 KB |

Fetched with browser-like headers and a referer — plain `curl` is refused with HTTP 406, and the
optimole URLs in the page source are rewritten wrappers, so the original `wp-content` path is the one
that works. **Rights unconfirmed:** a stock photograph on a client-operated site; the client must
confirm the licence covers reuse here before launch. Sister-site assets live in
`public/assets/source/sister/` with the source site in the filename.

**Lesson recorded:** measurements and a pair of cropped screenshots are not a design review. The first
attempt passed lint, build and both themes and still looked wrong, because the composition was never
judged as a whole page.

### `/why-voa` (W3-MVS1, W3-MVS2)

**W3-MVS1 — the hero cut.** The photograph holds 56% of the section, bleeds to the viewport edge, and
is clipped by `ellipse(92% 62% at 100% 50%)`. The copy column is capped at 34rem so the curve never
crosses the text; below 48rem the image becomes a band above the copy with the arc turned horizontal.

**The geometry trap:** the ellipse is centred on the right edge, so its *left* boundary is the visible
cut, and that boundary sits at `100% - rx`. A first attempt used `rx: 112%`, which put the boundary
outside the element — the whole element fell inside the ellipse and nothing was clipped, so it
rendered as a plain straight edge. Radii must be under 100% for the cut to appear at all, and a
*smaller* `ry` deepens the sweep rather than flattening it.

**W3-MVS2 — the ownership split.** Two sides facing each other across a single spine carrying an
exchange emblem. Each item is a plate with its own stub and node into the spine — blue on the client
side, orange on the Virtual Office Angels side.

**The two lists are deliberately offset by half a row.** Both sides hold four items of similar height,
so left aligned they form neat opposing pairs, which reads as "this item corresponds to the one
across from it". They are not counterparts: "Daily tasks and business priorities" does not pair with
"Recruitment and employment administration". The offset removes the implied mapping. Same class of
correctness problem as the service-page icons — the layout must not assert a relationship the content
does not have.

`.role-fit` is untouched; this is its own `.ownership-diagram`. Below 62rem the sides stack and the
spine and stubs are dropped.

The hero photograph is `13e3afc0dd-2796.jpg`, unchanged from before Week 3 — but note it is **also one
of the five home-page hero images**, so the same woman appears on both pages. The staging library has
no unused business photographs left; a second sister-site fetch would resolve it.

### `/insights` and `/client-stories` (W3-ART1, W3-CST1)

**W3-ART1.** `ImageHero` now applies the `/why-voa` half-section cut whenever it has a real photograph
and no caller-supplied aside. `/insights` gets the curve; **`/videos` deliberately does not** — it
passes its own `VideoPoster`, a player-style frame, and clipping that with an arc would read as a
broken component rather than a design. Verified: `/insights` has `.managed-hero-media` with the
ellipse, `/videos` still renders `video-poster video-hero-poster` in the column layout.

**W3-CST1.** The page has no hero section — it opens with an introduction and the client carousel —
so the opening block itself carries the photograph, faded out before the carousel begins. The wash
runs at `--service-wash * 0.6` (about 0.12): the client logos are line art on white plates and lose
their edges against a busy photograph at the full value.

**Second sister-site asset:**

| File | Source | Size |
| --- | --- | --- |
| `public/assets/source/sister/virtualloansassistant-client-meeting.jpg` | `https://virtualloansassistant.com.au/wp-content/uploads/2023/10/pexels-mikhail-nilov-7731349-scaled.jpg` | 2560x1868, 332 KB |

A client meeting across a desk, which suits Client Stories. Same rights position as the first: a
stock photograph on a client-operated site, licence unconfirmed for reuse here. The filename is
`pexels-…` upstream, so the original is a Pexels stock image — worth checking whether the client can
simply license it directly.

### The three stage diagrams, and why they differ

The same four managed-support stages appear on two pages, and the service pages carry a fourth
diagram. Each had to be visually distinct:

| Where | Shape |
| --- | --- |
| Home, "More than recruitment" | A curved journey path with diamond milestones; the line runs on past the last stage and fades |
| `/how-it-works` | Ring medallions with progress arcs, icons and checkpoint chips |
| Service pages, "When to hire" | A backbone with signal cards either side and a separate boundary |

**The home section took four attempts.** Numbered circles on a line; then rising plates on risers;
then interlocking chevrons; then the path. Two lessons:

1. **"Do not use cards" is about the shape, not the section it was first said about.** A rectangle
   with a border and a background is a card whatever it is called, and the rising-plates version was
   exactly that.
2. **The diagram should carry the section's argument.** The section says Virtual Office Angels does
   not stop at placement. Four equal segments in a row cannot say that; a line that keeps going after
   the fourth milestone and fades out can. That is why this version works where the others did not.

**Each milestone carries its stage icon** inside the diamond. The icons come from
`src/components/ui/StageGlyphs.tsx`, shared with the `/how-it-works` medallions — the same four
stages must not be given different symbols on each page.

**The geometry that had to be right:** markers are positioned at points computed on the same
quadratic curve the SVG draws, so they sit on the line at any width — verified with zero deviation at
1536px. Anchoring is by the marker, not by the marker-plus-label block: the label sits above the
marker on even milestones and below it on odd ones, so centring the whole button left the diamonds
floating up to 22 units off the line. The marker box is a fixed size, so enlarging the selected
diamond cannot nudge it off the curve.

**Two rendering traps the icons hit:**
1. **The rotated diamond paints over a plain sibling.** `rotate` creates a stacking context, so the
   diamond rendered above the icon regardless of DOM order and the icons were invisible. The icon
   needs its own `position` and `z-index`.
2. **The SVG's own `stroke-width: 1.7` scales to under a pixel** at milestone size and disappears.
   The stroke is set in CSS instead. The icon is sized against the largest upright square that fits a
   rotated diamond, which is its side over the square root of two.

Below 62rem the curve is dropped — it needs width — and the milestones become a vertical run against
a straight rail.

**The description is the signed-off panel beneath the diagram** — orange rule down the left, the
stage number watermarked behind it, a diagonal wash instead of a flat fill, heading and text fading
and rising in with the body 80ms behind the heading. The heading reserves two lines, because some
stage headings wrap and some do not and the panel was otherwise changing height between milestones.

**Three alternatives were tried and rejected, in this order:** a centred typographic block with no
container (no connection to which milestone was lit); the description opening at the milestone itself
(scattered the reading position around the diagram and shoved the labels about — "very bad"); and a
hairline rail with a marker gliding to the selected milestone (broke the diagram's alignment). The
panel is what the user wants; **it is not up for redesign again without being asked.**

**Every milestone label centres on its own marker.** The outermost two were briefly anchored to one
side, which was only needed while the description opened in place and needed the width; with the
description back in its panel the labels are short and side-anchoring just left them sitting
off-centre under their diamonds. Verified: all four label centres are exactly 0px from their marker
centres.

**Labels clear the marker box rather than tucking inside it.** The selected diamond scales past the
box and was covering its own step number.

**Stage names are the full PDF titles.** `homeContent.ts` had shortened two of them to
"Consulting & Planning" and "Sourcing & Matching" while `/how-it-works` used the full
"Consulting & Role Planning" and "Sourcing & Candidate Matching" from the same document. The same
stage should not carry two names across the site, so the home page now uses the full titles. This is
source-backed, not rewritten — the longer names are the ones in HR-Managed Virtual Support.pdf.

### Insights rail hover (W3-HP9)

**A real clipping bug, not just a restyle.** `overflow-x: auto` on the rail forces `overflow-y` to
`auto` as well, so the card's hover lift had nowhere to go — it was cut off at the top and the shadow
was trimmed at the sides. The rail now carries `padding: 1rem 0.35rem 1.5rem` with matching
`scroll-padding-left`, which gives the lift and shadow room without changing where the cards snap.

The hover itself is now orange and does four things together: the border goes `--action`, the title
goes `--heading-accent`, the photograph scales slightly and gains saturation, and the "Read article"
arrow slides right. The card lift went from 0.45rem to 0.5rem with a longer, softer curve.

**Debugging note that cost time.** Computed styles read as if the hover rules were not applying at
all — border, transform, title colour and both child transforms all showed their resting values while
`matches(':hover')` was true and the `(hover: hover)` query matched. The rules were correct: **CSS
transitions were frozen in the automated browser context**, so every transitioned property reported
its start value indefinitely. Setting `transition: none` inline on the element made the border resolve
to `rgb(238, 125, 22)` immediately. When a hover appears not to apply here, disable the transition
before concluding the CSS is wrong.

### Client-supplied systems lists (2026-09-27)

Three services had their systems replaced with lists the client sent. These **supersede the lists
transcribed from `SERVICE PAGES_VOA.pdf`** for these three services; the other seven are untouched.

| Service | Systems |
| --- | --- |
| Mortgage & Loans | Mercury Nexus, Salestrekker, AFG FLEX, Infinity, MyCRM, BrokerEngine |
| Financial Planning | Xplan, AdviserLogic, Midwinter, Worksorted, Practifi |
| Accounting & Bookkeeping | Xero, MYOB, QuickBooks, SAP, Airwallex, Stripe |

Names are used exactly as supplied, including "AFG FLEX", "MyCRM", "BrokerEngine" and the lower-case
"p" in "Xplan" — note the PDF transcription had "XPlan", and the client's spelling now wins.

Service pages carry the full list in the constellation. **The home cards carry the first four**,
keeping the existing convention that the six cards stay visually even (see `homeContent.ts`) — no
names were invented or reordered, just truncated. If the client wants the full list on the home cards
too, it is one edit, but the cards will then be uneven.

Dropped from the previous lists and no longer shown anywhere: Connective, Mercury, Podium, Symmetry,
Flex, COIN, WealthSolver, Risk Researcher, CALM / XTools, Saasu, Microsoft Excel, Client Document
Systems. Worth confirming with the client that the omissions are intended rather than an incomplete
list.

### Client photographs (2026-09-27)

Delivered in `public/new` and moved to `public/assets/client/`, which keeps client-supplied assets
separate from the captured staging library and the sister-site fetches. `public/new` was deleted
afterwards, as instructed. Long upstream filenames were shortened; the mapping:

| In the repo | Delivered as |
| --- | --- |
| `hero/hero-video-call-team.jpg` | `employee-talking-workmates-online-video-call-meeting-discuss-business-project-woman-...webcam.jpg` |
| `hero/hero-tablet-office.jpg` | `male-female-business-people-working-tablet-office.jpg` |
| `hero/hero-project-analytics.jpg` | `project-team-collaborating-business-analytics.jpg` |
| `hero/hero-teamwork-meeting.jpg` | `teamwork-meeting-with-business-people.jpg` |
| `hero/hero-pexels-ivan-s-8117494.jpg` | `pexels-ivan-s-8117494.jpg` |
| `hero/hero-pexels-sora-shimazaki-5673503.jpg` | `pexels-sora-shimazaki-5673503.jpg` |
| `contact/contact-financial-charts.jpg` | `business-people-using-laptop-financial-charts-meeting-o.jpg` |
| `contact/contact-team-laptop.jpg` | `business-team-using-laptop-work.jpg` |
| `contact/contact-home-office-call.jpg` | `woman-video-conference-call-her-home-office-coronavirus-pandemic.jpg` |
| `contact/contact-handshake.png` | `image.png` |
| `extra/team-laptop-review.jpg` | `pexels-fauxels-3182835.jpg` |
| `extra/team-celebrating-agreement.jpg` | `group-asia-young-creative-people-...-teamwork-concept.jpg` |
| `extra/team-project-laptop.jpg` | `trendy-hipster-asian-creative-friend-...-digital.jpg` |
| `anne-villavieja.jpg` | `Founder/anne-villavieja-enhanced.jpg` |

**Home hero** is now 8 images: the two the client kept (the team meeting and the home-office laptop,
positions 2 and 4 of the old set) plus all six from `Hero`. **Closing contact sections** run their own
5: the home-and-laptop image plus all four from `Contact`. `contactBackgrounds` no longer aliases
`heroBackgrounds` — the two sets are now genuinely different.

**The three `Extra` photographs went to the worst duplicates**, since dropping three images from the
hero already resolved the rest:

| Page | Was | Now |
| --- | --- | --- |
| `/insights` hero | `1690.jpg`, also in the hero and contact rotations | `extra/team-laptop-review.jpg` |
| `/services/sales-marketing` hero | `job-5382501_1280.jpg`, also hero image 1 | `extra/team-celebrating-agreement.jpg` |
| `/services/it-technology` hero | `man-working-...-scaled.jpg` — the **same original photo** as the accounting service, just a different crop | `extra/team-project-laptop.jpg` |

**Founder portrait** replaced in both places it appears: the home "Australian-led, people-first
outsourcing company" section and the About page's Our Story. 1122x1402, noticeably sharper than the
staging capture.

**Still duplicated, needs one more photograph:** the About page hero shares `2149013955.jpg` with the
Executive & Administrative service card and service page — three uses of one image. Every Extra
photograph was spent on the duplicates above, so this one is flagged rather than fixed.

**The images were delivered at print resolution and have been resized for the web.** As supplied they
were 88 MB across 14 files, up to 7952x5304 and 18.5 MB each — nearly three times the size of the
entire repository history, and tens of megabytes on first paint.

Resized in place to a maximum width of 1920px at JPEG quality 82, using PowerShell's `System.Drawing`
(no new dependency; ImageMagick is not installed on this machine and `convert` resolves to the
Windows disk utility). **88 MB became 3.2 MB**, the largest file now 0.45 MB. Checked at full-bleed
hero size afterwards — no visible artefacts.

The originals are **not** in the repository. They were copied to this session's scratchpad before the
resize, which does not survive the session, so the client's delivery is the only remaining source of
the full-resolution files. Ask before deleting anything on their side.

Two caveats for production: `contact-handshake.png` is a 940x529 PNG at 0.45 MB and would be a
fraction of that as JPEG or WebP, and none of these have responsive `srcset` sources — a phone still
downloads the 1920px file.

### Client feedback image and contact backdrop framing (2026-09-27)

**Client feedback section** (home) now uses `client/contact/contact-team-laptop.jpg` — smiling people
around a laptop, which suits testimonials better than the lone remote worker it replaced. Note it is
also one of the five contact backdrops, though there it runs at 34% opacity behind copy, so the two
readings are quite different.

**Two contact backdrops were replaced, not reframed.** The backdrop is masked to show only its left
side, and two of the supplied contact photographs put their subject in the middle — a financial still
life with a blank curtain down its left third, and a handshake dead centre. At the default `cover` on
a section this wide the image scales to the container width, so there is no horizontal crop and
`background-position` does nothing; zooming past the crop to pan them in was tried first and the user
rejected it as still not visible and not a fit for the section.

| Replaced | With | Why |
| --- | --- | --- |
| `contact-financial-charts.jpg` | `client/hero/hero-teamwork-meeting.jpg` | People mid-discussion, with a figure at the far left |
| `contact-handshake.png` | `source/sister/virtualloansassistant-client-meeting.jpg` | A client consultation across a desk, subject on the left |

Both were chosen because their subjects sit on the left and need no framing values, and because a
conversation suits "Tell us where your business needs virtual support" better than a still life.

`contactBackgrounds` is `{ src, frame?, focus? }[]` and `RotatingBackdrop` still honours the two
optional properties, so a future image that needs panning can have it without another refactor —
nothing in the current set uses them.

**Every image in this rotation must carry its subject on the left.** That is the rule to apply when
the client sends replacements; a centred subject cannot be rescued by positioning alone here.

`contact-financial-charts.jpg` and `contact-handshake.png` are now unused. They are left in
`public/assets/client/contact/` rather than deleted, since the client supplied them.

### Tuning values, all in `themes.css` — the user set these by eye

| Token | Light | Dark |
| --- | --- | --- |
| `--hero-scrim` | 95 / 80 / 20% | 95 / 86 / 48% |
| `--glass-surface` | `rgb(255 255 255 / 34%)` | `rgb(16 34 53 / 40%)` |
| `--service-wash` | 0.2 | 0.22 |
| `--section-wash` | 0.34 | 0.34 |

### Rules learned from the review rounds

1. **"More prominent" is not decoration or heavier type.** W3-H1 was rejected twice — a tinted pill
   with a changed colour, then size-and-weight alone — before a plain "Call us" label worked.
2. **Copy over a photograph takes `var(--text)`, never `--muted`.** Applied to the hero lead, the
   figure labels and the closing-section lead.
3. **Controls over a photograph need their own border and fill**, or the hairline disappears.
4. **Ask before colouring more than was asked for.** The selected stage had its heading coloured
   orange as well as its title; only the title was wanted.
5. The user tunes opacity by eye and usually wants it **stronger** than the first attempt.

### Written text (screen-reader only, no visible copy)

`Background image 1-5`, `Choose a background image`, `Latest articles`,
`Scroll to earlier articles`, `Scroll to more articles`.

## Suggested build order

Grouped so each block is one reviewable unit, cheapest first where that does not create rework:

1. **W3-H1** — header phone. Smallest, isolated, no dependencies.
2. **W3-HP5, W3-HP6** — carousel counter and service-card image fix. Small, self-contained.
3. **The rotating-background engine: W3-HP1 + W3-HP2 + W3-HP4 + W3-HP10 + W3-G1 + W3-SP2 + W3-CON1.**
   One shared implementation, then applied. Doing this before the diagram work avoids building the
   same fade twice. W3-HP3 (moving the flowchart card) lands here because the hero changes anyway.
4. **W3-HP7 + W3-SV1** — the two hover-reveal behaviours. Same interaction pattern, same focus and
   touch problems to solve.
5. **The diagram conversions: W3-HP8, W3-SP1, W3-SP3, W3-MVS2.** The largest block; each needs its
   own modifier class and a mobile stack.
6. **The hero cuts: W3-MVS1, W3-ART1, W3-CST1.**
7. **W3-G2 + W3-HIW1** — process-page warmth and imagery. Last, because it depends on Q3 and Q4 and
   on where the flowchart card ended up.

## Resolved decisions (settled 2026-09-26, before implementation)

| Q | Affects | Decision |
| --- | --- | --- |
| Q1 | W3-HP3, W3-HIW1 | The hero flowchart card moves to `/how-it-works`, which also covers W3-HIW1 |
| Q2 | W3-HP5 | Remove the carousel counter **everywhere** (component-level); keep the arrow buttons |
| Q3 | W3-G2 | **Browser use approved for this item only:** visit the two sister sites with the Chrome tool, find suitable photographs and save them locally. Log every file taken so rights can be confirmed with the client |
| Q4 | W3-G2 | "Process pages" means `/how-it-works` and `/why-voa` |

Both **[Assumption]** tags above (W3-HP3, W3-HP5) are now **[Confirmed]** by these answers.

## Blocked on the client (carried over — not Week 3 work)

- Real hero photographs; everything assigned in Week 3 is a placeholder from the local library.
- High-resolution logo (Week 2 H4), approved videos, service client feedback, testimonial portraits,
  and rights or consent for client logos and any sister-site imagery.

## Written text

Nothing in this guide requires new user-facing copy as specified. If implementation forces a string —
a dot-navigation label, a table column header for W3-SP1, an expand/collapse label for W3-HP8 — it is
named in the report for that block, per the standing rule.
