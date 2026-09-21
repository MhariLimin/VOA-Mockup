import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { buyerQuestions, heroStats, specialistServices } from '../content/homeContent';
import { ownershipSplit } from '../content/managedContent';
import { processIntro, processStages } from '../content/processContent';
import { blogArticles, articleCategory, formatArticleDate } from '../content/blogContent';
import { testimonials } from '../content/testimonials';
import { siteContent } from '../content/siteContent';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { ContactForm } from '../components/ui/ContactForm';

export function HomePage() {
  const [openQuestion, setOpenQuestion] = useState('');

  return (
    <>
      <section className="section home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1>Get <em>Specialised</em> &amp; <em>HR Managed</em> Virtual Support!</h1>
            <p className="lead">{siteContent.hero.description}</p>
            <div className="button-row">
              <Link className="button" to="/contact">Find the Right Fit</Link>
              <Link className="button button-secondary" to="/services">Explore services</Link>
            </div>
          </div>
          <div className="match-visual" aria-label="Illustration of Virtual Office Angels matching a client with a managed specialist">
            <div className="match-card match-brief"><span>Client brief</span><strong>Mortgage operations</strong><small>Applications · CRM · follow-up</small></div>
            <div className="connector" aria-hidden="true"><span /></div>
            <div className="match-card match-profile"><span>Specialist match</span><strong>Experienced lending support</strong><small>Screened for role and workflow fit</small><em>Virtual Office Angels managed</em></div>
          </div>
        </div>
        <div className="container">
          <dl className="hero-stats">
            {heroStats.map(([figure, label]) => (
              <div key={figure}><dt>{figure}</dt><dd>{label}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section home-client-proof" data-home-reveal="clients">
        <div className="container home-client-layout">
          <header>
            <p className="eyebrow">Our clients</p>
            <h2>Trusted support for businesses that value precision.</h2>
            <p>Supporting Australian businesses with dependable, carefully matched professionals.</p>
          </header>
          <ClientCarousel />
        </div>
      </section>

      <section className="section services-section" data-home-reveal="grid">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Specialised virtual assistant services</p>
              <h2>Virtual support tailored around your industry, systems and standards.</h2>
              <p className="lead compact">Our professional virtual assistant services go beyond general administration. We match businesses with professionals who understand the terminology, documentation and workflows common to their field.</p>
            </div>
            <Link className="button button-secondary" to="/services">Explore services</Link>
          </div>
          <div className="service-grid">
            {specialistServices.map((service, index) => (
              <Link className={`service-card service-card-${index + 1}`} to={service.href} key={service.href}>
                <div className="service-card-top">
                  <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-card-image"><img src={service.image} alt="" loading="lazy" /></span>
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <p className="service-systems">
                    <strong>Systems:</strong>{' '}
                    {service.systems.map((system, systemIndex) => (
                      <Fragment key={system}>
                        <span className="system-name">{system}</span>{systemIndex < service.systems.length - 1 ? ', ' : '.'}
                      </Fragment>
                    ))}
                  </p>
                </div>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section home-managed" data-home-reveal="dark">
        <div className="container">
          <div className="managed-copy">
            <p className="eyebrow">Managed virtual support</p>
            <h2>What managed virtual support means at <em>Virtual Office Angels</em>.</h2>
            <p className="lead">You receive more than a candidate introduction. Your business remains in control of the work, while Virtual Office Angels manages the employment relationship and support structure around the virtual assistant.</p>
            <Link className="text-link light-link" to="/why-voa">Explore managed virtual support <span aria-hidden="true">→</span></Link>
          </div>
          <div className="ownership-grid">
            {ownershipSplit.map((column) => (
              <article key={column.heading}>
                <p className="eyebrow">{column.label}</p>
                <h3>{column.heading}</h3>
                <p>{column.summary}</p>
                <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" data-home-reveal="rows">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">How it works</p><h2>{processIntro.heading}</h2><p className="lead compact">{processIntro.text}</p></div><Link className="button button-secondary" to="/how-it-works">See the complete process</Link></div>
          <ol className="process-list">
            {processStages.map((stage) => (
              <li key={stage.number}><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.summary}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section home-founder-section" data-home-reveal="split">
        <div className="container split-grid story-grid">
          <div className="source-image founder-home-image"><img src="/assets/source/staging/images/feeae1b697-Anne-Villavieja.jpg" alt="Anne Villavieja, founder of Virtual Office Angels" loading="lazy" /></div>
          <div>
            <p className="eyebrow">A more considered match</p>
            <h2>Support selected around your business—not a generic task list.</h2>
            <p className="lead">Virtual Office Angels connects Australian businesses with experienced professionals in the Philippines and supports the relationship after placement.</p>
            <p>Founded by Anne Villavieja after more than 35 years in Australian human resources, recruitment, and team leadership, the service pairs local HR judgement with specialists matched to the work itself.</p>
            <Link className="text-link" to="/about">Learn more about us <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section insight-section" data-home-reveal="compact">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Insights</p><h2>Practical thinking for better delegation and virtual staffing.</h2><p className="lead compact">Explore current guidance on building capacity, choosing the right support and getting more value from a virtual team.</p></div><Link className="button button-secondary" to="/insights">Browse articles</Link></div>
          <div className="home-article-preview">{blogArticles.slice(0, 3).map((article) => <Link className="home-article-card" to={`/insights/${article.slug}`} key={article.slug}><span className="home-article-image"><img src={article.featuredImage} alt="" loading="lazy" /></span><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h3>{article.title}</h3><span className="text-link">Read article <span aria-hidden="true">→</span></span></Link>)}</div>
        </div>
      </section>

      <section className="section home-testimonial-section" data-home-reveal="media">
        <div className="container split-grid story-grid home-testimonial-intro">
          <div className="source-image">
            <img src="/assets/source/staging/images/77beacedea-25711.jpg" alt="Virtual assistant working remotely" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Client experience</p>
            <h2>What working with the right support can feel like.</h2>
            <p className="lead">Whether they are in accounting, legal, real estate, or finance, the tailored approach is intended to provide the right support every time.</p>
            <Link className="text-link" to="/client-stories">Read all testimonials <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="container"><div className="home-testimonial-grid">{testimonials.slice(0, 3).map((testimonial) => <figure key={testimonial.name}><blockquote>{`${testimonial.quote.slice(0, 145).trimEnd()}...`}</blockquote><figcaption><span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></figcaption></figure>)}</div></div>
      </section>

      <section className="section faq-section" data-home-reveal="faq">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h2>What prospective clients usually want to know.</h2>
            <p className="lead compact">Direct answers to the questions Australian businesses ask when considering managed virtual support.</p>
          </div>
          <div className="faq-list">
            {buyerQuestions.map(([question, answer]) => (
              <details key={question} open={openQuestion === question}>
                <summary onClick={(event) => { event.preventDefault(); setOpenQuestion(openQuestion === question ? '' : question); }}>
                  {question}<span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
            <Link className="text-link" to="/faqs">View all FAQs <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section contact-section page-contact-section" data-home-reveal="contact"><div className="container contact-grid"><aside><p className="eyebrow">Your next step</p><h2>Tell us what the right support would change for your business.</h2><p className="lead compact">Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.</p><p className="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br /><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>
    </>
  );
}
