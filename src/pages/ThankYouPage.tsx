import { Link } from 'react-router-dom';

export function ThankYouPage() {
  return (
    <section className="l2-utility-page">
      <div className="l2-utility-number" aria-hidden="true">✓</div>
      <div className="container narrow">
        <p className="eyebrow">Enquiry received</p>
        <h1>Thank you for contacting Virtual Office Angels.</h1>
        <p>Your form has been submitted. The production version will state the verified response process and timeframe here.</p>
        <Link className="l2-inline-link" to="/">Return home <span>↗</span></Link>
      </div>
    </section>
  );
}
