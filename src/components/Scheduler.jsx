import React, { useState, useEffect } from 'react';
import { CalendarRange, Calendar, Clock, CheckCircle2, User, Phone, FileText, ChevronDown, Trash2 } from 'lucide-react';

export default function Scheduler() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consultationType: 'aneurysm',
    date: '',
    timeSlot: 'morning',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);

  // Load existing bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dewansh_bookings');
    if (saved) {
      try {
        setExistingBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);

    // Simulate server request delay
    setTimeout(() => {
      const newBooking = {
        id: 'DM-' + Math.floor(100000 + Math.random() * 900000),
        ...formData,
        timestamp: new Date().toLocaleString()
      };

      const updatedBookings = [newBooking, ...existingBookings];
      setExistingBookings(updatedBookings);
      localStorage.setItem('dewansh_bookings', JSON.stringify(updatedBookings));

      setSubmittedRequest(newBooking);
      setIsLoading(false);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        consultationType: 'aneurysm',
        date: '',
        timeSlot: 'morning',
        notes: ''
      });
    }, 1500);
  };

  const handleDeleteBooking = (id) => {
    const updated = existingBookings.filter(b => b.id !== id);
    setExistingBookings(updated);
    localStorage.setItem('dewansh_bookings', JSON.stringify(updated));
    if (submittedRequest && submittedRequest.id === id) {
      setSubmittedRequest(null);
    }
  };

  const consultTypes = [
    { value: 'stroke', label: 'Acute Brain Stroke Referral' },
    { value: 'aneurysm', label: 'Brain Aneurysm Coiling Consult' },
    { value: 'avm', label: 'Brain / Spinal AVM Evaluation' },
    { value: 'carotid', label: 'Carotid Artery Stenting Consult' },
    { value: 'mri', label: 'MRI scan second opinion / Diagnostics' },
    { value: 'general', label: 'Other Neuro-Vascular Symptoms' }
  ];

  return (
    <section id="booking" className="py-24 relative overflow-hidden" style={{
      transition: 'background-color var(--transition-normal)',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <div className="glow-blob glow-blob-teal" style={{ bottom: '10%', right: '5%' }} />
      
      <div className="container relative z-10">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Consultation Scheduling</span>
          <h2 className="section-title">Schedule A Digital Consultation</h2>
          <p className="section-desc">
            Request an in-person appointment or virtual second-opinion review. Dr. Dewansh Mishra's clinical team will contact you to verify details.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '48px', alignItems: 'start', marginTop: '16px' }}>
          
          {/* Left Column: Form or Confirmation Card */}
          <div className="glass-panel" style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            textAlign: 'left'
          }}>
            
            {isLoading ? (
              /* Loading Spinner Card */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 0',
                gap: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid var(--border-color)',
                  borderTop: '4px solid var(--accent-teal)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} className="spinner-animation" />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Transmitting Clinical Request...</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Securing connection to Apollomedics records system</p>
              </div>
            ) : submittedRequest ? (
              /* Confirmation Receipt Card */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="flex items-center" style={{ gap: '12px', color: 'var(--accent-teal)' }}>
                  <CheckCircle2 size={32} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Request Transmitted</h3>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Appointment ID: {submittedRequest.id}</p>
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.925rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <p><strong>Patient Name:</strong> {submittedRequest.name}</p>
                  <p><strong>Contact:</strong> {submittedRequest.phone}</p>
                  <p><strong>Consultation Type:</strong> {consultTypes.find(t => t.value === submittedRequest.consultationType)?.label}</p>
                  <p><strong>Target Date:</strong> {submittedRequest.date}</p>
                  <p><strong>Preferred Time:</strong> {submittedRequest.timeSlot === 'morning' ? 'Morning (09:00 AM - 12:00 PM)' : 'Afternoon (12:00 PM - 05:00 PM)'}</p>
                  {submittedRequest.notes && <p><strong>Notes:</strong> {submittedRequest.notes}</p>}
                </div>

                <div style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(6, 182, 212, 0.05)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--accent-teal)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  Our neuro-intervention clinical desk will call you at <strong>{submittedRequest.phone}</strong> within 2 hours to confirm your time slot and provide preparatory hospital guidelines.
                </div>

                <button onClick={() => setSubmittedRequest(null)} className="btn btn-primary" style={{ marginTop: '12px' }}>
                  Schedule Another Appointment
                </button>
              </div>
            ) : (
              /* Core Appointment Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarRange size={22} style={{ color: 'var(--accent-teal)' }} />
                  Request Appointment
                </h3>

                {/* Patient Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Patient Full Name *</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 16px',
                    backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                    gap: '10px'
                  }}>
                    <User size={18} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter patient full name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="phone" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Contact Phone Number *</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 16px',
                    backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                    gap: '10px'
                  }}>
                    <Phone size={18} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Consult Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="consultationType" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Neuro-Vascular Specialization</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 16px',
                    backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                    position: 'relative'
                  }}>
                    <select
                      id="consultationType"
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
                        appearance: 'none',
                        cursor: 'pointer',
                        paddingRight: '20px'
                      }}
                    >
                      {consultTypes.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} style={{ position: 'absolute', right: '16px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Date & Time block */}
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="date" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Preferred Date *</label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 16px',
                      backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                      gap: '10px'
                    }}>
                      <Calendar size={18} style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="timeSlot" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Preferred Slot</label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 16px',
                      backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                      position: 'relative'
                    }}>
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        style={{
                          border: 'none',
                          background: 'none',
                          outline: 'none',
                          width: '100%',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          appearance: 'none',
                          cursor: 'pointer',
                          paddingRight: '20px'
                        }}
                      >
                        <option value="morning">Morning (09am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 05pm)</option>
                      </select>
                      <ChevronDown size={16} style={{ position: 'absolute', right: '16px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="notes" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Brief Clinical History (Optional)</label>
                  <div style={{
                    display: 'flex',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 16px',
                    backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                    gap: '10px'
                  }}>
                    <FileText size={18} style={{ color: 'var(--text-muted)', marginTop: '4px' }} />
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="E.g., History of stroke, previous diagnostic MRI scans, or recurring headache details..."
                      value={formData.notes}
                      onChange={handleChange}
                      style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', boxShadow: 'var(--shadow-glow)' }}>
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Existing Booking Requests / Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Hospital Guidelines</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <p>
                <strong>1. Emergency Referrals:</strong> If you are experiencing symptoms of acute ischemic stroke (face drooping, arm weakness, slurred speech), please bypass this form and proceed immediately to the **Apollomedics Hospital Emergency Department** or call **084290 21960**.
              </p>
              <p>
                <strong>2. Second Opinions:</strong> For review of existing brain MRI or CT angiograms, please bring all physical diagnostic films or CD records on the day of consultation.
              </p>
              <p>
                <strong>3. Referral Letters:</strong> If referred by a neurologist or general physician, please carry the physical referral prescription card for priority queuing.
              </p>
            </div>

            {/* Active Bookings (Local Persistence Demo) */}
            {existingBookings.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
                  Your Active Requests ({existingBookings.length})
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', paddingRight: '8px' }}>
                  {existingBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      style={{
                        padding: '16px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          {booking.name} ({booking.id})
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {consultTypes.find(t => t.value === booking.consultationType)?.label}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-teal)', marginTop: '4px', fontWeight: 500 }}>
                          Target Date: {booking.date} ({booking.timeSlot === 'morning' ? 'Morning' : 'Afternoon'})
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#e11d48';
                          e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Cancel Appointment Request"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Inline styles for spinner and input calendar colors */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner-animation {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 768px) {
          #booking .grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        /* Custom datepicker override for better matching with dark/light themes */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: var(--calendar-filter, invert(0));
        }
        [data-theme="dark"] {
          --calendar-filter: invert(1);
        }
      `}</style>
    </section>
  );
}
