import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { articleCategory, blogArticles, formatArticleDate } from '../content/blogContent';
import { sourceFaqs } from '../content/faqContent';
import { processSteps } from '../content/homeContent';
import { servicePages, type SourcePageBrief } from '../content/sourcePages';
import { ClientCarousel } from '../components/ui/ClientCarousel';

const benefits = [
  ['Specialist matching', 'Candidates are considered against the role, industry, systems, and preferred working style.'],
  ['Australian-managed', 'Clients have an Australian-based contact supporting communication and expectations.'],
  ['End-to-end support', 'Recruitment, onboarding, feedback, performance, and continuity sit within one service.'],
  ['Team leader oversight', 'Team leaders support day-to-day delivery and communication across the working relationship.'],
  ['Administration handled', 'Employment administration, agreements, payroll, and related processes are managed for you.'],
  ['Continuity planning', 'Backup support can be coordinated when an assigned assistant is unavailable.'],
] as const;

const legacyTestimonials = [
  { name: 'Paul Godden', role: 'Managing Director, Vision Quest Video Productions', quote: 'With Anne’s expertise in HR Management, the process of hiring through Virtual Office Angels was both easy and efficient. My Virtual Assistant is outstanding! She saves me time, does a fantastic job and is proving invaluable to my business. As a result, I now have more time to attend to expanding the business and to tremendously increase the amount of money I can earn. Great service! Fantastic support! I unreservedly recommend the Virtual Office Angels services to anyone or any business that is struggling with time and needs quality and reliable support.' },
  { name: 'Paul Bradley', role: 'Branch General Manager, CRG (Elite Group)', quote: 'Being an Australian company and dealing with Virtual Office Angels, you get face to face with a person experienced in HR who can put a team together for you and custom fit it for your business. The service is excellent due to the team’s ability to select and get the right people for the right match—for each organisation. It has been an outstanding service!' },
  { name: 'Karen Robertson', role: 'Children’s Book Author, Treasure Kai series', quote: 'Thank you for all the work you have done. I have been working with Marie and she has been absolutely fantastic; she is very proactive and does her job very efficiently. Another good thing is that if Marie was not available, there was always backup on hand, so I had complete peace of mind working with Virtual Office Angels.' },
  { name: 'John Dwyer', role: 'Business Marketing Consultant and Owner, The Institute of Wow', quote: 'I have a 100% satisfaction rate with the wonderful service that I am receiving. I recommend that if you are looking for virtual assistance to help you grow your business, look no further than Virtual Office Angels. To me, they get 10 out of 10.' },
] as const;

const testimonials = legacyTestimonials.map((testimonial) => ({
  ...testimonial,
  initials: testimonial.name.split(' ').map((part) => part[0]).join('').slice(0, 2),
}));

function Hero({ page, aside }: { page: SourcePageBrief; aside?: ReactNode }) {
  const expressive = page.template === 'about' || page.template === 'service';
  return <section className={`section inner-hero${expressive ? '' : ' compact-inner-hero'}`}><div className="container inner-hero-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p>{page.template === 'about' && <div className="button-row"><a className="button" href="#story">Our story</a><a className="button button-secondary" href="#leadership">Meet the founder</a></div>}</div>{expressive && (aside ?? <div className="hero-orbit" aria-hidden="true"><span>Role brief</span><strong>Right-fit support</strong><i>Managed relationship</i></div>)}</div></section>;
}

function FinalCta() {
  return <section className="section contact-section page-contact-section"><div className="container contact-grid"><aside><p className="eyebrow">Your next step</p><h2>Tell us what the right support would change for your business.</h2><p className="lead compact">Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.</p><p className="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br /><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>;
}

function ContactForm() {
  return <form className="contact-form" action="/thank-you"><div className="field-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><label>Email<input type="email" name="email" autoComplete="email" required /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label><label>How can we help?<textarea name="message" rows={6} required /></label><label className="checkbox-field"><input type="checkbox" required /><span>I agree to the processing of my information for this enquiry.</span></label><button className="button" type="submit">Send enquiry</button><small>Prototype form only. Connect validation, spam protection, consent records, and WordPress form handling before launch.</small></form>;
}

function ServicePage({ page }: { page: SourcePageBrief }) {
  return <><Hero page={page} aside={page.image ? <img className="inner-hero-image" src={page.image} alt={page.imageAlt ?? ''} /> : undefined} />
    <section className="section"><div className="container content-split"><div><p className="eyebrow">Where support helps</p><h2>Keep the process moving without losing visibility.</h2>{page.detail?.map((text) => <p className="lead compact" key={text}>{text}</p>)}</div><div className="task-panel"><span className="card-index">Typical responsibilities</span><ul className="check-list">{page.tasks?.map((task) => <li key={task}>{task}</li>)}</ul>{page.source === 'production' && <p className="source-note">Production-site service · scope requires final client confirmation</p>}</div></div></section>
    <section className="section muted-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">The Virtual Office Angels model</p><h2>Matched around more than a job title.</h2></div></div><div className="feature-grid">{benefits.slice(0, 3).map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><FinalCta /></>;
}

function ServicesPage({ page }: { page: SourcePageBrief }) {
  return <><section className="section"><div className="container"><div className="page-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p></div><div className="service-directory">{servicePages.map((service, index) => <Link to={service.path} className="directory-card" key={service.path}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{service.title}</h2><p>{service.summary}</p>{service.source === 'production' && <small>Additional production-site service</small>}</div><b aria-hidden="true">↗</b></Link>)}</div></div></section><FinalCta /></>;
}

function AboutPage({ page }: { page: SourcePageBrief }) {
  return <><Hero page={page} aside={<img className="inner-hero-image" src="/assets/source/staging/images/2fab61e54e-2149013955.jpg" alt="A modern remote workspace" />} />
    <section className="section" id="story"><div className="container content-split"><div><p className="eyebrow">Our story</p><h2>A smarter response to the pressure on business owners.</h2></div><div><p className="lead compact">Virtual Office Angels was founded by Anne Villavieja, a seasoned Australian human resources professional with over 35 years of experience.</p><p className="lead compact">After witnessing the growing pressure on business owners to do it all—manage administration, grow their brand, and serve clients—she saw a smarter solution: pairing them with talented Filipino virtual assistants who truly fit their needs.</p><p className="lead compact">At Virtual Office Angels, we do not simply place virtual assistants. We match them carefully, manage them with ongoing support, and help them become a seamless part of each client’s team.</p></div></div></section>
    <section className="section dark-section" id="leadership"><div className="container content-split"><div><p className="eyebrow">Founder and leadership</p><h2>Meet Anne Villavieja—the heart behind Virtual Office Angels.</h2><img className="founder-portrait" src={page.image} alt={page.imageAlt} loading="lazy" /></div><div><p className="lead">Anne brings deep experience from two decades in Australian human resources, specialising in recruitment, team building, and performance management.</p><p>Her passion for helping people—both clients and virtual assistants—led her to build a virtual staffing agency that is supportive, proactive, and results-focused.</p><p>She is known for her personal touch, smart processes, and ability to match the right person to the right role.</p><div className="fact-row">{page.detail?.map((item) => <span key={item}>{item}</span>)}</div></div></div></section><FinalCta /></>;
}

function ProcessPage({ page }: { page: SourcePageBrief }) {
  return <><section className="section"><div className="container process-layout"><aside><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p></aside><ol className="process-timeline">{processSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section><FinalCta /></>;
}

function WhyPage({ page }: { page: SourcePageBrief }) {
  return <><Hero page={page} /><section className="section muted-section"><div className="container"><div className="feature-grid feature-grid-wide">{benefits.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="section"><div className="container content-split"><h2>More capacity for the work that moves your business forward.</h2><p className="lead">With the right specialist, clear communication, and ongoing Australian management, everyday work keeps moving while you stay focused on clients, growth, and the decisions only you can make.</p></div></section><FinalCta /></>;
}

function StoriesPage({ page }: { page: SourcePageBrief }) {
  return <><section className="section"><div className="container"><div className="page-intro client-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p><p>Whether they are in accounting, legal, real estate, or finance, the tailored approach is intended to provide the right support every time.</p></div><ClientCarousel /></div></section><section className="section muted-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Client testimonials</p><h2>What clients say about Virtual Office Angels.</h2></div></div><div className="testimonial-grid">{testimonials.map((testimonial) => <figure key={testimonial.name}><blockquote>“{testimonial.quote}”</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.role}</span></figcaption></figure>)}</div></div></section><FinalCta /></>;
}

function InsightsPage({ page }: { page: SourcePageBrief }) {
  const categories = ['All insights', ...new Set(blogArticles.map(articleCategory))];
  const [activeCategory, setActiveCategory] = useState('All insights');
  const visibleArticles = activeCategory === 'All insights' ? blogArticles : blogArticles.filter((article) => articleCategory(article) === activeCategory);
  return <section className="section"><div className="container"><div className="page-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p></div><div className="filter-row" aria-label="Article topics">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="article-grid">{visibleArticles.map((article, index) => <article className={index === 0 && activeCategory === 'All insights' ? 'article-card featured' : 'article-card'} key={article.slug}><Link className="article-art" to={`/insights/${article.slug}`}><img src={article.featuredImage} alt="" loading="lazy" /><span>{articleCategory(article)}</span></Link><div><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h2><Link to={`/insights/${article.slug}`}>{article.title}</Link></h2><Link className="text-link" to={`/insights/${article.slug}`}>Read article <span>→</span></Link></div></article>)}</div></div></section>;
}

function VideosPage({ page }: { page: SourcePageBrief }) {
  return <section className="section"><div className="container"><div className="page-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p></div><div className="media-grid">{['Choosing the right virtual assistant', 'Preparing your business to delegate', 'Building a strong remote working rhythm'].map((title, index) => <article className="video-card" key={title}><div className="video-placeholder"><button type="button" aria-label={`Play ${title}`}>▶</button><span>0{index + 1}</span></div><p className="eyebrow">Video resource</p><h2>{title}</h2><p>Reserved for an existing, client-approved video with captions and a written transcript.</p></article>)}</div></div></section>;
}

function FaqPage({ page }: { page: SourcePageBrief }) {
  return <section className="section"><div className="container faq-page-grid"><aside><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p><Link className="button button-secondary" to="/contact">Ask another question</Link></aside><div><div className="faq-list">{sourceFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><div className="faq-closing"><p>We trust these answers provide useful information about hiring a virtual worker and what to consider when getting started.</p><p>If you need any other clarification, call Virtual Office Angels or email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a>.</p></div></div></div></section>;
}

function ContactPage({ page }: { page: SourcePageBrief }) {
  return <section className="section contact-section"><div className="container contact-grid"><aside><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead compact">{page.summary}</p><dl><div><dt>Phone</dt><dd><a href="tel:1300737883">1 300 737 883</a></dd></div><div><dt>Email</dt><dd><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></dd></div><div><dt>Address</dt><dd>Ground Floor, 465 Victoria Avenue<br />Chatswood NSW 2067, Australia</dd></div><div><dt>Company</dt><dd>ABN 58 155 459 788<br />ACN 155 459 788</dd></div></dl></aside><form className="contact-form" action="/thank-you"><div className="field-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><label>Email<input type="email" name="email" autoComplete="email" required /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label><label>How can we help?<textarea name="message" rows={6} required /></label><label className="checkbox-field"><input type="checkbox" required /><span>I agree to the processing of my information for this enquiry.</span></label><button className="button" type="submit">Send enquiry</button><small>Prototype form only. Connect validation, spam protection, consent records, and WordPress form handling before launch.</small></form></div></section>;
}

export function SourcePage({ page }: { page: SourcePageBrief }) {
  switch (page.template) {
    case 'about': return <AboutPage page={page} />;
    case 'services': return <ServicesPage page={page} />;
    case 'service': return <ServicePage page={page} />;
    case 'process': return <ProcessPage page={page} />;
    case 'why': return <WhyPage page={page} />;
    case 'stories': return <StoriesPage page={page} />;
    case 'insights': return <InsightsPage page={page} />;
    case 'videos': return <VideosPage page={page} />;
    case 'faqs': return <FaqPage page={page} />;
    case 'contact': return <ContactPage page={page} />;
  }
}
