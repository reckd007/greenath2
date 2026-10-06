import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const PHONE = '+917006206019';
const WHATSAPP = '917006206019';
const EMAIL = 'greenathkashmir@gmail.com';
const ADDRESS = 'Greenath Kashmir Event Management & Hospitality, Lal Bazar Main Road, Bota Kadal Rd, Srinagar, Jammu and Kashmir 190023';

const MAP_QUERY = encodeURIComponent(
  'Greenath Kashmir Event Management & Hospitality, Lal Bazar Main Road, Bota Kadal Rd, Srinagar, Jammu and Kashmir 190023'
);
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) return;
    setStatus('sending');
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        contact: form.contact.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('sent');
      setForm({ name: '', contact: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, var(--glow) 0%, transparent 50%)' }}
      />
      <div className="section-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="reveal font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Reach Us
          </p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Let's Get Started <span className="italic shimmer-text">Planning</span>
          </h2>
          <div className="reveal reveal-delay-2 accent-line w-24 mx-auto mb-6" />
          <p className="reveal reveal-delay-3 font-sans text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Share your vision with us — we'll bring it to life in the heart of Kashmir.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact info */}
          <div className="reveal glass-card rounded-2xl p-8 md:p-10">
            <h3 className="font-serif text-2xl mb-8" style={{ color: 'var(--text-primary)' }}>Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}>
                  <MapPin size={20} style={{ color: 'var(--accent-bright)' }} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Address</p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ADDRESS}</p>
                </div>
              </div>

              <a href={`tel:${PHONE}`} className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}>
                  <Phone size={20} style={{ color: 'var(--accent-bright)' }} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Phone / WhatsApp</p>
                  <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>+91 70062 06019</p>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}>
                  <Mail size={20} style={{ color: 'var(--accent-bright)' }} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
                  <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}>
                  <Clock size={20} style={{ color: 'var(--accent-bright)' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full font-sans text-xs font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
                    Open 24×7
                  </span>
                  <span className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>Always here for you</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-lg font-sans text-sm font-medium tracking-wide transition-all hover:scale-[1.02]"
              style={{ background: '#25D366', color: '#fff' }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-1 glass-card rounded-2xl p-8 md:p-10">
            <h3 className="font-serif text-2xl mb-8" style={{ color: 'var(--text-primary)' }}>Reach Up</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Email or Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="you@example.com or +91 ..."
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Write us a message</label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Tell us about your event..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                    Sending...
                  </span>
                ) : status === 'sent' ? (
                  <span className="flex items-center gap-2"><CheckCircle size={16} /> Message Sent!</span>
                ) : (
                  <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                )}
              </button>
              {status === 'error' && (
                <p className="font-sans text-sm text-center" style={{ color: '#ef4444' }}>
                  Something went wrong. Please try again or WhatsApp us directly.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Map — styled card with Open in Google Maps button (iframes blocked in sandbox) */}
        <div className="reveal reveal-delay-2">
          <div
            className="map-container relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
            style={{
              minHeight: 280,
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(0,200,83,0.14) 0%, transparent 60%), var(--glass-bg)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--border)' }}
            >
              <MapPin size={28} style={{ color: 'var(--accent-bright)' }} />
            </div>
            <h3 className="font-serif text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
              Find Us in Srinagar
            </h3>
            <p className="font-sans text-sm max-w-xl mb-6" style={{ color: 'var(--text-secondary)' }}>
              {ADDRESS}
            </p>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={16} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
