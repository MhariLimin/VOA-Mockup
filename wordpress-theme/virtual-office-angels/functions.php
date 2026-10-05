<?php
/**
 * Virtual Office Angels theme bootstrap.
 *
 * Everything of substance lives in inc/. This file only defines the constants and loads them, so
 * there is one obvious place to look for any given concern.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

define( 'VOA_VERSION', '0.1.0' );
define( 'VOA_DIR', get_template_directory() );
define( 'VOA_URI', get_template_directory_uri() );

/**
 * Load an include, or fail loudly in development rather than silently rendering a broken page.
 */
foreach ( array( 'setup', 'enqueue', 'data', 'icons', 'post-types', 'permalinks', 'forms', 'install' ) as $voa_include ) {
	$voa_file = VOA_DIR . '/inc/' . $voa_include . '.php';

	if ( file_exists( $voa_file ) ) {
		require_once $voa_file;
	} elseif ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		// Missing include. Visible while developing, invisible in production.
		trigger_error( // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			esc_html( sprintf( 'VOA theme: missing include inc/%s.php', $voa_include ) ),
			E_USER_WARNING
		);
	}
}

unset( $voa_include, $voa_file );
