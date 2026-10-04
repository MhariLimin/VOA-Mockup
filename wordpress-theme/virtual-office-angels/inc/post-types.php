<?php
/**
 * The Services post type.
 *
 * Registered by the theme rather than a plugin, per the decision recorded on 2026-10-03. Swap the
 * theme and the services disappear from the admin, though the rows stay in the database; accepted
 * because this theme is bespoke. If that changes, move this file into a small site plugin.
 *
 * A post per service gives each one its /services/{slug}/ URL, a place in the sitemap, and its own
 * Yoast title and description. The page content itself — scope, systems, fit, FAQs — renders from
 * data/services.json by slug, exported from the React build like every other piece of copy; see
 * single-voa_service.php.
 *
 * Testimonials and client logos were registered here too until 2026-10-04. They now render from
 * data/testimonials.json and data/clients.json, exactly as the React build renders them, which is
 * what "move them into the theme" (decision Q4) amounts to. Four testimonials and thirty logos did not
 * justify an admin screen each.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register Services. `has_archive` is false because /services is a real Page with its own template.
 */
function voa_register_service_post_type() {
	register_post_type(
		'voa_service',
		array(
			'labels'        => array(
				'name'          => 'Services',
				'singular_name' => 'Service',
				'add_new_item'  => 'Add new service',
				'edit_item'     => 'Edit service',
				'view_item'     => 'View service',
				'all_items'     => 'All services',
				'menu_name'     => 'Services',
			),
			'public'        => true,
			'has_archive'   => false,
			'menu_icon'     => 'dashicons-portfolio',
			'menu_position' => 21,
			'rewrite'       => array(
				'slug'       => 'services',
				'with_front' => false,
			),
			'supports'      => array( 'title', 'thumbnail', 'page-attributes', 'custom-fields' ),
			'show_in_rest'  => true,
		)
	);
}
add_action( 'init', 'voa_register_service_post_type' );

/**
 * Flush rewrite rules once after the theme is switched to, so /services/{slug}/ resolves straight away.
 */
function voa_flush_rewrites_on_switch() {
	voa_register_service_post_type();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'voa_flush_rewrites_on_switch' );
