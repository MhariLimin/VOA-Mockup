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
		<p class="eyebrow">Enquiry received</p>
		<h1>Thank you for contacting Virtual Office Angels.</h1>
		<p class="lead">Your form has been submitted.</p>
		<a class="button" href="<?php echo esc_url( voa_url( '/' ) ); ?>">Return home</a>
	</div>
</section>

<?php
get_footer();
