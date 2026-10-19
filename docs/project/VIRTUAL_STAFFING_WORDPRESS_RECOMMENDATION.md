# Virtual Staffing website: WordPress setup recommendation

**Prepared:** 18 October 2026
**Decision requested:** How to build the website for [virtualstaffing.com.au](https://virtualstaffing.com.au/) without inheriting the abandoned Virtual Office Angels staging installation.

## Recommendation

Create a **fresh, separate WordPress installation** for Virtual Staffing. If the existing HostGator plan supports another domain, this can be hosted on that plan; it does not automatically require a new hosting subscription. Give the site its own document root, database, administrator accounts, backups, and staging workflow.

Reuse *approved material* from the old VOA staging site where useful—such as licensed images, factual service information, or design ideas—but do **not** repurpose its WordPress installation or copy its entire database. Virtual Staffing should have its own identity, messaging, search strategy, and editorial ownership.

## Why this is the better route

| Option | Assessment |
| --- | --- |
| Change /stagingsite2/ into Virtual Staffing | Technically possible, but the old installation contains VOA-specific pages, links, media references, forms, accounts, and plugin settings. Auditing and removing all of that would likely erase the apparent time saving. It also risks disrupting an old VOA URL that is still publicly reachable. |
| Install WordPress afresh for virtualstaffing.com.au | Recommended. The new site starts with a clear content structure and separate operational settings. Existing VOA material can be selected deliberately rather than inherited accidentally. |

The brands may cover related services, but substantially similar pages on both sites would weaken their distinction for visitors and may create duplicate-content/canonicalization complications. This is a reason to develop differentiated content—not a claim that Google automatically penalizes all duplication. [Google explains canonicalization and duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/canonicalization).

HostGator documents that an additional domain can use its own document root on an eligible plan. **A separate folder and database do not provide full security isolation** if both sites share the same hosting account; a separate hosting account is worth considering if independent security, access, or performance is required. [HostGator addon-domain guidance](https://www.hostgator.com/help/article/what-is-addon-domains), [document-root guidance](https://www.hostgator.com/help/article/what-is-a-document-root-folder).

## Proposed sequence

1. **Audit first:** confirm who controls virtualstaffing.com.au, its DNS, current hosting, existing website or WordPress installation, email services, and any content that must be preserved. Its current live configuration has **not** been verified for this recommendation.
2. **Back up before changing anything:** capture the existing site's files and database, if present. Confirm that the HostGator plan supports the additional domain and has sufficient resources.
3. **Set up separately:** create a new domain document root and WordPress database; install WordPress; configure HTTPS, backups, restricted admin access, and a private staging workflow. Do not point the new domain at the VOA /stagingsite2/ directory.
4. **Build the Virtual Staffing site:** define its audience, services, navigation, brand assets, and page copy. Reuse only client-approved assets and facts from VOA, checking image rights and differentiating overlapping content.
5. **Prepare launch and SEO:** check forms, mobile layouts, performance, indexing settings, page titles, canonical URLs, sitemap, analytics, Search Console, and any redirects needed from a *pre-existing Virtual Staffing site*. [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) applies if existing URLs change.
6. **Handle old VOA staging separately:** inventory links and content still needed from /stagingsite2/, make a recoverable backup, then decide whether to restrict, redirect relevant VOA URLs, or retire it. Do not automatically redirect old VOA pages to Virtual Staffing; the brands and page purposes differ.

## Client decisions needed

- Confirm that Virtual Staffing is a distinct brand/site, and approve a fresh installation rather than reuse of the old staging database.
- Provide access or an audit report for the domain, DNS, hosting plan, and any existing Virtual Staffing website.
- Confirm which VOA assets or service descriptions may legally and editorially be reused.
- Decide whether shared HostGator hosting is sufficient or the new site needs separate hosting-account isolation.

**Bottom line:** reuse selected knowledge and assets, not the abandoned WordPress installation. Verify the new domain's current state before any setup or migration work.
