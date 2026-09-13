# Bolt project guardrails

## Branch boundary

- Work only on `bolt/layout-enhance-1` and confirm it is selected before every edit.
- Never edit, commit to, merge into, rebase, reset, or push to `main`.
- If the required branch is unavailable, stop without modifying files.

## Scope boundary

- Never treat this file or `docs/BOLT_REBUILD_BRIEF.md` as authorization to implement the whole website.
- Work on exactly one prompt from `bolt-prompts/` at a time.
- Read and edit only the files explicitly allowed by the current page prompt.
- Do not scan the repository, inspect all routes, or open bulk article JSON, asset manifests, image binaries, `package-lock.json`, capture scripts, or synchronization scripts unless the current prompt explicitly permits a named file.
- Do not repair, refactor, or restyle unrelated pages while completing a page prompt.
- Do not create missing features merely because they are mentioned in the rebuild brief.
- Do not install or change dependencies.
- Use existing content and assets; never fabricate claims, people, testimonials, metrics, biographies, articles, certifications, or awards.

## Action boundary

- Make one focused implementation pass and stop.
- Do not create alternate versions or repeatedly rewrite working code.
- Do not run automatic cleanup or broad automated-fix commands.
- Run at most the single verification command permitted by the current prompt.
- If that check fails, report the exact error and stop. Do not begin an autonomous diagnosis-and-repair loop.
- If a response is interrupted, do not assume permission to resume broad work. On the next request, inspect only the files named in that request.
- Keep the final response to: files changed, check result, and remaining issue. Do not provide a long retrospective.

## Required checkpoint after every prompt

- Before ending any page-prompt task, confirm the current branch is `bolt/layout-enhance-1` and inspect `git status`.
- Commit the files changed by that prompt and push the commit only to `origin/bolt/layout-enhance-1`.
- For a completed task whose permitted check passed, use a concise commit message beginning `Bolt:` followed by the page or prompt name.
- For an incomplete task, interrupted recovery, or failed permitted check, preserve the work with a concise commit message beginning `WIP:` followed by the page or prompt name and push it anyway.
- Never stage unrelated pre-existing changes. If unrelated changes are present, leave them untouched and list them in the final response.
- If there is no diff, do not create an empty commit; still confirm that `bolt/layout-enhance-1` is synchronized with its remote.
- If committing or pushing fails, do not discard or rewrite the files. Report the Git error and state that the changes remain only in the Bolt workspace.
- Only after the checkpoint attempt, respond with the branch, commit hash if created, push result, changed files, check result, and remaining issue.

## Low-token emergency checkpoint

- If Bolt's UI, agent, or system reports that the token allowance is low, nearly exhausted, or insufficient to finish the current task, stop making code changes immediately.
- Do not spend the remaining allowance on redesign, testing, debugging, cleanup, or explanatory output.
- Preserve the exact current state even when incomplete: commit all task-related changes to `bolt/layout-enhance-1` with a message beginning `WIP:`, then push only that branch to `origin/bolt/layout-enhance-1`.
- Never commit or push the emergency checkpoint to `main` and never merge it.
- If committing or pushing is unavailable, leave the files unchanged and report that the checkpoint remains only in the Bolt workspace. Do not discard, revert, or rewrite incomplete work.
- After the checkpoint attempt, respond only with the branch, commit hash if created, push result, incomplete items, and last edited file.

The project-wide design brief is reference material only. The current page prompt is always the operative scope.
