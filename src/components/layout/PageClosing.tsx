import { ContactForm } from '../ui/ContactForm';

const modelPillars = [
  ['Specialist matching', 'Candidates are considered against the role, industry, systems, and preferred working style.'],
  ['Australian-managed', 'Clients have an Australian-based contact supporting communication and expectations.'],
  ['End-to-end support', 'Recruitment, onboarding, feedback, performance, and continuity sit within one service.'],
] as const;

export function VoaModelSection() {
  return <section className="section voa-model-section"><div className="container voa-model-heading"><p className="eyebrow">The Virtual Office Angels model</p><h2>Matched around more than a job title.</h2></div><div className="container voa-model-grid">{modelPillars.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

export function NextStepSection() {
  return <section className="section contact-section page-contact-section"><div className="container contact-grid"><aside><p className="eyebrow">Your next step</p><h2>Tell us what the right support would change for your business.</h2><p className="lead compact">Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.</p><p className="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br /><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>;
}

export function PageClosing() {
  return <><VoaModelSection /><NextStepSection /></>;
}
