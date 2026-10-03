# WordPress theme and content architecture

Written 2026-10-03 against commit `a74e735`. The implementation plan for turning the approved
Layout 1 React build into a custom WordPress theme.

**Read first:** `WORDPRESS_LIVE_SITE_STATUS.md` (what the live site is), `CONTENT_ASSET_AUDIT.md`
(what we are migrating), `MIGRATION_RUNBOOK.md` (the operational steps).

**Decisions already taken** (2026-10-03): migrate all ~98 posts · Gutenberg is acceptable, no visual
builder · testimonials move out of the Testimonials Showcase plugin and into the theme.

---

## 1. The governing principle

The live site's pages are locked inside WPBakery shortcodes. If WPBakery is removed, those pages
render as visible `[vc_row]` text. That is the failure we are migrating away from, and the architecture
must not reproduce it in a new form.

**So: page content is built from core WordPress blocks, assembled into patterns.**

Not a builder. Not a proprietary field format. Core blocks store content as standard HTML in
`post_content`, which means:

- Content survives a theme change, a plugin removal, and an export/import.
- No paid dependency.
- The client edits visually, which is what they agreed to.

Where structure genuinely cannot be expressed in core blocks, we write a **custom block** in the
theme — not a shortcode, and not a page-builder module.

### What this rules out, and why

| Rejected | Reason |
| --- | --- |
| ACF Pro | Repeater fields are the paid tier. The service pages need six repeaters each, so this is not a free-tier option — it is a licence, forever, for content that core blocks can hold |
| Shortcodes for layout | The exact WPBakery trap |
| A page builder | Already decided against |
| Carbon Fields / Meta Box | Free repeaters exist, but content then lives in postmeta, invisible to export and dependent on the plugin |

ACF **free** may still earn its place for a handful of flat, single-value settings. That is a small,
reversible decision; the repeater question is the one that matters and it is settled.

### Refinement, 2026-10-03: where blocks apply, and where they do not

Building step 5 made the boundary clearer than the original wording.

**Blocks are for content the client restructures** — ordinary pages, and the service pages, where
sections may be reordered or dropped per service.

**The home page is not that.** It is a fixed composition the client approved section by section over
three weeks of revisions, and several of its sections are not expressible as blocks at all: a hero
with a cross-fading photographic backdrop and dot controls, a four-stage diagram whose markers sit on
a drawn curve, a one-second logo carousel. Rebuilding those as editable blocks would invite the layout
to be taken apart by accident, and would be a great deal of work to enable something nobody asked for.

So the home page is **template parts**, and the content inside them comes from:

| Source | What |
| --- | --- |
| Real content types | services, testimonials, client logos, posts — all editable as posts |
| Customizer fields | the hero headline, lead, figures, phone and email |
| The template | structural copy and labels, translatable |

This is not a retreat from the governing principle. Nothing is locked in a plugin's private format;
every word is either a post, a theme mod, or translatable text in a file under version control.

---

## 2. Content model

### 2.1 Pages — 20

Ordinary WordPress Pages, each with a page template where the layout is fixed.

| Page | Template | Notes |
| --- | --- | --- |
| Home | `front-page.php` | |
| Services index | `page-services.php` | Lists the ten services |
| About | `page-about.php` | Anchors `#story`, `#leadership` |
| How It Works | `page-how-it-works.php` | Four-stage flow diagram |
| Why Virtual Office Angels | `page-why.php` | Ownership split diagram |
| Client Stories | `page-client-stories.php` | Carousel + testimonials |
| Insights index | `home.php` | WordPress's posts-index template |
| Videos | `page-videos.php` | Placeholder until files arrive |
| FAQs | `page-faqs.php` | |
| Contact | `page-contact.php` | |
| Thank you | `page-thank-you.php` | Form destination |

### 2.2 Services — a custom post type, `voa_service`

Ten services, each carrying **27 structured fields** including six repeating groups (scope items,
systems, fit statements, outcome points, managed steps, FAQs). That is a content type, not a page.

```php
register_post_type( 'voa_service', [
    'public'       => true,
    'has_archive'  => false,            // /services is a real Page, not an archive
    'rewrite'      => [ 'slug' => 'services', 'with_front' => false ],
    'supports'     => [ 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ],
    'show_in_rest' => true,             // required for the block editor
] );
```

Gives `/services/{slug}/` permalinks for free, matching the React routes exactly.

**The structured parts are blocks, not fields.** Each service page is assembled from a pattern
containing the custom blocks below, so the client can reorder or remove a section per service.

| Section | Block |
| --- | --- |
| Hero with tags | `voa/service-hero` |
| Scope accordion | core `details` blocks inside a pattern |
| Systems diagram | `voa/systems-diagram` |
| Fit-flow diagram | `voa/fit-flow` |
| Feedback cards | `voa/testimonial-grid` |
| FAQ | core `details` blocks |
| Managed steps | `voa/managed-steps` |

**`/services/insurance-processing` has no equivalent on the live site.** It is new — nothing to
migrate, and no redirect to write.

### 2.3 Posts — ~98, unchanged

Already on the server; the staging clone carries them. **No import, no URL change, no redirects.**

Two things to fix during the pass:

- **Every post is Uncategorized with no tags.** The React build derives a category from the title and
  excerpt (`articleCategory` in `blogContent.ts`). Those rules give us a starting taxonomy:
  Mortgage & loans · Financial planning · Accounting & bookkeeping · Real estate · Digital marketing ·
  Delegation & growth. Run them over the 98 posts, then have a human check the result.
- **At least one post has no featured image** — its image is inline instead. Article cards need a
  thumbnail. Either set featured images, or the card falls back to a tinted block. **Decision needed.**

### 2.4 Testimonials — `voa_testimonial`, registered by the theme

Four testimonials, currently in the Testimonials Showcase plugin.

```php
register_post_type( 'voa_testimonial', [
    'public'              => false,   // no single pages
    'show_ui'             => true,    // still editable in the admin
    'exclude_from_search' => true,
    'supports'            => [ 'title', 'editor', 'thumbnail' ],
    'show_in_rest'        => true,
] );
```

`public => false` means no single pages, no archive, and **no sitemap entry** — removing the stray
public `ttshowcase` sitemap that exists today.

Fields: quote · name · role/business · initials (portrait fallback).

> **Trade-off, stated plainly.** Registering a post type in a theme is normally bad practice — swap
> the theme and the content disappears from the admin, though it stays in the database. That is
> accepted here because this theme is bespoke and will not be swapped. If that assumption ever
> changes, move this registration into a small site-specific plugin; nothing else needs to change.

**Before Testimonials Showcase is deactivated, the four testimonials must be copied out.** They are
not recoverable afterwards without a database dig.

### 2.5 FAQs — no central store

There are five FAQ sources in the React build (home summary, `/faqs`, About, each service, Why VOA).
Centralising them would mean a sixth system to maintain.

**Each page owns its own FAQ**, built from core `details` blocks. The duplication is real but it is
the price of letting the client edit a page's questions where they appear. Flagged rather than solved.

### 2.6 Navigation

**Appearance → Menus**, two locations: `primary` and `footer`.

The mega menu is markup and CSS driven by a custom nav walker, replacing Max Mega Menu. The ten
services appear as two columns of five, as they do now.

---

## 3. Templates

```text
wordpress-theme/virtual-office-angels/
  style.css                     theme header
  functions.php                 setup, enqueues, post types, nav walker
  theme.json                    global styles and tokens
  header.php  footer.php  searchform.php
  front-page.php                home
  home.php                      insights index
  single.php                    article detail, with next-article navigation
  single-voa_service.php        service detail
  page.php                      generic page
  archive.php                   category and tag archives
  404.php
  page-templates/               the eleven page templates in 2.1
  template-parts/
    layout/header-nav.php  layout/footer-columns.php
    sections/hero.php  sections/contact.php  sections/figures.php
    sections/client-carousel.php  sections/testimonials.php
    sections/insights-rail.php  sections/faq.php
    cards/article-card.php  cards/service-card.php
  blocks/                       the custom blocks in 2.2
  inc/
    setup.php  enqueue.php  post-types.php  nav-walker.php
    blocks.php  patterns.php  icons.php
  assets/css/   assets/js/   assets/images/
```

### Route mapping

| React route | WordPress |
| --- | --- |
| `/` | `front-page.php` |
| `/services` | `page-services.php` |
| `/services/{slug}` ×10 | `single-voa_service.php` |
| `/about` `/how-it-works` `/why-voa` `/client-stories` `/videos` `/faqs` `/contact` | page templates |
| `/insights` | `home.php` |
| `/insights/{slug}` ×98 | `single.php` |
| `/thank-you` | `page-thank-you.php` |
| 404 | `404.php` |

**Permalink change:** React serves articles at `/insights/{slug}`; WordPress serves them at
`/{slug}`. **Keep the WordPress URLs** — all 98 already rank and the React paths have never been
public. The design's "Insights" naming is unaffected; only the path differs.

---

## 4. Styling

### 4.1 theme.json

`themes.css` holds 30 custom properties across two themes; `tokens.css` holds 12 structural ones.

`theme.json` carries the palette, typography and spacing so the editor shows the right colours. The
**full token set stays in CSS**, because `theme.json` cannot express gradients-as-tokens
(`--hero-scrim`), opacity scalars (`--service-wash`, `--section-wash`) or the dark-theme
`[data-theme]` switch.

| theme.json | Stays in CSS |
| --- | --- |
| Palette: background, surface, text, muted, accent, action, heading-accent | `--hero-scrim`, `--glass-surface`, `--glass-border` |
| Font families, the type scale | `--service-wash`, `--section-wash` |
| Spacing scale, content width | `--motion-*`, `--ease-standard` |
| `appearanceTools`, no layout injection | the whole `[data-theme='dark']` block |

### 4.2 The CSS itself

`global.css` is **3,011 lines** and transfers largely unchanged — it is plain CSS with custom
properties, no preprocessor, no CSS-in-JS. The work is renaming React class names to WordPress ones,
not rewriting style.

Split for maintainability:

```text
assets/css/  base.css  tokens.css  themes.css  typography.css
             layout.css  components.css  sections.css  utilities.css
```

### 4.3 The dark theme

`data-theme` on `<html>` with `localStorage` key `voa-theme`, exactly as now. An inline script in
`header.php` applies the stored theme **before first paint**, or the page flashes light before
switching.

---

## 5. JavaScript

Every piece of React state becomes a small vanilla module. No framework, no build step beyond
concatenation.

| React | Module | Behaviour to preserve |
| --- | --- | --- |
| `useTheme.ts` | `theme-toggle.js` | `data-theme`, `localStorage`, pre-paint application |
| `useReducedMotion.ts` | `motion.js` | `prefers-reduced-motion`, consumed by the others |
| `useImageRotator.ts` | `backdrop-rotator.js` | Rotating hero and contact backgrounds, slow cross-fade, pauses when reduced motion is set |
| `ClientCarousel.tsx` (9 hooks) | `client-carousel.js` | Advances every 1s, pauses on hover and focus, no pause button |
| `Header.tsx` (5 hooks) | `nav.js` | Hover dropdowns on pointer devices; click/Enter to open and Escape to close for keyboard and touch; mobile menu |
| `PageShell.tsx` | `reveal.js` | IntersectionObserver scroll reveals, staggered cards, hash navigation |
| `HomePage.tsx` journey | `journey.js` | Stage selection, markers positioned on the drawn curve |
| `SourcePage.tsx` accordions | `accordion.js` | Replaced by native `<details>` wherever possible |
| Insights filter and pagination | server-side | WordPress query vars, not JavaScript |
| `Icons.tsx` `StageGlyphs.tsx` `ItemGlyphs.tsx` | `inc/icons.php` | PHP functions returning the same SVG |

**Two to watch:**

- **`ItemGlyphs`** resolves an icon from each item's *wording* via an ordered keyword rule set. That
  logic must port to PHP intact, or the service-page diagrams get wrong icons.
- **The journey diagram** places markers on a quadratic curve by computed coordinates. The maths
  ports directly; the constants must not be re-derived by eye.

Accordions become native `<details>`/`<summary>` where the markup allows — less JavaScript, keyboard
support for free.

---

## 6. Theme vs plugin

| Concern | Where | Why |
| --- | --- | --- |
| Templates, CSS, JS, patterns, blocks | **Theme** | Presentation |
| `voa_service`, `voa_testimonial` | **Theme** | Per the 2026-10-03 decision — see the caveat in 2.4 |
| Nav walker, icon functions | **Theme** | Presentation |
| Forms | **Contact Form 7** | Already installed, already handles the live form |
| Email delivery | **WP Mail SMTP** | Shared-hosting mail is unreliable without it |
| SEO | **Yoast** | Already installed and configured |
| Redirects | **Redirection** | Already installed |
| Security, backups, spam | **Wordfence, UpdraftPlus, Akismet** | Already installed |
| Image optimisation | **Imagify** | Already installed |

**One new plugin: WP Mail SMTP** (free tier sufficient). No paid plugin is proposed.

---

## 7. Media

The staging clone already holds the 240 MB uploads library, so **nothing needs uploading**.

Two differences from the React build worth knowing:

- **WordPress generates responsive sizes automatically.** The React build has no `srcset` at all and
  serves full-size images to phones. The WordPress site will be *faster* here, not slower.
- Register sizes matching the design: article card, service thumbnail, client logo, hero.

The 30 client logos are currently content in the WP Logo Showcase plugin. Moving them into the theme
is the same decision as testimonials, and the same export-before-deactivating warning applies.

---

## 8. SEO

`index.html` carries **one generic title and description for all 52 routes**. Yoast replaces this
wholesale.

- `serviceDetails.ts` already holds `seoTitle` and `metaDescription` **for all ten services** — written,
  approved, ready to paste into Yoast.
- Posts keep their existing Yoast metadata. Untouched.
- Pages need new titles and descriptions as they are rebuilt.
- Schema: Organization on the home page, Article on posts, FAQPage where FAQs appear. Yoast handles
  most of this; the FAQ blocks need its FAQ block or equivalent markup.

---

## 9. Build order

Each step is testable before the next begins.

| | Step | Depends on |
| --- | --- | --- |
| 1 | Theme skeleton — `style.css`, `functions.php`, `theme.json`, `header.php`, `footer.php`. Activates cleanly, renders a header and footer | nothing |
| 2 | CSS port and token mapping | 1 |
| 3 | JS modules | 1 |
| 4 | Post types, nav walker, icon functions | 1 |
| 5 | `front-page.php` — the hardest page, and it proves the pattern system | 2, 3, 4 |
| 6 | `single-voa_service.php` + the custom blocks | 5 |
| 7 | Remaining page templates | 5 |
| 8 | `home.php`, `single.php`, `archive.php`, `404.php` | 5 |
| 9 | Patterns for client-editable sections | 6, 7 |
| 10 | Content entry, forms, Yoast, redirects | all |

**Steps 1–9 need no server access.** They can be written now and delivered as a .zip the moment
staging exists.

---

## 10. Open decisions

| # | Decision | Recommendation |
| --- | --- | --- |
| A1 | Services as `voa_service` CPT, or as Pages? | **CPT** — 27 fields and six repeating groups is a content type. Free `/services/{slug}` permalinks |
| A2 | Repeating content as core blocks, or a field plugin? | **Core blocks.** No paid dependency, content stays portable, and it avoids recreating the WPBakery lock-in |
| A3 | Article URLs — keep `/{slug}` or move to `/insights/{slug}`? | **Keep `/{slug}`.** 98 posts already rank; the React paths were never public |
| A4 | Posts have no categories | Apply the React `articleCategory` rules as a first pass, then human review |
| A5 | Posts without featured images | **Resolved 2026-10-03: tinted fallback block** carrying the category label. No content work, and it still holds if a post is added without one later |
| A6 | 30 client logos | Same treatment as testimonials: into the theme, export before deactivating the plugin |
| A7 | Register post types in the theme or a small plugin? | Theme, per the decision taken — with the caveat in 2.4 recorded |

---

## 11. What this does not cover

- **Cutover** — in the runbook, and it needs client authorisation.
- **PHP 8** — blocked on cPanel access. The theme will be written to run on 8.1+ and remain
  compatible with 7.4, so this does not block the build.
- **Video content** — three placeholders. Deferred by the client on 2026-10-03; not a blocker.
- **Fonts** — **resolved 2026-10-03: self-host Manrope and Inter in the theme.** Both are open-licensed,
  so there is no cost and no third-party request.
- **Privacy policy, terms, cookie consent** — not built, not specified.
