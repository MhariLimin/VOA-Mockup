<?php
/**
 * Content-only editor for the fixed-layout design pages.
 *
 * Exported JSON remains the baseline. Approved copy and Media Library image replacements live in
 * WordPress options, so a theme update or a fresh export cannot erase editorial work.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/** Register a role that cannot edit templates, blocks, menus, or native pages. */
function voa_content_register_role() {
	if ( ! get_role( 'voa_content_editor' ) ) {
		add_role(
			'voa_content_editor',
			'VOA Content Editor',
			array(
				'read'             => true,
				'upload_files'     => true,
				'edit_voa_content' => true,
			)
		);
	}

	$administrator = get_role( 'administrator' );
	if ( $administrator && ! $administrator->has_cap( 'edit_voa_content' ) ) {
		$administrator->add_cap( 'edit_voa_content' );
	}
}
add_action( 'init', 'voa_content_register_role' );

/** The page and service destinations that have fixed-layout templates. */
function voa_content_entities() {
	$entities = array(
		'home'                    => 'Home',
		'services'                => 'Services overview',
		'about'                   => 'About',
		'how-it-works'            => 'How It Works',
		'managed-virtual-support' => 'Managed Virtual Support',
		'client-stories'          => 'Client Stories',
		'insights'                => 'Insights',
		'videos'                  => 'Videos',
		'faqs'                    => 'FAQs',
		'contact'                 => 'Contact',
		'thank-you'               => 'Thank You',
	);

	foreach ( voa_data_raw( 'pages' ) as $path => $page ) {
		if ( isset( $page['template'] ) && 'service' === $page['template'] && 0 === strpos( $path, '/services/' ) ) {
			$entities[ 'service:' . substr( $path, strlen( '/services/' ) ) ] = $page['title'];
		}
	}

	foreach ( voa_data_raw( 'locations' ) as $city => $page ) {
		$entities[ 'location:' . $city ] = 'City page: ' . $page['name'];
	}

	return $entities;
}

/** The designed page currently being rendered, if any. */
function voa_content_current_entity() {
	$post = get_queried_object();
	if ( ! $post instanceof WP_Post ) {
		return '';
	}
	$entity = 'voa_service' === $post->post_type ? 'service:' . $post->post_name : $post->post_name;
	if ( 'page' === $post->post_type && function_exists( 'voa_location_for_slug' ) && voa_location_for_slug( $post->post_name ) ) {
		$entity = 'location:' . voa_location_for_slug( $post->post_name );
	}
	$entities = voa_content_entities();
	return isset( $entities[ $entity ] ) ? $entity : '';
}

/** Whitelisted exported data slices owned by one page. Links and layout keys are never fields. */
function voa_content_groups( $entity ) {
	if ( 0 === strpos( $entity, 'service:' ) ) {
		$path = '/services/' . substr( $entity, strlen( 'service:' ) );
		return array(
			array( 'Page introduction', 'pages', array( $path ) ),
			array( 'Service sections', 'services', array( 'details', $path ) ),
		);
	}

	if ( 0 === strpos( $entity, 'location:' ) ) {
		$city = substr( $entity, strlen( 'location:' ) );
		return array(
			array( 'Hero', 'locations', array( $city, 'hero' ) ),
			array( 'Local clients', 'locations', array( $city, 'clients' ) ),
			array( 'Working hours', 'locations', array( $city, 'hours' ) ),
			array( 'Services', 'locations', array( $city, 'services' ) ),
			array( 'Client story', 'locations', array( $city, 'story' ) ),
			array( 'FAQs', 'locations', array( $city, 'faqs' ) ),
		);
	}

	$groups = array();
	if ( 'home' !== $entity && 'thank-you' !== $entity ) {
		$groups[] = array( 'Page introduction', 'pages', array( '/' . $entity ) );
	}

	switch ( $entity ) {
		case 'home':
			$groups[] = array( 'Hero copy', 'site', array( 'hero' ) );
			$groups[] = array( 'Hero images', 'site', array( 'heroBackgrounds' ) );
			$groups[] = array( 'Hero statistics', 'site', array( 'heroStats' ) );
			$groups[] = array( 'Home sections', 'home', array() );
			break;
		case 'about':
			$groups[] = array( 'Specialist websites', 'site', array( 'sisterSites' ) );
			break;
		case 'how-it-works':
			$groups[] = array( 'Process', 'process', array() );
			break;
		case 'managed-virtual-support':
			$groups[] = array( 'Managed support', 'managed', array() );
			break;
		case 'client-stories':
			$groups[] = array( 'Client logos', 'clients', array() );
			$groups[] = array( 'Testimonials', 'testimonials', array() );
			$groups[] = array( 'Client case study', 'caseStudy', array() );
			break;
		case 'faqs':
			$groups[] = array( 'Questions and answers', 'faqs', array() );
			break;
	}

	return $groups;
}

/** Ignore route and layout metadata, allowing copy and media only. */
function voa_content_is_locked_key( $key ) {
	return in_array(
		(string) $key,
		array( 'path', 'template', 'source', 'href', 'url', 'domain', 'seoTitle', 'metaDescription', 'number' ),
		true
	);
}

/** Turn an exported data slice into individual, stable fields. */
function voa_content_flatten( $value, $path, $label, &$fields ) {
	if ( is_array( $value ) ) {
		foreach ( $value as $key => $child ) {
			if ( voa_content_is_locked_key( $key ) ) {
				continue;
			}
			$part = is_int( $key ) ? 'Item ' . ( $key + 1 ) : ucwords( preg_replace( '/([a-z])([A-Z])/', '$1 $2', (string) $key ) );
			voa_content_flatten( $child, array_merge( $path, array( $key ) ), $label . ' / ' . $part, $fields );
		}
		return;
	}

	if ( ! is_string( $value ) ) {
		return;
	}

	$last = end( $path );
	$image = in_array( $last, array( 'image', 'logo', 'src' ), true ) || 0 === strpos( $value, '/assets/' );
	$key = 'data|' . implode( '|', $path );
	$fields[ $key ] = array(
		'label'   => $label,
		'default' => $value,
		'type'    => $image ? 'image' : 'text',
		'path'    => $path,
		'group'   => 'data',
	);
}

/** Hide exported values that are structural or never rendered on this page. */
function voa_content_field_is_rendered( $entity, $path ) {
	if ( 'faqs' === $entity && 'faqs' === $path[0] && 'topics' === $path[1] && isset( $path[3] ) && 'questions' === $path[3] ) {
		return false;
	}
	if ( 'managed-virtual-support' === $entity && 'managed' === $path[0] && 'page' === $path[1] && 'heroLead' === $path[2] ) {
		return false;
	}
	if ( 0 === strpos( $entity, 'service:' ) && 'pages' === $path[0] ) {
		return in_array( $path[2], array( 'eyebrow', 'image', 'imageAlt' ), true );
	}
	return true;
}

/** All editable fields on a designed page, including template copy registered separately. */
function voa_content_fields( $entity ) {
	$fields = array();
	foreach ( voa_content_groups( $entity ) as $group ) {
		list( $title, $data_name, $prefix ) = $group;
		$value = voa_data_raw( $data_name );
		foreach ( $prefix as $part ) {
			if ( ! is_array( $value ) || ! array_key_exists( $part, $value ) ) {
				continue 2;
			}
			$value = $value[ $part ];
		}
		voa_content_flatten( $value, array_merge( array( $data_name ), $prefix ), $title, $fields );
	}
	foreach ( $fields as $key => $field ) {
		if ( ! voa_content_field_is_rendered( $entity, $field['path'] ) ) {
			unset( $fields[ $key ] );
		}
	}

	if ( function_exists( 'voa_content_inline_defaults' ) ) {
		foreach ( voa_content_inline_defaults( $entity ) as $key => $field ) {
			$fields[ 'copy|' . $key ] = array(
				'label'   => $field[0],
				'default' => $field[1],
				'type'    => isset( $field[2] ) ? $field[2] : 'rich',
				'group'   => 'copy',
			);
		}
	}

	return $fields;
}

/** An option per page keeps edits separate and out of generated files. */
function voa_content_option_name( $entity ) {
	return 'voa_content_' . md5( $entity );
}

function voa_content_overrides( $entity ) {
	static $cache = array();
	if ( ! isset( $cache[ $entity ] ) ) {
		$stored = get_option( voa_content_option_name( $entity ), array() );
		$cache[ $entity ] = is_array( $stored ) ? $stored : array();
	}
	return $cache[ $entity ];
}

/** Set one existing data leaf, preserving array shape and section count. */
function voa_content_set_path( &$data, $path, $value ) {
	$node =& $data;
	foreach ( $path as $part ) {
		if ( ! is_array( $node ) || ! array_key_exists( $part, $node ) ) {
			return;
		}
		$node =& $node[ $part ];
	}
	if ( is_string( $node ) ) {
		$node = $value;
	}
}

/** Apply only saved, whitelisted fields from each page that owns this dataset. */
function voa_content_apply_data( $name, $data ) {
	$current = voa_content_current_entity();
	foreach ( voa_content_entities() as $entity => $title ) {
		if ( in_array( $name, array( 'pages', 'services' ), true ) && $entity !== $current && ! ( 'services' === $current && 0 === strpos( $entity, 'service:' ) ) ) {
			continue;
		}
		if ( 'site' === $name && 'home' !== $entity && $entity !== $current ) {
			continue;
		}
		$owns_data = false;
		foreach ( voa_content_groups( $entity ) as $group ) {
			if ( $name === $group[1] ) {
				$owns_data = true;
				break;
			}
		}
		if ( ! $owns_data ) {
			continue;
		}

		$overrides = voa_content_overrides( $entity );
		if ( ! $overrides ) {
			continue;
		}
		foreach ( voa_content_fields( $entity ) as $key => $field ) {
			if ( 'data' === $field['group'] && 0 === strpos( $key, 'data|' . $name . '|' ) && array_key_exists( $key, $overrides ) ) {
				voa_content_set_path( $data, array_slice( $field['path'], 1 ), $overrides[ $key ] );
			}
		}
	}
	return $data;
}

/** Return safe inline copy for a fixed template. */
function voa_content_copy( $entity, $key ) {
	$defaults = voa_content_inline_defaults( $entity );
	if ( ! isset( $defaults[ $key ] ) ) {
		return '';
	}
	$overrides = voa_content_overrides( $entity );
	$value = isset( $overrides[ 'copy|' . $key ] ) ? $overrides[ 'copy|' . $key ] : $defaults[ $key ][1];
	return wp_kses( $value, array( 'em' => array(), 'strong' => array(), 'br' => array() ) );
}

/** Plain copy for data lists that templates escape at output. */
function voa_content_plain( $entity, $key ) {
	return wp_strip_all_tags( voa_content_copy( $entity, $key ) );
}

/** Return an approved image path or Media Library attachment ID for an inline visual. */
function voa_content_image( $entity, $key ) {
	$defaults = voa_content_inline_defaults( $entity );
	if ( ! isset( $defaults[ $key ] ) || ! isset( $defaults[ $key ][2] ) || 'image' !== $defaults[ $key ][2] ) {
		return '';
	}
	$overrides = voa_content_overrides( $entity );
	return isset( $overrides[ 'copy|' . $key ] ) ? $overrides[ 'copy|' . $key ] : $defaults[ $key ][1];
}

/** Admin-only menu. No front-end editing controls are rendered. */
function voa_content_admin_menu() {
	$hook = add_menu_page( 'Website Content', 'Website Content', 'edit_voa_content', 'voa-content', 'voa_content_admin_screen', 'dashicons-edit-page', 22 );
	add_action( 'load-' . $hook, 'voa_content_admin_assets' );
}
add_action( 'admin_menu', 'voa_content_admin_menu' );

function voa_content_admin_assets() {
	wp_enqueue_media();
	wp_enqueue_script(
		'voa-content-editor',
		get_theme_file_uri( 'assets/js/content-editor.js' ),
		array( 'jquery', 'media-views' ),
		VOA_VERSION,
		true
	);
}

/** Screen listing every approved page or its field editor. */
function voa_content_admin_screen() {
	if ( ! current_user_can( 'edit_voa_content' ) ) {
		wp_die( esc_html__( 'You cannot edit website content.', 'voa' ), '', array( 'response' => 403 ) );
	}
	$entities = voa_content_entities();
	$entity = isset( $_GET['voa_page'] ) ? sanitize_text_field( wp_unslash( $_GET['voa_page'] ) ) : '';
	if ( ! $entity || ! isset( $entities[ $entity ] ) ) {
		echo '<div class="wrap"><h1>Website Content</h1><p>Choose a page to edit its copy and images. Layout, navigation, and links are locked.</p><ul>';
		foreach ( $entities as $key => $title ) {
			printf( '<li><a href="%s">%s</a></li>', esc_url( add_query_arg( array( 'page' => 'voa-content', 'voa_page' => $key ), admin_url( 'admin.php' ) ) ), esc_html( $title ) );
		}
		echo '</ul></div>';
		return;
	}

	$fields = voa_content_fields( $entity );
	$overrides = voa_content_overrides( $entity );
	echo '<div class="wrap"><h1>' . esc_html( $entities[ $entity ] ) . ' — Website Content</h1>';
	echo '<p><a href="' . esc_url( admin_url( 'admin.php?page=voa-content' ) ) . '">← All pages</a> · Only text and images below can change. Editing a field affects the live page after saving.</p>';
	if ( isset( $_GET['updated'] ) && '1' === $_GET['updated'] ) {
		echo '<div class="notice notice-success is-dismissible"><p>Page content saved.</p></div>';
	}
	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	echo '<input type="hidden" name="action" value="voa_save_content"><input type="hidden" name="voa_page" value="' . esc_attr( $entity ) . '">';
	wp_nonce_field( 'voa_save_content_' . $entity );

	$last_group = '';
	foreach ( $fields as $key => $field ) {
		$group = explode( ' / ', $field['label'], 2 )[0];
		if ( $group !== $last_group ) {
			echo '<h2 style="margin-top:2em">' . esc_html( $group ) . '</h2>';
			$last_group = $group;
		}
		$id = 'voa-' . md5( $key );
		$value = array_key_exists( $key, $overrides ) ? $overrides[ $key ] : $field['default'];
		$name = 'voa_fields[' . md5( $key ) . ']';
		echo '<div style="max-width:860px;margin:0 0 20px"><label for="' . esc_attr( $id ) . '"><strong>' . esc_html( $field['label'] ) . '</strong></label><br>';
		if ( 'image' === $field['type'] ) {
			$url = voa_media_url( $value );
			echo '<div class="voa-image-field" data-default="' . esc_attr( $field['default'] ) . '" data-default-url="' . esc_url( voa_media_url( $field['default'] ) ) . '">';
			echo '<input type="hidden" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $value ) . '">';
			echo '<img class="voa-image-preview" src="' . esc_url( $url ) . '" alt="" style="display:block;max-width:260px;max-height:140px;object-fit:contain;margin:8px 0;background:#f1f1f1">';
			echo '<button type="button" class="button voa-choose-image">Choose image</button> <button type="button" class="button voa-reset-image">Use original</button></div>';
		} elseif ( strlen( $field['default'] ) > 100 ) {
			echo '<textarea class="large-text" rows="4" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '">' . esc_textarea( $value ) . '</textarea>';
		} else {
			echo '<input class="regular-text" style="width:100%" type="text" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( $value ) . '">';
		}
		if ( 'rich' === $field['type'] ) {
			echo '<p class="description">Use &lt;em&gt;word&lt;/em&gt; to retain highlighted words.</p>';
		} elseif ( 'text' === $field['type'] && preg_match( '/\]\(|\*[^*]+\*/', $field['default'] ) ) {
			echo '<p class="description">Keep the marks: [link text](address) makes a link, and *word* highlights a word.</p>';
		}
		echo '</div>';
	}
	submit_button( 'Save page content' );
	echo '</form></div>';
}

/** Validate fields against exported defaults; ignore arbitrary submitted keys. */
function voa_content_save() {
	if ( ! current_user_can( 'edit_voa_content' ) ) {
		wp_die( esc_html__( 'You cannot edit website content.', 'voa' ), '', array( 'response' => 403 ) );
	}
	$entity = isset( $_POST['voa_page'] ) ? sanitize_text_field( wp_unslash( $_POST['voa_page'] ) ) : '';
	$entities = voa_content_entities();
	if ( ! isset( $entities[ $entity ] ) ) {
		wp_die( esc_html__( 'Unknown page.', 'voa' ), '', array( 'response' => 400 ) );
	}
	check_admin_referer( 'voa_save_content_' . $entity );

	$submitted = isset( $_POST['voa_fields'] ) && is_array( $_POST['voa_fields'] ) ? wp_unslash( $_POST['voa_fields'] ) : array();
	$overrides = array();
	foreach ( voa_content_fields( $entity ) as $key => $field ) {
		$id = md5( $key );
		if ( ! isset( $submitted[ $id ] ) || ! is_scalar( $submitted[ $id ] ) ) {
			continue;
		}
		$input = (string) $submitted[ $id ];
		if ( 'image' === $field['type'] ) {
			if ( $input === $field['default'] ) {
				continue;
			}
			$attachment = absint( $input );
			if ( ! $attachment || ! wp_attachment_is_image( $attachment ) ) {
				continue;
			}
			$value = $attachment;
		} elseif ( 'rich' === $field['type'] ) {
			$value = wp_kses( $input, array( 'em' => array(), 'strong' => array(), 'br' => array() ) );
		} else {
			$value = sanitize_textarea_field( $input );
		}
		if ( (string) $value !== (string) $field['default'] ) {
			$overrides[ $key ] = $value;
		}
	}
	update_option( voa_content_option_name( $entity ), $overrides, false );
	wp_safe_redirect( add_query_arg( array( 'page' => 'voa-content', 'voa_page' => $entity, 'updated' => '1' ), admin_url( 'admin.php' ) ) );
	exit;
}
add_action( 'admin_post_voa_save_content', 'voa_content_save' );
