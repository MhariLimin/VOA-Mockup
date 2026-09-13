# Bolt page prompt sequence

Use these prompts one at a time. Never paste the whole folder into chat.

1. Paste `BOLT_START_PROMPT.md` in Discussion or Plan mode. It performs no edits.
2. After Bolt replies `READY FOR PAGE 01`, switch to Build mode and paste `01-homepage.md` for only the hero through services.
3. Review that result before using `01b-homepage-lower-sections.md`.
4. Use `01c-homepage-motion-responsive.md` only after the complete homepage layout is approved.
5. Continue to Page 02 and later prompts only when account usage allows. Every prompt is another paid AI operation.
6. If a response is interrupted, do not say “continue where you stopped.” Restore the last good Bolt version or provide a new narrow prompt naming only the unfinished files.

If Bolt displays a low-token or near-limit warning during a task, it must stop work and immediately commit all current task-related changes—even incomplete ones—with a `WIP:` message, then push only to `origin/bolt/layout-enhance-1`. If the push cannot be completed, preserve the Bolt workspace state and report that it is not yet on GitHub. Never discard partial work and never push it to `main`.

Every page prompt ends with a mandatory Git checkpoint. When the task succeeds, commit its permitted changes with a `Bolt:` message and push to `origin/bolt/layout-enhance-1`. When it is incomplete or its permitted check fails, commit the partial state with a `WIP:` message and push the same branch. Never stage unrelated changes, create empty commits, or push to `main`.

The prompts are separated by page or reusable page family to prevent a site-wide autonomous pass. Service detail routes and article routes intentionally share one prompt each because they use one component template; processing every route separately would waste tokens and create inconsistent layouts.

`16-final-verification.md` is optional and should run only after the desired page prompts are complete.
