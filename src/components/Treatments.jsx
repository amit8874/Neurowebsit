import React, { useState } from 'react';
import { ShieldAlert, Zap, Activity, Scan, FileSearch, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const getTreatmentIcon = (iconType) => {
  switch (iconType) {
    case 'Zap': return <Zap size={24} />;
    case 'Scan': return <Scan size={24} />;
    case 'ShieldAlert': return <ShieldAlert size={24} />;
    case 'FileSearch': return <FileSearch size={24} />;
    case 'Activity':
    default: return <Activity size={24} />;
  }
};

export default function Treatments({ onOpenBookingModal }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const { treatments: contextTreatments } = useData();

  const treatments = contextTreatments.map(t => ({
    ...t,
    shortDesc: t.shortDesc || t.description || '',
    symptoms: t.symptoms || (t.features ? t.features : []),
    procedure: t.procedure || t.category || 'Specialized Neuro Procedure',
    details: t.details || t.description || '',
    color: t.color || '#06b6d4',
    icon: t.icon || getTreatmentIcon(t.iconType)
  }));

  return (
    <section id="treatments" className="py-24 relative overflow-hidden" style={{
      backgroundColor: 'var(--bg-secondary)',
      transition: 'background-color var(--transition-normal)',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div className="glow-blob glow-blob-teal" style={{ top: '30%', right: '10%' }} />

      <div className="container relative z-10">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Clinical Specializations</span>
          <h2 className="section-title">Endovascular Neuro-Interventions</h2>
          <p className="section-desc">
            State-of-the-art endovascular catheter procedures and expert neuroimaging diagnostics delivered by Dr Dewansh Mishra.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-3" style={{ gap: '24px', marginTop: '16px' }}>
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="interactive-card"
              style={{
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedCard(treatment)}
            >
              {/* Colored top accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: treatment.color
              }} />

              {/* Icon Container */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: `rgba(var(--accent-teal-rgb), 0.1)`,
                color: 'var(--accent-teal)',
                marginBottom: '20px'
              }}>
                {treatment.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.3' }}>
                {treatment.title}
              </h3>
              
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '24px', lineHeight: '1.6' }}>
                {treatment.shortDesc}
              </p>

              <span className="flex items-center" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--accent-teal)',
                gap: '6px'
              }}>
                Learn Procedure Mechanics
                <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Modal for Selected Treatment */}
        {selectedCard && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px'
          }} onClick={() => setSelectedCard(null)}>
            
            <div 
              className="glass-panel" 
              style={{
                width: '100%',
                maxWidth: '640px',
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
                position: 'relative',
                boxShadow: 'var(--shadow-xl)',
                textAlign: 'left',
                borderTop: `6px solid ${selectedCard.color}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedCard(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1.25rem'
                }}
              >
                ✕
              </button>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: selectedCard.color,
                marginBottom: '8px',
                display: 'block'
              }}>
                Specialized Neuro Procedure
              </span>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                {selectedCard.title}
              </h3>

              <p style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--accent-teal)', marginBottom: '24px' }}>
                Key Intervention: {selectedCard.procedure}
              </p>

              {/* Grid content inside modal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Indications & Symptoms block */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Clinical Indications & Warning Signs
                  </h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.925rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedCard.symptoms.map((symptom, i) => (
                      <li key={i}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                {/* Procedure Mechanics */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Procedure Details & Mechanics
                  </h4>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {selectedCard.details}
                  </p>
                </div>

              </div>

              {/* Modal footer CTAs */}
              <div className="flex" style={{ gap: '16px', marginTop: '32px', justifyContent: 'flex-end' }}>
                <button onClick={() => setSelectedCard(null)} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                  Close Details
                </button>
                <button
                  onClick={() => {
                    setSelectedCard(null);
                    if (onOpenBookingModal) onOpenBookingModal();
                  }}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', backgroundColor: selectedCard.color, color: '#ffffff', cursor: 'pointer' }}
                >
                  Book Consultation
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
