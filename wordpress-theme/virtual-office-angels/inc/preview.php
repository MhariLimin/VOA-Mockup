<?php
/**
 * The Preview theme: the mockup's items still waiting for approval (8 November 2026).
 *
 * One code base builds two themes. `npm run wp:zip` packages "Virtual Office Angels" without the
 * data-preview/ folder, and "Virtual Office Angels (Preview)" with it; that folder is the only switch.
 * In the preview:
 *   - articles show the categories suggested to VA Paola (data-preview/articles.json, by slug)
 *   - Insights has the Topic dropdown and leaves out News & Community, which has its own page
 *   - /news-and-community/, /privacy-policy/ and /terms-of-use/ exist, with the menu item and the
 *     footer links
 *
 * Nothing here writes to the database: no pages are created and no post categories are changed. The
 * three pages are rewrite rules the preview adds and the approved theme removes, so switching back to
 * the approved theme leaves the site exactly as it was.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/** True in the Preview theme: its ZIP carries data-preview/. */
function voa_is_preview() {
	static $on = null;
	if ( null === $on ) {
		$on = is_dir( get_template_directory() . '/data-preview' );
	}
	return $on;
}

/** The preview pages: address => [ key, title ]. */
function voa_preview_routes() {
	return array(
		'news-and-community' => array( 'news', 'News & Community' ),
		'privacy-policy'     => array( 'privacy', 'Privacy Policy' ),
		'terms-of-use'       => array( 'terms', 'Terms of Use' ),
	);
}

/* --- Articles ------------------------------------------------------------------------------- */

/** The preview's record for one article (category, card fallback), by slug; empty if none. */
function voa_preview_article( $post ) {
	static $by_slug = null;
	if ( null === $by_slug ) {
		$by_slug = array();
		foreach ( voa_data_raw( 'articles' ) as $article ) {
			$by_slug[ $article['slug'] ] = $article;
		}
	}
	$post = get_post( $post );
	return $post && isset( $by_slug[ $post->post_name ] ) ? $by_slug[ $post->post_name ] : array();
}

/** The suggested category for an article in the preview, or '' to fall back to the usual rule. */
function voa_preview_category( $post ) {
	if ( ! voa_is_preview() ) {
		return '';
	}
	$article = voa_preview_article( $post );
	return isset( $article['category'] ) ? $article['category'] : '';
}

/** The category that has its own page, News & Community. */
function voa_news_category() {
	$library = voa_data_raw( 'library' );
	return isset( $library['newsCategory'] ) ? $library['newsCategory'] : 'News & Community';
}

/** Whether an article belongs on News & Community rather than Insights (always false when approved). */
function voa_is_news_article( $post ) {
	return voa_is_preview() && voa_preview_category( $post ) === voa_news_category();
}

/**
 * Articles newest first, split as the mockup splits them: Insights without News & Community, or News
 * & Community alone. Outside the preview, every article (the approved behaviour).
 *
 * @param bool $news  True for the News & Community articles.
 * @param int  $limit How many; -1 for all.
 * @return WP_Post[]
 */
function voa_library_articles( $news = false, $limit = -1 ) {
	if ( ! voa_is_preview() ) {
		return $news ? array() : voa_articles( $limit );
	}
	$articles = array_values(
		array_filter(
			voa_articles(),
			function ( $post ) use ( $news ) {
				return voa_is_news_article( $post ) === $news;
			}
		)
	);
	return $limit > 0 ? array_slice( $articles, 0, $limit ) : $articles;
}

/** A card's picture when the article has none (articleCardImage in the mockup), or ''. */
function voa_preview_card_fallback( $post ) {
	if ( ! voa_is_preview() ) {
		return '';
	}
	$article = voa_preview_article( $post );
	return empty( $article['cardFallback'] ) ? '' : voa_media_url( $article['cardFallback'] );
}

/**
 * Where an article page's back link goes and which article "Read next" shows: within its own list,
 * newest first, wrapping from the oldest to the newest, as BlogArticlePage.tsx does.
 *
 * @param WP_Post $post Article.
 * @return array{ back_url: string, back_label: string, next: WP_Post|null }
 */
function voa_preview_article_nav( $post ) {
	$news  = voa_is_news_article( $post );
	$group = voa_library_articles( $news );
	$next  = null;
	foreach ( $group as $index => $item ) {
		if ( $item->ID === $post->ID ) {
			$candidate = $group[ ( $index + 1 ) % count( $group ) ];
			$next      = $candidate->ID === $post->ID ? null : $candidate;
			break;
		}
	}
	return array(
		'back_url'   => voa_url( $news ? '/news-and-community' : '/insights' ),
		'back_label' => $news ? 'All news' : 'All insights',
		'next'       => $next,
	);
}

/* --- The preview pages ------------------------------------------------------------------------ */

function voa_preview_query_var( $vars ) {
	$vars[] = 'voa_preview';
	return $vars;
}
add_filter( 'query_vars', 'voa_preview_query_var' );

/**
 * The preview adds its three addresses; the approved theme adds none. When the set changes (switching
 * theme either way, or a preview update that adds a page), the rules are rebuilt once.
 */
function voa_preview_rewrites() {
	$routes = voa_is_preview() ? array_keys( voa_preview_routes() ) : array();
	if ( voa_is_preview() ) {
		foreach ( voa_preview_routes() as $path => $route ) {
			add_rewrite_rule( '^' . $path . '/?$', 'index.php?voa_preview=' . $route[0], 'top' );
		}
	}
	$signature = implode( ',', $routes );
	if ( get_option( 'voa_preview_routes', '' ) !== $signature ) {
		flush_rewrite_rules( false );
		update_option( 'voa_preview_routes', $signature, true );
	}
}
add_action( 'init', 'voa_preview_rewrites', 20 );

/** The current preview page's key ('news', 'privacy', 'terms'), or ''. */
function voa_preview_page() {
	if ( ! voa_is_preview() ) {
		return '';
	}
	$key = get_query_var( 'voa_preview' );
	foreach ( voa_preview_routes() as $route ) {
		if ( $route[0] === $key ) {
			return $key;
		}
	}
	return '';
}

/** The preview page's address and title. */
function voa_preview_page_info( $key ) {
	foreach ( voa_preview_routes() as $path => $route ) {
		if ( $route[0] === $key ) {
			return array( 'url' => voa_url( '/' . $path ), 'title' => $route[1] );
		}
	}
	return array( 'url' => home_url( '/' ), 'title' => '' );
}

function voa_preview_template( $template ) {
	$key = voa_preview_page();
	if ( '' === $key ) {
		return $template;
	}
	$file = locate_template( 'news' === $key ? 'preview/news.php' : 'preview/legal.php' );
	return $file ? $file : $template;
}
add_filter( 'template_include', 'voa_preview_template', 20 );

/* The address has no post behind it: keep WordPress from answering 404. */
function voa_preview_not_404( $preempt ) {
	if ( '' !== voa_preview_page() ) {
		status_header( 200 );
		return true;
	}
	return $preempt;
}
add_filter( 'pre_handle_404', 'voa_preview_not_404' );

function voa_preview_title( $title ) {
	$key = voa_preview_page();
	if ( '' === $key ) {
		return $title;
	}
	$info = voa_preview_page_info( $key );
	return $info['title'] . ' | Virtual Office Angels';
}
add_filter( 'pre_get_document_title', 'voa_preview_title', 20 );
add_filter( 'wpseo_title', 'voa_preview_title', 20 );
add_filter( 'wpseo_opengraph_title', 'voa_preview_title', 20 );

function voa_preview_canonical( $url ) {
	$key = voa_preview_page();
	if ( '' === $key ) {
		return $url;
	}
	$info = voa_preview_page_info( $key );
	return $info['url'];
}
add_filter( 'wpseo_canonical', 'voa_preview_canonical', 20 );
add_filter( 'wpseo_opengraph_url', 'voa_preview_canonical', 20 );

/* Drafts waiting for approval: kept out of search engines even if the preview is ever live. */
function voa_preview_robots( $robots ) {
	return '' === voa_preview_page() ? $robots : 'noindex, follow';
}
add_filter( 'wpseo_robots', 'voa_preview_robots', 20 );

function voa_preview_body_class( $classes ) {
	if ( '' !== voa_preview_page() ) {
		$classes[] = 'voa-preview-' . voa_preview_page();
	}
	return $classes;
}
add_filter( 'body_class', 'voa_preview_body_class' );
