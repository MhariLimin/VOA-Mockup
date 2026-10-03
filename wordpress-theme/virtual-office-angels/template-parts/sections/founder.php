<?php
/**
 * Founder section — "Australian-led, people-first outsourcing company".
 *
 * Carries the summary and the portrait. The detailed founder narrative belongs in the About page's
 * leadership section and must not be duplicated here; Our Story and Founder & Leadership are
 * deliberately distinct narratives.
 *
 * The portrait is the Customizer's own image field rather than a post thumbnail, since this section
 * is not attached to a post.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_portrait_id = (int) get_theme_mod( 'voa_founder_portrait', 0 );
?>

<section class="section home-founder-section" data-home-reveal="split">
	<div class="container split-grid story-grid">
		<?php if ( $voa_portrait_id ) : ?>
			<div class="source-image founder-home-image">
				<?php
				echo wp_get_attachment_image(
					$voa_portrait_id,
					'voa-portrait',
					false,
					array(
						'loading' => 'lazy',
						'alt'     => esc_attr__( 'Anne Villavieja, founder of Virtual Office Angels', 'voa' ),
					)
				);
				?>
			</div>
		<?php endif; ?>

		<div>
			<p class="eyebrow"><?php esc_html_e( 'Australian-led, people-first outsourcing company', 'voa' ); ?></p>
			<h2>
				<?php
				echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
					__( 'Built on <em>HR expertise</em> and first-hand <em>market experience</em>.', 'voa' )
				);
				?>
			</h2>
			<p class="lead compact">
				<?php esc_html_e( 'Anne Villavieja founded Virtual Office Angels in 2010. As an HR professional with experience across Australian and Western markets, she built a company focused solely on recruiting and supporting professional virtual assistants for small and medium businesses.', 'voa' ); ?>
			</p>
			<a class="text-link" href="<?php echo esc_url( voa_page_url( 'about' ) ); ?>">
				<?php esc_html_e( 'Learn more about us', 'voa' ); ?>
				<?php voa_icon( 'arrow-right' ); ?>
			</a>
		</div>
	</div>
</section>
