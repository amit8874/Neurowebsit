import React, { useState } from 'react';
import { ArrowLeft, X, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

import strokeImg from '../assets/Patient-Stories/Brain-Stroke-100kb.jpeg';
import aneurysmImg from '../assets/Patient-Stories/Brain aneurysm-100kb.jpeg';
import avmImg from '../assets/Brain_AVM.png';

export default function PatientStories({ onBack, isPage = true, onOpenBookingModal }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const { patientStories: contextStories } = useData();

  const storiesData = contextStories.map(s => ({
    ...s,
    badgeColor: s.badgeColor || '#06b6d4',
    categoryTag: s.categoryTag || s.category || 'Patient Story',
    sections: s.sections || [
      { heading: 'Overview & Patient Journey', content: s.summary || s.subtitle || '' }
    ]
  }));

  return (
    <section
      id="patient-stories"
      className="py-20 relative overflow-hidden"
      style={{
        minHeight: '100vh',
        paddingTop: isPage ? 'calc(var(--navbar-height) + 24px)' : '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Ambience glow blobs */}
      <div className="glow-blob glow-blob-teal" style={{ top: '8%', left: '5%', opacity: 0.15 }} />
      <div className="glow-blob glow-blob-blue" style={{ top: '45%', right: '5%', opacity: 0.12 }} />

      <div className="container relative z-10">

        {/* Back Navigation Button */}
        {isPage && onBack && (
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <button
              onClick={onBack}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              Back to Main Website
            </button>
          </div>
        )}

        {/* Page Hero Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px'
        }}>
          <span className="section-tag" style={{ marginBottom: '12px' }}>
            PATIENT STORIES
          </span>

          <h1 className="section-title" style={{
            fontSize: '2.8rem',
            lineHeight: '1.2',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
            maxWidth: '900px'
          }}>
            Real Patients. Real Challenges. <br />
            <span className="gradient-text">Real Stories of Recovery.</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            lineHeight: '1.65',
            margin: 0
          }}>
            Every neurovascular case is different. Here are some of the patients whose journeys have stayed with me — and the lessons they can teach us.
          </p>
        </div>

        {/* Stories Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }} className="patient-stories-grid">

          {storiesData.map((story) => (
            <div
              key={story.id}
              className="interactive-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'left'
              }}
            >
              {/* Image Banner */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                backgroundColor: '#0f172a',
                overflow: 'hidden'
              }}>
                <img
                  src={story.image}
                  alt={story.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Badge Tag */}
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(15, 23, 42, 0.88)',
                  color: story.badgeColor,
                  backdropFilter: 'blur(6px)',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${story.badgeColor}40`
                }}>
                  {story.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-teal)' }}>
                    {story.categoryTag}
                  </span>

                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    margin: '8px 0 12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: '1.3'
                  }}>
                    {story.title}
                  </h3>

                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    "{story.subtitle}"
                  </p>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    margin: '12px 0 0'
                  }}>
                    {story.summary}
                  </p>
                </div>

                {/* Action Footer */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} color="var(--accent-teal)" />
                    <span>{story.timeframe}</span>
                  </div>

                  <button
                    onClick={() => setSelectedStory(story)}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--accent-teal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Read Story
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedStory && (
        <div
          onClick={() => setSelectedStory(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 10, 19, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn var(--transition-fast) ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              padding: '40px',
              textAlign: 'left'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(var(--primary-rgb), 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            {/* Header Tags & Title */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: `${selectedStory.badgeColor}15`,
                  color: selectedStory.badgeColor,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${selectedStory.badgeColor}30`
                }}>
                  {selectedStory.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  • {selectedStory.categoryTag}
                </span>
              </div>

              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                lineHeight: '1.25',
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                {selectedStory.title}
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                "{selectedStory.subtitle}"
              </p>
            </div>

            {/* Clinical Banner Image inside Reader */}
            <div style={{
              width: '100%',
              maxHeight: '340px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Article Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {selectedStory.sections.map((sec, i) => (
                <div key={i}>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--accent-teal)',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {sec.heading}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.75',
                    margin: 0,
                    whiteSpace: 'pre-line'
                  }}>
                    {sec.content}
                  </p>
                </div>
              ))}

              {/* Emergency Warning Callout Box (if present) */}
              {selectedStory.emergencyWarning && (
                <div style={{
                  marginTop: '16px',
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  border: '1.5px solid rgba(225, 29, 72, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <AlertTriangle size={22} color="#e11d48" />
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#e11d48', margin: 0 }}>
                      {selectedStory.emergencyWarning.title}
                    </h4>
                  </div>

                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    If someone suddenly develops:
                  </p>

                  <ul style={{
                    paddingLeft: '20px',
                    margin: '0 0 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {selectedStory.emergencyWarning.points.map((pt, idx) => (
                      <li key={idx}><strong>{pt}</strong></li>
                    ))}
                  </ul>

                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
                    {selectedStory.emergencyWarning.note}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Footer Action inside Reader */}
            <div style={{
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <button
                onClick={() => {
                  setSelectedStory(null);
                  if (onOpenBookingModal) onOpenBookingModal();
                }}
                className="btn btn-primary"
                style={{ padding: '10px 24px', cursor: 'pointer' }}
              >
                Schedule Consultation
              </button>

              <button onClick={() => setSelectedStory(null)} className="btn btn-secondary" style={{ padding: '10px 24px' }}>
                Close Story
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Responsive Grid Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .patient-stories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .patient-stories-grid {
            grid-template-columns: 1fr !important;
          }
          #patient-stories h1 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
