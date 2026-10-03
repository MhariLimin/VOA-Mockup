<?php
/**
 * Home page.
 *
 * The approved Layout 1 composition, in the order the client signed off. Each section is a template
 * part; the content inside them comes from real post types, a handful of Customizer fields, and
 * translatable strings in the templates.
 *
 * This page is deliberately NOT block-editable. It is a fixed composition approved section by
 * section, and several of its parts cannot be expressed as blocks at all — a hero with a cross-fading
 * backdrop, a four-stage diagram whose markers sit on a drawn curve, a one-second logo carousel.
 * Making it editable would invite the layout to be taken apart by accident. See
 * docs/WORDPRESS_ARCHITECTURE.md section 1.
 *
 * Section order, from the approved build:
 *   1. Hero
 *   2. Client logo carousel          — directly after the hero, decided deliberately
 *   3. Six service cards
 *   4. "More than recruitment" dark section with the four-stage journey
 *   5. Founder
 *   6. Insights and resources
 *   7. Client feedback
 *   8. FAQs
 *   9. Let's talk
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();

get_template_part( 'template-parts/sections/hero' );
get_template_part( 'template-parts/sections/client-proof' );
get_template_part( 'template-parts/sections/services' );
get_template_part( 'template-parts/sections/journey' );
get_template_part( 'template-parts/sections/founder' );
get_template_part( 'template-parts/sections/insights' );
get_template_part( 'template-parts/sections/testimonials' );
get_template_part( 'template-parts/sections/faq' );

get_template_part(
	'template-parts/sections/contact',
	null,
	array(
		'eyebrow' => __( 'Let’s talk', 'voa' ),
		'heading' => __( 'Tell us where your business needs virtual support.', 'voa' ),
		'text'    => __( 'Share the work that is taking time away from clients, revenue or delivery. We’ll help clarify the remote role and the experience it needs.', 'voa' ),
	)
);

get_footer();
