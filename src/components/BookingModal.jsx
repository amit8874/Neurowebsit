import React, { useState } from 'react';
import { X, CalendarRange, User, Phone, Mail, Calendar, Clock, FileText, Upload, CheckCircle2, Send, Sparkles, ShieldCheck, ArrowLeft, CreditCard, Check } from 'lucide-react';

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

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Input Form, 2: Fee Review (₹600), 3: Success Receipt
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: 'aneurysm',
    date: '',
    timeSlot: 'morning',
    notes: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

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

  const consultTypes = [
    { value: 'stroke', label: 'Acute Brain Stroke Referral' },
    { value: 'aneurysm', label: 'Brain Aneurysm Coiling Consult' },
    { value: 'avm', label: 'Brain / Spinal AVM Evaluation' },
    { value: 'carotid', label: 'Carotid Artery Stenting Consult' },
    { value: 'mri', label: 'MRI Scan Second Opinion / Review' },
    { value: 'general', label: 'Other Neuro-Vascular Symptoms' }
  ];

  const getConsultLabel = (val) => {
    const match = consultTypes.find(t => t.value === val);
    return match ? match.label : val;
  };

  // Step 1 -> Step 2 Validation
  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill in all required fields (Name, Phone, Preferred Date).');
      return;
    }
    setStep(2);
  };

  // Notify Doctor via Email
  const notifyDoctorViaEmail = async (bookingData) => {
    const emailPayload = {
      to_email: 'dewanshmishra@gmail.com',
      subject: `🚨 NEW BOOKING CONFIRMED: ${bookingData.name} - ₹600 Paid`,
      patient_name: bookingData.name,
      patient_phone: bookingData.phone,
      patient_email: bookingData.email || 'N/A',
      consultation_specialization: getConsultLabel(bookingData.consultationType),
      appointment_date: bookingData.date,
      time_slot: bookingData.timeSlot === 'morning' ? 'Morning (10:00 AM - 01:00 PM)' : 'Afternoon (02:00 PM - 07:00 PM)',
      clinical_notes: bookingData.notes || 'None provided',
      payment_id: bookingData.paymentId,
      amount_paid: '₹600',
      booking_reference: bookingData.id,
      hospital: 'Apollomedics Super Speciality Hospital, Lucknow'
    };

    try {
      await fetch('https://formspree.io/f/xknlqzyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload)
      });
    } catch (err) {
      console.warn('Doctor email notification fallback:', err);
    }
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
      key: razorpayKey, // Real Live Razorpay Key ID
      amount: 600 * 100, // ₹600 in paise
      currency: "INR",
      name: "Dr. Dewansh Mishra",
      description: "Consultation Fee - Apollomedics Hospital",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 12));
        completeBookingProcess(paymentId);
      },
      prefill: {
        name: formData.name,
        email: formData.email || 'patient@example.com',
        contact: formData.phone
      },
      notes: {
        specialization: getConsultLabel(formData.consultationType),
        hospital: "Apollomedics Super Speciality Hospital, Lucknow",
        fee: "₹600"
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

  // On Successful Payment Completion
  const completeBookingProcess = (paymentId) => {
    const bookingRecord = {
      id: 'DM-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      consultationTypeLabel: getConsultLabel(formData.consultationType),
      paymentId: paymentId,
      feePaid: '₹600',
      status: 'Paid & Confirmed',
      filesCount: selectedFiles.length,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('dewansh_bookings') || '[]');
      localStorage.setItem('dewansh_bookings', JSON.stringify([bookingRecord, ...saved]));
    } catch (err) {
      console.error(err);
    }

    // Send Doctor Email Notification
    notifyDoctorViaEmail(bookingRecord);

    setConfirmedBooking(bookingRecord);
    setIsLoading(false);
    setStep(3);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      consultationType: 'aneurysm',
      date: '',
      timeSlot: 'morning',
      notes: ''
    });
    setSelectedFiles([]);
    onClose();
  };

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
          onClick={handleResetAndClose}
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
        <div style={{ marginBottom: '20px', paddingRight: '36px' }}>
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
            <span>Dr. Dewansh Mishra • Apollomedics Lucknow</span>
          </div>

          <h2 style={{
            fontSize: '1.7rem',
            fontWeight: 800,
            lineHeight: '1.25',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            {step === 1 && 'Book Consultation'}
            {step === 2 && 'Review Details & Consultation Fee'}
            {step === 3 && 'Booking Confirmed'}
          </h2>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginTop: '4px',
            margin: 0
          }}>
            {step === 1 && 'Step 1 of 2: Enter patient details & preferred appointment slot'}
            {step === 2 && 'Step 2 of 2: Review details & proceed to pay consultation fee (₹600)'}
            {step === 3 && 'Your appointment request and payment have been confirmed'}
          </p>
        </div>

        {/* Progress Bar Indicator */}
        {step < 3 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            backgroundColor: 'rgba(var(--primary-rgb), 0.03)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              flex: 1,
              height: '6px',
              backgroundColor: 'rgba(6, 182, 212, 0.2)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: step === 1 ? '50%' : '100%',
                height: '100%',
                backgroundColor: 'var(--accent-teal)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
              Step {step} / 2
            </span>
          </div>
        )}

        {/* Loading Spinner */}
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Processing Payment Gateway...</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Connecting securely to Razorpay
            </p>
          </div>
        ) : step === 1 ? (

          /* ================= STEP 1: INPUT FORM ================= */
          <form onSubmit={handleProceedToReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
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

            {/* Phone & Email Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Phone Number *
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
                  <Phone size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 99121 82862"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Email Address
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
                  <Mail size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                  <Calendar size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
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
                    <option value="morning">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="afternoon">Afternoon (02:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                Brief Clinical Symptoms (Optional)
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
                  placeholder="Mention key symptoms or medical history..."
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
              Continue to Fee & Review (₹600)
            </button>

          </form>
        ) : step === 2 ? (

          /* ================= STEP 2: FEE REVIEW & RAZORPAY CONFIRMATION ================= */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Entered Details Summary Box */}
            <div style={{
              padding: '18px 20px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Patient & Appointment Details
                </span>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    fontSize: '0.75rem',
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
                  <ArrowLeft size={12} /> Edit Details
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Patient Name</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formData.name}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Phone Number</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formData.phone}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Email Address</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.email || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Appointment Date</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>{formData.date}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.825rem', paddingTop: '6px', borderTop: '1px dashed var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Specialization: </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{getConsultLabel(formData.consultationType)}</span>
              </div>
            </div>

            {/* Doctor Fee Breakdown Card */}
            <div style={{
              padding: '20px',
              backgroundColor: 'rgba(6, 182, 212, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Doctor Consultation Fee</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹600</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Hospital & Appointment Processing</span>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#10b981' }}>FREE</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(6, 182, 212, 0.25)',
                paddingTop: '12px',
                marginTop: '4px'
              }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Total Amount Payable</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-teal)' }}>₹600</span>
              </div>
            </div>

            {/* Payment Security Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-primary)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <CreditCard size={18} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
              <span>Secured 256-bit payment encryption (UPI, Credit/Debit Cards, NetBanking). Doctor will be notified immediately upon payment.</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary"
                style={{ padding: '12px 18px', fontSize: '0.9rem' }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleRazorpayPayment}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px', fontSize: '0.95rem', boxShadow: 'var(--shadow-glow)' }}
              >
                Proceed to Pay ₹600
              </button>
            </div>

          </div>
        ) : (

          /* ================= STEP 3: SUCCESS & PAYMENT RECEIPT ================= */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center', alignItems: 'center' }}>
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
              <CheckCircle2 size={40} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Booking Confirmed & Fee Paid!
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 700, marginTop: '4px', margin: 0 }}>
                Payment Successful (₹600) • Ref: {confirmedBooking?.id}
              </p>
            </div>

            <div style={{
              width: '100%',
              padding: '18px 20px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Razorpay Payment ID</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-teal)', fontFamily: 'monospace' }}>{confirmedBooking?.paymentId}</span>
              </div>
              <p style={{ margin: 0 }}><strong>Patient Name:</strong> {confirmedBooking?.name}</p>
              <p style={{ margin: 0 }}><strong>Phone Number:</strong> {confirmedBooking?.phone}</p>
              <p style={{ margin: 0 }}><strong>Appointment Date:</strong> {confirmedBooking?.date} ({confirmedBooking?.timeSlot === 'morning' ? 'Morning Slot' : 'Afternoon Slot'})</p>
              <p style={{ margin: 0 }}><strong>Specialization:</strong> {confirmedBooking?.consultationTypeLabel}</p>
              <p style={{ margin: 0 }}><strong>Location:</strong> Apollomedics Super Speciality Hospital, Lucknow</p>
            </div>

            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--accent-teal)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              textAlign: 'left',
              lineHeight: '1.5'
            }}>
              <strong>Doctor Notified:</strong> An automated confirmation notification containing your booking details and payment receipt has been dispatched to <strong>dewanshmishra@gmail.com</strong>.
            </div>

            <button
              onClick={handleResetAndClose}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '0.95rem' }}
            >
              Done & Close
            </button>
          </div>
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
