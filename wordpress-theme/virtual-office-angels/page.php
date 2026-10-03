<?php
/**
 * Generic page.
 *
 * The fallback for any page without its own template. Content is core blocks, so it renders through
 * the_content() and the block styles do the rest.
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
				<?php if ( has_excerpt() ) : ?>
					<p class="lead"><?php echo esc_html( get_the_excerpt() ); ?></p>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container narrow">
			<?php the_content(); ?>
		</div>
	</section>

	<?php
endwhile;

if ( voa_show_closing_section() ) {
	get_template_part( 'template-parts/sections/contact', null, array() );
}

get_footer();
