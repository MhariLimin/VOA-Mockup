<?php
/**
 * Home page FAQ content.
 *
 * The five summary questions, verbatim from the client's own homepage copy. Not invented, and not
 * paraphrased — source content must not be replaced with written-here claims.
 *
 * Kept in PHP rather than as posts because they are page copy, not a content type. The twelve on
 * /faqs are a separate set and live with that page.
 *
 * Where an answer closes with a linked phrase, `answer` holds the text before it and `link` the
 * linked words; the template supplies the closing full stop after the link.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * @return array[] question, answer, and optionally link => [ label, slug ].
 */
function voa_home_faqs() {
	return apply_filters(
		'voa_home_faqs',
		array(
			array(
				'question' => __( 'What can a virtual assistant do for an Australian business?', 'voa' ),
				'answer'   => __( 'A virtual assistant can support repeatable business processes such as administration, client follow-up, CRM updates, document preparation, bookkeeping support, loan processing administration and marketing execution. The right scope depends on your industry, systems and internal approval requirements. See our', 'voa' ),
				'link'     => array(
					'label' => __( 'specialised virtual assistant services', 'voa' ),
					'slug'  => 'services',
				),
			),
			array(
				'question' => __( 'What tasks can I delegate to a virtual assistant?', 'voa' ),
				'answer'   => __( 'Delegate clearly documented, repeatable tasks with defined inputs, outputs and approval steps. Common examples include inbox and calendar management, data entry, reporting preparation, customer follow-up, file management, CRM administration and sector-specific processing support.', 'voa' ),
			),
			array(
				'question' => __( 'Should I hire a general or specialised virtual assistant?', 'voa' ),
				'answer'   => __( 'Choose a general virtual assistant for broad, lower-complexity administration. Choose a specialised virtual assistant when the role requires industry terminology, specific software, regulated workflows or experience handling technical documents. A specialist can begin with a stronger understanding of how the work fits into your business.', 'voa' ),
			),
			array(
				'question' => __( 'How are virtual assistants matched to a business?', 'voa' ),
				'answer'   => __( 'Virtual Office Angels first reviews the role, tasks, systems, required experience and working preferences. Candidates are then assessed against those requirements. You meet the shortlisted professional before confirming the match. Read more about', 'voa' ),
				'link'     => array(
					'label' => __( 'how our matching process works', 'voa' ),
					'slug'  => 'why-voa',
				),
			),
			array(
				'question' => __( 'When should a growing business hire a virtual assistant?', 'voa' ),
				'answer'   => __( 'Consider hiring when recurring work delays client service, revenue-generating activity or important follow-up, and the workload is consistent enough to define as a role. It is also a strong signal when senior employees regularly complete administrative tasks that could be handled by an experienced support professional.', 'voa' ),
			),
		)
	);
}
