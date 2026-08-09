import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      padding: '40px 60px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      {/* Left */}
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: '0.85rem',
        letterSpacing: '0.08em',
        color: 'var(--text)',
      }}>
        FEN<span style={{ color: 'var(--purple)' }}>.</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          marginLeft: '12px',
        }}>
          / DIGITAL WORK
        </span>
      </div>

      {/* Center */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.15em',
        color: 'var(--muted)',
        textAlign: 'center',
        lineHeight: 2,
      }}>
        <div>BASED IN VIETNAM</div>
        <div>WORKING EVERYWHERE</div>
      </div>

      {/* Right */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.12em',
        color: 'var(--muted)',
      }}>
        © 2026
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer {
            padding: 32px 24px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
