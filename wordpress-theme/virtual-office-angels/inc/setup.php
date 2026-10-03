<?php
/**
 * Theme supports, menus and image sizes.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register theme features.
 */
function voa_setup() {
	load_theme_textdomain( 'voa', get_template_directory() . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' )
	);

	/*
	 * The real Virtual Office Angels logo must never be replaced with plain "VOA" lettering, so the
	 * theme ships the artwork and only allows a swap at the same proportions. Two files exist: the
	 * standard mark and a lifted variant for the dark theme, because the brand blue reaches only
	 * 2.55:1 against the dark header surface.
	 */
	add_theme_support(
		'custom-logo',
		array(
			'width'       => 700,
			'height'      => 127,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary navigation', 'voa' ),
			'footer'  => __( 'Footer navigation', 'voa' ),
		)
	);
}
add_action( 'after_setup_theme', 'voa_setup' );

/**
 * Image sizes matching the design.
 *
 * WordPress generates these on upload, which is a straight improvement on the React build — that one
 * has no srcset at all and serves full-size photographs to phones.
 */
function voa_image_sizes() {
	add_image_size( 'voa-card', 720, 460, true );      // article and service cards
	add_image_size( 'voa-thumb', 380, 240, true );     // service card thumbnail, insights rail
	add_image_size( 'voa-hero', 1920, 1080, true );    // rotating hero and closing backgrounds
	add_image_size( 'voa-portrait', 640, 800, true );  // founder, leadership
	add_image_size( 'voa-logo', 300, 150, false );     // client logos, uncropped
}
add_action( 'after_setup_theme', 'voa_image_sizes' );

/**
 * Content width, used by embeds.
 */
function voa_content_width() {
	$GLOBALS['content_width'] = 1180;
}
add_action( 'after_setup_theme', 'voa_content_width', 0 );
