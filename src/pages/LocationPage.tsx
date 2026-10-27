import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { heroBackgrounds, heroStats } from '../content/homeContent';
import { servicePages } from '../content/sourcePages';
import type { LocationPage as LocationPageData } from '../content/locationPages';
import { NextStepSection } from '../components/layout/PageClosing';
import { ArrowUpRight, HeroStatIcon } from '../components/ui/Icons';
import { useImageRotator } from '../hooks/useImageRotator';
import { Accordion } from './SourcePage';

/* The copy's two marks (see content/locationPages.ts): [label](address) becomes a link, an external
   one opening in a new tab, and *word* a highlighted heading word. */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, label, href, highlight] = match;
    if (highlight) parts.push(<em key={index}>{highlight}</em>);
    else if (href.startsWith('/')) parts.push(<Link key={index} to={href}>{label}</Link>);
    else parts.push(<a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/* The page's own title and description while it is open; the site's defaults return afterwards. */
function usePageSeo({ title, description }: LocationPageData['seo']) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previous = { title: document.title, description: meta?.content };
    document.title = title;
    if (meta) meta.content = description;
    return () => {
      document.title = previous.title;
      if (meta && previous.description !== undefined) meta.content = previous.description;
    };
  }, [title, description]);
}

/* A city landing page, mockup only. Built from existing sections: the homepage hero (same rotating
   photographs, figures and dots), the logo wall, content split, service directory and FAQ. It closes
   with the contact section alone, since the hero already carries the four figures that PageClosing
   would repeat. */
export function LocationPage({ page }: { page: LocationPageData }) {
  const { hero, clients, hours, services, story, faqs } = page;
  const columns = (most: number) => Math.min(clients.wall.length, most);
  const { active: heroImage, select: selectHeroImage } = useImageRotator(heroBackgrounds.length, 6000);
  usePageSeo(page.seo);

  return <>
    <section className="section home-hero">
      <div className="hero-backdrop" aria-hidden="true">
        {heroBackgrounds.map((image, index) => (
          <span className="hero-backdrop-image" key={image} data-active={index === heroImage} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{inline(hero.title)}</h1>
          <p className="lead">{inline(hero.intro)}</p>
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
        <p className="eyebrow">{clients.eyebrow}</p>
        <h2>{inline(clients.heading)}</h2>
        <p className="lead compact">{clients.intro}</p>
      </div></div>
      <div
        className="logo-wall location-logo-wall"
        style={{ '--logo-columns': columns(7), '--logo-columns-md': columns(3), '--logo-columns-sm': columns(2) } as CSSProperties}
      >{clients.wall.map(({ client, location, image }) => (
        <div key={client}>
          {image ? <img src={image} alt={client} loading="lazy" /> : <strong>{client}</strong>}
          <span>{image ? `${client} · ${location}` : location}</span>
        </div>
      ))}</div>
    </div></section>

    <section className="section muted-section"><div className="container content-split">
      <div>
        <p className="eyebrow">{hours.eyebrow}</p>
        <h2>{inline(hours.heading)}</h2>
        <p className="lead compact">{inline(hours.body)}</p>
      </div>
      <div className="task-panel">
        <span className="card-index">{hours.panel}</span>
        <ul className="check-list">{hours.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>
      </div>
    </div></section>

    <section className="section"><div className="container">
      <div className="section-heading"><div>
        <p className="eyebrow">{services.eyebrow}</p>
        <h2>{inline(services.heading)}</h2>
      </div><Link className="button button-secondary" to="/services">All services</Link></div>
      <div className="service-directory location-directory">{services.cards.map((card, index) => (
        <Link to={card.path} className="directory-card" key={card.path}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{card.title}</h3>
            <p><span>{card.text}</span></p>
          </div>
          <img src={servicePages.find((service) => service.path === card.path)?.image} alt="" loading="lazy" />
          <ArrowUpRight />
        </Link>
      ))}</div>
    </div></section>

    <section className="section muted-section"><div className="container content-split">
      <div>
        <p className="eyebrow">{story.eyebrow}</p>
        <h2>{inline(story.heading)}</h2>
        <p className="lead compact">{story.body}</p>
      </div>
      <div className="task-panel">
        <span className="card-index">{story.panel}</span>
        <ul className="check-list">{story.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div></section>

    <section className="section"><div className="container faq-page-grid">
      <aside>
        <p className="eyebrow">{faqs.eyebrow}</p>
        <h2>{inline(faqs.heading)}</h2>
      </aside>
      <Accordion items={faqs.items.map(([question, answer]) => [question, inline(answer)] as const)} idPrefix={`${page.slug}-faq`} headed />
    </div></section>

    <NextStepSection copy={{ eyebrow: 'Let’s talk', heading: `Looking for virtual support in ${page.name}?` }} />
  </>;
}
