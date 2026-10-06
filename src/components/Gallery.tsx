import { useEffect } from 'react';

const images = [
  { url: 'https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Mandap Design', span: 'lg:col-span-2 lg:row-span-2' },
  { url: 'https://images.pexels.com/photos/27635496/pexels-photo-27635496.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Bridal Elegance', span: '' },
  { url: 'https://images.pexels.com/photos/14148087/pexels-photo-14148087.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Night Celebrations', span: '' },
  { url: 'https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Floral Canopy', span: '' },
  { url: 'https://images.pexels.com/photos/31307956/pexels-photo-31307956.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Outdoor Setup', span: '' },
  { url: 'https://images.pexels.com/photos/10714553/pexels-photo-10714553.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Kashmir Venues', span: 'lg:col-span-2' },
];

export default function Gallery() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Portfolio
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Moments We've <span className="italic shimmer-text">Created</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            A glimpse into the celebrations, weddings, and events we've brought to life across Kashmir.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 4) + 1} gallery-card rounded-2xl relative group ${img.span}`}
              style={{ border: '1px solid var(--border)' }}
            >
              <img
                src={img.url}
                alt={img.label}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div
                className="absolute inset-0 rounded-2xl flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,8,5,0.85) 100%)' }}
              >
                <p className="font-serif text-xl italic" style={{ color: '#fff' }}>{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
