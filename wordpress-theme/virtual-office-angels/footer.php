<?php
/**
 * Footer.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;

$voa_phone = get_theme_mod( 'voa_phone', '1 300 737 883' );
$voa_email = get_theme_mod( 'voa_email', 'clientcare@virtualofficeangels.com.au' );
$voa_abn   = get_theme_mod( 'voa_abn', 'ABN 58 155 459 788' );
?>
</main>

<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: company name. */ __( '%s home', 'voa' ), voa_company_name() ) ); ?>">
				<img
					class="footer-logo"
					src="<?php echo esc_url( get_theme_file_uri( '/assets/images/voa-logo-dark.png' ) ); ?>"
					width="700"
					height="127"
					alt="<?php echo esc_attr( voa_company_name() ); ?>"
				>
			</a>
			<p><?php esc_html_e( 'Specialised virtual assistants with managed support for Australian businesses.', 'voa' ); ?></p>
		</div>

		<?php
		/*
		 * The two link columns come from the Footer menu. WordPress has no notion of columns, so the
		 * menu is split in half here rather than asking the client to maintain a nesting depth.
		 */
		if ( has_nav_menu( 'footer' ) ) {
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => 'div',
					'container_class' => 'footer-links',
					'menu_class'     => 'footer-menu',
					'depth'          => 2,
				)
			);
		}
		?>

		<div class="footer-contact">
			<strong><?php esc_html_e( 'Contact', 'voa' ); ?></strong>
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $voa_phone ) ); ?>">
				<?php voa_icon( 'phone' ); ?><?php echo esc_html( $voa_phone ); ?>
			</a>
			<a href="mailto:<?php echo esc_attr( $voa_email ); ?>">
				<?php voa_icon( 'mail' ); ?><?php echo esc_html( $voa_email ); ?>
			</a>
			<?php
			$voa_contact = get_page_by_path( 'contact' );
			if ( $voa_contact ) :
				?>
				<a href="<?php echo esc_url( get_permalink( $voa_contact ) ); ?>"><?php esc_html_e( 'Contact Us', 'voa' ); ?></a>
			<?php endif; ?>
		</div>
	</div>

	<div class="container footer-bottom">
		<span>
			<?php
			printf(
				/* translators: 1: company name, 2: ABN. */
				esc_html__( '%1$s Pty. Ltd. · %2$s', 'voa' ),
				esc_html( voa_company_name() ),
				esc_html( $voa_abn )
			);
			?>
		</span>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
