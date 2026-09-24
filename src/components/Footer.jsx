import React, { useState, useEffect } from 'react';
import { BrainCircuit, Phone, MapPin, Clock, ArrowUp, X } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | null
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: 'https://instagram.com/drdewansh_neuroir',
      name: 'Instagram'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768M20 4l-6.768 6.768"></path>
        </svg>
      ),
      url: 'https://x.com/drdewansh_neuroir',
      name: 'X (Twitter)'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      url: 'https://facebook.com/drdewansh_neuroir',
      name: 'Facebook'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0 -1.94 -2C18.88 4 12 4 12 4s-6.88 0 -8.6.46a2.78 2.78 0 0 0 -1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94 -2 29 29 0 0 0 .46 -5.25 29 29 0 0 0 -.46 -5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      url: 'https://youtube.com',
      name: 'YouTube'
    }
  ];

  return (
    <footer style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      borderTop: '1px solid #1e293b',
      paddingTop: '80px',
      paddingBottom: '40px',
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
    }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-3" style={{ gap: '48px', marginBottom: '64px', textAlign: 'left' }}>
          
          {/* Left Column: Brand & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#" className="flex items-center" style={{ gap: '10px', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                color: '#38bdf8',
                borderRadius: '8px'
              }}>
                <BrainCircuit size={20} />
              </div>
              <span style={{ color: '#ffffff', fontWeight: 800 }}>Dr. Dewansh Mishra</span>
            </a>
            
            <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6' }}>
              Consultant Neuro-Interventional Radiologist specializing in minimally invasive brain stroke, aneurysm, and spinal vascular disease treatments.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#06b6d4';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'none';
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Center Column: Address & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
              Clinic Location
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem', color: '#cbd5e1' }}>
              <div className="flex" style={{ gap: '12px' }}>
                <MapPin size={22} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span style={{ color: '#cbd5e1', lineHeight: '1.5' }}>
                  KBC-31, Apollomedics Super Speciality Hospital, Kanpur - Lucknow Rd, Sector B, LDA Colony, Lucknow, Uttar Pradesh 226012
                </span>
              </div>

              <div className="flex" style={{ gap: '12px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <a href="tel:08429021960" style={{ fontWeight: 500, color: '#ffffff' }}>
                  084290 21960
                </a>
              </div>

              <a 
                href="https://maps.google.com/?q=Apollomedics+Super+Speciality+Hospital+Lucknow" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  alignSelf: 'flex-start',
                  padding: '8px 16px',
                  fontSize: '0.825rem',
                  marginTop: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = '#334155';
                }}
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Column: Hospital Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
              Consultation Hours
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem', color: '#cbd5e1' }}>
              <div className="flex" style={{ gap: '12px' }}>
                <Clock size={18} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontWeight: 600, color: '#ffffff' }}>Monday - Saturday</p>
                  <p style={{ color: '#cbd5e1' }}>09:00 AM - 05:00 PM</p>
                  <p style={{ marginTop: '8px', fontWeight: 600, color: '#ffffff' }}>Sunday</p>
                  <p style={{ color: '#cbd5e1' }}>Emergency cases only</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#1e293b', margin: '40px 0 32px' }} />

        {/* Bottom Section */}
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '24px', fontSize: '0.825rem', color: '#94a3b8' }}>
          <div style={{ textAlign: 'left', maxWidth: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <p style={{ color: '#ffffff', fontWeight: 500 }}>© {currentYear} Dr. Dewansh Mishra. All rights reserved.</p>
              <span style={{ color: '#334155' }}>|</span>
              <button
                onClick={() => setActiveModal('terms')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#38bdf8',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  textDecoration: 'underline'
                }}
              >
                Terms & Conditions
              </button>
              <span style={{ color: '#334155' }}>|</span>
              <button
                onClick={() => setActiveModal('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#38bdf8',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  textDecoration: 'underline'
                }}
              >
                Privacy Policy
              </button>
              <span style={{ color: '#334155' }}>|</span>
              <button
                onClick={() => setActiveModal('refund')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#38bdf8',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  textDecoration: 'underline'
                }}
              >
                Refund Policy
              </button>
            </div>
            <p style={{ lineHeight: '1.5', color: '#94a3b8' }}>
              Disclaimer: The contents of this website (clinical case details, treatments, and descriptions) are for informational and academic purposes only. For actual emergency or neuro-vascular conditions, please visit the hospital emergency department or consult Dr. Dewansh Mishra directly at Apollomedics Hospitals.
            </p>
          </div>
          
          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#38bdf8';
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'none';
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Modal Dialog for Terms & Conditions, Privacy Policy & Refund Policy */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xl)',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '28px',
              position: 'relative',
              textAlign: 'left'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', itemsCenter: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {activeModal === 'terms' ? 'Terms & Conditions' : activeModal === 'privacy' ? 'Privacy Policy' : 'Refund Policy'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            {activeModal === 'terms' && (
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                <p style={{ fontWeight: 600, color: 'var(--accent-teal)', fontSize: '1.05rem', marginBottom: '14px' }}>
                  Welcome to drdewanshmishra.com
                </p>
                <p style={{ marginBottom: '14px' }}>
                  By using this website, you agree to these Terms & Conditions.
                </p>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', listStyleType: 'disc' }}>
                  <li>This platform provides medical opinions and information for educational and advisory purposes only.</li>
                  <li>It does not replace in-person consultation, diagnosis, or emergency treatment.</li>
                  <li>All opinions are based on information provided by the user, including scans, reports, and clinical history.</li>
                  <li>Users are responsible for the accuracy of their information.</li>
                  <li>Payments made are for review and opinion services only.</li>
                  <li>By proceeding, you agree to receive digital communications related to your consultation.</li>
                </ul>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                <p style={{ fontWeight: 600, color: 'var(--accent-teal)', fontSize: '1.05rem', marginBottom: '14px' }}>
                  We respect your privacy.
                </p>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', listStyleType: 'disc' }}>
                  <li>Any personal or medical data shared via this website or email is kept confidential and used only to provide medical opinion services.</li>
                  <li>We do not share, sell, or disclose user data to third parties, except as required by law.</li>
                  <li>Secure and ethical handling of patient information is a core principle of our practice.</li>
                </ul>
              </div>
            )}

            {activeModal === 'refund' && (
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                <p style={{ fontWeight: 600, color: 'var(--accent-teal)', fontSize: '1.05rem', marginBottom: '14px' }}>
                  Once an opinion request is received and reviewed, payments are generally non-refundable.
                </p>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', listStyleType: 'disc' }}>
                  <li>
                    However, if a duplicate payment or technical error occurs, the amount will be refunded after verification within 7–10 working days.
                  </li>
                  <li>
                    Requests for cancellation or refund must be emailed to{' '}
                    <a href="mailto:dewanshmishra@gmail.com" style={{ color: 'var(--accent-teal)', textDecoration: 'underline', fontWeight: 600 }}>
                      dewanshmishra@gmail.com
                    </a>{' '}
                    within 24 hours of payment.
                  </li>
                </ul>
              </div>
            )}

            {/* Modal Footer */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.875rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

