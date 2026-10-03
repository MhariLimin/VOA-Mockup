<?php
/**
 * Home hero.
 *
 * Markup matches the React build exactly, so global.css styles it with no changes: the cross-fading
 * photographic backdrop, the copy over a scrim, the two calls to action, the four-figure glass panel
 * and the dot selector.
 *
 * Backgrounds come from the media library through the `voa_hero_backgrounds` option — a list of
 * attachment IDs. With none set, no backdrop renders and the hero falls back to the page background,
 * which is correct rather than broken.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_backgrounds = voa_background_images( 'voa_hero_backgrounds' );
$voa_figures     = voa_figures();
?>

<section class="section home-hero">
	<?php if ( $voa_backgrounds ) : ?>
		<div class="hero-backdrop" data-interval="6000" aria-hidden="true">
			<?php foreach ( $voa_backgrounds as $index => $url ) : ?>
				<span
					class="hero-backdrop-image"
					data-active="<?php echo 0 === $index ? 'true' : 'false'; ?>"
					style="background-image:url(<?php echo esc_url( $url ); ?>)"
				></span>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<div class="container hero-grid">
		<div class="hero-copy">
			<?php if ( voa_option( 'voa_hero_eyebrow' ) ) : ?>
				<p class="eyebrow"><?php echo esc_html( voa_option( 'voa_hero_eyebrow' ) ); ?></p>
			<?php endif; ?>

			<h1><?php echo voa_heading( voa_option( 'voa_hero_heading' ) ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- voa_heading runs wp_kses. ?></h1>

			<?php if ( voa_option( 'voa_hero_lead' ) ) : ?>
				<p class="lead"><?php echo esc_html( voa_option( 'voa_hero_lead' ) ); ?></p>
			<?php endif; ?>

			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_page_url( 'contact' ) ); ?>">
					<?php esc_html_e( 'Find the Right Fit', 'voa' ); ?>
				</a>
				<a class="button button-secondary" href="<?php echo esc_url( voa_page_url( 'services' ) ); ?>">
					<?php esc_html_e( 'Explore services', 'voa' ); ?>
				</a>
			</div>
		</div>
	</div>

	<div class="container">
		<?php if ( $voa_figures ) : ?>
			<dl class="hero-stats">
				<?php foreach ( $voa_figures as $index => $figure ) : ?>
					<div>
						<dt>
							<?php
							/*
							 * The mark sits inside the <dt> beside the figure: a dl > div may only
							 * contain dt and dd, so it cannot be a sibling of them.
							 */
							$voa_stat_icons = array( 'stat-years', 'stat-top', 'stat-swap', 'stat-managed' );
							if ( isset( $voa_stat_icons[ $index ] ) ) :
								?>
								<span class="hero-stat-icon" aria-hidden="true">
									<?php voa_icon( $voa_stat_icons[ $index ] ); ?>
								</span>
							<?php endif; ?>
							<?php echo esc_html( $figure[0] ); ?>
						</dt>
						<dd><?php echo esc_html( $figure[1] ); ?></dd>
					</div>
				<?php endforeach; ?>
			</dl>
		<?php endif; ?>

		<?php if ( count( $voa_backgrounds ) > 1 ) : ?>
			<div class="hero-dots" role="group" aria-label="<?php esc_attr_e( 'Choose a background image', 'voa' ); ?>">
				<?php foreach ( $voa_backgrounds as $index => $url ) : ?>
					<button
						class="hero-dot"
						type="button"
						data-active="<?php echo 0 === $index ? 'true' : 'false'; ?>"
						aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>"
						aria-label="
						<?php
						/* translators: %d: image number. */
						printf( esc_attr__( 'Background image %d', 'voa' ), (int) $index + 1 );
						?>
						"
					></button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
