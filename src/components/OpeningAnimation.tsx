import { useEffect, useRef, useState } from 'react';

const KASHMIR_IMG =
  'https://images.pexels.com/photos/15669044/pexels-photo-15669044.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface Props {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseImgRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [whiteFade, setWhiteFade] = useState(false);

  // Stage progression
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3800);
    // Start the white fade-in (faster, cleaner)
    const t4 = setTimeout(() => setWhiteFade(true), 4800);
    // Once the white is fully covering, hide the overlay and notify
    const t5 = setTimeout(() => {
      setHidden(true);
      setTimeout(onComplete, 100);
    }, 5700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Magnifier effect
  useEffect(() => {
    const container = containerRef.current;
    const lens = lensRef.current;
    const base = baseImgRef.current;
    if (!container || !lens || !base) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let active = false;

    const LENS_SIZE = 200;
    const ZOOM = 2.4;

    const animate = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      lens.style.left = `${curX - LENS_SIZE / 2}px`;
      lens.style.top = `${curY - LENS_SIZE / 2}px`;

      const bgX = -curX * ZOOM + LENS_SIZE / 2;
      const bgY = -curY * ZOOM + LENS_SIZE / 2;
      lens.style.backgroundSize = `${window.innerWidth * ZOOM}px ${window.innerHeight * ZOOM}px`;
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        lens.style.opacity = '1';
        curX = targetX;
        curY = targetY;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => {
      active = false;
      lens.style.opacity = '0';
      cancelAnimationFrame(rafId);
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const lines = ['Where Paradise', 'Meets', 'Perfection'];
  const LOGO = '/assets/images/LogoClient-removebg-preview.png';

  return (
    <div
      ref={containerRef}
      className={`intro-overlay ${hidden ? 'hidden' : ''}`}
      style={{ cursor: 'crosshair' }}
    >
      {/* White fade layer — sits above everything, fades in medium-slow */}
      <div className={`intro-fade-white ${whiteFade ? 'active' : ''}`} />
      {/* Base image */}
      <div
        ref={baseImgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${KASHMIR_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 2s ease',
        }}
      />
      {/* Green atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(0,200,83,0.12) 0%, transparent 55%), linear-gradient(180deg, rgba(5,8,5,0.55) 0%, rgba(5,8,5,0.2) 40%, rgba(5,8,5,0.75) 100%)',
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 2s ease',
        }}
      />
      {/* Magnifier lens */}
      <div
        ref={lensRef}
        className="absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundImage: `url(${KASHMIR_IMG})`,
          backgroundRepeat: 'no-repeat',
          border: '2px solid rgba(0,230,118,0.7)',
          boxShadow: '0 0 30px rgba(0,200,83,0.45), inset 0 0 20px rgba(0,200,83,0.15)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 5,
        }}
      />
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <img
          src={LOGO}
          alt="Greenath Kashmir Events"
          className="mb-8 h-20 w-auto object-contain"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 1.5s ease 0.5s, transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.5s',
          }}
        />
        <div
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="text-center"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#A5D6A7' }}>
            Greenath Kashmir Events
          </p>
          {lines.map((line, i) => (
            <h1
              key={line}
              className="font-serif italic leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                color: '#fff',
                textShadow: '0 4px 40px rgba(0,0,0,0.6)',
                opacity: stage >= 2 ? 1 : 0,
                transform: stage >= 2 ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 1s ease ${i * 0.25}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.25}s`,
              }}
            >
              {line}
            </h1>
          ))}
        </div>
        <div
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
          className="mt-10"
        >
          <div className="w-12 h-[1px]" style={{ background: '#00E676' }} />
        </div>
      </div>
      {/* Hint */}
      <div
        className="absolute bottom-10 left-0 right-0 text-center pointer-events-none"
        style={{
          opacity: stage >= 3 ? 0.6 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <p className="font-sans text-xs tracking-[0.3em] uppercase" style={{ color: '#A5D6A7' }}>
          Move your cursor to explore Kashmir
        </p>
      </div>
    </div>
  );
}
