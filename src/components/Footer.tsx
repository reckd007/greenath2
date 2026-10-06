import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const PHONE = '+917006206019';
const EMAIL = 'greenathkashmir@gmail.com';
const LOGO = '/assets/images/LogoClient-removebg-preview.png';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Wedding Planning', 'Destination Weddings', 'Event Management',
  'Decorations & Design', 'MICE Services', 'Celebrity Management',
];

const MAP_QUERY =
  'Greenath Kashmir Event Management & Hospitality, Lal Bazar Main Road, Bota Kadal Rd, Srinagar, Jammu and Kashmir 190023';

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="pt-20 pb-8 relative" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img
              src={LOGO}
              alt="Greenath Kashmir Events"
              className="h-14 w-auto object-contain mb-5"
              style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }}
            />
            <p className="font-serif italic text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Creating Unforgettable Moments in Paradise
            </p>
            <p className="font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
              A Unit of Greenath Hospitality Group
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--accent)' }}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link font-sans text-sm">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--accent)' }}>Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s}>
                  <a href="#services" className="nav-link font-sans text-sm">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--accent)' }}>Get in Touch</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-bright)' }} />
                <span className="font-sans text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Lal Bazar Main Road, Bota Kadal Rd, Srinagar, J&K 190023
                </span>
              </li>
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 group">
                  <Phone size={16} style={{ color: 'var(--accent-bright)' }} />
                  <span className="font-sans text-xs" style={{ color: 'var(--text-secondary)' }}>+91 70062 06019</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
                  <Mail size={16} style={{ color: 'var(--accent-bright)' }} />
                  <span className="font-sans text-xs" style={{ color: 'var(--text-secondary)' }}>{EMAIL}</span>
                </a>
              </li>
            </ul>
            {/* Socials */}
            <div className="flex gap-3">
              <a href="https://instagram.com/greenath_kashmir_events" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com/greenathkashmirevents" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="accent-line mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Greenath Kashmir Event Management & Hospitality. All rights reserved.
          </p>
          <p className="font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
            Speak Davar · 45+ years of excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
