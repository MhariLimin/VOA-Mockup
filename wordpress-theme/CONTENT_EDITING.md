# Editing website content in WordPress

The approved page templates remain fixed. Copy and images can be changed in wp-admin; visitors to a public page cannot edit it.

## Access

1. An administrator assigns the **VOA Content Editor** role under **Users**. Administrators also have access.
2. Sign in at `/wp-admin/`, open **Website Content** in the left menu, and choose a page or service.
3. Edit headings, descriptions, section text, FAQs, client logos, testimonials, or images shown for that page, then click **Save page content**.
4. Image fields use **Choose image** (WordPress Media Library). **Use original** restores the theme image when saved.

This role can read wp-admin and upload media. It cannot edit the theme, menus, page-builder blocks, URLs, or layout. The public staging URL remains view-only. Existing articles are still managed under **Posts** by an existing WordPress Editor or Administrator; this new role is not granted article permissions.

## Scope and behavior

- The 11 designed pages, 10 service pages and 3 city pages (**City page: Sydney**, **Brisbane**, **Melbourne**) appear in **Website Content**. Their field list is based on the theme's exported defaults plus template-local copy.
- City page copy keeps two marks, shown under each field that uses them: `[link text](address)` makes a link and `*word*` highlights a word. Each client on a city page has a logo field; a client without a logo shows its name until one is chosen. The city pages' Yoast title and description are set once by **Appearance → Site setup** and are then edited in Yoast, not here.
- Header, footer, logo, navigation, link destinations, layout, icons, and fixed UI labels are intentionally not editable here.
- The client's logo carousel and testimonials are edited under **Client Stories**. Those changes also appear in their homepage previews.
- The hero statistics are edited under **Home** and reused in closing strips on other pages.
- WordPress Media Library images are stored as attachment IDs. Only actual image attachments are accepted when saving.
- Saving a field back to its original value removes that override. Defaults remain in the theme files; changes are stored separately in WordPress options.
- `npm run wp:export` and theme updates do not overwrite saved WordPress content. A fresh site still displays the approved defaults.

## Deployment and checks

1. Upload the new theme ZIP or deploy the updated theme folder. Keep a database backup before replacing a live theme.
2. Sign in as an Administrator once to register the new role and capability, then assign **VOA Content Editor** to authorized staff only.
3. Edit a harmless test heading and image on staging, view the public page, then restore the originals and save.
4. Confirm an unauthorized or logged-out visitor sees no **Website Content** admin screen.

Changes in this content editor are immediately public after saving. If the site uses a page cache or CDN, purge that cache to see an edit immediately. Review the final wording and imagery before saving on a live site.
