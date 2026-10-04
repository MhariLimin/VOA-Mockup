<?php
/**
 * Stylesheet, script and font loading.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

/**
 * The stylesheets, in cascade order: the fonts, then the same four the React build loads in the same
 * sequence (regenerated from it by scripts/wordpress/export-content.mjs), then the few WordPress-only
 * rules.
 *
 * global.css is deliberately NOT split into base/layout/components/sections. Its order is
 * load-bearing: several rules sit where they do so they override an earlier one, and a few say so in
 * their own comments ("Declared here rather than with the other breakpoints, so they follow the rule
 * above"). Reordering 3,011 lines across five files to look tidier would risk breakage that is hard
 * to see and harder to trace. The section comments already make it navigable.
 */
const VOA_STYLES = array( 'fonts', 'tokens', 'themes', 'typography', 'global', 'wordpress' );

/**
 * Whether to load the self-hosted Manrope and Inter.
 *
 * Off, by decision of 2026-10-04. The approved React mockup names these faces but never loads them,
 * so it renders in the visitor's system font (Segoe UI on Windows) — and that is the design the client
 * approved. Loading them here made the theme the one thing that looked different. The files stay in
 * assets/fonts/; turning this on is the whole change if the design fonts are wanted later, and should
 * be done in the React build at the same time so the two stay identical.
 */
const VOA_LOAD_FONTS = false;

/**
 * The behaviour modules. Each replaces a React hook or component; see section 5 of
 * docs/wordpress-integration/reference/WORDPRESS_ARCHITECTURE.md for the mapping. All are plain
 * modules — no framework, no build step.
 */
const VOA_SCRIPTS = array( 'motion', 'theme-toggle', 'nav', 'reveal', 'backdrop-rotator', 'client-carousel', 'journey', 'accordion', 'interactions' );

/**
 * File modification time as the cache-busting version, so a changed file is never served stale and an
 * unchanged one keeps its cache. Falls back to the theme version if the file is missing.
 */
function voa_asset_version( $relative_path ) {
	$file = get_template_directory() . $relative_path;
	return file_exists( $file ) ? (string) filemtime( $file ) : wp_get_theme()->get( 'Version' );
}

/**
 * Front-end styles and scripts.
 */
function voa_enqueue_assets() {
	$styles = VOA_LOAD_FONTS ? VOA_STYLES : array_values( array_diff( VOA_STYLES, array( 'fonts' ) ) );

	foreach ( $styles as $index => $handle ) {
		$path = '/assets/css/' . $handle . '.css';

		wp_enqueue_style(
			'voa-' . $handle,
			get_theme_file_uri( $path ),
			// Each sheet depends on the one before it, which is what keeps the cascade order fixed.
			$index > 0 ? array( 'voa-' . $styles[ $index - 1 ] ) : array(),
			voa_asset_version( $path )
		);
	}

	foreach ( VOA_SCRIPTS as $handle ) {
		$path = '/assets/js/' . $handle . '.js';

		wp_enqueue_script(
			'voa-' . $handle,
			get_theme_file_uri( $path ),
			// motion.js reports prefers-reduced-motion; everything that animates waits for it.
			'motion' === $handle ? array() : array( 'voa-motion' ),
			voa_asset_version( $path ),
			array(
				'strategy'  => 'defer',
				'in_footer' => true,
			)
		);
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'voa_enqueue_assets' );

/**
 * Preload the two font faces that are visible in the first viewport.
 *
 * Self-hosted rather than loaded from Google: no third-party request, no visitor IPs leaving the
 * site, and the files are cached with everything else. Both faces are open-licensed, so this costs
 * nothing. Only the two weights used above the fold are preloaded — preloading everything would
 * compete with the hero image for bandwidth.
 */
function voa_preload_fonts() {
	if ( ! VOA_LOAD_FONTS ) {
		return;
	}

	$fonts = array(
		'/assets/fonts/manrope-variable.woff2',
		'/assets/fonts/inter-variable.woff2',
	);

	foreach ( $fonts as $font ) {
		if ( ! file_exists( get_template_directory() . $font ) ) {
			continue;
		}

		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_theme_file_uri( $font ) )
		);
	}
}
add_action( 'wp_head', 'voa_preload_fonts', 1 );

/**
 * Apply the stored theme before first paint.
 *
 * This has to be inline and in the head. Loading it as a normal script lets the page paint in light
 * mode first and then switch, which is a visible flash on every page load for anyone using the dark
 * theme. The localStorage key matches the React build so a visitor's choice carries over.
 */
function voa_theme_bootstrap() {
	?>
	<script>
		(function () {
			try {
				var stored = localStorage.getItem('voa-theme');
				var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
				document.documentElement.setAttribute('data-theme', theme);
			} catch (e) {
				document.documentElement.setAttribute('data-theme', 'light');
			}
		})();
	</script>
	<?php
}
add_action( 'wp_head', 'voa_theme_bootstrap', 2 );

/**
 * Editor styles, so the block editor shows the real typography and palette.
 */
function voa_enqueue_editor_assets() {
	wp_enqueue_style(
		'voa-editor',
		get_theme_file_uri( '/assets/css/editor.css' ),
		array(),
		voa_asset_version( '/assets/css/editor.css' )
	);
}
add_action( 'enqueue_block_editor_assets', 'voa_enqueue_editor_assets' );
