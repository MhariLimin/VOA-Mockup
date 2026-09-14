import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { ContactForm } from '../components/ui/ContactForm';
import { articleCategory, blogArticles, formatArticleDate } from '../content/blogContent';
import { sourceFaqs } from '../content/faqContent';
import { processSteps } from '../content/homeContent';
import { servicePages, type SourcePageBrief } from '../content/sourcePages';
import { testimonials } from '../content/testimonials';

const benefits = [
  ['Specialist matching', 'Candidates are considered against the role, industry, systems, and preferred working style.'],
  ['Australian-managed', 'Clients have an Australian-based contact supporting communication and expectations.'],
  ['End-to-end support', 'Recruitment, onboarding, feedback, performance, and continuity sit within one service.'],
  ['Team leader oversight', 'Team leaders support day-to-day delivery and communication across the working relationship.'],
  ['Administration handled', 'Employment administration, agreements, payroll, and related processes are managed for you.'],
  ['Continuity planning', 'Backup support can be coordinated when an assigned assistant is unavailable.'],
] as const;

function PageMasthead({ page, serviceIndex, showImage = true }: { page: SourcePageBrief; serviceIndex?: string; showImage?: boolean; index?: string }) {
  const isService = page.template === 'service' && page.image;
  return (
    <header className={`l2-masthead${isService ? ' l2-service-masthead' : ''}`}>
      {isService && <div className="l2-service-masthead-bg" style={{ backgroundImage: `url(${page.image})` }} aria-hidden="true" />}
      <div className="container l2-masthead-grid">
        <div className="l2-page-accent" aria-hidden="true">{serviceIndex && <span>{serviceIndex}</span>}</div>
        <div className="l2-masthead-copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p></div>
        {!isService && page.template !== 'about' && showImage && page.image && <figure className="l2-masthead-media"><img src={page.image} alt={page.imageAlt ?? ''} /></figure>}
      </div>
    </header>
  );
}

function ContactEnding() {
  return (
    <section className="l2-contact-ending">
      <div className="container l2-contact-layout">
        <div><p className="eyebrow">Start with a clear brief</p><h2>Tell us where your team needs more capacity.</h2><p>Share the work, systems, hours, and experience you need. Virtual Office Angels will help shape the next step.</p></div>
        <ContactForm />
      </div>
    </section>
  );
}

function ServicePage({ page }: { page: SourcePageBrief }) {
  const serviceIndex = String(servicePages.findIndex((service) => service.path === page.path) + 1).padStart(2, '0');
  return <><PageMasthead page={page} serviceIndex={serviceIndex} /><section className="l2-service-scope"><div className="container l2-scope-grid"><div className="l2-sticky-heading"><p className="eyebrow">Where support helps</p><h2>Specialist attention for work that cannot afford loose ends.</h2>{page.detail?.map((text) => <p key={text}>{text}</p>)}</div><ol className="l2-task-list">{page.tasks?.map((task, index) => <li key={task}><span>{String(index + 1).padStart(2, '0')}</span><strong>{task}</strong></li>)}</ol></div></section><section className="l2-method-band"><div className="container l2-method-grid">{benefits.slice(0, 3).map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><ContactEnding /></>;
}

function ServicesPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} /><section className="l2-services-index"><div className="container"><div className="l2-services-list">{servicePages.map((service, index) => <Link to={service.path} key={service.path}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{service.title}</h2><p>{service.summary}</p></div><img src={service.image} alt="" loading="lazy" /><i aria-hidden="true">↗</i></Link>)}</div></div></section><ContactEnding /></>;
}

function AboutPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} /><section className="l2-story" id="story"><div className="container l2-story-grid"><p className="l2-vertical-label">Our story</p><div><h2>A smarter response to the pressure on business owners.</h2><p>Virtual Office Angels was founded by Anne Villavieja, a seasoned Australian human resources professional with over 35 years of experience.</p><p>After witnessing the pressure on business owners to manage administration, grow their brand, and serve clients, she saw a smarter solution: pair them with talented Filipino professionals who genuinely fit their needs.</p><p>Virtual Office Angels carefully matches and manages virtual assistants so they can become a seamless part of each client’s team.</p></div></div></section><section className="l2-founder" id="leadership"><div className="container l2-founder-grid"><figure><img src={page.image} alt={page.imageAlt} /></figure><div><p className="eyebrow">Founder and leadership</p><h2>Meet Anne Villavieja.</h2><p className="l2-pullquote">“The right person can change the rhythm of an entire business.”</p><p>Anne’s background in recruitment, team building, and performance management shapes a service built around people, fit, and ongoing support.</p><div className="l2-facts">{page.detail?.map((item) => <span key={item}>{item}</span>)}</div></div></div></section><ContactEnding /></>;
}

function ProcessPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} index="02" /><section className="l2-process"><div className="container"><ol>{processSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div><i aria-hidden="true">→</i></li>)}</ol></div></section><ContactEnding /></>;
}

function WhyPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} index="03" /><section className="l2-principles"><div className="container l2-principle-grid">{benefits.map(([title, text], index) => <article className={`l2-principle-${index + 1}`} key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section><section className="l2-statement"><div className="container"><p>More capacity for the work that moves your business forward.</p></div></section><ContactEnding /></>;
}

function StoriesPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} index="04" /><section className="l2-logo-stage"><div className="container"><ClientCarousel /></div></section><section className="l2-testimonials"><div className="container"><div className="l2-section-intro"><p className="eyebrow">Client voices</p><h2>Experience, in their words.</h2></div><div className="l2-quote-grid">{testimonials.map((item, index) => <figure key={item.name} className={`l2-quote-${index + 1}`}><blockquote>“{item.quote}”</blockquote><figcaption><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></figcaption></figure>)}</div></div></section><ContactEnding /></>;
}

function InsightsPage({ page }: { page: SourcePageBrief }) {
  const categories = ['All insights', ...new Set(blogArticles.map(articleCategory))];
  const [active, setActive] = useState('All insights');
  const visible = active === 'All insights' ? blogArticles : blogArticles.filter((article) => articleCategory(article) === active);
  return <><PageMasthead page={page} index="05" /><section className="l2-journal"><div className="container"><div className="l2-journal-filters">{categories.map((category) => <button className={active === category ? 'active' : ''} type="button" onClick={() => setActive(category)} key={category}>{category}</button>)}</div><div className="l2-journal-list">{visible.map((article, index) => <Link to={`/insights/${article.slug}`} key={article.slug}><span className="l2-journal-number">{String(index + 1).padStart(2, '0')}</span><img src={article.featuredImage} alt="" loading="lazy" /><span><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><strong>{article.title}</strong></span><i>↗</i></Link>)}</div></div></section></>;
}

function VideosPage({ page }: { page: SourcePageBrief }) {
  const videos = ['Choosing the right virtual assistant', 'Preparing your business to delegate', 'Building a strong remote working rhythm'];
  return <><PageMasthead page={page} index="06" /><section className="l2-videos"><div className="container">{videos.map((title, index) => <article key={title}><div><span>0{index + 1}</span><button type="button" aria-label={`Play ${title}`}>▶</button></div><h2>{title}</h2><p>Practical guidance for building and supporting an effective remote working relationship.</p></article>)}</div></section></>;
}

function FaqPage({ page }: { page: SourcePageBrief }) {
  return <><PageMasthead page={page} index="07" /><section className="l2-faq"><div className="container l2-faq-layout"><aside><p className="eyebrow">Need something specific?</p><h2>Start with the essentials.</h2><Link className="l2-inline-link" to="/contact">Ask the team <span>↗</span></Link></aside><div>{sourceFaqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></div></section></>;
}

function ContactPage({ page }: { page: SourcePageBrief }) {
  return <section className="l2-contact-page"><div className="container l2-contact-page-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p><dl><div><dt>Call</dt><dd><a href="tel:1300737883">1 300 737 883</a></dd></div><div><dt>Email</dt><dd><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></dd></div></dl></div><ContactForm /></div></section>;
}

export function SourcePage({ page }: { page: SourcePageBrief }) {
  switch (page.template) {
    case 'services': return <ServicesPage page={page} />;
    case 'service': return <ServicePage page={page} />;
    case 'about': return <AboutPage page={page} />;
    case 'process': return <ProcessPage page={page} />;
    case 'why': return <WhyPage page={page} />;
    case 'stories': return <StoriesPage page={page} />;
    case 'insights': return <InsightsPage page={page} />;
    case 'videos': return <VideosPage page={page} />;
    case 'faqs': return <FaqPage page={page} />;
    case 'contact': return <ContactPage page={page} />;
    default: return null;
  }
}
