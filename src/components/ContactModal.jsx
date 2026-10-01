import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, X, ExternalLink, Navigation } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mapSearchQuery = encodeURIComponent("Dr Aditi's Dental & Maxillofacial Clinic, 2, Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '20px 16px',
        overflowY: 'auto',
        animation: 'modalBackdropFade 0.25s ease-out forwards'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          width: '100%',
          maxWidth: '480px',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          padding: '20px 24px',
          margin: 'auto',
          position: 'relative',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          aria-label="Close Contact Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
            Contact Clinic & Doctor
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Reach out via phone, email, or visit our clinic location below.
          </p>
        </div>

        {/* Contact Details List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', textAlign: 'left' }}>

          {/* Phone Item */}
          <a
            href="tel:09208430808"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-glass)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              color: 'var(--accent-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phone
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                092084 30808
              </span>
            </div>
          </a>

          {/* Email Item */}
          <a
            href="mailto:dewanshmishra@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-glass)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Mail size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                dewanshmishra@gmail.com
              </span>
            </div>
          </a>

          {/* Address Item */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-glass)'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              <MapPin size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Address (Lucknow)
              </span>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.4', display: 'block', marginTop: '2px' }}>
                Dr Aditi's Dental & Maxillofacial Clinic, 2, Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010
              </span>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map Container */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Clinic Location Map
            </span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-teal)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>
          </div>

          <div
            onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
            style={{
              position: 'relative',
              width: '100%',
              height: '140px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-primary)'
            }}
            title="Click to view exact clinic location on Google Maps"
          >
            <iframe
              title="Clinic Location Map"
              src={embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              loading="lazy"
              allowFullScreen=""
            />
            {/* Hover overlay with button */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(1px)'
              }}
            >
              <span style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)'
              }}>
                <Navigation size={14} color="var(--accent-teal)" />
                Click for Directions
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes modalBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
