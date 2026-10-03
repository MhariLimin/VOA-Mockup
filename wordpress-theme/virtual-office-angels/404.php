<?php
/**
 * Not found.
 *
 * One of only two utility pages the client approved — this and the thank-you page. Do not add others.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section utility-page">
	<div class="container narrow">
		<span class="utility-mark" aria-hidden="true">
			<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="24" cy="24" r="19" />
				<path d="M17 19.5h.02M31 19.5h.02" />
				<path d="M17 32c1.9-2.6 4.2-3.9 7-3.9s5.1 1.3 7 3.9" />
			</svg>
		</span>

		<p class="eyebrow"><?php esc_html_e( '404 — Page not found', 'voa' ); ?></p>
		<h1><?php esc_html_e( 'That page is not available.', 'voa' ); ?></h1>
		<p class="lead">
			<?php esc_html_e( 'Use the navigation to continue, explore Virtual Office Angels services, or return to the homepage.', 'voa' ); ?>
		</p>

		<div class="button-row">
			<a class="button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return home', 'voa' ); ?></a>
			<a class="button button-secondary" href="<?php echo esc_url( voa_page_url( 'services' ) ); ?>"><?php esc_html_e( 'Explore services', 'voa' ); ?></a>
		</div>

		<?php get_search_form(); ?>
	</div>
</section>

<?php
get_footer();
