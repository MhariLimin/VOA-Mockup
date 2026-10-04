<?php
/**
 * How most pages end — PageClosing in PageClosing.tsx: the four-figure strip, then the contact section.
 *
 * Args:
 *   next_step  array  optional copy for the contact section; see next-step.php
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_site = voa_data( 'site' );
?>
<section class="voa-strip" aria-label="The Virtual Office Angels model">
	<div class="container voa-strip-grid">
		<p class="eyebrow">The Virtual Office Angels model</p>
		<?php foreach ( $voa_site['heroStats'] as $voa_stat ) : ?>
			<div class="voa-strip-item"><strong><?php echo esc_html( $voa_stat[0] ); ?></strong><span><?php echo esc_html( $voa_stat[1] ); ?></span></div>
		<?php endforeach; ?>
	</div>
</section>
<?php
get_template_part( 'template-parts/layout/next-step', null, array( 'copy' => isset( $args['next_step'] ) ? $args['next_step'] : null ) );
