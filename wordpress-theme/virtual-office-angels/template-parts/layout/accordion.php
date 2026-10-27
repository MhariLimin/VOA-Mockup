<?php
/**
 * One-open-at-a-time accordion — Accordion in SourcePage.tsx. accordion.js drives it.
 *
 * Args:
 *   items      array   [ heading, body ] pairs
 *   id_prefix  string  prefix for the panel ids
 *   headed     bool    wrap each question's button in an h3 (the city pages' copy asks for it)
 *   html       bool    the bodies are already safe HTML (escaped by the caller), not plain text
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_headed = ! empty( $args['headed'] );
$voa_html   = ! empty( $args['html'] );
?>
<div class="accordion">
	<?php foreach ( $args['items'] as $voa_index => $voa_item ) : ?>
		<?php $voa_id = $args['id_prefix'] . '-' . $voa_index; ?>
		<div class="accordion-item">
			<?php if ( $voa_headed ) : ?><h3 class="accordion-heading"><?php endif; ?>
			<button type="button" aria-expanded="false" aria-controls="<?php echo esc_attr( $voa_id ); ?>">
				<span><?php echo esc_html( $voa_item[0] ); ?></span><span class="accordion-toggle" aria-hidden="true">+</span>
			</button>
			<?php if ( $voa_headed ) : ?></h3><?php endif; ?>
			<p class="accordion-panel" id="<?php echo esc_attr( $voa_id ); ?>" hidden><?php echo $voa_html ? $voa_item[1] : esc_html( $voa_item[1] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped by the caller when html is set. ?></p>
		</div>
	<?php endforeach; ?>
</div>
