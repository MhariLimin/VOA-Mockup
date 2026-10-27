<?php
/**
 * /client-stories — StoriesPage in SourcePage.tsx: the client carousel, every testimonial in full, then
 * the client case study from the live site's /client-case-studies/ page (data/caseStudy.json).
 *
 * Avatars are initials, not photographs. No verified client portraits exist, and none may be
 * generated or assigned. The client has confirmed permission to publish these named testimonials and
 * the logos (2026-10-03).
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief = voa_page( '/client-stories' );

get_header();
?>

<section class="section stories-opening"><span class="stories-wash" aria-hidden="true"></span><div class="container">
	<div class="page-intro client-intro">
		<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
		<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
		<p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p>
	</div>
	<?php get_template_part( 'template-parts/layout/client-carousel' ); ?>
</div></section>

<section class="section muted-section" id="testimonials"><div class="container">
	<div class="section-heading"><div><p class="eyebrow"><?php echo voa_content_copy( 'client-stories', 'testimonials_eyebrow' ); ?></p><h2><?php echo voa_content_copy( 'client-stories', 'testimonials_heading' ); ?></h2><p class="lead compact"><?php echo voa_content_copy( 'client-stories', 'testimonials_intro' ); ?></p></div></div>
	<div class="testimonial-grid">
		<?php foreach ( voa_data( 'testimonials' ) as $voa_quote ) : ?>
			<figure>
				<blockquote>“<?php echo esc_html( $voa_quote['quote'] ); ?>”</blockquote>
				<figcaption>
					<span class="testimonial-avatar" aria-hidden="true"><?php echo esc_html( $voa_quote['initials'] ); ?></span>
					<span><strong><?php echo esc_html( $voa_quote['name'] ); ?></strong><small><?php echo esc_html( $voa_quote['role'] ); ?></small></span>
				</figcaption>
			</figure>
		<?php endforeach; ?>
	</div>
</div></section>

<?php
$voa_case          = voa_data( 'caseStudy' );
$voa_timing_phrase = 'two (2) DAYS';
$voa_timing_parts  = explode( $voa_timing_phrase, $voa_case['onboarding'][1], 2 );
?>
<section class="section case-study" id="case-study"><div class="container">
	<div class="case-study-intro">
		<div>
			<p class="eyebrow"><?php echo voa_content_copy( 'client-stories', 'case_eyebrow' ); ?></p>
			<h2><?php echo voa_accent( $voa_case['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		</div>
		<p class="lead compact"><?php echo esc_html( $voa_case['intro'] ); ?></p>
	</div>

	<div class="case-study-context">
		<h3><?php echo esc_html( $voa_case['challengesHeading'] ); ?></h3>
		<p><?php echo esc_html( $voa_case['challenges'] ); ?></p>
	</div>

	<div class="case-study-flow">
		<div class="case-study-lane" data-side="challenge">
			<p class="case-study-label">
				<span class="case-study-label-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.8 21 19H3Z"></path><path d="M12 9v4.2"></path><circle cx="12" cy="16.4" r="0.75" fill="currentColor" stroke="none"></circle></svg></span>
				<span><?php echo esc_html( $voa_case['hadIntro'] ); ?></span>
			</p>
			<ul>
				<?php foreach ( $voa_case['had'] as $voa_item ) : ?>
					<li><?php echo esc_html( $voa_item ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div class="case-study-transfer" aria-hidden="true">
			<span class="case-study-transfer-node">
				<svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="10.4" r="4.2"></circle><path d="M6.2 22.6c1.3-4 4.3-6.1 7.8-6.1s6.5 2.1 7.8 6.1"></path><path d="M21.4 6.2 23.9 8.7 21.4 11.2" opacity="0.55"></path><path d="M6.6 6.2 4.1 8.7l2.5 2.5" opacity="0.55"></path></svg>
			</span>
			<svg viewBox="0 0 80 220" preserveAspectRatio="none"><path d="M4 18 C 44 18, 33 70, 40 110 C 47 150, 36 202, 76 202" vector-effect="non-scaling-stroke"></path></svg>
		</div>

		<div class="case-study-lane" data-side="support">
			<p class="case-study-label">
				<span class="case-study-label-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="m8.3 12.2 2.45 2.5 5-5.35"></path></svg></span>
				<span><?php echo esc_html( $voa_case['handlingHeading'] ); ?></span>
			</p>
			<ul>
				<?php foreach ( $voa_case['handling'] as $voa_item ) : ?>
					<li><?php echo esc_html( $voa_item ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>

	<div class="case-study-onboarding">
		<span class="case-study-onboarding-mark" aria-hidden="true"><i></i><i></i><i></i></span>
		<div>
			<h3><?php echo esc_html( $voa_case['onboarding'][0] ); ?></h3>
			<p>
				<?php if ( 2 === count( $voa_timing_parts ) ) : ?>
					<?php echo esc_html( $voa_timing_parts[0] ); ?><strong class="case-study-timing"><?php echo esc_html( $voa_timing_phrase ); ?></strong><?php echo esc_html( $voa_timing_parts[1] ); ?>
				<?php else : ?>
					<?php echo esc_html( $voa_case['onboarding'][1] ); ?>
				<?php endif; ?>
			</p>
		</div>
	</div>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
