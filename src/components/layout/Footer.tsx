import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon } from '../ui/Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" aria-label="Virtual Office Angels home">
            <img className="footer-logo" src="/assets/voa-logo-dark.png" width="700" height="127" alt="Virtual Office Angels" />
          </Link>
          <p>Specialised virtual assistants with managed support for Australian businesses.</p>
        </div>
        <div><strong>Company</strong><Link to="/about">About Us</Link><Link to="/why-voa">Managed Virtual Support</Link><Link to="/how-it-works">How It Works</Link><Link to="/client-stories">Testimonials</Link></div>
        <div><strong>Explore</strong><Link to="/services/mortgage-loans">Services</Link><Link to="/insights">Blog</Link><Link to="/videos">Videos</Link><Link to="/faqs">FAQs</Link></div>
        <div className="footer-contact"><strong>Contact</strong><a href="tel:1300737883"><PhoneIcon />1 300 737 883</a><a href="mailto:clientcare@virtualofficeangels.com.au"><MailIcon />clientcare@virtualofficeangels.com.au</a><Link to="/contact">Contact Us</Link></div>
      </div>
      <div className="container footer-bottom">
        <span>Virtual Office Angels Pty. Ltd. · ABN 58 155 459 788</span>
      </div>
    </footer>
  );
}
