import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PROJECTS, Project } from '../data';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      cardsRef.current?.querySelectorAll('.featured-card') ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      style={{
        padding: '100px 60px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Section header */}
      <div
        ref={titleRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '60px',
          opacity: 0,
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--purple)',
            marginBottom: '12px',
          }}>
            02 — SELECTED
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            color: 'var(--text)',
          }}>
            FEATURED WORK
          </h2>
        </div>

        <a
          href="#archive"
          onClick={e => {
            e.preventDefault();
            document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s ease',
            paddingBottom: '4px',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          VIEW ALL ARCHIVE
          <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          backgroundColor: 'var(--border)',
        }}
      >
        {FEATURED_PROJECTS.map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #featured {
            padding: 80px 24px !important;
          }
          #featured [style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const FeaturedCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.borderColor = 'rgba(139,92,246,0.4)';
    cardRef.current.style.backgroundColor = 'var(--surface)';
    if (arrowRef.current) {
      arrowRef.current.style.transform = 'translate(4px, -4px)';
      arrowRef.current.style.color = 'var(--purple)';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.borderColor = 'transparent';
    cardRef.current.style.backgroundColor = 'var(--bg)';
    if (arrowRef.current) {
      arrowRef.current.style.transform = 'translate(0, 0)';
      arrowRef.current.style.color = 'var(--muted)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="featured-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: 'var(--bg)',
        border: '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={project.image}
          alt={project.name}
          width={400}
          height={250}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            display: 'block',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          letterSpacing: '0.15em',
          color: 'var(--text)',
          backgroundColor: 'rgba(7,7,10,0.8)',
          padding: '4px 8px',
          border: '1px solid var(--border)',
        }}>
          {project.category}
        </div>
      </div>

      {/* Card content */}
      <div style={{
        padding: '24px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            lineHeight: 1.2,
          }}>
            {project.name}
          </h3>
          <div
            ref={arrowRef}
            style={{
              color: 'var(--muted)',
              transition: 'all 0.25s ease',
              flexShrink: 0,
              marginLeft: '12px',
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: 'var(--muted)',
        }}>
          {project.category} — {project.year}
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
