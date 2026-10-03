<?php
/**
 * Insights index — the posts page.
 *
 * All ~98 articles keep the URLs they already have, so this page lists posts that are already
 * indexed and already ranking. Nothing was re-pathed under /insights.
 *
 * Filtering by category is done with WordPress query vars rather than JavaScript, unlike the React
 * build: each filter is then a real, linkable, crawlable URL instead of client-side state.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();

$voa_page   = get_queried_object();
$voa_unfiltered = ! is_paged() && ! get_query_var( 'cat' );
?>

<section class="section inner-hero compact-inner-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Insights', 'voa' ); ?></p>
			<h1>
				<?php
				echo $voa_page instanceof WP_Post
					? esc_html( get_the_title( $voa_page ) )
					: esc_html__( 'Practical thinking for building better remote support.', 'voa' );
				?>
			</h1>
			<?php if ( $voa_page instanceof WP_Post && $voa_page->post_excerpt ) : ?>
				<p class="lead"><?php echo esc_html( $voa_page->post_excerpt ); ?></p>
			<?php endif; ?>
		</div>
	</div>
</section>

<section class="section library-section" id="articles">
	<div class="container">
		<div class="section-heading library-heading">
			<p class="eyebrow"><?php esc_html_e( 'Article library', 'voa' ); ?></p>
			<p class="library-count">
				<?php
				$voa_total = (int) $GLOBALS['wp_query']->found_posts;
				printf(
					/* translators: %s: number of articles. */
					esc_html( _n( '%s article', '%s articles', $voa_total, 'voa' ) ),
					esc_html( number_format_i18n( $voa_total ) )
				);
				?>
			</p>
		</div>

		<?php
		$voa_categories = get_categories( array( 'hide_empty' => true ) );

		if ( $voa_categories ) :
			$voa_current = (int) get_query_var( 'cat' );
			?>
			<div class="filter-row" aria-label="<?php esc_attr_e( 'Article topics', 'voa' ); ?>">
				<a class="<?php echo $voa_current ? '' : 'active'; ?>" href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>">
					<?php esc_html_e( 'All insights', 'voa' ); ?>
				</a>
				<?php foreach ( $voa_categories as $voa_category ) : ?>
					<a
						class="<?php echo $voa_current === $voa_category->term_id ? 'active' : ''; ?>"
						href="<?php echo esc_url( get_category_link( $voa_category ) ); ?>"
					><?php echo esc_html( $voa_category->name ); ?></a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<?php if ( have_posts() ) : ?>
			<div class="article-grid">
				<?php
				$voa_index = 0;
				while ( have_posts() ) :
					the_post();
					get_template_part(
						'template-parts/cards/article-card',
						null,
						array( 'featured' => 0 === $voa_index && $voa_unfiltered )
					);
					$voa_index++;
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
			<p class="lead"><?php esc_html_e( 'No articles have been published yet.', 'voa' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
get_template_part( 'template-parts/sections/contact', null, array() );
get_footer();
