<?php
/**
 * /videos — VideosPage in SourcePage.tsx.
 *
 * Three placeholders, deferred by the client on 2026-10-03 until approved videos with captions and
 * transcripts exist. Each is a player-style frame clearly marked "Coming soon", never a fake
 * thumbnail.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief  = voa_page( '/videos' );
$voa_videos = array( 'Choosing the right virtual assistant', 'Preparing your business to delegate', 'Building a strong remote working rhythm' );

/**
 * The stand-in artwork: a player-style frame marked as coming soon.
 *
 * @param string $label Top label.
 * @param string $title Optional title.
 * @param string $class Extra class.
 * @return string
 */
$voa_poster = static function ( $label, $title = '', $class = '' ) {
	return sprintf(
		'<div class="%s" aria-hidden="true"><span class="video-poster-chip">Coming soon</span><span class="video-poster-label">%s</span><span class="video-poster-play">%s</span>%s<span class="video-poster-bar"><i></i><b>0:00</b></span></div>',
		esc_attr( trim( 'video-poster ' . $class ) ),
		esc_html( $label ),
		voa_get_icon( 'play' ),
		$title ? '<span class="video-poster-title">' . esc_html( $title ) . '</span>' : ''
	);
};

get_header();

get_template_part(
	'template-parts/layout/image-hero',
	null,
	array(
		'page'      => $voa_brief,
		'primary'   => array( 'Watch videos', '#videos' ),
		'secondary' => array( 'Read articles', '/insights' ),
		'aside'     => $voa_poster( 'Video library', '', 'video-hero-poster' ),
	)
);
?>

<section class="section library-section" id="videos"><div class="container">
	<div class="section-heading library-heading"><p class="eyebrow">Video library</p><p class="library-count"><?php echo count( $voa_videos ); ?> videos</p></div>
	<div class="media-grid">
		<?php foreach ( $voa_videos as $voa_index => $voa_title ) : ?>
			<article class="video-card"><?php echo $voa_poster( 'Video 0' . ( $voa_index + 1 ), $voa_title ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?><p class="eyebrow">Video resource</p><h2><?php echo esc_html( $voa_title ); ?></h2><p>Reserved for an existing, client-approved video with captions and a written transcript.</p></article>
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
