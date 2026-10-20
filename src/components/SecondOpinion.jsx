import React, { useState } from 'react';
import { ShieldCheck, FileText, Upload, Phone, Check, ArrowLeft, Send, Sparkles, Building2, Award, Clock, CreditCard, CheckCircle2, User, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import drDewanshImg from '../assets/dr.dewan.jpeg';
import neuroReviewLogo from '../assets/neuroreview-logo.jpg';
import { useData } from '../context/DataContext';
import { sendDoctorEmail } from '../utils/emailService';
import { API_BASE } from '../utils/apiConfig';

// Dynamic Razorpay SDK Loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function SecondOpinion({ onBack }) {
  const { siteInfo } = useData();
  const fee = siteInfo?.consultationFee ?? 500;
  const neuroReviewEmail = siteInfo?.neuroReviewEmail || 'neuroradiologyreview@gmail.com';
  const [step, setStep] = useState(1); // 1: Input Form, 2: Fee Review, 3: Success Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    condition: '',
    summary: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedSubmission, setConfirmedSubmission] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload individual scan file to Cloudinary via backend API
  const uploadScanToCloud = async (tempId, file) => {
    try {
      const fd = new FormData();
      fd.append('scan', file);
      const res = await fetch(`${API_BASE}/api/upload-scan`, {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      if (data.success && data.url) {
        setSelectedFiles((prev) =>
          prev.map((item) =>
            item.id === tempId
              ? { ...item, url: data.url, status: 'success' }
              : item
          )
        );
      } else {
        setSelectedFiles((prev) =>
          prev.map((item) =>
            item.id === tempId
              ? { ...item, status: 'error', errorMsg: data.error || 'Upload failed' }
              : item
          )
        );
      }
    } catch (err) {
      setSelectedFiles((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? { ...item, status: 'error', errorMsg: err.message || 'Upload failed' }
            : item
        )
      );
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newEntries = filesArray.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        sizeStr: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        url: null,
        status: 'uploading',
        errorMsg: ''
      }));

      setSelectedFiles((prev) => [...prev, ...newEntries]);

      // Upload each file to Cloudinary
      newEntries.forEach((entry) => {
        uploadScanToCloud(entry.id, entry.file);
      });

      // Clear input so selecting the same file again triggers change
      e.target.value = '';
    }
  };

  const handleRemoveFile = (idToRemove) => {
    setSelectedFiles((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  // Step 1 -> Step 2 Fee Review Validation
  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.summary) {
      alert('Please fill out all required fields (Full Name, Phone Number, Case Summary).');
      return;
    }

    const stillUploading = selectedFiles.some((f) => f.status === 'uploading');
    if (stillUploading) {
      alert('Your scan files are currently uploading to the secure cloud. Please wait a moment until upload finishes.');
      return;
    }

    const hasError = selectedFiles.some((f) => f.status === 'error');
    if (hasError) {
      alert('One or more scan files failed to upload. Please remove or re-upload the failed file(s) before proceeding.');
      return;
    }

    setStep(2);
  };

  // Dispatch Email Notification to Doctor via Nodemailer/Resend (direct to Gmail)
  const notifyDoctorViaEmail = async (submissionRecord) => {
    const uploadedScans = (submissionRecord.attachedFiles || []).filter((f) => f.url);

    const attachedFilesSummary = uploadedScans.length > 0
      ? uploadedScans.map((f, i) => `${i + 1}. ${f.name} (${f.size})\n   Download Link: ${f.url}`).join('\n\n')
      : (selectedFiles.length > 0
          ? selectedFiles.map((f, i) => `${i + 1}. ${f.name} (${f.sizeStr || 'N/A'})`).join('\n')
          : 'No files attached');

    const subjectLine = `🚨 NEUROREVIEW 2ND OPINION ON SCAN: ${submissionRecord.fullName} - ₹${fee} Paid`;
    const messageBody =
`NEUROREVIEW — 2ND OPINION ON SCAN SUBMISSION DETAILS
==================================================
Brand          : NeuroReview
Review Desk    : ${neuroReviewEmail}
Submission Ref : ${submissionRecord.id}
Patient Name   : ${submissionRecord.fullName}
Phone          : ${submissionRecord.phone}
Email          : ${submissionRecord.email || 'N/A'}
Condition      : ${submissionRecord.condition || 'General Neuro-Vascular Review'}
Case Summary   : ${submissionRecord.summary}
Payment ID     : ${submissionRecord.paymentId}
Amount Paid    : ₹${fee}
Files Attached : ${selectedFiles.length}

PATIENT SCANS (DIRECT CLOUD DOWNLOAD LINKS):
==================================================
${attachedFilesSummary}
==================================================
Please click the download link(s) above to view high-resolution scan reports and follow up with the patient.`;

    await sendDoctorEmail({
      subjectLine,
      patientName: submissionRecord.fullName,
      patientPhone: submissionRecord.phone,
      patientEmail: submissionRecord.email || 'N/A',
      messageBody,
      recipientEmail: neuroReviewEmail,
      scanUrls: uploadedScans
    });
  };

  // Trigger Razorpay Payment
  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    const razorpayKey = (import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.RAZORPAY_KEY_ID || 'rzp_live_SgoRtYO7JP8Gbi').trim();

    if (!razorpayKey || razorpayKey.includes('YOUR_KEY_HERE')) {
      alert('Razorpay Key ID is missing in .env.\n\nPlease open the .env file in the project root, set VITE_RAZORPAY_KEY_ID=your_key_id (e.g. rzp_live_...), and restart npm run dev.');
      setIsLoading(false);
      return;
    }

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert('Unable to load Razorpay Payment Gateway. Please check your network connection.');
      setIsLoading(false);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: fee * 100, // fee in paise (₹500)
      currency: "INR",
      name: "NeuroReview — 2nd Opinion on Scan",
      description: "NeuroReview 2nd Opinion on Scan Review Fee - Dr. Dewansh Mishra",
      image: `${window.location.origin}/neuroreview-logo.jpg`,
      handler: function (response) {
        const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 12));
        completeSecondOpinionSubmission(paymentId);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email || 'patient@example.com',
        contact: formData.phone
      },
      notes: {
        brand: "NeuroReview",
        condition: formData.condition || "2nd Opinion on Scan",
        desk: neuroReviewEmail,
        doctor: "Dr. Dewansh Mishra - Brain & Spine Vascular Specialist",
        fee: `₹${fee}`
      },
      theme: {
        color: "#06b6d4"
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        }
      }
    };

    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (res) {
        const desc = res.error?.description || res.error?.reason || '';
        if (desc.includes('401') || desc.includes('Unauthorized') || desc.includes('key_id')) {
          alert('Razorpay 401 Unauthorized Error:\n\nThe Key ID provided in .env is not authorized or invalid on Razorpay.\n\nPlease verify that your VITE_RAZORPAY_KEY_ID in .env is an active Live Key (rzp_live_...) from your Razorpay Dashboard.');
        } else {
          alert('Payment Notification: ' + (desc || 'Transaction cancelled or closed'));
        }
        setIsLoading(false);
      });
      razorpayInstance.open();
      setIsLoading(false);
    } catch (err) {
      console.error('Razorpay invocation error:', err);
      alert('Could not launch Razorpay checkout. Please verify VITE_RAZORPAY_KEY_ID in your .env file.');
      setIsLoading(false);
    }
  };

  // Complete Submission after Payment
  const completeSecondOpinionSubmission = (paymentId) => {
    const submissionRecord = {
      id: 'SO-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      paymentId: paymentId,
      feePaid: `₹${fee}`,
      attachedFiles: selectedFiles.map(f => ({
        name: f.name,
        size: f.sizeStr || (f.file ? (f.file.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'),
        url: f.url
      })),
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('dewansh_second_opinions') || '[]');
      localStorage.setItem('dewansh_second_opinions', JSON.stringify([submissionRecord, ...saved]));
    } catch (err) {
      console.error(err);
    }

    // Persist permanently in MongoDB database
    try {
      fetch(`${API_BASE}/api/second-opinions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionRecord)
      }).catch((e) => console.warn('MongoDB second-opinion save warning:', e.message));
    } catch (err) {
      console.error('Failed to post second opinion to backend:', err);
    }

    // Send Doctor Email Notification with File Details
    notifyDoctorViaEmail(submissionRecord);

    setConfirmedSubmission(submissionRecord);
    setIsLoading(false);
    setStep(3);

    // Scroll to top of report section
    const el = document.getElementById('submit-report-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setStep(1);
    setConfirmedSubmission(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      condition: '',
      summary: ''
    });
    setSelectedFiles([]);
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

        {/* ================= TOP NEUROREVIEW BRAND SHOWCASE BANNER ================= */}
        <div className="glass-panel neuroreview-hero-banner">
          <div className="neuroreview-hero-left">
            {/* The Big Uploaded NeuroReview Brand Icon */}
            <div className="neuroreview-banner-logo-box">
              <img
                src={neuroReviewLogo}
                alt="NeuroReview Brand Logo"
                className="neuroreview-banner-logo-img"
              />
            </div>

            {/* Brand Title & Direct Review Desk Specs */}
            <div className="neuroreview-banner-info">
              <div className="neuroreview-banner-pill">
                <Sparkles size={12} color="var(--accent-teal)" />
                <span>OFFICIAL 2ND OPINION ON SCAN BRAND</span>
              </div>

              <h2 className="neuroreview-banner-title">
                NeuroReview<span style={{ color: 'var(--accent-teal)' }}>™</span>
              </h2>

              <p className="neuroreview-banner-sub">
                Dedicated 2nd Opinion on Brain &amp; Spine Scans (MRI, CT, Angiography)
              </p>

              <div className="neuroreview-banner-meta">
                <span className="neuroreview-meta-pill">
                  <ShieldCheck size={14} style={{ flexShrink: 0 }} />
                  <span>Confidential Clinical Scan Desk</span>
                </span>
                <span className="neuroreview-meta-doc">
                  <Award size={14} style={{ flexShrink: 0 }} />
                  <span>Evaluated by Dr. Dewansh Mishra (DM Neuroradiology, SCTIMST)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Banner Quick CTA */}
          <div className="neuroreview-hero-right">
            <a
              href="#submit-report-form"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('submit-report-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary neuroreview-banner-cta-btn"
            >
              Submit Your Scan (₹{fee})
            </a>
          </div>
        </div>

        {/* Header Hero Section */}
        <div className="glass-panel second-opinion-hero-panel" style={{
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
                gap: '12px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                padding: '7px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--accent-teal)',
                alignSelf: 'flex-start'
              }}>
                <img
                  src={neuroReviewLogo}
                  alt="NeuroReview"
                  style={{ width: '32px', height: '32px', borderRadius: '7px', objectFit: 'cover', border: '1.5px solid var(--accent-teal)' }}
                />
                <span>NeuroReview™ • 2nd Opinion on Scan</span>
              </div>

              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                lineHeight: '1.2',
                fontFamily: 'var(--font-heading)',
                margin: 0
              }}>
                Get an Expert 2nd Opinion on Scan with <br />
                <span className="gradient-text">NeuroReview™</span>
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: 0
              }}>
                <strong>NeuroReview™</strong> is our dedicated subspecialty second opinion service for Brain &amp; Spine MRI, CT, and angiography scans. Every case is personally evaluated with advanced neuroradiological precision by <strong>Dr. Dewansh Mishra</strong> before deciding on invasive surgery. Scan submissions and reports are handled directly through our dedicated digital review desk below.
              </p>

              {/* Stats Badges Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '4px' }}>
                <div style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-teal)', margin: 0 }}>₹{fee}</p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>NeuroReview Case Fee</p>
                </div>

                <div style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', margin: 0 }}>8+ Years</p>
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
              <div className="flex" style={{ gap: '14px', marginTop: '8px' }}>
                <a
                  href="#submit-report-form"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('submit-report-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                >
                  <Send size={18} />
                  Submit Your Reports to NeuroReview
                </a>
                <a href="tel:09208430808" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                  <Phone size={18} />
                  Call Instead
                </a>
              </div>
            </div>

            {/* Right Doctor Portrait & NeuroReview Brand Desk Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '440px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                {/* Doctor Portrait Header Ribbon */}
                <div style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.12)',
                  borderBottom: '1px solid rgba(6, 182, 212, 0.25)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img
                    src={neuroReviewLogo}
                    alt="NeuroReview"
                    style={{ width: '30px', height: '30px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid var(--accent-teal)' }}
                  />
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--accent-teal)', letterSpacing: '0.04em' }}>
                    NEUROREVIEW™ LEAD NEURORADIOLOGIST
                  </span>
                </div>

                <div style={{ height: '340px', width: '100%', overflow: 'hidden', position: 'relative' }} className="second-opinion-doctor-img-wrap">
                  <img
                    src={drDewanshImg}
                    alt="Dr. Dewansh Mishra"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      display: 'block'
                    }}
                  />
                </div>
                <div style={{ padding: '18px 20px', textAlign: 'left', borderTop: '1px solid var(--border-color)' }}>
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

              {/* Dedicated NeuroReview Brand Desk Card */}
              <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '440px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                border: '1.5px solid rgba(6, 182, 212, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'left'
              }}>
                <img
                  src={neuroReviewLogo}
                  alt="NeuroReview"
                  style={{
                    width: '78px',
                    height: '78px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: '2px solid var(--accent-teal)',
                    boxShadow: '0 4px 18px rgba(6, 182, 212, 0.4)'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    NeuroReview™ Direct Scan Desk
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 700, marginTop: '2px' }}>
                    Dedicated Second Opinion Portal
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Send DICOM / CD / Drive links directly for expedited review
                  </div>
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
                  You always want a second opinion from a recognized doctor — it helps you understand your options before committing to a major surgical procedure.
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

            {/* The NeuroReview Advantage Callout */}
            <div style={{
              marginTop: '22px',
              padding: '18px 22px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1.5px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap'
            }}>
              <img
                src={neuroReviewLogo}
                alt="NeuroReview"
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-teal)',
                  boxShadow: '0 4px 16px rgba(6, 182, 212, 0.35)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  The NeuroReview™ Difference: Raw DICOM Re-Evaluation
                </h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                  Many second opinions only read existing summary reports. Under <strong>NeuroReview™</strong>, Dr. Dewansh Mishra re-reads your actual source imaging sequences (CT, MRI, DSA angiograms) to ensure aneurysms, stenosis, or vessel shunts are accurately sized and staged.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Get Started (Interactive 2-Step Submission & Fee Form) */}
        <div id="submit-report-form" style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag">NeuroReview Case Submission</span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              Submit your scans to NeuroReview for expert 2nd opinion
            </h2>
          </div>

          <div className="glass-panel" style={{
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            backgroundColor: 'var(--bg-secondary)'
          }}>

            {isLoading ? (
              /* Loading Spinner State */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 0',
                gap: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid var(--border-color)',
                  borderTop: '4px solid var(--accent-teal)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} className="spinner-animation" />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Processing Payment Gateway...</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Connecting securely to Razorpay</p>
              </div>
            ) : step === 1 ? (

              /* ================= STEP 1: REPORT & PATIENT INPUT FORM ================= */
              <form onSubmit={handleProceedToReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Prominent NeuroReview Portal Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(6, 182, 212, 0.08)',
                  border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  marginBottom: '10px'
                }}>
                  <img
                    src={neuroReviewLogo}
                    alt="NeuroReview"
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '20px',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-teal)',
                      boxShadow: '0 6px 20px rgba(6, 182, 212, 0.45)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--accent-teal)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>
                      Official NeuroReview™ Portal
                    </span>
                    <h3 style={{ margin: '2px 0 4px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      NeuroReview™ Scan Submission Desk
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      Case details and scans are routed directly to the NeuroReview™ clinical desk and reviewed personally by Dr. Dewansh Mishra.
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>
                  Step 1 of 2: Fill patient details and upload medical reports / scans for NeuroReview evaluation
                </p>

                <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your full name"
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
                      {selectedFiles.map((item) => (
                        <div key={item.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          backgroundColor: 'var(--bg-primary)',
                          borderRadius: 'var(--radius-sm)',
                          border: item.status === 'error' ? '1px solid #ef4444' : '1px solid var(--border-color)',
                          fontSize: '0.85rem'
                        }}>
                          <FileText size={18} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                            <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                              <span>{item.sizeStr}</span>
                              {item.status === 'uploading' && (
                                <span style={{ color: 'var(--accent-teal)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <Loader2 size={12} className="animate-spin" /> Uploading to cloud...
                                </span>
                              )}
                              {item.status === 'success' && (
                                <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                  <Check size={12} /> Uploaded to Cloud
                                </span>
                              )}
                              {item.status === 'error' && (
                                <span style={{ color: '#ef4444' }}>
                                  ⚠️ {item.errorMsg || 'Upload failed'}
                                </span>
                              )}
                            </div>
                          </div>

                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--accent-teal)',
                                fontSize: '0.78rem',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: '1px solid rgba(6, 182, 212, 0.3)',
                                backgroundColor: 'rgba(6, 182, 212, 0.05)',
                                flexShrink: 0
                              }}
                            >
                              <ExternalLink size={12} /> Preview
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveFile(item.id)}
                            title="Remove file"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#94a3b8',
                              cursor: 'pointer',
                              padding: '4px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
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
                    <a href="tel:09208430808" className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
                      <Phone size={16} />
                      Call +91 092084 30808
                    </a>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                      Continue to Fee & Review (₹{fee})
                    </button>
                  </div>
                </div>

              </form>
            ) : step === 2 ? (

              /* ================= STEP 2: REVIEW DETAILS & RAZORPAY FEE (₹500) ================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '14px', overflow: 'hidden', border: '2px solid var(--accent-teal)', flexShrink: 0, boxShadow: '0 3px 12px rgba(6, 182, 212, 0.3)' }}>
                      <img src={neuroReviewLogo} alt="NeuroReview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Review Case &amp; NeuroReview™ Consultation Fee</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>Step 2 of 2: Confirm details &amp; proceed to pay fee • Direct Clinical Review</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--accent-teal)',
                      fontWeight: 700,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ArrowLeft size={14} /> Edit Details
                  </button>
                </div>

                {/* Details Summary Box */}
                <div style={{
                  padding: '18px',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.875rem'
                }}>
                  <p style={{ margin: 0 }}><strong>Patient Name:</strong> {formData.fullName}</p>
                  <p style={{ margin: 0 }}><strong>Phone Number:</strong> {formData.phone}</p>
                  <p style={{ margin: 0 }}><strong>Email Address:</strong> {formData.email}</p>
                  <p style={{ margin: 0 }}><strong>Condition / Diagnosis:</strong> {formData.condition || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong>Case Summary:</strong> {formData.summary}</p>
                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                    <strong>Attached Files ({selectedFiles.length}):</strong>
                    {selectedFiles.length > 0 ? (
                      <ul style={{ margin: '4px 0 0 16px', padding: 0, color: 'var(--accent-teal)', fontSize: '0.825rem' }}>
                        {selectedFiles.map((f, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>
                            <span>{f.name} ({f.sizeStr || (f.file ? (f.file.size / 1024 / 1024).toFixed(2) + ' MB' : '')})</span>
                            {f.url && (
                              <a
                                href={f.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--accent-teal)', marginLeft: '8px', textDecoration: 'underline', fontWeight: 600 }}
                              >
                                [Preview Scan]
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginLeft: '6px' }}>No files attached</span>
                    )}
                  </div>
                </div>

                {/* Doctor Fee Breakdown */}
                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(6, 182, 212, 0.06)',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(6, 182, 212, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>NeuroReview 2nd Opinion Review Fee</span>
                    <span style={{ fontWeight: 800 }}>₹{fee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <span>Hospital Scan Upload & Priority Queue</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(6, 182, 212, 0.25)', paddingTop: '10px', marginTop: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Total Payable Amount</span>
                    <span style={{ fontWeight: 900, fontSize: '1.35rem', color: 'var(--accent-teal)' }}>₹{fee}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}>
                  <CreditCard size={18} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
                  <span>Secured 256-bit payment gateway. Case details and uploaded scans are routed directly to NeuroReview™ and Dr. Dewansh Mishra upon payment.</span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ padding: '12px 18px' }}>
                    Back
                  </button>
                  <button onClick={handleRazorpayPayment} className="btn btn-primary" style={{ flex: 1, padding: '12px', boxShadow: 'var(--shadow-glow)' }}>
                    Proceed to Pay ₹{fee}
                  </button>
                </div>
              </div>
            ) : (

              /* ================= STEP 3: SUCCESS CONFIRMATION RECEIPT ================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', alignItems: 'center' }}>
                <div style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                  border: '2.5px solid #10b981'
                }}>
                  <img src={neuroReviewLogo} alt="NeuroReview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    NeuroReview 2nd Opinion Request Submitted & Paid!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 700, marginTop: '4px', margin: 0 }}>
                    Payment Successful ({confirmedSubmission?.feePaid || `₹${fee}`}) • Ref: {confirmedSubmission?.id}
                  </p>
                </div>

                <div style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textAlign: 'left'
                }}>
                  <p><strong>Service Desk:</strong> <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>NeuroReview™ Official Scan Desk</span></p>
                  <p><strong>Razorpay Payment ID:</strong> <span style={{ fontFamily: 'monospace', color: 'var(--accent-teal)', fontWeight: 700 }}>{confirmedSubmission?.paymentId}</span></p>
                  <p><strong>Patient Name:</strong> {confirmedSubmission?.fullName}</p>
                  <p><strong>Contact Phone:</strong> {confirmedSubmission?.phone}</p>
                  <p><strong>Email Address:</strong> {confirmedSubmission?.email}</p>
                  <p><strong>Condition:</strong> {confirmedSubmission?.condition || 'N/A'}</p>
                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                    <strong>Attached Files Sent to NeuroReview ({(confirmedSubmission?.attachedFiles || selectedFiles).length}):</strong>
                    {(confirmedSubmission?.attachedFiles || selectedFiles).length > 0 ? (
                      <ul style={{ margin: '4px 0 0 16px', padding: 0, color: 'var(--accent-teal)', fontSize: '0.825rem' }}>
                        {(confirmedSubmission?.attachedFiles || selectedFiles).map((f, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>
                            <span>{f.name} ({f.size || f.sizeStr})</span>
                            {f.url && (
                              <a
                                href={f.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--accent-teal)', marginLeft: '8px', textDecoration: 'underline', fontWeight: 600 }}
                              >
                                [View / Download Scan]
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginLeft: '6px' }}>No files attached</span>
                    )}
                  </div>
                </div>

                <div style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(6, 182, 212, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--accent-teal)',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  lineHeight: '1.6'
                }}>
                  Your case summary, payment receipt, and medical scan reports have been submitted to <strong>NeuroReview™</strong>. Dr. Dewansh Mishra and the clinical team will review your scans and reach out to you shortly.
                </div>

                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <button onClick={handleResetForm} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                    Submit Another Case
                  </button>
                  <button onClick={onBack} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Responsive Grid Styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner-animation {
          animation: spin 1s linear infinite;
        }
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
