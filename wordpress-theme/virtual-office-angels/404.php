<?php
/**
 * Not found — NotFoundPage.tsx. WordPress sends the 404 status itself.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section utility-page">
	<div class="container narrow">
		<p class="eyebrow">404 - Page not found</p>
		<h1>That page is not available.</h1>
		<p class="lead">Use the navigation to continue, explore Virtual Office Angels services, or return to the homepage.</p>
		<div class="button-row">
			<a class="button" href="<?php echo esc_url( voa_url( '/' ) ); ?>">Return home</a>
			<a class="button button-secondary" href="<?php echo esc_url( voa_url( '/services/mortgage-loans' ) ); ?>">Explore services</a>
		</div>
	</div>
</section>

<?php
get_footer();
