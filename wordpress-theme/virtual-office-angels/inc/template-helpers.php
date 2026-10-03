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
