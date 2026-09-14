import { Link } from 'react-router-dom';
import { ClientCarousel } from '../components/ui/ClientCarousel';
import { siteContent } from '../content/siteContent';

export function HomePage() {
  return (
    <>
      <section className="l2-home-hero" aria-labelledby="home-heading">
        <div className="l2-home-backdrop" aria-hidden="true" />
        <div className="container l2-home-copy">
          <p className="eyebrow">{siteContent.hero.eyebrow}</p>
          <h1 id="home-heading">Specialist virtual assistants, <span>matched and managed</span> for your business.</h1>
          <p>{siteContent.hero.description}</p>
          <div className="button-row">
            <Link className="button" to="/services">Explore services</Link>
            <Link className="l2-inline-link" to="/how-it-works">See how it works <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="l2-home-clients" aria-labelledby="clients-heading">
        <div className="container l2-client-layout">
          <header>
            <p className="eyebrow">Trusted partnerships</p>
            <h2 id="clients-heading">The company we keep.</h2>
            <p>Supporting Australian businesses with dependable, carefully matched professionals.</p>
          </header>
          <ClientCarousel />
        </div>
      </section>
    </>
  );
}
