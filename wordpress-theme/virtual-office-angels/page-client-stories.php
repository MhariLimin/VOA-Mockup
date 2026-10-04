<?php
/**
 * /client-stories — StoriesPage in SourcePage.tsx: the client carousel, then every testimonial in full.
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

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
