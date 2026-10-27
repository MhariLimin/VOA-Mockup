<?php
/**
 * City landing pages — LocationPage.tsx and content/locationPages.ts.
 *
 * Their copy is exported to data/locations.json, keyed by city ("sydney"), and each city is an ordinary
 * WordPress page at the address the copy names (/virtual-assistants-sydney/). Site setup creates the
 * pages; this file sends them to page-location.php, whatever their page template says.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The city whose page has this slug, or an empty string.
 *
 * @param string $slug Page slug, such as "virtual-assistants-sydney".
 * @return string City key, such as "sydney".
 */
function voa_location_for_slug( $slug ) {
	foreach ( voa_data_raw( 'locations' ) as $city => $page ) {
		if ( isset( $page['path'] ) && trim( $page['path'], '/' ) === $slug ) {
			return $city;
		}
	}
	return '';
}

/**
 * The city of the page being shown, or an empty string.
 *
 * @return string
 */
function voa_current_location() {
	$post = get_queried_object();
	return $post instanceof WP_Post && 'page' === $post->post_type ? voa_location_for_slug( $post->post_name ) : '';
}

/**
 * Render city pages with page-location.php.
 *
 * @param string $template Template WordPress chose.
 * @return string
 */
function voa_location_template( $template ) {
	if ( is_page() && voa_current_location() ) {
		$located = locate_template( 'page-location.php' );
		if ( $located ) {
			return $located;
		}
	}
	return $template;
}
add_filter( 'template_include', 'voa_location_template' );

/**
 * The copy's two marks, as inline() in LocationPage.tsx renders them: [label](address) is a link, an
 * external one opening in a new tab, and *word* a highlighted heading word. Everything else is escaped.
 *
 * @param string $text Copy.
 * @return string Safe HTML.
 */
function voa_location_inline( $text ) {
	$html = '';
	$last = 0;
	if ( preg_match_all( '/\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/', $text, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE ) ) {
		foreach ( $matches as $match ) {
			$start = $match[0][1];
			$html .= esc_html( substr( $text, $last, $start - $last ) );
			if ( isset( $match[3] ) && '' !== $match[3][0] ) {
				$html .= '<em>' . esc_html( $match[3][0] ) . '</em>';
			} elseif ( 0 === strpos( $match[2][0], '/' ) ) {
				$html .= '<a href="' . esc_url( voa_url( $match[2][0] ) ) . '">' . esc_html( $match[1][0] ) . '</a>';
			} else {
				$html .= '<a href="' . esc_url( $match[2][0] ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( $match[1][0] ) . '</a>';
			}
			$last = $start + strlen( $match[0][0] );
		}
	}
	return $html . esc_html( substr( $text, $last ) );
}
