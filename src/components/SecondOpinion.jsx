import React, { useState } from 'react';
import { ShieldCheck, FileText, Upload, Phone, Check, ArrowLeft, Send, Sparkles, Building2, Award, Clock } from 'lucide-react';
import drDewanshImg from '../assets/dr-dewansh-mishra.jpg';

export default function SecondOpinion({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    condition: '',
    summary: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Scroll smoothly to confirmation message
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div
      id="second-opinion-page"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        paddingTop: 'calc(var(--navbar-height) + 20px)',
        paddingBottom: '60px',
        width: '100%',
        maxWidth: '100%',
        transition: 'background-color var(--transition-normal)'
      }}
    >
      {/* Background Ambience Blobs */}
      <div className="glow-blob glow-blob-teal" style={{ top: '8%', left: '5%', opacity: 0.15 }} />
      <div className="glow-blob glow-blob-blue" style={{ top: '40%', right: '5%', opacity: 0.12 }} />

      <div className="container relative z-10">

        {/* Top Navigation Back Button */}
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

        {/* Header Hero Section */}
        <div className="glass-panel" style={{
          padding: '36px',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '40px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)'
        }}>
          <div className="grid grid-cols-2 items-center" style={{ gap: '32px' }}>
            
            {/* Left Header Content */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--accent-teal)',
                alignSelf: 'flex-start'
              }}>
                <Sparkles size={16} />
                <span>Expert Neurovascular Review</span>
              </div>

              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                lineHeight: '1.2',
                fontFamily: 'var(--font-heading)',
                margin: 0
              }}>
                Get a Free Second Opinion from <br />
                <span className="gradient-text">Dr. Dewansh Mishra</span>
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: 0
              }}>
                6+ years of specialized experience in neurovascular and interventional neuroradiology procedures — send your reports before deciding on treatment.
              </p>

              {/* Stats Badges Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
                <div style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-teal)', margin: 0 }}>Free</p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>No cost for a 2nd opinion</p>
                </div>

                <div style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', margin: 0 }}>6+ Years</p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>Radiology & Neuro-Interventions</p>
                </div>

                <div style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', margin: 0 }}>SCTIMST Trained</p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>DM Neuroradiology, Trivandrum</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex" style={{ gap: '14px', marginTop: '12px' }}>
                <a href="#submit-report-form" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                  <Send size={18} />
                  Submit Your Reports
                </a>
                <a href="tel:08429021960" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                  <Phone size={18} />
                  Call Instead
                </a>
              </div>
            </div>

            {/* Right Doctor Portrait Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '440px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ height: '360px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={drDewanshImg}
                    alt="Dr. Dewansh Mishra"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'top center',
                      display: 'block'
                    }}
                  />
                </div>
                <div style={{ padding: '20px', textAlign: 'left', borderTop: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Dr. Dewansh Mishra</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--accent-teal)', fontWeight: 700, margin: '4px 0' }}>
                    Consultant Interventional Neuroradiologist
                  </p>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
                    MBBS, MD (Radiodiagnosis), DM Neuroradiology (SCTIMST)
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
                    Apollomedics Super Speciality Hospital, Lucknow
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 1: Why Get a Second Opinion */}
        <div style={{ marginBottom: '48px', textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag">Why Get a Second Opinion</span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              Why a second opinion matters
            </h2>
          </div>

          <div className="glass-panel" style={{ padding: '28px 32px', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.75', marginBottom: '16px' }}>
              <strong>Dr. Dewansh Mishra</strong> is a Consultant Interventional Neuroradiologist at Apollomedics Super Speciality Hospital, Lucknow, with extensive knowledge and practical experience in diagnostic and interventional neuroradiology. He has specialized expertise in managing acute stroke cases, brain aneurysms, AVMs, dAVFs, spinal vascular disorders, and head & neck vascular malformations using keyhole endovascular procedures.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(6, 182, 212, 0.05)',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '8px' }}>
                  Clear Understanding of Your Diagnosis
                </h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  You always want a second opinion from a recognized doctor, particularly when it's free — it helps you understand your options before committing to a treatment path.
                </p>
              </div>

              <div style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.15)'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '8px' }}>
                  Minimally Invasive Alternatives
                </h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Seeking a second opinion brings access to the full range of treatment options available, including keyhole endovascular procedures without open brain surgery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Before You Consult (What to bring with you) */}
        <div style={{ marginBottom: '48px', textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag">Before You Consult</span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              What to bring with you
            </h2>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            {[
              "Hard copies of all your treatment reports & scan CDs (MRI, CT, DSA Angiography)",
              "A copy of your post-operative report, if you had surgery earlier",
              "A copy of your discharge summary, if treated at a hospital before",
              "A current treatment plan summary recommended by your physician",
              "Details of your current medication plan and dosage schedule"
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel flex items-center"
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  gap: '14px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: The Facility (Advanced imaging technology at Apollomedics) */}
        <div style={{ marginBottom: '48px', textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag">The Facility</span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              Advanced imaging technology at Apollomedics
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="facility-grid">
            <div className="interactive-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-glass)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Building2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>3D Rotational Angio</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                State-of-the-art biplane neuro-angiography cath lab for precise 3D vessel mapping.
              </p>
            </div>

            <div className="interactive-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-glass)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <FileText size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>3D CT Technology</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Advanced software for high-precision 3D reconstruction and procedure planning.
              </p>
            </div>

            <div className="interactive-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-glass)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>High-Resolution Suites</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Fully equipped dedicated suite for emergency stroke thrombectomy & coiling.
              </p>
            </div>

            <div className="interactive-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-glass)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Endovascular Capability</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Microcatheter micro-access suitable for AVM, dAVF, and spinal embolization.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Get Started (Interactive Submission Form) */}
        <div id="submit-report-form" style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag">Get Started</span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              Submit your reports for review
            </h2>
          </div>

          <div className="glass-panel" style={{
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            {isSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={36} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Reports Submitted Successfully!
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '580px', lineHeight: '1.6', margin: 0 }}>
                  Thank you for submitting your reports. Dr. Dewansh Mishra and our medical team will review your case details and contact you shortly with a personalized second opinion.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
                    Submit Another Report
                  </button>
                  <button onClick={onBack} className="btn btn-primary" style={{ padding: '10px 20px' }}>
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 99121 82862"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                      Condition / Diagnosis (if known)
                    </label>
                    <input
                      type="text"
                      name="condition"
                      placeholder="e.g. Brain Aneurysm, Stroke, AVM, DAVF"
                      value={formData.condition}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                    Brief Summary of Your Case *
                  </label>
                  <textarea
                    name="summary"
                    required
                    rows={4}
                    placeholder="Describe your condition, current treatment recommendation, and what you'd like a second opinion on..."
                    value={formData.summary}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* File Upload Zone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                    Upload Reports, Scans & Discharge Summary
                  </label>
                  <div
                    style={{
                      border: '2px dashed var(--accent-teal)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '28px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(6, 182, 212, 0.03)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <Upload size={32} color="var(--accent-teal)" style={{ marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Click to upload files or drag & drop
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
                      PDF, JPG, PNG up to 25MB each
                    </p>
                  </div>

                  {/* Uploaded File List Preview */}
                  {selectedFiles.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 14px',
                          backgroundColor: 'var(--bg-primary)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.85rem'
                        }}>
                          <FileText size={16} color="var(--accent-teal)" />
                          <span style={{ fontWeight: 600, flex: 1 }}>{file.name}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit & Call Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>
                      Prefer to speak to someone directly first?
                    </p>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      Call our team — we're happy to answer questions before you submit your reports.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="tel:08429021960" className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                      <Phone size={16} />
                      Call +91 084290 21960
                    </a>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                      <Send size={16} />
                      Submit Reports
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>

      {/* Responsive Grid CSS */}
      <style>{`
        @media (max-width: 992px) {
          #second-opinion-page .facility-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #second-opinion-page .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          #second-opinion-page .facility-grid {
            grid-template-columns: 1fr !important;
          }
          #second-opinion-page h1 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}
