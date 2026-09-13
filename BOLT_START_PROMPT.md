# Prompt to paste after importing this repository into Bolt

Read `claude.md` and `docs/BOLT_REBUILD_BRIEF.md` completely before changing code. Treat this prompt as the latest instruction wherever older wording is ambiguous.

## Branch boundary

Perform all Bolt work only on the `bolt/layout-enhance-1` branch. Before editing, confirm that this is the checked-out branch. Do not edit, commit to, merge into, rebase, reset, or push directly to `main`; `main` is owned and controlled by the project team. If `bolt/layout-enhance-1` is unavailable or cannot be selected, stop and report the issue without modifying files. Do not create or use another working branch unless the project team explicitly instructs you to do so.

This repository contains the approved Stage 1 layouts for the homepage and every retained route. Preserve its React/Vite/TypeScript architecture, route strategy, semantic tokens, separated navigation/content data, fixed header, local source assets, theme foundation, and verification scripts. Do not regenerate or replace the project.

First inspect the existing files and create a concise `IMPLEMENTATION_PLAN.md`. Then polish the existing homepage and reusable source-page families into one coherent premium direction while retaining every source-derived navigation destination in `src/content/navigation.ts`. Produce one design direction only; do not repeatedly redesign completed sections.

Use `src/content/sourcePages.ts` as the route and content model. Improve composition, motion, and finish without reducing routes to repeated templates or putting the same oversized hero on every page. Preserve the source websites' page purpose and approved content, and do not recreate the WordPress visual styling.

Keep the homepage substantial: summarize the company, its six primary staging-site services, managed-support difference, process, client proof, FAQs, and contact path. Keep homepage service cards compact. Retain all nine source-derived service destinations in the full Services overview and navigation.

Give every service page an accurate local service image. Replace or omit repetitive generic CTA pairs such as "Get Started Today" and "Explore Services" in favour of contextual actions. Keep Our Story and Founder & Leadership distinct, retain their fuller source-grounded content, and place the founder portrait in the Founder & Leadership content rather than repeating it in both About heroes. Keep longer Client Stories copy left-aligned and preserve the source FAQ content.

Use the local files under `public/assets/source/staging/images/` and `public/assets/source/staging/blog-images/` before introducing any external image. The raw captured page text, 30 staging article bodies, lightweight blog index, split article files, and asset provenance are in `src/content/source/staging/`. Preserve the local `/insights/:slug` article routes, use each article's corresponding local image, and never link visitors back to the staging website. Do not fabricate testimonials, statistics, article bodies, video titles, staff biographies, or client outcomes.

Preserve and visually polish the accessible client carousel in `ClientCarousel.tsx`. This is the sole approved looping-carousel exception. It must advance by one client every two seconds, loop continuously, remain responsive, pause during pointer/keyboard interaction, provide Play/Pause and previous/next controls, and respect reduced-motion preferences. Do not replace the complete 30-client inventory with a smaller decorative logo set or add other marquees/carousels.

The only new public routes are `/thank-you` and the wildcard custom 404. Do not add Security & Continuity, Guides & Templates, standalone case studies, Privacy, Terms, Accessibility, Careers, or a public design-system route. Preserve the official Virtual Office Angels logo, display it without a visible white image background, and never replace it with initials or an invented mark. In normal visible copy, use the full company name "Virtual Office Angels" rather than repeatedly shortening it to "VOA".

Keep the header fixed throughout scrolling with correct content clearance, precise alignment, comfortable spacing, and one primary CTA. Desktop dropdowns must open by click, not hover alone, and support keyboard navigation, Escape, outside-click closing, visible focus, and correct ARIA state. Use an accessible mobile accordion/menu.

Use Motion/Framer Motion as the only animation library if needed and CSS transitions for simple states. Do not add a backend, database, authentication, CMS, WordPress/PHP code, or analytics SDK.

Total Bolt usage must never exceed 300,000 tokens. Keep planning concise, stop adding features at 240,000 tokens, and stop code changes at 270,000 tokens, reserving at least 30,000 tokens for verification and reporting. If usage approaches 270,000, finish the current safe edit, run the required checks, and report remaining work instead of continuing. Avoid broad rewrites, duplicate components, generated filler, unnecessary packages, repeated automated-fix loops, and multiple design variants.

Before stopping, run `npm run lint` and `npm run build`, verify the required responsive widths, themes, navigation, keyboard behaviour, fixed-header clearance, reduced motion, and zero horizontal overflow. Confirm that all changes and commits remain on `bolt/layout-enhance-1`. Report completed work, checks, known limitations, and approximate tokens used. Do not publish, merge into `main`, or push to `main`.
