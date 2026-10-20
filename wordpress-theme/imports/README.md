# Single-post import for VOA staging

`when-does-a-remote-support-role-require-industry-experience.xml` contains only the 15 October 2026 article, its featured-image attachment, and its public Yoast SEO title and description. It does not replace or re-clone any existing staging content.

1. Sign in to `https://virtualofficeangels.com.au/staging/1384/wp-admin/` as an Administrator. Check **Posts > All Posts** for the article title first; do not import twice.
2. Go to **Tools > Import > WordPress**. Install the official WordPress Importer if the screen offers **Install Now**, then select **Run Importer**.
3. Upload the XML in this folder. Map the export author to an existing staging user rather than creating a new user.
4. Tick **Download and import file attachments**, then submit the import once.
5. Open the imported post and confirm its slug, body, featured image, published date, and Yoast SEO title/description. The image import depends on the live image URL remaining reachable.

The XML contains rendered HTML from the public WordPress API, so the text is editable in WordPress but original Gutenberg block structure may not be preserved. The article's source links remain unchanged. The import has been XML-validated locally, but a WordPress-admin import still needs to be tested.

Reference: https://developer.wordpress.org/advanced-administration/wordpress/import/
