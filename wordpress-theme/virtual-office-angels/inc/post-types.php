<?php
/**
 * Custom post types.
 *
 * Registered by the theme rather than a plugin, per the decision recorded on 2026-10-03.
 *
 * The trade-off, stated so it is not forgotten: swap the theme and these disappear from the admin,
 * though the rows stay in the database. That is accepted because this theme is bespoke and will not
 * be swapped. If that ever changes, move this file into a small site-specific plugin — nothing else
 * needs to change.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Services.
 *
 * A post type rather than Pages because each service carries 27 structured fields, six of them
 * repeating. `rewrite` gives /services/{slug}/ for free, matching the approved design's routes
 * exactly. `has_archive` is false because /services is a real Page with its own template, not a
 * generated archive.
 */
function voa_register_service_post_type() {
	register_post_type(
		'voa_service',
		array(
			'labels'       => array(
				'name'               => __( 'Services', 'voa' ),
				'singular_name'      => __( 'Service', 'voa' ),
				'add_new_item'       => __( 'Add new service', 'voa' ),
				'edit_item'          => __( 'Edit service', 'voa' ),
				'new_item'           => __( 'New service', 'voa' ),
				'view_item'          => __( 'View service', 'voa' ),
				'search_items'       => __( 'Search services', 'voa' ),
				'not_found'          => __( 'No services found', 'voa' ),
				'all_items'          => __( 'All services', 'voa' ),
				'menu_name'          => __( 'Services', 'voa' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-portfolio',
			'menu_position' => 21,
			'rewrite'      => array(
				'slug'       => 'services',
				'with_front' => false,
			),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes', 'custom-fields' ),
			'show_in_rest' => true, // Required, or the block editor falls back to the classic one.
		)
	);
}
add_action( 'init', 'voa_register_service_post_type' );

/**
 * Testimonials.
 *
 * Replaces the Testimonials Showcase plugin. `public => false` means no single pages, no archive and
 * no sitemap entry — which removes the stray public ttshowcase sitemap the live site publishes today.
 * `show_ui` keeps them editable in the admin.
 *
 * Before Testimonials Showcase is deactivated on staging, its four entries must be copied out. They
 * are not recoverable afterwards without a database dig.
 */
function voa_register_testimonial_post_type() {
	register_post_type(
		'voa_testimonial',
		array(
			'labels'              => array(
				'name'          => __( 'Testimonials', 'voa' ),
				'singular_name' => __( 'Testimonial', 'voa' ),
				'add_new_item'  => __( 'Add new testimonial', 'voa' ),
				'edit_item'     => __( 'Edit testimonial', 'voa' ),
				'all_items'     => __( 'All testimonials', 'voa' ),
				'menu_name'     => __( 'Testimonials', 'voa' ),
			),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'has_archive'         => false,
			'menu_icon'           => 'dashicons-format-quote',
			'menu_position'       => 22,
			'supports'            => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'show_in_rest'        => true,
		)
	);
}
add_action( 'init', 'voa_register_testimonial_post_type' );

/**
 * Client logos.
 *
 * Replaces WP Logo Showcase. Same shape as testimonials and the same warning: export before
 * deactivating that plugin. Thirty entries exist, and the client has confirmed permission to display
 * them (2026-10-03).
 */
function voa_register_client_post_type() {
	register_post_type(
		'voa_client',
		array(
			'labels'              => array(
				'name'          => __( 'Clients', 'voa' ),
				'singular_name' => __( 'Client', 'voa' ),
				'add_new_item'  => __( 'Add new client', 'voa' ),
				'edit_item'     => __( 'Edit client', 'voa' ),
				'all_items'     => __( 'All clients', 'voa' ),
				'menu_name'     => __( 'Clients', 'voa' ),
			),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'has_archive'         => false,
			'menu_icon'           => 'dashicons-groups',
			'menu_position'       => 23,
			'supports'            => array( 'title', 'thumbnail', 'page-attributes' ),
			'show_in_rest'        => true,
		)
	);
}
add_action( 'init', 'voa_register_client_post_type' );

/**
 * Flush rewrite rules once after activation, so /services/{slug}/ resolves without the user having to
 * visit Settings → Permalinks. Guarded by an option, because flushing on every load is expensive.
 */
function voa_maybe_flush_rewrites() {
	if ( get_option( 'voa_rewrites_flushed' ) === VOA_VERSION ) {
		return;
	}

	flush_rewrite_rules();
	update_option( 'voa_rewrites_flushed', VOA_VERSION );
}
add_action( 'init', 'voa_maybe_flush_rewrites', 99 );
