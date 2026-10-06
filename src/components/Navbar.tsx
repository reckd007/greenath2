import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const LOGO = '/assets/images/LogoClient-removebg-preview.png';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          background: scrolled ? 'var(--nav-blur)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="section-container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img
              src={LOGO}
              alt="Greenath Kashmir Events"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link font-sans text-sm tracking-wide">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <a href="#contact" className="hidden md:inline-flex btn-primary" style={{ padding: '10px 22px', fontSize: '0.75rem' }}>
              Plan Your Event
            </a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[2000] md:hidden transition-all duration-500 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="flex items-center justify-between h-[72px] section-container">
          <img
            src={LOGO}
            alt="Greenath Kashmir Events"
            className="h-10 w-auto object-contain"
            style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
          />
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ color: 'var(--text-primary)' }}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 mt-12">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl italic"
              style={{
                color: 'var(--text-primary)',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4">
            Plan Your Event
          </a>
        </div>
      </div>
    </>
  );
}
