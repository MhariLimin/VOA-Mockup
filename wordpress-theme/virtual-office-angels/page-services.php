<?php
/**
 * /services — ServicesPage in SourcePage.tsx: the ten services as a directory, then task shortcuts.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief    = voa_page( '/services' );
$voa_services = voa_data( 'services' );

get_header();
?>

<section class="section inner-hero service-hero" style="<?php echo esc_attr( 'background-image:url(' . voa_media_url( $voa_brief['image'] ) . ')' ); ?>">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
			<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
			<p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p>
			<div class="button-row"><a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Find the Right Fit</a></div>
		</div>
	</div>
</section>

<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Choose a service</p><h2>Start with the workflow that needs <em>experienced support</em>.</h2></div></div><div class="service-directory">
	<?php
	$voa_number = 0;
	foreach ( voa_data( 'pages' ) as $voa_path => $voa_service ) :
		if ( 'service' !== $voa_service['template'] ) {
			continue;
		}
		$voa_number++;
		$voa_detail = isset( $voa_services['details'][ $voa_path ] ) ? $voa_services['details'][ $voa_path ] : null;
		?>
		<a href="<?php echo esc_url( voa_url( $voa_path ) ); ?>" class="directory-card">
			<span><?php echo esc_html( voa_index( $voa_number ) ); ?></span>
			<div>
				<h2><?php echo esc_html( $voa_detail ? $voa_detail['title'] : $voa_service['title'] ); ?></h2>
				<p><span><?php echo esc_html( $voa_detail ? $voa_detail['lead'] : $voa_service['summary'] ); ?></span></p>
			</div>
			<img src="<?php echo esc_url( voa_media_url( $voa_service['image'] ) ); ?>" alt="" loading="lazy">
			<?php voa_icon( 'arrow-up-right' ); ?>
		</a>
	<?php endforeach; ?>
</div></div></section>

<section class="section muted-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Start from the work</p><h2>Not sure which service <em>fits the work</em>?</h2></div></div><div class="service-router">
	<?php foreach ( $voa_services['router'] as $voa_route ) : ?>
		<a href="<?php echo esc_url( voa_url( $voa_route[1] ) ); ?>"><?php echo esc_html( $voa_route[0] ); ?> <?php voa_icon( 'arrow-right' ); ?></a>
	<?php endforeach; ?>
</div></div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
