<?php
/**
 * Article — BlogArticlePage.tsx.
 *
 * "Read next" is the next article down the list, newest first, wrapping from the oldest back to the
 * newest — the same neighbour the React build picks.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();

	$voa_next = get_adjacent_post( false, '', true );
	if ( ! $voa_next ) {
		$voa_newest = voa_articles( 1 );
		$voa_next   = $voa_newest && $voa_newest[0]->ID !== get_the_ID() ? $voa_newest[0] : null;
	}
	?>
	<article class="blog-detail">
		<header class="section blog-header">
			<div class="container narrow">
				<a class="article-back" href="<?php echo esc_url( voa_url( '/insights' ) ); ?>"><?php voa_icon( 'arrow-left' ); ?> All insights</a>
				<p class="eyebrow"><?php echo esc_html( voa_article_category() ); ?></p>
				<h1><?php the_title(); ?></h1>
				<div class="blog-meta"><span><?php echo esc_html( voa_article_date() ); ?></span><span>By <?php echo esc_html( get_the_author() ); ?></span></div>
			</div>
		</header>
		<div class="container blog-featured"><?php voa_article_image_tag( get_post() ); ?></div>
		<section class="section blog-content-section">
			<div class="container narrow article-content"><?php the_content(); ?></div>
		</section>
		<?php if ( $voa_next ) : ?>
			<aside class="section related-article">
				<div class="container narrow">
					<p class="eyebrow">Read next</p>
					<a href="<?php echo esc_url( get_permalink( $voa_next ) ); ?>"><h2><?php echo esc_html( get_the_title( $voa_next ) ); ?></h2><span>Continue reading <?php voa_icon( 'arrow-right' ); ?></span></a>
				</div>
			</aside>
		<?php endif; ?>
		<?php get_template_part( 'template-parts/layout/closing' ); ?>
	</article>
	<?php
endwhile;

get_footer();
