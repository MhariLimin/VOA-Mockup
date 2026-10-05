<?php
/**
 * Content data and the helpers that read it.
 *
 * The theme's copy is not typed into templates. It is exported from the React build's own content
 * modules by scripts/wordpress/export-content.mjs into data/*.json, so the two can only differ if the
 * export is stale. Edit the React content, re-run the export, commit both.
 *
 * Images named in the data are /assets/... paths from the React build. The export copies every one of
 * them into assets/media/ under the same sub-path, and voa_media_url() maps one to the other.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Read one data file, decoded to arrays. Cached for the request.
 *
 * @param string $name File name without extension: site, home, pages, services, process, managed,
 *                     faqs, testimonials, clients, articles, accent.
 * @return array
 */
function voa_data( $name ) {
	static $cache = array();

	if ( ! isset( $cache[ $name ] ) ) {
		$file = get_template_directory() . '/data/' . $name . '.json';
		$json = file_exists( $file ) ? json_decode( file_get_contents( $file ), true ) : null; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

		if ( null === $json && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			trigger_error( esc_html( 'VOA theme: missing or invalid data/' . $name . '.json' ), E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
		}

		$cache[ $name ] = is_array( $json ) ? $json : array();
	}

	return $cache[ $name ];
}

/**
 * The brief for one React route — eyebrow, title, summary, image — keyed by its path.
 *
 * @param string $path React route, such as "/about".
 * @return array
 */
function voa_page( $path ) {
	$pages = voa_data( 'pages' );
	return isset( $pages[ $path ] ) ? $pages[ $path ] : array();
}

/**
 * Public URL of an image the React build serves from /assets/.
 *
 * @param string $path Such as "/assets/client/hero/hero-tablet-office.jpg".
 * @return string
 */
function voa_media_url( $path ) {
	if ( 0 === strpos( $path, '/assets/voa-logo' ) ) {
		return get_theme_file_uri( 'assets/images/' . substr( $path, strlen( '/assets/' ) ) );
	}

	return get_theme_file_uri( 'assets/media/' . substr( $path, strlen( '/assets/' ) ) );
}

/**
 * Site URL for a React route.
 *
 * Routes keep their React paths, with the trailing slash WordPress permalinks use. A hash survives.
 *
 * @param string $route Such as "/services/mortgage-loans-processing-virtual-support" or "#scope".
 * @return string
 */
function voa_url( $route ) {
	if ( '' === $route || '#' === $route[0] ) {
		return $route;
	}

	$parts = explode( '#', $route, 2 );
	$path  = '/' === $parts[0] ? '/' : trailingslashit( $parts[0] );

	return home_url( $path ) . ( isset( $parts[1] ) ? '#' . $parts[1] : '' );
}

/**
 * A heading with its accent phrase wrapped in <em>, escaped.
 *
 * The port of HeadingAccent.tsx. The phrase list is read from that component's source by the export,
 * already sorted longest first, so this only has to find the first phrase that matches. As there,
 * only the first match is wrapped, and only one.
 *
 * @param string $text Plain heading text.
 * @return string Safe HTML.
 */
function voa_accent( $text ) {
	foreach ( voa_data( 'accent' ) as $phrase ) {
		if ( preg_match( '/\b' . preg_quote( $phrase, '/' ) . '\b/i', $text, $match, PREG_OFFSET_CAPTURE ) ) {
			$start = $match[0][1];
			$end   = $start + strlen( $match[0][0] );

			return esc_html( substr( $text, 0, $start ) )
				. '<em>' . esc_html( $match[0][0] ) . '</em>'
				. esc_html( substr( $text, $end ) );
		}
	}

	return esc_html( $text );
}

/**
 * Two-digit index, as the cards and steps number themselves: 1 becomes "01".
 *
 * @param int $number Number.
 * @return string
 */
function voa_index( $number ) {
	return str_pad( (string) $number, 2, '0', STR_PAD_LEFT );
}

/**
 * The React build's article date format: "25 August 2025".
 *
 * @param int|WP_Post|null $post Post.
 * @return string
 */
function voa_article_date( $post = null ) {
	return get_the_date( 'j F Y', $post );
}

/**
 * The topic an article is filed under.
 *
 * Uses the post's own category where one has been set. The live posts have none, so otherwise this is
 * the port of articleCategory() in blogContent.ts, which classifies from the title and excerpt — the
 * same answer the React build gives for the same article.
 *
 * @param int|WP_Post|null $post Post.
 * @return string
 */
function voa_article_category( $post = null ) {
	$post = get_post( $post );

	foreach ( get_the_category( $post->ID ) as $term ) {
		if ( 'uncategorized' !== $term->slug ) {
			return $term->name;
		}
	}

	$text = strtolower( $post->post_title . ' ' . voa_article_excerpt( $post ) );

	$rules = array(
		'Mortgage & loans'  => '/mortgage|loan|broker/',
		'Finance'           => '/financial plan|bookkeep|accounting|finances/',
		'Real estate'       => '/real estate|property/',
		'Marketing'         => '/marketing|social media/',
		'Business growth'   => '/burnout|ceo|growth|business/',
	);

	foreach ( $rules as $category => $pattern ) {
		if ( preg_match( $pattern, $text ) ) {
			return $category;
		}
	}

	return 'Virtual assistance';
}

/**
 * The excerpt as the source site wrote it, falling back to WordPress's generated one.
 *
 * @param WP_Post $post Post.
 * @return string
 */
function voa_article_excerpt( $post ) {
	return has_excerpt( $post ) ? $post->post_excerpt : wp_trim_words( wp_strip_all_tags( $post->post_content ), 55 );
}

/**
 * Featured image URL, or an empty string.
 *
 * @param int|WP_Post|null $post Post.
 * @return string
 */
function voa_article_image( $post = null ) {
	$url = get_the_post_thumbnail_url( $post, 'large' );
	return $url ? $url : '';
}

/**
 * Articles in the order the React build lists them: newest first.
 *
 * @param int $limit -1 for all.
 * @return WP_Post[]
 */
function voa_articles( $limit = -1 ) {
	return get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => $limit,
			'orderby'        => 'date',
			'order'          => 'DESC',
			'no_found_rows'  => true,
		)
	);
}

/**
 * An article's image, or the tinted fallback block when it has none (decision A5).
 *
 * @param WP_Post $post Post.
 * @param string  $alt  Alt text; the cards leave it empty, as the title beside them names the article.
 */
function voa_article_image_tag( $post, $alt = '' ) {
	$url = voa_article_image( $post );

	if ( $url ) {
		printf( '<img src="%s" alt="%s" loading="lazy">', esc_url( $url ), esc_attr( $alt ) );
		return;
	}

	printf( '<span class="image-fallback" aria-hidden="true">%s</span>', esc_html( voa_article_category( $post ) ) );
}

/**
 * A number as JavaScript prints it: the shortest form that round-trips, and no ".0" on whole numbers.
 *
 * Where React writes a computed value into the page (a percentage, a coordinate), PHP's own float
 * formatting would round it differently. json_encode() uses the same shortest round-trip form as
 * JavaScript on PHP 7.1 and later.
 *
 * @param float $number Number.
 * @return string
 */
function voa_js_number( $number ) {
	if ( floor( $number ) === (float) $number && abs( $number ) < 1e15 ) {
		return (string) (int) $number;
	}

	return wp_json_encode( $number );
}
