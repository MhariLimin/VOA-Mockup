# Content and asset audit

Recorded 2026-10-02 against commit `a74e735`. A read-only inventory of everything the React build
renders, so it can be mapped to WordPress templates, posts, media and redirects.

**Nothing was modified or deleted to produce this.** Every figure comes from reading files in this
repository. The live WordPress site was not touched.

---

## 1. Routes — 52 in total

| Group | Count | Routes |
| --- | --- | --- |
| Home | 1 | `/` |
| Services index | 1 | `/services` |
| Service detail | 10 | `/services/{mortgage-loans, financial-planning, accounting-bookkeeping, insurance-processing, real-estate-conveyancing, back-office-admin, digital-marketing, sales-marketing, creative-copywriting, it-technology}` |
| Standard pages | 7 | `/about` (anchors `#story`, `#leadership`), `/how-it-works`, `/why-voa`, `/client-stories`, `/videos`, `/faqs`, `/contact` |
| Insights index | 1 | `/insights` |
| Article detail | 30 | `/insights/:slug` |
| Utility | 2 | `/thank-you`, custom 404 |

Route registration is in `src/app/App.tsx`; the nine non-service page briefs are in
`src/content/sourcePages.ts`; the ten service definitions in `src/content/serviceDetails.ts`.

## 2. Articles — 30

| Measure | Value |
| --- | --- |
| Index entries (`blogs-index.json`) | 30 |
| Detail files (`blog-articles/*.json`) | 30 — one per index entry, no gaps |
| Date range | 2023-10-13 → 2025-08-25 |
| Featured images | 30, all unique |
| Source | all 30 captured from `virtualofficeangels.com.au` |

**Verified against the live sitemap on 2026-10-03: all 30 slugs exist on live, exactly as written —
zero mismatches.** The article URLs therefore carry over unchanged and no post needs a redirect.

**68 further posts exist on live that this build has never carried.** The decision is to migrate all
of them; see section 6 of the status document.

**Two filenames were truncated on capture** and are remapped at runtime in `blogContent.ts`
(`savedImageNames`). They resolve correctly; the mapping must survive migration or two article images
break.

### Outbound links inside article bodies — 135 internal, ~20 external

These are **absolute links to the old live URL structure**, embedded in the article HTML. Every one
breaks or misroutes unless rewritten or covered by a redirect.

| Old URL in article bodies | Occurrences |
| --- | --- |
| `/contact-us/` | 27 |
| `/mortgage-loans-processing-support/` | 16 |
| `/` (home) | 14 |
| `/financial-planning-assistance-administration/` | 9 |
| `/how-it-works/` | 8 |
| `/about-us/` | 7 |
| `/digital-marketing-assistance/` | 5 |
| `/why-us/` | 4 |
| `/services/` | 3 |
| `/real-estate-administration-support/` | 3 |
| `/accounting-bookkeeping-assistance/` | 3 |
| **`/stagingsite2/...`** | **3** |

**The three `stagingsite2` links are defects**, not redirects to write: article bodies link to the
staging site. They must be corrected during migration.

External destinations cited in articles: `statista.com`, `mfaa.com.au`, `investopedia.com`,
`abs.gov.au`, `smartasset.com`, `freepik.com`, `xero.com`, `savvy.com.au`, `redsearch.com.au`,
`marketmaven.com.au`, `ipsos.com`. All need a link check before launch; `freepik.com` suggests at
least one stock-image attribution to verify.

## 3. Images and media — 176 files, 30.4 MB

| Format | Files | Size |
| --- | --- | --- |
| PNG | 90 | 15.9 MB |
| JPG | 82 | 14.5 MB |
| JPEG | 2 | <0.1 MB |
| other (`.gitkeep`) | 2 | 0 |

| Location | Files |
| --- | --- |
| `public/assets/source/staging/images` | 116 |
| `public/assets/source/staging` (incl. blog images) | 155 |
| `public/assets/client` | 14 |
| `public/assets/brands` | 2 |

### Referenced vs orphaned

**175 referenced, 176 on disk.** Five files are unreferenced (0.6 MB), all accounted for:

| File | Why it is orphaned |
| --- | --- |
| `/assets/voa-logo-orange.png` | Retired 2026-09-29 when the footer moved to the new dark logo variant. Kept deliberately |
| `/assets/client/contact/contact-financial-charts.jpg` | Client-supplied, rejected — subject sits too centred for the masked backdrop |
| `/assets/client/contact/contact-handshake.png` | Same |
| two `.gitkeep` files | Directory placeholders |

**One broken reference:** `/assets/source/staging/images/f9b30e6c15-2148908840.jpg` appears in
`src/content/source/staging/assets.json` but is not on disk. That file is a **capture manifest, not
rendered output**, so nothing on the site is broken by it. Worth noting only so it is not mistaken for
a live defect later.

### Weight

17 files exceed 400 KB; the largest is 1.11 MB. The ten heaviest are all captured source photographs
in `source/staging/images`.

**No `srcset` or responsive variants exist anywhere in the build, and no WebP or AVIF.** Every image
is served at full size to every device. WordPress generates responsive sizes automatically on upload,
so this resolves itself during migration — but it means the React prototype's measured performance is
not a fair guide to the WordPress site's.

## 4. Client logos — 30

`src/content/source/staging/clients.json` holds 30 entries captured from the staging site, each with
a name and a local image path under `source/staging/images`.

- Rendered by `ClientCarousel` on the home page and `/client-stories`.
- **Every logo is a third-party trademark.** Written permission to display is an outstanding client
  item and is not evidenced anywhere in this repository.
- One entry is named `Rezi Finance (1)` — a capture artefact from a duplicated filename, not a real
  client name. Needs cleaning.

## 5. Testimonials — 4 named, plus placeholders

| Where | What |
| --- | --- |
| `src/content/testimonials.ts` | **4** source testimonials: Paul Godden, Paul Bradley, Karen Robertson, John Dwyer |
| Home page | 3 shortened previews linking to `/client-stories` |
| `/client-stories` | all 4 in full |
| Service pages (×10) | **3 placeholder cards each** carrying the document's own "feedback currently being gathered" text |

- **Avatars are initials, not photographs.** No verified portraits exist. Nothing may be generated.
- Consent to publish the four named testimonials is an outstanding client item.
- On WordPress these four currently live in the **`ttshowcase` post type** (Testimonials Showcase
  plugin) with its own public sitemap. **Decision 2026-10-03: move them into the theme** and drop the
  plugin. Two consequences — the content must be exported before the plugin is deactivated, and the
  indexed `ttshowcase` URLs need redirects to `/client-stories`.

## 6. FAQs — 12, in 4 topics

`src/content/faqContent.ts`: 12 source FAQs grouped as *The service*, *Working with your virtual
assistant*, *Hours & availability*, *Costs & privacy*. Rendered on `/faqs`.

Separately: the home page carries **5** summary FAQs (`homeContent.ts`), `/about` carries **6**
About-specific FAQs written inline in `SourcePage.tsx`, each service page carries its own FAQ set from
`serviceDetails.ts`, and `/why-voa` carries its own from `managedContent.ts`. **Five independent FAQ
sources** — they need one home in the content model, or they will drift.

## 7. Videos — 3 placeholders, no real video

`/videos` renders three `VideoPoster` components reading "Coming soon". No video URL, caption or
transcript exists anywhere in the build. Blocked on client-approved video files.

## 8. Forms

One component, `src/components/ui/ContactForm.tsx`, rendered on the home page, `/contact`, and every
page that ends with `PageClosing` — **nine pages in total**.

Fields: first name\*, last name, email\*, phone, business name, industry (9-option select), message\*,
consent checkbox\*.

**It is a prototype.** It `action="/thank-you"` and does nothing else: no submission handler, no
server-side validation, no spam protection, no consent record, no email delivery. The live site uses
**Contact Form 7**, so the migration target is a CF7 form with SMTP and spam protection, plus a
verified recipient address (Q6).

The industry list follows the client's "Who we support" copy; the documents specify the dropdown but
not its values, so the nine options are ours and need client sign-off.

## 9. External links in the build

Only two, both in `src/content/siteContent.ts`, rendered as the About page's sister-site cards:

- `https://virtualfinancialsupport.com.au`
- `https://virtualloansassistant.com.au`

Both open in a new tab with `rel="noopener noreferrer"`. **No `stagingsite2` links remain in
application code** — the three that survive are inside captured article bodies (section 2).

## 10. Reusable sections — the WordPress pattern candidates

Each of these appears on three or more pages and should become a block pattern or template part
rather than being rebuilt per page:

| Section | Component | Pages |
| --- | --- | --- |
| Header, navigation, theme toggle | `Header.tsx` | all |
| Footer | `Footer.tsx` | all |
| Four-figure strip | `VoaModelSection` | all closing pages |
| Contact / "Let's talk" | `NextStepSection` + `ContactForm` | 9 |
| Rotating background | `RotatingBackdrop` | home hero, every closing section |
| Accordion | `Accordion` in `SourcePage.tsx` | services, `/about`, `/why-voa` |
| Client carousel | `ClientCarousel.tsx` | home, `/client-stories` |
| Testimonial grid | inline | home, `/client-stories`, 10 service pages |
| Fit-flow diagram | inline + `ItemGlyphs` | 10 service pages |
| Stage glyphs | `StageGlyphs.tsx` | home, `/how-it-works` |
| Heading accent | `HeadingAccent.tsx` | all |
| Icon set | `Icons.tsx` | all |

## 11. Placeholders and items needing approval

| # | Item | Status |
| --- | --- | --- |
| 1 | Video content — URLs, captions, transcripts | **Blocked on client** |
| 2 | Testimonial portraits | **Blocked** — initials are placeholders, nothing may be generated |
| 3 | Service-page feedback cards (30 placeholder quotes) | **Blocked on client** |
| 4 | Consent for the 4 named testimonials | **Granted** 2026-10-03 (client confirms permission exists) |
| 5 | Permission for the 30 client logos | **Granted** 2026-10-03 (client confirms permission exists) |
| 6 | Contact-form recipient, retention and consent wording | **Outstanding** |
| 7 | Founder portrait rights | **Outstanding** |
| 8 | Fonts — Manrope and Inter | **Resolved 2026-10-03: self-host both in the theme.** Open-licensed, no cost |
| 9 | Route naming for the three renamed services, and `/why-voa` | **Unresolved** |
| 10 | Page-level SEO — `index.html` carries one generic prototype title and description for all 52 routes | **Not implemented** |
| 11 | Privacy policy, terms, cookie consent | **Not built** |
| 12 | The 68 live articles not in this build | **Resolved 2026-10-03 — migrate all** |
| 13 | `Rezi Finance (1)` client name artefact | **Needs cleaning** |
| 14 | Three `stagingsite2` links inside article bodies | **Needs correcting** |

## 12. Known dead code

- `.role-fit` CSS in `global.css` — nothing renders it since the fit section became `.fit-flow`.
- `.legacy-home-founder` markup on the home page — hidden by CSS, kept pending a parity check.
- `FinalCta` is a historical function name; it renders a contact form. Judge by behaviour, not name.

Neither affects the migration. Both are cleanup candidates inside an approved task.
