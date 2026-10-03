<?php
/**
 * Search form.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;
?>
<form class="search-form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label>
		<span class="sr-only"><?php esc_html_e( 'Search this site', 'voa' ); ?></span>
		<input type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Search articles', 'voa' ); ?>">
	</label>
	<button class="button" type="submit"><?php esc_html_e( 'Search', 'voa' ); ?></button>
</form>
