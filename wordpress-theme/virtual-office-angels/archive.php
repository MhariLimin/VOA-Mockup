<?php
/**
 * Category, tag, author and date archives.
 *
 * Shares the insights index's card and pagination so a filtered view is visually identical to the
 * unfiltered one — the only difference is the heading.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section inner-hero compact-inner-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Insights', 'voa' ); ?></p>
			<h1><?php echo esc_html( wp_strip_all_tags( get_the_archive_title() ) ); ?></h1>
			<?php if ( get_the_archive_description() ) : ?>
				<p class="lead"><?php echo esc_html( wp_strip_all_tags( get_the_archive_description() ) ); ?></p>
			<?php endif; ?>
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

			<?php
			the_posts_pagination(
				array(
					'mid_size'  => 2,
					'prev_text' => voa_get_icon( 'arrow-left' ) . esc_html__( 'Previous', 'voa' ),
					'next_text' => esc_html__( 'Next', 'voa' ) . voa_get_icon( 'arrow-right' ),
				)
			);
			?>
		<?php else : ?>
			<p class="lead"><?php esc_html_e( 'Nothing was found here.', 'voa' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
get_template_part( 'template-parts/sections/contact', null, array() );
get_footer();
