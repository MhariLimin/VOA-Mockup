<?php
/**
 * Page opening with an image — ImageHero in SourcePage.tsx, used by Insights and Videos.
 *
 * With a photograph and no `aside`, the image takes the right half of the section behind a curved
 * cut, as on /managed-virtual-support. A caller passing its own aside (Videos passes a player-style poster) keeps the
 * column layout instead.
 *
 * Args:
 *   page       array   the page brief from data/pages.json
 *   primary    array   optional [ label, href ]
 *   secondary  array   optional [ label, href ]; with neither, no button row is drawn
 *   aside      string  optional markup for the right column
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief = $args['page'];
$voa_aside = isset( $args['aside'] ) ? $args['aside'] : '';
$voa_cut   = ! $voa_aside && ! empty( $voa_brief['image'] );

$voa_cta = static function ( $cta, $class ) {
	printf( '<a class="%s" href="%s">%s</a>', esc_attr( $class ), esc_url( voa_url( $cta[1] ) ), esc_html( $cta[0] ) );
};
?>
<section class="section inner-hero<?php echo $voa_cut ? ' managed-hero' : ''; ?>">
	<?php if ( $voa_cut ) : ?>
		<div class="managed-hero-media">
			<img src="<?php echo esc_url( voa_media_url( $voa_brief['image'] ) ); ?>" alt="<?php echo esc_attr( isset( $voa_brief['imageAlt'] ) ? $voa_brief['imageAlt'] : '' ); ?>">
		</div>
	<?php endif; ?>
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
			<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
			<?php if ( ! empty( $voa_brief['summary'] ) ) : ?>
				<p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p>
			<?php endif; ?>
			<?php if ( ! empty( $args['primary'] ) || ! empty( $args['secondary'] ) ) : ?>
				<div class="button-row">
					<?php
					if ( ! empty( $args['primary'] ) ) {
						$voa_cta( $args['primary'], 'button' );
					}
					if ( ! empty( $args['secondary'] ) ) {
						$voa_cta( $args['secondary'], 'button button-secondary' );
					}
					?>
				</div>
			<?php endif; ?>
		</div>
		<?php
		if ( ! $voa_cut ) {
			if ( $voa_aside ) {
				echo $voa_aside; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- built by the caller from escaped parts.
			} elseif ( ! empty( $voa_brief['image'] ) ) {
				printf( '<img class="inner-hero-image" src="%s" alt="%s">', esc_url( voa_media_url( $voa_brief['image'] ) ), esc_attr( isset( $voa_brief['imageAlt'] ) ? $voa_brief['imageAlt'] : '' ) );
			}
		}
		?>
	</div>
</section>
