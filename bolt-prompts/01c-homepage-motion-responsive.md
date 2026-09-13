# Page 01C — Optional homepage motion and responsive polish

Use this only after Pages 01A and 01B are approved. Work only on `bolt/layout-enhance-1`.

Read and edit only `src/pages/HomePage.tsx` and homepage-scoped rules in `src/styles/global.css`. Do not edit content, shared components, the header, or another route. Do not create files, hooks, components, or dependencies.

Do not redesign or restructure the homepage. Add restrained CSS-only interaction and responsive refinements to the approved layout: clear hover/focus feedback, a short one-time hero connection animation if it can be implemented without React state, stable layouts at 320/390/768/1024/1440 px, and reduced-motion overrides. Avoid generic fade-up effects, continuous motion, layout shift, parallax, and oversized mobile spacing.

Make one focused pass, run `npm run build` once, and stop. If it fails, report the error without automatically repairing unrelated code.
Before responding, perform the mandatory checkpoint from `claude.md`: commit this prompt's permitted changes and push only to `origin/bolt/layout-enhance-1`. Use `Bolt:` if complete and the check passed; use `WIP:` if incomplete or the check failed. Never push to `main`.
