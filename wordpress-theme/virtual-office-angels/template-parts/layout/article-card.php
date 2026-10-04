<?php
/**
 * Insights card — the article card in InsightsPage, SourcePage.tsx.
 *
 * interactions.js builds the same markup when the topic filter or the page changes; keep the two in
 * step.
 *
 * Args:
 *   post      WP_Post
 *   featured  bool  the larger first card
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_post     = $args['post'];
$voa_category = voa_article_category( $voa_post );
$voa_link     = get_permalink( $voa_post );
?>
<article class="<?php echo ! empty( $args['featured'] ) ? 'article-card featured' : 'article-card'; ?>"><a class="article-art" href="<?php echo esc_url( $voa_link ); ?>"><?php voa_article_image_tag( $voa_post ); ?><span><?php echo esc_html( $voa_category ); ?></span></a><div><small><?php echo esc_html( voa_article_date( $voa_post ) ); ?> · <?php echo esc_html( $voa_category ); ?></small><h2><a href="<?php echo esc_url( $voa_link ); ?>"><?php echo esc_html( get_the_title( $voa_post ) ); ?></a></h2><a class="text-link" href="<?php echo esc_url( $voa_link ); ?>">Read article <?php voa_icon( 'arrow-right' ); ?></a></div></article>
