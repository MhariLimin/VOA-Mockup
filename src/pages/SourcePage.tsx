import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { articleCategory, blogArticles, formatArticleDate } from '../content/blogContent';
import { sourceFaqs } from '../content/faqContent';
import { servicePages, type SourcePageBrief } from '../content/sourcePages';
import { serviceDetails, serviceRouter } from '../content/serviceDetails';
import { processStages } from '../content/processContent';
import { managedSupportPage, ownershipSplit } from '../content/managedContent';
import { testimonials } from '../content/testimonials';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { PageClosing } from '../components/layout/PageClosing';

function Hero({ page, aside }: { page: SourcePageBrief; aside?: ReactNode }) {
  const expressive = page.template === 'about' || page.template === 'service';
  return <section className={`section inner-hero${expressive ? '' : ' compact-inner-hero'}`}><div className="container inner-hero-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p>{page.template === 'about' && <div className="button-row"><a className="button" href="#story">Our story</a><a className="button button-secondary" href="#leadership">Meet the founder</a></div>}</div>{expressive && (aside ?? <div className="hero-orbit" aria-hidden="true"><span>Role brief</span><strong>Right-fit support</strong><i>Managed relationship</i></div>)}</div></section>;
}

function Accordion({ items, idPrefix }: { items: readonly (readonly [string, string])[]; idPrefix: string }) {
  const [open, setOpen] = useState(-1);
  return <div className="accordion">{items.map(([heading, body], index) => {
    const expanded = open === index;
    return <div className="accordion-item" key={heading}>
      <button type="button" aria-expanded={expanded} aria-controls={`${idPrefix}-${index}`} onClick={() => setOpen(expanded ? -1 : index)}>
        <span>{heading}</span><span className="accordion-toggle" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      <p className="accordion-panel" id={`${idPrefix}-${index}`} hidden={!expanded}>{body}</p>
    </div>;
  })}</div>;
}

function ServicePage({ page }: { page: SourcePageBrief }) {
  const detail = serviceDetails[page.path];
  const heroAside = page.image ? <img className="inner-hero-image" src={page.image} alt={page.imageAlt ?? ''} /> : undefined;

  if (!detail) {
    return <><Hero page={page} aside={heroAside} />
      <section className="section"><div className="container content-split"><div><p className="eyebrow">Where support helps</p><h2>Keep the process moving without losing visibility.</h2>{page.detail?.map((text) => <p className="lead compact" key={text}>{text}</p>)}</div><div className="task-panel"><span className="card-index">Typical responsibilities</span><ul className="check-list">{page.tasks?.map((task) => <li key={task}>{task}</li>)}</ul></div></div></section><PageClosing /></>;
  }

  return <>
    <section className="section inner-hero service-hero" style={page.image ? { backgroundImage: `url(${page.image})` } : undefined}>
      <div className="container inner-hero-grid">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{detail.title}</h1>
          <p className="lead">{detail.lead}</p>
          <div className="button-row">
            <Link className="button" to="/contact">Get Started Today</Link>
            <a className="button button-secondary" href="#scope">See where support helps</a>
          </div>
          <ul className="scope-tags">{detail.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </div>
    </section>

    <section className="section" id="scope"><div className="container content-split"><div><p className="eyebrow">Where support helps</p><h2>Keep the process moving without losing visibility.</h2>{page.detail?.map((text) => <p className="lead compact" key={text}>{text}</p>)}{page.source === 'production' && <p className="source-note">Production-site service · scope requires final client confirmation</p>}</div><div className="task-panel"><span className="card-index">Typical responsibilities</span><Accordion items={detail.scope} idPrefix="scope" /></div></div></section>

    <section className="section muted-section"><div className="container systems-panel"><div><p className="eyebrow">Systems experience</p><h2>Match the role to the tools behind the work.</h2><p className="lead compact">System requirements are confirmed during role planning and assessed during candidate matching.</p></div><ul className="system-list">{detail.systems.map((system) => <li key={system}>{system}</li>)}</ul></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">When this role fits</p><h2>{detail.fitHeading}</h2></div></div><div className="split-grid role-fit">
      <article><p className="eyebrow">A good fit when</p><ul>{detail.fits.map((fit) => <li key={fit}>{fit}</li>)}</ul></article>
      <article><p className="eyebrow">{detail.boundaryLabel}</p><h3>{detail.boundaryHeading}</h3><p>{detail.boundaryText}</p></article>
    </div></div></section>

    <section className="section muted-section"><div className="container faq-page-grid"><aside><p className="eyebrow">Questions about the service</p><h2>What businesses need to know before matching.</h2><p className="lead compact">Role planning confirms the final scope, systems, and responsibilities for your business.</p></aside><Accordion items={detail.faqs} idPrefix="service-faq" /></div></section>

    <PageClosing />
  </>;
}

function ServicesPage({ page }: { page: SourcePageBrief }) {
  return <>
    <section className="section inner-hero service-hero" style={page.image ? { backgroundImage: `url(${page.image})` } : undefined}>
      <div className="container inner-hero-grid">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.summary}</p>
          <div className="button-row"><Link className="button" to="/contact">Get Started Today</Link></div>
        </div>
      </div>
    </section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Choose a service</p><h2>Start with the workflow that needs experienced support.</h2></div></div><div className="service-directory">{servicePages.map((service, index) => {
      const detail = serviceDetails[service.path];
      return <Link to={service.path} className="directory-card" key={service.path}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h2>{detail?.title ?? service.title}</h2>
          <p>{detail?.lead ?? service.summary}</p>
          {service.source === 'production' && <small>Additional production-site service</small>}
        </div>
        <img src={service.image} alt="" loading="lazy" />
        <b aria-hidden="true">↗</b>
      </Link>;
    })}</div></div></section>

    <section className="section muted-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Start from the work</p><h2>Not sure which service fits the work?</h2></div></div><div className="service-router">{serviceRouter.map(([label, href]) => <Link to={href} key={href}>{label} <span aria-hidden="true">→</span></Link>)}</div></div></section>

    <PageClosing />
  </>;
}

function AboutPage({ page }: { page: SourcePageBrief }) {
  return <><Hero page={page} aside={<img className="inner-hero-image" src="/assets/source/staging/images/2fab61e54e-2149013955.jpg" alt="A modern remote workspace" />} />
    <section className="section" id="story"><div className="container content-split"><div><p className="eyebrow">Our story</p><h2>A smarter response to the pressure on business owners.</h2></div><div><p className="lead compact">Virtual Office Angels was founded by Anne Villavieja, a seasoned Australian human resources professional with over 35 years of experience.</p><p className="lead compact">After witnessing the growing pressure on business owners to do it all—manage administration, grow their brand, and serve clients—she saw a smarter solution: pairing them with talented Filipino virtual assistants who truly fit their needs.</p><p className="lead compact">At Virtual Office Angels, we do not simply place virtual assistants. We match them carefully, manage them with ongoing support, and help them become a seamless part of each client’s team.</p></div></div></section>
    <section className="section dark-section" id="leadership"><div className="container content-split"><div><p className="eyebrow">Founder and leadership</p><h2>Meet Anne Villavieja—the heart behind Virtual Office Angels.</h2><img className="founder-portrait" src={page.image} alt={page.imageAlt} loading="lazy" /></div><div><p className="lead">Anne brings deep experience from two decades in Australian human resources, specialising in recruitment, team building, and performance management.</p><p>Her passion for helping people—both clients and virtual assistants—led her to build a virtual staffing agency that is supportive, proactive, and results-focused.</p><p>She is known for her personal touch, smart processes, and ability to match the right person to the right role.</p><div className="fact-row">{page.detail?.map((item) => <span key={item}>{item}</span>)}</div></div></div></section><PageClosing /></>;
}

function ProcessPage({ page }: { page: SourcePageBrief }) {
  const [openStage, setOpenStage] = useState(-1);

  return <>
    <section className="section process-opening"><div className="container process-layout">
      <aside>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">You receive more than a candidate introduction. Our team helps define the role, assesses the match and supports the working relationship after placement.</p>
        <Link className="button button-secondary" to="/contact">Start with a role brief</Link>
      </aside>
      <ol className="process-timeline">{processStages.map((stage, index) => {
        const open = openStage === index;
        return <li key={stage.number}>
          <span>{stage.number}</span>
          <div>
            <h3 className="process-stage-heading">
              <button type="button" aria-expanded={open} aria-controls={`stage-${index}`} onClick={() => setOpenStage(open ? -1 : index)}>
                <span><strong>{stage.title}</strong><small>{stage.summary}</small></span>
                <span className="accordion-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
              </button>
            </h3>
            <div className="process-stage-panel" id={`stage-${index}`} hidden={!open}>
              <p>{stage.detail}</p>
              <ul className="process-checkpoints">{stage.checkpoints.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </div>
        </li>;
      })}</ol>
    </div></section>

    <PageClosing />
  </>;
}

function WhyPage({ page }: { page: SourcePageBrief }) {
  return <>
    <section className="section inner-hero service-hero" style={page.image ? { backgroundImage: `url(${page.image})` } : undefined}>
      <div className="container inner-hero-grid">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.summary}</p>
          <div className="button-row">
            <Link className="button" to="/contact">Get Started Today</Link>
            <Link className="button button-secondary" to="/how-it-works">See the complete process</Link>
          </div>
          <ul className="scope-tags">{managedSupportPage.heroTags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </div>
    </section>

    <section className="section"><div className="container content-split">
      <div>
        <p className="eyebrow">More than recruitment</p>
        <h2>What is an HR-managed virtual support solution?</h2>
        {managedSupportPage.definition.map((text) => <p className="lead compact" key={text}>{text}</p>)}
      </div>
      <div className="task-panel">
        <span className="card-index">{managedSupportPage.includesLabel}</span>
        <h3 className="panel-heading">{managedSupportPage.includesHeading}</h3>
        <ul className="check-list">{managedSupportPage.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div></section>

    <section className="section muted-section"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">Shared responsibilities</p><h2>Clear ownership keeps the working relationship effective.</h2><p className="lead compact">{managedSupportPage.ownershipIntro}</p></div></div>
      <div className="split-grid role-fit">
        {ownershipSplit.map((column) => (
          <article key={column.heading}>
            <p className="eyebrow">{column.label}</p>
            <h3>{column.heading}</h3>
            <p>{column.summary}</p>
            <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </div></section>

    <section className="section"><div className="container faq-page-grid">
      <aside>
        <p className="eyebrow">Managed support questions</p>
        <h2>What to know before building the role.</h2>
        <p className="lead compact">{managedSupportPage.questionsIntro}</p>
      </aside>
      <Accordion items={managedSupportPage.questions} idPrefix="managed-faq" />
    </div></section>

    <PageClosing />
  </>;
}

function StoriesPage({ page }: { page: SourcePageBrief }) {
  return <>
    <section className="section"><div className="container">
      <div className="page-intro client-intro">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.summary}</p>
      </div>
      <ClientCarousel />
    </div></section>

    <section className="section muted-section" id="testimonials"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">Client testimonials</p><h2>In their words.</h2><p className="lead compact">Whether they are in accounting, legal, real estate, or finance, the tailored approach is intended to provide the right support every time.</p></div></div>
      <div className="testimonial-grid">{testimonials.map((testimonial) => (
        <figure key={testimonial.name}>
          <blockquote>“{testimonial.quote}”</blockquote>
          <figcaption>
            <span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span>
            <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
          </figcaption>
        </figure>
      ))}</div>
    </div></section>

    <PageClosing />
  </>;
}

function InsightsPage({ page }: { page: SourcePageBrief }) {
  const categories = ['All insights', ...new Set(blogArticles.map(articleCategory))];
  const [activeCategory, setActiveCategory] = useState('All insights');
  const visibleArticles = activeCategory === 'All insights' ? blogArticles : blogArticles.filter((article) => articleCategory(article) === activeCategory);
  return <><section className="section"><div className="container"><div className="page-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p></div><div className="filter-row" aria-label="Article topics">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="article-grid">{visibleArticles.map((article, index) => <article className={index === 0 && activeCategory === 'All insights' ? 'article-card featured' : 'article-card'} key={article.slug}><Link className="article-art" to={`/insights/${article.slug}`}><img src={article.featuredImage} alt="" loading="lazy" /><span>{articleCategory(article)}</span></Link><div><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h2><Link to={`/insights/${article.slug}`}>{article.title}</Link></h2><Link className="text-link" to={`/insights/${article.slug}`}>Read article <span>→</span></Link></div></article>)}</div></div></section><PageClosing /></>;
}

function VideosPage({ page }: { page: SourcePageBrief }) {
  return <><section className="section"><div className="container"><div className="page-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p></div><div className="media-grid">{['Choosing the right virtual assistant', 'Preparing your business to delegate', 'Building a strong remote working rhythm'].map((title, index) => <article className="video-card" key={title}><div className="video-placeholder"><button type="button" aria-label={`Play ${title}`}>▶</button><span>0{index + 1}</span></div><p className="eyebrow">Video resource</p><h2>{title}</h2><p>Reserved for an existing, client-approved video with captions and a written transcript.</p></article>)}</div></div></section><PageClosing /></>;
}

function FaqPage({ page }: { page: SourcePageBrief }) {
  return <><section className="section"><div className="container faq-page-grid"><aside><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p><Link className="button button-secondary" to="/contact">Ask another question</Link></aside><div><div className="faq-list">{sourceFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><div className="faq-closing"><p>We trust these answers provide useful information about hiring a virtual worker and what to consider when getting started.</p><p>If you need any other clarification, call Virtual Office Angels or email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a>.</p></div></div></div></section><PageClosing /></>;
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
