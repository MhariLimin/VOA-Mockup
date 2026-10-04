<?php
/**
 * /how-it-works — ProcessPage in SourcePage.tsx.
 *
 * The brief-to-match card is the hero's visual, and the four stages run as an icon flow over a
 * low-opacity photograph. Stage copy is HR-Managed Virtual Support.pdf, from data/process.json.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief   = voa_page( '/how-it-works' );
$voa_process = voa_data( 'process' );
$voa_stages  = $voa_process['stages'];
$voa_count   = count( $voa_stages );

get_header();
?>

<section class="section inner-hero process-hero">
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
			<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
			<p class="lead"><?php echo esc_html( $voa_process['intro']['text'] ); ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Start with a role brief</a>
				<a class="button button-secondary" href="#stages">See the four stages</a>
			</div>
		</div>
		<div class="match-visual process-match" aria-label="Illustration of Virtual Office Angels matching a client with a managed specialist">
			<div class="match-card match-brief"><span>Client brief</span><strong>Mortgage operations</strong><small>Applications · CRM · follow-up</small></div>
			<div class="connector" aria-hidden="true"><span></span></div>
			<div class="match-card match-profile"><span>Specialist match</span><strong>Experienced lending support</strong><small>Screened for role and workflow fit</small><em>Virtual Office Angels managed</em></div>
		</div>
	</div>
</section>

<section class="section process-stages has-section-backdrop" id="stages">
	<span class="process-stage-wash" aria-hidden="true"></span>
	<div class="container">
		<div class="section-heading"><div>
			<p class="eyebrow"><?php echo esc_html( $voa_process['intro']['eyebrow'] ); ?></p>
			<h2><?php echo voa_accent( $voa_process['intro']['heading'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h2>
		</div></div>
		<ol class="stage-flowline">
			<?php foreach ( $voa_stages as $voa_index => $voa_stage ) : ?>
				<?php
				/*
				 * --arc fills each ring a quarter further; --mix shifts its colour along the flow. Both
				 * are written as JavaScript would write them, so the colour mix matches React to the
				 * last digit rather than to four decimals.
				 */
				$voa_arc = voa_js_number( ( $voa_index + 1 ) / $voa_count );
				$voa_mix = voa_js_number( ( $voa_index / ( $voa_count - 1 ) ) * 100 );
				?>
				<li style="<?php echo esc_attr( '--arc:' . $voa_arc . ';--mix:' . $voa_mix . '%' ); ?>">
					<span class="stage-medallion" aria-hidden="true">
						<svg class="stage-ring" viewBox="0 0 100 100">
							<circle class="stage-ring-track" cx="50" cy="50" r="44"/>
							<circle class="stage-ring-arc" cx="50" cy="50" r="44"/>
						</svg>
						<span class="stage-medallion-icon"><?php echo voa_stage_glyph( $voa_index ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></span>
					</span>
					<span class="stage-step"><?php echo esc_html( $voa_stage['number'] ); ?></span>
					<h3><?php echo esc_html( $voa_stage['title'] ); ?></h3>
					<p><?php echo esc_html( $voa_stage['summary'] ); ?></p>
					<ul class="stage-chips">
						<?php foreach ( $voa_stage['checkpoints'] as $voa_point ) : ?>
							<li><?php echo esc_html( $voa_point ); ?></li>
						<?php endforeach; ?>
					</ul>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
