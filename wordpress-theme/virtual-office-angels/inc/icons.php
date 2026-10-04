<?php
/**
 * Every inline SVG the design uses.
 *
 * Path data is copied from the React components — Icons.tsx, StageGlyphs.tsx, ItemGlyphs.tsx and the
 * small marks inside Header.tsx and SourcePage.tsx — and scripts/wordpress/compare.mjs checks each one
 * against the React render, so a typo here shows up as a diff rather than as a slightly wrong icon.
 *
 * All functions return markup; the voa_icon() wrapper echoes. Everything returned is static, built
 * from constants in this file, so it is safe to print without escaping.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The Icon() wrapper in Icons.tsx: a 24x24 stroke icon in currentColor, sized in em by the CSS.
 *
 * @param string $children SVG children.
 * @param string $class    Extra class.
 * @param string $weight   Stroke width.
 * @return string
 */
function voa_svg_icon( $children, $class = '', $weight = '2' ) {
	return sprintf(
		'<svg class="%s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%s</svg>',
		esc_attr( $class ? 'icon ' . $class : 'icon' ),
		esc_attr( $weight ),
		$children
	);
}

/**
 * The named icons from Icons.tsx.
 *
 * @param string $name  arrow-right, arrow-left, arrow-up-right, plus, play, phone, mail, pin, building.
 * @param string $class Extra class.
 * @return string
 */
function voa_get_icon( $name, $class = '' ) {
	switch ( $name ) {
		case 'arrow-right':
			return voa_svg_icon( '<path d="M4 12h14"/><path d="m12.5 6 6 6-6 6"/>', $class );
		case 'arrow-left':
			return voa_svg_icon( '<path d="M20 12H6"/><path d="m11.5 6-6 6 6 6"/>', $class );
		case 'arrow-up-right':
			return voa_svg_icon( '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>', $class );
		case 'plus':
			return voa_svg_icon( '<path d="M12 5.5v13"/><path d="M5.5 12h13"/>', $class );
		case 'play':
			return sprintf(
				'<svg class="%s" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8.5 5.6a.6.6 0 0 1 .92-.5l8.1 5.9a.6.6 0 0 1 0 1l-8.1 5.9a.6.6 0 0 1-.92-.5Z"/></svg>',
				esc_attr( $class ? 'icon ' . $class : 'icon' )
			);
		case 'phone':
			return voa_svg_icon( '<path d="M6.4 3.6h3.1l1.5 3.9-2 1.4a12.3 12.3 0 0 0 6.1 6.1l1.4-2 3.9 1.5v3.1a1.8 1.8 0 0 1-2 1.8C11.7 18.8 5.2 12.3 4.6 5.6a1.8 1.8 0 0 1 1.8-2Z"/>', $class, '1.7' );
		case 'mail':
			return voa_svg_icon( '<rect x="3" y="5.4" width="18" height="13.2" rx="1.8"/><path d="m3.8 6.8 8.2 6 8.2-6"/>', $class, '1.7' );
		case 'pin':
			return voa_svg_icon( '<path d="M12 21.2c4.2-4.6 6.3-8 6.3-10.4a6.3 6.3 0 1 0-12.6 0c0 2.4 2.1 5.8 6.3 10.4Z"/><circle cx="12" cy="10.6" r="2.4"/>', $class, '1.7' );
		case 'building':
			return voa_svg_icon( '<path d="M4.2 20.4V5.4a1.4 1.4 0 0 1 1.4-1.4h8.2a1.4 1.4 0 0 1 1.4 1.4v15"/><path d="M15.2 10.2h3.2a1.4 1.4 0 0 1 1.4 1.4v8.8"/><path d="M3 20.4h18"/><path d="M7.6 8h4M7.6 12h4M7.6 16h4"/>', $class, '1.7' );
	}

	return '';
}

/**
 * Echo a named icon.
 *
 * @param string $name  Icon name.
 * @param string $class Extra class.
 */
function voa_icon( $name, $class = '' ) {
	echo voa_get_icon( $name, $class ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup.
}

/**
 * The four hero figures' icons, in order. Fixed and named, like the stage glyphs.
 *
 * @param int $index 0–3.
 * @return string
 */
function voa_hero_stat_icon( $index ) {
	$glyphs = array(
		'<rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2"/><path d="M3.4 9.8h17.2M8.2 3.2v4M15.8 3.2v4"/><path d="m9 15.1 2.2 2.2 4.2-4.6"/>',
		'<circle cx="12" cy="9.4" r="5.8"/><path d="m8.4 14.4-1.6 6.4 5.2-2.8 5.2 2.8-1.6-6.4"/><path d="m10.2 9.3 1.3 1.4 2.5-2.7"/>',
		'<path d="M4.2 9.2h13.4"/><path d="m14.4 5.6 3.6 3.6-3.6 3.6"/><path d="M19.8 15.2H6.4"/><path d="m9.6 11.6-3.6 3.6 3.6 3.6"/>',
		'<circle cx="9.4" cy="8.8" r="3.6"/><path d="M3.2 19.6c.9-3.4 3.3-5.3 6.2-5.3s5.3 1.9 6.2 5.3"/><path d="M16.2 6a3.3 3.3 0 0 1 0 5.8"/><path d="M18.1 14.1c2 .8 3.3 2.4 3.6 4.6"/>',
	);

	return isset( $glyphs[ $index ] ) ? voa_svg_icon( $glyphs[ $index ], '', '1.7' ) : '';
}

/**
 * The four About values' icons: Clarity, Accountability, Consistency, Client Care.
 *
 * @param int $index 0–3.
 * @return string
 */
function voa_value_icon( $index ) {
	$glyphs = array(
		'<path d="M9.2 18.4h5.6"/><path d="M10 21.2h4"/><path d="M12 3.2a6.2 6.2 0 0 1 3.7 11.2v1.2H8.3v-1.2A6.2 6.2 0 0 1 12 3.2Z"/>',
		'<path d="M12 3.2 20 6v6.1c0 4.1-3 7.2-8 8.7-5-1.5-8-4.6-8-8.7V6Z"/><path d="m8.8 12 2.3 2.3 4.3-4.7"/>',
		'<path d="M20.4 12a8.4 8.4 0 1 1-2.7-6.2"/><path d="M20.4 4.2v4.4H16"/><path d="M12 8v4.4l3 1.8"/>',
		'<path d="M12 20.2c-4.6-3-7.2-5.8-7.2-9a3.9 3.9 0 0 1 7.2-2.1 3.9 3.9 0 0 1 7.2 2.1c0 3.2-2.6 6-7.2 9Z"/>',
	);

	return isset( $glyphs[ $index ] ) ? voa_svg_icon( $glyphs[ $index ], '', '1.7' ) : '';
}

/**
 * The four managed-support stage glyphs, shared by the home journey and /how-it-works.
 *
 * @param int $index 0–3.
 * @return string
 */
function voa_stage_glyph( $index ) {
	$glyphs = array(
		'<path d="M11 5h10v3H11z"/><path d="M21 6.5h3.5v20h-17v-20H11"/><path d="M11.5 14h9M11.5 18.5h9M11.5 23h5.5"/>',
		'<circle cx="14" cy="13.5" r="8.5"/><path d="m20.2 19.7 5.8 5.8"/><circle cx="14" cy="10.5" r="2.2"/><path d="M10 18.2c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8"/>',
		'<path d="M6.5 8.5h12v15h-12z"/><path d="M13 16h12.5"/><path d="m21.5 12 4.5 4-4.5 4"/>',
		'<path d="M26 16a10 10 0 1 1-3.2-7.3"/><path d="M26 6v5h-5"/><path d="M16 11.5v5l3.5 2"/>',
	);

	if ( ! isset( $glyphs[ $index ] ) ) {
		return '';
	}

	return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' . $glyphs[ $index ] . '</svg>';
}

/**
 * The header's own phone mark — larger and heavier than the contact icon, so kept separate, as in
 * Header.tsx.
 *
 * @return string
 */
function voa_header_phone_icon() {
	return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>';
}

/**
 * The navigation dropdown chevron.
 *
 * @return string
 */
function voa_get_chevron() {
	return '<svg class="nav-chevron" viewBox="0 0 12 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg>';
}

/**
 * Service page: the small module mark inside each systems chip.
 *
 * @return string
 */
function voa_module_glyph() {
	return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2.5" y="2.5" width="11" height="11" rx="2.5"/><circle cx="8" cy="8" r="2" fill="currentColor" stroke="none"/></svg>';
}

/**
 * Service page: the layered stack at the centre of the systems diagram.
 *
 * @return string
 */
function voa_stack_glyph() {
	return '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14 3.5 24.5 9 14 14.5 3.5 9 14 3.5Z"/><path d="M3.5 14 14 19.5 24.5 14" opacity="0.72"/><path d="M3.5 19 14 24.5 24.5 19" opacity="0.45"/></svg>';
}

/**
 * Service page: the matched specialist at the hub of the fit diagram.
 *
 * @return string
 */
function voa_role_glyph() {
	return '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="14" cy="10.4" r="4.2"/><path d="M6.2 22.6c1.3-4 4.3-6.1 7.8-6.1s6.5 2.1 7.8 6.1"/><path d="M21.4 6.2 23.9 8.7 21.4 11.2" opacity="0.55"/><path d="M6.6 6.2 4.1 8.7l2.5 2.5" opacity="0.55"/></svg>';
}

/**
 * Service page: the generic person in the placeholder feedback cards.
 *
 * @return string
 */
function voa_person_glyph() {
	return '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg>';
}

/**
 * /why-voa: the two-way arrows at the centre of the ownership split.
 *
 * @return string
 */
function voa_ownership_glyph() {
	return '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h13M13 6l4 4-4 4"/><path d="M24 18H11M15 22l-4-4 4-4"/></svg>';
}

/**
 * Service page "when to hire" icons, resolved from each item's own wording.
 *
 * The port of ItemGlyphs.tsx. The four signals and four outcomes are in no fixed order across the ten
 * services, so an icon chosen by position would be wrong on most pages. The first matching rule wins;
 * the override table handles the lines a plain keyword match gets wrong; `check` is the fallback, so a
 * service whose copy changes still renders.
 *
 * @param string $text Item text.
 * @return string
 */
function voa_item_glyph( $text ) {
	$glyphs = array(
		'clock'    => '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.4V12l3 1.8"/>',
		'doc'      => '<path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8Z"/><path d="M14 3.5V8h4.5"/><path d="M8.75 12.5h6.5M8.75 16h4.5"/>',
		'check'    => '<circle cx="12" cy="12" r="8.5"/><path d="m8.4 12.2 2.5 2.5 4.7-5.1"/>',
		'eye'      => '<path d="M2.8 12S6.5 5.8 12 5.8 21.2 12 21.2 12 17.5 18.2 12 18.2 2.8 12 2.8 12Z"/><circle cx="12" cy="12" r="2.8"/>',
		'flow'     => '<path d="M3.5 8.5h11"/><path d="m11.6 5.4 3.1 3.1-3.1 3.1"/><path d="M20.5 15.5h-11"/><path d="m12.4 12.4-3.1 3.1 3.1 3.1"/>',
		'alert'    => '<path d="M12 4.2 21 19.4H3Z"/><path d="M12 10v3.6"/><circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none"/>',
		'calendar' => '<rect x="3.8" y="5.4" width="16.4" height="14.2" rx="1.8"/><path d="M3.8 10h16.4M8.4 3.6v3.4M15.6 3.6v3.4"/>',
		'people'   => '<circle cx="9.4" cy="9.2" r="3.4"/><path d="M3.4 19.4c.9-3.2 3.2-5 6-5s5.1 1.8 6 5"/><path d="M16 6.6a3.1 3.1 0 0 1 0 5.6M17.6 14.8c1.9.7 3.900000000000001 2.2 3 4.6"/>',
		'chart'    => '<path d="M3.6 19.4h16.8"/><path d="m6 15.4 4.2-4.3 3.2 2.9 5.2-5.8"/><path d="M14.5 7.6h4.1v4.1"/>',
		'systems'  => '<rect x="3.6" y="4.6" width="16.8" height="12" rx="1.8"/><path d="M8.4 20.4h7.2M12 16.6v3.8"/><path d="M8.2 8.8 6.4 10.6l1.8 1.8M15.8 8.8l1.8 1.8-1.8 1.8"/>',
	);

	$overrides = array(
		'You want recruitment, onboarding, and ongoing team support managed through one provider.' => 'people',
		'A more dependable buying experience'                => 'people',
		'A more consistent voice across website pages'       => 'doc',
		'Clearer explanations of your products and services' => 'doc',
		'Month-end reports need fewer corrections'           => 'doc',
		'Cash commitments are easier to review'              => 'chart',
		'More capacity to manage a growing loan pipeline.'   => 'chart',
	);

	/* First match wins, so the order is the priority order. */
	$rules = array(
		array( 'clock', array( 'taking time away', 'competing with', 'time away from', 'not enough writing capacity' ) ),
		array( 'systems', array( 'familiar', 'terminology', 'already understands', 'requires someone who' ) ),
		array( 'calendar', array( 'deadline', 'expiry', 'renewal', 'upcoming review', 'fall due', 'milestone', 'appointment', 'diary', 'calendar', 'scheduling' ) ),
		array( 'alert', array( 'bottleneck', 'error', '404', 'rework', 'broken', 'conflict', 'issue', 'avoidable', 'missed', 'delay', 'disruption', 'interrupting', 'unresolved', 'correction' ) ),
		array( 'eye', array( 'visibility', 'insight', 'can see', 'monitoring', 'tracking', 'identified sooner', 'warning', 'are visible' ) ),
		array( 'flow', array( 'progress', 'pipeline', 'handover', 'follow-through', 'follow-up', 'implementation', 'workflow', 'moving', 'launch', 'publication', 'checkout', 'onboarding' ) ),
		array( 'doc', array( 'document', 'file', 'record', 'report', 'listing', 'content', 'draft', 'article', 'invoic', 'bill', 'balance' ) ),
		array( 'people', array( 'client', 'customer', 'buyer', 'team', 'enquir', 'candidate', 'adviser', 'agent', 'broker', 'lead', 'prospect' ) ),
		array( 'chart', array( 'capacity', 'growing', 'sales', 'performance', 'traffic', 'figures', 'cash', 'campaign', 'channel' ) ),
		array( 'systems', array( 'crm', 'system', 'software', 'plugin', 'website', 'contact form', 'uptime', 'page speed', 'digital asset' ) ),
		array( 'clock', array( 'timely', 'sooner', 'consistent', 'regular', 'steadier', 'dependable', 'reliable', 'ongoing' ) ),
	);

	$key = isset( $overrides[ $text ] ) ? $overrides[ $text ] : '';

	if ( ! $key ) {
		$lower = strtolower( $text );

		foreach ( $rules as $rule ) {
			foreach ( $rule[1] as $phrase ) {
				if ( false !== strpos( $lower, $phrase ) ) {
					$key = $rule[0];
					break 2;
				}
			}
		}
	}

	return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' . $glyphs[ $key ? $key : 'check' ] . '</svg>';
}
