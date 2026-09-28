import { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { buyerQuestions, contactBackgrounds, heroBackgrounds, heroStats, moreThanRecruitment, specialistServices } from '../content/homeContent';
import { blogArticles, articleCategory, formatArticleDate } from '../content/blogContent';
import { testimonials } from '../content/testimonials';
import { siteContent } from '../content/siteContent';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { ContactForm } from '../components/ui/ContactForm';
import { ArrowLeft, ArrowRight, ArrowUpRight, MailIcon, PhoneIcon, PlusMark, HeroStatIcon } from '../components/ui/Icons';
import { RotatingBackdrop } from '../components/ui/RotatingBackdrop';
import { stageGlyphs } from '../components/ui/StageGlyphs';
import { useImageRotator } from '../hooks/useImageRotator';
import { useReducedMotion } from '../hooks/useReducedMotion';

/* Points on the quadratic curve the journey line draws, as percentages of its box. */
const JOURNEY_POINTS = [
  { x: '10%', y: '62.1%' },
  { x: '36%', y: '38.86%' },
  { x: '62%', y: '30.48%' },
  { x: '86%', y: '35.96%' },
];

export function HomePage() {
  const [openQuestion, setOpenQuestion] = useState('');
  const [activeService, setActiveService] = useState(-1);
  const [openStage, setOpenStage] = useState(0);
  const articleRail = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollRail = (direction: 1 | -1) => {
    const rail = articleRail.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' });
  };
  /* 6s per image: the 2.2s cross-fade needs headroom, or the next fade starts before the photograph
     has been still long enough to read. Originally specified as 3s. */
  const { active: heroImage, select: selectHeroImage } = useImageRotator(heroBackgrounds.length, 6000);

  return (
    <>
      <section className="section home-hero">
        <div className="hero-backdrop" aria-hidden="true">
          {heroBackgrounds.map((image, index) => (
            <span className="hero-backdrop-image" key={image} data-active={index === heroImage} style={{ backgroundImage: `url(${image})` }} />
          ))}
        </div>
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
        </div>
        <div className="container">
          <dl className="hero-stats">
            {heroStats.map(([figure, label], index) => (
              <div key={figure}><dt><span className="hero-stat-icon" aria-hidden="true"><HeroStatIcon index={index} /></span>{figure}</dt><dd>{label}</dd></div>
            ))}
          </dl>
          <div className="hero-dots" role="group" aria-label="Choose a background image">
            {heroBackgrounds.map((image, index) => (
              <button
                className="hero-dot"
                type="button"
                key={image}
                data-active={index === heroImage}
                aria-label={`Background image ${index + 1}`}
                aria-pressed={index === heroImage}
                onClick={() => selectHeroImage(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-client-proof" data-home-reveal="clients">
        <div className="container home-client-layout">
          <header>
            <p className="eyebrow">Our clients</p>
            <h2>Trusted by leading <em>Australian businesses</em>.</h2>
            <p>Supporting Australian businesses with dependable, carefully matched professionals.</p>
          </header>
          <ClientCarousel />
        </div>
      </section>

      <section className="section services-section has-section-backdrop" data-home-reveal="grid">
        <div className="services-wash" aria-hidden="true">
          {specialistServices.map((service, index) => (
            <span key={service.href} data-active={index === activeService} style={{ backgroundImage: `url(${service.image})` }} />
          ))}
        </div>
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Specialised virtual assistant services</p>
              <h2>Virtual support tailored around your <em>industry</em>, <em>systems</em> and <em>standards</em>.</h2>
              <p className="lead compact">Our professional virtual assistant services go beyond general administration. We match businesses with professionals who understand the terminology, documentation and workflows common to their field.</p>
            </div>
            <Link className="button button-secondary" to="/services">Explore services</Link>
          </div>
          <div className="service-grid">
            {specialistServices.map((service, index) => (
              <Link
                className={`service-card service-card-${index + 1}`}
                to={service.href}
                key={service.href}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService((current) => (current === index ? -1 : current))}
                onFocus={() => setActiveService(index)}
                onBlur={() => setActiveService((current) => (current === index ? -1 : current))}
              >
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
                <ArrowUpRight className="card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section home-managed" data-home-reveal="dark">
        <div className="container">
          <div className="managed-copy">
            <p className="eyebrow">More than recruitment</p>
            <h2>What is an <em>HR Managed Virtual Support</em> Solution?</h2>
            <p className="lead">{moreThanRecruitment.intro}</p>
            <div className="button-row">
              <Link className="button" to="/how-it-works">See how it works</Link>
              <Link className="button button-secondary" to="/why-voa">Explore managed virtual support</Link>
            </div>
          </div>
          {/* The four stages as milestones on a drawn path. The line carries the section's actual
              point: it does not stop at the last stage, it fades off the right edge, because ongoing
              support has no end. Marker positions are points on the same quadratic curve the SVG
              draws, so they sit exactly on it at any width. */}
          <div className="journey">
            {/* Curve and markers share one box, so the marker percentages and the SVG viewBox map to
                the same rectangle. */}
            <div className="journey-plot">
            <svg className="journey-line" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="journey-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#73c9ff" stopOpacity="0.12" />
                  <stop offset="0.1" stopColor="#73c9ff" stopOpacity="0.85" />
                  <stop offset="0.62" stopColor="#8fb8e6" stopOpacity="0.85" />
                  <stop offset="0.86" stopColor="#ee7d16" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ee7d16" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 Q500,10 1000,90" fill="none" stroke="url(#journey-stroke)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol>
              {moreThanRecruitment.stages.map((stage, index) => (
                <li
                  key={stage.name}
                  data-open={openStage === index}
                  data-place={index % 2 === 0 ? 'below' : 'above'}
                  style={{ left: JOURNEY_POINTS[index].x, top: JOURNEY_POINTS[index].y }}
                >
                  <button
                    type="button"
                    aria-expanded={openStage === index}
                    aria-controls="stage-flow-detail"
                    onClick={() => setOpenStage(index)}
                  >
                    <span className="journey-marker" aria-hidden="true">
                      <i className="journey-diamond" />
                      <span className="journey-icon">{stageGlyphs[index]}</span>
                    </span>
                    <span className="journey-label">
                      <span className="journey-step">{String(index + 1).padStart(2, '0')}</span>
                      <span className="journey-name">{stage.name}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            </div>

            <div className="stage-detail" id="stage-flow-detail" data-stage={String(openStage + 1).padStart(2, '0')}>
              <h3 key={`h${openStage}`}>{moreThanRecruitment.stages[openStage]?.heading}</h3>
              <p key={openStage}>{moreThanRecruitment.stages[openStage]?.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-founder-section" data-home-reveal="split">
        <div className="container split-grid story-grid">
          <div className="source-image founder-home-image"><img src="/assets/client/anne-villavieja.jpg" alt="Anne Villavieja, founder of Virtual Office Angels" loading="lazy" /></div>
          <div>
            <p className="eyebrow">Australian-led, people-first outsourcing company</p>
            <h2>Built on <em>HR expertise</em> and first-hand <em>market experience</em>.</h2>
            <p className="lead">Virtual Office Angels was established by Anne Villavieja, whose two decades of HR experience with Australian companies shape our practical approach to recruitment and long-term virtual support.</p>
            <p>Based in Australia and originally from the Philippines, Anne brings together an understanding of the country’s professional talent with the expectations of Australian businesses. That perspective helps Virtual Office Angels build working relationships designed for confidence, continuity, and long-term value.</p>
            <Link className="text-link" to="/about">Learn more about us <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section insight-section" data-home-reveal="compact">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Insights and resources</p><h2>Learn more about <em>delegation</em> and <em>virtual staffing</em>.</h2><p className="lead compact">Explore current guidance on building capacity, choosing the right virtual assistant, and getting more value from a remote team.</p></div><Link className="button button-secondary" to="/insights">Browse articles</Link></div>
          <div className="article-rail" ref={articleRail} tabIndex={0} role="group" aria-label="Latest articles">
            {blogArticles.map((article) => <Link className="home-article-card" to={`/insights/${article.slug}`} key={article.slug}><span className="home-article-image"><img src={article.featuredImage} alt="" loading="lazy" /></span><small>{formatArticleDate(article.date)} · {articleCategory(article)}</small><h3>{article.title}</h3><span className="text-link">Read article <ArrowRight /></span></Link>)}
          </div>
          <div className="rail-controls">
            <button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll to earlier articles"><ArrowLeft /></button>
            <button type="button" onClick={() => scrollRail(1)} aria-label="Scroll to more articles"><ArrowRight /></button>
          </div>
        </div>
      </section>

      <section className="section home-testimonial-section" data-home-reveal="media">
        <div className="container split-grid story-grid home-testimonial-intro">
          <div className="source-image">
            <img src="/assets/client/contact/contact-team-laptop.jpg" alt="A group of business people talking around a laptop" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Client feedback</p>
            <h2>What Australian businesses say about <em>working with Virtual Office Angels</em>.</h2>
            <p className="lead">Real feedback on matching, service quality, and the day-to-day value of dependable virtual support.</p>
            <Link className="text-link" to="/client-stories">Read all testimonials <ArrowRight /></Link>
          </div>
        </div>
        <div className="container"><div className="home-testimonial-grid">{testimonials.slice(0, 3).map((testimonial) => <figure key={testimonial.name}><blockquote>{`${testimonial.quote.slice(0, 145).trimEnd()}...`}</blockquote><figcaption><span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></figcaption></figure>)}</div></div>
      </section>

      <section className="section faq-section" data-home-reveal="faq">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h2>Before you delegate and <em>get started</em>.</h2>
            <p className="lead compact">Here are direct answers to the questions Australian businesses ask when considering fully managed virtual support.</p>
          </div>
          <div className="faq-list">
            {buyerQuestions.map(({ question, answer, link }) => (
              <details key={question} open={openQuestion === question}>
                <summary onClick={(event) => { event.preventDefault(); setOpenQuestion(openQuestion === question ? '' : question); }}>
                  {question}<PlusMark />
                </summary>
                <p>{answer}{link && <> <Link to={link.href}>{link.label}</Link>.</>}</p>
              </details>
            ))}
            <Link className="text-link" to="/faqs">View all FAQs <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section contact-section page-contact-section has-section-backdrop" data-home-reveal="contact"><RotatingBackdrop images={contactBackgrounds} /><div className="container contact-grid"><aside><p className="eyebrow">Let’s talk</p><h2>Tell us where your business needs virtual support.</h2><p className="lead compact">Share the work that is taking time away from clients, revenue or delivery. We’ll help clarify the remote role and the experience it needs.</p><p className="contact-direct"><a href="tel:1300737883"><PhoneIcon />1 300 737 883</a><a href="mailto:clientcare@virtualofficeangels.com.au"><MailIcon />clientcare@virtualofficeangels.com.au</a></p></aside><ContactForm /></div></section>
    </>
  );
}
