<?php
/**
 * Theme supports, and the WordPress defaults switched off because they would make pages differ from
 * the approved build.
 *
 * Not registered, on purpose:
 *   - Menus. The navigation renders from data/site.json; see header.php for why.
 *   - A custom logo. The real Virtual Office Angels artwork ships with the theme, in both its light
 *     and dark-theme exports, and must not be swapped for anything else.
 *   - Extra image sizes. Every design image ships in assets/media; articles use WordPress's own sizes.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register theme features.
 */
function voa_setup() {
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	add_theme_support(
		'html5',
		array( 'search-form', 'gallery', 'caption', 'style', 'script' )
	);
}
add_action( 'after_setup_theme', 'voa_setup' );

/**
 * Content width, used by embeds.
 */
function voa_content_width() {
	$GLOBALS['content_width'] = 1180;
}
add_action( 'after_setup_theme', 'voa_content_width', 0 );

/**
 * Turn off WordPress's emoji replacement. It swaps emoji characters for images — including the ☾ and
 * ☀ on the theme switch — and loads a script on every page to do it.
 */
function voa_disable_emoji() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_enqueue_scripts', 'wp_enqueue_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'voa_disable_emoji' );
