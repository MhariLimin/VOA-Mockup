<?php
/**
 * Customizer fields.
 *
 * The small set of home-page and contact strings that the client edits but that are not posts. Real
 * content — services, testimonials, client logos, articles — lives in post types instead.
 *
 * Defaults match the approved React build exactly, so a fresh install renders the design rather than
 * empty boxes. Every default is the client's own supplied copy; none of it was written here.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Field definitions: id => [ label, default, type ].
 *
 * Kept as data rather than repeated register_setting calls, so adding a field is one line and
 * voa_option() can read any of them without a second list to keep in step.
 */
function voa_customizer_fields() {
	return array(
		// Contact details, used by the header, footer and every closing section.
		'voa_phone'          => array( __( 'Phone number', 'voa' ), '1 300 737 883', 'text' ),
		'voa_email'          => array( __( 'Email address', 'voa' ), 'clientcare@virtualofficeangels.com.au', 'text' ),
		'voa_abn'            => array( __( 'ABN line', 'voa' ), 'ABN 58 155 459 788', 'text' ),
		'voa_address'        => array( __( 'Street address', 'voa' ), "Ground Floor, 465 Victoria Avenue\nChatswood NSW 2067, Australia", 'textarea' ),

		// Hero.
		'voa_hero_eyebrow'   => array( __( 'Hero eyebrow', 'voa' ), 'Specialised virtual assistants, HR managed', 'text' ),
		'voa_hero_heading'   => array( __( 'Hero heading', 'voa' ), 'Get <em>Specialised</em> &amp; <em>HR Managed</em> Virtual Support!', 'textarea' ),
		'voa_hero_lead'      => array( __( 'Hero description', 'voa' ), '', 'textarea' ),

		// The four figures. Each is "figure|label" on its own line.
		'voa_figures'        => array(
			__( 'Proof figures, one per line as figure|label', 'voa' ),
			"15+ years|of helping Australian businesses\nTop 5%|hiring selection and requirements\n12 months|No-questions replacement guarantee\n100% managed|HR, payroll, and ongoing team support",
			'textarea',
		),
	);
}

/**
 * Read a Customizer value, falling back to its registered default.
 *
 * @param string $id Field id.
 * @return string
 */
function voa_option( $id ) {
	$fields = voa_customizer_fields();
	$default = isset( $fields[ $id ] ) ? $fields[ $id ][1] : '';

	return (string) get_theme_mod( $id, $default );
}

/**
 * Register the panel.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function voa_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'voa_site',
		array(
			'title'       => __( 'Virtual Office Angels', 'voa' ),
			'priority'    => 30,
			'description' => __( 'Contact details and the home page hero. Services, testimonials, client logos and articles are edited as posts.', 'voa' ),
		)
	);

	foreach ( voa_customizer_fields() as $id => $field ) {
		list( $label, $default, $type ) = $field;

		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $default,
				/*
				 * The heading and figures carry markup the design relies on — <em> for the accent
				 * words — so they cannot be stripped to plain text. wp_kses_post is the narrowest
				 * sanitiser that keeps them.
				 */
				'sanitize_callback' => 'textarea' === $type ? 'wp_kses_post' : 'sanitize_text_field',
				'transport'         => 'refresh',
			)
		);

		$wp_customize->add_control(
			$id,
			array(
				'label'   => $label,
				'section' => 'voa_site',
				'type'    => $type,
			)
		);
	}
}
add_action( 'customize_register', 'voa_customize_register' );

/**
 * The four proof figures, parsed from the Customizer field.
 *
 * @return array[] Each entry is [ figure, label ].
 */
function voa_figures() {
	$figures = array();

	foreach ( preg_split( '/\r\n|\r|\n/', voa_option( 'voa_figures' ) ) as $line ) {
		$line = trim( $line );

		if ( '' === $line ) {
			continue;
		}

		$parts = array_map( 'trim', explode( '|', $line, 2 ) );

		$figures[] = array(
			$parts[0],
			isset( $parts[1] ) ? $parts[1] : '',
		);
	}

	return $figures;
}
