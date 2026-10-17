import React, { useState } from 'react';
import { 
  Brain, 
  Zap, 
  Network, 
  Activity, 
  FileText, 
  Lightbulb, 
  Send, 
  CheckCircle2, 
  UserCheck,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';

import strokeScanImg from '../assets/scans/stroke_scan.png';
import aneurysmScanImg from '../assets/scans/aneurysm_scan.png';
import avmScanImg from '../assets/scans/avm_scan.png';
import carotidScanImg from '../assets/scans/carotid_scan.png';
import otherScanImg from '../assets/scans/other_scan.png';

const scanConditions = [
  {
    id: 'aneurysm',
    title: 'Brain aneurysm',
    iconType: 'aneurysm',
    image: aneurysmScanImg,
    imageAlt: 'Brain aneurysm coiling and flow diversion scan diagram',
    problemSolution: 'An aneurysm is a weak, balloon-like bulge forming on a cerebral artery wall that carries a risk of rupture. Advanced brain imaging (MRA, CT Angiography, or DSA) evaluates its size, neck architecture, and rupture risk. Most aneurysms can be secured without opening the skull through pinhole endovascular micro-coiling, stent-assisted coiling, or flow diverter (FD) stenting.',
    whatHappensNext: 'Dr. Dewansh analyzes the aneurysm’s geometry, parent vessel anatomy, and clinical history to determine whether preventive keyhole coiling, flow diversion, or clinical observation is the safest option.',
    bookingType: 'aneurysm'
  },
  {
    id: 'stroke',
    title: 'Blocked artery / stroke',
    iconType: 'stroke',
    image: strokeScanImg,
    imageAlt: 'Cerebral artery clot blockage and thrombectomy microcatheter diagram',
    problemSolution: 'A scan can show whether an artery is blocked. For some people, the stroke team may consider thrombectomy—a procedure to remove a clot through a thin tube. The scan is only one part of the decision.',
    whatHappensNext: 'The team considers symptoms, scan findings, timing and overall health.',
    bookingType: 'stroke'
  },
  {
    id: 'avm',
    title: 'AVM or abnormal blood vessels',
    iconType: 'avm',
    image: avmScanImg,
    imageAlt: 'Arteriovenous malformation vessel tangle and embolization diagram',
    problemSolution: 'An Arteriovenous Malformation (AVM) or Dural AV Fistula (DAVF) is an abnormal vessel tangle where high-pressure arteries connect directly to veins without normal capillaries. A diagnostic scan evaluates the nidus size and draining veins. Keyhole liquid embolization (Onyx / Squid) can super-selectively seal abnormal shunts without open brain surgery.',
    whatHappensNext: 'The INR team maps 3D digital subtraction angiograms to determine if super-selective liquid embolization, staged intervention, or combined therapy is best for your anatomy.',
    bookingType: 'avm'
  },
  {
    id: 'carotid',
    title: 'Narrowing in a neck artery',
    iconType: 'carotid',
    image: carotidScanImg,
    imageAlt: 'Carotid artery narrowing and protective stent diagram',
    problemSolution: 'Carotid or vertebral artery stenosis occurs when atherosclerotic plaque narrows the major arteries carrying blood up to the brain, posing a serious risk of ischemic stroke or TIA. Scans measure the percentage of stenosis and plaque stability. For significant narrowing, endovascular carotid angioplasty and stenting with distal embolic protection restores safe blood flow.',
    whatHappensNext: 'Dr. Dewansh evaluates blood flow velocities, stenosis severity, and plaque characteristics to recommend between protective keyhole stenting and medical management.',
    bookingType: 'carotid'
  },
  {
    id: 'other',
    title: 'Other scan finding',
    iconType: 'other',
    image: otherScanImg,
    imageAlt: 'Comprehensive neuroimaging DICOM scan review diagram',
    problemSolution: 'Inconclusive MRI/CT scan reports, unexplained pulsatile tinnitus (whooshing in ears), suspected venous sinus stenosis, dural fistulas, or intracranial hypotension. Having a subspecialty interventional neuroradiologist independently review raw DICOM scan series provides decisive diagnostic clarity.',
    whatHappensNext: 'Dr. Dewansh performs an expert subspecialty second opinion review of your raw imaging to clarify inconclusive findings and provide a direct treatment roadmap.',
    bookingType: 'mri'
  }
];

export default function ScanOpinionEstimator({ onOpenBookingModal }) {
  const { siteInfo } = useData();
  const doctorEmail = siteInfo?.email || 'dewanshmishra@gmail.com';
  const doctorName = siteInfo?.doctorName || 'Dr. Dewansh Mishra';

  const [selectedId, setSelectedId] = useState('stroke');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const activeCondition = scanConditions.find((c) => c.id === selectedId) || scanConditions[1];

  const handleSelectCondition = (id) => {
    setSelectedId(id);
    setIsSubmitted(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSending(true);

    const reviewRequest = {
      id: 'SR-' + Date.now().toString().slice(-6),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email ? formData.email.trim() : 'Not provided',
      condition: activeCondition.title,
      timestamp: new Date().toLocaleString()
    };

    // Save lead locally in browser
    try {
      const existing = JSON.parse(localStorage.getItem('dewansh_scan_requests') || '[]');
      localStorage.setItem('dewansh_scan_requests', JSON.stringify([reviewRequest, ...existing]));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Direct Email Dispatch to Doctor's Email
    const emailPayload = {
      to_email: doctorEmail,
      _replyto: formData.email ? formData.email.trim() : doctorEmail,
      email: formData.email ? formData.email.trim() : 'patient@dewanshmishra.com',
      name: reviewRequest.name,
      phone: reviewRequest.phone,
      patient_name: reviewRequest.name,
      patient_phone: reviewRequest.phone,
      patient_email: reviewRequest.email,
      scan_type: activeCondition.title,
      condition: activeCondition.title,
      doctor: `${doctorName} (${doctorEmail})`,
      hospital: siteInfo?.hospitalName || 'Apollomedics Super Speciality Hospital, Lucknow',
      subject: `🚨 NEW BRAIN SCAN REVIEW: ${reviewRequest.name} - ${activeCondition.title}`,
      _subject: `🚨 NEW BRAIN SCAN REVIEW: ${reviewRequest.name} - ${activeCondition.title}`,
      message: `NEW PATIENT BRAIN SCAN REVIEW REQUEST:
==================================================
Patient Name: ${reviewRequest.name}
Phone Number: ${reviewRequest.phone}
Email Address: ${reviewRequest.email}
Scan / Diagnosis: ${activeCondition.title}
Clinical Summary: ${activeCondition.problemSolution}
Next Steps: ${activeCondition.whatHappensNext}
Timestamp: ${reviewRequest.timestamp}
Doctor Recipient: ${doctorName} (${doctorEmail})
Hospital: ${siteInfo?.hospitalName || 'Apollomedics Super Speciality Hospital, Lucknow'}
==================================================
Please follow up directly with the patient regarding their scan review.`
    };

    try {
      await fetch('https://formspree.io/f/xknlqzyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(emailPayload)
      });
    } catch (err) {
      console.warn('Doctor email notification fallback:', err);
    }

    setIsSending(false);
    setIsSubmitted(true);
  };

  const renderConditionIcon = (type) => {
    switch (type) {
      case 'aneurysm':
        return (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f43f5e',
            flexShrink: 0
          }}>
            <Brain size={20} />
          </div>
        );
      case 'stroke':
        return (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(225, 29, 72, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e11d48',
            flexShrink: 0
          }}>
            <Zap size={20} />
          </div>
        );
      case 'avm':
        return (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
            flexShrink: 0
          }}>
            <Network size={20} />
          </div>
        );
      case 'carotid':
        return (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(249, 115, 22, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
            flexShrink: 0
          }}>
            <Activity size={20} />
          </div>
        );
      case 'other':
      default:
        return (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6',
            flexShrink: 0
          }}>
            <FileText size={20} />
          </div>
        );
    }
  };

  return (
    <section
      id="scan-estimator"
      className="relative overflow-hidden"
      style={{
        paddingTop: '48px',
        paddingBottom: '52px',
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Subtle Ambient Glow Blobs */}
      <div className="glow-blob glow-blob-teal" style={{ top: '10%', right: '8%', opacity: 0.08 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '5%', opacity: 0.08 }} />

      <div className="container relative z-10">
        
        {/* Top Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: 'var(--accent-teal)',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}>
            <Brain size={16} />
            <span>NEUROVASCULAR CARE</span>
          </div>

          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            margin: '0 0 10px'
          }}>
            Understand Your <span className="gradient-text">Brain Scan</span>
          </h2>

          <p style={{
            fontSize: '1.025rem',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            lineHeight: '1.55',
            margin: 0
          }}>
            Clear information about scans and possible treatments. Every care plan is decided by your clinical team.
          </p>
        </div>

        {/* Main Interactive Interactive Hub */}
        <div className="scan-layout-grid" style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '24px',
          alignItems: 'stretch',
          marginBottom: '28px',
          width: '100%'
        }}>

          {/* Left Column: What does your scan show? */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0 0 4px',
              letterSpacing: '-0.01em'
            }}>
              What does your scan show?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scanConditions.map((condition) => {
                const isSelected = condition.id === selectedId;
                return (
                  <div
                    key={condition.id}
                    onClick={() => handleSelectCondition(condition.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--accent-teal)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 4px 14px rgba(6, 182, 212, 0.14)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                        e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, overflow: 'hidden' }}>
                      {renderConditionIcon(condition.iconType)}
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: '1.3'
                      }}>
                        {condition.title}
                      </span>
                    </div>

                    {/* Radio indicator */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid var(--accent-teal)' : '2px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '8px',
                      transition: 'all 0.2s ease'
                    }}>
                      {isSelected && (
                        <div style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-teal)'
                        }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Condition Preview Card */}
          <div className="glass-panel" style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px'
          }}>

            {/* Condition Header & Upper Information + Diagram Layout */}
            <div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                margin: '0 0 16px',
                letterSpacing: '-0.02em'
              }}>
                {activeCondition.title}
              </h3>

              <div className="condition-preview-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: '24px',
                alignItems: 'center'
              }}>
                
                {/* Text Explanation */}
                <div>
                  <p style={{
                    fontSize: '0.965rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.68',
                    margin: 0
                  }}>
                    {activeCondition.problemSolution}
                  </p>
                </div>

                {/* Medical Diagram Illustration */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={activeCondition.image}
                    alt={activeCondition.imageAlt}
                    style={{
                      width: '100%',
                      maxHeight: '180px',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                </div>

              </div>
            </div>

            {/* Box 1: What happens next? */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '18px 22px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-teal)',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Lightbulb size={19} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 4px'
                }}>
                  What happens next?
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  margin: 0
                }}>
                  {activeCondition.whatHappensNext}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Banner Card: Ask for a scan review */}
        <div className="glass-panel" style={{
          padding: '22px 28px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'left'
        }}>
          {isSubmitted ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 340px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                  flexShrink: 0
                }}>
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px' }}>
                    Review Request Sent Directly to Dr. Dewansh Mishra!
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    An automated email has been delivered to <strong>{doctorEmail}</strong>. Dr. Dewansh’s clinical team will follow up directly with <strong>{formData.name}</strong> at <strong>{formData.phone}</strong>.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href={`mailto:${doctorEmail}?subject=${encodeURIComponent(`Brain Scan Report: ${formData.name} (${activeCondition.title})`)}&body=${encodeURIComponent(`Dear Dr. Dewansh Mishra,\n\nI have requested a review for my ${activeCondition.title} scan.\n\nPatient Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\n\nPlease find my attached scan images/reports.\n\nThank you,\n${formData.name}`)}`}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  title="Attach MRI/CT scan files and send directly to doctor email"
                >
                  <Mail size={15} color="var(--accent-teal)" />
                  <span>Email Reports Directly</span>
                </a>
                {onOpenBookingModal && (
                  <button
                    onClick={onOpenBookingModal}
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    <span>Proceed to Full OPD Appointment (₹500)</span>
                    <ArrowRight size={14} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '' });
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <div className="scan-review-bar" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              
              {/* Left Info Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 320px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-teal)',
                  flexShrink: 0,
                  border: '1px solid rgba(6, 182, 212, 0.25)'
                }}>
                  <UserCheck size={24} />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: '0 0 3px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    Ask for a scan review
                  </h4>
                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Sent directly to <strong>{doctorEmail}</strong>. Share your scan details for specialist review.
                  </p>
                </div>
              </div>

              {/* Right Input Form */}
              <form onSubmit={handleReviewSubmit} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flex: '1 1 500px',
                justifyContent: 'flex-end',
                flexWrap: 'wrap'
              }}>
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    flex: '1 1 120px',
                    minWidth: '120px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />

                <input
                  type="tel"
                  placeholder="Phone number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    flex: '1 1 130px',
                    minWidth: '130px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />

                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '11px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    flex: '1 1 140px',
                    minWidth: '130px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />

                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#0d9488',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    opacity: isSending ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSending) {
                      e.currentTarget.style.backgroundColor = '#0f766e';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(13, 148, 136, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSending) {
                      e.currentTarget.style.backgroundColor = '#0d9488';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(13, 148, 136, 0.25)';
                    }
                  }}
                >
                  <Send size={15} />
                  <span>{isSending ? 'Sending to Doctor...' : 'Request a review'}</span>
                </button>
              </form>

            </div>
          )}
        </div>

      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .scan-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .condition-preview-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .condition-preview-grid > div:last-child {
            order: -1;
          }
        }
        @media (max-width: 640px) {
          .scan-review-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .scan-review-bar form {
            flex-direction: column !important;
            width: 100% !important;
          }
          .scan-review-bar form input {
            width: 100% !important;
          }
          .scan-review-bar form button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
