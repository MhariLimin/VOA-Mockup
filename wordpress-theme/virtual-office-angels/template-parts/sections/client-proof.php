<?php
/**
 * Client logo carousel, under "Trusted by leading Australian businesses".
 *
 * Sits directly after the hero — decided deliberately, as is the absence of a pause button. It
 * advances every second and pauses on hover or focus, which is what makes that acceptable.
 *
 * The client has confirmed permission to display these logos (2026-10-03).
 *
 * PHP renders the five cloned slides the loop needs, so client-carousel.js never builds DOM. Five is
 * the widest visible count, so the track is always full as it wraps.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_clients = get_posts(
	array(
		'post_type'      => 'voa_client',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
	)
);

if ( ! $voa_clients ) {
	return;
}

const VOA_CAROUSEL_CLONES = 5;
$voa_slides = array_merge( $voa_clients, array_slice( $voa_clients, 0, VOA_CAROUSEL_CLONES ) );
?>

<section class="section home-client-proof" data-home-reveal="clients">
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Our clients', 'voa' ); ?></p>
				<h2><?php echo voa_heading( __( 'Trusted by leading <em>Australian businesses</em>.', 'voa' ) ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped ?></h2>
			</div>
		</div>

		<div class="client-carousel">
			<div class="client-carousel-viewport">
				<div class="client-carousel-track">
					<?php foreach ( $voa_slides as $index => $voa_client ) : ?>
						<div class="client-slide" <?php echo $index >= count( $voa_clients ) ? 'data-clone="true"' : ''; ?>>
							<?php
							if ( has_post_thumbnail( $voa_client ) ) {
								echo get_the_post_thumbnail(
									$voa_client,
									'voa-logo',
									array(
										'loading' => 'lazy',
										'alt'     => esc_attr( get_the_title( $voa_client ) ),
									)
								);
							}
							?>
							<span><?php echo esc_html( get_the_title( $voa_client ) ); ?></span>
						</div>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="carousel-controls">
				<div>
					<button type="button" aria-label="<?php esc_attr_e( 'Previous client', 'voa' ); ?>"><?php voa_icon( 'arrow-left' ); ?></button>
					<button type="button" aria-label="<?php esc_attr_e( 'Next client', 'voa' ); ?>"><?php voa_icon( 'arrow-right' ); ?></button>
				</div>
			</div>
		</div>
	</div>
</section>
