# VOA project handoff: 8–18 October 2026

Status: documentation only. This records confirmed repository changes and relevant discussions from 8–18 October. It does not authorize implementation, publication, commits, or pushes.

## Project position

- The client selected Mock Layout 1 on main. Its React/Vite mockup is deployed on Vercel, and a matching custom WordPress theme lives under wordpress-theme/. Treat the design as finalized apart from requested minor updates.
- On 18 October, main and origin/main both point to 4246882. Earlier context is in docs/project/SESSION_HANDOFF.md and CLAUDE.md; this dated note supersedes older status claims where they conflict.
- wordpress-theme/virtual-office-angels.zip is a generated, Git-ignored local archive, not tracked source. Rebuild it from theme source with npm run wp:zip. Older WordPress README/PENDING/BLOCKERS notes from early October may be stale.

## Confirmed Git changes

| Commit | Date | Change |
| --- | --- | --- |
| 2b7f3ab | 11 Oct | Redesigned Client Case Study in React and WordPress, updated footer to 2010–2026, and adjusted .gitignore. |
| 3686b85 | 11 Oct | Removed obsolete Bolt starter prompt, old article-suggestion documents, and task-hours files. |
| 4246882 | 11 Oct | Added restricted WordPress Website Content editing and documentation. |

The Case Study now presents challenge/support content more compactly, with symbols/icons, connector and timeline, stronger hover feedback, and reduced-motion support. Relevant files are src/pages/SourcePage.tsx, src/styles/global.css, wordpress-theme/page-client-stories.php, and theme CSS. The footer change is in src/components/layout/Footer.tsx and wordpress-theme/footer.php. A local ignored note, docs/project/SESSION_CONTINUITY_2026-10-09.md, says an early reveal treatment hid a visual rail; that treatment was removed. Do not reintroduce content that can remain invisible.

## Restricted WordPress content editing

Read wordpress-theme/CONTENT_EDITING.md before modifying or operating this feature.

- Website Content in wp-admin covers 11 fixed-layout pages and 10 service pages. Authorized users can edit designated text and images, not page layout, header, footer, logo, navigation, routes, or shared links.
- Administrators have access. The custom VOA Content Editor role has read, upload_files, and edit_voa_content. Ordinary WordPress Editors are not automatically allowed. Blog articles still use native Posts.
- Implementation: wordpress-theme/inc/content-copy.php, wordpress-theme/inc/content-editing.php, wordpress-theme/assets/js/content-editor.js, and consuming templates. Saved overrides reside in WordPress data, not the ZIP.
- Historical local tests on 11 October used temporary WordPress 7.1.3, PHP 8.3, and SQLite. Theme activation; creation of 11 pages and 10 services; save/render/restore of heading and image; subscriber rejection; direct-save HTTP 403; and unknown-page HTTP 400 were checked. PHP lint passed 40/40 files; npm lint, JavaScript syntax, and ZIP validation passed. This is not evidence of staging or production deployment.
- A local pre-feature ZIP, virtual-office-angels-pre-feature-3686b85.zip, was made. Both it and the current ZIP are Git-ignored and may not exist in another clone. Back up the WordPress database before replacing the installed theme.
- Staging installation and role behavior have not been independently confirmed. After upload, sign in as Administrator or VOA Content Editor, find Website Content, test a small edit and restore it, then verify an ordinary Editor cannot access that area.

## Contact form

wordpress-theme/inc/forms.php provisions a Contact Form 7 Website enquiry form. At creation it uses an existing explicit recipient if available, otherwise the WordPress site-admin email placeholder. Once created, change its recipient in WordPress: Contact > Contact Forms > Website enquiry > Mail > To. Repository changes alone do not change a previously saved form. Website Content does not control mail recipients.

## SEO and article work discussed, not published by this agent

- An Australian-state SEO campaign was discussed on 14 October. Recommendation: pilot a few genuinely differentiated state pages; avoid thin duplicate or fake-local pages. No state pages were built.
- Three untracked files were inspected: VFS Article_September 2026.docx, VLA Article_September 2026.docx, and VOA Article_September 2026.docx. Each contains a supplied SEO title, meta description, H1, article, and embedded photo. Their presence does not prove publication.
- Suggested optional Yoast focus keyphrases: virtual financial support (VFS), virtual loans assistant (VLA), and virtual assistant industry experience (VOA).
- Supplied VOA SEO title: “When Does a Virtual Assistant Require Experience? | Virtual Office Angels.” Supplied H1: “When Does a Remote Support Role Require Industry Experience?” The H2 “Five Signs That You Need Virtual Assistants With Industry” matches the DOCX; do not silently rewrite it. The user manually worked on the VOA post, but final publication status is unknown.
- A screenshot of the VOA Yoast panel showed a VLA-specific meta description despite the correct-looking VOA SEO title. Check the saved description before publishing. The VOA description begins “When does a virtual assistant need industry experience?” A blank Yoast slug field can be normal when WordPress already generated the permalink; check the actual URL.
- VFS and VLA supplied SEO titles end with “| Virtual Office Angels”; confirm if parent-brand naming is intended. The VLA contact link points to VOA and needs destination confirmation. The VLA copy also has an awkward “how an Australian loan processing moves” phrase.
- An ASIC link in the VFS document appeared broken/outdated. Prior research checked the MFAA broker-share and OAIC breach statistics against primary sources; recheck dates, precise wording, and links before publication. Preserve relevant embedded photos and attribution.
- The earlier VFS Wordfence discussion did not establish a final VFS scan exclusion list. Do not reuse VOA staging exclusions without checking the VFS filesystem.

## Local worktree and boundaries

Before this handoff, existing user-owned uncommitted items were a modified .gitignore; the three DOCX files; docs/wordpress-integration/image.png; and root image.png. Preserve them. This handoff is the only addition for the current request. Do not stage unrelated files, commit, or push without a new explicit request.

## Next-agent checks

1. Run git status and inspect the current request before changing anything; this dated state may have moved on.
2. For WordPress edits, read wordpress-theme/CONTENT_EDITING.md and relevant theme source. Maintain React/theme parity where the request needs it.
3. Confirm the installed staging theme version and test Website Content permissions/save/render there. Do not infer deployment from local checks or screenshots.
4. Verify the contact-form recipient and role policy in wp-admin without exposing addresses or credentials.
5. For each article, verify its respective site's content, image, permalink, Yoast title/description, citations, link destinations, and publication status. Do not publish without explicit instruction.
6. Ask before broad layout, SEO campaign, or sister-site changes: prior discussion was not authorization.

Acceptance criterion: the receiving agent can identify the selected layout, recent commits, WordPress editing architecture, historical test limits, user-owned uncommitted files, and unresolved SEO/article work. This document changes no application behavior.
