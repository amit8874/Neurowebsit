import React, { useState } from 'react';
import { X, CalendarRange, User, Phone, Calendar, Clock, FileText, Upload, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consultationType: 'aneurysm',
    date: '',
    timeSlot: 'morning',
    notes: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
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
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newBooking = {
        id: 'DM-' + Math.floor(100000 + Math.random() * 900000),
        ...formData,
        filesCount: selectedFiles.length,
        timestamp: new Date().toLocaleString()
      };

      // Save to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('dewansh_bookings') || '[]');
        localStorage.setItem('dewansh_bookings', JSON.stringify([newBooking, ...saved]));
      } catch (err) {
        console.error(err);
      }

      setSubmittedRequest(newBooking);
      setIsLoading(false);

      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        consultationType: 'aneurysm',
        date: '',
        timeSlot: 'morning',
        notes: ''
      });
      setSelectedFiles([]);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setSubmittedRequest(null);
    onClose();
  };

  const consultTypes = [
    { value: 'stroke', label: 'Acute Brain Stroke Referral' },
    { value: 'aneurysm', label: 'Brain Aneurysm Coiling Consult' },
    { value: 'avm', label: 'Brain / Spinal AVM Evaluation' },
    { value: 'carotid', label: 'Carotid Artery Stenting Consult' },
    { value: 'mri', label: 'MRI Scan Second Opinion / Review' },
    { value: 'general', label: 'Other Neuro-Vascular Symptoms' }
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 10, 19, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'bookingModalFadeIn 0.25s ease-out forwards'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          padding: '28px 32px',
          textAlign: 'left',
          animation: 'bookingModalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(var(--primary-rgb), 0.06)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.1)';
            e.currentTarget.style.color = '#e11d48';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.06)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px', paddingRight: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            marginBottom: '10px'
          }}>
            <Sparkles size={14} />
            <span>Dr. Dewansh Mishra</span>
          </div>

          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            lineHeight: '1.25',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Book Consultation
          </h2>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            margin: 0
          }}>
            Consult with <strong>Dr. Dewansh Mishra</strong> — Neurointervention Specialist
          </p>
        </div>

        {/* Loading Spinner View */}
        {isLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 0',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid var(--border-color)',
              borderTop: '4px solid var(--accent-teal)',
              borderRadius: '50%',
              animation: 'bookingSpin 0.9s linear infinite'
            }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Transmitting Request...</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Securing your consultation request details
            </p>
          </div>
        ) : submittedRequest ? (
          /* Confirmation State View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Request Submitted!
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 700, marginTop: '4px', margin: 0 }}>
                Reference ID: {submittedRequest.id}
              </p>
            </div>

            <div style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: 'rgba(var(--primary-rgb), 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'left'
            }}>
              <p style={{ margin: 0 }}><strong>Patient Name:</strong> {submittedRequest.name}</p>
              <p style={{ margin: 0 }}><strong>Contact Phone:</strong> {submittedRequest.phone}</p>
              <p style={{ margin: 0 }}><strong>Target Date:</strong> {submittedRequest.date} ({submittedRequest.timeSlot === 'morning' ? 'Morning Slot' : 'Afternoon Slot'})</p>
              <p style={{ margin: 0 }}><strong>Specialization:</strong> {consultTypes.find(t => t.value === submittedRequest.consultationType)?.label}</p>
            </div>

            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(6, 182, 212, 0.06)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--accent-teal)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              textAlign: 'left',
              lineHeight: '1.5'
            }}>
              Dr. Dewansh Mishra's clinical team will contact you at <strong>{submittedRequest.phone}</strong> shortly to confirm your appointment and provide preparation instructions.
            </div>

            <button
              onClick={handleResetAndClose}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.95rem' }}
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form Input View */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Patient Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Patient Full Name *
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                gap: '10px'
              }}>
                <User size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Contact Phone Number *
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                gap: '10px'
              }}>
                <Phone size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 99121 82862"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Specialization / Condition */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Specialization / Condition *
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)'
              }}>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    width: '100%',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  {consultTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Slot Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Preferred Date *
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  gap: '8px'
                }}>
                  <Calendar size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Time Slot
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  backgroundColor: 'var(--bg-primary)'
                }}>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      width: '100%',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="morning">Morning (09am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 05pm)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Brief Clinical History / Symptoms (Optional)
              </label>
              <div style={{
                display: 'flex',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                gap: '10px'
              }}>
                <FileText size={18} style={{ color: 'var(--text-muted)', marginTop: '4px', flexShrink: 0 }} />
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Mention key symptoms or current diagnosis..."
                  value={formData.notes}
                  onChange={handleChange}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    width: '100%',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <Send size={16} />
              Submit Consultation Request
            </button>

          </form>
        )}

      </div>

      <style>{`
        @keyframes bookingModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bookingModalScaleIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bookingSpin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .glass-panel {
            padding: 22px 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
