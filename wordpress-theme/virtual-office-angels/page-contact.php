<?php
/**
 * /contact — ContactPage in SourcePage.tsx. Builds its own contact section rather than using the
 * standard closing one, with the same rotating backdrop.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief = voa_page( '/contact' );

get_header();
?>

<section class="section contact-section has-section-backdrop"><?php get_template_part( 'template-parts/layout/section-backdrop' ); ?><div class="container contact-grid"><aside><p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p><h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1><p class="lead compact"><?php echo esc_html( $voa_brief['summary'] ); ?></p><dl class="contact-details">
	<div><dt><span class="contact-detail-icon" aria-hidden="true"><?php voa_icon( 'phone' ); ?></span>Phone</dt><dd><a href="tel:1300737883">1 300 737 883</a></dd></div>
	<div><dt><span class="contact-detail-icon" aria-hidden="true"><?php voa_icon( 'mail' ); ?></span>Email</dt><dd><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></dd></div>
	<div><dt><span class="contact-detail-icon" aria-hidden="true"><?php voa_icon( 'pin' ); ?></span>Address</dt><dd>Ground Floor, 465 Victoria Avenue<br>Chatswood NSW 2067, Australia</dd></div>
	<div><dt><span class="contact-detail-icon" aria-hidden="true"><?php voa_icon( 'building' ); ?></span>Company</dt><dd>ABN 58 155 459 788<br>ACN 155 459 788</dd></div>
</dl></aside><?php get_template_part( 'template-parts/layout/contact-form' ); ?></div></section>

<?php
get_footer();
