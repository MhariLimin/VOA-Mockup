<?php
/**
 * /insights, the posts page — InsightsPage in SourcePage.tsx.
 *
 * Ten articles a page, a topic filter, the first card of the unfiltered first page larger. As in the
 * React build, filtering and paging happen in place: the first page is rendered here, and the full
 * article list rides along as JSON for interactions.js. Every article is also in the Yoast sitemap
 * and linked from its neighbour, so nothing depends on the script to be found.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

const VOA_ARTICLES_PER_PAGE = 10;

$voa_brief    = voa_page( '/insights' );
$voa_articles = voa_articles();
$voa_total    = count( $voa_articles );

/* Topics in order of first appearance, newest article first — new Set() order in the React build. */
$voa_topics = array( 'All insights' );
$voa_json   = array();
foreach ( $voa_articles as $voa_article ) {
	$voa_category = voa_article_category( $voa_article );
	if ( ! in_array( $voa_category, $voa_topics, true ) ) {
		$voa_topics[] = $voa_category;
	}
	$voa_json[] = array(
		'url'      => get_permalink( $voa_article ),
		'title'    => get_the_title( $voa_article ),
		'date'     => voa_article_date( $voa_article ),
		'category' => $voa_category,
		'image'    => voa_article_image( $voa_article ),
	);
}

get_header();

get_template_part(
	'template-parts/layout/image-hero',
	null,
	array(
		// No buttons: the articles start just below (revision of 2026-10-05).
		'page' => $voa_brief,
	)
);
?>

<section class="section library-section" id="articles"><div class="container">
	<div class="section-heading library-heading"><p class="eyebrow">Article library</p><p class="library-count"><?php echo esc_html( $voa_total . ' ' . ( 1 === $voa_total ? 'article' : 'articles' ) ); ?></p></div>
	<div class="filter-row" aria-label="Article topics">
		<?php foreach ( $voa_topics as $voa_index => $voa_topic ) : ?>
			<button class="<?php echo 0 === $voa_index ? 'active' : ''; ?>" aria-pressed="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" type="button"><?php echo esc_html( $voa_topic ); ?></button>
		<?php endforeach; ?>
	</div>
	<div class="article-grid">
		<?php
		foreach ( array_slice( $voa_articles, 0, VOA_ARTICLES_PER_PAGE ) as $voa_index => $voa_article ) {
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
			'pages' => (int) ceil( $voa_total / VOA_ARTICLES_PER_PAGE ),
		)
	);
	?>
	<script type="application/json" class="voa-library-data"><?php echo wp_json_encode( array( 'perPage' => VOA_ARTICLES_PER_PAGE, 'all' => 'All insights', 'items' => $voa_json ) ); ?></script>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
