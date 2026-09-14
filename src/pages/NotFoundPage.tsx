import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="l2-utility-page l2-not-found">
      <div className="l2-utility-number" aria-hidden="true">404</div>
      <div className="container narrow">
        <p className="eyebrow">404 - Page not found</p>
        <h1>That page is not available.</h1>
        <p>Use the navigation to continue, explore Virtual Office Angels services, or return to the homepage.</p>
        <div className="button-row">
          <Link className="button" to="/">Return home</Link>
          <Link className="button button-secondary" to="/services/mortgage-loans">Explore services</Link>
        </div>
      </div>
    </section>
  );
}
