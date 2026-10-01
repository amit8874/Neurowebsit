import React, { useState } from 'react';
import { ArrowLeft, X, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

import strokeImg from '../assets/Patient-Stories/Brain-Stroke-100kb.jpeg';
import aneurysmImg from '../assets/Patient-Stories/Brain aneurysm-100kb.jpeg';
import avmImg from '../assets/Brain_AVM_415x374.webp';

const storiesData = [
  {
    id: 'brain-stroke-18h',
    category: 'Brain Stroke',
    categoryTag: 'Emergency Thrombectomy',
    badgeColor: '#e11d48',
    title: '18 Hours After Stroke: When It Still Wasn’t Too Late',
    subtitle: 'She came 18 hours after having a brain stroke...',
    summary: 'A 56-year-old woman developed sudden right-sided paralysis and speech loss. Despite 18 hours passing, advanced MRI revealed salvageable brain tissue. Emergency mechanical thrombectomy restored her blood flow, leading to full recovery.',
    image: strokeImg,
    timeframe: '18 Hours Post-Stroke',
    outcome: 'Full Functional Recovery',
    sections: [
      {
        heading: 'A Sudden Stroke & Lost Hours',
        content: `It had already been almost 18 hours since the stroke began. A 56-year-old woman suddenly developed weakness on the right side of her body and difficulty speaking. Like many stroke patients, her family first took her to different outpatient clinics and smaller hospitals. Tests were done, medicines were given, and precious time passed. By the time she reached our emergency department, nearly 18 hours had gone by. For a stroke, that can feel like an eternity.`
      },
      {
        heading: 'Every Minute Matters—But Every Brain Is Different',
        content: `As soon as she arrived, our CODE FAST stroke pathway was activated. She was immediately evaluated and underwent an MRI-based stroke assessment. The scan showed something important: a major artery supplying her brain was blocked by a blood clot. Part of her brain had already suffered irreversible injury. But, remarkably, a much larger area was still receiving reduced blood flow and was at risk of permanent damage. This distinction was crucial. Although many hours had passed, there was still potentially viable brain tissue that could be saved. So we decided to attempt an emergency mechanical thrombectomy.`
      },
      {
        heading: 'Going After the Clot',
        content: `The patient was taken directly to the catheterisation laboratory. Instead of opening the skull, we made a small puncture in the femoral artery in the groin and carefully guided a thin microcatheter through the blood vessels all the way up to the arteries of the brain. Angiography confirmed the blockage. We then used a stent retriever along with aspiration to engage and remove the clot. And then came the moment we were hoping for—the blocked artery opened. Blood flow was restored to the brain. The procedure was completed, and she was shifted to the ICU for close monitoring.`
      },
      {
        heading: 'The Next Morning Brought an Unexpected Answer',
        content: `How much of her brain could we save? The next morning brought an unexpected answer. The change was remarkable. The next day, she was speaking and moving her limbs. The woman who had arrived unable to speak properly and with significant weakness was already showing substantial recovery. Over the next couple of days, her improvement continued. By the time of discharge, she had no significant neurological deficit and was back to her normal activities.\n\nFor her family, it was difficult to believe how dramatically things had changed in just a few days.`
      },
      {
        heading: 'What This Teaches Us About Stroke Care',
        content: `This case highlights one of the most important advances in modern stroke treatment. In an acute ischemic stroke, a blood clot can suddenly block an artery supplying the brain. Without blood flow, brain tissue begins to get damaged. Mechanical thrombectomy allows us to physically remove that clot and restore blood flow.\n\nBut there is another important lesson: a patient who arrives late should not automatically be considered untreatable. Some patients continue to have a significant amount of salvageable brain tissue even many hours after their symptoms begin. Advanced brain imaging can help doctors identify these patients.`
      }
    ],
    emergencyWarning: {
      title: 'The Message Every Family Must Remember',
      points: [
        'Weakness or numbness of the face, arm, or leg—especially on one side',
        'Difficulty speaking or understanding speech',
        'Sudden loss of balance or coordination',
        'Sudden severe neurological symptoms'
      ],
      note: 'Do not wait. Do not visit multiple clinics. Get the patient to a hospital capable of providing 24×7 stroke evaluation and mechanical thrombectomy immediately. Because in stroke, every minute means brain saved.'
    }
  },
  {
    id: 'brain-aneurysm-coiling',
    category: 'Brain Aneurysm',
    categoryTag: 'Keyhole Endovascular Coiling',
    badgeColor: '#06b6d4',
    title: 'Sudden Thunderclap Headache: Emergency Coiling Saved His Life',
    subtitle: 'He had the worst headache of his life requiring urgent endovascular treatment...',
    summary: 'A 48-year-old male suffered a sudden, unbearable thunderclap headache caused by a ruptured cerebral aneurysm. Through a groin catheter, ultra-soft platinum micro-coils sealed the aneurysm without opening the skull.',
    image: aneurysmImg,
    timeframe: 'Emergency Cath Lab Intervention',
    outcome: 'Aneurysm Sealed Safely',
    sections: [
      {
        heading: 'The Sudden Thunderclap',
        content: `While at work, a 48-year-old man experienced an instantaneous, catastrophic headache that he described as "unlike anything ever felt before." Accompanying nausea and neck stiffness prompted immediate hospital transfer, where a 3D CT Angiogram identified a ruptured brain aneurysm at the anterior communicating artery.`
      },
      {
        heading: 'Minimally Invasive Platinum Coiling',
        content: `Rather than performing traditional open-skull craniotomy, Dr. Dewansh Mishra performed emergency endovascular coiling. A microcatheter navigated through the femoral artery into the brain's circulation. Detachable platinum coils were packed tightly inside the aneurysm dome, completely sealing it off from blood pressure.`
      },
      {
        heading: 'Complete Recovery',
        content: `The procedure successfully prevented re-bleeding. The patient recovered smoothly in the Neuro-ICU and was discharged within 5 days with zero neurological deficits.`
      }
    ]
  },
  {
    id: 'brain-avm-embolization',
    category: 'Brain AVM',
    categoryTag: 'Liquid Embolization',
    badgeColor: '#8b5cf6',
    title: 'Unexpected ICU Emergency: Tackling a Complex Brain AVM',
    subtitle: 'She never thought her regular coaching class would end up in ICU...',
    summary: 'A young student collapsed during class due to a bleeding Arteriovenous Malformation (AVM). Targeted micro-catheter liquid embolization completely shut down the abnormal vessel tangle.',
    image: avmImg,
    timeframe: 'Multi-Stage Targeted Care',
    outcome: 'Successful AVM Obliteration',
    sections: [
      {
        heading: 'Sudden Collapse & Diagnosis',
        content: `A 22-year-old student collapsed during her coaching class following a focal seizure. Emergency neuro-imaging revealed a Spetzler-Martin Grade II arteriovenous malformation (AVM) with early venous drainage in her left parietal lobe.`
      },
      {
        heading: 'Precision Liquid Embolization',
        content: `Using advanced biplane digital subtraction angiography (DSA), microcatheters super-selectively cannulated the AVM feeder arteries. Onyx liquid embolic agent was infused with sub-millimeter control, completely closing the malformation without open brain surgery.`
      },
      {
        heading: 'Back to Studies & Normal Life',
        content: `Post-procedure imaging confirmed total obliteration of the AVM nidus. She returned to her academic studies seizure-free and fully recovered.`
      }
    ]
  }
];

export default function PatientStories({ onBack, isPage = true, onOpenBookingModal }) {
  const [selectedStory, setSelectedStory] = useState(null);

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
