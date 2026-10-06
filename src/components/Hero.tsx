import { useEffect, useState } from 'react';
import { Play, ChevronDown } from 'lucide-react';

const HERO_IMG =
  'https://images.pexels.com/photos/18358505/pexels-photo-18358505.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface Props {
  onWatch: () => void;
}

const LEAF_SVG = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9 0-3-1-5-3-7 2 1 4 3 5 5 0-5-2-9-9-11 0 0 4 0 7 3-1-4-4-6-7-6z" opacity="0.9"/>
  </svg>
);

interface LeafConfig {
  left: string;
  size: number;
  dur: number;
  delay: number;
  sway: number;
  rot: number;
  color: string;
}

const LEAVES: LeafConfig[] = [
  { left: '5%',  size: 28, dur: 8,  delay: 0,   sway: 40,  rot: 360,  color: '#1a6b3c' },
  { left: '12%', size: 22, dur: 11, delay: 2.5, sway: -30, rot: -300, color: '#2d8f56' },
  { left: '3%',  size: 34, dur: 10, delay: 4,   sway: 50,  rot: 420,  color: '#4caf6f' },
  { left: '15%', size: 20, dur: 9,  delay: 6,   sway: -40, rot: -360, color: '#1a6b3c' },
  { left: '8%',  size: 26, dur: 12, delay: 1.5, sway: 35,  rot: 540,  color: '#2d8f56' },

  { left: '92%', size: 30, dur: 9,  delay: 0.5, sway: -45, rot: -360, color: '#1a6b3c' },
  { left: '85%', size: 24, dur: 11, delay: 3,   sway: 35,  rot: 300,  color: '#2d8f56' },
  { left: '95%', size: 32, dur: 10, delay: 5,   sway: -50, rot: -420, color: '#4caf6f' },
  { left: '80%', size: 22, dur: 8,  delay: 7,   sway: 30,  rot: 360,  color: '#1a6b3c' },
  { left: '88%', size: 26, dur: 12, delay: 2,   sway: -35, rot: -540, color: '#2d8f56' },
];

export default function Hero({ onWatch }: Props) {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.35}px) scale(1.1)`,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,5,0.7) 0%, rgba(5,8,5,0.35) 40%, rgba(5,8,5,0.85) 100%), radial-gradient(ellipse at 50% 50%, rgba(0,200,83,0.1) 0%, transparent 60%)',
        }}
      />

      {/* Falling leaves on both sides */}
      {mounted && LEAVES.map((leaf, i) => (
        <div
          key={i}
          className="falling-leaf"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            color: leaf.color,
            // CSS custom props for the keyframe animation
            ['--dur' as string]: `${leaf.dur}s`,
            ['--delay' as string]: `${leaf.delay}s`,
            ['--sway' as string]: `${leaf.sway}px`,
            ['--rot' as string]: `${leaf.rot}deg`,
          }}
        >
          {LEAF_SVG}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <img
          src="/assets/images/LogoClient-removebg-preview.png"
          alt="Greenath Kashmir Events"
          className="mx-auto mb-8 h-20 w-auto object-contain"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
          }}
        />
        <p
          className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
          style={{
            color: 'var(--accent-soft)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
          }}
        >
          A Unit of Greenath Hospitality Group
        </p>

        {/* "Weddings. Hospitality. Events." — falls from above smoothly */}
        <h1
          className="font-serif leading-[1.05] mb-6 flex flex-col items-center gap-1"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: 'var(--text-primary)' }}
        >
          {['Weddings.', 'Hospitality.', 'Events.'].map((word, i) => (
            <span
              key={word}
              className={i === 2 ? 'italic shimmer-text' : ''}
              style={{
                display: 'inline-block',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(-120vh)',
                transition: `opacity 0.8s ease ${0.5 + i * 0.25}s, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.5 + i * 0.25}s`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="font-sans text-base md:text-lg max-w-2xl mx-auto mb-4"
          style={{
            color: 'var(--text-secondary)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 1.4s, transform 1s ease 1.4s',
          }}
        >
          Creating Memorable Events in the Heart of Kashmir
        </p>
        <p
          className="font-sans text-sm md:text-base max-w-xl mx-auto mb-10"
          style={{
            color: 'var(--text-muted)',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 1.6s',
          }}
        >
          45+ years of crafting unforgettable weddings and events in paradise.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 1.8s, transform 1s ease 1.8s',
          }}
        >
          <a href="#contact" className="btn-primary">Let's Plan Your Event</a>
          <button onClick={onWatch} className="btn-outline">
            <Play size={16} /> Watch Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
        style={{ opacity: mounted ? 0.6 : 0, transition: 'opacity 1s ease 2.2s' }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-secondary)' }}>Scroll</span>
        <ChevronDown size={18} className="animate-bounce" style={{ color: 'var(--accent-soft)' }} />
      </div>
    </section>
  );
}
