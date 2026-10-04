<?php
/**
 * The enquiry form — ContactForm.tsx.
 *
 * Still the prototype's form, field for field, and still submitted to /thank-you without being sent
 * anywhere. Wiring it to real delivery, spam protection and a consent record is migration step 9, and
 * needs the recipient address the client has not yet confirmed. The small print says so, as it does
 * in the React build; it must go once the form is live.
 *
 * Industry options follow the "Who we support" list in the client's About Us document.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_industries = array(
	'Mortgage and loans processing',
	'Financial planning administration',
	'Accounting and bookkeeping',
	'Real estate and administration',
	'Back-office support',
	'Digital marketing',
	'Sales and e-commerce',
	'Creative and business support',
	'Other',
);
?>
<form class="contact-form" action="<?php echo esc_url( voa_url( '/thank-you' ) ); ?>">
	<div class="field-row"><label>First name *<input name="firstName" autocomplete="given-name" required></label><label>Last name<input name="lastName" autocomplete="family-name"></label></div>
	<div class="field-row"><label>Email *<input type="email" name="email" autocomplete="email" required></label><label>Phone<input type="tel" name="phone" autocomplete="tel"></label></div>
	<label>Business name<input name="businessName" autocomplete="organization"></label>
	<label>Industry
		<select name="industry">
			<option value="" disabled selected>Select your industry</option>
			<?php foreach ( $voa_industries as $voa_industry ) : ?>
				<option value="<?php echo esc_attr( $voa_industry ); ?>"><?php echo esc_html( $voa_industry ); ?></option>
			<?php endforeach; ?>
		</select>
	</label>
	<label>What support do you need? *<textarea name="message" rows="5" required></textarea></label>
	<label class="checkbox-field"><input type="checkbox" required><span>I agree to the processing of my information for this enquiry.</span></label>
	<button class="button" type="submit">Submit enquiry</button>
	<small>Prototype form only. Connect validation, spam protection, consent records, and WordPress form handling before launch.</small>
</form>
