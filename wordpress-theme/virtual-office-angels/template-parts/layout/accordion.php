<?php
/**
 * One-open-at-a-time accordion — Accordion in SourcePage.tsx. accordion.js drives it.
 *
 * Args:
 *   items      array   [ heading, body ] pairs
 *   id_prefix  string  prefix for the panel ids
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="accordion">
	<?php foreach ( $args['items'] as $voa_index => $voa_item ) : ?>
		<?php $voa_id = $args['id_prefix'] . '-' . $voa_index; ?>
		<div class="accordion-item">
			<button type="button" aria-expanded="false" aria-controls="<?php echo esc_attr( $voa_id ); ?>">
				<span><?php echo esc_html( $voa_item[0] ); ?></span><span class="accordion-toggle" aria-hidden="true">+</span>
			</button>
			<p class="accordion-panel" id="<?php echo esc_attr( $voa_id ); ?>" hidden><?php echo esc_html( $voa_item[1] ); ?></p>
		</div>
	<?php endforeach; ?>
</div>
