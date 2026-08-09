import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, CATEGORIES, Project } from '../data';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_INITIAL_COUNT = 8;

interface ProjectArchiveProps {
  onProjectClick: (project: Project) => void;
}

const ProjectArchive: React.FC<ProjectArchiveProps> = ({ onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [displayedProject, setDisplayedProject] = useState<Project>(PROJECTS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileShowAll, setMobileShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);

  const selectProject = (project: Project) => {
    if (project.id === activeProject.id) return;
    setActiveProject(project);
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedProject(project);
      setIsTransitioning(false);
    }, 220);
  };

  // Reset to first project when category changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const first = filteredProjects[0];
      setActiveProject(first);
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayedProject(first);
        setIsTransitioning(false);
      }, 220);
    }
    setMobileShowAll(false);
  }, [activeCategory]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const mobileVisible = mobileShowAll
    ? filteredProjects
    : filteredProjects.slice(0, MOBILE_INITIAL_COUNT);

  // ─── Shared preview transition style ───
  const previewTransitionStyle: React.CSSProperties = {
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
    transition: 'opacity 0.28s ease, transform 0.28s ease',
  };

  return (
    <section
      id="archive"
      ref={sectionRef}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* ════════════════════════════════
          SECTION HEADER
      ════════════════════════════════ */}
      <div
        ref={titleRef}
        className="archive-header"
        style={{ opacity: 0 }}
      >
        {/* Top row: label + count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            color: 'var(--purple)',
          }}>
            03 — ARCHIVE
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}>
            {PROJECTS.length} PROJECTS
          </span>
        </div>

        {/* Big title */}
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          color: 'var(--text)',
          marginBottom: '36px',
        }}>
          PROJECT ARCHIVE
        </h2>

        {/* ── Desktop: horizontal filter tabs ── */}
        <div className="desktop-filters" style={{
          display: 'flex',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                padding: '11px 22px',
                background: activeCategory === cat ? 'var(--purple-dim)' : 'transparent',
                border: '1px solid var(--border)',
                borderLeft: 'none',
                borderTop: 'none',
                cursor: 'pointer',
                color: activeCategory === cat ? 'var(--purple)' : 'var(--muted)',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--muted)'; }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Mobile: dropdown filter ── */}
        <div className="mobile-filters" style={{ display: 'none', position: 'relative' }}>
          <button
            onClick={() => setMobileCatOpen(o => !o)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'var(--text)',
            }}
          >
            {activeCategory === 'ALL' ? 'ALL CATEGORIES' : activeCategory}
            <ChevronDown
              size={14}
              style={{
                color: 'var(--muted)',
                transform: mobileCatOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </button>
          {mobileCatOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: 'none',
            }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setMobileCatOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    background: activeCategory === cat ? 'var(--purple-dim)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: activeCategory === cat ? 'var(--purple)' : 'var(--text-secondary)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════
          DESKTOP: Two-column archive
      ════════════════════════════════ */}
      <div className="desktop-archive" style={{
        display: 'grid',
        gridTemplateColumns: '42% 58%',
        borderTop: '1px solid var(--border)',
      }}>

        {/* LEFT — Project list */}
        <div style={{
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
          maxHeight: '82vh',
        }}>
          {/* Column header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 116px 54px',
            padding: '10px 28px',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--surface)',
            zIndex: 2,
          }}>
            {['#', 'PROJECT', 'TYPE', 'YEAR'].map((h, i) => (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.57rem',
                letterSpacing: '0.16em',
                color: 'var(--muted)',
              }}>
                {h}
              </div>
            ))}
          </div>

          {filteredProjects.map((project, idx) => {
            const isActive = activeProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => onProjectClick(project)}
                onMouseEnter={() => selectProject(project)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '50px 1fr 116px 54px',
                  padding: '0 28px',
                  height: '62px',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'rgba(139,92,246,0.06)' : 'transparent',
                  transition: 'background-color 0.2s ease',
                  position: 'relative',
                }}
              >
                {/* Purple left bar */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: isActive ? '3px' : '0px',
                  backgroundColor: 'var(--purple)',
                  transition: 'width 0.2s ease',
                }} />

                {/* # */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: isActive ? 'var(--purple)' : 'var(--muted)',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'color 0.2s ease',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--text)' : '#ADADBF',
                  transition: 'color 0.2s ease',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: '10px',
                }}>
                  {project.name}
                </div>

                {/* Category */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.07em',
                  color: isActive ? project.color : 'var(--muted)',
                  transition: 'color 0.2s ease',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {project.category}
                </div>

                {/* Year */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: isActive ? 'var(--text-secondary)' : 'var(--muted)',
                  transition: 'color 0.2s ease',
                }}>
                  {project.year}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Preview panel */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '82vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: 'var(--surface)',
        }}>
          <div style={{ ...previewTransitionStyle, flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* ── Large screenshot: 65% of panel ── */}
            <div style={{
              flex: '0 0 65%',
              overflow: 'hidden',
              position: 'relative',
              borderBottom: '1px solid var(--border)',
            }}>
              <img
                src={displayedProject.image}
                alt={displayedProject.name}
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Overlay badges */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '20px',
                display: 'flex',
                gap: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.13em',
                  color: displayedProject.color,
                  padding: '5px 11px',
                  border: `1px solid ${displayedProject.color}55`,
                  backgroundColor: 'rgba(7,7,10,0.8)',
                  backdropFilter: 'blur(6px)',
                }}>
                  {displayedProject.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  padding: '5px 11px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(7,7,10,0.8)',
                  backdropFilter: 'blur(6px)',
                }}>
                  {displayedProject.year}
                </span>
              </div>

              {/* Visit link overlay bottom-right */}
              <a
                href={displayedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(7,7,10,0.7)',
                  padding: '5px 9px',
                  border: '1px solid var(--border)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {new URL(displayedProject.url).hostname}
                <ExternalLink size={10} />
              </a>
            </div>

            {/* ── Info area: 35% ── */}
            <div style={{
              flex: '0 0 35%',
              padding: '20px 24px 16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Accent line + name row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px' }}>
                <div style={{
                  width: '3px',
                  height: '36px',
                  backgroundColor: displayedProject.color,
                  flexShrink: 0,
                  marginTop: '4px',
                  transition: 'background-color 0.3s ease',
                }} />
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  lineHeight: 1.05,
                }}>
                  {displayedProject.name}
                </div>
              </div>

              {/* Description — 2 lines max */}
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                paddingLeft: '17px',
              }}>
                {displayedProject.description}
              </p>

              {/* Services */}
              <div style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                paddingLeft: '17px',
                marginBottom: '14px',
              }}>
                {displayedProject.services.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '1px',
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: 'auto',
                paddingLeft: '17px',
              }}>
                <button
                  onClick={() => onProjectClick(displayedProject)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text)',
                    padding: '11px 18px',
                    background: 'none',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
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
                  VIEW DETAILS <ArrowUpRight size={12} />
                </button>
                <a
                  href={displayedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'var(--purple)',
                    padding: '11px 18px',
                    background: 'var(--purple-dim)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple-dim)')}
                >
                  LIVE WEBSITE <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE: single-column layout
      ════════════════════════════════ */}
      <div className="mobile-archive" style={{ display: 'none' }}>

        {/* Selected project – featured card */}
        <div style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          ...previewTransitionStyle,
        }}>
          {/* Image */}
          <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
            <img
              src={displayedProject.image}
              alt={displayedProject.name}
              width={600}
              height={375}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.12em',
                color: displayedProject.color,
                padding: '4px 9px',
                border: `1px solid ${displayedProject.color}55`,
                backgroundColor: 'rgba(7,7,10,0.82)',
              }}>
                {displayedProject.category}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                padding: '4px 9px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(7,7,10,0.82)',
              }}>
                {displayedProject.year}
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '22px 20px 26px', backgroundColor: 'var(--surface)' }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.55rem',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              lineHeight: 1.05,
              marginBottom: '10px',
            }}>
              {displayedProject.name}
            </div>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '18px',
            }}>
              {displayedProject.description}
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onProjectClick(displayedProject)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text)',
                  padding: '13px 18px',
                  background: 'none',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '44px',
                }}
              >
                VIEW DETAILS <ArrowUpRight size={13} />
              </button>
              <a
                href={displayedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  color: 'var(--purple)',
                  padding: '13px 18px',
                  background: 'var(--purple-dim)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '44px',
                }}
              >
                LIVE WEBSITE <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile project list rows */}
        <div>
          {mobileVisible.map((project, idx) => {
            const isActive = activeProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  selectProject(project);
                  sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 68px',
                  alignItems: 'center',
                  minHeight: '76px',
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'rgba(139,92,246,0.06)' : 'transparent',
                  position: 'relative',
                  gap: '12px',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: isActive ? '3px' : '0px',
                  backgroundColor: 'var(--purple)',
                  transition: 'width 0.2s ease',
                }} />

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.57rem',
                    color: isActive ? 'var(--purple)' : 'var(--muted)',
                    marginBottom: '4px',
                    transition: 'color 0.2s ease',
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--text)' : '#BCBCCC',
                    marginBottom: '4px',
                    transition: 'color 0.2s ease',
                    lineHeight: 1.2,
                  }}>
                    {project.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.07em',
                    color: isActive ? project.color : 'var(--muted)',
                    transition: 'color 0.2s ease',
                  }}>
                    {project.category} · {project.year}
                  </div>
                </div>

                {/* Thumbnail */}
                <div style={{
                  width: '68px',
                  height: '50px',
                  overflow: 'hidden',
                  border: isActive ? `1px solid ${project.color}55` : '1px solid var(--border)',
                  flexShrink: 0,
                  transition: 'border-color 0.2s ease',
                }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    width={68}
                    height={50}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Show all button */}
        {!mobileShowAll && filteredProjects.length > MOBILE_INITIAL_COUNT && (
          <div style={{ padding: '20px' }}>
            <button
              onClick={() => setMobileShowAll(true)}
              style={{
                width: '100%',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'var(--text)',
                padding: '16px',
                background: 'none',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                minHeight: '44px',
              }}
            >
              VIEW ALL {filteredProjects.length} PROJECTS
            </button>
          </div>
        )}
      </div>

      {/* ════ Responsive CSS ════ */}
      <style>{`
        /* Section header padding */
        .archive-header {
          padding: 80px 60px 0;
        }

        /* Desktop: show desktop, hide mobile */
        @media (min-width: 768px) {
          .desktop-filters { display: flex !important; }
          .mobile-filters  { display: none !important; }
          .desktop-archive { display: grid !important; }
          .mobile-archive  { display: none !important; }
        }

        /* Tablet: tighten columns */
        @media (min-width: 768px) and (max-width: 1199px) {
          .archive-header { padding: 72px 36px 0; }
          .desktop-archive { grid-template-columns: 48% 52% !important; }
        }

        /* Mobile: flip to mobile layout */
        @media (max-width: 767px) {
          .archive-header {
            padding: 72px 20px 0 !important;
          }
          .desktop-filters { display: none !important; }
          .mobile-filters  { display: block !important; }
          .desktop-archive { display: none !important; }
          .mobile-archive  { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default ProjectArchive;
