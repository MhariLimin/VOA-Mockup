/* Industry options follow the "Who we support" list in the client's About Us content document;
   the documents specify the dropdown but not its values. */
const industries = [
  'Mortgage and loans processing',
  'Financial planning administration',
  'Accounting and bookkeeping',
  'Real estate and administration',
  'Back-office support',
  'Digital marketing',
  'Sales and e-commerce',
  'Creative and business support',
  'Other',
] as const;

export function ContactForm() {
  return <form className="contact-form" action="/thank-you">
    <div className="field-row"><label>First name *<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" /></label></div>
    <div className="field-row"><label>Email *<input type="email" name="email" autoComplete="email" required /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label></div>
    <label>Business name<input name="businessName" autoComplete="organization" /></label>
    <label>Industry
      <select name="industry" defaultValue="">
        <option value="" disabled>Select your industry</option>
        {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
      </select>
    </label>
    <label>What support do you need? *<textarea name="message" rows={5} required /></label>
    <label className="checkbox-field"><input type="checkbox" required /><span>I agree to the processing of my information for this enquiry.</span></label>
    <button className="button" type="submit">Submit enquiry</button>
    <small>Prototype form only. Connect validation, spam protection, consent records, and WordPress form handling before launch.</small>
  </form>;
}
