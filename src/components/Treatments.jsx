import React, { useState } from 'react';
import { ShieldAlert, Zap, Activity, Scan, FileSearch, ArrowRight } from 'lucide-react';

export default function Treatments() {
  const [selectedCard, setSelectedCard] = useState(null);

  const treatments = [
    {
      id: 'aneurysm',
      title: 'Aneurysm Coiling / SAC / FD',
      shortDesc: 'Advanced micro-coiling, Stent-Assisted Coiling (SAC), and Flow Diverter (FD) stenting to prevent & treat brain aneurysm ruptures.',
      symptoms: ['Sudden, extremely severe headache ("thunderclap")', 'Double vision or dilated pupil', 'Pain behind or above one eye', 'Cranial nerve palsies'],
      procedure: 'Endovascular Micro-Coiling & Flow Diversion',
      details: 'Navigating specialized microcatheters into the cerebral aneurysm sac, ultra-soft platinum coils are deployed to seal the aneurysm. For wide-necked aneurysms, Stent-Assisted Coiling (SAC) or Flow Diverter (FD) stents are deployed to redirect arterial blood flow away from the bulge, promoting thrombosis without open brain surgery.',
      color: '#06b6d4',
      icon: <Activity size={24} />
    },
    {
      id: 'thrombectomy',
      title: 'Mechanical Thrombectomy in Brain Stroke',
      shortDesc: 'Emergency endovascular procedure to physically extract blood clots from occluded brain arteries and prevent stroke disability.',
      symptoms: ['Sudden weakness or numbness in face, arm, or leg', 'Sudden difficulty speaking or slurred speech', 'Loss of balance, severe dizziness, or confusion'],
      procedure: 'Acute Mechanical Thrombectomy',
      details: 'Using microcatheters inserted via femoral or radial access, a stent retriever or aspiration catheter is guided directly to the blocked cerebral artery under real-time fluoroscopy. The blood clot is captured and removed, instantly restoring vital blood flow to ischemic brain tissue.',
      color: '#e11d48',
      icon: <Zap size={24} />
    },
    {
      id: 'dsa',
      title: 'DSA / Angiography',
      shortDesc: 'Gold-standard Diagnostic Digital Subtraction Angiography for micro-precise visualization of cerebral and spinal blood vessels.',
      symptoms: ['Suspected arterial blockages or stenosis', 'Vascular malformation evaluation', 'Pre-surgical vascular mapping', 'Unexplained intracranial hemorrhage'],
      procedure: 'Cerebral & Spinal Digital Subtraction Angiography',
      details: 'DSA is the definitive gold standard for vascular diagnosis. A flexible catheter introduces radiopaque contrast dye into targeted head and neck arteries. High-definition 3D rotational imaging captures vessel architecture with sub-millimeter precision, pinpointing aneurysms, stenoses, and fistulas.',
      color: '#10b981',
      icon: <Scan size={24} />
    },
    {
      id: 'avm',
      title: 'AVM / DAVF Embolization',
      shortDesc: 'Targeted endovascular occlusion of Arteriovenous Malformations (AVM) and Dural Arteriovenous Fistulas (DAVF) using liquid embolic agents.',
      symptoms: ['Seizures or focal neurological deficits', 'Pulsatile tinnitus (whooshing noise in ears)', 'Chronic localized head or spinal pain', 'Sudden intracranial bleeding'],
      procedure: 'Transcatheter Liquid Embolization (Onyx / Glue)',
      details: 'AVMs and DAVFs are high-flow vascular short-circuits. Ultra-thin microcatheters are super-selectively navigated into feeding vessels to inject non-adhesive liquid embolic agents (such as Onyx, Squid, or Glue), effectively plugging the malformation nidus or fistulous connection.',
      color: '#3b82f6',
      icon: <ShieldAlert size={24} />
    },
    {
      id: 'neuroreview',
      title: 'Diagnostic Neuroimaging Consultation (Neuroreview)',
      shortDesc: 'Subspecialty expert second opinion and comprehensive review of Brain/Spine MRI, CT, and vessel imaging scans.',
      symptoms: ['Complex or inconclusive MRI/CT findings', 'Persistent unexplained neurological symptoms', 'Pre-treatment surgical evaluation', 'Second opinion request'],
      procedure: 'Subspecialty Neuroimaging & Multi-Modality Scans Review',
      details: 'Expert neuroradiological consultation analyzing high-resolution MRI sequences (DWI, PWI, MRA/MRV), CT angiograms, and diagnostic scans. Delivers precise diagnostic clarity, detailed report interpretations, and personalized treatment recommendations.',
      color: '#8b5cf6',
      icon: <FileSearch size={24} />
    }
  ];

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
                <a href="#booking" onClick={() => setSelectedCard(null)} className="btn btn-primary" style={{ padding: '8px 16px', backgroundColor: selectedCard.color, color: '#ffffff' }}>
                  Book Consultation
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
