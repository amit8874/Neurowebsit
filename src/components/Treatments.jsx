import React, { useState } from 'react';
import { ShieldAlert, Zap, Activity, HelpCircle, Heart, ArrowRight } from 'lucide-react';

export default function Treatments() {
  const [selectedCard, setSelectedCard] = useState(null);

  const treatments = [
    {
      id: 'stroke',
      title: 'Brain Stroke',
      shortDesc: 'Immediate removal of blood clots to restore cerebral blood flow and salvage brain tissue.',
      symptoms: ['Sudden weakness or numbness in face/arm/leg', 'Difficulty speaking or understanding speech', 'Sudden loss of balance or severe dizziness'],
      procedure: 'Mechanical Thrombectomy',
      details: 'Using advanced microcatheters inserted through the leg or wrist, a stent retriever or aspiration device is guided directly to the blocked brain artery. The blood clot is caught and sucked out, immediately restoring blood flow. This is a time-critical procedure (usually done within 6 to 24 hours of stroke onset).',
      color: '#e11d48', // Red alert
      icon: <Zap size={24} />
    },
    {
      id: 'aneurysm',
      title: 'Brain Aneurysm',
      shortDesc: 'Securing weakened, bulging artery walls in the brain using platinum micro-coils to prevent rupture.',
      symptoms: ['Sudden, extremely severe headache ("thunderclap")', 'Double vision or dilated pupils', 'Pain above or behind an eye'],
      procedure: 'Endovascular Coiling & Flow Diversion',
      details: 'A microcatheter is navigated inside the aneurysm sac. Tiny, soft platinum coils are released, packing the aneurysm. This blocks blood flow from entering the bulge, prompting it to clot off and preventing rupture. Flow-diverting stents may also be placed in the parent artery to redirect blood away from the aneurysm.',
      color: '#06b6d4', // Cyan
      icon: <Activity size={24} />
    },
    {
      id: 'avm',
      title: 'Brain & Spinal AVM',
      shortDesc: 'Sealing abnormal tangles of blood vessels (Arteriovenous Malformations) using liquid embolic agents.',
      symptoms: ['Seizures or progressive neurological deficits', 'Chronic headaches or localized back pain', 'Numbness or weakness in limbs'],
      procedure: 'Endovascular Embolization',
      details: 'Arteriovenous Malformations (AVMs) are abnormal connections between arteries and veins. In embolization, a microcatheter is carefully threaded into the feeding arteries of the AVM. A special liquid embolic glue (like Onyx) is injected to block off the abnormal tangle, preventing hemorrhage or preparing the area for surgery.',
      color: '#3b82f6', // Blue
      icon: <ShieldAlert size={24} />
    },
    {
      id: 'carotid',
      title: 'Carotid Artery Stenting',
      shortDesc: 'Restoring blood flow in narrowed neck arteries using high-grade metal stents to prevent stroke.',
      symptoms: ['Transient Ischemic Attacks (TIAs) / Mini-strokes', 'Temporary blindness in one eye', 'Sudden slurred speech'],
      procedure: 'Angioplasty & Stenting with Embolic Protection',
      details: 'For patients with severe carotid artery stenosis (narrowing), a self-expanding metal stent is deployed at the blockage area in the neck. An embolic protection filter (brain filter) is placed downstream to catch any loose plaque particles during the procedure, keeping them from traveling to the brain and causing a stroke.',
      color: '#10b981', // Emerald
      icon: <Heart size={24} />
    },
    {
      id: 'hemorrhage',
      title: 'Brain Hemorrhage',
      shortDesc: 'Emergency diagnosis and endovascular management of bleeding inside the brain or skull.',
      symptoms: ['Sudden loss of consciousness', 'Nausea, vomiting, and severe neck stiffness', 'Sudden weakness on one side'],
      procedure: 'Hemorrhage Management & Embolization',
      details: 'Intracranial hemorrhage can be caused by high blood pressure, ruptured aneurysms, or trauma. Dr. Mishra performs urgent diagnostic angiography to locate active bleed sources and uses microvascular embolization techniques to stop critical bleeding, stabilizing the patient.',
      color: '#f59e0b', // Amber
      icon: <Activity size={24} />
    },
    {
      id: 'mri',
      title: 'Brain & Spine MRI Interpretation',
      shortDesc: 'Expert, high-resolution diagnostic imaging analysis to detect silent brain anomalies.',
      symptoms: ['Chronic unexplained headaches', 'Persistent tingling or shooting nerve pains', 'Progressive memory loss or confusion'],
      procedure: 'Advanced Neuroimaging Diagnostics',
      details: 'Utilizing state-of-the-art MRI protocols (Diffusion-weighted imaging, perfusion MRI, MR Angiography/Venography, and functional scans), Dr. Mishra interprets complex brain scans to accurately identify tumors, strokes, MS lesions, and nerve compressions, guiding precise treatment planning.',
      color: '#8b5cf6', // Violet
      icon: <HelpCircle size={24} />
    }
  ];

  return (
    <section id="treatments" className="py-24 relative" style={{
      backgroundColor: 'var(--bg-secondary)',
      transition: 'background-color var(--transition-normal)'
    }}>
      {/* Background decoration */}
      <div className="glow-blob glow-blob-teal" style={{ top: '30%', right: '10%' }} />

      <div className="container relative z-10">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Clinical Specializations</span>
          <h2 className="section-title">Endovascular Neuro-Interventions</h2>
          <p className="section-desc">
            Explore major conditions treated using advanced, minimally invasive endovascular catheter technology, eliminating the need for open skull surgeries.
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

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
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

        {/* Detailed Modal/Drawer for Selected Treatment */}
        {selectedCard && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                Specialized Procedure
              </span>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>
                {selectedCard.title}
              </h3>

              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--accent-teal)', marginBottom: '24px' }}>
                Key Intervention: {selectedCard.procedure}
              </p>

              {/* Grid content inside modal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Symptoms block */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Warning Signs & Symptoms
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
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    How Endovascular Treatment Works
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
                <a href="#booking" onClick={() => setSelectedCard(null)} className="btn btn-primary" style={{ padding: '8px 16px', backgroundColor: selectedCard.color }}>
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
