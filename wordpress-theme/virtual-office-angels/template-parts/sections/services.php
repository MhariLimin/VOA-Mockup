<?php
/**
 * Six service cards.
 *
 * The home page shows six of the ten — the six the staging source presented. The remaining four are
 * reachable from /services and the mega menu. Which six is controlled by menu_order on the service
 * posts, so the client can change it without touching code.
 *
 * Each card's systems line is trimmed on the home page to keep the six cards visually even; the
 * service's own page carries the complete list.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

const VOA_HOME_SERVICES = 6;
const VOA_HOME_SYSTEMS  = 3;

$voa_services = get_posts(
	array(
		'post_type'      => 'voa_service',
		'posts_per_page' => VOA_HOME_SERVICES,
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
	)
);

if ( ! $voa_services ) {
	return;
}
?>

<section class="section services-section has-section-backdrop" data-home-reveal="grid">
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Specialised virtual assistant services', 'voa' ); ?></p>
				<h2>
					<?php
					echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
						__( 'Virtual support tailored around your <em>industry</em>, <em>systems</em> and <em>standards</em>.', 'voa' )
					);
					?>
				</h2>
				<p class="lead compact">
					<?php esc_html_e( 'Our professional virtual assistant services go beyond general administration. We match businesses with professionals who understand the terminology, documentation and workflows common to their field.', 'voa' ); ?>
				</p>
			</div>
			<a class="button button-secondary" href="<?php echo esc_url( voa_page_url( 'services' ) ); ?>">
				<?php esc_html_e( 'Explore services', 'voa' ); ?>
			</a>
		</div>

		<div class="service-grid">
			<?php foreach ( $voa_services as $index => $voa_service ) : ?>
				<a class="service-card service-card-<?php echo (int) $index + 1; ?>" href="<?php echo esc_url( get_permalink( $voa_service ) ); ?>">
					<div class="service-card-top">
						<span class="card-index"><?php echo esc_html( str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
						<span class="service-card-image">
							<?php
							if ( has_post_thumbnail( $voa_service ) ) {
								echo get_the_post_thumbnail( $voa_service, 'voa-thumb', array( 'loading' => 'lazy', 'alt' => '' ) );
							}
							?>
						</span>
					</div>

					<div class="service-card-copy">
						<h3><?php echo esc_html( get_the_title( $voa_service ) ); ?></h3>
						<p><?php echo esc_html( get_the_excerpt( $voa_service ) ); ?></p>

						<?php
						$voa_systems = voa_service_systems( $voa_service->ID );

						if ( $voa_systems ) :
							$voa_shown = array_slice( $voa_systems, 0, VOA_HOME_SYSTEMS );
							?>
							<p class="service-systems">
								<strong><?php esc_html_e( 'Systems:', 'voa' ); ?></strong>
								<?php foreach ( $voa_shown as $voa_i => $voa_system ) : ?>
									<span class="system-name"><?php echo esc_html( $voa_system ); ?></span><?php echo $voa_i < count( $voa_shown ) - 1 ? ', ' : '.'; ?>
								<?php endforeach; ?>
							</p>
						<?php endif; ?>
					</div>

					<?php voa_icon( 'arrow-up-right', 'card-arrow' ); ?>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
