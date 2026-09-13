import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import clientsSource from '../../content/source/staging/clients.json';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const clients = clientsSource.clients;

export function ClientCarousel() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(5);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(true);
  const slides = useMemo(() => [...clients, ...clients.slice(0, 5)], []);

  useEffect(() => {
    const updateVisible = () => setVisible(window.innerWidth < 480 ? 1 : window.innerWidth < 736 ? 2 : window.innerWidth < 1100 ? 3 : 5);
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  useEffect(() => {
    if (reducedMotion || interactionPaused || autoPaused) return;
    const timer = window.setInterval(() => setActive((current) => current + 1), 2000);
    return () => window.clearInterval(timer);
  }, [interactionPaused, autoPaused, reducedMotion]);

  useEffect(() => {
    if (active !== clients.length) return;
    const timer = window.setTimeout(() => {
      setTransitioning(false);
      setActive(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)));
    }, reducedMotion ? 0 : 480);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion]);

  const previous = () => {
    setTransitioning(active !== 0);
    setActive((current) => current === 0 ? clients.length - 1 : current - 1);
    if (active === 0) requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)));
  };

  return <div className="client-carousel" onMouseEnter={() => setInteractionPaused(true)} onMouseLeave={() => setInteractionPaused(false)} onFocusCapture={() => setInteractionPaused(true)} onBlurCapture={() => setInteractionPaused(false)}>
    <div className="client-carousel-viewport">
      <div className="client-carousel-track" style={{ transform: `translateX(-${active * (100 / visible)}%)`, transition: transitioning && !reducedMotion ? undefined : 'none', '--visible-clients': visible } as CSSProperties}>
        {slides.map((client, index) => <div className="client-slide" key={`${client.image}-${index}`} aria-hidden={index < active || index >= active + visible}>
          <img src={client.image} alt={client.name || 'Virtual Office Angels client logo'} loading="lazy" />
          {client.name && <span>{client.name}</span>}
        </div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <span>{String((active % clients.length) + 1).padStart(2, '0')} / {clients.length}</span>
      <div><button type="button" onClick={() => setAutoPaused((value) => !value)}>{autoPaused ? 'Play' : 'Pause'}</button><button type="button" onClick={previous} aria-label="Previous client">←</button><button type="button" onClick={() => setActive((current) => current >= clients.length - 1 ? clients.length : current + 1)} aria-label="Next client">→</button></div>
    </div>
  </div>;
}
