<?php
/**
 * Article detail.
 *
 * Articles use local content and local images. They must not link back out to the staging site —
 * three article bodies currently do, and those are defects to correct during migration, not
 * redirects to write.
 *
 * Next-article navigation at the foot, as in the React build.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	$voa_terms    = get_the_category();
	$voa_category = $voa_terms ? $voa_terms[0]->name : __( 'Insights', 'voa' );
	?>

	<article <?php post_class( 'article-page' ); ?>>
		<section class="section article-opening">
			<div class="container narrow">
				<a class="article-back" href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>">
					<?php voa_icon( 'arrow-left' ); ?>
					<?php esc_html_e( 'All insights', 'voa' ); ?>
				</a>

				<p class="eyebrow"><?php echo esc_html( $voa_category ); ?></p>
				<h1><?php the_title(); ?></h1>

				<p class="article-meta">
					<?php voa_icon( 'stat-years' ); ?>
					<?php echo esc_html( voa_article_date() ); ?>
					<?php if ( get_the_author() ) : ?>
						· <?php echo esc_html( get_the_author() ); ?>
					<?php endif; ?>
				</p>
			</div>

			<?php if ( has_post_thumbnail() ) : ?>
				<div class="container">
					<figure class="article-hero-image">
						<?php the_post_thumbnail( 'voa-hero', array( 'alt' => '' ) ); ?>
					</figure>
				</div>
			<?php endif; ?>
		</section>

		<section class="section article-body">
			<div class="container narrow">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<nav class="pagination">',
						'after'  => '</nav>',
					)
				);
				?>
			</div>
		</section>

		<?php
		$voa_next = get_previous_post(); // Previous by date = the next one to read.

		if ( $voa_next ) :
			?>
			<section class="section article-next">
				<div class="container narrow">
					<p class="eyebrow"><?php esc_html_e( 'Continue reading', 'voa' ); ?></p>
					<a href="<?php echo esc_url( get_permalink( $voa_next ) ); ?>">
						<h2><?php echo esc_html( get_the_title( $voa_next ) ); ?></h2>
						<span>
							<?php esc_html_e( 'Continue reading', 'voa' ); ?>
							<?php voa_icon( 'arrow-right' ); ?>
						</span>
					</a>
				</div>
			</section>
		<?php endif; ?>
	</article>

	<?php
endwhile;

get_template_part( 'template-parts/sections/contact', null, array() );
get_footer();
