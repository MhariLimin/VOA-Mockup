# Page 01B — Homepage priority: lower sections

Use this only after Page 01A is visually approved. Work only on `bolt/layout-enhance-1`.

Read only `src/pages/HomePage.tsx`, `src/content/homeContent.ts`, `src/components/ui/ClientCarousel.tsx` (read-only), and homepage-related selectors in `src/styles/global.css`.

Edit only `HomePage.tsx` and homepage-scoped rules in `global.css`. Do not alter the approved hero, evidence, introduction, or service section from Page 01A. Do not create files, hooks, components, dependencies, or modify another route.

Polish only the dark managed-difference section, process, client proof, insights, FAQs, and final contact section. Maintain compact component sizing, strong editorial rhythm, left-aligned readable copy, and source-grounded text. You may render the existing `ClientCarousel` without editing it. Do not introduce another carousel, new claims, or new sections.

Make one focused pass, run `npm run build` once, and stop. If it fails, report the error without an automatic repair loop. Wait for approval before Page 01C.
Before responding, perform the mandatory checkpoint from `claude.md`: commit this prompt's permitted changes and push only to `origin/bolt/layout-enhance-1`. Use `Bolt:` if complete and the check passed; use `WIP:` if incomplete or the check failed. Never push to `main`.
