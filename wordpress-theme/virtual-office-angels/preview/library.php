<?php
/**
 * Preview theme: the article library with the Topic dropdown — ArticleLibraryPage in SourcePage.tsx.
 *
 * Used for Insights (every article but News & Community) and for News & Community (preview/news.php).
 * The same as home.php otherwise: ten a page, the first card of the unfiltered first page larger, and
 * the full list as JSON for interactions.js, which filters and pages in place.
 *
 * Args:
 *   news  bool  true for News & Community
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_per_page = 10;
$voa_news     = ! empty( $args['news'] );
$voa_brief    = voa_page( $voa_news ? '/news-and-community' : '/insights' );
$voa_articles = voa_library_articles( $voa_news );
$voa_total    = count( $voa_articles );
$voa_library  = voa_data_raw( 'library' );
$voa_groups   = isset( $voa_library['topicGroups'] ) ? $voa_library['topicGroups'] : array();
$voa_all      = 'All insights';

$voa_counts = array( $voa_all => $voa_total );
$voa_json   = array();
foreach ( $voa_articles as $voa_article ) {
	$voa_category = voa_article_category( $voa_article );
	$voa_counts[ $voa_category ] = isset( $voa_counts[ $voa_category ] ) ? $voa_counts[ $voa_category ] + 1 : 1;
	$voa_image = voa_article_image( $voa_article );
	$voa_json[] = array(
		'url'      => get_permalink( $voa_article ),
		'title'    => get_the_title( $voa_article ),
		'date'     => voa_article_date( $voa_article ),
		'category' => $voa_category,
		'image'    => $voa_image ? $voa_image : voa_preview_card_fallback( $voa_article ),
	);
}
/* The dropdown only when there is more than one topic to choose from, as in React. */
$voa_dropdown = count( $voa_counts ) - 1 > 1;

get_header();

get_template_part( 'template-parts/layout/image-hero', null, array( 'page' => $voa_brief ) );
?>

<section class="section library-section" id="articles"><div class="container">
	<div class="section-heading library-heading">
		<p class="eyebrow"><?php echo $voa_news ? 'News library' : voa_content_copy( 'insights', 'library_eyebrow' ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- voa_content_copy() returns escaped copy. ?></p>
		<div class="library-tools">
			<?php if ( $voa_dropdown ) : ?>
				<div class="topic-dropdown">
					<button class="topic-trigger" type="button" aria-expanded="false" aria-controls="topic-options"><span><small>Topic</small><?php echo esc_html( $voa_all ); ?></span><?php echo voa_get_chevron(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></button>
					<div class="nav-popover nav-mega" id="topic-options" data-open="false">
						<?php foreach ( $voa_groups as $voa_group ) : ?>
							<div class="nav-mega-column">
								<span class="nav-mega-label"><?php echo esc_html( $voa_group['label'] ); ?></span>
								<?php foreach ( $voa_group['topics'] as $voa_topic ) : ?>
									<button class="topic-option" type="button" aria-current="<?php echo $voa_topic === $voa_all ? 'true' : 'false'; ?>"><span><?php echo esc_html( $voa_topic ); ?></span><small><?php echo (int) ( isset( $voa_counts[ $voa_topic ] ) ? $voa_counts[ $voa_topic ] : 0 ); ?></small></button>
								<?php endforeach; ?>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
			<p class="library-count"><?php echo esc_html( $voa_total . ' ' . ( 1 === $voa_total ? 'article' : 'articles' ) ); ?></p>
		</div>
	</div>
	<div class="article-grid">
		<?php
		foreach ( array_slice( $voa_articles, 0, $voa_per_page ) as $voa_index => $voa_article ) {
			get_template_part(
				'template-parts/layout/article-card',
				null,
				array(
					'post'     => $voa_article,
					'featured' => 0 === $voa_index,
				)
			);
		}
		?>
	</div>
	<?php
	get_template_part(
		'template-parts/layout/pagination',
		null,
		array(
			'label' => 'Article pages',
			'pages' => (int) ceil( $voa_total / $voa_per_page ),
		)
	);
	?>
	<script type="application/json" class="voa-library-data"><?php echo wp_json_encode( array( 'perPage' => $voa_per_page, 'all' => $voa_all, 'items' => $voa_json ) ); ?></script>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
