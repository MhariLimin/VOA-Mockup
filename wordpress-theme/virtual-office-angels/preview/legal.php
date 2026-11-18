<?php
/**
 * Preview theme: /privacy-policy/ and /terms-of-use/ — LegalPage.tsx.
 *
 * Added 8 November 2026. The wording is VA Paola's revision of 18 November 2026, treated as approved the
 * same day, so the draft note was removed; the effective date stays "[Publication date]" until the pages
 * are published. Keep the wording identical to src/pages/LegalPage.tsx. Served by the preview's rewrite
 * rules (inc/preview.php).
 *
 * Layout (18 November 2026, second pass): the compact inner hero the other pages use, with the effective
 * date as its eyebrow and the title's last word in the heading accent. Below it, each section is its own
 * card, revealed as it scrolls in (assets/js/reveal.js), beside a sticky contents card that highlights the
 * section being read (legalSections() in assets/js/interactions.js). The section numbers are decoration
 * only, hidden from screen readers; no new visible copy.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_privacy = 'privacy' === voa_preview_page();
$voa_company = esc_html( 'Virtual Office Angels Pty Limited (ABN 58 155 459 788)' );
$voa_email   = '<a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a>';
$voa_phone   = '<a href="tel:+611300737883">1300 737 883</a>';

/*
 * Each section: heading => body markup. The bodies are static markup written here; only the Privacy
 * Policy link is built with esc_url().
 */
if ( $voa_privacy ) {
	$voa_title    = 'Privacy Policy';
	$voa_sections = array(
		'About this policy'                     => '<p>' . $voa_company . ' operates virtualofficeangels.com.au. This policy explains how we handle personal information when you visit our website or contact us through our enquiry form.</p>',
		'Contact form information'              => '<p>We collect the information you enter in the form. We ask for your first name, email address and a brief description of the support you need. You can also provide your last name, phone number, business name and industry.</p>'
			. '<p>We use this information to respond to your enquiry, discuss the services that may suit your business and follow up about your request. We also hold any replies you send us about the enquiry. If you leave a required field blank, you won’t be able to submit the form.</p>'
			. '<p>Please keep your enquiry to the support you need. Leave out passwords, identity documents, financial records and personal information about clients or staff.</p>',
		'Website activity and Google Analytics' => '<p>We use Google Analytics to measure website traffic and understand how visitors find and use the site. We use its reports to improve the website.</p>'
			. '<p>The tool uses cookies and similar technologies to collect usage data, such as pages viewed, how you arrived at the site, and browser and device details. Google may use your IP address to estimate your general location.</p>'
			. '<p>Google receives this website activity data. Read <a href="https://policies.google.com/technologies/partner-sites?hl=en-AU" target="_blank" rel="noreferrer">how Google uses information from sites that use its services</a>.</p>'
			. '<p>Our website hosting and security systems may also record technical information, such as IP addresses and browser details, to keep the website operating and investigate security issues. The website may store settings, such as your display preference, in your browser.</p>',
		'Your cookie choices'                   => '<p>You can block or delete cookies in your browser settings. Blocking some cookies may affect how the website works. On supported browsers, you can also use the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Google Analytics opt-out add-on</a>.</p>',
		'Who we share information with'         => '<p>The team members who handle your enquiry can access the information you provide. We hold enquiries and related correspondence in the systems we use to receive and respond to them.</p>'
			. '<p>Our website hosting, security and email providers may handle the information they need to deliver those services. We may also share information where the law requires or authorises it.</p>',
		'Overseas handling of information'      => '<p>Google uses servers around the world and may process analytics data outside Australia.</p>'
			. '<p>We have an office in Australia and an internal team in the Philippines. Team members in the Philippines may access your enquiry details when helping us respond to or follow up on your request.</p>',
		'How we protect and retain information' => '<p>We take reasonable steps to protect the personal information we hold against loss, misuse and unauthorised access, changes or disclosure. We keep enquiry information for as long as we need it to handle the enquiry or as the law requires. We take reasonable steps to delete or de-identify it when we no longer need it and have no legal obligation to keep it.</p>',
		'Access and correction'                 => '<p>Email ' . $voa_email . ' to ask for access to the personal information we hold about you or to request a correction. We may need to confirm your identity before we respond. We’ll respond within a reasonable time.</p>',
		'Privacy complaints'                    => '<p>Contact us using the details below if you’re concerned about how we’ve handled your personal information. We’ll review your complaint and tell you the outcome and any steps we propose to take.</p>',
		'Contact us'                            => '<p>' . $voa_email . '<br />' . $voa_phone . '<br />Ground Floor, 465 Victoria Avenue, Chatswood NSW 2067, Australia</p>',
		'Changes to this policy'                => '<p>We’ll publish any updates to this policy on this page and revise the effective date.</p>',
	);
} else {
	$voa_title    = 'Terms of Use';
	$voa_sections = array(
		'About these terms'             => '<p>These terms apply when you use virtualofficeangels.com.au, operated by ' . $voa_company . '. If you engage us to provide services, the terms we agree with you separately apply to those services.</p>',
		'Information on this website'   => '<p>Our articles, videos, and service pages provide general information about our specialised virtual assistant recruitment services.</p>'
			. '<p>If you need legal, financial or other professional advice for your circumstances, speak with a suitably qualified adviser. Service details published on the website may change, so contact us to confirm what we can offer your business.</p>',
		'Using this website'            => '<p>Use the website lawfully and provide accurate information when you submit an enquiry. Do not send spam or harmful material, try to gain unauthorised access, or interfere with the website or its security.</p>',
		'Links to other websites'       => '<p>We may link to third-party websites. Those websites are operated independently and have their own terms and privacy practices.</p>',
		'Governing law and your rights' => '<p>The laws of New South Wales, Australia, govern these terms, subject to any applicable mandatory laws. Your rights and remedies under the Australian Consumer Law and other applicable laws continue to apply in full.</p>',
		'Privacy'                       => '<p>See our <a href="' . esc_url( voa_url( '/privacy-policy' ) ) . '">Privacy Policy</a> for details about enquiry information, cookies and Google Analytics.</p>',
		'Updates and contact'           => '<p>We’ll publish updates on this page and revise the effective date. If you have a question about these terms, email ' . $voa_email . ' or call ' . $voa_phone . '.</p>',
	);
}

/** Same ids as sectionId() in LegalPage.tsx. */
$voa_section_id = static function ( $heading ) {
	return trim( preg_replace( '/[^a-z0-9]+/', '-', str_replace( '&', 'and', strtolower( $heading ) ) ), '-' );
};

get_header();
?>
<?php $voa_split = strrpos( $voa_title, ' ' ); ?>
<article class="legal-page">
	<section class="section inner-hero compact-inner-hero legal-hero">
		<div class="container inner-hero-grid">
			<div>
				<p class="eyebrow">Effective date [Publication date]</p>
				<h1><?php echo esc_html( substr( $voa_title, 0, $voa_split ) ); ?> <em><?php echo esc_html( substr( $voa_title, $voa_split + 1 ) ); ?></em></h1>
			</div>
		</div>
	</section>
	<section class="section legal-body">
		<div class="container legal-layout">
			<nav class="legal-toc" aria-label="<?php echo esc_attr( $voa_title . ' sections' ); ?>">
				<ol>
					<?php $voa_number = 0; ?>
					<?php foreach ( array_keys( $voa_sections ) as $voa_heading ) : ?>
						<li><a href="#<?php echo esc_attr( $voa_section_id( $voa_heading ) ); ?>"<?php echo 0 === $voa_number ? ' class="active" aria-current="location"' : ''; ?>><span aria-hidden="true"><?php echo esc_html( sprintf( '%02d', ++$voa_number ) ); ?></span><?php echo esc_html( $voa_heading ); ?></a></li>
					<?php endforeach; ?>
				</ol>
			</nav>
			<div class="legal-sections">
				<?php $voa_number = 0; ?>
				<?php foreach ( $voa_sections as $voa_heading => $voa_body ) : ?>
					<section class="section legal-section">
						<span class="legal-number" aria-hidden="true"><?php echo esc_html( sprintf( '%02d', ++$voa_number ) ); ?></span>
						<div class="article-content">
							<h2 id="<?php echo esc_attr( $voa_section_id( $voa_heading ) ); ?>"><?php echo esc_html( $voa_heading ); ?></h2>
							<?php echo $voa_body; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup written above. ?>
						</div>
					</section>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php get_template_part( 'template-parts/layout/closing' ); ?>
</article>
<?php
get_footer();
