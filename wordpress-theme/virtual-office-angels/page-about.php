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

$voa_faqs = array(
	array( 'What does Virtual Office Angels do?', 'Virtual Office Angels provides specialised virtual assistant services for Australian businesses. We support role planning, recruitment, onboarding, employment administration, payroll, HR, and ongoing client care.' ),
	array( 'Is Virtual Office Angels Australian-owned?', 'Virtual Office Angels is Australian-led and managed. Businesses have a local point of contact, while their virtual assistants work remotely from the Philippines.' ),
	array( 'Who founded Virtual Office Angels?', 'Anne Villavieja founded Virtual Office Angels. She brings two decades of human resources experience with Australian companies and first-hand knowledge of the professional talent market in the Philippines.' ),
	array( 'How are virtual assistants selected?', 'Candidates are assessed against the responsibilities, systems, industry knowledge, working hours, and communication requirements attached to the role. Clients review a relevant shortlist before making their decision.' ),
	array( 'What services can a virtual assistant provide?', 'Virtual assistants can support mortgage processing, financial planning administration, accounting, real estate, back-office administration, marketing, sales, e-commerce, technology, and copywriting. View our virtual assistant services for more information.' ),
	array( 'What happens after a virtual assistant starts?', 'The client manages daily work and business priorities. Virtual Office Angels remains available for payroll, HR, client care, and virtual assistant performance support.' ),
);

$voa_values = array(
	array( 'Clarity', 'Good work depends on clear expectations. We define responsibilities, communication channels, approval points, and measures of success so everyone understands how the role should work.' ),
	array( 'Accountability', 'We take ownership of the support we provide. When an issue arises, we address it directly, agree on the next steps, and follow through on what was discussed.' ),
	array( 'Consistency', 'Reliable support requires steady communication and dependable processes. We keep recruitment, onboarding, HR, and client care organised throughout the working relationship.' ),
	array( 'Client Care', 'Our involvement continues after recruitment. We check in, listen to feedback, and support adjustments when responsibilities, systems, or business priorities change.' ),
);

get_header();
?>

<section class="section inner-hero"><div class="container inner-hero-grid"><div><p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p><h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1><p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p><div class="button-row"><a class="button" href="<?php echo esc_url( voa_url( '/services' ) ); ?>">View Our Services</a><a class="button button-secondary" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Get in Touch</a></div></div><img class="inner-hero-image" src="<?php echo esc_url( voa_media_url( '/assets/source/staging/images/2fab61e54e-2149013955.jpg' ) ); ?>" alt="A modern remote workspace"></div></section>

<section class="section about-story" id="story">
	<div class="container about-story-grid">
		<div class="about-story-copy">
			<p class="eyebrow">Our story</p>
			<h2>Built on <em>HR expertise</em>.</h2>
			<p class="lead compact">Anne Villavieja founded Virtual Office Angels in 2010. As an HR professional with over 35 years of experience in the Australian and Western markets, she saw an opportunity to build a company focused solely on recruiting and supporting professional virtual assistants for small and medium businesses.</p>
			<p class="lead compact">Anne understands both the local talent market and Australian business expectations. Her knowledge of Philippine workplaces, education, and culture, combined with her HR experience, continues to shape how our team recruits and supports virtual assistants today.</p>
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
			<p class="eyebrow">Who we support</p>
			<h2>Different businesses need <em>different expertise</em>.</h2>
			<p class="lead compact">Some roles need strong administration skills. Others require someone who already understands an industry's terminology, systems, and day-to-day processes.</p>
			<p class="lead compact">That is why Virtual Office Angels works across a range of business functions, including:</p>
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
		<div class="section-heading"><div><p class="eyebrow">Also from Virtual Office Angels</p><h2>Our <em>specialist websites</em>.</h2></div></div>
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
				<p class="eyebrow">The way we work</p>
				<h2>The standards behind <em>our support</em>.</h2>
				<p class="lead compact">These values shape how we recruit, communicate, and support our clients.</p>
				<p class="lead compact">We listen before we recruit, look beyond CVs, and stay involved after the virtual assistant begins. The aim is straightforward: a strong match, clear expectations, and a working relationship that delivers long-term value for everyone involved.</p>
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
			<p class="eyebrow">About Virtual Office Angels</p>
			<h2>Frequently <em>asked questions</em>.</h2>
			<p class="lead compact">Common questions about who we are, how we work, and what to expect.</p>
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
