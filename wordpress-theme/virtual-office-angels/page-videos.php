<?php
/**
 * /videos — VideosPage in SourcePage.tsx.
 *
 * The videos are data/videos.json (content/videoContent.ts): on 3 November 2026, the one video on the
 * old website's Videos page. Each file stays in the WordPress media library and plays from
 * wp-content/uploads; the poster, and the still beside the page heading, are frames of the video
 * itself. The "Coming soon" placeholders it replaces were removed the same day.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief   = voa_page( '/videos' );
$voa_videos  = voa_data( 'videos' );
$voa_uploads = wp_get_upload_dir();

get_header();

get_template_part(
	'template-parts/layout/image-hero',
	null,
	array(
		'page'      => $voa_brief,
		'primary'   => array( 'Watch videos', '#videos' ),
		'secondary' => array( 'Read articles', '/insights' ),
		'aside'     => $voa_videos ? '<img class="video-hero-still" src="' . esc_url( voa_media_url( $voa_videos[0]['poster'] ) ) . '" alt="">' : '',
	)
);
?>

<section class="section library-section" id="videos"><div class="container">
	<div class="section-heading library-heading"><p class="eyebrow"><?php echo voa_content_copy( 'videos', 'library_eyebrow' ); ?></p><p class="library-count"><?php echo esc_html( count( $voa_videos ) . ( 1 === count( $voa_videos ) ? ' video' : ' videos' ) ); ?></p></div>
	<div class="media-grid<?php echo 1 === count( $voa_videos ) ? ' media-grid-single' : ''; ?>">
		<?php foreach ( $voa_videos as $voa_video ) : ?>
			<article class="video-card"><video class="video-player" controls preload="none" poster="<?php echo esc_url( voa_media_url( $voa_video['poster'] ) ); ?>" src="<?php echo esc_url( trailingslashit( $voa_uploads['baseurl'] ) . $voa_video['upload'] ); ?>" aria-label="<?php echo esc_attr( $voa_video['title'] ); ?>"></video><p class="eyebrow">Video resource</p><h2><?php echo esc_html( $voa_video['title'] ); ?></h2></article>
		<?php endforeach; ?>
	</div>
	<?php
	get_template_part(
		'template-parts/layout/pagination',
		null,
		array(
			'label' => 'Video pages',
			'pages' => (int) ceil( count( $voa_videos ) / 10 ),
		)
	);
	?>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
