<?php
/**
 * Search results. The React build has no search; this reuses the Insights card and grid.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section inner-hero compact-inner-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow">Search</p>
			<h1>Results for “<?php echo esc_html( get_search_query() ); ?>”</h1>
		</div>
	</div>
</section>

<section class="section library-section"><div class="container">
	<?php if ( have_posts() ) : ?>
		<div class="article-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/layout/article-card', null, array( 'post' => get_post() ) );
			endwhile;
			?>
		</div>
		<?php
		the_posts_pagination(
			array(
				'prev_text' => voa_get_icon( 'arrow-left' ) . ' Previous',
				'next_text' => 'Next ' . voa_get_icon( 'arrow-right' ),
			)
		);
		?>
	<?php else : ?>
		<p class="lead">No articles matched that search.</p>
	<?php endif; ?>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
