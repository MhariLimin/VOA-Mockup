<?php
/**
 * Insights and resources — three recent article previews on a scrollable rail.
 *
 * Articles are ordinary WordPress posts. All 98 of them keep their existing URLs, so these link
 * straight to the posts that already rank; nothing was re-pathed under /insights.
 *
 * A post with no featured image gets the tinted fallback carrying its category, rather than the first
 * image pulled out of its body — that is usually a logo or a chart and makes a poor thumbnail.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_articles = get_posts(
	array(
		'post_type'           => 'post',
		'posts_per_page'      => 6,
		'ignore_sticky_posts' => true,
	)
);

if ( ! $voa_articles ) {
	return;
}
?>

<section class="section insight-section" data-home-reveal="compact">
	<div class="container">
		<div class="section-heading">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Insights and resources', 'voa' ); ?></p>
				<h2>
					<?php
					echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
						__( 'Learn more about <em>delegation</em> and <em>virtual staffing</em>.', 'voa' )
					);
					?>
				</h2>
				<p class="lead compact">
					<?php esc_html_e( 'Explore current guidance on building capacity, choosing the right virtual assistant, and getting more value from a remote team.', 'voa' ); ?>
				</p>
			</div>
			<a class="button button-secondary" href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/' ) ); ?>">
				<?php esc_html_e( 'Browse articles', 'voa' ); ?>
			</a>
		</div>

		<div class="home-article-rail">
			<?php foreach ( $voa_articles as $voa_article ) : ?>
				<a class="home-article-card" href="<?php echo esc_url( get_permalink( $voa_article ) ); ?>">
					<span class="home-article-image">
						<?php
						if ( has_post_thumbnail( $voa_article ) ) {
							echo get_the_post_thumbnail( $voa_article, 'voa-card', array( 'loading' => 'lazy', 'alt' => '' ) );
						} else {
							$voa_terms = get_the_category( $voa_article->ID );
							printf(
								'<span class="thumb-fallback" aria-hidden="true"><span>%s</span></span>',
								esc_html( $voa_terms ? $voa_terms[0]->name : __( 'Insights', 'voa' ) )
							);
						}
						?>
					</span>
					<small>
						<?php echo esc_html( voa_article_date( $voa_article ) ); ?>
						<?php
						$voa_terms = get_the_category( $voa_article->ID );
						if ( $voa_terms ) {
							echo ' · ' . esc_html( $voa_terms[0]->name );
						}
						?>
					</small>
					<h3><?php echo esc_html( get_the_title( $voa_article ) ); ?></h3>
					<span class="text-link">
						<?php esc_html_e( 'Read article', 'voa' ); ?>
						<?php voa_icon( 'arrow-right' ); ?>
					</span>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="rail-controls">
			<button type="button" data-rail="prev" aria-label="<?php esc_attr_e( 'Scroll to earlier articles', 'voa' ); ?>"><?php voa_icon( 'arrow-left' ); ?></button>
			<button type="button" data-rail="next" aria-label="<?php esc_attr_e( 'Scroll to more articles', 'voa' ); ?>"><?php voa_icon( 'arrow-right' ); ?></button>
		</div>
	</div>
</section>
