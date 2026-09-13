import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { navigation } from '../../content/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const closeNavigation = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Virtual Office Angels home">
          <img
            src="/assets/source/staging/images/0afc8f6269-untitled-5.png"
            width="341"
            height="74"
            alt="Virtual Office Angels"
          />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
        <nav id="primary-navigation" className="primary-navigation" data-open={mobileOpen} aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div className="nav-group">
                    <button
                      className="nav-trigger"
                      type="button"
                      aria-expanded={openMenu === item.label}
                      onClick={() => setOpenMenu((current) => current === item.label ? null : item.label)}
                    >
                      {item.label}<span aria-hidden="true">⌄</span>
                    </button>
                    <ul className="nav-popover" data-open={openMenu === item.label}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link to={child.href} onClick={closeNavigation}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link to={item.href} onClick={closeNavigation}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button" to="/contact">
            Get Started Today
          </Link>
        </div>
      </div>
    </header>
  );
}
