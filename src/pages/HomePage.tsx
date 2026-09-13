import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buyerQuestions, processSteps, specialistServices, trustPoints } from '../content/homeContent';
import { siteContent } from '../content/siteContent';

export function HomePage() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-home-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sections.forEach((section) => { section.dataset.motionReady = 'true'; });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => { section.dataset.visible = 'true'; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = 'true';
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
              <Link className="button button-secondary" to="/services">Explore services</Link>
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

      <section className="section services-section" data-home-reveal="grid">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Industries and capabilities</p><h2>Specialist support where precision matters.</h2></div>
            <Link className="button button-secondary" to="/services">View all services</Link>
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

      <section className="section insight-section" data-home-reveal="compact">
        <div className="container section-heading">
          <div><p className="eyebrow">Insights</p><h2>Practical guidance for building effective remote support.</h2></div>
          <div className="button-row"><Link className="button button-secondary" to="/insights">Browse articles</Link><Link className="button button-secondary" to="/videos">Watch videos</Link></div>
        </div>
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

      <section className="section final-cta" data-home-reveal="cta">
        <div className="container cta-panel">
          <div><p className="eyebrow">Ready to start?</p><h2>Build the right support around your business.</h2><p>Tell Virtual Office Angels about the role, recurring work, tools, and coverage you need.</p></div>
          <div className="button-row"><Link className="button" to="/contact">Get Started Today</Link><a className="button button-secondary" href="tel:1300737883">Call 1 300 737 883</a></div>
        </div>
      </section>
    </>
  );
}
