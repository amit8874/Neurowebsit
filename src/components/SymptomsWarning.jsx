import React from 'react';
import { ShieldAlert, AlertTriangle, Activity, Heart, ArrowRight, Zap } from 'lucide-react';

const symptomsList = [
  {
    icon: '🧠',
    title: 'Sudden weakness or trouble speaking',
    desc: 'If one side of the face or body suddenly becomes weak, speech becomes unclear, or you cannot understand someone properly, it may be a stroke. Get emergency medical help immediately.',
    badge: 'High Stroke Risk',
    color: '#e11d48'
  },
  {
    icon: '💥',
    title: 'Sudden, very severe headache',
    desc: 'A sudden headache that becomes extremely severe within seconds can be a warning sign of a ruptured brain aneurysm. This needs emergency medical attention.',
    badge: 'Thunderclap Headache',
    color: '#f59e0b'
  },
  {
    icon: '👂',
    title: 'Hearing your heartbeat in your ear',
    desc: 'A repeated whooshing or pulsing sound in one ear that matches your heartbeat is called pulsatile tinnitus. Sometimes it can be related to blood-flow problems around the head or neck and should be evaluated.',
    badge: 'Pulsatile Tinnitus',
    color: '#06b6d4'
  },
  {
    icon: '😵',
    title: 'Sudden dizziness or balance problems',
    desc: 'Sudden dizziness, difficulty walking, loss of balance, or double vision — especially when combined with weakness or speech problems — should not be ignored because they can occur with stroke.',
    badge: 'Balance / Vision Risk',
    color: '#3b82f6'
  },
  {
    icon: '👁️',
    title: 'Unusual changes in one eye',
    desc: 'Redness, bulging, unusual movement/pulsation, or vision changes in one eye can sometimes be related to abnormal blood-vessel connections around the eye and brain.',
    badge: 'Orbital Vascular',
    color: '#8b5cf6'
  },
  {
    icon: '🦵',
    title: 'Increasing weakness in the legs',
    desc: 'Gradually worsening weakness, numbness, or changes in bladder or bowel control can sometimes be related to problems affecting the blood vessels of the spine.',
    badge: 'Spinal Cord Warning',
    color: '#ec4899'
  },
  {
    icon: '👀',
    title: 'Headache with brief vision loss',
    desc: 'Repeated headaches together with short episodes of blurred, dim, or "greyed-out" vision should be checked by a doctor.',
    badge: 'Intracranial Pressure',
    color: '#10b981'
  },
  {
    icon: '👃',
    title: 'Frequent or heavy nosebleeds',
    desc: 'Nosebleeds that happen repeatedly or are unusually difficult to stop may sometimes have an underlying blood-vessel cause and should be evaluated.',
    badge: 'Head & Neck Vessels',
    color: '#6366f1'
  }
];

export default function SymptomsWarning() {
  return (
    <section
      id="symptoms-warning"
      className="py-20 relative overflow-hidden"
      style={{
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

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <a href="#booking" style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: item.color,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none'
                }}>
                  Seek Specialist Opinion
                  <ArrowRight size={12} />
                </a>
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
              <a href="#booking" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Schedule Priority Consult
              </a>
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
