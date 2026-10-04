<?php
/**
 * Document head and the fixed site header — Header.tsx.
 *
 * The navigation renders from data/site.json, the export of navigation.ts, rather than from a
 * WordPress menu. The Services entry is a two-column mega panel with group labels and a summary card,
 * which a WordPress menu has no fields for; reproducing it from a menu meant rebuilding the columns in
 * JavaScript after load, and the markup no longer matched the approved build. Changing the navigation
 * is therefore an edit to navigation.ts and a re-export, the same as any other copy.
 *
 * The data-theme attribute is set by the inline script in inc/enqueue.php before this markup paints.
 * nav.js and theme-toggle.js drive the menus and the theme switch.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_site = voa_data( 'site' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#f7f6f2">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
	<div class="container header-inner">
		<a class="brand" aria-label="Virtual Office Angels home" href="<?php echo esc_url( voa_url( '/' ) ); ?>">
			<img class="brand-mark-light" src="<?php echo esc_url( voa_media_url( '/assets/voa-logo.png' ) ); ?>" width="700" height="127" alt="">
			<img class="brand-mark-dark" src="<?php echo esc_url( voa_media_url( '/assets/voa-logo-dark.png' ) ); ?>" width="700" height="127" alt="">
		</a>
		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span aria-hidden="true"></span><span class="sr-only">Menu</span></button>
		<nav id="primary-navigation" class="primary-navigation" data-open="false" aria-label="Primary navigation">
			<ul class="nav-list">
				<?php foreach ( $voa_site['navigation'] as $voa_item ) : ?>
					<li>
						<?php if ( ! empty( $voa_item['children'] ) || ! empty( $voa_item['groups'] ) ) : ?>
							<div class="nav-group">
								<button class="nav-trigger" type="button" aria-expanded="false"><span><?php echo esc_html( $voa_item['label'] ); ?></span><?php echo voa_get_chevron(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?></button>
								<?php if ( ! empty( $voa_item['groups'] ) ) : ?>
									<div class="nav-popover nav-mega" data-open="false">
										<?php foreach ( $voa_item['groups'] as $voa_group ) : ?>
											<div class="nav-mega-column">
												<span class="nav-mega-label"><?php echo esc_html( $voa_group['label'] ); ?></span>
												<?php foreach ( $voa_group['items'] as $voa_child ) : ?>
													<a href="<?php echo esc_url( voa_url( $voa_child['href'] ) ); ?>"><?php echo esc_html( $voa_child['label'] ); ?></a>
												<?php endforeach; ?>
											</div>
										<?php endforeach; ?>
										<?php if ( ! empty( $voa_item['summary'] ) ) : ?>
											<?php $voa_summary = $voa_item['summary']; ?>
											<aside class="nav-mega-summary">
												<span class="nav-mega-kicker"><?php echo esc_html( $voa_summary['kicker'] ); ?></span>
												<h3><?php echo esc_html( $voa_summary['heading'] ); ?></h3>
												<p><?php echo esc_html( $voa_summary['text'] ); ?></p>
												<a class="nav-mega-link" href="<?php echo esc_url( voa_url( $voa_summary['href'] ) ); ?>"><?php echo esc_html( $voa_summary['linkLabel'] ); ?> <?php voa_icon( 'arrow-right' ); ?></a>
											</aside>
										<?php endif; ?>
									</div>
								<?php else : ?>
									<ul class="nav-popover" data-open="false">
										<?php foreach ( $voa_item['children'] as $voa_child ) : ?>
											<li><a href="<?php echo esc_url( voa_url( $voa_child['href'] ) ); ?>"><?php echo esc_html( $voa_child['label'] ); ?></a></li>
										<?php endforeach; ?>
									</ul>
								<?php endif; ?>
							</div>
						<?php else : ?>
							<a href="<?php echo esc_url( voa_url( $voa_item['href'] ) ); ?>"><?php echo esc_html( $voa_item['label'] ); ?></a>
						<?php endif; ?>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>
		<div class="header-actions">
			<button class="theme-toggle" type="button" aria-label="Use dark theme" title="Use dark theme"><span aria-hidden="true">☾</span></button>
			<a class="header-phone" href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">
				<?php echo voa_header_phone_icon(); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- static markup. ?>
				<span class="header-phone-text"><small>Call us</small><strong>1 300 737 883</strong></span>
			</a>
		</div>
	</div>
</header>
<main id="main-content" class="page-stage">
