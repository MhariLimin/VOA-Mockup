<?php
/**
 * A city landing page — LocationPage.tsx. inc/locations.php sends /virtual-assistants-sydney/ and the
 * other city pages here.
 *
 * Copy comes from data/locations.json (content/locationPages.ts), with Website Content edits applied;
 * its [label](address) and *word* marks are rendered by voa_location_inline(). Built from existing
 * sections: the homepage hero (same rotating photographs, figures and dots), the logo wall, content
 * split, service directory and FAQ. It closes with the contact section alone, since the hero already
 * carries the four figures that the standard closing would repeat.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_city      = voa_current_location();
$voa_locations = voa_data( 'locations' );
$voa_location  = $voa_locations[ $voa_city ];
$voa_site      = voa_data( 'site' );
$voa_pages     = voa_data( 'pages' );
$voa_hero      = $voa_location['hero'];
$voa_clients   = $voa_location['clients'];
$voa_hours     = $voa_location['hours'];
$voa_services  = $voa_location['services'];
$voa_story     = $voa_location['story'];
$voa_faqs      = $voa_location['faqs'];
$voa_columns   = count( $voa_clients['wall'] );

get_header();
?>

<section class="section home-hero">
	<div class="hero-backdrop" aria-hidden="true">
		<?php foreach ( $voa_site['heroBackgrounds'] as $voa_index => $voa_image ) : ?>
			<span class="hero-backdrop-image" data-active="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" style="background-image:url(<?php echo esc_url( voa_media_url( $voa_image ) ); ?>)"></span>
		<?php endforeach; ?>
	</div>
	<div class="container hero-grid">
		<div class="hero-copy">
			<p class="eyebrow"><?php echo esc_html( $voa_hero['eyebrow'] ); ?></p>
			<h1><?php echo voa_location_inline( $voa_hero['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
			<p class="lead"><?php echo voa_location_inline( $voa_hero['intro'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Find the Right Fit</a>
				<a class="button button-secondary" href="#local-clients">See local clients</a>
			</div>
		</div>
	</div>
	<div class="container">
		<dl class="hero-stats">
			<?php foreach ( $voa_site['heroStats'] as $voa_index => $voa_stat ) : ?>
				<div><dt><span class="hero-stat-icon" aria-hidden="true"><?php echo voa_hero_stat_icon( $voa_index ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span><?php echo esc_html( $voa_stat[0] ); ?></dt><dd><?php echo esc_html( $voa_stat[1] ); ?></dd></div>
			<?php endforeach; ?>
		</dl>
		<div class="hero-dots" role="group" aria-label="Choose a background image">
			<?php foreach ( $voa_site['heroBackgrounds'] as $voa_index => $voa_image ) : ?>
				<button class="hero-dot" type="button" data-active="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" aria-label="Background image <?php echo (int) $voa_index + 1; ?>" aria-pressed="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>"></button>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section" id="local-clients"><div class="container">
	<div class="section-heading"><div>
		<p class="eyebrow"><?php echo esc_html( $voa_clients['eyebrow'] ); ?></p>
		<h2><?php echo voa_location_inline( $voa_clients['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		<p class="lead compact"><?php echo esc_html( $voa_clients['intro'] ); ?></p>
	</div></div>
	<div class="logo-wall location-logo-wall" style="--logo-columns:<?php echo (int) min( $voa_columns, 7 ); ?>;--logo-columns-md:<?php echo (int) min( $voa_columns, 3 ); ?>;--logo-columns-sm:<?php echo (int) min( $voa_columns, 2 ); ?>">
		<?php foreach ( $voa_clients['wall'] as $voa_client ) : ?>
			<?php $voa_logo = ! empty( $voa_client['image'] ) ? voa_media_url( $voa_client['image'] ) : ''; ?>
			<div>
				<?php if ( $voa_logo ) : ?>
					<img src="<?php echo esc_url( $voa_logo ); ?>" alt="<?php echo esc_attr( $voa_client['client'] ); ?>" loading="lazy">
				<?php else : ?>
					<strong><?php echo esc_html( $voa_client['client'] ); ?></strong>
				<?php endif; ?>
				<span><?php echo esc_html( $voa_logo ? $voa_client['client'] . ' · ' . $voa_client['location'] : $voa_client['location'] ); ?></span>
			</div>
		<?php endforeach; ?>
	</div>
</div></section>

<section class="section muted-section"><div class="container content-split">
	<div>
		<p class="eyebrow"><?php echo esc_html( $voa_hours['eyebrow'] ); ?></p>
		<h2><?php echo voa_location_inline( $voa_hours['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		<p class="lead compact"><?php echo voa_location_inline( $voa_hours['body'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></p>
	</div>
	<div class="task-panel">
		<span class="card-index"><?php echo esc_html( $voa_hours['panel'] ); ?></span>
		<ul class="check-list">
			<?php foreach ( $voa_hours['items'] as $voa_item ) : ?>
				<li><?php echo voa_location_inline( $voa_item ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</div></section>

<section class="section"><div class="container">
	<div class="section-heading"><div>
		<p class="eyebrow"><?php echo esc_html( $voa_services['eyebrow'] ); ?></p>
		<h2><?php echo voa_location_inline( $voa_services['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
	</div><a class="button button-secondary" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">All services</a></div>
	<div class="service-directory location-directory">
		<?php foreach ( $voa_services['cards'] as $voa_number => $voa_card ) : ?>
			<?php $voa_image = isset( $voa_pages[ $voa_card['path'] ]['image'] ) ? $voa_pages[ $voa_card['path'] ]['image'] : ''; ?>
			<a href="<?php echo esc_url( voa_url( $voa_card['path'] ) ); ?>" class="directory-card">
				<span><?php echo esc_html( voa_index( $voa_number + 1 ) ); ?></span>
				<div>
					<h3><?php echo esc_html( $voa_card['title'] ); ?></h3>
					<p><span><?php echo esc_html( $voa_card['text'] ); ?></span></p>
				</div>
				<img src="<?php echo esc_url( voa_media_url( $voa_image ) ); ?>" alt="" loading="lazy">
				<?php voa_icon( 'arrow-up-right' ); ?>
			</a>
		<?php endforeach; ?>
	</div>
</div></section>

<section class="section muted-section"><div class="container content-split">
	<div>
		<p class="eyebrow"><?php echo esc_html( $voa_story['eyebrow'] ); ?></p>
		<h2><?php echo voa_location_inline( $voa_story['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		<p class="lead compact"><?php echo esc_html( $voa_story['body'] ); ?></p>
	</div>
	<div class="task-panel">
		<span class="card-index"><?php echo esc_html( $voa_story['panel'] ); ?></span>
		<ul class="check-list">
			<?php foreach ( $voa_story['items'] as $voa_item ) : ?>
				<li><?php echo esc_html( $voa_item ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</div></section>

<section class="section"><div class="container faq-page-grid">
	<aside>
		<p class="eyebrow"><?php echo esc_html( $voa_faqs['eyebrow'] ); ?></p>
		<h2><?php echo voa_location_inline( $voa_faqs['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
	</aside>
	<?php
	get_template_part(
		'template-parts/layout/accordion',
		null,
		array(
			'items'     => array_map(
				function ( $pair ) {
					return array( $pair[0], voa_location_inline( $pair[1] ) );
				},
				$voa_faqs['items']
			),
			'id_prefix' => $voa_city . '-faq',
			'headed'    => true,
			'html'      => true,
		)
	);
	?>
</div></section>

<?php
get_template_part(
	'template-parts/layout/next-step',
	null,
	array(
		'copy' => array(
			'eyebrow' => 'Let’s talk',
			'heading' => 'Looking for virtual support in ' . $voa_location['name'] . '?',
		),
	)
);

get_footer();
