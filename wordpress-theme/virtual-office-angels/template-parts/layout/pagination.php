<?php
/**
 * Page buttons — Pagination in SourcePage.tsx. Renders nothing for a single page, as there.
 *
 * Buttons rather than links, because the React build pages in place without a reload, and the CSS
 * styles .pagination button. interactions.js re-renders this block when the page changes.
 *
 * Args:
 *   label  string  the nav's accessible name
 *   pages  int     page count
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

if ( $args['pages'] < 2 ) {
	return;
}
?>
<nav class="pagination" aria-label="<?php echo esc_attr( $args['label'] ); ?>">
	<button type="button" disabled><?php voa_icon( 'arrow-left' ); ?> Previous</button>
	<?php for ( $voa_n = 1; $voa_n <= $args['pages']; $voa_n++ ) : ?>
		<button type="button" class="<?php echo 1 === $voa_n ? 'active' : ''; ?>" aria-label="Page <?php echo (int) $voa_n; ?>"<?php echo 1 === $voa_n ? ' aria-current="page"' : ''; ?>><?php echo (int) $voa_n; ?></button>
	<?php endfor; ?>
	<button type="button">Next <?php voa_icon( 'arrow-right' ); ?></button>
</nav>
