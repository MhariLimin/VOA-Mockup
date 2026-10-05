<?php
/**
 * /faqs — FaqPage in SourcePage.tsx.
 *
 * Twelve source FAQs, verbatim, grouped by topic. The page opens on the first topic ("The service"),
 * as the React build does. The topic buttons and the one-open-at-a-time answers are interactions.js;
 * every question and answer rides along as JSON so the list can be rebuilt for each topic.
 *
 * The topic labels are layout labels written for the prototype, not source copy.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

const VOA_FAQ_INITIAL_TOPIC = 1;

$voa_brief  = voa_page( '/faqs' );
$voa_faqs   = voa_data( 'faqs' );
$voa_topics = array_merge(
	array(
		array(
			'label'     => 'All questions',
			'questions' => array_keys( $voa_faqs['questions'] ),
		),
	),
	$voa_faqs['topics']
);

get_header();
?>

<section class="section faq-page"><div class="container faq-page-grid">
	<aside>
		<p class="eyebrow"><?php echo esc_html( $voa_brief['eyebrow'] ); ?></p>
		<h1><?php echo voa_accent( $voa_brief['title'] ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- escaped inside. ?></h1>
		<?php if ( ! empty( $voa_brief['summary'] ) ) : ?>
			<p><?php echo esc_html( $voa_brief['summary'] ); ?></p>
		<?php endif; ?>
		<div class="faq-topics" role="group" aria-label="Question topics">
			<?php foreach ( $voa_topics as $voa_index => $voa_topic ) : ?>
				<button class="<?php echo VOA_FAQ_INITIAL_TOPIC === $voa_index ? 'active' : ''; ?>" aria-pressed="<?php echo VOA_FAQ_INITIAL_TOPIC === $voa_index ? 'true' : 'false'; ?>" type="button"><span><?php echo esc_html( $voa_topic['label'] ); ?></span><small><?php echo count( $voa_topic['questions'] ); ?></small></button>
			<?php endforeach; ?>
		</div>
		<a class="button" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Ask Us a Question</a>
	</aside>
	<div>
		<div class="faq-list">
			<?php foreach ( $voa_topics[ VOA_FAQ_INITIAL_TOPIC ]['questions'] as $voa_question ) : ?>
				<details><summary><?php echo esc_html( $voa_faqs['questions'][ $voa_question ][0] ); ?><?php voa_icon( 'plus' ); ?></summary><p><?php echo esc_html( $voa_faqs['questions'][ $voa_question ][1] ); ?></p></details>
			<?php endforeach; ?>
		</div>
		<div class="faq-closing"><p>We trust these answers provide useful information about hiring a virtual worker and what to consider when getting started.</p><p>If you need any other clarification, call Virtual Office Angels or email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a>.</p></div>
	</div>
	<script type="application/json" class="voa-faq-data"><?php echo wp_json_encode( array( 'questions' => $voa_faqs['questions'], 'topics' => $voa_topics ) ); ?></script>
</div></section>

<?php
get_template_part( 'template-parts/layout/closing' );
get_footer();
