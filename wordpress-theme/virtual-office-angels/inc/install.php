<?php
/**
 * One-click site setup: the pages and services the theme's templates attach to.
 *
 * Appearance → Site setup. It creates only what is missing and never edits or deletes anything that
 * exists: a page already at /about/ is reused as it is, and its old builder content is simply not
 * rendered, because page-about.php draws the page from the theme's data instead. Running it twice is
 * harmless.
 *
 * What it does:
 *   - creates any missing page among the eleven the design needs, by slug
 *   - creates any missing service among the ten, by slug, as a voa_service post
 *   - sets the home page and the posts page (Settings → Reading), if not already set to these
 *   - seeds each new service's Yoast title and description from the React build's SEO fields, only
 *     where Yoast has nothing stored
 *
 * It does not touch articles, menus, plugins, users or permalinks.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The pages the templates need: slug => title. Titles are what the admin lists and what the browser
 * tab shows; the page itself renders its heading from the data.
 *
 * @return array
 */
function voa_required_pages() {
	return array(
		'home'           => 'Home',
		'services'       => 'Services',
		'about'          => 'About',
		'how-it-works'   => 'How It Works',
		'why-voa'        => 'Managed Virtual Support',
		'client-stories' => 'Client Stories',
		'insights'       => 'Insights',
		'videos'         => 'Videos',
		'faqs'           => 'FAQs',
		'contact'        => 'Contact',
		'thank-you'      => 'Thank You',
	);
}

/**
 * The services, in menu order: slug => detail. Read from the React route list, so a service added
 * there and exported appears here.
 *
 * @return array
 */
function voa_required_services() {
	$details  = voa_data( 'services' );
	$services = array();

	foreach ( voa_data( 'pages' ) as $path => $page ) {
		if ( 'service' === $page['template'] && 0 === strpos( $path, '/services/' ) ) {
			$services[ substr( $path, strlen( '/services/' ) ) ] = isset( $details['details'][ $path ] ) ? $details['details'][ $path ] : array( 'title' => $page['title'] );
		}
	}

	return $services;
}

/**
 * What exists and what is missing, for the setup screen.
 *
 * @return array{pages: array, services: array}
 */
function voa_setup_status() {
	$status = array(
		'pages'    => array(),
		'services' => array(),
	);

	foreach ( voa_required_pages() as $slug => $title ) {
		$status['pages'][ $slug ] = get_page_by_path( $slug, OBJECT, 'page' );
	}

	foreach ( voa_required_services() as $slug => $detail ) {
		$status['services'][ $slug ] = get_page_by_path( $slug, OBJECT, 'voa_service' );
	}

	return $status;
}

/**
 * Create whatever is missing. Idempotent.
 *
 * @return string[] One line per change made.
 */
function voa_install_content() {
	$log    = array();
	$status = voa_setup_status();

	foreach ( voa_required_pages() as $slug => $title ) {
		if ( $status['pages'][ $slug ] ) {
			continue;
		}

		wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => $title,
				'post_name'   => $slug,
			)
		);
		$log[] = sprintf( 'Created page /%s/', $slug );
	}

	$order = 0;
	foreach ( voa_required_services() as $slug => $detail ) {
		$order++;

		if ( $status['services'][ $slug ] ) {
			continue;
		}

		$id = wp_insert_post(
			array(
				'post_type'   => 'voa_service',
				'post_status' => 'publish',
				'post_title'  => $detail['title'],
				'post_name'   => $slug,
				'menu_order'  => $order,
			)
		);

		if ( $id && ! is_wp_error( $id ) ) {
			if ( ! empty( $detail['seoTitle'] ) && ! get_post_meta( $id, '_yoast_wpseo_title', true ) ) {
				update_post_meta( $id, '_yoast_wpseo_title', $detail['seoTitle'] );
			}
			if ( ! empty( $detail['metaDescription'] ) && ! get_post_meta( $id, '_yoast_wpseo_metadesc', true ) ) {
				update_post_meta( $id, '_yoast_wpseo_metadesc', $detail['metaDescription'] );
			}
		}

		$log[] = sprintf( 'Created service /services/%s/', $slug );
	}

	$home     = get_page_by_path( 'home', OBJECT, 'page' );
	$insights = get_page_by_path( 'insights', OBJECT, 'page' );

	if ( $home && ( 'page' !== get_option( 'show_on_front' ) || (int) get_option( 'page_on_front' ) !== $home->ID ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home->ID );
		$log[] = 'Set the home page to "Home"';
	}

	if ( $insights && (int) get_option( 'page_for_posts' ) !== $insights->ID ) {
		update_option( 'page_for_posts', $insights->ID );
		$log[] = 'Set the posts page to "Insights"';
	}

	if ( $log ) {
		flush_rewrite_rules();
	}

	return $log;
}

/**
 * The admin screen.
 */
function voa_setup_menu() {
	add_theme_page( 'Site setup', 'Site setup', 'manage_options', 'voa-setup', 'voa_setup_screen' );
}
add_action( 'admin_menu', 'voa_setup_menu' );

/**
 * Render Appearance → Site setup.
 */
function voa_setup_screen() {
	$status = voa_setup_status();
	$log    = get_transient( 'voa_setup_log' );
	delete_transient( 'voa_setup_log' );
	?>
	<div class="wrap">
		<h1>Virtual Office Angels — site setup</h1>
		<p>Creates the pages and services the theme needs. It only adds what is missing; it never changes or deletes anything that already exists.</p>

		<?php if ( is_array( $log ) ) : ?>
			<div class="notice notice-success"><p><?php echo $log ? wp_kses_post( implode( '<br>', array_map( 'esc_html', $log ) ) ) : 'Nothing was missing.'; ?></p></div>
		<?php endif; ?>

		<h2>Pages</h2>
		<ul>
			<?php foreach ( $status['pages'] as $slug => $page ) : ?>
				<li><code>/<?php echo esc_html( $slug ); ?>/</code> — <?php echo $page ? 'exists' : '<strong>missing</strong>'; ?></li>
			<?php endforeach; ?>
		</ul>

		<h2>Services</h2>
		<ul>
			<?php foreach ( $status['services'] as $slug => $service ) : ?>
				<li><code>/services/<?php echo esc_html( $slug ); ?>/</code> — <?php echo $service ? 'exists' : '<strong>missing</strong>'; ?></li>
			<?php endforeach; ?>
		</ul>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="voa_setup">
			<?php wp_nonce_field( 'voa_setup' ); ?>
			<?php submit_button( 'Create what is missing' ); ?>
		</form>
	</div>
	<?php
}

/**
 * Handle the button.
 */
function voa_setup_handle() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'You do not have permission to do this.' );
	}

	check_admin_referer( 'voa_setup' );
	set_transient( 'voa_setup_log', voa_install_content(), MINUTE_IN_SECONDS );
	wp_safe_redirect( admin_url( 'themes.php?page=voa-setup' ) );
	exit;
}
add_action( 'admin_post_voa_setup', 'voa_setup_handle' );
