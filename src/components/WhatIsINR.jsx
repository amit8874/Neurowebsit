import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';
import inrImg from '../assets/Interventional.webp';

export default function WhatIsINR() {
  const features = [
    {
      icon: <Activity size={22} className="text-teal" style={{ color: 'var(--accent-teal)' }} />,
      title: 'Minimally Invasive Care',
      desc: 'Treating brain blood-vessel problems through tiny catheters without open skull surgery.'
    },
    {
      icon: <ShieldCheck size={22} className="text-teal" style={{ color: 'var(--accent-teal)' }} />,
      title: 'Targeted Precision',
      desc: 'Advanced 3D imaging allows sub-millimeter accuracy for stroke, aneurysms, and AVMs.'
    },
    {
      icon: <HeartPulse size={22} className="text-teal" style={{ color: 'var(--accent-teal)' }} />,
      title: 'Faster Patient Recovery',
      desc: 'Gentler procedures mean shorter hospital stays, minimal pain, and rapid rehabilitation.'
    }
  ];

  return (
    <section 
      id="what-is-inr" 
      className="relative overflow-hidden"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background glow blob */}
      <div className="glow-blob glow-blob-teal" style={{ top: '20%', left: '2%', opacity: 0.12 }} />

      <div className="container relative z-10">
        
        {/* Section Tag & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-tag" style={{ marginBottom: '10px' }}>Specialty Overview</span>
          <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
            What Is Interventional Neuroradiology?
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            lineHeight: '1.6',
            margin: 0
          }}>
            A modern medical subspecialty treating complex brain, spine, and neck vascular disorders <strong>without open brain surgery</strong>.
          </p>
        </div>

        {/* Main Content & Image Grid */}
        <div className="inr-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: 3 Clean Spacious Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {features.map((f, i) => (
              <div key={i} className="glass-panel" style={{
                padding: '20px 24px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-glass)'
              }}>
                <div style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Simple Words Summary */}
            <div style={{
              padding: '18px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              marginTop: '8px'
            }}>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: 600, margin: 0, lineHeight: '1.5' }}>
                💡 <strong>In simple terms:</strong> Fixing brain blood vessel blockages or bleeds through a pinhole entry, keeping patients safe and surgery-free.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Graphic Image Frame */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: '380px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <img
                src={inrImg}
                alt="Interventional Neuroradiology Procedure"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Styled JSX for Responsive Layout */}
      <style>{`
        @media (max-width: 768px) {
          #what-is-inr {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .inr-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          #what-is-inr .section-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}

