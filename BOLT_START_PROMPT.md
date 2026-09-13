# Prompt to paste after importing this repository into Bolt

Read `claude.md` and `docs/BOLT_REBUILD_BRIEF.md` completely before changing code.

This repository contains the approved Stage 1 layouts for the homepage and every retained route. Preserve its React/Vite/TypeScript architecture, route strategy, semantic tokens, separated navigation/content data, fixed header, local source assets, theme foundation, and verification scripts. Do not regenerate or replace the project.

First inspect the existing files and create a concise `IMPLEMENTATION_PLAN.md`. Then polish the existing homepage and reusable source-page families into one coherent premium direction while retaining every source-derived navigation destination in `src/content/navigation.ts`.

Use `src/content/sourcePages.ts` as the route and content model. The existing routes already have distinct responsive layouts; improve their composition, motion, and finish without reducing them to repeated templates. Preserve the source websites' page purpose and approved content, and do not recreate the WordPress visual styling.

Use the local files under `public/assets/source/staging/images/` and `public/assets/source/staging/blog-images/` before introducing any external image. The raw captured page text, 30 staging article bodies, lightweight blog index, split article files, and asset provenance are in `src/content/source/staging/`. Preserve the local `/insights/:slug` article routes. Do not fabricate testimonials, statistics, article bodies, video titles, staff biographies, or client outcomes.

Preserve and visually polish the accessible client carousel in `ClientCarousel.tsx`. It must advance by one client every two seconds, loop continuously, remain responsive, pause during pointer/keyboard interaction, provide Play/Pause and previous/next controls, and respect reduced-motion preferences. Do not replace the complete 30-client inventory with a smaller decorative logo set.

The only new public routes are `/thank-you` and the wildcard custom 404. Do not add Security & Continuity, Guides & Templates, standalone case studies, Privacy, Terms, Accessibility, Careers, or a public design-system route. Do not replace the official Virtual Office Angels logo with initials or a newly invented mark.

Use Motion/Framer Motion as the only animation library if needed and CSS transitions for simple states. Do not add a backend, database, authentication, CMS, WordPress/PHP code, or analytics SDK.

Keep cumulative usage below 500,000 tokens: stop adding features near 400,000 and stop all work by 450,000, preserving at least 50,000 tokens as margin. Avoid broad rewrites, duplicate components, unnecessary packages, repeated automated fixes, and multiple design variants.

Before stopping, run `npm run lint` and `npm run build`, verify the required responsive widths, themes, navigation, keyboard behaviour, fixed-header clearance, reduced motion, and zero horizontal overflow. Report completed work, checks, known limitations, and approximate tokens used. Do not publish.
