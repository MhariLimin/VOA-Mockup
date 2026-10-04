<?php
/**
 * Client logo carousel — ClientCarousel.tsx. client-carousel.js drives it.
 *
 * The complete client set, then the first five again, so the loop can run into them and jump back to
 * the start without a visible rewind. Five slides are in view on first render, as in React.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_clients = voa_data( 'clients' );
$voa_slides  = array_merge( $voa_clients, array_slice( $voa_clients, 0, 5 ) );
?>
<div class="client-carousel">
	<div class="client-carousel-viewport">
		<div class="client-carousel-track" style="transform:translateX(-0%);--visible-clients:5">
			<?php foreach ( $voa_slides as $voa_index => $voa_client ) : ?>
				<div class="client-slide" aria-hidden="<?php echo $voa_index >= 5 ? 'true' : 'false'; ?>">
					<img src="<?php echo esc_url( voa_media_url( $voa_client['image'] ) ); ?>" alt="<?php echo esc_attr( $voa_client['name'] ? $voa_client['name'] : 'Virtual Office Angels client logo' ); ?>" loading="lazy">
					<?php if ( $voa_client['name'] ) : ?>
						<span><?php echo esc_html( $voa_client['name'] ); ?></span>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="carousel-controls">
		<div><button type="button" aria-label="Previous client"><?php voa_icon( 'arrow-left' ); ?></button><button type="button" aria-label="Next client"><?php voa_icon( 'arrow-right' ); ?></button></div>
	</div>
</div>
