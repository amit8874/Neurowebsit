import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import inrImg from '../assets/Interventional.webp';

export default function WhatIsINR() {
  const conditions = [
    { title: 'Brain Stroke', icon: '🧠', desc: 'Acute arterial blockage' },
    { title: 'Brain Aneurysm', icon: '🩸', desc: 'Vascular wall bulge & rupture risk' },
    { title: 'AVM / DAVF', icon: '⚡', desc: 'Arteriovenous shunt malformation' },
    { title: 'Brain Hemorrhage', icon: '🩸', desc: 'Intracranial vascular bleeding' }
  ];

  return (
    <section 
      id="what-is-inr" 
      className="relative overflow-hidden"
      style={{
        paddingTop: '20px',
        paddingBottom: '60px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background glow blob */}
      <div className="glow-blob glow-blob-teal" style={{ top: '20%', left: '2%', opacity: 0.15 }} />

      <div className="container relative z-10">
        
        {/* Section Tag & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <span className="section-tag" style={{ marginBottom: '8px' }}>Educational Overview</span>
          <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
            What Is Interventional Neuroradiology?
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Interventional Neuroradiology is a specialized field that treats blood-vessel problems in the brain, spine, head and neck — <strong>often without open surgery</strong>.
          </p>
        </div>

        {/* Main Content & Image Grid */}
        <div className="inr-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Clinical & Patient Explanations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            
            {/* Catheter explanation card */}
            <div style={{
              padding: '20px 24px',
              backgroundColor: 'rgba(var(--accent-teal-rgb), 0.06)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--accent-teal)',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}>
              <Activity size={24} style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.975rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                Doctors use a thin tube (catheter) through the body's blood vessels to reach and treat the problem from inside.
              </p>
            </div>

            {/* Treatable Conditions List */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                It can help treat conditions such as:
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }} className="inr-conditions-grid">
                {conditions.map((c, i) => (
                  <div key={i} className="glass-panel" style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-glass)'
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{c.title}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purpose statement */}
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              This website helps patients and their families understand these conditions and the treatment options available.
            </p>

            {/* In Simple Words Highlight Box */}
            <div className="glass-panel" style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(37, 99, 235, 0.08) 100%)',
              border: '1.5px solid rgba(6, 182, 212, 0.3)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={18} style={{ color: 'var(--accent-teal)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-teal)' }}>
                  In Simple Words:
                </span>
              </div>
              <p style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                Treating serious brain blood-vessel problems with minimally invasive procedures, without opening the skull.
              </p>
            </div>

          </div>

          {/* Right Column: Interventional Explanation Graphic Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: '420px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <img
                src={inrImg}
                alt="What is Interventional Neuroradiology explanation graphic"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                padding: '10px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-md)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
                textAlign: 'left'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Endovascular Cath Lab Navigation</p>
                <p style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, margin: '2px 0 0' }}>Minimally Invasive Catheter Procedure</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Styled JSX for Responsive Layout */}
      <style>{`
        @media (max-width: 768px) {
          #what-is-inr {
            padding-top: 16px !important;
            padding-bottom: 32px !important;
          }
          .inr-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .inr-conditions-grid {
            grid-template-columns: 1fr !important;
          }
          #what-is-inr .section-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
