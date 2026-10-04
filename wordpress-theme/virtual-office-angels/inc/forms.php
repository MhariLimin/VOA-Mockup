<?php
/**
 * The enquiry form, sent through Contact Form 7 — migration step 9.
 *
 * Decisions of 2026-10-04: Contact Form 7 sends it (already installed on live), Flamingo keeps a copy
 * of every enquiry, Contact Form 7's own error messages are used unchanged, and enquiries that came
 * from a Google ad are labelled the way the live Ads form labels them.
 *
 * Appearance → Site setup creates the form (voa_create_enquiry_form). Its fields are written so that,
 * with the filters below and the few rules in wordpress.css, Contact Form 7 renders the mockup's form
 * label for label. After that the form is the client's to edit under Contact → Contact Forms; the
 * theme only finds it by the ID stored in the voa_contact_form option.
 *
 * Live, for reference (WORDPRESS_LIVE_SITE_STATUS.md 3.7): two forms send to
 * clientcare@virtualofficeangels.com.au, with Reply-To set to wordpress@ rather than the visitor, and
 * the Ads form differs only by a "From Google ADS" line at the top of the email.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/** The option holding the Contact Form 7 post ID of the enquiry form. */
const VOA_FORM_OPTION = 'voa_contact_form';

/**
 * The first line of an enquiry that came from a Google ad: the live Ads form's own wording, kept so
 * the inbox reads the same as before.
 */
const VOA_ADS_LABEL = 'From Google ADS';

/**
 * Industry options. They follow the "Who we support" list in the client's About Us document, as the
 * React ContactForm.tsx does.
 *
 * @return string[]
 */
function voa_enquiry_industries() {
	return array(
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
}

/**
 * The enquiry form's ID, or 0 when Contact Form 7 is not active or the form no longer exists.
 *
 * @return int
 */
function voa_contact_form_id() {
	if ( ! function_exists( 'wpcf7_contact_form' ) ) {
		return 0;
	}

	$id = (int) get_option( VOA_FORM_OPTION );

	return ( $id && wpcf7_contact_form( $id ) ) ? $id : 0;
}

/**
 * Whether a Contact Form 7 form is the theme's enquiry form. The filters below apply to it only, so
 * any other form on the site keeps Contact Form 7's normal behaviour.
 *
 * @param mixed $contact_form A WPCF7_ContactForm, or anything else.
 * @return bool
 */
function voa_is_enquiry_form( $contact_form ) {
	return $contact_form instanceof WPCF7_ContactForm && $contact_form->id() && $contact_form->id() === voa_contact_form_id();
}

/**
 * The form, in Contact Form 7's form-tag syntax. Same fields, labels, order and autocomplete hints as
 * the React form. The visible text is the mockup's; nothing here is new copy.
 *
 * - Labels wrap their fields, as in the mockup, so no for/id pairs are needed.
 * - Akismet checks the name and email (Contact Form 7's akismet: options) as well as the message.
 * - The consent box is an acceptance field; with acceptance_as_validation (see the additional
 *   settings) leaving it unticked is reported like any other required field, rather than greying the
 *   button out.
 * - gclid is Google's ad-click marker. It is filled from the address when the form's own page was the
 *   ad's landing page, and by contact-form.js when the visitor landed elsewhere first.
 * - The button is a plain <button>, as in the mockup; Contact Form 7 submits through the form's
 *   submit event, not the button.
 *
 * @return string
 */
function voa_enquiry_form_template() {
	$industries = '';
	foreach ( voa_enquiry_industries() as $industry ) {
		$industries .= ' "' . $industry . '"';
	}

	return implode(
		"\n",
		array(
			'<div class="field-row"><label>First name *[text* firstName autocomplete:given-name akismet:author]</label><label>Last name[text lastName autocomplete:family-name]</label></div>',
			'<div class="field-row"><label>Email *[email* email autocomplete:email akismet:author_email]</label><label>Phone[tel phone autocomplete:tel]</label></div>',
			'<label>Business name[text businessName autocomplete:organization]</label>',
			'<label>Industry[select industry first_as_label "Select your industry"' . $industries . ']</label>',
			'<label>What support do you need? *[textarea* message x5]</label>',
			'<div class="checkbox-field">[acceptance consent]I agree to the processing of my information for this enquiry.[/acceptance]</div>',
			'[hidden gclid default:get]',
			'<button class="button" type="submit">Submit enquiry</button>',
		)
	);
}

/**
 * Where enquiries go when the form is first created: the address an existing Contact Form 7 form
 * already sends to (on a clone of live, clientcare@virtualofficeangels.com.au), otherwise the site's
 * admin email. Either way it is set under Contact → Contact Forms → Mail afterwards.
 *
 * @return string
 */
function voa_enquiry_default_recipient() {
	$forms = WPCF7_ContactForm::find(
		array(
			'orderby' => 'ID',
			'order'   => 'ASC',
		)
	);

	foreach ( $forms as $form ) {
		$mail = $form->prop( 'mail' );
		if ( ! empty( $mail['recipient'] ) && false === strpos( $mail['recipient'], '[' ) ) {
			return $mail['recipient'];
		}
	}

	return '[_site_admin_email]';
}

/**
 * The email to staff. The subject is the live forms' subject, so any inbox rule built on it keeps
 * working. Reply-To is the visitor, so pressing Reply answers them (live sends it to wordpress@).
 * Lines whose field was left blank are dropped (exclude_blank). The footer is Contact Form 7's own.
 *
 * @return array Contact Form 7's mail property.
 */
function voa_enquiry_mail() {
	$body = implode(
		"\n",
		array(
			'First name: [firstName]',
			'Last name: [lastName]',
			'Email: [email]',
			'Phone: [phone]',
			'Business name: [businessName]',
			'Industry: [industry]',
			'',
			'What support do you need?',
			'[message]',
			'',
			'[consent]',
			'',
			'-- ',
			sprintf(
				/* translators: 1: blog name, 2: blog URL */
				__( 'This is a notification that a contact form was submitted on your website (%1$s %2$s).', 'contact-form-7' ),
				'[_site_title]',
				'[_site_url]'
			),
		)
	);

	return array(
		'active'             => true,
		'subject'            => 'Virtual Contact Form',
		'sender'             => sprintf( '[firstName] [lastName] <%s>', WPCF7_ContactFormTemplate::from_email() ),
		'recipient'          => voa_enquiry_default_recipient(),
		'body'               => $body,
		'additional_headers' => 'Reply-To: [email]',
		'attachments'        => '',
		'use_html'           => 0,
		'exclude_blank'      => 1,
	);
}

/**
 * Create the enquiry form if it does not exist. Called by Site setup; idempotent.
 *
 * @return string What was done, for the setup log, or '' when nothing was.
 */
function voa_create_enquiry_form() {
	if ( ! class_exists( 'WPCF7_ContactForm' ) || voa_contact_form_id() ) {
		return '';
	}

	$form = WPCF7_ContactForm::get_template( array( 'title' => 'Website enquiry' ) );
	$form->set_properties(
		array(
			'form'                => voa_enquiry_form_template(),
			'mail'                => voa_enquiry_mail(),
			'additional_settings' => implode(
				"\n",
				array(
					'acceptance_as_validation: on',
					'flamingo_email: "[email]"',
					'flamingo_name: "[firstName] [lastName]"',
					'flamingo_subject: "Virtual Contact Form"',
				)
			),
		)
	);

	$id = $form->save();

	if ( ! $id ) {
		return '';
	}

	update_option( VOA_FORM_OPTION, (int) $id );

	$mail = $form->prop( 'mail' );

	return sprintf( 'Created the contact form "Website enquiry", sending to %s', $mail['recipient'] );
}

/**
 * No automatic <p> and <br> in the enquiry form: its markup is already the design's, and the extra
 * paragraphs would become grid rows inside .contact-form.
 *
 * @param bool  $autop   Contact Form 7's setting.
 * @param array $options Context; 'for' => 'mail' when formatting an email.
 * @return bool
 */
function voa_enquiry_autop( $autop, $options = array() ) {
	if ( isset( $options['for'] ) && 'mail' === $options['for'] ) {
		return $autop;
	}

	return voa_is_enquiry_form( wpcf7_get_current_contact_form() ) ? false : $autop;
}
add_filter( 'wpcf7_autop_or_not', 'voa_enquiry_autop', 10, 2 );

/**
 * Tell contact-form.js where to send the visitor once the enquiry is sent: the Thank You page, as the
 * mockup's form does.
 *
 * @param array $atts Extra attributes for the <form> element.
 * @return array
 */
function voa_enquiry_form_atts( $atts ) {
	if ( voa_is_enquiry_form( wpcf7_get_current_contact_form() ) ) {
		$atts['data-voa-thanks'] = voa_url( '/thank-you' );
	}

	return $atts;
}
add_filter( 'wpcf7_form_additional_atts', 'voa_enquiry_form_atts' );

/**
 * Start the staff email with the live Ads form's label when the visitor came from a Google ad. The
 * new /contact/ page serves both the ads and the menu, so the label comes from the visit, not the
 * page. Applies to the email to staff only, never to an autoresponder.
 *
 * @param array            $components   subject, sender, body, recipient, additional_headers, attachments.
 * @param WPCF7_ContactForm $contact_form The form.
 * @param WPCF7_Mail        $mail         The mail being composed.
 * @return array
 */
function voa_enquiry_ads_label( $components, $contact_form, $mail ) {
	if ( ! voa_is_enquiry_form( $contact_form ) || 'mail' !== $mail->name() ) {
		return $components;
	}

	$submission = WPCF7_Submission::get_instance();

	if ( $submission && '' !== trim( $submission->get_posted_string( 'gclid' ) ) ) {
		$components['body'] = VOA_ADS_LABEL . "\n\n" . $components['body'];
	}

	return $components;
}
add_filter( 'wpcf7_mail_components', 'voa_enquiry_ads_label', 10, 3 );
