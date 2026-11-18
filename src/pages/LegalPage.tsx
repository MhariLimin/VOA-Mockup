import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageClosing } from '../components/layout/PageClosing';

/* Privacy Policy and Terms of Use, added 8 November 2026 (the live website has neither). The wording is
   VA Paola's revision of 18 November 2026 (Virtual_Office_Angels_Privacy_Policy_and_Terms_of_Use.docx),
   applied as written. Treated as approved on 18 November 2026, so the draft note was removed; the
   effective date stays "[Publication date]" until the pages are published.

   Layout (18 November 2026): the article page's centred header, then the policy as one document card
   that opens with a numbered list of its sections. The numbers are decoration only (hidden from screen
   readers); no new visible copy. */

const company = 'Virtual Office Angels Pty Limited (ABN 58 155 459 788)';

type Section = [title: string, body: ReactNode];

const sectionId = (title: string) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const sectionNumber = (index: number) => String(index + 1).padStart(2, '0');

function External({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function ContactDetails() {
  return <p>
    <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a><br />
    <a href="tel:+611300737883">1300 737 883</a><br />
    Ground Floor, 465 Victoria Avenue, Chatswood NSW 2067, Australia
  </p>;
}

function LegalLayout({ title, sections }: { title: string; sections: Section[] }) {
  return <article className="legal-page">
    <header className="section blog-header legal-header">
      <div className="container narrow">
        <h1>{title}</h1>
        <div className="blog-meta"><span>Effective date [Publication date]</span></div>
      </div>
    </header>
    <section className="section legal-body">
      <div className="container legal-document">
        <nav className="legal-contents" aria-label={`${title} sections`}>
          <ol>
            {sections.map(([heading], index) => <li key={heading}>
              <a href={`#${sectionId(heading)}`}><span aria-hidden="true">{sectionNumber(index)}</span>{heading}</a>
            </li>)}
          </ol>
        </nav>
        <div className="article-content">
          {sections.map(([heading, body], index) => <section key={heading} className="legal-section">
            <span className="legal-number" aria-hidden="true">{sectionNumber(index)}</span>
            <h2 id={sectionId(heading)}>{heading}</h2>
            {body}
          </section>)}
        </div>
      </div>
    </section>
    <PageClosing />
  </article>;
}

const privacySections: Section[] = [
  ['About this policy', <>
    <p>{company} operates virtualofficeangels.com.au. This policy explains how we handle personal information when you visit our website or contact us through our enquiry form.</p>
  </>],
  ['Contact form information', <>
    <p>We collect the information you enter in the form. We ask for your first name, email address and a brief description of the support you need. You can also provide your last name, phone number, business name and industry.</p>
    <p>We use this information to respond to your enquiry, discuss the services that may suit your business and follow up about your request. We also hold any replies you send us about the enquiry. If you leave a required field blank, you won’t be able to submit the form.</p>
    <p>Please keep your enquiry to the support you need. Leave out passwords, identity documents, financial records and personal information about clients or staff.</p>
  </>],
  ['Website activity and Google Analytics', <>
    <p>We use Google Analytics to measure website traffic and understand how visitors find and use the site. We use its reports to improve the website.</p>
    <p>The tool uses cookies and similar technologies to collect usage data, such as pages viewed, how you arrived at the site, and browser and device details. Google may use your IP address to estimate your general location.</p>
    <p>Google receives this website activity data. Read <External href="https://policies.google.com/technologies/partner-sites?hl=en-AU">how Google uses information from sites that use its services</External>.</p>
    <p>Our website hosting and security systems may also record technical information, such as IP addresses and browser details, to keep the website operating and investigate security issues. The website may store settings, such as your display preference, in your browser.</p>
  </>],
  ['Your cookie choices', <>
    <p>You can block or delete cookies in your browser settings. Blocking some cookies may affect how the website works. On supported browsers, you can also use the <External href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</External>.</p>
  </>],
  ['Who we share information with', <>
    <p>The team members who handle your enquiry can access the information you provide. We hold enquiries and related correspondence in the systems we use to receive and respond to them.</p>
    <p>Our website hosting, security and email providers may handle the information they need to deliver those services. We may also share information where the law requires or authorises it.</p>
  </>],
  ['Overseas handling of information', <>
    <p>Google uses servers around the world and may process analytics data outside Australia.</p>
    <p>We have an office in Australia and an internal team in the Philippines. Team members in the Philippines may access your enquiry details when helping us respond to or follow up on your request.</p>
  </>],
  ['How we protect and retain information', <>
    <p>We take reasonable steps to protect the personal information we hold against loss, misuse and unauthorised access, changes or disclosure. We keep enquiry information for as long as we need it to handle the enquiry or as the law requires. We take reasonable steps to delete or de-identify it when we no longer need it and have no legal obligation to keep it.</p>
  </>],
  ['Access and correction', <>
    <p>Email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a> to ask for access to the personal information we hold about you or to request a correction. We may need to confirm your identity before we respond. We’ll respond within a reasonable time.</p>
  </>],
  ['Privacy complaints', <>
    <p>Contact us using the details below if you’re concerned about how we’ve handled your personal information. We’ll review your complaint and tell you the outcome and any steps we propose to take.</p>
  </>],
  ['Contact us', <ContactDetails />],
  ['Changes to this policy', <>
    <p>We’ll publish any updates to this policy on this page and revise the effective date.</p>
  </>],
];

const termsSections: Section[] = [
  ['About these terms', <>
    <p>These terms apply when you use virtualofficeangels.com.au, operated by {company}. If you engage us to provide services, the terms we agree with you separately apply to those services.</p>
  </>],
  ['Information on this website', <>
    <p>Our articles, videos, and service pages provide general information about our specialised virtual assistant recruitment services.</p>
    <p>If you need legal, financial or other professional advice for your circumstances, speak with a suitably qualified adviser. Service details published on the website may change, so contact us to confirm what we can offer your business.</p>
  </>],
  ['Using this website', <>
    <p>Use the website lawfully and provide accurate information when you submit an enquiry. Do not send spam or harmful material, try to gain unauthorised access, or interfere with the website or its security.</p>
  </>],
  ['Links to other websites', <>
    <p>We may link to third-party websites. Those websites are operated independently and have their own terms and privacy practices.</p>
  </>],
  ['Governing law and your rights', <>
    <p>The laws of New South Wales, Australia, govern these terms, subject to any applicable mandatory laws. Your rights and remedies under the Australian Consumer Law and other applicable laws continue to apply in full.</p>
  </>],
  ['Privacy', <>
    <p>See our <Link to="/privacy-policy">Privacy Policy</Link> for details about enquiry information, cookies and Google Analytics.</p>
  </>],
  ['Updates and contact', <>
    <p>We’ll publish updates on this page and revise the effective date. If you have a question about these terms, email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a> or call <a href="tel:+611300737883">1300 737 883</a>.</p>
  </>],
];

export function PrivacyPolicyPage() {
  return <LegalLayout title="Privacy Policy" sections={privacySections} />;
}

export function TermsOfUsePage() {
  return <LegalLayout title="Terms of Use" sections={termsSections} />;
}
