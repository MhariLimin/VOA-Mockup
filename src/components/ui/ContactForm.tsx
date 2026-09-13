export function ContactForm() {
  return <form className="contact-form" action="/thank-you">
    <div className="field-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div>
    <label>Email<input type="email" name="email" autoComplete="email" required /></label>
    <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
    <label>How can we help?<textarea name="message" rows={6} required /></label>
    <label className="checkbox-field"><input type="checkbox" required /><span>I agree to the processing of my information for this enquiry.</span></label>
    <button className="button" type="submit">Send enquiry</button>
    <small>Prototype form only. Connect validation, spam protection, consent records, and WordPress form handling before launch.</small>
  </form>;
}
