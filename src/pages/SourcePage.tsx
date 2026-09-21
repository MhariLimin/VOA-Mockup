import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { articleCategory, blogArticles, formatArticleDate } from '../content/blogContent';
import { faqTopics, sourceFaqs } from '../content/faqContent';
import { servicePages, type SourcePageBrief } from '../content/sourcePages';
import { managedStepTitles, serviceDetails, serviceRouter } from '../content/serviceDetails';
import { processIntro, processStages } from '../content/processContent';
import { managedSupportPage, ownershipSplit } from '../content/managedContent';
import { testimonials } from '../content/testimonials';
import { sisterSites } from '../content/siteContent';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { NextStepSection, PageClosing } from '../components/layout/PageClosing';
import { ContactForm } from '../components/ui/ContactForm';

function Hero({ page, aside }: { page: SourcePageBrief; aside?: ReactNode }) {
  const expressive = page.template === 'about' || page.template === 'service';
  return <section className={`section inner-hero${expressive ? '' : ' compact-inner-hero'}`}><div className="container inner-hero-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.summary}</p>{page.template === 'about' && <div className="button-row"><Link className="button" to="/services">View Our Services</Link><Link className="button button-secondary" to="/contact">Get in Touch</Link></div>}</div>{expressive && (aside ?? <div className="hero-orbit" aria-hidden="true"><span>Role brief</span><strong>Right-fit support</strong><i>Managed relationship</i></div>)}</div></section>;
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
            <Link className="button" to="/contact">Find The Right Fit</Link>
            <a className="button button-secondary" href="#scope">See What You Can Delegate</a>
          </div>
          <ul className="scope-tags">{detail.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </div>
    </section>

    <section className="section" id="scope"><div className="container content-split"><div><p className="eyebrow">{detail.scopeEyebrow}</p><h2>{detail.scopeHeading}</h2><p className="lead compact">{detail.scopeIntro}</p></div><div className="task-panel"><span className="card-index">Typical responsibilities</span><Accordion items={detail.scope} idPrefix="scope" /></div></div></section>

    <section className="section muted-section"><div className="container systems-panel"><div><p className="eyebrow">Systems experience &amp; requirements</p><h2>{detail.systemsHeading}</h2><p className="lead compact">{detail.systemsIntro}</p></div><ul className="system-list">{detail.systems.map((system) => <li key={system}>{system}</li>)}</ul></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">{detail.fitEyebrow}</p><h2>{detail.fitHeading}</h2></div></div><div className="split-grid role-fit">
      <article><p className="eyebrow">A good fit when</p><ul>{detail.fits.map((fit) => <li key={fit}>{fit}</li>)}</ul></article>
      <article><p className="eyebrow">{detail.boundaryLabel}</p><h3>{detail.boundaryHeading}</h3><p>{detail.boundaryText}</p></article>
    </div></div></section>

    <section className="section muted-section service-feedback"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">Client feedback</p><h2>{detail.feedbackHeading}</h2></div></div>
      <div className="testimonial-grid testimonial-grid-3">{[1, 2, 3].map((slot) => (
        <figure key={slot}>
          <blockquote>“{detail.feedbackPlaceholder}”</blockquote>
          <figcaption>
            <span className="testimonial-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" /></svg></span>
            <span><strong>Client name</strong><small>Business</small></span>
          </figcaption>
        </figure>
      ))}</div>
    </div></section>

    <section className="section"><div className="container faq-page-grid"><aside><p className="eyebrow">Questions about the service</p><h2>{detail.faqHeading}</h2><p className="lead compact">{detail.faqIntro}</p></aside><Accordion items={detail.faqs} idPrefix="service-faq" /></div></section>

    <section className="section voa-model-section">
      <div className="container voa-model-heading"><p className="eyebrow">{detail.managedEyebrow}</p><h2>{detail.managedHeading}</h2>{detail.managedIntro && <p className="lead compact">{detail.managedIntro}</p>}</div>
      <div className="container voa-model-grid voa-model-grid-4">{detail.managedSteps.map((text, index) => <article key={managedStepTitles[index]}><span>0{index + 1}</span><h3>{managedStepTitles[index]}</h3><p>{text}</p></article>)}</div>
    </section>

    <NextStepSection className="service-closing" copy={{ eyebrow: 'Find the right specialised virtual assistant for your business', heading: detail.closingHeading }} />
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
          <div className="button-row"><Link className="button" to="/contact">Find the Right Fit</Link></div>
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
  const aboutFaqs: readonly (readonly [string, string])[] = [
    ["What does Virtual Office Angels do?", "Virtual Office Angels provides specialised virtual assistant services for Australian businesses. We support role planning, recruitment, onboarding, employment administration, payroll, HR, and ongoing client care."],
    ["Is Virtual Office Angels Australian-owned?", "Virtual Office Angels is Australian-led and managed. Businesses have a local point of contact, while their virtual assistants work remotely from the Philippines."],
    ["Who founded Virtual Office Angels?", "Anne Villavieja founded Virtual Office Angels. She brings two decades of human resources experience with Australian companies and first-hand knowledge of the professional talent market in the Philippines."],
    ["How are virtual assistants selected?", "Candidates are assessed against the responsibilities, systems, industry knowledge, working hours, and communication requirements attached to the role. Clients review a relevant shortlist before making their decision."],
    ["What services can a virtual assistant provide?", "Virtual assistants can support mortgage processing, financial planning administration, accounting, real estate, back-office administration, marketing, sales, e-commerce, technology, and copywriting. View our virtual assistant services for more information."],
    ["What happens after a virtual assistant starts?", "The client manages daily work and business priorities. Virtual Office Angels remains available for payroll, HR, client care, and virtual assistant performance support."],
  ];

  return <>
    <Hero page={page} aside={<img className="inner-hero-image" src="/assets/source/staging/images/2fab61e54e-2149013955.jpg" alt="A modern remote workspace" />} />

    <section className="section about-story" id="story">
      <div className="container about-story-grid">
        <div className="about-story-copy">
          <p className="eyebrow">Our story</p>
          <h2>Built on HR expertise.</h2>
          <p className="lead compact">Anne Villavieja founded Virtual Office Angels in 2010. As an HR professional with over 35 years of experience in the Australian and Western markets, she saw an opportunity to build a company focused solely on recruiting and supporting professional virtual assistants for small and medium businesses.</p>
          <p className="lead compact">Anne understands both the local talent market and Australian business expectations. Her knowledge of Philippine workplaces, education, and culture, combined with her HR experience, continues to shape how our team recruits and supports virtual assistants today.</p>
          <ul className="about-facts"><li>Founded in 2010</li><li>Australian-led and managed</li></ul>
        </div>
        <figure className="about-founder">
          <img src={page.image} alt={page.imageAlt} loading="lazy" />
        </figure>
      </div>
    </section>

    <section className="section muted-section about-support">
      <div className="container content-split">
        <div>
          <p className="eyebrow">Who we support</p>
          <h2>Different businesses need different expertise.</h2>
          <p className="lead compact">Some roles need strong administration skills. Others require someone who already understands an industry's terminology, systems, and day-to-day processes.</p>
          <p className="lead compact">That is why Virtual Office Angels works across a range of business functions, including:</p>
          <Link className="button button-secondary" to="/services">View our services</Link>
        </div>
        <ul className="check-list">
          <li>Mortgage and loans processing</li>
          <li>Financial planning administration</li>
          <li>Accounting and bookkeeping</li>
          <li>Real estate and administration</li>
          <li>Back-office support</li>
          <li>Digital marketing</li>
          <li>Sales and e-commerce</li>
          <li>Creative and business support</li>
        </ul>
      </div>
    </section>

    <section className="section about-sites">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">Also from Virtual Office Angels</p><h2>Our specialist websites.</h2></div></div>
        <div className="brand-grid">
          {sisterSites.map((site) => (
            <a className="brand-card" href={site.url} target="_blank" rel="noopener noreferrer" key={site.url}>
              <span className="brand-logo"><img src={site.logo} alt="" loading="lazy" /></span>
              <h3>{site.name} <span className="brand-arrow" aria-hidden="true">↗</span></h3>
              <p>{site.description}</p>
              <span className="brand-domain">{site.domain}<span className="sr-only"> (opens in a new tab)</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="section dark-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The way we work</p>
            <h2>The standards behind our support.</h2>
            <p className="lead compact">These values shape how we recruit, communicate, and support our clients.</p>
            <p className="lead compact">We listen before we recruit, look beyond CVs, and stay involved after the virtual assistant begins. The aim is straightforward: a strong match, clear expectations, and a working relationship that delivers long-term value for everyone involved.</p>
          </div>
        </div>
        <div className="values-grid">
          <article><h3>Clarity</h3><p>Good work depends on clear expectations. We define responsibilities, communication channels, approval points, and measures of success so everyone understands how the role should work.</p></article>
          <article><h3>Accountability</h3><p>We take ownership of the support we provide. When an issue arises, we address it directly, agree on the next steps, and follow through on what was discussed.</p></article>
          <article><h3>Consistency</h3><p>Reliable support requires steady communication and dependable processes. We keep recruitment, onboarding, HR, and client care organised throughout the working relationship.</p></article>
          <article><h3>Client Care</h3><p>Our involvement continues after recruitment. We check in, listen to feedback, and support adjustments when responsibilities, systems, or business priorities change.</p></article>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container faq-page-grid">
        <aside>
          <p className="eyebrow">About Virtual Office Angels</p>
          <h2>Frequently asked questions.</h2>
          <p className="lead compact">Common questions about who we are, how we work, and what to expect.</p>
        </aside>
        <Accordion items={aboutFaqs} idPrefix="about-faq" />
      </div>
    </section>

    <PageClosing nextStep={{ eyebrow: "Let’s talk", heading: "Looking for the right virtual support?", text: "Share the work that is taking time away from clients, revenue, or delivery. We’ll help clarify the virtual support role and the experience it requires." }} />
  </>;
}

function ProcessPage({ page }: { page: SourcePageBrief }) {
  const [openStage, setOpenStage] = useState(-1);

  return <>
    <section className="section process-opening"><div className="container process-layout">
      <aside>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">{processIntro.text}</p>
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
    <section className="section inner-hero">
      <div className="container inner-hero-grid">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.summary}</p>
          <div className="button-row">
            <Link className="button" to="/contact">Get in touch</Link>
            <a className="button button-secondary" href="#what-we-manage">See what we manage</a>
          </div>
        </div>
        {page.image && <img className="inner-hero-image" src={page.image} alt={page.imageAlt ?? ''} />}
      </div>
    </section>

    <section className="section"><div className="container content-split">
      <div>
        <p className="eyebrow">More than recruitment</p>
        <h2>What is an HR-managed virtual support solution?</h2>
        {managedSupportPage.definition.map((text) => <p className="lead compact" key={text}>{text}</p>)}
      </div>
      <div className="task-panel" id="what-we-manage">
        <span className="card-index">{managedSupportPage.includesLabel}</span>
        <ul className="check-list">{managedSupportPage.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div></section>

    <section className="section muted-section"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">Shared responsibilities</p><h2>Clear ownership keeps the role effective.</h2><p className="lead compact">{managedSupportPage.ownershipIntro}</p></div></div>
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
        <p className="eyebrow">HR-managed virtual support FAQs</p>
        <h2>What to know before hiring.</h2>
        <p className="lead compact">{managedSupportPage.questionsIntro}</p>
      </aside>
      <Accordion items={managedSupportPage.questions} idPrefix="managed-faq" />
    </div></section>

    <PageClosing nextStep={{ eyebrow: "Let’s talk", heading: "Tell us what support your business needs.", text: "Share the responsibilities, systems, and experience the role requires. We’ll help clarify the position and explain how our HR-managed virtual support works." }} />
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

function scrollToSection(section: HTMLElement | null) {
  if (!section) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

function Pagination({ label, currentPage, pageCount, onChange }: { label: string; currentPage: number; pageCount: number; onChange: (page: number) => void }) {
  if (pageCount < 2) return null;
  return <nav className="pagination" aria-label={label}>
    <button type="button" onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => <button type="button" key={n} onClick={() => onChange(n)} className={currentPage === n ? 'active' : ''} aria-label={`Page ${n}`} aria-current={currentPage === n ? 'page' : undefined}>{n}</button>)}
    <button type="button" onClick={() => onChange(currentPage + 1)} disabled={currentPage === pageCount}>Next →</button>
  </nav>;
}

function ImageHero({ page, primary, secondary, aside }: { page: SourcePageBrief; primary: readonly [string, string]; secondary: readonly [string, string]; aside?: ReactNode }) {
  const cta = ([label, href]: readonly [string, string], className: string) => href.startsWith('#') ? <a className={className} href={href}>{label}</a> : <Link className={className} to={href}>{label}</Link>;
  return <section className="section inner-hero">
    <div className="container inner-hero-grid">
      <div>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        {page.summary && <p className="lead">{page.summary}</p>}
        <div className="button-row">{cta(primary, 'button')}{cta(secondary, 'button button-secondary')}</div>
      </div>
      {aside ?? (page.image && <img className="inner-hero-image" src={page.image} alt={page.imageAlt ?? ''} />)}
    </div>
  </section>;
}

function InsightsPage({ page }: { page: SourcePageBrief }) {
  const PER_PAGE = 10;
  const listRef = useRef<HTMLElement>(null);
  const categories = ['All insights', ...new Set(blogArticles.map(articleCategory))];
  const [activeCategory, setActiveCategory] = useState('All insights');
  const [currentPage, setCurrentPage] = useState(1);
  const visibleArticles = activeCategory === 'All insights' ? blogArticles : blogArticles.filter((article) => articleCategory(article) === activeCategory);
  const pageCount = Math.ceil(visibleArticles.length / PER_PAGE);
  const pageArticles = visibleArticles.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  function selectCategory(cat: string) { setActiveCategory(cat); setCurrentPage(1); }
  function goToPage(n: number) { setCurrentPage(n); scrollToSection(listRef.current); }
  return <>
    <ImageHero page={page} primary={['Browse articles', '#articles']} secondary={['Watch videos', '/videos']} />
    <section className="section library-section" id="articles" ref={listRef}><div className="container">
      <div className="section-heading library-heading"><p className="eyebrow">Article library</p><p className="library-count">{visibleArticles.length} {visibleArticles.length === 1 ? 'article' : 'articles'}</p></div>
      <div className="filter-row" aria-label="Article topics">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} aria-pressed={activeCategory === category} type="button" key={category} onClick={() => selectCategory(category)}>{category}</button>)}</div>
      <div className="article-grid">{pageArticles.map((article, index) => <article className={index === 0 && currentPage === 1 && activeCategory === 'All insights' ? 'article-card featured' : 'article-card'} key={article.slug}><Link className="article-art" to={`/insights/${article.slug}`}><img src={article.featuredImage} alt="" loading="lazy" /><span>{articleCategory(article)}</span></Link><div><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h2><Link to={`/insights/${article.slug}`}>{article.title}</Link></h2><Link className="text-link" to={`/insights/${article.slug}`}>Read article <span>→</span></Link></div></article>)}</div>
      <Pagination label="Article pages" currentPage={currentPage} pageCount={pageCount} onChange={goToPage} />
    </div></section>
    <PageClosing />
  </>;
}

const VIDEO_PLACEHOLDERS = ['Choosing the right virtual assistant', 'Preparing your business to delegate', 'Building a strong remote working rhythm'] as const;

/* Stand-in artwork until approved videos exist: a player-style frame, clearly marked as coming soon. */
function VideoPoster({ label, title, className = '' }: { label: string; title?: string; className?: string }) {
  return <div className={`video-poster ${className}`.trim()} aria-hidden="true">
    <span className="video-poster-chip">Coming soon</span>
    <span className="video-poster-label">{label}</span>
    <span className="video-poster-play">▶</span>
    {title && <span className="video-poster-title">{title}</span>}
    <span className="video-poster-bar"><i /><b>0:00</b></span>
  </div>;
}

function VideosPage({ page }: { page: SourcePageBrief }) {
  const PER_PAGE = 10;
  const listRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(VIDEO_PLACEHOLDERS.length / PER_PAGE);
  const pageItems = VIDEO_PLACEHOLDERS.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  function goToPage(n: number) { setCurrentPage(n); scrollToSection(listRef.current); }
  return <>
    <ImageHero page={page} primary={['Watch videos', '#videos']} secondary={['Read articles', '/insights']} aside={<VideoPoster className="video-hero-poster" label="Video library" />} />
    <section className="section library-section" id="videos" ref={listRef}><div className="container">
      <div className="section-heading library-heading"><p className="eyebrow">Video library</p><p className="library-count">{VIDEO_PLACEHOLDERS.length} videos</p></div>
      <div className="media-grid">{pageItems.map((title, index) => <article className="video-card" key={title}><VideoPoster label={`Video 0${(currentPage - 1) * PER_PAGE + index + 1}`} title={title} /><p className="eyebrow">Video resource</p><h2>{title}</h2><p>Reserved for an existing, client-approved video with captions and a written transcript.</p></article>)}</div>
      <Pagination label="Video pages" currentPage={currentPage} pageCount={pageCount} onChange={goToPage} />
    </div></section>
    <PageClosing />
  </>;
}

function FaqPage({ page }: { page: SourcePageBrief }) {
  const topics = [{ label: 'All questions', questions: sourceFaqs.map((_, i) => i) }, ...faqTopics];
  const [activeTopic, setActiveTopic] = useState(1);
  const [openFaq, setOpenFaq] = useState(-1);
  function selectTopic(index: number) { setActiveTopic(index); setOpenFaq(-1); }
  return <>
    <section className="section faq-page"><div className="container faq-page-grid">
      <aside>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        {page.summary && <p>{page.summary}</p>}
        <div className="faq-topics" role="group" aria-label="Question topics">{topics.map((topic, index) => <button className={activeTopic === index ? 'active' : ''} aria-pressed={activeTopic === index} type="button" key={topic.label} onClick={() => selectTopic(index)}><span>{topic.label}</span><small>{topic.questions.length}</small></button>)}</div>
        <Link className="button button-secondary" to="/contact">Ask another question</Link>
      </aside>
      <div>
        <div className="faq-list">{topics[activeTopic].questions.map((i) => { const [question, answer] = sourceFaqs[i]; return <details key={question} open={openFaq === i}><summary onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === i ? -1 : i); }}>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>; })}</div>
        <div className="faq-closing"><p>We trust these answers provide useful information about hiring a virtual worker and what to consider when getting started.</p><p>If you need any other clarification, call Virtual Office Angels or email <a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a>.</p></div>
      </div>
    </div></section>
    <PageClosing />
  </>;
}

function ContactPage({ page }: { page: SourcePageBrief }) {
  return <section className="section contact-section"><div className="container contact-grid"><aside><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead compact">{page.summary}</p><dl><div><dt>Phone</dt><dd><a href="tel:1300737883">1 300 737 883</a></dd></div><div><dt>Email</dt><dd><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></dd></div><div><dt>Address</dt><dd>Ground Floor, 465 Victoria Avenue<br />Chatswood NSW 2067, Australia</dd></div><div><dt>Company</dt><dd>ABN 58 155 459 788<br />ACN 155 459 788</dd></div></dl></aside><ContactForm /></div></section>;
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
