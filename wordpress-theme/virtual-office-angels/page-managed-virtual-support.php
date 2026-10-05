<?php
/**
 * /managed-virtual-support — WhyPage in SourcePage.tsx: HR-managed virtual support.
 *
 * Copy is HR-Managed Virtual Support.pdf, from data/managed.json. The two sides of the ownership split
 * face each other across one spine and are deliberately not paired into rows — the items are not
 * counterparts.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_brief   = voa_page( '/managed-virtual-support' );
$voa_managed = voa_data( 'managed' );
$voa_page    = $voa_managed['page'];

get_header();
?>

<section class="section inner-hero managed-hero">
	<?php if ( ! empty( $voa_brief['image'] ) ) : ?>
		<div class="managed-hero-media">
			<img src="<?php echo esc_url( voa_media_url( $voa_brief['image'] ) ); ?>" alt="<?php echo esc_attr( $voa_brief['imageAlt'] ); ?>">
		</div>
	<?php endif; ?>
	<div class="container inner-hero-grid">
		<div>
			<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
			<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
			<p class="lead"><?php echo esc_html( $voa_brief['summary'] ); ?></p>
			<div class="button-row">
				<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Get in touch</a>
				<a class="button button-secondary" href="#what-we-manage">See what we manage</a>
			</div>
		</div>
	</div>
</section>

<section class="section"><div class="container content-split">
	<div>
		<p class="eyebrow">More than recruitment</p>
		<h2>What is an <em>HR-managed virtual support</em> solution?</h2>
		<?php foreach ( $voa_page['definition'] as $voa_text ) : ?>
			<p class="lead compact"><?php echo esc_html( $voa_text ); ?></p>
		<?php endforeach; ?>
	</div>
	<div class="task-panel" id="what-we-manage">
		<span class="card-index"><?php echo esc_html( $voa_page['includesLabel'] ); ?></span>
		<ul class="check-list">
			<?php foreach ( $voa_page['includes'] as $voa_item ) : ?>
				<li><?php echo esc_html( $voa_item ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</div></section>

<section class="section muted-section"><div class="container">
	<div class="section-heading"><div><p class="eyebrow">Shared responsibilities</p><h2><em>Clear ownership</em> keeps the role effective.</h2><p class="lead compact"><?php echo esc_html( $voa_page['ownershipIntro'] ); ?></p></div></div>
	<div class="ownership-diagram">
		<?php foreach ( $voa_managed['ownership'] as $voa_index => $voa_column ) : ?>
			<div class="ownership-side" data-side="<?php echo 0 === $voa_index ? 'start' : 'end'; ?>">
				<p class="eyebrow"><?php echo esc_html( $voa_column['label'] ); ?></p>
				<h3><?php echo esc_html( $voa_column['heading'] ); ?></h3>
				<p><?php echo esc_html( $voa_column['summary'] ); ?></p>
				<ul>
					<?php foreach ( $voa_column['items'] as $voa_item ) : ?>
						<li><?php echo esc_html( $voa_item ); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endforeach; ?>
		<span class="ownership-spine" aria-hidden="true">
			<i class="ownership-emblem"><?php echo voa_ownership_glyph(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></i>
		</span>
	</div>
</div></section>

<section class="section"><div class="container faq-page-grid">
	<aside>
		<p class="eyebrow">HR-managed virtual support FAQs</p>
		<h2>What to know <em>before hiring</em>.</h2>
		<p class="lead compact"><?php echo esc_html( $voa_page['questionsIntro'] ); ?></p>
	</aside>
	<?php get_template_part( 'template-parts/layout/accordion', null, array( 'items' => $voa_page['questions'], 'id_prefix' => 'managed-faq' ) ); ?>
</div></section>

<?php
get_template_part(
	'template-parts/layout/closing',
	null,
	array(
		'next_step' => array(
			'eyebrow' => 'Let’s talk',
			'heading' => 'Tell us what support your business needs.',
			'text'    => 'Share the responsibilities, systems, and experience the role requires. We’ll help clarify the position and explain how our HR-managed virtual support works.',
		),
	)
);

get_footer();
