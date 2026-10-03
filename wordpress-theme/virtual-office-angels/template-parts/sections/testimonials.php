<?php
/**
 * Client feedback — three shortened testimonial previews.
 *
 * Previews stay compact, consistently sized, visually elevated, shortened with an ellipsis, and link
 * to the full testimonials page. The full quotes live on /client-stories.
 *
 * Avatars are initials, not photographs. No verified client portraits exist, and none may be
 * generated or assigned. The initials come from the testimonial's own title.
 *
 * The client has confirmed permission to publish these named testimonials (2026-10-03).
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

const VOA_PREVIEW_CHARS = 190;

$voa_testimonials = get_posts(
	array(
		'post_type'      => 'voa_testimonial',
		'posts_per_page' => 3,
		'orderby'        => 'menu_order date',
		'order'          => 'ASC',
	)
);

if ( ! $voa_testimonials ) {
	return;
}
?>

<section class="section home-testimonial-section" data-home-reveal="media">
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Client feedback', 'voa' ); ?></p>
				<h2>
					<?php
					echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
						__( 'What Australian businesses say about <em>working with Virtual Office Angels</em>.', 'voa' )
					);
					?>
				</h2>
			</div>
			<a class="text-link" href="<?php echo esc_url( voa_page_url( 'client-stories' ) ); ?>">
				<?php esc_html_e( 'Read all testimonials', 'voa' ); ?>
				<?php voa_icon( 'arrow-right' ); ?>
			</a>
		</div>

		<div class="testimonial-grid testimonial-grid-3">
			<?php foreach ( $voa_testimonials as $voa_testimonial ) : ?>
				<figure>
					<blockquote>
						“<?php echo esc_html( voa_shorten( wp_strip_all_tags( $voa_testimonial->post_content ), VOA_PREVIEW_CHARS ) ); ?>”
					</blockquote>
					<figcaption>
						<span class="testimonial-avatar" aria-hidden="true">
							<?php echo esc_html( voa_initials( get_the_title( $voa_testimonial ) ) ); ?>
						</span>
						<span>
							<strong><?php echo esc_html( get_the_title( $voa_testimonial ) ); ?></strong>
							<small><?php echo esc_html( get_post_meta( $voa_testimonial->ID, 'voa_role', true ) ); ?></small>
						</span>
					</figcaption>
				</figure>
			<?php endforeach; ?>
		</div>
	</div>
</section>
