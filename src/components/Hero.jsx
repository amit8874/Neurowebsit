import React from 'react';
import { Calendar, ShieldAlert, Award, Star, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden" style={{
      paddingTop: 'calc(var(--navbar-height) + 64px)',
      paddingBottom: '96px',
      minHeight: '85svh',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color var(--transition-normal)'
    }}>
      {/* Background Blobs for depth */}
      <div className="glow-blob glow-blob-teal" style={{ top: '10%', left: '5%' }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '15%', right: '5%' }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 items-center" style={{ gap: '48px' }}>
          
          {/* Left Column: Text & CTA */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Top Badge */}
            <div className="flex items-center" style={{
              alignSelf: 'flex-start',
              gap: '8px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--accent-teal)'
            }}>
              <Star size={16} fill="var(--accent-teal)" style={{ border: 'none' }} />
              <span> Lucknow's Top Neuro-Interventional Consultant</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: '1.15',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Minimally Invasive <br />
              <span className="gradient-text-alt">Neuro-Interventions</span> <br />
              For Brain & Spine Care
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '540px',
              margin: 0
            }}>
              Dr. Dewansh Mishra offers state-of-the-art endovascular solutions for Brain Stroke, Aneurysms, Spinal AVMs, and Brain Hemorrhage at Apollomedics Hospital, Lucknow.
            </p>

            {/* Buttons */}
            <div className="flex" style={{ gap: '16px', marginTop: '8px' }}>
              <a href="#booking" className="btn btn-primary" style={{ boxShadow: 'var(--shadow-glow)' }}>
                <Calendar size={18} />
                Book Consultation
              </a>
              <a href="#treatments" className="btn btn-secondary">
                Explore Treatments
              </a>
            </div>

            {/* Stats badges */}
            <div className="grid grid-cols-3" style={{
              marginTop: '24px',
              padding: '20px 0',
              borderTop: '1px solid var(--border-color)',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }} className="gradient-text">6+ Yrs</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Radiology Expertise</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }} className="gradient-text">5.0 ★</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>6+ Verified Reviews</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }} className="gradient-text">Apollomedics</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Consultant Doctor</p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Interactive Neuro SVG illustration */}
          <div className="flex justify-center" style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              aspectRatio: '1',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }} className="glass-panel animate-float">
              
              {/* Outer decorative circle with rotate effect */}
              <div style={{
                position: 'absolute',
                inset: '20px',
                border: '1px dashed rgba(6, 182, 212, 0.25)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              {/* Animated Brain and Synapses SVG */}
              <svg 
                viewBox="0 0 400 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '90%', height: '90%' }}
              >
                {/* Background circles */}
                <circle cx="200" cy="200" r="160" stroke="rgba(var(--accent-teal-rgb), 0.05)" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" stroke="rgba(var(--accent-teal-rgb), 0.08)" strokeWidth="1" />
                <circle cx="200" cy="200" r="80" stroke="rgba(var(--accent-teal-rgb), 0.1)" strokeWidth="1" />

                {/* Brain Outline Left Hemisphere */}
                <path 
                  d="M190 60 C140 60, 90 90, 80 140 C70 190, 100 230, 90 270 C80 310, 120 340, 160 340 C180 340, 190 320, 190 300 Z" 
                  stroke="rgba(var(--accent-teal-rgb), 0.3)" 
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Brain Outline Right Hemisphere */}
                <path 
                  d="M210 60 C260 60, 310 90, 320 140 C330 190, 300 230, 310 270 C320 310, 280 340, 240 340 C220 340, 210 320, 210 300 Z" 
                  stroke="rgba(var(--accent-teal-rgb), 0.3)" 
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Vascular / Neural Pathways (Left) */}
                <path 
                  className="neuro-path"
                  d="M190 300 C150 280, 140 220, 170 180 C200 140, 120 120, 110 160 C100 200, 120 220, 140 240" 
                  stroke="var(--accent-teal)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  style={{ animationDelay: '0s' }}
                />

                {/* Vascular / Neural Pathways (Right) */}
                <path 
                  className="neuro-path"
                  d="M210 300 C250 280, 260 220, 230 180 C200 140, 280 120, 290 160 C300 200, 280 220, 260 240" 
                  stroke="var(--accent-blue)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  style={{ animationDelay: '3s' }}
                />

                {/* Microcatheter stenting simulation (glowing wire) */}
                <path
                  className="neuro-path"
                  d="M200 370 C200 320, 210 300, 210 260 C210 220, 195 190, 215 150 C235 110, 210 90, 210 70"
                  stroke="#FF007F"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  style={{ animationDuration: '6s' }}
                />

                {/* Target Coiling point */}
                <circle cx="215" cy="150" r="10" stroke="#FF007F" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse-slow" />
                <circle cx="215" cy="150" r="4" fill="#FF007F" />

                {/* Glowing Nodes (Synapses) */}
                <circle cx="110" cy="160" r="5" fill="var(--accent-teal)" className="pulse-node" />
                <circle cx="170" cy="180" r="6" fill="var(--accent-teal)" className="pulse-node" style={{ animationDelay: '1s' }} />
                <circle cx="140" cy="240" r="4" fill="var(--accent-blue)" className="pulse-node" style={{ animationDelay: '2.5s' }} />
                <circle cx="290" cy="160" r="5" fill="var(--accent-blue)" className="pulse-node" style={{ animationDelay: '1.5s' }} />
                <circle cx="230" cy="180" r="6" fill="var(--accent-teal)" className="pulse-node" style={{ animationDelay: '0.5s' }} />
                <circle cx="260" cy="240" r="4" fill="var(--accent-teal)" className="pulse-node" style={{ animationDelay: '2s' }} />
              </svg>

              {/* Float-in badge showing clinical diagnostic status */}
              <div className="glass-panel" style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 0, 127, 0.1)',
                  color: '#FF007F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Activity size={16} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Endovascular Status</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>Active Micro-coiling</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* CSS adjustments for mobile responsive grids */}
      <style>{`
        @media (max-width: 768px) {
          #hero .grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center !important;
          }
          #hero div {
            align-self: center !important;
          }
          #hero h1 {
            font-size: 2.5rem !important;
          }
          #hero .flex {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
