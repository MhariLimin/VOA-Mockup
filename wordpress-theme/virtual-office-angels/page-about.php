<?php
/**
 * /about — AboutPage in SourcePage.tsx.
 *
 * Our Story and Founder & Leadership stay distinct narratives; neither repeats the home page's founder
 * section. The copy below is the React build's, from the client's About Us content document.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief = voa_page( '/about' );
$voa_site  = voa_data( 'site' );

$voa_faqs = voa_content_about_pairs( 'faq' );
$voa_values = voa_content_about_pairs( 'value' );

get_header();
?>

<section class="section inner-hero"><div class="container inner-hero-grid"><div><p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p><h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1><p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p><div class="button-row"><a class="button" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">View Our Services</a><a class="button button-secondary" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Get in Touch</a></div></div><img class="inner-hero-image" src="<?php echo esc_url( voa_media_url( voa_content_image( 'about', 'hero_image' ) ) ); ?>" alt="A modern remote workspace"></div></section>

<section class="section about-story" id="story">
	<div class="container about-story-grid">
		<div class="about-story-copy">
			<p class="eyebrow"><?php echo voa_content_copy( 'about', 'story_eyebrow' ); ?></p>
			<h2><?php echo voa_content_copy( 'about', 'story_heading' ); ?></h2>
			<p class="lead compact"><?php echo voa_content_copy( 'about', 'story_intro' ); ?></p>
			<p class="lead compact"><?php echo voa_content_copy( 'about', 'story_text' ); ?></p>
			<ul class="about-facts"><li>Founded in 2010</li><li>Australian-led and managed</li></ul>
		</div>
		<figure class="about-founder">
			<img src="<?php echo esc_url( voa_media_url( $voa_brief['image'] ) ); ?>" alt="<?php echo esc_attr( $voa_brief['imageAlt'] ); ?>" loading="lazy">
		</figure>
	</div>
</section>

<section class="section muted-section about-support">
	<div class="container content-split">
		<div>
			<p class="eyebrow"><?php echo voa_content_copy( 'about', 'support_eyebrow' ); ?></p>
			<h2><?php echo voa_content_copy( 'about', 'support_heading' ); ?></h2>
			<p class="lead compact"><?php echo voa_content_copy( 'about', 'support_intro' ); ?></p>
			<p class="lead compact"><?php echo voa_content_copy( 'about', 'support_text' ); ?></p>
			<a class="button button-secondary" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">View our services</a>
		</div>
		<ul class="check-list">
			<li>Mortgage and loans processing</li>
			<li>Financial planning administration</li>
			<li>Accounting and bookkeeping</li>
			<li>Real estate and administration</li>
			<li>Back-office support</li>
			<li>Digital marketing</li>
			<li>Sales and e-commerce</li>
			<li>Creative and business support</li>
		</ul>
	</div>
</section>

<section class="section about-sites">
	<div class="container">
		<div class="section-heading"><div><p class="eyebrow"><?php echo voa_content_copy( 'about', 'sites_eyebrow' ); ?></p><h2><?php echo voa_content_copy( 'about', 'sites_heading' ); ?></h2></div></div>
		<div class="brand-grid">
			<?php foreach ( $voa_site['sisterSites'] as $voa_sister ) : ?>
				<a class="brand-card" href="<?php echo esc_url( $voa_sister['url'] ); ?>" target="_blank" rel="noopener noreferrer">
					<span class="brand-logo"><img src="<?php echo esc_url( voa_media_url( $voa_sister['logo'] ) ); ?>" alt="" loading="lazy"></span>
					<h3><?php echo esc_html( $voa_sister['name'] ); ?> <?php voa_icon( 'arrow-up-right', 'brand-arrow' ); ?></h3>
					<p><?php echo esc_html( $voa_sister['description'] ); ?></p>
					<span class="brand-domain"><?php echo esc_html( $voa_sister['domain'] ); ?><span class="sr-only"> (opens in a new tab)</span></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section dark-section">
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow"><?php echo voa_content_copy( 'about', 'values_eyebrow' ); ?></p>
				<h2><?php echo voa_content_copy( 'about', 'values_heading' ); ?></h2>
				<p class="lead compact"><?php echo voa_content_copy( 'about', 'values_intro' ); ?></p>
				<p class="lead compact"><?php echo voa_content_copy( 'about', 'values_text' ); ?></p>
			</div>
		</div>
		<div class="values-grid">
			<?php foreach ( $voa_values as $voa_index => $voa_value ) : ?>
				<article><span class="value-icon" aria-hidden="true"><?php echo voa_value_icon( $voa_index ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span><h3><?php echo esc_html( $voa_value[0] ); ?></h3><p><?php echo esc_html( $voa_value[1] ); ?></p></article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section">
	<div class="container faq-page-grid">
		<aside>
			<p class="eyebrow"><?php echo voa_content_copy( 'about', 'faq_eyebrow' ); ?></p>
			<h2><?php echo voa_content_copy( 'about', 'faq_heading' ); ?></h2>
			<p class="lead compact"><?php echo voa_content_copy( 'about', 'faq_intro' ); ?></p>
		</aside>
		<?php get_template_part( 'template-parts/layout/accordion', null, array( 'items' => $voa_faqs, 'id_prefix' => 'about-faq' ) ); ?>
	</div>
</section>

<?php
get_template_part(
	'template-parts/layout/closing',
	null,
	array(
		'next_step' => array(
			'eyebrow' => 'Let’s talk',
			'heading' => 'Looking for the right virtual support?',
			'text'    => 'Share the work that is taking time away from clients, revenue, or delivery. We’ll help clarify the virtual support role and the experience it requires.',
		),
	)
);

get_footer();
