import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    tl.fromTo(leftRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(
        rightRef.current?.querySelectorAll('.about-line') ?? [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 60px',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}
    >
      {/* LEFT: Portrait */}
      <div ref={leftRef} style={{ opacity: 0 }}>
        <div style={{
          position: 'relative',
          maxWidth: '440px',
        }}>
          {/* Portrait image */}
          <div style={{
            width: '100%',
            aspectRatio: '3/4',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            position: 'relative',
          }}>
            <img
              src="/fen_portrait.webp"
              alt="FEN — Designer & Developer"
              width={440}
              height={587}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'grayscale(20%) contrast(1.05)',
              }}
            />
            {/* Subtle purple tint overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(139,92,246,0.05)',
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Corner accent */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            right: '-12px',
            width: '60px',
            height: '60px',
            border: '2px solid var(--purple)',
            borderTop: 'none',
            borderLeft: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '-12px',
            width: '60px',
            height: '60px',
            border: '2px solid rgba(139,92,246,0.3)',
            borderBottom: 'none',
            borderRight: 'none',
          }} />

          {/* Location badge */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '-16px',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            padding: '8px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}>
            VIETNAM
          </div>
        </div>
      </div>

      {/* RIGHT: Text */}
      <div ref={rightRef}>
        {/* Label */}
        <div className="about-line" style={{ opacity: 0, marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--purple)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--purple)',
            }}>
              04 — ABOUT FEN
            </span>
          </div>
        </div>

        {/* Main statement */}
        <div className="about-line" style={{ opacity: 0, marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}>
            I DESIGN AND BUILD<br />
            WEBSITES FROM<span style={{ color: 'var(--purple)' }}>.</span> IDEA<br />
            TO THE FINAL SCREEN<span style={{ color: 'var(--purple)' }}>.</span>
          </h2>
        </div>

        {/* Description */}
        <div className="about-line" style={{ opacity: 0, marginBottom: '32px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            maxWidth: '420px',
          }}>
            Design, development, visual direction and content —<br />
            depending on what the project needs.
          </p>
        </div>

        {/* Location */}
        <div className="about-line" style={{ opacity: 0, marginBottom: '28px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            lineHeight: 2,
          }}>
            <div>Based in Vietnam.</div>
            <div>Working everywhere.</div>
          </div>
        </div>

        {/* Personality note */}
        <div className="about-line" style={{ opacity: 0 }}>
          <div style={{
            borderLeft: '2px solid var(--border)',
            paddingLeft: '16px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}>
            Sometimes spending three hours fixing something<br />
            that is only four pixels out of place.
          </div>
        </div>

        {/* Stats row */}
        <div className="about-line" style={{
          opacity: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          borderTop: '1px solid var(--border)',
          marginTop: '48px',
        }}>
          {[
            { num: '22+', label: 'WEBSITES' },
            { num: '4+', label: 'YEARS' },
            { num: '100%', label: 'REMOTE' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '1.6rem',
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'var(--muted)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about {
            grid-template-columns: 1fr !important;
            padding: 80px 24px !important;
            gap: 48px !important;
          }
          #about > div:first-child {
            max-width: 340px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
