<?php
/**
 * Search results.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section inner-hero compact-inner-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Search', 'voa' ); ?></p>
			<h1>
				<?php
				printf(
					/* translators: %s: search term. */
					esc_html__( 'Results for “%s”', 'voa' ),
					esc_html( get_search_query() )
				);
				?>
			</h1>
			<p class="lead">
				<?php
				$voa_total = (int) $GLOBALS['wp_query']->found_posts;
				printf(
					/* translators: %s: number of results. */
					esc_html( _n( '%s result', '%s results', $voa_total, 'voa' ) ),
					esc_html( number_format_i18n( $voa_total ) )
				);
				?>
			</p>
		</div>
	</div>
</section>

<section class="section library-section">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="article-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/cards/article-card' );
				endwhile;
				?>
			</div>

			<?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?>
		<?php else : ?>
			<p class="lead"><?php esc_html_e( 'Nothing matched that search. Try a different term, or use the navigation.', 'voa' ); ?></p>
			<?php get_search_form(); ?>
		<?php endif; ?>
	</div>
</section>

<?php
get_template_part( 'template-parts/sections/contact', null, array() );
get_footer();
