import { ContactForm } from '../ui/ContactForm';
import { heroStats } from '../../content/homeContent';

export interface NextStepCopy {
  eyebrow: string;
  heading: string;
  text?: string;
}

const defaultNextStep: NextStepCopy = {
  eyebrow: 'Your next step',
  heading: 'Tell us what the right support would change for your business.',
  text: 'Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.',
};

/* Compact separator before the contact form: the four figures from the VOA Content homepage hero. */
export function VoaModelSection() {
  return <section className="voa-strip" aria-label="The Virtual Office Angels model"><div className="container voa-strip-grid"><p className="eyebrow">The Virtual Office Angels model</p>{heroStats.map(([value, label]) => <div className="voa-strip-item" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

export function NextStepSection({ copy = defaultNextStep, className }: { copy?: NextStepCopy; className?: string }) {
  return <section className={`section contact-section page-contact-section${className ? ` ${className}` : ''}`}><div className="container contact-grid"><aside><p className="eyebrow">{copy.eyebrow}</p><h2>{copy.heading}</h2>{copy.text && <p className="lead compact">{copy.text}</p>}<p className="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br /><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>;
}

export function PageClosing({ nextStep }: { nextStep?: NextStepCopy }) {
  return <><VoaModelSection /><NextStepSection copy={nextStep} /></>;
}
