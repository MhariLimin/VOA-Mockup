# Virtual Office Angels project context

This file is the authoritative handoff for AI-assisted work in this repository. Read it before inspecting or changing code, then read `docs/SESSION_HANDOFF.md`, which carries the current page-by-page state, the working method the user expects, and the open client items. Where the two disagree on what is built today, the session handoff is newer. The older Bolt prompts and rebuild brief are historical artifacts only; they are not current instructions.

## Current outcome and direction

- The client selected **Mock Layout 1**. The approved implementation lives on `main`.
- Preserve Layout 1's identity. Do not redesign it into Layout 2, resurrect rejected Bolt concepts, or make broad visual changes without a current user request.
- The present application is a design prototype deployed on Vercel. The exact production-preview URL is not recorded in the repository and must not be guessed.
- The next intended production direction is a **custom WordPress theme** that closely reproduces Layout 1. WordPress is not expected to redesign the site manually.
- The React/Vite site remains the visual and behavioral reference until the WordPress version is approved.
- Original source sites:
  - Production: `https://virtualofficeangels.com.au/`
  - Staging reference: `https://virtualofficeangels.com.au/stagingsite2/`
- The client demo has already happened and Layout 1 was selected afterward. This decision supersedes earlier exploratory briefs.
- Later explicit user decisions supersede `WEBSITE_REVIEW.md`, the Bolt files, reference-site ideas, and earlier mockup proposals whenever they conflict.
- Do not modify the live WordPress sites, Vercel deployment, GitHub remote, DNS, or external accounts unless the user explicitly requests that external action.

## Repository and Git state at handoff

- Repository: `https://github.com/MhariLimin/VOA-Mockup.git`
- Selected branch: `main`
- `main` was synchronized with `origin/main` before this handoff was prepared. The expected uncommitted changes after preparation are this context file and `docs/WEEK_2_ACTION_PLAN.md`; treat them as user-owned documentation.
- Recorded HEAD when this file was first written: `b351731`. Week 2 then added `69f6a64`, `d4ff43f`, `fcf6558`, `c1e6563`, `5d11b21`, `15857eb`; see `docs/SESSION_HANDOFF.md` for the current branch table.
- Other branches:
  - `legacy-w1` and `legacy-w2`: rollback points taken at the end of weeks 1 and 2. Do not develop on them.
  - `mock-layout-2`: rejected alternate design as a whole. Specific components named in `docs/MOCKUP_1_REVISION_GUIDE.md` were adopted deliberately; do not copy anything else from it.
  - `bolt/layout-enhance-1`: historical Bolt work already merged as applicable; it is no longer the required working branch.
- Before editing, run `git status --short --branch`. Preserve unrelated user changes.
- Do not commit, push, merge, deploy, create branches, or change remote state unless the user explicitly asks.
- Do not use the old Bolt rule that every task must be committed and pushed. That rule is obsolete.

## Adjacent workspace material

The repository sits inside `E:\_Yua\VOA\Mock Layout`. Its parent directory contains research and historical material:

- `WEBSITE_REVIEW.md`: the original audit and creative-direction research. It contains useful evidence, but later client/user decisions override it.
- `current-home.png`, `staging-home.png`, and `staging-home-mobile.png`: early source-site captures.
- `reference-assista.png`, `reference-athena.png`, `reference-prialto.png`, and `reference-somewhere.png`: visual benchmarks only. Do not copy their identity or assume their content/claims belong to Virtual Office Angels.
- `image.png` through `image5.png`: screenshots used during prior feedback, including Layout 2 work. Do not treat them as current Layout 1 requirements without confirmation.
- Parent-level `BOLT_MASTER_PROMPT.md` and `BOLT_REBUILD_BRIEF.md`: obsolete Bolt handoff material.
- Sibling `VOA Content/`: a different static proposal/build with its own `dist` workflow. It is not the selected `VOA Layout 1` application and must not be merged into or edited as part of this project unless explicitly requested.

The user previously stopped a page-screenshot exercise and requested removal of the generated screenshots directory. Capture scripts remain in this repository, but do not regenerate a full screenshot set unless asked.

## Technology and commands

- React 18.3, TypeScript, Vite 6, React Router 6.
- No CMS or working backend exists in this repository yet.
- Install existing dependencies with `npm install` when necessary; do not add or upgrade production dependencies without approval.
- Development: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Staging-source synchronization scripts exist, but they access external source sites and can overwrite generated source data. Do not run them unless specifically requested:
  - `npm run sync:staging`
  - `npm run sync:blogs`
  - `npm run sync:clients`
- Vercel SPA routing is configured in `vercel.json`.

Baseline verification performed while preparing this handoff:

- `npm run lint`: passed.
- TypeScript and Vite production build: passed when output was directed to a temporary directory.
- The first normal build attempt could not clear an existing `dist` asset because the current sandbox denied deletion (`EPERM`); this was an environment/file-permission issue, not a TypeScript or bundling failure. Do not delete `dist` destructively to work around it.

## Important source files

- `src/app/App.tsx`: route registration.
- `src/pages/HomePage.tsx`: approved Layout 1 homepage composition.
- `src/pages/SourcePage.tsx`: shared rendering for About, service, process, Why VOA, client stories, insights, videos, FAQ, and contact pages.
- `src/pages/BlogArticlePage.tsx`: local article-detail pages and next-article navigation.
- `src/components/layout/Header.tsx`: fixed header, responsive menu, click-operated dropdowns, theme switcher, and CTA.
- `src/components/layout/PageShell.tsx`: scroll reset, hash navigation, and cross-page reveal animation observer.
- `src/components/ui/ClientCarousel.tsx`: local client-logo carousel; advances every 1 second and pauses for hover/focus. There is no pause button.
- `src/components/ui/ContactForm.tsx`: prototype form only; it is not connected to email, storage, spam protection, or WordPress.
- `src/content/navigation.ts`: header navigation and destinations.
- `src/content/sourcePages.ts`: page inventory and nine service definitions.
- `src/content/homeContent.ts`: homepage services, proof points, process steps, and summary FAQs.
- `src/content/blogContent.ts`: lightweight article catalogue and lazy detail loading.
- `src/content/testimonials.ts`: four currently represented source testimonials.
- `src/content/faqContent.ts`: twelve source FAQs.
- `src/content/source/staging/`: captured source content and metadata.
- `public/assets/source/staging/`: downloaded source images, article images, and client logos.
- `src/styles/tokens.css`, `themes.css`, `typography.css`, and `global.css`: visual system and responsive/animation implementation.

## Current page and content inventory

Routes are generated through React Router:

- `/`
- `/about` with `#story` and `#leadership` sections
- Ten service routes:
  - `/services/mortgage-loans`
  - `/services/financial-planning`
  - `/services/accounting-bookkeeping`
  - `/services/insurance-processing`
  - `/services/real-estate-conveyancing`
  - `/services/back-office-admin`
  - `/services/digital-marketing`
  - `/services/sales-marketing`
  - `/services/creative-copywriting`
  - `/services/it-technology`
- `/how-it-works`
- `/why-voa`
- `/client-stories`
- `/insights`
- `/insights/:slug` for 30 local article-detail routes
- `/videos`
- `/faqs`
- `/contact`
- `/thank-you`
- Custom not-found route

`/services` is live again: the user reinstated it (revision HP1) and it renders through `ServicesPage` in `SourcePage.tsx`. The Services mega menu shows all ten destinations in two columns of five, using the labels from `SERVICE PAGES_VOA.pdf`. Renamed services keep their original URLs (Executive & Administrative at `/services/back-office-admin`, Sales & E-Commerce at `/services/sales-marketing`, Copywriting at `/services/creative-copywriting`); settle naming with a redirect map at WordPress migration.

The staging source presented six primary services. The client has since supplied full content for all ten in `SERVICE PAGES_VOA.pdf`, so the earlier "production-only, unconfirmed" flags have been removed. Do not invent scope beyond that document.

Captured local source library at handoff:

- 30 client entries/logos.
- 30 article JSON files and their local detail routes.
- 116 general staging images.
- 39 blog-image files.
- These counts describe captured files, not final approval for publication.

## Approved Layout 1 design intent

- Professional, minimalist, credible, and suitable for attracting international clients while retaining the Australian-managed positioning.
- Short, high-impact copy instead of long walls of promotional text.
- Retain the source websites' business direction, information, navigation concepts, and factual content while presenting them more professionally.
- Avoid a generic WordPress-template appearance.
- Use restrained section sizing, readable line lengths, standard indentation, and compact cards rather than oversized typography or boxes.
- Preserve the real Virtual Office Angels logo; never replace it with plain `VOA` lettering. The current local logo has a transparent background.
- Fixed header remains visible while scrolling.
- Header dropdowns open on hover on pointer devices, and stay click/Enter to open and Escape to close for keyboard and touch (revision H1, which supersedes the earlier click-only rule). Do not silently change this interaction.
- Light/dark theme uses `data-theme` and `localStorage` key `voa-theme`.
- Motion includes visible scroll reveals, staggered cards, hover elevation, carousel movement, and page-section entry animation.
- Always preserve `prefers-reduced-motion` behavior and keyboard accessibility.
- Cards and containers use visible shadow/elevation and hover lift without becoming exaggerated.
- All user-facing company references should say **Virtual Office Angels**, not the abbreviation `VOA`.
- Source content must not be replaced with invented claims, metrics, testimonials, people, awards, certifications, or client results.

## Homepage composition currently implemented

Rebuilt during week 2 to follow the deployed VOA Content proposal (`https://voa-mockup.vercel.app/`). In order:

1. Hero: "Get Specialised & HR Managed Virtual Support!", the deployed description, two CTAs, and the four-figure row.
2. Client-logo trust carousel under "Trusted by leading Australian businesses."
3. Six compact service cards under "Virtual support tailored around your industry, systems and standards."
4. "More than recruitment" dark section: "What is an HR Managed Virtual Support Solution?", four stage cards, and links to How It Works and Managed Virtual Support. This single section replaced the former separate "Managed virtual support" band and "How it works" summary.
5. Founder section: "Australian-led, people-first outsourcing company" / "Built on HR expertise and first-hand market experience."
6. "Insights and resources" with three article previews.
7. "Client feedback" media section with three shortened testimonial previews.
8. FAQs: the five deployed questions and answers.
9. "Let's talk" direct contact form.

Section headings highlight specific words in `--heading-accent` through `main h2 em`, matching the words the deployed site colours.

Historical duplicate founder markup still exists under `.legacy-home-founder` but is hidden by CSS. Treat this as a cleanup candidate only if it is within an approved task; do not alter the visible design incidentally.

## Explicit decisions made during Layout 1 iteration

- Only two proposed utility pages were retained: the form-submission/Thank You page and the custom 404 page. Do not reintroduce other speculative pages.
- The standalone Services Overview page was removed, then reinstated by the user in revision HP1. `/services` is live; keep it.
- The homepage client carousel must appear directly after the hero, use the complete local client set, advance every 1 second, and have no pause button. The current intentional pause-on-hover/focus behavior supports usability.
- The old repeated blue “Ready to Start” CTA panels were rejected. Relevant pages use a direct contact form instead. The internal function name `FinalCta` is historical; its rendered content is a contact form.
- Homepage testimonial previews should remain compact, visually elevated, consistently sized, shortened with an ellipsis, and link to the full testimonials page.
- Real profile photos were requested for testimonials, but verified portraits are not currently available. Initials are placeholders; never generate or assign fake portraits.
- The homepage founder section (now “Australian-led, people-first outsourcing company”) carries the summary and portrait. The detailed founder narrative belongs in the About page’s leadership section rather than being repeated as page-hero decoration.
- Each service page should retain a relevant, service-specific image. Avoid generic repeated hero imagery.
- Our Story and Founder & Leadership must remain distinct narratives; do not duplicate the same copy between them.
- Insights previews and article pages must use local source article content and images, not outbound links back to the staging site. Article detail pages include next-article navigation.
- Client Stories must use the broader local client/logo library and retain meaningful testimonial text rather than becoming only a logo wall.
- FAQ content should follow verified source content rather than generic invented answers.
- Contact forms replace redundant generic calls to action, but they are still prototypes until production handling is implemented.
- The dark theme must include the header and navigation surfaces, not only page content.
- Avoid giving every page the same oversized hero formula. Page openings should fit the content type while maintaining consistent navigation and spacing.

## Known prototype limitations and validation items

- Contact forms currently navigate to `/thank-you`; there is no real form submission, server-side validation, consent record, email delivery, or spam protection.
- Video cards are placeholders pending approved video URLs, captions, and transcripts. They render a “Coming soon” player-style poster (`VideoPoster`), not a real thumbnail.
- Testimonial “avatars” are initials, not verified client portraits, and the service-page feedback cards use a generic icon with the document’s own “feedback currently being gathered” placeholder. Do not fabricate photographs or quotes.
- Source testimonials, logos, founder biography, company details, service scope, and images require final client approval for accuracy, rights, and consent.
- All ten services now have client-supplied content. What still needs confirmation is the route naming for the renamed services and for `/why-voa`.
- `index.html` has one generic prototype title and description. Route-specific production SEO is not implemented.
- The SPA depends on the Vercel rewrite for direct route loading.
- The design tokens name Manrope and Inter, but no webfont loading was found at handoff; browsers may use system fallbacks. Record this in the audit and confirm font licensing/source before production.
- The duplicated testimonial data and contact-form markup in `SourcePage.tsx` were removed; both now come from `src/content/testimonials.ts` and `src/components/ui/ContactForm.tsx`.
- `ServicesPage` in `SourcePage.tsx` is **live** — it renders the `/services` index. Do not remove it as dead code. A fallback branch for services without a `serviceDetails` entry is unused while all ten are defined.
- The homepage contains hidden legacy founder markup. Confirm visual and content parity before removing it in a focused cleanup.
- Multiple page templates use the historically named `FinalCta`, but it renders the requested contact form. Judge rendered behavior, not the function name.
- Some historical Bolt prompt files may describe abandoned or superseded requests. Never treat them as the current backlog.
- Review the actual rendered UI before declaring a visual defect; do not infer appearance only from class names.

## How the user runs this project

Read `docs/SESSION_HANDOFF.md` section 7 in full before implementing anything. In short:

- Requests arrive **per page or per section**, often as a screenshot, a pasted phrase from the deployed VOA Content site, or a short list of gripes. Turn them into numbered, independently checkable items before coding — `docs/MOCKUP_1_REVISION_GUIDE.md` is the pattern, including its [Confirmed] / [Assumption] / [Blocked] tags and its legend for the user's shorthand.
- Ask the open questions **in one batch** before implementing, and recommend a default rather than listing neutral options.
- Implement **one page or category at a time**, verify, report, and wait for approval before the next.
- Build new sections from existing markup and classes; scope new CSS to a modifier class rather than restyling shared components; keep motion, reduced-motion and keyboard behaviour intact.
- Never invent user-facing copy, and name every string that had to be written.
- Replies are bullets and short sections: outcome, changed files, verification actually run, then decisions needed. State plainly what was not checked.
- Commit only when asked; never push.

## WordPress production recommendation

The agreed recommendation is a custom **hybrid WordPress theme**, not an Elementor recreation and not a direct upload of the React repository.

WordPress was recommended for operational reasons: the client can manage pages, articles, media, menus, forms, redirects, and SEO tooling in the existing WordPress ecosystem. Vercel is technically capable of production SEO, but the current Vite SPA would need additional CMS, form, metadata/rendering, redirect, and editorial infrastructure. Do not claim that WordPress automatically improves rankings or that Vercel cannot support SEO.

- PHP templates generate the WordPress markup and content.
- `theme.json` defines global colour, typography, spacing, and editor settings.
- Gutenberg supplies controlled content editing and reusable patterns.
- CSS, imagery, responsive design, shadows, hover effects, and most animations can transfer substantially unchanged.
- React Router becomes WordPress pages, posts, permalinks, and the template hierarchy.
- React-only state/hooks are rewritten as small accessible JavaScript modules.
- Header navigation should use WordPress menus.
- Articles become WordPress posts with their slugs, dates, categories, content, and featured images preserved.
- Services may use a shared template and structured fields; choose Pages versus a Service post type in the architecture document based on editing needs.
- Forms require real WordPress handling, SMTP, spam protection, consent behavior, and a verified recipient.
- Yoast SEO may be configured after the content model and URLs are settled. Premium licences should not be assumed.
- Preserve important existing production URLs and prepare a redirect map before cutover.
- Build and test in private WordPress staging. Never convert directly on the live website.
- A theme ZIP transfers presentation only; site content, media, menus, forms, SEO configuration, and redirects require a separate migration/configuration step.

Suggested theme shape for planning—not authorization to build every file immediately:

```text
wordpress-theme/virtual-office-angels/
  style.css
  functions.php
  theme.json
  header.php
  footer.php
  front-page.php
  page.php
  single.php
  archive.php
  404.php
  page-templates/
  template-parts/
  assets/css/
  assets/js/
  assets/images/
```

## Current Week 2 plan: 20 hours

The next Claude session should support these tasks in order. Time entries are planning/accountability estimates, not a request to pad work or fabricate activity.

The plan depends on receiving the actual meeting-change list and Paola's approved content. If those inputs have not been supplied, Claude may audit, document, research, and prepare architecture, but must not invent the missing revisions or content to consume the allocated hours.

1. **Mockup revisions from the client meeting — 4h**
   - Implement only confirmed feedback.
   - Preserve Layout 1 and verify desktop/mobile, both themes, motion, and reduced-motion behavior.
   - Deliverable: focused code changes plus lint/build evidence and a short change log.

2. **Content integration with VA Paola — 4h**
   - Integrate only content/assets supplied or approved by the client/Paola.
   - Track missing copy, uncertain facts, image rights, testimonial/logo consent, and unresolved service scope.
   - Deliverable: updated content and a content approval/issues list.

3. **WordPress, SEO, and GEO implementation research — 2h**
   - Confirm the custom hybrid-theme approach, hosting/staging needs, editability plan, SEO/GEO requirements, forms, performance, and migration risks.
   - Use current primary documentation for time-sensitive technical claims.
   - Deliverable: a short recommendation/decision record, not a generic essay.

4. **Website content and asset audit — 3h**
   - Inventory every route, article, source URL, destination URL, image, logo, testimonial, FAQ, video, form, internal/external link, and reusable section.
   - Identify duplicates, missing assets, staging-site links, broken links, low-quality imagery, placeholders, and items requiring approval.
   - Deliverable: a structured migration inventory/checklist with status and source-of-truth columns.

5. **WordPress theme and content architecture — 3h**
   - Map React routes/components to WordPress templates, posts/pages, structured fields, menus, taxonomies, media, and editable regions.
   - Define permalink/redirect strategy and distinguish theme responsibilities from plugin responsibilities.
   - Deliverable: an implementation-ready architecture document and React-to-WordPress mapping.

6. **Custom WordPress theme foundation — 3h**
   - Do this only after the audit and architecture are accepted or the user explicitly instructs implementation.
   - Create an isolated starter theme without replacing or destabilizing the React reference app.
   - Register theme support, menus, asset loading, editor/global tokens, and skeletal templates; do not pretend the site is converted.
   - Deliverable: an installable starter theme that activates cleanly in a local/staging WordPress instance.

7. **Documentation and progress report — 1h**
   - Record completed work, commands/check results, outstanding client inputs, decisions, risks, and the recommended next task.
   - Deliverable: concise handoff/progress documentation.

## Client inputs still needed

- Written confirmation that Layout 1 is the final design reference.
- Final copy and assets coordinated through VA Paola.
- High-resolution transparent logo, favicon, original founder portrait, licensed fonts, and approved photographs.
- Approval/permission for client logos, named testimonials, and any client portraits.
- Confirmation of the final six-versus-nine service inventory and exact service scope.
- Approved video URLs/files, captions, and transcripts.
- WordPress administrator access and client-owned managed WordPress hosting with staging, SSL, backups, logs, and restore capability.
- Domain/DNS access only when launch is authorized.
- Contact-form recipient, retention/consent requirements, and SMTP/email-service access.
- Privacy policy, terms, and cookie-consent requirements.
- Google Analytics, Search Console, Tag Manager, and Google Business Profile access if applicable.
- SEO targets: priority services, locations, industries, audiences, and any existing keyword/redirect reports.
- Client-owned GitHub and AI-development access when required. Never request shared passwords; ask for user invitations with least privilege.
- One authorized decision-maker and agreed approval checkpoints.

## Working rules for the next agent

- Start read-only: report branch/status and summarize the requested task before editing.
- Treat this file and the current user message as authoritative. The current user message wins if it explicitly changes scope.
- Do not execute all 20 hours of work from a vague “continue” instruction. Establish the next concrete deliverable and complete it carefully.
- Keep the React reference operational while WordPress planning/conversion happens in an isolated directory or user-approved branch.
- Make focused patches and avoid unrelated refactors or formatting churn.
- Do not scrape the source sites or rerun synchronization scripts unless explicitly requested.
- Do not add production dependencies or paid plugins without explaining the need and receiving approval.
- After code changes, run the most relevant available checks and report exact results. Never claim a check passed if it was not run.
- Never expose secrets or inspect real credential files.
- Surface factual conflicts instead of silently choosing a version.
- Keep communication concise. Lead with outcomes, changed files, verification, and remaining blockers.
