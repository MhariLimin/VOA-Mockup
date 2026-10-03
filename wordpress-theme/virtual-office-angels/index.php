<?php
/**
 * Fallback template.
 *
 * WordPress requires index.php to exist; it is the last resort in the template hierarchy. The real
 * templates — front-page.php, home.php, single.php, single-voa_service.php and the page templates —
 * arrive in build steps 5 to 8. Until then this renders a plain, readable list so the theme can be
 * activated and the header, footer, navigation and theme switch tested against real content.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<section class="section">
	<div class="container">
		<?php if ( have_posts() ) : ?>

			<div class="section-heading">
				<div>
					<p class="eyebrow"><?php esc_html_e( 'Insights', 'voa' ); ?></p>
					<h1><?php echo esc_html( get_the_archive_title() ? wp_strip_all_tags( get_the_archive_title() ) : get_bloginfo( 'name' ) ); ?></h1>
				</div>
			</div>

			<div class="article-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'article-card' ); ?>>
						<a class="article-art" href="<?php the_permalink(); ?>">
							<?php voa_post_thumbnail( 'voa-card' ); ?>
						</a>
						<div>
							<small><?php echo esc_html( voa_article_date() ); ?></small>
							<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<a class="text-link" href="<?php the_permalink(); ?>">
								<?php esc_html_e( 'Read article', 'voa' ); ?>
								<?php voa_icon( 'arrow-right' ); ?>
							</a>
						</div>
					</article>
					<?php
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

			<div class="page-intro">
				<p class="eyebrow"><?php esc_html_e( 'Nothing here yet', 'voa' ); ?></p>
				<h1><?php esc_html_e( 'No content found.', 'voa' ); ?></h1>
				<p class="lead"><?php esc_html_e( 'Try the navigation, or return to the homepage.', 'voa' ); ?></p>
			</div>

		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
