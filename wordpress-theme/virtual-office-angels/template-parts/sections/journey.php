<?php
/**
 * "More than recruitment" — the dark section with the four-stage journey diagram.
 *
 * This one section replaced the former separate "Managed virtual support" band and "How it works"
 * summary.
 *
 * The diagram is four milestones on a drawn path. The line does not stop at the last stage — it
 * fades off the right edge, because ongoing support has no end. That is the section's actual point,
 * so do not "fix" the line to terminate neatly.
 *
 * Marker positions are four measured points on the same quadratic the SVG draws. Two earlier
 * attempts placed them by eye and were 22 and then 91 units off the curve. They are written inline
 * here; journey.js only handles which stage is open.
 *
 * The four stages are shared with /how-it-works and use the same glyphs, so a stage never appears
 * with a different symbol depending on the page.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/* Fixed points on `M0,150 Q500,10 1000,90`. Recompute against the path if the curve ever changes. */
$voa_points = array(
	array( '10%', '62.1%' ),
	array( '36%', '38.86%' ),
	array( '62%', '30.48%' ),
	array( '86%', '35.96%' ),
);

$voa_stages = voa_journey_stages();
?>

<section class="section dark-section home-managed" data-home-reveal="dark">
	<div class="container">
		<div class="managed-copy">
			<p class="eyebrow"><?php esc_html_e( 'More than recruitment', 'voa' ); ?></p>
			<h2>
				<?php
				echo voa_heading( // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
					__( 'What is an <em>HR Managed Virtual Support</em> Solution?', 'voa' )
				);
				?>
			</h2>
			<p class="lead">
				<?php esc_html_e( 'Virtual Office Angels provides more than recruitment. Each virtual assistant is supported by an Australian-led team that manages HR, payroll and the working relationship, so the business can focus on the work itself.', 'voa' ); ?>
			</p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_page_url( 'how-it-works' ) ); ?>"><?php esc_html_e( 'See how it works', 'voa' ); ?></a>
				<a class="button button-secondary" href="<?php echo esc_url( voa_page_url( 'why-voa' ) ); ?>"><?php esc_html_e( 'Explore managed virtual support', 'voa' ); ?></a>
			</div>
		</div>

		<div class="journey">
			<?php /* Curve and markers share one box, so the marker percentages and the viewBox map to the same rectangle. */ ?>
			<div class="journey-plot">
				<svg class="journey-line" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
					<defs>
						<linearGradient id="journey-stroke" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0" stop-color="#73c9ff" stop-opacity="0.12" />
							<stop offset="0.1" stop-color="#73c9ff" stop-opacity="0.85" />
							<stop offset="0.62" stop-color="#8fb8e6" stop-opacity="0.85" />
							<stop offset="0.86" stop-color="#ee7d16" stop-opacity="0.9" />
							<stop offset="1" stop-color="#ee7d16" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path d="M0,150 Q500,10 1000,90" fill="none" stroke="url(#journey-stroke)" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
				</svg>

				<ol>
					<?php foreach ( $voa_stages as $voa_index => $voa_stage ) : ?>
						<li
							data-open="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>"
							data-place="<?php echo 0 === $voa_index % 2 ? 'below' : 'above'; ?>"
							style="left:<?php echo esc_attr( $voa_points[ $voa_index ][0] ); ?>;top:<?php echo esc_attr( $voa_points[ $voa_index ][1] ); ?>"
						>
							<button type="button" aria-expanded="<?php echo 0 === $voa_index ? 'true' : 'false'; ?>" aria-controls="stage-flow-detail">
								<span class="journey-marker" aria-hidden="true">
									<i class="journey-diamond"></i>
									<span class="journey-icon"><?php voa_stage_glyph( $voa_index ); ?></span>
								</span>
								<span class="journey-label">
									<span class="journey-step"><?php echo esc_html( str_pad( (string) ( $voa_index + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
									<span class="journey-name"><?php echo esc_html( $voa_stage['name'] ); ?></span>
								</span>
							</button>
						</li>
					<?php endforeach; ?>
				</ol>
			</div>

			<div class="stage-detail" id="stage-flow-detail" data-stage="01">
				<?php foreach ( $voa_stages as $voa_index => $voa_stage ) : ?>
					<div data-stage-panel <?php echo 0 === $voa_index ? '' : 'hidden'; ?>>
						<h3><?php echo esc_html( $voa_stage['heading'] ); ?></h3>
						<p><?php echo esc_html( $voa_stage['text'] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
