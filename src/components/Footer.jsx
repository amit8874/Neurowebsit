import React from 'react';
import { BrainCircuit, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '80px',
      paddingBottom: '40px',
      position: 'relative',
      zIndex: 10,
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
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                color: 'var(--accent-teal)',
                borderRadius: '8px'
              }}>
                <BrainCircuit size={20} />
              </div>
              <span className="gradient-text">Dr. Dewansh Mishra</span>
            </a>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
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
                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                    color: 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-teal)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Clinic Location
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
              <div className="flex" style={{ gap: '12px' }}>
                <MapPin size={22} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />
                <span>
                  KBC-31, Apollomedics Super Speciality Hospital, Kanpur - Lucknow Rd, Sector B, LDA Colony, Lucknow, Uttar Pradesh 226012
                </span>
              </div>

              <div className="flex" style={{ gap: '12px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />
                <a href="tel:08429021960" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                  084290 21960
                </a>
              </div>

              <a 
                href="https://maps.google.com/?q=Apollomedics+Super+Speciality+Hospital+Lucknow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary" 
                style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: '0.825rem', marginTop: '4px' }}
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Column: Hospital Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Consultation Hours
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
              <div className="flex" style={{ gap: '12px' }}>
                <Clock size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Monday - Saturday</p>
                  <p>09:00 AM - 05:00 PM</p>
                  <p style={{ marginTop: '8px', fontWeight: 500, color: 'var(--text-primary)' }}>Sunday</p>
                  <p>Emergency cases only</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '40px 0 32px' }} />

        {/* Bottom Section */}
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '24px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <div style={{ textAlign: 'left', maxWidth: '70%' }}>
            <p>© {currentYear} Dr. Dewansh Mishra. All rights reserved.</p>
            <p style={{ marginTop: '8px', lineHeight: '1.4' }}>
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
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.color = 'var(--accent-teal)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'none';
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
