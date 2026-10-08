import { useEffect } from 'react';
import { Award, Layers, Heart } from 'lucide-react';

const cards = [
  {
    icon: Award,
    title: 'Experienced Event Specialists',
    desc: 'Professional event management rooted in Srinagar, with the experience and relationships to deliver exceptional celebrations across Kashmir.',
  },
  {
    icon: Layers,
    title: 'Large-Scale Capability',
    desc: 'From intimate celebrations to major productions, our teams can coordinate up to 80 crew members on the ground for seamless execution.',
  },
  {
    icon: Heart,
    title: 'Cost-Effective Excellence',
    desc: 'We combine high-quality production with practical planning, trusted industry relationships, and attentive service from first brief to final guest.'
  },
];

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Why Royal Kashmir
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Events Delivered with <span className="italic shimmer-text">Royal Confidence</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Royal Kashmir Event Management Private Limited is a professional event management company based in Srinagar, Kashmir. We create cost-effective, high-quality experiences while bringing together strong industry relationships, detailed planning, and seamless on-ground execution.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8 text-center service-card`}
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}
              >
                <c.icon size={26} style={{ color: 'var(--accent-bright)' }} />
              </div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
