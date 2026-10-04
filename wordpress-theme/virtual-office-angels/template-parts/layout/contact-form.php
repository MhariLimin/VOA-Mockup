<?php
/**
 * The enquiry form — ContactForm.tsx, sent through Contact Form 7.
 *
 * The form itself is defined in inc/forms.php and created by Appearance → Site setup. Contact Form 7
 * renders it inside its own <div class="wpcf7">, which wordpress.css makes layout-neutral, so the
 * <form class="contact-form"> sits in the page exactly where the mockup's does.
 *
 * Without Contact Form 7, or before Site setup has created the form, nothing could be sent. The page
 * then says so instead of showing a form that goes nowhere, and an administrator sees why.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_form_id = voa_contact_form_id();

if ( $voa_form_id ) {
	echo do_shortcode( sprintf( '[contact-form-7 id="%d" html_class="contact-form"]', $voa_form_id ) );
	return;
}
?>
<div class="contact-form contact-form-unavailable">
	<p>The enquiry form is unavailable right now. Please email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a> or call <a href="tel:1300737883">1 300 737 883</a>.</p>
	<?php if ( current_user_can( 'manage_options' ) ) : ?>
		<p><small>Administrators only: <?php echo function_exists( 'wpcf7_contact_form' ) ? 'run <strong>Appearance → Site setup</strong> to create the form.' : 'activate <strong>Contact Form 7</strong>, then run <strong>Appearance → Site setup</strong>.'; ?></small></p>
	<?php endif; ?>
</div>
