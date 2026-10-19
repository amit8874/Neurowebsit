import React, { useState, useEffect } from 'react';
import { CalendarRange, Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, ChevronDown, Trash2, CreditCard, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { sendDoctorEmail } from '../utils/emailService';

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

import { OFFLINE_SLOTS, ONLINE_SLOTS } from './BookingModal';
import { API_BASE } from '../utils/apiConfig';

export default function Scheduler() {
  const { siteInfo } = useData();
  const fee = siteInfo?.consultationFee ?? 500;
  const [step, setStep] = useState(1); // 1: Input, 2: Fee Review, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationMode: 'offline', // 'offline' (10 AM - 5 PM) or 'online' (11 AM - 7 PM)
    consultationType: 'aneurysm',
    date: '',
    timeSlot: '',
    notes: ''
  });

  const getTimeSlotLabel = (mode, slot) => {
    const list = mode === 'online' ? ONLINE_SLOTS : OFFLINE_SLOTS;
    const match = list.find(s => s.id === slot);
    if (match) return match.label;
    const otherList = mode === 'online' ? OFFLINE_SLOTS : ONLINE_SLOTS;
    const otherMatch = otherList.find(s => s.id === slot);
    if (otherMatch) return otherMatch.label;
    if (slot === 'morning') return mode === 'online' ? '11:00 AM – 12:00 PM' : '10:00 AM – 11:00 AM';
    if (slot === 'afternoon') return mode === 'online' ? '02:00 PM – 03:00 PM' : '02:00 PM – 03:00 PM';
    return slot || '1-Hour Slot';
  };

  const [isLoading, setIsLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);

  // Load existing bookings from localStorage and MongoDB backend
  useEffect(() => {
    const saved = localStorage.getItem('dewansh_bookings');
    const local = saved ? JSON.parse(saved) : [];
    setExistingBookings(local);

    fetch(`${API_BASE}/api/bookings`)
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.bookings)) {
          const map = new Map();
          [...json.bookings, ...local].forEach(b => {
            const key = b.id || `${b.date}_${b.timeSlot}`;
            map.set(key, b);
          });
          setExistingBookings(Array.from(map.values()));
        }
      })
      .catch(() => {});
  }, []);

  const isSlotBooked = (slotId) => {
    if (!formData.date || !slotId) return false;
    return existingBookings.some(b =>
      b.date === formData.date &&
      b.timeSlot === slotId
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const consultTypes = [
    { value: 'stroke', label: 'Acute Brain Stroke Referral' },
    { value: 'aneurysm', label: 'Brain Aneurysm Coiling Consult' },
    { value: 'avm', label: 'Brain / Spinal AVM Evaluation' },
    { value: 'carotid', label: 'Carotid Artery Stenting Consult' },
    { value: 'mri', label: 'MRI scan second opinion / Diagnostics' },
    { value: 'general', label: 'Other Neuro-Vascular Symptoms' }
  ];

  const getConsultLabel = (val) => {
    const match = consultTypes.find(t => t.value === val);
    return match ? match.label : val;
  };

  // Step 1 -> Step 2 Fee Review
  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill in all required fields (Name, Phone, Preferred Date).');
      return;
    }
    if (!formData.timeSlot) {
      alert('Please select an available 1-hour time slot.');
      return;
    }
    if (isSlotBooked(formData.timeSlot)) {
      alert('This 1-hour slot is already booked for the selected date. Please choose another available slot.');
      return;
    }
    setStep(2);
  };

  // Notify Doctor via EmailJS (direct to Gmail)
  const notifyDoctorViaEmail = async (bookingData) => {
    const subjectLine = `🚨 NEW BOOKING CONFIRMED: ${bookingData.name} - ₹${fee} Paid (${bookingData.consultationMode === 'online' ? 'Online Video' : 'Offline OPD'})`;
    const messageBody =
`APPOINTMENT BOOKING DETAILS
==================================================
Booking Ref    : ${bookingData.id}
Patient Name   : ${bookingData.name}
Phone          : ${bookingData.phone}
Email          : ${bookingData.email || 'N/A'}
Mode           : ${bookingData.consultationMode === 'online' ? 'Online Video Consultation (11:00 AM - 07:00 PM)' : 'In-Person Consultation (10:00 AM - 05:00 PM)'}
Specialization : ${getConsultLabel(bookingData.consultationType)}
Date & Slot    : ${bookingData.date} | ${getTimeSlotLabel(bookingData.consultationMode, bookingData.timeSlot)}
Clinical Notes : ${bookingData.notes || 'None provided'}
Payment ID     : ${bookingData.paymentId}
Amount Paid    : ₹${fee}
==================================================
Please follow up with the patient at your earliest convenience.`;

    await sendDoctorEmail({
      subjectLine,
      patientName: bookingData.name,
      patientPhone: bookingData.phone,
      patientEmail: bookingData.email || 'N/A',
      messageBody,
      bookingDetails: {
        bookingId: bookingData.id,
        consultationMode: bookingData.consultationMode,
        specialization: getConsultLabel(bookingData.consultationType),
        date: bookingData.date,
        timeSlot: getTimeSlotLabel(bookingData.consultationMode, bookingData.timeSlot),
        feePaid: `₹${fee}`,
        paymentId: bookingData.paymentId
      }
    });
  };

  // Razorpay Payment Handler
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
      amount: fee * 100, // fee in paise (₹500)
      currency: "INR",
      name: "Dr. Dewansh Mishra",
      description: "Consultation Fee - Dr. Dewansh Mishra",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 12));
        completeBooking(paymentId);
      },
      prefill: {
        name: formData.name,
        email: formData.email || 'patient@example.com',
        contact: formData.phone
      },
      notes: {
        specialization: getConsultLabel(formData.consultationType),
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

  const completeBooking = (paymentId) => {
    const newBooking = {
      id: 'DM-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      consultationTypeLabel: getConsultLabel(formData.consultationType),
      paymentId: paymentId,
      feePaid: `₹${fee}`,
      status: 'Paid & Confirmed',
      timestamp: new Date().toLocaleString()
    };

    const updatedBookings = [newBooking, ...existingBookings];
    setExistingBookings(updatedBookings);
    localStorage.setItem('dewansh_bookings', JSON.stringify(updatedBookings));

    // Save to MongoDB backend /api/bookings
    fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).catch(err => console.error('Failed to save booking to backend:', err));

    notifyDoctorViaEmail(newBooking);

    setSubmittedRequest(newBooking);
    setIsLoading(false);
    setStep(3);

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      consultationMode: 'offline',
      consultationType: 'aneurysm',
      date: '',
      timeSlot: '',
      notes: ''
    });
  };

  const handleDeleteBooking = (id) => {
    const updated = existingBookings.filter(b => b.id !== id);
    setExistingBookings(updated);
    localStorage.setItem('dewansh_bookings', JSON.stringify(updated));
    if (submittedRequest && submittedRequest.id === id) {
      setSubmittedRequest(null);
      setStep(1);
    }
  };

  return (
    <section id="booking" className="relative overflow-hidden" style={{
      paddingTop: '40px',
      paddingBottom: '50px',
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
            Request an appointment with Dr. Dewansh Mishra at Apollomedics Super Speciality Hospital, Lucknow.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '48px', alignItems: 'start', marginTop: '16px' }}>
          
          {/* Left Column: Form / Fee Review / Confirmation Card */}
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
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Processing Payment Gateway...</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Securing connection to Razorpay</p>
              </div>
            ) : step === 1 ? (

              /* ================= STEP 1: FORM INPUT ================= */
              <form onSubmit={handleProceedToReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarRange size={22} style={{ color: 'var(--accent-teal)' }} />
                  Request Appointment
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '-10px 0 6px' }}>
                  Step 1 of 2: Fill patient details below
                </p>

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

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Contact Phone *</label>
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 16px',
                      backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                      gap: '10px'
                    }}>
                      <Mail size={18} style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                      />
                    </div>
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

                {/* Consultation Mode Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Consultation Mode & Hours *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultationMode: 'offline', timeSlot: '' }))}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: formData.consultationMode === 'offline' ? '2px solid var(--accent-teal)' : '1px solid var(--border-color)',
                        backgroundColor: formData.consultationMode === 'offline' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(var(--primary-rgb), 0.02)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: formData.consultationMode === 'offline' ? 'var(--accent-teal)' : 'var(--text-primary)' }}>
                        🏥 Offline / In-Person OPD
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
                        Hours: 10:00 AM – 05:00 PM
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        In-Person Consultation
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultationMode: 'online', timeSlot: '' }))}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: formData.consultationMode === 'online' ? '2px solid #10b981' : '1px solid var(--border-color)',
                        backgroundColor: formData.consultationMode === 'online' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(var(--primary-rgb), 0.02)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: formData.consultationMode === 'online' ? '#10b981' : 'var(--text-primary)' }}>
                        💻 Online Video Consult
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
                        Hours: 11:00 AM – 07:00 PM
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Video Call & Scan Evaluation
                      </span>
                    </button>
                  </div>
                </div>

                {/* Preferred Date */}
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
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setFormData(prev => ({ ...prev, date: newDate, timeSlot: '' }));
                      }}
                      style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* 1-Hour Time Slot Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                      <Clock size={16} style={{ color: 'var(--accent-teal)' }} />
                      Select 1-Hour Slot ({formData.consultationMode === 'online' ? '11:00 AM – 07:00 PM' : '10:00 AM – 05:00 PM'}) *
                    </label>
                    {formData.timeSlot && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-teal)', fontWeight: 700 }}>
                        Selected: {getTimeSlotLabel(formData.consultationMode, formData.timeSlot)}
                      </span>
                    )}
                  </div>

                  {!formData.date ? (
                    <div style={{
                      padding: '14px',
                      backgroundColor: 'rgba(6, 182, 212, 0.05)',
                      border: '1px dashed rgba(6, 182, 212, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      textAlign: 'center'
                    }}>
                      📅 Please select a consultation date above to view available 1-hour slots.
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: '8px',
                      maxHeight: '230px',
                      overflowY: 'auto',
                      padding: '6px',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(var(--primary-rgb), 0.02)'
                    }}>
                      {(formData.consultationMode === 'online' ? ONLINE_SLOTS : OFFLINE_SLOTS).map((slot) => {
                        const booked = isSlotBooked(slot.id);
                        const isSelected = formData.timeSlot === slot.id;

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={booked}
                            onClick={() => {
                              if (!booked) {
                                setFormData(prev => ({ ...prev, timeSlot: slot.id }));
                              }
                            }}
                            title={booked ? 'This 1-hour slot is already booked' : `Select ${slot.label}`}
                            style={{
                              padding: '10px 8px',
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              textAlign: 'center',
                              transition: 'all 0.15s ease',
                              cursor: booked ? 'not-allowed' : 'pointer',
                              opacity: booked ? 0.45 : 1,
                              pointerEvents: booked ? 'none' : 'auto',
                              backgroundColor: booked
                                ? 'rgba(239, 68, 68, 0.06)'
                                : isSelected
                                  ? 'rgba(6, 182, 212, 0.18)'
                                  : 'var(--bg-primary)',
                              border: booked
                                ? '1px solid rgba(239, 68, 68, 0.28)'
                                : isSelected
                                  ? '2px solid var(--accent-teal)'
                                  : '1px solid var(--border-color)',
                              boxShadow: isSelected ? '0 0 10px rgba(6, 182, 212, 0.3)' : 'none'
                            }}
                          >
                            <span style={{
                              fontSize: '0.8rem',
                              fontWeight: isSelected ? 800 : 600,
                              color: booked
                                ? 'var(--text-muted)'
                                : isSelected
                                  ? 'var(--accent-teal)'
                                  : 'var(--text-primary)',
                              textDecoration: booked ? 'line-through' : 'none'
                            }}>
                              {slot.label}
                            </span>

                            {booked ? (
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: '#ef4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                                padding: '1px 6px',
                                borderRadius: '4px'
                              }}>
                                Booked
                              </span>
                            ) : isSelected ? (
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: 'var(--accent-teal)',
                                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                                padding: '1px 6px',
                                borderRadius: '4px'
                              }}>
                                ✓ Selected
                              </span>
                            ) : (
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                color: '#10b981',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                padding: '1px 6px',
                                borderRadius: '4px'
                              }}>
                                Available
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
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
                      rows={2}
                      placeholder="Key symptoms or previous diagnostic scan details..."
                      value={formData.notes}
                      onChange={handleChange}
                      style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', boxShadow: 'var(--shadow-glow)' }}>
                  Continue to Fee & Review (₹{fee})
                </button>
              </form>
            ) : step === 2 ? (

              /* ================= STEP 2: FEE REVIEW & PAYMENT ================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Review & Consultation Fee</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>Step 2 of 2: Confirm details & proceed to pay fee</p>
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
                  <p style={{ margin: 0 }}><strong>Patient Name:</strong> {formData.name}</p>
                  <p style={{ margin: 0 }}><strong>Phone Number:</strong> {formData.phone}</p>
                  <p style={{ margin: 0 }}><strong>Email Address:</strong> {formData.email || 'N/A'}</p>
                  <p style={{ margin: 0 }}>
                    <strong>Consultation Mode:</strong>{' '}
                    <span style={{ color: formData.consultationMode === 'online' ? '#10b981' : 'var(--accent-teal)', fontWeight: 700 }}>
                      {formData.consultationMode === 'online' ? '💻 Online Video (11:00 AM – 07:00 PM)' : '🏥 Offline In-Person OPD (10:00 AM – 05:00 PM)'}
                    </span>
                  </p>
                  <p style={{ margin: 0 }}><strong>Specialization:</strong> {getConsultLabel(formData.consultationType)}</p>
                  <p style={{ margin: 0 }}>
                    <strong>Appointment Slot:</strong> {formData.date} • {getTimeSlotLabel(formData.consultationMode, formData.timeSlot)}
                  </p>
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
                    <span>Doctor Consultation Fee</span>
                    <span style={{ fontWeight: 800 }}>₹{fee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <span>Hospital Appointment Queue</span>
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
                  <span>Secured 256-bit payment gateway. Dr. Dewansh Mishra and the clinical team will receive instant notification upon payment.</span>
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

              /* ================= STEP 3: SUCCESS RECEIPT ================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="flex items-center" style={{ gap: '12px', color: '#10b981' }}>
                  <CheckCircle2 size={36} />
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Booking Confirmed & Fee Paid!</h3>
                    <p style={{ fontSize: '0.825rem', color: 'var(--accent-teal)', fontWeight: 700 }}>Appointment Ref: {submittedRequest?.id}</p>
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <p><strong>Razorpay Payment ID:</strong> <span style={{ fontFamily: 'monospace', color: 'var(--accent-teal)', fontWeight: 700 }}>{submittedRequest?.paymentId}</span></p>
                  <p><strong>Patient Name:</strong> {submittedRequest?.name}</p>
                  <p><strong>Contact Phone:</strong> {submittedRequest?.phone}</p>
                  <p>
                    <strong>Consultation Mode:</strong>{' '}
                    <span style={{ color: submittedRequest?.consultationMode === 'online' ? '#10b981' : 'var(--accent-teal)', fontWeight: 700 }}>
                      {submittedRequest?.consultationMode === 'online' ? '💻 Online Video (11:00 AM – 07:00 PM)' : '🏥 Offline In-Person OPD (10:00 AM – 05:00 PM)'}
                    </span>
                  </p>
                  <p><strong>Specialization:</strong> {submittedRequest?.consultationTypeLabel}</p>
                  <p><strong>Appointment Slot:</strong> {submittedRequest?.date} • {getTimeSlotLabel(submittedRequest?.consultationMode, submittedRequest?.timeSlot)}</p>
                  <p><strong>Fee Paid:</strong> {submittedRequest?.feePaid || `₹${fee}`}</p>
                </div>

                <div style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(6, 182, 212, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--accent-teal)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  Your appointment details and payment receipt have been confirmed. Dr. Dewansh Mishra and the clinical team will reach you shortly.
                </div>

                <button onClick={() => { setStep(1); setSubmittedRequest(null); }} className="btn btn-primary">
                  Schedule Another Appointment
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Hospital Guidelines & Active Bookings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Hospital Guidelines</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Consultation Schedule</p>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                  🏥 <strong>Offline (In-Person OPD):</strong> 10:00 AM – 05:00 PM (Mon – Sat)
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  💻 <strong>Online (Video Consult):</strong> 11:00 AM – 07:00 PM (Mon – Sat)
                </p>
              </div>
              <p>
                <strong>1. Emergency Referrals:</strong> If experiencing acute stroke symptoms (facial drooping, arm weakness, speech slurring), bypass form and proceed to **Apollomedics Hospital Emergency Department** immediately.
              </p>
              <p>
                <strong>2. Doctor Fee:</strong> Consultation fee is ₹{fee} payable via secure Razorpay checkout (UPI, Cards, NetBanking).
              </p>
              <p>
                <strong>3. Instant Notification:</strong> Upon payment, Dr. Dewansh Mishra and the clinical team receive instant notification with your appointment schedule.
              </p>
            </div>

            {/* Active Bookings Persistence */}
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
                          {booking.consultationTypeLabel || getConsultLabel(booking.consultationType)}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-teal)', marginTop: '4px', fontWeight: 500 }}>
                          Paid: {booking.feePaid || `₹${fee}`} • Date: {booking.date} ({booking.timeSlot === 'morning' ? 'Morning' : 'Afternoon'})
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
                        title="Cancel Request"
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
      `}</style>
    </section>
  );
}
