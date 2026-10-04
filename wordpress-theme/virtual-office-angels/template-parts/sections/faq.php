<?php
/**
 * Home page FAQs — the five summary questions.
 *
 * Separate from the twelve on /faqs. Each page owns its own FAQ rather than drawing from a central
 * store: centralising them would mean another system to maintain, and the client edits a page's
 * questions where they appear. A known trade-off, recorded in section 2.5 of
 * docs/wordpress-integration/reference/WORDPRESS_ARCHITECTURE.md.
 *
 * Native <details>/<summary>, which the .faq-list CSS already styles — keyboard support for free, and
 * no JavaScript. The service-page accordions use button markup instead, because their CSS targets
 * button[aria-expanded]; see accordion.js.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_faqs = voa_home_faqs();

if ( ! $voa_faqs ) {
	return;
}
?>

<section class="section faq-section" data-home-reveal="faq">
	<div class="container faq-grid">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Frequently asked questions', 'voa' ); ?></p>
			<h2>
				<?php
				echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
					__( 'Before you delegate and <em>get started</em>.', 'voa' )
				);
				?>
			</h2>
			<p class="lead compact">
				<?php esc_html_e( 'Here are direct answers to the questions Australian businesses ask when considering fully managed virtual support.', 'voa' ); ?>
			</p>
		</div>

		<div class="faq-list">
			<?php foreach ( $voa_faqs as $voa_faq ) : ?>
				<details>
					<summary>
						<?php echo esc_html( $voa_faq['question'] ); ?>
						<?php voa_icon( 'plus' ); ?>
					</summary>
					<p>
						<?php echo esc_html( $voa_faq['answer'] ); ?>
						<?php
						/*
						 * Some answers close with a linked phrase. The sentence's full stop sits
						 * after the link, which is why it is appended here rather than being part of
						 * the answer string.
						 */
						if ( ! empty( $voa_faq['link'] ) ) :
							?>
							<a href="<?php echo esc_url( voa_page_url( $voa_faq['link']['slug'] ) ); ?>"><?php echo esc_html( $voa_faq['link']['label'] ); ?></a>.
						<?php endif; ?>
					</p>
				</details>
			<?php endforeach; ?>

			<a class="text-link" href="<?php echo esc_url( voa_page_url( 'faqs' ) ); ?>">
				<?php esc_html_e( 'View all FAQs', 'voa' ); ?>
				<?php voa_icon( 'arrow-right' ); ?>
			</a>
		</div>
	</div>
</section>
