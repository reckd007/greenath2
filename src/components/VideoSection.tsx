import { useEffect, useRef } from 'react';
import { Play, ExternalLink } from 'lucide-react';

const INSTAGRAM_REEL = 'https://www.instagram.com/reel/DJqa-sQv0I5/?igsh=N2UxMWd2NjJwOHRt';
const THUMB =
  'https://images.pexels.com/photos/27794015/pexels-photo-27794015.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 }
    );
    const section = sectionRef.current;
    if (!section) return;
    section.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Our Story in Motion
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Witness the <span className="italic shimmer-text">Magic</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto" />
        </div>

        {/* Cinematic thumbnail — opens the reel on Instagram in a new tab */}
        <a
          href={INSTAGRAM_REEL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal reveal-delay-3 video-glow rounded-2xl overflow-hidden relative aspect-video max-w-5xl mx-auto group cursor-pointer block"
          aria-label="Watch our film on Instagram"
        >
          <img
            src={THUMB}
            alt="Watch our story"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Cinematic letterbox bars */}
          <div className="absolute inset-x-0 top-0 h-14 pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(5,8,5,0.72) 0%,transparent 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(0deg,rgba(5,8,5,0.8) 0%,transparent 100%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(5,8,5,0.38)' }} />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-glow-pulse"
              style={{ background: 'var(--accent)', border: '2px solid var(--accent-bright)' }}
            >
              <Play size={30} color="#fff" className="ml-1" />
            </div>
            <span className="font-sans text-sm tracking-[0.2em] uppercase text-white opacity-80">
              Play Film
            </span>
          </div>

          {/* Instagram badge bottom-right */}
          <div className="absolute bottom-5 right-6 flex items-center gap-1.5 pointer-events-none">
            <ExternalLink size={13} color="rgba(255,255,255,0.55)" />
            <span className="font-sans text-[11px] tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>Opens on Instagram</span>
          </div>
        </a>
      </div>
    </section>
  );
}
