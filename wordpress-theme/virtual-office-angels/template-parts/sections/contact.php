<?php
/**
 * Closing contact section.
 *
 * The section that replaced the repeated blue "Ready to Start" CTA panels, which the client rejected.
 * It appears on nine pages, so the copy is passed in rather than hard-coded.
 *
 * The React function is still called FinalCta in places — a historical name. What it renders is a
 * contact form. Judge it by behaviour, not by the name.
 *
 * Args:
 *   eyebrow  string  defaults to "Let's talk"
 *   heading  string  may contain <em> for the accent words
 *   text     string  optional lead paragraph
 *   class    string  extra class on the section
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_args    = wp_parse_args(
	isset( $args ) ? $args : array(),
	array(
		'eyebrow' => __( 'Let’s talk', 'voa' ),
		'heading' => __( 'Tell us what the right support would change for your business.', 'voa' ),
		'text'    => '',
		'class'   => '',
	)
);
$voa_backdrop = voa_background_images( 'voa_contact_backgrounds' );
?>

<section class="section contact-section page-contact-section has-section-backdrop <?php echo esc_attr( $voa_args['class'] ); ?>">
	<?php if ( $voa_backdrop ) : ?>
		<?php
		/*
		 * Decorative, and it carries no controls — unlike the hero, which has dots. The backdrop is
		 * masked to its left side, so every image here has to carry its subject on the left.
		 */
		?>
		<div class="section-backdrop" data-interval="6000" aria-hidden="true">
			<?php foreach ( $voa_backdrop as $index => $url ) : ?>
				<span
					data-active="<?php echo 0 === $index ? 'true' : 'false'; ?>"
					style="background-image:url(<?php echo esc_url( $url ); ?>)"
				></span>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<div class="container contact-grid">
		<aside>
			<p class="eyebrow"><?php echo esc_html( $voa_args['eyebrow'] ); ?></p>
			<h2><?php echo voa_heading( $voa_args['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- voa_heading runs wp_kses. ?></h2>

			<?php if ( $voa_args['text'] ) : ?>
				<p class="lead compact"><?php echo esc_html( $voa_args['text'] ); ?></p>
			<?php endif; ?>

			<p class="contact-direct">
				<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', voa_option( 'voa_phone' ) ) ); ?>">
					<?php voa_icon( 'phone' ); ?><?php echo esc_html( voa_option( 'voa_phone' ) ); ?>
				</a>
				<a href="mailto:<?php echo esc_attr( voa_option( 'voa_email' ) ); ?>">
					<?php voa_icon( 'mail' ); ?><?php echo esc_html( voa_option( 'voa_email' ) ); ?>
				</a>
			</p>
		</aside>

		<?php
		/*
		 * The form is Contact Form 7, already installed and already handling the live site's form.
		 * Its shortcode id is stored once in an option rather than repeated across nine templates.
		 *
		 * Until it is set, an editor sees what to do and a visitor sees nothing — better than a
		 * broken shortcode rendered as text.
		 */
		$voa_form_id = (int) get_option( 'voa_contact_form_id', 0 );

		if ( $voa_form_id ) {
			echo do_shortcode( sprintf( '[contact-form-7 id="%d"]', $voa_form_id ) );
		} elseif ( current_user_can( 'edit_theme_options' ) ) {
			printf(
				'<p class="form-placeholder">%s</p>',
				esc_html__( 'Set the Contact Form 7 form id in the voa_contact_form_id option to render the enquiry form here.', 'voa' )
			);
		}
		?>
	</div>
</section>
