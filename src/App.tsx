import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import OpeningAnimation from '@/components/OpeningAnimation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoSection from '@/components/VideoSection';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const WHATSAPP = '917006206019';

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div className={`loading-overlay ${done ? 'hidden' : ''}`}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent-bright)', animation: 'spin-slow 1s linear infinite' }} />
        <div className="absolute inset-2 rounded-full border-2 border-transparent" style={{ borderBottomColor: 'var(--accent-soft)', animation: 'spin-slow 1.5s linear infinite reverse' }} />
      </div>
      <p className="font-serif italic text-xl" style={{ color: 'var(--accent-soft)' }}>Greenath Kashmir Events</p>
    </div>
  );
}

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const animate = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      raf = requestAnimationFrame(animate);
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(animate); };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div id="cursor-glow" ref={ref} className="hidden md:block" />;
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="WhatsApp us"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoadingDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Lock scroll during intro
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [introDone]);

  return (
    <ThemeProvider>
      <LoadingScreen done={loadingDone} />
      {!introDone && <OpeningAnimation onComplete={() => setIntroDone(true)} />}
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero onWatch={() => window.open('https://www.instagram.com/reel/DJqa-sQv0I5/?igsh=N2UxMWd2NjJwOHRt', '_blank', 'noopener,noreferrer')} />
        <About />
        <VideoSection />
        <Services />
        <Expertise />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </ThemeProvider>
  );
}

export default App;
