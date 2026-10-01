import React, { useState } from 'react';
import { Sparkles, Activity, Clock, HeartPulse, CheckCircle2, Send } from 'lucide-react';

const scanTypes = [
  {
    id: 'aneurysm',
    title: 'Brain Aneurysm / SAC / Flow Diverter',
    icon: '🧠',
    duration: '60 - 90 Mins',
    stay: '2 - 3 Days',
    recovery: '3 - 5 Days',
    technique: 'Pinhole Coiling via Radial/Femoral Artery',
    advice: 'No skull opening required. Patients can walk standardly on Day 2 post-procedure.',
    recommendedScan: '3D Cerebral Angiogram (DSA) / Brain MRA'
  },
  {
    id: 'stroke',
    title: 'Acute Brain Stroke / Thrombectomy',
    icon: '⚡',
    duration: '30 - 60 Mins',
    stay: '3 - 5 Days',
    recovery: '1 - 2 Weeks',
    technique: 'Emergency Mechanical Clot Extraction (Stent Retriever)',
    advice: 'Critical golden window: Maximum brain tissue saved when intervention is performed early.',
    recommendedScan: 'NCCT Brain + CT Angiography / CT Perfusion'
  },
  {
    id: 'avm',
    title: 'Brain / Spinal AVM Embolization',
    icon: '🩸',
    duration: '90 - 120 Mins',
    stay: '3 - 4 Days',
    recovery: '5 - 7 Days',
    technique: 'Micro-guided Liquid Embolic Injection (Onyx/Squid)',
    advice: 'Blocks high-pressure abnormal shunts smoothly without open brain surgery.',
    recommendedScan: 'Brain MRI + DSA Angiogram'
  },
  {
    id: 'carotid',
    title: 'Carotid Artery Stenting',
    icon: '🫀',
    duration: '45 - 60 Mins',
    stay: '2 Days',
    recovery: '2 - 4 Days',
    technique: 'Endovascular Stenting with Embolic Protection Filter',
    advice: 'Restores blood supply to the brain, preventing recurrent ischemic strokes.',
    recommendedScan: 'Carotid Doppler / CT Angiography'
  },
  {
    id: 'venous',
    title: 'Venous Sinus Stenting (IIH)',
    icon: '🌀',
    duration: '60 Mins',
    stay: '2 Days',
    recovery: '3 Days',
    technique: 'Venous Sinus Micro-Stenting',
    advice: 'Relieves chronic headaches and whooshing ear noise (pulsatile tinnitus).',
    recommendedScan: 'MR Venography (MRV) / Venous Manometry'
  },
  {
    id: 'dsa',
    title: 'Diagnostic Angiography (DSA)',
    icon: '🔍',
    duration: '20 - 30 Mins',
    stay: 'Same Day / 1 Day',
    recovery: '24 Hours',
    technique: 'Pinhole 3D Digital Subtraction Angiography',
    advice: 'Gold-standard diagnostic imaging for high-precision neurovascular mapping.',
    recommendedScan: 'Pre-procedure Renal Function Test (RFT)'
  }
];

export default function ScanOpinionEstimator() {
  const [selectedScanId, setSelectedScanId] = useState('aneurysm');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeScan = scanTypes.find((s) => s.id === selectedScanId) || scanTypes[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section
      id="scan-estimator"
      className="relative overflow-hidden"
      style={{
        paddingTop: '36px',
        paddingBottom: '36px',
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Blobs */}
      <div className="glow-blob glow-blob-teal" style={{ top: '15%', right: '5%', opacity: 0.1 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '15%', left: '5%', opacity: 0.1 }} />

      <div className="container relative z-10" style={{ width: '100%', maxWidth: '100%', padding: '0 24px', boxSizing: 'border-box' }}>

        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
          <div className="flex items-center" style={{
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            marginBottom: '8px'
          }}>
            <Sparkles size={14} fill="var(--accent-teal)" />
            <span>INSTANT ESTIMATOR & SECOND OPINION</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.1rem', marginBottom: '8px' }}>
            MRI / CT Scan Recovery Estimator
          </h2>

          <p style={{
            fontSize: '0.975rem',
            color: 'var(--text-secondary)',
            maxWidth: '820px',
            lineHeight: '1.5',
            margin: 0
          }}>
            Select your diagnosis or scan type to preview keyhole procedure details, expected recovery duration, and request a direct review by <strong>Dr. Dewansh Mishra</strong>.
          </p>
        </div>

        {/* Full-Width Desktop Grid Layout */}
        <div className="estimator-desktop-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'stretch',
          width: '100%',
          boxSizing: 'border-box'
        }}>

          {/* Left Column: Select Scan / Diagnosis Types (2-Column Subgrid) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
              1. Select Diagnosis / Scan Type
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {scanTypes.map((scan) => {
                const isSelected = scan.id === selectedScanId;
                return (
                  <div
                    key={scan.id}
                    onClick={() => {
                      setSelectedScanId(scan.id);
                      setIsSubmitted(false);
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--accent-teal)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{scan.icon}</span>
                      <span style={{
                        fontSize: '0.825rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--accent-teal)' : 'var(--text-primary)',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {scan.title}
                      </span>
                    </div>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid var(--accent-teal)' : '2px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      flexShrink: 0,
                      marginLeft: '6px'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Estimate Display Card & Quick Request Form */}
          <div className="glass-panel" style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px' }}>
                2. Keyhole Procedure & Recovery Preview
              </h3>

              {/* Dynamic Metric Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <Clock size={16} color="var(--accent-teal)" style={{ margin: '0 auto 2px' }} />
                  <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>DURATION</span>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary)' }}>{activeScan.duration}</span>
                </div>

                <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <Activity size={16} color="#10b981" style={{ margin: '0 auto 2px' }} />
                  <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>STAY</span>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#10b981' }}>{activeScan.stay}</span>
                </div>

                <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <HeartPulse size={16} color="#3b82f6" style={{ margin: '0 auto 2px' }} />
                  <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>RECOVERY</span>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#3b82f6' }}>{activeScan.recovery}</span>
                </div>
              </div>

              {/* Details Box */}
              <div style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(6, 182, 212, 0.06)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                marginBottom: '14px'
              }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-teal)', fontWeight: 700, margin: '0 0 2px' }}>
                  Technique: {activeScan.technique}
                </p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                  💡 {activeScan.advice}
                </p>
              </div>
            </div>

            {/* Direct Form Request */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px' }}>
                3. Request Direct Scan Review by Dr. Dewansh
              </h4>

              {isSubmitted ? (
                <div style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={26} color="#10b981" style={{ margin: '0 auto 4px' }} />
                  <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#10b981', margin: '0 0 2px' }}>
                    Second Opinion Request Received!
                  </p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Our clinical care team will contact <strong>{formData.name}</strong> shortly to review your scan reports.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Patient Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.825rem',
                      width: '100%'
                    }}
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.825rem',
                      width: '100%'
                    }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: '9px 16px',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Send size={15} />
                    <span>Get Review</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .estimator-desktop-grid {
            grid-template-columns: 1fr !important;
          }
          .estimator-desktop-grid form {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #scan-estimator .estimator-desktop-grid > div:first-child > div {
            grid-template-columns: 1fr !important;
          }
          #scan-estimator .section-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
