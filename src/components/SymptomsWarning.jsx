import React from 'react';
import { ShieldAlert, AlertTriangle, Activity, Heart, ArrowRight, Zap } from 'lucide-react';

const symptomsList = [
  {
    icon: '🧠',
    title: 'Sudden weakness or speech difficulty',
    desc: 'Sudden face drooping or slurred speech can signal an acute stroke requiring emergency care.',
    badge: 'Stroke Risk',
    color: '#e11d48'
  },
  {
    icon: '💥',
    title: 'Thunderclap severe headache',
    desc: 'An explosive, sudden headache can indicate a ruptured brain aneurysm and needs instant attention.',
    badge: 'Aneurysm Warning',
    color: '#f59e0b'
  },
  {
    icon: '👂',
    title: 'Pulsatile sound in one ear',
    desc: 'Hearing a whooshing heartbeat sound in one ear can stem from abnormal head or neck blood flow.',
    badge: 'Pulsatile Tinnitus',
    color: '#06b6d4'
  },
  {
    icon: '😵',
    title: 'Sudden dizziness & double vision',
    desc: 'Loss of balance, vertigo, or sudden double vision may indicate cerebrovascular involvement.',
    badge: 'Balance Risk',
    color: '#3b82f6'
  },
  {
    icon: '👁️',
    title: 'Eye redness or bulging',
    desc: 'Unusual eyeball pulsation, swelling, or visual changes can signal carotid-cavernous fistulas.',
    badge: 'Eye Vascular',
    color: '#8b5cf6'
  },
  {
    icon: '🦵',
    title: 'Progressive leg weakness',
    desc: 'Gradual numbness or weakness in legs can be tied to underlying spinal cord vascular malformations.',
    badge: 'Spine Warning',
    color: '#ec4899'
  },
  {
    icon: '👀',
    title: 'Headache with vision dimming',
    desc: 'Recurrent headaches combined with brief greyouts in vision indicate intracranial pressure issues.',
    badge: 'Skull Pressure',
    color: '#10b981'
  },
  {
    icon: '👃',
    title: 'Recurrent heavy nosebleeds',
    desc: 'Unusually persistent nosebleeds may sometimes be caused by head and neck vascular malformations.',
    badge: 'Head & Neck',
    color: '#6366f1'
  }
];

export default function SymptomsWarning({ onOpenBookingModal }) {
  return (
    <section
      id="symptoms-warning"
      className="relative overflow-hidden"
      style={{
        paddingTop: '36px',
        paddingBottom: '45px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background Ambience Blobs */}
      <div className="glow-blob glow-blob-blue" style={{ top: '10%', left: '3%', opacity: 0.1 }} />
      <div className="glow-blob glow-blob-teal" style={{ bottom: '15%', right: '3%', opacity: 0.1 }} />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
          <div className="flex items-center" style={{
            gap: '8px',
            backgroundColor: 'rgba(225, 29, 72, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(225, 29, 72, 0.2)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#e11d48',
            marginBottom: '12px'
          }}>
            <AlertTriangle size={16} color="#e11d48" />
            <span>Critical Medical Awareness</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
            ⚠️ Symptoms You Should Not Ignore
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '820px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Some problems related to the brain and its blood vessels can develop quietly. But sometimes, the body gives warning signs. <strong>Knowing these signs can help you seek medical attention at the right time.</strong>
          </p>
        </div>

        {/* 8 Symptoms Warning Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '40px'
        }} className="symptoms-grid">
          {symptomsList.map((item, idx) => (
            <div
              key={idx}
              className="interactive-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                borderTop: `3px solid ${item.color}`,
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${item.color}30`
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: '1.3'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🚨 Emergency Red Banner / Important Disclaimer Box */}
        <div className="glass-panel" style={{
          padding: '28px 36px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08) 0%, rgba(245, 158, 11, 0.06) 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.3)',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'left'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(225, 29, 72, 0.15)',
              color: '#e11d48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldAlert size={28} />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e11d48' }}>
                  🚨 Important Emergency Notice
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontStyle: 'italic' }}>
                This information is for awareness only and is not a diagnosis.
              </p>

              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: '1.6', margin: 0 }}>
                If someone suddenly develops face drooping, weakness, difficulty speaking, severe headache, loss of consciousness, or sudden vision/balance problems, <strong>seek emergency medical help immediately</strong>. Stroke symptoms can require urgent treatment.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  if (onOpenBookingModal) onOpenBookingModal();
                }}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Schedule Priority Consult
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Styled JSX for Responsive Grid */}
      <style>{`
        @media (max-width: 1100px) {
          .symptoms-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .symptoms-grid {
            grid-template-columns: 1fr !important;
          }
          #symptoms-warning .section-title {
            font-size: 1.7rem !important;
          }
        }
      `}</style>
    </section>
  );
}
