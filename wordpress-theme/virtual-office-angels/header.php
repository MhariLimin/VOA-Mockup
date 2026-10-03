<?php
/**
 * Header: document head, fixed site header and navigation.
 *
 * The data-theme attribute is set by the inline script in inc/enqueue.php, which runs before this
 * markup paints. Setting it here instead would flash light before switching to dark.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link sr-only" href="#main"><?php esc_html_e( 'Skip to content', 'voa' ); ?></a>

<header class="site-header">
	<div class="container header-inner">
		<?php voa_brand_logo(); ?>

		<button
			class="menu-toggle"
			type="button"
			aria-expanded="false"
			aria-controls="primary-navigation"
		>
			<span aria-hidden="true"></span>
			<span class="sr-only"><?php esc_html_e( 'Menu', 'voa' ); ?></span>
		</button>

		<nav
			class="primary-navigation"
			id="primary-navigation"
			data-open="false"
			aria-label="<?php esc_attr_e( 'Primary', 'voa' ); ?>"
		>
			<?php voa_primary_menu(); ?>
		</nav>

		<div class="header-actions">
			<?php
			/*
			 * The telephone number is the header's call to action. Revision W3-H1: a plain "Call us"
			 * label above it reads as more prominent than weight or size alone, both of which were
			 * rejected. The label is sourced from the production site's own title attribute.
			 */
			$voa_phone = get_theme_mod( 'voa_phone', '1 300 737 883' );
			?>
			<button
				class="theme-toggle"
				type="button"
				aria-pressed="false"
				aria-label="<?php esc_attr_e( 'Switch between light and dark theme', 'voa' ); ?>"
			>
				<span class="theme-toggle-mark" aria-hidden="true"></span>
			</button>

			<a class="header-phone" href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $voa_phone ) ); ?>">
				<?php voa_icon( 'phone' ); ?>
				<span>
					<small><?php esc_html_e( 'Call us', 'voa' ); ?></small>
					<strong><?php echo esc_html( $voa_phone ); ?></strong>
				</span>
			</a>
		</div>
	</div>
</header>

<main id="main">
