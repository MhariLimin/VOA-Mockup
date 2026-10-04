<?php
/**
 * Category, tag, author and date archives.
 *
 * The React build has no archive pages — it filters in place on /insights — so this uses the Insights
 * card and grid under a compact heading. WordPress pagination links stand in for the in-place buttons.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section inner-hero compact-inner-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow">Insights</p>
			<h1><?php echo esc_html( wp_strip_all_tags( get_the_archive_title() ) ); ?></h1>
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
		<p class="lead">Nothing was found here.</p>
	<?php endif; ?>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
