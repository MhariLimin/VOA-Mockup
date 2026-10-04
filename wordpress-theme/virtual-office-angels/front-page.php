<?php
/**
 * Home page — HomePage.tsx, section for section.
 *
 * A fixed composition, not block content. The home page was approved section by section, and several
 * of its parts cannot be blocks at all — a hero with a cross-fading backdrop, a four-stage diagram
 * whose markers sit on a drawn curve, a one-second logo carousel. See
 * docs/wordpress-integration/reference/WORDPRESS_ARCHITECTURE.md section 1.
 *
 * Copy comes from data/home.json and data/site.json; the strings written here are the ones HomePage.tsx
 * writes inline. Articles are the site's real posts.
 *
 * Behaviour: backdrop-rotator.js (hero and closing backdrops, hero dots), client-carousel.js,
 * interactions.js (service-card backdrop, article rail, one-open FAQ), journey.js (stage diagram).
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/* The React rail lists every article it carries, which is 30. The live site has around a hundred, so
   the rail takes the 30 newest rather than growing threefold. */
const VOA_HOME_RAIL_ARTICLES = 30;

/* Points on the quadratic curve the journey line draws, as percentages of its box. Measured, not
   eyeballed: recompute against the path if the curve ever changes. */
const VOA_JOURNEY_POINTS = array(
	array( '10%', '62.1%' ),
	array( '36%', '38.86%' ),
	array( '62%', '30.48%' ),
	array( '86%', '35.96%' ),
);

$voa_site    = voa_data( 'site' );
$voa_home    = voa_data( 'home' );
$voa_journey = $voa_home['moreThanRecruitment'];
$voa_quotes  = voa_data( 'testimonials' );

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
			<p class="eyebrow"><?php echo esc_html( $voa_site['hero']['eyebrow'] ); ?></p>
			<h1>Get <em>Specialised</em> &amp; <em>HR Managed</em> Virtual Support!</h1>
			<p class="lead"><?php echo esc_html( $voa_site['hero']['description'] ); ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Find the Right Fit</a>
				<a class="button button-secondary" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">Explore services</a>
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

<section class="section home-client-proof" data-home-reveal="clients">
	<div class="container home-client-layout">
		<header>
			<p class="eyebrow">Our clients</p>
			<h2>Trusted by leading <em>Australian businesses</em>.</h2>
			<p>Supporting Australian businesses with dependable, carefully matched professionals.</p>
		</header>
		<?php get_template_part( 'template-parts/layout/client-carousel' ); ?>
	</div>
</section>

<section class="section services-section has-section-backdrop" data-home-reveal="grid">
	<div class="services-wash" aria-hidden="true">
		<?php foreach ( $voa_home['specialistServices'] as $voa_service ) : ?>
			<span data-active="false" style="background-image:url(<?php echo esc_url( voa_media_url( $voa_service['image'] ) ); ?>)"></span>
		<?php endforeach; ?>
	</div>
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Specialised virtual assistant services</p>
				<h2>Virtual support tailored around your <em>industry</em>, <em>systems</em> and <em>standards</em>.</h2>
				<p class="lead compact">Our professional virtual assistant services go beyond general administration. We match businesses with professionals who understand the terminology, documentation and workflows common to their field.</p>
			</div>
			<a class="button button-secondary" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">Explore services</a>
		</div>
		<div class="service-grid">
			<?php foreach ( $voa_home['specialistServices'] as $voa_index => $voa_service ) : ?>
				<a class="service-card service-card-<?php echo (int) $voa_index + 1; ?>" href="<?php echo esc_url( voa_url( $voa_service['href'] ) ); ?>">
					<div class="service-card-top">
						<span class="card-index"><?php echo esc_html( voa_index( $voa_index + 1 ) ); ?></span>
						<span class="service-card-image"><img src="<?php echo esc_url( voa_media_url( $voa_service['image'] ) ); ?>" alt="" loading="lazy"></span>
					</div>
					<div class="service-card-copy">
						<h3><?php echo esc_html( $voa_service['title'] ); ?></h3>
						<p><?php echo esc_html( $voa_service['text'] ); ?></p>
						<p class="service-systems">
							<strong>Systems:</strong>
							<?php
							$voa_last = count( $voa_service['systems'] ) - 1;
							foreach ( $voa_service['systems'] as $voa_system_index => $voa_system ) {
								echo '<span class="system-name">' . esc_html( $voa_system ) . '</span>' . ( $voa_system_index < $voa_last ? ', ' : '.' );
							}
							?>
						</p>
					</div>
					<?php voa_icon( 'arrow-up-right', 'card-arrow' ); ?>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section dark-section home-managed" data-home-reveal="dark">
	<div class="container">
		<div class="managed-copy">
			<p class="eyebrow">More than recruitment</p>
			<h2>What is an <em>HR Managed Virtual Support</em> Solution?</h2>
			<p class="lead"><?php echo esc_html( $voa_journey['intro'] ); ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/how-it-works' ) ); ?>">See how it works</a>
				<a class="button button-secondary" href="<?php echo esc_url( voa_url( '/why-voa' ) ); ?>">Explore managed virtual support</a>
			</div>
		</div>
		<?php
		/*
		 * The four stages as milestones on a drawn path. The line fades off the right edge rather than
		 * stopping at the last stage, because ongoing support has no end. Curve and markers share one
		 * box, so the marker percentages and the viewBox map to the same rectangle.
		 *
		 * journey.js swaps the detail panel's heading and text from the data-voa-* attributes.
		 */
		?>
		<div class="journey">
			<div class="journey-plot">
				<svg class="journey-line" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
					<defs>
						<linearGradient id="journey-stroke" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0" stop-color="#73c9ff" stop-opacity="0.12"/>
							<stop offset="0.1" stop-color="#73c9ff" stop-opacity="0.85"/>
							<stop offset="0.62" stop-color="#8fb8e6" stop-opacity="0.85"/>
							<stop offset="0.86" stop-color="#ee7d16" stop-opacity="0.9"/>
							<stop offset="1" stop-color="#ee7d16" stop-opacity="0"/>
						</linearGradient>
					</defs>
					<path d="M0,150 Q500,10 1000,90" fill="none" stroke="url(#journey-stroke)" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
				</svg>
				<ol>
					<?php foreach ( $voa_journey['stages'] as $voa_index => $voa_stage ) : ?>
						<li data-open="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" data-place="<?php echo 0 === $voa_index % 2 ? 'below' : 'above'; ?>" style="left:<?php echo esc_attr( VOA_JOURNEY_POINTS[ $voa_index ][0] ); ?>;top:<?php echo esc_attr( VOA_JOURNEY_POINTS[ $voa_index ][1] ); ?>">
							<button type="button" aria-expanded="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" aria-controls="stage-flow-detail" data-voa-heading="<?php echo esc_attr( $voa_stage['heading'] ); ?>" data-voa-text="<?php echo esc_attr( $voa_stage['text'] ); ?>">
								<span class="journey-marker" aria-hidden="true">
									<i class="journey-diamond"></i>
									<span class="journey-icon"><?php echo voa_stage_glyph( $voa_index ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span>
								</span>
								<span class="journey-label">
									<span class="journey-step"><?php echo esc_html( voa_index( $voa_index + 1 ) ); ?></span>
									<span class="journey-name"><?php echo esc_html( $voa_stage['name'] ); ?></span>
								</span>
							</button>
						</li>
					<?php endforeach; ?>
				</ol>
			</div>

			<div class="stage-detail" id="stage-flow-detail" data-stage="01">
				<h3><?php echo esc_html( $voa_journey['stages'][0]['heading'] ); ?></h3>
				<p><?php echo esc_html( $voa_journey['stages'][0]['text'] ); ?></p>
			</div>
		</div>
	</div>
</section>

<section class="section home-founder-section" data-home-reveal="split">
	<div class="container split-grid story-grid">
		<div class="source-image founder-home-image"><img src="<?php echo esc_url( voa_media_url( '/assets/client/anne-villavieja.jpg' ) ); ?>" alt="Anne Villavieja, founder of Virtual Office Angels" loading="lazy"></div>
		<div>
			<p class="eyebrow">Australian-led, people-first outsourcing company</p>
			<h2>Built on <em>HR expertise</em> and first-hand <em>market experience</em>.</h2>
			<p class="lead">Virtual Office Angels was established by Anne Villavieja, whose two decades of HR experience with Australian companies shape our practical approach to recruitment and long-term virtual support.</p>
			<p>Based in Australia and originally from the Philippines, Anne brings together an understanding of the country’s professional talent with the expectations of Australian businesses. That perspective helps Virtual Office Angels build working relationships designed for confidence, continuity, and long-term value.</p>
			<a class="text-link" href="<?php echo esc_url( voa_url( '/about' ) ); ?>">Learn more about us <?php voa_icon( 'arrow-right' ); ?></a>
		</div>
	</div>
</section>

<section class="section insight-section" data-home-reveal="compact">
	<div class="container">
		<div class="section-heading"><div><p class="eyebrow">Insights and resources</p><h2>Learn more about <em>delegation</em> and <em>virtual staffing</em>.</h2><p class="lead compact">Explore current guidance on building capacity, choosing the right virtual assistant, and getting more value from a remote team.</p></div><a class="button button-secondary" href="<?php echo esc_url( voa_url( '/insights' ) ); ?>">Browse articles</a></div>
		<div class="article-rail" tabindex="0" role="group" aria-label="Latest articles">
			<?php foreach ( voa_articles( VOA_HOME_RAIL_ARTICLES ) as $voa_article ) : ?>
				<a class="home-article-card" href="<?php echo esc_url( get_permalink( $voa_article ) ); ?>"><span class="home-article-image"><?php voa_article_image_tag( $voa_article ); ?></span><small><?php echo esc_html( voa_article_date( $voa_article ) ); ?> · <?php echo esc_html( voa_article_category( $voa_article ) ); ?></small><h3><?php echo esc_html( get_the_title( $voa_article ) ); ?></h3><span class="text-link">Read article <?php voa_icon( 'arrow-right' ); ?></span></a>
			<?php endforeach; ?>
		</div>
		<div class="rail-controls">
			<button type="button" aria-label="Scroll to earlier articles"><?php voa_icon( 'arrow-left' ); ?></button>
			<button type="button" aria-label="Scroll to more articles"><?php voa_icon( 'arrow-right' ); ?></button>
		</div>
	</div>
</section>

<section class="section home-testimonial-section" data-home-reveal="media">
	<div class="container split-grid story-grid home-testimonial-intro">
		<div class="source-image">
			<img src="<?php echo esc_url( voa_media_url( '/assets/client/contact/contact-team-laptop.jpg' ) ); ?>" alt="A group of business people talking around a laptop" loading="lazy">
		</div>
		<div>
			<p class="eyebrow">Client feedback</p>
			<h2>What Australian businesses say about <em>working with Virtual Office Angels</em>.</h2>
			<p class="lead">Real feedback on matching, service quality, and the day-to-day value of dependable virtual support.</p>
			<a class="text-link" href="<?php echo esc_url( voa_url( '/client-stories' ) ); ?>">Read all testimonials <?php voa_icon( 'arrow-right' ); ?></a>
		</div>
	</div>
	<div class="container"><div class="home-testimonial-grid">
		<?php foreach ( array_slice( $voa_quotes, 0, 3 ) as $voa_quote ) : ?>
			<figure><blockquote><?php echo esc_html( rtrim( mb_substr( $voa_quote['quote'], 0, 145 ) ) . '...' ); ?></blockquote><figcaption><span class="testimonial-avatar" aria-hidden="true"><?php echo esc_html( $voa_quote['initials'] ); ?></span><span><strong><?php echo esc_html( $voa_quote['name'] ); ?></strong><small><?php echo esc_html( $voa_quote['role'] ); ?></small></span></figcaption></figure>
		<?php endforeach; ?>
	</div></div>
</section>

<section class="section faq-section" data-home-reveal="faq">
	<div class="container faq-grid">
		<div>
			<p class="eyebrow">Frequently asked questions</p>
			<h2>Before you delegate and <em>get started</em>.</h2>
			<p class="lead compact">Here are direct answers to the questions Australian businesses ask when considering fully managed virtual support.</p>
		</div>
		<div class="faq-list">
			<?php foreach ( $voa_home['buyerQuestions'] as $voa_faq ) : ?>
				<details>
					<summary><?php echo esc_html( $voa_faq['question'] ); ?><?php voa_icon( 'plus' ); ?></summary>
					<p><?php echo esc_html( $voa_faq['answer'] ); ?><?php if ( ! empty( $voa_faq['link'] ) ) : ?> <a href="<?php echo esc_url( voa_url( $voa_faq['link']['href'] ) ); ?>"><?php echo esc_html( $voa_faq['link']['label'] ); ?></a>.<?php endif; ?></p>
				</details>
			<?php endforeach; ?>
			<a class="text-link" href="<?php echo esc_url( voa_url( '/faqs' ) ); ?>">View all FAQs <?php voa_icon( 'arrow-right' ); ?></a>
		</div>
	</div>
</section>

<section class="section contact-section page-contact-section has-section-backdrop" data-home-reveal="contact"><?php get_template_part( 'template-parts/layout/section-backdrop' ); ?><div class="container contact-grid"><aside><p class="eyebrow">Let’s talk</p><h2>Tell us where your business needs virtual support.</h2><p class="lead compact">Share the work that is taking time away from clients, revenue or delivery. We’ll help clarify the remote role and the experience it needs.</p><p class="contact-direct"><a href="tel:1300737883"><?php voa_icon( 'phone' ); ?>1 300 737 883</a><a href="mailto:clientcare@virtualofficeangels.com.au"><?php voa_icon( 'mail' ); ?>clientcare@virtualofficeangels.com.au</a></p></aside><?php get_template_part( 'template-parts/layout/contact-form' ); ?></div></section>

<?php
get_footer();
