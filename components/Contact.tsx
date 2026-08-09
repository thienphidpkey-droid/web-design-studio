import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    tl.fromTo(leftRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    padding: '14px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    letterSpacing: '0.02em',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    color: 'var(--muted)',
    display: 'block',
    marginBottom: '4px',
    marginTop: '28px',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '120px 60px',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'flex-start',
      }}
    >
      {/* LEFT: Headline */}
      <div ref={leftRef} style={{ opacity: 0 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px',
        }}>
          <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--purple)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--purple)',
          }}>
            05 — CONTACT
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.2rem, 4vw, 4rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '16px',
        }}>
          HAVE A PROJECT<br />
          IN MIND?
        </h2>

        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.2rem, 4vw, 4rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: 'var(--purple)',
          marginBottom: '40px',
        }}>
          LET'S TALK.
        </h3>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.88rem',
          lineHeight: 1.9,
          color: 'var(--text-secondary)',
          marginBottom: '40px',
        }}>
          Tell me what you're building.<br />
          I'd love to hear about it.
        </p>

        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'EMAIL', value: 'hello@fen.studio' },
            { label: 'BASED IN', value: 'Vietnam (GMT+7)' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'var(--muted)',
                minWidth: '60px',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: 'var(--text)',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Form */}
      <div ref={formRef} style={{ opacity: 0 }}>
        {submitted ? (
          <div style={{
            padding: '60px 40px',
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '2px solid var(--purple)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '1.2rem',
            }}>
              ✓
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.05em',
              color: 'var(--text)',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              MESSAGE SENT
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: 'var(--muted)',
            }}>
              I'll get back to you within 48 hours.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--border)', paddingTop: '0' }}>
            <label style={labelStyle}>YOUR NAME</label>
            <input
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              onFocus={e => (e.target.style.borderBottomColor = 'var(--purple)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--border)')}
            />

            <label style={labelStyle}>YOUR EMAIL</label>
            <input
              type="email"
              required
              placeholder="hello@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              onFocus={e => (e.target.style.borderBottomColor = 'var(--purple)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--border)')}
            />

            <label style={labelStyle}>TELL ME ABOUT YOUR PROJECT</label>
            <textarea
              required
              rows={5}
              placeholder="What are you working on?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                ...inputStyle,
                resize: 'none',
                lineHeight: 1.7,
                paddingTop: '12px',
              }}
              onFocus={e => (e.target.style.borderBottomColor = 'var(--purple)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--border)')}
            />

            <div style={{ marginTop: '36px' }}>
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--bg)',
                  backgroundColor: 'var(--purple)',
                  border: '1px solid var(--purple)',
                  padding: '14px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--purple)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--purple)';
                  e.currentTarget.style.color = 'var(--bg)';
                }}
              >
                SEND MESSAGE
                <ArrowRight size={14} />
              </button>
            </div>

            <style>{`
              input::placeholder, textarea::placeholder {
                color: var(--muted);
                font-family: var(--font-sans);
              }
            `}</style>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact {
            grid-template-columns: 1fr !important;
            padding: 80px 24px !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
