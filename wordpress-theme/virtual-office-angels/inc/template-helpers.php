<?php
/**
 * Small helpers used across templates.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The company name, written out.
 *
 * Every user-facing reference says "Virtual Office Angels", never the abbreviation "VOA". Centralised
 * so that rule cannot drift one template at a time.
 */
function voa_company_name() {
	return __( 'Virtual Office Angels', 'voa' );
}

/**
 * The site logo, in both themes.
 *
 * Two files, swapped by CSS on [data-theme='dark']. The brand blue reaches only 2.55:1 against the
 * dark header surface; the lifted variant reaches 7.12:1. The orange halo is identical in both.
 *
 * The <a> carries the accessible name, so both images are decorative — otherwise a screen reader
 * announces the company name twice.
 */
function voa_brand_logo() {
	$light = get_theme_file_uri( '/assets/images/voa-logo.png' );
	$dark  = get_theme_file_uri( '/assets/images/voa-logo-dark.png' );

	printf(
		'<a class="brand" href="%s" aria-label="%s">
			<img class="brand-mark-light" src="%s" width="700" height="127" alt="">
			<img class="brand-mark-dark" src="%s" width="700" height="127" alt="">
		</a>',
		esc_url( home_url( '/' ) ),
		/* translators: %s: company name. */
		esc_attr( sprintf( __( '%s home', 'voa' ), voa_company_name() ) ),
		esc_url( $light ),
		esc_url( $dark )
	);
}

/**
 * Highlight specific words in a heading.
 *
 * The React build wraps chosen words in <em> and colours them with --heading-accent, matching the
 * words the approved design colours. Editors mark them the same way in the block editor, so this only
 * has to allow the tag through rather than guess at which words to pick.
 *
 * @param string $heading Heading text, which may contain <em>.
 * @return string
 */
function voa_heading( $heading ) {
	return wp_kses( $heading, array( 'em' => array(), 'br' => array() ) );
}

/**
 * A post's thumbnail, with the agreed fallback.
 *
 * Decision 2026-10-03: a post with no featured image gets a tinted block carrying its category,
 * rather than pulling the first image out of the body — that is usually a logo or a chart and makes a
 * poor thumbnail. It also means a post added later without one still looks deliberate.
 *
 * @param string $size Image size.
 */
function voa_post_thumbnail( $size = 'voa-card' ) {
	if ( has_post_thumbnail() ) {
		the_post_thumbnail( $size, array( 'loading' => 'lazy', 'alt' => '' ) );
		return;
	}

	$categories = get_the_category();
	$label      = ! empty( $categories ) ? $categories[0]->name : __( 'Insights', 'voa' );

	printf(
		'<span class="thumb-fallback" aria-hidden="true"><span>%s</span></span>',
		esc_html( $label )
	);
}

/**
 * Format a date the way the design does: "18 March 2025".
 *
 * @param int|WP_Post|null $post Post.
 * @return string
 */
function voa_article_date( $post = null ) {
	return get_the_date( 'j F Y', $post );
}

/**
 * Whether the current request should render the closing contact section.
 *
 * Every page carries it except the ones that already end with a form, and the utility pages.
 */
function voa_show_closing_section() {
	return ! is_page_template( 'page-templates/page-contact.php' )
		&& ! is_page_template( 'page-templates/page-thank-you.php' )
		&& ! is_404();
}

/**
 * Background image URLs for a rotating backdrop.
 *
 * Stored as an option holding attachment IDs, so the client picks them from the media library rather
 * than pasting paths. An ID whose attachment has been deleted is skipped rather than rendering a
 * broken image.
 *
 * @param string $option Option name, e.g. voa_hero_backgrounds.
 * @return string[] Image URLs.
 */
function voa_background_images( $option ) {
	$ids  = get_option( $option, array() );
	$urls = array();

	if ( ! is_array( $ids ) ) {
		return $urls;
	}

	foreach ( $ids as $id ) {
		$url = wp_get_attachment_image_url( (int) $id, 'voa-hero' );

		if ( $url ) {
			$urls[] = $url;
		}
	}

	return $urls;
}

/**
 * The URL of a page by slug, falling back to the home page.
 *
 * Templates link to /contact and /services by name. Before those pages exist — on a fresh install, or
 * while content is still being built — this returns home rather than an empty href, which would be a
 * dead link in the markup.
 *
 * @param string $slug Page slug.
 * @return string
 */
function voa_page_url( $slug ) {
	$page = get_page_by_path( $slug );

	return $page ? get_permalink( $page ) : home_url( '/' );
}

/**
 * A service's systems list.
 *
 * Stored as one system per line in post meta rather than as a repeater field, which is what let this
 * build avoid an ACF Pro licence. Blank lines are dropped so a stray newline in the editor does not
 * render an empty item.
 *
 * @param int $post_id Service post id.
 * @return string[]
 */
function voa_service_systems( $post_id ) {
	$raw = (string) get_post_meta( $post_id, 'voa_systems', true );

	if ( '' === trim( $raw ) ) {
		return array();
	}

	return array_values( array_filter( array_map( 'trim', preg_split( '/
|
|
/', $raw ) ) ) );
}

/**
 * Shorten text to a whole word, with an ellipsis.
 *
 * Home-page testimonial previews are shortened rather than wrapped, so the three cards stay the same
 * height. Cuts on a word boundary — a mid-word truncation reads as a rendering fault.
 *
 * @param string $text  Plain text.
 * @param int    $limit Maximum characters.
 * @return string
 */
function voa_shorten( $text, $limit ) {
	$text = trim( preg_replace( '/\s+/', ' ', $text ) );

	if ( mb_strlen( $text ) <= $limit ) {
		return $text;
	}

	$cut   = mb_substr( $text, 0, $limit );
	$space = mb_strrpos( $cut, ' ' );

	if ( false !== $space ) {
		$cut = mb_substr( $cut, 0, $space );
	}

	return rtrim( $cut, ' ,.;:' ) . '…';
}

/**
 * Initials from a name, for the testimonial avatars.
 *
 * These are placeholders standing in for photographs. No verified client portraits exist, and none
 * may be generated or assigned.
 *
 * @param string $name Full name.
 * @return string One or two uppercase letters.
 */
function voa_initials( $name ) {
	$parts = preg_split( '/\s+/', trim( (string) $name ) );
	$parts = array_values( array_filter( $parts ) );

	if ( ! $parts ) {
		return '';
	}

	$first = mb_strtoupper( mb_substr( $parts[0], 0, 1 ) );

	if ( count( $parts ) < 2 ) {
		return $first;
	}

	return $first . mb_strtoupper( mb_substr( end( $parts ), 0, 1 ) );
}
