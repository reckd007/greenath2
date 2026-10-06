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
  { icon: CalendarCheck, title: 'Event Planning', desc: 'End-to-end planning that turns your vision into a flawlessly executed reality.' },
  { icon: MessageSquare, title: 'Event Consultation', desc: 'Expert guidance to shape your ideas, budget, and timeline with confidence.' },
  { icon: ClipboardList, title: 'Event Management', desc: 'On-ground coordination and logistics handled with precision from start to finish.' },
  { icon: Heart, title: 'Wedding Planning', desc: 'Timeless Kashmiri weddings crafted with love, tradition, and modern elegance.' },
  { icon: Sparkles, title: 'Decorations & Designing', desc: 'Bespoke decor and stage design that transforms any venue into a dreamscape.' },
  { icon: MapPin, title: 'Destination Wedding Planning', desc: 'From lakeside to mountaintop — unforgettable weddings in Kashmir’s most stunning locales.' },
  { icon: Megaphone, title: 'Event Marketing', desc: 'Strategic promotion and branding to make your event the talk of the town.' },
  { icon: Package, title: 'Event Equipment Rentals', desc: 'Premium sound, lighting, staging, and equipment — everything you need, on demand.' },
  { icon: Building2, title: 'MICE Services', desc: 'Meetings, incentives, conferences & exhibitions across Jammu, Kashmir & Ladakh.' },
  { icon: Star, title: 'Celebrity Management', desc: 'Curated artist and celebrity bookings, managed end-to-end for your special occasion.' },
  { icon: Gift, title: 'Party Supplies Rental', desc: 'A vast inventory of party essentials to bring every celebration to life.' },
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
            Services Crafted for <span className="italic shimmer-text">Every Occasion</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            A full-spectrum event house — from the first idea to the final applause.
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
