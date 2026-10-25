# PHP security upgrade handoff — Virtual Office Angels

**Prepared:** 23 October 2026 (Asia/Manila)

**Status (updated 23 October, 19:15 UTC):** **Done.** All three active sites run PHP 8.3.36; see "Results" near the end. The sections before it are the original plan, kept for the record.

## Requested outcome

Resolve the October 2026 critical PHP vulnerabilities without unexpectedly breaking Virtual Office Angels (VOA). The live site is https://virtualofficeangels.com.au/; the new-theme staging site is https://virtualofficeangels.com.au/staging/1384/. Other applications sharing their PHP handler may also be affected.

No PHP, hosting, WordPress, plugin, or theme setting was changed while preparing this document. Backups and repository notes are **historical snapshots**, not proof of today's live state.

## Security issue — verified 23 October 2026

| Item | Confirmed advisory | Follow-up |
| --- | --- | --- |
| CVE-2026-109618 and CVE-2026-109619 | PHP disclosed two critical vulnerabilities that can permit unauthenticated remote code execution in web-serving PHP installations. | Obtain a patched runtime from HostGator promptly. A WordPress update alone does not fix it. |
| Fixed upstream releases announced 21 October | **8.2.35, 8.3.36, 8.4.27, 8.5.12** contain the announced fixes. | Check the exact running patch or get HostGator's confirmation of an equivalent vendor backport. A branch label such as “8.3” is insufficient. |
| PHP 8.1 and older | These no longer receive regular upstream security updates; vendors may backport fixes. | If either site still uses an older branch, get HostGator's specific support and fix plan. |
| Additional 23 October advisory | PHP described a further, narrow session-upload-progress scenario involving particular serialize-handler settings and a runtime handler switch. It recommends disabling session.upload_progress.enabled until the next release. | Ask HostGator whether the prerequisites or setting apply here and what they have done. Do not make speculative production configuration changes. |

PHP says an update is the only complete remedy for the two 21 October vulnerabilities. The 23 October note is an **additional** configuration-specific concern, not proof that VOA uses that pattern. WordPress states the critical issue is in PHP, not WordPress core.

## Selected repository context

| Path | Relevance |
| --- | --- |
| docs/wordpress-integration/reference/WORDPRESS_LIVE_SITE_STATUS.md | Records the 2–4 October live-site WordPress/PHP/plugin snapshot and its limitations. |
| docs/project/OCT_08_TO_18_2026_HANDOFF.md | Records the new theme's local PHP 8.3 tests; explicitly not proof of staging deployment. |
| wordpress-theme/README.md | Records earlier PHP 8.3 and PHP 7.4 local theme checks, some predating later changes. |
| wordpress-backups/voa-staging-1384/backup_2026-10-19-1433_Virtual_Office_Angels_Online_V_abaa956d5376-plugins.zip | 19 October staging plugin-file snapshot. |
| wordpress-backups/voa-staging-1384/backup_2026-10-19-1433_Virtual_Office_Angels_Online_V_abaa956d5376-db.gz | 19 October staging database snapshot previously used to identify active plugin slugs. Do **not** publish or attach this backup to a support ticket. |

## Known, assumed, and unknown

### Known from dated records

- The 2 October live-site report recorded **WordPress 7.0.6**, **PHP 7.4.33**, and **MySQL 5.7.44**. Its presentation used **Twenty Sixteen 3.9**, **WPBakery 8.7.2**, **Max Mega Menu 3.10.6**, and **Smart Slider 3**. These are historical observations, **not current live versions**.
- The new custom VOA theme has historical local tests under **PHP 8.3 / WordPress 7.1.3**, including activation, content edit/save/render, authorization checks, and PHP lint. This reduces concern about the theme itself, but does not test the full HostGator stack or every plugin.
- The 19 October staging backup previously yielded these **10 active plugin slugs**: Akismet, Contact Form 7, Disable XML-RPC, Flamingo, Imagify, Redirection, UpdraftPlus, Wordfence, Yoast SEO, and HostGator's plugin. Other installed folders were not necessarily active.
- HostGator documents PHP changes through its Customer Portal or cPanel MultiPHP Manager. It notes that subfolders can inherit a parent's PHP selection and that old PHP-handler directives can conflict with MultiPHP Manager.
- WordPress core's compatibility matrix includes PHP 8.3 and 8.4 for WordPress 7.0/7.1. This does **not** certify every theme and plugin.

### Assumed for planning, not proven

- The current staging site remains a WordPress installation under the live domain. A shared PHP handler is possible, but **not established**.
- The old live theme/plugin stack may be more upgrade-sensitive than the newer custom theme. No specific component has been proven to fail on a fixed PHP build.
- HostGator supplies the underlying PHP packages on shared hosting; the site operator selects among available branches. Confirm this for the actual account.

### Unknown until checked

- Today's full PHP version, WordPress version, active theme, and active plugins on **both** live and staging.
- Whether HostGator has already patched the server or applied a verified vendor backport.
- Whether staging can change PHP independently of live, older staging folders, or other applications on the account.
- Which exact patch sits behind each branch option and whether a rollback option is available.
- Whether old .htaccess PHP-handler directives exist.
- Whether the uncommon 23 October session-upload advisory conditions exist here.

## Ownership and boundaries

| Role | Responsibility |
| --- | --- |
| VOA site operator | Record versions and current plugin inventory; take and verify file/database backups; coordinate the change; test the site; keep non-sensitive evidence. |
| HostGator support | Confirm the **actual PHP package/patch or backport**, handler inheritance, fixed builds available, server-level mitigation, and safe switch/rollback procedure. On shared hosting, the customer normally cannot patch PHP binaries directly. |
| Developer | Diagnose theme/plugin compatibility errors and repair site code if testing reveals a defect. Re-uploading a theme ZIP is not a PHP runtime fix. |

**Non-goals:** Website redesign, unrelated plugin updates, cleanup of abandoned staging installations, or credential changes. Handle those as separate work items.

## Read-only checks before any upgrade

1. Sign in separately to the **live** WordPress admin and /staging/1384/wp-admin. On each, go to **Tools → Site Health → Info → Server**. Record the **full PHP patch version** and WordPress version.
2. On each site, record **Plugins → Installed Plugins → Active** with versions, and the active theme under **Appearance → Themes**. Do not treat the 2 or 19 October inventories as current.
3. In HostGator, inspect **cPanel → MultiPHP Manager** or **Customer Portal → Websites → Manage Site → Advanced → PHP Version**. Do **not** click **Apply** during this check. Where available, **View PHP Version Info** may show the actual patch.
4. Ask HostGator whether /staging/1384/ has an independent PHP handler and whether other subfolders/sites inherit the domain setting. Matching PHP versions alone do **not** prove a shared handler.
5. Keep PHP Info output private: it can reveal server paths and configuration. Prefer WordPress Site Health or HostGator's authenticated portal over placing a publicly accessible PHP-info file in the web root.

### Suggested message to HostGator

> We manage virtualofficeangels.com.au and its WordPress staging installation at /staging/1384/. Please confirm the exact PHP branch **and patch version** currently running for both paths, and whether the packages contain fixes for CVE-2026-109618 and CVE-2026-109619 (or equivalent vendor backports). Can PHP be changed for /staging/1384/ without changing the live domain root or other subdirectories on the account? Which fixed versions are available now, and what is the safe rollback procedure if application code fails? Please also advise whether the 23 October session-upload-progress advisory (CVE-2026-115560) affects your configuration and whether session.upload_progress.enabled=0 is applied or recommended here. Finally, could old PHP-handler directives conflict with MultiPHP Manager on this account?

Do not send passwords, database exports, complete PHP Info output, or backup archives in the initial ticket.

## Compatibility risks — none is a guaranteed break

| Area | Why it needs a test | Observable test |
| --- | --- | --- |
| Legacy **live** theme/plugins | The old live snapshot uses a materially different WPBakery-era stack. PHP 8 removes or changes some PHP 7 behavior. | Key pages, menu, sliders, articles, editing flows; inspect PHP errors. |
| New staging theme/content editor | Previous local PHP 8.3 tests do not equal hosted integration tests. | Homepage, services, articles, contact page, content edit/save/render, permissions. |
| Contact Form 7 / Flamingo / mail | A page can render while submissions or delivery fail. | Send a non-sensitive test enquiry; confirm recipient delivery and expected stored entry. |
| Wordfence / UpdraftPlus / Yoast / Redirection / Imagify | Scans, backups, sitemaps, redirects, and image processing may fail independently of page rendering. | Exercise each function and inspect logs. |
| PHP handler/extensions | HostGator documents a “Missing MySQL Extension” failure if a legacy .htaccess PHP handler conflicts after a MultiPHP change. | If that symptom occurs, preserve configuration, inspect handler directives, and involve HostGator; do not delete directives blindly. |
| Other hosted sites/subdirectories | A domain-level or inherited setting may affect more than the two VOA URLs. | Confirm scope with HostGator and smoke-test each affected app. |

Plugin **minimum PHP** requirements are floors, not proof of all PHP 8.3/8.4 behavior. Inactive plugins generally do not execute in ordinary WordPress rendering, although obsolete installed files remain a separate security concern. CSS/JavaScript animations are not inherently changed by PHP, but a server fatal error can prevent their page from loading.

## Acceptance criteria and evidence

| # | Observable criterion | Evidence |
| ---: | --- | --- |
| 1 | Both intended site paths run a PHP package confirmed to include the critical fixes. | WordPress Site Health full patch and/or written HostGator package/backport confirmation. |
| 2 | The live/staging scope of the PHP switch is known before application. | HostGator answer and domain/directory mapping, recorded privately. |
| 3 | Restorable database and file backups exist for every affected site. | Backup inventory and documented restore procedure; no public backup URLs. |
| 4 | Pages, admin editing, media, forms/email, SEO, redirects, security scan, and backup jobs work afterward. | Checklist below, sanitized log review, test-submission evidence. |
| 5 | No new fatal PHP errors persist. | HostGator/PHP error logs checked during testing and monitoring. |

## Execution sequence once unknowns are resolved

1. **Confirm patch and scope urgently.** Do not let compatibility research indefinitely delay security remediation.
2. Take fresh **database and file** backups for all affected installations; keep them off the public web root or access-controlled. Record an error-log baseline.
3. If staging has an **independent** PHP setting, switch only staging to a HostGator-confirmed fixed build. Verify the running patch **after** the switch.
4. If staging shares live's setting, use an **isolated clone** or coordinate a controlled change with HostGator. Do not treat /staging/1384/ as a safe independent trial.
5. Run the checklist. If successful, move live to the fixed build promptly; repeat checks on live and monitor logs.
6. Keep WordPress/plugin/theme upgrades separate where possible so failures are attributable. Handle the 23 October session-upload recommendation with HostGator if relevant.

### Post-switch checklist

- [ ] Full PHP patch is the intended fixed build or documented vendor backport.
- [ ] Home, service, article, contact, and 404 pages load; navigation, images, and mobile layout work.
- [ ] WordPress login, a small content edit/save/restore, and media upload work.
- [ ] Contact form delivers to the configured mailbox and stores a Flamingo entry if expected.
- [ ] Yoast sitemap/meta output and sample redirects work.
- [ ] Wordfence scan/firewall state and UpdraftPlus backup job work.
- [ ] PHP/server logs show no unresolved fatal errors; repeated warnings are reviewed.
- [ ] Other sites/subfolders in the changed PHP scope still work.

**Failure response:** Capture the exact error and timestamp, inspect logs, and contact HostGator/developer. Temporary rollback may restore availability, but a vulnerable PHP build is **not** a security resolution; agree on a rapid compatible patch or isolated alternative. Do not remove plugins or edit .htaccess without a verified cause and backup.

## Results — 23 October 2026 (UTC)

All three active sites now run **PHP 8.3.36**, a fixed release, confirmed in each site's Site Health. Each was backed
up first (UpdraftPlus, copies in `wordpress-backups/vla-live`, `vfs-live`, `voa-live`) and its public pages were
compared before and after the switch.

| Site | Account | Before | After | Checked after the switch |
| --- | --- | --- | --- | --- |
| virtualloansassistant.com.au | Pro | 8.1.34 | 8.3.36 | Pages, Divi builder, contact form email |
| virtualfinancialsupport.com.au | Business | alt-php74 [Secured] | 8.3.36 | Pages, WP Mail SMTP test (sends) |
| virtualofficeangels.com.au (and /staging/1384, which inherits it) | Pro | alt-php74 [Secured] | 8.3.36 | Pages, WPBakery editor, contact form email |

- **The first VOA switch failed** (about 18:44–18:49 UTC, every page returned a critical error) and was rolled back by
  restoring the `alt-php74` handler line in `.htaccess`. Cause, from the site's `error_log`: **Testimonials Showcase
  1.3.7** uses curly-brace string offsets (`includes/utils.php` line 719), removed in PHP 8. Its
  `includes/class-settings.php` line 105 also used `create_function()`. Both lines were replaced (copies in
  `wordpress-upgrade/testimonials-showcase-patch/`; the change works on PHP 7.4 and 8.3) and the second switch
  succeeded. **Do not reinstall that plugin from an old copy**; it is retired at cutover anyway.
- Every other active VOA plugin was compile-checked under PHP 8.3 from the backup: no fatal errors. The HostGator
  plugin's non-English translation files fail to compile, but the site is English, so they never load.
- **Undo for VFS and VOA**: MultiPHP Manager no longer offers alt-php74, so rollback means replacing the handler line
  in the site's `.htaccess` with `AddHandler application/x-httpd-alt-php74___lsphp .php .php7 .phtml`. The original
  files are saved as `wordpress-upgrade/htaccess-vfs` and `htaccess-voa`.
- **VFS outage, 17:15–17:50 UTC**: HTTPS on the Business plan server stopped completing, for every site on
  it and even for static files; HTTP still answered and the account's error log showed no PHP errors. It recovered
  without any change on our side. Not explained yet; worth asking HostGator.

## Open items found along the way

| # | Item | Needs |
| --- | --- | --- |
| 1 | **Email routing.** The Pro account still holds old copies of `virtualfinancialsupport.com.au`, so mail sent through the Pro mail server to `@virtualfinancialsupport.com.au` (including VFS form notifications) is filed in a mailbox on the Pro account, not the real one on the Business server. The Business account likewise holds a copy of `virtualofficeangels.com`/`.com.au`. Fix: Email Routing → Remote Mail Exchanger for each such domain. Review the Pro-side `clientcare@virtualfinancialsupport.com.au` mailbox for missed enquiries. **Update 25 October: the team leader uses the Pro mailbox, so the Remote fix for Virtual Financial Support is withdrawn; see `README.md`** | Client approval |
| 2 | **Old malware on VOA live**: three leftover items in the plugins folder, last active in March 2023. Inert on their own; review and remove with a backup. Exact paths are in the local full copy, `wordpress-upgrade/PHP_SECURITY_UPGRADE_HANDOFF_2026-10-23_FULL.md` | Security review |
| 3 | Wordfence firewall protection level after the PHP change (Firewall → All Firewall Options → Protection Level); re-optimise if it fell back to Basic | Low priority |
| 4 | VLA Jetpack: disconnect and reconnect, which renews its connection keys | Low effort |
| 5 | DMARC is not set up for `virtualofficeangels.com.au` (WP Mail SMTP warning) | DNS change, client approval |

## Sources

- [PHP project: 21 October security advisory and 23 October informational update](https://www.php.net/archive/2026.php#2026-10-21-5)
- [WordPress: Critical PHP Security Release](https://wordpress.org/news/2026/10/critical-php-security-release/)
- [WordPress: Site Health screen](https://wordpress.org/documentation/article/site-health-screen/)
- [WordPress core/PHP compatibility matrix](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/)
- [HostGator: Check PHP version and PHP Info](https://www.hostgator.com/help/article/phpinfo)
- [HostGator: PHP version inheritance](https://www.hostgator.com/help/article/what-version-of-php-are-you-using)
- [HostGator: Update PHP version](https://www.hostgator.com/help/article/php-configuration-plugin)
- [HostGator: MultiPHP handler conflict](https://www.hostgator.com/help/article/how-to-fix-error-after-multiphp-update)
