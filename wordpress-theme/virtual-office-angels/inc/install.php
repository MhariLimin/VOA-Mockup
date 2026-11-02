<?php
/**
 * One-click site setup: the pages and services the theme's templates attach to.
 *
 * Appearance → Site setup. It creates only what is missing and never edits or deletes anything that
 * exists: a page already at /about-us/ is reused as it is, and its old builder content is simply not
 * rendered, because page-about-us.php draws the page from the theme's data instead. Running it twice is
 * harmless.
 *
 * What it does:
 *   - creates any missing page among the eleven the design needs and the three city pages, by slug,
 *     seeding a new city page's Yoast title and description from the content writer's copy
 *   - creates any missing service among the ten, by slug, as a voa_service post
 *   - sets the home page and the posts page (Settings → Reading), if not already set to these
 *   - seeds each new service's Yoast title and description from the React build's SEO fields, only
 *     where Yoast has nothing stored
 *   - creates the enquiry form in Contact Form 7, when that plugin is active and the form does not
 *     exist yet (inc/forms.php). Other Contact Form 7 forms are left alone
 *   - sets article addresses to /insights/{article}/ (inc/permalinks.php). The old /{article}/
 *     addresses are redirected by the Redirection import, docs/wordpress-integration/redirects.csv
 *
 * It does not touch articles, menus, plugins or users.
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
		'about-us'       => 'About',
		'how-it-works'   => 'How It Works',
		'managed-virtual-support' => 'Managed Virtual Support',
		'client-stories' => 'Client Stories',
		'insights'       => 'Insights',
		'videos'         => 'Videos',
		'faqs'           => 'FAQs',
		'contact'        => 'Contact',
		'thank-you'      => 'Thank You',
	) + voa_required_location_pages();
}

/**
 * The city landing pages: slug => title, from data/locations.json. The title is the page's heading
 * without its highlight mark.
 *
 * @return array
 */
function voa_required_location_pages() {
	$pages = array();
	foreach ( voa_data_raw( 'locations' ) as $page ) {
		$pages[ trim( $page['path'], '/' ) ] = str_replace( '*', '', rtrim( $page['hero']['title'], '.' ) );
	}
	return $pages;
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

		$id = wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => $title,
				'post_name'   => $slug,
			)
		);

		// A city page starts with the content writer's Yoast title and description.
		$city = voa_location_for_slug( $slug );
		if ( $city && $id && ! is_wp_error( $id ) ) {
			$seo = voa_data_raw( 'locations' )[ $city ]['seo'];
			if ( ! get_post_meta( $id, '_yoast_wpseo_title', true ) ) {
				update_post_meta( $id, '_yoast_wpseo_title', $seo['title'] );
			}
			if ( ! get_post_meta( $id, '_yoast_wpseo_metadesc', true ) ) {
				update_post_meta( $id, '_yoast_wpseo_metadesc', $seo['description'] );
			}
		}
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

	$permalinks = voa_set_article_permalinks();
	if ( $permalinks ) {
		$log[] = $permalinks;
	}

	if ( $log ) {
		// The posts page may have been set just now, after the rule was first registered.
		voa_insights_paging_rule();
		flush_rewrite_rules();
	}

	$form = voa_create_enquiry_form();
	if ( $form ) {
		$log[] = $form;
	}

	return $log;
}

/**
 * The addresses the content writer's SEO sheet changed on 2 November 2026: old slug => new slug. The
 * same list is in src/content/renamedRoutes.ts.
 *
 * @return array{service: array<string, string>, page: array<string, string>}
 */
function voa_renamed_slugs() {
	return array(
		'service' => array(
			'insurance-processing-virtual-assistance'         => 'insurance-processing-virtual-assistant-support',
			'real-estate-virtual-assistant-services'          => 'real-estate-virtual-assistant-admin-support',
			'executive-and-administrative-virtual-assistance' => 'executive-virtual-assistant-admin-support',
			'digital-marketing-virtual-assistant-services'    => 'digital-marketing-virtual-assistant-support',
			'sales-and-e-commerce-virtual-assistant'          => 'sales-and-e-commerce-virtual-assistant-support',
			'creative-copywriting-virtual-assistant'          => 'copywriting-virtual-assistant-support',
			'it-virtual-assistant-services'                   => 'it-virtual-assistant-and-tech-support',
		),
		'page'    => array( 'about' => 'about-us' ),
	);
}

/**
 * Move Website Content edits stored under an old address to the new one.
 *
 * Field keys carry the page's path ("data|pages|/about|summary"), and a service's edits are stored
 * under its slug, so a renamed page would otherwise lose them.
 *
 * @param string $from_entity Entity the edits are stored under now.
 * @param string $to_entity   Entity they belong to after the rename.
 * @param string $from_path   Old path, such as "/about".
 * @param string $to_path     New path, such as "/about-us".
 * @return bool Whether there was anything to move.
 */
function voa_move_content_edits( $from_entity, $to_entity, $from_path, $to_path ) {
	$stored = get_option( voa_content_option_name( $from_entity ), array() );
	if ( ! is_array( $stored ) || ! $stored ) {
		return false;
	}

	$moved = array();
	foreach ( $stored as $key => $value ) {
		$moved[ str_replace( '|' . $from_path . '|', '|' . $to_path . '|', $key ) ] = $value;
	}

	if ( $from_entity !== $to_entity ) {
		$moved += (array) get_option( voa_content_option_name( $to_entity ), array() );
		delete_option( voa_content_option_name( $from_entity ) );
	}
	update_option( voa_content_option_name( $to_entity ), $moved, false );
	return true;
}

/**
 * The 2 November 2026 update: the writer's new addresses, then the writer's Yoast titles and
 * descriptions on the home page, six other pages and the ten services. Unlike the setup above, the
 * titles and descriptions overwrite what Yoast has, as the writer's are the final ones. Running it
 * twice is harmless.
 *
 * @return string[] One line per change made.
 */
function voa_apply_seo_update() {
	$log     = array();
	$renamed = voa_renamed_slugs();

	foreach ( $renamed['service'] as $old => $new ) {
		$post = get_page_by_path( $old, OBJECT, 'voa_service' );
		if ( $post && ! get_page_by_path( $new, OBJECT, 'voa_service' ) ) {
			wp_update_post( array( 'ID' => $post->ID, 'post_name' => $new ) );
			$log[] = sprintf( 'Moved /services/%s/ to /services/%s/', $old, get_post_field( 'post_name', $post->ID ) );
		}
		if ( voa_move_content_edits( 'service:' . $old, 'service:' . $new, '/services/' . $old, '/services/' . $new ) ) {
			$log[] = sprintf( 'Kept the Website Content edits of /services/%s/', $new );
		}
	}

	foreach ( $renamed['page'] as $old => $new ) {
		$page = get_page_by_path( $old, OBJECT, 'page' );
		if ( $page && ! get_page_by_path( $new, OBJECT, 'page' ) ) {
			wp_update_post( array( 'ID' => $page->ID, 'post_name' => $new ) );
			$log[] = sprintf( 'Moved /%s/ to /%s/', $old, get_post_field( 'post_name', $page->ID ) );
		}
	}
	// About's edits stay stored under "about"; only the path inside their keys changes.
	$about = get_option( voa_content_option_name( 'about' ), array() );
	if ( is_array( $about ) && preg_grep( '/\|\/about\|/', array_keys( $about ) ) && voa_move_content_edits( 'about', 'about', '/about', '/about-us' ) ) {
		$log[] = 'Kept the Website Content edits of /about-us/';
	}

	$seo = array();
	$home = voa_data_raw( 'home' );
	if ( ! empty( $home['seo'] ) ) {
		$seo[] = array( get_page_by_path( 'home', OBJECT, 'page' ), '/', $home['seo']['title'], $home['seo']['description'] );
	}
	foreach ( voa_data_raw( 'pages' ) as $path => $page ) {
		if ( ! empty( $page['seoTitle'] ) && 'service' !== $page['template'] ) {
			$seo[] = array( get_page_by_path( trim( $path, '/' ), OBJECT, 'page' ), $path, $page['seoTitle'], $page['metaDescription'] );
		}
	}
	foreach ( voa_data_raw( 'services' )['details'] as $path => $detail ) {
		if ( ! empty( $detail['seoTitle'] ) ) {
			$seo[] = array( get_page_by_path( substr( $path, strlen( '/services/' ) ), OBJECT, 'voa_service' ), $path, $detail['seoTitle'], $detail['metaDescription'] );
		}
	}

	$written = 0;
	foreach ( $seo as list( $post, $path, $title, $description ) ) {
		if ( ! $post ) {
			$log[] = sprintf( 'No page at %s, so its SEO title was not set', $path );
			continue;
		}
		update_post_meta( $post->ID, '_yoast_wpseo_title', $title );
		update_post_meta( $post->ID, '_yoast_wpseo_metadesc', $description );
		$written++;
	}
	$log[] = sprintf( 'Set the Yoast SEO title and meta description on %d pages', $written );

	$log = array_merge( $log, voa_fix_article_links() );

	flush_rewrite_rules();
	return $log;
}

/**
 * Broken links in three articles on staging, found on 2 November 2026: article slug => old link =>
 * new link. In the 15 October article an image address was joined to each link, and two older
 * articles link to the retired /stagingsite2/ copy. The new links are the live site's own addresses,
 * as in the other articles, so they are right after the launch whatever the deploy does to staging's.
 *
 * @return string[] One line per article changed.
 */
function voa_fix_article_links() {
	$site  = 'https://virtualofficeangels.com.au';
	$image = 'http://virtualofficeangels.com.au/staging/1384/wp-content/uploads/2026/10/pexels-julio-lopez-75309646-34225004-scaled-1.jpg';
	$fixes = array(
		'when-does-a-remote-support-role-require-industry-experience' => array(
			$image . 'mortgage-loans-processing-support/'            => $site . '/services/mortgage-loans-processing-virtual-support/',
			$image . 'financial-planning-assistance-administration/' => $site . '/services/virtual-financial-planning-and-admin-assistant/',
			$image . 'accounting-bookkeeping-assistance/'            => $site . '/services/accounting-and-bookkeeping-virtual-assistant/',
			$image . 'services/'                                     => $site . '/services/',
			$image . 'contact-us/'                                   => $site . '/contact/',
			$image                                                   => $site . '/',
		),
		'2026-why-the-start-of-the-year-is-the-best-time-to-hire-a-va' => array(
			$site . '/stagingsite2/why-us/' => $site . '/managed-virtual-support/',
		),
		'how-to-find-and-hire-the-right-va-virtual-assistant-match' => array(
			$site . '/stagingsite2/why-us/' => $site . '/managed-virtual-support/',
		),
	);

	$log = array();
	foreach ( $fixes as $slug => $links ) {
		$post = get_page_by_path( $slug, OBJECT, 'post' );
		if ( ! $post ) {
			continue;
		}
		$content = $post->post_content;
		$count   = 0;
		foreach ( $links as $old => $new ) {
			// Inside href="…" only, longest first, so the bare image address is replaced last.
			$content = str_replace( 'href="' . $old . '"', 'href="' . $new . '"', $content, $replaced );
			$count  += $replaced;
		}
		if ( $count ) {
			wp_update_post( array( 'ID' => $post->ID, 'post_content' => wp_slash( $content ) ) );
			$log[] = sprintf( 'Fixed %d link(s) in the article /insights/%s/', $count, $slug );
		}
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
		<p>Creates the pages, services and contact form the theme needs, and sets article addresses to /insights/{article}/. It only adds what is missing; it never changes or deletes anything that already exists.</p>

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

		<h2>Contact form</h2>
		<ul>
			<li>
				<?php if ( ! function_exists( 'wpcf7_contact_form' ) ) : ?>
					<strong>Contact Form 7 is not active.</strong> Activate it, then run this again; until then the site shows no form.
				<?php elseif ( voa_contact_form_id() ) : ?>
					"Website enquiry" — exists. Its recipient and wording are edited under <a href="<?php echo esc_url( admin_url( 'admin.php?page=wpcf7&post=' . voa_contact_form_id() . '&action=edit' ) ); ?>">Contact → Contact Forms</a>.
				<?php else : ?>
					"Website enquiry" — <strong>missing</strong>
				<?php endif; ?>
			</li>
			<?php if ( function_exists( 'wpcf7_contact_form' ) && ! class_exists( 'Flamingo_Inbound_Message' ) ) : ?>
				<li><strong>Flamingo is not active</strong>, so enquiries are emailed but not saved in wp-admin.</li>
			<?php endif; ?>
		</ul>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="voa_setup">
			<?php wp_nonce_field( 'voa_setup' ); ?>
			<?php submit_button( 'Create what is missing' ); ?>
		</form>

		<h2>Addresses and SEO update, 2 November 2026</h2>
		<p>Moves seven services and About to the content writer's new addresses, keeping their Website Content edits, then sets the writer's Yoast SEO title and meta description on the home page, six other pages and the ten services, replacing what Yoast has there now. It also fixes the broken links found in three articles. Running it again is harmless.</p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="voa_seo_update">
			<?php wp_nonce_field( 'voa_seo_update' ); ?>
			<?php submit_button( 'Apply the addresses and SEO update', 'secondary' ); ?>
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

/**
 * Handle the addresses and SEO update button.
 */
function voa_seo_update_handle() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'You do not have permission to do this.' );
	}

	check_admin_referer( 'voa_seo_update' );
	set_transient( 'voa_setup_log', voa_apply_seo_update(), MINUTE_IN_SECONDS );
	wp_safe_redirect( admin_url( 'themes.php?page=voa-setup' ) );
	exit;
}
add_action( 'admin_post_voa_seo_update', 'voa_seo_update_handle' );
