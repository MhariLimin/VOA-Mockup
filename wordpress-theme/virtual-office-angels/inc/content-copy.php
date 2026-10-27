<?php
defined( 'ABSPATH' ) || exit;

/** Approved template-local copy and imagery defaults. */
function voa_content_inline_defaults( $entity ) {
	switch ( $entity ) {
		case 'home':
			$copy = voa_content_home_defaults();
			break;
		case 'about':
			$copy = voa_content_about_defaults();
			break;
		case 'thank-you':
			$copy = voa_content_thank_you_defaults();
			break;
		default:
			$copy = voa_content_other_defaults( $entity );
	}
	return array_merge( $copy, voa_content_closing_defaults( $entity ) );
}

function voa_content_home_defaults() {
	return array(
		'hero_heading' => array( 'Hero / Heading', 'Get <em>Specialised</em> &amp; <em>HR Managed</em> Virtual Support!' ),
		'clients_eyebrow' => array( 'Clients / Eyebrow', 'Our clients' ),
		'clients_heading' => array( 'Clients / Heading', 'Trusted by leading <em>Australian businesses</em>.' ),
		'clients_intro' => array( 'Clients / Description', 'Supporting Australian businesses with dependable, carefully matched professionals.' ),
		'services_eyebrow' => array( 'Services / Eyebrow', 'Specialised virtual assistant services' ),
		'services_heading' => array( 'Services / Heading', 'Virtual support tailored around your <em>industry</em>, <em>systems</em> and <em>standards</em>.' ),
		'services_intro' => array( 'Services / Description', 'Our professional virtual assistant services go beyond general administration. We match businesses with professionals who understand the terminology, documentation and workflows common to their field.' ),
		'managed_eyebrow' => array( 'Managed support / Eyebrow', 'More than recruitment' ),
		'managed_heading' => array( 'Managed support / Heading', 'What is an <em>HR Managed Virtual Support</em> Solution?' ),
		'founder_image' => array( 'Founder / Image', '/assets/client/anne-villavieja.jpg', 'image' ),
		'founder_eyebrow' => array( 'Founder / Eyebrow', 'Australian-led, people-first outsourcing company' ),
		'founder_heading' => array( 'Founder / Heading', 'Built on <em>HR expertise</em> and first-hand <em>market experience</em>.' ),
		'founder_intro' => array( 'Founder / Introduction', 'Virtual Office Angels was established by Anne Villavieja, whose two decades of HR experience with Australian companies shape our practical approach to recruitment and long-term virtual support.' ),
		'founder_text' => array( 'Founder / Description', 'Based in Australia and originally from the Philippines, Anne brings together an understanding of the country’s professional talent with the expectations of Australian businesses. That perspective helps Virtual Office Angels build working relationships designed for confidence, continuity, and long-term value.' ),
		'insights_eyebrow' => array( 'Insights / Eyebrow', 'Insights and resources' ),
		'insights_heading' => array( 'Insights / Heading', 'Learn more about <em>delegation</em> and <em>virtual staffing</em>.' ),
		'insights_intro' => array( 'Insights / Description', 'Explore current guidance on building capacity, choosing the right virtual assistant, and getting more value from a remote team.' ),
		'testimonials_image' => array( 'Testimonials / Image', '/assets/client/contact/contact-team-laptop.jpg', 'image' ),
		'testimonials_eyebrow' => array( 'Testimonials / Eyebrow', 'Client feedback' ),
		'testimonials_heading' => array( 'Testimonials / Heading', 'What Australian businesses say about <em>working with Virtual Office Angels</em>.' ),
		'testimonials_intro' => array( 'Testimonials / Description', 'Real feedback on matching, service quality, and the day-to-day value of dependable virtual support.' ),
		'faq_eyebrow' => array( 'FAQs / Eyebrow', 'Frequently asked questions' ),
		'faq_heading' => array( 'FAQs / Heading', 'Before you delegate and <em>get started</em>.' ),
		'faq_intro' => array( 'FAQs / Description', 'Here are direct answers to the questions Australian businesses ask when considering fully managed virtual support.' ),
		'contact_eyebrow' => array( 'Contact / Eyebrow', 'Let’s talk' ),
		'contact_heading' => array( 'Contact / Heading', 'Tell us where your business needs virtual support.' ),
		'contact_intro' => array( 'Contact / Description', 'Share the work that is taking time away from clients, revenue or delivery. We’ll help clarify the remote role and the experience it needs.' ),
	);
}

function voa_content_about_defaults() {
	$fields = array(
		'hero_image' => array( 'Hero / Image', '/assets/source/staging/images/2fab61e54e-2149013955.jpg', 'image' ),
		'story_eyebrow' => array( 'Our story / Eyebrow', 'Our story' ),
		'story_heading' => array( 'Our story / Heading', 'Built on <em>HR expertise</em>.' ),
		'story_intro' => array( 'Our story / Introduction', 'Anne Villavieja founded Virtual Office Angels in 2010. As an HR professional with over 35 years of experience in the Australian and Western markets, she saw an opportunity to build a company focused solely on recruiting and supporting professional virtual assistants for small and medium businesses.' ),
		'story_text' => array( 'Our story / Description', 'Anne understands both the local talent market and Australian business expectations. Her knowledge of Philippine workplaces, education, and culture, combined with her HR experience, continues to shape how our team recruits and supports virtual assistants today.' ),
		'support_eyebrow' => array( 'Who we support / Eyebrow', 'Who we support' ),
		'support_heading' => array( 'Who we support / Heading', 'Different businesses need <em>different expertise</em>.' ),
		'support_intro' => array( 'Who we support / Introduction', 'Some roles need strong administration skills. Others require someone who already understands an industry’s terminology, systems, and day-to-day processes.' ),
		'support_text' => array( 'Who we support / Description', 'That is why Virtual Office Angels works across a range of business functions, including:' ),
		'sites_eyebrow' => array( 'Specialist websites / Eyebrow', 'Also from Virtual Office Angels' ),
		'sites_heading' => array( 'Specialist websites / Heading', 'Our <em>specialist websites</em>.' ),
		'values_eyebrow' => array( 'Values / Eyebrow', 'The way we work' ),
		'values_heading' => array( 'Values / Heading', 'The standards behind <em>our support</em>.' ),
		'values_intro' => array( 'Values / Introduction', 'These values shape how we recruit, communicate, and support our clients.' ),
		'values_text' => array( 'Values / Description', 'We listen before we recruit, look beyond CVs, and stay involved after the virtual assistant begins. The aim is straightforward: a strong match, clear expectations, and a working relationship that delivers long-term value for everyone involved.' ),
		'faq_eyebrow' => array( 'FAQs / Eyebrow', 'About Virtual Office Angels' ),
		'faq_heading' => array( 'FAQs / Heading', 'Frequently <em>asked questions</em>.' ),
		'faq_intro' => array( 'FAQs / Description', 'Common questions about who we are, how we work, and what to expect.' ),
	);
	foreach ( voa_content_about_faq_defaults() as $index => $pair ) {
		$fields[ 'faq_' . $index . '_question' ] = array( 'FAQs / Question ' . ( $index + 1 ), $pair[0] );
		$fields[ 'faq_' . $index . '_answer' ] = array( 'FAQs / Answer ' . ( $index + 1 ), $pair[1] );
	}
	foreach ( voa_content_about_value_defaults() as $index => $pair ) {
		$fields[ 'value_' . $index . '_name' ] = array( 'Values / Name ' . ( $index + 1 ), $pair[0] );
		$fields[ 'value_' . $index . '_text' ] = array( 'Values / Description ' . ( $index + 1 ), $pair[1] );
	}
	return $fields;
}

function voa_content_thank_you_defaults() {
	return array(
		'eyebrow' => array( 'Confirmation / Eyebrow', 'Enquiry received' ),
		'heading' => array( 'Confirmation / Heading', 'Thank you for contacting Virtual Office Angels.' ),
		'description' => array( 'Confirmation / Description', 'Your form has been submitted.' ),
	);
}

function voa_content_other_defaults( $entity ) {
	$copy = array(
		'services' => array(
			'directory_eyebrow' => array( 'Service directory / Eyebrow', 'Choose a service' ),
			'directory_heading' => array( 'Service directory / Heading', 'Start with the workflow that needs <em>experienced support</em>.' ),
			'router_eyebrow' => array( 'Work shortcuts / Eyebrow', 'Start from the work' ),
			'router_heading' => array( 'Work shortcuts / Heading', 'Not sure which service <em>fits the work</em>?' ),
		),
		'insights' => array(
			'library_eyebrow' => array( 'Article library / Eyebrow', 'Article library' ),
		),
		'how-it-works' => array(
			'match_client' => array( 'Match illustration / Client label', 'Client brief' ),
			'match_client_role' => array( 'Match illustration / Client example', 'Mortgage operations' ),
			'match_client_tasks' => array( 'Match illustration / Client tasks', 'Applications · CRM · follow-up' ),
			'match_specialist' => array( 'Match illustration / Specialist label', 'Specialist match' ),
			'match_specialist_role' => array( 'Match illustration / Specialist example', 'Experienced lending support' ),
			'match_specialist_text' => array( 'Match illustration / Specialist description', 'Screened for role and workflow fit' ),
		),
		'managed-virtual-support' => array(
			'definition_eyebrow' => array( 'Definition / Eyebrow', 'More than recruitment' ),
			'definition_heading' => array( 'Definition / Heading', 'What is an <em>HR-managed virtual support</em> solution?' ),
			'ownership_eyebrow' => array( 'Ownership / Eyebrow', 'Shared responsibilities' ),
			'ownership_heading' => array( 'Ownership / Heading', '<em>Clear ownership</em> keeps the role effective.' ),
			'faq_eyebrow' => array( 'FAQs / Eyebrow', 'HR-managed virtual support FAQs' ),
			'faq_heading' => array( 'FAQs / Heading', 'What to know <em>before hiring</em>.' ),
		),
		'client-stories' => array(
			'testimonials_eyebrow' => array( 'Testimonials / Eyebrow', 'Client testimonials' ),
			'testimonials_heading' => array( 'Testimonials / Heading', 'In their words.' ),
			'testimonials_intro' => array( 'Testimonials / Description', 'Whether they are in accounting, legal, real estate, or finance, the tailored approach is intended to provide the right support every time.' ),
			'case_eyebrow' => array( 'Case study / Eyebrow', 'Client case study' ),
		),
		'videos' => array(
			'library_eyebrow' => array( 'Video library / Eyebrow', 'Video library' ),
			'video_1' => array( 'Video library / Title 1', 'Choosing the right virtual assistant' ),
			'video_2' => array( 'Video library / Title 2', 'Preparing your business to delegate' ),
			'video_3' => array( 'Video library / Title 3', 'Building a strong remote working rhythm' ),
			'video_description' => array( 'Video library / Placeholder description', 'Reserved for an existing, client-approved video with captions and a written transcript.' ),
		),
		'faqs' => array(
			'closing_intro' => array( 'Closing / Introduction', 'We trust these answers provide useful information about hiring a virtual worker and what to consider when getting started.' ),
			// Not "closing_text": that key belongs to the contact section below, whose copy would replace this.
			'closing_note' => array( 'Closing / Description', 'If you need any other clarification, call Virtual Office Angels or email' ),
		),
	);
	return isset( $copy[ $entity ] ) ? $copy[ $entity ] : array();
}

function voa_content_about_faq_defaults() {
	return array(
	array( 'What does Virtual Office Angels do?', 'Virtual Office Angels provides specialised virtual assistant services for Australian businesses. We support role planning, recruitment, onboarding, employment administration, payroll, HR, and ongoing client care.' ),
	array( 'Is Virtual Office Angels Australian-owned?', 'Virtual Office Angels is Australian-led and managed. Businesses have a local point of contact, while their virtual assistants work remotely from the Philippines.' ),
	array( 'Who founded Virtual Office Angels?', 'Anne Villavieja founded Virtual Office Angels. She brings two decades of human resources experience with Australian companies and first-hand knowledge of the professional talent market in the Philippines.' ),
	array( 'How are virtual assistants selected?', 'Candidates are assessed against the responsibilities, systems, industry knowledge, working hours, and communication requirements attached to the role. Clients review a relevant shortlist before making their decision.' ),
	array( 'What services can a virtual assistant provide?', 'Virtual assistants can support mortgage processing, financial planning administration, accounting, real estate, back-office administration, marketing, sales, e-commerce, technology, and copywriting. View our virtual assistant services for more information.' ),
	array( 'What happens after a virtual assistant starts?', 'The client manages daily work and business priorities. Virtual Office Angels remains available for payroll, HR, client care, and virtual assistant performance support.' ),
);
}

function voa_content_about_value_defaults() {
	return array(
	array( 'Clarity', 'Good work depends on clear expectations. We define responsibilities, communication channels, approval points, and measures of success so everyone understands how the role should work.' ),
	array( 'Accountability', 'We take ownership of the support we provide. When an issue arises, we address it directly, agree on the next steps, and follow through on what was discussed.' ),
	array( 'Consistency', 'Reliable support requires steady communication and dependable processes. We keep recruitment, onboarding, HR, and client care organised throughout the working relationship.' ),
	array( 'Client Care', 'Our involvement continues after recruitment. We check in, listen to feedback, and support adjustments when responsibilities, systems, or business priorities change.' ),
);
}

/** Resolved About-page rows without exposing their layout to editors. */
function voa_content_about_pairs( $kind ) {
	$source = 'faq' === $kind ? voa_content_about_faq_defaults() : voa_content_about_value_defaults();
	$rows = array();
	foreach ( $source as $index => $pair ) {
		$rows[] = 'faq' === $kind
			? array( voa_content_plain( 'about', 'faq_' . $index . '_question' ), voa_content_plain( 'about', 'faq_' . $index . '_answer' ) )
			: array( voa_content_plain( 'about', 'value_' . $index . '_name' ), voa_content_plain( 'about', 'value_' . $index . '_text' ) );
	}
	return $rows;
}

/** Page-specific closing contact copy, while the section structure stays fixed. */
function voa_content_closing_defaults( $entity ) {
	if ( in_array( $entity, array( 'home', 'contact', 'thank-you' ), true ) ) {
		return array();
	}
	if ( 0 === strpos( $entity, 'service:' ) ) {
		return array( 'closing_eyebrow' => array( 'Contact section / Eyebrow', 'Find the right specialised virtual assistant for your business' ) );
	}
	if ( 0 === strpos( $entity, 'location:' ) ) {
		$locations = voa_data_raw( 'locations' );
		$city      = substr( $entity, strlen( 'location:' ) );
		$name      = isset( $locations[ $city ]['name'] ) ? $locations[ $city ]['name'] : '';
		return array(
			'closing_eyebrow' => array( 'Contact section / Eyebrow', 'Let’s talk' ),
			'closing_heading' => array( 'Contact section / Heading', 'Looking for virtual support in ' . $name . '?' ),
		);
	}
	if ( 'about' === $entity ) {
		$copy = array( 'Let’s talk', 'Looking for the right virtual support?', 'Share the work that is taking time away from clients, revenue, or delivery. We’ll help clarify the virtual support role and the experience it requires.' );
	} elseif ( 'managed-virtual-support' === $entity ) {
		$copy = array( 'Let’s talk', 'Tell us what support your business needs.', 'Share the responsibilities, systems, and experience the role requires. We’ll help clarify the position and explain how our HR-managed virtual support works.' );
	} else {
		$copy = array( 'Your next step', 'Tell us what the right support would change for your business.', 'Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.' );
	}
	return array(
		'closing_eyebrow' => array( 'Contact section / Eyebrow', $copy[0] ),
		'closing_heading' => array( 'Contact section / Heading', $copy[1] ),
		'closing_text' => array( 'Contact section / Description', $copy[2] ),
	);
}
