import { Link } from 'react-router-dom';
import { buyerQuestions, processSteps, specialistServices, trustPoints } from '../content/homeContent';
import { blogArticles, articleCategory, formatArticleDate } from '../content/blogContent';
import { testimonials } from '../content/testimonials';
import { siteContent } from '../content/siteContent';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { ContactForm } from '../components/ui/ContactForm';

export function HomePage() {
  const contactSection = <section className="section contact-section page-contact-section"><div className="container contact-grid"><aside><p className="eyebrow">Your next step</p><h2>Tell us what the right support would change for your business.</h2><p className="lead compact">Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the right match.</p><p className="contact-direct"><a href="tel:1300737883">1 300 737 883</a><br /><a href="mailto:clientcare@virtualofficeangels.com.au">clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>;

  return (
    <>
      <section className="section home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="lead">{siteContent.hero.description}</p>
            <div className="button-row">
              <Link className="button" to="/contact">Get Started Today</Link>
              <Link className="button button-secondary" to="/services/mortgage-loans">Explore services</Link>
            </div>
            <p className="proof-line">Australian-managed · Matching specialist virtual assistants since 2010</p>
          </div>
          <div className="match-visual" aria-label="Illustration of Virtual Office Angels matching a client with a managed specialist">
            <div className="match-card match-brief"><span>Client brief</span><strong>Mortgage operations</strong><small>Applications · CRM · follow-up</small></div>
            <div className="connector" aria-hidden="true"><span /></div>
            <div className="match-card match-profile"><span>Specialist match</span><strong>Experienced lending support</strong><small>Screened for role and workflow fit</small><em>Virtual Office Angels managed</em></div>
          </div>
        </div>
      </section>

      <section className="section home-client-proof">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Our clients</p><h2>Trusted support for businesses that value precision.</h2></div></div>
          <ClientCarousel />
        </div>
      </section>

      <section className="evidence-strip" aria-label="Virtual Office Angels highlights">
        <div className="container evidence-grid">
          {trustPoints.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}
        </div>
      </section>

      <section className="section intro-section" data-home-reveal="split">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">A more considered match</p>
            <h2>Support selected around your business—not a generic task list.</h2>
          </div>
          <div>
            <p className="lead">Virtual Office Angels connects Australian businesses with experienced professionals in the Philippines and supports the relationship after placement.</p>
            <Link className="text-link" to="/about">Learn about Virtual Office Angels <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section home-founder-section">
        <div className="container split-grid story-grid">
          <div className="source-image founder-home-image"><img src="/assets/source/staging/images/feeae1b697-Anne-Villavieja.jpg" alt="Anne Villavieja, founder of Virtual Office Angels" loading="lazy" /></div>
          <div><p className="eyebrow">Founder and leadership</p><h2>Built from experience. Supported with care.</h2><p className="lead">Anne Villavieja founded Virtual Office Angels after more than 35 years in Australian human resources, recruitment, and team leadership.</p><Link className="text-link" to="/about#leadership">Meet Anne and the leadership team <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section services-section" data-home-reveal="grid">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Industries and capabilities</p><h2>Specialist support where precision matters.</h2></div>
            <Link className="button button-secondary" to="/services/mortgage-loans">Explore services</Link>
          </div>
          <div className="service-grid">
            {specialistServices.map((service, index) => (
              <Link className={`service-card service-card-${index + 1}`} to={service.href} key={service.href}>
                <div className="service-card-top">
                  <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-card-image"><img src={service.image} alt="" loading="lazy" /></span>
                </div>
                <div className="service-card-copy"><h3>{service.title}</h3><p>{service.text}</p></div>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section" data-home-reveal="dark">
        <div className="container">
          <p className="eyebrow">Why Virtual Office Angels</p>
          <div className="split-grid">
            <h2>A managed service around the person doing the work.</h2>
            <p className="lead">Virtual Office Angels combines specialist recruitment, Australian oversight, and ongoing support so the relationship is designed to work beyond day one.</p>
          </div>
          <div className="difference-grid">
            <article><span>01</span><h3>Specialist recruitment</h3><p>Experience is considered against the role, industry, systems, and working style.</p></article>
            <article><span>02</span><h3>Australian management</h3><p>A local point of contact helps support communication and expectations.</p></article>
            <article><span>03</span><h3>Ongoing support</h3><p>Recruitment is only the start; Virtual Office Angels remains involved in the working relationship.</p></article>
          </div>
          <Link className="text-link light-link" to="/why-voa">Why businesses choose Virtual Office Angels <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section process-section" data-home-reveal="rows">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">How it works</p><h2>From a clear brief to supported delivery.</h2></div></div>
          <ol className="process-list">
            {processSteps.map(([number, title, text]) => (
              <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>
            ))}
          </ol>
          <Link className="button button-secondary" to="/how-it-works">See the complete process</Link>
        </div>
      </section>

      <section className="section story-section" data-home-reveal="media">
        <div className="container split-grid story-grid">
          <div className="source-image">
            <img src="/assets/source/staging/images/77beacedea-25711.jpg" alt="Virtual assistant working remotely" loading="lazy" />
            <small>Image retained locally from the staging website.</small>
          </div>
          <div>
            <p className="eyebrow">Client experience</p>
            <h2>Proof should be specific, credible, and human.</h2>
            <p className="lead">The production site contains named testimonials. The rebuild will present only content that Virtual Office Angels reconfirms for publication—without invented results or brands.</p>
            <Link className="text-link" to="/client-stories">Read client testimonials <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section home-founder-section legacy-home-founder">
        <div className="container split-grid story-grid">
          <div className="source-image founder-home-image"><img src="/assets/source/staging/images/feeae1b697-Anne-Villavieja.jpg" alt="Anne Villavieja, founder of Virtual Office Angels" loading="lazy" /></div>
          <div><p className="eyebrow">Founder and leadership</p><h2>Built from experience. Supported with care.</h2><p className="lead">Anne Villavieja founded Virtual Office Angels after more than 35 years in Australian human resources, recruitment, and team leadership.</p><Link className="text-link" to="/about#leadership">Meet Anne and the leadership team <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section insight-section" data-home-reveal="compact">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Insights</p><h2>Practical guidance for building effective remote support.</h2></div><Link className="button button-secondary" to="/insights">Browse articles</Link></div>
          <div className="home-article-preview">{blogArticles.slice(0, 3).map((article) => <Link className="home-article-card" to={`/insights/${article.slug}`} key={article.slug}><span className="home-article-image"><img src={article.featuredImage} alt="" loading="lazy" /></span><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h3>{article.title}</h3><span className="text-link">Read article <span aria-hidden="true">→</span></span></Link>)}</div>
        </div>
      </section>

      <section className="section home-testimonial-section">
        <div className="container home-testimonial-intro split-grid story-grid"><div className="source-image"><img src="/assets/source/staging/images/77beacedea-25711.jpg" alt="Virtual assistant working remotely" loading="lazy" /></div><div><p className="eyebrow">Client experience</p><h2>Proof should be specific, credible, and human.</h2><p className="lead">See how the right support can create more capacity, confidence, and time for growth.</p></div></div>
        <div className="container"><div className="section-heading"><div><p className="eyebrow">Client testimonials</p><h2>What working with the right support can feel like.</h2></div><Link className="button button-secondary" to="/client-stories">Read all testimonials</Link></div><div className="home-testimonial-grid">{testimonials.slice(0, 3).map((testimonial) => <figure key={testimonial.name}><blockquote>{`${testimonial.quote.slice(0, 145).trimEnd()}...`}</blockquote><figcaption><span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></figcaption></figure>)}</div></div>
      </section>

      <section className="section faq-section" data-home-reveal="faq">
        <div className="container faq-grid">
          <div><p className="eyebrow">Frequently asked questions</p><h2>What prospective clients usually want to know.</h2></div>
          <div className="faq-list">
            {buyerQuestions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
            <Link className="text-link" to="/faqs">View all FAQs <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {contactSection}
    </>
  );
}
