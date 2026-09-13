import { useEffect, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function PageShell({ children }: PropsWithChildren) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
