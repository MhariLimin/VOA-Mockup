<?php
/**
 * The low-opacity rotating background behind the closing contact sections — RotatingBackdrop.tsx.
 *
 * The section it sits in needs `has-section-backdrop`. Decorative, so hidden from assistive
 * technology and without controls. backdrop-rotator.js moves data-active every six seconds.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_site = voa_data( 'site' );
?>
<div class="section-backdrop" aria-hidden="true">
	<?php foreach ( $voa_site['contactBackgrounds'] as $voa_index => $voa_image ) : ?>
		<?php
		$voa_style = 'background-image:url(' . voa_media_url( $voa_image['src'] ) . ')';
		if ( ! empty( $voa_image['frame'] ) ) {
			$voa_style .= ';background-size:' . $voa_image['frame'];
		}
		if ( ! empty( $voa_image['focus'] ) ) {
			$voa_style .= ';background-position:' . $voa_image['focus'];
		}
		?>
		<span data-active="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" style="<?php echo esc_attr( $voa_style ); ?>"></span>
	<?php endforeach; ?>
</div>
