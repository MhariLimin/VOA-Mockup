import { Link } from 'react-router-dom';

export function ThankYouPage() {
  return (
    <section className="section utility-page">
      <div className="container narrow">
        <p className="eyebrow">Enquiry received</p>
        <h1>Thank you for contacting Virtual Office Angels.</h1>
        <p className="lead">Your form has been submitted.</p>
        <Link className="button" to="/">Return home</Link>
      </div>
    </section>
  );
}
