import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Keyboard close
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      onClick={e => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(7, 7, 10, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        ref={contentRef}
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          animation: 'slideUp 0.3s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(7,7,10,0.8)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--purple)';
            e.currentTarget.style.color = 'var(--purple)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text)';
          }}
        >
          <X size={16} />
        </button>

        {/* Hero image */}
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}>
          <img
            src={project.image}
            alt={project.name}
            width={860}
            height={484}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay gradient at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(13,13,18,0.9) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Year badge */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '28px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: 'var(--muted)',
          }}>
            {project.year}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '28px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: project.color,
            padding: '4px 10px',
            border: `1px solid ${project.color}50`,
            backgroundColor: `${project.color}15`,
          }}>
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '36px 36px 40px' }}>
          {/* Accent line */}
          <div style={{
            width: '40px',
            height: '2px',
            backgroundColor: project.color,
            marginBottom: '20px',
          }} />

          {/* Project name */}
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            {project.name}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            marginBottom: '40px',
          }}>
            {project.description}
          </p>

          {/* Meta grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
            marginBottom: '36px',
          }}>
            {[
              { label: 'ROLE', values: project.role },
              { label: 'SERVICES', values: project.services },
              { label: 'TYPE', values: [project.category] },
              { label: 'YEAR', values: [String(project.year)] },
            ].map(item => (
              <div key={item.label} style={{
                padding: '20px',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  color: 'var(--muted)',
                  marginBottom: '12px',
                }}>
                  {item.label}
                </div>
                {item.values.map((v, i) => (
                  <div key={i} style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    color: 'var(--text)',
                    lineHeight: 1.8,
                  }}>
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              color: 'var(--text)',
              textDecoration: 'none',
              padding: '14px 24px',
              border: '1px solid var(--border)',
              transition: 'all 0.25s ease',
              textTransform: 'uppercase',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--purple)';
              e.currentTarget.style.color = 'var(--purple)';
              e.currentTarget.style.backgroundColor = 'var(--purple-dim)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            VIEW LIVE WEBSITE
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 768px) {
          #modal-content {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
