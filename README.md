# VOA Layout 1

Stage 1 design prototype for the Virtual Office Angels website rebuild.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Scope

This repository contains the responsive React/Vite/TypeScript layout for the homepage, every retained source-page route, the thank-you page, and the custom 404. Source content and downloaded staging assets are stored locally so Bolt can focus on visual polish instead of rebuilding the information architecture.

The six services highlighted by the staging website are presented as the primary homepage set. Three additional service routes from the production website remain in the full Services directory and are labelled for client confirmation.

Bolt should refine this implementation rather than regenerate it. The 30 articles shown on the staging Blogs page, their detail routes, and their source images are included locally. Final approved video embeds remain migration work.

## Safe Bolt workflow

After importing the `bolt/layout-enhance-1` branch, paste [`BOLT_START_PROMPT.md`](BOLT_START_PROMPT.md) in Discussion or Plan mode. It performs a no-edit branch and file check. Then use the numbered files in [`bolt-prompts/`](bolt-prompts/) one at a time, beginning with the homepage. Never paste the full prompt pack or request a site-wide continuation.

`claude.md` contains the permanent branch and scope guardrails. The files in `docs/` remain design reference, not authorization for an autonomous full-site pass.
