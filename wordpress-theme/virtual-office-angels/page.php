<?php
/**
 * Any page without its own template — a privacy policy, terms, or a page added later.
 *
 * The design pages each have a page-{slug}.php. This one renders an ordinary editor page in the
 * design's type and spacing: a compact heading, then the page's block content.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="section inner-hero compact-inner-hero">
		<div class="container inner-hero-grid">
			<div>
				<h1><?php the_title(); ?></h1>
			</div>
		</div>
	</section>

	<section class="section blog-content-section">
		<div class="container narrow article-content"><?php the_content(); ?></div>
	</section>
	<?php
endwhile;

get_footer();
