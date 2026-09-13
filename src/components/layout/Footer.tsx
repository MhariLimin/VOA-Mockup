import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <strong>Virtual Office Angels</strong>
          <p>Specialist virtual assistants matched and managed for Australian businesses.</p>
        </div>
        <div><strong>Company</strong><Link to="/about">About Us</Link><Link to="/why-voa">Why Virtual Office Angels</Link><Link to="/how-it-works">How It Works</Link><Link to="/client-stories">Testimonials</Link></div>
        <div><strong>Explore</strong><Link to="/services/mortgage-loans">Services</Link><Link to="/insights">Blog</Link><Link to="/videos">Videos</Link><Link to="/faqs">FAQs</Link></div>
        <div><strong>Contact</strong><a href="tel:1300737883">1 300 737 883</a><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a><Link to="/contact">Contact Us</Link></div>
      </div>
      <div className="container footer-bottom">
        <span>Virtual Office Angels Pty. Ltd. · ABN 58 155 459 788</span>
        <span>Prototype content requires final Virtual Office Angels verification.</span>
      </div>
    </footer>
  );
}
