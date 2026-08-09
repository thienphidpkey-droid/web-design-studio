import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(labelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        headlineRef.current?.querySelectorAll('.word') ?? [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        '-=0.2'
      )
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .fromTo(mockupRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.0 }, '-=0.9');
  }, []);

  const scrollToFeatured = () => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="intro"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        padding: '80px 60px 60px',
        gap: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}>
        {/* Architectural vertical lines */}
        {[15, 35, 65, 85].map((pct, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0,
            left: `${pct}%`,
            width: '1px',
            height: '100%',
            background: 'rgba(255,255,255,0.025)',
          }} />
        ))}
        {/* Subtle purple glow blob */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Bottom left glow */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* LEFT CONTENT */}
      <div style={{
        flex: '1',
        maxWidth: '560px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Label */}
        <div ref={labelRef} style={{ opacity: 0, marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--purple)',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: 'var(--purple)',
              textTransform: 'uppercase',
            }}>
              DIGITAL EXPERIENCES
            </span>
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ marginBottom: '32px' }}>
          {[
            { text: 'SELECTED', accent: false },
            { text: 'WEB', accent: false },
            { text: 'WORK.', accent: true },
          ].map((line, i) => (
            <div
              key={i}
              className="word"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: line.accent ? 'var(--purple)' : 'var(--text)',
                marginBottom: '4px',
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Sub text */}
        <div ref={subRef} style={{ opacity: 0, marginBottom: '48px' }}>
          {[
            '20+ websites.',
            'Different industries.',
            'One person behind the screen.',
          ].map((line, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: i === 2 ? 'var(--text-secondary)' : 'var(--muted)',
              lineHeight: 2,
              letterSpacing: '0.02em',
              fontWeight: i === 2 ? 400 : 300,
            }}>
              {line}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <button
            onClick={scrollToFeatured}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              padding: '14px 24px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: 'var(--text)',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget;
              btn.style.borderColor = 'var(--purple)';
              btn.style.color = 'var(--purple)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget;
              btn.style.borderColor = 'var(--border)';
              btn.style.color = 'var(--text)';
            }}
          >
            EXPLORE THE ARCHIVE
            <ArrowDown size={14} style={{ transition: 'transform 0.3s ease' }} />
          </button>
        </div>
      </div>

      {/* RIGHT — MOCKUP */}
      <div ref={mockupRef} style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        opacity: 0,
      }}>
        {/* Browser frame */}
        <div style={{
          width: '100%',
          maxWidth: '580px',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.08)',
          position: 'relative',
        }}>
          {/* Browser chrome bar */}
          <div style={{
            background: '#0D0D14',
            borderBottom: '1px solid rgba(139,92,246,0.15)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2D2D38' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2D2D38' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2D2D38' }} />
            <div style={{
              marginLeft: '8px',
              flex: 1,
              height: '20px',
              borderRadius: '3px',
              background: '#1A1A24',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'var(--muted)',
                letterSpacing: '0.05em',
              }}>
                heonamedia.studio
              </span>
            </div>
          </div>

          {/* Website preview image */}
          <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
            <img
              src="/project_heona.webp"
              alt="HEONA MEDIA — Featured Project"
              width={580}
              height={362}
              loading="eager"
              decoding="sync"
              // @ts-ignore
              fetchpriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Subtle purple overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(139,92,246,0.06)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Floating label */}
        <div style={{
          position: 'absolute',
          bottom: '-16px',
          right: '0',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ width: '20px', height: '1px', background: 'var(--border)' }} />
          LATEST PROJECT — HEONA MEDIA
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          #intro {
            flex-direction: column !important;
            padding: 100px 24px 60px !important;
            min-height: auto !important;
            gap: 40px !important;
          }
          #intro > div:first-of-type {
            max-width: 100% !important;
          }
          #intro > div:last-of-type {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
