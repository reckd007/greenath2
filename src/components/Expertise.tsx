import { useEffect } from 'react';
import { Handshake, Globe, ShieldCheck, Users } from 'lucide-react';

const stats = [
  { icon: Users, value: '45+', label: 'Years of Experience' },
  { icon: Globe, value: '3', label: 'Regions Served' },
  { icon: Handshake, value: '500+', label: 'Events Delivered' },
  { icon: ShieldCheck, value: '100%', label: 'Client Satisfaction' },
];

const partners = [
  'Venue Partners', 'Catering Partners', 'Decor Studios', 'Sound & Lighting',
  'Photography Teams', 'Hospitality Networks', 'Travel Partners', 'Celebrity Agents',
];

export default function Expertise() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Expertise & Partners
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            A Network Built on <span className="italic shimmer-text">Trust</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Decades of relationships with Kashmir's finest vendors, venues, and artisans —
            so every detail of your event is in expert hands.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8 text-center`}
            >
              <s.icon size={28} className="mx-auto mb-4" style={{ color: 'var(--accent-bright)' }} />
              <div className="font-serif text-4xl md:text-5xl mb-2" style={{ color: 'var(--text-primary)' }}>
                {s.value}
              </div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Partner tags */}
        <div className="reveal reveal-delay-2 flex flex-wrap items-center justify-center gap-3">
          {partners.map(p => (
            <span
              key={p}
              className="px-5 py-2.5 rounded-full font-sans text-sm"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                background: 'var(--glass-bg)',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
