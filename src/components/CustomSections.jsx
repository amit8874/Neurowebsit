import React from 'react';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CustomSections() {
  const { customSections } = useData();

  if (!customSections || customSections.length === 0) return null;

  const activeSections = customSections.filter(s => s.isActive);
  if (activeSections.length === 0) return null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', margin: '40px 0' }}>
      {activeSections.map((sec) => (
        <section
          key={sec.id}
          style={{
            backgroundColor: sec.bgColor || 'rgba(6, 182, 212, 0.05)',
            borderTop: `1px solid ${sec.borderColor || 'rgba(6, 182, 212, 0.2)'}`,
            borderBottom: `1px solid ${sec.borderColor || 'rgba(6, 182, 212, 0.2)'}`,
            padding: '40px 20px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            
            {sec.badge && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-teal)',
                marginBottom: '14px'
              }}>
                <Sparkles size={14} />
                <span>{sec.badge}</span>
              </div>
            )}

            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '10px'
            }}>
              {sec.title}
            </h2>

            {sec.subtitle && (
              <p style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--accent-teal)',
                marginBottom: '16px'
              }}>
                {sec.subtitle}
              </p>
            )}

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '760px',
              margin: '0 auto 24px',
              lineHeight: '1.65',
              whiteSpace: 'pre-line'
            }}>
              {sec.content}
            </p>

            {sec.buttonText && (
              <a
                href={sec.buttonLink || '#booking'}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <span>{sec.buttonText}</span>
                <ArrowRight size={16} />
              </a>
            )}

          </div>
        </section>
      ))}
    </div>
  );
}
