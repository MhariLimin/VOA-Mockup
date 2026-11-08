import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageClosing } from '../components/layout/PageClosing';

/* Privacy Policy and Terms of Use: mockup only, added 8 November 2026 as drafts for Ms Anne to review
   (the live website has neither). The copy was written for the mockup, not supplied by the client, so
   each page carries a draft note listing what Virtual Office Angels must confirm before it is used. */

const company = 'Virtual Office Angels Pty. Ltd. (ABN 58 155 459 788)';

function ContactDetails() {
  return <ul>
    <li>Email: <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></li>
    <li>Phone: <a href="tel:1300737883">1 300 737 883</a></li>
    <li>Post: Ground Floor, 465 Victoria Avenue, Chatswood NSW 2067, Australia</li>
  </ul>;
}

function LegalLayout({ eyebrow, title, toConfirm, children }: { eyebrow: string; title: string; toConfirm: string[]; children: ReactNode }) {
  return <article className="legal-page">
    <header className="section blog-header">
      <div className="container narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="blog-meta"><span>Draft, 8 November 2026</span></div>
      </div>
    </header>
    <section className="section blog-content-section">
      <div className="container narrow">
        <aside className="legal-draft-note">
          <strong>Draft for review.</strong> This page has not yet been approved by Virtual Office Angels or checked by a legal adviser. To confirm before it is published:
          <ul>{toConfirm.map((item) => <li key={item}>{item}</li>)}</ul>
        </aside>
        <div className="article-content">{children}</div>
      </div>
    </section>
    <PageClosing />
  </article>;
}

export function PrivacyPolicyPage() {
  return <LegalLayout eyebrow="Privacy Policy" title="How we handle your personal information." toConfirm={[
    'Whether team members or virtual assistants who handle client or enquiry information work outside Australia, and in which countries',
    'Which services hold enquiry and client details (for example email, a CRM or cloud storage)',
    'Whether Google Analytics or other tracking will be added to the website',
    'How long enquiries and client records are kept',
    'Who handles privacy requests and complaints',
  ]}>
    <h2>About this policy</h2>
    <p>{company} respects your privacy. This policy explains how we collect, use, store and share personal information through this website and in the course of our business, in line with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles.</p>

    <h2>Information we collect</h2>
    <p>When you send an enquiry through our website, we collect the details you enter: your name, email address, phone number, business name, industry and message.</p>
    <p>When you call or email us, or work with us as a client, we collect the information you choose to give us and the information we need to provide our services.</p>
    <p>When you visit the website, our hosting, security and analytics tools may record technical information, such as your IP address, browser type and the pages you view.</p>

    <h2>How we use it</h2>
    <ul>
      <li>To respond to your enquiry and discuss the support your business needs</li>
      <li>To provide and manage our services</li>
      <li>To keep the website secure and improve how it works</li>
      <li>To meet our legal obligations</li>
    </ul>
    <p>We do not sell or rent your personal information.</p>

    <h2>Cookies</h2>
    <p>The website uses cookies and similar technology to work properly, to stay secure and to remember your light or dark display setting. If we use analytics tools, they use cookies to tell us how visitors use the website. You can block or delete cookies in your browser settings, although some parts of the website may then not work as expected.</p>

    <h2>Who we share it with</h2>
    <p>We share personal information only with the people who need it to help you: our team, and the service providers that host our website and email or provide our security and analytics tools. Some of these providers may store information outside Australia. We may also disclose information where the law requires it.</p>

    <h2>Storing and protecting it</h2>
    <p>We take reasonable steps to protect personal information from misuse, loss and unauthorised access. We keep it only for as long as we need it for the purposes above or as the law requires.</p>

    <h2>Accessing or correcting your information</h2>
    <p>You can ask to see the personal information we hold about you, or ask us to correct it, by contacting us using the details below. We will respond within a reasonable time, usually 30 days.</p>

    <h2>Complaints</h2>
    <p>If you have a concern about how we have handled your personal information, please contact us first so we can look into it. If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au/" target="_blank" rel="noreferrer">www.oaic.gov.au</a>.</p>

    <h2>Contact us</h2>
    <ContactDetails />

    <h2>Changes to this policy</h2>
    <p>We may update this policy from time to time. The current version will always be on this page.</p>
  </LegalLayout>;
}

export function TermsOfUsePage() {
  return <LegalLayout eyebrow="Terms of Use" title="The terms for using our website." toConfirm={[
    'Whether client services are covered by a separate agreement, as the "Information on this website" section says',
    'New South Wales as the governing law',
  ]}>
    <h2>About these terms</h2>
    <p>These terms apply to your use of virtualofficeangels.com.au, which is operated by {company}. By using the website, you agree to these terms.</p>

    <h2>Information on this website</h2>
    <p>The information on this website, including our articles and videos, is general information only. It is not professional, financial or legal advice. We work to keep it accurate and current, but we cannot guarantee that it is complete or always up to date. Our services are provided under a separate agreement with each client.</p>

    <h2>Our content</h2>
    <p>The content of this website, including its text, images, videos, logo and design, belongs to Virtual Office Angels or is used with permission. You may view it and print it for your own reference. You may not copy, republish or sell it without our written permission.</p>

    <h2>Using the website</h2>
    <p>Please do not use the website for anything unlawful, try to interfere with how it works or its security, or submit false or misleading information through its forms.</p>

    <h2>Links to other websites</h2>
    <p>The website may link to other websites. We do not control them and are not responsible for their content or how they handle your information.</p>

    <h2>Liability</h2>
    <p>To the extent permitted by law, Virtual Office Angels is not liable for any loss or damage arising from your use of this website or your reliance on its information. Nothing in these terms excludes any rights you have under the Australian Consumer Law.</p>

    <h2>Privacy</h2>
    <p>How we handle your personal information is explained in our <Link to="/privacy-policy">Privacy Policy</Link>.</p>

    <h2>Changes to these terms</h2>
    <p>We may update these terms from time to time. The current version will always be on this page.</p>

    <h2>Governing law</h2>
    <p>These terms are governed by the laws of New South Wales, Australia.</p>

    <h2>Contact us</h2>
    <ContactDetails />
  </LegalLayout>;
}
