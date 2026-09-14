import { useEffect, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function PageShell({ children }: PropsWithChildren) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const main = document.getElementById('main-content');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0 });
    }

    if (!main) return;

    const pendingSections = new Set<HTMLElement>();
    const revealSection = (section: HTMLElement) => {
      section.dataset.pageVisible = 'true';
      if (section.hasAttribute('data-home-reveal')) section.dataset.visible = 'true';
      pendingSections.delete(section);
    };

    const revealObserver = reducedMotion || !('IntersectionObserver' in window)
      ? null
      : new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealSection(entry.target as HTMLElement);
          revealObserver?.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    const revealVisibleSections = () => {
      pendingSections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
          revealSection(section);
          revealObserver?.unobserve(section);
        }
      });
    };

    const registerSections = () => {
      const sections = main.querySelectorAll<HTMLElement>('.section, .evidence-strip');
      sections.forEach((section) => {
        if (section.classList.contains('home-hero')) return;

        if (section.dataset.pageMotionReady !== 'true') {
          section.dataset.pageMotionReady = 'true';
          if (section.hasAttribute('data-home-reveal')) section.dataset.motionReady = 'true';
        }
        if (section.dataset.pageVisible === 'true') return;

        const bounds = section.getBoundingClientRect();
        const alreadyVisible = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;

        if (!revealObserver || alreadyVisible) revealSection(section);
        else {
          pendingSections.add(section);
          revealObserver.observe(section);
        }
      });
    };

    registerSections();
    const contentObserver = new MutationObserver(registerSections);
    contentObserver.observe(main, { childList: true, subtree: true });
    window.addEventListener('scroll', revealVisibleSections, { passive: true });
    window.addEventListener('resize', revealVisibleSections);
    window.addEventListener('load', revealVisibleSections);
    const initialVisibilityCheck = window.setTimeout(revealVisibleSections, 250);

    return () => {
      window.clearTimeout(initialVisibilityCheck);
      window.removeEventListener('scroll', revealVisibleSections);
      window.removeEventListener('resize', revealVisibleSections);
      window.removeEventListener('load', revealVisibleSections);
      contentObserver.disconnect();
      revealObserver?.disconnect();
      pendingSections.clear();
    };
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="page-stage" key={pathname}>{children}</main>
      <Footer />
    </>
  );
}
