import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { caseStudy } from '../content/caseStudy';
import { sourceFaqs } from '../content/faqContent';
import { serviceDetails } from '../content/serviceDetails';
import { heroBackgrounds, heroStats } from '../content/homeContent';
import { siteContent } from '../content/siteContent';
import { locationClients, locationServices, type LocationPage as LocationPageData } from '../content/locationPages';
import { NextStepSection } from '../components/layout/PageClosing';
import { ArrowRight, ArrowUpRight, HeroStatIcon } from '../components/ui/Icons';
import { useImageRotator } from '../hooks/useImageRotator';
import { Accordion } from './SourcePage';

/* The FAQs a business weighing up a local page is most likely to ask, verbatim from the source:
   operating hours, weekend work, communication, privacy. */
const LOCAL_FAQS = [6, 7, 8, 9].map((index) => sourceFaqs[index]);

/* A city landing page, mockup only (see content/locationPages.ts). Built from existing sections: the
   homepage hero (same rotating photographs, figures and dots), the logo wall, content split, service
   directory and FAQ. It closes with the contact section alone, since the hero already carries the
   four figures that PageClosing would repeat. */
export function LocationPage({ page }: { page: LocationPageData }) {
  const clients = locationClients(page);
  const services = locationServices(page);
  const area = page.area ?? page.name;
  const columns = (most: number) => Math.min(clients.length, most);
  const { active: heroImage, select: selectHeroImage } = useImageRotator(heroBackgrounds.length, 6000);

  return <>
    <section className="section home-hero">
      <div className="hero-backdrop" aria-hidden="true">
        {heroBackgrounds.map((image, index) => (
          <span className="hero-backdrop-image" key={image} data-active={index === heroImage} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Virtual assistants · {page.name}, {page.state}</p>
          <h1>Virtual assistants for <em>{page.name}</em> businesses.</h1>
          <p className="lead">{siteContent.hero.description}</p>
          <div className="button-row">
            <Link className="button" to="/contact">Find the Right Fit</Link>
            <a className="button button-secondary" href="#local-clients">See local clients</a>
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

    <section className="section" id="local-clients"><div className="container">
      <div className="section-heading"><div>
        <p className="eyebrow">Local clients</p>
        <h2>Trusted by businesses across <em>{area}</em>.</h2>
        <p className="lead compact">{clients.length === 1 ? `1 business in ${area} currently works` : `${clients.length} businesses in ${area} currently work`} with {page.placements.length === 1 ? 'one of our virtual assistants' : `${page.placements.length} of our virtual assistants`}.</p>
      </div></div>
      <div
        className="logo-wall location-logo-wall"
        style={{ '--logo-columns': columns(7), '--logo-columns-md': columns(3), '--logo-columns-sm': columns(2) } as CSSProperties}
      >{clients.map(({ client, suburb, image }) => (
        <div key={client}>
          {image ? <img src={image} alt={client} loading="lazy" /> : <strong>{client}</strong>}
          <span>{image ? `${client} · ${suburb}` : suburb}</span>
        </div>
      ))}</div>
    </div></section>

    <section className="section muted-section"><div className="container content-split">
      <div>
        <p className="eyebrow">Working hours</p>
        <h2>Support that works <em>your hours</em>.</h2>
        <p className="lead compact">{sourceFaqs[6][1]}</p>
      </div>
      <div className="task-panel">
        <span className="card-index">Your hours, {page.name} time</span>
        <ul className="check-list">{page.hours.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div></section>

    <section className="section"><div className="container">
      <div className="section-heading"><div>
        <p className="eyebrow">Services</p>
        <h2>The support {page.name} clients <em>use</em>.</h2>
      </div><Link className="button button-secondary" to="/services">All services</Link></div>
      <div className="service-directory">{services.map((service, index) => {
        const detail = serviceDetails[service.path];
        return <Link to={service.path} className="directory-card" key={service.path}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{detail?.title ?? service.title}</h2>
            <p><span>{detail?.lead ?? service.summary}</span></p>
          </div>
          <img src={service.image} alt="" loading="lazy" />
          <ArrowUpRight />
        </Link>;
      })}</div>
    </div></section>

    <section className="section muted-section"><div className="container content-split">
      <div>
        <p className="eyebrow">Client story</p>
        {page.caseStudy
          ? <><h2>{caseStudy.heading}</h2><p className="lead compact">{caseStudy.intro}</p><Link className="text-link" to="/client-stories#case-study">Read the case study <ArrowRight /></Link></>
          : <><h2>A {page.name} client story.</h2><p className="lead compact">[Placeholder: a story from a {page.name} client, added only with their permission.]</p></>}
      </div>
      <div className="task-panel">
        {page.caseStudy
          ? <><span className="card-index">{caseStudy.hadIntro}</span><ul className="check-list">{caseStudy.had.map((item) => <li key={item}>{item}</li>)}</ul></>
          : <><span className="card-index">Local proof</span><p className="lead compact">[Placeholder: what the client needed, and the support that was put in place.]</p></>}
      </div>
    </div></section>

    <section className="section"><div className="container faq-page-grid">
      <aside>
        <p className="eyebrow">Questions</p>
        <h2>What {page.name} businesses <em>ask us</em>.</h2>
      </aside>
      <Accordion items={LOCAL_FAQS} idPrefix={`${page.slug}-faq`} />
    </div></section>

    <NextStepSection copy={{ eyebrow: 'Let’s talk', heading: `Looking for virtual support in ${page.name}?` }} />
  </>;
}
