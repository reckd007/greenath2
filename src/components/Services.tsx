import { useEffect } from 'react';
import {
  CalendarCheck, MessageSquare, ClipboardList, Heart, Sparkles, MapPin,
  Megaphone, Package, Building2, Star, Gift, type LucideIcon,
} from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  { icon: CalendarCheck, title: 'Wedding Planning & Destination Weddings', desc: 'Complete wedding planning for elegant local celebrations and unforgettable destination weddings in Kashmir.' },
  { icon: MessageSquare, title: 'Corporate Events & Shows', desc: 'Professional planning and production for corporate gatherings, shows, launches, and memorable brand moments.' },
  { icon: ClipboardList, title: 'Brand Management', desc: 'Strategic event experiences that connect brands with audiences through thoughtful planning and polished execution.' },
  { icon: Heart, title: 'Celebrity Management & Shows', desc: 'End-to-end artist coordination, celebrity appearances, and live shows managed with confidence.' },
  { icon: Sparkles, title: 'Birthday Parties & Social Events', desc: 'Personal celebrations designed around your people, your story, and the atmosphere you want to create.' },
  { icon: MapPin, title: 'Trade Fairs & Exhibitions', desc: 'Structured exhibition planning, stall experiences, visitor flow, and on-ground event management.' },
  { icon: Megaphone, title: 'Conferences & Seminars', desc: 'Reliable conference and seminar solutions with precise schedules, guest care, and technical coordination.' },
  { icon: Package, title: 'Product Launches & Road Shows', desc: 'High-impact launch experiences and road shows built to move with your brand and audience.' },
  { icon: Building2, title: 'Entertainment Solutions & Foreign Artists', desc: 'Curated entertainment, production support, and artist coordination for standout experiences.' },
  { icon: Star, title: 'Media Services', desc: 'Event media support that helps capture, communicate, and extend the impact of every occasion.' },
  { icon: Gift, title: 'Hotel Reservation & Travel Support', desc: 'Thoughtful guest logistics, hotel reservations, and travel support for smooth event experiences.' },
];

export default function Services() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Soft bg accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--glow) 0%, transparent 50%)' }}
      />
      <div className="section-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            What We Do
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Complete Support for <span className="italic shimmer-text">Every Occasion</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            From weddings and corporate shows to exhibitions, launches, travel support, and entertainment, Royal Kashmir manages every detail with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-7 service-card`}
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}
              >
                <s.icon size={22} style={{ color: 'var(--accent-bright)' }} />
              </div>
              <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
            </div>
          ))}
          {/* 12th card - CTA */}
          <div
            className={`reveal reveal-delay-4 rounded-2xl p-7 flex flex-col items-center justify-center text-center service-card`}
            style={{
              background: 'linear-gradient(135deg, rgba(0,200,83,0.12), rgba(0,230,118,0.06))',
              border: '1px solid var(--accent)',
            }}
          >
            <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>Have something else in mind?</h3>
            <p className="font-sans text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Tell us your vision — we'll make it happen.
            </p>
            <a href="#contact" className="btn-primary" style={{ padding: '11px 26px', fontSize: '0.75rem' }}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
