<?php
/**
 * Site footer and document close — Footer.tsx.
 *
 * The bottom line still carries the prototype's verification notice, as the approved build does. It
 * has to be removed, or replaced with real legal links, before launch.
 *
 * @package voa
 */

defined( 'ABSPATH' ) || exit;
?>
</main>
<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<a aria-label="Virtual Office Angels home" href="<?php echo esc_url( voa_url( '/' ) ); ?>"><img class="footer-logo" src="<?php echo esc_url( voa_media_url( '/assets/voa-logo-dark.png' ) ); ?>" width="700" height="127" alt="Virtual Office Angels"></a>
			<p>Specialised virtual assistants with managed support for Australian businesses.</p>
		</div>
		<div><strong>Company</strong><a href="<?php echo esc_url( voa_url( '/about' ) ); ?>">About Us</a><a href="<?php echo esc_url( voa_url( '/why-voa' ) ); ?>">Managed Virtual Support</a><a href="<?php echo esc_url( voa_url( '/how-it-works' ) ); ?>">How It Works</a><a href="<?php echo esc_url( voa_url( '/client-stories' ) ); ?>">Testimonials</a></div>
		<div><strong>Explore</strong><a href="<?php echo esc_url( voa_url( '/services/mortgage-loans' ) ); ?>">Services</a><a href="<?php echo esc_url( voa_url( '/insights' ) ); ?>">Blog</a><a href="<?php echo esc_url( voa_url( '/videos' ) ); ?>">Videos</a><a href="<?php echo esc_url( voa_url( '/faqs' ) ); ?>">FAQs</a></div>
		<div class="footer-contact"><strong>Contact</strong><a href="tel:1300737883"><?php voa_icon( 'phone' ); ?>1 300 737 883</a><a href="mailto:clientcare@virtualofficeangels.com.au"><?php voa_icon( 'mail' ); ?>clientcare@virtualofficeangels.com.au</a><a href="<?php echo esc_url( voa_url( '/contact' ) ); ?>">Contact Us</a></div>
	</div>
	<div class="container footer-bottom">
		<span>Virtual Office Angels Pty. Ltd. · ABN 58 155 459 788</span>
		<span>Prototype content requires final Virtual Office Angels verification.</span>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
