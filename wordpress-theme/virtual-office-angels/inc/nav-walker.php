<?php
/**
 * Primary navigation walker.
 *
 * Replaces Max Mega Menu. Produces the same markup the React Header renders, so the existing CSS and
 * the nav.js behaviour module work unchanged:
 *
 *   <ul class="nav-list">
 *     <li>
 *       <button class="nav-trigger" aria-expanded="false">Label</button>
 *       <ul class="nav-popover" data-open="false"> … </ul>
 *     </li>
 *   </ul>
 *
 * A top-level item with children renders a <button>, not a link. That is deliberate: it opens a panel
 * rather than navigating, and a button is what assistive technology expects for that. Top-level items
 * without children render an ordinary link.
 *
 * The Services mega menu — two columns of five — is built by nav.js from the flat child list, because
 * WordPress menus have no concept of columns and asking the client to maintain a nesting depth to get
 * them would be fragile.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * Walker for the primary menu.
 */
class VOA_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * Open a submenu level.
	 *
	 * @param string   $output Menu markup, by reference.
	 * @param int      $depth  Current depth.
	 * @param stdClass $args   Menu arguments.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		if ( 0 !== $depth ) {
			// Only one level of dropdown is supported by the design.
			return;
		}

		$output .= '<ul class="nav-popover" data-open="false">';
	}

	/**
	 * Close a submenu level.
	 *
	 * @param string   $output Menu markup, by reference.
	 * @param int      $depth  Current depth.
	 * @param stdClass $args   Menu arguments.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		if ( 0 !== $depth ) {
			return;
		}

		$output .= '</ul>';
	}

	/**
	 * Render one item.
	 *
	 * @param string   $output Menu markup, by reference.
	 * @param WP_Post  $item   Menu item.
	 * @param int      $depth  Current depth.
	 * @param stdClass $args   Menu arguments.
	 * @param int      $id     Item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes     = empty( $item->classes ) ? array() : (array) $item->classes;
		$has_children = in_array( 'menu-item-has-children', $classes, true );
		$is_current   = in_array( 'current-menu-item', $classes, true )
			|| in_array( 'current-menu-ancestor', $classes, true );

		if ( 0 === $depth ) {
			$output .= sprintf(
				'<li class="%s"%s>',
				esc_attr( $has_children ? 'nav-item has-children' : 'nav-item' ),
				$is_current ? ' data-current="true"' : ''
			);

			if ( $has_children ) {
				// A panel trigger, not a link: it opens a menu rather than navigating.
				$output .= sprintf(
					'<button class="nav-trigger" type="button" aria-expanded="false">%s%s</button>',
					esc_html( $item->title ),
					voa_get_icon( 'plus', 'nav-caret' )
				);
				return;
			}
		} else {
			$output .= '<li>';
		}

		$output .= sprintf(
			'<a href="%s"%s%s>%s</a>',
			esc_url( $item->url ),
			$item->target ? ' target="' . esc_attr( $item->target ) . '"' : '',
			$item->xfn ? ' rel="' . esc_attr( $item->xfn ) . '"' : '',
			esc_html( $item->title )
		);
	}
}

/**
 * Render the primary menu, or a hint when none is assigned.
 *
 * A fresh install has no menu, and silently rendering nothing makes the theme look broken rather than
 * unconfigured. The notice is only shown to users who can actually fix it.
 */
function voa_primary_menu() {
	if ( has_nav_menu( 'primary' ) ) {
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'nav-list',
				'depth'          => 2,
				'walker'         => new VOA_Nav_Walker(),
			)
		);
		return;
	}

	if ( current_user_can( 'edit_theme_options' ) ) {
		printf(
			'<p class="nav-empty"><a href="%s">%s</a></p>',
			esc_url( admin_url( 'nav-menus.php' ) ),
			esc_html__( 'Assign a menu to the Primary location', 'voa' )
		);
	}
}
