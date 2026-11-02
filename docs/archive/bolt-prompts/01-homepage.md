# Page 01A — Homepage priority: hero through services

Work only on `bolt/layout-enhance-1`. This prompt authorizes one homepage pass only.

Read only:
- `src/pages/HomePage.tsx`
- `src/content/homeContent.ts`
- the homepage-related selectors in `src/styles/global.css`

Edit only `HomePage.tsx` and homepage-scoped rules in `global.css`. Treat `homeContent.ts` as read-only. Do not create files, hooks, components, dependencies, or modify the header, lower homepage sections, or another route.

Polish only the homepage hero, evidence strip, introduction, and six-service section. Prioritize premium hierarchy, balanced whitespace, controlled typography, an asymmetrical hero, and compact service cards. Preserve all existing text, links, and the six-item service mapping. Do not touch the dark difference section or anything below it. Add only simple CSS state transitions; animation polish belongs to Page 01C. Do not use oversized cards, invent claims, or add sections.

Make one focused pass. Run `npm run build` once afterward. If it fails, report the error and stop; do not start an automatic repair loop. Then stop and wait for visual approval before Page 01B.
Before responding, perform the mandatory checkpoint from `claude.md`: commit this prompt's permitted changes and push only to `origin/bolt/layout-enhance-1`. Use `Bolt:` if complete and the check passed; use `WIP:` if incomplete or the check failed. Never push to `main`.
