<?php
/**
 * /thank-you — ThankYouPage.tsx. Where the enquiry form lands.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section utility-page">
	<div class="container narrow">
		<p class="eyebrow"><?php echo voa_content_copy( 'thank-you', 'eyebrow' ); ?></p>
		<h1><?php echo voa_content_copy( 'thank-you', 'heading' ); ?></h1>
		<p class="lead"><?php echo voa_content_copy( 'thank-you', 'description' ); ?></p>
		<a class="button" href="<?php echo esc_url( voa_url( '/' ) ); ?>">Return home</a>
	</div>
</section>

<?php
get_footer();
