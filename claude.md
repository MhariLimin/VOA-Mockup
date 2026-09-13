# Bolt project instructions

Read `docs/BOLT_REBUILD_BRIEF.md` before making changes. It is the authoritative Stage 1 product and design brief.

## Non-negotiable rules

- Plan first in `IMPLEMENTATION_PLAN.md`, then implement Stage 1 without broadening scope.
- Keep cumulative Bolt usage below 500,000 tokens. Stop adding features at 400,000 and stop work at 450,000 to preserve a 50,000-token safety margin.
- Build the homepage, shared layout/navigation/footer, reusable source-page families, meaningful motion, Thank You page, and custom 404.
- Do not build a backend, database, authentication, or WordPress/PHP theme.
- Preserve every source-derived VOA navigation destination in `src/content/navigation.ts`.
- Use `src/content/sourcePages.ts` to retain source purpose/content while fully redesigning the presentation.
- Do not create repetitive placeholder pages. The only new public routes are `/thank-you` and the custom 404.
- Preserve the official Virtual Office Angels logo; never substitute an invented logo or a text-only `VOA` mark.
- Do not invent people, client names, logos, testimonials, metrics, certifications, awards, or compliance claims.
- Keep content separate from presentation for later WordPress conversion.
- Use Manrope for headings and Inter for interface/body text.
- Keep the header fixed at all scroll positions and prevent it from covering content.
- Support complete light and dark themes and `prefers-reduced-motion`.
- Meet WCAG 2.2 AA and prevent horizontal overflow down to 320 px.
- Reuse the existing architecture and components. Avoid broad rewrites of working files.
- Run `npm run lint` and `npm run build` before reporting completion.
