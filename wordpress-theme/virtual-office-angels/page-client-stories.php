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
	<div class="section-heading"><div><p class="eyebrow">Client testimonials</p><h2>In their words.</h2><p class="lead compact">Whether they are in accounting, legal, real estate, or finance, the tailored approach is intended to provide the right support every time.</p></div></div>
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

<?php $voa_case = voa_data( 'caseStudy' ); ?>
<section class="section case-study" id="case-study"><div class="container content-split">
	<div>
		<p class="eyebrow">Client case study</p>
		<h2><?php echo voa_accent( $voa_case['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		<p class="lead compact"><?php echo esc_html( $voa_case['intro'] ); ?></p>
		<h3><?php echo esc_html( $voa_case['challengesHeading'] ); ?></h3>
		<p><?php echo esc_html( $voa_case['challenges'] ); ?></p>
		<p><?php echo esc_html( $voa_case['hadIntro'] ); ?></p>
		<ul class="case-study-list">
			<?php foreach ( $voa_case['had'] as $voa_item ) : ?>
				<li><?php echo esc_html( $voa_item ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
	<div>
		<div class="task-panel">
			<h3><?php echo esc_html( $voa_case['handlingHeading'] ); ?></h3>
			<ul class="check-list">
				<?php foreach ( $voa_case['handling'] as $voa_item ) : ?>
					<li><?php echo esc_html( $voa_item ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
		<div class="faq-closing case-study-onboarding">
			<?php foreach ( $voa_case['onboarding'] as $voa_text ) : ?>
				<p><?php echo esc_html( $voa_text ); ?></p>
			<?php endforeach; ?>
		</div>
	</div>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
