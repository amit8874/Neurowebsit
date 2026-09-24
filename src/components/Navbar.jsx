import React, { useState, useEffect } from 'react';
import { Sun, Moon, Stethoscope, ChevronDown, Activity, Sparkles } from 'lucide-react';
import drDewanshImg from '../assets/dr-dewansh-mishra.jpg';

export default function Navbar({ onOpenSecondOpinion, onBackHome, isSecondOpinion }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    {
      label: 'About',
      href: '#about',
      bg: '#0f766e',
      hoverBg: '#14b8a6',
      shadow: '0 4px 14px rgba(20, 184, 166, 0.45)'
    },
    {
      label: 'Treatment',
      href: '#conditions-treated',
      hasDropdown: true,
      bg: '#1e3a8a',
      hoverBg: '#2563eb',
      shadow: '0 4px 14px rgba(37, 99, 235, 0.45)',
      items: [
        { title: 'Online Consultation', isSecondOpinion: true },
        { title: 'Aneurysm Coiling/SAC/FD', href: '#conditions-treated' },
        { title: 'Mechanical Thrombectomy in brain stroke', href: '#conditions-treated' },
        { title: 'DSA/Angiography', href: '#conditions-treated' },
        { title: 'AVM/DAVF embolization', href: '#conditions-treated' },
        { title: 'Diagnostic Neuroimaging consultation(Neuroreview)', href: '#conditions-treated' }
      ]
    },
    {
      label: 'Patient Stories',
      href: '#about',
      bg: '#065f46',
      hoverBg: '#10b981',
      shadow: '0 4px 14px rgba(16, 185, 129, 0.45)'
    },
    {
      label: 'Media',
      href: '#gallery',
      bg: '#581c87',
      hoverBg: '#8b5cf6',
      shadow: '0 4px 14px rgba(139, 92, 246, 0.45)'
    },
    {
      label: 'Blog',
      href: '#about',
      bg: '#881337',
      hoverBg: '#e11d48',
      shadow: '0 4px 14px rgba(225, 29, 72, 0.45)'
    },
    {
      label: 'Contact',
      href: '#booking',
      bg: '#78350f',
      hoverBg: '#d97706',
      shadow: '0 4px 14px rgba(217, 119, 6, 0.45)'
    }
  ];

  const handleNavClick = (href) => {
    if (isSecondOpinion && onBackHome) {
      onBackHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* ===================== DESKTOP NAVBAR ===================== */}
      <nav className="desktop-navbar">
        <div className="desktop-navbar-inner">

          {/* Left: Doctor Profile Badge */}
          <a
            href="#"
            className="doctor-badge-link"
            onClick={(e) => {
              if (isSecondOpinion && onBackHome) {
                e.preventDefault();
                onBackHome();
              }
            }}
          >
            <div className="doctor-avatar-box">
              <img
                src={drDewanshImg}
                alt="Dr Dewansh Mishra"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center'
                }}
              />
              <div className="doctor-online-dot" />
            </div>
            <div className="doctor-info">
              <span className="doctor-name">Dr Dewansh Mishra</span>
              <span className="doctor-qual">DM, Neurointervention (SCTIMST)</span>
            </div>
          </a>

          {/* Center: Navigation Buttons */}
          <div className="desktop-nav-links" style={{ gap: '10px' }}>
            {navLinks.map((link, idx) => {
              const isHovered = hoveredNav === idx;

              const buttonStyle = {
                backgroundColor: isHovered ? link.hoverBg : link.bg,
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: isHovered ? link.shadow : '0 2px 6px rgba(0, 0, 0, 0.18)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              };

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="dropdown-container"
                    onMouseEnter={() => {
                      setIsDropdownOpen(true);
                      setHoveredNav(idx);
                    }}
                    onMouseLeave={() => {
                      setIsDropdownOpen(false);
                      setHoveredNav(null);
                    }}
                    style={{ position: 'relative' }}
                  >
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      style={buttonStyle}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} color="#ffffff" style={{
                        transition: 'transform 0.2s ease',
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }} />
                    </a>

                    <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: isDropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-xl)',
                      padding: '8px 0',
                      minWidth: '290px',
                      opacity: isDropdownOpen ? 1 : 0,
                      visibility: isDropdownOpen ? 'visible' : 'hidden',
                      transition: 'all 0.2s ease',
                      zIndex: 100
                    }}>
                      {link.items.map((item, subIdx) => (
                        <a
                          key={subIdx}
                          href={item.isSecondOpinion ? '#second-opinion' : item.href}
                          className="dropdown-item"
                          onClick={(e) => {
                            if (item.isSecondOpinion) {
                              e.preventDefault();
                              setIsDropdownOpen(false);
                              if (onOpenSecondOpinion) onOpenSecondOpinion();
                            } else {
                              setIsDropdownOpen(false);
                              handleNavClick(item.href);
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 16px',
                            fontSize: '0.85rem',
                            fontWeight: item.isSecondOpinion ? 700 : 500,
                            color: item.isSecondOpinion ? 'var(--accent-teal)' : 'var(--text-primary)',
                            textDecoration: 'none',
                            transition: 'background-color 0.15s ease'
                          }}
                        >
                          {item.isSecondOpinion ? (
                            <Sparkles size={14} color="var(--accent-teal)" />
                          ) : (
                            <Activity size={14} color="var(--accent-teal)" />
                          )}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={buttonStyle}
                  onMouseEnter={() => setHoveredNav(idx)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right: Action Buttons */}
          <div className="desktop-nav-actions">
            <button
              onClick={onOpenSecondOpinion}
              className="btn-pill btn-green-box"
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              2nd Opinion
            </button>
            <a
              href="#booking"
              className="btn-pill btn-blue-box-darktext"
              onClick={() => handleNavClick('#booking')}
            >
              Book Appointment
            </a>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ===================== MOBILE HEADER ===================== */}
      <header className="mobile-header">
        {/* Left: Doctor info */}
        <div
          className="mobile-header-left"
          onClick={() => {
            if (isSecondOpinion && onBackHome) onBackHome();
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="mobile-doctor-icon" style={{ overflow: 'hidden', padding: 0 }}>
            <img src={drDewanshImg} alt="Dr Dewansh Mishra" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>
          <div className="mobile-doctor-info">
            <span className="mobile-doctor-name">Dr Dewansh Mishra</span>
            <span className="mobile-doctor-qual">DM, Neurointervention (SCTIMST)</span>
          </div>
        </div>

        {/* Right: Hamburger — pure CSS bars, no SVG */}
        <button
          className={`hamburger-btn ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="hb-bar"></span>
          <span className="hb-bar"></span>
          <span className="hb-bar"></span>
        </button>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.label} style={{ display: 'flex', flexDirection: 'column', margin: '4px 12px' }}>
                  <div style={{
                    backgroundColor: link.bg,
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <span>{link.label}</span>
                    <ChevronDown size={14} color="#ffffff" />
                  </div>
                  {link.items.map((sub, subIdx) => (
                    <a
                      key={subIdx}
                      href={sub.isSecondOpinion ? '#second-opinion' : sub.href}
                      className="mobile-drawer-link"
                      onClick={(e) => {
                        setIsOpen(false);
                        if (sub.isSecondOpinion) {
                          e.preventDefault();
                          if (onOpenSecondOpinion) onOpenSecondOpinion();
                        } else {
                          handleNavClick(sub.href);
                        }
                      }}
                      style={{ paddingLeft: '28px', fontSize: '0.85rem' }}
                    >
                      • {sub.title}
                    </a>
                  ))}
                </div>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick(link.href);
                }}
                style={{
                  backgroundColor: link.bg,
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  margin: '4px 12px',
                  display: 'block'
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mobile-drawer-divider" />
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenSecondOpinion();
            }}
            className="mobile-drawer-btn mobile-drawer-btn-green"
            style={{ border: 'none', cursor: 'pointer', textAlign: 'center', width: 'calc(100% - 24px)', margin: '4px 12px', display: 'block' }}
          >
            2nd Opinion
          </button>
          <a
            href="#booking"
            className="mobile-drawer-btn mobile-drawer-btn-blue"
            onClick={() => {
              setIsOpen(false);
              handleNavClick('#booking');
            }}
            style={{ width: 'calc(100% - 24px)', margin: '4px 12px' }}
          >
            Book Appointment
          </a>
        </div>
      )}

      {/* ===================== MOBILE BOTTOM BAR ===================== */}
      <div className="mobile-bottom-bar">
        <button
          onClick={onOpenSecondOpinion}
          className="mobile-bottom-btn mobile-bottom-green"
          style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          2nd Opinion
        </button>
        <a
          href="#booking"
          className="mobile-bottom-btn mobile-bottom-blue"
          onClick={() => handleNavClick('#booking')}
        >
          Book an Appointment
        </a>
      </div>
    </>
  );
}
