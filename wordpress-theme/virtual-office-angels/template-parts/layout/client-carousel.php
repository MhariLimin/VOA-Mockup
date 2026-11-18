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
					<?php $voa_logo = voa_media_url( $voa_client['image'] ); ?>
					<?php if ( $voa_logo ) : ?>
						<img src="<?php echo esc_url( $voa_logo ); ?>" alt="<?php echo esc_attr( $voa_client['name'] ? $voa_client['name'] : 'Virtual Office Angels client logo' ); ?>" loading="lazy">
					<?php else : /* No logo yet: the name takes the logo's place, as on the city pages. */ ?>
						<strong class="client-slide-name"><?php echo esc_html( $voa_client['name'] ); ?></strong>
					<?php endif; ?>
					<?php if ( $voa_logo && $voa_client['name'] ) : ?>
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
