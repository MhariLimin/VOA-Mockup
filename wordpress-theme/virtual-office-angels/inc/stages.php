<?php
/**
 * The four managed-support stages, and their glyphs.
 *
 * Shared by the home page journey diagram and the /how-it-works medallions. Defined once, so a stage
 * can never appear with a different name or symbol depending on the page — unlike the service-page
 * diagrams, where the items are in no fixed order and the icons are resolved from their wording.
 *
 * The copy is the client's own, from the content proposal.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Stage name, heading and body, in order.
 *
 * Filterable so the copy can be adjusted without editing the theme, but not Customizer-exposed:
 * these four stages are the service model, not site settings.
 *
 * @return array[]
 */
function voa_journey_stages() {
	return apply_filters(
		'voa_journey_stages',
		array(
			array(
				'name'    => __( 'Consulting & Role Planning', 'voa' ),
				'heading' => __( 'Clarify the role before recruitment starts.', 'voa' ),
				'text'    => __( 'We review the work that needs attention, the systems involved and the experience required.', 'voa' ),
			),
			array(
				'name'    => __( 'Sourcing & Candidate Matching', 'voa' ),
				'heading' => __( 'Assess capability, experience and working fit.', 'voa' ),
				'text'    => __( 'We screen candidates against the practical demands of your role, then present a focused shortlist for your review.', 'voa' ),
			),
			array(
				'name'    => __( 'Onboarding & Integration', 'voa' ),
				'heading' => __( 'Prepare the new hire and the working conditions.', 'voa' ),
				'text'    => __( 'We help establish expectations, reporting lines and the initial working rhythm while your business provides its role-specific processes and approvals.', 'voa' ),
			),
			array(
				'name'    => __( 'Ongoing Delivery & Support', 'voa' ),
				'heading' => __( 'Keep performance and communication on track.', 'voa' ),
				'text'    => __( 'A dedicated support structure helps address feedback, availability, and performance matters throughout the engagement.', 'voa' ),
			),
		)
	);
}

/**
 * The glyph for a stage, by index.
 *
 * Ported from StageGlyphs.tsx. The viewBox is 32x32 here rather than the icon set's 24x24, so these
 * do not go through voa_get_icon().
 *
 * @param int $index 0-3.
 */
function voa_stage_glyph( $index ) {
	$paths = array(
		// Consulting & Role Planning — a clipboard.
		'<path d="M11 5h10v3H11z"/><path d="M21 6.5h3.5v20h-17v-20H11"/><path d="M11.5 14h9M11.5 18.5h9M11.5 23h5.5"/>',
		// Sourcing & Candidate Matching — a figure inside the lens. An earlier version put a lone
		// shoulder arc outside the circle, which read as a figure missing one side.
		'<circle cx="14" cy="13.5" r="8.5"/><path d="m20.2 19.7 5.8 5.8"/><circle cx="14" cy="10.5" r="2.2"/><path d="M10 18.2c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8"/>',
		// Onboarding & Integration — moving into place.
		'<path d="M6.5 8.5h12v15h-12z"/><path d="M13 16h12.5"/><path d="m21.5 12 4.5 4-4.5 4"/>',
		// Ongoing Delivery & Support — a continuing cycle.
		'<path d="M26 16a10 10 0 1 1-3.2-7.3"/><path d="M26 6v5h-5"/><path d="M16 11.5v5l3.5 2"/>',
	);

	if ( ! isset( $paths[ $index ] ) ) {
		return;
	}

	printf(
		'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">%s</svg>',
		$paths[ $index ] // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup.
	);
}
