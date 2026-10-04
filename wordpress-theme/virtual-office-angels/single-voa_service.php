<?php
/**
 * Service page — ServicePage in SourcePage.tsx.
 *
 * The post supplies the URL, the Yoast fields and the place in the admin; the page itself renders
 * from data/services.json by slug, which is SERVICE PAGES_VOA.pdf as the React build carries it.
 *
 * Behaviour: accordion.js (scope and FAQ accordions), interactions.js (systems diagram hover),
 * backdrop-rotator.js (closing section).
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_path     = '/services/' . get_post_field( 'post_name', get_queried_object_id() );
$voa_brief    = voa_page( $voa_path );
$voa_services = voa_data( 'services' );
$voa_detail   = isset( $voa_services['details'][ $voa_path ] ) ? $voa_services['details'][ $voa_path ] : null;

get_header();

if ( ! $voa_detail || ! $voa_brief ) :
	/* A service post with no matching entry in the data: say so plainly rather than render half a page. */
	?>
	<section class="section utility-page"><div class="container narrow"><p class="eyebrow">Service</p><h1><?php echo esc_html( get_the_title() ); ?></h1><p class="lead">This service has no page content yet.</p></div></section>
	<?php
	get_footer();
	return;
endif;

/*
 * Systems as a hub-and-spoke constellation: chip positions on an ellipse, so the layout stays even
 * for any count between four and eight.
 */
$voa_systems = $voa_detail['systems'];
$voa_points  = array();
foreach ( $voa_systems as $voa_index => $voa_system ) {
	$voa_angle    = deg2rad( -90 + ( 360 / count( $voa_systems ) ) * $voa_index );
	$voa_points[] = array(
		voa_js_number( 50 + cos( $voa_angle ) * 37 ),
		voa_js_number( 50 + sin( $voa_angle ) * 33 ),
	);
}
?>

<section class="section inner-hero service-hero"<?php echo ! empty( $voa_brief['image'] ) ? ' style="' . esc_attr( 'background-image:url(' . voa_media_url( $voa_brief['image'] ) . ')' ) . '"' : ''; ?>>
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
			<h1><?php echo esc_html( $voa_detail['title'] ); ?></h1>
			<p class="lead"><?php echo esc_html( $voa_detail['lead'] ); ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Find The Right Fit</a>
				<a class="button button-secondary" href="#scope">See What You Can Delegate</a>
			</div>
			<ul class="scope-tags">
				<?php foreach ( $voa_detail['tags'] as $voa_tag ) : ?>
					<li><?php echo esc_html( $voa_tag ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</section>

<section class="section" id="scope"><div class="container content-split"><div><p class="eyebrow"><?php echo esc_html( $voa_detail['scopeEyebrow'] ); ?></p><h2><?php echo voa_accent( $voa_detail['scopeHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2><p class="lead compact"><?php echo esc_html( $voa_detail['scopeIntro'] ); ?></p></div><div class="task-panel"><span class="card-index">Typical responsibilities</span><?php get_template_part( 'template-parts/layout/accordion', null, array( 'items' => $voa_detail['scope'], 'id_prefix' => 'scope' ) ); ?></div></div></section>

<section class="section muted-section systems-section"><div class="container">
	<div class="systems-intro"><p class="eyebrow">Systems experience &amp; requirements</p><h2><?php echo voa_accent( $voa_detail['systemsHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2><p class="lead compact"><?php echo esc_html( $voa_detail['systemsIntro'] ); ?></p></div>
	<div class="systems-diagram" data-count="<?php echo count( $voa_systems ); ?>" data-linked="false">
		<svg class="systems-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<?php foreach ( $voa_points as $voa_point ) : ?>
				<line x1="50" y1="50" x2="<?php echo esc_attr( $voa_point[0] ); ?>" y2="<?php echo esc_attr( $voa_point[1] ); ?>" data-active="false" vector-effect="non-scaling-stroke"/>
			<?php endforeach; ?>
		</svg>
		<span class="systems-core" data-linked="false" aria-hidden="true"><?php echo voa_stack_glyph(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span>
		<ul>
			<?php foreach ( $voa_systems as $voa_index => $voa_system ) : ?>
				<li style="left:<?php echo esc_attr( $voa_points[ $voa_index ][0] ); ?>%;top:<?php echo esc_attr( $voa_points[ $voa_index ][1] ); ?>%">
					<span class="systems-chip" data-active="false"><?php echo voa_module_glyph(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?><?php echo esc_html( $voa_system ); ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div></section>

<section class="section"><div class="container">
	<div class="section-heading"><div><p class="eyebrow"><?php echo esc_html( $voa_detail['fitEyebrow'] ); ?></p><h2><?php echo voa_accent( $voa_detail['fitHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2></div></div>
	<?php
	/*
	 * One diagram: the conditions converge on the matched specialist and the results fan back out, so
	 * the section reads left to right as cause, role, effect. Each item's icon is resolved from its
	 * own wording — see voa_item_glyph().
	 */
	?>
	<div class="fit-flow">
		<div class="fit-flow-side" data-side="in">
			<p class="eyebrow">A good fit when</p>
			<ul>
				<?php foreach ( $voa_detail['fits'] as $voa_fit ) : ?>
					<li><span class="fit-flow-text"><?php echo esc_html( $voa_fit ); ?></span><span class="fit-flow-icon" aria-hidden="true"><?php echo voa_item_glyph( $voa_fit ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span></li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div class="fit-flow-hub">
			<svg class="fit-flow-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				<?php foreach ( array( 12.5, 37.5, 62.5, 87.5 ) as $voa_y ) : ?>
					<path class="fit-flow-wire" d="M0,<?php echo esc_attr( $voa_y ); ?> C 26,<?php echo esc_attr( $voa_y ); ?> 28,50 50,50" vector-effect="non-scaling-stroke"/>
				<?php endforeach; ?>
				<?php foreach ( array( 12.5, 37.5, 62.5, 87.5 ) as $voa_y ) : ?>
					<path class="fit-flow-wire" data-out="true" d="M50,50 C 72,50 74,<?php echo esc_attr( $voa_y ); ?> 100,<?php echo esc_attr( $voa_y ); ?>" vector-effect="non-scaling-stroke"/>
				<?php endforeach; ?>
			</svg>
			<span class="fit-flow-node" aria-hidden="true"><?php echo voa_role_glyph(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span>
		</div>

		<div class="fit-flow-side" data-side="out">
			<p class="eyebrow"><?php echo esc_html( $voa_detail['outcomeLabel'] ); ?></p>
			<ul>
				<?php foreach ( $voa_detail['outcomePoints'] as $voa_point_text ) : ?>
					<li><span class="fit-flow-icon" aria-hidden="true"><?php echo voa_item_glyph( $voa_point_text ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span><span class="fit-flow-text"><?php echo esc_html( $voa_point_text ); ?></span></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
	<p class="fit-flow-note"><?php echo esc_html( $voa_detail['outcomeHeading'] ); ?></p>
</div></section>

<section class="section muted-section service-feedback"><div class="container">
	<div class="section-heading"><div><p class="eyebrow">Client feedback</p><h2><?php echo voa_accent( $voa_detail['feedbackHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2></div></div>
	<div class="testimonial-grid testimonial-grid-3">
		<?php for ( $voa_slot = 0; $voa_slot < 3; $voa_slot++ ) : ?>
			<figure>
				<blockquote>“<?php echo esc_html( $voa_detail['feedbackPlaceholder'] ); ?>”</blockquote>
				<figcaption>
					<span class="testimonial-avatar" aria-hidden="true"><?php echo voa_person_glyph(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span>
					<span><strong>Client name</strong><small>Business</small></span>
				</figcaption>
			</figure>
		<?php endfor; ?>
	</div>
</div></section>

<section class="section"><div class="container faq-page-grid"><aside><p class="eyebrow">Questions about the service</p><h2><?php echo voa_accent( $voa_detail['faqHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2><p class="lead compact"><?php echo esc_html( $voa_detail['faqIntro'] ); ?></p></aside><?php get_template_part( 'template-parts/layout/accordion', null, array( 'items' => $voa_detail['faqs'], 'id_prefix' => 'service-faq' ) ); ?></div></section>

<section class="section voa-model-section">
	<div class="container voa-model-heading"><p class="eyebrow"><?php echo esc_html( $voa_detail['managedEyebrow'] ); ?></p><h2><?php echo voa_accent( $voa_detail['managedHeading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2><?php if ( ! empty( $voa_detail['managedIntro'] ) ) : ?><p class="lead compact"><?php echo esc_html( $voa_detail['managedIntro'] ); ?></p><?php endif; ?></div>
	<div class="container voa-model-grid voa-model-grid-4">
		<?php foreach ( $voa_detail['managedSteps'] as $voa_index => $voa_step ) : ?>
			<article><span>0<?php echo (int) $voa_index + 1; ?></span><h3><?php echo esc_html( $voa_services['managedStepTitles'][ $voa_index ] ); ?></h3><p><?php echo esc_html( $voa_step ); ?></p></article>
		<?php endforeach; ?>
	</div>
</section>

<?php
get_template_part(
	'template-parts/layout/next-step',
	null,
	array(
		'class' => 'service-closing',
		'copy'  => array(
			'eyebrow' => 'Find the right specialised virtual assistant for your business',
			'heading' => $voa_detail['closingHeading'],
		),
	)
);

get_footer();
