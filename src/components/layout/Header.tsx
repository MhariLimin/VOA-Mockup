import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { navigation, type NavigationItem } from '../../content/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

const phoneNumber = '1 300 737 883';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="nav-chevron" viewBox="0 0 12 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m1 1 5 5 5-5" />
    </svg>
  );
}

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

  const renderPanel = (item: NavigationItem) => {
    if (item.groups) {
      return (
        <div className="nav-popover nav-mega" data-open={openMenu === item.label}>
          {item.groups.map((group) => (
            <div className="nav-mega-column" key={group.label}>
              <span className="nav-mega-label">{group.label}</span>
              {group.items.map((child) => (
                <Link to={child.href} key={child.href} onClick={closeNavigation}>{child.label}</Link>
              ))}
            </div>
          ))}
          {item.summary && (
            <aside className="nav-mega-summary">
              <span className="nav-mega-kicker">{item.summary.kicker}</span>
              <h3>{item.summary.heading}</h3>
              <p>{item.summary.text}</p>
              <Link className="nav-mega-link" to={item.summary.href} onClick={closeNavigation}>
                {item.summary.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </aside>
          )}
        </div>
      );
    }

    return (
      <ul className="nav-popover" data-open={openMenu === item.label}>
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link to={child.href} onClick={closeNavigation}>{child.label}</Link>
          </li>
        ))}
      </ul>
    );
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
                {item.children || item.groups ? (
                  <div
                    className="nav-group"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu((current) => current === item.label ? null : current)}
                  >
                    <button
                      className="nav-trigger"
                      type="button"
                      aria-expanded={openMenu === item.label}
                      onClick={() => setOpenMenu((current) => current === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span><ChevronIcon />
                    </button>
                    {renderPanel(item)}
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
          <Link className="header-phone" to="/contact">
            <PhoneIcon />
            <span>{phoneNumber}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
