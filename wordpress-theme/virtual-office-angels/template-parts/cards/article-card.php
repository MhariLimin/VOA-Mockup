<?php
/**
 * Article card.
 *
 * Shared by the insights index, category and tag archives, and search results. The first card on the
 * first page of the unfiltered index gets the `featured` modifier, matching the React build.
 *
 * Args:
 *   featured  bool  render the larger variant
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_featured = ! empty( $args['featured'] );
$voa_terms    = get_the_category();
$voa_category = $voa_terms ? $voa_terms[0]->name : __( 'Insights', 'voa' );
?>

<article <?php post_class( $voa_featured ? 'article-card featured' : 'article-card' ); ?>>
	<a class="article-art" href="<?php the_permalink(); ?>">
		<?php voa_post_thumbnail( $voa_featured ? 'voa-hero' : 'voa-card' ); ?>
		<span><?php echo esc_html( $voa_category ); ?></span>
	</a>

	<div>
		<small>
			<?php echo esc_html( voa_article_date() ); ?> · <?php echo esc_html( $voa_category ); ?>
		</small>
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<a class="text-link" href="<?php the_permalink(); ?>">
			<?php esc_html_e( 'Read article', 'voa' ); ?>
			<?php voa_icon( 'arrow-right' ); ?>
		</a>
	</div>
</article>
