<?php
/**
 * SVG icons.
 *
 * The PHP port of the React build's Icons.tsx. Same paths, same viewBox, same stroke weights, so the
 * two renderings are pixel-identical.
 *
 * Every icon is drawn in `currentColor` and sized in `em`, so it inherits the colour, size and hover
 * transform of whatever it sits in. These replace typed characters (→ ↗ ← + ▶): a character falls
 * back to whatever font loads, sits on the text baseline rather than the optical centre, and changes
 * weight between the two themes.
 *
 * The check mark is deliberately absent — it is a CSS mask token (--icon-check), because it is used
 * as ::before content where an element cannot be inserted.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The icon set. Inner markup only; voa_icon() supplies the wrapper.
 *
 * Stroke weight follows size: inline marks render at about 1em and take 2, feature icons render at
 * 1.5–2.5rem and take 1.7.
 */
function voa_icon_paths() {
	static $icons = null;

	if ( null !== $icons ) {
		return $icons;
	}

	$icons = array(
		// Inline marks.
		'arrow-right'    => array( 2, '<path d="M4 12h14"/><path d="m12.5 6 6 6-6 6"/>' ),
		'arrow-left'     => array( 2, '<path d="M20 12H6"/><path d="m11.5 6-6 6 6 6"/>' ),
		'arrow-up-right' => array( 2, '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>' ),
		// CSS rotates this 45 degrees when an accordion opens, turning it into a close mark, so the
		// two strokes must be the same length and centred.
		'plus'           => array( 2, '<path d="M12 5.5v13"/><path d="M5.5 12h13"/>' ),

		// Contact details.
		'phone'          => array( 1.7, '<path d="M6.4 3.6h3.1l1.5 3.9-2 1.4a12.3 12.3 0 0 0 6.1 6.1l1.4-2 3.9 1.5v3.1a1.8 1.8 0 0 1-2 1.8C11.7 18.8 5.2 12.3 4.6 5.6a1.8 1.8 0 0 1 1.8-2Z"/>' ),
		'mail'           => array( 1.7, '<rect x="3" y="5.4" width="18" height="13.2" rx="1.8"/><path d="m3.8 6.8 8.2 6 8.2-6"/>' ),
		'pin'            => array( 1.7, '<path d="M12 21.2c4.2-4.6 6.3-8 6.3-10.4a6.3 6.3 0 1 0-12.6 0c0 2.4 2.1 5.8 6.3 10.4Z"/><circle cx="12" cy="10.6" r="2.4"/>' ),
		'building'       => array( 1.7, '<path d="M4.2 20.4V5.4a1.4 1.4 0 0 1 1.4-1.4h8.2a1.4 1.4 0 0 1 1.4 1.4v15"/><path d="M15.2 10.2h3.2a1.4 1.4 0 0 1 1.4 1.4v8.8"/><path d="M3 20.4h18"/><path d="M7.6 8h4M7.6 12h4M7.6 16h4"/>' ),

		// The four hero figures, in order: years, selection, replacement guarantee, managed support.
		'stat-years'     => array( 1.7, '<rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2"/><path d="M3.4 9.8h17.2M8.2 3.2v4M15.8 3.2v4"/><path d="m9 15.1 2.2 2.2 4.2-4.6"/>' ),
		'stat-top'       => array( 1.7, '<circle cx="12" cy="9.4" r="5.8"/><path d="m8.4 14.4-1.6 6.4 5.2-2.8 5.2 2.8-1.6-6.4"/><path d="m10.2 9.3 1.3 1.4 2.5-2.7"/>' ),
		'stat-swap'      => array( 1.7, '<path d="M4.2 9.2h13.4"/><path d="m14.4 5.6 3.6 3.6-3.6 3.6"/><path d="M19.8 15.2H6.4"/><path d="m9.6 11.6-3.6 3.6 3.6 3.6"/>' ),
		'stat-managed'   => array( 1.7, '<circle cx="9.4" cy="8.8" r="3.6"/><path d="M3.2 19.6c.9-3.4 3.3-5.3 6.2-5.3s5.3 1.9 6.2 5.3"/><path d="M16.2 6a3.3 3.3 0 0 1 0 5.8"/><path d="M18.1 14.1c2 .8 3.3 2.4 3.6 4.6"/>' ),

		// The four About values, in order: Clarity, Accountability, Consistency, Client Care.
		'value-clarity'  => array( 1.7, '<path d="M9.2 18.4h5.6"/><path d="M10 21.2h4"/><path d="M12 3.2a6.2 6.2 0 0 1 3.7 11.2v1.2H8.3v-1.2A6.2 6.2 0 0 1 12 3.2Z"/>' ),
		'value-account'  => array( 1.7, '<path d="M12 3.2 20 6v6.1c0 4.1-3 7.2-8 8.7-5-1.5-8-4.6-8-8.7V6Z"/><path d="m8.8 12 2.3 2.3 4.3-4.7"/>' ),
		'value-consist'  => array( 1.7, '<path d="M20.4 12a8.4 8.4 0 1 1-2.7-6.2"/><path d="M20.4 4.2v4.4H16"/><path d="M12 8v4.4l3 1.8"/>' ),
		'value-care'     => array( 1.7, '<path d="M12 20.2c-4.6-3-7.2-5.8-7.2-9a3.9 3.9 0 0 1 7.2-2.1 3.9 3.9 0 0 1 7.2 2.1c0 3.2-2.6 6-7.2 9Z"/>' ),
	);

	return $icons;
}

/**
 * Return an icon's markup.
 *
 * Decorative by default: in every current use the neighbouring text already carries the meaning, so
 * the icon is hidden from assistive technology. Pass $label to make it meaningful instead.
 *
 * @param string $name  Icon key from voa_icon_paths().
 * @param string $class Extra class names.
 * @param string $label Accessible name. Empty means decorative.
 * @return string
 */
function voa_get_icon( $name, $class = '', $label = '' ) {
	$icons = voa_icon_paths();

	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}

	list( $weight, $paths ) = $icons[ $name ];

	$attrs = $label
		? sprintf( 'role="img" aria-label="%s"', esc_attr( $label ) )
		: 'aria-hidden="true" focusable="false"';

	return sprintf(
		'<svg class="%s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" %s>%s</svg>',
		esc_attr( trim( 'icon ' . $class ) ),
		esc_attr( (string) $weight ),
		$attrs, // Fixed strings above, not user input.
		$paths  // Static markup from this file.
	);
}

/**
 * Echo an icon.
 *
 * @param string $name  Icon key.
 * @param string $class Extra class names.
 * @param string $label Accessible name.
 */
function voa_icon( $name, $class = '', $label = '' ) {
	echo voa_get_icon( $name, $class, $label ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup.
}

/**
 * The play mark is filled rather than stroked, so it does not fit the shared wrapper.
 */
function voa_get_play_icon( $class = '' ) {
	return sprintf(
		'<svg class="%s" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8.5 5.6a.6.6 0 0 1 .92-.5l8.1 5.9a.6.6 0 0 1 0 1l-8.1 5.9a.6.6 0 0 1-.92-.5Z"/></svg>',
		esc_attr( trim( 'icon ' . $class ) )
	);
}
