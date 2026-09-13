# Bolt project instructions

Read `docs/BOLT_REBUILD_BRIEF.md` before making changes. It is the authoritative Stage 1 product and design brief.

## Branch boundary

- Work only on the `bolt/layout-enhance-1` branch and confirm it is checked out before modifying files.
- Never edit, commit to, merge into, rebase, reset, or push directly to `main`; `main` is controlled by the project team.
- If `bolt/layout-enhance-1` is unavailable, stop and report the issue without modifying files. Do not substitute another branch unless explicitly instructed.

## Non-negotiable rules

- Plan first in `IMPLEMENTATION_PLAN.md`, then implement Stage 1 without broadening scope.
- Total Bolt usage must never exceed 300,000 tokens. Stop adding features at 240,000 and stop code changes at 270,000, preserving at least 30,000 tokens for verification and reporting.
- Build the homepage, shared layout/navigation/footer, reusable source-page families, meaningful motion, Thank You page, and custom 404.
- Do not build a backend, database, authentication, or WordPress/PHP theme.
- Preserve every source-derived VOA navigation destination in `src/content/navigation.ts`.
- Use `src/content/sourcePages.ts` to retain source purpose/content while fully redesigning the presentation.
- Do not create repetitive placeholder pages. The only new public routes are `/thank-you` and the custom 404.
- Preserve the official Virtual Office Angels logo; never substitute an invented logo or a text-only `VOA` mark.
- Display the official logo without a visible white image background, and use the full company name in normal visible copy instead of repeatedly abbreviating it.
- Do not invent people, client names, logos, testimonials, metrics, certifications, awards, or compliance claims.
- Keep content separate from presentation for later WordPress conversion.
- Use Manrope for headings and Inter for interface/body text.
- Keep the header fixed at all scroll positions and prevent it from covering content.
- Open desktop dropdowns by click rather than hover alone, with complete keyboard, Escape, outside-click, focus, and ARIA behaviour.
- Keep six primary services on the homepage and all nine source-derived service destinations in navigation and the Services overview.
- Avoid repeated oversized heroes and repeated generic CTA pairs across service pages; use accurate local imagery and page-specific composition.
- Preserve the two-second accessible client carousel as the sole looping-carousel exception.
- Support complete light and dark themes and `prefers-reduced-motion`.
- Meet WCAG 2.2 AA and prevent horizontal overflow down to 320 px.
- Reuse the existing architecture and components. Avoid broad rewrites of working files.
- Run `npm run lint` and `npm run build` before reporting completion.
