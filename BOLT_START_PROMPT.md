# Bolt import safety prompt

Paste this prompt in **Discussion or Plan mode**, not Build mode.

---

This is an imported, working React/Vite repository. Do not edit files, run commands, install packages, scan the repository, implement the rebuild brief, or start a general improvement pass.

Confirm only these three things:

1. The selected Git branch is `bolt/layout-enhance-1`.
2. `src/pages/HomePage.tsx` exists.
3. You are ready to receive one narrowly scoped page prompt.

Use no more than three file checks. Do not open article JSON, image assets, `package-lock.json`, the complete rebuild brief, or unrelated source files. Reply with only the branch name, the homepage-file result, and `READY FOR PAGE 01`.

Never modify, commit to, merge into, rebase, reset, or push to `main`. If the selected branch is not `bolt/layout-enhance-1`, stop immediately without changing anything.

If Bolt reports that the token allowance is nearly exhausted during any later build task, stop editing immediately and preserve all current task-related changes, complete or incomplete, by committing them with a `WIP:` message and pushing only to `origin/bolt/layout-enhance-1`. Do not test, debug, clean up, revert, or produce a long response before making that emergency checkpoint.

After every later page prompt, whether completed or incomplete, commit that prompt's task-related changes and push them only to `origin/bolt/layout-enhance-1` before responding. Use a `Bolt:` commit prefix when complete and a `WIP:` prefix when incomplete or when the permitted check fails. Never push to `main`.

After this acknowledgement, I will paste one prompt at a time from `bolt-prompts/`. Never execute multiple page prompts together and never infer permission to work beyond the current prompt.
