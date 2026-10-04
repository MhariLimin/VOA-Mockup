<?php
/**
 * The closing contact section — NextStepSection in PageClosing.tsx.
 *
 * Args:
 *   copy   array  eyebrow, heading, optional text. Defaults to the standard "Your next step".
 *   class  string extra section class
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_copy  = ! empty( $args['copy'] ) ? $args['copy'] : array(
	'eyebrow' => 'Your next step',
	'heading' => 'Tell us what the right support would change for your business.',
	'text'    => 'Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.',
);
$voa_class = ! empty( $args['class'] ) ? ' ' . $args['class'] : '';
?>
<section class="section contact-section page-contact-section has-section-backdrop<?php echo esc_attr( $voa_class ); ?>">
	<?php get_template_part( 'template-parts/layout/section-backdrop' ); ?>
	<div class="container contact-grid">
		<aside>
			<p class="eyebrow"><?php echo esc_html( $voa_copy['eyebrow'] ); ?></p>
			<h2><?php echo voa_accent( $voa_copy['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
			<?php if ( ! empty( $voa_copy['text'] ) ) : ?>
				<p class="lead compact"><?php echo esc_html( $voa_copy['text'] ); ?></p>
			<?php endif; ?>
			<p class="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p>
		</aside>
		<?php get_template_part( 'template-parts/layout/contact-form' ); ?>
	</div>
</section>
