<?php
/**
 * Article addresses: /insights/{article}/.
 *
 * Decision of 2026-10-05 (VOA_Redirect_Map.xlsx): articles move from the live site's /{article}/ to
 * /insights/{article}/, the address the React build already uses. The address itself is the post
 * permalink structure, a site setting, which Appearance → Site setup sets (voa_set_article_permalinks).
 *
 * A static start to the structure ("/insights/") is also WordPress's "front", which it puts in front of
 * the author, category and tag archives too. The map keeps /author/anne/ where it is and redirects the
 * category and tag archives from their current addresses, so those stay off the front.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/** The post permalink structure the site uses. */
const VOA_ARTICLE_PERMALINKS = '/insights/%postname%/';

/**
 * Keep category and tag archives at /category/… and /tag/…, not /insights/category/….
 *
 * @param array  $args     Taxonomy registration arguments.
 * @param string $taxonomy Taxonomy name.
 * @return array
 */
function voa_archives_off_the_front( $args, $taxonomy ) {
	if ( in_array( $taxonomy, array( 'category', 'post_tag' ), true ) ) {
		$args['rewrite'] = array_merge( is_array( $args['rewrite'] ?? null ) ? $args['rewrite'] : array(), array( 'with_front' => false ) );
	}

	return $args;
}
add_filter( 'register_taxonomy_args', 'voa_archives_off_the_front', 10, 2 );

/**
 * Keep author archives at /author/{name}/. WordPress has no argument for this, so the author
 * permastruct is set directly: on every request, and again whenever the permalink structure is
 * changed, because changing it resets the rewrite settings before the rules are rebuilt.
 */
function voa_author_archives_off_the_front() {
	global $wp_rewrite;

	if ( $wp_rewrite->using_permalinks() ) {
		$wp_rewrite->author_structure = '/' . $wp_rewrite->author_base . '/%author%';
	}
}
add_action( 'init', 'voa_author_archives_off_the_front', 1 );
add_action( 'permalink_structure_changed', 'voa_author_archives_off_the_front' );

/**
 * /insights/page/2/ is the Insights page's second page, not an article named "page". Without this
 * rule the article rule, which comes first, would claim the address and return a 404. The page
 * itself pages in place (interactions.js); this keeps the plain address working too.
 */
function voa_insights_paging_rule() {
	$insights = (int) get_option( 'page_for_posts' );

	if ( $insights ) {
		add_rewrite_rule( '^insights/page/([0-9]{1,})/?$', 'index.php?page_id=' . $insights . '&paged=$matches[1]', 'top' );
	}
}
add_action( 'init', 'voa_insights_paging_rule' );

/**
 * Set the article permalink structure. Called by Site setup; does nothing if it is already set.
 *
 * @return string What was done, for the setup log, or '' when nothing was.
 */
function voa_set_article_permalinks() {
	global $wp_rewrite;

	if ( VOA_ARTICLE_PERMALINKS === get_option( 'permalink_structure' ) ) {
		return '';
	}

	$wp_rewrite->set_permalink_structure( VOA_ARTICLE_PERMALINKS );

	return 'Set article addresses to /insights/{article}/ (Settings → Permalinks)';
}
